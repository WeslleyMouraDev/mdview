'use client';

import styles from './page.module.css';

export default function Home() {
  return (
    <div className={styles.container}>
      <aside className={styles.sidebar}>
        <p>Sidebar placeholder</p>
      </aside>
      <main className={styles.main}>
        <p>Main content placeholder</p>
      </main>
    </div>
  );
}
