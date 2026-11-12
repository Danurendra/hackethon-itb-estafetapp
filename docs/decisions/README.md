# Session 2 Decision Log

These seven ADRs correspond to the open business decisions listed in §5 of `docs/02_ESTAFET_DEVELOPMENT_SESSIONS.md`. Each records a reversible **proposal**, not a team or pilot policy. All remain **Proposed — pending approval from Members A, B and C**. Do not encode a proposal in migrations or workflow logic until approval is recorded.

| ADR | Decision | Proposed demo default | Status |
|---|---|---|---|
| [ADR-001](ADR-001-portion-and-capacity-unit.md) | Portion/capacity unit | One integer serving per person; capacity uses same unit | Pending |
| [ADR-002](ADR-002-deadline-semantics.md) | Deadline and time semantics | UTC storage; handover on/before deadline accepted; expiration only after it | Pending |
| [ADR-003](ADR-003-reassignment-semantics.md) | Reassignment after a missed claim | Keep current recipient by default; coordinator may retry or explicitly replace | Pending |
| [ADR-004](ADR-004-ranking-policy.md) | Ranking eligibility, weights and tie-break | Explainable 50/30/20 factor proposal; no score until normalization is approved | Pending |
| [ADR-005](ADR-005-one-time-code-policy.md) | Code expiry, attempts and rotation | Six digits, 10-minute expiry, five failed attempts, invalidate on rotation | Pending |
| [ADR-006](ADR-006-recipient-data-ownership.md) | Recipient reference data ownership/freshness | Coordinator/admin maintained; show last-updated time; synthetic data only | Pending |
| [ADR-007](ADR-007-at-10-offline-draft-scope.md) | Offline draft scope | Defer FR-007/AT-10 to Session 12 if time is constrained; retain as tracked P1 | Pending |

## Approval record

Record explicit sign-off or amendments from all three members here after review:

| Member | Decision/review | Date |
|---|---|---|
| A — Backend & security | Pending | — |
| B — Frontend & UX | Pending | — |
| C — Integration, data & QA | Pending | — |

The team should also confirm the registered hackathon team name and pilot coordinator's operational validation before pilot use; these are not implementation defaults.