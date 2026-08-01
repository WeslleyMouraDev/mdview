### Task 7: Page Assembly & Drag-and-Drop Overlay

**Files:**
- Create: `src/hooks/useDragDrop.js`
- Modify: `src/app/page.js`
- Modify: `src/app/page.module.css`

**Interfaces:**
- Consumes:
  - `useFiles()` — all exported values
  - `useTheme()` — `{ theme, toggleTheme }`
  - `useDragDrop(onDrop)` — `{ isDragging }`
  - `<Sidebar />`, `<MainContent />`, `<Toast />`, `<Modal />`
- Produces: Complete assembled application page

- [ ] **Step 1: Create useDragDrop hook**

Create `src/hooks/useDragDrop.js`:

```js
'use client';

import { useState, useEffect, useCallback } from 'react';

export default function useDragDrop(onDrop) {
  const [isDragging, setIsDragging] = useState(false);
  let dragCounter = 0;

  const handleDragEnter = useCallback((e) => {
    e.preventDefault();
    dragCounter++;
    if (e.dataTransfer.types.includes('Files')) {
      setIsDragging(true);
    }
  }, []);

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    dragCounter--;
    if (dragCounter === 0) {
      setIsDragging(false);
    }
  }, []);

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
  }, []);

  const handleDrop = useCallback(
    (e) => {
      e.preventDefault();
      dragCounter = 0;
      setIsDragging(false);
      const files = Array.from(e.dataTransfer.files);
      if (files.length > 0) {
        onDrop(files);
      }
    },
    [onDrop]
  );

  useEffect(() => {
    document.addEventListener('dragenter', handleDragEnter);
    document.addEventListener('dragleave', handleDragLeave);
    document.addEventListener('dragover', handleDragOver);
    document.addEventListener('drop', handleDrop);

    return () => {
      document.removeEventListener('dragenter', handleDragEnter);
      document.removeEventListener('dragleave', handleDragLeave);
      document.removeEventListener('dragover', handleDragOver);
      document.removeEventListener('drop', handleDrop);
    };
  }, [handleDragEnter, handleDragLeave, handleDragOver, handleDrop]);

  return { isDragging };
}
```

- [ ] **Step 2: Assemble page.js with all components**

Replace `src/app/page.js`:

```jsx
'use client';

import { useState, useCallback } from 'react';
import useFiles from '@/hooks/useFiles';
import useTheme from '@/hooks/useTheme';
import useDragDrop from '@/hooks/useDragDrop';
import Sidebar from '@/components/Sidebar/Sidebar';
import MainContent from '@/components/MainContent/MainContent';
import Toast from '@/components/Toast/Toast';
import Modal from '@/components/Modal/Modal';
import styles from './page.module.css';

export default function Home() {
  const {
    files,
    selectedFile,
    selectedFileId,
    selectFile,
    addFiles,
    replaceDuplicate,
    removeFile,
    clearAll,
    sortBy,
    setSortBy,
    dbAvailable,
    getTotalSize,
  } = useFiles();

  const { theme, toggleTheme } = useTheme();

  const [toast, setToast] = useState(null);
  const [modal, setModal] = useState(null);
  const [pendingDuplicates, setPendingDuplicates] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const showToast = useCallback((message, type = 'info') => {
    setToast({ message, type });
  }, []);

  const handleAddFiles = useCallback(
    async (fileList) => {
      const nonMd = fileList.filter((f) => !f.name.endsWith('.md'));
      const mdFiles = fileList.filter((f) => f.name.endsWith('.md'));

      if (nonMd.length > 0) {
        showToast('Apenas arquivos .md são aceitos', 'error');
      }

      if (mdFiles.length === 0) return;

      const { added, duplicates } = await addFiles(mdFiles);

      if (added > 0) {
        showToast(`${added} arquivo${added !== 1 ? 's' : ''} adicionado${added !== 1 ? 's' : ''}`, 'success');
      }

      // Check storage limit
      const totalSize = getTotalSize();
      if (totalSize > 50 * 1024 * 1024) {
        showToast('Armazenamento acima de 50MB. Considere remover alguns arquivos.', 'info');
      }

      if (duplicates.length > 0) {
        setPendingDuplicates(duplicates);
        const dup = duplicates[0];
        setModal({
          title: 'Arquivo duplicado',
          message: `"${dup.name}" já existe. Deseja substituir o conteúdo?`,
          onConfirm: () => {
            replaceDuplicate(dup.name, dup.content, dup.size);
            setPendingDuplicates((prev) => prev.slice(1));
            setModal(null);
            showToast(`"${dup.name}" substituído`, 'success');
          },
          onCancel: () => {
            setPendingDuplicates((prev) => prev.slice(1));
            setModal(null);
          },
        });
      }
    },
    [addFiles, replaceDuplicate, showToast, getTotalSize]
  );

  const handleRemoveFile = useCallback(
    (id) => {
      removeFile(id);
    },
    [removeFile]
  );

  const handleClearAll = useCallback(() => {
    setModal({
      title: 'Limpar todos os arquivos',
      message: 'Tem certeza? Esta ação não pode ser desfeita.',
      onConfirm: () => {
        clearAll();
        setModal(null);
        showToast('Todos os arquivos foram removidos', 'success');
      },
      onCancel: () => setModal(null),
    });
  }, [clearAll, showToast]);

  const { isDragging } = useDragDrop(handleAddFiles);

  return (
    <div className={styles.container}>
      {/* Mobile hamburger */}
      <button
        className={styles.hamburger}
        onClick={() => setSidebarOpen((v) => !v)}
        aria-label="Abrir menu"
        data-hide-print="true"
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M3 5h14M3 10h14M3 15h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
      </button>

      {/* Sidebar */}
      <aside className={`${styles.sidebar} ${sidebarOpen ? styles.sidebarOpen : ''}`}>
        <Sidebar
          files={files}
          selectedFileId={selectedFileId}
          onSelectFile={(id) => {
            selectFile(id);
            setSidebarOpen(false);
          }}
          onAddFiles={handleAddFiles}
          onRemoveFile={handleRemoveFile}
          onClearAll={handleClearAll}
          sortBy={sortBy}
          onSortChange={setSortBy}
          theme={theme}
          onToggleTheme={toggleTheme}
        />
      </aside>

      {/* Sidebar mobile overlay */}
      {sidebarOpen && (
        <div
          className={styles.overlay}
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main content */}
      <main className={styles.main}>
        <MainContent selectedFile={selectedFile} onAddFiles={handleAddFiles} />
      </main>

      {/* Drag-and-drop overlay */}
      {isDragging && (
        <div className={styles.dropOverlay}>
          <div className={styles.dropContent}>
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M24 32V16M18 22l6-6 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <rect x="8" y="4" width="32" height="40" rx="4" stroke="currentColor" strokeWidth="2"/>
            </svg>
            <p>Solte seus arquivos .md aqui</p>
          </div>
        </div>
      )}

      {/* DB unavailable warning */}
      {!dbAvailable && (
        <Toast
          message="Armazenamento indisponível. Arquivos não serão salvos entre sessões."
          type="info"
          onClose={() => {}}
          duration={5000}
        />
      )}

      {/* Toast notification */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      {/* Modal dialog */}
      {modal && (
        <Modal
          title={modal.title}
          message={modal.message}
          onConfirm={modal.onConfirm}
          onCancel={modal.onCancel}
        />
      )}
    </div>
  );
}
```

