# WHISK

Browser-backed CLI harness for Google Labs Whisk.

## Reality
This harness automates the Whisk web UI by attaching to an already-running Chrome instance over the DevTools protocol. It is session-dependent and should be treated as an operator/internal tool, not a stable API integration.

## Current MVP
- auth-check
- open
- status
- inspect
- upload-image
- export-image
- generate (prompt-only or with one uploaded reference image)

## Requirements
- Chrome/Chromium already running with remote debugging at `http://127.0.0.1:9222`
- A valid logged-in Google session that can access Whisk
- Node.js with Playwright available

## Known limitations
- Upload currently targets Whisk's hidden file inputs by slot index (0=subject, 1=scene, 2=style)
- Export currently saves rendered result images by extracting blob-backed DOM images, not by driving the native browser download flow
- UI changes or auth expiry can break the harness
