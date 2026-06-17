'use client'
import { useState }         from 'react'
import Image                from 'next/image'
import { useScrolled }      from '@/hooks/useScrolled'
import { useLangContext }   from '@/context/LangContext'
import type { Lang }        from '@/types'
import styles               from './Navbar.module.css'

const LANGS: { code: Lang; label: string }[] = [
  { code: 'ru', label: 'РУС' },
  { code: 'ky', label: 'КЫР' },
  { code: 'en', label: 'ENG' },
]

const NAV_ITEMS = [
  { href: '#products',    k: 'nav_products' },
  { href: '#how',         k: 'nav_how' },
  { href: '#anniversary', k: 'nav_ann', gold: true },
  { href: '#partners',    k: 'nav_partners' },
  { href: '#news',        k: 'nav_news' },
  { href: '#contact',     k: 'nav_contact' },
]

const PHONE = '7500'
const OLD_SITE = 'https://gf.kg/'

export default function Navbar() {
  const scrolled = useScrolled(60)
  const { lang, setLang, t } = useLangContext()
  const [open, setOpen] = useState(false)

  const go = (id: string) => {
    document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' })
    setOpen(false)
  }

  return (
      <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}>
        <div className={styles.inner}>
          <a className={styles.logo} href="#" onClick={() => setOpen(false)}>
            <img src="/gf_logo.png" alt="Гарантийный Фонд — 10 лет" className={styles.logoImg}/>
          </a>

          {/* МЕНЮ (десктоп) */}
          <div className={`${styles.menu} nav-menu-wrap`}>
            {NAV_ITEMS.map(item => (
                <a key={item.href} href={item.href} className={styles.link}
                   style={item.gold ? { color: 'var(--gf-gold-400)', fontWeight: 700 } : undefined}>
                  {t(item.k)}
                </a>
            ))}
          </div>

          {/* ПРАВАЯ ЧАСТЬ (десктоп): телефон → языки → старый сайт */}
          <div className={styles.right}>
            <a className={styles.phone} href={`tel:${PHONE.replace(/[^\d+]/g, '')}`}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"/>
              </svg>
              <span>{PHONE}</span>
            </a>

            <div className={styles.langWrap}>
              {LANGS.map(({ code, label }) => (
                  <button key={code}
                          className={`${styles.langBtn} ${lang === code ? styles.active : ''}`}
                          onClick={() => setLang(code)}>
                    {label}
                  </button>
              ))}
            </div>

            <a className={styles.oldSite} href={OLD_SITE} target="_blank" rel="noopener noreferrer">
              {t('nav_old_site')}
            </a>
          </div>

          {/* БУРГЕР (мобильный) */}
          <button className={`${styles.burger} ${open ? styles.burgerOpen : ''}`}
                  onClick={() => setOpen(o => !o)}
                  aria-label="Меню"
                  aria-expanded={open}>
            <span/><span/><span/>
          </button>
        </div>

        {/* МОБИЛЬНОЕ ВЫПАДАЮЩЕЕ МЕНЮ */}
        <div className={`${styles.mobilePanel} ${open ? styles.mobileOpen : ''}`}>
          <div className={styles.mobileLinks}>
            {NAV_ITEMS.map(item => (
                <a key={item.href}
                   href={item.href}
                   className={styles.mobileLink}
                   style={item.gold ? { color: 'var(--gf-gold-400)', fontWeight: 700 } : undefined}
                   onClick={() => setOpen(false)}>
                  {t(item.k)}
                </a>
            ))}
          </div>

          <div className={styles.mobileFoot}>
            <a className={styles.phoneMobile} href={`tel:${PHONE.replace(/[^\d+]/g, '')}`}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"/>
              </svg>
              <span>{PHONE}</span>
            </a>

            <div className={styles.langWrapMobile}>
              {LANGS.map(({ code, label }) => (
                  <button key={code}
                          className={`${styles.langBtn} ${lang === code ? styles.active : ''}`}
                          onClick={() => setLang(code)}>
                    {label}
                  </button>
              ))}
            </div>

            <a className={styles.oldSiteMobile} href={OLD_SITE} target="_blank" rel="noopener noreferrer">
              {t('nav_old_site')}
            </a>
          </div>
        </div>
      </nav>
  )
}
