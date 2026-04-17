# ClawOps Dashboard — Complete Repo Analysis
**Date:** 2026-04-16
**Status:** Planning — awaiting Pulkit's pointers

---

## All 14 Repos — Decisions

### ✅ USE — Integrate / Install

#### 1. actionagentai/openclaw-dashboard
**What it is:** OpenClaw gateway visual UI — every CLI command as a web page.
**What to pull:** EVERYTHING. This IS our Mission Control.
Already running on port 3001.
- Pages: Overview, Chat, Agents, Sessions, Models, Voice, Nodes, Skills, Channels, Cron, Config, Logs
- Speech-to-text everywhere (floating mic)
- Real-time WebSocket to OpenClaw gateway (v3 protocol)
- Zero database — pure WebSocket client
**Decision:** BASE FOR MISSION CONTROL.

#### 2. ChristianAlmurr/openclaw-dashboard
**What it is:** Fleet management Mission Control — cost analytics, competitor intel, memory health, cron DAG editor.
**What to pull:** Fleet management panel, cost analytics per agent/model, competitor intel, memory health AI analysis, constellation graph for multi-agent visualization.
**Decision:** PULL FEATURES into Mission Control.

#### 3. camoufox-browser (jo-inc/camofox-browser)
**What it is:** Anti-detection headless browser for AI agents — C++ Firefox fork with fingerprint spoofing.
**What to pull:** Replace Chrome VNC. Agent does stealth autonomous browsing.
- C++ anti-detection — bypasses Google, Cloudflare, most bot detection
- Stable element refs (e1, e2, e3) for reliable clicking
- Session isolation per user (separate cookies/storage)
- Cookie import (Netscape format)
- ~40MB RAM when idle
- REST API for agents
**Decision:** Install as Agent Browser (port 9377). Replaces Chrome VNC.

#### 4. vercel-labs/agent-browser
**What it is:** Native Rust CLI for browser automation + WebSocket streaming for shared sessions.
**What to pull:** Mutual/shared browser — user AND agent both see the same browser in real-time.
- `agent-browser stream enable` → WebSocket streaming of browser session
- `agent-browser connect <port>` → CDP connection for external tools
- Both user and agent connect to the same browser
- Agent shows results visually in shared browser
**Decision:** Install alongside Camoufox. Different use case:
- Camoufox = agent's stealth autonomous browser
- agent-browser = shared visual interface between user and agent

#### 5. cathrynlavery/openclaw-ops
**What it is:** OpenClaw operations skill — health checks, watchdog, security scans.
**What to pull:** INSTALL ALL SCRIPTS on our VPS.
Scripts:
- `heal.sh` — one-shot auto-fix for common gateway issues
- `post-update.sh` — post-update orchestrator (heal → workspace reconcile → security scan → health check)
- `watchdog.sh` — restart gateway if down, every 5 min (cron on Linux)
- `health-check.sh` — declarative URL/process health checks
- `security-scan.sh` — config hardening + credential exposure scan (0-100 score)
- `skill-audit.sh` — static security audit for third-party skills
- `session-monitor.sh` — detect retry loops, stuck runs, auth errors
- `daily-digest.sh` — incident + activity + cost summary
- `session-search.sh` — full-text session search
- `session-resume.sh` — compaction-first markdown resume for a session
- `check-update.sh` — version change detection with --fix auto-repair
- `incident-manager.sh` — shared incident lifecycle helper
**Decision:** Install all scripts. Run watchdog as cron. Run daily-digest daily.

#### 6. zeroclaw-labs/zeroclaw
**What it is:** Ultra-lightweight Rust AI agent — 5MB RAM, $10 hardware, 20+ channels.
**What to pull:** Ship to USER VPS. User's primary agent interface.
- 5MB binary, any OS, any platform
- 20+ channels: WhatsApp, Telegram, Slack, Discord, Signal, iMessage, Matrix, IRC, Email, Bluesky, Nostr, LinkedIn, Twitter, Reddit, and more
- Web dashboard for real-time control
- Hardware peripherals (ESP32, Arduino, Raspberry Pi)
- "ZeroClaw for users, Hermes for us" — confirmed by Pulkit
**Decision:** Ship ZeroClaw to client VPS as their AI employee. We use Hermes internally.

#### 7. win4r/ClawTeam-OpenClaw
**What it is:** Multi-agent swarm coordination — spawn workers, split tasks, coordinate via CLI.
**What to pull:** Integrate ClawTeam for multi-agent spawning.
- `clawteam spawn --team my-team --agent-name worker1 --task "..."` — spawn sub-agents
- Git worktree isolation per worker
- tmux backend (tmux-based session management)
- Web UI board for swarm monitoring
- Inbox messaging between agents
- OpenClaw as default agent
- Per-agent session isolation
- Exec approval auto-config
**Decision:** Install ClawTeam for task parallelism. Our agents spawn sub-agents.

#### 8. openagents-org/openagents
**What it is:** Multi-agent collaboration platform — unified workspace for all agents, shared context.
**What to pull:** USE THE WORKSPACE CONCEPT for multi-agent chat.
- Unified workspace: one URL for every agent, no matter where it runs
- Connect OpenClaw, Claude Code, Codex CLI, Cursor, Hermes Agent, nanobot
- @mentions to delegate between agents
- Shared files and shared browser
- Persistent URL (workspace.openagents.org/abc123)
- Tunnels — expose local dev server as public URL
- Launcher (agn) — install runtimes, configure API keys, connect workspaces
**Decision:** USE CONCEPT. Build our own multi-agent workspace into Mission Control. The shared browser + @mentions pattern is key.

