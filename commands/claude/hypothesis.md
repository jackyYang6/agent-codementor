---
description: Critique a user's source-code mental model and expose edge cases.
argument-hint: "<your understanding or hypothesis>"
---

Load `.claude/skills/agent-codementor/SKILL.md` and follow `references/hypothesis.md`.

Hypothesis:
$ARGUMENTS

Rules:
- Verdict first.
- Extract hidden assumptions.
- Test cancellation, concurrency, OOM, cache, streaming, and partial-failure edges.
- End with one concrete source-level verification task.
