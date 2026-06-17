'use client'
import Link from 'next/link'
import { useLangContext } from '@/context/LangContext'
import styles             from './News.module.css'

const ICONS = ['🏆', '🤝', '📅']

export default function News() {
  const { t, news } = useLangContext()

  const main = news[0]
  const rest = news.slice(1, 3)

  return (
      <section className={`sec ${styles.section}`} id="news">
        <div className="sec-inner">
          <div className={styles.head}>
            <div className="reveal">
              <div className="eyebrow">{t('news_eyebrow')}</div>
              <h2 className="sec-title" style={{ marginBottom: 0 }}>{t('news_title')}</h2>
            </div>
            <Link href="/news" className={`${styles.moreBtn} reveal`}>{t('news_all')}</Link>
          </div>

          <div className={`${styles.grid} reveal`}>

            {/* Главная карточка */}
            {main && (
              <Link href={`/news/${main.slug}`} className={styles.main} style={{ textDecoration: 'none', color: 'inherit' }}>
                <div className={styles.mainImg}>
                  {main.cover
                    ? <img src={main.cover} alt={main.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    : ICONS[0]}
                </div>
                <div className={styles.mainBody}>
                  <span className={styles.mainCat}>{main.cat}</span>
                  <div className={styles.mainTitle}>{main.title}</div>
                  <div className={styles.mainDate}>{main.date}</div>
                </div>
              </Link>
            )}

            {/* Боковые карточки */}
            {rest.map((n, i) => (
              <Link key={n.id} href={`/news/${n.slug}`} className={styles.card} style={{ textDecoration: 'none', color: 'inherit' }}>
                <div className={styles.cardIcon}>
                  {n.cover
                    ? <img src={n.cover} alt={n.title} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 12 }} />
                    : ICONS[i + 1]}
                </div>
                <div className={styles.cardCat}>{n.cat}</div>
                <div className={styles.cardTitle}>{n.title}</div>
                <p className={styles.cardText}>{n.text}</p>
                <div className={styles.cardDate}>{n.date}</div>
              </Link>
            ))}

          </div>
        </div>
      </section>
  )
}
