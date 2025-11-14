-- ============================================
-- MIGRATION: Productivity Core Schema
-- ============================================
-- Description: Add tasks, projects, pages, time_blocks tables for Productivity OS
-- Date: November 7, 2025
-- Safe to run: YES (uses IF NOT EXISTS, only adds new tables)

-- ============================================
-- EXTENSIONS
-- ============================================
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- CUSTOM TYPES
-- ============================================
DO $$ BEGIN
    CREATE TYPE task_status AS ENUM ('todo', 'in_progress', 'done', 'cancelled');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE task_priority AS ENUM ('none', 'low', 'medium', 'high', 'urgent');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- ============================================
-- PROJECTS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS public.projects (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  workspace_id UUID REFERENCES public.workspaces(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  color TEXT DEFAULT '#3b82f6',
  icon TEXT DEFAULT '📁',
  is_archived BOOLEAN DEFAULT FALSE,
  created_by UUID REFERENCES public.profiles(id) NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_projects_workspace ON public.projects(workspace_id);
CREATE INDEX IF NOT EXISTS idx_projects_archived ON public.projects(is_archived);

-- ============================================
-- TASKS TABLE (CORE)
-- ============================================
CREATE TABLE IF NOT EXISTS public.tasks (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  workspace_id UUID REFERENCES public.workspaces(id) ON DELETE CASCADE NOT NULL,
  project_id UUID REFERENCES public.projects(id) ON DELETE SET NULL,
  parent_task_id UUID REFERENCES public.tasks(id) ON DELETE CASCADE,
  
  title TEXT NOT NULL,
  description TEXT,
  status task_status DEFAULT 'todo' NOT NULL,
  priority task_priority DEFAULT 'none' NOT NULL,
  
  due_date TIMESTAMPTZ,
  start_date TIMESTAMPTZ,
  completed_at TIMESTAMPTZ,
  
  is_recurring BOOLEAN DEFAULT FALSE,
  rrule TEXT,
  recurring_parent_id UUID REFERENCES public.tasks(id) ON DELETE CASCADE,
  
  assignee_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  created_by UUID REFERENCES public.profiles(id) NOT NULL,
  
  tags TEXT[],
  position INT,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_tasks_workspace ON public.tasks(workspace_id);
CREATE INDEX IF NOT EXISTS idx_tasks_project ON public.tasks(project_id);
CREATE INDEX IF NOT EXISTS idx_tasks_parent ON public.tasks(parent_task_id);
CREATE INDEX IF NOT EXISTS idx_tasks_assignee ON public.tasks(assignee_id);
CREATE INDEX IF NOT EXISTS idx_tasks_status ON public.tasks(status);
CREATE INDEX IF NOT EXISTS idx_tasks_priority ON public.tasks(priority);
CREATE INDEX IF NOT EXISTS idx_tasks_due_date ON public.tasks(due_date);
CREATE INDEX IF NOT EXISTS idx_tasks_recurring ON public.tasks(is_recurring);
CREATE INDEX IF NOT EXISTS idx_tasks_tags ON public.tasks USING GIN (tags);

-- ============================================
-- RECURRING INSTANCES TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS public.recurring_instances (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  recurring_task_id UUID REFERENCES public.tasks(id) ON DELETE CASCADE NOT NULL,
  instance_task_id UUID REFERENCES public.tasks(id) ON DELETE CASCADE NOT NULL,
  instance_date TIMESTAMPTZ NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_recurring_instances_recurring ON public.recurring_instances(recurring_task_id);
CREATE INDEX IF NOT EXISTS idx_recurring_instances_instance ON public.recurring_instances(instance_task_id);
CREATE INDEX IF NOT EXISTS idx_recurring_instances_date ON public.recurring_instances(instance_date);

-- ============================================
-- TIME BLOCKS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS public.time_blocks (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  workspace_id UUID REFERENCES public.workspaces(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  task_id UUID REFERENCES public.tasks(id) ON DELETE SET NULL,
  
  title TEXT NOT NULL,
  description TEXT,
  start_time TIMESTAMPTZ NOT NULL,
  end_time TIMESTAMPTZ NOT NULL,
  
  color TEXT DEFAULT '#3b82f6',
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_time_blocks_workspace ON public.time_blocks(workspace_id);
CREATE INDEX IF NOT EXISTS idx_time_blocks_user ON public.time_blocks(user_id);
CREATE INDEX IF NOT EXISTS idx_time_blocks_task ON public.time_blocks(task_id);
CREATE INDEX IF NOT EXISTS idx_time_blocks_time ON public.time_blocks(start_time, end_time);

-- ============================================
-- TIME ENTRIES TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS public.time_entries (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  workspace_id UUID REFERENCES public.workspaces(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  task_id UUID REFERENCES public.tasks(id) ON DELETE CASCADE NOT NULL,
  
  start_time TIMESTAMPTZ NOT NULL,
  end_time TIMESTAMPTZ,
  duration_seconds INT,
  
  notes TEXT,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_time_entries_workspace ON public.time_entries(workspace_id);
CREATE INDEX IF NOT EXISTS idx_time_entries_user ON public.time_entries(user_id);
CREATE INDEX IF NOT EXISTS idx_time_entries_task ON public.time_entries(task_id);
CREATE INDEX IF NOT EXISTS idx_time_entries_time ON public.time_entries(start_time);

-- ============================================
-- PAGES TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS public.pages (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  workspace_id UUID REFERENCES public.workspaces(id) ON DELETE CASCADE NOT NULL,
  parent_page_id UUID REFERENCES public.pages(id) ON DELETE CASCADE,
  
  title TEXT NOT NULL DEFAULT 'Untitled',
  icon TEXT,
  cover_url TEXT,
  
  content JSONB DEFAULT '{}',
  
  is_archived BOOLEAN DEFAULT FALSE,
  
  created_by UUID REFERENCES public.profiles(id) NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_pages_workspace ON public.pages(workspace_id);
CREATE INDEX IF NOT EXISTS idx_pages_parent ON public.pages(parent_page_id);
CREATE INDEX IF NOT EXISTS idx_pages_archived ON public.pages(is_archived);
CREATE INDEX IF NOT EXISTS idx_pages_content ON public.pages USING GIN (content);

-- ============================================
-- ROW LEVEL SECURITY POLICIES
-- ============================================

-- PROJECTS
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Members can view projects" ON public.projects;
CREATE POLICY "Members can view projects" 
  ON public.projects FOR SELECT 
  USING (
    workspace_id IN (SELECT workspace_id FROM workspace_members WHERE user_id = auth.uid())
  );

DROP POLICY IF EXISTS "Members can create projects" ON public.projects;
CREATE POLICY "Members can create projects" 
  ON public.projects FOR INSERT 
  WITH CHECK (
    created_by = auth.uid() AND
    workspace_id IN (SELECT workspace_id FROM workspace_members WHERE user_id = auth.uid())
  );

DROP POLICY IF EXISTS "Members can update projects" ON public.projects;
CREATE POLICY "Members can update projects" 
  ON public.projects FOR UPDATE 
  USING (
    workspace_id IN (
      SELECT workspace_id FROM workspace_members 
      WHERE user_id = auth.uid() AND role IN ('owner', 'admin', 'member')
    )
  );

DROP POLICY IF EXISTS "Members can delete projects" ON public.projects;
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

DROP POLICY IF EXISTS "Members can view tasks" ON public.tasks;
CREATE POLICY "Members can view tasks" 
  ON public.tasks FOR SELECT 
  USING (
    workspace_id IN (SELECT workspace_id FROM workspace_members WHERE user_id = auth.uid())
  );

DROP POLICY IF EXISTS "Members can create tasks" ON public.tasks;
CREATE POLICY "Members can create tasks" 
  ON public.tasks FOR INSERT 
  WITH CHECK (
    created_by = auth.uid() AND
    workspace_id IN (SELECT workspace_id FROM workspace_members WHERE user_id = auth.uid())
  );

DROP POLICY IF EXISTS "Members can update tasks" ON public.tasks;
CREATE POLICY "Members can update tasks" 
  ON public.tasks FOR UPDATE 
  USING (
    workspace_id IN (
      SELECT workspace_id FROM workspace_members WHERE user_id = auth.uid()
    )
  );

DROP POLICY IF EXISTS "Members can delete tasks" ON public.tasks;
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

DROP POLICY IF EXISTS "Members can view recurring instances" ON public.recurring_instances;
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

DROP POLICY IF EXISTS "Members can delete recurring instances" ON public.recurring_instances;
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

DROP POLICY IF EXISTS "Members can view time blocks" ON public.time_blocks;
CREATE POLICY "Members can view time blocks" 
  ON public.time_blocks FOR SELECT 
  USING (
    workspace_id IN (SELECT workspace_id FROM workspace_members WHERE user_id = auth.uid())
  );

DROP POLICY IF EXISTS "Members can create time blocks" ON public.time_blocks;
CREATE POLICY "Members can create time blocks" 
  ON public.time_blocks FOR INSERT 
  WITH CHECK (
    user_id = auth.uid() AND
    workspace_id IN (SELECT workspace_id FROM workspace_members WHERE user_id = auth.uid())
  );

DROP POLICY IF EXISTS "Members can update time blocks" ON public.time_blocks;
CREATE POLICY "Members can update time blocks" 
  ON public.time_blocks FOR UPDATE 
  USING (user_id = auth.uid());

DROP POLICY IF EXISTS "Members can delete time blocks" ON public.time_blocks;
CREATE POLICY "Members can delete time blocks" 
  ON public.time_blocks FOR DELETE 
  USING (user_id = auth.uid());

-- TIME ENTRIES
ALTER TABLE public.time_entries ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Members can view time entries" ON public.time_entries;
CREATE POLICY "Members can view time entries" 
  ON public.time_entries FOR SELECT 
  USING (
    workspace_id IN (SELECT workspace_id FROM workspace_members WHERE user_id = auth.uid())
  );

DROP POLICY IF EXISTS "Members can create time entries" ON public.time_entries;
CREATE POLICY "Members can create time entries" 
  ON public.time_entries FOR INSERT 
  WITH CHECK (
    user_id = auth.uid() AND
    workspace_id IN (SELECT workspace_id FROM workspace_members WHERE user_id = auth.uid())
  );

DROP POLICY IF EXISTS "Members can update time entries" ON public.time_entries;
CREATE POLICY "Members can update time entries" 
  ON public.time_entries FOR UPDATE 
  USING (user_id = auth.uid());

DROP POLICY IF EXISTS "Members can delete time entries" ON public.time_entries;
CREATE POLICY "Members can delete time entries" 
  ON public.time_entries FOR DELETE 
  USING (user_id = auth.uid());

-- PAGES
ALTER TABLE public.pages ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Members can view pages" ON public.pages;
CREATE POLICY "Members can view pages" 
  ON public.pages FOR SELECT 
  USING (
    workspace_id IN (SELECT workspace_id FROM workspace_members WHERE user_id = auth.uid())
  );

DROP POLICY IF EXISTS "Members can create pages" ON public.pages;
CREATE POLICY "Members can create pages" 
  ON public.pages FOR INSERT 
  WITH CHECK (
    created_by = auth.uid() AND
    workspace_id IN (SELECT workspace_id FROM workspace_members WHERE user_id = auth.uid())
  );

DROP POLICY IF EXISTS "Members can update pages" ON public.pages;
CREATE POLICY "Members can update pages" 
  ON public.pages FOR UPDATE 
  USING (
    workspace_id IN (
      SELECT workspace_id FROM workspace_members WHERE user_id = auth.uid()
    )
  );

DROP POLICY IF EXISTS "Members can delete pages" ON public.pages;
CREATE POLICY "Members can delete pages" 
  ON public.pages FOR DELETE 
  USING (
    created_by = auth.uid() OR
    workspace_id IN (
      SELECT workspace_id FROM workspace_members 
      WHERE user_id = auth.uid() AND role IN ('owner', 'admin')
    )
  );

-- ============================================
-- TRIGGERS
-- ============================================

DROP TRIGGER IF EXISTS update_projects_updated_at ON public.projects;
CREATE TRIGGER update_projects_updated_at
  BEFORE UPDATE ON public.projects
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

DROP TRIGGER IF EXISTS update_tasks_updated_at ON public.tasks;
CREATE TRIGGER update_tasks_updated_at
  BEFORE UPDATE ON public.tasks
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

DROP TRIGGER IF EXISTS update_time_blocks_updated_at ON public.time_blocks;
CREATE TRIGGER update_time_blocks_updated_at
  BEFORE UPDATE ON public.time_blocks
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

DROP TRIGGER IF EXISTS update_time_entries_updated_at ON public.time_entries;
CREATE TRIGGER update_time_entries_updated_at
  BEFORE UPDATE ON public.time_entries
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

DROP TRIGGER IF EXISTS update_pages_updated_at ON public.pages;
CREATE TRIGGER update_pages_updated_at
  BEFORE UPDATE ON public.pages
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

