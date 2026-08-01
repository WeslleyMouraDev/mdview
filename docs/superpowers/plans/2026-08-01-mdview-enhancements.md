# MDView Enhancements Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implement High Contrast mode with pastel accents, floating action controls (Back to Top & TOC popover), and mobile UX refinements (fixed mobile header, auto-closing drawer, 44px touch targets).

**Architecture:** Extended Next.js 14+ App Router SPA. `useContrast` hook controls `data-contrast="high"` on `document.documentElement` and persists to `localStorage`. `FloatingControls` component provides back-to-top smooth scrolling and popover TOC menu. CSS custom properties in `globals.css` define theme/contrast token combinations.

**Tech Stack:** Next.js 14+ (App Router), React, CSS Modules, Dexie.js

## Global Constraints

- Next.js 14+ App Router — all components/hooks are client components (`'use client'`)
- JavaScript (not TypeScript)
- CSS Modules exclusively — no Tailwind
- Attributes on `<html>`: `data-theme` (`light` | `dark`), `data-contrast` (`normal` | `high`)
- LocalStorage keys: `mdview-theme`, `mdview-contrast`
- Commit after each task

---

## File Structure

```
d:/Projetos/MDView/
├── src/
│   ├── app/
│   │   ├── globals.css                       # Enhanced with high-contrast color tokens
│   │   ├── page.js                           # Assembly with contrast hook, floating controls, mobile header
│   │   └── page.module.css                   # Mobile header and responsive tweaks
│   ├── hooks/
│   │   └── useContrast.js                    # High contrast mode state & localStorage persistence [NEW]
│   ├── components/
│   │   ├── FloatingControls/
│   │   │   ├── FloatingControls.js           # Back-to-top button + TOC Popover [NEW]
│   │   │   └── FloatingControls.module.css   # Floating styles, animations, popover layout [NEW]
│   │   ├── Sidebar/
│   │   │   ├── SidebarFooter.js              # Add contrast toggle button
│   │   │   └── SidebarFooter.module.css
│   │   └── MainContent/
│   │       ├── MarkdownViewer.module.css     # CSS custom property bindings for H1/H2/H3/links/code/quotes
│   │       └── ExportBar.module.css          # Print/export bar adjustments
```

---

### Task 1: High Contrast Design System Tokens & useContrast Hook

**Files:**
- Create: `src/hooks/useContrast.js`
- Modify: `src/app/globals.css`
- Modify: `src/components/MainContent/MarkdownViewer.module.css`

**Interfaces:**
- Consumes: nothing
- Produces:
  - `useContrast()` — hook returning `{ contrast, toggleContrast }` where `contrast` is `'normal'` or `'high'`
  - CSS custom properties for `data-contrast="high"` in `globals.css` and heading color bindings in `MarkdownViewer.module.css`

- [ ] **Step 1: Create useContrast hook**

Create `src/hooks/useContrast.js`:

```js
'use client';

import { useState, useEffect, useCallback } from 'react';

export default function useContrast() {
  const [contrast, setContrast] = useState('normal');

  useEffect(() => {
    const saved = localStorage.getItem('mdview-contrast');
    if (saved === 'high' || saved === 'normal') {
      setContrast(saved);
      document.documentElement.setAttribute('data-contrast', saved);
    }
  }, []);

  const toggleContrast = useCallback(() => {
    setContrast((prev) => {
      const next = prev === 'normal' ? 'high' : 'normal';
      localStorage.setItem('mdview-contrast', next);
      document.documentElement.setAttribute('data-contrast', next);
      return next;
    });
  }, []);

  return { contrast, toggleContrast };
}
```

- [ ] **Step 2: Update globals.css with High Contrast color tokens**

Add `[data-contrast="high"]` and combined selectors to `src/app/globals.css`:

