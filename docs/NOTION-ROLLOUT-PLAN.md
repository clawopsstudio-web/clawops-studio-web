# Notion Rollout Plan — ClawOps Studio

**Last Updated:** 2026-04-01  
**Status:** Proposed rollout plan  
**Scope:** Mirror the new architecture, blueprint, and knowledge docs into the existing ClawOps Notion workspace under the current parent page.

---

## 1. Goal

Turn the current Notion setup from a small set of pages plus a catch-all rollup into a clean operating workspace that:

- preserves the current HQ/dashboard/database structure
- mirrors the new canonical local docs in a readable way
- keeps strategic docs easy to browse for humans
- avoids turning Notion into a second unmanaged filesystem
- makes it obvious what is a stable reference page vs a living database

This plan assumes the existing parent page remains the root:
- **Parent page ID:** `330be54579ac8064800ff45210674b55`

---

## 2. Current Notion State

Already present in Notion:

- **ClawOps HQ Dashboard**
- **ClawOps Studio Operating System**
- **ClawOps Studio Agent Directory**
- Core databases:
  - **Sales Pipeline**
  - **Research Queue**
  - **Build / Ops Tasks**
- A broad catch-all page:
  - **ClawOps Workspace Architecture + Blueprint + Knowledge Rollup**

### Current problem

The documentation set in `docs/` has expanded fast. The local workspace now contains distinct document families:

- company operating docs
- product architecture docs
- deployment blueprint docs
- customer journey / offering docs
- tooling and integration playbooks
- knowledge-base and NotebookLM docs

If these are mirrored into Notion as one giant rollup page, the result becomes hard to navigate and hard to maintain.

---

## 3. Core rollout rules

### Rule 1 — Local markdown stays canonical for deep technical truth
The repo remains the primary source of truth for long-form technical and product design docs.

Notion should mirror and organize that knowledge, not replace the repo.

### Rule 2 — Notion is for navigation, summaries, operating visibility, and shared reading
Notion should be optimized for:

- browsing
- executive review
- operational handoff
- lightweight editing/comments
- dashboards and linked databases

### Rule 3 — Stable docs become pages; repeated work becomes databases
If the content is a document with sections and a durable narrative, it should be a **page**.
If the content is a list of repeatable items with status/owner/priority, it should be a **database**.

### Rule 4 — Avoid top-level sprawl
Do not create 20+ sibling pages directly under the parent page.
Use 4-6 clear hub pages and place detailed docs as subpages.

### Rule 5 — One-way default sync
Default discipline should be:
- **local file first**
- **Notion mirror second**

If someone makes a substantive content change in Notion, it should be back-ported into the local markdown file the same day.

---

## 4. Recommended top-level Notion tree

Under the existing parent page, the structure should become:

```text
ClawOps Workspace (existing parent)
├── ClawOps HQ Dashboard (existing)
├── ClawOps Studio Operating System (existing)
├── ClawOps Studio Agent Directory (existing)
├── Product Architecture (new hub)
│   ├── System Overview
│   ├── Architecture Freeze V1
│   ├── Client Journey & Deployment Flow
│   ├── Default User Offering Matrix
│   └── Agent Operating Spec
├── Deployment Blueprint & Delivery (new hub)
│   ├── Deployment Blueprint Schema V1
│   ├── Deployment Sequence
│   ├── Install Plan
│   ├── Third-Party Installs
│   └── Supabase Baseline
├── Knowledge Base & Playbooks (new hub)
│   ├── Workspace Knowledge Index
│   ├── NotebookLM Workspace Knowledge Base
│   ├── Agent Tooling Matrix
│   ├── Agent Tooling Plan
│   ├── Skill Inventory
│   ├── Execution Path Decision Framework
│   ├── Google Workspace Integration Plan
│   ├── GHL Setup
│   └── Telegram Delivery / Lane docs as needed
└── Databases (existing section via linked views, not necessarily a page rename)
    ├── Sales Pipeline
    ├── Research Queue
    └── Build / Ops Tasks
```

### Important rename/reuse recommendation
The current page:
- **ClawOps Workspace Architecture + Blueprint + Knowledge Rollup**

should be **repurposed**, not kept as a giant dump page.

Recommended new title:
- **ClawOps Workspace Knowledge Index**
- or **Knowledge Base & Playbooks** if used as the main hub page

Its purpose should become:
- short explanation of the knowledge structure
- links to the major doc hubs
- “start here” navigation
- recent additions / changed docs

Not the full pasted contents of every document.

---

## 5. What should live as pages vs databases

## 5.1 Pages

Use **pages** for canonical docs and narrative references.

