-- DEMO DATA FOR KANBAN BOARD
-- Run this in Supabase SQL Editor to create test tasks

-- Step 1: Get your user ID and workspace ID
-- SELECT id FROM auth.users; -- Copy your user ID
-- SELECT id FROM workspaces WHERE owner_id = 'YOUR_USER_ID'; -- Copy workspace ID

-- Step 2: Replace these variables
-- SET workspace_id = 'YOUR_WORKSPACE_ID';
-- SET user_id = 'YOUR_USER_ID';

-- Step 3: Insert demo tasks (change workspace_id and created_by)
INSERT INTO tasks (
  workspace_id,
  project_id,
  title,
  description,
  status,
  priority,
  due_date,
  created_by,
  position
) VALUES
  -- TODO Tasks
  ('YOUR_WORKSPACE_ID', NULL, 'Thiết kế UI cho trang chủ', 'Tạo mockup và wireframe', 'todo', 'high', NOW() + INTERVAL '3 days', 'YOUR_USER_ID', 0),
  ('YOUR_WORKSPACE_ID', NULL, 'Review code PR #123', 'Kiểm tra logic và test cases', 'todo', 'urgent', NOW() + INTERVAL '1 day', 'YOUR_USER_ID', 1),
  ('YOUR_WORKSPACE_ID', NULL, 'Viết documentation', 'Docs cho API endpoints', 'todo', 'medium', NOW() + INTERVAL '5 days', 'YOUR_USER_ID', 2),
  ('YOUR_WORKSPACE_ID', NULL, 'Setup CI/CD pipeline', 'GitHub Actions + Docker', 'todo', 'low', NOW() + INTERVAL '7 days', 'YOUR_USER_ID', 3),
  
  -- IN_PROGRESS Tasks
  ('YOUR_WORKSPACE_ID', NULL, 'Implement Kanban board', 'Drag & drop với @dnd-kit', 'in_progress', 'urgent', NOW() + INTERVAL '2 days', 'YOUR_USER_ID', 0),
  ('YOUR_WORKSPACE_ID', NULL, 'Fix bugs trong task list', 'Lỗi filter và sorting', 'in_progress', 'high', NOW() + INTERVAL '1 day', 'YOUR_USER_ID', 1),
  ('YOUR_WORKSPACE_ID', NULL, 'Optimize database queries', 'Cải thiện performance', 'in_progress', 'medium', NOW() + INTERVAL '4 days', 'YOUR_USER_ID', 2),
  
  -- DONE Tasks
  ('YOUR_WORKSPACE_ID', NULL, 'Setup Supabase project', 'Database schema và RLS policies', 'done', 'none', NOW() - INTERVAL '2 days', 'YOUR_USER_ID', 0),
  ('YOUR_WORKSPACE_ID', NULL, 'Install dependencies', 'Next.js, React, Zustand', 'done', 'none', NOW() - INTERVAL '3 days', 'YOUR_USER_ID', 1),
  ('YOUR_WORKSPACE_ID', NULL, 'Create task types', 'TypeScript interfaces', 'done', 'low', NOW() - INTERVAL '1 day', 'YOUR_USER_ID', 2);

-- Verify data
-- SELECT id, title, status, priority, due_date FROM tasks WHERE workspace_id = 'YOUR_WORKSPACE_ID' ORDER BY status, position;

-- Quick script to get your IDs:
/*
DO $$
DECLARE
  v_user_id UUID;
  v_workspace_id UUID;
BEGIN
  -- Get current user
  SELECT id INTO v_user_id FROM auth.users LIMIT 1;
  RAISE NOTICE 'User ID: %', v_user_id;
  
  -- Get or create workspace
  SELECT id INTO v_workspace_id FROM workspaces WHERE owner_id = v_user_id LIMIT 1;
  
  IF v_workspace_id IS NULL THEN
    INSERT INTO workspaces (name, owner_id) 
    VALUES ('Demo Workspace', v_user_id) 
    RETURNING id INTO v_workspace_id;
  END IF;
  
  RAISE NOTICE 'Workspace ID: %', v_workspace_id;
END $$;
*/
