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
