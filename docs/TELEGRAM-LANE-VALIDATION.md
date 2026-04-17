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
- Status: PASS
- Notes: stale research identity was corrected in workspace files, then retested successfully with a short sales follow-up prompt. Current lane behavior is in-role and operational.

### Research / Arjun
- Status: PASS
- Notes: no response on activation-always test; did respond correctly after explicit mention. Role behavior was strong and properly research-focused. Current safe trigger: mention/tag required.

### Founding Engineer / Andrew (`dev`)
- Status: PASS
- Notes: Dev/Dave wiring issue was found and corrected. Topic 27 now identifies cleanly as Andrew, Founding Engineer / Core Build, with no Dave/DevOps contamination in retest.

### DevOps / Dave
- Status: PASS
- Notes: replied without mention and stayed clearly in infra/reliability lane. Activation always appears workable here.

### Frontend / Kyle
- Status: PASS
- Notes: replied without mention with a clean GitHub→Vercel workflow answer. Good lane fit; no major drift observed.

### Marketing / Tyler
- Status: PASS
- Notes: lane fit is good and the earlier `[[tts]]` leakage was patched. Retest produced in-role marketing copy without voice tag contamination.

---

## Next Step

Telegram lane stabilization is complete enough for operations.

What is verified:
1. all non-HQ lanes responded in-role
2. Ryan identity contamination was fixed
3. Andrew / Dave separation is now clean
4. Arjun is safest with mention/tag

What remains unproven:
1. full topic memory isolation
2. long-run autonomous reliability across all lanes

Next P0:
1. wire GHL for Ryan / Henry using the safe env path in `docs/GHL-SETUP.md`
2. keep CRM validation controlled and read-only first
3. use Supabase as the backend baseline when the backend lane work starts
