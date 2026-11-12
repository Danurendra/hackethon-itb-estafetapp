# Estafet — Development Sessions & Team Execution Plan

**Project:** hackethon-itb-estafet (Estafet — Food Rescue Relay Coordination)  
**Repository:** https://github.com/Danurendra/hackethon-itb-estafet  
**Requirements baseline:** `docs/Estafet_SRS_Hackathon_v1.0.docx` (v1.0, 12 November 2026)  
**Planning baseline:** `docs/01-dev-session.md`  
**Team size:** 3 people  
**Delivery approach:** 13 focused sessions, approximately 2–3 team-hours per session  
**Last reviewed:** 13 November 2026

---

## 1. Product objective

Build a mobile-friendly, coordination-first food-rescue application for one community group in one pilot city. The MVP must demonstrate a complete and accountable donation relay:

1. A donor creates and publishes a surplus-food donation.
2. The system ranks eligible recipient organizations using transparent rules.
3. A coordinator reviews the ranking and confirms exactly one recipient.
4. A volunteer claims the pickup; the system permits only one active claim per donation.
5. The donor-to-volunteer handover is verified using a single-use code.
6. The recipient confirms receipt.
7. If a claim reaches its pickup deadline without verified handover, the claim expires and the coordinator receives a reassignment task.

**Product principle:** prove one complete relay and one failed-pickup recovery path before adding optional features.

## 2. Current repository baseline

The repository already contains a walking skeleton:

- Next.js App Router, React and TypeScript frontend.
- FastAPI backend with liveness and database-readiness endpoints.
- PostgreSQL 18 Docker Compose configuration.
- Environment examples, README setup instructions and a responsive landing page.
- 13-session roadmap and Session 1 progress report.

The previous progress report says frontend type-check/build, Python compilation and Compose configuration passed. It also says Docker Desktop was unavailable at that time, so live PostgreSQL connectivity was not yet verified.

**Session 1 is therefore partially complete, not fully signed off.** Verify a real PostgreSQL connection before moving on. Re-run checks in the current working environment; do not assume an old report guarantees the current machine works.

### Planned stack

| Layer | Technology | Responsibility |
|---|---|---|
| Frontend | Next.js, React, TypeScript | Role-based user experiences and mobile-first UI |
| Backend | FastAPI, Python | Validation, authorization, workflow rules and APIs |
| Database | PostgreSQL | System of record and transactional integrity |
| ORM / migrations | SQLAlchemy 2.x + Alembic (recommended) | Models, queries and repeatable schema migrations |
| API contract | REST + OpenAPI | Stable frontend/backend integration |
| Testing | pytest + HTTPX; frontend checks and browser tests where useful | Unit, API, integration and acceptance checks |
| External services | Maps and browser notifications, behind adapters | Optional services; core workflow must survive outages |

Do not introduce Redis, Celery, Kubernetes, microservices, an LLM, paid map services or other infrastructure unless a demonstrated requirement justifies it.

## 3. Team workstreams

Use role ownership to reduce conflicts. The people can be reassigned, but keep one accountable owner per workstream.

| Workstream | Main ownership | Responsibilities |
|---|---|---|
| **Member A — Backend & security lead** | FastAPI, PostgreSQL, domain services | Schema/migrations, auth/RBAC, donation APIs, state transitions, claims, OTP, deadline processing and backend security |
| **Member B — Frontend & UX lead** | Next.js, React, TypeScript | App shell, role-based pages, forms, dashboards, API integration, mobile layouts, loading/error states and accessibility |
| **Member C — Integration, data & QA lead** | Test strategy, seed data, integration | API contract review, synthetic data, recipient ranking service, automated acceptance/race tests, CI, metrics, integration support and demo evidence |

### Collaboration rules

- All three members agree on domain terminology, states and API contracts in Session 2.
- Member A owns backend implementation; Member B owns frontend implementation; Member C owns integration and independent verification.
- Member C may implement the deterministic ranking service with Member A reviewing its backend integration.
- Use short-lived feature branches and pull requests. No one should silently change a shared API contract.
- Every PR should include a short description, test evidence and any schema/API changes.
- Review authorization, claim concurrency, OTP handling and deadline transitions with at least one other member.
- Keep work small enough to integrate within the current session.

