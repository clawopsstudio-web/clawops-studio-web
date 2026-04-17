# ClawOps Studio — Connectivity Matrix V1

**Last Updated:** 2026-04-01  
**Status:** Active execution doc  
**Owner:** Henry

---

## Purpose

This matrix replaces vague “connect X” planning with verified runtime truth.

For each service we track:
- current access state
- preferred path
- fallback path
- owner
- blocker
- next action

Execution rule remains:
**API → MCP → n8n → CLI → browser**

---

## 1. Google Workspace core (active first block)

| Service | Current access state | Verified evidence | Preferred path | Fallback path | Owner | Blocker | Next action |
|---|---|---|---|---|---|---|---|
| Gmail | **PARTIAL / DRIFTING** | Live Chrome shows Gmail-related pages at Google account chooser; `mail.google.com` service worker exists, so some Gmail session state exists, but inbox access is not currently verified as stable | Gmail API | n8n / browser for auth recovery | Henry + Dave | browser account state is inconsistent; current tab is not a clean verified inbox | recover a clean Gmail session in Chrome, confirm primary Google account, then verify one real action |
| Calendar | **BLOCKED BY SIGN-IN** | Live Chrome navigation landed on `accounts.google.com` account chooser for Calendar | Google Calendar API | browser for auth recovery, then n8n | Henry + Dave | no verified signed-in Calendar session in this Chrome context | log into Calendar with the intended primary account and verify one real read action |
| Drive | **BLOCKED BY SIGN-IN** | Live Chrome navigation landed on `accounts.google.com` account chooser for Drive | Drive API | browser for auth recovery, then n8n | Henry + Dave | no verified signed-in Drive session | recover Drive session and verify one real folder/list action |
| Docs | **BLOCKED BY SIGN-IN** | Live Chrome navigation landed on `accounts.google.com` account chooser for Docs | Docs API + Drive API | browser for auth recovery | Henry + Dave | no verified signed-in Docs session | recover Docs session and verify one real open/create action |
| Sheets | **BLOCKED BY SIGN-IN** | Live Chrome navigation landed on `accounts.google.com` account chooser for Sheets | Sheets API | browser for auth recovery | Henry + Dave | no verified signed-in Sheets session | recover Sheets session and verify one real read/append action |
| Google AI Studio | **BROWSER VERIFIED** | Live Chrome tab open at `https://aistudio.google.com/apps` | API for targeted use | browser | Andrew + Henry | API/auth path not yet chosen; currently browser-level validation only | classify use case and decide whether API exposure is worth doing now |

### Immediate conclusion
Google Workspace is **not yet cleanly connected** in this Chrome/runtime context.

The hard truth from live execution:
- Gmail has traces of prior login/session state, but is currently not cleanly verified
- Calendar, Drive, Docs, and Sheets all currently bounce to Google sign-in/account chooser
- AI Studio is browser-verified only

### Immediate Google execution order
1. Confirm the intended primary account for Workspace operations
2. Recover Gmail session cleanly
3. Recover Calendar session
4. Recover Drive/Docs/Sheets sessions
5. Verify one real action per service
6. Only after that choose which actions should be API-first, MCP-wrapped, or n8n-backed

---

## 2. Google browser-backed / creative tools

| Tool | Current access state | Verified evidence | Preferred path | Fallback path | Owner | Blocker | Next action |
|---|---|---|---|---|---|---|---|
| NotebookLM | **WORKING IN BROWSER / CLI HISTORY VERIFIED** | Live Chrome tab open at `https://notebooklm.google.com/`; prior CLI work already produced notebooks and artifacts locally | browser-backed CLI harness | manual browser | Henry + Arjun/Tyler | auth can drift; DNS/auth instability has happened before | keep as active session-backed tool, but do not treat as Workspace-core auth proof |
| Whisk | **WORKING** | Live Chrome Whisk project tabs are open; harness already proved generate/export flow | browser-backed CLI harness | manual browser | Tyler + Henry | session fragility / recaptcha / browser dependence | keep operational for content workflows |
| Flow | **PARTIAL** | Live Chrome tab open at `https://labs.google/fx/tools/flow`; earlier harness is scaffold-only | browser-backed CLI harness | manual browser | Tyler + Henry | no proven end-to-end generation/export flow yet | keep as experimental until one full real workflow is proven |
| Pomelli | **ABOUT PAGE ONLY / REGION LIMITED** | Browser tab is on Pomelli about page, not a proven working app flow | browser | none yet | Tyler + Henry | region/access constraint | defer |

---

## 3. Social / publishing platforms

| Platform | Current access state | Preferred path | Fallback path | Owner | Blocker | Next action |
|---|---|---|---|---|---|---|
| X / Twitter | **NOT VERIFIED YET** | API if available/practical | browser / CLI if needed | Ryan + Tyler | runtime/auth state not checked yet | verify account access and one real action |
| LinkedIn | **NOT VERIFIED YET** | browser-guided / workflow-led | browser | Ryan + Tyler | likely UI-first and auth-sensitive | verify account access and decide if this is manual, browser, or publish-assist only |
| Facebook | **NOT VERIFIED YET** | browser-guided | browser | Ryan + Tyler | auth not checked | verify access |
| Instagram | **NOT VERIFIED YET** | browser-guided / publish workflow | browser | Tyler | auth not checked | verify access |

### Social note
These are not the first active block.
Google Workspace comes first.

---

## 4. Path policy by category

### Category A — Workspace core
Use:
- API first
- n8n for workflows
- browser only for auth recovery and setup

### Category B — Browser-first Google creative tools
Use:
- browser-backed CLI harness
- explicit session guidance
- manual fallback

### Category C — Social platforms
Use:
- best practical path per platform
- likely browser-guided first
- keep approval rules explicit for outbound actions

---

## 5. Immediate execution queue

### Now
1. Recover a clean Google Workspace browser session using the intended primary account
2. Re-test Gmail
3. Re-test Calendar
4. Re-test Drive
5. Re-test Docs
6. Re-test Sheets

### After session recovery
7. Verify one real action per service
8. Document preferred/fallback path per service
9. Design the first 2-3 Google workflows in n8n or MCP shape

### Only after Workspace core is stable
10. verify social platform connectivity
11. formalize browser-backed creative tool handling as optional capability packs

---

## 6. Bottom line

The first live execution pass already surfaced the most important truth:

**Google Workspace core is not fully connected yet.**

It needs a clean browser/account recovery first before API/MCP/n8n choices can be finalized with confidence.

That is the correct next move, and now it is documented instead of guessed.
