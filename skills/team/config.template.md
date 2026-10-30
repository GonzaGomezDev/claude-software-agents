---
# software-team config — edit freely, the Tech Lead reads this at the start of every /team run
tracker: ask          # ask | jira | notion | chat
tracker_project:      # Jira project key, Notion database name/URL, or empty for chat
dev_split: auto       # auto (split only large cross-layer work) | fullstack (one dev, cheapest) | front-back (always split cross-layer work)
dev_model: sonnet     # inherit (session model) | opus | sonnet | haiku — pick what your plan/budget allows
dev_effort: high      # low | medium | high | xhigh
qa_model: opus        # inherit | opus | sonnet | haiku
qa_effort: medium     # with qa_model: sonnet, use high
max_fix_rounds: 3     # QA fail -> dev fix rounds before escalating to you
frontend_skills:      # skills the frontend dev loads before UI work, comma-separated, e.g. frontend-design:frontend-design
ui_url:               # local URL where the UI runs (e.g. http://localhost:3000), used by QA for the visual check
ui_auth:              # optional Playwright storage state for pages behind login (e.g. .team/auth.json)
pr: off               # on = after QA PASS the Tech Lead commits on team/<slug>, pushes and opens a ready-for-review PR with screenshots (needs gh >= 2.99)
pr_base:              # PR base branch; empty = repo default
---

Project notes for the team (stack, test commands, conventions) go below — keep it short, every agent brief may reference it.
