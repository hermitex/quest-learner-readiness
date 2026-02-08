# UI/UX Design — Quest Learner Readiness

## 1. Purpose

This document defines the user interface and user experience design for the **Quest Learner Readiness experience**.

It specifies layout structure, visual hierarchy, interaction patterns, behavioral rules, and state transitions — **not visual polish, branding, or aesthetic assets**.

The primary goal is to ensure learners clearly and calmly understand:
- Where they stand
- What they are doing well
- What to focus on next

The experience is designed to feel **familiar, reassuring, and effortless**, requiring no instructions or learning curve.

---

## 2. Target User Context

- **Age:** 15–18
- **Primary device:** Mobile phone (tablet secondary)
- **Usage environment:** Short sessions, intermittent connectivity, distraction-prone
- **Emotional context:** Uncertainty about the future, need for reassurance and direction

All design decisions prioritize:
- Emotional safety
- Cognitive ease
- Familiar interaction patterns

Over density, novelty, or expressive UI experimentation.

---

## 3. Core UX Principles

1. **Meaning before numbers**  
   Learners should understand readiness without interpreting raw scores.

2. **Progress, not judgment**  
   Language and visuals avoid evaluative or negative framing.

3. **Low cognitive load**  
   Information is revealed progressively and predictably.

4. **Consistency and familiarity**  
   The same layout logic, visual scales, and language patterns are reused throughout.

5. **Don’t make the learner think**  
   Interaction should feel natural and expected, not instructional.

---

## 4. Primary Interaction Pattern — Side Drawer Workflow

The readiness experience uses a **side drawer / slide-over pattern**, not full page navigation.

### Rationale
- Preserves spatial context
- Avoids mental “page reset”
- Reduces navigation anxiety
- Keeps the learner oriented at all times

### Rules
- The background context remains visible but inactive
- The drawer owns focus while open
- Closing the drawer restores the exact previous state
- No hard route changes are required for core interactions

This pattern is foundational and **non-negotiable**.

---

## 5. Interaction States (Not Pages)

The experience consists of a **single persistent surface** with multiple interaction states.

### Defined States
- **Overview State** — default readiness view
- **Breakdown State** — expanded skill comparison view

State transitions are lightweight, reversible, and non-destructive.

### State Transition Model

```mermaid
stateDiagram-v2
  [*] --> Overview
  Overview --> Breakdown : open skill breakdown
  Breakdown --> Overview : close drawer
  Breakdown --> Breakdown : focus skill
````

---

## 6. Overview State — Learner Dashboard

### 6.1 Purpose

Provide immediate clarity about overall readiness and a single next step.

---

### 6.2 Layout Structure (Top → Bottom)

1. **Readiness Meaning**

   * Human-readable status (e.g. “On track”)
   * One short explanatory sentence

2. **Overall Readiness Indicator**

   * Visual indicator (progress ring or bar)
   * Numeric score shown only as secondary information

3. **Recommendation Message**

   * One short, actionable insight
   * Encouraging, non-prescriptive tone

4. **Skill Breakdown Entry**

   * Compact preview of skill areas
   * Entry point into the Breakdown State

---

### 6.3 Behavioral Rules

* Readiness meaning is visible without scrolling
* Numeric values never appear without contextual language
* Only one recommendation is shown at a time
* No instructional hints or walkthroughs are required

---

## 7. Breakdown State — Skill Breakdown View

### 7.1 Purpose

Allow learners to compare strengths and growth areas without overwhelming detail.

---

### 7.2 Layout Structure

* Vertical list of skill items
* Each item includes:

  * Skill label
  * Visual score indicator
  * Subtle relative emphasis

---

### 7.3 Visual Hierarchy

1. Skill name
2. Visual indicator
3. Numeric score (optional, secondary)

Strongest and weakest skills are **distinguishable but never exaggerated**.

---

## 8. Interaction Design

### 8.1 Skill Focus Interaction

**Interaction:**
Tap on a skill item.

**Result:**

* Selected skill is highlighted
* Insight message updates to reflect the selected skill
* No modal, page change, or navigation interruption

**Rationale:**
Supports exploration without breaking flow or context.

---

### 8.2 Focus and Attention Management

* When the drawer opens, focus transfers to the drawer container
* Background content is visually de-emphasized but remains visible
* Keyboard focus is trapped within the drawer while open
* Closing the drawer restores focus to the invoking element

---

## 9. Copy and Language Guidelines

* Short, simple sentences
* Plain, everyday language
* Encouraging and neutral tone

Examples:

* “You’re building steadily across these areas.”
* “Focusing next on Career Skills can strengthen your readiness.”

Avoid:

* “Low performance”
* “Weakness”
* “Deficient”
* Any comparison to other learners

---

## 10. Accessibility Considerations

* Text labels always accompany visual indicators
* Color is never the sole indicator of meaning
* Sufficient contrast for readability
* Large, comfortable touch targets
* No reliance on hover-only interactions

---

## 11. Responsive Behavior

* Mobile-first layout
* Single-column flow
* Identical interaction patterns across breakpoints
* Tablet and desktop scale spacing only, not structure

---

## 12. Loading, Empty, and Edge States

### 12.1 Loading State

* Calm, non-distracting loading indicator
* No partial or misleading readiness content during load

---

### 12.2 Missing Data

* Display neutral message:

  > “Your readiness data is not available yet.”

---

### 12.3 Balanced Profile

* If no clear strongest or weakest area exists:

  * Display a balanced progress message
  * Avoid highlighting a specific focus area

---

## 13. Explicit UX Non-Goals

The following are intentionally excluded:

* Gamification (badges, streaks, leaderboards)
* Comparative ranking against other learners
* Dense charts or analytical dashboards
* Multi-step wizards or forced tutorials
* Instructional overlays that interrupt flow

These exclusions preserve calmness, familiarity, and cognitive ease.

---

## 14. Design Rationale

The UI is designed to **reduce anxiety and encourage reflection**.

Every element exists to support learner understanding rather than system transparency or technical completeness.

This design ensures:

* Clear communication
* Minimal friction
* A strong feeling of being “at home”
* Easy future extension without redesign