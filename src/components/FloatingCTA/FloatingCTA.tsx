'use client'
import styles from './FloatingCTA.module.css'

export default function FloatingCTA() {
  return (
    <div className={styles.wrap}>
      <a className={`${styles.btn} ${styles.gold}`} href="tel:7500">
        <div className={styles.icon}>📞</div><span>7500</span>
      </a>
      <button className={styles.btn} onClick={()=>document.querySelector('#contact')?.scrollIntoView({behavior:'smooth'})}>
        <div className={styles.icon}>✉️</div><span>Оставить заявку</span>
      </button>
    </div>
  )
}
