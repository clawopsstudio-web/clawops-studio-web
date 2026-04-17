# Agentic OS — Account Page Design

**Created by:** Andrew (Frontend/UX Engineer)
**Date:** 2026-04-17
**Status:** Draft — ready for review

---

## Overview

The **Account** page (`/dashboard/account`) is where users manage their profile, team, billing, API access, and account security. It replaces the current `settings/page.tsx` for Agentic OS with a dedicated account management experience.

**Design principles:**
- Card-based sections — each concern (profile, team, billing) is its own card
- Consistent with existing dashboard aesthetic (dark, material, Apple-style inputs)
- Role-based visibility — only Account Owners see Billing and Danger Zone
- Inline validation — no full-page form submissions

---

## Page Layout

```
┌─────────────────────────────────────────────────────────┐
│ Account                                    [Save All]   │
├─────────────────────────────────────────────────────────┤
│  ┌─────────────────────────────────────────────────┐    │
│  │ 👤 Profile                                       │    │
│  │  Avatar | Name | Email | [Change Password]      │    │
│  └─────────────────────────────────────────────────┘    │
│                                                         │
│  ┌─────────────────────────────────────────────────┐    │
│  │ 👥 Team                     [+ Invite Member]   │    │
│  │  Member rows with role badges + actions        │    │
│  └─────────────────────────────────────────────────┘    │
│                                                         │
│  ┌─────────────────────────────────────────────────┐    │
│  │ 💳 Billing                                     │    │
│  │  Plan badge | Usage stats | [Upgrade Plan]     │    │
│  └─────────────────────────────────────────────────┘    │
│                                                         │
│  ┌─────────────────────────────────────────────────┐    │
│  │ 🔑 API Keys                   [+ Create Key]    │    │
│  │  Key rows with last used + revoke action        │    │
│  └─────────────────────────────────────────────────┘    │
│                                                         │
│  ┌─────────────────────────────────────────────────┐    │
│  │ ☠️  Danger Zone                                  │    │
│  │  [Delete Account] button                         │    │
│  └─────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────┘
```

---

## Section 1: Profile

**Purpose:** Manage the current user's personal information.

### Fields

| Field | Type | Validation | Notes |
|-------|------|-----------|-------|
| Avatar | Image upload | JPEG/PNG/WebP, max 5MB | Resize to 200px, circular crop |
| Display Name | Text input | 2–50 chars, required | Live updates |
| Email | Email input | Valid email format, required | Read-only if SSO-enabled |
| Password | Button → modal | — | Opens change-password modal |

### Avatar Upload Flow

1. User clicks avatar → file picker opens
2. File selected → canvas resize to max 200px dimension
3. Preview shown immediately
4. Click "Save" → POST to `/api/account/avatar`
5. Success: toast "Avatar updated", preview persists
6. Error: toast "Upload failed, try again"

### Change Password Modal

```
┌──────────────────────────────────────────┐
│ Change Password                    [✕]   │
├──────────────────────────────────────────┤
│                                          │
│  Current Password                        │
│  [••••••••••••••]                        │
│                                          │
│  New Password                            │
│  [••••••••••••••]                        │
│  Requirements: 8+ chars                  │
│                                          │
│  Confirm New Password                    │
│  [••••••••••••••]                        │
│                                          │
│  ─────────────────────────────────────── │
│                              [Cancel]    │
│                    [Update Password]      │
└──────────────────────────────────────────┘
```

**Validation:**
- Current password required
- New password ≥ 8 chars
- Confirm must match new password
- Show inline error below field on blur

---

## Section 2: Team

**Purpose:** Manage team members and their roles. Only visible to `owner` and `admin` roles.

### Roles

| Role | Permissions |
|------|-------------|
| Owner | Full access. Cannot be removed except by self-deletion. Only one per account. |
| Admin | Manage team, billing, integrations. Cannot delete account. |
| Member | Use all tools. Cannot manage team or billing. |
| Viewer | Read-only access. Cannot take actions. |

### Member Row

