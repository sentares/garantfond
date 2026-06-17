 'use client'
import { useState, useRef, useEffect } from 'react'
import { useLangContext } from '@/context/LangContext'
import type { ProductView } from '@/types'
import ProductModal       from './ProductModal'
import styles             from './Products.module.css'

const PER_PAGE = 3

export default function Products() {
    const { t, products, categories } = useLangContext()
    const [tab, setTab] = useState('all')
    const [active, setActive] = useState<ProductView | null>(null)
    const [page, setPage] = useState(0)
    const trackRef = useRef<HTMLDivElement>(null)

    const TABS = [
        { label: t('prod_tab_all'), value: 'all' },
        ...categories.map(c => ({ label: c.label, value: c.slug })),
    ]

    const visible = products.filter(p => tab === 'all' || p.cats.includes(tab))

    const pages: ProductView[][] = []
    for (let i = 0; i < visible.length; i += PER_PAGE) pages.push(visible.slice(i, i + PER_PAGE))

    // При смене таба — на первую страницу
    useEffect(() => {
        setPage(0)
        trackRef.current?.scrollTo({ left: 0 })
    }, [tab])

    const goTo = (pi: number) => {
        const el = trackRef.current
        if (!el) return
        const clamped = Math.max(0, Math.min(pi, pages.length - 1))
        el.scrollTo({ left: clamped * el.clientWidth, behavior: 'smooth' })
    }

    const onScroll = () => {
        const el = trackRef.current
        if (!el) return
        setPage(Math.round(el.scrollLeft / el.clientWidth))
    }

    const multi = pages.length > 1

    return (
        <section className={`sec ${styles.section}`} id="products" style={{ paddingTop: '40px' }}>
            <div className="sec-inner">
                <div>
                    <div className="eyebrow">{t('prod_eyebrow')}</div>
                    <h2 className="sec-title">{t('prod_title')}</h2>
                    <p className="sec-sub">{t('prod_sub')}</p>
                </div>
                <div className={styles.tabs}>
                    {TABS.map(tb => (
                        <button key={tb.value}
                                className={`${styles.tab} ${tab === tb.value ? styles.on : ''}`}
                                onClick={() => setTab(tb.value)}>
                            {tb.label}
                        </button>
                    ))}
                </div>

                <div className={styles.carousel}>
                    {multi && (
                        <button type="button" className={`${styles.nav} ${styles.navLeft}`}
                                onClick={() => goTo(page - 1)} disabled={page === 0} aria-label="Назад">‹</button>
                    )}

                    <div className={styles.track} ref={trackRef} onScroll={onScroll}>
                        {pages.map((pg, pi) => (
                            <div className={styles.page} key={pi}>
                                {pg.map((p, i) => (
                                    <ProductCard key={p.id} product={p} delay={i * 0.05} t={t} onOpen={() => setActive(p)} />
                                ))}
                            </div>
                        ))}
                    </div>

                    {multi && (
                        <button type="button" className={`${styles.nav} ${styles.navRight}`}
                                onClick={() => goTo(page + 1)} disabled={page === pages.length - 1} aria-label="Вперёд">›</button>
                    )}
                </div>

                {multi && (
                    <div className={styles.dots}>
                        {pages.map((_, pi) => (
                            <button key={pi} type="button"
                                    className={`${styles.dot} ${pi === page ? styles.dotOn : ''}`}
                                    onClick={() => goTo(pi)} aria-label={`Страница ${pi + 1}`} />
                        ))}
                    </div>
                )}
            </div>

            {active && <ProductModal product={active} onClose={() => setActive(null)} />}
        </section>
    )
}

function ProductCard({ product: p, delay, t, onOpen }: {
    product: ProductView
    delay: number
    t: (k: string) => string
    onOpen: () => void
}) {
    const g = p.isGreen
    return (
        <div className={styles.card} style={{ animationDelay: `${delay}s` }}>
            <div className={styles.top} style={{ background: p.gradient }}>
                <span className={styles.badge}>{p.badge}</span>
            </div>
            <div className={styles.body}>
                <div className={styles.name} style={g ? { color: '#0a5c20' } : undefined}>
                    {p.name}
                </div>
                <p className={styles.desc}>{p.desc}</p>
                <div className={styles.meta}>
                    {([
                        [t('prod_amount'), p.amount],
                        [t('prod_cover'),  p.cover],
                        [t('prod_term'),   p.term],
                    ] as [string, string][]).map(([l, v]) => (
                        <div key={l} className={styles.pm} style={g ? { background: '#f0faf3' } : undefined}>
                            <div className={styles.pml}>{l}</div>
                            <div className={styles.pmv} style={g ? { color: '#0a5c20' } : undefined}>{v}</div>
                        </div>
                    ))}
                </div>
                <button type="button"
                        className={styles.link}
                        onClick={onOpen}
                        style={{ background: 'none', border: 'none', cursor: 'pointer', font: 'inherit', padding: 0, ...(g ? { color: '#0a8030' } : {}) }}>
                    {t('prod_more')} →
                </button>
            </div>
        </div>
    )
}
