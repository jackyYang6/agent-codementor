#!/usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();

const files = {
  '.claude/skills/agent-codementor/SKILL.md': `# Agent CodeMentor Skill

Agent CodeMentor turns coding agents into rigorous source-code tutors, architecture reviewers, dataflow tracers, and refactor-risk examiners.

## Core Rule

Do not translate code line by line. Focus on architecture, state ownership, memory lifecycle, concurrency, cache behavior, failure paths, performance trade-offs, and refactor risk.

## Slash Command Router

- \`/learn\`: automatically select the best learning mode.
- \`/socratic\`: guided onboarding for unfamiliar modules.
- \`/hypothesis\`: critique the user's mental model and expose edge cases.
- \`/inversion\`: explain why the design is shaped this way instead of a simpler way.
- \`/dataflow\`: trace end-to-end object, request, cache, tensor, or buffer lifecycle.
- \`/interview\`: ask hard boundary questions and wait for the user's answer before grading.
- \`/refactor\`: assess risk before changing complex modules.

When a command is used, read the matching file under \`references/\` and follow it strictly.
`,
  '.claude/skills/agent-codementor/references/socratic.md': `# Skill: Socratic Onboarding

Command: \`/socratic\`

Use this when the user is entering an unfamiliar file, function, module, or subsystem.

## Goal

Help the user build a first mental map without dumping conclusions.

## Output Contract

1. **Do not read this line by line yet**: explain the module's real role in 2-4 sentences.
2. **Minimal reading path**: list 3-5 entry points in the order the user should inspect.
3. **Three concepts to hold in mind**: use engineering concepts such as ownership, scheduler state, cache lifecycle, backpressure, OOM rollback, async cancellation, or GPU buffer reuse.
4. **Guiding questions**: ask 2-3 concrete questions that force the user back into the source code.
5. **Temporarily skip**: identify boilerplate that should not distract the first pass.

## Hard Constraints

- Do not translate variable names or comments.
- Do not explain every function.
- Do not give the full answer immediately.
- Questions must be specific enough to verify in code.
`,
  '.claude/skills/agent-codementor/references/hypothesis.md': `# Skill: Hypothesis Critique

Command: \`/hypothesis\`

Use this when the user proposes a mental model, says "I think...", "Is it correct that...", or asks you to find flaws.

## Goal

Validate the user's understanding under non-happy-path conditions and expose the missing 20%.

## Output Contract

1. **Verdict first**: clearly say whether the model is correct, partially correct, or wrong.
2. **Extract hidden assumptions**: rewrite the user's claim into 3-5 assumptions.
3. **Critique each assumption**: state when it holds, when it fails, and where to verify it in source.
4. **Force edge cases**: cover at least three of cancellation, concurrency race, OOM rollback, cache invalidation, duplicate release, usage mismatch, backpressure, partial failure, multi-worker inconsistency, streaming final chunk, or speculative rollback.
5. **Corrected mental model**: rewrite the user's model in a more precise way.
6. **One verification task**: end with a concrete source-level question for the user to check.

## Hard Constraints

- Do not respond with vague encouragement like "basically right".
- Do not discuss only the happy path.
- Do not refute without source-level reasoning.
`,
  '.claude/skills/agent-codementor/references/inversion.md': `# Skill: Inversion & Taste Analysis

Command: \`/inversion\`

Use this when the user asks why the code is designed this way, why it is complex, or why a simpler implementation was not used.

## Goal

Reverse-engineer the author's trade-offs: what disasters the code prevents, what it optimizes, and what it sacrifices.

## Output Contract

1. **Conclusion first**: say what disaster this complexity is preventing.
2. **Naive design**: construct the simpler implementation the user probably has in mind.
3. **Where it breaks**: analyze failure under throughput, memory, latency, synchronization, cache reuse, fragmentation, cancellation, or rollback pressure.
4. **Defensive programming points**: identify complex-looking code that protects correctness or performance.
5. **Trade-off table**: include columns \`Design choice\`, \`Gain\`, and \`Cost\`.
6. **Taste judgment**: say whether the complexity is necessary, over-engineered, misplaced, or a reasonable compromise.

## Hard Constraints

- Do not just say "for performance".
- Do not only praise the design.
- Always compare against a simpler alternative.
- Always name the cost of the current design.
`,
  '.claude/skills/agent-codementor/references/dataflow.md': `# Skill: Dataflow Tracing

Command: \`/dataflow\`

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
7. **Text panorama**: end with a compact arrow diagram.

## Hard Constraints

- Do not explain only one function.
- Do not omit cleanup and failure paths.
- Do not confuse data structure references with ownership.
`,
  '.claude/skills/agent-codementor/references/interview.md': `# Skill: Boundary Interview

Command: \`/interview\`

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

## Hard Constraints

- Do not ask syntax questions.
- Do not ask definitions like "what is a mutex".
- Do not reveal answers immediately.
- Do not lower the standard just to be encouraging.
`,
  '.claude/skills/agent-codementor/references/refactor.md': `# Skill: Refactor Readiness

Command: \`/refactor\`

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
7. **Final recommendation**: low risk, medium risk with tests, use adapter first, or avoid unless lifecycle is redesigned.

## Hard Constraints

- Do not jump directly to a patch.
- Do not call concurrency or memory refactors simple.
- Do not omit tests.
- Do not judge only by code style.
`,
  '.claude/commands/learn.md': `---
description: Automatically choose the best Agent CodeMentor learning mode.
argument-hint: "<target, question, or understanding>"
---

Load \`.claude/skills/agent-codementor/SKILL.md\`.

Use \`/learn\` mode and automatically choose one of:

- \`/socratic\` for unfamiliar modules.
- \`/hypothesis\` for user mental-model critique.
- \`/inversion\` for design trade-off analysis.
- \`/dataflow\` for lifecycle tracing.
- \`/interview\` for boundary testing.
- \`/refactor\` for refactor risk review.

User input:
$ARGUMENTS

Do not explain code line by line. Focus on architecture, ownership, lifecycle, concurrency, memory, cache behavior, failure paths, and refactor risk.
`,
  '.claude/commands/socratic.md': `---
description: Guided onboarding for an unfamiliar source-code module.
argument-hint: "<target file, function, module, or directory>"
---

Load \`.claude/skills/agent-codementor/SKILL.md\` and follow \`references/socratic.md\`.

Target:
$ARGUMENTS

Rules:
- Do not explain line by line.
- Identify the minimal reading path.
- Extract only the core engineering concepts.
- Ask 2-3 concrete source-verifiable guiding questions.
`,
  '.claude/commands/hypothesis.md': `---
description: Critique a user's source-code mental model and expose edge cases.
argument-hint: "<your understanding or hypothesis>"
---

Load \`.claude/skills/agent-codementor/SKILL.md\` and follow \`references/hypothesis.md\`.

Hypothesis:
$ARGUMENTS

Rules:
- Verdict first.
- Extract hidden assumptions.
- Test cancellation, concurrency, OOM, cache, streaming, and partial-failure edges.
- End with one concrete source-level verification task.
`,
  '.claude/commands/inversion.md': `---
description: Analyze why code is designed this way instead of a simpler way.
argument-hint: "<target or design question>"
---

Load \`.claude/skills/agent-codementor/SKILL.md\` and follow \`references/inversion.md\`.

Target or question:
$ARGUMENTS

Rules:
- Construct the naive simpler design first.
- Explain where it breaks.
- Analyze memory, concurrency, cache, scheduling, and failure trade-offs.
- Judge whether the complexity is necessary or over-engineered.
`,
  '.claude/commands/dataflow.md': `---
description: Trace request, cache, tensor, buffer, object, or task lifecycle across the codebase.
argument-hint: "<scenario or target>"
---

Load \`.claude/skills/agent-codementor/SKILL.md\` and follow \`references/dataflow.md\`.

Scenario or target:
$ARGUMENTS

Rules:
- Pick a concrete scenario.
- Produce lifecycle table, state machine, ownership map, sync points, and arrow panorama.
- Include cleanup and failure paths.
`,
  '.claude/commands/interview.md': `---
description: Ask hard boundary questions to test source-code mastery.
argument-hint: "<target module, file, or subsystem>"
---

Load \`.claude/skills/agent-codementor/SKILL.md\` and follow \`references/interview.md\`.

Target:
$ARGUMENTS

Rules:
- Ask exactly 3 hard questions.
- Do not reveal answers immediately.
- Focus on locks, cleanup, OOM rollback, cancellation, cache edges, streaming final chunk, cross-runtime lifetime, and performance collapse.
`,
  '.claude/commands/refactor.md': `---
description: Assess refactor risk before modifying a complex module.
argument-hint: "<change idea or target>"
---

Load \`.claude/skills/agent-codementor/SKILL.md\` and follow \`references/refactor.md\`.

Change idea or target:
$ARGUMENTS

Rules:
- Do not jump directly to a patch.
- Classify the change type.
- Analyze blast radius and hidden contracts.
- Propose the minimal safe path and required tests.
- Name red lines that should not be touched lightly.
`,
  'AGENTS.md': `# Agent CodeMentor

This repository uses Agent CodeMentor conventions.

When a user starts a request with one of these commands, follow the corresponding mode:

- \`/learn\`: choose the best mode automatically.
- \`/socratic\`: guide first-pass source reading.
- \`/hypothesis\`: critique a proposed understanding.
- \`/inversion\`: analyze design trade-offs.
- \`/dataflow\`: trace lifecycle and ownership.
- \`/interview\`: ask hard boundary questions.
- \`/refactor\`: assess change risk before editing.

Avoid line-by-line explanation. Focus on architecture, lifecycle, ownership, concurrency, memory, cache behavior, failure paths, and refactor risk.
`
};

