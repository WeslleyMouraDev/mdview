### Task 4: Page Integration & Mobile UX Refinements

**Files:**
- Modify: `src/app/page.js`
- Modify: `src/app/page.module.css`

**Interfaces:**
- Consumes: `useContrast()`, `FloatingControls`, `useFiles()`, `useTheme()`, `Sidebar`, `MainContent`
- Produces: Assembled page with high contrast support, mobile header, auto-close sidebar on file select, floating controls

- [ ] **Step 1: Update page.js with contrast hook, mobile header, floating controls**

Update `src/app/page.js` to:
1. Import `useContrast` and `FloatingControls`.
2. Pass `contrast` and `toggleContrast` to `Sidebar`.
3. Add a top bar in mobile layout containing hamburger, selected file name, contrast toggle, and TOC trigger.
4. Auto-close sidebar when selecting a file in `onSelectFile`.
5. Render `<FloatingControls content={selectedFile?.content} />`.

- [ ] **Step 2: Update page.module.css with mobile header and touch target styles**

Update `src/app/page.module.css` for enhanced mobile header layout, 44px touch targets on mobile controls, and responsive drawer transitions.

- [ ] **Step 3: Run build and verify full app**

```bash
npm run build
```

Expected: Production build succeeds with 0 errors.

- [ ] **Step 4: Commit and Push**

```bash
git add -A; git commit -m "feat: complete mobile UX refinements, contrast integration, and floating controls"
git push origin main
```

Expected: All changes committed and pushed to `https://github.com/WeslleyMouraDev/mdview.git`.