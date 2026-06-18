'use client'
// Заглушка client-upload-хендлера @payloadcms/storage-vercel-blob для importMap.
// Подменяется в src/app/(payload)/admin/importMap.js (см. CLAUDE.md, грабли #9).
//
// Зачем: пакетный хендлер баррель-импортит серверный код payload/undici (node:os/
// console/...), который webpack не собирает для браузера → падение сборки.
// clientUploads мы не используем (медиа грузится через сервер).
//
// ВАЖНО: реальный VercelBlobClientUploadHandler (createClientUploadHandler) — это
// компонент-ОБЁРТКА, который рендерит {children} (а загрузку регистрирует только
// при enabled=true). Поэтому заглушка ОБЯЗАНА тоже рендерить children — иначе она
// проглатывает всё дерево админки и экран становится пустым (был баг с `() => null`).
export const VercelBlobClientUploadHandler = ({ children }) => children ?? null
export default VercelBlobClientUploadHandler
