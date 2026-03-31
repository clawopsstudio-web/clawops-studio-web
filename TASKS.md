# TASKS — ClawOps HQ

Purpose: single operating backlog for Henry / ClawOps Studio.

Status legend:
- TODO
- DOING
- BLOCKED
- DONE
- DEFERRED

Priority legend:
- P0 = revenue / launch blocker
- P1 = important this week
- P2 = useful but not urgent

---

## Operating Priorities

1. Stabilize Telegram lanes
2. Connect money-making tools
3. Make Henry autonomous with clear task + check loops
4. Automate recurring checks and reporting
5. Use HiClaw / MetaClaw only where they add practical value now
6. Decide whether LobsterBoard is needed now or later
7. Connect GoHighLevel (GHL)
8. Set up tools, app access, and skills for each agent
9. Start with Frontend lane: GitHub + Vercel deployment flow
10. Set up backend baseline (Supabase or insforge.dev)
11. Build 1-click Contabo deployment + profile-based stack shaping
12. Start outbound validation and content engine (social outreach + X build-in-public)

---

## Current 5-Sequence Execution Order

1. **Dave — reliability baseline (live runtime truth)**
   - Confirm core services, restart model, config paths, and top weak spots.
   - Output: one concise reliability baseline that reflects the actual machine, not assumptions.

2. **Dave — backend foundation live-connect pass**
   - Take the already-documented backend direction (Supabase/database/auth) and convert it into a real connection plan.
   - Include: actual credential path, first project/environment target, database ownership model, auth approach, and what still blocks live use.

3. **Dave — payments + backend event path**
   - Define the first practical payment integration path.
   - Include: provider choice, webhook flow, success event handling, onboarding trigger, and required secrets/env layout.

4. **Andrew + Dave — AI logic / system architecture freeze**
   - Freeze the clean boundary between OpenClaw runtime, backend/database, automation/webhooks, and per-client deployment logic.
   - Output: one practical architecture spec that avoids spaghetti before more build work starts.

5. **Ryan + Tyler — execution loops**
   - Ryan: lock the recurring sales workflow (triage → review/tag → propose follow-up → approval for outbound).
   - Tyler: produce the first 1-week content batch for the offer using the now-frozen system story.

Notes:
- **Deferred backlog for later:** DeerFlow, Paperclip, Vercel link.
- If any sequence reveals a real blocker, update this file immediately so Mission Control stays honest.

## Active Queue

### P0 — Revenue / Operating Core

- [DONE] **Stabilize Telegram lane operations**
  - Owner: Henry
  - Goal: confirm HQ, Sales, Research, Founding Engineer, DevOps, Frontend, Marketing all operate cleanly in Telegram topics
  - Definition of done:
    - each lane has pinned role/rules text
    - each lane responds to a test prompt
    - safe trigger pattern is documented
    - known limitations are documented (especially topic isolation)
  - Final sweep result: Ryan = PASS, Arjun = PASS (mention safest), Andrew / Founding Engineer = PASS, Dave = PASS, Kyle = PASS, Tyler = PASS
  - Notes: Ryan stale identity fixed, Tyler TTS leakage fixed, and Dev/Dave split cleaned so topic 27 is Andrew (Founding Engineer) while topic 29 remains Dave (DevOps / Backend)
  - Remaining caveat: topic memory isolation and long-run autonomous reliability are still not fully proven, but lane behavior is operationally good enough to proceed
  - Next action: move to GHL read-only validation as the next P0 blocker

