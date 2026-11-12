# Estafet: Application Development Plan

**Source:** `Estafet_SRS_Hackathon_v1.0.pdf`  
**Delivery shape:** 13 focused development sessions, approximately 2–3 hours each  
**Product target:** A demonstrable, mobile-friendly food-rescue relay from donor listing through recipient confirmation, including recovery from a missed pickup deadline.

## Product Scope

Build one pilot workflow for one community food-rescue group in one city. Each donation goes to exactly one recipient, selected by a coordinator. The system supports one active volunteer claim, verifies donor-to-volunteer handover with a single-use code, and marks a donation complete only after recipient confirmation.

Use the SRS planned stack: **Next.js** responsive web client, **FastAPI** application API, and **PostgreSQL** system of record. The backend is authoritative for permissions, donation state, claim locking, deadlines, and code validation. Use synthetic data throughout development and the hackathon demo.

## Planning Assumptions

- Each session is independently demoable and ends with committed, reviewed work and passing relevant checks.
- The workspace currently contains the SRS documents but no application source. Session 1 therefore confirms the repository and establishes the app skeleton if needed. If a codebase exists elsewhere, inspect and follow its conventions instead of replacing it.
- Total estimated effort is about **26–39 team-hours**, not including external partner interviews, deployment account setup, or time waiting on third-party credentials.
- Keep external maps and browser notifications replaceable. The core workflow must remain demonstrable with seeded locations and in-app notification records if a provider is unavailable.
- Treat ranking weights, portion units, code expiry/retry policy, and timeout interpretation as explicit team decisions; document temporary demo defaults rather than presenting them as validated pilot policy.

## Session Roadmap

### Session 1 — Repository, Local Environment, and Walking Skeleton

**Build:** Confirm repository layout and package/runtime versions. Set up or verify Next.js, FastAPI, PostgreSQL, environment configuration, local run instructions, and basic health checks. Add a minimal responsive shell and API/database connectivity.

**Done when:** A developer can start the frontend, API, and database locally from documented commands; health checks pass; secrets are not committed.

### Session 2 — Domain Model, API Contract, and Workflow Rules

**Build:** Agree the canonical portion unit and required donation fields. Define core entities and relationships: User, Organization, Donation, Recipient Assignment, Claim, Handover Code, Status Event, Notification, and Receipt Confirmation. Write the proposed donation state machine and API request/response/error conventions; create initial database migrations.

**Done when:** The team can trace one donation through states and the schema/API contracts reflect one recipient and at most one active claim. Record unresolved policy decisions.

### Session 3 — Authentication, Roles, and Synthetic Accounts

**Build:** Implement authentication and backend role checks for donor, coordinator, volunteer, recipient contact, and administrator (FR-001–003). Add minimal role-aware navigation and synthetic accounts/organizations for local development.

**Done when:** Protected API actions reject unauthenticated callers and wrong-role actions; each role can reach the appropriate development view. Do not treat UI hiding alone as authorization.

### Session 4 — Donation Draft, Validation, and Publication

**Build:** Implement donor form, server-side validation, draft save/resume, publication, unique ID, and initial **Open** status (FR-004–009). Capture food type, positive portions, storage condition, deadline, and pickup location. Show useful validation and save results.

**Done when:** AT-01 and AT-02 pass; published donations persist and are visible to authorized users. Draft synchronization while offline (FR-007) may be deferred to Session 12 if time is tight.

### Session 5 — Recipient and Pilot Data Management

**Build:** Seed and manage recipient organizations with location, capacity, opening hours, and receiving-window information. Add the minimum administrator/coordinator workflow or controlled seed scripts needed to maintain synthetic records.

**Done when:** At least three synthetic recipients with different constraints are available, and incomplete recipient data is distinguishable from valid data. No real personal contact data is used.

### Session 6 — Explainable Recipient Ranking and Coordinator Assignment

**Build:** Implement deterministic ranking using distance, capacity fit, and opening-hour suitability (FR-010–014). Show factor values/reasons and incomplete map data honestly. Let only a coordinator confirm exactly one recipient; persist who selected it and when.

**Done when:** AT-03 passes using seeded cases; ranking is repeatable and explainable; the system never silently finalizes the recommendation. Use a documented fallback distance method if maps credentials are unavailable.

### Session 7 — Volunteer Claim and Concurrency-Safe Lock

**Build:** Add eligible-pickup view, claim action, claim owner/timestamp, and backend transaction or database constraint ensuring no more than one active claim per donation (FR-015–018).

**Done when:** AT-04 passes, including two concurrent claim attempts with exactly one success. A rejected volunteer sees the current claim state; no duplicate active claim is stored.

### Session 8 — Secure One-Time Handover Code

**Build:** Generate a single-use code for an active claim; present the code to the donor role and provide volunteer submission. Store only a non-reversible code representation, enforce expiry and retry policy, consume it once, and record the handover event (FR-022–025, NFR-006).

**Done when:** AT-05 passes for valid, invalid, expired, and reused codes. Invalid attempts do not change donation state; raw codes are not persisted or logged.

