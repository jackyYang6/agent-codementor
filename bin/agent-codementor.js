#!/usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';
import readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';
import { fileURLToPath } from 'node:url';

const root = process.cwd();
const packageRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const skillName = 'agent-codementor';
const supportedLangs = new Set(['en', 'zh']);
const modeSkills = [
  'learn',
  'socratic',
  'hypothesis',
  'inversion',
  'dataflow',
  'interview',
  'refactor'
];

const targets = {
  claude: {
    option: '1',
    description: 'Claude Code (.claude/skills + .claude/commands)'
  },
  codex: {
    option: '2',
    description: 'Codex (.agents/skills + AGENTS.md)'
  },
  antigravity: {
    option: '3',
    description: 'Antigravity (.agent/skills)'
  }
};

function usage() {
  console.log(`Agent CodeMentor

Usage:
  npx agent-codementor init [--claude] [--codex] [--antigravity] [--all] [--lang en|zh] [--force]
  npx agent-codementor doctor

Options:
  --claude        install Claude Code skills and commands
  --codex         install Codex skills and AGENTS.md router
  --antigravity   install Antigravity skills
  --all           install all supported targets
  --lang en|zh    choose generated skill language
  --force         overwrite existing files
`);
}

function sourcePath(...parts) {
  return path.join(packageRoot, ...parts);
}

function ensureSourceExists(absPath) {
  if (!fs.existsSync(absPath)) {
    throw new Error(`Missing package source: ${path.relative(packageRoot, absPath)}`);
  }
}

function ensureWrite(relPath, content, force = false) {
  const abs = path.join(root, relPath);
  const existed = fs.existsSync(abs);
  if (existed && !force) {
    console.log(`skip  ${relPath}`);
    return;
  }
  fs.mkdirSync(path.dirname(abs), { recursive: true });
  fs.writeFileSync(abs, content, 'utf8');
  console.log(`${existed ? 'write' : 'create'} ${relPath}`);
}

function listFilesRecursive(absDir) {
  ensureSourceExists(absDir);
  const out = [];
  for (const entry of fs.readdirSync(absDir, { withFileTypes: true })) {
    const abs = path.join(absDir, entry.name);
    if (entry.isDirectory()) {
      out.push(...listFilesRecursive(abs));
    } else if (entry.isFile()) {
      out.push(abs);
    }
  }
  return out.sort();
}

function copySourceTree(sourceDir, targetDir, force) {
  for (const absFile of listFilesRecursive(sourceDir)) {
    const relInside = path.relative(sourceDir, absFile);
    const relTarget = path.join(targetDir, relInside);
    ensureWrite(relTarget, fs.readFileSync(absFile, 'utf8'), force);
  }
}

function installModeSkills(targetSkillsDir, lang, force) {
  for (const mode of modeSkills) {
    copySourceTree(
      sourcePath('skills', skillName, lang, mode),
      path.join(targetSkillsDir, mode),
      force
    );
  }
}

function installClaude(lang, force) {
  installModeSkills(path.join('.claude', 'skills'), lang, force);
  copySourceTree(sourcePath('commands', 'claude'), path.join('.claude', 'commands'), force);
}

function installCodex(lang, force) {
  installModeSkills(path.join('.agents', 'skills'), lang, force);
  const agentsSource = sourcePath('targets', 'codex', 'AGENTS.md');
  ensureWrite('AGENTS.md', fs.readFileSync(agentsSource, 'utf8'), force);
}

function installAntigravity(lang, force) {
  installModeSkills(path.join('.agent', 'skills'), lang, force);
}

function install(selectedTargets, lang, force) {
  if (selectedTargets.claude) installClaude(lang, force);
  if (selectedTargets.codex) installCodex(lang, force);
  if (selectedTargets.antigravity) installAntigravity(lang, force);

  console.log('\nAgent CodeMentor installed.');
  if (selectedTargets.claude) console.log('Claude Code: .claude/skills/{learn,socratic,hypothesis,inversion,dataflow,interview,refactor} + .claude/commands');
  if (selectedTargets.codex) console.log('Codex: .agents/skills/{learn,socratic,hypothesis,inversion,dataflow,interview,refactor} + AGENTS.md');
  if (selectedTargets.antigravity) console.log('Antigravity: .agent/skills/{learn,socratic,hypothesis,inversion,dataflow,interview,refactor}');
}

function doctor() {
  const checks = [
    '.claude/commands/learn.md',
    'AGENTS.md'
  ];
  for (const mode of modeSkills) {
    checks.push(`.claude/skills/${mode}/SKILL.md`);
    checks.push(`.agents/skills/${mode}/SKILL.md`);
    checks.push(`.agent/skills/${mode}/SKILL.md`);
  }
  for (const relPath of checks) {
    console.log(`${fs.existsSync(path.join(root, relPath)) ? 'ok  ' : 'miss'} ${relPath}`);
  }
}

function optionValue(args, name) {
  const index = args.indexOf(name);
  if (index === -1) return undefined;
  return args[index + 1];
}

function parseTargetSelection(value) {
  const selected = { claude: false, codex: false, antigravity: false };
  const parts = value.split(',').map((part) => part.trim()).filter(Boolean);
  for (const part of parts) {
    const target = Object.entries(targets).find(([, config]) => config.option === part)?.[0];
    if (!target) return undefined;
    selected[target] = true;
  }
  return Object.values(selected).some(Boolean) ? selected : undefined;
}

async function promptForTargets() {
  const rl = readline.createInterface({ input, output });
  try {
    console.log('? Install targets:');
    for (const config of Object.values(targets)) {
      console.log(`  ${config.option}) ${config.description}`);
    }
    const answer = await rl.question('Enter numbers separated by comma (default: 1): ');
    return parseTargetSelection(answer.trim() || '1');
  } finally {
    rl.close();
  }
}

async function promptForLanguage() {
  const rl = readline.createInterface({ input, output });
  try {
    console.log('? Language:');
    console.log('  1) English');
    console.log('  2) 中文');
    const answer = await rl.question('Select language (1 or 2, default: 1): ');
    const normalized = answer.trim() || '1';
    if (normalized === '1') return 'en';
    if (normalized === '2') return 'zh';
    return undefined;
  } finally {
    rl.close();
  }
}

function targetsFromArgs(args) {
  if (args.includes('--all')) {
    return { claude: true, codex: true, antigravity: true };
  }

  const selected = {
    claude: args.includes('--claude'),
    codex: args.includes('--codex'),
    antigravity: args.includes('--antigravity')
  };

  return Object.values(selected).some(Boolean) ? selected : undefined;
}

async function main() {
  const args = process.argv.slice(2);
  const command = args[0];
  const has = (flag) => args.includes(flag);

  if (!command || has('--help') || has('-h')) {
    usage();
    return;
  }

  if (command === 'init') {
    const selectedTargets = targetsFromArgs(args) ?? await promptForTargets();
    if (!selectedTargets) {
      console.error('Invalid install target selection.');
      process.exitCode = 1;
      return;
    }

    const langArg = optionValue(args, '--lang');
    const lang = langArg ?? await promptForLanguage();
    if (!supportedLangs.has(lang)) {
      console.error('Invalid language. Use --lang en or --lang zh.');
      process.exitCode = 1;
      return;
    }

    try {
      install(selectedTargets, lang, has('--force'));
    } catch (error) {
      console.error(error.message);
      process.exitCode = 1;
    }
    return;
  }

  if (command === 'doctor') {
    doctor();
    return;
  }

  usage();
  process.exitCode = 1;
}

await main();
