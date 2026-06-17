'use client'
import { useState } from 'react'
import { useLangContext } from '@/context/LangContext'
import type { CityView } from '@/types'
import { KG_MAP_BASE64 } from './mapBase64'
import styles from './MapSection.module.css'

const CITY_POS: Record<string, { left: number; top: number }> = {
  bishkek: { left: 48.7, top: 13.4 },
  talas:   { left: 29.3, top: 20.9 },
  karakol: { left: 80.1, top: 21.5 },
  naryn:   { left: 60.2, top: 44.0 },
  osh:     { left: 33.9, top: 63.6 },
  manas:   { left: 35.1, top: 52.0 },
  batken:  { left: 16.5, top: 77.1 },
}

const ROUTES = [
  { id: 'r-talas',   x1: 48.7, y1: 13.4, x2: 29.3, y2: 20.9 },
  { id: 'r-karakol', x1: 48.7, y1: 13.4, x2: 80.1, y2: 21.5 },
  { id: 'r-naryn',   x1: 48.7, y1: 13.4, x2: 60.2, y2: 44.0 },
  { id: 'r-manas',   x1: 48.7, y1: 13.4, x2: 35.1, y2: 52.0 },
  { id: 'r-osh',     x1: 48.7, y1: 13.4, x2: 33.9, y2: 63.6 },
  { id: 'r-batken',  x1: 48.7, y1: 13.4, x2: 16.5, y2: 77.1 },
]

const HQ: Record<string, string> = { ru: 'Головной офис', ky: 'Башкы офис', en: 'Head Office' }
const BR: Record<string, string> = { ru: 'Филиал', ky: 'Филиал', en: 'Branch' }
const EYEBROW: Record<string, string> = { ru: 'СЕТЬ ПРИСУТСТВИЯ', ky: 'КАТЫШУУ ТАРМАГЫ', en: 'BRANCH NETWORK' }
const TITLE1: Record<string, string> = { ru: 'Семь городов.', ky: 'Жети шаар.', en: 'Seven cities.' }
const TITLE2: Record<string, string> = { ru: 'Один стандарт работы.', ky: 'Бир иш стандарты.', en: 'One standard of work.' }
const PANEL_EYEBROW: Record<string, string> = { ru: 'Филиалы фонда', ky: 'Фонддун филиалдары', en: 'Fund branches' }
const PANEL_TITLE: Record<string, string> = { ru: 'Семь городов.\nОдин стандарт работы.', ky: 'Жети шаар.\nБир иш стандарты.', en: 'Seven cities.\nOne standard of work.' }
const ALL: Record<string, string> = { ru: 'Все филиалы', ky: 'Бардык филиалдар', en: 'All branches' }
const HQ_TAG: Record<string, string> = { ru: 'Головной офис', ky: 'Башкы офис', en: 'Head Office' }

