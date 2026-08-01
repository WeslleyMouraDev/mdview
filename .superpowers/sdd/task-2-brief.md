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