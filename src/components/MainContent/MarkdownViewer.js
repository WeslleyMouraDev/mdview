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
