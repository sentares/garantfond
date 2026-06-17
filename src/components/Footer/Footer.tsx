'use client'
import { useLangContext } from '@/context/LangContext'
import styles from './Footer.module.css'

export default function Footer() {
  const { t } = useLangContext()

  const SOCIALS = [
    {
      label: 'Instagram',
      href: 'https://www.instagram.com/guaranteefund_kg',
      bg: 'radial-gradient(circle at 30% 110%, #fdf497 0%, #fd5949 45%, #d6249f 60%, #285AEB 90%)',
      icon: (
          <svg width="19" height="19" viewBox="0 0 24 24" fill="#fff">
            <path d="M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41-.56-.22-.96-.48-1.38-.9-.42-.42-.68-.82-.9-1.38-.16-.42-.36-1.06-.41-2.23-.06-1.27-.07-1.65-.07-4.85s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41 1.27-.06 1.65-.07 4.85-.07M12 0C8.74 0 8.33.01 7.05.07 5.78.13 4.9.33 4.14.63c-.79.3-1.46.72-2.13 1.38C1.35 2.68.93 3.35.63 4.14.33 4.9.13 5.78.07 7.05.01 8.33 0 8.74 0 12s.01 3.67.07 4.95c.06 1.27.26 2.15.56 2.91.3.79.72 1.46 1.38 2.13.67.66 1.34 1.08 2.13 1.38.76.3 1.64.5 2.91.56C8.33 23.99 8.74 24 12 24s3.67-.01 4.95-.07c1.27-.06 2.15-.26 2.91-.56.79-.3 1.46-.72 2.13-1.38.66-.67 1.08-1.34 1.38-2.13.3-.76.5-1.64.56-2.91.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95c-.06-1.27-.26-2.15-.56-2.91-.3-.79-.72-1.46-1.38-2.13C21.32 1.35 20.65.93 19.86.63 19.1.33 18.22.13 16.95.07 15.67.01 15.26 0 12 0zm0 5.84a6.16 6.16 0 100 12.32 6.16 6.16 0 000-12.32zM12 16a4 4 0 110-8 4 4 0 010 8zm6.41-10.85a1.44 1.44 0 100 2.88 1.44 1.44 0 000-2.88z"/>
          </svg>
      ),
    },
    {
      label: 'YouTube',
      href: 'https://youtube.com/channel/UCgapUlpzauQkrcmvRY5X54Q',
      bg: '#FF0000',
      icon: (
          <svg width="19" height="19" viewBox="0 0 24 24" fill="#fff">
            <path d="M23.5 6.2a3.02 3.02 0 00-2.12-2.14C19.5 3.55 12 3.55 12 3.55s-7.5 0-9.38.51A3.02 3.02 0 00.5 6.2C0 8.07 0 12 0 12s0 3.93.5 5.8a3.02 3.02 0 002.12 2.14c1.88.51 9.38.51 9.38.51s7.5 0 9.38-.51a3.02 3.02 0 002.12-2.14C24 15.93 24 12 24 12s0-3.93-.5-5.8zM9.6 15.6V8.4l6.27 3.6-6.27 3.6z"/>
          </svg>
      ),
    },
    {
      label: 'LinkedIn',
      href: 'https://www.linkedin.com/company/guaranteefund/',
      bg: '#0A66C2',
      icon: (
          <svg width="17" height="17" viewBox="0 0 24 24" fill="#fff">
            <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 110-4.12 2.06 2.06 0 010 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.8 0 0 .78 0 1.74v20.52C0 23.22.8 24 1.77 24h20.45c.97 0 1.78-.78 1.78-1.74V1.74C24 .78 23.2 0 22.22 0z"/>
          </svg>
      ),
    },
  ]

  return (
      <footer className={styles.footer}>
        <div className={`${styles.top}`}>

          {/* СОЦСЕТИ + СВИДЕТЕЛЬСТВО НБКР (по центру) */}
          <div className={styles.brandCol}>
            <div className={styles.social}>
              {SOCIALS.map(s => (
                  <a key={s.label}
                     className={styles.soc}
                     href={s.href}
                     target="_blank"
                     rel="noopener noreferrer"
                     aria-label={s.label}
                     title={s.label}
                     style={{ background: s.bg }}>
                    {s.icon}
                  </a>
              ))}
            </div>
            <p className={styles.nbkr}>Свидетельство НБКР №1</p>
          </div>

          {/* ПРОДУКТЫ */}
          <div>
            <div className={styles.colTitle}>{t('footer_products')}</div>
            <div className={styles.colLinks}>
              <a href="#">Горизонт</a>
              <a href="#">Береке</a>
              <a href="#">Ижара Плюс</a>
              <a href="#">Ишкер Айым</a>
              <a href="#">Корпоратив</a>
              <a href="#">Green</a>
            </div>
          </div>

          {/* КОМПАНИЯ */}
          <div>
            <div className={styles.colTitle}>{t('footer_company')}</div>
            <div className={styles.colLinks}>
              <a href="#">{t('footer_about')}</a>
              <a href="#">{t('footer_management')}</a>
              <a href="#">{t('footer_partners')}</a>
              <a href="#">{t('footer_news')}</a>
              <a href="#">{t('footer_career')}</a>
              <a href="#">{t('footer_docs')}</a>
            </div>
          </div>

          {/* КОНТАКТЫ */}
          <div>
            <div className={styles.colTitle}>{t('footer_contacts')}</div>
            <div className={styles.colLinks}>
              <a href="#">{t('contact_address')}</a>
              <a href="tel:+996312555000">{t('contact_phone')}</a>
              <a href="mailto:info@garantfond.kg">{t('contact_email')}</a>
              <a href="#">{t('contact_hours')}</a>
            </div>
          </div>

        </div>

        <div className={styles.btm}>
          <span className={styles.copy}>{t('footer_copy')}</span>
        </div>
      </footer>
  )
}
