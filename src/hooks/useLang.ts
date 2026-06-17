'use client'
import { useState, useCallback } from 'react'
import { T } from '@/data/translations'
import type { Lang } from '@/types'

export function useLang() {
  const [lang, setLang] = useState<Lang>('ru')
  const t = useCallback(
    (key: string) => T[lang]?.[key] ?? T.ru?.[key] ?? key,
    [lang]
  )
  return { lang, setLang, t }
}
