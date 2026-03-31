# Supabase Baseline - ClawOps Studio

## Overview
Supabase serves as the default backend stack for client systems and internal productization at ClawOps Studio.

## Requirements

### Environment Variables (Required)
```bash
# Edit: .secrets/supabase.env
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### Skills Available
- **supabase**: Full CRUD operations, vector search, SQL queries
- **Location**: `/root/.openclaw/workspaces/arjun/skills/supabase/`
- **Script**: `scripts/supabase.sh`
- **API**: REST + RPC via service role key

### Quick Start Commands
```bash
# Test connection
source .secrets/supabase.env
./skills/supabase/scripts/supabase.sh tables

# Create basic schema
./skills/supabase/scripts/supabase.sh query "CREATE TABLE IF NOT EXISTS clients (id uuid DEFAULT gen_random_uuid() PRIMARY KEY, name text NOT NULL, email text UNIQUE, created_at timestamptz DEFAULT now());"

# Insert sample data
./skills/supabase/scripts/supabase.sh insert clients '{"name": "Test Client", "email": "test@example.com"}'

# Query data
./skills/supabase/scripts/supabase.sh select clients --limit 5
```

## Baseline Schema

### 1. Core Tables
```sql
-- Clients
CREATE TABLE clients (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text UNIQUE NOT NULL,
  company text,
  status text DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'archived')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Projects
CREATE TABLE projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id uuid REFERENCES clients(id) ON DELETE CASCADE,
  name text NOT NULL,
  description text,
  status text DEFAULT 'planning' CHECK (status IN ('planning', 'active', 'completed', 'on-hold')),
  budget numeric,
  start_date date,
  end_date date,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Tasks
CREATE TABLE tasks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id uuid REFERENCES projects(id) ON DELETE CASCADE,
  title text NOT NULL,
  description text,
  status text DEFAULT 'todo' CHECK (status IN ('todo', 'in-progress', 'done', 'blocked')),
  assignee text,
  estimated_hours numeric,
  actual_hours numeric,
  due_date date,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);
```

### 2. Vector Search Setup
```sql
-- Enable pgvector extension
CREATE EXTENSION IF NOT EXISTS vector;

-- Create documents table for knowledge base
CREATE TABLE documents (
  id bigserial PRIMARY KEY,
  title text NOT NULL,
  content text NOT NULL,
  metadata jsonb DEFAULT '{}',
  embedding vector(1536),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create similarity search function
CREATE OR REPLACE FUNCTION match_documents(
  query_embedding vector(1536),
  match_threshold float DEFAULT 0.5,
  match_count int DEFAULT 5
)
RETURNS TABLE (
  id bigint,
  title text,
  content text,
  metadata jsonb,
  similarity float
)
LANGUAGE plpgsql
AS $$
BEGIN
  RETURN QUERY
  SELECT
    documents.id,
    documents.title,
    documents.content,
    documents.metadata,
    1 - (documents.embedding <=> query_embedding) AS similarity
  FROM documents
  WHERE 1 - (documents.embedding <=> query_embedding) > match_threshold
  ORDER BY documents.embedding <=> query_embedding
  LIMIT match_count;
END;
$$;

-- Create index for performance
CREATE INDEX ON documents 
USING ivfflat (embedding vector_cosine_ops)
WITH (lists = 100);
```

### 3. User Management
```sql
-- Users table (for internal system users)
CREATE TABLE users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  name text NOT NULL,
  role text DEFAULT 'user' CHECK (role IN ('admin', 'manager', 'user', 'client')),
  created_at timestamptz DEFAULT now(),
  last_login timestamptz
);

-- Sessions table
CREATE TABLE sessions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  token text UNIQUE NOT NULL,
  expires_at timestamptz NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Row Level Security (RLS)
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own profile" ON users
  FOR SELECT USING (auth.uid() = id);

ALTER TABLE clients ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Clients can view own data" ON clients
  FOR SELECT USING (auth.uid() = id);
```

## Usage Examples

### Database Operations
```bash
# List all tables
./skills/supabase/scripts/supabase.sh tables

# Get sample data
./skills/supabase/scripts/supabase.sh select clients --limit 5

# Insert new client
./skills/supabase/scripts/supabase.sh insert clients '{"name": "Acme Corp", "email": "contact@acme.com", "company": "Acme Corporation"}'

# Update client status
./skills/supabase/scripts/supabase.sh update clients '{"status": "inactive"}' --eq "id:uuid-here"
```

### Vector Search
```bash
# Add document with embedding
./skills/supabase/scripts/supabase.sh insert documents '{"title": "Getting Started", "content": "This guide helps you get started with our platform"}'

# Search for documents
./skills/supabase/scripts/supabase.sh vector-search documents "how to get started" --limit 3
```

## Security Notes

- **Service Role Key**: Bypasses RLS - use only for backend operations
- **Anon Key**: Use for client-side/restricted access
- **Row Level Security**: Enabled on sensitive tables
- **Embeddings**: Require OpenAI API key for vector operations

## Integration Points

### 1. Agent Systems
- Store agent configurations and state
- Track agent performance metrics
- Manage agent permissions

### 2. Client Management
- Client onboarding data
- Project tracking
- Usage analytics

### 3. Knowledge Base
- Documentation storage
- Agent training data
- Search functionality

### 4. Analytics
- Performance metrics
- User activity tracking
- System health monitoring

## Next Steps

1. [ ] Create actual Supabase project
2. [ ] Set environment variables in `.secrets/supabase.env`
3. [ ] Initialize baseline schema
4. [ ] Test integrations with agent systems
5. [ ] Set up backup and monitoring

## Status

- **Phase**: Ready for project creation
- **Dependencies**: None (self-contained)
- **Skills**: supabase skill available
- **Documentation**: Complete baseline schema