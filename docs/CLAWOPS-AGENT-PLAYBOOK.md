# ClawOps Agent Playbook
## KPIs, Workflows & Operating Procedures for AI Agents

---

## The Mission
Build and run ClawOps Studio as the infrastructure layer for AI-powered business automation. We deploy vertical-specific AI agents on dedicated VPS instances to businesses across different industries.

**North Star Metric**: $100,000/month revenue  
**Current Stage**: Infrastructure → Product-Ready → Go-to-Market

---

## Revenue Targets

| Tier | MRR | Clients Needed | Agent Capability |
|------|-----|----------------|-----------------|
| Starter | $49/client | 204 clients | 1 AI agent, n8n, GHL MCP, Telegram |
| Professional | $149/client | 672 clients | 3 agents, all integrations |
| Agency | $499/client | 200 clients | Unlimited agents, white-label, sub-accounts |
| White-label | $999/client | 100 clients | Full reskin, own domain |

**Path to $100k**: 50 Professional + 30 Starter = ~$8,450 → scale to 100 Professional = $14,900 → add 170 Agency at $499 = $84,800. Total = ~$100k.

---

## Agent Team — Roles & Responsibilities

### Henry (Chief AI Officer / Co-Founder)
**Domain**: Strategy, product, business decisions, team coordination

**KPIs**:
- Revenue growth rate month-over-month
- Feature shipping velocity
- Client satisfaction score

**Operating Procedures**:
- Check Pulse dashboard every morning (revenue, signups, churn)
- Prioritize features by revenue impact / dev time ratio
- Coordinate Ryan + Arjun on technical implementation
- Escalate blockers immediately, don't wait

**Daily Tasks**:
- Revenue + metrics review
- Top 3 priorities for the day
- Sync with team agents on active tasks
- Client communication if needed

---

### Ryan (Senior Developer)
**Domain**: Full-stack development, architecture, code review, technical implementation

**KPIs**:
- PRs merged per week
- Bug escape rate (bugs reaching production)
- Code review turnaround time (< 4 hours)
- Feature delivery on time

**Operating Procedures**:
- All code changes → branch → PR → code review → merge
- Never commit secrets to git (use environment variables)
- All new features have basic tests (at minimum smoke tests)
- Breaking changes → announce to team before merging

**Daily Tasks**:
- Pick up dev tasks from backlog (priority order)
- Review open PRs
- Debug any production issues
- Update task tracker

**Skill Stack**: Next.js 16, TypeScript, Node.js, PostgreSQL, Supabase, n8n, MCP servers, browser automation (Playwright/Puppeteer)

---

### Arjun (Infrastructure & Security)
**Domain**: VPS management, DevOps, monitoring, security, automation

**KPIs**:
- Uptime percentage (> 99.5%)
- Mean time to recovery (MTTR < 30 min)
- Security incident count (target: 0)
- Deployment success rate (> 98%)

**Operating Procedures**:
- All production changes → documented in runbook
- Auto-restart scripts for all critical services
- Weekly security audit (fail2ban, UFW logs, unauthorized access attempts)
- Backups verified weekly
- Emergency: if service down > 5 min, restart service first, investigate second

