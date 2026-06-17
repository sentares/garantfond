'use client'
import { useLangContext } from '@/context/LangContext'
import styles from './Footer.module.css'

// Иконки и фирменные цвета соцсетей по коду сети из настроек.
const NETWORKS: Record<string, { label: string; bg: string; path: string }> = {
  instagram: {
    label: 'Instagram',
    bg: 'radial-gradient(circle at 30% 110%, #fdf497 0%, #fd5949 45%, #d6249f 60%, #285AEB 90%)',
    path: 'M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41-.56-.22-.96-.48-1.38-.9-.42-.42-.68-.82-.9-1.38-.16-.42-.36-1.06-.41-2.23-.06-1.27-.07-1.65-.07-4.85s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41 1.27-.06 1.65-.07 4.85-.07M12 0C8.74 0 8.33.01 7.05.07 5.78.13 4.9.33 4.14.63c-.79.3-1.46.72-2.13 1.38C1.35 2.68.93 3.35.63 4.14.33 4.9.13 5.78.07 7.05.01 8.33 0 8.74 0 12s.01 3.67.07 4.95c.06 1.27.26 2.15.56 2.91.3.79.72 1.46 1.38 2.13.67.66 1.34 1.08 2.13 1.38.76.3 1.64.5 2.91.56C8.33 23.99 8.74 24 12 24s3.67-.01 4.95-.07c1.27-.06 2.15-.26 2.91-.56.79-.3 1.46-.72 2.13-1.38.66-.67 1.08-1.34 1.38-2.13.3-.76.5-1.64.56-2.91.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95c-.06-1.27-.26-2.15-.56-2.91-.3-.79-.72-1.46-1.38-2.13C21.32 1.35 20.65.93 19.86.63 19.1.33 18.22.13 16.95.07 15.67.01 15.26 0 12 0zm0 5.84a6.16 6.16 0 100 12.32 6.16 6.16 0 000-12.32zM12 16a4 4 0 110-8 4 4 0 010 8zm6.41-10.85a1.44 1.44 0 100 2.88 1.44 1.44 0 000-2.88z',
  },
  youtube: {
    label: 'YouTube',
    bg: '#FF0000',
    path: 'M23.5 6.2a3.02 3.02 0 00-2.12-2.14C19.5 3.55 12 3.55 12 3.55s-7.5 0-9.38.51A3.02 3.02 0 00.5 6.2C0 8.07 0 12 0 12s0 3.93.5 5.8a3.02 3.02 0 002.12 2.14c1.88.51 9.38.51 9.38.51s7.5 0 9.38-.51a3.02 3.02 0 002.12-2.14C24 15.93 24 12 24 12s0-3.93-.5-5.8zM9.6 15.6V8.4l6.27 3.6-6.27 3.6z',
  },
  linkedin: {
    label: 'LinkedIn',
    bg: '#0A66C2',
    path: 'M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 110-4.12 2.06 2.06 0 010 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.8 0 0 .78 0 1.74v20.52C0 23.22.8 24 1.77 24h20.45c.97 0 1.78-.78 1.78-1.74V1.74C24 .78 23.2 0 22.22 0z',
  },
  facebook: {
    label: 'Facebook',
    bg: '#1877F2',
    path: 'M24 12.07C24 5.4 18.63 0 12 0S0 5.4 0 12.07C0 18.1 4.39 23.1 10.13 24v-8.44H7.08v-3.49h3.05V9.41c0-3.02 1.79-4.69 4.53-4.69 1.31 0 2.68.24 2.68.24v2.97h-1.51c-1.49 0-1.96.93-1.96 1.89v2.25h3.33l-.53 3.49h-2.8V24C19.61 23.1 24 18.1 24 12.07z',
  },
  telegram: {
    label: 'Telegram',
    bg: '#229ED9',
    path: 'M23.95 4.57l-3.62 17.05c-.27 1.2-.99 1.5-2 .93l-5.54-4.08-2.67 2.57c-.3.3-.54.54-1.1.54l.4-5.6L21.5 5.92c.45-.4-.1-.62-.7-.22L7.2 14.13l-5.5-1.72c-1.2-.37-1.22-1.2.25-1.78L22.4 2.76c1-.37 1.87.22 1.55 1.8z',
  },
  whatsapp: {
    label: 'WhatsApp',
    bg: '#25D366',
    path: 'M.06 24l1.68-6.13a11.82 11.82 0 01-1.58-5.93C.16 5.34 5.5 0 12.06 0a11.82 11.82 0 018.4 3.49 11.82 11.82 0 013.48 8.41c0 6.56-5.34 11.9-11.9 11.9a11.9 11.9 0 01-5.7-1.45L.06 24zM6.6 20.13l.36.21a9.86 9.86 0 005.03 1.38 9.9 9.9 0 009.88-9.88 9.9 9.9 0 00-16.9-6.99 9.82 9.82 0 00-2.9 7 9.82 9.82 0 001.5 5.26l.24.38-1 3.63 3.79-.99zm11.39-5.55c-.07-.12-.26-.2-.55-.34-.28-.14-1.68-.83-1.94-.92-.26-.1-.45-.14-.64.14-.2.28-.73.92-.9 1.11-.16.2-.33.22-.61.07-.28-.14-1.2-.44-2.28-1.41-.84-.75-1.41-1.68-1.58-1.96-.16-.28-.02-.43.12-.57.13-.13.28-.33.42-.5.14-.16.18-.28.28-.47.1-.2.05-.36-.02-.5-.07-.14-.64-1.54-.88-2.1-.23-.56-.46-.48-.64-.49l-.55-.01c-.19 0-.5.07-.76.36-.26.28-1 .98-1 2.38s1.02 2.76 1.17 2.96c.14.2 2 3.06 4.85 4.29.68.29 1.2.46 1.62.59.68.22 1.3.18 1.78.11.54-.08 1.68-.69 1.92-1.35.24-.66.24-1.23.17-1.35z',
  },
  tiktok: {
    label: 'TikTok',
    bg: '#000000',
    path: 'M16.6 5.82a4.28 4.28 0 01-1.05-2.82h-3.4v13.6a2.45 2.45 0 11-2.45-2.45c.2 0 .4.03.6.08V8.3a5.9 5.9 0 00-.6-.03 5.9 5.9 0 105.9 5.9V8.6a7.66 7.66 0 004.5 1.45V6.6a4.28 4.28 0 01-3.5-.78z',
  },
}

