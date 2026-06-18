import { getPayload } from 'payload'
import config from '@payload-config'
import { runSeed, seedBranches } from '@/seed-core'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'
export const maxDuration = 800

// Защита от параллельного запуска (если клиент отвалился по таймауту и повторил запрос)
let seeding = false

/**
 * Сидинг БД из браузера/curl, защищён секретом:
 *   /api/seed?secret=<PAYLOAD_SECRET>                — полный пересев (runSeed, разрушающий)
 *   /api/seed?secret=<PAYLOAD_SECRET>&mode=branches  — точечное обновление филиалов (seedBranches, НЕразрушающее)
 * Используется, когда CLI `npm run seed` не работает (баг tsx на Node 24).
 * Выполняется внутри процесса Next — конфликта dev-push нет.
 */
export async function GET(req: Request) {
  // На проде сид недоступен (деструктивный). Прод-БД наполняется через Neon-ветку.
  if (process.env.NODE_ENV === 'production') {
    return Response.json({ ok: false, error: 'not_found' }, { status: 404 })
  }

  const url = new URL(req.url)
  const secret = url.searchParams.get('secret')
  const mode = url.searchParams.get('mode')
  if (!secret || secret !== process.env.PAYLOAD_SECRET) {
    return Response.json({ ok: false, error: 'Неверный секрет' }, { status: 401 })
  }
  if (seeding) {
    return Response.json({ ok: false, error: 'Сид уже выполняется — подождите завершения' }, { status: 409 })
  }
  seeding = true
  try {
    const payload = await getPayload({ config })
    const log = mode === 'branches' ? await seedBranches(payload) : await runSeed(payload)
    return Response.json({ ok: true, mode: mode ?? 'full', log })
  } catch (err) {
    return Response.json({ ok: false, error: err instanceof Error ? err.message : String(err) }, { status: 500 })
  } finally {
    seeding = false
  }
}
