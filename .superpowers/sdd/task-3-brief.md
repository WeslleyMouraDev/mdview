### Task 3: Floating Controls Component (Back to Top & TOC Popover)

**Files:**
- Create: `src/components/FloatingControls/FloatingControls.js`
- Create: `src/components/FloatingControls/FloatingControls.module.css`

**Interfaces:**
- Consumes:
  - `content` — string (markdown content of current selected file)
  - `show` — boolean (whether a file is currently selected)
- Produces: Floating action buttons for smooth scroll-to-top and TOC popover menu

- [ ] **Step 1: Create FloatingControls component**

Create `src/components/FloatingControls/FloatingControls.js`:

```jsx
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
```

- [ ] **Step 2: Create FloatingControls.module.css**

Create `src/components/FloatingControls/FloatingControls.module.css`:

```css
.container {
  position: fixed;
  bottom: 24px;
  right: 24px;
  z-index: 90;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 12px;
}

.buttonGroup {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.floatingBtn {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: var(--bg-primary);
  border: 1px solid var(--border-color);
  color: var(--text-primary);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: var(--shadow-md);
  transition: all var(--transition-fast);
}

.floatingBtn:hover {
  background: var(--accent-bg);
  border-color: var(--accent);
  color: var(--accent);
  transform: translateY(-2px);
}

.active {
  background: var(--accent);
  color: #FFFFFF;
  border-color: var(--accent);
}

.active:hover {
  background: var(--accent-hover);
  color: #FFFFFF;
}

.popover {
  width: 280px;
  max-height: 360px;
  background: var(--bg-primary);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-lg);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  animation: slideUp var(--transition-fast) ease-out;
}

.popoverHeader {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  border-bottom: 1px solid var(--border-color);
}

.popoverTitle {
  font-size: 13px;
  font-weight: 600;
  color: var(--text-primary);
}

.closeBtn {
  background: none;
  border: none;
  color: var(--text-secondary);
  font-size: 18px;
  cursor: pointer;
  padding: 0 4px;
  border-radius: var(--radius-sm);
}

.closeBtn:hover {
  color: var(--text-primary);
}

.headingList {
  list-style: none;
  overflow-y: auto;
  padding: 6px 0;
  max-height: 300px;
}

.headingBtn {
  width: 100%;
  text-align: left;
  background: none;
  border: none;
  padding: 8px 16px;
  font-size: 13px;
  color: var(--text-secondary);
  cursor: pointer;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  transition: all var(--transition-fast);
  font-family: inherit;
}

.headingBtn:hover {
  background: var(--hover-bg);
  color: var(--accent);
}

.emptyText {
  padding: 16px;
  font-size: 13px;
  color: var(--text-secondary);
  text-align: center;
}

@keyframes slideUp {
  from { opacity: 0; transform: translateY(8px); }
  to { opacity: 1; transform: translateY(0); }
}

@media (max-width: 768px) {
  .container {
    bottom: 20px;
    right: 16px;
  }

  .popover {
    width: calc(100vw - 32px);
    max-width: 320px;
  }
}
```

- [ ] **Step 3: Verify build**

```bash
npm run build
```

- [ ] **Step 4: Commit**

```bash
git add -A; git commit -m "feat: FloatingControls component with Back-to-Top and TOC Popover"
```

---