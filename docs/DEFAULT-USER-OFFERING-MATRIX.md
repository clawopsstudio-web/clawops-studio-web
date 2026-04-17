# Default User Offering Matrix

**Last Updated:** 2026-03-31  
**Status:** Draft v1

---

## 1. Purpose

This document defines what ClawOps gives to users by default, what is optional, what is premium, and what remains internal-only.

The goal is to avoid three common mistakes:
- giving every customer too much on day one
- exposing internal engineering tools as customer product features
- failing to distinguish between the base product and premium/custom work

---

## 2. Packaging Principle

ClawOps should not ship as one giant pile of agents, tools, skills, and integrations.

It should ship in four layers:
1. **Default** — included for the relevant customer shape
2. **Optional / Guided** — recommended and easy to connect later
3. **Premium / Custom** — advanced or client-specific capability
4. **Internal-only** — used by ClawOps but not framed as customer-facing product

---

## 3. Offering Matrix

| Item | Category | Who gets it | Customer-visible? | Why it exists | Delivery form |
|------|----------|-------------|-------------------|---------------|---------------|
| Mission Control dashboard | Default | All customers | Yes | First control plane and first chat surface | App surface |
| Mission Control chat with default assistant | Default | All customers | Yes | Immediate usability before external channels | Runtime + UI |
| Starter Brain | Default | All customers | Yes | Gives immediate usable AI from day one | Model config |
| Bring Your Own Brain option | Optional | Customers who want premium/provider control | Yes | Lets customer use their own provider/API | Config + guided setup |
| Hybrid Brain option | Optional | Customers who want both default and premium | Yes | Smooth upgrade path over time | Config + guided setup |
| Solo Assistant Pack | Default | Solo/operator profiles | Yes | Right-sized AI for individuals | Agent pack |
| Small Specialist Pack | Default | Small business profiles | Yes | Right-sized AI for small teams | Agent pack |
| Full Team Pack | Default | Agency/advanced profiles | Yes | Multi-role execution for complex businesses | Agent pack |
| Setup guidance / approval-safe operating behavior | Default | All customers | Yes | Prevents unsafe or confusing automation | Skill/behavior |
| Web research capability | Default | All customers | Yes | Universal research and problem-solving | Skill/tool layer |
| Document/file handling | Default | All customers | Yes | Universal writing and artifact handling | Skill/tool layer |
| Integration guide behavior | Default | All customers | Yes | Helps connect apps without terminal usage | Skill/behavior |
| Recommended setup checklist | Default | All customers | Yes | Makes post-deploy setup understandable | UI + backend state |
| Telegram connection | Optional | Customers who want Telegram | Yes | Messaging execution surface | Channel integration |
| WhatsApp connection | Optional | Customers who want WhatsApp | Yes | Messaging execution surface | Channel integration |
| Discord connection | Optional | Customers who want Discord | Yes | Messaging execution surface | Channel integration |
| Slack connection | Optional | Customers who want Slack | Yes | Messaging execution surface | Channel integration |
| Gmail connection | Optional | Customers with email workflows | Yes | High-value operational tool | Integration |
| Calendar connection | Optional | Customers with scheduling workflows | Yes | High-value operational tool | Integration |
| Drive connection | Optional | Customers using Google files | Yes | Shared file/artifact layer | Integration |
| Docs connection | Optional | Customers using document workflows | Yes | Writing/collab workflows | Integration |
| Sheets connection | Optional | Customers using spreadsheet workflows | Yes | Structured operational data | Integration |
| Notion connection | Optional | Customers using docs/databases | Yes | Knowledge/workspace operations | Integration |
| GoHighLevel connection | Optional | Customers using GHL/CRM workflows | Yes | Sales and CRM execution | Integration |
| NotebookLM capability pack | Optional / Recommended | Content, research, and strategy-heavy customers | Yes | Proven high-value content/research generation path | Skill + browser/session-backed tool |
| Guided Chrome session capture for supported web tools | Optional / Guided | Customers using browser-first tools | Yes | Makes some web apps practically usable without native API | Guided setup + harness |
| Tailscale onboarding guidance | Default where private access is needed | All customers using private surfaces | Yes | Enables secure access to dashboard/browser/private resources | Guided setup |
| Mobile Tailscale setup guidance | Optional / Recommended | Customers wanting mobile access | Yes | Makes private instance reachable on phone | Guided setup |
| Customer-facing knowledge/content tools | Optional | Depending on use case | Yes | Expand value beyond core assistant | Skill/integration |
| Premium custom skill pack | Premium | Advanced customers | Yes | Tailored workflows and reusable SOPs | Skill pack |
| Premium custom browser/CLI harness | Premium | Advanced customers | Yes | Wraps specific UI-only web workflows | Harness pack |
| Premium custom automation workflows | Premium | Advanced customers | Yes | Encodes client-specific process automation | n8n / scripts / integration layer |
| Premium custom MCP/server adapters | Premium | Advanced customers | Yes | Structured deep integration for special systems | MCP/integration |
| Supabase | Internal-only | ClawOps internal stack | No | Backend/database implementation | Internal infra |
| Vercel | Internal-only | ClawOps internal stack | No | Frontend/build/deploy tooling | Internal infra |
| Contabo | Internal-only | ClawOps internal stack | No | VPS provisioning target | Internal infra |
| Tailscale internals / tailnet admin mechanics | Internal-only with guided user help only | ClawOps internal stack | Mostly No | Secure access plumbing | Internal infra |
| Docker/runtime internals | Internal-only | ClawOps internal stack | No | Service hosting | Internal infra |
| OpenClaw gateway internals | Internal-only | ClawOps internal stack | No | Runtime plumbing | Internal infra |
| Session-store/runtime hardening internals | Internal-only | ClawOps internal stack | No | Reliability and security | Internal infra |

