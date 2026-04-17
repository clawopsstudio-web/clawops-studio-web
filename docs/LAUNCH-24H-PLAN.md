# Launch 24H Plan

## Objective
Make ClawOps Studio operational enough to start promoting by tomorrow.

## Current live state
- Telegram lane routing is active by topic
- 7 core agent heartbeats are active
- HQ cron delivery is active to HQ topic
- HiClaw is live locally
- DeerFlow is now live locally on `http://127.0.0.1:2026`
- Paperclip remains deferred

## Critical path

### 1. Revenue plumbing
- Connect GoHighLevel
- Validate read-only access first:
  - contacts
  - opportunities/pipeline
  - conversations
  - calendars if needed
- After validation, define first automations

### 2. Product shell
- Frontend: landing + onboarding flow + simple dashboard shell
- Backend: app server / orchestration API
- Database: Supabase
- Auth: simple admin + client auth path
- Logic: onboarding intake -> workspace/config generation -> deployment steps

### 3. Deployment layer
- Contabo provisioning flow
- baseline server bootstrap
- OpenClaw stack install profile
- per-client config generation

### 4. Sales-ready launch assets
- offer page
- onboarding form
- proof/demo flow
- clear CTA to book / buy / start onboarding

## Immediate blockers
- GHL credentials not yet connected in runtime
- DeerFlow is live locally but not yet exposed or integrated into workflow
- HiClaw is running but not yet wired into an intentional operating pattern
- Product shell architecture not yet frozen

## Today’s execution order
1. GHL connection
2. Freeze product shell architecture
3. Define tomorrow launch surface (page + CTA + onboarding)
4. Start backend/data/auth foundation
5. Wire Contabo provisioning plan

## Notes
- Keep autonomy lean and quiet
- Avoid reopening Paperclip work unless it becomes critical
- Focus on revenue path and launch readiness, not infra vanity
