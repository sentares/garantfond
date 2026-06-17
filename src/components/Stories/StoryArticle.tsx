'use client'
import Link from 'next/link'
import { useLangContext } from '@/context/LangContext'
import Navbar from '@/components/Navbar/Navbar'
import Footer from '@/components/Footer/Footer'
import ArticleContent from '@/components/ArticleContent'
import styles from '@/components/News/Article.module.css'

const dec = (s: string) => { try { return decodeURIComponent(s) } catch { return s } }

export default function StoryArticle({ slug }: { slug: string }) {
  const { stories, t } = useLangContext()
  const want = dec(slug)
  const story = stories.find(s => s.slug === want || s.slug === slug)

  return (
    <main>
      <Navbar />
      <article className={styles.article}>
        <div className={styles.inner}>
          <Link href="/#stories" className={styles.back}>← {t('stories_title')}</Link>

          {!story ? (
            <div className={styles.notFound}>
              <h1>404</h1>
              <p>{t('article_not_found')}</p>
              <Link href="/" className={styles.back}>← {t('back_home')}</Link>
            </div>
          ) : (
            <>
              {story.badge && <span className={styles.cat}>{story.badge}</span>}
              <h1 className={styles.title}>{story.name}</h1>
              {story.biz && <div className={styles.date}>{story.biz}</div>}
              {story.photo && (
                <div className={styles.cover}>
                  <img src={story.photo} alt={story.name} />
                </div>
              )}
              {story.quote && <blockquote className={styles.quote}>{story.quote}</blockquote>}
              {story.content.length ? <ArticleContent blocks={story.content} /> : null}
            </>
          )}
        </div>
      </article>
      <Footer />
    </main>
  )
}
