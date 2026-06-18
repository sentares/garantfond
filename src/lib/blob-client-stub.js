// Заглушка client-upload-хендлера @payloadcms/storage-vercel-blob для БРАУЗЕРНОГО
// бандла. Подменяется через NormalModuleReplacementPlugin в next.config.mjs.
//
// Зачем: плагин Vercel Blob всегда регистрирует client-upload-хендлер в importMap
// (даже при выключенном clientUploads), а тот баррель-импортит серверный код
// payload/undici (импорты node:os/node:console/...), который webpack не собирает
// для браузера → падение сборки. Клиентские загрузки мы не используем (медиа
// грузится через сервер), поэтому в браузерном бандле хендлер не нужен — здесь
// он заменён на no-op, чтобы importMap собрался без серверной цепочки.
export const VercelBlobClientUploadHandler = () => null
export default VercelBlobClientUploadHandler
