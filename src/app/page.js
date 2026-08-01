'use client';

import { useState, useCallback } from 'react';
import useFiles from '@/hooks/useFiles';
import useTheme from '@/hooks/useTheme';
import useContrast from '@/hooks/useContrast';
import useDragDrop from '@/hooks/useDragDrop';
import Sidebar from '@/components/Sidebar/Sidebar';
import MainContent from '@/components/MainContent/MainContent';
import FloatingControls from '@/components/FloatingControls/FloatingControls';
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
  const { contrast, toggleContrast } = useContrast();

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

  const handleMobileTocClick = useCallback(() => {
    const tocElement = document.querySelector('nav[aria-label="Índice"]');
    if (tocElement) {
      tocElement.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, []);

  const { isDragging } = useDragDrop(handleAddFiles);

  return (
    <div className={styles.container}>
      {/* Mobile Header Bar */}
      <header className={styles.mobileHeader} data-hide-print="true">
        <button
          className={styles.hamburger}
          onClick={() => setSidebarOpen((v) => !v)}
          aria-label="Abrir menu"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 5h14M3 10h14M3 15h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </button>

        <span className={styles.mobileTitle}>
          {selectedFile ? selectedFile.name : 'MDView'}
        </span>

        <div className={styles.mobileActions}>
          {selectedFile && (
            <button
              className={styles.mobileIconBtn}
              onClick={handleMobileTocClick}
              aria-label="Ir para o índice"
              title="Índice"
            >
              <svg width="18" height="18" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2 3.5h12M2 8h8M2 12.5h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </button>
          )}

          <button
            className={`${styles.mobileIconBtn} ${contrast === 'high' ? styles.activeContrast : ''}`}
            onClick={toggleContrast}
            aria-label={contrast === 'high' ? 'Modo contraste normal' : 'Modo alto contraste'}
            title={contrast === 'high' ? 'Alto contraste: Ativado' : 'Ativar alto contraste'}
          >
            <svg width="18" height="18" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.2"/>
              <path d="M8 1.5v13a6.5 6.5 0 000-13z" fill="currentColor"/>
            </svg>
          </button>
        </div>
      </header>

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
          contrast={contrast}
          onToggleContrast={toggleContrast}
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

      {/* Floating controls */}
      <FloatingControls content={selectedFile?.content} />

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

