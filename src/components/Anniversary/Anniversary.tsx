'use client'
import { useEffect, useRef } from 'react'
import { useLangContext }    from '@/context/LangContext'
import styles                from './Anniversary.module.css'

const DOT_COLORS = ['#C42020','#D04818','#DC7010','#1B3E8F','#2455B0','#3068D0']

// Тексты секции встроены прямо здесь (3 языка), чтобы не зависеть от внешнего словаря
const TEXT = {
  ru: {
    badge: '🎉 Юбилейный год · 2016–2026',
    title1: 'Десять лет',
    title2: 'на службе',
    title3: 'предпринимателей',
    quote: '«За десять лет мы научились видеть в каждой заявке не цифру, а судьбу. Эта оптика и есть наш капитал.»',
    quoteSrc: '— Из обращения председателя правления',
    btn: 'Смотреть юбилейный спецпроект →',
    tlTitle: 'Ключевые вехи',
    tl: [
      { year: 2016, tag: 'Учреждение',         desc: 'Распоряжение Правительства КР. Уставный капитал — 72 млн сом.' },
      { year: 2018, tag: '1000-я гарантия',    desc: 'Пройдена отметка в 1 000 выданных гарантий.' },
      { year: 2020, tag: 'COVID-программа',     desc: 'Антикризисная поддержка МСБ: отсрочки, переоформление.' },
      { year: 2022, tag: 'Программа «Келечек»', desc: 'Запуск гарантий для женского предпринимательства.' },
      { year: 2024, tag: '50 млрд сом',         desc: 'Совокупный объём обеспеченных кредитов превысил 50 млрд сом.' },
      { year: 2026, tag: '10-летие',            desc: 'Юбилейный год: 18,2 млрд сом гарантий, 7 филиалов, 28 партнёров.' },
    ],
  },
  ky: {
    badge: '🎉 Юбилей жылы · 2016–2026',
    title1: 'Он жыл',
    title2: 'ишкерлерге',
    title3: 'кызмат кылып',
    quote: '«Он жылда биз ар бир арызда сандан эмес, тагдырды көрүүнү үйрөндүк. Ушул көз караш — биздин капитал.»',
    quoteSrc: '— Башкарма төрагасынын кайрылуусунан',
    btn: 'Юбилей долбоорун көрүү →',
    tlTitle: 'Негизги вехалар',
    tl: [
      { year: 2016, tag: 'Негизделген',          desc: 'КР Өкмөтүнүн буйругу. Уставдык капитал — 72 млн сом.' },
      { year: 2018, tag: '1000-чи кепилдик',      desc: '1 000 берилген кепилдик чегинен өтүлдү.' },
      { year: 2020, tag: 'COVID-программа',        desc: 'ОКБ үчүн кризиске каршы колдоо: мөөнөттөрдү узартуу.' },
      { year: 2022, tag: '«Келечек» программасы', desc: 'Аял ишкерчилиги үчүн кепилдиктердин ишке кириши.' },
      { year: 2024, tag: '50 млрд сом',            desc: 'Камсыздалган кредиттердин көлөмү 50 млрд сомдон ашты.' },
      { year: 2026, tag: '10 жылдык',             desc: 'Юбилей жылы: 18,2 млрд сом кепилдик, 7 филиал, 28 өнөктөш.' },
    ],
  },
  en: {
    badge: '🎉 Anniversary Year · 2016–2026',
    title1: 'Ten years',
    title2: 'serving',
    title3: 'entrepreneurs',
    quote: '"Over ten years we learned to see not a number in each application, but a destiny. This vision is our capital."',
    quoteSrc: "— From the Chairman's address",
    btn: 'View anniversary project →',
    tlTitle: 'Key milestones',
    tl: [
      { year: 2016, tag: 'Founded',              desc: 'Decree of the Government of KR. Charter capital — 72M som.' },
      { year: 2018, tag: '1000th guarantee',     desc: 'Passed the milestone of 1,000 guarantees issued.' },
      { year: 2020, tag: 'COVID Programme',       desc: 'Anti-crisis support for SMEs: deferrals, restructuring.' },
      { year: 2022, tag: '"Kelechek" Programme', desc: 'Launch of guarantees for women entrepreneurs.' },
      { year: 2024, tag: '50B som',               desc: 'Total volume of supported loans exceeded 50B som.' },
      { year: 2026, tag: '10th Anniversary',     desc: 'Jubilee year: 18.2B som in guarantees, 7 branches, 28 partners.' },
    ],
  },
} as const

