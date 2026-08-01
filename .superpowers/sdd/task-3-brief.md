### Task 3: Theme System

**Files:**
- Create: `src/hooks/useTheme.js`

**Interfaces:**
- Consumes: nothing
- Produces: `useTheme()` — hook returning `{ theme, toggleTheme }` where `theme` is `'light'` or `'dark'`

- [ ] **Step 1: Create useTheme hook**

Create `src/hooks/useTheme.js`:

```js
'use client';

import { useState, useEffect, useCallback } from 'react';

export default function useTheme() {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    const saved = localStorage.getItem('mdview-theme');
    if (saved === 'dark' || saved === 'light') {
      setTheme(saved);
      document.documentElement.setAttribute('data-theme', saved);
    }
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => {
      const next = prev === 'light' ? 'dark' : 'light';
      localStorage.setItem('mdview-theme', next);
      document.documentElement.setAttribute('data-theme', next);
      return next;
    });
  }, []);

  return { theme, toggleTheme };
}
```

- [ ] **Step 2: Verify theme toggle works**

Import in `page.js`, add a button that calls `toggleTheme`. Run `npm run dev`, click button. Expected: page background changes between `#FFFFFF` and `#191919`, preference persists on reload.

- [ ] **Step 3: Commit**

```bash
git add -A; git commit -m "feat: theme toggle hook with localStorage persistence"
```

---