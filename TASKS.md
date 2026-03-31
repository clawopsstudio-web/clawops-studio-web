# TASKS — ClawOps HQ

Purpose: single operating backlog for Henry / ClawOps Studio.
Status: TODO | DOING | BLOCKED | DONE | DEFERRED
Priority: P0 = revenue/launch | P1 = this week | P2 = useful

---

## Operating Priorities

1. Full Autonomy — Henry + swarm execute without Pulkit micromanaging
2. Product build — landing page, onboarding, payment, deployment pipeline
3. Revenue motion — outbound validation, sales content, lead follow-up
4. Backend/infra — Supabase live, payment webhook, Contabo deploy (deferred)
5. Agent tooling — each lane has working tools and skills

---

## Swarm Status (Live)

| Agent | Task | Status | Notes |
|-------|------|--------|-------|
| Tyler | Content batch (14 posts, viral hooks, 30-day calendar) | ✅ DONE | Ready to publish |
| Dave | Supabase live setup via browser | BLOCKED | Reached Supabase signup, but blocked by inactive Gmail session + hCaptcha/auth flow |
| Ryan | Outbound validation engine + lead list | ✅ DONE | 15 leads, outreach templates ready, GHL contacts pending approval |
| Kyle | Landing page via GitHub Pages | ✅ DONE | Live at clawopsstudio-web.github.io/test/ |
| Andrew | Architecture freeze | TODO | Next after infra |
| Henry | Autonomy system + swarm coordination | DOING | Active |

---

## Sprint: 4-5 Hour Window (until ~18:00 IST)

Goal: finish all product/revenue work except Contabo before deadline.

### Must complete by deadline
1. Landing page live (Kyle)
2. Supabase live project + schema (Dave)
3. Lead list + outreach templates (Ryan)
4. Content batch published/ready (Tyler ✓)
5. Autonomy system locked (Henry)

### After swarm completes
6. Andrew + Dave: architecture freeze
7. Dave: payment webhook path
8. Ryan: first outreach sent
9. Client onboarding flow (form → setup → delivery)

---

## Active Queue

### P0 — Revenue / Autonomy

- [DOING] **Full Autonomy System**
  - Owner: Henry
  - Goal: Henry + swarm execute entire backlog without Pulkit micromanaging
  - Current state: Swarm launched (4 agents). Tyler done. 3 running. Autonomy rules v2 locked.
  - Next action: Monitor swarm, push next wave after current agents finish
  - Definition of done:
    - Henry picks next task without prompting
    - Swarm spawns and coordinates parallel work
    - Browser automation used for web app setup
    - Mission Control stays synced automatically

