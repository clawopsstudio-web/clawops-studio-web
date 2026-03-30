# ClawOps Mission Control

Lean local dashboard for Henry / ClawOps HQ.

## What it shows
- Mission board / Kanban from `TASKS.md`
- Executive summary counts (P0 open, in progress, blocked, done)
- System snapshot from `docs/SYSTEM-OVERVIEW.md`
- Telegram lane map
- Agent routing + models from `~/.openclaw/openclaw.json`
- Notion assets from `docs/NOTION-INDEX.md`

## Local URL
- `http://127.0.0.1:8082/`
- also supports `/dashboard/` base path for Tailscale Serve

## Tailnet URL
- `https://vmi3094584-1.tailec7a72.ts.net/dashboard/`

## Source of truth
Current v1 is read-only and file-backed. Update these files and refresh the page:
- `TASKS.md`
- `docs/SYSTEM-OVERVIEW.md`
- `docs/NOTION-INDEX.md`
- `~/.openclaw/openclaw.json`

## Sync rule
Mission Control must stay aligned with real operating progress.

That means:
- whenever task status changes, update `TASKS.md`
- whenever infrastructure/runtime truth changes, update `docs/SYSTEM-OVERVIEW.md`
- whenever routing/models/heartbeats change, update `~/.openclaw/openclaw.json` or the relevant docs
- the UI auto-refreshes every 30 seconds, so file updates should appear automatically without manual redeploy
- chat updates alone do **not** count as sync; source-of-truth files must be updated

## Next likely upgrades
1. Inline task editing
2. Notion sync for selected boards
3. Live service health checks
4. Agent-level tool matrix view
5. GHL / Telegram operational widgets
