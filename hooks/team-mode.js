#!/usr/bin/env node
// UserPromptSubmit: `/team on|off` toggles team mode for this project (flag file .team/active);
// while on, every prompt is routed to the Tech Lead playbook.
const fs = require('fs');
const path = require('path');

let input = '';
process.stdin.on('data', (c) => (input += c));
process.stdin.on('end', () => {
  let data = {};
  try { data = JSON.parse(input.replace(/^﻿/, '')); } catch { return; }
  const root = process.env.CLAUDE_PROJECT_DIR || data.cwd || process.cwd();
  const flag = path.join(root, '.team', 'active');
  const prompt = (data.prompt || '').trim().toLowerCase();
  const cmd = prompt.match(/^\/(?:software-team:)?team\s+(on|off)\b/);

  let context;
  if (cmd && cmd[1] === 'on') {
    fs.mkdirSync(path.dirname(flag), { recursive: true });
    fs.writeFileSync(flag, '');
    context = 'TEAM MODE ON for this project (persists until `/team off`). Confirm to the user in one line.';
  } else if (cmd) {
    fs.rmSync(flag, { force: true });
    context = 'TEAM MODE OFF. Back to normal behavior. Confirm to the user in one line.';
  } else if (fs.existsSync(flag) && !prompt.startsWith('/team')) {
    context = 'TEAM MODE ON: you are the Tech Lead. Handle any request that changes code through the `software-team:team` skill playbook (load it if not loaded this session; size S means you do it yourself). Questions and non-code requests: answer normally. User can disable with `/team off`.';
  }
  if (context) {
    process.stdout.write(JSON.stringify({ hookSpecificOutput: { hookEventName: 'UserPromptSubmit', additionalContext: context } }));
  }
});
