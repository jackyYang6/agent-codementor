---
description: Automatically choose the best Agent CodeMentor learning mode.
argument-hint: "<target, question, or understanding>"
---

Load `.claude/skills/acm-learn/SKILL.md`.

Use `/acm-learn` mode and automatically choose one of:

- `/acm-socratic` for unfamiliar modules.
- `/acm-hypothesis` for user mental-model critique.
- `/acm-inversion` for design trade-off analysis.
- `/acm-dataflow` for lifecycle tracing.
- `/acm-interview` for boundary testing.
- `/acm-refactor` for refactor risk review.

User input:
$ARGUMENTS

Start by naming the selected mode and why. Do not explain code line by line. Focus on architecture, ownership, lifecycle, concurrency, memory, cache behavior, failure paths, and refactor risk.
