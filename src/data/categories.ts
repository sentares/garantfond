export interface SeedCategory {
  slug: string
  order: number
  label: { ru: string; ky: string; en: string }
}

// Категории-табы раздела «Продукты». Порядок = порядок табов.
export const CATEGORIES: SeedCategory[] = [
  { slug: 'msb', order: 1, label: { ru: 'МСБ', ky: 'МКБ', en: 'SME' } },
  { slug: 'islamic', order: 2, label: { ru: 'Исламское', ky: 'Исламдык', en: 'Islamic' } },
  { slug: 'women', order: 3, label: { ru: 'Женщины', ky: 'Аялдар', en: 'Women' } },
  { slug: 'leasing', order: 4, label: { ru: 'Лизинг', ky: 'Лизинг', en: 'Leasing' } },
  { slug: 'corp', order: 5, label: { ru: 'Корпоратив', ky: 'Корпоратив', en: 'Corporate' } },
  { slug: 'green', order: 6, label: { ru: '🌿 Green', ky: '🌿 Green', en: '🌿 Green' } },
  { slug: 'mortgage', order: 7, label: { ru: 'Ипотека', ky: 'Ипотека', en: 'Mortgage' } },
  { slug: 'auto', order: 8, label: { ru: 'Авто', ky: 'Унаа', en: 'Auto' } },
]
