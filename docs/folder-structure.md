# Frontend Folder Structure — Quest Learner Readiness

## 1. Purpose

This document defines the **frontend folder structure** for the Quest Learner Readiness application.

The structure is designed to be:

- Scalable as features grow
- Easy to reason about
- Aligned with Clean Architecture principles
- Fully testable at multiple levels
- Suitable for modern React / Next.js applications

Testing is treated as a **first-class concern**, not an add-on.

---

## 2. Architectural Principles

The folder structure follows these principles:

1. **Feature-first organization**  
   Code is grouped by product feature, not by file type alone.

2. **Separation of concerns**
   - UI rendering
   - State management
   - Domain logic
   - Data access

3. **Unidirectional dependency flow**
   - UI depends on domain and state
   - Domain depends on nothing
   - Data access is isolated

4. **Testability by default**
   - Pure logic is isolated
   - Side effects are contained
   - UI behavior is observable and verifiable

---

## 3. High-Level Structure

```text
src/
├── app/                 # Next.js app router (or pages/)
├── features/            # Feature modules (primary unit of scale)
├── components/          # Shared UI components
├── domain/              # Business & interpretation logic
├── services/            # API clients and data access
├── store/               # Global state configuration
├── hooks/               # Shared custom hooks
├── utils/               # Pure utility functions
├── styles/              # Global styles and Tailwind config
├── types/               # Shared TypeScript contracts
└── tests/               # Cross-cutting and integration tests
````

---

## 4. `features/` — Core Scaling Unit (Tested Per Feature)

Each feature owns its **UI, state, hooks, and tests**.

```text
features/
└── readiness/
    ├── components/
    │   ├── readiness-overview.tsx
    │   ├── skill-breakdown.tsx
    │   └── __tests__/
    │       ├── readiness-overview.test.tsx
    │       └── skill-breakdown.test.tsx
    ├── state/
    │   ├── readiness.store.ts
    │   └── __tests__/
    │       └── readiness.store.test.ts
    ├── hooks/
    │   ├── use-readiness.ts
    │   └── __tests__/
    │       └── use-readiness.test.ts
    ├── utils/
    │   └── readiness.helpers.ts
    ├── types.ts
    └── index.ts
```

### Testing intent

- UI components → interaction & rendering tests
- Feature state → deterministic state tests
- Feature hooks → behavior-driven hook tests

---

## 5. `components/` — Shared UI Primitives (Tested in Isolation)

Reusable, feature-agnostic components.

```text
components/
├── layout/
│   ├── side-drawer/
│   │   ├── side-drawer.tsx
│   │   └── __tests__/
│   │       └── side-drawer.test.tsx
│   ├── page-shell/
│   └── header/
├── feedback/
│   ├── loading/
│   └── empty-state/
├── ui/
│   ├── button/
│   ├── progress/
│   └── card/
└── index.ts
```

Rules:

- No business logic
- No API calls
- Components are tested for:

  - Rendering
  - Accessibility
  - Interaction behavior

---

## 6. `domain/` — Business & Interpretation Logic (Heavily Tested)

Pure, framework-agnostic logic.

```text
domain/
├── readiness/
│   ├── interpret-readiness.ts
│   ├── derive-insights.ts
│   ├── constants.ts
│   └── __tests__/
│       ├── interpret-readiness.test.ts
│       └── derive-insights.test.ts
└── index.ts
```

Characteristics:

- No React
- No browser APIs
- Deterministic input → output

This layer should have the **highest test coverage**.

---

## 7. `services/` — Data Access Layer (Mocked & Verified)

Responsible only for fetching data.

```text
services/
├── api/
│   ├── readiness.client.ts
│   ├── http.ts
│   └── __tests__/
│       └── readiness.client.test.ts
├── mocks/
│   └── readiness.mock.ts
└── index.ts
```

Testing focus:

- Correct request construction
- Response mapping
- Error handling
- Mock vs real API parity

---

## 8. `store/` — Global State (Minimal, Tested)

```text
store/
├── readiness.store.ts
├── __tests__/
│   └── readiness.store.test.ts
└── index.ts
```

Rules:

- Only truly global or cross-feature state
- All mutations must be testable
- No direct UI coupling

---

## 9. `hooks/` — Shared Hooks (Behavior Tested)

```text
hooks/
├── use-media-query.ts
├── use-drawer-state.ts
├── __tests__/
│   ├── use-media-query.test.ts
│   └── use-drawer-state.test.ts
└── index.ts
```

Hooks are tested for:

- State transitions
- Side-effect correctness
- Edge cases

---

## 10. `utils/` — Pure Utilities (Unit Tested)

```text
utils/
├── formatters.ts
├── math.ts
├── guards.ts
├── __tests__/
│   ├── formatters.test.ts
│   └── guards.test.ts
```

Rules:

- No side effects
- 100% deterministic
- Easy unit tests

---

## 11. `types/` — Shared Contracts (Compile-Time Safety)

```text
types/
├── api.ts
├── readiness.ts
├── common.ts
└── index.ts
```

Types are validated indirectly through:

- TypeScript compilation
- Usage in tests

---

## 12. `tests/` — Integration & Flow Tests

Cross-feature and user-journey tests live here.

```text
tests/
├── readiness-flow.test.ts
├── drawer-interaction.test.ts
└── app-smoke.test.ts
```

Purpose:

- Validate feature composition
- Ensure interaction flows match UX spec
- Catch regressions across layers

---

## 13. Dependency Direction (Enforced)

Allowed dependencies:

```text
features → domain
features → components
features → services
components → utils
services → types
tests → everything (read-only)
```

Disallowed:

- domain → UI
- domain → services
- components → services

This keeps logic testable and decoupled.

---

## 14. Testing Strategy Summary

| Layer      | Test Type              |
| ---------- | ---------------------- |
| Domain     | Pure unit tests        |
| Utils      | Pure unit tests        |
| Services   | Mocked API tests       |
| Hooks      | Hook behavior tests    |
| Components | UI & interaction tests |
| Features   | Feature-level tests    |
| App        | Integration tests      |

No layer is untested.

---

## 15. Intentional Exclusions

- No snapshot-heavy testing
- No brittle DOM structure assertions
- No testing implementation details
- No coupling tests to styling

Tests verify **behavior and meaning**, not markup trivia.
