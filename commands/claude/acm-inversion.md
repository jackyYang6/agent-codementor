---
description: Analyze why code is designed this way instead of a simpler way.
argument-hint: "<target or design question>"
---

Load `.claude/skills/acm-inversion/SKILL.md`.

Target or question:
$ARGUMENTS

Rules:
- Construct the naive simpler design first.
- Explain where it breaks.
- Analyze memory, concurrency, cache, scheduling, and failure trade-offs.
- Judge whether the complexity is necessary or over-engineered.