- [DONE] **Connect GoHighLevel (GHL)**
  - Owner: Henry
  - Goal: get CRM connectivity working for pipeline, contacts, opportunities, and follow-up workflows
  - Definition of done:
    - auth path chosen
    - credentials requirements documented
    - working connection test completed
    - first useful workflow identified
  - Final state: local secrets are present; raw API path still returns Cloudflare 403; MCP is the working path. Read-only MCP calls succeeded from the VPS for `locations_get-location`, `opportunities_get-pipelines`, `contacts_get-contacts`, and `opportunities_search-opportunity`.
  - Ryan validation: Ryan completed a real lane task using GHL read-only mode, produced a useful CRM cleanup brief, then proposed and executed one safe reversible write on example contact `Sc5W3jnjYc21MLcCjU5d` by adding tag `test-tag-ryan`.
  - Notes: this is enough to treat Sales + GHL as operational for controlled use. Continue with human-approved, low-risk actions before broader automation or outbound sending.
  - Next action: move to the next live tool validation (Kyle GitHub→Vercel or Arjun DeerFlow brief)

- [DOING] **Create autonomy system v1**
  - Owner: Henry
  - Goal: stop needing constant manual prompting from Pulkit
  - Definition of done:
    - TASKS.md exists
    - AUTONOMY-RULES.md exists
    - recurring checks are defined
    - cron plan exists
    - HQ cron jobs deliver into HQ topic
    - 7 core agents have quiet lane heartbeats
    - Mission Control stays synced from source-of-truth files as work progresses
  - Next action: verify live behavior in Telegram over 1-2 days, then tighten prompts/frequency based on signal quality while keeping Mission Control synced to actual progress

- [DOING] **Set up per-agent tools, app access, and skills**
  - Owner: Henry
  - Goal: give each lane the minimum working stack needed to execute without babysitting
  - Definition of done:
    - tool map exists for all 7 agents
    - each agent has a preferred execution path documented (direct API, MCP, n8n, browser automation)
    - required credentials/app access list is documented
    - first high-value tool is connected per agent where possible
  - Current truth: tooling matrix refreshed in `docs/AGENT-TOOLING-MATRIX.md`. Sales is validated. Frontend path is clarified: GitHub works, test repo is populated, Kyle confirmed Vercel suitability, but `vercel link` is blocked in this shell by missing Vercel auth/network. Lane sweep is operationally good enough.
  - Next action: keep the tooling matrix as the source of truth, but treat DeerFlow, Paperclip, and Vercel link as deferred backlog items for now. Move immediately to Backend/DevOps baseline, then lock Ryan's recurring operating loop, then produce Tyler's first 1-week content batch.

### P1 — Automation / Delivery

- [DOING] **Set recurring executive checks**
  - Owner: Henry
  - Goal: automatic reviews of pipeline, blockers, and system status
  - Definition of done:
    - morning review cadence defined
    - follow-up sweep cadence defined
    - end-of-day summary cadence defined
    - HQ topic receives the updates reliably
  - Next action: watch for timeout/noise failure modes and trim prompts if needed

- [DOING] **Use HiClaw in a narrow, practical way**
  - Owner: Henry
  - Goal: test whether HiClaw adds useful agent-to-agent coordination without becoming overhead
  - Definition of done:
    - one real collaboration use case chosen
    - clear keep-or-skip decision made
  - Current state: HiClaw services are live locally (manager, console, matrix web)
  - Next action: define one lightweight pilot use case tied to Telegram lane work

- [TODO] **Use MetaClaw as an improvement loop, not a blocker**
  - Owner: Henry
  - Goal: improve weak workflows after execution starts
  - Definition of done:
    - one repeatable failure/improvement loop chosen
    - one workflow selected for optimization
  - Current state: MetaClaw plugin/storage is active; no focused improvement loop selected yet
  - Next action: pick a single target workflow (e.g. Telegram lane reliability, onboarding, or lead follow-up)

- [TODO] **Decide LobsterBoard timing**
  - Owner: Henry
  - Goal: decide whether LobsterBoard is needed now
  - Definition of done:
    - yes-now / later decision documented
    - if yes, define exact purpose
  - Next action: treat as DEFERRED unless it directly helps sales or operations this week

