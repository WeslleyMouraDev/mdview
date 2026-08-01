# Task 2 Report: Database & File Management Hook

## Task Details
- **Task:** Task 2 — Database & File Management Hook
- **Status:** DONE
- **Created Files:**
  - `src/lib/db.js` — Dexie IndexedDB database instance (`MDViewDB`) with `files` table (`++id, name, uploadedAt`).
  - `src/hooks/useFiles.js` — React custom hook managing state, CRUD operations (`addFiles`, `replaceDuplicate`, `removeFile`, `clearAll`), sorting (`name` | `uploadedAt`), selection (`selectedFile`, `selectFile`), database availability fallback, and size calculation (`getTotalSize`).
- **Modified Files:**
  - `src/app/page.js` — Verified hook instantiation and state access.

## Verification
- Built application with `npm run build`: Compiled successfully without errors or warnings.
- Hook API verified: Exposes `files`, `selectedFile`, `selectedFileId`, `selectFile`, `addFiles`, `replaceDuplicate`, `removeFile`, `clearAll`, `sortBy`, `setSortBy`, `dbAvailable`, `getTotalSize`.

## Commits
- Commit message: `feat: Dexie database and useFiles hook for file management`

## Concerns / Notes
- None. Dexie fallback handles environments without IndexedDB gracefully by maintaining state in memory.
