'use client'
import { useEffect, useRef } from 'react'
import { useLangContext }    from '@/context/LangContext'
import styles                from './Stats.module.css'

const GRADIENTS = [
  'linear-gradient(90deg,#C42020,#DC5C10)',
  'linear-gradient(90deg,#DC5C10,#C9A84C)',
  'linear-gradient(90deg,#1B3E8F,#2455B0)',
  'linear-gradient(90deg,#2455B0,#3066C8)',
]

function animCount(el: HTMLElement) {
  const tgt = parseInt(el.dataset.target || '0')
  const dur = 2000, start = performance.now()
  const step = (now: number) => {
    const p = Math.min((now - start) / dur, 1)
    const ease = 1 - Math.pow(1 - p, 3)
    el.textContent = Math.floor(ease * tgt).toLocaleString('ru')
    if (p < 1) requestAnimationFrame(step)
    else el.textContent = tgt.toLocaleString('ru')
  }
  requestAnimationFrame(step)
}

export default function Stats() {
  const { t } = useLangContext()
  const ref = useRef<HTMLDivElement>(null)

  const STATS = [
    { icon: '🏷️', target: 21129, suffix: '',       desc: t('stat1') },
    { icon: '💰', target: 18,    suffix: ' млрд',  desc: t('stat2') },
    { icon: '📈', target: 55,    suffix: ' млрд',  desc: t('stat3') },
    { icon: '✅', target: 98,    suffix: '%',       desc: t('stat4') },
  ]

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          el.querySelectorAll<HTMLElement>('.counting').forEach(animCount)
          obs.unobserve(el)
        }
      })
    }, { threshold: .3 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
      <div className={styles.wrap}>
        <div ref={ref} className={`${styles.float} reveal`}>
          {STATS.map((s, i) => (
              <div key={i} className={styles.cell}
                   style={{ '--grad': GRADIENTS[i] } as React.CSSProperties}>
                <div className={styles.icon}>{s.icon}</div>
                <div className={styles.value}>
                  <span className="counting" data-target={s.target}>0</span>
                  {s.suffix && <sup>{s.suffix}</sup>}
                </div>
                <div className={styles.desc}>{s.desc}</div>
              </div>
          ))}
        </div>
      </div>
  )
}