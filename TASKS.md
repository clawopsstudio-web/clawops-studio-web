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

---

## Active Queue

### P0 — Revenue / Operating Core

- [TODO] **Stabilize Telegram lane operations**
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
