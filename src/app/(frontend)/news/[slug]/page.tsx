import NewsArticle from '@/components/News/NewsArticle'

export default async function NewsPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  return <NewsArticle slug={slug} />
}
