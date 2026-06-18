import type { Lang } from '@/types'

type L<T = string> = Record<Lang, T>

/**
 * Новый контент, добавленный при переходе «всё через админку».
 * Используется только сидом (src/seed.ts) для первичного заполнения БД.
 * После сида всё редактируется в админке Payload.
 */

// --- Новые ключи в «Тексты сайта» (translations) ---
export const TRANSLATIONS_ADDENDUM: Record<Lang, Record<string, string>> = {
  ru: {
    // Юбилей
    ann_badge: '🎉 Юбилейный год · 2016–2026',
    ann_title1: 'Десять лет',
    ann_title2: 'на службе',
    ann_title3: 'предпринимателей',
    ann_quote: '«За десять лет мы научились видеть в каждой заявке не цифру, а судьбу. Эта оптика и есть наш капитал.»',
    ann_quote_src: '— Из обращения председателя правления',
    ann_btn: 'Смотреть юбилейный спецпроект →',
    ann_tl_title: 'Ключевые вехи',
    // Карта
    map_eyebrow: 'СЕТЬ ПРИСУТСТВИЯ',
    map_title1: 'Семь городов.',
    map_title2: 'Один стандарт работы.',
    map_panel_eyebrow: 'Филиалы фонда',
    map_all: 'Все филиалы',
    map_hq: 'Головной офис',
    map_branch: 'Филиал',
    // Прочее
    contact_product_ph: 'Выберите продукт',
    article_not_found: 'Материал не найден',
    back_home: 'На главную',
  },
  ky: {
    ann_badge: '🎉 Юбилей жылы · 2016–2026',
    ann_title1: 'Он жыл',
    ann_title2: 'ишкерлерге',
    ann_title3: 'кызмат кылып',
    ann_quote: '«Он жылда биз ар бир арызда сандан эмес, тагдырды көрүүнү үйрөндүк. Ушул көз караш — биздин капитал.»',
    ann_quote_src: '— Башкарма төрагасынын кайрылуусунан',
    ann_btn: 'Юбилей долбоорун көрүү →',
    ann_tl_title: 'Негизги вехалар',
    map_eyebrow: 'КАТЫШУУ ТАРМАГЫ',
    map_title1: 'Жети шаар.',
    map_title2: 'Бир иш стандарты.',
    map_panel_eyebrow: 'Фонддун филиалдары',
    map_all: 'Бардык филиалдар',
    map_hq: 'Башкы офис',
    map_branch: 'Филиал',
    contact_product_ph: 'Продуктту тандаңыз',
    article_not_found: 'Материал табылган жок',
    back_home: 'Башкы бетке',
  },
  en: {
    ann_badge: '🎉 Anniversary Year · 2016–2026',
    ann_title1: 'Ten years',
    ann_title2: 'serving',
    ann_title3: 'entrepreneurs',
    ann_quote: '"Over ten years we learned to see not a number in each application, but a destiny. This vision is our capital."',
    ann_quote_src: "— From the Chairman's address",
    ann_btn: 'View anniversary project →',
    ann_tl_title: 'Key milestones',
    map_eyebrow: 'BRANCH NETWORK',
    map_title1: 'Seven cities.',
    map_title2: 'One standard of work.',
    map_panel_eyebrow: 'Fund branches',
    map_all: 'All branches',
    map_hq: 'Head Office',
    map_branch: 'Branch',
    contact_product_ph: 'Choose a product',
    article_not_found: 'Article not found',
    back_home: 'Home',
  },
}

// Группа в админке для новых ключей (см. Translations.group)
export const ADDENDUM_GROUPS: Record<string, string> = {
  ann_badge: 'common', ann_title1: 'common', ann_title2: 'common', ann_title3: 'common',
  ann_quote: 'common', ann_quote_src: 'common', ann_btn: 'common', ann_tl_title: 'common',
  map_eyebrow: 'contact', map_title1: 'contact', map_title2: 'contact',
  map_panel_eyebrow: 'contact', map_all: 'contact', map_hq: 'contact', map_branch: 'contact',
  contact_product_ph: 'contact', article_not_found: 'common', back_home: 'common',
}

