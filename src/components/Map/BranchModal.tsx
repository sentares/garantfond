'use client'
import { useEffect } from 'react'
import { useLangContext } from '@/context/LangContext'
import type { CityView, Lang } from '@/types'
import styles from './BranchModal.module.css'

const UI = {
  hq: { ru: 'Головной офис', ky: 'Башкы офис', en: 'Head Office' },
  branch: { ru: 'Филиал', ky: 'Филиал', en: 'Branch' },
  director: { ru: 'Руководитель', ky: 'Жетекчи', en: 'Director' },
  address: { ru: 'Адрес', ky: 'Дарек', en: 'Address' },
  phone: { ru: 'Телефон', ky: 'Телефон', en: 'Phone' },
  email: { ru: 'E-mail', ky: 'E-mail', en: 'E-mail' },
  hours: { ru: 'Часы работы', ky: 'Иш убактысы', en: 'Working hours' },
  route: { ru: 'Открыть на карте', ky: 'Картадан ачуу', en: 'Open on map' },
  close: { ru: 'Закрыть', ky: 'Жабуу', en: 'Close' },
} satisfies Record<string, Record<Lang, string>>

// Иконки строк (минималистичные, в один штрих)
const Icon = ({ name }: { name: 'user' | 'pin' | 'phone' | 'mail' | 'clock' }) => {
  const common = { width: 18, height: 18, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.7, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const }
  switch (name) {
    case 'user':
      return <svg {...common}><circle cx="12" cy="8" r="4" /><path d="M4 21c0-4 4-6 8-6s8 2 8 6" /></svg>
    case 'pin':
      return <svg {...common}><path d="M12 21s7-6.5 7-12a7 7 0 1 0-14 0c0 5.5 7 12 7 12Z" /><circle cx="12" cy="9" r="2.5" /></svg>
    case 'phone':
      return <svg {...common}><path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z" /></svg>
    case 'mail':
      return <svg {...common}><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></svg>
    case 'clock':
      return <svg {...common}><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>
  }
}

export default function BranchModal({ city, onClose }: { city: CityView; onClose: () => void }) {
  const { lang } = useLangContext()
  const l = lang

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
    }
  }, [onClose])

  const pick = (f: Record<Lang, string>) => f[l] || f.ru
  const name = pick(city.name)
  const region = pick(city.region)
  const director = pick(city.director)
  const address = pick(city.address)
  const hours = pick(city.hours)
  const kindLabel = (city.isMain ? UI.hq : UI.branch)[l]

  // Телефон для tel: — оставляем первый номер, без пробелов/разделителей
  const telHref = city.phone ? city.phone.split('|')[0].replace(/[^\d+]/g, '') : ''

  const rows: { icon: 'user' | 'pin' | 'phone' | 'mail' | 'clock'; label: string; value: React.ReactNode }[] = []
  if (director) rows.push({ icon: 'user', label: UI.director[l], value: director })
  if (address) rows.push({ icon: 'pin', label: UI.address[l], value: address })
  if (city.phone) rows.push({ icon: 'phone', label: UI.phone[l], value: <a href={`tel:${telHref}`}>{city.phone}</a> })
  if (city.email) rows.push({ icon: 'mail', label: UI.email[l], value: <a href={`mailto:${city.email}`}>{city.email}</a> })
  if (hours) rows.push({ icon: 'clock', label: UI.hours[l], value: hours })

  return (
    <div className={styles.overlay} onClick={onClose} role="dialog" aria-modal="true">
      <div className={styles.panel} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <div className={styles.headText}>
            <div className={styles.eyebrow}>{kindLabel}</div>
            <h3 className={styles.title}>
              {name}
              {city.code && <span className={styles.code}>{city.code}</span>}
            </h3>
            {region && <div className={styles.region}>{region}</div>}
          </div>
          <button className={styles.close} onClick={onClose} aria-label={UI.close[l]}>
            ×
          </button>
        </div>

        <div className={styles.body}>
          {rows.map((r) => (
            <div className={styles.row} key={r.label}>
              <span className={styles.rowIcon}>
                <Icon name={r.icon} />
              </span>
              <div className={styles.rowText}>
                <div className={styles.rowLabel}>{r.label}</div>
                <div className={styles.rowValue}>{r.value}</div>
              </div>
            </div>
          ))}

          {city.mapLink && (
            <a className={styles.mapBtn} href={city.mapLink} target="_blank" rel="noopener noreferrer">
              <Icon name="pin" />
              {UI.route[l]}
            </a>
          )}
        </div>
      </div>
    </div>
  )
}
