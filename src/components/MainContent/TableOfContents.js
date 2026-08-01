'use client';

import { useMemo } from 'react';
import extractHeadings from '@/lib/extractHeadings';
import styles from './TableOfContents.module.css';

export default function TableOfContents({ content }) {
  const headings = useMemo(() => extractHeadings(content), [content]);

  if (headings.length < 2) return null;

  const minLevel = Math.min(...headings.map((h) => h.level));

  return (
    <nav className={styles.toc} aria-label="Índice">
      <h4 className={styles.title}>Índice</h4>
      <ul className={styles.list}>
        {headings.map((heading, i) => (
          <li
            key={i}
            className={styles.item}
            style={{ paddingLeft: `${(heading.level - minLevel) * 16}px` }}
          >
            <a href={`#${heading.id}`} className={styles.link}>
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
