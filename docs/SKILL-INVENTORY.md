# SKILL INVENTORY — 2026-03-28

Purpose: track currently relevant skills/plugins for the lean ClawOps rollout.

---

## Already present / relevant

Installed via ClawHub previously:
- ghl-crm
- n8n
- mcporter-skill
- frontend-agent
- market-research
- market-research-agent
- sales-pipeline-tracker
- sales-mastery
- seo
- seo-competitor-analysis
- in-depth-research
- frontend-performance

Current OpenClaw plugins seen in config:
- telegram
- google
- metaclaw-openclaw
- lossless-claw
- openclaw-weixin

---

## Installed now in workspace-local skills

Location: `/root/.openclaw/workspaces/arjun/skills`

Installed successfully:
- supabase
- vercel
- cli-vercel

Notes:
- `supabase` requires `SUPABASE_URL` and `SUPABASE_SERVICE_KEY`
- `vercel` / `cli-vercel` assume Vercel CLI usage and auth

---

## Flagged / not installed automatically

Blocked by ClawHub suspicious-skill warning (not force-installed):
- supabase-ops
- supabase-manager
- vercel-deployment
- playwright-skill
- playwright-browser-automation

Decision:
- do not force-install suspicious skills blindly
- only revisit if there is a clear need and code review is worth it

---

## Immediate operating recommendation

Use now:
- ghl-crm
- github (built-in skill)
- n8n
- supabase
- vercel / cli-vercel
- telegram plugin
- metaclaw-openclaw plugin

Do not add more yet unless blocked.

---

## GHL auth requirements

Installed skill path:
- `/root/.openclaw/workspace/skills/ghl-crm`

Required env:
- `GHL_API_KEY`
- `GHL_LOCATION_ID`

Expected auth type:
- GoHighLevel Private Integration Token (API v2)

Base URL:
- `https://services.leadconnectorhq.com`

Headers used by the script:
- `Authorization: Bearer <GHL_API_KEY>`
- `Version: 2021-07-28`
- `Content-Type: application/json`
- `Accept: application/json`

Minimum practical access needed in GHL:
- contacts
- opportunities/pipelines
- conversations
- calendars/appointments
- workflows

Best next move:
- add GHL credentials safely through env/secrets
- run a harmless first test: list pipelines or list contacts
