'use client';

import { useEffect, useRef } from 'react';
import EmptyState from './EmptyState';
import MarkdownViewer from './MarkdownViewer';
import ExportBar from './ExportBar';
import exportHtml from '@/lib/exportHtml';
import styles from './MainContent.module.css';

export default function MainContent({ selectedFile, onAddFiles }) {
  const contentRef = useRef(null);

  useEffect(() => {
    if (selectedFile) {
      if (contentRef.current) {
        contentRef.current.scrollTop = 0;
      }
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  }, [selectedFile?.id]);

  if (!selectedFile) {
    return (
      <div className={styles.content}>
        <EmptyState onFilesSelected={onAddFiles} />
      </div>
    );
  }

  return (
    <div ref={contentRef} className={styles.content}>
      <div className={styles.fade} data-markdown-viewer>
        <MarkdownViewer file={selectedFile} />
      </div>
      <ExportBar file={selectedFile} onExportHtml={exportHtml} />
    </div>
  );
}
