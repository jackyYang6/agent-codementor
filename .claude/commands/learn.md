---
description: Automatically choose the best Agent CodeMentor learning mode.
argument-hint: "<target, question, or understanding>"
---

Load `.claude/skills/agent-codementor/SKILL.md`.

Use `/learn` mode and automatically choose one of:

- `/socratic` for unfamiliar modules.
- `/hypothesis` for user mental-model critique.
- `/inversion` for design trade-off analysis.
- `/dataflow` for lifecycle tracing.
- `/interview` for boundary testing.
- `/refactor` for refactor risk review.

User input:
$ARGUMENTS

Do not explain code line by line. Focus on architecture, ownership, lifecycle, concurrency, memory, cache behavior, failure paths, and refactor risk.
