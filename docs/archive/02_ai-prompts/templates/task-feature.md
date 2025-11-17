# 📝 Prompt Template: Task Feature

> **Sử dụng khi:** Thêm tính năng mới cho Task Management

---

## 🎯 **TEMPLATE**

````
Create [Feature Name] for NEXUS Productivity OS.

### Context:
- Project: Task management system built with Next.js 16, React 19, TypeScript
- Current Status: [Mô tả hiện trạng - task CRUD đã có gì]
- Location: frontend/components/tasks/[tên-file].tsx
- Database: Supabase PostgreSQL with RLS
- State: Zustand + Immer for optimistic updates

### Requirements:
1. [Requirement 1 - Chi tiết cụ thể]
2. [Requirement 2]
3. [Requirement 3]
...

### User Flow:
1. User [action 1]
2. UI [reaction 1]
3. System [backend update]
4. UI [final state]

### Technical Details:

**Component Structure:**
```tsx
// Props interface
interface [ComponentName]Props {
  taskId: string
  workspaceId: string
  // ... other props
}

// Component
export default function [ComponentName]({ ... }: [ComponentName]Props) {
  // Implementation here
}
````

**State Management (Zustand):**

```typescript
// Use existing task store: frontend/lib/stores/tasks.ts
// Add action: [actionName]

interface TaskStore {
  // ... existing state
  [actionName]: (taskId: string, data: any) => void;
}
```

**Database Update (Supabase):**

```typescript
// Update task in database
const { error } = await supabase
  .from('tasks')
  .update({ [field]: [value] })
  .eq('id', taskId);

// Handle error
if (error) {
  // Revert optimistic update
  // Show error toast
}
```

**Optimistic Update Flow:**

1. Update UI immediately (Zustand set)
2. Call Supabase update
3. If error → Revert UI + Show toast
4. If success → Keep UI as is

### Edge Cases to Handle:

- [ ] Loading state (show skeleton or spinner)
- [ ] Error state (revert + toast notification)
- [ ] Empty state (no tasks)
- [ ] Validation (required fields, max length, etc.)
- [ ] Keyboard shortcuts (if applicable)
- [ ] Mobile responsive (touch-friendly)

### Accessibility:

- [ ] ARIA labels for screen readers
- [ ] Keyboard navigation (Tab, Enter, Esc)
- [ ] Focus management
- [ ] Color contrast (WCAG AA)

### Testing Checklist:

- [ ] Happy path: [Scenario]
- [ ] Error case: Network failure
- [ ] Error case: Validation failure
- [ ] Edge case: Empty data
- [ ] Edge case: Very long input
- [ ] Mobile: Touch interactions
- [ ] Keyboard: All shortcuts work

### Files to Create/Modify:

```
frontend/components/tasks/[component-name].tsx       (NEW)
frontend/lib/stores/tasks.ts                         (UPDATE - add action)
frontend/types/task.types.ts                         (UPDATE if needed)
```

### Expected Output:

- TypeScript component code (full implementation)
- Zustand store action
- Type definitions (if new types needed)
- Usage example

### Style Guide:

- Use Tailwind CSS classes
- Follow shadcn/ui patterns
- Use existing colors from design system
- Font: Inter, text-sm for body
- Spacing: p-4, gap-2 standard

### Example Usage:

```tsx
import { TaskFeatureName } from '@/components/tasks/task-feature-name';

<TaskFeatureName taskId={task.id} workspaceId={workspaceId} onUpdate={handleUpdate} />;
```

```

---

## 📋 **EXAMPLE - Edit Task Inline**

```

Create **Edit Task Inline** feature for NEXUS Productivity OS.

### Context:

- Project: Task management system built with Next.js 16, React 19, TypeScript
- Current Status: TaskItem displays title (read-only), need to add inline editing
- Location: frontend/components/tasks/task-item.tsx
- Database: Supabase PostgreSQL with RLS
- State: Zustand + Immer for optimistic updates

### Requirements:

1. Double-click task title → Convert to input field
2. Press Enter or blur → Save changes
3. Press ESC → Cancel editing (revert to original)
4. Optimistic update (UI updates immediately)
5. Show loading spinner while saving
6. Error handling với toast notification

### User Flow:

1. User double-clicks task title
2. UI shows input field với current title selected
3. User types new title
4. User presses Enter (or clicks outside)
5. UI updates immediately với new title
6. System saves to Supabase in background
7. If error → Revert UI + Show error toast

### Technical Details:

**Component Structure:**

```tsx
interface TaskItemProps {
  task: Task;
  workspaceId: string;
}

export default function TaskItem({ task, workspaceId }: TaskItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(task.title);

  // ... implementation
}
```

**State Management (Zustand):**

```typescript
// In frontend/lib/stores/tasks.ts
updateTask: (taskId: string, updates: Partial<Task>) => void
```

**Database Update (Supabase):**

```typescript
const { error } = await supabase.from('tasks').update({ title: newTitle }).eq('id', taskId);
```

### Edge Cases to Handle:

- [x] Empty title (validation)
- [x] Title too long (max 200 chars)
- [x] Network error during save
- [x] Esc key cancels edit
- [x] Click outside cancels edit

### Testing Checklist:

- [x] Double-click → Input appears
- [x] Enter → Saves and exits edit mode
- [x] ESC → Cancels and reverts
- [x] Empty title → Show validation error
- [x] Network error → Revert + Toast

### Files to Modify:

```
frontend/components/tasks/task-item.tsx              (UPDATE)
frontend/lib/stores/tasks.ts                         (UPDATE - add updateTask)
```

```

---

**Last Updated:** November 8, 2025
**Usage:** Copy template, fill in details, paste to AI
```
