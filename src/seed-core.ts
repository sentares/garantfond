import type { Payload } from 'payload'

import { T } from './data/translations'
import { PRODUCTS, NEW_PRODUCTS } from './data/products'
import { CATEGORIES } from './data/categories'
import { CITIES } from './data/cities'
import { PASSPORTS } from './data/passports'
import {
  TRANSLATIONS_ADDENDUM,
  ADDENDUM_GROUPS,
  MILESTONES,
  PARTNERS,
  CITY_COORDS,
  CITY_DIRECTORS,
  CITY_NAME_OVERRIDES,
  SETTINGS,
  STATS,
  CALCULATOR,
} from './data/extra'
import type { Lang } from './types'

const LOCALES: Lang[] = ['ru', 'ky', 'en']

// Ключи, которые НЕ идут в Translations — они живут в своих коллекциях
const isProductKey = (k: string) => /^p_/.test(k)
const isNewsItemKey = (k: string) => /^news[0-9]/.test(k)
const isStoryItemKey = (k: string) => /^story[0-9]/.test(k)

type TransGroup =
  | 'nav' | 'hero' | 'stats' | 'ticker' | 'products' | 'how'
  | 'partners' | 'calc' | 'stories' | 'news' | 'contact' | 'footer' | 'common'

function groupOf(key: string): TransGroup {
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

// Запускает fn по всем элементам с ограничением параллелизма (быстрее, чем
// строго последовательно, но не валит пул соединений Neon).
async function mapLimit<T>(items: T[], limit: number, fn: (item: T, i: number) => Promise<void>): Promise<void> {
  let idx = 0
  const n = Math.min(limit, items.length)
  const workers = Array.from({ length: n }, async () => {
    while (idx < items.length) {
      const cur = idx++
      await fn(items[cur], cur)
    }
  })
  await Promise.all(workers)
}

const CONC = 8

/**
 * Поля филиала (контакты + руководитель) для города — общая логика для полного
 * сида (создание) и точечного обновления (seedBranches). phone/email НЕ
 * локализованы → задаём их только на locale 'ru'.
 */
function cityBranchData(cityId: string, lang: Lang, isMain: boolean): Record<string, unknown> {
  const director = CITY_DIRECTORS[cityId]
  return {
    // часы/телефон — плейсхолдер из главного офиса (адреса филиалов остаются пустыми)
    hours: SETTINGS.hours[lang],
    ...(lang === 'ru' ? { phone: SETTINGS.phone } : {}),
    // ФИО руководителя: ru/ky — кириллица; en пусто (в UI фолбэк на ru)
    ...(director ? { director: lang === 'en' ? '' : director } : {}),
    // у главного офиса — реальный адрес/почта из настроек
    ...(isMain ? { address: SETTINGS.address[lang], ...(lang === 'ru' ? { email: SETTINGS.email } : {}) } : {}),
  }
}

/**
 * Заполняет БД исходным контентом. Идемпотентно: контентные коллекции
 * очищаются и пересоздаются. Принимает уже инициализированный payload —
 * чтобы можно было вызвать как из CLI (src/seed.ts), так и из API-роута
 * внутри Next (см. src/app/(payload)/api/seed/route.ts).
 */
export async function runSeed(payload: Payload): Promise<string[]> {
  const log: string[] = []
  const info = (m: string) => {
    payload.logger.info(m)
    log.push(m)
  }

  info('🌱 Seed: старт')

  // 1) Очистка контентных коллекций (идемпотентность, параллельно)
  await Promise.all(
    (['translations', 'products', 'categories', 'cities', 'news', 'stories', 'partners', 'milestones'] as const).map(
      (slug) => payload.delete({ collection: slug, where: { id: { exists: true } } }),
    ),
  )
  info('🧹 Старые контентные записи очищены')

  // 1.5) Категории (табы) + карта slug → id
  const catId: Record<string, string | number> = {}
  await mapLimit(CATEGORIES, CONC, async (c) => {
    const doc = await payload.create({ collection: 'categories', locale: 'ru', data: { slug: c.slug, order: c.order, label: c.label.ru } })
    catId[c.slug] = doc.id
    for (const lang of ['ky', 'en'] as const) {
      await payload.update({ collection: 'categories', id: doc.id, locale: lang, data: { label: c.label[lang] } })
    }
  })
  const toCatIds = (slugs: string[]) => slugs.map((s) => catId[s]).filter(Boolean) as number[]
  info(`🏷️ Categories: ${CATEGORIES.length}`)

  // 2) Translations — все ключи кроме per-item контента
  const baseKeys: string[] = []
  const seen = new Set<string>()
  for (const lang of LOCALES)
    for (const k of Object.keys(T[lang] ?? {})) {
      if (seen.has(k) || isProductKey(k) || isNewsItemKey(k) || isStoryItemKey(k)) continue
      seen.add(k)
      baseKeys.push(k)
    }

  await mapLimit(baseKeys, CONC, async (key) => {
    const doc = await payload.create({ collection: 'translations', locale: 'ru', data: { key, group: groupOf(key), value: v('ru', key) } })
    for (const lang of ['ky', 'en'] as const) {
      await payload.update({ collection: 'translations', id: doc.id, locale: lang, data: { value: v(lang, key) } })
    }
  })
  info(`📝 Translations: ${baseKeys.length}`)

  // 2.5) Новые ключи интерфейса (юбилей, карта, прочее)
  const addKeys = Object.keys(TRANSLATIONS_ADDENDUM.ru)
  await mapLimit(addKeys, CONC, async (key) => {
    const doc = await payload.create({
      collection: 'translations',
      locale: 'ru',
      data: { key, group: (ADDENDUM_GROUPS[key] ?? 'common') as TransGroup, value: TRANSLATIONS_ADDENDUM.ru[key] },
    })
    for (const lang of ['ky', 'en'] as const) {
      await payload.update({ collection: 'translations', id: doc.id, locale: lang, data: { value: TRANSLATIONS_ADDENDUM[lang][key] ?? '' } })
    }
  })
  info(`📝 Translations (новые): ${addKeys.length}`)

  // 3) Products — старые (на ключах перевода)
  await mapLimit(PRODUCTS, CONC, async (p, i) => {
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
        ...(PASSPORTS[p.id] ? { passport: PASSPORTS[p.id] as never } : {}),
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
  })

  // 3.5) Products — новые (прямые RU-значения; KY/EN дозаполнить в админке)
  await mapLimit(NEW_PRODUCTS, CONC, async (p, j) => {
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
        ...(PASSPORTS[p.id] ? { passport: PASSPORTS[p.id] as never } : {}),
      },
    })
  })
  info(`📦 Products: ${PRODUCTS.length + NEW_PRODUCTS.length}`)

  // 4) Cities (+ руководитель, контакты-плейсхолдер, исправление названий)
  await mapLimit(CITIES, CONC, async (c, i) => {
    const doc = await payload.create({
      collection: 'cities',
      locale: 'ru',
      data: {
        cityId: c.id,
        order: i,
        code: c.code,
        isMain: !!c.isMain,
        name: CITY_NAME_OVERRIDES[c.id]?.ru ?? c.name.ru ?? '',
        region: c.region.ru ?? '',
        ...cityBranchData(c.id, 'ru', !!c.isMain),
        ...(CITY_COORDS[c.id] ?? {}),
      },
    })
    for (const lang of ['ky', 'en'] as const) {
      await payload.update({
        collection: 'cities',
        id: doc.id,
        locale: lang,
        data: {
          name: CITY_NAME_OVERRIDES[c.id]?.[lang] ?? c.name[lang] ?? '',
          region: c.region[lang] ?? '',
          ...cityBranchData(c.id, lang, !!c.isMain),
        },
      })
    }
  })
  info(`📍 Cities: ${CITIES.length}`)

  // 5) News (news1..news3)
  const newsIds = ['news1', 'news2', 'news3']
  await mapLimit(newsIds, CONC, async (nk, i) => {
    const doc = await payload.create({
      collection: 'news',
      locale: 'ru',
      data: { order: i, cat: v('ru', `${nk}_cat`), title: v('ru', `${nk}_title`), text: v('ru', `${nk}_text`), date: v('ru', `${nk}_date`) },
    })
    for (const lang of ['ky', 'en'] as const) {
      await payload.update({
        collection: 'news',
        id: doc.id,
        locale: lang,
        data: { cat: v(lang, `${nk}_cat`), title: v(lang, `${nk}_title`), text: v(lang, `${nk}_text`), date: v(lang, `${nk}_date`) },
      })
    }
  })
  info(`📰 News: ${newsIds.length}`)

  // 6) Stories (story1..story3)
  const storyIds = ['story1', 'story2', 'story3']
  await mapLimit(storyIds, CONC, async (sk, i) => {
    const doc = await payload.create({
      collection: 'stories',
      locale: 'ru',
      data: { order: i, badge: v('ru', `${sk}_badge`), name: v('ru', `${sk}_name`), biz: v('ru', `${sk}_biz`), quote: v('ru', `${sk}_quote`) },
    })
    for (const lang of ['ky', 'en'] as const) {
      await payload.update({
        collection: 'stories',
        id: doc.id,
        locale: lang,
        data: { badge: v(lang, `${sk}_badge`), name: v(lang, `${sk}_name`), biz: v(lang, `${sk}_biz`), quote: v(lang, `${sk}_quote`) },
      })
    }
  })
  info(`🏆 Stories: ${storyIds.length}`)

  // 7) Партнёры
  await mapLimit(PARTNERS, CONC, async (p, i) => {
    await payload.create({ collection: 'partners', data: { name: p.name, type: p.type, order: i } })
  })
  info(`🤝 Partners: ${PARTNERS.length}`)

  // 8) Вехи юбилея
  await mapLimit(MILESTONES, CONC, async (m, i) => {
    const doc = await payload.create({ collection: 'milestones', locale: 'ru', data: { year: m.year, order: i, tag: m.tag.ru, desc: m.desc.ru } })
    for (const lang of ['ky', 'en'] as const) {
      await payload.update({ collection: 'milestones', id: doc.id, locale: lang, data: { tag: m.tag[lang], desc: m.desc[lang] } })
    }
  })
  info(`📅 Milestones: ${MILESTONES.length}`)

  // 9) Globals — «Общие настройки» (локализованные поля по всем локалям)
  await payload.updateGlobal({
    slug: 'settings',
    locale: 'ru',
    data: {
      siteName: SETTINGS.siteName.ru,
      phoneShort: SETTINGS.phoneShort,
      phone: SETTINGS.phone,
      email: SETTINGS.email,
      address: SETTINGS.address.ru,
      hours: SETTINGS.hours.ru,
      oldSiteUrl: SETTINGS.oldSiteUrl,
      nbkrNotice: SETTINGS.nbkrNotice.ru,
      floatingCtaText: SETTINGS.floatingCtaText.ru,
      mapCoordsLabel: SETTINGS.mapCoordsLabel,
      socials: SETTINGS.socials as { network: 'instagram' | 'youtube' | 'linkedin' | 'facebook' | 'telegram' | 'whatsapp' | 'tiktok'; url: string }[],
    },
  })
  for (const lang of ['ky', 'en'] as const) {
    await payload.updateGlobal({
      slug: 'settings',
      locale: lang,
      data: {
        siteName: SETTINGS.siteName[lang],
        address: SETTINGS.address[lang],
        hours: SETTINGS.hours[lang],
        nbkrNotice: SETTINGS.nbkrNotice[lang],
        floatingCtaText: SETTINGS.floatingCtaText[lang],
      },
    })
  }
  info('⚙️ Global: settings')

  // 10) Globals — «Цифры фонда» и «Калькулятор» (не локализованы)
  await payload.updateGlobal({ slug: 'stats', data: STATS })
  await payload.updateGlobal({ slug: 'calculator', data: CALCULATOR })
  info('⚙️ Globals: stats, calculator')

  info('✅ Seed завершён')
  return log
}

