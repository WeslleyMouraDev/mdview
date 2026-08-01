# Task 3 Report: Floating Controls Component (Back to Top & TOC Popover)

## Execution Summary

- **Status:** DONE
- **Files Created:**
  - `src/components/FloatingControls/FloatingControls.js`
  - `src/components/FloatingControls/FloatingControls.module.css`
- **Build Status:** Next.js build completed cleanly without errors (`npm run build`).
- **Commits Created:**
  - `8a85673` feat: FloatingControls component with Back-to-Top and TOC Popover

## Verification Details

1. **FloatingControls Component:**
   - Client Component (`'use client'`).
   - Uses `extractHeadings(content)` to dynamic headings extraction.
   - Listens to `window` scroll event (passive listener) to toggle Back to Top button when `scrollY > 300`.
   - Popover toggle for document Table of Contents with indentation based on heading levels (`h.level - minLevel`).
   - Smooth scroll on click to document heading IDs or top.
   - Includes `data-hide-print="true"` attribute to ensure floating controls hide during print/PDF export.

2. **CSS Module:**
   - Positioned fixed at bottom-right (`bottom: 24px`, `right: 24px` on desktop, responsive adjust `20px`/`16px` on mobile).
   - Utilizes design system CSS variables (`--bg-primary`, `--border-color`, `--shadow-md`, `--shadow-lg`, `--accent`, etc.).

3. **Build & Quality Check:**
   - Next.js Turbopack build succeeded with 0 errors/warnings.

## Concerns

- None.
