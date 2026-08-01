'use client';

import FileUploader from './FileUploader';
import FileList from './FileList';
import SidebarFooter from './SidebarFooter';
import styles from './Sidebar.module.css';

export default function Sidebar({
  files,
  selectedFileId,
  onSelectFile,
  onAddFiles,
  onRemoveFile,
  onClearAll,
  sortBy,
  onSortChange,
  theme,
  onToggleTheme,
  contrast,
  onToggleContrast,
}) {
  return (
    <div className={styles.sidebar} data-hide-print="true">
      <div className={styles.logo}>
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="1" y="1" width="18" height="18" rx="4" stroke="currentColor" strokeWidth="1.5"/>
          <path d="M5 14V6l3 4 3-4v8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M14 10l2-2v6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <span className={styles.logoText}>MDView</span>
      </div>
      <FileUploader onFilesSelected={onAddFiles} />
      <FileList
        files={files}
        selectedFileId={selectedFileId}
        onSelectFile={onSelectFile}
        onRemoveFile={onRemoveFile}
        sortBy={sortBy}
        onSortChange={onSortChange}
      />
      <SidebarFooter
        theme={theme}
        onToggleTheme={onToggleTheme}
        contrast={contrast}
        onToggleContrast={onToggleContrast}
        onClearAll={onClearAll}
        hasFiles={files.length > 0}
      />
    </div>
  );
}
