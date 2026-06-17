'use client'
import { useState } from 'react'
import { useLangContext } from '@/context/LangContext'
import type { CityView } from '@/types'
import { KG_MAP_BASE64 } from './mapBase64'
import styles from './MapSection.module.css'

const hasPos = (c: CityView) => c.posX !== null && c.posY !== null

export default function MapSection() {
  const { lang, cities, t, settings } = useLangContext()
  const [active, setActive] = useState<CityView | undefined>(cities[0])

  const l = lang
  if (!cities.length || !active) return null

  const main = cities.find(c => c.isMain && hasPos(c))
  const routes = main
    ? cities
        .filter(c => !c.isMain && hasPos(c))
        .map(c => ({ id: `r-${c.id}`, x1: main.posX as number, y1: main.posY as number, x2: c.posX as number, y2: c.posY as number }))
    : []

  const hqLabel = t('map_hq')
  const brLabel = t('map_branch')

  return (
      <section className={styles.section} id="branches">

        <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 5% 40px' }}>
          <div className="eyebrow">{t('map_eyebrow')}</div>
          <h2 className="sec-title" style={{ marginBottom: 0 }}>
            {t('map_title1')}<br />
            <span style={{ color: 'var(--blue2)' }}>{t('map_title2')}</span>
          </h2>
        </div>

        <div className={styles.grid}>

          <div className={styles.mapContainer}>
            <div className={styles.mapHeader}>
              <div style={{ visibility: 'hidden', width: 1 }} />
              <div className={styles.coords}>{settings.mapCoordsLabel || '41°N – 43°N · KGZ TERRITORY'}</div>
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
                {routes.map(r => (
                    <line key={r.id} x1={r.x1} y1={r.y1} x2={r.x2} y2={r.y2}
                          stroke="rgba(201,168,76,0.85)" strokeWidth="2.1"
                          filter="url(#lglow)" vectorEffect="non-scaling-stroke" />
                ))}
                {routes.map((r, i) => (
                    <circle key={`dot-${r.id}`} r="0.35" fill="#f0d060" opacity="1"
                            filter="url(#dotglow)" vectorEffect="non-scaling-stroke">
                      <animateMotion dur={`${7.0 + i * 1.0}s`} repeatCount="indefinite"
                                     begin={`${i * 0.65}s`} path={`M${r.x1},${r.y1} L${r.x2},${r.y2}`} />
                    </circle>
                ))}
              </svg>

              {cities.map(city => {
                if (!hasPos(city)) return null
                const isActive = active.id === city.id
                const name = city.name[l] || city.name.ru

                return (
                    <button key={city.id}
                            className={[styles.cityMarker, city.isMain ? styles.cityMain : '', isActive && !city.isMain ? styles.cityActive : ''].join(' ')}
                            style={{ left: `${city.posX}%`, top: `${city.posY}%` }}
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
                        <span className={styles.mainLabelSub}>{hqLabel.toUpperCase()}</span>
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
                    <span>{active.isMain ? hqLabel.toUpperCase() : brLabel.toUpperCase()}</span>
                  </div>
                  <div className={styles.mfSub}>{active.region[l] || active.region.ru}</div>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.panel}>
            <div className={styles.mpEyebrow}>{t('map_panel_eyebrow')}</div>
            <div className={styles.mpTitle}>
              <span>{t('map_title1')}<br /></span>
              <span>{t('map_title2')}</span>
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
                      {city.isMain && <span className={styles.biTag}>{hqLabel}</span>}
                    </div>
                    <span className={styles.biCode}>{city.code}</span>
                  </div>
              ))}
            </div>
            <div className={styles.mpAllLink}>
              <span>{t('map_all')}</span>
              <span>↗</span>
            </div>
          </div>

        </div>
      </section>
  )
}
