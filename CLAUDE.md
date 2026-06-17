# Контекст проекта для Claude

Лендинг ГарантФонд (10 лет) + Payload CMS 3 + Neon Postgres. См. `README.md` для запуска.

## Архитектура
- **Контент идёт из Payload/Neon**, не из статики. Server-фетч в `src/lib/content.ts` (`getSiteContent`, обёрнут в React `cache`) → `(frontend)/layout.tsx` → `LangProvider` (`src/context/LangContext.tsx`). Компоненты берут данные через `useLangContext()`.
- **i18n клиентский**: язык переключается в контексте (ru/ky/en), без локали в URL. Провайдер держит все локали, отдаёт текущую.
- **Тексты** — коллекция `translations` (плоские ключи, `value` локализованный). Фронт зовёт `t('key')`.
- **Продукты** — коллекция `products`. Категории-табы — коллекция `categories` (relationship), табы строятся динамически из неё (`Products.tsx`). Фильтр по `product.cats`.
- **Паспорт продукта** — поле `passport` (Payload `blocks`, локализованное) с блоками: `heading`, `text`, `rows` (поле→значение), `table` (N колонок), `list`, `note`. Рендер — `src/components/Products/ProductPassport.tsx`, показывается в модалке `ProductModal.tsx`. Конструктор блоков в `src/collections/passportBlocks.ts`.
- **Раздел продуктов** — постраничная карусель (`PER_PAGE` карточек на слайд, scroll-snap, стрелки/точки/свайп).
- **Globals (одиночные настройки)** в `src/globals/`: `Settings` («Общие настройки» — логотип, контакты, соцсети, ссылка на старый сайт, реквизиты, текст плавающей кнопки), `Stats` («Цифры фонда» — единый источник чисел для Stats/Тикера/«Как работает», форматирование через `src/lib/format.ts`), `Calculator` («Калькулятор» — диапазоны, ставки, валюты). Группа в админке — «Настройки сайта». Фетчатся в `content.ts` через `payload.findGlobal`, отдаются в контекст как `settings`/`stats`/`calculator`.
- **Коллекции контента**: `Partners` (банки/орг/межд., счётчики в Partners.tsx считаются из коллекции), `Milestones` (таймлайн юбилея в Anniversary.tsx), `News`/`Stories` (есть `slug`+`cover/photo`+`body` richText → детальные страницы `/news/[slug]`, `/stories/[slug]`, список `/news`; рендер richText — `src/components/RichText.tsx`), `Cities` (есть `posX/posY` — позиция на карте, маршруты строятся динамически).
- **Конструктор страницы новости/истории** — поле `content` (Payload `blocks`, локализованное) с блоками: `paragraph` (richText), `headingBlock`, `imageBlock` (фото+подпись+размер), `gallery` (массив фото), `videoBlock` (ссылка YouTube/Vimeo ИЛИ файл), `filesBlock` (документы), `quoteBlock`, `buttonBlock`. Порядок блоков = порядок на странице (drag&drop). Конструктор — `src/collections/contentBlocks.ts`. Старое поле `body` (richText) скрыто (`admin.hidden`), колонку не удаляли (чтобы не триггерить деструктивную миграцию). `content.ts` → `mapContent()` приводит блоки к плоской структуре с готовыми URL медиа (fetch `depth:2`). Рендер — `src/components/ArticleContent.tsx`.
- **Slug новостей/историй — латиница** (транслитерация кириллицы, `src/lib/slug.ts`), генерируется в `beforeValidate` из заголовка/имени, если поле пустое. Страницы статей дополнительно делают `decodeURIComponent` при поиске по slug (устойчивость к кодировке URL).
- **Кеширование контента**: `getSiteContent` обёрнут в `unstable_cache` (тег `site-content`, revalidate 300с). Все контентные коллекции и globals имеют хук `revalidateContent` (`src/lib/revalidate.ts`, `afterChange`/`afterDelete`) → правки в админке появляются на сайте сразу. Фронт-layout: `export const revalidate = 300`. Главная и `/news` — статика+ISR (быстро для посетителей, БД дёргается редко).
- **Тексты секций юбилея и карты** вынесены в `translations` (`ann_*`, `map_*`); см. `src/data/extra.ts` — данные для сидинга нового контента (тексты-addendum, вехи, партнёры, координаты, настройки, цифры, калькулятор).
- Исходные данные для seed: `src/data/` (`translations.ts`, `products.ts` + `NEW_PRODUCTS`, `categories.ts`, `cities.ts`, `passports.ts`, `extra.ts`).
- **Логика сида** — `src/seed-core.ts` (`runSeed(payload)`); вызывается из CLI `src/seed.ts` И из API-роута `src/app/(payload)/api/seed/route.ts`.

