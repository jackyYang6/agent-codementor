---
name: acm-hypothesis
description: Critique a user's source-code mental model, extract hidden assumptions, and test it against edge cases and source evidence.
argument-hint: "<your understanding or hypothesis>"
---

# Skill: Hypothesis Critique

Command: `/acm-hypothesis`

Use this when the user proposes a mental model, says "I think...", "Is it correct that...", or asks you to find flaws.

## Goal

Validate the user's understanding under non-happy-path conditions and expose the missing 20%.

## Output Contract

1. **Verdict first**: clearly say whether the model is correct, partially correct, or wrong.
2. **Claim rewrite**: restate the user's model in one precise sentence.
3. **Extract hidden assumptions**: rewrite the user's claim into 3-5 assumptions.
4. **Critique each assumption**: state when it holds, when it fails, and where to verify it in source.
5. **Force edge cases**: cover at least three of cancellation, concurrency race, OOM rollback, cache invalidation, duplicate release, usage mismatch, backpressure, partial failure, multi-worker inconsistency, streaming final chunk, or speculative rollback.
6. **Corrected mental model**: rewrite the user's model in a more precise way.
7. **Unknowns that still matter**: name any source evidence you did not find but would need before changing code.
8. **One verification task**: end with a concrete source-level question for the user to check.

## Hard Constraints

- Do not respond with vague encouragement like "basically right".
- Do not discuss only the happy path.
- Do not refute without source-level reasoning.
