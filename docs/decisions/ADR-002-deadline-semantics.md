# ADR-002: Pickup Deadline and Time Semantics

- **Status:** Proposed — pending approval from Members A, B and C and a pilot coordinator.
- **Date:** 2026-11-13
- **Decision owners:** Member A (transaction/job), Member B (time display), Member C (boundary tests).

## Context

The SRS says pickup must be verified by the deadline, but the exact boundary and treatment of timezone/late jobs need an explicit rule. Expiration can race with handover verification.

## Proposed reversible demo default

- Store `pickup_deadline` as `TIMESTAMPTZ` and normalize comparisons to UTC. Interpret a local time entered by a user in the explicitly selected pilot timezone before converting it to UTC.
- Treat the deadline as inclusive for successful handover: a server-committed verification with `verified_at <= pickup_deadline` is on time.
- Expire only when server UTC time is strictly greater than the deadline (`now > pickup_deadline`) and no valid handover has committed. There is no extra grace period.
- Use the published donation deadline as immutable for that relay; a changed deadline requires an explicit, audited product rule rather than editing a claimed donation in place.
- When a deadline worker and verification race, both lock/recheck the donation and claim in one transaction. The first valid commit wins; a successful handover cannot subsequently be expired.

## Consequences

- Test exact equality, one timestamp before, and one timestamp after the deadline with a controllable clock.
- The UI must display the pilot's local timezone and not silently relabel UTC as local time.
- Job scheduling delay does not change the comparison boundary; it only delays when the overdue state is observed.

## Approval / follow-up

Confirm exact boundary, pilot timezone and whether any operational grace/extension is needed with the coordinator before pilot use. Do not implement an extension policy without a separate approved decision.