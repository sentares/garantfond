import path from 'path'
import { fileURLToPath } from 'url'
import { withPayload } from '@payloadcms/next/withPayload'

const dirname = path.dirname(fileURLToPath(import.meta.url))

/** @type {import('next').NextConfig} */
const nextConfig = {
  // outputFileTracingRoot нужен ТОЛЬКО локально: в домашней папке есть лишний
  // package-lock.json, из-за которого Next выбирал неверный workspace root.
  // На Vercel авто-детект корня корректен, а форс этого значения ЛОМАЕТ трейсинг
  // serverless-функций (externalized-пакеты payload/sharp не попадают в бандл
  // функции → 500 при инициализации). Поэтому на Vercel (env VERCEL=1) не задаём.
  ...(process.env.VERCEL ? {} : { outputFileTracingRoot: dirname }),
}

export default withPayload(nextConfig)