## 4. Scope and priority rules

### P0 — must work in the hackathon MVP

- Authentication and backend role authorization.
- Donation draft, validation and publication.
- Deterministic recipient ranking and coordinator confirmation.
- At most one active volunteer claim per donation.
- Deadline monitoring and coordinator reassignment workflow.
- Single-use handover code.
- Recipient receipt confirmation.
- Timestamped event history and notification records.
- Claim rate, median time-to-claim and on-time pickup rate.

### P1 — implement after the core relay is stable

- Offline draft persistence and synchronization (FR-007 / AT-10).
- Administrator account/organization management beyond the minimum seed workflow.
- Discrepancy handling and manual fallback notes.
- Enhanced coordinator dashboard and browser notifications.
- Additional usability and operational refinements.

### Explicitly out of scope

Multiple recipients per donation, donation consolidation, multi-city operations, public marketplace/payment features, food-safety certification, AI/ML recipient selection, automated WhatsApp integration, advanced route optimization, gamification, predictive demand and enterprise integrations.

## 5. Decisions to record before implementation

Create `docs/decisions/` and record decisions in small ADR-style notes. Do not bury these choices in code.

1. **Portion and capacity unit:** choose one canonical unit for donation portions and recipient capacity. Define how fractional quantities are represented, if supported.
2. **Deadline semantics:** define whether pickup must be verified at or before the deadline, the timezone policy, and the exact expiration boundary.
3. **Meaning of reassignment:** decide whether an expired claim keeps the currently selected recipient and only reopens volunteer pickup, or requires the coordinator to select a different recipient. Keep recipient assignment and volunteer claim as separate concepts in the data model.
4. **Ranking policy:** agree temporary eligibility rules, scoring weights and deterministic tie-breakers. Label demo defaults as unvalidated assumptions.
5. **OTP policy:** choose expiry duration, maximum attempts, resend behavior and what happens after too many invalid attempts.
6. **Recipient data ownership:** decide who updates capacity/opening hours and how stale or incomplete location data is displayed.
7. **AT-10 scope:** decide whether offline draft sync is mandatory for the hackathon or an explicitly deferred P1 item. The SRS labels FR-007 P1 but includes AT-10 in its acceptance list.

Until validated with a pilot coordinator, all ranking weights, timeout rules and OTP policy must be labelled **demo defaults**, not operational policy.

---

# 6. Session-by-session execution plan

Each session should end with a runnable increment, tests, a brief demo, updated docs and a reviewable commit/PR. The 2–3 hour estimate is a team session target; distribute tasks in parallel where possible.

## Session 1 — Repository, local environment and walking skeleton

**Status:** partially completed; database success path remains to be verified.  
**Objective:** ensure all three developers can run the complete local stack.

### Member tasks

- **A — Backend:** run FastAPI locally; verify `/health/live`; verify `/health/ready` against a real local PostgreSQL instance; fix connection/configuration issues.
- **B — Frontend:** run Next.js; verify the landing page and service-status indicator; confirm the UI shows database/API unavailability honestly.
- **C — Integration/QA:** run Docker Compose, inspect container health and volumes, follow README setup from a clean terminal, record exact successful commands and blockers.

### Deliverables

- Working local frontend, API and PostgreSQL.
- Updated `README.md` if setup steps need correction.
- Updated Session 1 progress report.

### Definition of done

- `docker compose up -d db` results in a healthy database.
- FastAPI readiness returns HTTP 200 and `{"status":"ok","database":"ok"}` against the real database.
- Frontend runs and reports the connected state.
- `npm run typecheck`, `npm run build` and backend compilation/tests pass.
- No real credentials or `.env` files are committed.

---

## Session 2 — Domain model, lifecycle and API contract

**Objective:** agree on the business rules before feature implementation.

### Member tasks

