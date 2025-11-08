-- ============================================
-- DEMO DATA FOR KANBAN BOARD TESTING
-- ============================================
-- Workspace: c6be91ba-98c3-43e5-8e5e-94e389894fa6
-- User: 9ee955b6-fca2-473d-9e1f-cf04cadf7db6
-- ============================================

-- Insert demo tasks across all 3 columns
INSERT INTO tasks (
  workspace_id,
  project_id,
  title,
  description,
  status,
  priority,
  due_date,
  created_by,
  tags,
  position
) VALUES
  -- ===== TODO COLUMN (5 tasks) =====
  (
    'c6be91ba-98c3-43e5-8e5e-94e389894fa6',
    NULL,
    'Thiết kế UI cho trang chủ',
    'Tạo mockup và wireframe cho homepage mới',
    'todo',
    'high',
    NOW() + INTERVAL '3 days',
    '9ee955b6-fca2-473d-9e1f-cf04cadf7db6',
    ARRAY['design', 'ui'],
    0
  ),
  (
    'c6be91ba-98c3-43e5-8e5e-94e389894fa6',
    NULL,
    'Review code PR #123',
    'Kiểm tra logic và test cases cho feature login',
    'todo',
    'urgent',
    NOW() + INTERVAL '1 day',
    '9ee955b6-fca2-473d-9e1f-cf04cadf7db6',
    ARRAY['code-review', 'urgent'],
    1
  ),
  (
    'c6be91ba-98c3-43e5-8e5e-94e389894fa6',
    NULL,
    'Viết documentation',
    'Docs cho API endpoints và authentication flow',
    'todo',
    'medium',
    NOW() + INTERVAL '5 days',
    '9ee955b6-fca2-473d-9e1f-cf04cadf7db6',
    ARRAY['docs'],
    2
  ),
  (
    'c6be91ba-98c3-43e5-8e5e-94e389894fa6',
    NULL,
    'Setup CI/CD pipeline',
    'GitHub Actions + Docker deployment',
    'todo',
    'low',
    NOW() + INTERVAL '7 days',
    '9ee955b6-fca2-473d-9e1f-cf04cadf7db6',
    ARRAY['devops', 'ci-cd'],
    3
  ),
  (
    'c6be91ba-98c3-43e5-8e5e-94e389894fa6',
    NULL,
    'Tạo test cases',
    'Unit tests và integration tests cho core features',
    'todo',
    'medium',
    NOW() + INTERVAL '4 days',
    '9ee955b6-fca2-473d-9e1f-cf04cadf7db6',
    ARRAY['testing'],
    4
  ),
  
  -- ===== IN_PROGRESS COLUMN (4 tasks) =====
  (
    'c6be91ba-98c3-43e5-8e5e-94e389894fa6',
    NULL,
    'Implement Kanban board',
    'Drag & drop với @dnd-kit và Supabase sync',
    'in_progress',
    'urgent',
    NOW() + INTERVAL '2 days',
    '9ee955b6-fca2-473d-9e1f-cf04cadf7db6',
    ARRAY['feature', 'kanban'],
    0
  ),
  (
    'c6be91ba-98c3-43e5-8e5e-94e389894fa6',
    NULL,
    'Fix bugs trong task list',
    'Lỗi filter và sorting không hoạt động đúng',
    'in_progress',
    'high',
    NOW() + INTERVAL '1 day',
    '9ee955b6-fca2-473d-9e1f-cf04cadf7db6',
    ARRAY['bug', 'high-priority'],
    1
  ),
  (
    'c6be91ba-98c3-43e5-8e5e-94e389894fa6',
    NULL,
    'Optimize database queries',
    'Cải thiện performance cho large datasets',
    'in_progress',
    'medium',
    NOW() + INTERVAL '4 days',
    '9ee955b6-fca2-473d-9e1f-cf04cadf7db6',
    ARRAY['performance', 'database'],
    2
  ),
  (
    'c6be91ba-98c3-43e5-8e5e-94e389894fa6',
    NULL,
    'Refactor authentication',
    'Migrate từ JWT sang Supabase Auth',
    'in_progress',
    'high',
    NOW() + INTERVAL '3 days',
    '9ee955b6-fca2-473d-9e1f-cf04cadf7db6',
    ARRAY['auth', 'refactor'],
    3
  ),
  
  -- ===== DONE COLUMN (3 tasks) =====
  (
    'c6be91ba-98c3-43e5-8e5e-94e389894fa6',
    NULL,
    'Setup Supabase project',
    'Database schema và RLS policies',
    'done',
    'none',
    NOW() - INTERVAL '2 days',
    '9ee955b6-fca2-473d-9e1f-cf04cadf7db6',
    ARRAY['setup', 'database'],
    0
  ),
  (
    'c6be91ba-98c3-43e5-8e5e-94e389894fa6',
    NULL,
    'Install dependencies',
    'Next.js, React, Zustand, @dnd-kit',
    'done',
    'none',
    NOW() - INTERVAL '3 days',
    '9ee955b6-fca2-473d-9e1f-cf04cadf7db6',
    ARRAY['setup'],
    1
  ),
  (
    'c6be91ba-98c3-43e5-8e5e-94e389894fa6',
    NULL,
    'Create task types',
    'TypeScript interfaces cho Task, Project, TimeBlock',
    'done',
    'low',
    NOW() - INTERVAL '1 day',
    '9ee955b6-fca2-473d-9e1f-cf04cadf7db6',
    ARRAY['typescript', 'types'],
    2
  );

-- Verify inserted data
SELECT 
  id,
  title,
  status,
  priority,
  to_char(due_date, 'YYYY-MM-DD') as due_date,
  position,
  tags
FROM tasks 
WHERE workspace_id = 'c6be91ba-98c3-43e5-8e5e-94e389894fa6'
ORDER BY status, position;

-- Summary count
SELECT 
  status,
  COUNT(*) as count
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
