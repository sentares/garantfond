'use client'
import Link from 'next/link'
import { useLangContext } from '@/context/LangContext'
import Navbar from '@/components/Navbar/Navbar'
import Footer from '@/components/Footer/Footer'
import styles from './Article.module.css'

export default function NewsList() {
  const { news, t } = useLangContext()

  return (
    <main>
      <Navbar />
      <article className={styles.article}>
        <div className={styles.inner}>
          <Link href="/" className={styles.back}>← {t('back_home')}</Link>
          <h1 className={styles.title} style={{ marginBottom: 32 }}>{t('news_title')}</h1>

          <div style={{ display: 'grid', gap: 24 }}>
            {news.map(n => (
              <Link key={n.id} href={`/news/${n.slug}`}
                    style={{ display: 'flex', gap: 18, textDecoration: 'none', color: 'inherit', alignItems: 'center' }}>
                <div style={{ width: 120, height: 84, borderRadius: 12, overflow: 'hidden', flexShrink: 0, background: 'linear-gradient(135deg,#1b3e8f,#2455b0)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 32 }}>
                  {n.cover ? <img src={n.cover} alt={n.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : '📰'}
                </div>
                <div>
                  {n.cat && <span className={styles.cat} style={{ marginBottom: 8 }}>{n.cat}</span>}
                  <div style={{ fontWeight: 700, fontSize: 18, color: '#0e1a36' }}>{n.title}</div>
                  <div style={{ color: '#6b7280', fontSize: 14, marginTop: 4 }}>{n.date}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </article>
      <Footer />
    </main>
  )
}
