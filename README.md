# ГарантФонд — лендинг к 10-летию + CMS

Лендинг ОАО «Гарантийный Фонд» КР на **Next.js 15** с админкой **Payload CMS 3** и базой **Neon Postgres**. Контент (тексты, продукты, города, новости, истории, паспорта продуктов) редактируется из админки, i18n: **ru / ky / en**.

## Стек
- Next.js 15.4 (App Router) + React 19
- Payload CMS 3 (`@payloadcms/next`, `@payloadcms/db-postgres`)
- Neon Postgres
- TypeScript

## Запуск на новом компьютере

1. Установить **Node.js 20.9+** (рекомендуется 22.x) и Git.
2. Клонировать и поставить зависимости:
   ```bash
   git clone https://github.com/sentares/garantfond.git
   cd garantfond
   npm install
   ```
3. Создать файл **`.env`** в корне (в git его нет — секреты):
   ```env
   DATABASE_URL=postgresql://...   # строка подключения Neon (из дашборда Neon или со старого .env)
   PAYLOAD_SECRET=...              # тот же секрет, что и раньше (см. старый .env)
   ```
   > `DATABASE_URL` берётся в дашборде Neon → проект `garantfond` → Connection string (вариант с `-pooler`).
   > `PAYLOAD_SECRET` должен совпадать со старым (иначе разлогинятся текущие сессии админки).
4. Запустить:
   ```bash
   npm run dev
   ```
   - Сайт: http://localhost:3000
   - Админка: http://localhost:3000/admin

База уже в облаке (Neon) — переносить данные не нужно, всё подтянется.

## Команды
| Команда | Назначение |
|---|---|
| `npm run dev` | Дев-сервер (Next + Payload) |
| `npm run build` / `npm start` | Прод-сборка / запуск |
| `npm run generate:types` | Перегенерировать `src/payload-types.ts` |
| `npm run generate:importmap` | Перегенерировать import map админки |
| `npm run seed` | Залить контент из `src/data/*.ts` в БД (⚠️ перезаписывает контентные коллекции) |

## Структура
- `src/app/(frontend)/` — публичный сайт
- `src/app/(payload)/` — админка и API Payload
- `src/collections/` — коллекции Payload (Products, Categories, Translations, Cities, News, Stories, Media, Users)
- `src/data/` — исходные данные для seed
- `src/lib/content.ts` — server-фетч контента из Payload для фронта
- `src/payload.config.ts` — конфиг Payload

## Первый вход в админку
Если база чистая — на `/admin` появится экран «Create first user». На текущей базе админ уже создан.
