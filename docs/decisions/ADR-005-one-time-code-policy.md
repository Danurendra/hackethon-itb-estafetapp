# ADR-005: One-Time Handover Code Policy

- **Status:** Proposed — pending approval from Members A, B and C and a pilot coordinator.
- **Date:** 2026-11-13
- **Decision owners:** Member A (security/verification), Member B (donor/volunteer flow), Member C (negative tests).

## Context

The SRS requires a secure, single-use, expiring code stored non-reversibly (FR-022–FR-025, NFR-006) but does not choose code length, expiry, attempts, rotation or resend behavior.

## Proposed reversible demo default

- Generate a six-digit numeric code using a cryptographically secure random generator.
- Give it a 10-minute lifetime from issuance. Verification is accepted only while the associated claim is active and before expiry/deadline under ADR-002.
- Allow at most five failed attempts for a code; then invalidate it. Return one generic rejection for invalid, expired, used or attempt-exhausted code to avoid disclosing which check failed. Apply server-side rate limiting.
- Store an HMAC-SHA-256 digest with a server-held key/version, never the raw code. Compare safely; keep the key in environment/secret configuration, not the database or logs.
- Return the raw code once only to the authenticated donor for that donation. Reissue invalidates the previous code first. A lost response requires explicit rotation; plaintext is never retrievable.
- A successful verify consumes the code exactly once in the same transaction that completes the claim and sets `PICKUP_VERIFIED`.

## Consequences

- Six-digit codes are low entropy; expiry, attempt cap and rate limit are mandatory together. This default is not a security certification.
- Track attempt count and invalidation without storing submitted code values.
- Test valid, wrong, expired, reused, exhausted, rotation and parallel verification cases; only the real PostgreSQL transaction test proves race handling.

## Approval / follow-up

Review the policy with the team and coordinator before Session 8. Decide whether five attempts are per code, claim, volunteer or time window, and define lockout/reissue communications. No code is implemented in Session 2.