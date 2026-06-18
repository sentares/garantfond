import type { CollectionConfig } from 'payload'
import { revalidateContent } from '../lib/revalidate'

export const Cities: CollectionConfig = {
  slug: 'cities',
  labels: {
    singular: 'Город',
    plural: 'Города',
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
    {
      name: 'director',
      type: 'text',
      label: 'Руководитель филиала',
      localized: true,
      admin: { description: 'ФИО начальника филиала — показывается в попапе при клике на филиал.' },
    },
    {
      name: 'address',
      type: 'text',
      label: 'Адрес',
      localized: true,
      admin: { description: 'напр. «г. Бишкек, ул. Тыныстанова, 199»' },
    },
    {
      type: 'row',
      fields: [
        { name: 'phone', type: 'text', label: 'Телефон', admin: { width: '50%' } },
        { name: 'email', type: 'text', label: 'E-mail', admin: { width: '50%' } },
      ],
    },
    {
      name: 'hours',
      type: 'text',
      label: 'Часы работы',
      localized: true,
      admin: { description: 'напр. «Пн–Пт, 9:00–18:00»' },
    },
    {
      name: 'mapLink',
      type: 'text',
      label: 'Ссылка на карту (2GIS/Google)',
      admin: { description: 'Необязательно. Открывается при клике на филиал.' },
    },
    {
      type: 'row',
      fields: [
        { name: 'posX', type: 'number', label: 'На карте: по горизонтали, %', admin: { width: '50%', description: 'Положение точки на карте. 0–100, напр. 48.7' } },
        { name: 'posY', type: 'number', label: 'На карте: по вертикали, %', admin: { width: '50%', description: '0–100, напр. 13.4' } },
      ],
    },
  ],
}
