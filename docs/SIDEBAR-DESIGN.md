# Agentic OS — Sidebar Navigation Design

**Created by:** Andrew (Frontend/UX Engineer)
**Date:** 2026-04-17
**Status:** Draft — ready for review

---

## Overview

The sidebar is the primary navigation for Agentic OS (app.clawops.studio). It replaces the current OpenClaw dashboard sidebar with a purpose-built navigation for a multi-tenant SaaS product targeting business owners.

**Design principles:**
- Fast orientation — most-used items surface first
- Compact by default, expandable on demand
- Mobile-first responsive behavior
- Matches existing dashboard's dark/material aesthetic

---

## Navigation Items

### Primary Navigation (top of sidebar, always visible)

| # | Label | Route | Icon (lucide-react) | Purpose |
|---|-------|-------|---------------------|---------|
| 1 | Dashboard | `/dashboard/` | `LayoutDashboard` | Overview, key metrics, agent status |
| 2 | CRM | `/dashboard/crm` | `Users` | Contacts, companies, deals pipeline |
| 3 | Social | `/dashboard/social` | `Share2` | Composio posting, calendar, analytics |
| 4 | Tasks | `/dashboard/tasks` | `CheckSquare` | Tasks Kanban (To Do / Doing / Done) |
| 5 | AI Agents | `/dashboard/agents` | `Bot` | ZeroClaw, Hermes, spawned agents |
| 6 | Skills | `/dashboard/skills` | `BookOpen` | Skills library (GitHub browse + install) |
| 7 | Tools | `/dashboard/tools` | `Wrench` | MCP servers (Smithery), plugins |
| 8 | Integrations | `/dashboard/integrations` | `Plug` | GHL placeholders, Google Workspace |

### Secondary Navigation (bottom of sidebar, always visible)

| # | Label | Route | Icon (lucide-react) | Purpose |
|---|-------|-------|---------------------|---------|
| 9 | Account | `/dashboard/account` | `UserCircle` | Profile, team, billing |
| 10 | Settings | `/settings` | `Settings` | API keys, danger zone, operator profile |

### Tool Links (authenticated proxy — opens in same tab or new tab)

| Label | Route | Icon | Behavior |
|-------|-------|------|----------|
| n8n | `/n8n` | `Workflow` | Proxy → port 5678 |
| Browser | `/browser` | `Globe` | Proxy → agent-browser |
| Stealth | `/stealth` | `EyeOff` | Proxy → camoufox :9377 |
| Gateway | `/gateway` | `Zap` | Proxy → OpenClaw :18789 |
| HiClaw | `/hiclaw` | `Network` | Proxy → HiClaw :18080 |

---

## Priority Order

**Rationale:** Business owners need to see what's happening (Dashboard) → manage their customers (CRM) → post content (Social) → track work (Tasks) → manage their AI workforce (AI Agents). The secondary tools and settings come less frequently.

```
1. Dashboard     ← Daily first stop
2. CRM           ← Customer data is core
3. Social        ← Content ops
4. Tasks         ← Daily task management
5. AI Agents     ← Managing the AI team
6. Skills        ← Extend capabilities
7. Tools         ← MCP / plugins
8. Integrations  ← Connect external services
───────────────────────────── separator ───────────────────────────
9. Account       ← Team + billing (less frequent)
10. Settings     ← Developer/sysadmin tasks
───────────────────────────── divider ─────────────────────────────
Tool Links       ← Collapsible section, opens external tools
```

---

## Icon Choices (lucide-react)

| Section | Item | Icon | Alternative |
|---------|------|------|-------------|
| Primary | Dashboard | `LayoutDashboard` | `Home` |
| Primary | CRM | `Users` | `AddressBook`, `UserCheck` |
| Primary | Social | `Share2` | `Megaphone`, `Rss` |
| Primary | Tasks | `CheckSquare` | `ListTodo`, `ClipboardList` |
| Primary | AI Agents | `Bot` | `Cpu`, `Sparkles` |
| Primary | Skills | `BookOpen` | `Library`, `GraduationCap` |
| Primary | Tools | `Wrench` | `Tool`, `Puzzle` |
| Primary | Integrations | `Plug` | `Link2`, `Plug2` |
| Secondary | Account | `UserCircle` | `IdCard`, `Building2` |
| Secondary | Settings | `Settings` | `Sliders`, `Cog` |
| Tools | n8n | `Workflow` | `GitBranch`, `Route` |
| Tools | Browser | `Globe` | `Monitor`, `MonitorPlay` |
| Tools | Stealth | `EyeOff` | `Ghost`, `SearchX` |
| Tools | Gateway | `Zap` | `Terminal`, `Rocket` |
| Tools | HiClaw | `Network` | `GitMerge`, `Webhooks` |

**Selected:** First column icons (most widely recognized).

---

## Page Contents

