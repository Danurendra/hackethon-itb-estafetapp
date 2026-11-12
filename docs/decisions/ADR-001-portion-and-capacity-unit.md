# ADR-001: Portion and Capacity Unit

- **Status:** Proposed — pending approval from Members A, B and C.
- **Date:** 2026-11-13
- **Decision owners:** Member A (schema), Member B (form wording), Member C (test/data).

## Context

SRS FR-004 and §9 require positive donation portions and recipient capacity but do not define a canonical unit or fractional behavior. Ranking cannot compare the two until they share a unit.

## Proposed reversible demo default

Use a positive integer `serving` count: one portion is one person-sized serving, and recipient capacity is the maximum servings the recipient can accept for the same receiving window. Represent both as PostgreSQL `INTEGER`; reject zero and negative values. Do not accept fractions or reinterpret portion count as weight or package count in the MVP.

## Consequences

- The form/API must label the value as servings and use the same label for recipient capacity.
- Ranking can compare donation servings to capacity servings without unit conversion.
- A serving is not a nutrition, food-safety or standardized weight claim. Confirm wording and real operational fit with a pilot coordinator before real data.
- If the pilot needs kilograms, trays or mixed units, replace this decision before migrations; do not silently convert existing data.

## Approval / follow-up

Member B confirms understandable form copy; Member C defines synthetic test cases; Member A chooses schema type after sign-off. No implementation is approved by this ADR draft.