---
name: acm-socratic
description: Guide first-pass source reading for unfamiliar files, functions, modules, or subsystems without line-by-line explanation.
argument-hint: "<target file, function, module, or directory>"
---

# Skill: Socratic Onboarding

Command: `/acm-socratic`

Use this when the user is entering an unfamiliar file, function, module, or subsystem.

## Goal

Help the user build a first mental map without dumping conclusions.

## Output Contract

1. **Do not read this line by line yet**: explain the module's real role in 2-4 sentences.
2. **Minimal reading path**: list 3-5 entry points in the order the user should inspect, with source locations when available.
3. **Subsystem lens**: classify the target as request lifecycle, scheduler, KV/cache/memory, model runner/kernel, distributed transfer, streaming cleanup, or tests/observability.
4. **Three concepts to hold in mind**: use engineering concepts such as ownership, scheduler state, cache lifecycle, backpressure, OOM rollback, async cancellation, or GPU buffer reuse.
5. **What to prove in code**: give 2-3 concrete checks the user can verify by following call sites, tests, or state transitions.
6. **Guiding questions**: ask 2-3 questions that force the user back into the source code.
7. **Temporarily skip**: identify boilerplate that should not distract the first pass.

## Hard Constraints

- Do not translate variable names or comments.
- Do not explain every function.
- Do not give the full answer immediately.
- Questions must be specific enough to verify in code.