```
┌──────────────────────────────────────────────────────────┐
│ [Avatar]  Riya Patel                              [👑]  │
│           riya@example.com                              │
│           Member  ·  Joined Jan 12, 2026                 │
│                          [⋮] ▼  [Remove]                 │
└──────────────────────────────────────────────────────────┘
```

- Role badge color: Owner = gold, Admin = blue, Member = gray, Viewer = muted
- Actions dropdown (⋮): Change Role, Remove from Team
- Owner row: no Remove button, role badge non-editable
- Current user's row: no Remove or role-change (can't demote yourself)

### Invite Member Flow

1. Click `[+ Invite Member]` → inline form expands below list

```
┌──────────────────────────────────────────────────────────┐
│ Invite by Email                                          │
│ [john@client.com________________] [@ role: Member ▼]     │
│                                              [Send Invite]│
│                                                              │
│  • Invitation expires in 7 days                             │
│  • Recipient will receive an email with a join link        │
└──────────────────────────────────────────────────────────┘
```

2. Enter email + select role from dropdown
3. Click "Send Invite" → POST `/api/account/invite`
4. Success: form collapses, new row appears with "Pending" badge
5. Error (duplicate email, etc.): inline error message

### Pending Invitations

```
┌──────────────────────────────────────────────────────────┐
│ [⏳]  marcus@prospect.io                                 │
│       Invite sent · Expires in 5 days                    │
│       Role: Admin  ·  [Resend]  [Revoke]                 │
└──────────────────────────────────────────────────────────┘
```

---

## Section 3: Billing

**Purpose:** Display current plan, usage, and upgrade path.

### Plan Display

```
┌──────────────────────────────────────────────────────────┐
│  Current Plan: Starter                                   │
│                                                          │
│  • 3 AI Agents                                          │
│  • 500 contacts                                          │
│  • 1 team member                                         │
│  • Social: Twitter only                                  │
│                                                          │
│  [Upgrade to Professional — $49/mo]                      │
└──────────────────────────────────────────────────────────┘
```

### Usage Stats

| Metric | Used | Limit | % |
|--------|------|-------|---|
| AI Agents | 2 | 3 | 66% |
| Contacts | 312 | 500 | 62% |
| Team Members | 1 | 1 | 100% ⚠️ |
| Social Platforms | 2 | 1 | 200% ⚠️ |
| Storage | 1.2 GB | 5 GB | 24% |

- Progress bars: green < 80%, yellow 80–99%, red ≥ 100%
- Click any metric → navigates to relevant section

### Upgrade Button

- Links to Stripe Checkout session
- Opens in new tab
- Returns to `/dashboard/account?upgrade=success` or `?upgrade=cancelled`

---

## Section 4: API Keys

**Purpose:** Allow developers to create API keys for programmatic access to the Agentic OS API.

### Key Row

```
┌──────────────────────────────────────────────────────────┐
│ [🔑]  Production Key                                     │
│       cla3_prod_a1b2c3d4...e5f6    [Copy] [Revoke]       │
│       Last used: 2 hours ago                             │
│       Created: Mar 3, 2026                               │
└──────────────────────────────────────────────────────────┘
```

- Key shown only as masked prefix + suffix on subsequent views
- Full key shown ONCE at creation time in a modal
- Copy button → clipboard + "Copied!" tooltip

### Create New Key Flow

1. Click `[+ Create Key]` → modal opens

```
┌──────────────────────────────────────────┐
│ Create API Key                      [✕]   │
├──────────────────────────────────────────┤
│                                          │
│  Key Name                                │
│  [Production Key_______________]          │
│                                          │
│  Permissions                             │
│  ☑ Read contacts                        │
│  ☑ Write contacts                        │
│  ☑ Read agents                          │
│  ☑ Execute agents                       │
│  ☐ Admin (dangerous)                     │
│                                          │
│  ─────────────────────────────────────── │
│                              [Cancel]    │
│                          [Create Key]    │
└──────────────────────────────────────────┘
```

2. On submit → POST `/api/account/api-keys`
3. Success: modal replaced with result screen

