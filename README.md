# Agent CodeMentor

Agent CodeMentor is a source-code learning skill pack that turns coding agents like Claude Code and Codex into rigorous source-code tutors, architecture reviewers, dataflow tracers, and refactor-risk examiners.

## Install

Install one or more supported targets into the current repository:

```bash
npx agent-codementor init
```

Without a target flag, `init` asks which environments to install:

```text
? Install targets:
  1) Claude Code (.claude/skills + .claude/commands)
  2) Codex (.agents/skills + AGENTS.md)
  3) Antigravity (.agent/skills)
Enter numbers separated by comma (default: 1):
```

Claude Code only:

```bash
npx agent-codementor init --claude
```

Codex only:

```bash
npx agent-codementor init --codex
```

Antigravity only:

```bash
npx agent-codementor init --antigravity
```

All supported targets:

```bash
npx agent-codementor init --all
```

Choose generated skill language:

```bash
npx agent-codementor init --lang en
npx agent-codementor init --lang zh
```

If `--lang` is omitted, `init` asks:

```text
? Language:
  1) English
  2) 中文
Select language (1 or 2, default: 1):
```

Check installation:

```bash
npx agent-codementor doctor
```

## Repository Layout

The canonical skill sources are plain markdown files:

```text
skills/agent-codementor/en/learn/SKILL.md
skills/agent-codementor/en/socratic/SKILL.md
skills/agent-codementor/en/hypothesis/SKILL.md
skills/agent-codementor/en/inversion/SKILL.md
skills/agent-codementor/en/dataflow/SKILL.md
skills/agent-codementor/en/interview/SKILL.md
skills/agent-codementor/en/refactor/SKILL.md
skills/agent-codementor/zh/<same-stage>/SKILL.md
commands/claude/*.md
targets/codex/AGENTS.md
```

The CLI does not generate the skill body from JavaScript strings. It copies the selected language's stage skill directories into each agent's expected project-level location, so `/learn`, `/socratic`, `/hypothesis`, `/inversion`, `/dataflow`, `/interview`, and `/refactor` are separate skills.

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

Each skill is tuned to classify the target subsystem first, then anchor explanations to source evidence, failure paths, invariants, tests, and observability signals.

## Generated Files

For Claude Code:

```text
.claude/skills/learn/SKILL.md
.claude/skills/socratic/SKILL.md
.claude/skills/hypothesis/SKILL.md
.claude/skills/inversion/SKILL.md
.claude/skills/dataflow/SKILL.md
.claude/skills/interview/SKILL.md
.claude/skills/refactor/SKILL.md
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
.agents/skills/learn/SKILL.md
.agents/skills/socratic/SKILL.md
.agents/skills/hypothesis/SKILL.md
.agents/skills/inversion/SKILL.md
.agents/skills/dataflow/SKILL.md
.agents/skills/interview/SKILL.md
.agents/skills/refactor/SKILL.md
```

For Antigravity:

```text
.agent/skills/learn/SKILL.md
.agent/skills/socratic/SKILL.md
.agent/skills/hypothesis/SKILL.md
.agent/skills/inversion/SKILL.md
.agent/skills/dataflow/SKILL.md
.agent/skills/interview/SKILL.md
.agent/skills/refactor/SKILL.md
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
