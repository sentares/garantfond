'use client'
import { useState }       from 'react'
import { useLangContext } from '@/context/LangContext'
import styles             from './Calculator.module.css'

export default function Calculator() {
  const { t, calculator } = useLangContext()
  const currencies = calculator.currencies.length ? calculator.currencies : ['KGS']
  const [cur, setCur]       = useState<string>(currencies[0])
  const [amount, setAmount] = useState(calculator.defaultAmount)
  const [term, setTerm]     = useState(calculator.defaultTerm)

  const coverRatio = calculator.guaranteePct / 100
  const guar     = (amount * coverRatio).toFixed(2)
  const fee      = Math.round(amount * coverRatio * 1e6 * (calculator.annualFeePct / 100)).toLocaleString('ru-RU')
  const curLabel = cur === 'KGS' ? 'сом' : cur

  return (
      <section className={`sec ${styles.section}`} id="calculator">
        <div className={`${styles.grid} two-col`}>
          <div className="reveal-l">
            <div className="eyebrow" style={{ color: 'rgba(255,255,255,.6)' }}>{t('calc_eyebrow')}</div>
            <h2 className="sec-title light">{t('calc_title')}</h2>
            <div className={styles.perks}>
              {[t('calc_perk1'), t('calc_perk2'), t('calc_perk3')].map(p => (
                  <div key={p} className={styles.perk}>
                    <div className={styles.perkDot}>
                      <svg viewBox="0 0 24 24" width="11" height="11" stroke="#fff" fill="none" strokeWidth="2.5">
                        <polyline points="20 6 9 17 4 12"/>
                      </svg>
                    </div>
                    {p}
                  </div>
              ))}
            </div>
          </div>
          <div className={`${styles.right} reveal-r`}>
            <div className={styles.curTabs}>
              {currencies.map(c => (
                  <button key={c} className={`${styles.ctab} ${cur === c ? styles.ctabOn : ''}`}
                          onClick={() => setCur(c)}>{c}</button>
              ))}
            </div>
            <div className={styles.label}>
              {t('calc_amount')}<strong>{amount.toFixed(1)} млн {curLabel}</strong>
            </div>
            <input type="range" className={styles.slider}
                   min={calculator.minAmount} max={calculator.maxAmount} step={calculator.stepAmount}
                   value={amount} onChange={e => setAmount(+e.target.value)}/>
            <div className={styles.label}>
              {t('calc_term')}<strong>{term} {t('calc_months')}</strong>
            </div>
            <input type="range" className={styles.slider}
                   min={calculator.minTerm} max={calculator.maxTerm} step={calculator.stepTerm}
                   value={term} onChange={e => setTerm(+e.target.value)}/>
            <div className={styles.result}>
              <div>
                <div className={styles.rlbl}>{t('calc_guar')}</div>
                <div className={styles.rval}>{guar} млн</div>
                <div className={styles.rsub}>{t('calc_cover')}</div>
              </div>
              <div>
                <div className={styles.rlbl}>{t('calc_fee')}</div>
                <div className={styles.rval}>{fee}</div>
                <div className={styles.rsub}>{t('calc_rate')}</div>
              </div>
            </div>
            <p className={styles.disc}>{t('calc_disc')}</p>
          </div>
        </div>
      </section>
  )
}