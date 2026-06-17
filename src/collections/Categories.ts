import type { CollectionConfig } from 'payload'
import { revalidateContent } from '../lib/revalidate'

export const Categories: CollectionConfig = {
  slug: 'categories',
  labels: {
    singular: 'Категория',
    plural: 'Категории продуктов',
  },
  access: {
    read: () => true,
  },
  hooks: {
    afterChange: [revalidateContent],
    afterDelete: [revalidateContent],
  },
  admin: {
    useAsTitle: 'label',
    defaultColumns: ['label', 'slug', 'order'],
    group: 'Контент',
    description: 'Табы-фильтры в разделе «Продукты». Порядок и подписи берутся отсюда.',
  },
  defaultSort: 'order',
  fields: [
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      label: 'Код (slug)',
      admin: { description: 'msb, islamic, women, leasing, corp, green, mortgage, auto …' },
    },
    {
      name: 'order',
      type: 'number',
      label: 'Порядок',
      defaultValue: 0,
    },
    {
      name: 'label',
      type: 'text',
      label: 'Подпись таба',
      localized: true,
    },
  ],
}
