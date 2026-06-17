import type { Block } from 'payload'

/**
 * Блоки-конструктор для страниц новостей и историй.
 * Редактор собирает страницу из этих блоков в любом порядке (перетаскивание),
 * сам решает, где фото, где текст, где видео и документы.
 */

export const HeadingBlock: Block = {
  slug: 'headingBlock',
  labels: { singular: 'Заголовок', plural: 'Заголовки' },
  fields: [{ name: 'text', type: 'text', label: 'Текст заголовка', required: true }],
}

export const ParagraphBlock: Block = {
  slug: 'paragraph',
  labels: { singular: 'Текст / абзац', plural: 'Тексты' },
  fields: [
    {
      name: 'value',
      type: 'richText',
      label: 'Текст',
      admin: { description: 'Можно делать жирный/курсив, списки, ссылки, заголовки.' },
    },
  ],
}

export const ImageBlock: Block = {
  slug: 'imageBlock',
  labels: { singular: 'Фото', plural: 'Фото' },
  fields: [
    { name: 'image', type: 'upload', relationTo: 'media', label: 'Фото', required: true },
    { name: 'caption', type: 'text', label: 'Подпись под фото (необязательно)' },
    {
      name: 'size',
      type: 'select',
      label: 'Размер',
      defaultValue: 'full',
      options: [
        { label: 'Во всю ширину', value: 'full' },
        { label: 'Обычный', value: 'normal' },
        { label: 'Маленький (по центру)', value: 'small' },
      ],
    },
  ],
}

export const GalleryBlock: Block = {
  slug: 'gallery',
  labels: { singular: 'Галерея (несколько фото)', plural: 'Галереи' },
  fields: [
    {
      name: 'images',
      type: 'array',
      label: 'Фотографии',
      labels: { singular: 'Фото', plural: 'Фото' },
      minRows: 1,
      fields: [
        { name: 'image', type: 'upload', relationTo: 'media', label: 'Фото', required: true },
        { name: 'caption', type: 'text', label: 'Подпись' },
      ],
    },
  ],
}

export const VideoBlock: Block = {
  slug: 'videoBlock',
  labels: { singular: 'Видео', plural: 'Видео' },
  fields: [
    {
      name: 'url',
      type: 'text',
      label: 'Ссылка на видео (YouTube / Vimeo)',
      admin: { description: 'Вставьте ссылку с YouTube или Vimeo. Если загружаете свой файл — оставьте пустым.' },
    },
    {
      name: 'file',
      type: 'upload',
      relationTo: 'media',
      label: 'Или свой видеофайл (mp4)',
      admin: { description: 'Используется, если ссылка не указана.' },
    },
    { name: 'caption', type: 'text', label: 'Подпись (необязательно)' },
  ],
}

export const FilesBlock: Block = {
  slug: 'filesBlock',
  labels: { singular: 'Документы / файлы', plural: 'Документы' },
  fields: [
    {
      name: 'items',
      type: 'array',
      label: 'Файлы',
      labels: { singular: 'Файл', plural: 'Файлы' },
      minRows: 1,
      fields: [
        { name: 'file', type: 'upload', relationTo: 'media', label: 'Файл (PDF, документ и т.д.)', required: true },
        { name: 'title', type: 'text', label: 'Название (что это за документ)' },
      ],
    },
  ],
}

export const QuoteBlock: Block = {
  slug: 'quoteBlock',
  labels: { singular: 'Цитата', plural: 'Цитаты' },
  fields: [
    { name: 'text', type: 'textarea', label: 'Текст цитаты', required: true },
    { name: 'author', type: 'text', label: 'Автор (необязательно)' },
  ],
}

export const ButtonBlock: Block = {
  slug: 'buttonBlock',
  labels: { singular: 'Кнопка / ссылка', plural: 'Кнопки' },
  fields: [
    { name: 'label', type: 'text', label: 'Текст кнопки', required: true },
    { name: 'url', type: 'text', label: 'Ссылка (куда ведёт)', required: true },
  ],
}

export const contentBlocks: Block[] = [
  ParagraphBlock,
  HeadingBlock,
  ImageBlock,
  GalleryBlock,
  VideoBlock,
  FilesBlock,
  QuoteBlock,
  ButtonBlock,
]
