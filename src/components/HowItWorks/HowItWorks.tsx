'use client'
import { useState } from 'react'
import { useLangContext } from '@/context/LangContext'
import { formatNum } from '@/lib/format'
import styles from './HowItWorks.module.css'

export default function HowItWorks() {
  const { t, stats } = useLangContext()
  const [active, setActive] = useState(0)

  const STEPS = [
    { title: t('step1_title'), text: t('step1_text') },
    { title: t('step2_title'), text: t('step2_text') },
    { title: t('step3_title'), text: t('step3_text') },
    { title: t('step4_title'), text: t('step4_text') },
  ]

  const CARDS = [
    { icon: '📋', num: formatNum(stats.guaranteesCount),         lbl: t('how_stat1_lbl') },
    { icon: '💎', num: `${formatNum(stats.guaranteesSum)} млрд`, lbl: t('how_stat2_lbl') },
    { icon: '🏦', num: `${formatNum(stats.loansSum)} млрд`,      lbl: t('how_stat3_lbl') },
    { icon: '📍', num: formatNum(stats.regionsCovered),          lbl: t('how_stat4_lbl') },
  ]

  return (
      <section className={`sec ${styles.section}`} id="how">
        <div className={`${styles.grid} two-col`}>
          <div className="reveal-l">
            <div className="eyebrow">{t('how_eyebrow')}</div>
            <h2 className="sec-title">{t('how_title')}</h2>
            <p className="sec-sub">{t('how_sub')}</p>
            <div className={styles.steps}>
              {STEPS.map((s, i) => (
                  <div key={i}
                       className={`${styles.step} ${active === i ? styles.stepActive : ''}`}
                       onClick={() => setActive(i)}>
                    <div className={styles.num}>0{i + 1}</div>
                    <div>
                      <div className={styles.stepTitle}>{s.title}</div>
                      <p className={styles.stepText}>{s.text}</p>
                    </div>
                  </div>
              ))}
            </div>
          </div>

          <div className="reveal-r">
            <div className={styles.visual}>
              <div className={styles.hvBg}/>
              <div className={styles.hvTop}>
                <div className={styles.hvTag}>{t('how_tag')}</div>
                <div className={styles.hvTitle}>{t('how_visual_title')}</div>
                <div className={styles.hvBar}>
                  <div className={styles.hvFill}/>
                </div>
              </div>
              <div className={`${styles.hvCards} two-col`}>
                {CARDS.map(c => (
                    <div key={c.lbl} className={styles.hvc}>
                      <div className={styles.hvcIcon}>{c.icon}</div>
                      <div className={styles.hvcNum}>{c.num}</div>
                      <div className={styles.hvcLbl}>{c.lbl}</div>
                    </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
  )
}