-- NEXUS Database Schema for Supabase PostgreSQL
-- Version: 0.1.0 (POC)
-- Last Updated: November 7, 2025

-- ============================================
-- CLEAN UP (Drop existing tables if any)
-- ============================================
-- WARNING: This will delete ALL data. Only use in development!

-- Drop policies first (if they exist)
DROP POLICY IF EXISTS "Members can delete app minis" ON public.app_minis;
DROP POLICY IF EXISTS "Members can update app minis" ON public.app_minis;
DROP POLICY IF EXISTS "Members can create app minis" ON public.app_minis;
DROP POLICY IF EXISTS "Members can view app minis" ON public.app_minis;
DROP POLICY IF EXISTS "Members can update dashboards" ON public.dashboards;
DROP POLICY IF EXISTS "Members can create dashboards" ON public.dashboards;
DROP POLICY IF EXISTS "Members can view workspace dashboards" ON public.dashboards;
DROP POLICY IF EXISTS "Members can view workspace members" ON public.workspace_members;
DROP POLICY IF EXISTS "Owners can update workspaces" ON public.workspaces;
DROP POLICY IF EXISTS "Users can create workspaces" ON public.workspaces;
DROP POLICY IF EXISTS "Users can view own workspaces" ON public.workspaces;
DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can view own profile" ON public.profiles;

-- Drop tables
DROP TABLE IF EXISTS public.app_minis CASCADE;
DROP TABLE IF EXISTS public.dashboards CASCADE;
DROP TABLE IF EXISTS public.workspace_members CASCADE;
DROP TABLE IF EXISTS public.workspaces CASCADE;
DROP TABLE IF EXISTS public.profiles CASCADE;

-- Drop custom types
DROP TYPE IF EXISTS app_mini_type CASCADE;
DROP TYPE IF EXISTS member_role CASCADE;

-- ============================================
-- EXTENSIONS
-- ============================================
-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- USERS & AUTHENTICATION
-- ============================================
-- Note: Supabase handles auth.users table automatically
-- We create profiles table for additional user data

