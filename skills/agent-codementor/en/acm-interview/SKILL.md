---
name: acm-interview
description: Ask hard boundary questions that test source-code mastery of lifecycle, state transitions, failures, and trade-offs.
argument-hint: "<target module, file, or subsystem>"
---

# Skill: Boundary Interview

Command: `/acm-interview`

Use this when the user wants to be tested after reading a module.

## Goal

Probe whether the user truly understands edge cases, state transitions, lifecycle, and design trade-offs.

## Output Contract

Ask exactly 3 questions per round. Do not give answers until the user responds.

Questions must involve concrete failure scenarios such as:

- Removing a lock, condition variable, guard, refcount update, rollback, or cleanup branch.
- Extreme input lengths, skewed batches, cache partial hits, or long-tail decode.
- Cancellation after resource acquisition but before normal completion.
- OOM while partially allocating a batch.
- Cross-runtime or CUDA lifetime mismatch.
- Streaming final usage or empty final chunk behavior.

After the user answers, grade with:

1. Score out of 10.
2. What they got right.
3. What they missed.
4. The real disaster path.
5. Source locations to verify.
6. Corrected answer.
7. One follow-up reading task that starts from a specific function, class, or test.

## Hard Constraints

- Do not ask syntax questions.
- Do not ask definitions like "what is a mutex".
- Do not reveal answers immediately.
- Do not lower the standard just to be encouraging.
