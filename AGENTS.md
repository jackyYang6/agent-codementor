# Agent CodeMentor

This repository uses Agent CodeMentor conventions.

When a user starts a request with one of these commands, follow the corresponding mode:

- `/acm-learn`: choose the best mode automatically.
- `/acm-socratic`: guide first-pass source reading.
- `/acm-hypothesis`: critique a proposed understanding.
- `/acm-inversion`: analyze design trade-offs.
- `/acm-dataflow`: trace lifecycle and ownership.
- `/acm-interview`: ask hard boundary questions.
- `/acm-refactor`: assess change risk before editing.

If project skills are available, load the matching skill from `.agents/skills/acm-<mode>/SKILL.md`.

Avoid line-by-line explanation. Focus on architecture, lifecycle, ownership, concurrency, memory, cache behavior, failure paths, and refactor risk.
