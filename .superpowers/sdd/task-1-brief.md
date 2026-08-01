### Task 1: High Contrast Design System Tokens & useContrast Hook

**Files:**
- Create: `src/hooks/useContrast.js`
- Modify: `src/app/globals.css`
- Modify: `src/components/MainContent/MarkdownViewer.module.css`

**Interfaces:**
- Consumes: nothing
- Produces:
  - `useContrast()` — hook returning `{ contrast, toggleContrast }` where `contrast` is `'normal'` or `'high'`
  - CSS custom properties for `data-contrast="high"` in `globals.css` and heading color bindings in `MarkdownViewer.module.css`

- [ ] **Step 1: Create useContrast hook**

Create `src/hooks/useContrast.js`:

```js
'use client';

import { useState, useEffect, useCallback } from 'react';

export default function useContrast() {
  const [contrast, setContrast] = useState('normal');

  useEffect(() => {
    const saved = localStorage.getItem('mdview-contrast');
    if (saved === 'high' || saved === 'normal') {
      setContrast(saved);
      document.documentElement.setAttribute('data-contrast', saved);
    }
  }, []);

  const toggleContrast = useCallback(() => {
    setContrast((prev) => {
      const next = prev === 'normal' ? 'high' : 'normal';
      localStorage.setItem('mdview-contrast', next);
      document.documentElement.setAttribute('data-contrast', next);
      return next;
    });
  }, []);

  return { contrast, toggleContrast };
}
```

- [ ] **Step 2: Update globals.css with High Contrast color tokens**

Add `[data-contrast="high"]` and combined selectors to `src/app/globals.css`:

```css
/* ---------- High Contrast Tokens ---------- */
[data-contrast="high"] {
  --h1-color: #6D28D9;
  --h2-color: #2563EB;
  --h3-color: #059669;
  --link-color: #0284C7;
  --blockquote-bg: #FEF3C7;
  --blockquote-border: #D97706;
  --code-bg: #F1F5F9;
  --border-color: #CBD5E1;
  --text-primary: #242424;
}

[data-theme="dark"][data-contrast="high"] {
  --bg-primary: #121212;
  --bg-sidebar: #1A1A1A;
  --text-primary: #F0EFEA;
  --text-secondary: #A3A3A3;
  --border-color: #333333;
  --h1-color: #C4B5FD;
  --h2-color: #93C5FD;
  --h3-color: #6EE7B7;
  --link-color: #67E8F9;
  --blockquote-bg: #1A1D24;
  --blockquote-border: #FDE68A;
  --code-bg: #1E2430;
}
```

- [ ] **Step 3: Update MarkdownViewer.module.css heading and link bindings**

Update `src/components/MainContent/MarkdownViewer.module.css` to use the contrast CSS variables for headings and links:

```css
.markdown h1 {
  font-size: 28px;
  color: var(--h1-color, inherit);
}

.markdown h2 {
  font-size: 24px;
  border-bottom: 1px solid var(--border-color);
  padding-bottom: 8px;
  color: var(--h2-color, inherit);
}

.markdown h3 {
  font-size: 20px;
  color: var(--h3-color, inherit);
}

.markdown a {
  color: var(--link-color, var(--accent));
  text-decoration: none;
  border-bottom: 1px solid transparent;
  transition: border-color var(--transition-fast);
}

.markdown blockquote {
  border-left: 3px solid var(--blockquote-border, var(--accent));
  background: var(--blockquote-bg);
  margin: 0 0 1em 0;
  padding: 12px 16px;
  border-radius: 0 var(--radius-sm) var(--radius-sm) 0;
  color: var(--text-secondary);
}
```

- [ ] **Step 4: Verify build**

```bash
npm run build
```

Expected: Build succeeds with 0 errors.

- [ ] **Step 5: Commit**

```bash
git add -A; git commit -m "feat: high contrast mode hook and design system tokens"
```

---