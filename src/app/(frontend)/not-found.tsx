'use client'
import Link from 'next/link'
import { useLangContext } from '@/context/LangContext'
import Navbar from '@/components/Navbar/Navbar'
import Footer from '@/components/Footer/Footer'
import styles from '@/components/News/Article.module.css'

// Брендированная страница 404 для всего фронта: рендерится при notFound()
// внутри (frontend)/layout.tsx, поэтому контекст (язык/переводы) доступен.
export default function NotFound() {
  const { t } = useLangContext()
  return (
    <main>
      <Navbar />
      <article className={styles.article}>
        <div className={styles.inner}>
          <div className={styles.notFound}>
            <h1>404</h1>
            <p>{t('article_not_found')}</p>
            <Link href="/" className={styles.back}>
              ← {t('back_home')}
            </Link>
          </div>
        </div>
      </article>
      <Footer />
    </main>
  )
}