## Грабли (ВАЖНО — проверено на практике)
1. **package.json должен иметь `"type": "module"`** — иначе Payload CLI падает с `ERR_REQUIRE_ASYNC_MODULE`.
2. **Payload 3.85 требует Next `15.2–15.4.x` (НЕ 15.5+)** и React 19. Пин в package.json: `next: 15.4`.
3. **Скрипты записи (`payload run` seed/update) НЕЛЬЗЯ запускать при включённом dev-сервере** — обе сессии коннектятся к Neon с dev-push и портят запись (особенно блоки). Сначала глушить dev (kill процесса на :3000), потом писать, потом поднимать dev.
4. **Деструктивные изменения схемы** (удаление/смена типа поля) → drizzle dev-push в неинтерактиве ВИСНЕТ на вопросе `delete column? (y/N)`. Решение: вручную удалить колонку через pg (`ALTER TABLE ... DROP COLUMN IF EXISTS ...`) перед сидом/запуском.
5. **git push за корп. прокси** падает с `self-signed certificate` → `git config http.sslBackend schannel` (нативное хранилище сертов Windows).
6. После правок коллекций — `npm run generate:types` (и `generate:importmap`, если добавляли кастомные компоненты).
7. **НЕЛЬЗЯ запускать `npm run build` при работающем сервере** (`npm run dev` или `npm start`) — оба процесса пишут в `.next`, сборка падает с `Cannot find module './vendor-chunks/@payloadcms.js'` (повреждение `.next`). Лечение: заглушить сервер на :3000, `rm -rf .next`, пересобрать. Правило: на :3000 в каждый момент — ОДИН процесс (dev ИЛИ build ИЛИ start).
7.5. **После пересева (`/api/seed`) перед `npm run build` делать `rm -rf .next`** — иначе статичная главная возьмёт устаревший контент из `.next/cache` (напр. старые slug'и) и ссылки будут битые. В обычной работе (правка в админке на живом сервере) это не нужно — срабатывает revalidateTag.
8. **`npm run seed` (payload run) падает на Node 24 + tsx 4.22** с `ENOENT ... node:crypto?tsx-namespace` (баг загрузчика tsx на новом Node). Обход: запустить dev и дёрнуть **роут сида** — `/api/seed?secret=<PAYLOAD_SECRET>` (выполняется внутри процесса Next, конфликта dev-push нет). Роут защищён секретом и in-memory-локом от параллельного запуска. Neon медленный — полный сид идёт ~5–7 мин; НЕ обрывать и не дёргать повторно (оборванный HTTP-клиент → обработчик может доигрывать на сервере и наложиться). Когда tsx починят под Node 24 — `npm run seed` снова заработает (логика общая, `seed-core.ts`).

## Статус (на момент написания)
- 9 продуктов в БД, у всех паспорта. Категории/табы: msb, islamic, women, leasing, corp, green, mortgage, auto.
- Продукты «Келечек плюс», «Жаш ишкер», «Ижара» (обычная) — НЕ заводим, данных нет.
- У новых продуктов (yldam/kelechek/unaa) KY/EN и часть полей («срок») пустые — дозаполняются в админке.
- **Весь контент теперь настраивается через админку**: контакты/соцсети/логотип/телефон (Settings), цифры статистики (Stats), параметры калькулятора (Calculator), партнёры, вехи юбилея, координаты городов на карте, новости/истории с обложками и полным текстом. Захардкоженных данных на фронте не осталось (только декоративные градиенты/SVG/эмодзи).
- Новости/истории: обложка (`cover`/`photo`), краткое описание (`text`/`quote`) и полный текст (`body`, richText). У вновь созданных записей `body` пустой — карточка/страница падает на краткое описание; заполняется в админке.
- **Деплой на Vercel ещё НЕ делали.** Перед ним: прод-миграции Payload (на проде dev-push выключен), env-переменные на Vercel, pooled-строка Neon. На проде роут `/api/seed` лучше удалить или закрыть (он только для первичного заполнения).

## Деплой (когда дойдём)
Репозиторий: https://github.com/sentares/garantfond . Vercel: подключить репо, env `DATABASE_URL` (pooled) + `PAYLOAD_SECRET`, настроить миграции вместо dev-push.
- **ВАЖНО про медиа на Vercel:** локальная файловая система на Vercel НЕ персистентна — загруженные фото/видео/документы пропадут. Перед продом подключить storage-адаптер: `@payloadcms/storage-vercel-blob` (или S3) в `payload.config`. Иначе админ загрузит фото, а после редеплоя они исчезнут.
- Роут `/api/seed` на проде убрать/закрыть (он только для первичного заполнения).
