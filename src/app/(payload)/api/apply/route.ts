import { getPayload } from 'payload'
import config from '@payload-config'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

/**
 * Приём заявки с публичной формы (Contact.tsx).
 * Пишет в коллекцию `applications` через Local API (overrideAccess) с защитой:
 *  - honeypot: скрытое поле `website` — если заполнено, это бот → тихий «успех»;
 *  - rate-limit: не более RL_MAX заявок с одного IP за RL_WINDOW мс;
 *  - валидация: имя ≥ 2, телефон ≥ 5; обрезка длины; status форсится 'new'.
 *
 * Примечание: rate-limit in-memory (на инстанс). На Vercel (serverless) лимит
 * действует в пределах одного инстанса — для жёсткого лимита нужен Upstash/Redis.
 */
const RL_WINDOW = 60_000
const RL_MAX = 5
const hits = new Map<string, number[]>()

function rateLimited(ip: string): boolean {
  const now = Date.now()
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < RL_WINDOW)
  recent.push(now)
  hits.set(ip, recent)
  return recent.length > RL_MAX
}

const clean = (v: unknown, max: number) => String(v ?? '').trim().slice(0, max)

export async function POST(req: Request) {
  try {
    const body = (await req.json().catch(() => ({}))) as Record<string, unknown>

    // honeypot — бот заполнил скрытое поле: делаем вид, что всё ок
    if (clean(body.website, 100)) return Response.json({ ok: true })

    const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'local'
    if (rateLimited(ip)) {
      return Response.json({ ok: false, error: 'too_many' }, { status: 429 })
    }

    const name = clean(body.name, 200)
    const phone = clean(body.phone, 50)
    if (name.length < 2 || phone.length < 5) {
      return Response.json({ ok: false, error: 'invalid' }, { status: 400 })
    }

    const langRaw = clean(body.lang, 2)
    const lang = ['ru', 'ky', 'en'].includes(langRaw) ? langRaw : undefined

    const payload = await getPayload({ config })
    await payload.create({
      collection: 'applications',
      data: {
        status: 'new',
        name,
        phone,
        company: clean(body.company, 200) || undefined,
        product: clean(body.product, 200) || undefined,
        comment: clean(body.comment, 2000) || undefined,
        lang,
      },
    })

    return Response.json({ ok: true })
  } catch {
    return Response.json({ ok: false, error: 'server' }, { status: 500 })
  }
}