/**
 * Точечное (НЕразрушающее) обновление филиалов: руководитель, контакты-плейсхолдер
 * и исправление названий-плейсхолдеров — БЕЗ удаления/пересоздания других коллекций.
 * Обновляет уже существующие города по cityId. Идемпотентно.
 * Вызывается из /api/seed?mode=branches (когда полный пересев нежелателен).
 */
export async function seedBranches(payload: Payload): Promise<string[]> {
  const log: string[] = []
  const info = (m: string) => {
    payload.logger.info(m)
    log.push(m)
  }
  info('🌱 Seed branches: старт (точечно, без пересева)')

  const res = await payload.find({ collection: 'cities', locale: 'ru', limit: 100, depth: 0, pagination: false })
  await mapLimit(res.docs, CONC, async (doc) => {
    const cityId = String(doc.cityId)
    const isMain = !!doc.isMain
    const nameOverride = CITY_NAME_OVERRIDES[cityId]

    await payload.update({
      collection: 'cities',
      id: doc.id,
      locale: 'ru',
      data: {
        // имя трогаем ТОЛЬКО при наличии override (иначе затёрли бы существующее)
        ...(nameOverride ? { name: nameOverride.ru } : {}),
        ...cityBranchData(cityId, 'ru', isMain),
      },
    })
    for (const lang of ['ky', 'en'] as const) {
      await payload.update({
        collection: 'cities',
        id: doc.id,
        locale: lang,
        data: {
          ...(nameOverride ? { name: nameOverride[lang] } : {}),
          ...cityBranchData(cityId, lang, isMain),
        },
      })
    }
    const dir = CITY_DIRECTORS[cityId]
    info(`📍 ${cityId}${dir ? ' · ' + dir : ''}${nameOverride ? ' · → ' + nameOverride.ru : ''}`)
  })

  info('✅ Seed branches завершён')
  return log
}