```css
/* ---------- High Contrast Tokens ---------- */
[data-contrast="high"] {
  --h1-color: #6D28D9;
  --h2-color: #2563EB;
  --h3-color: #059669;
  --link-color: #0284C7;
  --blockquote-bg: #FEF3C7;
  --blockquote-border: #D97706;
  --code-bg: #F1F5F9;
  --border-color: #CBD5E1;
  --text-primary: #242424;
}

[data-theme="dark"][data-contrast="high"] {
  --bg-primary: #121212;
  --bg-sidebar: #1A1A1A;
  --text-primary: #F0EFEA;
  --text-secondary: #A3A3A3;
  --border-color: #333333;
  --h1-color: #C4B5FD;
  --h2-color: #93C5FD;
  --h3-color: #6EE7B7;
  --link-color: #67E8F9;
  --blockquote-bg: #1A1D24;
  --blockquote-border: #FDE68A;
  --code-bg: #1E2430;
}
```

- [ ] **Step 3: Update MarkdownViewer.module.css heading and link bindings**

Update `src/components/MainContent/MarkdownViewer.module.css` to use the contrast CSS variables for headings and links:

```css
.markdown h1 {
  font-size: 28px;
  color: var(--h1-color, inherit);
}

.markdown h2 {
  font-size: 24px;
  border-bottom: 1px solid var(--border-color);
  padding-bottom: 8px;
  color: var(--h2-color, inherit);
}

.markdown h3 {
  font-size: 20px;
  color: var(--h3-color, inherit);
}

.markdown a {
  color: var(--link-color, var(--accent));
  text-decoration: none;
  border-bottom: 1px solid transparent;
  transition: border-color var(--transition-fast);
}

.markdown blockquote {
  border-left: 3px solid var(--blockquote-border, var(--accent));
  background: var(--blockquote-bg);
  margin: 0 0 1em 0;
  padding: 12px 16px;
  border-radius: 0 var(--radius-sm) var(--radius-sm) 0;
  color: var(--text-secondary);
}
```

- [ ] **Step 4: Verify build**

```bash
npm run build
```

Expected: Build succeeds with 0 errors.

- [ ] **Step 5: Commit**

```bash
git add -A; git commit -m "feat: high contrast mode hook and design system tokens"
```

---

### Task 2: Contrast Toggle Buttons in Sidebar & Header

**Files:**
- Modify: `src/components/Sidebar/SidebarFooter.js`
- Modify: `src/components/Sidebar/SidebarFooter.module.css`
- Modify: `src/components/Sidebar/Sidebar.js`

**Interfaces:**
- Consumes: `useContrast()` — `{ contrast, toggleContrast }`
- Produces: Contrast toggle button next to theme toggle button in `SidebarFooter`

- [ ] **Step 1: Update SidebarFooter with contrast toggle button**

Replace `src/components/Sidebar/SidebarFooter.js`:

```jsx
'use client';

import styles from './SidebarFooter.module.css';

export default function SidebarFooter({
  theme,
  onToggleTheme,
  contrast,
  onToggleContrast,
  onClearAll,
  hasFiles,
}) {
  return (
    <div className={styles.footer} data-hide-print="true">
      {hasFiles && (
        <button
          className={styles.clearBtn}
          onClick={onClearAll}
          aria-label="Limpar todos os arquivos"
        >
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M2 4h12M5 4V3a1 1 0 011-1h4a1 1 0 011 1v1M6 7v5M10 7v5M3 4l1 10a1 1 0 001 1h6a1 1 0 001-1l1-10" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
          </svg>
          Limpar tudo
        </button>
      )}
      <div className={styles.toggles}>
        <button
          className={`${styles.iconBtn} ${contrast === 'high' ? styles.active : ''}`}
          onClick={onToggleContrast}
          aria-label={contrast === 'high' ? 'Modo contraste normal' : 'Modo alto contraste'}
          title={contrast === 'high' ? 'Alto contraste: Ativado' : 'Ativar alto contraste'}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.2"/>
            <path d="M8 1.5v13a6.5 6.5 0 000-13z" fill="currentColor"/>
          </svg>
        </button>
        <button
          className={styles.iconBtn}
          onClick={onToggleTheme}
          aria-label={theme === 'light' ? 'Ativar modo escuro' : 'Ativar modo claro'}
          title={theme === 'light' ? 'Modo claro' : 'Modo escuro'}
        >
          {theme === 'light' ? (
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8 1v1M8 14v1M1 8h1M14 8h1M3.05 3.05l.7.7M12.25 12.25l.7.7M3.05 12.95l.7-.7M12.25 3.75l.7-.7" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
              <circle cx="8" cy="8" r="3" stroke="currentColor" strokeWidth="1.2"/>
            </svg>
          ) : (
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M13.5 9.5A5.5 5.5 0 116.5 2.5a4.5 4.5 0 007 7z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
            </svg>
          )}
        </button>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Update SidebarFooter.module.css for toggle group**

Update `src/components/Sidebar/SidebarFooter.module.css`:

```css
.footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  border-top: 1px solid var(--border-color);
}

