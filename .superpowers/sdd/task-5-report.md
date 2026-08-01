# Task 5 Report: Sidebar Components

## Status
DONE

## Summary
Successfully implemented the complete sidebar component suite:
1. `FileUploader.js` & `FileUploader.module.css`: Hidden file input with styled trigger button for selecting `.md` files.
2. `FileItem.js` & `FileItem.module.css`: Individual file item rendering with human-readable file size formatting (`formatSize`), active selection indicator, remove button on hover, and full keyboard accessibility (`Enter` to select, `Delete` to remove).
3. `FileList.js` & `FileList.module.css`: List container displaying total file count, empty state, sort selector (`name` / `uploadedAt`), and listbox role for accessibility.
4. `SidebarFooter.js` & `SidebarFooter.module.css`: Bottom section containing conditional "Limpar tudo" button and theme switcher button with dark/light mode icons.
5. `Sidebar.js` & `Sidebar.module.css`: Top-level composition assembling Logo header, FileUploader, FileList, and SidebarFooter.

## Verification
- Verified Next.js build compilation (`npm run build`).

## Commit
- `feat: sidebar components — FileUploader, FileItem, FileList, SidebarFooter, Sidebar`
