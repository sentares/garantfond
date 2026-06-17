import path from 'path'
import { fileURLToPath } from 'url'

import { buildConfig } from 'payload'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Translations } from './collections/Translations'
import { Categories } from './collections/Categories'
import { Products } from './collections/Products'
import { Cities } from './collections/Cities'
import { News } from './collections/News'
import { Stories } from './collections/Stories'
import { Partners } from './collections/Partners'
import { Milestones } from './collections/Milestones'
import { Settings } from './globals/Settings'
import { Stats } from './globals/Stats'
import { Calculator } from './globals/Calculator'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    meta: {
      title: 'ГарантФонд · Админка',
    },
  },
  collections: [Users, Media, Translations, Categories, Products, Cities, News, Stories, Partners, Milestones],
  globals: [Settings, Stats, Calculator],
  localization: {
    locales: [
      { label: 'Русский', code: 'ru' },
      { label: 'Кыргызча', code: 'ky' },
      { label: 'English', code: 'en' },
    ],
    defaultLocale: 'ru',
    fallback: true,
  },
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL || '',
    },
  }),
  sharp,
})
