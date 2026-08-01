'use client';

import EmptyState from './EmptyState';
import MarkdownViewer from './MarkdownViewer';
import ExportBar from './ExportBar';
import exportHtml from '@/lib/exportHtml';
import styles from './MainContent.module.css';

export default function MainContent({ selectedFile, onAddFiles }) {
  if (!selectedFile) {
    return (
      <div className={styles.content}>
        <EmptyState onFilesSelected={onAddFiles} />
      </div>
    );
  }

  return (
    <div className={styles.content}>
      <div className={styles.fade} data-markdown-viewer>
        <MarkdownViewer file={selectedFile} />
      </div>
      <ExportBar file={selectedFile} onExportHtml={exportHtml} />
    </div>
  );
}
