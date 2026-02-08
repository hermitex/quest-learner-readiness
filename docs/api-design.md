# API Design — Quest Learner Readiness

## 1. Purpose

This document defines the API contract for the Quest Learner Readiness system.

Although the current implementation uses mocked local data, the frontend is designed to consume a real backend service without structural changes.

The API follows a **standard response envelope** to ensure consistency, predictability, and ease of integration across clients.

---

## 2. API Principles

- Read-only endpoints
- Stable, versioned contracts
- Standardized response structure
- Frontend-safe defaults
- Human-meaning derived client-side
- JSON over HTTP
- Mobile-first payload size

---

## 3. Base Configuration

```text
Base URL: /api/v1
Content-Type: application/json
````

Authentication is out of scope for this task.

---

## 4. Standard API Response Format

All API responses follow the same envelope structure.

### 4.1 Success Response Shape

```json
{
  "success": true,
  "data": {},
  "message": null
}
```

### 4.2 Error Response Shape

```json
{
  "success": false,
  "data": null,
  "message": "Error description",
  "error": {
    "code": "ERROR_CODE"
  }
}
```

---

## 5. Core Endpoint

### 5.1 Get Learner Readiness Snapshot

```http
GET /api/v1/readiness/{learnerId}
```

#### Description

Returns the latest readiness snapshot for a learner.
The snapshot represents a point-in-time assessment used to power the learner dashboard.

---

### 5.2 Path Parameters

| Name      | Type   | Required | Description               |
| --------- | ------ | -------- | ------------------------- |
| learnerId | string | yes      | Unique learner identifier |

---

### 5.3 Successful Response (200)

```json
{
  "success": true,
  "data": {
    "learnerId": "learner-001",
    "generatedAt": "2026-01-15T10:00:00Z",
    "overallScore": 65,
    "categories": [
      {
        "id": "academics",
        "label": "Academics",
        "score": 80,
        "description": "Academic readiness for further study"
      },
      {
        "id": "career_skills",
        "label": "Career Skills",
        "score": 60,
        "description": "Preparation for the workplace"
      },
      {
        "id": "life_skills",
        "label": "Life Skills",
        "score": 70,
        "description": "Independence and self-management"
      },
      {
        "id": "entrepreneurship",
        "label": "Entrepreneurship",
        "score": 50,
        "description": "Innovation and initiative"
      }
    ]
  },
  "message": null
}
```

---

## 6. Data Contract Definitions

### 6.1 ReadinessSnapshot

| Field        | Type            | Description                   |
| ------------ | --------------- | ----------------------------- |
| learnerId    | string          | Learner identifier            |
| generatedAt  | ISO 8601 string | Snapshot generation time      |
| overallScore | number (0–100)  | Aggregate readiness score     |
| categories   | array           | Per-skill readiness breakdown |

---

### 6.2 ReadinessCategory

| Field       | Type           | Description                |
| ----------- | -------------- | -------------------------- |
| id          | string         | Stable category identifier |
| label       | string         | Human-readable name        |
| score       | number (0–100) | Category score             |
| description | string         | Context for the category   |

---

## 7. Interpretation Responsibility

The API intentionally returns **raw readiness data only**.

The following responsibilities belong to the frontend:

* Translating scores into meaning (e.g. “On track”)
* Identifying strongest and weakest areas
* Generating learner-facing recommendations
* Determining visual emphasis and hierarchy

This separation allows:

* Backend scoring logic to evolve independently
* Multiple frontend experiences (learner, parent, coach)
* Consistent interpretation rules per client

---

## 8. Error Handling

### 8.1 Readiness Not Found (404)

```json
{
  "success": false,
  "data": null,
  "message": "No readiness data found for learner",
  "error": {
    "code": "READINESS_NOT_FOUND"
  }
}
```

---

## 9. Versioning Strategy

* Versioned at the URL level (`/api/v1`)
* Breaking changes require a new version
* Fields are treated as additive, not mutable

---

## 10. Extensibility Considerations

Future additions that will not break this contract:

* Historical readiness snapshots
* Program-specific readiness views
* Trend indicators
* Coach or educator annotations

---

## 11. Design Rationale

This API is intentionally minimal and standardized.

Its responsibility is to provide a stable, predictable readiness snapshot while allowing the frontend to control interpretation, messaging, and learner experience.

This design supports clarity, flexibility, and long-term maintainability.

