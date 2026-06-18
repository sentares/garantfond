import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { getSiteContent } from '@/lib/content'
import NewsArticle from '@/components/News/NewsArticle'

const dec = (s: string) => {
  try {
    return decodeURIComponent(s)
  } catch {
    return s
  }
}

// slug не локализован → достаточно проверить любой локальный список (ru).
// getSiteContent обёрнут в React cache + unstable_cache, поэтому повторный
// вызов здесь не бьёт в БД (дедуп с layout в рамках одного рендера).
async function findNews(slug: string) {
  const want = dec(slug)
  const { news } = await getSiteContent()
  return news.ru.find((n) => n.slug === want || n.slug === slug) ?? null
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const article = await findNews(slug)
  if (!article) return { title: 'Материал не найден — Гарантийный Фонд' }
  return {
    title: `${article.title || 'Новость'} — Гарантийный Фонд`,
    description: article.text || undefined,
  }
}

export default async function NewsPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  // Несуществующий slug → настоящий HTTP 404 (а не «мягкий» 200 на клиенте).
  if (!(await findNews(slug))) notFound()
  return <NewsArticle slug={slug} />
}
