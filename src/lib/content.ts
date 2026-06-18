import { cache } from 'react'
import { unstable_cache } from 'next/cache'
import { getPayload } from 'payload'
import config from '@payload-config'
import { CONTENT_TAG } from './revalidate'

import type {
  Lang,
  SiteContent,
  ProductView,
  CategoryView,
  NewsView,
  StoryView,
  CityView,
  PartnerView,
  MilestoneView,
  RichText,
  ContentBlock,
  SettingsView,
  StatsView,
  CalculatorView,
  SocialLink,
} from '@/types'

const LOCALES: Lang[] = ['ru', 'ky', 'en']

const empty = <T>(): Record<Lang, T> =>
  ({ ru: undefined, ky: undefined, en: undefined } as unknown as Record<Lang, T>)

const s = (v: unknown): string => (typeof v === 'string' ? v : '')

// число с дефолтом (для полей globals/калькулятора)
const n = (v: unknown, def = 0): number => (typeof v === 'number' && !Number.isNaN(v) ? v : def)

// число или null (для опциональных координат)
const numOrNull = (v: unknown): number | null => (typeof v === 'number' && !Number.isNaN(v) ? v : null)

// upload-поле при depth>=1 приходит объектом Media; берём .url
const mediaUrl = (v: unknown): string =>
  v && typeof v === 'object' && typeof (v as { url?: unknown }).url === 'string'
    ? ((v as { url: string }).url)
    : ''

// rich-text: оставляем как есть, если это объект с root, иначе null
const richText = (v: unknown): RichText =>
  v && typeof v === 'object' && 'root' in (v as object) ? (v as RichText) : null

// upload-поле: url + имя файла (для документов)
const mediaFile = (v: unknown): { url: string; filename: string } => {
  if (v && typeof v === 'object') {
    const o = v as { url?: unknown; filename?: unknown }
    return {
      url: typeof o.url === 'string' ? o.url : '',
      filename: typeof o.filename === 'string' ? o.filename : '',
    }
  }
  return { url: '', filename: '' }
}

// Преобразует блоки конструктора (поле content) в плоскую сериализуемую структуру
// с готовыми URL медиа — её отдаём на фронт.
const mapContent = (blocks: unknown): ContentBlock[] => {
  if (!Array.isArray(blocks)) return []
  const out: ContentBlock[] = []
  for (const raw of blocks) {
    if (!raw || typeof raw !== 'object') continue
    const d = raw as Record<string, unknown>
    switch (d.blockType) {
      case 'headingBlock':
        out.push({ type: 'heading', text: s(d.text) })
        break
      case 'paragraph':
        out.push({ type: 'richtext', value: richText(d.value) })
        break
      case 'imageBlock':
        out.push({ type: 'image', url: mediaUrl(d.image), caption: s(d.caption), size: s(d.size) || 'full' })
        break
      case 'gallery': {
        const images = Array.isArray(d.images)
          ? d.images
              .map((i) => {
                const it = i as { image?: unknown; caption?: unknown }
                return { url: mediaUrl(it.image), caption: s(it.caption) }
              })
              .filter((i) => i.url)
          : []
        out.push({ type: 'gallery', images })
        break
      }
      case 'videoBlock':
        out.push({ type: 'video', url: s(d.url), file: mediaUrl(d.file), caption: s(d.caption) })
        break
      case 'filesBlock': {
        const items = Array.isArray(d.items)
          ? d.items
              .map((i) => {
                const it = i as { file?: unknown; title?: unknown }
                const f = mediaFile(it.file)
                return { url: f.url, title: s(it.title) || f.filename }
              })
              .filter((i) => i.url)
          : []
        out.push({ type: 'files', items })
        break
      }
      case 'quoteBlock':
        out.push({ type: 'quote', text: s(d.text), author: s(d.author) })
        break
      case 'buttonBlock':
        out.push({ type: 'button', label: s(d.label), url: s(d.url) })
        break
    }
  }
  return out
}

/**
 * Тянет весь контент сайта из Payload по всем локалям и приводит к форме,
 * которую ожидает фронтенд (LangProvider).
 *
 * Кеширование (важно для скорости при многих посетителях):
 *  - unstable_cache: результат кешируется НА СЕРВЕРЕ и переиспользуется для
 *    всех посетителей. БД (Neon) дёргается не на каждый запрос, а максимум раз
 *    в `revalidate` секунд ИЛИ при инвалидации тега после правки в админке.
 *  - React cache: дедуп в рамках одного серверного рендера.
 */
