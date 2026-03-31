# FLOW

Browser-backed CLI harness for Google Labs Flow.

## Reality
This harness automates the Flow web UI by attaching to an already-running Chrome instance over the DevTools protocol. It is session-dependent and currently scoped to session/open/status inspection only.

## Current MVP
- auth-check
- open
- status
- inspect

## Deferred
- project creation
- prompt submission
- asset export/download
