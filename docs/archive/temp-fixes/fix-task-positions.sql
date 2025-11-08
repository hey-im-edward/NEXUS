-- ============================================
-- FIX TASK POSITIONS - Reset về đúng thứ tự
-- ============================================
-- Workspace: c6be91ba-98c3-43e5-8e5e-94e389894fa6
-- ============================================

-- Show current positions (before fix)
SELECT 
  status,
  title,
  position,
  id
FROM tasks 
WHERE workspace_id = 'c6be91ba-98c3-43e5-8e5e-94e389894fa6'
ORDER BY status, position;

-- Fix positions for TODO column
WITH ranked_tasks AS (
  SELECT 
    id,
    ROW_NUMBER() OVER (ORDER BY created_at) - 1 AS new_position
  FROM tasks
  WHERE workspace_id = 'c6be91ba-98c3-43e5-8e5e-94e389894fa6'
    AND status = 'todo'
)
UPDATE tasks
SET position = ranked_tasks.new_position
FROM ranked_tasks
WHERE tasks.id = ranked_tasks.id;

-- Fix positions for IN_PROGRESS column
WITH ranked_tasks AS (
  SELECT 
    id,
    ROW_NUMBER() OVER (ORDER BY created_at) - 1 AS new_position
  FROM tasks
  WHERE workspace_id = 'c6be91ba-98c3-43e5-8e5e-94e389894fa6'
    AND status = 'in_progress'
)
UPDATE tasks
SET position = ranked_tasks.new_position
FROM ranked_tasks
WHERE tasks.id = ranked_tasks.id;

-- Fix positions for DONE column
WITH ranked_tasks AS (
  SELECT 
    id,
    ROW_NUMBER() OVER (ORDER BY created_at) - 1 AS new_position
  FROM tasks
  WHERE workspace_id = 'c6be91ba-98c3-43e5-8e5e-94e389894fa6'
    AND status = 'done'
)
UPDATE tasks
SET position = ranked_tasks.new_position
FROM ranked_tasks
WHERE tasks.id = ranked_tasks.id;

-- Verify fixed positions
SELECT 
  status,
  title,
  position,
  to_char(created_at, 'HH24:MI:SS') as created
FROM tasks 
WHERE workspace_id = 'c6be91ba-98c3-43e5-8e5e-94e389894fa6'
ORDER BY status, position;

-- Summary
SELECT 
  status,
  COUNT(*) as total_tasks,
  ARRAY_AGG(position ORDER BY position) as positions
FROM tasks 
WHERE workspace_id = 'c6be91ba-98c3-43e5-8e5e-94e389894fa6'
GROUP BY status
ORDER BY 
  CASE status
    WHEN 'todo' THEN 1
    WHEN 'in_progress' THEN 2
    WHEN 'done' THEN 3
    ELSE 4
  END;
