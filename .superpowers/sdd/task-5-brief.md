### Task 5: Sidebar Components

**Files:**
- Create: `src/components/Sidebar/FileUploader.js`
- Create: `src/components/Sidebar/FileUploader.module.css`
- Create: `src/components/Sidebar/FileItem.js`
- Create: `src/components/Sidebar/FileItem.module.css`
- Create: `src/components/Sidebar/FileList.js`
- Create: `src/components/Sidebar/FileList.module.css`
- Create: `src/components/Sidebar/SidebarFooter.js`
- Create: `src/components/Sidebar/SidebarFooter.module.css`
- Create: `src/components/Sidebar/Sidebar.js`
- Create: `src/components/Sidebar/Sidebar.module.css`

**Interfaces:**
- Consumes:
  - `useFiles()` — `{ files, selectedFileId, selectFile, addFiles, removeFile, clearAll, sortBy, setSortBy }`
  - `useTheme()` — `{ theme, toggleTheme }`
- Produces:
  - `<Sidebar files={array} selectedFileId={number} onSelectFile={fn} onAddFiles={fn} onRemoveFile={fn} onClearAll={fn} sortBy={string} onSortChange={fn} theme={string} onToggleTheme={fn} onToast={fn} />` — complete sidebar

- [ ] **Step 1: Create FileUploader component**

Create `src/components/Sidebar/FileUploader.js`:

```jsx
'use client';

import { useRef } from 'react';
import styles from './FileUploader.module.css';

export default function FileUploader({ onFilesSelected }) {
  const inputRef = useRef(null);

  function handleChange(e) {
    if (e.target.files.length > 0) {
      onFilesSelected(Array.from(e.target.files));
      e.target.value = '';
    }
  }

  return (
    <div className={styles.uploader}>
      <input
        ref={inputRef}
        type="file"
        accept=".md"
        multiple
        onChange={handleChange}
        className={styles.input}
        id="file-upload"
        aria-label="Selecionar arquivos Markdown"
      />
      <button
        className={styles.button}
        onClick={() => inputRef.current?.click()}
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M8 3v10M3 8h10" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </svg>
        Adicionar arquivo
      </button>
    </div>
  );
}
```

Create `src/components/Sidebar/FileUploader.module.css`:

```css
.uploader {
  padding: 12px 16px;
}

.input {
  display: none;
}

.button {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 10px 16px;
  background: none;
  border: 1px dashed var(--border-color);
  border-radius: var(--radius-md);
  color: var(--text-secondary);
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: all var(--transition-fast);
}

.button:hover {
  border-color: var(--accent);
  color: var(--accent);
  background: var(--accent-bg);
}
```

- [ ] **Step 2: Create FileItem component**

Create `src/components/Sidebar/FileItem.js`:

```jsx
'use client';

import styles from './FileItem.module.css';

function formatSize(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export default function FileItem({ file, isSelected, onSelect, onRemove }) {
  return (
    <div
      className={`${styles.item} ${isSelected ? styles.selected : ''}`}
      onClick={() => onSelect(file.id)}
      role="button"
      tabIndex={0}
      aria-selected={isSelected}
      onKeyDown={(e) => {
        if (e.key === 'Enter') onSelect(file.id);
        if (e.key === 'Delete') onRemove(file.id);
      }}
    >
      <div className={styles.icon}>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M4 1h5.5L13 4.5V14a1 1 0 01-1 1H4a1 1 0 01-1-1V2a1 1 0 011-1z" stroke="currentColor" strokeWidth="1.2"/>
          <path d="M9 1v4h4" stroke="currentColor" strokeWidth="1.2"/>
        </svg>
      </div>
      <div className={styles.info}>
        <span className={styles.name} title={file.name}>
          {file.name}
        </span>
        <span className={styles.size}>{formatSize(file.size)}</span>
      </div>
      <button
        className={styles.remove}
        onClick={(e) => {
          e.stopPropagation();
          onRemove(file.id);
        }}
        aria-label={`Remover ${file.name}`}
        title="Remover"
      >
        ×
      </button>
    </div>
  );
}
```

Create `src/components/Sidebar/FileItem.module.css`:

```css
.item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 16px;
  cursor: pointer;
  position: relative;
  transition: background var(--transition-fast);
  border-left: 3px solid transparent;
}

.item:hover {
  background: var(--hover-bg);
}

.item:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: -2px;
}

.selected {
  background: var(--accent-bg);
  border-left-color: var(--accent);
}

.icon {
  flex-shrink: 0;
  color: var(--text-secondary);
  display: flex;
  align-items: center;
}

.selected .icon {
  color: var(--accent);
}

.info {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.name {
  font-size: 13px;
  font-weight: 500;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.size {
  font-size: 11px;
  color: var(--text-secondary);
}

.remove {
  flex-shrink: 0;
  background: none;
  border: none;
  color: var(--text-secondary);
  font-size: 16px;
  cursor: pointer;
  opacity: 0;
  transition: opacity var(--transition-fast), color var(--transition-fast);
  padding: 2px 4px;
  border-radius: var(--radius-sm);
}

.item:hover .remove {
  opacity: 1;
}

.remove:hover {
  color: #E03E3E;
}
```

- [ ] **Step 3: Create FileList component**

Create `src/components/Sidebar/FileList.js`:

```jsx
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
```

Create `src/components/Sidebar/FileList.module.css`:

```css
.list {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 16px;
  border-bottom: 1px solid var(--border-color);
}

.count {
  font-size: 12px;
  color: var(--text-secondary);
  font-weight: 500;
}

.sort {
  font-size: 11px;
  background: none;
  border: 1px solid var(--border-color);
  border-radius: var(--radius-sm);
  padding: 2px 6px;
  color: var(--text-secondary);
  cursor: pointer;
  font-family: inherit;
}

.items {
  flex: 1;
  overflow-y: auto;
  padding: 4px 0;
}

.empty {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.emptyText {
  font-size: 13px;
  color: var(--text-secondary);
}
```

- [ ] **Step 4: Create SidebarFooter component**

Create `src/components/Sidebar/SidebarFooter.js`:

```jsx
'use client';

import styles from './SidebarFooter.module.css';

export default function SidebarFooter({ theme, onToggleTheme, onClearAll, hasFiles }) {
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
      <button
        className={styles.themeBtn}
        onClick={onToggleTheme}
        aria-label={theme === 'light' ? 'Ativar modo escuro' : 'Ativar modo claro'}
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
  );
}
```

Create `src/components/Sidebar/SidebarFooter.module.css`:

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

.themeBtn {
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
}

.themeBtn:hover {
  background: var(--hover-bg);
  color: var(--text-primary);
}
```

- [ ] **Step 5: Create Sidebar container component**

Create `src/components/Sidebar/Sidebar.js`:

```jsx
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
        onClearAll={onClearAll}
        hasFiles={files.length > 0}
      />
    </div>
  );
}
```

Create `src/components/Sidebar/Sidebar.module.css`:

```css
.sidebar {
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
}

.logo {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 16px;
  border-bottom: 1px solid var(--border-color);
  color: var(--text-primary);
}

.logoText {
  font-size: 15px;
  font-weight: 600;
  letter-spacing: -0.2px;
}
```

- [ ] **Step 6: Commit**

```bash
git add -A; git commit -m "feat: sidebar components — FileUploader, FileItem, FileList, SidebarFooter, Sidebar"
```

---