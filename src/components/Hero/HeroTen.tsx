'use client'
import styles from './Hero.module.css'

export default function HeroTen() {
  return (
      <div className={styles.ten}>
        <div className={styles.tenRing}/>
        <div className={styles.tenRing2}/>

        <svg className={styles.tenArc} viewBox="0 0 640 640" width="640" height="640" xmlns="http://www.w3.org/2000/svg">
          <circle cx="320" cy="320" r="295" fill="none" stroke="rgba(201,168,76,0.07)" strokeWidth="1" strokeDasharray="4 10"/>
          <circle cx="320" cy="320" r="265" fill="none" stroke="rgba(201,168,76,0.04)" strokeWidth="1"/>
          <circle cx="320" cy="22"  r="3.5" fill="rgba(201,168,76,.6)"/>
          <circle cx="590" cy="170" r="2.5" fill="rgba(201,168,76,.35)"/>
          <circle cx="590" cy="470" r="2.5" fill="rgba(201,168,76,.35)"/>
          <circle cx="320" cy="618" r="3.5" fill="rgba(201,168,76,.6)"/>
          <circle cx="50"  cy="470" r="2.5" fill="rgba(201,168,76,.35)"/>
          <circle cx="50"  cy="170" r="2.5" fill="rgba(201,168,76,.35)"/>
          <line x1="320" y1="22"  x2="320" y2="68"  stroke="rgba(201,168,76,.3)" strokeWidth="1.5"/>
          <line x1="320" y1="618" x2="320" y2="572" stroke="rgba(201,168,76,.3)" strokeWidth="1.5"/>
        </svg>

        <div className={styles.tenMain}>
          <div className={styles.dragonWrap}>

            <svg className={styles.dragonSvg} viewBox="0 0 560 560" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="dRed" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%"   stopColor="#C42020" stopOpacity="0"/>
                  <stop offset="20%"  stopColor="#C42020" stopOpacity=".9"/>
                  <stop offset="50%"  stopColor="#e05030" stopOpacity="1"/>
                  <stop offset="80%"  stopColor="#C42020" stopOpacity=".9"/>
                  <stop offset="100%" stopColor="#C42020" stopOpacity="0"/>
                </linearGradient>
                <linearGradient id="dGold" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%"   stopColor="#C9A84C" stopOpacity="0"/>
                  <stop offset="20%"  stopColor="#f5d060" stopOpacity=".95"/>
                  <stop offset="50%"  stopColor="#ffe070" stopOpacity="1"/>
                  <stop offset="80%"  stopColor="#f5d060" stopOpacity=".95"/>
                  <stop offset="100%" stopColor="#C9A84C" stopOpacity="0"/>
                </linearGradient>
                <linearGradient id="dBlue" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%"   stopColor="#1B3E8F" stopOpacity="0"/>
                  <stop offset="20%"  stopColor="#1B3E8F" stopOpacity=".9"/>
                  <stop offset="50%"  stopColor="#2455B0" stopOpacity="1"/>
                  <stop offset="80%"  stopColor="#1B3E8F" stopOpacity=".9"/>
                  <stop offset="100%" stopColor="#1B3E8F" stopOpacity="0"/>
                </linearGradient>
                <filter id="dr">
                  <feGaussianBlur stdDeviation="1.8" result="b"/>
                  <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
                </filter>
                <filter id="drS">
                  <feGaussianBlur stdDeviation="3" result="b"/>
                  <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
                </filter>
              </defs>

              <g>
                <animateTransform attributeName="transform" type="rotate"
                                  from="0 280 280" to="360 280 280" dur="10s" repeatCount="indefinite"/>
                <ellipse cx="280" cy="280" rx="190" ry="68" fill="none"
                         stroke="url(#dRed)" strokeWidth="7" strokeDasharray="240 108"
                         filter="url(#dr)" transform="rotate(20,280,280)"/>
                <ellipse cx="280" cy="280" rx="190" ry="68" fill="none"
                         stroke="url(#dRed)" strokeWidth="3" strokeDasharray="240 108"
                         strokeDashoffset="160" opacity=".5" transform="rotate(20,280,280)"/>
                <circle cx="490" cy="280" r="3.5" fill="#e05030" opacity=".9"
                        filter="url(#dr)" transform="rotate(20,280,280)"/>
                <circle cx="70" cy="280" r="2.5" fill="#C42020" opacity=".7"
                        transform="rotate(20,280,280)"/>
              </g>

              <g>
                <animateTransform attributeName="transform" type="rotate"
                                  from="360 280 280" to="0 280 280" dur="14s" repeatCount="indefinite"/>
                <ellipse cx="280" cy="280" rx="175" ry="76" fill="none"
                         stroke="url(#dGold)" strokeWidth="8" strokeDasharray="265 90"
                         filter="url(#drS)" transform="rotate(-30,280,280)"/>
                <ellipse cx="280" cy="280" rx="175" ry="76" fill="none"
                         stroke="url(#dGold)" strokeWidth="3" strokeDasharray="120 235"
                         strokeDashoffset="55" opacity=".6" transform="rotate(-30,280,280)"/>
                <circle cx="475" cy="280" r="4" fill="#ffe070" opacity=".95"
                        filter="url(#drS)" transform="rotate(-30,280,280)"/>
                <circle cx="85" cy="280" r="2.5" fill="#f5d060" opacity=".7"
                        transform="rotate(-30,280,280)"/>
              </g>

              <g>
                <animateTransform attributeName="transform" type="rotate"
                                  from="0 280 280" to="360 280 280" dur="18s" repeatCount="indefinite"/>
                <ellipse cx="280" cy="280" rx="200" ry="52" fill="none"
                         stroke="url(#dBlue)" strokeWidth="6" strokeDasharray="215 135"
                         filter="url(#dr)" transform="rotate(50,280,280)"/>
                <ellipse cx="280" cy="280" rx="200" ry="52" fill="none"
                         stroke="url(#dBlue)" strokeWidth="2.5" strokeDasharray="95 255"
                         strokeDashoffset="80" opacity=".5" transform="rotate(50,280,280)"/>
                <circle cx="500" cy="280" r="3" fill="#2455B0" opacity=".9"
                        filter="url(#dr)" transform="rotate(50,280,280)"/>
                <circle cx="60" cy="280" r="2" fill="#1B3E8F" opacity=".7"
                        transform="rotate(50,280,280)"/>
              </g>
            </svg>

            <div className={styles.innerStack}>
              <div className={styles.centerNum}>10</div>
            </div>

            <svg className={styles.centerLines} viewBox="0 0 560 560" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="clGold" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%"   stopColor="#C9A84C" stopOpacity="0"/>
                  <stop offset="50%"  stopColor="#f5d060" stopOpacity="1"/>
                  <stop offset="100%" stopColor="#C9A84C" stopOpacity="0"/>
                </linearGradient>
                <linearGradient id="clRed" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%"   stopColor="#C42020" stopOpacity="0"/>
                  <stop offset="50%"  stopColor="#e05030" stopOpacity=".9"/>
                  <stop offset="100%" stopColor="#C42020" stopOpacity="0"/>
                </linearGradient>
                <linearGradient id="clBlue" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%"   stopColor="#2455B0" stopOpacity="0"/>
                  <stop offset="50%"  stopColor="#4a80e0" stopOpacity=".9"/>
                  <stop offset="100%" stopColor="#2455B0" stopOpacity="0"/>
                </linearGradient>
                <linearGradient id="clWhite" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%"   stopColor="#fff" stopOpacity="0"/>
                  <stop offset="50%"  stopColor="#fff" stopOpacity=".55"/>
                  <stop offset="100%" stopColor="#fff" stopOpacity="0"/>
                </linearGradient>
                <filter id="clGlow">
                  <feGaussianBlur stdDeviation="2.5" result="b"/>
                  <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
                </filter>
              </defs>

              <g filter="url(#clGlow)">
                <animateTransform attributeName="transform" type="rotate"
                                  from="0 280 280" to="360 280 280" dur="22s" repeatCount="indefinite"/>
                <line x1="40"  y1="280" x2="520" y2="280" stroke="url(#clGold)" strokeWidth="1.2"/>
                <line x1="280" y1="40"  x2="280" y2="520" stroke="url(#clGold)" strokeWidth="1.2"/>
                <line x1="111" y1="111" x2="449" y2="449" stroke="url(#clGold)" strokeWidth=".9" opacity=".7"/>
                <line x1="449" y1="111" x2="111" y2="449" stroke="url(#clGold)" strokeWidth=".9" opacity=".7"/>
                <line x1="65"  y1="178" x2="495" y2="382" stroke="url(#clGold)" strokeWidth=".6" opacity=".45"/>
                <line x1="65"  y1="382" x2="495" y2="178" stroke="url(#clGold)" strokeWidth=".6" opacity=".45"/>
                <circle cx="280" cy="280" r="5" fill="#f5d060" opacity=".9"/>
              </g>

              <g>
                <animateTransform attributeName="transform" type="rotate"
                                  from="360 280 280" to="0 280 280" dur="30s" repeatCount="indefinite"/>
                <line x1="70"  y1="200" x2="490" y2="360" stroke="url(#clRed)"  strokeWidth="1.4" opacity=".7"/>
                <line x1="70"  y1="360" x2="490" y2="200" stroke="url(#clBlue)" strokeWidth="1.4" opacity=".7"/>
                <line x1="200" y1="40"  x2="360" y2="520" stroke="url(#clRed)"  strokeWidth="1"   opacity=".5"/>
                <line x1="360" y1="40"  x2="200" y2="520" stroke="url(#clBlue)" strokeWidth="1"   opacity=".5"/>
              </g>

              <g opacity=".35">
                <animateTransform attributeName="transform" type="rotate"
                                  from="0 280 280" to="360 280 280" dur="16s" repeatCount="indefinite"/>
                <line x1="40"  y1="225" x2="520" y2="335" stroke="url(#clWhite)" strokeWidth=".7"/>
                <line x1="40"  y1="335" x2="520" y2="225" stroke="url(#clWhite)" strokeWidth=".7"/>
                <line x1="225" y1="40"  x2="335" y2="520" stroke="url(#clWhite)" strokeWidth=".7"/>
                <line x1="335" y1="40"  x2="225" y2="520" stroke="url(#clWhite)" strokeWidth=".7"/>
              </g>

              <circle cx="280" cy="280" r="24" fill="none" stroke="rgba(201,168,76,.5)"  strokeWidth="1.5" className={styles.clP}/>
              <circle cx="280" cy="280" r="44" fill="none" stroke="rgba(201,168,76,.25)" strokeWidth="1"   className={styles.clP} style={{animationDelay:'.6s'}}/>
              <circle cx="280" cy="280" r="68" fill="none" stroke="rgba(201,168,76,.12)" strokeWidth=".8"  className={styles.clP} style={{animationDelay:'1.2s'}}/>
            </svg>

          </div>
        </div>
      </div>
  )
}