- **A — Backend:** propose entities, relationships, enums, constraints and transaction boundaries. Draft the first ERD and migration approach.
- **B — Frontend:** map each actor's screens/actions to domain entities; propose API request/response needs and user-visible error states.
- **C — Integration/QA:** convert SRS requirements into a traceability matrix; draft workflow examples and acceptance-test scenarios; facilitate resolution of the seven open decisions above.

### Required domain records

`User`, `Organization`, `Donation`, `RecipientAssignment`, `Claim`, `HandoverCode`, `StatusEvent`, `Notification`, and `ReceiptConfirmation`.

### Required documents

- `docs/02-domain-model.md`
- `docs/03-donation-state-machine.md`
- `docs/04-api-contract.md`
- `docs/decisions/` entries for decisions made
- Requirement-to-test traceability matrix

### State-model guidance

Keep **donation state**, **recipient assignment** and **volunteer claim state** conceptually distinct. A possible donation lifecycle is:

`DRAFT → OPEN → ASSIGNED → CLAIMED → PICKUP_VERIFIED → RECEIVED`

An overdue active claim moves the donation into a coordinator-visible `REASSIGNMENT_REQUIRED` condition. The agreed transition after coordinator action must be documented. A claim may have its own states such as `ACTIVE`, `EXPIRED` and `COMPLETED`.

Do not implement this as a blind copy of the illustrative lifecycle. Finalize the exact states and transitions against the SRS and the decisions agreed by the team.

### Definition of done

- All donation/claim state transitions have allowed actors, preconditions and resulting events.
- The one-recipient and one-active-claim invariants are explicit.
- API endpoints, payloads, response codes and error conventions are documented.
- Portion units, time handling, reassignment semantics, ranking defaults and OTP policy are recorded.
- All three members approve the domain/API contract before implementation starts.

---

## Session 3 — Authentication, roles and synthetic accounts

**Objective:** protect the system and make role-specific workflows possible.

### Member tasks

- **A — Backend:** implement password hashing, login/session or token handling, current-user resolution and backend role dependencies. Seed development users.
- **B — Frontend:** implement login/logout and role-aware navigation; show the correct development workspace for each role.
- **C — Integration/QA:** test unauthenticated requests, wrong-role requests, expired/invalid credentials and seeded-account setup; document test accounts without real personal data.

### Roles

- Donor / food business
- Volunteer coordinator
- Volunteer
- Recipient contact
- System administrator

### Definition of done

- Protected APIs reject unauthenticated requests.
- APIs reject actions attempted by a role without permission.
- UI role hiding is only a convenience; the backend enforces every permission.
- Passwords are never stored or logged in plaintext.
- Synthetic accounts can be recreated reliably from a seed command.

---

## Session 4 — Donation draft, validation and publication

**Objective:** allow a donor to create and publish a valid donation.

### Member tasks

- **A — Backend:** implement create/update draft, validation, publication, unique donation ID and initial `OPEN` state; persist records and events.
- **B — Frontend:** create mobile-friendly donor form, draft save/resume, validation messages, publish confirmation and donation detail view.
- **C — Integration/QA:** write API/UI tests for required fields, positive portion quantity, valid storage condition, future deadline, location and duplicate submissions.

### Required donation information

Food type, portion quantity and unit, storage condition, pickup deadline and pickup location. Add only fields required by the SRS or agreed by the team.

### Definition of done

- AT-01 passes: complete donation is persisted with a unique ID and `OPEN` status.
- AT-02 passes: missing required fields and past deadlines are rejected.
- A draft is not visible as a published donation.
- Publication creates a timestamped event.
- A repeated publish request cannot accidentally create duplicate donations.

---

## Session 5 — Recipient organization data and synthetic dataset

**Objective:** provide realistic, repeatable recipient records for ranking and demo workflows.

### Member tasks

- **A — Backend:** implement recipient organization model/queries and minimum coordinator/admin data-management or seed interfaces.
- **B — Frontend:** create coordinator recipient list/detail views and clear empty/incomplete-data states.
- **C — Integration/QA:** create at least three synthetic recipients with different coordinates, capacity, opening hours and receiving windows; prepare repeatable seed data.

