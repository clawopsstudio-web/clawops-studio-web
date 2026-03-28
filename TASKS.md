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

## Active Queue

### P0 — Revenue / Operating Core

- [DOING] **Stabilize Telegram lane operations**
  - Owner: Henry
  - Goal: confirm HQ, Sales, Research, Dev, DevOps, Frontend, Marketing all operate cleanly in Telegram topics
  - Definition of done:
    - each lane has pinned role/rules text
    - each lane responds to a test prompt
    - safe trigger pattern is documented
    - known limitations are documented (especially topic isolation)
  - Next action: run one validation sweep across all lanes and record what works vs fails

- [TODO] **Connect GoHighLevel (GHL)**
  - Owner: Henry
  - Goal: get CRM connectivity working for pipeline, contacts, opportunities, and follow-up workflows
  - Definition of done:
    - auth path chosen
    - credentials requirements documented
    - working connection test completed
    - first useful workflow identified
  - Next action: verify best integration path (skill vs MCP vs API) and required credentials

- [TODO] **Create autonomy system v1**
  - Owner: Henry
  - Goal: stop needing constant manual prompting from Pulkit
  - Definition of done:
    - TASKS.md exists
    - AUTONOMY-RULES.md exists
    - recurring checks are defined
    - cron plan exists
  - Next action: done for files; next is wiring execution behavior into heartbeat/cron safely

- [TODO] **Set up per-agent tools, app access, and skills**
  - Owner: Henry
  - Goal: give each lane the minimum working stack needed to execute without babysitting
  - Definition of done:
    - tool map exists for all 7 agents
    - each agent has a preferred execution path documented (direct API, MCP, n8n, browser automation)
    - required credentials/app access list is documented
    - first high-value tool is connected per agent where possible
  - Next action: create an agent tooling matrix and start with Frontend, Sales, and Research

### P1 — Automation / Delivery

- [TODO] **Set recurring executive checks**
  - Owner: Henry
  - Goal: automatic reviews of pipeline, blockers, and system status
  - Definition of done:
    - morning review cadence defined
    - follow-up sweep cadence defined
    - end-of-day summary cadence defined
  - Next action: implement via HEARTBEAT.md and/or cron schedule

- [TODO] **Use HiClaw in a narrow, practical way**
  - Owner: Henry
  - Goal: test whether HiClaw adds useful agent-to-agent coordination without becoming overhead
  - Definition of done:
    - one real collaboration use case chosen
    - clear keep-or-skip decision made
  - Next action: define one lightweight pilot use case tied to Telegram lane work

- [TODO] **Use MetaClaw as an improvement loop, not a blocker**
  - Owner: Henry
  - Goal: improve weak workflows after execution starts
  - Definition of done:
    - one repeatable failure/improvement loop chosen
    - one workflow selected for optimization
  - Next action: pick a single target workflow (e.g. Telegram lane reliability, onboarding, or lead follow-up)

- [TODO] **Decide LobsterBoard timing**
  - Owner: Henry
  - Goal: decide whether LobsterBoard is needed now
  - Definition of done:
    - yes-now / later decision documented
    - if yes, define exact purpose
  - Next action: treat as DEFERRED unless it directly helps sales or operations this week

- [TODO] **Set up Frontend lane for shipping**
  - Owner: Henry / Kyle
  - Goal: make Frontend lane able to ship web work with version control and deployment
  - Definition of done:
    - GitHub workflow is chosen
    - repo access path is defined
    - Vercel deployment path is defined
    - first deploy flow is tested
  - Next action: document exact GitHub + Vercel access requirements and first deployment target

- [TODO] **Set backend baseline (Supabase or insforge.dev)**
  - Owner: Henry / Dev / Dave
  - Goal: choose the default backend stack for client systems and internal productization
  - Definition of done:
    - default backend decision made
    - rationale documented
    - first working baseline scaffold defined
  - Next action: compare Supabase vs insforge.dev against speed, automation, and deployment fit

- [TODO] **Build 1-click Contabo deployment path**
  - Owner: Henry / Dev / Dave
  - Goal: provision VPS + install stack + shape agent system from a client business profile/persona
  - Definition of done:
    - Contabo API flow is documented
    - onboarding inputs are defined
    - stack generation plan exists
    - first deployment pipeline skeleton exists
  - Next action: define required onboarding fields and deployment stages from form -> VPS -> stack -> agent setup

- [TODO] **Create outbound validation engine**
  - Owner: Henry / Ryan / Tyler
  - Goal: generate early momentum and validate the $399/mo offer
  - Definition of done:
    - target channels chosen (Facebook groups, Skool, LinkedIn, X)
    - outreach/content cadence defined
    - offer positioning drafted
    - first batch of posts/outreach drafts prepared
  - Next action: draft the validation offer and a 7-day outreach/content plan

### P2 — Structure / Documentation

- [DEFERRED] **Revisit Paperclip later**
  - Owner: Henry
  - Goal: restore it only after Telegram + tools + autonomy are working
  - Next action: ignore for now unless it blocks live work

---

## Weekly Revenue Trackers

- Leads contacted:
- Follow-ups due:
- Active opportunities:
- Blocked deals:
- Tool integrations completed:

---

## Decision Log

- Current operating stack: Telegram + OpenClaw first; Paperclip deferred
- HiClaw: optional collaboration layer, use narrowly
- MetaClaw: optimization layer, not core orchestration
- LobsterBoard: likely useful later; not automatically required now
- GHL: priority integration because it touches revenue directly