---

## 4. Default Day-One User Experience

Every customer should get this on day one:
- Mission Control dashboard
- dashboard chat with default assistant or team lead
- starter brain
- profile-matched assistant/team shape
- basic research and document capability
- guided setup queue
- clear next-step recommendations

The customer should not need any external messaging app to start.

---

## 5. Default Day-One Setup Prompts

After first login, the system should proactively ask whether the customer wants to connect:
- Telegram
- WhatsApp
- Discord
- Slack
- Gmail
- Calendar
- Notion
- GHL (if relevant)
- NotebookLM or other high-value content/research tools (if relevant)
- premium model/provider access

This should be profile-driven rather than globally shown in random order.

---

## 6. NotebookLM Positioning

NotebookLM should be part of the recommended ClawOps offering for the right customer profiles.

Why it belongs:
- it has already proven practical value in the ClawOps environment
- it is useful for content generation, synthesis, research, presentations, and report-style outputs
- it can be wrapped into guided browser/session-backed workflows when direct API coverage is not the main operating path

How it should be positioned:
- not as a mandatory universal default for every customer
- but as a recommended optional capability pack for content, research, strategy, education, and presentation-heavy users

What the assistant should guide:
- how to access the server/browser safely
- how to use Tailscale if required for private access
- how to log into the relevant Google account in server Chrome
- how session-backed usage works in practical terms
- how to generate useful outputs once setup is complete

---

## 7. Customer-Facing Scope Rules

### Show to customers
- AI assistant/team options
- brain options
- messaging channel options
- business app integrations
- content/research capability packs
- setup progress and recommendations
- premium customization options

### Do not show as product features
- raw deployment internals
- backend/database implementation details
- build/deploy tooling details
- infrastructure reliability internals
- engineering environment details

---

## 8. Packaging Recommendations by Customer Shape

## 8.1 Solo Assistant Pack
Default included:
- Mission Control
- starter brain
- one main assistant
- research + writing + setup guidance

Recommended next:
- one messaging channel
- Gmail/Calendar
- NotebookLM if content/research heavy

## 8.2 Small Business Pack
Default included:
- Mission Control
- starter brain
- HQ assistant + 1–2 specialists
- setup guidance
- basic docs/research capability

Recommended next:
- messaging channel
- workspace apps
- CRM if needed
- NotebookLM if content/research heavy

## 8.3 Full Team Pack
Default included:
- Mission Control
- starter brain
- multi-role team
- setup guidance
- research/docs/basic workflow capability

Recommended next:
- messaging expansion
- workspace apps
- CRM and workflow tools
- advanced content/research tools
- premium automations if needed

---

## 9. Summary

The customer offering should stay lean, clear, and profile-matched.

### Default
- Mission Control
- chat with assistant/team lead
- starter brain
- profile-matched assistant/team
- basic universal capabilities

### Optional / Guided
- messaging channels
- workspace apps
- CRM/business apps
- NotebookLM and similar high-value capability packs
- BYO model/provider setup

### Premium
- custom skills
- custom automations
- custom browser/CLI harnesses
- custom integration layers

### Internal-only
- Supabase
- Vercel
- Contabo
- infrastructure/runtime internals

This matrix should be used as the customer-facing packaging baseline before building deeper onboarding, pricing, and architecture flows.

---

## 10. Catalog / Marketplace Direction

ClawOps should eventually support a reusable catalog of installable capabilities.

Recommended maturity path:
1. private internal repo of skills/harnesses/install packs
2. curated internal catalog for ClawOps deployments
3. client-specific import/install workflow
4. optional broader marketplace later

Important positioning rule:
- launch focus is not a public marketplace
- launch focus is a reliable internal capability catalog

Customer-visible outcome later:
- easier add-ons
- cleaner upgrades
- reusable capability packs
- faster deployment of profile-matched assistants and tools
