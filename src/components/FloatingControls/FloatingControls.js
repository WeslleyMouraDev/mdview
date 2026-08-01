'use client';

import { useState, useEffect, useMemo } from 'react';
import extractHeadings from '@/lib/extractHeadings';
import styles from './FloatingControls.module.css';

export default function FloatingControls({ content }) {
  const [showTopBtn, setShowTopBtn] = useState(false);
  const [tocOpen, setTocOpen] = useState(false);

  const headings = useMemo(() => {
    return content ? extractHeadings(content) : [];
  }, [content]);

  useEffect(() => {
    function handleScroll() {
      setShowTopBtn(window.scrollY > 300);
    }
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function handleHeadingClick(id) {
    setTocOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }

  if (!content) return null;

  const minLevel = headings.length > 0 ? Math.min(...headings.map((h) => h.level)) : 1;

  return (
    <div className={styles.container} data-hide-print="true">
      {/* TOC Popover */}
      {tocOpen && (
        <div className={styles.popover}>
          <div className={styles.popoverHeader}>
            <span className={styles.popoverTitle}>Índice do Documento</span>
            <button
              className={styles.closeBtn}
              onClick={() => setTocOpen(false)}
              aria-label="Fechar índice"
            >
              ×
            </button>
          </div>
          {headings.length === 0 ? (
            <p className={styles.emptyText}>Nenhum título encontrado</p>
          ) : (
            <ul className={styles.headingList}>
              {headings.map((h, i) => (
                <li key={i}>
                  <button
                    className={styles.headingBtn}
                    style={{ paddingLeft: `${12 + (h.level - minLevel) * 12}px` }}
                    onClick={() => handleHeadingClick(h.id)}
                  >
                    {h.text}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      <div className={styles.buttonGroup}>
        {/* TOC Floating Button */}
        {headings.length > 0 && (
          <button
            className={`${styles.floatingBtn} ${tocOpen ? styles.active : ''}`}
            onClick={() => setTocOpen((v) => !v)}
            aria-label="Abrir índice flutuante"
            title="Índice do documento"
          >
            <svg width="18" height="18" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M2 3.5h12M2 8h8M2 12.5h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </button>
        )}

        {/* Back to Top Button */}
        {showTopBtn && (
          <button
            className={styles.floatingBtn}
            onClick={scrollToTop}
            aria-label="Voltar ao topo"
            title="Voltar ao topo"
          >
            <svg width="18" height="18" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8 13V3M3 8l5-5 5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}
