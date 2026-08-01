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