CREATE TABLE public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- WORKSPACES (Teams)
-- ============================================
CREATE TABLE public.workspaces (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT UNIQUE, -- for URLs like /workspace/acme-agency
  owner_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  settings JSONB DEFAULT '{}', -- workspace preferences
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_workspaces_owner ON public.workspaces(owner_id);
CREATE INDEX idx_workspaces_slug ON public.workspaces(slug);

-- ============================================
-- WORKSPACE MEMBERS (Team Collaboration)
-- ============================================
CREATE TYPE member_role AS ENUM ('owner', 'admin', 'member', 'viewer');

CREATE TABLE public.workspace_members (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  workspace_id UUID REFERENCES public.workspaces(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  role member_role DEFAULT 'member' NOT NULL,
  invited_by UUID REFERENCES public.profiles(id),
  invited_at TIMESTAMPTZ DEFAULT NOW(),
  joined_at TIMESTAMPTZ,
  UNIQUE(workspace_id, user_id)
);

-- Indexes
CREATE INDEX idx_workspace_members_workspace ON public.workspace_members(workspace_id);
CREATE INDEX idx_workspace_members_user ON public.workspace_members(user_id);

-- ============================================
-- DASHBOARDS
-- ============================================
CREATE TABLE public.dashboards (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  workspace_id UUID REFERENCES public.workspaces(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL DEFAULT 'Untitled Dashboard',
  description TEXT,
  layout JSONB DEFAULT '{"items": []}', -- react-grid-layout config
  is_default BOOLEAN DEFAULT FALSE, -- default dashboard for workspace
  created_by UUID REFERENCES public.profiles(id) NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_dashboards_workspace ON public.dashboards(workspace_id);
CREATE INDEX idx_dashboards_creator ON public.dashboards(created_by);

-- ============================================
-- APP MINIS
-- ============================================
CREATE TYPE app_mini_type AS ENUM (
  'todo-list',
  'kanban',
  'table',
  'calendar',
  'iframe',
  'notes',
  'crm'
);

CREATE TABLE public.app_minis (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  dashboard_id UUID REFERENCES public.dashboards(id) ON DELETE CASCADE NOT NULL,
  type app_mini_type NOT NULL,
  name TEXT NOT NULL,
  
  -- Configuration for the app mini
  config JSONB DEFAULT '{}', -- type-specific config
  
  -- Position on dashboard (react-grid-layout)
  position JSONB DEFAULT '{"x": 0, "y": 0, "w": 4, "h": 4}',
  
  -- Actual data stored by the app mini
  data JSONB DEFAULT '{}',
  
  created_by UUID REFERENCES public.profiles(id) NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_app_minis_dashboard ON public.app_minis(dashboard_id);
CREATE INDEX idx_app_minis_type ON public.app_minis(type);
CREATE INDEX idx_app_minis_config ON public.app_minis USING GIN (config);
CREATE INDEX idx_app_minis_data ON public.app_minis USING GIN (data);

-- ============================================
-- ROW LEVEL SECURITY POLICIES
-- ============================================
-- Apply RLS policies AFTER all tables are created

-- PROFILES
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profile" 
  ON public.profiles FOR SELECT 
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" 
  ON public.profiles FOR UPDATE 
  USING (auth.uid() = id);

-- WORKSPACES
ALTER TABLE public.workspaces ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own workspaces" 
  ON public.workspaces FOR SELECT 
  USING (
    owner_id = auth.uid() OR
    id IN (
      SELECT workspace_id FROM workspace_members 
      WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Users can create workspaces" 
  ON public.workspaces FOR INSERT 
  WITH CHECK (owner_id = auth.uid());

CREATE POLICY "Owners can update workspaces" 
  ON public.workspaces FOR UPDATE 
  USING (owner_id = auth.uid());

-- WORKSPACE MEMBERS
ALTER TABLE public.workspace_members ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Members can view workspace members" 
  ON public.workspace_members FOR SELECT 
  USING (
    user_id = auth.uid() OR
    workspace_id IN (
      SELECT workspace_id FROM workspace_members 
      WHERE user_id = auth.uid()
    )
  );

-- DASHBOARDS
ALTER TABLE public.dashboards ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Members can view workspace dashboards" 
  ON public.dashboards FOR SELECT 
  USING (
    workspace_id IN (
      SELECT workspace_id FROM workspace_members 
      WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Members can create dashboards" 
  ON public.dashboards FOR INSERT 
  WITH CHECK (
    created_by = auth.uid() AND
    workspace_id IN (
      SELECT workspace_id FROM workspace_members 
      WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Members can update dashboards" 
  ON public.dashboards FOR UPDATE 
  USING (
    workspace_id IN (
      SELECT workspace_id FROM workspace_members 
      WHERE user_id = auth.uid() AND role IN ('owner', 'admin', 'member')
    )
  );

-- APP MINIS
ALTER TABLE public.app_minis ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Members can view app minis" 
  ON public.app_minis FOR SELECT 
  USING (
    dashboard_id IN (
      SELECT d.id FROM dashboards d
      JOIN workspace_members wm ON d.workspace_id = wm.workspace_id
      WHERE wm.user_id = auth.uid()
    )
  );

CREATE POLICY "Members can create app minis" 
  ON public.app_minis FOR INSERT 
  WITH CHECK (
    created_by = auth.uid() AND
    dashboard_id IN (
      SELECT d.id FROM dashboards d
      JOIN workspace_members wm ON d.workspace_id = wm.workspace_id
      WHERE wm.user_id = auth.uid()
    )
  );

CREATE POLICY "Members can update app minis" 
  ON public.app_minis FOR UPDATE 
  USING (
    dashboard_id IN (
      SELECT d.id FROM dashboards d
      JOIN workspace_members wm ON d.workspace_id = wm.workspace_id
      WHERE wm.user_id = auth.uid() AND wm.role IN ('owner', 'admin', 'member')
    )
  );

CREATE POLICY "Members can delete app minis" 
  ON public.app_minis FOR DELETE 
  USING (
    created_by = auth.uid() OR
    dashboard_id IN (
      SELECT d.id FROM dashboards d
      JOIN workspace_members wm ON d.workspace_id = wm.workspace_id
      WHERE wm.user_id = auth.uid() AND wm.role IN ('owner', 'admin')
    )
  );

-- ============================================
-- MARKETPLACE APP TEMPLATES (Future)
-- ============================================
-- Will be added in Week 6 (MVP Marketplace phase)
-- Placeholder for now

-- CREATE TABLE public.marketplace_apps (
--   id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
--   name TEXT NOT NULL,
--   description TEXT,
--   thumbnail_url TEXT,
--   author_id UUID REFERENCES public.profiles(id),
--   type app_mini_type NOT NULL,
--   template_config JSONB, -- Config template
--   installs INT DEFAULT 0,
--   rating DECIMAL(2,1),
--   published_at TIMESTAMPTZ,
--   created_at TIMESTAMPTZ DEFAULT NOW()
-- );

-- ============================================
-- FUNCTIONS & TRIGGERS
-- ============================================

-- Auto-update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply to all tables with updated_at
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_workspaces_updated_at
  BEFORE UPDATE ON public.workspaces
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_dashboards_updated_at
  BEFORE UPDATE ON public.dashboards
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_app_minis_updated_at
  BEFORE UPDATE ON public.app_minis
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ============================================
-- SEED DATA (Development Only)
-- ============================================
-- Run this manually after initial setup

-- Example:
-- INSERT INTO public.profiles (id, email, full_name)
-- VALUES 
--   ('your-auth-user-id', 'test@example.com', 'Test User');

-- INSERT INTO public.workspaces (name, slug, owner_id)
-- VALUES 
--   ('My First Workspace', 'my-first-workspace', 'your-auth-user-id');

-- ============================================
-- NOTES
-- ============================================

/*
App Mini Data Schema Examples:

1. TODO LIST:
{
  "items": [
    {
      "id": "uuid",
      "text": "Complete user research",
      "completed": false,
      "created_at": "2025-11-07T10:00:00Z"
    }
  ]
}

2. KANBAN:
{
  "columns": [
    {
      "id": "todo",
      "title": "To Do",
      "cards": [
        {
          "id": "uuid",
          "title": "Design dashboard",
          "description": "Figma mockup",
          "assignee": "user-id"
        }
      ]
    }
  ]
}

3. TABLE (Simple CRM):
{
  "columns": [
    {"id": "name", "label": "Company Name", "type": "text"},
    {"id": "contact", "label": "Contact Person", "type": "text"},
    {"id": "status", "label": "Status", "type": "select", "options": ["Lead", "Customer"]}
  ],
  "rows": [
    {
      "id": "uuid",
      "name": "Acme Corp",
      "contact": "John Doe",
      "status": "Lead"
    }
  ]
}
*/
