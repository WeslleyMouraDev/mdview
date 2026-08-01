'use client';

import styles from './FileItem.module.css';

function formatSize(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export default function FileItem({ file, isSelected, onSelect, onRemove }) {
  return (
    <div
      className={`${styles.item} ${isSelected ? styles.selected : ''}`}
      onClick={() => onSelect(file.id)}
      role="button"
      tabIndex={0}
      aria-selected={isSelected}
      onKeyDown={(e) => {
        if (e.key === 'Enter') onSelect(file.id);
        if (e.key === 'Delete') onRemove(file.id);
      }}
    >
      <div className={styles.icon}>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M4 1h5.5L13 4.5V14a1 1 0 01-1 1H4a1 1 0 01-1-1V2a1 1 0 011-1z" stroke="currentColor" strokeWidth="1.2"/>
          <path d="M9 1v4h4" stroke="currentColor" strokeWidth="1.2"/>
        </svg>
      </div>
      <div className={styles.info}>
        <span className={styles.name} title={file.name}>
          {file.name}
        </span>
        <span className={styles.size}>{formatSize(file.size)}</span>
      </div>
      <button
        className={styles.remove}
        onClick={(e) => {
          e.stopPropagation();
          onRemove(file.id);
        }}
        aria-label={`Remover ${file.name}`}
        title="Remover"
      >
        ×
      </button>
    </div>
  );
}
