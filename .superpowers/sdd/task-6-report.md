# Task 6 Implementation Report: Main Content Components

## Task Summary
Implemented Task 6: Main Content Components for MDView, including extractHeadings utility, TableOfContents component, MarkdownViewer with GFM and code syntax highlighting, EmptyState drop zone, ExportBar for PDF and HTML, standalone HTML export function, and MainContent container component.

## Created Files
1. `src/lib/extractHeadings.js` — Regex extraction of H1-H6 headings with slugified anchor IDs and markdown stripping.
2. `src/components/MainContent/TableOfContents.js` & `TableOfContents.module.css` — Table of contents rendering headings with dynamic level-based indentation.
3. `src/components/MainContent/MarkdownViewer.js` & `MarkdownViewer.module.css` — Markdown renderer leveraging `react-markdown`, `remark-gfm`, and `rehype-highlight` styled with Notion-like prose styles and `highlight.js/styles/github.css`.
4. `src/components/MainContent/EmptyState.js` & `EmptyState.module.css` — CTA component for file upload when no file is selected.
5. `src/components/MainContent/ExportBar.js` & `ExportBar.module.css` — Floating bottom toolbar with buttons for PDF export (`window.print()`) and HTML export.
6. `src/lib/exportHtml.js` — Standalone HTML generator embedding current rendered markdown content with standalone CSS styles and Google Fonts links.
7. `src/components/MainContent/MainContent.js` & `MainContent.module.css` — Container component routing between EmptyState and MarkdownViewer + ExportBar.

## Verification
- Built production application cleanly using `npm run build` with zero errors.
- Verified all components follow Next.js App Router ('use client') standards and CSS Modules.

## Commit
- Commit hash: `16301fa`
- Commit message: `feat: main content components — MarkdownViewer, EmptyState, TOC, ExportBar`
