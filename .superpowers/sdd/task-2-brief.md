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