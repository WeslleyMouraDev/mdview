'use client';

import styles from './page.module.css';
import useFiles from '@/hooks/useFiles';

export default function Home() {
  const { files } = useFiles();

  return (
    <div className={styles.container}>
      <aside className={styles.sidebar}>
        <p>Sidebar placeholder ({files.length} files)</p>
      </aside>
      <main className={styles.main}>
        <p>Main content placeholder</p>
      </main>
    </div>
  );
}

