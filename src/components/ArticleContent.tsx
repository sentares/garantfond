'use client'
import React from 'react'
import type { ContentBlock } from '@/types'
import RichText from './RichText'
import styles from './News/Article.module.css'

// YouTube/Vimeo ссылку → src для встраивания (iframe). Иначе null.
function embedSrc(url: string): string | null {
  try {
    const u = new URL(url)
    const host = u.hostname.replace('www.', '')
    if (host === 'youtu.be') return `https://www.youtube.com/embed/${u.pathname.slice(1)}`
    if (host.endsWith('youtube.com')) {
      const id = u.searchParams.get('v')
      if (id) return `https://www.youtube.com/embed/${id}`
      if (u.pathname.startsWith('/embed/')) return url
      if (u.pathname.startsWith('/shorts/')) return `https://www.youtube.com/embed/${u.pathname.split('/')[2]}`
    }
    if (host.endsWith('vimeo.com')) {
      const id = u.pathname.split('/').filter(Boolean)[0]
      if (id) return `https://player.vimeo.com/video/${id}`
    }
  } catch {
    /* не URL */
  }
  return null
}

function Block({ block }: { block: ContentBlock }) {
  switch (block.type) {
    case 'heading':
      return <h2 className={styles.cHeading}>{block.text}</h2>

    case 'richtext':
      return <RichText value={block.value} className={styles.body} />

    case 'image':
      if (!block.url) return null
      return (
        <figure className={`${styles.cFigure} ${styles[`img_${block.size}`] ?? ''}`}>
          <img src={block.url} alt={block.caption || ''} className={styles.cImage} />
          {block.caption && <figcaption className={styles.cCaption}>{block.caption}</figcaption>}
        </figure>
      )

    case 'gallery':
      if (!block.images.length) return null
      return (
        <div className={styles.cGallery}>
          {block.images.map((im, i) => (
            <figure key={i} className={styles.cGalleryItem}>
              <img src={im.url} alt={im.caption || ''} />
              {im.caption && <figcaption className={styles.cCaption}>{im.caption}</figcaption>}
            </figure>
          ))}
        </div>
      )

    case 'video': {
      const src = block.url ? embedSrc(block.url) : null
      return (
        <figure className={styles.cFigure}>
          {src ? (
            <div className={styles.cVideoWrap}>
              <iframe src={src} title={block.caption || 'video'} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
            </div>
          ) : block.file || block.url ? (
            <video className={styles.cVideo} src={block.file || block.url} controls />
          ) : null}
          {block.caption && <figcaption className={styles.cCaption}>{block.caption}</figcaption>}
        </figure>
      )
    }

    case 'files':
      if (!block.items.length) return null
      return (
        <div className={styles.cFiles}>
          {block.items.map((f, i) => (
            <a key={i} href={f.url} target="_blank" rel="noopener noreferrer" className={styles.cFile} download>
              <span className={styles.cFileIcon}>📄</span>
              <span>{f.title || 'Скачать файл'}</span>
            </a>
          ))}
        </div>
      )

    case 'quote':
      return (
        <blockquote className={styles.cQuote}>
          <p>{block.text}</p>
          {block.author && <cite className={styles.cQuoteAuthor}>— {block.author}</cite>}
        </blockquote>
      )

    case 'button':
      if (!block.url) return null
      return (
        <div className={styles.cButtonWrap}>
          <a href={block.url} target="_blank" rel="noopener noreferrer" className={styles.cButton}>
            {block.label || 'Подробнее'}
          </a>
        </div>
      )

    default:
      return null
  }
}

export default function ArticleContent({ blocks }: { blocks: ContentBlock[] }) {
  if (!blocks?.length) return null
  return (
    <div className={styles.content}>
      {blocks.map((b, i) => (
        <Block key={i} block={b} />
      ))}
    </div>
  )
}