### Dashboard (`/dashboard/`)
- Welcome header with account name
- Key metrics: active agents, open tasks, recent deals, unread messages
- Agent status cards (idle / working / error)
- Quick actions: "New Task", "New Contact", "Post to Social"
- Recent activity feed

### CRM (`/dashboard/crm`)
- Tab: Contacts — list + detail view, add/edit
- Tab: Companies — company records linked to contacts
- Tab: Deals — Kanban board (Lead / Qualified / Proposal / Won / Lost)
- Search + filters

### Social (`/dashboard/social`)
- Connected accounts (Twitter, LinkedIn, Instagram)
- Composer: write + schedule posts
- Calendar view: upcoming scheduled content
- Analytics: engagement metrics per platform

### Tasks (`/dashboard/tasks`)
- Kanban board: To Do / In Progress / Done
- Drag-and-drop task cards
- Assignee + due date
- Filter by assignee or priority

### AI Agents (`/dashboard/agents`)
- Agent cards: name, type (ZeroClaw/Hermes/Spawned), status
- Start/pause/kill controls per agent
- Agent detail view: conversation history, logs
- "Spawn Agent" button

### Skills (`/dashboard/skills`)
- Grid of available skills from GitHub repo
- One-click install
- Installed vs available tabs
- Skill detail: description, inputs, outputs

### Tools (`/dashboard/tools`)
- Tab: MCP Servers — browse smithery.ai, enable/disable per account
- Tab: Plugins — custom plugins, install via URL or GitHub
- Status indicators (connected / error)

### Integrations (`/dashboard/integrations`)
- Cards per provider: GHL, Google Workspace, Composio
- OAuth connect/disconnect flows
- Status: connected, error, not configured
- Configure: API key entry fields for each

### Account (`/dashboard/account`)
- Profile: name, email, avatar upload
- Team: invite by email, role management
- Billing: current plan, upgrade button, usage stats
- API Keys: list + create new
- Danger Zone: delete account

### Settings (`/settings`)
- Operator profile (name, photo)
- Accent color + branding
- Agent customization (per-agent emoji/avatar)
- Reset all

---

## Mobile Sidebar Behavior

**Breakpoint:** `md` (768px) — below this, sidebar becomes a mobile drawer.

### Mobile Behavior

| Behavior | Implementation |
|----------|---------------|
| Sidebar hidden by default on mobile | `display: none` on `<768px` |
| Hamburger button in header bar | Opens `MobileSidebar` drawer |
| Drawer slides in from left | `transform: translateX(-100%)` → `translateX(0)` |
| Overlay / backdrop | Semi-transparent overlay closes drawer on tap |
| Tool links shown as bottom row | Always visible at bottom of drawer |
| Active page highlighted | Uses `usePathname()` matching |

### Desktop Behavior

| Behavior | Implementation |
|----------|---------------|
| Collapsed state: 56px wide | Icon-only, no labels |
| Expanded state: 200px wide | Icon + label |
| Collapse toggle button | Top-right of sidebar, `PanelLeftClose` / `PanelLeftOpen` |
| Active state per item | `bg-surface-hover` background, accent color icon |
| Tool links section | Collapsible section at bottom of nav |

---

## Component Structure

```
Sidebar (components/Sidebar.tsx)
├── DesktopSidebar (aside, flex-col, w-56/w-200)
│   ├── CollapseToggle (button)
│   ├── NavLinks (global items)
│   │   ├── NavItem (× 8 primary)
│   │   ├── Divider
│   │   ├── NavItem (× 2 secondary)
│   │   └── Divider
│   └── ToolLinksSection (collapsible)
│       └── ToolLink (× 5)
│
└── MobileSidebar (full-height drawer)
    ├── Logo area
    ├── NavLinks (same as desktop)
    ├── ToolLinks (same as desktop)
    └── Close button
```

---

## CSS Variables (reuse existing design system)

```css
--sidebar-bg:       var(--material-regular)  /* or --bg-secondary */
--sidebar-width:    200px
--sidebar-collapsed: 56px
--nav-active-bg:    var(--surface-hover)
--nav-active-color: var(--accent)
--nav-text:         var(--text-secondary)
--nav-text-hover:   var(--text-primary)
```

---

## Implementation Notes

1. **Route prefix:** All Agentic OS pages live under `/dashboard/`. The existing `/settings` route is preserved.
2. **Auth guard:** Every `/dashboard/*` route must validate the InsForge JWT cookie via middleware.
3. **Tool link proxying:** n8n, browser, stealth, gateway, hiclaw links are `<a target="_blank">` pointing to proxy routes that inject the JWT cookie server-side.
4. **Icon size:** 20px in desktop sidebar labels, 18px for tool links. Collapsed state: 18px centered.
5. **Badge support:** CRM (unread contacts), Tasks (open count), Social (pending posts) — show numeric badge on nav item.
6. **Active route:** Use `usePathname()` with `startsWith` matching for parent routes (e.g., `/dashboard/crm` highlights CRM).
