'use client'
import { useLangContext } from '@/context/LangContext'
import styles             from './Partners.module.css'

export default function Partners() {
  const { t, partners, stats } = useLangContext()

  const domestic = partners.filter(p => p.type !== 'intl').length
  const intl = partners.filter(p => p.type === 'intl').length

  const cards = [
    { icon: '🏠', num: String(domestic || ''),       desc: t('partners_banks'),    grad: 'linear-gradient(135deg,#C42020,#DC5C10)' },
    { icon: '📍', num: String(stats.branches || ''),  desc: t('partners_branches'), grad: 'linear-gradient(135deg,#1B3E8F,#2455B0)' },
    { icon: '🌐', num: String(intl || ''),            desc: t('partners_intl'),     grad: 'linear-gradient(135deg,#DC5C10,#C9A84C)' },
  ]

  // для бесшовной прокрутки дублируем список
  const loop = partners.length ? [...partners, ...partners] : []

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
            {cards.map(s => (
                <div key={s.desc} className={styles.statCard}>
                  <div className={styles.statIcon} style={{ background: s.grad }}>{s.icon}</div>
                  <div>
                    <div className={styles.statNum}>{s.num}</div>
                    <div className={styles.statDesc}>{s.desc}</div>
                  </div>
                </div>
            ))}
          </div>
          {loop.length > 0 && (
            <div className={`${styles.scroll} reveal`}>
              <div className={styles.track}>
                {loop.map((p, i) => {
                  const inner = p.logo
                    ? <img src={p.logo} alt={p.name} style={{ maxHeight: 40, maxWidth: 120, objectFit: 'contain' }} />
                    : <span>{p.name}</span>
                  return (
                    <div key={`${p.id}-${i}`} className={styles.logo}>
                      {p.url
                        ? <a href={p.url} target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'none', display: 'flex', alignItems: 'center' }}>{inner}</a>
                        : inner}
                    </div>
                  )
                })}
              </div>
            </div>
          )}
        </div>
      </section>
  )
}
