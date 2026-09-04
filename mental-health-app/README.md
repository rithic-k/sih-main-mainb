# Wellness Companion (SIH26094 — Team Voltix)

AI-powered dynamic mental health monitoring and distress prediction system for
survivors of atrocities, delivered as a non-clinical "wellness companion" app
(journaling, goals, games) with a backend risk-analysis layer and a counselor
dashboard.

## Repo Layout

```
/backend      FastAPI service — auth, DB, routers, risk fusion logic
/app          Flutter mobile app — journal, goals, games, prompts
/dashboard    React counselor dashboard
/ml           Model training notebooks/scripts (NLP, voice, fusion)
/docs         API contract, DB schema, design notes
docker-compose.yml   Spins up backend + Postgres + Redis
```

## Team Split (6 people)

| Owner | Layer |
|---|---|
| Backend Lead | `/backend` skeleton, auth, DB schema, routers |
| ML Engineer | `/ml` pipelines, risk fusion logic |
| Flutter Lead | `/app` shell — nav, theme, API client, state mgmt |
| Flutter Dev A | `/app` journal + goals features |
| Flutter Dev B | `/app` games/steam + escalation prompts |
| Dashboard Dev | `/dashboard` React counselor view |

## Branching

```
main              → always demo-ready
  backend-dev
  flutter-dev
    feature/journal
    feature/goals
    feature/games
  feature/ml-pipeline
  feature/dashboard
```

Feature branches → merge into their layer's `-dev` branch → layer lead merges
into `main` once stable. See `.github/PULL_REQUEST_TEMPLATE`.

## Quick Start (Backend)

```bash
cd backend
cp .env.example .env
docker-compose up --build
# API docs at http://localhost:8000/docs
```

## Quick Start (Flutter)

```bash
cd app
flutter pub get
flutter run
```

## Quick Start (Dashboard)

```bash
cd dashboard
npm install
npm run dev
```

## Contract-First Rule

Before writing feature code, check `/docs/api_contract.md` and
`/docs/db_schema.md`. These are the source of truth — do not invent new
fields or endpoints without updating the doc and flagging it in standup.
