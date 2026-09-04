# API Contract (v0.1 — freeze before final integration day)

Base URL (local): `http://localhost:8000`

Do not change field names/types here without flagging it in standup — every
layer (Flutter, Dashboard, ML) is building against this doc.

## Auth

### POST /auth/signup
Request:
```json
{ "consent_status": true }
```
Response:
```json
{ "access_token": "jwt...", "token_type": "bearer" }
```

### GET /auth/me
Response:
```json
{ "id": "uuid", "created_at": "iso8601", "consent_status": true }
```

## Journal

### POST /journal/text?user_id={uuid}
Request:
```json
{ "raw_content": "string" }
```
Response: `JournalEntryOut` (see below)

### POST /journal/voice?user_id={uuid}
Multipart form: `audio` (file)
Response: `JournalEntryOut`

### GET /journal/{user_id}
Response: `JournalEntryOut[]`

```json
// JournalEntryOut
{
  "id": "uuid",
  "type": "text | voice",
  "raw_content": "string | null",
  "transcript": "string | null",
  "timestamp": "iso8601"
}
```

## Goals

### POST /goals?user_id={uuid}
Request: `{ "title": "string" }`
Response: `GoalOut`

### GET /goals/{user_id}
Response: `GoalOut[]`

### POST /goals/{goal_id}/complete
Response: `{ "status": "ok" }`

```json
// GoalOut
{ "id": "uuid", "title": "string", "created_at": "iso8601" }
```

## Games

### POST /games/steam/sync?user_id={uuid}&steam_id={string}
Response: `{ "status": "synced", "playtime_minutes": 120 }`

### GET /games/{user_id}
Response: list of raw game session rows

## Risk

### GET /risk/{user_id}
Response:
```json
{
  "user_id": "uuid",
  "history": [
    {
      "id": "uuid",
      "fusion_risk_index": 42.5,
      "trend": "rising | stable | falling",
      "computed_at": "iso8601"
    }
  ]
}
```

Risk scale: **0 (low) – 100 (high)**.
Thresholds (backend/app/routers/risk.py): medium = 40, high = 70.

## Escalations (dashboard-facing — add endpoint before Step 10 in roadmap)

### GET /escalations?tier=high
Planned response:
```json
[
  {
    "user_id": "uuid",
    "tier": "high",
    "fusion_risk_index": 78.2,
    "trend": "rising",
    "timestamp": "iso8601"
  }
]
```
*(Not yet implemented — Backend Lead + Dashboard Dev to finalize shape before
building the dashboard table.)*
