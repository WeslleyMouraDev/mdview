### Task 4: Toast & Modal Components

**Files:**
- Create: `src/components/Toast/Toast.js`
- Create: `src/components/Toast/Toast.module.css`
- Create: `src/components/Modal/Modal.js`
- Create: `src/components/Modal/Modal.module.css`

**Interfaces:**
- Consumes: nothing
- Produces:
  - `<Toast message={string} type={'info'|'error'|'success'} onClose={fn} />` — auto-dismissing notification
  - `<Modal title={string} message={string} onConfirm={fn} onCancel={fn} />` — confirmation dialog

- [ ] **Step 1: Create Toast component**

Create `src/components/Toast/Toast.js`:

```jsx
'use client';

import { useEffect } from 'react';
import styles from './Toast.module.css';

export default function Toast({ message, type = 'info', onClose, duration = 3000 }) {
  useEffect(() => {
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [onClose, duration]);

  return (
    <div className={`${styles.toast} ${styles[type]}`} role="alert">
      <span className={styles.message}>{message}</span>
      <button className={styles.close} onClick={onClose} aria-label="Fechar">
        ×
      </button>
    </div>
  );
}
```

Create `src/components/Toast/Toast.module.css`:

```css
.toast {
  position: fixed;
  bottom: 24px;
  right: 24px;
  padding: 12px 20px;
  border-radius: var(--radius-md);
  background: var(--toast-bg);
  color: var(--toast-text);
  font-size: 14px;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 12px;
  box-shadow: var(--shadow-lg);
  z-index: 1000;
  animation: slideIn var(--transition-fast) ease-out;
}

.info {
  background: var(--toast-bg);
}

.error {
  background: #E03E3E;
  color: #FFFFFF;
}

.success {
  background: #0F7B6C;
  color: #FFFFFF;
}

.message {
  flex: 1;
}

.close {
  background: none;
  border: none;
  color: inherit;
  font-size: 18px;
  cursor: pointer;
  opacity: 0.7;
  transition: opacity var(--transition-fast);
  padding: 0 2px;
}

.close:hover {
  opacity: 1;
}

@keyframes slideIn {
  from {
    transform: translateY(16px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}
```

- [ ] **Step 2: Create Modal component**

Create `src/components/Modal/Modal.js`:

```jsx
'use client';

import { useEffect, useRef } from 'react';
import styles from './Modal.module.css';

export default function Modal({ title, message, onConfirm, onCancel, confirmLabel = 'Confirmar', cancelLabel = 'Cancelar' }) {
  const cancelRef = useRef(null);

  useEffect(() => {
    cancelRef.current?.focus();

    function handleKeyDown(e) {
      if (e.key === 'Escape') onCancel();
    }
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onCancel]);

  return (
    <div className={styles.overlay} onClick={onCancel}>
      <div
        className={styles.modal}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <h3 id="modal-title" className={styles.title}>{title}</h3>
        <p className={styles.message}>{message}</p>
        <div className={styles.actions}>
          <button
            ref={cancelRef}
            className={styles.cancelBtn}
            onClick={onCancel}
          >
            {cancelLabel}
          </button>
          <button className={styles.confirmBtn} onClick={onConfirm}>
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
```

Create `src/components/Modal/Modal.module.css`:

```css
.overlay {
  position: fixed;
  inset: 0;
  background: var(--modal-overlay);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
  animation: fadeIn var(--transition-fast) ease-out;
}

.modal {
  background: var(--bg-primary);
  border-radius: var(--radius-lg);
  padding: 24px;
  max-width: 400px;
  width: 90%;
  box-shadow: var(--shadow-lg);
}

.title {
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 8px;
}

.message {
  font-size: 14px;
  color: var(--text-secondary);
  margin-bottom: 20px;
  line-height: 1.5;
}

.actions {
  display: flex;
  justify-content: flex-end;
  gap: 8px;
}

.cancelBtn,
.confirmBtn {
  padding: 8px 16px;
  border-radius: var(--radius-sm);
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: background var(--transition-fast);
}

.cancelBtn {
  background: none;
  border: 1px solid var(--border-color);
  color: var(--text-primary);
}

.cancelBtn:hover {
  background: var(--hover-bg);
}

.confirmBtn {
  background: #E03E3E;
  border: none;
  color: #FFFFFF;
}

.confirmBtn:hover {
  background: #C83535;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
```

- [ ] **Step 3: Commit**

```bash
git add -A; git commit -m "feat: Toast notification and Modal confirmation components"
```

---