- [DEFERRED] **Set up Frontend lane for shipping**
  - Owner: Henry / Kyle
  - Goal: make Frontend lane able to ship web work with version control and deployment
  - Definition of done:
    - GitHub workflow is chosen
    - repo access path is defined
    - Vercel deployment path is defined
    - first deploy flow is tested
  - Current state: GitHub path works, test repo is populated, and Vercel suitability is confirmed; only Vercel auth/network in this runtime is missing.
  - Next action: revisit later when an authenticated Vercel runtime is available, then complete `vercel link` and first deploy flow.

- [DONE] **Set backend baseline (Supabase)**
  - Owner: Henry / Dev / Dave
  - Goal: use Supabase as the default backend stack for client systems and internal productization
  - Definition of done:
    - Supabase credentials/access path documented ✅
    - first working baseline scaffold defined ✅
    - initial schema/storage/auth approach chosen ✅
  - Final state: Complete baseline documented in `docs/SUPABASE-BASELINE.md` including environment template, core schema (clients, projects, tasks), vector search setup, and security configuration. Supabase skill is fully functional with comprehensive CRUD operations, vector search, and SQL capabilities.
  - Next action: Create actual Supabase project and set credentials when ready for client deployment

- [DEFERRED] **Arjun + DeerFlow research integration**
  - Owner: Henry / Arjun
  - Goal: make DeerFlow available as a usable research/workflow service for Arjun's research lane
  - Definition of done:
    - local service is up ✅
    - access URL: `http://127.0.0.1:2026` ✅
    - real research run succeeds end-to-end
    - output is useful enough to justify keeping DeerFlow in the active stack
  - Current state: service is reachable, but a real LangGraph run failed because DeerFlow's OpenRouter call returned `401 Missing Authentication header`. We are intentionally parking this until later instead of keeping it on tonight's critical path.
  - Next action: revisit later, wire valid `OPENROUTER_API_KEY`, restart DeerFlow, and run one revenue-relevant research brief before promoting it back into active use.

- [TODO] **Build 1-click Contabo deployment path**
  - Owner: Henry / Dev / Dave
  - Goal: provision VPS + install stack + shape agent system from a client business profile/persona
  - Definition of done:
    - Contabo API flow is documented
    - onboarding inputs are defined
    - stack generation plan exists
    - first deployment pipeline skeleton exists
  - Next action: define required onboarding fields and deployment stages from form -> VPS -> stack -> agent setup

- [DONE] **Create outbound validation engine**
  - Owner: Henry / Ryan / Tyler
  - Goal: generate early momentum and validate the $399/mo offer
  - Definition of done:
    - target channels chosen (Facebook groups, Skool, LinkedIn, X) ✅
    - outreach/content cadence defined ✅
    - offer positioning drafted ✅
    - first batch of posts/outreach drafts prepared ✅
  - Final state: Complete 7-day validation engine documented in `docs/OUTBOUND-VALIDATION-PLAN.md` including offer positioning ("Free AI Employee Assessment + 7-Day Efficiency Audit"), target channel strategy, content templates, and success metrics. Plan addresses empty revenue trackers and provides concrete validation path for $399/mo offer.
  - Next action: Execute 7-day outreach campaign to generate early momentum and collect conversion data

### P2 — Structure / Documentation

- [DEFERRED] **Revisit Paperclip later**
  - Owner: Henry
  - Goal: restore it only after Telegram + tools + autonomy are working
  - Current state: explicitly off the critical path; backlog only.
  - Next action: ignore for now unless it blocks live work

---

## Weekly Revenue Trackers

- Leads contacted: Validation engine ready (target 10+ assessments)
- Follow-ups due: 7-day campaign starting [date]
- Active opportunities: Validation offer ready for deployment
- Blocked deals: None identified
- Tool integrations completed: GHL, Supabase, Sales lane

---

## Decision Log

- Current operating stack: Telegram + OpenClaw first; Paperclip deferred
- HiClaw: optional collaboration layer, use narrowly
- MetaClaw: optimization layer, not core orchestration
- LobsterBoard: likely useful later; not automatically required now
- GHL: priority integration because it touches revenue directly
