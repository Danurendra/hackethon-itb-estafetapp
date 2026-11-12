# ADR-003: Reassignment After an Overdue Claim

- **Status:** Proposed — pending approval from Members A, B and C and a pilot coordinator.
- **Date:** 2026-11-13
- **Decision owners:** Member A (state/transactions), Member B (coordinator flow), Member C (acceptance cases).

## Context

The SRS requires an overdue, unverified active claim to expire and return the donation to a coordinator-facing reassignment queue (FR-020/UC-06). It does not settle whether the selected recipient changes or only the volunteer changes. BR-01 requires one recipient at a time.

## Proposed reversible demo default

- Expiring a claim changes the claim to `EXPIRED` and donation to `REASSIGNMENT_REQUIRED`; it does not itself change the current recipient assignment.
- The coordinator must choose an explicit resolution: `RETRY_CURRENT` to make the same assignment eligible for a new volunteer claim; `REPLACE_RECIPIENT` to end the current assignment and create one new current assignment; or `EXPIRE` when recovery is no longer feasible.
- At all times there is at most one current assignment. Assignment history is retained. The new volunteer claim is a new claim record; an expired claim is never reactivated.
- No automatic recipient replacement, donation splitting or volunteer self-release is allowed.

## Consequences

- The coordinator queue must show the previous claim, current recipient and deadline before allowing a decision.
- The assignment history can contain multiple rows, but only one can have `ACTIVE` status; an index enforces this invariant.
- `REASSIGNMENT_REQUIRED → RECIPIENT_SELECTED` is a coordinator transition. It does not create a claim; the volunteer must claim again.
- A reassign action after the original pickup deadline is allowed only if the coordinator confirms the operation is still feasible under the deadline policy. The default does not extend the deadline.

## Approval / follow-up

Have the pilot coordinator confirm whether the recipient is retained, replaced or both depending on circumstances, and what happens when the deadline is already passed. Update the transition table and API request before implementation.