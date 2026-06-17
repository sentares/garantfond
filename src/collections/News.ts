import type { CollectionConfig } from 'payload'

export const News: CollectionConfig = {
  slug: 'news',
  labels: {
    singular: 'Новость',
    plural: 'Новости',
  },
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'cat', 'order'],
    group: 'Контент',
  },
  defaultSort: 'order',
  fields: [
    {
      name: 'order',
      type: 'number',
      label: 'Порядок',
      defaultValue: 0,
    },
    {
      name: 'cat',
      type: 'text',
      label: 'Рубрика',
      localized: true,
    },
    {
      name: 'title',
      type: 'text',
      label: 'Заголовок',
      localized: true,
    },
    {
      name: 'text',
      type: 'textarea',
      label: 'Текст',
      localized: true,
    },
    {
      name: 'date',
      type: 'text',
      label: 'Дата (как отображать)',
      localized: true,
      admin: { description: 'напр. «12 мая 2026 · 3 мин чтения»' },
    },
  ],
}
