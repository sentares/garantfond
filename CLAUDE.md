# Контекст проекта для Claude

Лендинг ГарантФонд (10 лет) + Payload CMS 3 + Neon Postgres. См. `README.md` для запуска.

## Архитектура
- **Контент идёт из Payload/Neon**, не из статики. Server-фетч в `src/lib/content.ts` (`getSiteContent`, обёрнут в React `cache`) → `(frontend)/layout.tsx` → `LangProvider` (`src/context/LangContext.tsx`). Компоненты берут данные через `useLangContext()`.
- **i18n клиентский**: язык переключается в контексте (ru/ky/en), без локали в URL. Провайдер держит все локали, отдаёт текущую.
- **Тексты** — коллекция `translations` (плоские ключи, `value` локализованный). Фронт зовёт `t('key')`.
- **Продукты** — коллекция `products`. Категории-табы — коллекция `categories` (relationship), табы строятся динамически из неё (`Products.tsx`). Фильтр по `product.cats`.
- **Паспорт продукта** — поле `passport` (Payload `blocks`, локализованное) с блоками: `heading`, `text`, `rows` (поле→значение), `table` (N колонок), `list`, `note`. Рендер — `src/components/Products/ProductPassport.tsx`, показывается в модалке `ProductModal.tsx`. Конструктор блоков в `src/collections/passportBlocks.ts`.
- **Раздел продуктов** — постраничная карусель (`PER_PAGE` карточек на слайд, scroll-snap, стрелки/точки/свайп).
- Исходные данные для seed: `src/data/` (`translations.ts`, `products.ts` + `NEW_PRODUCTS`, `categories.ts`, `cities.ts`, `passports.ts`).

## Грабли (ВАЖНО — проверено на практике)
1. **package.json должен иметь `"type": "module"`** — иначе Payload CLI падает с `ERR_REQUIRE_ASYNC_MODULE`.
2. **Payload 3.85 требует Next `15.2–15.4.x` (НЕ 15.5+)** и React 19. Пин в package.json: `next: 15.4`.
3. **Скрипты записи (`payload run` seed/update) НЕЛЬЗЯ запускать при включённом dev-сервере** — обе сессии коннектятся к Neon с dev-push и портят запись (особенно блоки). Сначала глушить dev (kill процесса на :3000), потом писать, потом поднимать dev.
4. **Деструктивные изменения схемы** (удаление/смена типа поля) → drizzle dev-push в неинтерактиве ВИСНЕТ на вопросе `delete column? (y/N)`. Решение: вручную удалить колонку через pg (`ALTER TABLE ... DROP COLUMN IF EXISTS ...`) перед сидом/запуском.
5. **git push за корп. прокси** падает с `self-signed certificate` → `git config http.sslBackend schannel` (нативное хранилище сертов Windows).
6. После правок коллекций — `npm run generate:types` (и `generate:importmap`, если добавляли кастомные компоненты).

## Статус (на момент написания)
- 9 продуктов в БД, у всех паспорта. Категории/табы: msb, islamic, women, leasing, corp, green, mortgage, auto.
- Продукты «Келечек плюс», «Жаш ишкер», «Ижара» (обычная) — НЕ заводим, данных нет.
- У новых продуктов (yldam/kelechek/unaa) KY/EN и часть полей («срок») пустые — дозаполняются в админке.
- **Деплой на Vercel ещё НЕ делали.** Перед ним: прод-миграции Payload (на проде dev-push выключен), env-переменные на Vercel, pooled-строка Neon.

## Деплой (когда дойдём)
Репозиторий: https://github.com/sentares/garantfond . Vercel: подключить репо, env `DATABASE_URL` (pooled) + `PAYLOAD_SECRET`, настроить миграции вместо dev-push.
