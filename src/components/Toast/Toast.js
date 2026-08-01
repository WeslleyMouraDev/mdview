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
