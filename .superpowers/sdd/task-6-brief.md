### Task 6: Main Content Components

**Files:**
- Create: `src/lib/extractHeadings.js`
- Create: `src/components/MainContent/TableOfContents.js`
- Create: `src/components/MainContent/TableOfContents.module.css`
- Create: `src/components/MainContent/MarkdownViewer.js`
- Create: `src/components/MainContent/MarkdownViewer.module.css`
- Create: `src/components/MainContent/EmptyState.js`
- Create: `src/components/MainContent/EmptyState.module.css`
- Create: `src/components/MainContent/ExportBar.js`
- Create: `src/components/MainContent/ExportBar.module.css`
- Create: `src/components/MainContent/MainContent.js`
- Create: `src/components/MainContent/MainContent.module.css`

**Interfaces:**
- Consumes:
  - `selectedFile` — `{ id, name, content, size, uploadedAt }` or `null`
- Produces:
  - `<MainContent selectedFile={object|null} onAddFiles={fn} />` — complete main area with empty state, markdown rendering, TOC, and export

- [ ] **Step 1: Create extractHeadings utility**

Create `src/lib/extractHeadings.js`:

```js
/**
 * Extracts headings from markdown content for TOC generation.
 * Returns array of { level, text, id } objects.
 */
export default function extractHeadings(markdown) {
  const headingRegex = /^(#{1,6})\s+(.+)$/gm;
  const headings = [];
  let match;

  while ((match = headingRegex.exec(markdown)) !== null) {
    const level = match[1].length;
    const text = match[2].replace(/[*_`~\[\]]/g, '').trim();
    const id = text
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-');
    headings.push({ level, text, id });
  }

  return headings;
}
```

- [ ] **Step 2: Create TableOfContents component**

Create `src/components/MainContent/TableOfContents.js`:

```jsx
'use client';

import { useMemo } from 'react';
import extractHeadings from '@/lib/extractHeadings';
import styles from './TableOfContents.module.css';

