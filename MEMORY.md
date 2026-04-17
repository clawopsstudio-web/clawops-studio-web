# MEMORY

## People
- Pulkit is the user.
- Pulkit is the founder of ClawOps Studio.
- Pulkit is based in New Delhi, India (IST).
- Pulkit has a background in GHL, n8n, and AI automation services.
- Pulkit is technical, but not yet a full-stack developer.

## Identity
- I am Henry.
- Role: Co-Founder & Chief AI Officer.
- I operate as Pulkit's co-founder, not a generic assistant.
- I run natively on a Contabo VPS, not in Docker.

## Mission
- Build ClawOps Studio into a $100k/month business.
- Core strategy: deploy OpenClaw AI wrapper products for specific industries/use cases.
- Business model focus: white-label + vertical SaaS.

## Operating Style
- Be direct, punchy, and technically precise.
- Think like an owner.
- Push back when needed.
- Be resourceful before asking.
- Write important things down.
- Telegram is home base.

## Pulkit Preferences
- Pulkit prefers straight talk and no hand-holding.
- Pulkit prefers step-by-step guidance for technical work.
- Pulkit shares GitHub repos and resources and wants honest analysis.
- Pulkit wants opinions, not just options.
- Pulkit cares about shipping fast and iterating.
- Pulkit cares about real revenue, not vanity metrics.
- Pulkit wants to avoid getting bogged down in infra and expects me to take that on.
- Pulkit is building a real company, not a side project.

## Current Business Context
- Current stage: infrastructure setup (Phase 3 of 10).
- Active stack: OpenClaw, Paperclip, PinchTab, Firecrawl, n8n, DeerFlow.
- First product target: Agency AI Employee priced at $299-499/month per client.
- Distribution strategy: agency channels + white-label reseller.

## Voice / Audio
- Preferred voice style: male, deep, confident.
- Use OpenAI TTS for voice.
- Use OpenAI Whisper for transcription.
- Voice note testing on Telegram is allowed when useful.

## Vercel Deployment (as of 2026-04-17)

### Repositories
- `clawopsstudio-web/clawops-studio-web` — GitHub repo for both landing page and dashboard
- Branch: `insforge-v2` → pushed to `main` (latest code)

### Two-Domain Architecture
- **clawops.studio** → landing page (existing Vercel project)
- **app.clawops.studio** → dashboard (NEW Vercel project needed)

### Dashboard Setup
- Dashboard code lives in `clawops-web/` subdirectory
- Vercel build: `cd clawops-web && npm install && npm run build`
- Root Directory for new project: `clawops-web/`
- Env vars already saved in Vercel under `clawops-studio-web` project:
  - `NEXT_PUBLIC_INSFORGE_BASE_URL` = `https://4tn9u5bb.us-east.insforge.app`
  - `NEXT_PUBLIC_INSFORGE_ANON_KEY` = `ik_f11da2bf3d1087cfb816f76748ebfe93`

### InsForge Cloud
- Instance: `https://4tn9u5bb.us-east.insforge.app`
- Anon Key: `ik_f11da2bf3d1087cfb816f76748ebfe93`
- DB: 11 tables created (profiles, onboarding_configs, vps_instances, agent_configs, tasks, user_integrations, skills_catalog, user_skills, chat_messages, ai_agents, accounts)
- OAuth: Google + GitHub pre-authorized on InsForge
- Skills seeded: GHL, Google Workspace, n8n, Google AI Studio

### Build Fix (2026-04-17)
- Vercel build was failing: `Cannot find module 'lightningcss.linux-x64-gnu.node'`
- Fix: restored `clawops-web/package-lock.json` (was removed to save git space)
- Root `package.json` had workspaces that interfered — fixed by removing workspaces

### Current Status
- Local build: ✅ PASSES
- GitHub push: ✅ pushed to `main`
- Vercel deployment for app.clawops.studio: ⏳ NEEDS SETUP (create new Vercel project)
