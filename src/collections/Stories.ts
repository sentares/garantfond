import type { CollectionConfig } from 'payload'
import { revalidateContent } from '../lib/revalidate'
import { slugify } from '../lib/slug'
import { contentBlocks } from './contentBlocks'

export const Stories: CollectionConfig = {
  slug: 'stories',
  labels: {
    singular: 'История',
    plural: 'Истории',
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
      name: 'slug',
      type: 'text',
      unique: true,
      index: true,
      label: 'Slug (адрес страницы)',
      admin: {
        position: 'sidebar',
        description: 'Латиницей, напр. «aigerim-tekstil». Адрес: /stories/<slug>. Заполняется автоматически из имени, если оставить пустым.',
      },
      hooks: {
        beforeValidate: [
          ({ value, data }) => {
            if (value) return slugify(value as string) || undefined
            return slugify((data?.name as string) || '') || undefined
          },
        ],
      },
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
      name: 'photo',
      type: 'upload',
      relationTo: 'media',
      label: 'Фото',
      admin: { description: 'Фото героя истории — для карточки и страницы.' },
    },
    {
      name: 'quote',
      type: 'textarea',
      label: 'Цитата (короткая, для карточки)',
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
          'Собери страницу истории из блоков в нужном порядке (перетаскивай за ⋮⋮): текст, фото, галерея, видео, документы, цитата, кнопка.',
      },
    },
    {
      // Устаревшее поле (заменено на «Содержимое страницы»). Скрыто, колонку не удаляем.
      name: 'body',
      type: 'richText',
      localized: true,
      admin: { hidden: true },
    },
  ],
}