- [ ] **Step 3: Update page.module.css with full layout + overlays**

Replace `src/app/page.module.css`:

```css
.container {
  display: flex;
  height: 100vh;
  overflow: hidden;
  position: relative;
}

.sidebar {
  width: var(--sidebar-width);
  min-width: var(--sidebar-width);
  background: var(--bg-sidebar);
  border-right: 1px solid var(--border-color);
  display: flex;
  flex-direction: column;
  transition: background-color var(--transition-normal);
}

.main {
  flex: 1;
  overflow-y: auto;
  background: var(--bg-primary);
  transition: background-color var(--transition-normal);
}

.hamburger {
  display: none;
  position: fixed;
  top: 12px;
  left: 12px;
  z-index: 101;
  background: var(--bg-primary);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  padding: 8px;
  color: var(--text-primary);
  cursor: pointer;
  box-shadow: var(--shadow-sm);
}

.overlay {
  display: none;
}

/* Drop overlay */
.dropOverlay {
  position: fixed;
  inset: 0;
  background: rgba(46, 170, 220, 0.08);
  backdrop-filter: blur(2px);
  z-index: 200;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: fadeIn 150ms ease-out;
}

.dropContent {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  color: var(--accent);
  font-size: 18px;
  font-weight: 500;
  padding: 48px;
  border: 2px dashed var(--accent);
  border-radius: var(--radius-lg);
  animation: pulse 2s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.6; }
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

/* Mobile responsive */
@media (max-width: 768px) {
  .hamburger {
    display: flex;
  }

  .sidebar {
    position: fixed;
    left: -100%;
    top: 0;
    bottom: 0;
    z-index: 100;
    box-shadow: var(--shadow-lg);
    transition: left var(--transition-normal), background-color var(--transition-normal);
  }

  .sidebarOpen {
    left: 0;
  }

  .overlay {
    display: block;
    position: fixed;
    inset: 0;
    background: var(--modal-overlay);
    z-index: 99;
  }
}
```

- [ ] **Step 4: Run and verify complete app**

```bash
npm run dev
```

Expected: Full app running — sidebar with upload, file list, theme toggle; main area with empty state; drag-and-drop overlay working.

- [ ] **Step 5: Commit**

```bash
git add -A; git commit -m "feat: assemble page with all components, drag-and-drop overlay, and mobile responsive"
```

---