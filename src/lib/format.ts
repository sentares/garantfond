/**
 * Форматирование чисел для сайта (русская типографика):
 *  21129   → «21 129»   (пробел-разделитель тысяч)
 *  18.2    → «18,2»     (запятая-разделитель дробной части)
 *  98.22   → «98,22»
 *  10      → «10»
 */
export function formatNum(n: number | null | undefined): string {
  if (n === null || n === undefined || Number.isNaN(n)) return '0'
  return n.toLocaleString('ru-RU', { maximumFractionDigits: 2 })
}
