'use client'
import { useEffect } from 'react'
import { useLangContext } from '@/context/LangContext'
import type { ProductView } from '@/types'
import ProductPassport from './ProductPassport'
import styles from './ProductModal.module.css'

const UI = {
  close: { ru: 'Закрыть', ky: 'Жабуу', en: 'Close' },
  empty: {
    ru: 'Подробная информация по продукту скоро появится.',
    ky: 'Продукт боюнча толук маалымат жакында пайда болот.',
    en: 'Detailed product information is coming soon.',
  },
  passport: { ru: 'Паспорт продукта', ky: 'Продукттун паспорту', en: 'Product passport' },
}

export default function ProductModal({
  product,
  onClose,
}: {
  product: ProductView
  onClose: () => void
}) {
  const { lang } = useLangContext()

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

  return (
    <div className={styles.overlay} onClick={onClose} role="dialog" aria-modal="true">
      <div className={styles.panel} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header} style={{ background: product.gradient }}>
          <div className={styles.headText}>
            <div className={styles.eyebrow}>{UI.passport[lang]}</div>
            <h3 className={styles.title}>
              {product.badge && <span className={styles.badge}>{product.badge}</span>}
              {product.name}
            </h3>
          </div>
          <button className={styles.close} onClick={onClose} aria-label={UI.close[lang]}>
            ×
          </button>
        </div>

        <div className={styles.body}>
          {product.passport && product.passport.length > 0 ? (
            <ProductPassport blocks={product.passport} />
          ) : (
            <p className={styles.empty}>{UI.empty[lang]}</p>
          )}
        </div>
      </div>
    </div>
  )
}
