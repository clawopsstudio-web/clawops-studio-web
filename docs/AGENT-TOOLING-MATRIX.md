# AGENT TOOLING MATRIX — ClawOps HQ (P0)

Last updated: 2026-03-30
Owner: Henry
Purpose: assign minimum viable tool stack per lane, then verify real access.

## Status Key
- ✅ Verified working
- 🟡 Connected but not fully verified in-lane
- ❌ Missing / blocked
- ⏳ Not tested yet

## Matrix (v2)

| Agent | Lane | Must-Have Tools | Current Status | Tonight Next Step |
|---|---|---|---|---|
| Henry | HQ / Command | Telegram topics, TASKS/Mission Control, OpenClaw config access, file-backed source of truth | 🟡 Mission Control local URL OK; dashboard service active; HQ lane already strongest | Keep docs/TASKS synced while closing open loops; do not let dashboard drift from file truth |
| Ryan | Sales / Pipeline | Telegram lane, GHL via MCP, outbound templates, approval guardrails | ✅ Lane operational; GHL read path verified; safe reversible write verified | Define the exact recurring Ryan loop: triage → tag/review → propose follow-up → await approval for outbound |
| Arjun | Research / Intel | Telegram lane, DeerFlow, web search/fetch, memory notes | ❌ Lane operational, but DeerFlow live run is blocked; endpoint responds on `127.0.0.1:2026`, yet execution fails on model auth | Fix DeerFlow/OpenRouter auth, then rerun one real research brief end-to-end and confirm output quality in-lane |
| Andrew (`dev`) | Founding Engineer | Telegram lane, architecture docs, OpenClaw config, deployment planning | 🟡 Lane operational; planning/docs path exists | Draft shortest onboarding → deployment architecture with hard dependency list for Dave/Kyle |
| Dave | DevOps / Backend | Telegram lane, host/runtime checks, Docker, gateway/runtime diagnostics, Supabase baseline | 🟡 Lane operational; service/endpoint verification still needs a clean reliability pass | Run one concise reliability baseline: core services, restart model, config paths, known weak spots |
| Kyle | Frontend / Web | Telegram lane, GitHub repo path, Vercel deploy path | 🟡 GitHub verified; test repo populated; Kyle confirmed static site is Vercel-suitable; `vercel link` identified correctly | Blocked only by Vercel auth/network in this shell; defer login/link until authenticated runtime is available |
| Tyler | Marketing / SEO | Telegram lane, content drafting stack, SEO/GEO skillset, image generation support | 🟡 Lane operational; marketing copy path validated | Produce 1-week validation content batch for the $399 AI employee offer |

## Verified State Snapshot
- Telegram lane sweep: operational enough to proceed; Arjun is safest with mention/tag.
- Ryan/Sales: real CRM workflow exists through GHL MCP with approval guardrails.
- Kyle/Frontend: GitHub push path works; test repo `clawopsstudio-web/test` now contains a minimal static site; Vercel suitability confirmed by Kyle; Vercel auth is the only blocker.
- DeerFlow: local endpoint responded successfully during runtime check, but a real LangGraph run failed because DeerFlow's model call to OpenRouter returned `401 Missing Authentication header`.
- Mission Control: local endpoint responded successfully during runtime check.
- HiClaw manager endpoint: local endpoint responded successfully during runtime check.

## Tonight Priority Order
1. Finalize this tooling matrix as the operating truth
2. Research: validate one real DeerFlow-powered Arjun brief
3. Backend/DevOps: define one reliability baseline and one Supabase baseline
4. Sales: lock the Ryan recurring operating loop
5. Marketing: produce one-week validation content batch
6. Frontend/Vercel: defer until authenticated runtime is available

## Verification Rule
Do not mark any tool as ✅ until a lane-specific real task is completed using that tool.

## Hard Blockers / Caveats
- Vercel is still not authenticated in this runtime, so `vercel link` cannot complete here yet.
- Full topic memory isolation and long-run autonomous reliability are still not proven.
- Service names can drift from assumptions; prefer endpoint/runtime verification over guessed systemd unit names.
