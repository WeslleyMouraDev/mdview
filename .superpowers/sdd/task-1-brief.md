### Task 1: Project Scaffolding & Design System

**Files:**
- Create: `src/app/globals.css`
- Modify: `src/app/layout.js`
- Modify: `src/app/layout.module.css`
- Modify: `src/app/page.js`
- Modify: `src/app/page.module.css`
- Modify: `next.config.mjs`
- Modify: `package.json`

**Interfaces:**
- Consumes: nothing (first task)
- Produces: Running Next.js app with design system CSS custom properties, Inter + JetBrains Mono fonts loaded, root layout with theme class on `<html>`

- [ ] **Step 1: Initialize Next.js project**

```bash
npx -y create-next-app@latest ./ --js --app --src-dir --use-npm --no-tailwind --no-eslint --import-alias "@/*" --yes --disable-git
```

Expected: Next.js project created in current directory with `src/` structure.

- [ ] **Step 2: Install dependencies**

```bash
npm install react-markdown remark-gfm rehype-highlight dexie highlight.js
```

Expected: All packages added to `package.json`.

- [ ] **Step 3: Create globals.css with design system tokens**

Replace `src/app/globals.css` with the complete design system:

```css
/* ========================================
   MDView — Design System
   ======================================== */

/* ---------- Reset ---------- */
*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

/* ---------- Color Tokens ---------- */
:root {
  /* Light mode (default) */
  --bg-primary: #FFFFFF;
  --bg-sidebar: #F7F6F3;
  --text-primary: #37352F;
  --text-secondary: #787774;
  --border-color: #E8E5E0;
  --accent: #2EAADC;
  --accent-hover: #2496C4;
  --accent-bg: rgba(46, 170, 220, 0.08);
  --hover-bg: rgba(55, 53, 47, 0.04);
  --code-bg: #F7F6F3;
  --blockquote-bg: #F7F6F3;
  --toast-bg: #37352F;
  --toast-text: #FFFFFF;
  --modal-overlay: rgba(0, 0, 0, 0.4);
  --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.04);
  --shadow-md: 0 4px 12px rgba(0, 0, 0, 0.08);
  --shadow-lg: 0 8px 24px rgba(0, 0, 0, 0.12);
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 12px;
  --sidebar-width: 280px;
  --content-max-width: 780px;
  --transition-fast: 150ms ease;
  --transition-normal: 200ms ease;
}

[data-theme="dark"] {
  --bg-primary: #191919;
  --bg-sidebar: #202020;
  --text-primary: #E8E5E0;
  --text-secondary: #9B9A97;
  --border-color: #2F2F2F;
  --accent: #529CCA;
  --accent-hover: #6BB3D9;
  --accent-bg: rgba(82, 156, 202, 0.12);
  --hover-bg: rgba(255, 255, 255, 0.04);
  --code-bg: #2F2F2F;
  --blockquote-bg: #202020;
  --toast-bg: #E8E5E0;
  --toast-text: #191919;
  --modal-overlay: rgba(0, 0, 0, 0.6);
  --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.2);
  --shadow-md: 0 4px 12px rgba(0, 0, 0, 0.3);
  --shadow-lg: 0 8px 24px rgba(0, 0, 0, 0.4);
}

/* ---------- Global Styles ---------- */
html {
  scroll-behavior: smooth;
}

body {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  background-color: var(--bg-primary);
  color: var(--text-primary);
  line-height: 1.6;
  transition: background-color var(--transition-normal),
              color var(--transition-normal);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* ---------- Print Styles ---------- */
@media print {
  body {
    background: white;
    color: black;
  }

  [data-hide-print="true"] {
    display: none !important;
  }
}

/* ---------- Scrollbar ---------- */
::-webkit-scrollbar {
  width: 6px;
}

::-webkit-scrollbar-track {
  background: transparent;
}

::-webkit-scrollbar-thumb {
  background: var(--border-color);
  border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
  background: var(--text-secondary);
}

/* ---------- Selection ---------- */
::selection {
  background: var(--accent-bg);
  color: var(--text-primary);
}
```

- [ ] **Step 4: Configure layout.js with fonts and metadata**

Replace `src/app/layout.js`:

```jsx
import { Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata = {
  title: 'MDView — Visualizador de Markdown',
  description: 'Visualize seus arquivos Markdown de forma bonita e rápida. Arraste, visualize e exporte.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
```

- [ ] **Step 5: Create minimal page.js placeholder**

Replace `src/app/page.js`:

```jsx
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
```

Replace `src/app/page.module.css`:

```css
.container {
  display: flex;
  height: 100vh;
  overflow: hidden;
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

@media (max-width: 768px) {
  .sidebar {
    position: fixed;
    left: -100%;
    top: 0;
    bottom: 0;
    z-index: 100;
    box-shadow: var(--shadow-lg);
    transition: left var(--transition-normal);
  }

  .sidebarOpen {
    left: 0;
  }
}
```

- [ ] **Step 6: Verify scaffolding works**

```bash
npm run dev
```

Expected: App runs at `http://localhost:3000` showing sidebar + main placeholders with correct fonts and colors.

- [ ] **Step 7: Commit**

```bash
git add -A; git commit -m "feat: project scaffolding with design system and layout"
```

---