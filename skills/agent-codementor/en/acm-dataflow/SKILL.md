---
name: acm-dataflow
description: Trace request, cache, tensor, buffer, object, or task lifecycle across modules, ownership boundaries, sync points, and failure paths.
argument-hint: "<scenario or target>"
---

# Skill: Dataflow Tracing

Command: `/acm-dataflow`

Use this when the user wants to trace a request, tensor, buffer, cache entry, task, stream chunk, or object lifecycle.

## Goal

Build an end-to-end mental model of how data and state evolve across modules, runtimes, and failure paths.

## Output Contract

1. **Concrete scenario**: choose or restate one specific scenario to trace.
2. **Lifecycle table**: include stages, entry function, core structure, state change, and resource change.
3. **State machine**: show normal states and exceptional states such as cancellation, OOM rollback, channel close, or client disconnect.
4. **Ownership map**: explain who owns resources, who borrows views, who holds indices or handles, and who releases.
5. **Runtime/language boundary**: if relevant, identify copies, pointers, FFI handles, CUDA stream sync, host-device transfer, or GIL/runtime boundaries.
6. **Blocking/sync points**: explicitly mark locks, awaits, channel sends, barriers, allocation, host-device copies, and synchronizations.
7. **Failure replay**: replay one realistic failure path and show cleanup or leak risk.
8. **Test evidence**: point to the test, benchmark, or missing test that would validate the traced lifecycle.
9. **Text panorama**: end with a compact arrow diagram.

## Hard Constraints

- Do not explain only one function.
- Do not omit cleanup and failure paths.
- Do not confuse data structure references with ownership.
