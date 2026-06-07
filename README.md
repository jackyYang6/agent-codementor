# Agent CodeMentor

Agent CodeMentor is a source-code learning skill pack that turns coding agents like Claude Code and Codex into rigorous source-code tutors, architecture reviewers, dataflow tracers, and refactor-risk examiners.

## Install

Install all supported targets into the current repository:

```bash
npx agent-codementor init
```

Claude Code only:

```bash
npx agent-codementor init --claude
```

Codex / AGENTS.md only:

```bash
npx agent-codementor init --codex
```

Check installation:

```bash
npx agent-codementor doctor
```

## Daily Usage

Use one short command instead of long prompts:

```text
/socratic @src/runtime.rs
```

```text
/hypothesis I think prefix cache hit means no new KV blocks are allocated. Critique this.
```

```text
/inversion Why does this block manager use refcount instead of copying?
```

```text
/dataflow Trace a streaming request from router to final usage response.
```

```text
/interview @src/prefix_cache.rs
```

```text
/refactor I want to replace prefix cache with a radix tree. Review the risk first.
```

## Skills

- `/learn`: automatically select the best learning mode.
- `/socratic`: guided onboarding for unfamiliar modules.
- `/hypothesis`: critique the user's mental model and expose edge cases.
- `/inversion`: explain why the design is shaped this way instead of a simpler way.
- `/dataflow`: trace end-to-end object, request, cache, tensor, or buffer lifecycle.
- `/interview`: ask hard boundary questions and wait for the user's answer before grading.
- `/refactor`: assess risk before changing complex modules.

## Generated Files

For Claude Code:

```text
.claude/skills/agent-codementor/SKILL.md
.claude/skills/agent-codementor/references/*.md
.claude/commands/learn.md
.claude/commands/socratic.md
.claude/commands/hypothesis.md
.claude/commands/inversion.md
.claude/commands/dataflow.md
.claude/commands/interview.md
.claude/commands/refactor.md
```

For Codex-style project guidance:

```text
AGENTS.md
```

## Philosophy

Do not let coding agents become code-paraphrasing machines.

Agent CodeMentor pushes them to focus on:

- architecture and entry points
- ownership and lifecycle
- memory and cache behavior
- concurrency and backpressure
- failure paths and OOM rollback
- performance trade-offs
- refactor blast radius

## License

MIT
