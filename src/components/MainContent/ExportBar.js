'use client';

import styles from './ExportBar.module.css';

export default function ExportBar({ file, onExportHtml }) {
  function handlePrintPdf() {
    window.print();
  }

  return (
    <div className={styles.bar} data-hide-print="true">
      <button className={styles.button} onClick={handlePrintPdf} aria-label="Exportar como PDF">
        <svg width="14" height="14" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M4 12H2V8h12v4h-2M4 8V1h8v7M4 12h8v3H4v-3z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round"/>
        </svg>
        PDF
      </button>
      <button className={styles.button} onClick={() => onExportHtml(file)} aria-label="Exportar como HTML">
        <svg width="14" height="14" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M5 4L1 8l4 4M11 4l4 4-4 4M9 2l-2 12" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        HTML
      </button>
    </div>
  );
}
