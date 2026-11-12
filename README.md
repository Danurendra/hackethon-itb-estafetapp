# Estafet

Estafet is a mobile-friendly food-rescue relay for one pilot community. This repository is being built session by session; the current milestone is **Session 1: local environment and walking skeleton**.

## Stack

- **Web:** Next.js App Router, React, and TypeScript (`frontend/`)
- **API:** FastAPI and Uvicorn (`backend/`)
- **Database:** PostgreSQL 18 via Docker Compose

The API is the intended authority for permissions, donation state, claim locking, deadlines, and code validation. No workflow data or real personal information is included yet.

## Prerequisites

- Node.js 20.9 or later and npm
- Python 3.10 or later
- Docker Desktop (or another Docker Engine) with the Compose plugin

The starter was prepared with Node.js 24.20, Python 3.12, and Docker Compose 5.5.1.

## Start locally (Windows PowerShell)

1. From the repository root, create local configuration and start PostgreSQL:

   ```powershell
   Copy-Item .env.example .env
   docker compose up -d db
   docker compose ps
   ```

   Wait for the database status to become `healthy`. The credentials in `.env.example` are for local development only. If you change them, update `DATABASE_URL` to match.

2. In a new terminal, install and run the API:

   ```powershell
   cd backend
   python -m venv .venv
   .\.venv\Scripts\python -m pip install -r requirements.txt
   .\.venv\Scripts\python -m uvicorn app.main:app --reload --host 127.0.0.1 --port 8000
   ```

3. In another terminal, install and run the web client:

   ```powershell
   cd frontend
   Copy-Item .env.local.example .env.local
   npm install
   npm run dev
   ```

4. Open <http://localhost:3000>. API documentation is at <http://localhost:8000/docs>; API liveness and readiness checks are at `/health/live` and `/health/ready`.

The frontend can start even if the API or database is stopped; its status panel will report when the API and database are ready.

## Useful checks

From `frontend/`:

```powershell
npm run typecheck
npm run build
```

From `backend/`:

```powershell
.\.venv\Scripts\python -m compileall app
```

Stop PostgreSQL with `docker compose down`. The named local database volume is retained. To delete the local database contents as well, use `docker compose down --volumes`.

## Project notes

- `docs/01-dev-session.md` contains the 13-session roadmap and acceptance-test mapping.
- `docs/Estafet_SRS_Hackathon_v1.0.pdf` and `.docx` are the product requirements source.
- Use synthetic data throughout development and the hackathon demo. Do not commit `.env` or other secrets.
