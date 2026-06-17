'use client'
import type { ReactNode } from 'react'
import type { PassportBlock } from '@/types'
import styles from './ProductModal.module.css'

const BULLET = /^[·•\-*]\s+/

/** Текст ячейки/значения: переносы строк → абзацы, строки-буллеты → список. */
function renderText(value?: string): ReactNode {
  if (!value) return null
  const lines = value.split('\n')
  const nodes: ReactNode[] = []
  let bullets: string[] = []

  const flush = () => {
    if (bullets.length) {
      const items = bullets
      nodes.push(
        <ul key={`ul-${nodes.length}`}>
          {items.map((b, i) => <li key={i}>{b}</li>)}
        </ul>,
      )
      bullets = []
    }
  }

  lines.forEach((raw, i) => {
    const line = raw.trim()
    if (!line) {
      flush()
      return
    }
    if (BULLET.test(line)) {
      bullets.push(line.replace(BULLET, ''))
    } else {
      flush()
      nodes.push(<p key={`p-${i}`}>{line}</p>)
    }
  })
  flush()
  return nodes
}

export default function ProductPassport({ blocks }: { blocks: PassportBlock[] }) {
  return (
    <div className={styles.rich}>
      {blocks.map((b, i) => {
        switch (b.blockType) {
          case 'heading':
            return <h3 key={i}>{b.text}</h3>

          case 'text':
            return <div key={i}>{renderText(b.text)}</div>

          case 'rows':
            return (
              <table key={i}>
                <tbody>
                  {(b.items ?? []).map((r, j) => (
                    <tr key={j}>
                      <td>{r.label}</td>
                      <td>{renderText(r.value)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )

          case 'table': {
            const headers = (b.columns ?? []).map((c) => c.header ?? '')
            const hasHeader = headers.some((h) => h.trim() !== '')
            return (
              <table key={i}>
                {hasHeader && (
                  <thead>
                    <tr>
                      {headers.map((h, k) => <th key={k}>{h}</th>)}
                    </tr>
                  </thead>
                )}
                <tbody>
                  {(b.data ?? []).map((row, j) => (
                    <tr key={j}>
                      {(row.cells ?? []).map((c, k) => (
                        <td key={k}>{renderText(c.value)}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            )
          }

          case 'list':
            return (
              <ul key={i}>
                {(b.items ?? []).map((it, j) => <li key={j}>{it.text}</li>)}
              </ul>
            )

          case 'note':
            return <p key={i} className={styles.note}>{b.text}</p>

          default:
            return null
        }
      })}
    </div>
  )
}
