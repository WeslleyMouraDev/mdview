'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './Mermaid.module.css';

let mermaidPromise = null;

function getMermaid() {
  if (!mermaidPromise) {
    mermaidPromise = import('mermaid').then((m) => m.default);
  }
  return mermaidPromise;
}

export default function Mermaid({ chart }) {
  const containerRef = useRef(null);
  const [svg, setSvg] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    const uniqueId = `mermaid-${Math.random().toString(36).substring(2, 9)}`;

    async function renderDiagram() {
      try {
        const mermaid = await getMermaid();
        const themeAttr = document.documentElement.getAttribute('data-theme');
        const isDark = themeAttr === 'dark';

        mermaid.initialize({
          startOnLoad: false,
          theme: isDark ? 'dark' : 'neutral',
          securityLevel: 'loose',
          fontFamily: 'Inter, sans-serif',
        });

        const { svg: renderedSvg } = await mermaid.render(uniqueId, chart);
        if (isMounted) {
          setSvg(renderedSvg);
          setError(null);
        }
      } catch (err) {
        if (isMounted) {
          setError(err?.message || 'Erro ao renderizar diagrama Mermaid');
        }
      }
    }

    renderDiagram();

    // Listen for theme attribute changes
    const observer = new MutationObserver(() => {
      renderDiagram();
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme', 'data-contrast'],
    });

    return () => {
      isMounted = false;
      observer.disconnect();
    };
  }, [chart]);

  if (error) {
    return (
      <div className={styles.errorContainer}>
        <span className={styles.errorTitle}>Diagrama Mermaid (Erro de sintaxe)</span>
        <pre className={styles.errorText}>{chart}</pre>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={styles.diagram}
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}
