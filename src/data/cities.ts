import type { City } from '@/types'

export const CITIES: City[] = [
  { id: 'bishkek', name: { ru: 'Бишкек',  ky: 'Бишкек',  en: 'Bishkek' }, region: { ru: 'Чуйская обл.',       ky: 'Чүй обл.',       en: 'Chui region'      }, code: 'BIS', isMain: true },
  { id: 'talas',   name: { ru: 'Талас',   ky: 'Талас',   en: 'Talas'   }, region: { ru: 'Таласская обл.',     ky: 'Талас обл.',     en: 'Talas region'     }, code: 'TLS' },
  { id: 'karakol', name: { ru: 'Каракол', ky: 'Каракол', en: 'Karakol' }, region: { ru: 'Иссык-Кульская обл.',ky: 'Ысык-Көл обл.',  en: 'Issyk-Kul region' }, code: 'KRK' },
  { id: 'naryn',   name: { ru: 'Нарын',   ky: 'Нарын',   en: 'Naryn'   }, region: { ru: 'Нарынская обл.',     ky: 'Нарын обл.',     en: 'Naryn region'     }, code: 'NRN' },
  { id: 'osh',     name: { ru: 'Ош',      ky: 'Ош',      en: 'Osh'     }, region: { ru: 'Ошская обл.',        ky: 'Ош обл.',        en: 'Osh region'       }, code: 'OSH' },
  { id: 'manas',   name: { ru: 'Манас',   ky: 'Манас',   en: 'Manas'   }, region: { ru: 'Джалал-Абадская обл.',ky: 'Жалал-Абад обл.',en: 'Jalal-Abad region'}, code: 'JLA' },
  { id: 'batken',  name: { ru: 'Баткен',  ky: 'Баткен',  en: 'Batken'  }, region: { ru: 'Баткенская обл.',    ky: 'Баткен обл.',    en: 'Batken region'    }, code: 'BTK' },
]

export type CityType = typeof CITIES[0]