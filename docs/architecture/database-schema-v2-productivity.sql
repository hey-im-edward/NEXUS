-- ============================================
-- NEXUS DATABASE SCHEMA v2 - PRODUCTIVITY OS
-- ============================================
-- Version: 2.0.0 (Productivity Core)
-- Last Updated: November 7, 2025
-- Priority: 70% Productivity (Tasks, Kanban, Calendar) + 20% Pages + 10% App Minis

-- ============================================
-- CLEAN UP (Drop existing tables if any)
-- ============================================
-- WARNING: This will delete ALL data. Only use in development!

-- Drop policies first (reverse dependency order)
DROP POLICY IF EXISTS "Members can delete time entries" ON public.time_entries;
DROP POLICY IF EXISTS "Members can update time entries" ON public.time_entries;
DROP POLICY IF EXISTS "Members can create time entries" ON public.time_entries;
DROP POLICY IF EXISTS "Members can view time entries" ON public.time_entries;

DROP POLICY IF EXISTS "Members can delete time blocks" ON public.time_blocks;
DROP POLICY IF EXISTS "Members can update time blocks" ON public.time_blocks;
DROP POLICY IF EXISTS "Members can create time blocks" ON public.time_blocks;
DROP POLICY IF EXISTS "Members can view time blocks" ON public.time_blocks;

DROP POLICY IF EXISTS "Members can delete recurring instances" ON public.recurring_instances;
DROP POLICY IF EXISTS "Members can view recurring instances" ON public.recurring_instances;

DROP POLICY IF EXISTS "Members can delete pages" ON public.pages;
DROP POLICY IF EXISTS "Members can update pages" ON public.pages;
DROP POLICY IF EXISTS "Members can create pages" ON public.pages;
DROP POLICY IF EXISTS "Members can view pages" ON public.pages;

DROP POLICY IF EXISTS "Members can delete tasks" ON public.tasks;
DROP POLICY IF EXISTS "Members can update tasks" ON public.tasks;
DROP POLICY IF EXISTS "Members can create tasks" ON public.tasks;
DROP POLICY IF EXISTS "Members can view tasks" ON public.tasks;

DROP POLICY IF EXISTS "Members can delete projects" ON public.projects;
DROP POLICY IF EXISTS "Members can update projects" ON public.projects;
DROP POLICY IF EXISTS "Members can create projects" ON public.projects;
DROP POLICY IF EXISTS "Members can view projects" ON public.projects;

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

-- Drop tables (reverse dependency order)
DROP TABLE IF EXISTS public.time_entries CASCADE;
DROP TABLE IF EXISTS public.time_blocks CASCADE;
DROP TABLE IF EXISTS public.recurring_instances CASCADE;
DROP TABLE IF EXISTS public.tasks CASCADE;
DROP TABLE IF EXISTS public.projects CASCADE;
DROP TABLE IF EXISTS public.pages CASCADE;
DROP TABLE IF EXISTS public.app_minis CASCADE;
DROP TABLE IF EXISTS public.dashboards CASCADE;
DROP TABLE IF EXISTS public.workspace_members CASCADE;
DROP TABLE IF EXISTS public.workspaces CASCADE;
DROP TABLE IF EXISTS public.profiles CASCADE;

-- Drop custom types
DROP TYPE IF EXISTS task_status CASCADE;
DROP TYPE IF EXISTS task_priority CASCADE;
DROP TYPE IF EXISTS app_mini_type CASCADE;
DROP TYPE IF EXISTS member_role CASCADE;

-- ============================================
-- EXTENSIONS
-- ============================================
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- USERS & AUTHENTICATION
-- ============================================
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
  slug TEXT UNIQUE,
  owner_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  settings JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_workspaces_owner ON public.workspaces(owner_id);
CREATE INDEX idx_workspaces_slug ON public.workspaces(slug);

-- ============================================
-- WORKSPACE MEMBERS
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

CREATE INDEX idx_workspace_members_workspace ON public.workspace_members(workspace_id);
CREATE INDEX idx_workspace_members_user ON public.workspace_members(user_id);