export default function TableOfContents({ content }) {
  const headings = useMemo(() => extractHeadings(content), [content]);

  if (headings.length < 2) return null;

  const minLevel = Math.min(...headings.map((h) => h.level));

  return (
    <nav className={styles.toc} aria-label="Índice">
      <h4 className={styles.title}>Índice</h4>
      <ul className={styles.list}>
        {headings.map((heading, i) => (
          <li
            key={i}
            className={styles.item}
            style={{ paddingLeft: `${(heading.level - minLevel) * 16}px` }}
          >
            <a href={`#${heading.id}`} className={styles.link}>
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
```

Create `src/components/MainContent/TableOfContents.module.css`:

```css
.toc {
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  padding: 16px 20px;
  margin-bottom: 32px;
  background: var(--hover-bg);
}

.title {
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: var(--text-secondary);
  margin-bottom: 12px;
}

.list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.item {
  line-height: 1.4;
}

.link {
  font-size: 13px;
  color: var(--text-secondary);
  text-decoration: none;
  transition: color var(--transition-fast);
}

.link:hover {
  color: var(--accent);
}
```

- [ ] **Step 3: Create MarkdownViewer component**

Create `src/components/MainContent/MarkdownViewer.js`:

```jsx
'use client';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import TableOfContents from './TableOfContents';
import styles from './MarkdownViewer.module.css';
import 'highlight.js/styles/github.css';

export default function MarkdownViewer({ file }) {
  return (
    <div className={styles.viewer}>
      <h1 className={styles.fileName}>{file.name.replace(/\.md$/, '')}</h1>
      <TableOfContents content={file.content} />
      <div className={styles.markdown}>
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeHighlight]}
          components={{
            h1: ({ children, ...props }) => {
              const id = String(children).toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-');
              return <h1 id={id} {...props}>{children}</h1>;
            },
            h2: ({ children, ...props }) => {
              const id = String(children).toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-');
              return <h2 id={id} {...props}>{children}</h2>;
            },
            h3: ({ children, ...props }) => {
              const id = String(children).toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-');
              return <h3 id={id} {...props}>{children}</h3>;
            },
            h4: ({ children, ...props }) => {
              const id = String(children).toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-');
              return <h4 id={id} {...props}>{children}</h4>;
            },
            h5: ({ children, ...props }) => {
              const id = String(children).toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-');
              return <h5 id={id} {...props}>{children}</h5>;
            },
            h6: ({ children, ...props }) => {
              const id = String(children).toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-');
              return <h6 id={id} {...props}>{children}</h6>;
            },
            a: ({ children, href, ...props }) => (
              <a href={href} target="_blank" rel="noopener noreferrer" {...props}>
                {children}
              </a>
            ),
          }}
        >
          {file.content}
        </ReactMarkdown>
      </div>
    </div>
  );
}
```

Create `src/components/MainContent/MarkdownViewer.module.css`:

```css
.viewer {
  max-width: var(--content-max-width);
  margin: 0 auto;
  padding: 48px 40px 80px;
}

.fileName {
  font-size: 32px;
  font-weight: 700;
  margin-bottom: 24px;
  letter-spacing: -0.5px;
}

/* ---------- Markdown Prose Styles ---------- */
.markdown h1,
.markdown h2,
.markdown h3,
.markdown h4,
.markdown h5,
.markdown h6 {
  font-weight: 600;
  margin-top: 2em;
  margin-bottom: 0.5em;
  line-height: 1.3;
  scroll-margin-top: 24px;
}

.markdown h1 { font-size: 28px; }
.markdown h2 { font-size: 24px; border-bottom: 1px solid var(--border-color); padding-bottom: 8px; }
.markdown h3 { font-size: 20px; }
.markdown h4 { font-size: 16px; }
.markdown h5 { font-size: 14px; }
.markdown h6 { font-size: 13px; color: var(--text-secondary); }

.markdown p {
  margin-bottom: 1em;
  line-height: 1.7;
}

.markdown a {
  color: var(--accent);
  text-decoration: none;
  border-bottom: 1px solid transparent;
  transition: border-color var(--transition-fast);
}

.markdown a:hover {
  border-bottom-color: var(--accent);
}

.markdown strong {
  font-weight: 600;
}

.markdown ul,
.markdown ol {
  margin-bottom: 1em;
  padding-left: 24px;
}

.markdown li {
  margin-bottom: 4px;
  line-height: 1.7;
}

.markdown li > ul,
.markdown li > ol {
  margin-bottom: 0;
}

.markdown blockquote {
  border-left: 3px solid var(--accent);
  background: var(--blockquote-bg);
  margin: 0 0 1em 0;
  padding: 12px 16px;
  border-radius: 0 var(--radius-sm) var(--radius-sm) 0;
  color: var(--text-secondary);
}

.markdown blockquote p:last-child {
  margin-bottom: 0;
}

.markdown code {
  font-family: var(--font-mono), 'JetBrains Mono', 'Fira Code', monospace;
  font-size: 0.875em;
  background: var(--code-bg);
  padding: 2px 6px;
  border-radius: var(--radius-sm);
}

.markdown pre {
  margin-bottom: 1em;
  border-radius: var(--radius-md);
  overflow-x: auto;
}

.markdown pre code {
  display: block;
  padding: 16px 20px;
  line-height: 1.6;
  background: var(--code-bg);
  font-size: 13px;
}

.markdown hr {
  border: none;
  height: 1px;
  background: var(--border-color);
  margin: 2em 0;
}

.markdown img {
  max-width: 100%;
  border-radius: var(--radius-md);
  margin: 1em 0;
}

.markdown table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 1em;
  font-size: 14px;
}

.markdown th,
.markdown td {
  border: 1px solid var(--border-color);
  padding: 8px 12px;
  text-align: left;
}

.markdown th {
  background: var(--bg-sidebar);
  font-weight: 600;
}

.markdown input[type="checkbox"] {
  margin-right: 8px;
  accent-color: var(--accent);
}

@media (max-width: 768px) {
  .viewer {
    padding: 24px 16px 60px;
  }

  .fileName {
    font-size: 24px;
  }
}
```

- [ ] **Step 4: Create EmptyState component**

Create `src/components/MainContent/EmptyState.js`:

```jsx
'use client';

import { useRef } from 'react';
import styles from './EmptyState.module.css';

export default function EmptyState({ onFilesSelected }) {
  const inputRef = useRef(null);

  function handleChange(e) {
    if (e.target.files.length > 0) {
      onFilesSelected(Array.from(e.target.files));
      e.target.value = '';
    }
  }

  return (
    <div
      className={styles.empty}
      onClick={() => inputRef.current?.click()}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter') inputRef.current?.click();
      }}
    >
      <input
        ref={inputRef}
        type="file"
        accept=".md"
        multiple
        onChange={handleChange}
        className={styles.input}
      />
      <div className={styles.iconWrapper}>
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="8" y="4" width="32" height="40" rx="4" stroke="currentColor" strokeWidth="2"/>
          <path d="M24 18v12M18 24h12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      </div>
      <h2 className={styles.title}>Arraste seus arquivos .md aqui</h2>
      <p className={styles.subtitle}>ou clique para selecionar</p>
    </div>
  );
}
```

Create `src/components/MainContent/EmptyState.module.css`:

```css
.empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  cursor: pointer;
  padding: 40px;
  transition: background var(--transition-fast);
}

.empty:hover {
  background: var(--hover-bg);
}

.input {
  display: none;
}

.iconWrapper {
  color: var(--border-color);
  margin-bottom: 20px;
  transition: color var(--transition-normal);
}

.empty:hover .iconWrapper {
  color: var(--accent);
}

.title {
  font-size: 18px;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 6px;
}

.subtitle {
  font-size: 14px;
  color: var(--text-secondary);
}
```

- [ ] **Step 5: Create ExportBar component**

Create `src/components/MainContent/ExportBar.js`:

```jsx
'use client';

import styles from './ExportBar.module.css';

