'use client';

import { useRef } from 'react';
import styles from './FileUploader.module.css';

export default function FileUploader({ onFilesSelected }) {
  const inputRef = useRef(null);

  function handleChange(e) {
    if (e.target.files.length > 0) {
      onFilesSelected(Array.from(e.target.files));
      e.target.value = '';
    }
  }

  return (
    <div className={styles.uploader}>
      <input
        ref={inputRef}
        type="file"
        accept=".md"
        multiple
        onChange={handleChange}
        className={styles.input}
        id="file-upload"
        aria-label="Selecionar arquivos Markdown"
      />
      <button
        className={styles.button}
        onClick={() => inputRef.current?.click()}
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M8 3v10M3 8h10" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </svg>
        Adicionar arquivo
      </button>
    </div>
  );
}
