# Quest Learner Readiness — Frontend Application

## Overview

This project implements a learner-facing readiness dashboard for **Quest**, Nova Pioneer’s Post School Success Platform.

The application presents a clear, human-understandable view of a learner’s readiness for life after secondary school by:

- Displaying an overall readiness state
- Breaking readiness down across key skill areas
- Surfacing focused, encouraging insights and next steps

The emphasis of this submission is **clarity of thinking, system design, and UI/UX intent**, rather than backend implementation or visual polish.

---

## Product Context

Learners using Quest need a simple, motivating way to understand:

- Where they currently stand
- What they are doing well
- What to focus on next

The primary user is a **15–18 year old learner in Kenya**, accessing the platform in a **mobile-first context**.

---

## Project Scope

### Included

- Learner readiness dashboard
- Skill-area breakdown
- Client-side interpretation and insight generation
- Mobile-first UI
- Mocked data using a stable, API-ready contract

### Excluded

- Authentication and user management
- Backend services
- Data persistence
- AI or adaptive recommendation logic

---

## System Documentation

This repository is **documented before implementation** to demonstrate system thinking and design clarity.

All core design decisions are captured in the [`/docs`](docs/) directory:

- **[System Design](docs/system-design.md)**  
  High-level architecture, data flow, responsibilities, and design rationale

- **[API Design](docs/api-design.md)**  
  API contract, standard response envelope, versioning, and extensibility strategy

- **[UI/UX Design](docs/ui-ux-design.md)**  
  Screen structure, layout hierarchy, interactions, and accessibility considerations

---

## Data and Interpretation

### Mock Data

The application uses locally mocked JSON data that mirrors a future backend API response.

The data includes:

- An overall readiness score
- A breakdown across multiple skill areas
- Metadata required for deterministic interpretation

### Interpretation Logic

All meaning is derived on the client:

- Scores are translated into human-readable states (e.g. “On track”)
- Strongest and focus areas are identified deterministically
- Learner-facing insights are generated dynamically

Raw scores are never rendered without contextual meaning.

---

## UI Structure

The UI is intentionally limited to **two core views** to minimize cognitive load:

1. **Learner Dashboard**
   - Overall readiness state
   - Short explanatory text
   - Single recommendation or encouragement

2. **Skill Breakdown**
   - Comparison across skill areas
   - Lightweight interaction to focus on a selected skill

The design prioritizes:

- Meaning before numbers
- Clear visual hierarchy
- Encouraging, neutral language

---

## Technology Stack

- **[React](https://react.dev/)** — component-based UI development
- **[Next.js](https://nextjs.org/)** — application framework and routing
- **[TypeScript](https://www.typescriptlang.org/)** — static typing and safer code
- **[Tailwind CSS](https://tailwindcss.com/)** — utility-first styling
- **[Axios](https://axios-http.com/)** — HTTP client for API communication
- **[TanStack Query](https://tanstack.com/query/latest)** — server-state management and caching
- **[Zustand](https://zustand-demo.pmnd.rs/)** — lightweight client-side state management
- Local JSON files for mocked data

No external services or databases are required.

---

## Running the Project Locally

```bash
npm install
npm run dev
