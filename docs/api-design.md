# API Design — Quest Learner Readiness

## 1. Purpose

This document defines the API contract for the Quest Learner Readiness system.

Although the current implementation uses mocked local data, the frontend is designed to consume a real backend service without structural changes.

The API follows a **standard response envelope** to ensure consistency, predictability, and ease of integration across clients.

---

## 2. API Principles

- Read-only readiness snapshot (current)
- Stable, versioned contracts
- Standardized response structure
- Frontend-safe defaults
- Human meaning derived client-side
- JSON over HTTP
- Mobile-first payload size

---

## 3. Base Configuration

```text
Base URL: /api/v1
Content-Type: application/json
```

Authentication is out of scope for this task.

---

## 4. Standard API Response Format

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

Returns the latest readiness snapshot for a learner.

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
    "overallScore": 65,
    "skills": [
      { "id": "academics", "label": "Academics", "score": 80 },
      { "id": "career", "label": "Career Skills", "score": 60 },
      { "id": "life", "label": "Life Skills", "score": 70 },
      { "id": "entrepreneurship", "label": "Entrepreneurship", "score": 50 }
    ]
  },
  "message": null
}
```

---

## 6. Interpretation Responsibility

The API intentionally returns **raw readiness data only**.

The following responsibilities belong to the frontend:

- Translating scores into meaning (e.g. “On track”)
- Identifying strongest and weakest areas
- Generating learner-facing recommendations
- Determining visual emphasis and hierarchy

This separation allows:

- Backend scoring logic to evolve independently
- Multiple frontend experiences (learner, parent, coach)
- Consistent interpretation rules per client

---

## 7. Offline Considerations

The current frontend supports offline edits using a local sync queue. This is **not** persisted to a backend yet.

Future API extensions could include:

- `POST /readiness/{learnerId}/skills`
- `PATCH /readiness/{learnerId}/skills/{skillId}`
- `DELETE /readiness/{learnerId}/skills/{skillId}`

These are intentionally excluded from the current contract.

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

- Versioned at the URL level (`/api/v1`)
- Breaking changes require a new version
- Fields are treated as additive, not mutable

---

## 10. Extensibility Considerations

Future additions that will not break this contract:

- Historical readiness snapshots
- Program-specific readiness views
- Trend indicators
- Coach or educator annotations

---

## 11. Design Rationale

This API is intentionally minimal and standardized.

Its responsibility is to provide a stable, predictable readiness snapshot while allowing the frontend to control interpretation, messaging, and learner experience.

This design supports clarity, flexibility, and long-term maintainability.

---
