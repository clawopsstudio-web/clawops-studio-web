# AGENT TOOLING MATRIX — ClawOps HQ (P0)

Last updated: 2026-03-29
Owner: Henry
Purpose: assign minimum viable tool stack per lane, then verify real access.

## Status Key
- ✅ Verified working
- 🟡 Connected but not fully verified in-lane
- ❌ Missing / blocked
- ⏳ Not tested yet

## Matrix (v1)

| Agent | Lane | Must-Have Tools | Current Status | Next Verification Step |
|---|---|---|---|---|
| Henry | HQ / Command | Telegram topics, TASKS/Mission Control, OpenClaw config access | 🟡 | Validate 1 full daily loop: prioritize → delegate → close update |
| Ryan | Sales / Pipeline | Telegram lane, GHL (contacts/opps), outbound templates | 🟡 MCP read-only verified | Turn read-only GHL access into a real Ryan flow: contact triage / follow-up review |
| Arjun | Research / Intel | Telegram lane, DeerFlow, web search/fetch, memory notes | 🟡 | Execute one research brief end-to-end and post summary in lane |
| Andrew (`dev`) | Founding Engineer | Telegram lane, architecture docs, OpenClaw config, deployment planning | 🟡 | Draft onboarding→deployment path and validate with Dave/Kyle dependencies |
| Dave | DevOps / Backend | Telegram lane, host/runtime checks, Docker, gateway diagnostics | 🟡 | Run reliability checklist and post PASS/FAIL + fixes |
| Kyle | Frontend / Web | Telegram lane, GitHub repo path, Vercel deploy path | ❌ (Vercel not connected) | Verify GitHub→Vercel first deploy flow |
| Tyler | Marketing / SEO | Telegram lane, content drafting stack, SEO/GEO skillset | ⏳ | Produce 1-week content batch mapped to offer validation |

## P0 Focus Order
1. Frontend (Kyle) — ship path (GitHub + Vercel)
2. Sales (Ryan) — GHL read-only path verified
3. Research (Arjun) — DeerFlow research task validated

## Verification Rule
Do not mark any tool as ✅ until a lane-specific real task is completed using that tool.

## Blocking Dependencies
- GHL: credentials/path exist but operational call path still needs final verification.
- Vercel: not connected yet.
- Non-HQ lane behavior: lane sweep still required for confident day-to-day execution.
