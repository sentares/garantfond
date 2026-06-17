import { getPayload } from 'payload'
import config from '@payload-config'

import { T } from './data/translations'
import { PRODUCTS, NEW_PRODUCTS } from './data/products'
import { CATEGORIES } from './data/categories'
import { CITIES } from './data/cities'
import { PASSPORTS } from './data/passports'
import type { Lang } from './types'

const LOCALES: Lang[] = ['ru', 'ky', 'en']

// Ключи, которые НЕ идут в Translations — они живут в своих коллекциях
const isProductKey = (k: string) => /^p_/.test(k)
const isNewsItemKey = (k: string) => /^news[0-9]/.test(k)
const isStoryItemKey = (k: string) => /^story[0-9]/.test(k)

function groupOf(key: string): string {
  if (key.startsWith('nav_')) return 'nav'
  if (key.startsWith('hero_')) return 'hero'
  if (key.startsWith('stat')) return 'stats'
  if (key.startsWith('ticker_')) return 'ticker'
  if (key.startsWith('prod_')) return 'products'
  if (key.startsWith('how_') || key.startsWith('step')) return 'how'
  if (key.startsWith('partners_')) return 'partners'
  if (key.startsWith('calc_')) return 'calc'
  if (key.startsWith('stories_')) return 'stories'
  if (key.startsWith('news_')) return 'news'
  if (key.startsWith('contact_')) return 'contact'
  if (key.startsWith('footer_')) return 'footer'
  return 'common'
}

const v = (lang: Lang, key: string) => T[lang]?.[key] ?? ''