These should be pages:

### Company / org reference
- `docs/CLAWOPS-STUDIO-OPERATING-SYSTEM.md`
- `docs/SYSTEM-OVERVIEW.md`
- `docs/AGENT-OPERATING-SPEC.md`
- `agents/*.md` content via Agent Directory / subpages

### Product architecture
- `docs/ARCHITECTURE-FREEZE-V1.md`
- `docs/CLIENT-JOURNEY-AND-DEPLOYMENT-FLOW.md`
- `docs/DEFAULT-USER-OFFERING-MATRIX.md`
- `docs/ARCHITECTURE.md` if still needed as supporting history/reference

### Deployment blueprint + implementation references
- `docs/DEPLOYMENT-BLUEPRINT-SCHEMA-V1.md`
- `docs/DEPLOYMENT-SEQUENCE.md`
- `docs/INSTALL-PLAN.md`
- `docs/THIRD-PARTY-INSTALLS.md`
- `docs/SUPABASE-BASELINE.md`

### Knowledge / research / operating references
- `docs/NOTEBOOKLM-WORKSPACE-KNOWLEDGE-BASE.md`
- `docs/AGENT-TOOLING-MATRIX.md`
- `docs/AGENT-TOOLING-PLAN.md`
- `docs/SKILL-INVENTORY.md`
- integration playbooks worth sharing internally

## 5.2 Databases

Keep **databases** only for repeated operational records.

Existing databases already make sense:
- **Sales Pipeline** → repeatable opportunities with status
- **Research Queue** → repeatable research tasks/briefs
- **Build / Ops Tasks** → repeatable implementation and operations tasks

### Recommended near-term database policy
Do **not** create a new Notion database just because a doc family got large.

Only create a new database if there will be repeated records requiring:
- owner
- status
- priority
- due date
- filtering/views
- cross-linking

### Candidate future databases
These may become useful later, but are not required for this rollout:

- **Client Deployments** database
- **Deployment Blueprints** database
- **Integrations Catalog** database
- **Documentation Change Log** database

For now, avoid unnecessary schema sprawl.

### Best practical choice right now
Use the existing **Build / Ops Tasks** database for documentation rollout and sync work.
Suggested tag or property values:
- Area: `Notion`
- Type: `Docs Sync`
- Related hub: `Architecture` / `Blueprint` / `Knowledge`

---

## 6. Recommended page design pattern for mirrored docs

Every mirrored Notion doc page should begin with a short metadata block.

Suggested top block format:

```text
Source file: docs/ARCHITECTURE-FREEZE-V1.md
Owner: Henry / Dev
Status: Draft v1
Canonical source: Local repo markdown
Last local update: 2026-03-31
Last Notion sync: YYYY-MM-DD
```

Then structure the page as:

1. **Executive summary** — 3-8 bullets
2. **Key decisions** — what changed / what is locked
3. **Main body** — mirrored content from markdown
4. **Open questions / next actions** — if applicable
5. **Links to related pages** — cross-links to adjacent docs

### Why this matters
Most people should be able to scan the page without reading 1,000+ lines.
The summary layer makes Notion useful even when the local markdown stays long.

---

## 7. Sync discipline

## 7.1 Canonicality rule
- **Local markdown = canonical for substance**
- **Notion = canonical for navigation + dashboards + lightweight operating views**

## 7.2 When Notion must be updated
Update the relevant Notion pages when any of these happen:

- architecture boundary changes
- deployment flow changes
- blueprint schema meaning changes
- operating roles or ownership change
- a new major doc becomes part of the working system
- a page title or hub structure changes

## 7.3 When Notion does not need immediate update
Not every wording change needs a manual sync.
Small edits can wait until the next scheduled documentation sync if they do not change meaning.

## 7.4 Recommended cadence
- **Immediate sync (same day):** architecture/blueprint/operating-system changes
- **Twice-weekly sweep:** knowledge/playbook pages
- **Weekly review:** top-level hub structure, stale links, orphan pages

## 7.5 Change-handling rule
If a change begins in Notion and is more than cosmetic:
1. update the local markdown file
2. commit it to git
3. then re-sync Notion

That prevents silent divergence.

---

## 8. Immediate pages/subpages to create next

This is the minimum practical rollout, in order.

## Phase 1 — Clean the top level

### Create or repurpose these hub pages
1. **Product Architecture**
2. **Deployment Blueprint & Delivery**
3. **Knowledge Base & Playbooks**
4. Repurpose the current **Workspace Architecture + Blueprint + Knowledge Rollup** page into a clean index/hub instead of a content dump