### Definition of done

- At least three synthetic recipient organizations exist.
- Capacity, location and opening-hour data are validated or explicitly marked incomplete.
- The seed procedure can reset/recreate demo data without manual database editing.
- No real personal contact information is used.

---

## Session 6 — Explainable recipient ranking and coordinator assignment

**Objective:** rank suitable recipients while preserving coordinator control.

### Member tasks

- **A — Backend:** expose ranking and assignment APIs; enforce that only a coordinator can finalize exactly one recipient.
- **B — Frontend:** show ranked recipients, factor values/reasons, incomplete data warnings and explicit confirm action.
- **C — Integration/QA:** implement or pair on a deterministic ranking service; create fixtures proving ranking order, feasibility checks and tie-break behavior.

### Ranking factors

- Distance between pickup and recipient locations.
- Capacity fit.
- Opening-hour / receiving-window suitability.

### Implementation constraints

- No AI/ML ranking.
- Never fabricate distance when coordinates or map-provider data are missing.
- A documented haversine calculation may be used as a fallback when both coordinates are valid; label the result as an estimate and do not claim it came from a routing provider.
- Ranking weights and tie-breakers must be documented demo defaults until confirmed with a coordinator.
- The system recommends; the coordinator decides.

### Definition of done

- AT-03 passes with deterministic synthetic cases.
- The UI explains why each recipient ranks where it does.
- Incomplete map/capacity/hour data is visible.
- Only an authorized coordinator can confirm one recipient.
- Exactly one current recipient assignment exists per donation.

---

## Session 7 — Volunteer claim and concurrency-safe lock

**Objective:** guarantee that one volunteer owns an active pickup at a time.

### Member tasks

- **A — Backend:** implement claim creation in a database transaction; use row locking and/or a database uniqueness constraint for one active claim per donation.
- **B — Frontend:** create eligible pickup list, claim action, claimed-state display and clear conflict message for losing volunteers.
- **C — Integration/QA:** write concurrent request test with two volunteers racing for one donation; verify only one succeeds and exactly one active claim remains.

### Definition of done

- AT-04 passes under real PostgreSQL, not only mocked tests.
- Two concurrent claim attempts produce exactly one success.
- Rejected volunteer sees current claim status without seeing unauthorized private information.
- Claim owner and claim timestamp are persisted.
- Claim eligibility checks recipient assignment and deadline server-side.

---

## Session 8 — Secure one-time handover code

**Objective:** verify the physical donor-to-volunteer handover exactly once.

### Member tasks

- **A — Backend:** generate a cryptographically secure code; store only a non-reversible representation; implement expiry, attempt limits, atomic consume and handover event.
- **B — Frontend:** show the code only to the authorized donor; create volunteer submission form and success/error feedback.
- **C — Integration/QA:** test valid, invalid, expired, reused and too-many-attempts cases; inspect logs and database to ensure raw codes are not stored.

### Security requirements

- Generate codes with a cryptographically secure random generator.
- Never store or log the raw code.
- Store a non-reversible hash/HMAC representation using a server-side secret where appropriate.
- Compare values safely and consume the code atomically with the state transition.
- Enforce expiry and retry policy on the backend.
- Only the active volunteer claim can submit the code.

### Definition of done

- AT-05 passes.
- A valid code verifies handover once.
- Invalid, expired or reused codes do not change donation state.
- Concurrent duplicate submissions cannot consume the same code twice.
- The event history records the verified handover without exposing the code.

---

## Session 9 — Deadline monitoring and reassignment recovery

**Objective:** recover donations when a volunteer misses the pickup deadline.

### Member tasks

- **A — Backend:** implement an idempotent `expire_overdue_claims` service/job and coordinator reassignment API; protect against racing handover verification.
- **B — Frontend:** create reassignment queue, expired-claim status, coordinator action and clear deadline display.
- **C — Integration/QA:** test with a controllable clock or safely adjustable synthetic deadline; test the race where OTP verification and expiration happen at nearly the same time.

