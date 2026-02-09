# Frontend Folder Structure — Quest Learner Readiness

## 1. Purpose

This document defines the frontend folder structure for the Quest Learner Readiness application.

The structure is designed to be:

- Scalable as features grow
- Easy to reason about
- Aligned with separation of concerns
- Testable at multiple levels

---

## 2. High-Level Structure

```text
app/                         # Next.js app router
public/                      # Static assets (icons, service worker)
src/
├── components/              # Shared UI components
│   ├── dashboard/           # Readiness dashboard UI
│   ├── layout/              # Shell, sidebar, drawer
│   ├── feedback/            # Loading states
│   └── ui/                  # UI primitives
├── domain/                  # Business & interpretation logic
├── features/                # Feature-level flows
├── hooks/                   # Shared hooks
├── services/                # API clients + mocks
├── store/                   # Zustand stores
├── tests/                   # Integration and smoke tests
├── types/                   # TypeScript contracts
└── utils/                   # Utilities and IndexedDB helpers
```

---

## 3. Key Directories

### `app/`

- `app/layout.tsx` — root layout and metadata
- `app/manifest.ts` — PWA manifest
- `app/offline/page.tsx` — offline fallback page

### `public/`

- `public/sw.js` — service worker
- `public/icon.png` — app icon
- `public/AppIcons/` — platform icon set

### `src/components/`

- `dashboard/` — overall summary, insight, skills
- `layout/` — app shell, sidebar, drawer
- `feedback/` — skeletons
- `ui/` — button, input, card, progress, toast

### `src/domain/`

- `interpret-readiness.ts` — score meaning
- `derive-insights.ts` — strongest/focus area logic

### `src/features/readiness/`

- Drawer content
- Create/edit/delete forms

### `src/services/`

- `mocks/readiness.json` — local mock data
- `api/` — API client placeholders

### `src/store/`

- `readiness.store.ts` — readiness state, offline queue, sync
- `toast.store.ts` — UI toasts

---

## 4. Testing

Tests live under `src/tests/` for integration-style coverage. Unit tests can be added per feature or domain module as needed.

---