// --- Вехи юбилея (milestones) ---
export const MILESTONES: { year: number; tag: L; desc: L }[] = [
  {
    year: 2016,
    tag: { ru: 'Учреждение', ky: 'Негизделген', en: 'Founded' },
    desc: {
      ru: 'Распоряжение Правительства КР. Уставный капитал — 72 млн сом.',
      ky: 'КР Өкмөтүнүн буйругу. Уставдык капитал — 72 млн сом.',
      en: 'Decree of the Government of KR. Charter capital — 72M som.',
    },
  },
  {
    year: 2018,
    tag: { ru: '1000-я гарантия', ky: '1000-чи кепилдик', en: '1000th guarantee' },
    desc: {
      ru: 'Пройдена отметка в 1 000 выданных гарантий.',
      ky: '1 000 берилген кепилдик чегинен өтүлдү.',
      en: 'Passed the milestone of 1,000 guarantees issued.',
    },
  },
  {
    year: 2020,
    tag: { ru: 'COVID-программа', ky: 'COVID-программа', en: 'COVID Programme' },
    desc: {
      ru: 'Антикризисная поддержка МСБ: отсрочки, переоформление.',
      ky: 'ОКБ үчүн кризиске каршы колдоо: мөөнөттөрдү узартуу.',
      en: 'Anti-crisis support for SMEs: deferrals, restructuring.',
    },
  },
  {
    year: 2022,
    tag: { ru: 'Программа «Келечек»', ky: '«Келечек» программасы', en: '"Kelechek" Programme' },
    desc: {
      ru: 'Запуск гарантий для женского предпринимательства.',
      ky: 'Аял ишкерчилиги үчүн кепилдиктердин ишке кириши.',
      en: 'Launch of guarantees for women entrepreneurs.',
    },
  },
  {
    year: 2024,
    tag: { ru: '50 млрд сом', ky: '50 млрд сом', en: '50B som' },
    desc: {
      ru: 'Совокупный объём обеспеченных кредитов превысил 50 млрд сом.',
      ky: 'Камсыздалган кредиттердин көлөмү 50 млрд сомдон ашты.',
      en: 'Total volume of supported loans exceeded 50B som.',
    },
  },
  {
    year: 2026,
    tag: { ru: '10-летие', ky: '10 жылдык', en: '10th Anniversary' },
    desc: {
      ru: 'Юбилейный год: 18,2 млрд сом гарантий, 7 филиалов, 28 партнёров.',
      ky: 'Юбилей жылы: 18,2 млрд сом кепилдик, 7 филиал, 28 өнөктөш.',
      en: 'Jubilee year: 18.2B som in guarantees, 7 branches, 28 partners.',
    },
  },
]

// --- Партнёры ---
export const PARTNERS: { name: string; type: 'bank' | 'org' | 'intl' }[] = [
  { name: 'Демир Банк', type: 'bank' },
  { name: 'Айыл Банк', type: 'bank' },
  { name: 'РСК Банк', type: 'bank' },
  { name: 'Бакай Банк', type: 'bank' },
  { name: 'Optima Bank', type: 'bank' },
  { name: 'KICB', type: 'bank' },
  { name: 'Эко Исламик', type: 'bank' },
  { name: 'Кыргызкоммерц', type: 'bank' },
  { name: 'Капитал Банк', type: 'bank' },
  { name: 'Халык Банк', type: 'bank' },
  { name: 'MBank', type: 'bank' },
  { name: 'Финка Банк', type: 'bank' },
  { name: 'Толубай Банк', type: 'bank' },
  { name: 'BAI-Tushum', type: 'bank' },
  { name: 'IFC', type: 'intl' },
  { name: 'GIZ', type: 'intl' },
  { name: 'USAID', type: 'intl' },
  { name: 'ЕАБР', type: 'intl' },
]