const run = async () => {
  const payload = await getPayload({ config })

  payload.logger.info('🌱 Seed: старт')

  // 1) Очистка контентных коллекций (идемпотентность)
  for (const slug of ['translations', 'products', 'categories', 'cities', 'news', 'stories'] as const) {
    await payload.delete({ collection: slug, where: { id: { exists: true } } })
  }
  payload.logger.info('🧹 Старые контентные записи очищены')

  // 1.5) Категории (табы) + карта slug → id
  const catId: Record<string, string | number> = {}
  for (const c of CATEGORIES) {
    const doc = await payload.create({
      collection: 'categories',
      locale: 'ru',
      data: { slug: c.slug, order: c.order, label: c.label.ru },
    })
    catId[c.slug] = doc.id
    for (const lang of ['ky', 'en'] as const) {
      await payload.update({
        collection: 'categories',
        id: doc.id,
        locale: lang,
        data: { label: c.label[lang] },
      })
    }
  }
  const toCatIds = (slugs: string[]) => slugs.map((s) => catId[s]).filter(Boolean)
  payload.logger.info(`🏷️ Categories: ${CATEGORIES.length}`)

  // 2) Translations — все ключи кроме per-item контента
  const allKeys = new Set<string>()
  for (const lang of LOCALES) Object.keys(T[lang] ?? {}).forEach((k) => allKeys.add(k))

  let tCount = 0
  for (const key of allKeys) {
    if (isProductKey(key) || isNewsItemKey(key) || isStoryItemKey(key)) continue
    const doc = await payload.create({
      collection: 'translations',
      locale: 'ru',
      data: { key, group: groupOf(key), value: v('ru', key) },
    })
    for (const lang of ['ky', 'en'] as const) {
      await payload.update({
        collection: 'translations',
        id: doc.id,
        locale: lang,
        data: { value: v(lang, key) },
      })
    }
    tCount++
  }
  payload.logger.info(`📝 Translations: ${tCount}`)

  // 3) Products — старые (на ключах перевода)
  for (let i = 0; i < PRODUCTS.length; i++) {
    const p = PRODUCTS[i]
    const doc = await payload.create({
      collection: 'products',
      locale: 'ru',
      data: {
        productId: p.id,
        order: i,
        categories: toCatIds(p.cat.split(' ').filter(Boolean)),
        isGreen: !!p.isGreen,
        gradient: p.gradient,
        name: v('ru', p.nameKey),
        badge: v('ru', p.badgeKey),
        desc: v('ru', p.descKey),
        amount: v('ru', p.amountKey),
        cover: v('ru', p.coverKey),
        term: v('ru', p.termKey),
        ...(PASSPORTS[p.id] ? { passport: PASSPORTS[p.id] } : {}),
      },
    })
    for (const lang of ['ky', 'en'] as const) {
      await payload.update({
        collection: 'products',
        id: doc.id,
        locale: lang,
        data: {
          name: v(lang, p.nameKey),
          badge: v(lang, p.badgeKey),
          desc: v(lang, p.descKey),
          amount: v(lang, p.amountKey),
          cover: v(lang, p.coverKey),
          term: v(lang, p.termKey),
        },
      })
    }
  }

  // 3.5) Products — новые (прямые RU-значения; KY/EN дозаполнить в админке)
  for (let j = 0; j < NEW_PRODUCTS.length; j++) {
    const p = NEW_PRODUCTS[j]
    await payload.create({
      collection: 'products',
      locale: 'ru',
      data: {
        productId: p.id,
        order: PRODUCTS.length + j,
        categories: toCatIds(p.cats),
        isGreen: !!p.isGreen,
        gradient: p.gradient,
        name: p.name,
        badge: p.badge,
        desc: p.desc,
        amount: p.amount,
        cover: p.cover,
        term: p.term,
        ...(PASSPORTS[p.id] ? { passport: PASSPORTS[p.id] } : {}),
      },
    })
  }
  payload.logger.info(`📦 Products: ${PRODUCTS.length + NEW_PRODUCTS.length}`)

  // 4) Cities
  for (let i = 0; i < CITIES.length; i++) {
    const c = CITIES[i]
    const doc = await payload.create({
      collection: 'cities',
      locale: 'ru',
      data: {
        cityId: c.id,
        order: i,
        code: c.code,
        isMain: !!c.isMain,
        name: c.name.ru ?? '',
        region: c.region.ru ?? '',
      },
    })
    for (const lang of ['ky', 'en'] as const) {
      await payload.update({
        collection: 'cities',
        id: doc.id,
        locale: lang,
        data: { name: c.name[lang] ?? '', region: c.region[lang] ?? '' },
      })
    }
  }
  payload.logger.info(`📍 Cities: ${CITIES.length}`)

  // 5) News (news1..news3)
  const newsIds = ['news1', 'news2', 'news3']
  for (let i = 0; i < newsIds.length; i++) {
    const n = newsIds[i]
    const doc = await payload.create({
      collection: 'news',
      locale: 'ru',
      data: {
        order: i,
        cat: v('ru', `${n}_cat`),
        title: v('ru', `${n}_title`),
        text: v('ru', `${n}_text`),
        date: v('ru', `${n}_date`),
      },
    })
    for (const lang of ['ky', 'en'] as const) {
      await payload.update({
        collection: 'news',
        id: doc.id,
        locale: lang,
        data: {
          cat: v(lang, `${n}_cat`),
          title: v(lang, `${n}_title`),
          text: v(lang, `${n}_text`),
          date: v(lang, `${n}_date`),
        },
      })
    }
  }
  payload.logger.info(`📰 News: ${newsIds.length}`)

  // 6) Stories (story1..story3)
  const storyIds = ['story1', 'story2', 'story3']
  for (let i = 0; i < storyIds.length; i++) {
    const s = storyIds[i]
    const doc = await payload.create({
      collection: 'stories',
      locale: 'ru',
      data: {
        order: i,
        badge: v('ru', `${s}_badge`),
        name: v('ru', `${s}_name`),
        biz: v('ru', `${s}_biz`),
        quote: v('ru', `${s}_quote`),
      },
    })
    for (const lang of ['ky', 'en'] as const) {
      await payload.update({
        collection: 'stories',
        id: doc.id,
        locale: lang,
        data: {
          badge: v(lang, `${s}_badge`),
          name: v(lang, `${s}_name`),
          biz: v(lang, `${s}_biz`),
          quote: v(lang, `${s}_quote`),
        },
      })
    }
  }
  payload.logger.info(`🏆 Stories: ${storyIds.length}`)

  payload.logger.info('✅ Seed завершён')
  process.exit(0)
}

try {
  await run()
} catch (err) {
  console.error(err)
  process.exit(1)
}
