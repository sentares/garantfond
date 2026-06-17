'use client'
import { useLangContext } from '@/context/LangContext'
import styles from './Ticker.module.css'

export default function Ticker() {
    const { t } = useLangContext()

    const ITEMS = [
        { num: '21 129',    lbl: t('ticker_1') },
        { num: '18,2 млрд', lbl: t('ticker_2') },
        { num: '54,8 млрд', lbl: t('ticker_3') },
        { num: '98,22%',    lbl: t('ticker_4') },
        { num: '10',        lbl: t('ticker_5') },
        { num: '7',         lbl: t('ticker_6') },
        { num: '28',        lbl: t('ticker_7') },
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