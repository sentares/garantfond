import type { CollectionConfig } from 'payload'
import { revalidateContent } from '../lib/revalidate'
import { slugify } from '../lib/slug'
import { contentBlocks } from './contentBlocks'

export const News: CollectionConfig = {
  slug: 'news',
  labels: {
    singular: 'Новость',
    plural: 'Новости',
  },
  access: {
    read: () => true,
  },
  hooks: {
    afterChange: [revalidateContent],
    afterDelete: [revalidateContent],
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
      name: 'slug',
      type: 'text',
      unique: true,
      index: true,
      label: 'Slug (адрес страницы)',
      admin: {
        position: 'sidebar',
        description: 'Латиницей, напр. «1000-ya-garantiya». Адрес: /news/<slug>. Заполняется автоматически из заголовка, если оставить пустым.',
      },
      hooks: {
        beforeValidate: [
          ({ value, data }) => {
            if (value) return slugify(value as string) || undefined
            return slugify((data?.title as string) || '') || undefined
          },
        ],
      },
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
      name: 'date',
      type: 'text',
      label: 'Дата (как отображать)',
      localized: true,
      admin: { description: 'напр. «12 мая 2026 · 3 мин чтения»' },
    },
    {
      name: 'cover',
      type: 'upload',
      relationTo: 'media',
      label: 'Обложка',
      admin: { description: 'Картинка для карточки и страницы новости.' },
    },
    {
      name: 'text',
      type: 'textarea',
      label: 'Краткое описание (для карточки)',
      localized: true,
    },
    {
      name: 'content',
      type: 'blocks',
      label: 'Содержимое страницы (конструктор)',
      localized: true,
      blocks: contentBlocks,
      admin: {
        description:
          'Собери страницу из блоков в нужном порядке (перетаскивай за ⋮⋮): текст, фото, галерея, видео, документы, цитата, кнопка. Можно сколько угодно блоков и в любой последовательности.',
      },
    },
    {
      // Устаревшее поле (заменено на «Содержимое страницы»). Скрыто, колонку не удаляем,
      // чтобы не ломать схему БД. Не использовать.
      name: 'body',
      type: 'richText',
      localized: true,
      admin: { hidden: true },
    },
  ],
}
