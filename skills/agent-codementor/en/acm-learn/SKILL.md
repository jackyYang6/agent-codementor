---
name: acm-learn
description: Automatically choose the best Agent CodeMentor learning mode for a source-code question, target, or proposed understanding.
argument-hint: "<target, question, or understanding>"
---

# Skill: Agent CodeMentor Router

Use this when the user asks to learn source code but has not chosen a specific mode.

## Goal

Choose the right learning mode and apply it directly. Do not ask the user to choose unless the request is genuinely ambiguous.

## Mode Selection

- Use `/acm-socratic` for unfamiliar modules, first-pass reading, or onboarding.
- Use `/acm-hypothesis` when the user proposes a mental model or asks whether an understanding is correct.
- Use `/acm-inversion` when the user asks why the design is shaped this way instead of a simpler way.
- Use `/acm-dataflow` when the user wants to trace a request, tensor, buffer, cache entry, stream chunk, or object lifecycle.
- Use `/acm-interview` when the user wants to be tested after reading.
- Use `/acm-refactor` before the user modifies, replaces, optimizes, or inserts logic into a complex subsystem.

## Output Contract

1. **Selected mode**: name the mode and give a one-sentence reason.
2. **Subsystem lens**: classify the target as request lifecycle, scheduler, KV/cache/memory, model runner/kernel, distributed transfer, streaming cleanup, or tests/observability.
3. **Apply the selected mode**: follow the corresponding skill behavior.
4. **Verification task**: end with a concrete source-level check for the user.

## Hard Constraints

- Do not explain code line by line.
- Do not stay at generic architecture level when source locations are available.
- Do not choose `/acm-refactor` unless the user is considering a change.
