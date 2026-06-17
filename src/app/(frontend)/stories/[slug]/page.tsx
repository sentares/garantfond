import StoryArticle from '@/components/Stories/StoryArticle'

export default async function StoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  return <StoryArticle slug={slug} />
}