export default function ExportBar({ file, onExportHtml }) {
  function handlePrintPdf() {
    window.print();
  }

  return (
    <div className={styles.bar} data-hide-print="true">
      <button className={styles.button} onClick={handlePrintPdf} aria-label="Exportar como PDF">
        <svg width="14" height="14" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M4 12H2V8h12v4h-2M4 8V1h8v7M4 12h8v3H4v-3z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round"/>
        </svg>
        PDF
      </button>
      <button className={styles.button} onClick={() => onExportHtml(file)} aria-label="Exportar como HTML">
        <svg width="14" height="14" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M5 4L1 8l4 4M11 4l4 4-4 4M9 2l-2 12" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        HTML
      </button>
    </div>
  );
}
```

Create `src/components/MainContent/ExportBar.module.css`:

```css
.bar {
  position: fixed;
  bottom: 24px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 8px;
  padding: 8px;
  background: var(--bg-primary);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-lg);
  z-index: 50;
}

.button {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 16px;
  background: none;
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  color: var(--text-primary);
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: all var(--transition-fast);
  font-family: inherit;
}

.button:hover {
  background: var(--accent-bg);
  border-color: var(--accent);
  color: var(--accent);
}
```

- [ ] **Step 6: Create exportHtml utility**

Create `src/lib/exportHtml.js`:

```js
/**
 * Generates a standalone HTML file from the rendered markdown viewer content.
 * Captures the current MarkdownViewer DOM and inlines styles.
 */
export default function exportHtml(file) {
  const viewerEl = document.querySelector('[data-markdown-viewer]');
  if (!viewerEl) return;

  const html = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${file.name.replace(/\.md$/, '')} — MDView</title>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: 'Inter', sans-serif;
      max-width: 780px;
      margin: 0 auto;
      padding: 48px 40px;
      color: #37352F;
      line-height: 1.6;
      -webkit-font-smoothing: antialiased;
    }
    h1, h2, h3, h4, h5, h6 { font-weight: 600; margin-top: 2em; margin-bottom: 0.5em; line-height: 1.3; }
    h1 { font-size: 28px; }
    h2 { font-size: 24px; border-bottom: 1px solid #E8E5E0; padding-bottom: 8px; }
    h3 { font-size: 20px; }
    p { margin-bottom: 1em; line-height: 1.7; }
    a { color: #2EAADC; text-decoration: none; }
    a:hover { text-decoration: underline; }
    strong { font-weight: 600; }
    ul, ol { margin-bottom: 1em; padding-left: 24px; }
    li { margin-bottom: 4px; line-height: 1.7; }
    blockquote {
      border-left: 3px solid #2EAADC;
      background: #F7F6F3;
      margin: 0 0 1em 0;
      padding: 12px 16px;
      border-radius: 0 4px 4px 0;
      color: #787774;
    }
    code {
      font-family: 'JetBrains Mono', monospace;
      font-size: 0.875em;
      background: #F7F6F3;
      padding: 2px 6px;
      border-radius: 4px;
    }
    pre { margin-bottom: 1em; border-radius: 8px; overflow-x: auto; }
    pre code { display: block; padding: 16px 20px; line-height: 1.6; font-size: 13px; }
    hr { border: none; height: 1px; background: #E8E5E0; margin: 2em 0; }
    img { max-width: 100%; border-radius: 8px; margin: 1em 0; }
    table { width: 100%; border-collapse: collapse; margin-bottom: 1em; font-size: 14px; }
    th, td { border: 1px solid #E8E5E0; padding: 8px 12px; text-align: left; }
    th { background: #F7F6F3; font-weight: 600; }
  </style>
</head>
<body>
${viewerEl.innerHTML}
</body>
</html>`;

  const blob = new Blob([html], { type: 'text/html' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = file.name.replace(/\.md$/, '.html');
  a.click();
  URL.revokeObjectURL(url);
}
```

- [ ] **Step 7: Create MainContent container**

Create `src/components/MainContent/MainContent.js`:

```jsx
'use client';

import EmptyState from './EmptyState';
import MarkdownViewer from './MarkdownViewer';
import ExportBar from './ExportBar';
import exportHtml from '@/lib/exportHtml';
import styles from './MainContent.module.css';

export default function MainContent({ selectedFile, onAddFiles }) {
  if (!selectedFile) {
    return (
      <div className={styles.content}>
        <EmptyState onFilesSelected={onAddFiles} />
      </div>
    );
  }

  return (
    <div className={styles.content}>
      <div className={styles.fade} data-markdown-viewer>
        <MarkdownViewer file={selectedFile} />
      </div>
      <ExportBar file={selectedFile} onExportHtml={exportHtml} />
    </div>
  );
}
```

Create `src/components/MainContent/MainContent.module.css`:

```css
.content {
  height: 100%;
  overflow-y: auto;
  position: relative;
}

.fade {
  animation: fadeIn var(--transition-fast) ease-out;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(4px); }
  to { opacity: 1; transform: translateY(0); }
}
```

- [ ] **Step 8: Commit**

```bash
git add -A; git commit -m "feat: main content components — MarkdownViewer, EmptyState, TOC, ExportBar"
```

---