# ADR-006: Recipient Data Ownership and Freshness

- **Status:** Proposed — pending approval from Members A, B and C and recipient/coordinator validation.
- **Date:** 2026-11-13
- **Decision owners:** Member A (data fields/access), Member B (freshness UX), Member C (synthetic data/QA).

## Context

Recipient location, capacity and opening hours drive ranking (FR-010/014). The SRS warns that stale or incomplete records can produce unsuitable recommendations and calls for showing recency where possible. Ownership, refresh cadence, consent and retention are unresolved.

## Proposed reversible demo default

- Coordinator/admin maintains recipient organization address, coordinates, capacity, opening hours and timezone; each update sets `data_updated_at`.
- Only synthetic organization and contact data is used in the hackathon. Do not enter real contact data until pilot partners approve purpose, access, consent and retention.
- Ranking responses show the last-updated time and which inputs are missing. Null capacity/opening-hour data means unknown, not zero or compatible.
- The maps provider is not selected in Session 2. If map/geocoding is unavailable, report distance as unavailable; a coordinator may defer or make a documented manual decision. No automatic selection is permitted.
- Recipient contact users can confirm receipt/report discrepancy but cannot silently alter the recipient organization's ranking data in the MVP proposal.

## Consequences

- A `data_updated_at` field and role-filtered access are included in the domain proposal.
- Freshness age threshold and refresh cadence remain unresolved; no record is labeled “current” solely because it has a timestamp.
- Real-data retention and deletion rules need a separate privacy decision before pilot onboarding.

## Approval / follow-up

Ask the coordinator/recipient representatives who owns updates and how often capacity/opening hours change. Confirm privacy/retention and a freshness threshold before pilot use.