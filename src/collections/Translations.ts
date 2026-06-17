import type { CollectionConfig } from 'payload'
import { revalidateContent } from '../lib/revalidate'

export const Translations: CollectionConfig = {
  slug: 'translations',
  labels: {
    singular: 'Перевод',
    plural: 'Тексты сайта',
  },
  access: {
    read: () => true,
  },
  hooks: {
    afterChange: [revalidateContent],
    afterDelete: [revalidateContent],
  },
  admin: {
    useAsTitle: 'key',
    defaultColumns: ['key', 'group', 'value'],
    group: 'Контент',
    description: 'Тексты интерфейса по ключам. Переключайте локаль (RU/KY/EN) сверху справа.',
    pagination: { defaultLimit: 200 },
  },
  fields: [
    {
      name: 'key',
      type: 'text',
      required: true,
      unique: true,
      label: 'Ключ',
      admin: {
        description: 'Системный идентификатор. Не менять — на него завязан сайт.',
        readOnly: false,
      },
    },
    {
      name: 'group',
      type: 'select',
      label: 'Раздел',
      defaultValue: 'common',
      options: [
        { label: 'Навигация', value: 'nav' },
        { label: 'Hero', value: 'hero' },
        { label: 'Статистика', value: 'stats' },
        { label: 'Тикер', value: 'ticker' },
        { label: 'Продукты (секция)', value: 'products' },
        { label: 'Как работает', value: 'how' },
        { label: 'Партнёры', value: 'partners' },
        { label: 'Калькулятор', value: 'calc' },
        { label: 'Истории (секция)', value: 'stories' },
        { label: 'Новости (секция)', value: 'news' },
        { label: 'Контакты', value: 'contact' },
        { label: 'Футер', value: 'footer' },
        { label: 'Общее', value: 'common' },
      ],
    },
    {
      name: 'value',
      type: 'textarea',
      label: 'Текст',
      localized: true,
    },
  ],
}