-- ============================================
-- PROJECTS (70% Priority - Productivity Core)
-- ============================================
CREATE TABLE public.projects (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  workspace_id UUID REFERENCES public.workspaces(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  color TEXT DEFAULT '#3b82f6', -- For UI differentiation
  icon TEXT DEFAULT '📁', -- Emoji or icon identifier
  is_archived BOOLEAN DEFAULT FALSE,
  created_by UUID REFERENCES public.profiles(id) NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_projects_workspace ON public.projects(workspace_id);
CREATE INDEX idx_projects_archived ON public.projects(is_archived);

-- ============================================
-- TASKS (70% Priority - Core of Productivity)
-- ============================================
CREATE TYPE task_status AS ENUM ('todo', 'in_progress', 'done', 'cancelled');
CREATE TYPE task_priority AS ENUM ('none', 'low', 'medium', 'high', 'urgent');

CREATE TABLE public.tasks (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  workspace_id UUID REFERENCES public.workspaces(id) ON DELETE CASCADE NOT NULL,
  project_id UUID REFERENCES public.projects(id) ON DELETE SET NULL, -- NULL = Inbox
  parent_task_id UUID REFERENCES public.tasks(id) ON DELETE CASCADE, -- For sub-tasks
  
  -- Basic Info
  title TEXT NOT NULL,
  description TEXT, -- Rich text (Tiptap JSON) or plain text
  status task_status DEFAULT 'todo' NOT NULL,
  priority task_priority DEFAULT 'none' NOT NULL,
  
  -- Dates
  due_date TIMESTAMPTZ,
  start_date TIMESTAMPTZ,
  completed_at TIMESTAMPTZ,
  
  -- Recurring Tasks (Advanced)
  is_recurring BOOLEAN DEFAULT FALSE,
  rrule TEXT, -- RFC-5545 format (e.g., "FREQ=DAILY;INTERVAL=2" for every 2 days)
  recurring_parent_id UUID REFERENCES public.tasks(id) ON DELETE CASCADE, -- Link to original recurring task
  
  -- Assignment
  assignee_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  created_by UUID REFERENCES public.profiles(id) NOT NULL,
  
  -- Metadata
  tags TEXT[], -- e.g., ['urgent', 'design', 'frontend']
  position INT, -- For drag-drop ordering in lists
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_tasks_workspace ON public.tasks(workspace_id);
CREATE INDEX idx_tasks_project ON public.tasks(project_id);
CREATE INDEX idx_tasks_parent ON public.tasks(parent_task_id);
CREATE INDEX idx_tasks_assignee ON public.tasks(assignee_id);
CREATE INDEX idx_tasks_status ON public.tasks(status);
CREATE INDEX idx_tasks_priority ON public.tasks(priority);
CREATE INDEX idx_tasks_due_date ON public.tasks(due_date);
CREATE INDEX idx_tasks_recurring ON public.tasks(is_recurring);
CREATE INDEX idx_tasks_tags ON public.tasks USING GIN (tags);

-- ============================================
-- RECURRING INSTANCES (Track generated tasks)
-- ============================================
CREATE TABLE public.recurring_instances (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  recurring_task_id UUID REFERENCES public.tasks(id) ON DELETE CASCADE NOT NULL,
  instance_task_id UUID REFERENCES public.tasks(id) ON DELETE CASCADE NOT NULL,
  instance_date TIMESTAMPTZ NOT NULL, -- When this instance was supposed to occur
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_recurring_instances_recurring ON public.recurring_instances(recurring_task_id);
CREATE INDEX idx_recurring_instances_instance ON public.recurring_instances(instance_task_id);
CREATE INDEX idx_recurring_instances_date ON public.recurring_instances(instance_date);

-- ============================================
-- TIME BLOCKS (Calendar View)
-- ============================================
CREATE TABLE public.time_blocks (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  workspace_id UUID REFERENCES public.workspaces(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  task_id UUID REFERENCES public.tasks(id) ON DELETE SET NULL, -- Optional: link to task
  
  title TEXT NOT NULL,
  description TEXT,
  start_time TIMESTAMPTZ NOT NULL,
  end_time TIMESTAMPTZ NOT NULL,
  
  color TEXT DEFAULT '#3b82f6',
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_time_blocks_workspace ON public.time_blocks(workspace_id);
CREATE INDEX idx_time_blocks_user ON public.time_blocks(user_id);
CREATE INDEX idx_time_blocks_task ON public.time_blocks(task_id);
CREATE INDEX idx_time_blocks_time ON public.time_blocks(start_time, end_time);

-- ============================================
-- TIME ENTRIES (Time Tracking)
-- ============================================
CREATE TABLE public.time_entries (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  workspace_id UUID REFERENCES public.workspaces(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  task_id UUID REFERENCES public.tasks(id) ON DELETE CASCADE NOT NULL,
  
  start_time TIMESTAMPTZ NOT NULL,
  end_time TIMESTAMPTZ, -- NULL if currently running
  duration_seconds INT, -- Auto-calculated
  
  notes TEXT,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_time_entries_workspace ON public.time_entries(workspace_id);
CREATE INDEX idx_time_entries_user ON public.time_entries(user_id);
CREATE INDEX idx_time_entries_task ON public.time_entries(task_id);
CREATE INDEX idx_time_entries_time ON public.time_entries(start_time);

-- ============================================
-- PAGES (20% Priority - Notion-like Flexibility)
-- ============================================
CREATE TABLE public.pages (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  workspace_id UUID REFERENCES public.workspaces(id) ON DELETE CASCADE NOT NULL,
  parent_page_id UUID REFERENCES public.pages(id) ON DELETE CASCADE, -- For nested pages
  
  title TEXT NOT NULL DEFAULT 'Untitled',
  icon TEXT, -- Emoji or icon
  cover_url TEXT, -- Cover image URL
  
  content JSONB DEFAULT '{}', -- Tiptap JSON content
  
  is_archived BOOLEAN DEFAULT FALSE,
  
  created_by UUID REFERENCES public.profiles(id) NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_pages_workspace ON public.pages(workspace_id);
CREATE INDEX idx_pages_parent ON public.pages(parent_page_id);
CREATE INDEX idx_pages_archived ON public.pages(is_archived);
CREATE INDEX idx_pages_content ON public.pages USING GIN (content);

-- ============================================
-- DASHBOARDS (10% Priority - App Mini Containers)
-- ============================================
CREATE TABLE public.dashboards (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  workspace_id UUID REFERENCES public.workspaces(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL DEFAULT 'Untitled Dashboard',
  description TEXT,
  layout JSONB DEFAULT '{"items": []}',
  is_default BOOLEAN DEFAULT FALSE,
  created_by UUID REFERENCES public.profiles(id) NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_dashboards_workspace ON public.dashboards(workspace_id);
CREATE INDEX idx_dashboards_creator ON public.dashboards(created_by);

-- ============================================
-- APP MINIS (10% Priority - Future Extensibility)
-- ============================================
CREATE TYPE app_mini_type AS ENUM (
  'crm',
  'habit-tracker',
  'pomodoro',
  'invoice',
  'notes',
  'iframe',
  'custom'
);

CREATE TABLE public.app_minis (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  dashboard_id UUID REFERENCES public.dashboards(id) ON DELETE CASCADE NOT NULL,
  type app_mini_type NOT NULL,
  name TEXT NOT NULL,
  
  config JSONB DEFAULT '{}',
  position JSONB DEFAULT '{"x": 0, "y": 0, "w": 4, "h": 4}',
  data JSONB DEFAULT '{}',
  
  created_by UUID REFERENCES public.profiles(id) NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_app_minis_dashboard ON public.app_minis(dashboard_id);
CREATE INDEX idx_app_minis_type ON public.app_minis(type);
CREATE INDEX idx_app_minis_config ON public.app_minis USING GIN (config);
CREATE INDEX idx_app_minis_data ON public.app_minis USING GIN (data);

-- ============================================
-- ROW LEVEL SECURITY POLICIES
-- ============================================

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
    id IN (SELECT workspace_id FROM workspace_members WHERE user_id = auth.uid())
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
    workspace_id IN (SELECT workspace_id FROM workspace_members WHERE user_id = auth.uid())
  );

-- PROJECTS
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Members can view projects" 
  ON public.projects FOR SELECT 
  USING (
    workspace_id IN (SELECT workspace_id FROM workspace_members WHERE user_id = auth.uid())
  );

CREATE POLICY "Members can create projects" 
  ON public.projects FOR INSERT 
  WITH CHECK (
    created_by = auth.uid() AND
    workspace_id IN (SELECT workspace_id FROM workspace_members WHERE user_id = auth.uid())
  );

CREATE POLICY "Members can update projects" 
  ON public.projects FOR UPDATE 
  USING (
    workspace_id IN (
      SELECT workspace_id FROM workspace_members 
      WHERE user_id = auth.uid() AND role IN ('owner', 'admin', 'member')
    )
  );

CREATE POLICY "Members can delete projects" 
  ON public.projects FOR DELETE 
  USING (
    created_by = auth.uid() OR
    workspace_id IN (
      SELECT workspace_id FROM workspace_members 
      WHERE user_id = auth.uid() AND role IN ('owner', 'admin')
    )
  );

-- TASKS
ALTER TABLE public.tasks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Members can view tasks" 
  ON public.tasks FOR SELECT 
  USING (
    workspace_id IN (SELECT workspace_id FROM workspace_members WHERE user_id = auth.uid())
  );

CREATE POLICY "Members can create tasks" 
  ON public.tasks FOR INSERT 
  WITH CHECK (
    created_by = auth.uid() AND
    workspace_id IN (SELECT workspace_id FROM workspace_members WHERE user_id = auth.uid())
  );

CREATE POLICY "Members can update tasks" 
  ON public.tasks FOR UPDATE 
  USING (
    workspace_id IN (
      SELECT workspace_id FROM workspace_members WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Members can delete tasks" 
  ON public.tasks FOR DELETE 
  USING (
    created_by = auth.uid() OR
    workspace_id IN (
      SELECT workspace_id FROM workspace_members 
      WHERE user_id = auth.uid() AND role IN ('owner', 'admin')
    )
  );

-- RECURRING INSTANCES
ALTER TABLE public.recurring_instances ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Members can view recurring instances" 
  ON public.recurring_instances FOR SELECT 
  USING (
    recurring_task_id IN (
      SELECT id FROM tasks 
      WHERE workspace_id IN (
        SELECT workspace_id FROM workspace_members WHERE user_id = auth.uid()
      )
    )
  );

CREATE POLICY "Members can delete recurring instances" 
  ON public.recurring_instances FOR DELETE 
  USING (
    recurring_task_id IN (
      SELECT id FROM tasks 
      WHERE workspace_id IN (
        SELECT workspace_id FROM workspace_members WHERE user_id = auth.uid()
      )
    )
  );

-- TIME BLOCKS
ALTER TABLE public.time_blocks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Members can view time blocks" 
  ON public.time_blocks FOR SELECT 
  USING (
    workspace_id IN (SELECT workspace_id FROM workspace_members WHERE user_id = auth.uid())
  );

CREATE POLICY "Members can create time blocks" 
  ON public.time_blocks FOR INSERT 
  WITH CHECK (
    user_id = auth.uid() AND
    workspace_id IN (SELECT workspace_id FROM workspace_members WHERE user_id = auth.uid())
  );

CREATE POLICY "Members can update time blocks" 
  ON public.time_blocks FOR UPDATE 
  USING (user_id = auth.uid());

CREATE POLICY "Members can delete time blocks" 
  ON public.time_blocks FOR DELETE 
  USING (user_id = auth.uid());

-- TIME ENTRIES
ALTER TABLE public.time_entries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Members can view time entries" 
  ON public.time_entries FOR SELECT 
  USING (
    workspace_id IN (SELECT workspace_id FROM workspace_members WHERE user_id = auth.uid())
  );

CREATE POLICY "Members can create time entries" 
  ON public.time_entries FOR INSERT 
  WITH CHECK (
    user_id = auth.uid() AND
    workspace_id IN (SELECT workspace_id FROM workspace_members WHERE user_id = auth.uid())
  );

CREATE POLICY "Members can update time entries" 
  ON public.time_entries FOR UPDATE 
  USING (user_id = auth.uid());

CREATE POLICY "Members can delete time entries" 
  ON public.time_entries FOR DELETE 
  USING (user_id = auth.uid());

-- PAGES
ALTER TABLE public.pages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Members can view pages" 
  ON public.pages FOR SELECT 
  USING (
    workspace_id IN (SELECT workspace_id FROM workspace_members WHERE user_id = auth.uid())
  );

CREATE POLICY "Members can create pages" 
  ON public.pages FOR INSERT 
  WITH CHECK (
    created_by = auth.uid() AND
    workspace_id IN (SELECT workspace_id FROM workspace_members WHERE user_id = auth.uid())
  );

CREATE POLICY "Members can update pages" 
  ON public.pages FOR UPDATE 
  USING (
    workspace_id IN (
      SELECT workspace_id FROM workspace_members WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Members can delete pages" 
  ON public.pages FOR DELETE 
  USING (
    created_by = auth.uid() OR
    workspace_id IN (
      SELECT workspace_id FROM workspace_members 
      WHERE user_id = auth.uid() AND role IN ('owner', 'admin')
    )
  );

-- DASHBOARDS
ALTER TABLE public.dashboards ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Members can view workspace dashboards" 
  ON public.dashboards FOR SELECT 
  USING (
    workspace_id IN (SELECT workspace_id FROM workspace_members WHERE user_id = auth.uid())
  );

CREATE POLICY "Members can create dashboards" 
  ON public.dashboards FOR INSERT 
  WITH CHECK (
    created_by = auth.uid() AND
    workspace_id IN (SELECT workspace_id FROM workspace_members WHERE user_id = auth.uid())
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

-- Apply to all tables
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_workspaces_updated_at
  BEFORE UPDATE ON public.workspaces
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_projects_updated_at
  BEFORE UPDATE ON public.projects
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_tasks_updated_at
  BEFORE UPDATE ON public.tasks
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_time_blocks_updated_at
  BEFORE UPDATE ON public.time_blocks
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_time_entries_updated_at
  BEFORE UPDATE ON public.time_entries
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_pages_updated_at
  BEFORE UPDATE ON public.pages
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_dashboards_updated_at
  BEFORE UPDATE ON public.dashboards
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_app_minis_updated_at
  BEFORE UPDATE ON public.app_minis
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ============================================
-- NOTES & DOCUMENTATION
-- ============================================

/*
SCHEMA OVERVIEW:
================
11 Tables Total:

CORE (70% Priority - Productivity OS):
1. tasks - Main task management with recurring support (rrule)
2. projects - Project organization (like Notion databases)
3. time_blocks - Calendar time blocking
4. time_entries - Time tracking
5. recurring_instances - Track recurring task instances

FLEXIBILITY (20% Priority):
6. pages - Notion-like blank canvas with Tiptap JSON

FOUNDATION (Required):
7. profiles - User data
8. workspaces - Team/workspace management
9. workspace_members - Collaboration

EXTENSIBILITY (10% Priority):
10. dashboards - App mini containers
11. app_minis - Embedded apps (CRM, Habit, Pomodoro)

KEY FEATURES:
=============
✅ Advanced Recurring Tasks: rrule field supports "every 2 days", "last Friday of month"
✅ Sub-tasks: parent_task_id for hierarchical tasks
✅ Flexible Assignment: tasks can be in projects or inbox (project_id NULL)
✅ Calendar Integration: time_blocks for time blocking, time_entries for tracking
✅ Rich Content: pages table stores Tiptap JSON for Notion-like flexibility
✅ Multi-tenant: RLS policies ensure workspace-level data isolation
✅ JSONB Flexibility: config/data fields for extensibility without migrations

USAGE EXAMPLES:
===============

1. RECURRING TASK (Every 2 days):
INSERT INTO tasks (workspace_id, title, is_recurring, rrule, created_by)
VALUES (
  'workspace-uuid',
  'Check emails',
  true,
  'FREQ=DAILY;INTERVAL=2', -- Every 2 days
  'user-uuid'
);

2. RECURRING TASK (Last Friday of month):
INSERT INTO tasks (workspace_id, title, is_recurring, rrule, created_by)
VALUES (
  'workspace-uuid',
  'Monthly report',
  true,
  'FREQ=MONTHLY;BYDAY=-1FR', -- Last Friday
  'user-uuid'
);

3. SUB-TASK:
INSERT INTO tasks (workspace_id, parent_task_id, title, created_by)
VALUES (
  'workspace-uuid',
  'parent-task-uuid',
  'Research competitor pricing',
  'user-uuid'
);

4. TIME BLOCK (Calendar):
INSERT INTO time_blocks (workspace_id, user_id, task_id, title, start_time, end_time)
VALUES (
  'workspace-uuid',
  'user-uuid',
  'task-uuid',
  'Work on design',
  '2025-11-07 09:00:00+00',
  '2025-11-07 11:00:00+00'
);

5. PAGE (Notion-like):
INSERT INTO pages (workspace_id, title, content, created_by)
VALUES (
  'workspace-uuid',
  'Product Requirements',
  '{"type":"doc","content":[{"type":"heading","attrs":{"level":1},"content":[{"type":"text","text":"PRD"}]}]}',
  'user-uuid'
);
*/