### Implementation guidance

- Keep expiration logic in a testable service, not scattered through route handlers.
- Use UTC timestamps in storage and convert for display.
- Ensure a successfully verified handover cannot subsequently be expired.
- Make expiration idempotent: running the job twice must not duplicate events or notifications.
- Prefer a simple one-instance scheduler or documented scheduled command for the hackathon. Do not add Celery/Redis unless the deployment genuinely requires it.

### Definition of done

- AT-07 passes.
- An overdue unverified active claim expires and enters the coordinator queue.
- A coordinator can take the agreed next action.
- Already verified handovers are never expired.
- Expiration events and notification records are not duplicated.

---

## Session 10 — Recipient receipt and discrepancy handling

**Objective:** complete the relay only after the recipient confirms delivery.

### Member tasks

- **A — Backend:** implement recipient receipt endpoint, authorized recipient check, receipt record and final state transition.
- **B — Frontend:** implement recipient delivery view, confirm receipt action and discrepancy reporting UI if time permits.
- **C — Integration/QA:** test role authorization, confirmation before/after handover, duplicate confirmation and discrepancy behavior.

### Definition of done

- AT-06 passes.
- Donation cannot become `RECEIVED` before a verified handover and an authorized recipient confirmation.
- The system records who confirmed and when.
- A discrepancy does not falsely mark a successful receipt.
- P1 discrepancy follow-up can be simplified, but its status must be visible if included.

---

## Session 11 — Event timeline, notifications and pilot metrics

**Objective:** make the relay auditable and measurable.

### Member tasks

- **A — Backend:** create event/notification records transactionally with workflow changes; implement timeline and metrics endpoints.
- **B — Frontend:** create donation timeline, in-app notification feed and coordinator metrics summary.
- **C — Integration/QA:** verify event ordering, actor/time data, notification failure behavior and metric calculations against known fixtures.

### Required events

Donation published, recipient selected, volunteer claimed, claim expired, reassignment action, handover verified and receipt confirmed.

### Required metrics

- Claim rate = eligible donations with at least one volunteer claim / total eligible donations.
- Median time-to-claim = median elapsed time from publication to first valid claim.
- On-time pickup rate = donations with handover verified by deadline / donations scheduled for pickup.

Always show counts and denominators alongside percentages. Define how cancelled/ineligible donations are excluded. Label synthetic metrics as demo data.

### Definition of done

- AT-08 and AT-09 pass.
- Events have actor and UTC timestamp.
- Notification delivery failure does not roll back a committed workflow event.
- Core in-app notification records remain visible even if browser notifications are unavailable.
- Metrics match test fixtures and expose their denominators.

---

## Session 12 — Integration, offline draft, accessibility and resilience

**Objective:** stabilize the complete experience across roles and imperfect connectivity.

### Member tasks

- **A — Backend:** review idempotency, validation, error handling and resilience; support safe draft synchronization if it needs server changes.
- **B — Frontend:** improve mobile layouts, keyboard navigation, focus states, labels, contrast and offline draft retention/sync UX.
- **C — Integration/QA:** run cross-role end-to-end flows; simulate API/map/notification outages and network interruptions; verify draft sync if AT-10 is in scope.

### Offline draft guidance

If implemented, persist unpublished drafts locally (IndexedDB is preferred for structured drafts). Use an idempotency key or equivalent mechanism to prevent duplicate publication during retry. Clearly distinguish `saved locally`, `sync pending`, `sync succeeded` and `sync failed`. Do not silently publish a draft after connectivity returns.

### Definition of done

- Mobile core workflow is usable at common phone widths.
- Core controls are keyboard-operable and have labels, visible focus and adequate contrast.
- External maps/notification failure is communicated honestly and does not corrupt core state.
- AT-10 passes if the team selected it as mandatory; otherwise it is listed as a known P1 deferral.

---

## Session 13 — Full acceptance, demo and handoff

**Objective:** produce a reliable, judge-ready demonstration and document remaining risks.

### Member tasks

