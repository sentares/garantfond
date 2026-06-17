import { getPayload } from 'payload'
import config from '@payload-config'
import { runSeed } from '@/seed-core'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'
export const maxDuration = 800

// Защита от параллельного запуска (если клиент отвалился по таймауту и повторил запрос)
let seeding = false

/**
 * Одноразовый сидинг БД из браузера/curl, защищён секретом:
 *   /api/seed?secret=<PAYLOAD_SECRET>
 * Используется, когда CLI `npm run seed` не работает (баг tsx на Node 24).
 * Выполняется внутри процесса Next — конфликта dev-push нет.
 */
export async function GET(req: Request) {
  const secret = new URL(req.url).searchParams.get('secret')
  if (!secret || secret !== process.env.PAYLOAD_SECRET) {
    return Response.json({ ok: false, error: 'Неверный секрет' }, { status: 401 })
  }
  if (seeding) {
    return Response.json({ ok: false, error: 'Сид уже выполняется — подождите завершения' }, { status: 409 })
  }
  seeding = true
  try {
    const payload = await getPayload({ config })
    const log = await runSeed(payload)
    return Response.json({ ok: true, log })
  } catch (err) {
    return Response.json({ ok: false, error: err instanceof Error ? err.message : String(err) }, { status: 500 })
  } finally {
    seeding = false
  }
}
