# Supabase DB Migrations — Apply These in Your Supabase Dashboard

Go to: https://supabase.com/dashboard/project/dyzkfmdjusdyjmytgeah → SQL Editor

Run each query below in order:

---

## Migration 001 — Core Schema
```sql
-- Chat messages (for AI chat persistence)
CREATE TABLE IF NOT EXISTS chat_messages (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID NOT NULL,
  agent_id TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('user', 'assistant')),
  content TEXT NOT NULL,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW()
);
ALTER TABLE chat_messages ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can manage their own chat messages" ON chat_messages
  FOR ALL USING (auth.uid() = user_id);
CREATE INDEX IF NOT EXISTS chat_messages_user_agent_idx
  ON chat_messages (user_id, agent_id, created_at ASC);
```

---

## Notes

- The `api_keys` and `channel_configs` tables already exist in your DB (they're used by the integrations page).
- The `chat_messages` table above is the only new one needed for chat history persistence.
- Once this is applied, AI chat conversations will persist across sessions.

Questions? Ask Henry on Telegram.
