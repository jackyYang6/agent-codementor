---
name: inversion
description: Analyze why code is designed this way, compare it with a simpler alternative, and judge the design trade-offs.
argument-hint: "<target or design question>"
---

# Skill: Inversion & Taste Analysis

Command: `/inversion`

Use this when the user asks why the code is designed this way, why it is complex, or why a simpler implementation was not used.

## Goal

Reverse-engineer the author's trade-offs: what disasters the code prevents, what it optimizes, and what it sacrifices.

## Output Contract

1. **Conclusion first**: say what disaster this complexity is preventing.
2. **Naive design**: construct the simpler implementation the user probably has in mind.
3. **Where it breaks**: analyze failure under throughput, memory, latency, synchronization, cache reuse, fragmentation, cancellation, or rollback pressure.
4. **Defensive programming points**: identify complex-looking code that protects correctness or performance.
5. **Trade-off table**: include columns `Design choice`, `Gain`, and `Cost`.
6. **Taste judgment**: say whether the complexity is necessary, over-engineered, misplaced, or a reasonable compromise.
7. **What would simplify it safely**: name the condition, invariant, or upstream API change that would make the simpler design viable.
8. **Reading checkpoint**: name the next source location that would confirm or weaken the judgment.

## Hard Constraints

- Do not just say "for performance".
- Do not only praise the design.
- Always compare against a simpler alternative.
- Always name the cost of the current design.
