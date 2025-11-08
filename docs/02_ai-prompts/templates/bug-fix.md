# 🐛 Prompt Template: Bug Fix

> **Sử dụng khi:** Gặp bug cần AI giúp debug và fix

---

## 🎯 **TEMPLATE**

```
Fix bug in NEXUS Productivity OS.

### Bug Description:
[Mô tả ngắn gọn bug - VD: "Tasks disappear after marking complete"]

### Steps to Reproduce:
1. [Bước 1 - Cụ thể]
2. [Bước 2]
3. [Bước 3]
4. **Bug happens:** [Mô tả kết quả sai]

### Expected Behavior:
[Nên hoạt động như thế nào]

### Actual Behavior:
[Thực tế hoạt động ra sao - Sai ở đâu]

### Context:

**Tech Stack:**
- Next.js 16, React 19, TypeScript
- Supabase (PostgreSQL)
- Zustand + Immer (state management)

**File Affected:**
```

[Đường dẫn file - VD: frontend/components/tasks/task-list.tsx]

```

**Related Files:**
```

[List các file liên quan]

````

### Code Context:

**Current Code (Buggy):**
```tsx
// Paste code bị lỗi ở đây
// Highlight dòng bị suspect nếu biết

function TaskList() {
  useEffect(() => {
    fetchTasks()
  }, [fetchTasks]) // ← Bug likely here
}
````

**Error Message (if any):**

```
[Paste error message từ console/terminal]

Example:
Warning: Maximum update depth exceeded. This can happen when a component
calls setState inside useEffect, but useEffect either doesn't have a
dependency array, or one of the dependencies changes on every render.
```

**Console Logs (if relevant):**

```
[Paste console.log output nếu có]
```

### Hypothesis:

[Nếu có ý tưởng về root cause, viết ở đây. VD: "useEffect dependency array causing infinite loop"]

### What I've Tried:

- [ ] [Solution attempt 1] → Result: [Failed/Partial success]
- [ ] [Solution attempt 2] → Result: [Failed/Partial success]

### Expected Solution:

**Requirements:**

1. Fix the bug completely
2. Không breaking existing functionality
3. Add comments giải thích fix
4. Suggest tests to prevent regression

**Output Format:**

```tsx
// Fixed code with comments explaining the fix

function TaskList() {
  // FIX: Memoize fetchTasks to prevent dependency array changes
  const fetchTasks = useCallback(async () => {
    // ... implementation
  }, [workspace_id]); // Only re-create when workspace_id changes

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]); // Now stable, won't cause infinite loop
}
```

### Additional Context:

[Bất kỳ thông tin nào khác có thể giúp ích]

```

---

## 📋 **EXAMPLE 1 - Tasks Disappear Bug**

```

Fix bug in NEXUS Productivity OS.

### Bug Description:

Tasks disappear from UI immediately after marking them as complete.

### Steps to Reproduce:

1. Go to /today page
2. Click checkbox on any task to mark complete
3. Task disappears from list
4. **Bug happens:** Task is gone, cannot see completed tasks

### Expected Behavior:

Task should stay in list with strikethrough text and checked checkbox.

### Actual Behavior:

Task disappears immediately after clicking checkbox.

### Context:

**Tech Stack:**

- Next.js 16, React 19, TypeScript
- Supabase (PostgreSQL)
- Zustand + Immer (state management)

**File Affected:**

```
frontend/components/tasks/task-list.tsx
```

**Related Files:**

```
frontend/lib/stores/tasks.ts (toggleTask action)
frontend/lib/hooks/use-tasks.ts (fetchTasks hook)
```

### Code Context:

**Current Code (Buggy):**

```tsx
// task-list.tsx
export default function TaskList({ workspaceId, filter }: TaskListProps) {
  const { tasks, isLoading } = useTasks(workspaceId);

  // Filter tasks
  const filteredTasks = tasks.filter((task) => {
    if (filter.type === 'today') {
      return isToday(task.due_date) && !task.completed; // ← BUG HERE
    }
    return true;
  });

  return (
    <div>
      {filteredTasks.map((task) => (
        <TaskItem key={task.id} task={task} />
      ))}
    </div>
  );
}
```

**Error Message:**
No error in console, just tasks disappearing from UI.

### Hypothesis:

Filter `!task.completed` is hiding completed tasks immediately after toggle.

### What I've Tried:

- [x] Checked Supabase - Tasks are saved correctly (completed: true)
- [x] Checked Zustand store - State updates correctly
- [x] Issue is in the filter logic

### Expected Solution:

Remove `&& !task.completed` from filter, or add option to show/hide completed.

**Fixed Code:**

```tsx
const filteredTasks = tasks.filter((task) => {
  if (filter.type === 'today') {
    return isToday(task.due_date); // Show all tasks (both completed and incomplete)
  }
  return true;
});
```

Or better: Add filter toggle:

```tsx
const [showCompleted, setShowCompleted] = useState(true);

const filteredTasks = tasks.filter((task) => {
  if (filter.type === 'today') {
    const matchesDate = isToday(task.due_date);
    const matchesCompletedFilter = showCompleted || !task.completed;
    return matchesDate && matchesCompletedFilter;
  }
  return true;
});
```

```

---

## 📋 **EXAMPLE 2 - TypeScript Error**

```

Fix TypeScript error in NEXUS Productivity OS.

### Bug Description:

TypeScript error: Property 'workspace_id' does not exist on type 'User'

### Steps to Reproduce:

1. Open `frontend/lib/hooks/use-tasks.ts`
2. TypeScript shows error on line 23
3. Build fails with this error

### Error Message:

```
Property 'workspace_id' does not exist on type 'User'.ts(2339)

File: frontend/lib/hooks/use-tasks.ts
Line 23: const workspaceId = user.workspace_id
```

### Context:

**File Affected:**

```
frontend/lib/hooks/use-tasks.ts
```

**Related Files:**

```
frontend/types/database.types.ts (User type definition)
```

### Code Context:

**Current Code (Buggy):**

```tsx
// use-tasks.ts
export function useTasks(workspaceId?: string) {
  const user = useUser(); // Returns User type from database.types.ts

  // ERROR HERE: user.workspace_id doesn't exist
  const id = workspaceId || user.workspace_id;

  // ... rest of code
}
```

**Type Definition:**

```tsx
// database.types.ts
export interface User {
  id: string;
  email: string;
  created_at: string;
  // workspace_id is NOT here!
}
```

### Hypothesis:

User table không có workspace_id field. Cần get từ workspace_members table.

### Expected Solution:

Option 1: Get workspace_id from workspace_members table
Option 2: Add workspace_id to User type (if schema changed)

**Fixed Code:**

```tsx
// Solution: Fetch from workspace_members
export function useTasks(workspaceId?: string) {
  const user = useUser();
  const { data: member } = useQuery({
    queryKey: ['workspace-member', user?.id],
    queryFn: async () => {
      const { data } = await supabase
        .from('workspace_members')
        .select('workspace_id')
        .eq('user_id', user?.id)
        .single();
      return data;
    },
    enabled: !!user && !workspaceId,
  });

  const id = workspaceId || member?.workspace_id;

  // ... rest of code
}
```

```

---

## 🎯 **DEBUGGING CHECKLIST**

Before asking AI for help, check:

- [ ] Browser console errors?
- [ ] Network tab (failed requests)?
- [ ] React DevTools (state correct)?
- [ ] Supabase logs (database errors)?
- [ ] TypeScript errors (red squiggles)?
- [ ] Recent changes (git diff)?

---

**Last Updated:** November 8, 2025
**Usage:** Copy template, fill in details, paste to AI
```
