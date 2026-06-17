import type { Product } from '@/types'

export const PRODUCTS: Product[] = [
  { id:'gorizont',   cat:'msb',
    nameKey:'p_gorizont_name',   badgeKey:'p_gorizont_badge',
    descKey:'p_gorizont_desc',   amountKey:'p_gorizont_amount',
    coverKey:'p_gorizont_cover', termKey:'p_gorizont_term',
    gradient:'linear-gradient(135deg,#0E2660,#1B3E8F)' },
  { id:'bereke',     cat:'islamic',
    nameKey:'p_bereke_name',     badgeKey:'p_bereke_badge',
    descKey:'p_bereke_desc',     amountKey:'p_bereke_amount',
    coverKey:'p_bereke_cover',   termKey:'p_bereke_term',
    gradient:'linear-gradient(135deg,#1a4020,#2a6030)' },
  { id:'izhara',     cat:'leasing',
    nameKey:'p_izhara_name',     badgeKey:'p_izhara_badge',
    descKey:'p_izhara_desc',     amountKey:'p_izhara_amount',
    coverKey:'p_izhara_cover',   termKey:'p_izhara_term',
    gradient:'linear-gradient(135deg,#001828,#003058)' },
  { id:'ishker',     cat:'women',
    nameKey:'p_ishker_name',     badgeKey:'p_ishker_badge',
    descKey:'p_ishker_desc',     amountKey:'p_ishker_amount',
    coverKey:'p_ishker_cover',   termKey:'p_ishker_term',
    gradient:'linear-gradient(135deg,#5a1060,#8a2090)' },
  { id:'korporativ', cat:'corp msb',
    nameKey:'p_korp_name',       badgeKey:'p_korp_badge',
    descKey:'p_korp_desc',       amountKey:'p_korp_amount',
    coverKey:'p_korp_cover',     termKey:'p_korp_term',
    gradient:'linear-gradient(135deg,#1B3E8F,#3068D0)' },
  { id:'green',      cat:'green', isGreen:true,
    nameKey:'p_green_name',      badgeKey:'p_green_badge',
    descKey:'p_green_desc',      amountKey:'p_green_amount',
    coverKey:'p_green_cover',    termKey:'p_green_term',
    gradient:'linear-gradient(135deg,#0a2e14,#0f5c28,#1a8040)' },
]

// Новые продукты с прямыми значениями (RU). KY/EN дозаполняются в админке.
export interface SeedProduct {
  id: string
  cats: string[]
  gradient: string
  isGreen?: boolean
  name: string
  badge: string
  desc: string
  amount: string
  cover: string
  term: string
}

export const NEW_PRODUCTS: SeedProduct[] = [
  {
    id: 'yldam',
    cats: ['msb'],
    gradient: 'linear-gradient(135deg,#0a4a4a,#0e9e86)',
    name: 'Ылдам',
    badge: 'ЭКСПРЕСС',
    desc: 'Гарантия по упрощённой портфельной схеме — без дополнительного анализа заявки со стороны ГФ. Ускоряет получение кредита для МСБ при недостатке залога.',
    amount: 'до 1,5 млн',
    cover: 'до 30%',
    term: '—',
  },
  {
    id: 'kelechek',
    cats: ['mortgage'],
    gradient: 'linear-gradient(135deg,#3a1a66,#7a34b0)',
    name: 'Келечек',
    badge: 'ИПОТЕКА',
    desc: 'Ипотечная гарантия для граждан КР при отсутствии или нехватке первоначального взноса — помогает приобрести собственное жильё.',
    amount: 'до 3 млн / $34 500',
    cover: 'до 30%',
    term: '—',
  },
  {
    id: 'unaa',
    cats: ['auto'],
    gradient: 'linear-gradient(135deg,#5a3a05,#b07815)',
    name: 'Унаа',
    badge: 'АВТО',
    desc: 'Гарантия по упрощённой процедуре на покупку авто и грузового коммерческого транспорта отечественного производства.',
    amount: '—',
    cover: 'до 30%',
    term: '—',
  },
]