function usage() {
  console.log(`Agent CodeMentor

Usage:
  npx agent-codementor init [--claude] [--codex] [--all] [--force]
  npx agent-codementor doctor

Options:
  --claude   install Claude Code skills and commands
  --codex    install AGENTS.md router
  --all      install all supported targets
  --force    overwrite existing files
`);
}

function ensureWrite(relPath, content, force = false) {
  const abs = path.join(root, relPath);
  if (fs.existsSync(abs) && !force) {
    console.log(`skip  ${relPath}`);
    return;
  }
  fs.mkdirSync(path.dirname(abs), { recursive: true });
  fs.writeFileSync(abs, content, 'utf8');
  console.log(`${fs.existsSync(abs) ? 'write' : 'create'} ${relPath}`);
}

function install({ claude, codex, force }) {
  for (const [relPath, content] of Object.entries(files)) {
    if (relPath.startsWith('.claude/') && !claude) continue;
    if (relPath === 'AGENTS.md' && !codex) continue;
    ensureWrite(relPath, content, force);
  }

  console.log('\nAgent CodeMentor installed.');
  if (claude) console.log('Claude Code commands: /learn /socratic /hypothesis /inversion /dataflow /interview /refactor');
  if (codex) console.log('Codex router: AGENTS.md');
}

function doctor() {
  const checks = [
    '.claude/skills/agent-codementor/SKILL.md',
    '.claude/commands/learn.md',
    'AGENTS.md'
  ];
  for (const relPath of checks) {
    console.log(`${fs.existsSync(path.join(root, relPath)) ? 'ok  ' : 'miss'} ${relPath}`);
  }
}

const args = process.argv.slice(2);
const command = args[0];
const has = (flag) => args.includes(flag);

if (!command || has('--help') || has('-h')) {
  usage();
} else if (command === 'init') {
  const all = has('--all') || (!has('--claude') && !has('--codex'));
  install({
    claude: all || has('--claude'),
    codex: all || has('--codex'),
    force: has('--force')
  });
} else if (command === 'doctor') {
  doctor();
} else {
  usage();
  process.exitCode = 1;
}
