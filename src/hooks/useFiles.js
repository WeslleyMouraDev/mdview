'use client';

import { useState, useEffect, useCallback } from 'react';
import db from '@/lib/db';

export default function useFiles() {
  const [files, setFiles] = useState([]);
  const [selectedFileId, setSelectedFileId] = useState(null);
  const [sortBy, setSortBy] = useState('name'); // 'name' | 'uploadedAt'
  const [dbAvailable, setDbAvailable] = useState(true);

  // Load files from IndexedDB on mount
  useEffect(() => {
    async function loadFiles() {
      try {
        const stored = await db.files.toArray();
        setFiles(stored);
        if (stored.length > 0 && !selectedFileId) {
          setSelectedFileId(stored[0].id);
        }
      } catch {
        setDbAvailable(false);
      }
    }
    loadFiles();
  }, []);

  // Sort files when sortBy changes
  const sortedFiles = [...files].sort((a, b) => {
    if (sortBy === 'name') return a.name.localeCompare(b.name);
    return new Date(b.uploadedAt) - new Date(a.uploadedAt);
  });

  const selectedFile = files.find((f) => f.id === selectedFileId) || null;

  const addFiles = useCallback(
    async (fileList) => {
      const newFiles = [];
      const duplicates = [];

      for (const file of fileList) {
        if (!file.name.endsWith('.md')) continue;

        const content = await new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result);
          reader.onerror = () => reject(reader.error);
          reader.readAsText(file);
        });

        const existing = files.find((f) => f.name === file.name);
        if (existing) {
          duplicates.push({ existing, name: file.name, content, size: file.size });
        } else {
          newFiles.push({
            name: file.name,
            content,
            size: file.size,
            uploadedAt: new Date(),
          });
        }
      }

      if (newFiles.length > 0) {
        try {
          const ids = await db.files.bulkAdd(newFiles, { allKeys: true });
          const withIds = newFiles.map((f, i) => ({ ...f, id: ids[i] }));
          setFiles((prev) => [...prev, ...withIds]);
          if (!selectedFileId && withIds.length > 0) {
            setSelectedFileId(withIds[0].id);
          }
        } catch {
          // Fallback: in-memory only
          const withIds = newFiles.map((f, i) => ({
            ...f,
            id: Date.now() + i,
          }));
          setFiles((prev) => [...prev, ...withIds]);
          if (!selectedFileId && withIds.length > 0) {
            setSelectedFileId(withIds[0].id);
          }
        }
      }

      return { added: newFiles.length, duplicates };
    },
    [files, selectedFileId]
  );

  const replaceDuplicate = useCallback(
    async (name, content, size) => {
      const existing = files.find((f) => f.name === name);
      if (!existing) return;

      const updated = { ...existing, content, size, uploadedAt: new Date() };
      try {
        await db.files.update(existing.id, {
          content,
          size,
          uploadedAt: updated.uploadedAt,
        });
      } catch {
        // in-memory only
      }
      setFiles((prev) =>
        prev.map((f) => (f.id === existing.id ? updated : f))
      );
    },
    [files]
  );

  const removeFile = useCallback(
    async (id) => {
      try {
        await db.files.delete(id);
      } catch {
        // in-memory only
      }
      setFiles((prev) => prev.filter((f) => f.id !== id));
      if (selectedFileId === id) {
        setSelectedFileId((prev) => {
          const remaining = files.filter((f) => f.id !== id);
          return remaining.length > 0 ? remaining[0].id : null;
        });
      }
    },
    [files, selectedFileId]
  );

  const clearAll = useCallback(async () => {
    try {
      await db.files.clear();
    } catch {
      // in-memory only
    }
    setFiles([]);
    setSelectedFileId(null);
  }, []);

  const selectFile = useCallback((id) => {
    setSelectedFileId(id);
  }, []);

  const getTotalSize = useCallback(() => {
    return files.reduce((sum, f) => sum + (f.size || 0), 0);
  }, [files]);

  return {
    files: sortedFiles,
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
  };
}
