# Agent CodeMentor

This repository uses Agent CodeMentor conventions.

When a user starts a request with one of these commands, follow the corresponding mode:

- `/learn`: choose the best mode automatically.
- `/socratic`: guide first-pass source reading.
- `/hypothesis`: critique a proposed understanding.
- `/inversion`: analyze design trade-offs.
- `/dataflow`: trace lifecycle and ownership.
- `/interview`: ask hard boundary questions.
- `/refactor`: assess change risk before editing.

If project skills are available, load the matching skill from `.agents/skills/<command-name>/SKILL.md`.

Avoid line-by-line explanation. Focus on architecture, lifecycle, ownership, concurrency, memory, cache behavior, failure paths, and refactor risk.
