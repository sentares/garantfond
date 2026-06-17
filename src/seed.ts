import { getPayload } from 'payload'
import config from '@payload-config'
import { runSeed } from './seed-core'

// CLI-обёртка: `npm run seed` (через payload run).
// Если payload run падает на Windows/Node 24 (баг tsx с node:crypto) —
// используй API-роут: запусти dev и открой /api/seed?secret=<PAYLOAD_SECRET>.
const run = async () => {
  const payload = await getPayload({ config })
  await runSeed(payload)
  process.exit(0)
}

try {
  await run()
} catch (err) {
  console.error(err)
  process.exit(1)
}