#### 9. tugcantopaloglu/openclaw-dashboard
**What it is:** Real-time OpenClaw monitoring — TOTP MFA, live feed, cost tracking.
**What to pull:** TOTP MFA auth + real-time live feed + rate limit monitoring + system health sparklines.
Features to steal:
- TOTP MFA for dashboard access
- Live feed of agent messages across all sessions
- Rate limit monitoring (Claude, Gemini rolling windows)
- System health (CPU, RAM, disk, temperature with sparklines)
- Git activity tracking
- Activity heatmap (30 days)
- Keyboard shortcuts
**Decision:** PULL TOTP MFA + live feed + system health into Mission Control.

#### 10. HKUDS/CLI-Anything (openclaw-skill)
**What it is:** OpenClaw skill that builds CLI harnesses for any GUI app or repo.
**What to pull:** Already installed. Use when building CLI tools for browser automation.
- Generates Python CLI harness for any GUI app or repo
- Stateful Click CLI with REPL mode + JSON output
- Gap analysis + test-driven development
- Installs via: `openclaw skills install cli-anything`
**Decision:** Already installed. Use when building custom CLI tools.

#### 11. twentyhq/twenty
**What it is:** Open-source CRM — self-hostable Salesforce alternative. NestJS + PostgreSQL + React.
**What to pull:** REFERENCE for CRM module. Do NOT fork.
- Customize objects and fields
- Custom roles and permissions
- Workflow automation (triggers + actions)
- Email, calendar, files built-in
- Kanban + table views
- Docker-compose self-hosting
- Linear/Notion/Airtable-inspired UX
**Decision:** REFERENCE ARCHITECTURE. Build our CRM module inspired by Twenty's schema design.

---

### ⚠️ USE CONCEPTS — Don't fork directly

#### 12. composio.dev (AI Agent Integration Platform)
**What it is:** 850+ toolkits, managed OAuth, entity-based auth, native tracing.
**Use:** Our integration layer for all social media + tool execution.
- 850+ toolkits (actions, not just OAuth)
- Managed auth — OAuth 2.0 + API keys
- `entity_id` — each client gets their own credentials
- Native tracing + logging for every action
- Python + TypeScript SDKs
- Self-hostable
- Replaces Nango completely
**Decision:** Use Composio as our integration platform. Client connects social accounts → Composio handles OAuth → agents execute actions via toolkits → every call is traced.

#### 13. MervinPraison/PraisonAI
**What it is:** Python agent framework with memory, RAG, 100+ LLMs, Telegram/Slack/Discord integrations.
**What to pull:** CONCEPT ONLY — multi-agent chat + Telegram/Discord integration.
- Multi-agent teams
- Long-term memory + RAG
- Built-in Telegram, Slack, Discord bots
- 5-line deployment
**Decision:** REFERENCE for multi-agent chat + channel integrations. We use OpenClaw's Telegram integration (already working).

---

### ❌ NOT USEFUL

#### 14. mattermost/mattermost
**What it is:** Enterprise self-hosted Slack — chat, voice, screen sharing, React + Go + PostgreSQL.
**Why not:** Way too big and complex. We're not building team communication infra. Zero overlap with our product.

#### 15. fikrikarim/parlor
**What it is:** On-device voice AI — Gemma 4 E2B + Kokoro TTS on local machine.
**Why not:** Desktop/embedded use case. Not a SaaS dashboard or multi-tenant product.

---

## Browser Architecture — Final Decision

Two complementary browsers, not alternatives:

| | Camoufox | agent-browser |
|--|--|--|
| **Role** | Agent's stealth autonomous browser | Shared user+agent visual browser |
| **Anti-detection** | C++ fingerprint spoofing | Standard Chrome |
| **User sees it?** | No | Yes — shared session |
| **Use case** | Scraping, bot tasks, stealth work | Showing results, joint browsing |
| **Tech** | REST API (Fox protocol) | CLI + WebSocket streaming |
| **Port** | 9377 | needs port |

---

## Final Stack — Two Dashboards

### Agentic OS (User's VPS — client-facing)
- **Backend:** InsForge (PostgreSQL, JWT auth, OAuth, edge functions)
- **Frontend:** Next.js (CRM-first, leads, marketing, social media)
- **Agent:** ZeroClaw (shipped to user VPS)
- **Integrations:** Composio (850+ toolkits, managed OAuth per user)
- **Browser:** Camoufox (stealth) + agent-browser (shared visual)
- **Skills:** cli-anything + our custom skills
- **Auth:** InsForge JWT + TOTP MFA (from tugcantopaloglu dashboard)

### Mission Control (Our VPS — internal ops)
- **Base:** actionagentai/openclaw-dashboard (already on port 3001)
- **Enhanced with:** ChristianAlmurr fleet mgmt, tugcantopaloglu monitoring, TOTP MFA
- **Agents:** Hermes (our internal ops agent) + ClawTeam (multi-agent spawning)
- **Browser:** Camoufox + agent-browser
- **Ops scripts:** All openclaw-ops scripts (heal, watchdog, security-scan, daily-digest)
- **Multi-agent workspace:** OpenAgents concept (shared context, @mentions)
- **Auth:** OpenClaw gateway auth (no separate login)

---

## Key Design Decisions

1. **No Nango** — Composio handles all OAuth + tool execution
2. **No Supabase** — InsForge as backend (Pulkit's decision)
3. **ZeroClaw for users, Hermes for us** — confirmed
4. **Two browsers** — Camoufox (stealth) + agent-browser (shared visual)
5. **Mission Control = OpenClaw dashboard + features** — not a separate build
6. **CRM = build from scratch, inspired by Twenty** — not a fork
7. **cli-anything skill** — already installed, use for CLI tool generation
