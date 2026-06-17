import type { GlobalConfig } from 'payload'
import { revalidateContent } from '../lib/revalidate'

/**
 * «Цифры фонда» — единый источник всех ключевых чисел сайта.
 * Эти значения используются сразу в нескольких местах (блок статистики,
 * бегущая строка, раздел «Как это работает»). Меняешь здесь — меняется везде.
 * Сами подписи к цифрам редактируются в разделе «Тексты сайта».
 */
export const Stats: GlobalConfig = {
  slug: 'stats',
  label: 'Цифры фонда',
  access: {
    read: () => true,
  },
  hooks: {
    afterChange: [revalidateContent],
  },
  admin: {
    group: 'Настройки сайта',
    description:
      'Ключевые цифры фонда. Вводите только число (без «млрд», пробелов и %). Форматирование («21 129», «18,2 млрд», «98,22%») сайт делает сам. Эти цифры показываются в блоке статистики, бегущей строке и разделе «Как это работает».',
  },
  fields: [
    {
      type: 'row',
      fields: [
        {
          name: 'guaranteesCount',
          type: 'number',
          label: 'Выдано гарантий (шт.)',
          defaultValue: 21129,
          admin: { width: '50%', description: 'напр. 21129 → покажется «21 129»' },
        },
        {
          name: 'guaranteesSum',
          type: 'number',
          label: 'Сумма гарантий (млрд сом)',
          defaultValue: 18.2,
          admin: { width: '50%', description: 'напр. 18.2 → «18,2 млрд»' },
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'loansSum',
          type: 'number',
          label: 'Объём кредитов (млрд сом)',
          defaultValue: 54.8,
          admin: { width: '50%', description: 'напр. 54.8 → «54,8 млрд»' },
        },
        {
          name: 'repayRate',
          type: 'number',
          label: 'Возвратность (%)',
          defaultValue: 98.22,
          admin: { width: '50%', description: 'напр. 98.22 → «98,22%»' },
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'years',
          type: 'number',
          label: 'Лет на рынке',
          defaultValue: 10,
          admin: { width: '33%' },
        },
        {
          name: 'branches',
          type: 'number',
          label: 'Филиалов по стране',
          defaultValue: 7,
          admin: { width: '33%' },
        },
        {
          name: 'partnersCount',
          type: 'number',
          label: 'Партнёров (банки, МФО, лизинг)',
          defaultValue: 28,
          admin: { width: '34%' },
        },
      ],
    },
    {
      name: 'regionsCovered',
      type: 'number',
      label: 'Охвачено регионов КР',
      defaultValue: 7,
      admin: { description: 'Показывается в разделе «Как это работает».' },
    },
  ],
}