export default function Anniversary() {
  const { lang } = useLangContext()
  const starsRef = useRef<HTMLDivElement>(null)

  // если lang вдруг не из набора — берём ru
  const tx = TEXT[lang as keyof typeof TEXT] ?? TEXT.ru

  useEffect(() => {
    const c = starsRef.current
    if (!c) return
    for (let i = 0; i < 80; i++) {
      const d = document.createElement('div')
      d.className = styles.star
      const s = Math.random() * 2.5 + 0.5
      d.style.cssText = `width:${s}px;height:${s}px;left:${Math.random()*100}%;top:${Math.random()*100}%;animation-duration:${Math.random()*4+2}s;animation-delay:${Math.random()*5}s;opacity:${Math.random()*.3+.05}`
      c.appendChild(d)
    }
  }, [])

  return (
      <section className={`sec ${styles.ann}`} id="anniversary">
        <div className={styles.glow}/>
        <div ref={starsRef} className={styles.stars}/>
        <div className={styles.inner}>
          <div className={`${styles.grid} two-col reveal`}>
            <div>
              <span className={styles.badge}>{tx.badge}</span>
              <h2 className={styles.title}>
                {tx.title1}<br/>
                <em>{tx.title2}<br/>{tx.title3}</em>
              </h2>
              <div className={styles.quote}>
                <p className={styles.quoteText}>{tx.quote}</p>
                <p className={styles.quoteSrc}>{tx.quoteSrc}</p>
              </div>
              <button className="btn-blue"
                      onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}>
                {tx.btn}
              </button>
            </div>

            {/* ===== БОЛЬШАЯ «10» — как в HeroTen ===== */}
            <div className={styles.decade}>
              <div className={styles.annTen}>
                <div className={styles.annGlow}/>

                <div className={styles.dragonWrap}>

                  <svg className={styles.dragonSvg} viewBox="0 0 560 560" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                      <linearGradient id="aDRed" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%"   stopColor="#C42020" stopOpacity="0"/>
                        <stop offset="20%"  stopColor="#C42020" stopOpacity=".9"/>
                        <stop offset="50%"  stopColor="#e05030" stopOpacity="1"/>
                        <stop offset="80%"  stopColor="#C42020" stopOpacity=".9"/>
                        <stop offset="100%" stopColor="#C42020" stopOpacity="0"/>
                      </linearGradient>
                      <linearGradient id="aDGold" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%"   stopColor="#C9A84C" stopOpacity="0"/>
                        <stop offset="20%"  stopColor="#f5d060" stopOpacity=".95"/>
                        <stop offset="50%"  stopColor="#ffe070" stopOpacity="1"/>
                        <stop offset="80%"  stopColor="#f5d060" stopOpacity=".95"/>
                        <stop offset="100%" stopColor="#C9A84C" stopOpacity="0"/>
                      </linearGradient>
                      <linearGradient id="aDBlue" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%"   stopColor="#1B3E8F" stopOpacity="0"/>
                        <stop offset="20%"  stopColor="#1B3E8F" stopOpacity=".9"/>
                        <stop offset="50%"  stopColor="#2455B0" stopOpacity="1"/>
                        <stop offset="80%"  stopColor="#1B3E8F" stopOpacity=".9"/>
                        <stop offset="100%" stopColor="#1B3E8F" stopOpacity="0"/>
                      </linearGradient>
                      <filter id="aDr">
                        <feGaussianBlur stdDeviation="1.8" result="b"/>
                        <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
                      </filter>
                      <filter id="aDrS">
                        <feGaussianBlur stdDeviation="3" result="b"/>
                        <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
                      </filter>
                    </defs>

                    <g>
                      <animateTransform attributeName="transform" type="rotate"
                                        from="0 280 280" to="360 280 280" dur="10s" repeatCount="indefinite"/>
                      <ellipse cx="280" cy="280" rx="190" ry="68" fill="none"
                               stroke="url(#aDRed)" strokeWidth="7" strokeDasharray="240 108"
                               filter="url(#aDr)" transform="rotate(20,280,280)"/>
                      <ellipse cx="280" cy="280" rx="190" ry="68" fill="none"
                               stroke="url(#aDRed)" strokeWidth="3" strokeDasharray="240 108"
                               strokeDashoffset="160" opacity=".5" transform="rotate(20,280,280)"/>
                      <circle cx="490" cy="280" r="3.5" fill="#e05030" opacity=".9"
                              filter="url(#aDr)" transform="rotate(20,280,280)"/>
                      <circle cx="70" cy="280" r="2.5" fill="#C42020" opacity=".7"
                              transform="rotate(20,280,280)"/>
                    </g>

                    <g>
                      <animateTransform attributeName="transform" type="rotate"
                                        from="360 280 280" to="0 280 280" dur="14s" repeatCount="indefinite"/>
                      <ellipse cx="280" cy="280" rx="175" ry="76" fill="none"
                               stroke="url(#aDGold)" strokeWidth="8" strokeDasharray="265 90"
                               filter="url(#aDrS)" transform="rotate(-30,280,280)"/>
                      <ellipse cx="280" cy="280" rx="175" ry="76" fill="none"
                               stroke="url(#aDGold)" strokeWidth="3" strokeDasharray="120 235"
                               strokeDashoffset="55" opacity=".6" transform="rotate(-30,280,280)"/>
                      <circle cx="475" cy="280" r="4" fill="#ffe070" opacity=".95"
                              filter="url(#aDrS)" transform="rotate(-30,280,280)"/>
                      <circle cx="85" cy="280" r="2.5" fill="#f5d060" opacity=".7"
                              transform="rotate(-30,280,280)"/>
                    </g>

                    <g>
                      <animateTransform attributeName="transform" type="rotate"
                                        from="0 280 280" to="360 280 280" dur="18s" repeatCount="indefinite"/>
                      <ellipse cx="280" cy="280" rx="200" ry="52" fill="none"
                               stroke="url(#aDBlue)" strokeWidth="6" strokeDasharray="215 135"
                               filter="url(#aDr)" transform="rotate(50,280,280)"/>
                      <ellipse cx="280" cy="280" rx="200" ry="52" fill="none"
                               stroke="url(#aDBlue)" strokeWidth="2.5" strokeDasharray="95 255"
                               strokeDashoffset="80" opacity=".5" transform="rotate(50,280,280)"/>
                      <circle cx="500" cy="280" r="3" fill="#2455B0" opacity=".9"
                              filter="url(#aDr)" transform="rotate(50,280,280)"/>
                      <circle cx="60" cy="280" r="2" fill="#1B3E8F" opacity=".7"
                              transform="rotate(50,280,280)"/>
                    </g>
                  </svg>

                  <div className={styles.innerStack}>
                    <div className={styles.centerNum}>10</div>
                  </div>

                  <svg className={styles.centerLines} viewBox="0 0 560 560" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                      <linearGradient id="aclGold" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%"   stopColor="#C9A84C" stopOpacity="0"/>
                        <stop offset="50%"  stopColor="#f5d060" stopOpacity="1"/>
                        <stop offset="100%" stopColor="#C9A84C" stopOpacity="0"/>
                      </linearGradient>
                      <linearGradient id="aclRed" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%"   stopColor="#C42020" stopOpacity="0"/>
                        <stop offset="50%"  stopColor="#e05030" stopOpacity=".9"/>
                        <stop offset="100%" stopColor="#C42020" stopOpacity="0"/>
                      </linearGradient>
                      <linearGradient id="aclBlue" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%"   stopColor="#2455B0" stopOpacity="0"/>
                        <stop offset="50%"  stopColor="#4a80e0" stopOpacity=".9"/>
                        <stop offset="100%" stopColor="#2455B0" stopOpacity="0"/>
                      </linearGradient>
                      <linearGradient id="aclWhite" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%"   stopColor="#fff" stopOpacity="0"/>
                        <stop offset="50%"  stopColor="#fff" stopOpacity=".55"/>
                        <stop offset="100%" stopColor="#fff" stopOpacity="0"/>
                      </linearGradient>
                      <filter id="aclGlow">
                        <feGaussianBlur stdDeviation="2.5" result="b"/>
                        <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
                      </filter>
                    </defs>

                    <g filter="url(#aclGlow)">
                      <animateTransform attributeName="transform" type="rotate"
                                        from="0 280 280" to="360 280 280" dur="22s" repeatCount="indefinite"/>
                      <line x1="40"  y1="280" x2="520" y2="280" stroke="url(#aclGold)" strokeWidth="1.2"/>
                      <line x1="280" y1="40"  x2="280" y2="520" stroke="url(#aclGold)" strokeWidth="1.2"/>
                      <line x1="111" y1="111" x2="449" y2="449" stroke="url(#aclGold)" strokeWidth=".9" opacity=".7"/>
                      <line x1="449" y1="111" x2="111" y2="449" stroke="url(#aclGold)" strokeWidth=".9" opacity=".7"/>
                      <line x1="65"  y1="178" x2="495" y2="382" stroke="url(#aclGold)" strokeWidth=".6" opacity=".45"/>
                      <line x1="65"  y1="382" x2="495" y2="178" stroke="url(#aclGold)" strokeWidth=".6" opacity=".45"/>
                      <circle cx="280" cy="280" r="5" fill="#f5d060" opacity=".9"/>
                    </g>

                    <g>
                      <animateTransform attributeName="transform" type="rotate"
                                        from="360 280 280" to="0 280 280" dur="30s" repeatCount="indefinite"/>
                      <line x1="70"  y1="200" x2="490" y2="360" stroke="url(#aclRed)"  strokeWidth="1.4" opacity=".7"/>
                      <line x1="70"  y1="360" x2="490" y2="200" stroke="url(#aclBlue)" strokeWidth="1.4" opacity=".7"/>
                      <line x1="200" y1="40"  x2="360" y2="520" stroke="url(#aclRed)"  strokeWidth="1"   opacity=".5"/>
                      <line x1="360" y1="40"  x2="200" y2="520" stroke="url(#aclBlue)" strokeWidth="1"   opacity=".5"/>
                    </g>

                    <g opacity=".35">
                      <animateTransform attributeName="transform" type="rotate"
                                        from="0 280 280" to="360 280 280" dur="16s" repeatCount="indefinite"/>
                      <line x1="40"  y1="225" x2="520" y2="335" stroke="url(#aclWhite)" strokeWidth=".7"/>
                      <line x1="40"  y1="335" x2="520" y2="225" stroke="url(#aclWhite)" strokeWidth=".7"/>
                      <line x1="225" y1="40"  x2="335" y2="520" stroke="url(#aclWhite)" strokeWidth=".7"/>
                      <line x1="335" y1="40"  x2="225" y2="520" stroke="url(#aclWhite)" strokeWidth=".7"/>
                    </g>

                    <circle cx="280" cy="280" r="24" fill="none" stroke="rgba(201,168,76,.5)"  strokeWidth="1.5" className={styles.clP}/>
                    <circle cx="280" cy="280" r="44" fill="none" stroke="rgba(201,168,76,.25)" strokeWidth="1"   className={styles.clP} style={{animationDelay:'.6s'}}/>
                    <circle cx="280" cy="280" r="68" fill="none" stroke="rgba(201,168,76,.12)" strokeWidth=".8"  className={styles.clP} style={{animationDelay:'1.2s'}}/>
                  </svg>

                </div>
              </div>
            </div>
            {/* ===== /БОЛЬШАЯ «10» ===== */}
          </div>

          <div className="reveal">
            <div className={styles.tlTitle}>{tx.tlTitle}</div>
            <div className={`${styles.tlTrack} six-col`}>
              {tx.tl.map((item, i) => (
                  <div key={i} className={styles.tlItem}>
                    <div className={styles.tlDot}
                         style={{ background: DOT_COLORS[i], boxShadow: `0 0 10px ${DOT_COLORS[i]}80` }}/>
                    <div className={styles.tlYear}>{item.year}</div>
                    <div className={styles.tlTag}>{item.tag}</div>
                    <div className={styles.tlDesc}>{item.desc}</div>
                  </div>
              ))}
            </div>
          </div>
        </div>
      </section>
  )
}
