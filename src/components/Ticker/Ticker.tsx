'use client'
import { useLangContext } from '@/context/LangContext'
import { formatNum } from '@/lib/format'
import styles from './Ticker.module.css'

export default function Ticker() {
    const { t, stats } = useLangContext()

    const ITEMS = [
        { num: formatNum(stats.guaranteesCount),         lbl: t('ticker_1') },
        { num: `${formatNum(stats.guaranteesSum)} млрд`, lbl: t('ticker_2') },
        { num: `${formatNum(stats.loansSum)} млрд`,      lbl: t('ticker_3') },
        { num: `${formatNum(stats.repayRate)}%`,         lbl: t('ticker_4') },
        { num: formatNum(stats.years),                   lbl: t('ticker_5') },
        { num: formatNum(stats.branches),                lbl: t('ticker_6') },
        { num: formatNum(stats.partnersCount),           lbl: t('ticker_7') },
    ]

    return (
        <div className={styles.ticker}>
            <div className={styles.track}>
                {[...ITEMS, ...ITEMS].map((item, i) => (
                    <div key={i} className={styles.item}>
                        <span className={styles.num}>{item.num}</span>
                        <span className={styles.lbl}>{item.lbl}</span>
                    </div>
                ))}
            </div>
        </div>
    )
}