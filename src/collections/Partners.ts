import type { CollectionConfig } from 'payload'
import { revalidateContent } from '../lib/revalidate'

export const Partners: CollectionConfig = {
  slug: 'partners',
  labels: {
    singular: 'Партнёр',
    plural: 'Партнёры',
  },
  access: {
    read: () => true,
  },
  hooks: {
    afterChange: [revalidateContent],
    afterDelete: [revalidateContent],
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'type', 'order'],
    group: 'Контент',
    description: 'Банки и организации-партнёры. Показываются в разделе «Партнёры».',
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
      name: 'name',
      type: 'text',
      required: true,
      label: 'Название',
      admin: { description: 'напр. «Демир Банк», «USAID»' },
    },
    {
      name: 'type',
      type: 'select',
      label: 'Тип',
      defaultValue: 'bank',
      options: [
        { label: 'Банк', value: 'bank' },
        { label: 'Организация', value: 'org' },
        { label: 'Международный партнёр', value: 'intl' },
      ],
      admin: { description: 'Влияет на счётчики (банки / организации / международные).' },
    },
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
      label: 'Логотип',
      admin: { description: 'Необязательно. Если пусто — показывается название текстом.' },
    },
    {
      name: 'url',
      type: 'text',
      label: 'Ссылка на сайт',
      admin: { description: 'напр. https://demirbank.kg' },
    },
  ],
}
