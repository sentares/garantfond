// Транслитерация кириллицы (рус + кырг) в латиницу для ЧПУ-адресов.
const MAP: Record<string, string> = {
  а: 'a', б: 'b', в: 'v', г: 'g', д: 'd', е: 'e', ё: 'yo', ж: 'zh', з: 'z',
  и: 'i', й: 'y', к: 'k', л: 'l', м: 'm', н: 'n', о: 'o', п: 'p', р: 'r',
  с: 's', т: 't', у: 'u', ф: 'f', х: 'h', ц: 'ts', ч: 'ch', ш: 'sh', щ: 'sch',
  ъ: '', ы: 'y', ь: '', э: 'e', ю: 'yu', я: 'ya',
  // кыргызские
  ң: 'ng', ө: 'o', ү: 'u',
}

/**
 * Делает безопасный латинский slug из строки:
 *  «Айгуль Б.» → «aygul-b», «1000-я гарантия» → «1000-ya-garantiya».
 * Возвращает '' если ничего не осталось (вызывающий обычно даёт fallback на id).
 */
export function slugify(input: string): string {
  const lower = (input || '').toLowerCase().trim()
  let out = ''
  for (const ch of lower) out += ch in MAP ? MAP[ch] : ch
  return out
    .replace(/[^a-z0-9]+/g, '-') // всё кроме латиницы/цифр → дефис
    .replace(/^-+|-+$/g, '') // обрезать дефисы по краям
}
