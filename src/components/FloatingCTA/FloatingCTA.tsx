'use client'
import { useLangContext } from '@/context/LangContext'
import styles from './FloatingCTA.module.css'

export default function FloatingCTA() {
  const { settings, t } = useLangContext()
  const phone = settings.phoneShort || settings.phone || '7500'
  const ctaText = settings.floatingCtaText || t('contact_submit') || 'Оставить заявку'

  return (
    <div className={styles.wrap}>
      <a className={`${styles.btn} ${styles.gold}`} href={`tel:${phone.replace(/[^\d+]/g, '')}`}>
        <div className={styles.icon}>📞</div><span>{phone}</span>
      </a>
      <button className={styles.btn} onClick={()=>document.querySelector('#contact')?.scrollIntoView({behavior:'smooth'})}>
        <div className={styles.icon}>✉️</div><span>{ctaText}</span>
      </button>
    </div>
  )
}
