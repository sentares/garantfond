import type { CollectionConfig } from 'payload'

export const Stories: CollectionConfig = {
  slug: 'stories',
  labels: {
    singular: 'История',
    plural: 'Истории',
  },
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'biz', 'order'],
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
      name: 'badge',
      type: 'text',
      label: 'Бейдж (отрасль · регион)',
      localized: true,
    },
    {
      type: 'row',
      fields: [
        { name: 'name', type: 'text', label: 'Имя', localized: true },
        { name: 'biz', type: 'text', label: 'Бизнес', localized: true },
      ],
    },
    {
      name: 'quote',
      type: 'textarea',
      label: 'Цитата',
      localized: true,
    },
  ],
}