.clearBtn {
  display: flex;
  align-items: center;
  gap: 6px;
  background: none;
  border: none;
  color: var(--text-secondary);
  font-size: 12px;
  cursor: pointer;
  padding: 4px 8px;
  border-radius: var(--radius-sm);
  transition: all var(--transition-fast);
}

.clearBtn:hover {
  color: #E03E3E;
  background: rgba(224, 62, 62, 0.08);
}

.toggles {
  display: flex;
  align-items: center;
  gap: 4px;
}

.iconBtn {
  background: none;
  border: none;
  color: var(--text-secondary);
  cursor: pointer;
  padding: 6px;
  border-radius: var(--radius-sm);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all var(--transition-fast);
  min-width: 32px;
  min-height: 32px;
}

.iconBtn:hover {
  background: var(--hover-bg);
  color: var(--text-primary);
}

.active {
  color: var(--accent);
  background: var(--accent-bg);
}
```

- [ ] **Step 3: Update Sidebar.js to pass contrast props**

Update `src/components/Sidebar/Sidebar.js` to accept `contrast` and `onToggleContrast` and pass them to `SidebarFooter`.

- [ ] **Step 4: Verify build**

```bash
npm run build
```

- [ ] **Step 5: Commit**

```bash
git add -A; git commit -m "feat: add contrast toggle button to SidebarFooter"
```

---

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

### Task 4: Page Integration & Mobile UX Refinements

**Files:**
- Modify: `src/app/page.js`
- Modify: `src/app/page.module.css`

**Interfaces:**
- Consumes: `useContrast()`, `FloatingControls`, `useFiles()`, `useTheme()`, `Sidebar`, `MainContent`
- Produces: Assembled page with high contrast support, mobile header, auto-close sidebar on file select, floating controls

- [ ] **Step 1: Update page.js with contrast hook, mobile header, floating controls**

Update `src/app/page.js` to:
1. Import `useContrast` and `FloatingControls`.
2. Pass `contrast` and `toggleContrast` to `Sidebar`.
3. Add a top bar in mobile layout containing hamburger, selected file name, contrast toggle, and TOC trigger.
4. Auto-close sidebar when selecting a file in `onSelectFile`.
5. Render `<FloatingControls content={selectedFile?.content} />`.

- [ ] **Step 2: Update page.module.css with mobile header and touch target styles**

Update `src/app/page.module.css` for enhanced mobile header layout, 44px touch targets on mobile controls, and responsive drawer transitions.

- [ ] **Step 3: Run build and verify full app**

```bash
npm run build
```

Expected: Production build succeeds with 0 errors.

- [ ] **Step 4: Commit and Push**

```bash
git add -A; git commit -m "feat: complete mobile UX refinements, contrast integration, and floating controls"
git push origin main
```

Expected: All changes committed and pushed to `https://github.com/WeslleyMouraDev/mdview.git`.
