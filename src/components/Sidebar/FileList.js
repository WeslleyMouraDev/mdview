'use client';

import FileItem from './FileItem';
import styles from './FileList.module.css';

export default function FileList({
  files,
  selectedFileId,
  onSelectFile,
  onRemoveFile,
  sortBy,
  onSortChange,
}) {
  if (files.length === 0) {
    return (
      <div className={styles.empty}>
        <span className={styles.emptyText}>Nenhum arquivo</span>
      </div>
    );
  }

  return (
    <div className={styles.list}>
      <div className={styles.header}>
        <span className={styles.count}>
          {files.length} arquivo{files.length !== 1 ? 's' : ''}
        </span>
        <select
          className={styles.sort}
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value)}
          aria-label="Ordenar por"
        >
          <option value="name">Nome</option>
          <option value="uploadedAt">Recentes</option>
        </select>
      </div>
      <div className={styles.items} role="listbox" aria-label="Arquivos carregados">
        {files.map((file) => (
          <FileItem
            key={file.id}
            file={file}
            isSelected={file.id === selectedFileId}
            onSelect={onSelectFile}
            onRemove={onRemoveFile}
          />
        ))}
      </div>
    </div>
  );
}
