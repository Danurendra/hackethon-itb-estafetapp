# ADR-007: Offline Draft and AT-10 Scope

- **Status:** Proposed — pending approval from Members A, B and C.
- **Date:** 2026-11-13
- **Decision owners:** Member A (draft API/sync), Member B (local storage/UX), Member C (offline acceptance test).

## Context

FR-006 (P0) requires a saved unpublished draft that can be resumed. FR-007 (P1) adds local offline persistence and synchronization feedback, while AT-10 appears in the SRS acceptance list. The roadmap permits deferring offline sync to Session 12 if time is tight.

## Proposed reversible demo default

Keep server-persisted draft create/resume (FR-006) in Session 4. Defer offline local persistence/sync (FR-007/AT-10) to Session 12 if the core online relay is not yet stable. Retain AT-10 in the traceability matrix and clearly report it as deferred/not passed; do not claim full AT-01–AT-10 acceptance until executed.

If offline storage is implemented, store only the minimum draft fields locally, show pending/synced/failed state, handle server conflicts explicitly, and do not queue publication as if it succeeded while offline.

## Consequences

- The Session 2 domain/API contract does not add offline-sync endpoints or data tables.
- Member B can design the draft contract without promising offline publication.
- The final demo/release report must identify AT-10 as deferred if not implemented.

## Approval / follow-up

At Session 12 planning, decide against remaining schedule and AT-10 judging expectations. If the team wants AT-10 as a mandatory P0, revise scope and test plan before implementation.