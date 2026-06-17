import type { CollectionConfig } from 'payload'
import { passportBlocks } from './passportBlocks'

export const Products: CollectionConfig = {
  slug: 'products',
  labels: {
    singular: 'Продукт',
    plural: 'Продукты',
  },
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'order'],
    group: 'Контент',
  },
  defaultSort: 'order',
  fields: [
    {
      name: 'productId',
      type: 'text',
      required: true,
      unique: true,
      label: 'ID (slug)',
      admin: { description: 'gorizont, bereke, izhara, ishker, korporativ, green' },
    },
    {
      name: 'order',
      type: 'number',
      label: 'Порядок',
      defaultValue: 0,
    },
    {
      name: 'categories',
      type: 'relationship',
      relationTo: 'categories',
      hasMany: true,
      label: 'Категории',
      admin: { description: 'Определяют, под какими табами показывается продукт.' },
    },
    {
      name: 'isGreen',
      type: 'checkbox',
      label: 'Зелёный продукт',
      defaultValue: false,
    },
    {
      name: 'gradient',
      type: 'text',
      label: 'CSS-градиент карточки',
      admin: { description: 'напр. linear-gradient(135deg,#0E2660,#1B3E8F)' },
    },
    {
      type: 'row',
      fields: [
        { name: 'name', type: 'text', label: 'Название', localized: true },
        { name: 'badge', type: 'text', label: 'Бейдж', localized: true },
      ],
    },
    {
      name: 'desc',
      type: 'textarea',
      label: 'Описание',
      localized: true,
    },
    {
      type: 'row',
      fields: [
        { name: 'amount', type: 'text', label: 'Сумма', localized: true },
        { name: 'cover', type: 'text', label: 'Покрытие', localized: true },
        { name: 'term', type: 'text', label: 'Срок', localized: true },
      ],
    },
    {
      name: 'passport',
      type: 'blocks',
      label: 'Паспорт продукта',
      localized: true,
      blocks: passportBlocks,
      admin: {
        description: 'Подробная карточка-паспорт (кнопка «Подробнее»). Собирается из блоков: заголовок, таблица «поле — значение», таблица, список, примечание.',
      },
    },
  ],
}
