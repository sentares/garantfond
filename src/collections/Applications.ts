import type { CollectionConfig } from 'payload'

/**
 * Заявки с публичной формы (Contact.tsx → POST /api/apply).
 *
 * Доступ:
 *  - create НАПРЯМУЮ через REST запрещён (только админ) — анонимные заявки
 *    идут через защищённый роут /api/apply, который пишет Local API
 *    (overrideAccess: true) с валидацией/honeypot/rate-limit и форсит status='new'.
 *  - read/update/delete — только авторизованный админ.
 *
 * Не локализуется (пользовательский ввод — одно значение).
 */
export const Applications: CollectionConfig = {
  slug: 'applications',
  labels: {
    singular: 'Заявка',
    plural: 'Заявки',
  },
  access: {
    create: ({ req }) => !!req.user,
    read: ({ req }) => !!req.user,
    update: ({ req }) => !!req.user,
    delete: ({ req }) => !!req.user,
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'phone', 'product', 'status', 'createdAt'],
    group: 'Заявки',
  },
  defaultSort: '-createdAt',
  fields: [
    {
      name: 'status',
      type: 'select',
      label: 'Статус',
      defaultValue: 'new',
      options: [
        { label: 'Новая', value: 'new' },
        { label: 'В работе', value: 'in_progress' },
        { label: 'Закрыта', value: 'closed' },
      ],
      admin: { position: 'sidebar' },
    },
    {
      name: 'lang',
      type: 'text',
      label: 'Язык формы',
      admin: { position: 'sidebar', readOnly: true, description: 'С какого языка сайта пришла заявка.' },
    },
    {
      type: 'row',
      fields: [
        { name: 'name', type: 'text', label: 'Имя', required: true, admin: { width: '50%' } },
        { name: 'phone', type: 'text', label: 'Телефон', required: true, admin: { width: '50%' } },
      ],
    },
    {
      type: 'row',
      fields: [
        { name: 'company', type: 'text', label: 'Компания', admin: { width: '50%' } },
        { name: 'product', type: 'text', label: 'Интересующий продукт', admin: { width: '50%' } },
      ],
    },
    {
      name: 'comment',
      type: 'textarea',
      label: 'Комментарий',
    },
  ],
}
