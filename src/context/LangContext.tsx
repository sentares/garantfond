'use client'
import { createContext, useContext, useState, useCallback, useMemo } from 'react'
import type { Lang, SiteContent, ProductView, CategoryView, NewsView, StoryView, CityView } from '@/types'

interface LangCtx {
    lang: Lang
    setLang: (l: Lang) => void
    t: (key: string) => string
    products: ProductView[]
    categories: CategoryView[]
    news: NewsView[]
    stories: StoryView[]
    cities: CityView[]
}

const EMPTY_CONTENT: SiteContent = {
    translations: { ru: {}, ky: {}, en: {} },
    products: { ru: [], ky: [], en: [] },
    categories: { ru: [], ky: [], en: [] },
    news: { ru: [], ky: [], en: [] },
    stories: { ru: [], ky: [], en: [] },
    cities: [],
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
        }),
        [lang, t, content],
    )

    return <LangContext.Provider value={value}>{children}</LangContext.Provider>
}

export function useLangContext() {
    return useContext(LangContext)
}
