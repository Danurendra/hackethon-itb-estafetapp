# SRS Requirement-to-Model and Test Traceability

- **Status:** Session 2 draft mapping; planned tests are not yet implemented or run.
- **Source:** `docs/Estafet_SRS_Hackathon_v1.0.docx`, §§6–12 and Appendix A.

Legend: **Proposed** = documented in Session 2, awaits team approval. **Future** = intended for the named later session. **Not run** = no behavioral evidence exists. This matrix is not a claim of implementation or acceptance-test success.

## Functional requirements

| SRS ID | Requirement summary | Session 2 model / API contract | Planned verification | Status |
|---|---|---|---|---|
| FR-001 | Authenticate protected actions | User/principal boundary in API contract; auth endpoints deliberately excluded | Session 3 unauthenticated API tests | Future; not implemented |
| FR-002 | Enforce role permissions | Entity relationships and role-gated endpoint table | Session 3 role/ownership negative tests | Proposed; pending approval |
| FR-003 | Admin manages users/organizations | User/Organization fields; management routes deferred | Session 3/5 admin access tests | Future; P1 |
| FR-004 | Create donation with food, portions, storage, deadline, location | Donation fields; draft schema | AT-01 valid publication | Proposed; not implemented |
| FR-005 | Reject incomplete/past-deadline publication | Publish precondition and `422` field errors | AT-02 missing/past deadline negative cases | Proposed; not implemented |
| FR-006 | Save/resume unpublished draft | `DRAFT`, create/get/patch draft endpoints | Draft persistence contract test | Proposed; not implemented |
| FR-007 | Offline draft and sync result | Client sync excluded from domain persistence contract; ADR-007 proposes Session 12 deferral | AT-10 simulated offline/sync outcome | Open; P1/AT-10 scope unresolved |
| FR-008 | Unique ID and visible current state | UUID and donation representation | AT-01 ID/state assertion; access tests | Proposed; not implemented |
| FR-009 | Donor sees detail and status after publication | Authorized donation detail route | Donor-ownership API test | Future; P1 |
| FR-010 | Rank recipient by distance/capacity/opening hours | Ranking response exposes all three factors | AT-03 factor/ordering tests | Proposed; policy pending ADR-004 |
| FR-011 | Show ranking factors/explanations | `RecipientRankingResponse` schema | AT-03 explanation assertions | Proposed; not implemented |
| FR-012 | Coordinator confirms exactly one recipient | `RecipientAssignment`; single current assignment constraint | AT-03 one-selection test | Proposed; pending approval |
| FR-013 | No automatic recipient selection | Explicit coordinator-only assignment endpoint | AT-03 no-auto-assignment assertion | Proposed; pending approval |
| FR-014 | Flag incompatible capacity/opening hours | Ranking factor suitability fields | Ranking negative/incomplete-data tests | Future; P1 |
| FR-015 | Eligible volunteer claims after recipient selection | Claim endpoint and preconditions | AT-04 successful claim branch | Future; Session 7 |
| FR-016 | At most one active claim | Partial unique index plus transaction boundary | AT-04 concurrent integration test on PostgreSQL | Proposed invariant; not executed |
| FR-017 | Reject second claim, show current status | `409 ACTIVE_CLAIM_EXISTS` | AT-04 race loser/current-state assertion | Future; Session 7 |
| FR-018 | Record volunteer and claim timestamp | Claim actor/timestamp fields and event | AT-04 persisted identity/time assertion | Future; Session 7 |
| FR-019 | Monitor pickup deadline | Claim deadline snapshot and internal worker contract | AT-07 controllable-clock test | Future; Session 9 |
| FR-020 | Expire overdue unverified claim and queue donation | Claim and donation transitions, coordinator queue contract | AT-07 expired claim/state/queue assertion | Proposed; transition approval pending |
| FR-021 | Notify coordinator of expiry/reassignment | Notification intent linked to event | AT-08 notification record on expiration | Future; Session 11 |
| FR-022 | Generate code for active claim | Handover-code record and issue route | AT-05 active-claim/code issuance test | Future; Session 8 |
| FR-023 | Volunteer submits donor-presented code | Verification request schema and role contract | AT-05 correct actor/code flow | Future; Session 8 |
| FR-024 | Valid/unexpired/unused code verifies pickup | Atomic verify transition and code consumption | AT-05 valid-code once test | Proposed; OTP policy pending ADR-005 |
| FR-025 | Invalid/expired/reused code does not change state | Generic rejection response; state unchanged | AT-05 negative/reuse cases | Proposed; not implemented |
| FR-026 | Designated recipient contact confirms receipt | ReceiptConfirmation actor/organization rule and endpoint | AT-06 recipient authorization test | Proposed; Session 10 implementation |
| FR-027 | Received only after contact confirms | Donation transition precondition and unique successful receipt | AT-06 no-early-received assertion | Proposed; not implemented |
| FR-028 | Recipient reports discrepancy and coordinator follows up | `DISCREPANCY`, `EXCEPTION_REVIEW`; endpoint | Discrepancy negative-success test | Future; P1/Session 10 |
| FR-029 | Create notifications for workflow milestones | Event-to-notification relationship and transaction rule | AT-08 event/notification record tests | Proposed; Session 11 implementation |
| FR-030 | Timestamped donation/claim history | Append-only `StatusEvent` entity and timeline route | AT-08 chronological audit test | Proposed; not implemented |
| FR-031 | Coordinator views workflow states | Filtered list/queue contract | Coordinator list visibility tests | Future; P1 |
| FR-032 | Calculate three pilot metrics | Metrics route with denominators | AT-09 synthetic dataset calculations | Future; Session 11 |
| FR-033 | Record manual fallback note | `StatusEvent.note` with bounded/safe text | Fallback-note API test | Future; P1 |

