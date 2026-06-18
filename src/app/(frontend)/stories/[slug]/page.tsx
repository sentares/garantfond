import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { getSiteContent } from '@/lib/content'
import StoryArticle from '@/components/Stories/StoryArticle'

const dec = (s: string) => {
  try {
    return decodeURIComponent(s)
  } catch {
    return s
  }
}

// slug не локализован → достаточно проверить любой локальный список (ru).
// getSiteContent кешируется (React cache + unstable_cache) — лишнего запроса в БД нет.
async function findStory(slug: string) {
  const want = dec(slug)
  const { stories } = await getSiteContent()
  return stories.ru.find((st) => st.slug === want || st.slug === slug) ?? null
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const story = await findStory(slug)
  if (!story) return { title: 'Материал не найден — Гарантийный Фонд' }
  return {
    title: `${story.name || 'История'} — Гарантийный Фонд`,
    description: story.quote || undefined,
  }
}

export default async function StoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  // Несуществующий slug → настоящий HTTP 404 (а не «мягкий» 200 на клиенте).
  if (!(await findStory(slug))) notFound()
  return <StoryArticle slug={slug} />
}
