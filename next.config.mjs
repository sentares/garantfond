import path from 'path'
import { fileURLToPath } from 'url'
import { withPayload } from '@payloadcms/next/withPayload'

const dirname = path.dirname(fileURLToPath(import.meta.url))

/** @type {import('next').NextConfig} */
const nextConfig = {
  // outputFileTracingRoot нужен ТОЛЬКО локально: в домашней папке есть лишний
  // package-lock.json, из-за которого Next выбирал неверный workspace root.
  // На Vercel авто-детект корня корректен. Поэтому на Vercel (env VERCEL=1) не задаём.
  ...(process.env.VERCEL ? {} : { outputFileTracingRoot: dirname }),
  // Нативные бинарники sharp (@img/*: .node + libvips .so) грузятся через dlopen
  // по путям, которые трейсер Next не отслеживает статически → они не попадают в
  // бандл serverless-функций на Vercel (ERR_DLOPEN libvips-cpp.so). Принудительно
  // включаем их в трейс всех функций.
  outputFileTracingIncludes: {
    '/**': ['./node_modules/@img/**/*', './node_modules/sharp/**/*'],
  },
}

export default withPayload(nextConfig)
