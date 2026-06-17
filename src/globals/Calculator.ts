import type { GlobalConfig } from 'payload'
import { revalidateContent } from '../lib/revalidate'

/**
 * «Калькулятор» — параметры онлайн-калькулятора гарантии.
 * Диапазоны ползунков, ставки и валюты. Формулы расчёта используют эти значения.
 */
export const Calculator: GlobalConfig = {
  slug: 'calculator',
  label: 'Калькулятор',
  access: {
    read: () => true,
  },
  hooks: {
    afterChange: [revalidateContent],
  },
  admin: {
    group: 'Настройки сайта',
    description:
      'Параметры онлайн-калькулятора гарантии: диапазоны сумм и сроков, процент покрытия, ставка вознаграждения и валюты.',
  },
  fields: [
    {
      type: 'collapsible',
      label: 'Сумма кредита (млн)',
      fields: [
        {
          type: 'row',
          fields: [
            { name: 'minAmount', type: 'number', label: 'Минимум', defaultValue: 1, admin: { width: '33%' } },
            { name: 'maxAmount', type: 'number', label: 'Максимум', defaultValue: 50, admin: { width: '33%' } },
            { name: 'stepAmount', type: 'number', label: 'Шаг', defaultValue: 0.5, admin: { width: '34%' } },
          ],
        },
        {
          name: 'defaultAmount',
          type: 'number',
          label: 'Значение по умолчанию',
          defaultValue: 10,
        },
      ],
    },
    {
      type: 'collapsible',
      label: 'Срок (месяцев)',
      fields: [
        {
          type: 'row',
          fields: [
            { name: 'minTerm', type: 'number', label: 'Минимум', defaultValue: 6, admin: { width: '33%' } },
            { name: 'maxTerm', type: 'number', label: 'Максимум', defaultValue: 84, admin: { width: '33%' } },
            { name: 'stepTerm', type: 'number', label: 'Шаг', defaultValue: 6, admin: { width: '34%' } },
          ],
        },
        {
          name: 'defaultTerm',
          type: 'number',
          label: 'Значение по умолчанию',
          defaultValue: 36,
        },
      ],
    },
    {
      type: 'collapsible',
      label: 'Ставки',
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'guaranteePct',
              type: 'number',
              label: 'Покрытие гарантией, %',
              defaultValue: 50,
              admin: { width: '50%', description: 'Доля кредита, которую покрывает гарантия. напр. 50' },
            },
            {
              name: 'annualFeePct',
              type: 'number',
              label: 'Годовая ставка вознаграждения, %',
              defaultValue: 1.8,
              admin: { width: '50%', description: 'напр. 1.8' },
            },
          ],
        },
      ],
    },
    {
      name: 'currencies',
      type: 'array',
      label: 'Валюты',
      labels: { singular: 'Валюта', plural: 'Валюты' },
      defaultValue: [{ code: 'KGS' }, { code: 'USD' }, { code: 'EUR' }],
      admin: { description: 'Кнопки-переключатели валют. Первая — основная (сом).' },
      fields: [{ name: 'code', type: 'text', label: 'Код', required: true, admin: { description: 'напр. KGS, USD, EUR' } }],
    },
  ],
}
