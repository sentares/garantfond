import { revalidateTag } from 'next/cache'

// Тег кеша всего контента сайта (см. getSiteContent в src/lib/content.ts).
export const CONTENT_TAG = 'site-content'

/**
 * Payload-хук: сбрасывает серверный кеш контента после любой правки в админке,
 * чтобы изменения появлялись на сайте сразу. Вне контекста запроса (например,
 * во время сидинга) revalidateTag недоступен — тихо игнорируем.
 */
export const revalidateContent = () => {
  try {
    revalidateTag(CONTENT_TAG)
  } catch {
    /* не в контексте Next-запроса — пропускаем */
  }
}