## Phase 2 — Mirror the most important canonical docs

### Under Product Architecture
Create these pages first:
- **System Overview**
- **Architecture Freeze V1**
- **Client Journey & Deployment Flow**
- **Default User Offering Matrix**
- **Agent Operating Spec**

### Under Deployment Blueprint & Delivery
Create these pages first:
- **Deployment Blueprint Schema V1**
- **Deployment Sequence**
- **Install Plan**
- **Supabase Baseline**

### Under Knowledge Base & Playbooks
Create these pages first:
- **Workspace Knowledge Index**
- **NotebookLM Workspace Knowledge Base**
- **Agent Tooling Matrix**
- **Agent Tooling Plan**
- **Skill Inventory**

## Phase 3 — Link operations to docs

Inside the relevant hub pages, add linked references to:
- **Build / Ops Tasks** view filtered to documentation or Notion work
- **Research Queue** view where research informs architecture/offering docs
- **Sales Pipeline** only where customer-facing packaging docs are relevant

This keeps docs connected to execution without turning the docs themselves into databases.

---

## 9. Suggested local-file to Notion mapping

| Local file | Recommended Notion home | Format |
|---|---|---|
| `docs/CLAWOPS-STUDIO-OPERATING-SYSTEM.md` | existing Operating System page | page |
| `docs/SYSTEM-OVERVIEW.md` | Product Architecture | page |
| `docs/ARCHITECTURE-FREEZE-V1.md` | Product Architecture | page |
| `docs/CLIENT-JOURNEY-AND-DEPLOYMENT-FLOW.md` | Product Architecture | page |
| `docs/DEFAULT-USER-OFFERING-MATRIX.md` | Product Architecture | page |
| `docs/AGENT-OPERATING-SPEC.md` | Product Architecture | page |
| `docs/DEPLOYMENT-BLUEPRINT-SCHEMA-V1.md` | Deployment Blueprint & Delivery | page |
| `docs/DEPLOYMENT-SEQUENCE.md` | Deployment Blueprint & Delivery | page |
| `docs/INSTALL-PLAN.md` | Deployment Blueprint & Delivery | page |
| `docs/THIRD-PARTY-INSTALLS.md` | Deployment Blueprint & Delivery | page |
| `docs/SUPABASE-BASELINE.md` | Deployment Blueprint & Delivery | page |
| `docs/NOTEBOOKLM-WORKSPACE-KNOWLEDGE-BASE.md` | Knowledge Base & Playbooks | page |
| `docs/AGENT-TOOLING-MATRIX.md` | Knowledge Base & Playbooks | page |
| `docs/AGENT-TOOLING-PLAN.md` | Knowledge Base & Playbooks | page |
| `docs/SKILL-INVENTORY.md` | Knowledge Base & Playbooks | page |
| `docs/GOOGLE-WORKSPACE-INTEGRATION-PLAN.md` | Knowledge Base & Playbooks | page |
| `docs/GHL-SETUP.md` | Knowledge Base & Playbooks | page |
| `agents/*.md` | existing Agent Directory | page/subpage |

---

## 10. What not to do

Avoid these failure modes:

### Do not dump every markdown file flat under the parent page
That makes Notion noisy and unreadable.

### Do not create databases for static documentation
A docs database sounds tidy but usually creates more maintenance than value unless the team truly manages docs that way every week.

### Do not let Notion become the only place where important edits happen
That breaks git history and causes drift from the working repo.

### Do not keep the current “rollup” page as a giant pasteboard
Use it as an index/hub or retire it.

---

## 11. Recommended execution sequence

### Step 1
Repurpose the current rollup page into a hub/index.

### Step 2
Create the three main new doc hubs:
- Product Architecture
- Deployment Blueprint & Delivery
- Knowledge Base & Playbooks

### Step 3
Mirror the first 8 priority pages:
- System Overview
- Architecture Freeze V1
- Client Journey & Deployment Flow
- Agent Operating Spec
- Deployment Blueprint Schema V1
- Deployment Sequence
- NotebookLM Workspace Knowledge Base
- Agent Tooling Matrix

### Step 4
Add summary headers + source metadata to each mirrored page.

### Step 5
Use Build / Ops Tasks to track remaining doc sync work and stale page cleanup.

---

## 12. Final recommendation

The right Notion shape for ClawOps is:

- a **small number of hub pages**
- **canonical docs mirrored as pages**
- **real operational work tracked in existing databases**
- **local markdown staying authoritative for deep system truth**

That gives ClawOps a workspace that is readable for leadership, usable for operations, and still disciplined enough to stay aligned with the repo.
