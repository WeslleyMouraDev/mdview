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
