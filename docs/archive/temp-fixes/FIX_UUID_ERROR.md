# 🔧 Fix: UUID Error in Kanban Demo

## Vấn đề

```
Error: invalid input syntax for type uuid: "demo-workspace-id"
```

## Nguyên nhân

- Hardcode `workspaceId = 'demo-workspace-id'` không phải UUID hợp lệ
- Supabase yêu cầu UUID thật cho cột `workspace_id`

## Giải pháp

### ✅ Đã fix (Auto-create workspace)

Tạo hook `useWorkspace()` để tự động lấy hoặc tạo workspace:

```tsx
// hooks/use-workspace.ts
export function useWorkspace() {
  // 1. Check user authentication
  // 2. Fetch existing workspace
  // 3. Create new workspace if not exists
  // 4. Return workspace ID
}
```

### 📋 Cách sử dụng

```tsx
import { useWorkspace } from '@/hooks/use-workspace';

export default function Page() {
  const { workspaceId, loading, error } = useWorkspace();

  if (loading) return <Loading />;
  if (error) return <Error message={error} />;

  return <KanbanBoard workspaceId={workspaceId} />;
}
```

## Demo Data (Optional)

Nếu muốn test với data có sẵn:

1. **Login vào Supabase Dashboard**
2. **Mở SQL Editor**
3. **Copy script từ**: `docs/kanban-demo-data.sql`
4. **Replace** `YOUR_WORKSPACE_ID` và `YOUR_USER_ID`
5. **Run SQL**

Hoặc dùng script tự động:

```sql
-- Get your IDs
SELECT
  u.id as user_id,
  w.id as workspace_id
FROM auth.users u
LEFT JOIN workspaces w ON w.owner_id = u.id
WHERE u.email = 'your-email@example.com';
```

## Flow hoạt động

```
User visits /kanban-demo
  │
  ├─> useWorkspace() hook
  │     ├─> Check auth (Supabase)
  │     ├─> Fetch workspace
  │     └─> Auto-create if not exists
  │
  ├─> workspaceId (UUID) → KanbanBoard
  │
  └─> useTasks(workspaceId)
        └─> Fetch tasks from Supabase ✅
```

## Files thay đổi

✅ `frontend/hooks/use-workspace.ts` - New hook  
✅ `frontend/app/kanban-demo/page.tsx` - Sử dụng useWorkspace  
✅ `frontend/app/(productivity)/projects/{[id]/board}/page.tsx` - Sử dụng useWorkspace  
✅ `docs/kanban-demo-data.sql` - Demo data script

## Testing

```bash
# 1. Start dev server
cd frontend && npm run dev

# 2. Visit demo page
open http://localhost:3000/kanban-demo

# 3. Check console
# Should see:
# ✅ User authenticated: <uuid>
# 📦 Found existing workspace: <uuid>
# OR
# 🔨 Creating new workspace for user: <uuid>
```

## Troubleshooting

### Vẫn báo lỗi UUID?

- Clear browser cache
- Check Supabase connection
- Verify RLS policies

### Workspace không tạo được?

- Check table `workspaces` exists
- Verify RLS policy allows INSERT
- Check user is authenticated

### Tasks không load?

- Run demo data SQL script
- Verify tasks table có RLS policy
- Check workspace_id match

---

**Status**: ✅ Fixed  
**Priority**: Critical (Blocker)  
**Time to fix**: ~10 minutes
