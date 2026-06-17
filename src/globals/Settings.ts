import type { GlobalConfig } from 'payload'
import { revalidateContent } from '../lib/revalidate'

/**
 * «Общие настройки» — единая страница в админке для логотипа, контактов,
 * соцсетей и реквизитов. Это singleton (одна запись), редактор просто
 * открывает и заполняет поля — без «создать новый».
 */
export const Settings: GlobalConfig = {
  slug: 'settings',
  label: 'Общие настройки',
  access: {
    read: () => true,
  },
  hooks: {
    afterChange: [revalidateContent],
  },
  admin: {
    group: 'Настройки сайта',
    description:
      'Логотип, телефоны, e-mail, адрес головного офиса, соцсети и реквизиты. Переключайте язык (RU/KY/EN) сверху справа — поля с пометкой «(языковое)» заполняются на каждом языке.',
  },
  fields: [
    {
      type: 'collapsible',
      label: 'Бренд (логотип и название)',
      fields: [
        {
          name: 'logo',
          type: 'upload',
          relationTo: 'media',
          label: 'Логотип сайта',
          admin: { description: 'PNG/SVG. Показывается в шапке. Если пусто — берётся /gf_logo.png.' },
        },
        {
          name: 'siteName',
          type: 'text',
          label: 'Название сайта',
          localized: true,
          admin: { description: 'Для alt-текста логотипа и заголовка вкладки браузера.' },
        },
      ],
    },
    {
      type: 'collapsible',
      label: 'Контакты головного офиса',
      fields: [
        {
          name: 'phoneShort',
          type: 'text',
          label: 'Короткий номер (для шапки)',
          admin: { description: 'напр. «7500». Показывается в шапке и плавающей кнопке.' },
        },
        {
          name: 'phone',
          type: 'text',
          label: 'Телефон (полный, для контактов)',
          admin: { description: 'напр. «7500 | (0312) 66 49 60». Показывается в блоке «Контакты» и футере.' },
        },
        {
          name: 'email',
          type: 'text',
          label: 'E-mail',
          admin: { description: 'напр. office@gf.kg' },
        },
        {
          name: 'address',
          type: 'textarea',
          label: 'Адрес (языковое)',
          localized: true,
          admin: { description: 'напр. «г. Бишкек, пр. Чуй 114, 4 этаж, каб. 408»' },
        },
        {
          name: 'hours',
          type: 'text',
          label: 'Часы работы (языковое)',
          localized: true,
          admin: { description: 'напр. «Пн–Пт: 09:00 – 18:00»' },
        },
        {
          name: 'mapLink',
          type: 'text',
          label: 'Ссылка на карту головного офиса (2GIS/Google)',
          admin: { description: 'Необязательно.' },
        },
      ],
    },
    {
      type: 'collapsible',
      label: 'Соцсети',
      fields: [
        {
          name: 'socials',
          type: 'array',
          label: 'Соцсети',
          labels: { singular: 'Соцсеть', plural: 'Соцсети' },
          admin: { description: 'Иконки в футере. Порядок — перетаскиванием.' },
          fields: [
            {
              name: 'network',
              type: 'select',
              label: 'Сеть',
              defaultValue: 'instagram',
              options: [
                { label: 'Instagram', value: 'instagram' },
                { label: 'YouTube', value: 'youtube' },
                { label: 'LinkedIn', value: 'linkedin' },
                { label: 'Facebook', value: 'facebook' },
                { label: 'Telegram', value: 'telegram' },
                { label: 'WhatsApp', value: 'whatsapp' },
                { label: 'TikTok', value: 'tiktok' },
              ],
            },
            {
              name: 'url',
              type: 'text',
              label: 'Ссылка',
              required: true,
              admin: { description: 'напр. https://instagram.com/...' },
            },
          ],
        },
      ],
    },
    {
      type: 'collapsible',
      label: 'Прочее',
      fields: [
        {
          name: 'oldSiteUrl',
          type: 'text',
          label: 'Ссылка на старый сайт',
          admin: { description: 'напр. https://gf.kg/. Кнопка «Перейти на старый сайт» в шапке.' },
        },
        {
          name: 'nbkrNotice',
          type: 'text',
          label: 'Реквизит / лицензия (языковое)',
          localized: true,
          admin: { description: 'напр. «Свидетельство НБКР №1». Показывается в футере.' },
        },
        {
          name: 'floatingCtaText',
          type: 'text',
          label: 'Текст плавающей кнопки (языковое)',
          localized: true,
          admin: { description: 'напр. «Оставить заявку».' },
        },
        {
          name: 'mapCoordsLabel',
          type: 'text',
          label: 'Подпись координат на карте',
          admin: { description: 'напр. «41°N – 43°N · KGZ TERRITORY». Техническая подпись над картой филиалов.' },
        },
      ],
    },
  ],
}