## Business rules and non-functional requirements

| SRS ID | Model/contract treatment | Planned evidence | Status |
|---|---|---|---|
| BR-01 | At most one current recipient assignment; no split donations | Assignment partial unique index and AT-03 | Proposed; approval pending |
| BR-02 | Coordinator only selects recipient | Assignment endpoint role requirement | Proposed; approval pending |
| BR-03 | At most one active claim per donation | Claim partial unique index and AT-04 | Proposed; PostgreSQL test not run |
| BR-04 | Pickup is verified only after valid one-time-code submission | Code lifecycle and atomic verify contract; AT-05 | Proposed; OTP policy open |
| BR-05 | A handover code is single-use and cannot be reused | Code consumption constraint; AT-05 reuse case | Proposed; OTP policy open |
| BR-06 | Donation complete only after recipient confirmation | Donation transition/receipt constraint; AT-06 | Proposed; not implemented |
| BR-07 | Overdue unverified claim expires and returns to coordinator | Expiry transition/job contract; AT-07 | Proposed; boundary and reassignment decisions open |
| BR-08 | Donor food/storage values are declarations, not safety guarantees | Donation contract wording | Covered in contract; no safety certification |
| BR-09 | Ranking supports, but does not replace, coordinator selection | Coordinator-only assignment endpoint; AT-03 | Proposed; pending approval |
| BR-10 | Ranking uses deterministic rules, not AI/ML | Ranking factors/score proposal; AT-03 | Ranking policy pending ADR-004 |
| NFR-001 | Mobile-first responsive core relay | Frontend contract requirement; verify common phone widths and keyboard flow | Future; not verified in Session 2 |
| NFR-002 | Proposed API latency target under stated load | Performance test: 20 concurrent users/1,000 donations, 95% under 2s excluding maps | Future; target not measured |
| NFR-003 | Proposed ranking latency target | Ranking timing test excluding map-provider latency | Future; target not measured |
| NFR-004 | Database-level concurrency protection for claims | Partial unique index and real PostgreSQL race test | Proposed; test requires implementation/DB |
| NFR-005 | Authentication and role authorization; no plaintext passwords | Session 3 authentication/RBAC negative tests | Future; not implemented |
| NFR-006 | Secure code generation, non-reversible storage, expiry/use invalidation | HMAC digest/code contract; AT-05 | Proposed; policy pending ADR-005 |
| NFR-007 | Restrict contact/org data by legitimate role | API resource visibility rules | Proposed; auth/negative tests Session 3 |
| NFR-008 | Map/notification failures do not roll back core event | Transaction and notification-intent design | Proposed; integration tests Session 11/12 |
| NFR-009 | Preserve offline draft and report sync outcome | Client-side offline/synchronization flow; AT-10 | Open; P1/AT-10 scope pending ADR-007 |
| NFR-010 | Preserve timestamped workflow audit | Append-only StatusEvent | Proposed; AT-08 |
| NFR-011 | Support current mainstream desktop/mobile browsers | Browser compatibility test matrix | Future; not verified in Session 2 |
| NFR-012 | Keep layers separated and rules testable | Model/API/service separation documented | Proposed; architecture review after implementation |
| NFR-013 | Labels, contrast, focus and keyboard-operable controls | Accessibility audit and keyboard test | Future; not verified in Session 2 |
| NFR-014 | Expose distance, capacity, opening factors; no opaque AI | Ranking response schema | Proposed; AT-03 |

## Acceptance-test map

| Test | SRS coverage | Contract/model evidence to implement | Planned owner/session | Current result |
|---|---|---|---|---|
| AT-01 | FR-004–008 | Publish complete donation; unique ID and `OPEN`; persisted record | A+B, Session 4 | Not implemented/run |
| AT-02 | FR-005 | Reject missing required data and past deadline; no publication event | A+B, Session 4 | Not implemented/run |
| AT-03 | FR-010–014 | Factors explained; incomplete location honest; coordinator selects exactly one | A+C, Session 6 | Not implemented/run; ranking policy pending |
| AT-04 | FR-015–018, BR-03, NFR-004 | Concurrent real-PostgreSQL claims; exactly one success | A+C, Session 7 | Not implemented/run |
| AT-05 | FR-022–025, NFR-006 | Valid once; invalid/expired/reused rejected; no state mutation on rejection | A+C, Session 8 | Not implemented/run; OTP policy pending |
| AT-06 | FR-026–027 | Correct recipient confirms; no early `RECEIVED` | A+B, Session 10 | Not implemented/run |
| AT-07 | FR-019–021, BR-07 | Clock-controlled overdue claim expires and appears in coordinator queue; verified race wins | A+C, Session 9 | Not implemented/run; deadline/reassignment policy pending |
| AT-08 | FR-029–030, NFR-010 | Actor/timestamp events and corresponding notification records | A+C, Session 11 | Not implemented/run |
| AT-09 | FR-032 | Claim rate, median time-to-claim, on-time rate with counts/denominators | A+C, Session 11 | Not implemented/run |
| AT-10 | FR-007, NFR-009 | Offline draft survives and reports sync outcome | B+C, Session 12 | Not implemented/run; scope pending ADR-007 |

## Review gate

Member A reviews database types, constraints and transaction boundaries; Member B reviews screens, payloads and error-state usability; Member C reviews requirement coverage, ERD and testability. All three must approve the domain/API contract before Member A adds SQLAlchemy/Alembic implementation. None of the acceptance tests above is claimed as passed.