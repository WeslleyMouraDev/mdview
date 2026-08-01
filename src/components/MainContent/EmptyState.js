'use client';

import { useRef } from 'react';
import styles from './EmptyState.module.css';

export default function EmptyState({ onFilesSelected }) {
  const inputRef = useRef(null);

  function handleChange(e) {
    if (e.target.files.length > 0) {
      onFilesSelected(Array.from(e.target.files));
      e.target.value = '';
    }
  }

  return (
    <div
      className={styles.empty}
      onClick={() => inputRef.current?.click()}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter') inputRef.current?.click();
      }}
    >
      <input
        ref={inputRef}
        type="file"
        accept=".md"
        multiple
        onChange={handleChange}
        className={styles.input}
      />
      <div className={styles.iconWrapper}>
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="8" y="4" width="32" height="40" rx="4" stroke="currentColor" strokeWidth="2"/>
          <path d="M24 18v12M18 24h12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      </div>
      <h2 className={styles.title}>Arraste seus arquivos .md aqui</h2>
      <p className={styles.subtitle}>ou clique para selecionar</p>
    </div>
  );
}
