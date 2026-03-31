# TEST.md — cli-anything-whisk

## Test Inventory Plan
- `test_core.py`: 3 unit tests planned
- `test_full_e2e.py`: 1 end-to-end smoke test planned

## Unit Test Plan

### Module: `core/helper.py`
Functions to test:
- `pretty_result`
- `run_helper` success path via mocked subprocess
- `run_helper` error path via mocked subprocess

Edge cases:
- invalid JSON
- helper error payload
- minimal successful payload

## E2E Test Plan

### Workflow 1 — Whisk auth/status smoke test
Simulates:
- operator verifying that a logged-in browser session is usable

Operations chained:
1. invoke `cli-anything-whisk auth-check --json-output`
2. verify JSON output parses
3. verify response contains action field

Verified:
- installed CLI entry point works
- JSON output exists
- browser-backed helper can be reached in a real environment

## Notes
Full generation/download E2E is intentionally deferred until the harness stabilizes against the live UI.
