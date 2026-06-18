import path from 'path'
import { fileURLToPath } from 'url'

import { buildConfig } from 'payload'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob'
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
import { Applications } from './collections/Applications'
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
  collections: [Users, Media, Translations, Categories, Products, Cities, News, Stories, Partners, Milestones, Applications],
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
  // Хранилище медиа: на проде (Vercel) ФС эфемерна → льём в Vercel Blob.
  // Включается только при заданном BLOB_READ_WRITE_TOKEN; в dev без токена —
  // обычное локальное хранилище (public/media), как и было.
  plugins: [
    vercelBlobStorage({
      enabled: Boolean(process.env.BLOB_READ_WRITE_TOKEN),
      collections: { media: true },
      token: process.env.BLOB_READ_WRITE_TOKEN || '',
    }),
  ],
  sharp,
})
