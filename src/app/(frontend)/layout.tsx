import type { Metadata } from 'next'
import './globals.css'
import { LangProvider } from '@/context/LangContext'
import { getSiteContent } from '@/lib/content'

export const metadata: Metadata = {
    title: 'Гарантийный Фонд — 10 лет',
    description: 'ОАО «Гарантийный Фонд» КР — 10 лет поддержки предпринимателей',
}

// ISR: страницы фронта пре-рендерятся и обновляются в фоне (страховка раз в 5 мин);
// мгновенно — при правке в админке (revalidateTag по тегу контента).
export const revalidate = 300

export default async function RootLayout({ children }: { children: React.ReactNode }) {
    const content = await getSiteContent()
    return (
        <html lang="ru">
        <body>
        <LangProvider content={content}>
            {children}
        </LangProvider>
        </body>
        </html>
    )
}