```
┌──────────────────────────────────────────┐
│ ✅ API Key Created                        │
├──────────────────────────────────────────┤
│                                          │
│  Copy this key now. You won't see        │
│  it again.                               │
│                                          │
│  ┌──────────────────────────────────┐   │
│  │ cla3_prod_a1b2c3d4e5f6g7h8...    │   │
│  │                            [Copy] │   │
│  └──────────────────────────────────┘   │
│                                          │
│                  [Done, I've Saved It]    │
└──────────────────────────────────────────┘
```

---

## Section 5: Danger Zone

**Purpose:** Irreversible actions that require explicit confirmation.

### Delete Account

```
┌──────────────────────────────────────────────────────────┐
│ ☠️  Delete Account                                       │
│                                                          │
│  Permanently delete your account and all associated     │
│  data. This action cannot be undone.                     │
│                                                          │
│  Type your account name to confirm:                      │
│  [ Acme Corp ________________________________________]   │
│                                                          │
│  [Delete My Account]  ← disabled until name matches    │
└──────────────────────────────────────────────────────────┘
```

- Only `owner` role sees this section
- "Delete My Account" button is red, disabled by default
- User must type account name (from `accounts.name`) to enable button
- On click: POST `/api/account/delete` → redirect to `/goodbye` page

---

## API Endpoints

| Method | Endpoint | Purpose |
|--------|----------|---------|
| GET | `/api/account/me` | Get current user profile |
| PATCH | `/api/account/me` | Update name, avatar |
| POST | `/api/account/avatar` | Upload avatar image |
| POST | `/api/account/password` | Change password |
| GET | `/api/account/team` | List team members + pending invites |
| POST | `/api/account/invite` | Send team invitation |
| DELETE | `/api/account/invite/:id` | Revoke invitation |
| PATCH | `/api/account/team/:id` | Change member role |
| DELETE | `/api/account/team/:id` | Remove team member |
| GET | `/api/account/billing` | Get plan + usage stats |
| GET | `/api/account/api-keys` | List API keys (masked) |
| POST | `/api/account/api-keys` | Create new API key |
| DELETE | `/api/account/api-keys/:id` | Revoke API key |
| DELETE | `/api/account` | Delete account |

---

## Component Inventory

| Component | States |
|-----------|--------|
| `AvatarUpload` | default, hover, uploading, error |
| `RoleBadge` | owner, admin, member, viewer, pending |
| `MemberRow` | default, editing, removing, loading |
| `InviteForm` | collapsed, expanded, submitting, error, success |
| `PlanCard` | trial, starter, professional, enterprise |
| `UsageBar` | green, yellow, red (at limit) |
| `ApiKeyRow` | masked, copied, revoking |
| `CreateKeyModal` | form, submitting, success-with-key |
| `DangerZone` | default, name-mismatch, confirming, deleting |
| `ConfirmModal` | generic reusable for destructive confirmations |

---

## Styling (reuse existing design tokens)

```tsx
// Section header
fontSize: 'var(--text-caption1)'
fontWeight: 'var(--weight-semibold)'
textTransform: 'uppercase'
color: 'var(--text-tertiary)'

// Card
background: 'var(--material-regular)'
border: '1px solid var(--separator)'
borderRadius: 'var(--radius-md)'

// Input
className="apple-input"
background: 'var(--bg-secondary)'
border: '1px solid var(--separator)'

// Destructive button
background: 'var(--system-red)'
color: '#fff'

// Accent/CTA button
background: 'var(--accent)'
color: 'var(--accent-contrast)'
```

---

## Implementation Notes

1. **Auto-save profile fields:** Name field saves on blur, not on explicit submit. Show subtle "Saved" indicator.
2. **Optimistic UI:** Role changes and key revokes update UI immediately, revert on API error.
3. **Loading states:** Every action that touches the API shows a spinner in the relevant row/button.
4. **Toast notifications:** Use the dashboard's existing toast/notification system for success/error feedback.
5. **Role-based section hiding:** `AccountPage` component reads `user.role` from context and conditionally renders Team, Billing, and Danger Zone sections.
6. **Account name confirmation:** Fetch `account.name` from `/api/account/me` to populate the danger zone confirmation field.
