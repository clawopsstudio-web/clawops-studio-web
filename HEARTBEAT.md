# HEARTBEAT.md

Use heartbeats for lightweight operating checks. Keep it small.

## On heartbeat

1. Read `TASKS.md`
2. Push one unblocked P0 or P1 item forward if possible
3. Check whether any of these need attention:
   - overdue sales follow-up
   - Telegram lane reliability issue
   - integration blocker (especially GHL)
   - important system/runtime issue blocking operations
4. If there is a meaningful update, send a concise status note
5. If nothing important changed, reply `HEARTBEAT_OK`

## Avoid

- noisy updates
- repeating old blockers without progress
- deep infra rabbit holes unless directly blocking execution
- Paperclip debugging unless explicitly prioritized

