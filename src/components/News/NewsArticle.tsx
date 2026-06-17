'use client'
import Link from 'next/link'
import { useLangContext } from '@/context/LangContext'
import Navbar from '@/components/Navbar/Navbar'
import Footer from '@/components/Footer/Footer'
import ArticleContent from '@/components/ArticleContent'
import styles from './Article.module.css'

const dec = (s: string) => { try { return decodeURIComponent(s) } catch { return s } }

export default function NewsArticle({ slug }: { slug: string }) {
  const { news, t } = useLangContext()
  const want = dec(slug)
  const article = news.find(n => n.slug === want || n.slug === slug)

  return (
    <main>
      <Navbar />
      <article className={styles.article}>
        <div className={styles.inner}>
          <Link href="/#news" className={styles.back}>← {t('news_title')}</Link>

          {!article ? (
            <div className={styles.notFound}>
              <h1>404</h1>
              <p>{t('article_not_found')}</p>
              <Link href="/" className={styles.back}>← {t('back_home')}</Link>
            </div>
          ) : (
            <>
              {article.cat && <span className={styles.cat}>{article.cat}</span>}
              <h1 className={styles.title}>{article.title}</h1>
              {article.date && <div className={styles.date}>{article.date}</div>}
              {article.cover && (
                <div className={styles.cover}>
                  <img src={article.cover} alt={article.title} />
                </div>
              )}
              {article.content.length
                ? <ArticleContent blocks={article.content} />
                : article.text
                  ? <p className={styles.body}>{article.text}</p>
                  : null}
            </>
          )}
        </div>
      </article>
      <Footer />
    </main>
  )
}
