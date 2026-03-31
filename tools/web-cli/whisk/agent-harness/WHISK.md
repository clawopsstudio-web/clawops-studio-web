# WHISK

Browser-backed CLI harness for Google Labs Whisk.

## Reality
This harness automates the Whisk web UI by attaching to an already-running Chrome instance over the DevTools protocol. It is session-dependent and should be treated as an operator/internal tool, not a stable API integration.

## Current MVP
- auth-check
- open
- status
- inspect
- generate (prompt-only)

## Requirements
- Chrome/Chromium already running with remote debugging at `http://127.0.0.1:9222`
- A valid logged-in Google session that can access Whisk
- Node.js with Playwright available

## Known limitations
- Upload flow is not wrapped yet
- Download flow is best-effort and tied to current UI behavior
- UI changes or auth expiry can break the harness
