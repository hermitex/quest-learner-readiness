# UI/UX Design — Quest Learner Readiness

## 1. Purpose

This document defines the user interface and user experience design for the Quest Learner Readiness experience.

It specifies layout structure, visual hierarchy, interaction patterns, behavioral rules, and state transitions.

The primary goal is to ensure learners clearly and calmly understand:

- Where they stand
- What they are doing well
- What to focus on next

The experience is designed to feel familiar, reassuring, and effortless.

---

## 2. Target User Context

- Age: 15–18
- Primary device: Mobile phone (tablet secondary)
- Usage environment: Short sessions, intermittent connectivity
- Emotional context: Uncertainty about the future, need for reassurance and direction

All design decisions prioritize emotional safety, cognitive ease, and familiar interaction patterns.

---

## 3. Core UX Principles

1. Meaning before numbers
2. Progress, not judgment
3. Low cognitive load
4. Consistency and familiarity
5. Don’t make the learner think

---

## 4. Primary Interaction Pattern — Side Drawer Workflow

The readiness experience uses a side drawer / slide-over pattern, not full page navigation.

Rationale:

- Preserves spatial context
- Avoids mental page reset
- Reduces navigation anxiety
- Keeps the learner oriented

Rules:

- Background remains visible but inactive
- Drawer owns focus while open
- Closing the drawer restores the previous state

---

## 5. Interaction States (Not Pages)

The experience consists of a single persistent surface with multiple interaction states.

Defined states:

- Overview state
- Breakdown state
- Drawer state (view, create, edit, delete)

---

## 6. Overview State — Learner Dashboard

Purpose: Provide immediate clarity about readiness and a single next step.

Layout structure (top to bottom):

1. Readiness meaning
2. Overall readiness indicator
3. Insight / recommendation message
4. Skill breakdown entry

Behavioral rules:

- Readiness meaning is visible without scrolling
- Numeric values never appear without context
- Only one recommendation is shown at a time

---

## 7. Breakdown State — Skill Breakdown View

Purpose: Allow learners to compare strengths and growth areas without overwhelm.

Layout structure:

- Search + filter row
- Vertical list of skill items
- Each item shows label, score, and progress indicator

Visual hierarchy:

1. Skill name
2. Progress bar
3. Numeric score

---

## 8. Drawer State — Skill Management

Purpose: Keep learners in context while viewing or editing a skill.

Features:

- Clear heading + short context copy
- Single, unified score control (slider + value pill)
- Inline validation with clear errors

---

## 9. Offline UX

The interface should be resilient during connectivity drops:

- Offline banner when disconnected
- Syncing badge when changes are flushing
- Offline edits are allowed and queued

---

## 10. Copy and Language Guidelines

- Short, simple sentences
- Plain, everyday language
- Encouraging and neutral tone

Example:

- “You’re building steadily across these areas.”

---