### Session 9 — Deadline Monitoring and Reassignment Recovery

**Build:** Add a deadline monitor/job and coordinator reassignment queue (FR-019–021). Expire only active claims whose pickup deadline has passed without verified handover. Ensure a concurrently verified handover cannot be expired afterward.

**Done when:** AT-07 passes with a controllable test clock or safely adjustable synthetic deadline; the coordinator sees the expired claim and can take the next action. Confirm the timeout interpretation with the coordinator before pilot use.

### Session 10 — Recipient Receipt and Discrepancy Handling

**Build:** Add recipient delivery view, deliberate receipt confirmation, and recorded recipient identity/time (FR-026–028). Add a basic discrepancy path and coordinator follow-up status if time allows.

**Done when:** AT-06 passes; donation cannot become **Received** before recipient confirmation. A discrepancy does not falsely mark a successful receipt.

### Session 11 — Timeline, In-App Notifications, and Pilot Metrics

**Build:** Record actor- and timestamped events for publication, assignment, claim, expiration, handover, reassignment, and receipt (FR-029–030, NFR-010). Add an in-app notification feed/records and coordinator summary for claim rate, median time-to-claim, and on-time pickup rate (FR-031–033).

**Done when:** AT-08 and AT-09 pass using synthetic records; denominators are visible with percentages; notification delivery failure cannot roll back a saved workflow event. Label metrics from synthetic data as demo data.

### Session 12 — Integration, Offline Draft, Accessibility, and Resilience

**Build:** Exercise the whole flow across roles and mobile layouts. Add local draft retention/sync feedback where feasible (FR-007, NFR-009); improve keyboard navigation, labels, contrast, focus states, and error messages. Verify map/notification outages and connection loss do not corrupt committed state.

**Done when:** AT-10 passes if offline draft is included; otherwise record it as a known P1 gap. Core actions are keyboard-operable and usable at common phone widths; external-service failure is shown honestly.

### Session 13 — Acceptance Run, Demo, and Pilot Readiness

**Build:** Run the acceptance suite AT-01–AT-10, fix release-blocking issues, prepare seeded demo accounts/data, capture evidence, and rehearse the judge-facing 2–3 minute flow. Document deployment/runbook steps and remaining open decisions.

**Done when:** The team can demonstrate one complete donation relay plus a second donation that expires and returns to reassignment. No synthetic result is presented as a real pilot outcome; the pilot checklist covers consent, data retention, partner roles, escalation, and food-safety disclaimers.

## Acceptance-Test Mapping

| Test | Planned session | Demonstration evidence |
|---|---:|---|
| AT-01: Publish complete donation; unique ID and Open status | 4 | Published donation detail/list view and persisted record. |
| AT-02: Reject missing data or past deadline | 4 | Validation responses; no invalid published record. |
| AT-03: Explainable ranking and one coordinator selection | 6 | Ranked recipients with factors and recorded assignment. |
| AT-04: Concurrent claim lock | 7 | Two volunteers race; one claim succeeds. |
| AT-05: Single-use handover code | 8 | Valid code succeeds once; invalid/expired/reused rejected. |
| AT-06: Recipient receipt confirmation | 10 | State becomes Received only after recipient action. |
| AT-07: Overdue claim reassignment | 9 | Expired claim appears in coordinator queue. |
| AT-08: Event history and notification records | 11 | Timestamped timeline and visible in-app notification. |
| AT-09: Pilot metrics | 11 | Metrics with counts/denominators from synthetic records. |
| AT-10: Offline draft and synchronization result | 12 | Draft survives simulated outage and reports sync outcome. |

## Cross-Cutting Definition of Done

- Backend validates inputs, authenticates/authorizes protected operations, and enforces state transitions; the browser is never the authority for claims or code validity.
- Database migrations and test data setup are repeatable. Workflow-critical changes have automated tests, including negative and race-condition cases where applicable.
- Every status change has an actor and timestamp. Errors are actionable and do not claim success when an external service fails.
- Secrets and raw one-time codes are not committed, persisted, or logged. Use synthetic records until pilot privacy/retention rules are agreed.
- Each session ends with a runnable app, a brief demo, test results, and an updated list of open decisions/known gaps.

## Explicitly Deferred or Out of Scope

Multiple recipients per donation, combining donations/routes, multi-city operations, public marketplace/payment flows, food-safety certification, AI/ML recipient selection, automated WhatsApp integration, advanced route optimization, gamification, predictive demand, and enterprise integrations. Keep WhatsApp as a manual fallback and record operational notes where possible.

## Decisions to Close Before Pilot Launch

- Registered hackathon team name.
- Portion and recipient-capacity units; eligibility thresholds and ranking weights/tie-breaks.
- Pickup deadline semantics, claim expiry, exception handling, and coordinator escalation.
- Handover-code expiration and retry limits.
- Maps provider and behavior when location/distance is unavailable.
- Recipient data ownership/refresh cadence, consent, access, and retention period.
