# TELEGRAM LANE SWEEP — One-Pass Validation

Purpose: complete a fast, honest validation of all non-HQ Telegram lanes without bluffing topic isolation.

Use this once, lane by lane.

---

## Rules

- Test one lane at a time
- Use in-topic mention/tag unless that lane is already proven safe without mention
- Send exactly one prompt first
- Judge only what actually happens
- Do not give extra clarification unless the lane completely misses the job

---

## PASS / PARTIAL / FAIL rubric

### PASS
- replies in the correct lane role
- useful first response
- no obvious wrong-lane drift
- trigger behavior is clear

### PARTIAL
- replies, but weakly
- needs extra steering
- partially drifts lanes
- trigger behavior is inconsistent

### FAIL
- no reply
- wrong role entirely
- obvious confusion
- unusable trigger behavior

---

## Sweep prompts

### 1) Sales / Ryan
Prompt:
`@bot Draft a short follow-up message for a lead interested in AI employees at $399/month. Keep it direct, not pushy, and ask for the next step.`

What good looks like:
- sounds commercial
- focuses on follow-up / conversion
- asks for a call, reply, or decision
- does not turn into research or technical architecture

---

### 2) Research / Arjun
Prompt:
`@bot Research 3 agency niches most likely to buy AI employees this month. Give a short reason for each and suggest which one we should target first.`

What good looks like:
- clear market reasoning
- prioritization
- no drift into outreach copy or deployment build details

---

### 3) Founding Engineer / Dev
Prompt:
`@bot Design the shortest path from onboarding form to deployed client OpenClaw stack. Keep it practical and implementation-focused.`

What good looks like:
- system/design thinking
- deployment flow clarity
- no drift into server-only ops details unless relevant

---

### 4) DevOps / Dave
Prompt:
`@bot What is the cleanest baseline for deploying OpenClaw on a new Contabo VPS so it stays maintainable and reliable?`

What good looks like:
- infra/reliability answer
- operational baseline
- no drift into sales, research, or branding

---

### 5) Frontend / Kyle
Prompt:
`@bot Outline the fastest GitHub-to-Vercel workflow for shipping the ClawOps website with minimal friction.`

What good looks like:
- frontend shipping flow
- repo/deploy clarity
- no deep backend or CRM drift

---

### 6) Marketing / Tyler
Prompt:
`@bot Draft 3 short X posts to validate the $399/month AI employee offer for agency owners.`

What good looks like:
- marketing language
- audience-aware hooks
- not direct sales DM copy
- not research analysis

---

## What to record after each lane

Reply back with this compact format:

- Sales: PASS / PARTIAL / FAIL — one-line note
- Research: PASS / PARTIAL / FAIL — one-line note
- Dev: PASS / PARTIAL / FAIL — one-line note
- DevOps: PASS / PARTIAL / FAIL — one-line note
- Frontend: PASS / PARTIAL / FAIL — one-line note
- Marketing: PASS / PARTIAL / FAIL — one-line note

Optional useful note fields:
- mention required? yes/no
- activation always seemed okay? yes/no/unknown
- any wrong-lane drift?

---

## Final validation policy

Even if all six pass, we still should not claim:
- proven topic memory isolation
- proven long-term topic separation
- proven proactive lane behavior

What we can claim after a clean sweep:
- each lane is operational enough for directed use
- mention-based in-topic routing works where tested
- role behavior is good enough to continue tool wiring
