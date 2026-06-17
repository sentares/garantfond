'use client'
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
            <button className={`${styles.moreBtn} reveal`}>{t('news_all')}</button>
          </div>

          <div className={`${styles.grid} reveal`}>

            {/* Главная карточка */}
            {main && (
              <div className={styles.main}>
                <div className={styles.mainImg}>{ICONS[0]}</div>
                <div className={styles.mainBody}>
                  <span className={styles.mainCat}>{main.cat}</span>
                  <div className={styles.mainTitle}>{main.title}</div>
                  <div className={styles.mainDate}>{main.date}</div>
                </div>
              </div>
            )}

            {/* Боковые карточки */}
            {rest.map((n, i) => (
              <div key={n.id} className={styles.card}>
                <div className={styles.cardIcon}>{ICONS[i + 1]}</div>
                <div className={styles.cardCat}>{n.cat}</div>
                <div className={styles.cardTitle}>{n.title}</div>
                <p className={styles.cardText}>{n.text}</p>
                <div className={styles.cardDate}>{n.date}</div>
              </div>
            ))}

          </div>
        </div>
      </section>
  )
}