export default function Footer() {
  const { t, settings, products } = useLangContext()

  const socials = settings.socials
    .map(s => ({ ...NETWORKS[s.network], url: s.url }))
    .filter(s => s.path)

  const telHref = `tel:${(settings.phoneShort || settings.phone).replace(/[^\d+]/g, '')}`
  const mailHref = settings.email ? `mailto:${settings.email}` : '#'

  return (
      <footer className={styles.footer}>
        <div className={`${styles.top}`}>

          {/* СОЦСЕТИ + РЕКВИЗИТ (по центру) */}
          <div className={styles.brandCol}>
            <div className={styles.social}>
              {socials.map(s => (
                  <a key={s.label}
                     className={styles.soc}
                     href={s.url}
                     target="_blank"
                     rel="noopener noreferrer"
                     aria-label={s.label}
                     title={s.label}
                     style={{ background: s.bg }}>
                    <svg width="19" height="19" viewBox="0 0 24 24" fill="#fff"><path d={s.path} /></svg>
                  </a>
              ))}
            </div>
            {settings.nbkrNotice && <p className={styles.nbkr}>{settings.nbkrNotice}</p>}
          </div>

          {/* ПРОДУКТЫ */}
          <div>
            <div className={styles.colTitle}>{t('footer_products')}</div>
            <div className={styles.colLinks}>
              {products.slice(0, 6).map(p => (
                <a key={p.id} href="#products">{p.name}</a>
              ))}
            </div>
          </div>

          {/* КОМПАНИЯ */}
          <div>
            <div className={styles.colTitle}>{t('footer_company')}</div>
            <div className={styles.colLinks}>
              <a href="#">{t('footer_about')}</a>
              <a href="#">{t('footer_management')}</a>
              <a href="#partners">{t('footer_partners')}</a>
              <a href="#news">{t('footer_news')}</a>
              <a href="#">{t('footer_career')}</a>
              <a href="#">{t('footer_docs')}</a>
            </div>
          </div>

          {/* КОНТАКТЫ */}
          <div>
            <div className={styles.colTitle}>{t('footer_contacts')}</div>
            <div className={styles.colLinks}>
              {settings.address && <a href={settings.mapLink || '#branches'}>{settings.address}</a>}
              {(settings.phone || settings.phoneShort) && <a href={telHref}>{settings.phone || settings.phoneShort}</a>}
              {settings.email && <a href={mailHref}>{settings.email}</a>}
              {settings.hours && <a href="#branches">{settings.hours}</a>}
            </div>
          </div>

        </div>

        <div className={styles.btm}>
          <span className={styles.copy}>{t('footer_copy')}</span>
        </div>
      </footer>
  )
}
