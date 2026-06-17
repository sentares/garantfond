'use client'
import { createContext, useContext, useState, useCallback, useMemo } from 'react'
import type { Lang, SiteContent, ProductView, CategoryView, NewsView, StoryView, CityView, PartnerView, MilestoneView, SettingsView, StatsView, CalculatorView } from '@/types'

interface LangCtx {
    lang: Lang
    setLang: (l: Lang) => void
    t: (key: string) => string
    products: ProductView[]
    categories: CategoryView[]
    news: NewsView[]
    stories: StoryView[]
    cities: CityView[]
    partners: PartnerView[]
    milestones: MilestoneView[]
    settings: SettingsView
    stats: StatsView
    calculator: CalculatorView
}

const EMPTY_SETTINGS: SettingsView = {
    logo: '', siteName: '', phoneShort: '', phone: '', email: '', address: '',
    hours: '', mapLink: '', oldSiteUrl: '', nbkrNotice: '', floatingCtaText: '',
    mapCoordsLabel: '', socials: [],
}
const EMPTY_STATS: StatsView = {
    guaranteesCount: 0, guaranteesSum: 0, loansSum: 0, repayRate: 0,
    years: 0, branches: 0, partnersCount: 0, regionsCovered: 0,
}
const EMPTY_CALC: CalculatorView = {
    minAmount: 1, maxAmount: 50, stepAmount: 0.5, defaultAmount: 10,
    minTerm: 6, maxTerm: 84, stepTerm: 6, defaultTerm: 36,
    guaranteePct: 50, annualFeePct: 1.8, currencies: ['KGS', 'USD', 'EUR'],
}

const EMPTY_CONTENT: SiteContent = {
    translations: { ru: {}, ky: {}, en: {} },
    products: { ru: [], ky: [], en: [] },
    categories: { ru: [], ky: [], en: [] },
    news: { ru: [], ky: [], en: [] },
    stories: { ru: [], ky: [], en: [] },
    cities: [],
    partners: [],
    milestones: { ru: [], ky: [], en: [] },
    settings: { ru: EMPTY_SETTINGS, ky: EMPTY_SETTINGS, en: EMPTY_SETTINGS },
    stats: EMPTY_STATS,
    calculator: EMPTY_CALC,
}

const LangContext = createContext<LangCtx>({
    lang: 'ru',
    setLang: () => {},
    t: (k) => k,
    products: [],
    categories: [],
    news: [],
    stories: [],
    cities: [],
    partners: [],
    milestones: [],
    settings: EMPTY_SETTINGS,
    stats: EMPTY_STATS,
    calculator: EMPTY_CALC,
})

export function LangProvider({
    content = EMPTY_CONTENT,
    children,
}: {
    content?: SiteContent
    children: React.ReactNode
}) {
    const [lang, setLang] = useState<Lang>('ru')

    const t = useCallback(
        (key: string) =>
            content.translations[lang]?.[key] ?? content.translations.ru?.[key] ?? key,
        [content, lang],
    )

    const value = useMemo<LangCtx>(
        () => ({
            lang,
            setLang,
            t,
            products: content.products[lang] ?? [],
            categories: content.categories[lang] ?? [],
            news: content.news[lang] ?? [],
            stories: content.stories[lang] ?? [],
            cities: content.cities,
            partners: content.partners ?? [],
            milestones: content.milestones[lang] ?? [],
            settings: content.settings[lang] ?? EMPTY_SETTINGS,
            stats: content.stats ?? EMPTY_STATS,
            calculator: content.calculator ?? EMPTY_CALC,
        }),
        [lang, t, content],
    )

    return <LangContext.Provider value={value}>{children}</LangContext.Provider>
}

export function useLangContext() {
    return useContext(LangContext)
}
