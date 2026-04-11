-- Skills catalog and user skills tables

-- 1. skills_catalog — available skills (seeded from data/skills-catalog.json)
CREATE TABLE IF NOT EXISTS skills_catalog (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  tagline TEXT,
  description TEXT,
  category TEXT NOT NULL,
  icon TEXT,
  color TEXT,
  platforms TEXT[],
  install_method TEXT,
  install_path TEXT,
  install_command TEXT,
  prerequisites TEXT[],
  tools TEXT[],
  config_fields JSONB,
  docs_url TEXT,
  status TEXT DEFAULT 'stable',
  featured BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Seed data from skills-catalog.json
INSERT INTO skills_catalog (id, name, slug, tagline, description, category, icon, color, platforms, install_method, install_path, install_command, prerequisites, tools, config_fields, docs_url, status, featured)
VALUES
  ('ghl-crm', 'GoHighLevel CRM', 'ghl', 'Manage leads, pipelines, and SMS from chat', 'Full GoHighLevel CRM integration via MCP. Search contacts, move pipeline stages, add/remove tags, send SMS messages, monitor pipeline health.', 'CRM', '🔗', '#FF6B35', ARRAY['GHL','MCP'], 'file_copy', '/root/.openclaw/skills/ghl/', NULL, ARRAY['GoHighLevel account','Private Integration Token (PIT)','Location ID'], ARRAY['Search contacts','Upsert contact','Add/remove tags','Send SMS','Get pipelines','Pipeline overview'], '[{"name":"GHL_PIT_TOKEN","label":"GHL Private Integration Token","type":"password","required":true},{"name":"GHL_LOCATION_ID","label":"GHL Location ID","type":"text","required":true}]', 'https://docs.clawops.ai/skills/ghl', 'stable', TRUE),
  ('google-workspace-mcp', 'Google Workspace', 'google-workspace-mcp', 'Gmail, Drive, Docs, Sheets, Calendar, Tasks — all in one', 'Complete Google Workspace integration via n8n MCP server. 44 tools covering Gmail, Drive, Docs, Sheets, Calendar, Tasks, and YouTube.', 'Productivity', '📧', '#4285F4', ARRAY['Google','Gmail','Drive','n8n','MCP'], 'mcporter', '/root/.openclaw/skills/google-workspace-mcp/', NULL, ARRAY['n8n instance with Google OAuth','MCP enabled in n8n'], ARRAY['Gmail','Drive','Docs','Sheets','Calendar','Tasks','YouTube'], '[{"name":"n8n_mcp_endpoint","label":"n8n MCP Endpoint URL","type":"text","required":true}]', 'https://docs.clawops.ai/skills/google-workspace', 'stable', TRUE),
  ('n8n-workflows', 'n8n Workflow Monitor', 'n8n', 'Monitor workflows and executions from chat', 'Direct n8n workflow and execution monitoring via SQLite database access. View workflows, check execution history, monitor health.', 'Automation', '⚙️', '#EA4B71', ARRAY['n8n'], 'file_copy', '/root/.openclaw/skills/n8n/', NULL, ARRAY['n8n instance','SQLite DB access'], ARRAY['List workflows','Get execution details','Monitor health'], '[{"name":"N8N_DB_PATH","label":"n8n SQLite DB Path","type":"text","required":true},{"name":"N8N_ENCRYPTION_KEY","label":"n8n Encryption Key","type":"password","required":true}]', 'https://docs.clawops.ai/skills/n8n', 'stable', FALSE),
  ('google-docs', 'Google Docs & Drive', 'google-docs', 'Create, read, and share Google Docs automatically', 'Direct Google Drive and Docs integration using n8n OAuth tokens. Create documents, share them, upload files.', 'Productivity', '📄', '#0F9D58', ARRAY['Google','Drive','Docs','n8n'], 'file_copy', '/root/.openclaw/skills/google-docs/', NULL, ARRAY['n8n with Google Drive OAuth'], ARRAY['List documents','Create document','Share document','Upload to Drive'], '[{"name":"N8N_DB_PATH","label":"n8n SQLite DB Path","type":"text","required":true}]', 'https://docs.clawops.ai/skills/google-docs', 'stable', FALSE),
  ('google-ai-studio', 'Google AI Studio', 'google-ai-studio', 'Access Gemini models and AI Studio directly', 'Use Google AI Studio for embeddings and text generation. Authenticate once, use AI Studio models from any automation.', 'AI', '🤖', '#9B59B6', ARRAY['Google','AI Studio','Gemini'], 'file_copy', '/root/.openclaw/skills/google-ai-studio/', NULL, ARRAY['Google AI Studio account','API key'], ARRAY['List models','Generate text','Get embeddings'], '[{"name":"GOOGLE_AI_STUDIO_KEY","label":"Google AI Studio API Key","type":"password","required":true}]', 'https://docs.clawops.ai/skills/google-ai-studio', 'beta', FALSE),
  ('social-media-nango', 'Social Media (OAuth)', 'social-media-nango', 'Connect any social platform via OAuth — no API keys needed', 'Connect Twitter/X, LinkedIn, Facebook, Instagram via Nango OAuth proxy.', 'Marketing', '📱', '#1DA1F2', ARRAY['Twitter','LinkedIn','Facebook','Instagram','Nango'], 'docker', '/root/.openclaw/skills/social-media-nango/', 'docker run -d -p 3003:3003 nangohq/nango', ARRAY['OAuth app credentials per platform','Docker'], ARRAY['OAuth connect','Post to Twitter','Post to LinkedIn','Schedule post'], '[{"name":"NANGO_SECRET_KEY","label":"Nango Secret Key","type":"password","required":true}]', 'https://docs.clawops.ai/skills/social-media', 'beta', TRUE)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  tagline = EXCLUDED.tagline,
  description = EXCLUDED.description,
  icon = EXCLUDED.icon,
  color = EXCLUDED.color,
  tools = EXCLUDED.tools,
  status = EXCLUDED.status,
  featured = EXCLUDED.featured;

-- 2. user_skills — which skills each user has installed
CREATE TABLE IF NOT EXISTS user_skills (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users ON DELETE CASCADE NOT NULL,
  skill_slug TEXT NOT NULL REFERENCES skills_catalog(slug) ON DELETE CASCADE,
  status TEXT DEFAULT 'installed' CHECK (status IN ('installed', 'pending', 'needs_config', 'error')),
  config_data JSONB DEFAULT '{}',
  installed_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, skill_slug)
);

ALTER TABLE user_skills ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own skills" ON user_skills
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can manage their own skills" ON user_skills
  FOR ALL USING (auth.uid() = user_id);

-- Function to update updated_at
CREATE OR REPLACE FUNCTION update_user_skills_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER user_skills_updated_at
  BEFORE UPDATE ON user_skills
  FOR EACH ROW EXECUTE FUNCTION update_user_skills_updated_at();

-- 3. Categories lookup
CREATE TABLE IF NOT EXISTS skill_categories (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  icon TEXT,
  color TEXT
);

INSERT INTO skill_categories (id, name, icon, color) VALUES
  ('crm', 'CRM', '🔗', '#FF6B35'),
  ('productivity', 'Productivity', '📧', '#4285F4'),
  ('automation', 'Automation', '⚙️', '#EA4B71'),
  ('marketing', 'Marketing', '📱', '#1DA1F2'),
  ('ai', 'AI', '🤖', '#9B59B6')
ON CONFLICT (id) DO NOTHING;

ALTER TABLE skill_categories ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view categories" ON skill_categories FOR SELECT USING (true);
