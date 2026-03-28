# CRON PLAN — Lean v1

Purpose: define a simple recurring operating cadence before wiring exact cron jobs.

---

## Principles

- keep cadence light
- prefer a few high-value sweeps over many noisy jobs
- use heartbeat for adaptive checks
- use cron only where exact timing matters

---

## Recommended Cadence

### 1. Morning Executive Review
- Time: 09:00 IST daily
- Purpose:
  - review `TASKS.md`
  - identify top 3 priorities
  - check blockers
  - check if any revenue follow-up is due
- Output:
  - short executive summary in HQ / direct chat

### 2. Midday Follow-Up Sweep
- Time: 13:00 IST daily
- Purpose:
  - check sales follow-ups
  - check unanswered tasks / dependencies
  - check whether one P0 task is still stuck
- Output:
  - short progress / blocker note only if something changed

### 3. Evening Closeout Review
- Time: 18:30 IST daily
- Purpose:
  - summarize progress
  - log blockers
  - define next best action for tomorrow
- Output:
  - concise end-of-day ops summary

### 4. Weekly CEO Review
- Time: Monday 09:30 IST
- Purpose:
  - pipeline status
  - integration progress
  - automation progress
  - current bottlenecks
  - next 3 priorities
- Output:
  - weekly CEO summary

---

## What to Automate First

Priority order:
1. `TASKS.md` review
2. sales / follow-up review
3. integration progress review
4. Telegram lane health check
5. service health checks

---

## What Not to Automate Yet

Do not automate yet:
- noisy per-lane chatter
- public/client-facing sends
- complex multi-system workflows before GHL is connected
- anything relying on Paperclip

---

## Suggested Implementation Path

### Phase 1
- keep this plan as the source of truth
- use heartbeat/manual checks to validate usefulness

### Phase 2
- wire 1-2 cron jobs only:
  - morning executive review
  - evening closeout review

### Phase 3
- add midday follow-up sweep if signal quality is good

---

## Future Automation Hooks

When ready, recurring jobs can trigger:
- task review
- pipeline review
- CRM follow-up reminders
- weekly summary generation
- lane reliability checks

---

## Rule

If a recurring job is not helping revenue, clarity, or speed, remove it.