const fetchSiteContent = async (): Promise<SiteContent> => {
  const payload = await getPayload({ config })

  const translations = empty<Record<string, string>>()
  const products = empty<ProductView[]>()
  const categories = empty<CategoryView[]>()
  const news = empty<NewsView[]>()
  const stories = empty<StoryView[]>()
  const milestones = empty<MilestoneView[]>()

  // Достаём slug категорий из relationship (depth>=1 → объекты категорий)
  const catSlugs = (rel: unknown): string[] => {
    if (!Array.isArray(rel)) return []
    return rel
      .map((c) => (c && typeof c === 'object' ? s((c as { slug?: unknown }).slug) : ''))
      .filter(Boolean)
  }

  for (const locale of LOCALES) {
    const [tRes, pRes, cRes, nRes, stRes, mRes] = await Promise.all([
      payload.find({ collection: 'translations', locale, limit: 1000, depth: 0, pagination: false }),
      payload.find({ collection: 'products', locale, limit: 100, sort: 'order', depth: 1, pagination: false }),
      payload.find({ collection: 'categories', locale, limit: 100, sort: 'order', depth: 0, pagination: false }),
      payload.find({ collection: 'news', locale, limit: 100, sort: 'order', depth: 2, pagination: false }),
      payload.find({ collection: 'stories', locale, limit: 100, sort: 'order', depth: 2, pagination: false }),
      payload.find({ collection: 'milestones', locale, limit: 100, sort: 'order', depth: 0, pagination: false }),
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
      slug: s(d.slug) || String(d.id),
      cat: s(d.cat),
      title: s(d.title),
      text: s(d.text),
      date: s(d.date),
      cover: mediaUrl(d.cover),
      content: mapContent(d.content),
    }))

    stories[locale] = stRes.docs.map((d) => ({
      id: String(d.id),
      slug: s(d.slug) || String(d.id),
      badge: s(d.badge),
      name: s(d.name),
      biz: s(d.biz),
      quote: s(d.quote),
      photo: mediaUrl(d.photo),
      content: mapContent(d.content),
    }))

    milestones[locale] = mRes.docs.map((d) => ({
      id: String(d.id),
      year: typeof d.year === 'number' ? d.year : 0,
      tag: s(d.tag),
      desc: s(d.desc),
    }))
  }

  // Города: один документ на город с локализованными полями.
  // Собираем name/region/address/hours по всем локалям в одну запись.
  type CityLoc = { name: string; region: string; director: string; address: string; hours: string }
  const cityByLocale = empty<Record<string, CityLoc>>()
  let order: {
    cityId: string
    code: string
    isMain: boolean
    phone: string
    email: string
    mapLink: string
    posX: number | null
    posY: number | null
  }[] = []

  for (const locale of LOCALES) {
    const cRes = await payload.find({
      collection: 'cities',
      locale,
      limit: 100,
      sort: 'order',
      depth: 0,
      pagination: false,
    })
    const m: Record<string, CityLoc> = {}
    for (const d of cRes.docs)
      m[s(d.cityId)] = {
        name: s(d.name),
        region: s(d.region),
        director: s(d.director),
        address: s(d.address),
        hours: s(d.hours),
      }
    cityByLocale[locale] = m
    if (locale === 'ru') {
      order = cRes.docs.map((d) => ({
        cityId: s(d.cityId),
        code: s(d.code),
        isMain: !!d.isMain,
        phone: s(d.phone),
        email: s(d.email),
        mapLink: s(d.mapLink),
        posX: numOrNull(d.posX),
        posY: numOrNull(d.posY),
      }))
    }
  }

  const triple = (pick: (loc: CityLoc | undefined) => string, id: string): Record<Lang, string> => ({
    ru: pick(cityByLocale.ru[id]),
    ky: pick(cityByLocale.ky[id]),
    en: pick(cityByLocale.en[id]),
  })

  const cities: CityView[] = order.map((c) => ({
    id: c.cityId,
    code: c.code,
    isMain: c.isMain,
    phone: c.phone,
    email: c.email,
    mapLink: c.mapLink,
    posX: c.posX,
    posY: c.posY,
    name: triple((l) => l?.name ?? '', c.cityId),
    region: triple((l) => l?.region ?? '', c.cityId),
    director: triple((l) => l?.director ?? '', c.cityId),
    address: triple((l) => l?.address ?? '', c.cityId),
    hours: triple((l) => l?.hours ?? '', c.cityId),
  }))

  // Партнёры (не локализованы) — один список, depth:1 для логотипа.
  const partnersRes = await payload.find({
    collection: 'partners',
    limit: 200,
    sort: 'order',
    depth: 1,
    pagination: false,
  })
  const partners: PartnerView[] = partnersRes.docs.map((d) => ({
    id: String(d.id),
    name: s(d.name),
    type: (d.type === 'org' || d.type === 'intl' ? d.type : 'bank') as PartnerView['type'],
    logo: mediaUrl(d.logo),
    url: s(d.url),
  }))

  // === Globals (одиночные настройки) ===

  // «Общие настройки» — локализованные поля резолвим по всем локалям.
  const settings = empty<SettingsView>()
  const socialsOf = (v: unknown): SocialLink[] =>
    Array.isArray(v)
      ? v
          .map((x) =>
            x && typeof x === 'object'
              ? { network: s((x as { network?: unknown }).network), url: s((x as { url?: unknown }).url) }
              : { network: '', url: '' },
          )
          .filter((x) => x.url)
      : []

  for (const locale of LOCALES) {
    const g = await payload.findGlobal({ slug: 'settings', locale, depth: 1 })
    settings[locale] = {
      logo: mediaUrl(g.logo),
      siteName: s(g.siteName),
      phoneShort: s(g.phoneShort),
      phone: s(g.phone),
      email: s(g.email),
      address: s(g.address),
      hours: s(g.hours),
      mapLink: s(g.mapLink),
      oldSiteUrl: s(g.oldSiteUrl),
      nbkrNotice: s(g.nbkrNotice),
      floatingCtaText: s(g.floatingCtaText),
      mapCoordsLabel: s(g.mapCoordsLabel),
      socials: socialsOf(g.socials),
    }
  }

  // «Цифры фонда» — не локализованы.
  const sg = await payload.findGlobal({ slug: 'stats', depth: 0 })
  const stats: StatsView = {
    guaranteesCount: n(sg.guaranteesCount, 21129),
    guaranteesSum: n(sg.guaranteesSum, 18.2),
    loansSum: n(sg.loansSum, 54.8),
    repayRate: n(sg.repayRate, 98.22),
    years: n(sg.years, 10),
    branches: n(sg.branches, 7),
    partnersCount: n(sg.partnersCount, 28),
    regionsCovered: n(sg.regionsCovered, 7),
  }

  // «Калькулятор» — не локализован.
  const cg = await payload.findGlobal({ slug: 'calculator', depth: 0 })
  const currencies = Array.isArray(cg.currencies)
    ? cg.currencies.map((x) => (x && typeof x === 'object' ? s((x as { code?: unknown }).code) : '')).filter(Boolean)
    : []
  const calculator: CalculatorView = {
    minAmount: n(cg.minAmount, 1),
    maxAmount: n(cg.maxAmount, 50),
    stepAmount: n(cg.stepAmount, 0.5),
    defaultAmount: n(cg.defaultAmount, 10),
    minTerm: n(cg.minTerm, 6),
    maxTerm: n(cg.maxTerm, 84),
    stepTerm: n(cg.stepTerm, 6),
    defaultTerm: n(cg.defaultTerm, 36),
    guaranteePct: n(cg.guaranteePct, 50),
    annualFeePct: n(cg.annualFeePct, 1.8),
    currencies: currencies.length ? currencies : ['KGS', 'USD', 'EUR'],
  }

  return {
    translations,
    products,
    categories,
    news,
    stories,
    cities,
    partners,
    milestones,
    settings,
    stats,
    calculator,
  }
}

// Кешируем результат на сервере (общий для всех посетителей).
// revalidate: фоновое обновление раз в 5 мин (страховка), плюс мгновенная
// инвалидация по тегу после любой правки в админке (hooks → revalidateTag).
const cachedSiteContent = unstable_cache(fetchSiteContent, ['site-content'], {
  revalidate: 300,
  tags: [CONTENT_TAG],
})

export const getSiteContent = cache((): Promise<SiteContent> => cachedSiteContent())
