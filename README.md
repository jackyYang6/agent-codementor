# Agent CodeMentor

Agent CodeMentor is a source-code learning skill pack that turns coding agents like Claude Code and Codex into rigorous source-code tutors, architecture reviewers, dataflow tracers, and refactor-risk examiners.

## Install

Install one or more supported targets into the current repository:

```bash
npx github:jackyYang6/agent-codementor init
```

This repository is not published to the npm registry yet, so the install command uses the GitHub package spec. After an npm publish, the shorter `npx agent-codementor init` form can be used.

Without a target flag, `init` asks which environments to install:

```text
? Install targets:
› [✓] Claude Code (.claude/skills + .claude/commands)
  [ ] Codex (.agents/skills + AGENTS.md)
  [ ] Antigravity (.agent/skills)
Use ↑/↓ to move, space to toggle, enter to confirm.
```

Claude Code only:

```bash
npx github:jackyYang6/agent-codementor init --claude
```

Codex only:

```bash
npx github:jackyYang6/agent-codementor init --codex
```

Antigravity only:

```bash
npx github:jackyYang6/agent-codementor init --antigravity
```

All supported targets:

```bash
npx github:jackyYang6/agent-codementor init --all
```

Choose generated skill language:

```bash
npx github:jackyYang6/agent-codementor init --lang en
npx github:jackyYang6/agent-codementor init --lang zh
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
npx github:jackyYang6/agent-codementor doctor
```

## Repository Layout

The canonical skill sources are plain markdown files:

```text
skills/agent-codementor/en/acm-learn/SKILL.md
skills/agent-codementor/en/acm-socratic/SKILL.md
skills/agent-codementor/en/acm-hypothesis/SKILL.md
skills/agent-codementor/en/acm-inversion/SKILL.md
skills/agent-codementor/en/acm-dataflow/SKILL.md
skills/agent-codementor/en/acm-interview/SKILL.md
skills/agent-codementor/en/acm-refactor/SKILL.md
skills/agent-codementor/zh/acm-<stage>/SKILL.md
commands/claude/*.md
targets/codex/AGENTS.md
```

The CLI does not generate the skill body from JavaScript strings. It copies the selected language's stage skill directories into each agent's expected project-level location, so `/acm-learn`, `/acm-socratic`, `/acm-hypothesis`, `/acm-inversion`, `/acm-dataflow`, `/acm-interview`, and `/acm-refactor` are separate skills.

## Daily Usage

Use one short command instead of long prompts:

```text
/acm-socratic @src/runtime.rs
```

```text
/acm-hypothesis I think prefix cache hit means no new KV blocks are allocated. Critique this.
```

```text
/acm-inversion Why does this block manager use refcount instead of copying?
```

```text
/acm-dataflow Trace a streaming request from router to final usage response.
```

```text
/acm-interview @src/prefix_cache.rs
```

```text
/acm-refactor I want to replace prefix cache with a radix tree. Review the risk first.
```

## Skills

- `/acm-learn`: automatically select the best learning mode.
- `/acm-socratic`: guided onboarding for unfamiliar modules.
- `/acm-hypothesis`: critique the user's mental model and expose edge cases.
- `/acm-inversion`: explain why the design is shaped this way instead of a simpler way.
- `/acm-dataflow`: trace end-to-end object, request, cache, tensor, or buffer lifecycle.
- `/acm-interview`: ask hard boundary questions and wait for the user's answer before grading.
- `/acm-refactor`: assess risk before changing complex modules.

Each skill is tuned to classify the target subsystem first, then anchor explanations to source evidence, failure paths, invariants, tests, and observability signals.

## Generated Files

For Claude Code:

```text
.claude/skills/acm-learn/SKILL.md
.claude/skills/acm-socratic/SKILL.md
.claude/skills/acm-hypothesis/SKILL.md
.claude/skills/acm-inversion/SKILL.md
.claude/skills/acm-dataflow/SKILL.md
.claude/skills/acm-interview/SKILL.md
.claude/skills/acm-refactor/SKILL.md
.claude/commands/acm-learn.md
.claude/commands/acm-socratic.md
.claude/commands/acm-hypothesis.md
.claude/commands/acm-inversion.md
.claude/commands/acm-dataflow.md
.claude/commands/acm-interview.md
.claude/commands/acm-refactor.md
```

For Codex-style project guidance:

```text
AGENTS.md
.agents/skills/acm-learn/SKILL.md
.agents/skills/acm-socratic/SKILL.md
.agents/skills/acm-hypothesis/SKILL.md
.agents/skills/acm-inversion/SKILL.md
.agents/skills/acm-dataflow/SKILL.md
.agents/skills/acm-interview/SKILL.md
.agents/skills/acm-refactor/SKILL.md
```

For Antigravity:

```text
.agent/skills/acm-learn/SKILL.md
.agent/skills/acm-socratic/SKILL.md
.agent/skills/acm-hypothesis/SKILL.md
.agent/skills/acm-inversion/SKILL.md
.agent/skills/acm-dataflow/SKILL.md
.agent/skills/acm-interview/SKILL.md
.agent/skills/acm-refactor/SKILL.md
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
