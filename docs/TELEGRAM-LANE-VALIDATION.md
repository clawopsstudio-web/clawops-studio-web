# TELEGRAM LANE VALIDATION — Lean v1

Purpose: verify that Telegram topic lanes are operational enough to run ClawOps day-to-day without bluffing isolation or reliability.

---

## Goal

Prove, lane by lane:
1. the lane responds
2. the lane follows its role
3. the trigger pattern is clear
4. the lane does not obviously bleed into the wrong job
5. known limitations are documented honestly

---

## Lanes to Validate

- Henry — HQ / Command
- Ryan — Sales / Pipeline
- Arjun — Research / Market Intel
- Dev — Founding Engineer / Core Build
- Dave — DevOps / Backend
- Kyle — Frontend / Web
- Tyler — Marketing / SEO

---

## Validation Standard

A lane counts as usable if all of these are true:
- pinned lane description/rules exist
- a test prompt gets a relevant response
- the response matches the lane’s job
- the safest trigger pattern is known
- no major reliability problem is observed in the test

A lane does **not** count as fully proven if topic/session isolation is still uncertain.

---

## Current Known Truth

- DM vs group are distinct enough operationally to treat separately
- group-level Telegram sessions have appeared in runtime/status tooling
- topic/thread-level isolation is still not fully proven
- safest current assumption remains: mention/tag when action is needed unless a lane has been behaviorally validated with `activation always`

---

## Lane-by-Lane Test Format

For each lane, capture:

### 1. Setup check
- pinned description present? yes/no
- pinned rules present? yes/no
- activation mode known? yes/no
- mention/tag required? yes/no/unknown

### 2. Test prompt
Use one prompt that clearly belongs to the lane.

### 3. Expected behavior
- replies in-role
- does not drift into another lane’s job
- does not require re-explaining basic lane identity

### 4. Result
- PASS
- PARTIAL
- FAIL

### 5. Notes
- trigger behavior
- wrong-lane drift
- memory weirdness
- missing context
- any operational caveat

---

## Recommended Test Prompts

### HQ / Henry
"What are the top 3 priorities for ClawOps today, and what should each lane focus on?"

### Sales / Ryan
"Draft a short follow-up for a lead interested in AI employees at $399/month."

### Research / Arjun
"Research 3 agency niches most likely to buy AI employees this month and explain why."

### Founding Engineer / Dev
"Design the shortest path from onboarding form to deployed OpenClaw client stack."

### DevOps / Dave
"What is the cleanest baseline for deploying OpenClaw on a new Contabo VPS?"

### Frontend / Kyle
"Outline the fastest GitHub-to-Vercel workflow for shipping the ClawOps website."

### Marketing / Tyler
"Draft 3 X posts to validate the $399/month AI employee offer."

---

## Trigger Policy To Validate

### Baseline rule
Use explicit mention/tag in-topic unless proven otherwise.

### If testing `activation always`
Only test one lane at a time.

Pass condition:
- lane responds correctly without noisy cross-lane behavior

Fail condition:
- wrong-lane pickup
- noise
- unclear routing
- inconsistent reply behavior

---

## Honest Reporting Rules

Do not claim:
- full topic isolation unless directly proven
- clean memory separation unless directly proven
- reliable proactive behavior until repeated tests confirm it

Do claim:
- what worked
- what failed
- what remains uncertain

---

## Validation Log

### HQ / Henry
- Status: WORKING / strongest confidence so far
- Notes: reported by user as working after fresh session + activation always + pinned rules/tests

### Sales / Ryan
- Status: NOT YET RE-VERIFIED
- Notes:

### Research / Arjun
- Status: NOT YET RE-VERIFIED
- Notes:

### Founding Engineer / Dev
- Status: NOT YET RE-VERIFIED
- Notes:

### DevOps / Dave
- Status: NOT YET RE-VERIFIED
- Notes:

### Frontend / Kyle
- Status: NOT YET RE-VERIFIED
- Notes:

### Marketing / Tyler
- Status: NOT YET RE-VERIFIED
- Notes:

---

## Next Step

Run a single clean validation sweep across all non-HQ lanes and record pass/partial/fail honestly.

After the sweep:
1. wire GHL for Ryan / Henry using the safe env path in `docs/GHL-SETUP.md`
2. keep lane stabilization first; do not let CRM setup turn into a rabbit hole
3. use Supabase as the backend baseline when the backend lane work starts
