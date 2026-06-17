import { cache } from 'react'
import { getPayload } from 'payload'
import config from '@payload-config'

import type {
  Lang,
  SiteContent,
  ProductView,
  CategoryView,
  NewsView,
  StoryView,
  CityView,
} from '@/types'

const LOCALES: Lang[] = ['ru', 'ky', 'en']

const empty = <T>(): Record<Lang, T> =>
  ({ ru: undefined, ky: undefined, en: undefined } as unknown as Record<Lang, T>)

const s = (v: unknown): string => (typeof v === 'string' ? v : '')

/**
 * Тянет весь контент сайта из Payload по всем локалям и приводит к форме,
 * которую ожидает фронтенд (LangProvider). Обёрнут в React cache — один
 * фактический запрос на серверный рендер.
 */
export const getSiteContent = cache(async (): Promise<SiteContent> => {
  const payload = await getPayload({ config })

  const translations = empty<Record<string, string>>()
  const products = empty<ProductView[]>()
  const categories = empty<CategoryView[]>()
  const news = empty<NewsView[]>()
  const stories = empty<StoryView[]>()

  // Достаём slug категорий из relationship (depth>=1 → объекты категорий)
  const catSlugs = (rel: unknown): string[] => {
    if (!Array.isArray(rel)) return []
    return rel
      .map((c) => (c && typeof c === 'object' ? s((c as { slug?: unknown }).slug) : ''))
      .filter(Boolean)
  }

  for (const locale of LOCALES) {
    const [tRes, pRes, cRes, nRes, stRes] = await Promise.all([
      payload.find({ collection: 'translations', locale, limit: 1000, depth: 0, pagination: false }),
      payload.find({ collection: 'products', locale, limit: 100, sort: 'order', depth: 1, pagination: false }),
      payload.find({ collection: 'categories', locale, limit: 100, sort: 'order', depth: 0, pagination: false }),
      payload.find({ collection: 'news', locale, limit: 100, sort: 'order', depth: 0, pagination: false }),
      payload.find({ collection: 'stories', locale, limit: 100, sort: 'order', depth: 0, pagination: false }),
    ])

    const map: Record<string, string> = {}
    for (const doc of tRes.docs) map[s(doc.key)] = s(doc.value)
    translations[locale] = map

    products[locale] = pRes.docs.map((d) => ({
      id: s(d.productId),
      cats: catSlugs(d.categories),
      gradient: s(d.gradient),
      isGreen: !!d.isGreen,
      name: s(d.name),
      badge: s(d.badge),
      desc: s(d.desc),
      amount: s(d.amount),
      cover: s(d.cover),
      term: s(d.term),
      passport: Array.isArray(d.passport) && d.passport.length
        ? (d.passport as ProductView['passport'])
        : null,
    }))

    categories[locale] = cRes.docs.map((d) => ({
      slug: s(d.slug),
      label: s(d.label) || s(d.slug),
    }))

    news[locale] = nRes.docs.map((d) => ({
      id: String(d.id),
      cat: s(d.cat),
      title: s(d.title),
      text: s(d.text),
      date: s(d.date),
    }))

    stories[locale] = stRes.docs.map((d) => ({
      id: String(d.id),
      badge: s(d.badge),
      name: s(d.name),
      biz: s(d.biz),
      quote: s(d.quote),
    }))
  }

  // Города: один документ на город с локализованными полями.
  // Собираем name/region по всем локалям в одну запись.
  const cityByLocale = empty<Record<string, { name: string; region: string }>>()
  let order: { cityId: string; code: string; isMain: boolean }[] = []

  for (const locale of LOCALES) {
    const cRes = await payload.find({
      collection: 'cities',
      locale,
      limit: 100,
      sort: 'order',
      depth: 0,
      pagination: false,
    })
    const m: Record<string, { name: string; region: string }> = {}
    for (const d of cRes.docs) m[s(d.cityId)] = { name: s(d.name), region: s(d.region) }
    cityByLocale[locale] = m
    if (locale === 'ru') {
      order = cRes.docs.map((d) => ({ cityId: s(d.cityId), code: s(d.code), isMain: !!d.isMain }))
    }
  }

  const cities: CityView[] = order.map((c) => ({
    id: c.cityId,
    code: c.code,
    isMain: c.isMain,
    name: {
      ru: cityByLocale.ru[c.cityId]?.name ?? '',
      ky: cityByLocale.ky[c.cityId]?.name ?? '',
      en: cityByLocale.en[c.cityId]?.name ?? '',
    },
    region: {
      ru: cityByLocale.ru[c.cityId]?.region ?? '',
      ky: cityByLocale.ky[c.cityId]?.region ?? '',
      en: cityByLocale.en[c.cityId]?.region ?? '',
    },
  }))

  return { translations, products, categories, news, stories, cities }
})
