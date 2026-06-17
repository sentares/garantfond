'use client'
import { useLangContext } from '@/context/LangContext'
import styles             from './Partners.module.css'

const BANKS = ['Демир Банк','Айыл Банк','РСК Банк','Бакай Банк','Optima Bank','KICB','Эко Исламик','Кыргызкоммерц','Капитал Банк','Халык Банк','MBank','Финка Банк','Толубай Банк','BAI-Tushum','IFC','GIZ','USAID','ЕАБР']

export default function Partners() {
  const { t } = useLangContext()

  return (
      <section className={`sec ${styles.section}`} id="partners">
        <div className="sec-inner">
          <div className="reveal" style={{ marginBottom: '40px' }}>
            <div className="eyebrow">{t('partners_eyebrow')}</div>
            <h2 className="sec-title">
              {t('partners_title')} <em style={{ color: 'var(--blue2)', fontStyle: 'normal' }}>{t('partners_title_2')}</em>
            </h2>
          </div>
          <div className={`${styles.statsRow} three-col reveal`}>
            {[
              { icon: '🏠', num: '19', desc: t('partners_banks'),   grad: 'linear-gradient(135deg,#C42020,#DC5C10)' },
              { icon: '📍', num: '7',  desc: t('partners_branches'),grad: 'linear-gradient(135deg,#1B3E8F,#2455B0)' },
              { icon: '🌐', num: '3',  desc: t('partners_intl'),    grad: 'linear-gradient(135deg,#DC5C10,#C9A84C)' },
            ].map(s => (
                <div key={s.num} className={styles.statCard}>
                  <div className={styles.statIcon} style={{ background: s.grad }}>{s.icon}</div>
                  <div>
                    <div className={styles.statNum}>{s.num}</div>
                    <div className={styles.statDesc}>{s.desc}</div>
                  </div>
                </div>
            ))}
          </div>
          <div className={`${styles.scroll} reveal`}>
            <div className={styles.track}>
              {[...BANKS, ...BANKS].map((b, i) => (
                  <div key={i} className={styles.logo}><span>{b}</span></div>
              ))}
            </div>
          </div>
        </div>
      </section>
  )
}