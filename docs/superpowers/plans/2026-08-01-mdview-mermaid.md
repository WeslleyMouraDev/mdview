# MDView Mermaid Diagram Support Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Install `mermaid` and add native rendering of Mermaid diagrams (flowcharts, sequence diagrams, state diagrams, gantt, etc.) inside Markdown code blocks.

**Architecture:** Client-side Next.js 14+ App Router component (`Mermaid.js`). Intercepts `language-mermaid` code blocks in `MarkdownViewer.js`, initializes `mermaid` with theme matching `data-theme` (`dark` vs `neutral`), renders SVG dynamically, handles theme change re-rendering, and falls back gracefully on syntax errors.

**Tech Stack:** Next.js 14+ (App Router), React, `mermaid` NPM package, CSS Modules

## Global Constraints

- Next.js 14+ App Router ('use client')
- JavaScript (not TypeScript)
- CSS Modules exclusively
- Dynamic client-side rendering of Mermaid SVG
- Commit after each task

---

## File Structure

```
d:/Projetos/MDView/
├── src/
│   ├── components/
│   │   ├── MainContent/
│   │   │   ├── Mermaid.js             # Mermaid diagram renderer component [NEW]
│   │   │   ├── Mermaid.module.css      # Styling, centering, overflow scroll [NEW]
│   │   │   └── MarkdownViewer.js      # Updated code component renderer for language-mermaid
│   └── package.json                   # Add mermaid dependency
```

---

### Task 1: Install Mermaid Package & Create Mermaid Component

**Files:**
- Modify: `package.json`
- Create: `src/components/MainContent/Mermaid.js`
- Create: `src/components/MainContent/Mermaid.module.css`

**Interfaces:**
- Consumes: `chart` prop (string containing Mermaid diagram definition)
- Produces: `<Mermaid chart={string} />` component that renders SVG diagram

- [ ] **Step 1: Install mermaid package**

```bash
npm install mermaid
```

Expected: `mermaid` package added to `package.json`.

- [ ] **Step 2: Create Mermaid.js component**

Create `src/components/MainContent/Mermaid.js`:

```jsx
'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './Mermaid.module.css';

let mermaidPromise = null;

function getMermaid() {
  if (!mermaidPromise) {
    mermaidPromise = import('mermaid').then((m) => m.default);
  }
  return mermaidPromise;
}

export default function Mermaid({ chart }) {
  const containerRef = useRef(null);
  const [svg, setSvg] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    const uniqueId = `mermaid-${Math.random().toString(36).substring(2, 9)}`;

    async function renderDiagram() {
      try {
        const mermaid = await getMermaid();
        const themeAttr = document.documentElement.getAttribute('data-theme');
        const isDark = themeAttr === 'dark';

        mermaid.initialize({
          startOnLoad: false,
          theme: isDark ? 'dark' : 'neutral',
          securityLevel: 'loose',
          fontFamily: 'Inter, sans-serif',
        });

        const { svg: renderedSvg } = await mermaid.render(uniqueId, chart);
        if (isMounted) {
          setSvg(renderedSvg);
          setError(null);
        }
      } catch (err) {
        if (isMounted) {
          setError(err?.message || 'Erro ao renderizar diagrama Mermaid');
        }
      }
    }

    renderDiagram();

    // Listen for theme attribute changes
    const observer = new MutationObserver(() => {
      renderDiagram();
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme', 'data-contrast'],
    });

    return () => {
      isMounted = false;
      observer.disconnect();
    };
  }, [chart]);

  if (error) {
    return (
      <div className={styles.errorContainer}>
        <span className={styles.errorTitle}>Diagrama Mermaid (Erro de sintaxe)</span>
        <pre className={styles.errorText}>{chart}</pre>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={styles.diagram}
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}
```

- [ ] **Step 3: Create Mermaid.module.css**

Create `src/components/MainContent/Mermaid.module.css`:

```css
.diagram {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 2em 0;
  padding: 16px;
  background: var(--bg-sidebar);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  overflow-x: auto;
  transition: background var(--transition-normal), border-color var(--transition-normal);
}

.diagram svg {
  max-width: 100%;
  height: auto;
}

.errorContainer {
  margin: 1.5em 0;
  padding: 16px;
  border: 1px solid #E03E3E;
  border-radius: var(--radius-md);
  background: rgba(224, 62, 62, 0.06);
}

.errorTitle {
  font-size: 12px;
  font-weight: 600;
  color: #E03E3E;
  margin-bottom: 8px;
  display: block;
}

.errorText {
  font-family: var(--font-mono), monospace;
  font-size: 12px;
  color: var(--text-primary);
  white-space: pre-wrap;
}
```

- [ ] **Step 4: Verify build**

```bash
npm run build
```

- [ ] **Step 5: Commit**

```bash
git add -A; git commit -m "feat: install mermaid and create Mermaid component"
```

---

### Task 2: Integrate Mermaid in MarkdownViewer & Deploy

**Files:**
- Modify: `src/components/MainContent/MarkdownViewer.js`

**Interfaces:**
- Consumes: `<Mermaid chart={string} />`
- Produces: `MarkdownViewer` component that renders `Mermaid` for `language-mermaid` code blocks

- [ ] **Step 1: Update MarkdownViewer.js to intercept language-mermaid code blocks**

Update `src/components/MainContent/MarkdownViewer.js`:

```jsx
'use client';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import TableOfContents from './TableOfContents';
import Mermaid from './Mermaid';
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
            code: ({ node, inline, className, children, ...props }) => {
              const match = /language-(\w+)/.exec(className || '');
              if (!inline && match && match[1] === 'mermaid') {
                return <Mermaid chart={String(children).replace(/\n$/, '')} />;
              }
              return (
                <code className={className} {...props}>
                  {children}
                </code>
              );
            },
          }}
        >
          {file.content}
        </ReactMarkdown>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Run build to verify production compilation**

```bash
npm run build
```

Expected: Production build succeeds with 0 errors.

- [ ] **Step 3: Commit and push**

```bash
git add -A; git commit -m "feat: integrate Mermaid diagram rendering into MarkdownViewer"
git push origin main
```

Expected: All changes pushed to `https://github.com/WeslleyMouraDev/mdview.git`.
