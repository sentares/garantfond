import path from 'path'
import { fileURLToPath } from 'url'
import { withPayload } from '@payloadcms/next/withPayload'

const dirname = path.dirname(fileURLToPath(import.meta.url))

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Жёстко фиксируем корень проекта (в домашней папке есть лишний package-lock.json,
  // из-за которого Next выбирал неверный workspace root).
  outputFileTracingRoot: dirname,
}

export default withPayload(nextConfig)
