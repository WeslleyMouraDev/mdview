### Task 8: Final Polish & Vercel Deploy Config

**Files:**
- Modify: `next.config.mjs`
- Modify: `src/app/layout.js` (add favicon/meta)

**Interfaces:**
- Consumes: all prior tasks
- Produces: production-ready app deployable to Vercel

- [ ] **Step 1: Configure next.config.mjs for Vercel**

Replace `next.config.mjs`:

```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

export default nextConfig;
```

- [ ] **Step 2: Run production build to verify**

```bash
npm run build
```

Expected: Build succeeds with no errors.

- [ ] **Step 3: Commit and push**

```bash
git add -A; git commit -m "chore: final polish and Vercel deploy config"
git push origin main
```

Expected: All code pushed to `https://github.com/WeslleyMouraDev/mdview.git`, ready for Vercel deployment.