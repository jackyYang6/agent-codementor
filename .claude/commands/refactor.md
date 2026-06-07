---
description: Assess refactor risk before modifying a complex module.
argument-hint: "<change idea or target>"
---

Load `.claude/skills/agent-codementor/SKILL.md` and follow `references/refactor.md`.

Change idea or target:
$ARGUMENTS

Rules:
- Do not jump directly to a patch.
- Classify the change type.
- Analyze blast radius and hidden contracts.
- Propose the minimal safe path and required tests.
- Name red lines that should not be touched lightly.
