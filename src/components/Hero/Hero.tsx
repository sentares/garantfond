'use client'
import Particles           from './Particles'
import HeroTen             from './HeroTen'
import { useLangContext }  from '@/context/LangContext'
import styles              from './Hero.module.css'

export default function Hero() {
  const { t } = useLangContext()
  return (
      <section className={styles.hero}>
        <div className={styles.bg}/>
        <Particles/>
        <div className={`${styles.inner} hero-inner-grid`}>
          <div className={styles.left}>

            <h1 className={styles.h1}>
              {t('hero_title_1')}<br/>
              <span className={styles.gold}>{t('hero_gold')}</span> {t('hero_title_2')}
            </h1>
            <p className={styles.sub}>{t('hero_sub')}</p>
            <div className={styles.btns}>
              <button className={styles.btnBlue}
                      onClick={() => document.querySelector('#products')?.scrollIntoView({ behavior: 'smooth' })}>
                <span>{t('hero_btn1')}</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </button>
              <button className={styles.btnGhost}
                      onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}>
                {t('hero_btn2')}
              </button>
            </div>
          </div>
          <div className={`${styles.right} hero-right-col`}>
            <HeroTen/>
          </div>
        </div>
      </section>
  )
}