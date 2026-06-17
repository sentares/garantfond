import type { CollectionConfig } from 'payload'

export const Cities: CollectionConfig = {
  slug: 'cities',
  labels: {
    singular: 'Город',
    plural: 'Города',
  },
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'code', 'isMain', 'order'],
    group: 'Контент',
  },
  defaultSort: 'order',
  fields: [
    {
      name: 'cityId',
      type: 'text',
      required: true,
      unique: true,
      label: 'ID (slug)',
    },
    {
      name: 'order',
      type: 'number',
      label: 'Порядок',
      defaultValue: 0,
    },
    {
      type: 'row',
      fields: [
        { name: 'code', type: 'text', label: 'Код', admin: { width: '40%' } },
        { name: 'isMain', type: 'checkbox', label: 'Главный офис' },
      ],
    },
    {
      type: 'row',
      fields: [
        { name: 'name', type: 'text', label: 'Город', localized: true },
        { name: 'region', type: 'text', label: 'Область', localized: true },
      ],
    },
  ],
}
