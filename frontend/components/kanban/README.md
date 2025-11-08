# 🎯 Kanban Board Component - NEXUS Productivity OS

## Tổng quan

Kanban board với drag-drop để quản lý tasks, hỗ trợ 3 trạng thái: TODO, IN_PROGRESS, DONE.

## Cấu trúc Components

```
frontend/components/kanban/
├── KanbanBoard.tsx      # Main component với DnD context
├── KanbanColumn.tsx     # Column component (droppable zone)
├── KanbanCard.tsx       # Task card (draggable item)
└── index.ts             # Exports
```

## Công nghệ

- **@dnd-kit/core**: Drag and drop core
- **@dnd-kit/sortable**: Sortable lists
- **Zustand**: State management (lib/stores/tasks.ts)
- **Supabase**: Database persistence
- **date-fns**: Date formatting

## Cài đặt

```bash
npm install @dnd-kit/core @dnd-kit/sortable @dnd-kit/utilities
```

## Sử dụng

### 1. Cơ bản (All tasks)

```tsx
import { KanbanBoard } from '@/components/kanban';

export default function Page() {
  return <KanbanBoard workspaceId="workspace-uuid" onTaskClick={(task) => console.log(task)} />;
}
```

### 2. Lọc theo Project

```tsx
<KanbanBoard projectId="project-uuid" workspaceId="workspace-uuid" />
```

### 3. Custom task click handler

```tsx
<KanbanBoard
  workspaceId="workspace-uuid"
  onTaskClick={(task) => {
    // Open task detail modal
    openTaskModal(task.id);
  }}
/>
```

## Props

### KanbanBoard

| Prop          | Type                   | Required | Description                  |
| ------------- | ---------------------- | -------- | ---------------------------- |
| `workspaceId` | `string`               | ✅       | UUID của workspace           |
| `projectId`   | `string`               | ❌       | UUID của project (để filter) |
| `onTaskClick` | `(task: Task) => void` | ❌       | Callback khi click vào task  |

### KanbanColumn

| Prop          | Type                   | Required | Description                   |
| ------------- | ---------------------- | -------- | ----------------------------- |
| `status`      | `TaskStatus`           | ✅       | 'todo', 'in_progress', 'done' |
| `title`       | `string`               | ✅       | Tiêu đề cột                   |
| `tasks`       | `Task[]`               | ✅       | Danh sách tasks               |
| `onTaskClick` | `(task: Task) => void` | ❌       | Callback khi click            |

### KanbanCard

| Prop          | Type                   | Required | Description        |
| ------------- | ---------------------- | -------- | ------------------ |
| `task`        | `Task`                 | ✅       | Task object        |
| `onTaskClick` | `(task: Task) => void` | ❌       | Callback khi click |

## State Management

### Zustand Store (lib/stores/tasks.ts)

```typescript
const { tasks, updateTask } = useTaskStore();

// Update task status (optimistic)
updateTask(taskId, {
  status: 'in_progress',
  position: 0,
});
```

### useTasks Hook (lib/hooks/use-tasks.ts)

```typescript
const { tasks, loading, updateTask } = useTasks(workspaceId);

// Update task in Supabase
await updateTask(taskId, {
  status: 'done',
  completed_at: new Date().toISOString(),
});
```

## Drag and Drop Flow

```
1. User drags task
   └─> handleDragStart() → Set activeTask

2. User drops on column
   └─> handleDragOver() → Optimistic update (Zustand)
   └─> handleDragEnd() → Persist to Supabase

3. User drops on task (reorder)
   └─> handleDragEnd() → Calculate new positions
   └─> Update positions in Supabase
```

## Styling

### Column Colors

```typescript
const statusColors = {
  todo: 'bg-gray-100 border-gray-300',
  in_progress: 'bg-blue-50 border-blue-300',
  done: 'bg-green-50 border-green-300',
};
```

### Priority Badges

```typescript
const priorityColors = {
  none: 'bg-gray-100 text-gray-600',
  low: 'bg-blue-100 text-blue-600',
  medium: 'bg-yellow-100 text-yellow-600',
  high: 'bg-orange-100 text-orange-600',
  urgent: 'bg-red-100 text-red-600',
};
```

## Demo Pages

### 1. Kanban Demo (All tasks)

```
URL: http://localhost:3000/kanban-demo
File: app/kanban-demo/page.tsx
```

### 2. Project Board (Filtered)

```
URL: http://localhost:3000/projects/[id]/board
File: app/(productivity)/projects/{[id]/board}/page.tsx
```

## Tính năng

✅ **Drag & Drop**

- Kéo task giữa các cột (thay đổi status)
- Kéo task trong cùng cột (thay đổi position)
- Drag overlay animation

✅ **Optimistic Updates**

- UI cập nhật ngay lập tức
- Sync với Supabase ở background

✅ **Responsive Design**

- 3 cột cố định width (min-w-80)
- Scroll ngang khi cần
- Hover effects

✅ **Metadata Display**

- Priority badge (màu sắc theo mức độ)
- Due date (format "d MMM" tiếng Việt)
- Tags count

## Keyboard & Accessibility

- **Drag Handle**: Visible on hover (GripVertical icon)
- **Activation Distance**: 8px (tránh conflict với click)
- **Focus States**: Ring colors khi drag

## Database Schema

```sql
-- Task table (simplified)
CREATE TABLE tasks (
  id UUID PRIMARY KEY,
  workspace_id UUID NOT NULL,
  project_id UUID,
  title TEXT NOT NULL,
  status TEXT CHECK (status IN ('todo', 'in_progress', 'done', 'cancelled')),
  priority TEXT CHECK (priority IN ('none', 'low', 'medium', 'high', 'urgent')),
  position INTEGER DEFAULT 0,
  due_date TIMESTAMPTZ,
  tags TEXT[] DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_tasks_workspace_project ON tasks(workspace_id, project_id);
CREATE INDEX idx_tasks_status ON tasks(status);
CREATE INDEX idx_tasks_position ON tasks(position);
```

## Roadmap

### ✅ Phase 1 (Completed)

- [x] Basic drag & drop
- [x] 3 columns (TODO, IN_PROGRESS, DONE)
- [x] Optimistic updates
- [x] Priority & due date display

### 🚧 Phase 2 (TODO)

- [ ] Add "Cancelled" column (optional)
- [ ] Subtasks display
- [ ] Task quick edit (inline)
- [ ] Assignee avatars

### 🔮 Phase 3 (Future)

- [ ] Custom columns
- [ ] Swimlanes (by assignee/priority)
- [ ] Real-time collaboration
- [ ] Keyboard shortcuts

## Troubleshooting

### Lỗi: "Cannot read property 'id' of undefined"

**Nguyên nhân**: `workspaceId` không được truyền vào  
**Giải pháp**: Đảm bảo prop `workspaceId` có giá trị

### Tasks không load

**Nguyên nhân**: User chưa authenticated  
**Giải pháp**: Check `useAuth()` context

### Drag không hoạt động

**Nguyên nhân**: Conflict với click event  
**Giải pháp**: Tăng `activationConstraint.distance`

## Performance

- **Virtualization**: Không cần (giới hạn ~100 tasks/column)
- **Memoization**: `useMemo` cho `tasksByStatus`
- **Debounce**: Không cần (optimistic updates)

## Testing

```bash
# Type check
npm run type-check

# Run dev server
npm run dev

# Visit demo
open http://localhost:3000/kanban-demo
```

## License

MIT - NEXUS Productivity OS

---

**Last Updated**: 2025-11-07  
**Priority**: 70% - Core Productivity Feature  
**Status**: ✅ Ready for Production
