'use client'
import { useLangContext } from '@/context/LangContext'
import styles             from './Stories.module.css'

const GRADIENTS = [
  'linear-gradient(135deg,#1a3a1a,#2d6030)',
  'linear-gradient(135deg,#0E2660,#1B3E8F)',
  'linear-gradient(135deg,#3a1a00,#7a3810)',
]

export default function Stories() {
  const { t, stories } = useLangContext()

  return (
      <section className={`sec ${styles.section}`}>
        <div className="sec-inner">
          <div className={styles.head}>
            <div className="reveal">
              <div className="eyebrow">{t('stories_eyebrow')}</div>
              <h2 className="sec-title">{t('stories_title')}</h2>
            </div>
            <a href="#" className={`${styles.more} reveal`}>{t('stories_all')}</a>
          </div>
          <div className={`${styles.grid} three-col`}>
            {stories.map((s, i) => (
                <div key={s.id} className={`${styles.card} reveal`}
                     style={{ transitionDelay: `${i * 0.1}s` }}>
                  <div className={styles.photo} style={{ background: GRADIENTS[i % GRADIENTS.length] }}>
                    <span className={styles.letter}>{s.name.charAt(0)}</span>
                    <span className={styles.badge}>{s.badge}</span>
                  </div>
                  <div className={styles.body}>
                    <div className={styles.name}>{s.name}</div>
                    <div className={styles.biz}>{s.biz}</div>
                    <p className={styles.quote}>{s.quote}</p>
                    <a href="#" className={styles.link}>{t('stories_read')}</a>
                  </div>
                </div>
            ))}
          </div>
        </div>
      </section>
  )
}
