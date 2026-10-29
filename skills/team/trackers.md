# Tracker operations (Tech Lead only)

One item per task brief. Keep the tracker in sync at three moments: plan created, task done (after QA PASS), escalation. Store the item id/URL at the top of each `.team/tasks/T<n>.md` (`Tracker: <id>`).

## Jira (Atlassian MCP)
- Need the cloudId: `getAccessibleAtlassianResources` once; reuse it.
- Project: `tracker_project` from config, else ask (`getVisibleJiraProjects`).
- Create: `createJiraIssue` — type Task (or Story), summary = task title, description = goal + acceptance criteria. For L, create a parent/Epic for the requirement and the tasks under it.
- Progress: `getTransitionsForJiraIssue` then `transitionJiraIssue` to In Progress on dispatch, Done on QA PASS.
- Comment: one comment on close with the dev summary and QA verdict (`addCommentToJiraIssue` or `addOrEditJiraIssueComment`, whichever this session exposes).
- If no Atlassian tools are available, tell the user and fall back to chat.

## Notion (Notion MCP)
- If the Notion tools require authentication, ask the user to authenticate first; otherwise fall back to chat.
- Database: `tracker_project` from config, else search and ask which one.
- Create one page per task with properties Title, Status (To do / In progress / Done) and the acceptance criteria in the body. Update Status at the same moments as Jira.

## Chat (local board)
Maintain `.team/board.md`:

```
# <requirement>     size: M   split: fullstack
| Task | Owner | Status | QA rounds |
|------|-------|--------|-----------|
| T1 — ... | dev-backend | done | 1 |
```

Statuses: todo, in-progress, qa, done, blocked. Show the board to the user only at the start and the end.