// --- Координаты городов на карте (%, левая/верхняя) ---
export const CITY_COORDS: Record<string, { posX: number; posY: number }> = {
  bishkek: { posX: 48.7, posY: 13.4 },
  talas: { posX: 29.3, posY: 20.9 },
  karakol: { posX: 80.1, posY: 21.5 },
  naryn: { posX: 60.2, posY: 44.0 },
  osh: { posX: 33.9, posY: 63.6 },
  manas: { posX: 35.1, posY: 52.0 },
  batken: { posX: 16.5, posY: 77.1 },
}

// --- Руководители филиалов (поле director, для попапа) ---
// ФИО одинаковы для ru/ky (кириллица); en дозаполняется в админке (пусто → фолбэк на ru).
// Ключ — cityId (см. CITIES). У главного офиса (bishkek) руководитель не задан.
export const CITY_DIRECTORS: Record<string, string> = {
  manas: 'Бекташев Абдихалил Абдилазизович', // Жалал-Абад
  osh: 'Суранов Марипбек Равшанович',
  talas: 'Жусупов Мурат Наматбекович',
  karakol: 'Дыйкамбаев Алмазбек Мукашович', // Иссык-Куль
  naryn: 'Чукуев Камчыбек Муканбетович',
  batken: 'Токтосунов Канымет Асылбекович',
}

// --- Исправление названий городов (плейсхолдеры исходных данных) ---
// «Манас» (Джалал-Абадская обл.) → «Жалал-Абад».
export const CITY_NAME_OVERRIDES: Record<string, L> = {
  manas: { ru: 'Жалал-Абад', ky: 'Жалал-Абад', en: 'Jalal-Abad' },
}

// --- «Общие настройки» (global: settings) ---
export const SETTINGS = {
  siteName: { ru: 'Гарантийный Фонд', ky: 'Кепилдик Фонду', en: 'Guarantee Fund' } as L,
  phoneShort: '7500',
  phone: '7500 | (0312) 66 49 60',
  email: 'office@gf.kg',
  address: {
    ru: 'г. Бишкек, пр. Чуй 114, 4 этаж, каб. 408',
    ky: 'Бишкек ш., Чүй пр. 114, 4-кабат, 408-каб.',
    en: 'Bishkek, Chui Ave 114, 4th floor, office 408',
  } as L,
  hours: {
    ru: 'Пн–Пт: 09:00 – 18:00',
    ky: 'Дш–Жм: 09:00 – 18:00',
    en: 'Mon–Fri: 09:00 – 18:00',
  } as L,
  oldSiteUrl: 'https://gf.kg/',
  nbkrNotice: {
    ru: 'Свидетельство НБКР №1',
    ky: 'УБнын күбөлүгү №1',
    en: 'NBKR Certificate No.1',
  } as L,
  floatingCtaText: {
    ru: 'Оставить заявку',
    ky: 'Арыз калтыруу',
    en: 'Leave a request',
  } as L,
  mapCoordsLabel: '41°N – 43°N · KGZ TERRITORY',
  socials: [
    { network: 'instagram', url: 'https://www.instagram.com/guaranteefund_kg' },
    { network: 'youtube', url: 'https://youtube.com/channel/UCgapUlpzauQkrcmvRY5X54Q' },
    { network: 'linkedin', url: 'https://www.linkedin.com/company/guaranteefund/' },
  ],
}

// --- «Цифры фонда» (global: stats) ---
export const STATS = {
  guaranteesCount: 21129,
  guaranteesSum: 18.2,
  loansSum: 54.8,
  repayRate: 98.22,
  years: 10,
  branches: 7,
  partnersCount: 28,
  regionsCovered: 7,
}

// --- «Калькулятор» (global: calculator) ---
export const CALCULATOR = {
  minAmount: 1,
  maxAmount: 50,
  stepAmount: 0.5,
  defaultAmount: 10,
  minTerm: 6,
  maxTerm: 84,
  stepTerm: 6,
  defaultTerm: 36,
  guaranteePct: 50,
  annualFeePct: 1.8,
  currencies: [{ code: 'KGS' }, { code: 'USD' }, { code: 'EUR' }],
}