- [DONE] **Sales content batch (Tyler's first week)**
  - Owner: Tyler
  - Goal: 1-week content batch for Agency AI Employee offer
  - Current state: Done. 14 posts, 20 viral hooks, 30-day calendar, content strategy all created.
  - Next action: Start publishing per recommended schedule (X 8:30am + 5pm, LinkedIn 9-10:30am)
  - Definition of done:
    - Content strategy doc created
    - Week 1 batch (14 posts) ready
    - Viral hooks library (20 hooks)
    - 30-day calendar complete

- [DONE] **Outbound validation engine**
  - Owner: Ryan
  - Goal: Execute first outreach wave, generate leads for $299-499/mo offer
  - Current state: Done. 15 target leads in LEAD-LIST.md. Outreach templates ready (X DM, LinkedIn, FB, follow-up). GHL contacts deferred — Ryan was conservative and saved to file instead of risking messy CRM writes.
  - Next action: Pulkit approves top 5 → confirm GHL write path → Ryan sends first batch
  - Definition of done:
    - Lead list with 10+ targets identified ✅ (15)
    - Outreach templates drafted ✅
    - GHL contacts pending approval ⚠️ (deferred to safe write verification)
    - Ready to send: yes ✅

- [DONE] **Landing page + offer page**
  - Owner: Kyle
  - Goal: Live landing page for Agency AI Employees via GitHub Pages
  - Current state: Done. Live at https://clawopsstudio-web.github.io/test/ — hero, problem, solution, pricing, FAQ, intake form. Pure HTML/CSS/JS, mobile responsive, dark theme.
  - Next action: Upgrade intake form from Telegram DM to proper backend (Formspree/Tally/Supabase); add Calendly; add analytics
  - Definition of done:
    - Landing page live ✅
    - Hero, problem, solution, pricing, CTA sections ✅
    - Mobile responsive ✅
    - Intake form or CTA connected ✅

- [BLOCKED] **Supabase live project + credentials**
  - Owner: Dave
  - Goal: Live Supabase project with schema for clients, projects, tasks, payments
  - Current state: Browser automation reached Supabase auth/signup, but current Supabase flow no longer offers Google OAuth here; direct signup triggers hCaptcha, and the available Chrome profile only has a remembered ClawOps Gmail account with no active session/password.
  - Next action: Resume with an active Gmail session in the browser or a Supabase access token / successful manual auth, then create project, collect credentials, save to .secrets/supabase.env, and run schema SQL.
  - Definition of done:
    - Supabase project created at supabase.com
    - Credentials saved to .secrets/supabase.env
    - Schema created (clients, projects, tasks tables)
    - RLS policies enabled

- [TODO] **Client onboarding dashboard**
  - Owner: Kyle + Henry
  - Goal: Simple intake form → client record in Supabase
  - Next action: After Supabase is live, build simple intake HTML that writes to Supabase
  - Definition of done:
    - Intake form accessible
    - Form submission creates client record in Supabase
    - Henry notified on new submission

- [TODO] **Automated onboarding flow**
  - Owner: Dave + Andrew
  - Goal: Client fills form → VPS provisioned → agents deployed → client notified
  - Next action: After Supabase + landing page done, define the flow end-to-end
  - Definition of done:
    - Flow documented end-to-end
    - First automated onboarding tested
    - Client receives deployed agents confirmation

- [TODO] **Payment integration (Stripe or provider)**
  - Owner: Dave + Henry
  - Goal: Clients can pay $299-499/month
  - Next action: Choose payment provider, set up webhook for subscription events
  - Definition of done:
    - Payment provider chosen and connected
    - Webhook handles: new subscription, cancellation, payment failed
    - Payment event creates/updates client record in Supabase

- [TODO] **Deployment pipeline (Contabo)**
  - Owner: Dave + Andrew
  - Goal: 1-click VPS + stack deployment from client profile
  - Status: DEFERRED — Contabo specific, do after core product is ready
  - Definition of done:
    - Contabo API flow documented
    - Stack shaping from client profile works
    - First client VPS deployed automatically

- [TODO] **Architecture freeze**
  - Owner: Andrew + Dave
  - Goal: Freeze AI/backend boundaries before more build work starts
  - Next action: After current swarm, Andrew defines: OpenClaw runtime vs backend vs DB vs automation
  - Definition of done:
    - Architecture spec document created
    - Boundary between agent runtime and backend is clear
    - No spaghetti before scale

### P1 — Infrastructure / Tools

- [TODO] **Sales recurring workflow (Ryan's loop)**
  - Owner: Ryan
  - Goal: Lock recurring: triage → review/tag → propose follow-up → approval for outbound
  - Next action: After validation engine completes, formalize the recurring loop
  - Definition of done:
    - Loop documented with triggers and actions
    - Henry can run it on schedule without prompting

- [DONE] **Stabilize Telegram lane operations**
  - Owner: Henry
  - Goal: All lanes operate cleanly in Telegram topics
  - Current state: Done. All 7 lanes verified. Ryan identity fixed. Tyler TTS fixed. Dev/Dave split done.
  - Definition of done: Lane sweep PASS for all lanes

- [DONE] **Connect GoHighLevel (GHL)**
  - Owner: Henry + Ryan
  - Goal: CRM connectivity for pipeline, contacts, opportunities
  - Current state: Done. MCP path works. Read + safe write validated. Ryan used it successfully.
  - Definition of done: GHL MCP operational for read + approved write

- [DEFERRED] **Vercel auth + deployment flow**
  - Owner: Kyle
  - Status: Deferred — GitHub Pages is the active path now
  - Definition of done: Will revisit after GitHub Pages landing page is live

- [DEFERRED] **DeerFlow research integration**
  - Owner: Arjun
  - Status: Deferred — service reachable but OpenRouter auth issue, not on critical path
  - Definition of done: Will revisit when research lane needs deep research capability

- [DEFERRED] **Paperclip re-evaluation**
  - Owner: Henry
  - Status: Deferred — off critical path until Telegram + tools + autonomy working
  - Definition of done: Will revisit later

- [DEFERRED] **MetaClaw improvement loop**
  - Owner: Henry
  - Status: Deferred — MetaClaw plugin active, focused improvement loop not yet selected
  - Definition of done: Pick one target workflow for optimization

- [DEFERRED] **HiClaw narrow pilot use case**
  - Owner: Henry
  - Status: Deferred — HiClaw services live, one pilot use case not yet defined
  - Definition of done: Define and test one lightweight collaboration use case

- [DEFERRED] **LobsterBoard decision**
  - Owner: Henry
  - Status: Deferred — Mission Control is the active dashboard, LobsterBoard not required now
  - Definition of done: Revisit if client-facing dashboard is needed

### P2 — Done

- [DONE] **Backend baseline documentation**
  - Owner: Dave
  - Current state: docs/SUPABASE-BASELINE.md exists with env vars, schema, vector search, RLS

- [DONE] **Outbound validation engine plan**
  - Owner: Ryan + Tyler + Henry
  - Current state: docs/OUTBOUND-VALIDATION-PLAN.md exists with offer positioning, channel strategy, templates

---

## Decision Log

- Operating stack: Telegram + OpenClaw first; Paperclip deferred
- Browser automation: use Gmail session for web app setup/login
- Landing page: GitHub Pages (Vercel deferred)
- Backend: Supabase (live project in progress)
- Payment: Stripe or provider (not started)
- Deployment: Contabo API (deferred until product ready)
- Swarm: 4 agents running in parallel (Tyler done, 3 running)
