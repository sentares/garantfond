import type { Block } from 'payload'

/**
 * Блоки-конструктор для «Паспорта продукта».
 * Редактор собирает паспорт из этих блоков в нужном порядке.
 */

export const HeadingBlock: Block = {
  slug: 'heading',
  labels: { singular: 'Заголовок раздела', plural: 'Заголовки разделов' },
  fields: [
    { name: 'text', type: 'text', label: 'Заголовок', required: true },
  ],
}

export const RowsBlock: Block = {
  slug: 'rows',
  labels: { singular: 'Таблица «поле — значение»', plural: 'Таблицы «поле — значение»' },
  fields: [
    {
      name: 'items',
      type: 'array',
      label: 'Строки',
      labels: { singular: 'Строка', plural: 'Строки' },
      fields: [
        { name: 'label', type: 'text', label: 'Поле (левая колонка)' },
        {
          name: 'value',
          type: 'textarea',
          label: 'Значение (правая колонка)',
          admin: {
            description: 'Каждая строка с новой строки. Строки, начинающиеся с «· », «- » или «* », превратятся в список.',
          },
        },
      ],
    },
  ],
}

export const TableBlock: Block = {
  slug: 'table',
  labels: { singular: 'Таблица (несколько колонок)', plural: 'Таблицы (несколько колонок)' },
  fields: [
    {
      name: 'columns',
      type: 'array',
      label: 'Колонки (шапка)',
      labels: { singular: 'Колонка', plural: 'Колонки' },
      admin: { description: 'Заголовки колонок. Оставьте пустыми, если шапка не нужна. Число колонок здесь должно совпадать с числом ячеек в строке.' },
      fields: [
        { name: 'header', type: 'text', label: 'Заголовок колонки' },
      ],
    },
    {
      name: 'data',
      type: 'array',
      label: 'Строки',
      labels: { singular: 'Строка', plural: 'Строки' },
      fields: [
        {
          name: 'cells',
          type: 'array',
          label: 'Ячейки',
          labels: { singular: 'Ячейка', plural: 'Ячейки' },
          fields: [
            { name: 'value', type: 'textarea', label: 'Текст ячейки' },
          ],
        },
      ],
    },
  ],
}

export const ListBlock: Block = {
  slug: 'list',
  labels: { singular: 'Список', plural: 'Списки' },
  fields: [
    {
      name: 'items',
      type: 'array',
      label: 'Пункты',
      labels: { singular: 'Пункт', plural: 'Пункты' },
      fields: [
        { name: 'text', type: 'textarea', label: 'Текст пункта' },
      ],
    },
  ],
}

export const NoteBlock: Block = {
  slug: 'note',
  labels: { singular: 'Примечание', plural: 'Примечания' },
  fields: [
    { name: 'text', type: 'textarea', label: 'Текст примечания' },
  ],
}

export const TextBlock: Block = {
  slug: 'text',
  labels: { singular: 'Абзац текста', plural: 'Абзацы текста' },
  fields: [
    {
      name: 'text',
      type: 'textarea',
      label: 'Текст',
      admin: { description: 'Обычный абзац. Строки с «· »/«- »/«* » станут списком.' },
    },
  ],
}

export const passportBlocks: Block[] = [HeadingBlock, TextBlock, RowsBlock, TableBlock, ListBlock, NoteBlock]
