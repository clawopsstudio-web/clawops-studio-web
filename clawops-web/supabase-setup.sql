-- ============================================================
-- ClawOps Studio — Supabase Schema Setup
-- Run this in: Supabase Dashboard → SQL Editor
-- ============================================================

-- Profiles: extra user data beyond Supabase Auth
CREATE TABLE IF NOT EXISTS public.profiles (
  id          UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email       TEXT NOT NULL,
  full_name   TEXT,
  avatar_url  TEXT,
  plan        TEXT DEFAULT 'free' CHECK (plan IN ('free', 'starter', 'pro', 'agency')),
  created_at  TIMESTAMPTZ DEFAULT NOW(),
  updated_at  TIMESTAMPTZ DEFAULT NOW()
);

-- Row Level Security: users can only read/update their own profile
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "profiles_select_own" ON public.profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "profiles_update_own" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "profiles_insert_own" ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

-- Auto-create profile row when a new user signs up
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email)
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ============================================================
-- VPS Instances (for Contabo manager feature)
-- ============================================================
CREATE TABLE IF NOT EXISTS public.vps_instances (
  id          UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id     UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name        TEXT NOT NULL,
  ip_address  TEXT,
  ssh_port    INTEGER DEFAULT 22,
  ssh_user    TEXT DEFAULT 'root',
  ssh_key     TEXT,  -- encrypted private key
  created_at  TIMESTAMPTZ DEFAULT NOW(),
  updated_at  TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.vps_instances ENABLE ROW LEVEL SECURITY;

CREATE POLICY "vps_select_own" ON public.vps_instances
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "vps_insert_own" ON public.vps_instances
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "vps_update_own" ON public.vps_instances
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "vps_delete_own" ON public.vps_instances
  FOR DELETE USING (auth.uid() = user_id);

-- ============================================================
-- Optional: AI Agents catalog (for multi-agent system)
-- ============================================================
CREATE TABLE IF NOT EXISTS public.ai_agents (
  id          UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id     UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name        TEXT NOT NULL,
  role        TEXT DEFAULT 'general',
  description TEXT,
  system_prompt TEXT,
  tools       JSONB DEFAULT '[]',
  is_active   BOOLEAN DEFAULT true,
  created_at  TIMESTAMPTZ DEFAULT NOW(),
  updated_at  TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.ai_agents ENABLE ROW LEVEL SECURITY;

CREATE POLICY "agents_select_own" ON public.ai_agents
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "agents_all" ON public.ai_agents
  FOR ALL USING (auth.uid() = user_id);

-- ============================================================
-- Grant public read access to skills catalog (seeded separately)
-- ============================================================
CREATE TABLE IF NOT EXISTS public.skills_catalog (
  id          UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name        TEXT UNIQUE NOT NULL,
  description TEXT,
  category    TEXT,
  icon        TEXT,
  config_schema JSONB DEFAULT '{}',
  is_active   BOOLEAN DEFAULT true,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.skills_catalog ENABLE ROW LEVEL SECURITY;

CREATE POLICY "skills_read_all" ON public.skills_catalog
  FOR SELECT USING (true);

-- Seed default skills
INSERT INTO public.skills_catalog (name, description, category, icon) VALUES
  ('GHL', 'Go High Level CRM integration', 'crm', '📊'),
  ('Google Workspace', 'Gmail, Calendar, Drive integration', 'productivity', '📧'),
  ('n8n', 'n8n workflow automation', 'automation', '🔗'),
  ('Google AI Studio', 'Gemini models via AI Studio', 'ai', '🤖')
ON CONFLICT (name) DO NOTHING;
