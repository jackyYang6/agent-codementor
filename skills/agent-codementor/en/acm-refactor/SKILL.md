---
name: acm-refactor
description: Assess refactor risk before modifying a complex module, including blast radius, hidden contracts, tests, and observability.
argument-hint: "<change idea or target>"
---

# Skill: Refactor Readiness

Command: `/acm-refactor`

Use this before the user modifies, replaces, optimizes, or inserts logic into a complex subsystem.

## Goal

Assess risk before code changes. Prefer minimal safe changes over broad rewrites.

## Output Contract

1. **Classify change type**: local replacement, data structure replacement, scheduler policy change, memory management change, async model change, cross-language boundary change, kernel replacement, API behavior change, statistics/logging change, semantic change, or performance-only change.
2. **Blast radius table**: include API I/O, request lifecycle, scheduler, cache/memory pool, async return, error handling, multi-worker, tests, and observability.
3. **Hidden contracts**: identify invariants such as monotonic fields, manager-only release, refcount updates, device alignment, final usage placement, cleanup on cancellation, or recoverable error conversion.
4. **Minimal safe path**: propose the smallest change that preserves existing structures and rollback/cleanup paths.
5. **Required tests**: happy path, extreme length, concurrent requests, cancellation, OOM/allocation failure, cache hit/miss, streaming final chunk, multi-device/worker, and performance regression.
6. **Red lines**: clearly name logic that should not be touched lightly.
7. **Learning value**: explain which subsystem contract the user should understand before editing.
8. **Instrumentation check**: identify logs, metrics, traces, counters, or benchmarks that would show the change is behaving correctly.
9. **Final recommendation**: low risk, medium risk with tests, use adapter first, or avoid unless lifecycle is redesigned.

## Hard Constraints

- Do not jump directly to a patch.
- Do not call concurrency or memory refactors simple.
- Do not omit tests.
- Do not judge only by code style.
