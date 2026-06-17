import type { CollectionConfig } from 'payload'
import { revalidateContent } from '../lib/revalidate'

export const Milestones: CollectionConfig = {
  slug: 'milestones',
  labels: {
    singular: 'Веха истории',
    plural: 'История фонда (вехи)',
  },
  access: {
    read: () => true,
  },
  hooks: {
    afterChange: [revalidateContent],
    afterDelete: [revalidateContent],
  },
  admin: {
    useAsTitle: 'tag',
    defaultColumns: ['year', 'tag', 'order'],
    group: 'Контент',
    description: 'Юбилейный таймлайн «Ключевые вехи» в разделе «10 лет».',
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
      name: 'year',
      type: 'number',
      required: true,
      label: 'Год',
      admin: { description: 'напр. 2016' },
    },
    {
      name: 'tag',
      type: 'text',
      label: 'Заголовок вехи',
      localized: true,
      admin: { description: 'напр. «Учреждение», «1000-я гарантия»' },
    },
    {
      name: 'desc',
      type: 'textarea',
      label: 'Описание',
      localized: true,
    },
  ],
}
