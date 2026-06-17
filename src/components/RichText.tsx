'use client'
import React from 'react'
import type { RichText as RichTextValue } from '@/types'

/**
 * Минимальный рендерер для контента Lexical (поле «richText» в Payload).
 * Поддерживает: абзацы, заголовки, списки, цитаты, ссылки, переносы строк
 * и форматирование текста (жирный/курсив/подчёркнутый/зачёркнутый/код).
 */

const FORMAT = { bold: 1, italic: 2, strikethrough: 4, underline: 8, code: 16 } as const

type Node = {
  type?: string
  tag?: string | number
  text?: string
  format?: number | string
  url?: string
  fields?: { url?: string; newTab?: boolean }
  listType?: string
  children?: Node[]
  [k: string]: unknown
}

function renderText(node: Node, key: React.Key): React.ReactNode {
  let el: React.ReactNode = node.text ?? ''
  const f = typeof node.format === 'number' ? node.format : 0
  if (f & FORMAT.code) el = <code key={key}>{el}</code>
  if (f & FORMAT.bold) el = <strong>{el}</strong>
  if (f & FORMAT.italic) el = <em>{el}</em>
  if (f & FORMAT.underline) el = <u>{el}</u>
  if (f & FORMAT.strikethrough) el = <s>{el}</s>
  return <React.Fragment key={key}>{el}</React.Fragment>
}

function renderChildren(children?: Node[]): React.ReactNode {
  if (!Array.isArray(children)) return null
  return children.map((c, i) => renderNode(c, i))
}

function renderNode(node: Node, key: React.Key): React.ReactNode {
  switch (node.type) {
    case 'text':
      return renderText(node, key)
    case 'linebreak':
      return <br key={key} />
    case 'paragraph':
      return <p key={key}>{renderChildren(node.children)}</p>
    case 'heading': {
      const Tag = (typeof node.tag === 'string' ? node.tag : 'h3') as keyof React.JSX.IntrinsicElements
      return <Tag key={key}>{renderChildren(node.children)}</Tag>
    }
    case 'quote':
      return <blockquote key={key}>{renderChildren(node.children)}</blockquote>
    case 'list': {
      const Tag = node.listType === 'number' ? 'ol' : 'ul'
      return <Tag key={key}>{renderChildren(node.children)}</Tag>
    }
    case 'listitem':
      return <li key={key}>{renderChildren(node.children)}</li>
    case 'link': {
      const url = node.fields?.url || node.url || '#'
      const newTab = node.fields?.newTab
      return (
        <a key={key} href={url} {...(newTab ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
          {renderChildren(node.children)}
        </a>
      )
    }
    default:
      // неизвестный узел — пробуем отрендерить детей
      return node.children ? <React.Fragment key={key}>{renderChildren(node.children)}</React.Fragment> : null
  }
}

export default function RichText({ value, className }: { value: RichTextValue; className?: string }) {
  if (!value || !value.root || !Array.isArray(value.root.children)) return null
  return <div className={className}>{renderChildren(value.root.children as Node[])}</div>
}