export default function MapSection() {
  const { lang, cities } = useLangContext()
  const [active, setActive] = useState<CityView | undefined>(cities[0])

  const l = lang

  if (!cities.length || !active) return null

  return (
      <section className={styles.section} id="branches">

        <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 5% 40px' }}>
          <div className="eyebrow">{EYEBROW[l]}</div>
          <h2 className="sec-title" style={{ marginBottom: 0 }}>
            {TITLE1[l]}<br />
            <span style={{ color: 'var(--blue2)' }}>{TITLE2[l]}</span>
          </h2>
        </div>

        <div className={styles.grid}>

          <div className={styles.mapContainer}>
            <div className={styles.mapHeader}>
              <div style={{ visibility: 'hidden', width: 1 }} />
              <div className={styles.coords}>41°N – 43°N · KGZ TERRITORY</div>
            </div>

            <div className={styles.mapWrap}>
              <img src={KG_MAP_BASE64} alt="Карта Кыргызстана" className={styles.mapImg} draggable={false} />

              <svg className={styles.routeSvg} viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
                <defs>
                  <filter id="lglow" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur stdDeviation="1.2" result="b" />
                    <feMerge><feMergeNode in="b" /><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
                  </filter>
                  <filter id="dotglow" x="-100%" y="-100%" width="300%" height="300%">
                    <feGaussianBlur stdDeviation="0.8" result="b" />
                    <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
                  </filter>
                </defs>
                {ROUTES.map(r => (
                    <line key={r.id} x1={r.x1} y1={r.y1} x2={r.x2} y2={r.y2}
                          stroke="rgba(201,168,76,0.85)" strokeWidth="2.1"
                          filter="url(#lglow)" vectorEffect="non-scaling-stroke" />
                ))}
                {ROUTES.map((r, i) => (
                    <circle key={`dot-${r.id}`} r="0.35" fill="#f0d060" opacity="1"
                            filter="url(#dotglow)" vectorEffect="non-scaling-stroke">
                      <animateMotion dur={`${7.0 + i * 1.0}s`} repeatCount="indefinite"
                                     begin={`${i * 0.65}s`} path={`M${r.x1},${r.y1} L${r.x2},${r.y2}`} />
                    </circle>
                ))}
              </svg>

              {cities.map(city => {
                const pos = CITY_POS[city.id]
                if (!pos) return null
                const isActive = active.id === city.id
                const name = city.name[l] || city.name.ru

                return (
                    <button key={city.id}
                            className={[styles.cityMarker, city.isMain ? styles.cityMain : '', isActive && !city.isMain ? styles.cityActive : ''].join(' ')}
                            style={{ left: `${pos.left}%`, top: `${pos.top}%` }}
                            onClick={() => setActive(city)}
                            title={name}
                    >
                      {city.isMain ? (
                          <>
                            <span className={styles.glowOrb} />
                            <span className={styles.ring1} />
                            <span className={styles.ring2} />
                            <span className={styles.mainDot} />
                            <span className={styles.mainDotCore} />
                            <span className={styles.mainLabel}>
                        <span className={styles.mainLabelName}>{name.toUpperCase()}</span>
                        <span className={styles.mainLabelSub}>{HQ[l].toUpperCase()}</span>
                      </span>
                          </>
                      ) : (
                          <>
                            <span className={styles.cityRing} />
                            <span className={styles.cityDot} />
                            <span className={styles.cityLabel}>{name.toUpperCase()}</span>
                          </>
                      )}
                    </button>
                )
              })}

              <div className={styles.compass} aria-hidden="true">
                <svg viewBox="-35 -35 70 70" width="50" height="50">
                  <circle r="30" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" />
                  <polygon points="0,-22 -4,-8 0,-13 4,-8" fill="#f5d060" />
                  <polygon points="0,22 -4,8 0,13 4,8" fill="rgba(255,255,255,0.4)" />
                  <line x1="-22" y1="0" x2="22" y2="0" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" />
                  <text y="-26" textAnchor="middle" fontSize="11" fill="rgba(255,255,255,0.7)" fontFamily="monospace" fontWeight="700">N</text>
                </svg>
              </div>
            </div>

            <div className={styles.mapFooter}>
              <div className={styles.mfLeft}>
                <span className={styles.mfBadge}>{active.code}</span>
                <div>
                  <div className={styles.mfCity}>
                    {active.name[l] || active.name.ru}
                    <span>{active.isMain ? HQ[l].toUpperCase() : BR[l].toUpperCase()}</span>
                  </div>
                  <div className={styles.mfSub}>{active.region[l] || active.region.ru}</div>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.panel}>
            <div className={styles.mpEyebrow}>{PANEL_EYEBROW[l]}</div>
            <div className={styles.mpTitle}>
              {PANEL_TITLE[l].split('\n').map((line, i) => (
                  <span key={i}>{line}{i === 0 && <br />}</span>
              ))}
            </div>
            <div className={styles.branchList}>
              {cities.map(city => (
                  <div key={city.id}
                       className={`${styles.branchItem} ${active.id === city.id ? styles.branchActive : ''}`}
                       onClick={() => setActive(city)}
                  >
                    <div className={styles.biLeft}>
                      <span className={styles.biDot} />
                      <span className={styles.biName}>{city.name[l] || city.name.ru}</span>
                      {city.isMain && <span className={styles.biTag}>{HQ_TAG[l]}</span>}
                    </div>
                    <span className={styles.biCode}>{city.code}</span>
                  </div>
              ))}
            </div>
            <div className={styles.mpAllLink}>
              <span>{ALL[l]}</span>
              <span>↗</span>
            </div>
          </div>

        </div>
      </section>
  )
}