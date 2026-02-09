# Quest Learner Readiness — Frontend Application

## Overview

This project implements a learner-facing readiness dashboard for Quest, Nova Pioneer’s post-school success platform.

The application presents a clear, human-readable view of readiness for life after secondary school by:

- Displaying an overall readiness state
- Breaking readiness down across skill areas
- Surfacing focused insights and next steps

The emphasis is clarity of thinking, system design, and UI/UX intent over backend complexity.

---

## Product Context

Learners using Quest need a simple, motivating way to understand:

- Where they currently stand
- What they are doing well
- What to focus on next

Primary user: a 15–18 year old learner in Kenya using a mobile-first experience.

---

## How To Run

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

---

## UI Structure

The UI is intentionally limited to 2–4 key screens to reduce cognitive load:

- Learner dashboard
- Skill breakdown list with focused drawer
- Drawer forms for create/edit/delete skill areas

Core components:

- `src/components/dashboard/readiness-dashboard.tsx`
- `src/components/dashboard/overall-summary.tsx`
- `src/components/dashboard/skill-breakdown.tsx`
- `src/components/layout/side-drawer/skill-drawer.tsx`

---

## Mock Data

The UI is powered by local JSON:

File: `src/services/mocks/readiness.json`

```json
{
  "overallScore": 65,
  "skills": [
    { "id": "academics", "label": "Academics", "score": 80 },
    { "id": "career", "label": "Career Skills", "score": 60 },
    { "id": "life", "label": "Life Skills", "score": 70 },
    { "id": "entrepreneurship", "label": "Entrepreneurship", "score": 50 }
  ]
}
```

Interpretation and insights are derived client-side:

- Scores are translated into human-readable states
- Strongest and focus areas are identified deterministically
- Learner-facing insights update as the data changes

---

## Interaction & UX

Meaningful interactions included:

- Skill drawer that slides over the dashboard for detail view
- Edit, create, and delete flows inside the drawer
- Hover and focus states to make skill areas easier to scan

Language is neutral and encouraging, aligning with Nova Pioneer’s culture principles.

---

## Technology Stack

- React
- Next.js
- TypeScript
- Tailwind CSS
- Zustand
- Lucide Icons
- Local JSON mocks

No external services or databases are required.

---

## Assumptions & Tradeoffs

- Data is mocked locally to mirror a future readiness API.
- No persistence is implemented so edits reset on refresh.
- The side drawer is the primary interaction pattern to keep learners oriented.

Extension ideas:

- Replace the mock with a real API client and caching
- Add offline caching for low-connectivity scenarios
- Add learner profile and goal-setting views

---

## Documentation

Design and system rationale are captured in `docs/`:

- `docs/system-design.md`
- `docs/api-design.md`
- `docs/ui-ux-design.md`

---

## Loom Walkthrough

Add your Loom walkthrough link here:

- Loom: `REPLACE_WITH_LOOM_LINK`
