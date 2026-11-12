# ADR-004: Explainable Recipient Ranking Defaults

- **Status:** Proposed — pending approval from Members A, B and C and a pilot coordinator.
- **Date:** 2026-11-13
- **Decision owners:** Member A (ranking service), Member B (explanation UX), Member C (determinism tests).

## Context

SRS FR-010–FR-014 requires distance, capacity and opening-hour suitability, coordinator selection and explainability. It intentionally does not define weights, cutoffs, eligibility thresholds or tie-breaks. Missing location/data must not become a fabricated distance or silent exclusion.

## Proposed reversible demo default

For a synthetic-data demo only, expose three normalized factors and use a proposed weighted score:

`score = 0.50 × distance_score + 0.30 × capacity_score + 0.20 × opening_hours_score`

Proposed factor values are in `[0,1]`; capacity is suitable when known capacity meets/exceeds offered servings; opening-hours suitability is based on overlap with the expected receiving window. Rank score descending, then known distance ascending, then stable organization UUID ascending. Active recipients with missing data remain visible with `complete=false` and a factor-specific `unknown` explanation. Do not fabricate distances; a haversine estimate is permitted only with valid coordinates and must be labeled estimated.

The distance normalization radius, factor normalization details, hard eligibility rules and behavior for unknown capacity/opening hours are deliberately **not fixed** by this ADR. Until the team and pilot coordinator approve those inputs, the API returns factor values/reasons and `score: null`; the coordinator can defer or make a documented manual decision.

## Consequences

- The coordinator always makes the final selection; a score is advisory.
- Persist the factor snapshot and policy version with a selection for auditability.
- Map-provider failure produces incomplete ranking, not success-looking fabricated data.
- These weights and tie-breaks are not validated operational policy and must not be presented that way.

## Approval / follow-up

Member C should create boundary/tie test cases; Member B reviews how unknowns are shown; Member A documents a deterministic implementation only after the missing normalization and eligibility details are agreed.