- **A — Backend:** fix release-blocking workflow/security bugs; run backend and database integration tests; prepare demo reset/seed commands.
- **B — Frontend:** polish only the critical screens; verify mobile/desktop flows; rehearse the successful and failure-recovery narratives.
- **C — Integration/QA:** run AT-01–AT-10, capture screenshots/logs, verify demo metrics and create the final test/evidence report.

### Required demonstration

**Scenario A — successful relay:** publish donation → rank recipients → coordinator confirms one → Volunteer A claims → Volunteer B is rejected → donor presents code → volunteer verifies handover → recipient confirms receipt.

**Scenario B — recovery:** publish second donation → volunteer claims → advance controlled clock beyond deadline without handover → claim expires → coordinator sees reassignment queue → next action is taken.

### Definition of done

- All P0 acceptance tests pass.
- AT-10 is either demonstrated or clearly documented as an agreed P1 deferral.
- Demo environment can be reset with documented commands.
- Synthetic data is clearly labelled; no synthetic result is presented as a real pilot outcome.
- A 2–3 minute demo can be completed without manual database edits.
- README, setup guide, architecture/domain docs, API docs and known limitations are current.
- Pilot readiness checklist covers partner roles, consent, data retention, escalation and food-safety disclaimers.

---

# 7. Acceptance-test checklist

| Test | Pass condition | Session |
|---|---|---:|
| AT-01 | Publish complete donation; unique ID and `OPEN` status | 4 |
| AT-02 | Reject missing data or a past deadline | 4 |
| AT-03 | Explainable ranking; coordinator selects exactly one recipient | 6 |
| AT-04 | Two concurrent claims; exactly one succeeds | 7 |
| AT-05 | Valid one-time code succeeds once; invalid/expired/reused code rejected | 8 |
| AT-06 | Recipient confirmation is required before `RECEIVED` | 10 |
| AT-07 | Overdue unverified claim expires and appears in reassignment queue | 9 |
| AT-08 | Timestamped event history and notification records exist | 11 |
| AT-09 | Coordinator can calculate the three required pilot metrics | 11 |
| AT-10 | Draft survives offline simulation and reports sync outcome | 12 |

# 8. Repository conventions and engineering guardrails

Recommended structure as the app grows (adapt to current conventions instead of replacing working code unnecessarily):

```text
backend/
  app/
    api/v1/routes/
    core/
    db/
    models/
    schemas/
    services/
    jobs/
    tests/
  alembic/
frontend/
  app/
  components/
  features/
  lib/
  types/
docs/
  decisions/
  progress-report/
```

Engineering rules:

1. Backend is authoritative for authorization, donation state, recipient assignment, active claim, deadline and OTP validation.
2. Use migrations for database schema changes. Do not rely on manual SQL edits as the source of truth.
3. Validate at the API boundary and enforce important invariants in the database/transaction layer where possible.
4. Use UTC for stored timestamps; display local times explicitly.
5. Keep ranking deterministic, explainable and free of AI/ML.
6. Use synthetic records only during development and hackathon demos.
7. Never commit secrets, `.env`, raw one-time codes, passwords or real personal contact data.
8. Do not claim that a feature works because the UI has a button. Verify API behavior and persistence.
9. Do not add broad dependencies or infrastructure without a specific requirement and a documented reason.
10. Add regression tests whenever a bug is fixed.

## 9. Per-session completion report template

Create `docs/progress-report/session-XX-report.md` at the end of each session.

```md
# Session XX Progress Report

- Date:
- Session objective:
- Team members and ownership:

## Delivered
- ...

## Verification
- Commands executed:
- Automated tests and results:
- Manual demo evidence:

## Requirement traceability
- SRS requirement IDs addressed:
- Acceptance tests passed:

## Known gaps / blockers
- ...

## Decisions made
- ...

## Next session handoff
- ...
```

## 10. Immediate next action

Start with **Session 1 closure**: verify Docker/PostgreSQL and `/health/ready` on a real database. Then convene all three members for **Session 2 domain and state-machine approval**. Do not start separate feature implementations until the team has agreed on the shared model and API contract.