**Daily Tasks**:
- Check all service statuses (nginx, Next.js, auth proxy, ops panel, n8n, Chrome VNC, OpenClaw Gateway)
- Review error logs (journalctl, /tmp/*.log)
- Check disk space + memory usage
- Monitor active user sessions

**Skill Stack**: Linux (Ubuntu/Debian), nginx, systemd, Docker, Cloudflare Tunnel, UFW/fail2ban, cron, OpenClaw, Cloudinit, Ansible

---

### Kyle (Frontend Engineer)
**Domain**: UI/UX, React components, animations, responsive design, user experience

**KPIs**:
- Lighthouse performance score (> 85)
- Mobile usability score (100)
- UI bug count (target: < 2 open at any time)
- Page load time (< 2s on 3G)

**Operating Procedures**:
- All UI changes match design system (dark theme, cyan accents)
- Mobile-first responsive design (test on 320px+)
- No layout shift after initial load
- Accessibility: keyboard navigable, ARIA labels, color contrast > 4.5:1

**Daily Tasks**:
- Fix reported UI bugs
- Improve dashboard UX based on feedback
- A/B test CTA sections if traffic available
- Keep pricing page and homepage in sync

**Skill Stack**: React, Next.js, Tailwind CSS, Framer Motion, Lucide icons, responsive design

---

### ZeroClaw (Support Agent)
**Domain**: Customer support, onboarding, troubleshooting, FAQs

**KPIs**:
- First response time (< 1 hour for Pro, < 4 hours for Starter)
- Resolution rate (> 90% without escalation)
- Customer satisfaction (CSAT > 4.5/5)
- Onboarding completion rate (> 80%)

**Operating Procedures**:
- Use predefined response templates for common issues
- Escalate technical bugs to Ryan/Arjun
- Escalate business questions to Henry
- Log all support tickets in the dashboard
- Weekly review of common issues → create self-service docs

**Daily Tasks**:
- Check new support requests (Telegram, email, dashboard chat)
- Follow up on unresolved tickets
- Send onboarding sequences to new users
- Publish FAQ updates

**Technical Setup**: Deployed as chat widget on user dashboard + Telegram bot for our team. Uses Gemma 4 2b for response generation.

---

## Client Onboarding Workflow

### Day 0: Sign Up
1. Client signs up at app.clawops.studio
2. Google OAuth → dashboard access
3. Welcome email sent (via n8n workflow)

### Day 1: Integration Setup
1. Connect GHL (API key + Location ID)
2. Connect Telegram bot (for notifications)
3. Add LLM API keys (OpenAI/Anthropic)
4. Configure team agent roles (which agents does this client need?)

### Day 3: VPS Provisioning
1. Provision Contabo VPS (if dedicated plan)
2. Run install script: `bash <(curl) install.sh --plan <tier>`
3. Verify services: n8n, Chrome VNC, OpenClaw Gateway
4. Register VPS in dashboard (Settings → VPS Instances)

### Day 7: Training & Handoff
1. Send onboarding guide (auto-generated from /guides)
2. Schedule 30-min walkthrough call
3. Hand off to ZeroClaw for ongoing support

---

## Pricing Plans (Source of Truth)

### Starter — $49/month
- 1 AI Agent (configurable role)
- n8n Workflow Automation
- GHL MCP Integration
- Telegram Bot Notifications
- 1 VPS Instance (2 vCPU, 4GB RAM)
- Community support

### Professional — $149/month
- 3 AI Agents (co-founder + 2 specialists)
- All Starter features
- WhatsApp Integration
- Discord Integration
- Slack Integration
- Chrome Browser Automation
- Priority Support
- 1 VPS Instance (4 vCPU, 8GB RAM)

### Agency — $499/month
- Unlimited AI Agents
- All Professional features
- White-label Dashboard
- Client Sub-accounts (up to 10)
- Custom Domain
- Dedicated VPS (8 vCPU, 16GB RAM)
- Onboarding Call Included

---

## Weekly Operating Rhythm

| Day | Focus |
|-----|-------|
| Monday | Sprint planning + feature prioritization |
| Tuesday-Thursday | Deep work (dev, infra, product) |
| Friday | Release week work + metrics review |
| Weekend | Rest + strategic thinking |

### Monday Morning Ritual
1. Henry reviews weekly revenue + signup metrics
2. Team sync: what's done, what's blocked, what's next
3. Prioritize top 3 tasks for the week
4. Flag anything needing Pulkit's input

### Friday Afternoon Ritual
1. Deploy weekly release (if any)
2. Update changelog
3. Send weekly digest to active users
4. Plan next week

---

## Emergency Procedures

### Service Down (P0)
1. Check service status: `systemctl status <service>`
2. Restart service: `systemctl restart <service>`
3. Check logs: `journalctl -u <service> -n 50 --no-pager`
4. If VPS-level issue: SSH to VPS, check docker/systemd
5. Escalate to Arjun immediately

### Security Incident
1. Isolate affected service
2. Check unauthorized access in logs
3. Rotate any potentially compromised credentials
4. Notify affected users
5. Post-mortem within 24 hours

### Data Loss
1. Stop any write operations to affected DB
2. Check latest backup
3. Restore from backup
4. Verify data integrity
5. Document incident

---

## Tool Stack (Current)

| Component | Tech | Location |
|----------|------|----------|
| Dashboard App | Next.js 16 | app.clawops.studio |
| Auth | Supabase PKCE + Google OAuth | supabase.co |
| Ops Panel | Node.js + vanilla HTML | app.clawops.studio/ops |
| VPS (ours) | Contabo VPS, Ubuntu | vmi3094584 |
| Tunnel | Cloudflared | port 20241 |
| n8n | Docker | port 5678 |
| Chrome VNC | Docker (noVNC) | port 5800 |
| OpenClaw | Native (not Docker) | port 18789 |
| Auth Proxy | Node.js | port 4001 |
| NLP/HI | DeerFlow | port 3002 |

---

*Document Version: 1.0 — 2026-04-15*
*Owner: Henry (AI Co-Founder)*
*Review: Weekly*
