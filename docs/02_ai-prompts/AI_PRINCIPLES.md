# Nguyên tắc Vàng và Quy ước Phát triển

> **Mục đích:** Lưu trữ các nguyên tắc, quy ước, và best practices cho dự án NEXUS. File này là kim chỉ nam cho tất cả quyết định phát triển, coding conventions, và quy trình làm việc.

**Nguồn:** Tổng hợp từ quá trình phát triển dự án NEXUS (tháng 10-11/2025)
**Tạo:** 13 tháng 11, 2025
**Cập nhật lần cuối:** 13 tháng 11, 2025

---

## 📑 Mục lục

### **I. Development Principles (Nguyên tắc Phát triển)**
- [Nguyên tắc #1: AI-Driven Development Workflow](#nguyên-tắc-1-ai-driven-development-workflow)
- [Nguyên tắc #2: Optimistic UI Updates](#nguyên-tắc-2-optimistic-ui-updates)
- [Nguyên tắc #3: TypeScript Strict Mode](#nguyên-tắc-3-typescript-strict-mode)
- [Nguyên tắc #4: Mobile-First Design](#nguyên-tắc-4-mobile-first-design)
- [Nguyên tắc #5: Performance First](#nguyên-tắc-5-performance-first)

### **II. Code Conventions (Quy ước Code)**
- [Nguyên tắc #6: File Naming](#nguyên-tắc-6-file-naming)
- [Nguyên tắc #7: Component Structure](#nguyên-tắc-7-component-structure)
- [Nguyên tắc #8: Import Order](#nguyên-tắc-8-import-order)
- [Nguyên tắc #9: Comments Convention](#nguyên-tắc-9-comments-convention)
- [Nguyên tắc #10: Error Handling](#nguyên-tắc-10-error-handling)

### **III. Documentation Conventions (Quy ước Tài liệu)**
- [Nguyên tắc #11: Documentation Language](#nguyên-tắc-11-documentation-language)
- [Nguyên tắc #12: Documentation Structure](#nguyên-tắc-12-documentation-structure)
- [Nguyên tắc #13: Daily Workflow](#nguyên-tắc-13-daily-workflow)
- [Nguyên tắc #14: File Naming (Docs)](#nguyên-tắc-14-file-naming-docs)

### **IV. Deployment & Testing (Triển khai & Testing)**
- [Nguyên tắc #15: Git Workflow](#nguyên-tắc-15-git-workflow)
- [Nguyên tắc #16: Testing Strategy](#nguyên-tắc-16-testing-strategy)
- [Nguyên tắc #17: Database Migrations](#nguyên-tắc-17-database-migrations)
- [Nguyên tắc #18: Environment Variables](#nguyên-tắc-18-environment-variables)

### **V. AI Prompting Best Practices (Thực hành tốt nhất với AI)**
- [Nguyên tắc #19: Good Prompt Structure](#nguyên-tắc-19-good-prompt-structure)
- [Nguyên tắc #20: When AI Makes Mistakes](#nguyên-tắc-20-when-ai-makes-mistakes)
- [Nguyên tắc #21: Prompt Reusability](#nguyên-tắc-21-prompt-reusability)

### **VI. UI/UX Principles (Nguyên tắc UI/UX)**
- [Nguyên tắc #22: Design System](#nguyên-tắc-22-design-system)
- [Nguyên tắc #23: Keyboard Shortcuts](#nguyên-tắc-23-keyboard-shortcuts)
- [Nguyên tắc #24: Loading States](#nguyên-tắc-24-loading-states)
- [Nguyên tắc #25: Empty States](#nguyên-tắc-25-empty-states)

### **VII. Project Management (Quản lý Dự án)**
- [Nguyên tắc #26: Feature Prioritization](#nguyên-tắc-26-feature-prioritization)
- [Nguyên tắc #27: Weekly Rhythm](#nguyên-tắc-27-weekly-rhythm)
- [Nguyên tắc #28: Decision Making](#nguyên-tắc-28-decision-making)

### **VIII. Security & Privacy (Bảo mật & Riêng tư)**
- [Nguyên tắc #29: Row Level Security (RLS)](#nguyên-tắc-29-row-level-security-rls)
- [Nguyên tắc #30: Authentication](#nguyên-tắc-30-authentication)

### **IX. Learning & Growth (Học tập & Phát triển)**
- [Nguyên tắc #31: Continuous Learning](#nguyên-tắc-31-continuous-learning)
- [Nguyên tắc #32: Feedback Loop](#nguyên-tắc-32-feedback-loop)

---

## I. Development Principles (Nguyên tắc Phát triển)

### Nguyên tắc #1: AI-Driven Development Workflow

**Mô tả:**
Sử dụng AI (ChatGPT, Claude, Copilot) để generate phần lớn code, tăng tốc độ phát triển 6-8 lần.

**Quy tắc chi tiết:**
- ✅ **Luôn viết prompt chi tiết trước khi code**
  - Bao gồm: Context (project name, stack, file path)
  - Requirements: Numbered list, specific và clear
  - Constraints: Free tier, mobile-first, performance
  - Expected Output: Component files, types, usage examples
- ✅ **Document prompts trong `AI_PROMPTS.md`**
  - Lưu lại các prompts hiệu quả
  - Reuse cho các features tương tự
  - Share với team members (nếu có)
- ✅ **Update `COMPLETED.md` sau khi xong feature**
  - Record kết quả của AI-generated code
  - Document challenges và solutions
  - Track tổng thời gian saved
- ✅ **Test code AI generate trước khi commit**
  - Manual testing cho UI components
  - Unit tests cho hooks và utilities
  - Integration tests cho Supabase queries

**Ví dụ:**
```markdown
# Good Prompt Structure
Create TaskItem component for NEXUS Productivity OS.

Context:
- Project: Task Management App with Kanban boards
- Stack: Next.js 16, React 19, TypeScript, Zustand, Supabase
- Location: frontend/components/tasks/task-item.tsx

Requirements:
1. Display task title, checkbox, due date, priority badge
2. Optimistic UI update on checkbox toggle
3. Double-click to edit inline (auto-save after 500ms debounce)
4. Keyboard shortcuts: x (toggle), d (delete), e (edit)

State Management:
- Use Zustand store: useTaskStore
- Optimistic update pattern (update UI → sync Supabase → revert if error)

Styling:
- TailwindCSS classes
- Hover effect: bg-gray-50
- Completed task: line-through + text-gray-500

Expected Output:
- TaskItem.tsx component
- Props interface
- Usage example in TaskList
```

**Kết quả đã đạt được:**
- Kanban board done trong 2 giờ (thay vì 1-2 ngày)
- Code quality cao, consistent patterns
- 12 tuần roadmap → 2 tuần POC

**Tài liệu liên quan:**
- [AI_PROMPTS.md](AI_PROMPTS.md) - Collection of effective prompts
- [ADR-003](../04_technical/architecture/decisions.md#adr-003-chọn-ai-driven-development-workflow) - Decision to adopt AI-driven workflow

---

### Nguyên tắc #2: Optimistic UI Updates

**Mô tả:**
Update UI ngay lập tức khi user thực hiện action, sau đó mới sync với database. Nếu database update fails, revert UI về trạng thái cũ.

**Quy tắc chi tiết:**
- ✅ **Update UI immediately** (Zustand với Immer middleware)
  - User click checkbox → UI update ngay
  - Không đợi Supabase response
- ✅ **Sync với database sau**
  - Fire-and-forget Supabase mutation
  - Handle error nếu mutation fails
- ✅ **Revert nếu database update fails**
  - Restore previous state
  - Show toast notification: "Failed to update task"
- ✅ **Show toast notification khi error**
  - User-friendly message
  - Option to retry

**Ví dụ code:**
```typescript
// lib/stores/tasks.ts
import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'
import { supabase } from '@/lib/supabase/client'
import { toast } from 'sonner'

interface TaskStore {
  tasks: Task[]
  toggleTask: (taskId: string) => void
}

export const useTaskStore = create<TaskStore>()(
  immer((set, get) => ({
    tasks: [],

    toggleTask: async (taskId: string) => {
      // 1. Optimistic update (UI updates immediately)
      set((state) => {
        const task = state.tasks.find(t => t.id === taskId)
        if (task) {
          task.completed = !task.completed
        }
      })

      // 2. Sync with Supabase
      const task = get().tasks.find(t => t.id === taskId)
      const { error } = await supabase
        .from('tasks')
        .update({ completed: task?.completed })
        .eq('id', taskId)

      // 3. Revert if error
      if (error) {
        set((state) => {
          const task = state.tasks.find(t => t.id === taskId)
          if (task) {
            task.completed = !task.completed // Revert
          }
        })
        toast.error('Failed to update task')
      }
    }
  }))
)
```

**Lợi ích:**
- UX cực nhanh (instant feedback)
- App feels snappy, không có lag
- User không phải đợi database response

**Trade-offs:**
- Phải handle revert logic
- Có thể gây confusion nếu nhiều errors

**Tài liệu liên quan:**
- [ADR-002](../04_technical/architecture/decisions.md#adr-002-chọn-zustand--immer-thay-vì-redux) - Zustand decision
- [Pattern #1](../archive/conversations/BRAIN_DUMP_from_initial_chat.md#pattern-1-zustand-store-với-optimistic-updates) - Zustand optimistic update pattern

---

### Nguyên tắc #3: TypeScript Strict Mode

**Mô tả:**
Luôn sử dụng TypeScript strict mode để catch bugs sớm, improve code quality, và có better IntelliSense.

**Quy tắc chi tiết:**
- ✅ **Luôn dùng TypeScript strict**
  - Enable trong `tsconfig.json`: `"strict": true`
  - Không disable strict checks
- ✅ **Không dùng `any`** (dùng `unknown` nếu cần)
  - `any` bypasses type checking → defeats purpose of TypeScript
  - `unknown` forces type checking before use
- ✅ **Define interfaces rõ ràng**
  - Props interfaces cho components
  - Return types cho functions
  - State types cho Zustand stores
- ✅ **Generate types từ Supabase:** `npm run db:types`
  - Sync types với database schema
  - Import types: `import type { Database } from '@/types/database.types'`
  - Type alias: `export type Task = Database['public']['Tables']['tasks']['Row']`

**Ví dụ:**
```typescript
// ❌ BAD: Using any
function fetchTasks(workspaceId: any): any {
  return supabase.from('tasks').select('*').eq('workspace_id', workspaceId)
}

// ✅ GOOD: Proper types
import type { Task } from '@/types'

interface FetchTasksResult {
  data: Task[] | null
  error: Error | null
}

async function fetchTasks(workspaceId: string): Promise<FetchTasksResult> {
  const { data, error } = await supabase
    .from('tasks')
    .select('*')
    .eq('workspace_id', workspaceId)

  return { data, error }
}
```

**Lợi ích:**
- Catch bugs at compile time, không phải runtime
- Better IntelliSense và autocomplete
- Self-documenting code (types là documentation)
- Easier refactoring (TypeScript catches breaking changes)

**Tài liệu liên quan:**
- [TypeScript Documentation](https://www.typescriptlang.org/docs/handbook/tsconfig-json.html#strict)
- [Supabase Type Generation](https://supabase.com/docs/guides/api/rest/generating-types)

---

### Nguyên tắc #4: Mobile-First Design

**Mô tả:**
Design và develop cho mobile devices trước, sau đó progressive enhancement cho desktop. Phần lớn users sẽ dùng mobile.

**Quy tắc chi tiết:**
- ✅ **Design cho mobile trước**
  - Base styles: Mobile layout (1 column)
  - Breakpoints: `sm:`, `md:`, `lg:`, `xl:` cho larger screens
- ✅ **Progressive enhancement cho desktop**
  - Add multi-column layouts với Tailwind breakpoints
  - Add hover effects chỉ cho desktop
- ✅ **Touch-friendly buttons** (min 44x44px)
  - Apple's Human Interface Guidelines: 44x44pt minimum
  - Android's Material Design: 48x48dp minimum
  - Use Tailwind: `h-10 w-10` (40px) hoặc `h-11 w-11` (44px)
- ✅ **Test trên Chrome DevTools mobile view**
  - Toggle device toolbar (Cmd+Shift+M)
  - Test responsive layouts
  - Test touch interactions

**Ví dụ:**
```tsx
// ❌ BAD: Desktop-first
<div className="grid grid-cols-3 gap-4">
  <div className="md:col-span-1">Sidebar</div>
  <div className="md:col-span-2">Content</div>
</div>

// ✅ GOOD: Mobile-first
<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
  <div className="md:col-span-1">Sidebar</div>
  <div className="md:col-span-2">Content</div>
</div>

// ❌ BAD: Small buttons
<button className="h-6 w-6">×</button>

// ✅ GOOD: Touch-friendly
<button className="h-10 w-10 flex items-center justify-center">×</button>
```

**Breakpoints:**
- `sm:` - 640px (tablet portrait)
- `md:` - 768px (tablet landscape)
- `lg:` - 1024px (laptop)
- `xl:` - 1280px (desktop)

**Tài liệu liên quan:**
- [Tailwind CSS Responsive Design](https://tailwindcss.com/docs/responsive-design)
- [Apple Human Interface Guidelines](https://developer.apple.com/design/human-interface-guidelines/)

---

### Nguyên tắc #5: Performance First

**Mô tả:**
Optimize performance từ đầu, không phải khi app đã slow. Performance là feature.

**Quy tắc chi tiết:**
- ✅ **Lazy load components không cần thiết** (`React.lazy()`)
  - Rich text editor (Tiptap) - heavy bundle
  - Kanban board - không cần trên Today page
  - Calendar view - load only khi user navigate
- ✅ **Debounce expensive operations**
  - Search: 300ms debounce
  - Autosave: 500ms debounce
  - API calls: 500ms debounce
- ✅ **Optimize images**
  - Use WebP format
  - Lazy loading: `loading="lazy"`
  - Next.js Image component: `<Image />` với sizes prop
- ✅ **Code splitting cho routes**
  - Next.js automatic code splitting
  - Dynamic imports cho heavy components

**Ví dụ:**
```typescript
// ❌ BAD: Import editor ở mọi page
import { TiptapEditor } from '@/components/editor/TiptapEditor'

// ✅ GOOD: Lazy load editor
import { lazy, Suspense } from 'react'

const TiptapEditor = lazy(() => import('@/components/editor/TiptapEditor'))

function PageEditor() {
  return (
    <Suspense fallback={<EditorSkeleton />}>
      <TiptapEditor />
    </Suspense>
  )
}
```

```typescript
// ❌ BAD: No debounce
<input onChange={(e) => searchTasks(e.target.value)} />

// ✅ GOOD: Debounced search
import { useDebouncedCallback } from 'use-debounce'

const debouncedSearch = useDebouncedCallback(
  (value: string) => searchTasks(value),
  300 // 300ms delay
)

<input onChange={(e) => debouncedSearch(e.target.value)} />
```

**Performance Budget:**
- First Contentful Paint (FCP): < 1.5s
- Largest Contentful Paint (LCP): < 2.5s
- Cumulative Layout Shift (CLS): < 0.1
- First Input Delay (FID): < 100ms

**Tài liệu liên quan:**
- [Next.js Performance](https://nextjs.org/docs/app/building-your-application/optimizing)
- [Web Vitals](https://web.dev/articles/vitals)

---

## II. Code Conventions (Quy ước Code)

### Nguyên tắc #6: File Naming

**Mô tả:**
Consistent file naming conventions giúp dễ navigate codebase và AI có thể generate code đúng structure.

**Quy tắc chi tiết:**
- ✅ **Components:** `PascalCase.tsx`
  - Examples: `TaskItem.tsx`, `ProjectCard.tsx`, `KanbanBoard.tsx`
  - Component name phải match file name: `TaskItem.tsx` exports `function TaskItem()`
- ✅ **Hooks:** `use-kebab-case.ts`
  - Examples: `use-tasks.ts`, `use-workspace.ts`, `use-debounced-callback.ts`
  - Always start với `use-` prefix
- ✅ **Utils:** `kebab-case.ts`
  - Examples: `date-utils.ts`, `string-utils.ts`, `cn.ts`
  - Helper functions, không phải hooks hoặc components
- ✅ **Types:** `PascalCase.types.ts`
  - Examples: `Task.types.ts`, `Project.types.ts`, `Database.types.ts`
  - Nếu types nhiều, tách ra file riêng
  - Nếu types ít (< 3), có thể define trong component file

**Cấu trúc folders:**
```
frontend/
├── components/
│   ├── tasks/
│   │   ├── TaskItem.tsx          # Component
│   │   ├── TaskList.tsx          # Component
│   │   └── TaskQuickAdd.tsx      # Component
│   └── ui/                        # shadcn/ui primitives
│       ├── Button.tsx
│       └── Input.tsx
├── lib/
│   ├── hooks/
│   │   ├── use-tasks.ts          # Hook
│   │   └── use-workspace.ts      # Hook
│   ├── stores/
│   │   └── tasks.ts              # Zustand store (không dùng `use-` prefix)
│   └── utils/
│       ├── date-utils.ts         # Utility functions
│       └── cn.ts                 # Utility function
└── types/
    ├── index.ts                   # Re-export all types
    ├── Database.types.ts          # Supabase generated types
    └── Editor.types.ts            # Tiptap types
```

**Tài liệu liên quan:**
- [Next.js Project Structure](https://nextjs.org/docs/app/getting-started/project-structure)

---

### Nguyên tắc #7: Component Structure

**Mô tả:**
Consistent component structure giúp AI generate code đúng format và dễ maintain.

**Quy tắc chi tiết:**
- ✅ **Props interface luôn ở đầu file**
  - Define interface trước component
  - Name: `{ComponentName}Props`
- ✅ **Export default function** (không export const)
  - Dùng `export default function TaskItem()`
  - Không dùng `export const TaskItem = () => {}`
- ✅ **Client components:** `'use client'` ở dòng đầu
  - Nếu component dùng hooks (useState, useEffect, etc.)
  - Nếu component dùng browser APIs (window, document, etc.)
- ✅ **Server components:** Không cần directive
  - Default trong Next.js App Router
  - Không dùng hooks, browser APIs

**Template:**
```tsx
// components/tasks/TaskItem.tsx
'use client'

import { useState } from 'react'
import { useTaskStore } from '@/lib/stores/tasks'
import type { Task } from '@/types'

// 1. Props interface
interface TaskItemProps {
  task: Task
  workspaceId: string
}

// 2. Component
export default function TaskItem({ task, workspaceId }: TaskItemProps) {
  const toggleTask = useTaskStore(state => state.toggleTask)
  const [isEditing, setIsEditing] = useState(false)

  return (
    <div className="flex items-center gap-2 p-2 hover:bg-gray-50 rounded-lg">
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => toggleTask(task.id)}
        className="h-4 w-4"
      />

      {isEditing ? (
        <input
          type="text"
          defaultValue={task.title}
          onBlur={() => setIsEditing(false)}
          className="flex-1"
        />
      ) : (
        <span
          onDoubleClick={() => setIsEditing(true)}
          className={task.completed ? 'line-through text-gray-500' : ''}
        >
          {task.title}
        </span>
      )}
    </div>
  )
}
```

**Tài liệu liên quan:**
- [React Server Components](https://nextjs.org/docs/app/building-your-application/rendering/server-components)
- [Client Components](https://nextjs.org/docs/app/building-your-application/rendering/client-components)

---

### Nguyên tắc #8: Import Order

**Mô tả:**
Consistent import order giúp code dễ đọc và AI có thể generate đúng format.

**Quy tắc chi tiết:**
- ✅ **4-tier import structure:**
  1. React imports
  2. Third-party imports (libraries)
  3. Internal imports (project files với `@/` alias)
  4. Relative imports (local files với `./` hoặc `../`)
- ✅ **Separate types imports**
  - Dùng `import type` cho TypeScript types
  - Group types với code imports nếu cùng module

**Template:**
```tsx
// 1. React imports
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

// 2. Third-party imports
import { create } from 'zustand'
import { toast } from 'sonner'

// 3. Internal imports
import { supabase } from '@/lib/supabase/client'
import { useTaskStore } from '@/lib/stores/tasks'
import type { Task } from '@/types'

// 4. Relative imports
import { TaskItem } from './TaskItem'
import { TaskSkeleton } from './TaskSkeleton'
```

**Auto-formatting:**
- Use ESLint plugin: `eslint-plugin-import`
- Sort imports on save (VS Code setting)

**Tài liệu liên quan:**
- [ESLint Plugin Import](https://github.com/import-js/eslint-plugin-import)

---

### Nguyên tắc #9: Comments Convention

**Mô tả:**
Strategic comments giúp hiểu code nhanh hơn, đặc biệt cho AI-generated code.

**Quy tắc chi tiết:**
- ✅ **Complex logic:** Comment bằng tiếng Việt
  - Giải thích "why", không phải "what"
  - Example: `// Debounce 500ms để tránh spam Supabase với mỗi keystroke`
- ✅ **Public APIs:** Comment bằng tiếng Anh (JSDoc)
  - Functions được export và dùng ở nhiều nơi
  - JSDoc cho IntelliSense
- ✅ **TODO comments:** `// TODO: [Mô tả cần làm]`
  - Mark features chưa implement
  - Include context và priority
- ✅ **FIXME comments:** `// FIXME: [Mô tả bug]`
  - Mark known bugs cần fix
  - Link to issue tracker nếu có

**Ví dụ:**
```typescript
/**
 * Fetch all tasks for a workspace with filters
 * @param workspaceId - Workspace UUID
 * @param filters - Optional filters (due_date, project_id, etc.)
 * @returns Array of tasks
 */
export async function fetchTasks(
  workspaceId: string,
  filters?: TaskFilters
): Promise<Task[]> {
  // Supabase query với RLS - chỉ fetch tasks user có quyền xem
  const { data, error } = await supabase
    .from('tasks')
    .select('*')
    .eq('workspace_id', workspaceId)

  // TODO: Add filters support (due_date, project_id, priority)
  // FIXME: Không handle pagination - limit mặc định 1000 rows

  if (error) throw error
  return data || []
}
```

**Tránh over-commenting:**
```typescript
// ❌ BAD: Obvious comment
// Set isLoading to true
setIsLoading(true)

// ✅ GOOD: No comment needed (self-explanatory)
setIsLoading(true)
```

---

### Nguyên tắc #10: Error Handling

**Mô tả:**
Proper error handling đảm bảo app không crash và user biết chuyện gì đang xảy ra.

**Quy tắc chi tiết:**
- ✅ **Luôn handle errors trong async functions**
  - Dùng try-catch cho async operations
  - Handle Supabase error responses
- ✅ **Show user-friendly error messages**
  - Không show technical error messages cho users
  - Dùng toast notifications (sonner library)
- ✅ **Log errors to console** (dev) hoặc Sentry (production)
  - `console.error()` cho development
  - Sentry cho production error tracking
- ✅ **Never swallow errors silently**
  - Luôn handle hoặc throw errors
  - Không để empty catch blocks

**Ví dụ:**
```typescript
// ❌ BAD: Silent error swallowing
try {
  await supabase.from('tasks').insert(newTask)
} catch (error) {
  // Empty catch - error disappears!
}

// ✅ GOOD: Proper error handling
import { toast } from 'sonner'

async function createTask(task: TaskInput) {
  try {
    const { data, error } = await supabase
      .from('tasks')
      .insert(task)
      .select()
      .single()

    if (error) throw error

    toast.success('Task created successfully')
    return data
  } catch (error) {
    console.error('Failed to create task:', error)

    // User-friendly message
    toast.error('Failed to create task. Please try again.')

    // Re-throw for caller to handle
    throw error
  }
}
```

**Error Boundary Pattern:**
```tsx
// components/ErrorBoundary.tsx
'use client'

import { Component, type ReactNode } from 'react'

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
  error?: Error
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="p-4 bg-red-50 border border-red-200 rounded">
          <h2 className="text-red-800 font-semibold">Something went wrong</h2>
          <p className="text-red-600 text-sm mt-2">
            {this.state.error?.message}
          </p>
        </div>
      )
    }

    return this.props.children
  }
}
```

**Tài liệu liên quan:**
- [Sonner Toast Library](https://sonner.emilkowal.ski/)
- [Sentry Error Tracking](https://sentry.io/)

---

## III. Documentation Conventions (Quy ước Tài liệu)

### Nguyên tắc #11: Documentation Language

**Mô tả:**
Language consistency giúp team (và AI) hiểu rõ context của từng loại document.

**Quy tắc chi tiết:**
- ✅ **User-facing docs:** **Tiếng Việt**
  - Examples: `QUICKSTART_AI.md`, `FEATURES.md`, `ROADMAP.md`
  - Target audience: Vietnamese developers và stakeholders
- ✅ **Technical docs:** **Tiếng Anh** hoặc **Tiếng Việt** (flexible)
  - Examples: `SETUP.md`, `DEPLOY.md`, `architecture/decisions.md`
  - Tiếng Anh cho technical terms không nên dịch
  - Tiếng Việt cho explanations và context
- ✅ **Code comments:** **Tiếng Việt** cho logic phức tạp
  - Public APIs: JSDoc bằng tiếng Anh
  - Internal logic: Comments bằng tiếng Việt
- ✅ **Commit messages:** **Tiếng Anh**
  - Follow Conventional Commits spec
  - Example: `feat(tasks): add inline edit functionality`

**Language Matrix:**
| Document Type | Language | Example |
|--------------|----------|---------|
| Roadmap | Tiếng Việt | ROADMAP.md |
| Features | Tiếng Việt | FEATURES.md |
| Status | Tiếng Việt | THIS_WEEK.md |
| Setup Guide | Mixed | SETUP.md |
| ADRs | Mixed | decisions.md |
| Code Comments | Tiếng Việt | Complex logic |
| JSDoc | Tiếng Anh | Public APIs |
| Commit Messages | Tiếng Anh | Git log |

**Tài liệu liên quan:**
- [Conventional Commits](https://www.conventionalcommits.org/)

---

### Nguyên tắc #12: Documentation Structure

**Mô tả:**
Numbered folder structure giúp AI và humans navigate documentation dễ dàng.

**Quy tắc chi tiết:**
- ✅ **Folder Structure:**
  - `00_start-here/` - Entry point, daily workflow
    - `QUICKSTART_AI.md` - AI assistant guide
    - `WORKFLOW.md` - Daily workflow instructions
  - `01_status/` - Current state
    - `THIS_WEEK.md` - Current week focus
    - `FEATURES.md` - Feature implementation status
    - `BUGS.md` - Known bugs
    - `UI_UX.md` - UI component polish status
  - `02_ai-prompts/` - AI prompts và templates
    - `AI_PROMPTS.md` - Collection of prompts
    - `AI_PRINCIPLES.md` - AI prompting principles
    - `templates/` - Prompt templates
  - `03_roadmap/` - Planning
    - `ROADMAP.md` - 12-week roadmap
    - `IDEAS.md` - Ideas backlog
    - `PROJECT_STATUS.md` - Master status document
  - `04_technical/` - Technical docs
    - `SETUP.md` - Development setup
    - `TROUBLESHOOTING_LOG.md` - Bug history
    - `architecture/` - Architecture docs
      - `decisions.md` - ADRs
      - `migrations/` - Database migrations
  - `05_research/` - User research (planned)

**Numbering Convention:**
- `00_` = Start here (entry point)
- `01_` = Current state (status files, updated daily/weekly)
- `02_` = AI resources (prompts, templates)
- `03_` = Planning (roadmap, ideas)
- `04_` = Technical (setup, architecture)
- `05_` = Research (user interviews, feedback)

**Lợi ích:**
- Auto-sort theo logical order
- AI có thể navigate dễ dàng
- New team members biết bắt đầu từ đâu

---

### Nguyên tắc #13: Daily Workflow

**Mô tả:**
Consistent daily workflow đảm bảo documentation luôn up-to-date và team (hoặc AI) biết làm gì tiếp theo.

**Quy tắc chi tiết:**
- ✅ **Mỗi sáng:** Đọc `QUICKSTART_AI.md`
  - Xem top priorities tuần này
  - Xem checklist tasks hôm nay
  - Check blockers hoặc dependencies
- ✅ **Khi code:** Mở `AI_PROMPTS.md`
  - Copy prompt template phù hợp
  - Customize cho feature hiện tại
  - Run AI, test code generated
- ✅ **Mỗi tối:** Update `FEATURES.md`
  - Mark completed features
  - Add challenges encountered
  - Document next steps
- ✅ **Mỗi thứ 2:** Update `THIS_WEEK.md`
  - Review last week progress
  - Plan this week tasks
  - Update priorities

**Daily Checklist Template:**
```markdown
## ☀️ Sáng (9:00 AM)
- [ ] Đọc `docs/00_start-here/QUICKSTART_AI.md`
- [ ] Check `docs/01_status/THIS_WEEK.md` - Tasks hôm nay
- [ ] Check `docs/01_status/BUGS.md` - Blockers

## 💻 Trong ngày
- [ ] Copy prompt từ `docs/02_ai-prompts/AI_PROMPTS.md`
- [ ] Code feature với AI assistance
- [ ] Test manually + unit tests
- [ ] Commit với Conventional Commits

## 🌙 Tối (6:00 PM)
- [ ] Update `docs/01_status/FEATURES.md` - Progress hôm nay
- [ ] Update `docs/01_status/BUGS.md` - New bugs discovered
- [ ] Push code lên GitHub
```

---

### Nguyên tắc #14: File Naming (Docs)

**Mô tả:**
Consistent file naming cho documentation giúp dễ tìm và reference.

**Quy tắc chi tiết:**
- ✅ **UPPERCASE cho important files**
  - Examples: `README.md`, `THIS_WEEK.md`, `QUICKSTART_AI.md`
  - High-level overview files
- ✅ **Folders:** lowercase + numbered prefix
  - Examples: `00_start-here/`, `01_status/`, `02_ai-prompts/`
  - Auto-sort theo logical order
- ✅ **Archives:** Tạo subfolder
  - `archive/old-versions/` - Archived documentation
  - `archive/conversations/` - Chat logs
  - `archive/temp-fixes/` - Temporary workarounds

**Naming Patterns:**
```
docs/
├── 00_start-here/
│   ├── QUICKSTART_AI.md          # Entry point
│   └── WORKFLOW.md                # Daily workflow
├── 01_status/
│   ├── THIS_WEEK.md               # Current week
│   ├── FEATURES.md                # Feature status
│   └── BUGS.md                    # Bug tracking
├── 02_ai-prompts/
│   ├── AI_PROMPTS.md              # Prompt collection
│   ├── AI_PRINCIPLES.md           # This file
│   └── templates/
│       ├── feature-request.md     # Template
│       └── bug-fix.md             # Template
├── 03_roadmap/
│   ├── ROADMAP.md                 # 12-week plan
│   └── IDEAS.md                   # Ideas backlog
├── 04_technical/
│   ├── SETUP.md                   # Dev setup
│   ├── TROUBLESHOOTING_LOG.md     # Bug history
│   └── architecture/
│       ├── decisions.md           # ADRs
│       └── migrations/
│           └── 001_initial_schema.sql
└── archive/
    ├── old-versions/              # Deprecated docs
    └── conversations/             # Chat history
```

---

## IV. Deployment & Testing (Triển khai & Testing)

### Nguyên tắc #15: Git Workflow

**Mô tả:**
Consistent Git workflow giúp maintain code history và collaborate hiệu quả.

**Quy tắc chi tiết:**
- ✅ **Branch naming:**
  - `feature/feature-name` - New features
  - `fix/bug-name` - Bug fixes
  - `docs/update-name` - Documentation updates
  - Examples:
    - `feature/kanban-board`
    - `fix/task-disappear-on-complete`
    - `docs/update-roadmap`
- ✅ **Commit messages:** `type(scope): message` (Conventional Commits)
  - Types: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`
  - Scope: `tasks`, `projects`, `kanban`, `pages`, `auth`, `db`
  - Examples:
    - `feat(tasks): add inline edit functionality`
    - `fix(kanban): prevent drag when task is completed`
    - `docs(roadmap): update Week 0 priorities`
- ✅ **Always use `git mv` khi move files** (preserve history)
  - ❌ BAD: `mv old-file.md new-file.md` → Git treats as delete + create
  - ✅ GOOD: `git mv old-file.md new-file.md` → Git tracks rename
  - Exception: Untracked files hoặc files mới tạo

**Commit Message Template:**
```bash
# Format:
# <type>(<scope>): <subject>
#
# <body>
#
# <footer>

feat(tasks): add inline edit for task title

- Double-click task title to edit inline
- Auto-save after 500ms debounce
- Escape key to cancel editing
- Optimistic UI update with Zustand

Closes #42
```

**Git Aliases (Optional):**
```bash
# Add to ~/.gitconfig
[alias]
  co = checkout
  br = branch
  ci = commit
  st = status
  mv-preserve = "!f() { git mv \"$1\" \"$2\" && git add \"$2\"; }; f"
```

**Tài liệu liên quan:**
- [Conventional Commits](https://www.conventionalcommits.org/)
- [Git Best Practices](https://git-scm.com/book/en/v2/Git-Branching-Branching-Workflows)

---

### Nguyên tắc #16: Testing Strategy

**Mô tả:**
Balanced testing strategy đảm bảo code quality mà không waste time viết quá nhiều tests.

**Quy tắc chi tiết:**
- ✅ **Unit Tests:** Hooks, utils (Vitest)
  - Test pure functions
  - Test custom hooks với `@testing-library/react-hooks`
  - Examples:
    - `date-utils.test.ts` - Date formatting functions
    - `use-tasks.test.ts` - Task CRUD hooks
- ✅ **Integration Tests:** Component + Supabase (Testing Library)
  - Test component interactions
  - Mock Supabase với `msw` (Mock Service Worker)
  - Examples:
    - `TaskList.test.tsx` - Task list với Supabase mocked
- ✅ **E2E Tests:** Critical flows (Playwright)
  - Test user journeys
  - Examples:
    - `auth-flow.spec.ts` - Login → Dashboard → Logout
    - `task-creation.spec.ts` - Create task → Edit → Complete → Delete
- ✅ **Manual Testing:** Mỗi feature sau khi AI generate
  - Test trên Chrome, Safari, Firefox
  - Test trên mobile view (Chrome DevTools)
  - Test keyboard shortcuts
- ✅ **Target coverage:** 70%+ cho core features
  - Không chase 100% coverage
  - Focus on critical paths

**Testing Pyramid:**
```
       /\
      /  \  E2E Tests (10%)
     /----\
    /      \  Integration Tests (30%)
   /--------\
  /          \ Unit Tests (60%)
 /____________\
```

**Test File Structure:**
```
frontend/
├── lib/
│   ├── hooks/
│   │   ├── use-tasks.ts
│   │   └── use-tasks.test.ts       # Co-located with implementation
│   └── utils/
│       ├── date-utils.ts
│       └── date-utils.test.ts
├── components/
│   ├── tasks/
│   │   ├── TaskList.tsx
│   │   └── TaskList.test.tsx
└── e2e/
    ├── auth-flow.spec.ts
    └── task-creation.spec.ts
```

**Tài liệu liên quan:**
- [Vitest Documentation](https://vitest.dev/)
- [Testing Library](https://testing-library.com/)
- [Playwright](https://playwright.dev/)

---

### Nguyên tắc #17: Database Migrations

**Mô tả:**
Structured database migrations đảm bảo schema changes được tracked và có thể rollback. Sử dụng Supabase CLI để quản lý migrations.

**Quy tắc chi tiết:**
- ✅ **Luôn tạo migration script trong `supabase/migrations/`**
  - Mỗi schema change = 1 migration file
  - Sử dụng Supabase CLI: `supabase migration new description`
  - Migrations tự động được track bởi Supabase CLI
- ✅ **Naming:** Timestamp-based (Supabase CLI tự động tạo)
  - Format: `YYYYMMDDHHMMSS_description.sql`
  - Example: `20251113120000_add_priority_to_tasks.sql`
  - Supabase CLI tự động sort theo timestamp
- ✅ **Test migration trên local trước khi deploy**
  - Run `supabase start` để start local database
  - Run `supabase db reset` để test migrations
  - Test app functionality sau migration
  - Verify migration với `supabase migration list`
- ✅ **Deploy migrations với Supabase CLI**
  - `supabase db push` để deploy lên cloud
  - CLI tự động track applied migrations
  - Không cần chạy manual SQL nữa
- ✅ **Backup database trước khi run migration**
  - Supabase: Project Settings → Database → Backup
  - Hoặc: `supabase db dump` để export schema

**Migration Workflow:**
```bash
# 1. Create new migration
supabase migration new add_priority_to_tasks

# 2. Edit file: supabase/migrations/YYYYMMDDHHMMSS_add_priority_to_tasks.sql
# Add your SQL changes

# 3. Test locally
supabase db reset  # Runs all migrations + seed.sql

# 4. Deploy to cloud
supabase db push

# 5. Verify
supabase migration list
```

**Migration Template:**
```sql
-- Migration: Add priority field to tasks table
-- Created: 2025-11-13
-- Description: Add priority field to tasks table

-- UP Migration
ALTER TABLE tasks
ADD COLUMN IF NOT EXISTS priority INTEGER DEFAULT 0 CHECK (priority >= 0 AND priority <= 4);

COMMENT ON COLUMN tasks.priority IS
  '0 = No priority, 1 = Low, 2 = Medium, 3 = High, 4 = Urgent';

-- Update existing tasks to default priority
UPDATE tasks SET priority = 0 WHERE priority IS NULL;

-- Create index for filtering by priority
CREATE INDEX IF NOT EXISTS idx_tasks_priority ON tasks(priority);
```

**Migration Checklist:**
- [ ] Migration file created với `supabase migration new`
- [ ] Migration tested locally với `supabase db reset`
- [ ] Database backup created (nếu production)
- [ ] Migration deployed với `supabase db push`
- [ ] Migration verified với `supabase migration list`
- [ ] Types regenerated: `supabase gen types typescript --local > frontend/types/database.types.ts`

**Tài liệu liên quan:**
- [Supabase Migrations](https://supabase.com/docs/guides/database/migrations)
- [PostgreSQL ALTER TABLE](https://www.postgresql.org/docs/current/sql-altertable.html)

---

### Nguyên tắc #18: Environment Variables

**Mô tả:**
Secure environment variable management để tránh leak secrets và config lộn xộn.

**Quy tắc chi tiết:**
- ✅ **Never commit `.env.local`**
  - Add to `.gitignore`
  - Contains secrets (API keys, database URLs)
- ✅ **Always provide `.env.local.example`**
  - Template cho team members
  - Placeholder values (không có real secrets)
- ✅ **Document mỗi env var trong README**
  - Explain purpose
  - Link to where to get values
- ✅ **Use `NEXT_PUBLIC_` prefix cho client-side vars**
  - Next.js exposes vars với prefix này to browser
  - Never put secrets trong `NEXT_PUBLIC_*` vars

**Example `.env.local.example`:**
```bash
# Supabase Configuration
# Get these from: https://supabase.com/dashboard/project/YOUR_PROJECT/settings/api
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here

# Optional: Analytics
# NEXT_PUBLIC_GA_TRACKING_ID=G-XXXXXXXXXX

# Optional: Error Tracking (Production only)
# SENTRY_DSN=https://xxxxx@sentry.io/xxxxx
```

**Security Rules:**
- ❌ **NEVER** put these in `NEXT_PUBLIC_*`:
  - Database passwords
  - Service role keys (Supabase admin key)
  - OAuth client secrets
  - API secret keys
- ✅ **CAN** put these in `NEXT_PUBLIC_*`:
  - Supabase URL
  - Supabase anon key (public-facing)
  - Google Analytics ID
  - Public API endpoints

**Tài liệu liên quan:**
- [Next.js Environment Variables](https://nextjs.org/docs/app/building-your-application/configuring/environment-variables)
- [Supabase API Keys](https://supabase.com/docs/guides/api/api-keys)

---

## V. AI Prompting Best Practices (Thực hành tốt nhất với AI)

### Nguyên tắc #19: Good Prompt Structure

**Mô tả:**
Well-structured prompts giúp AI generate code chính xác hơn và tiết kiệm thời gian.

**Quy tắc chi tiết:**
- ✅ **Context:** Project name, tech stack, file location
  - AI cần biết project context để generate relevant code
  - Include tech stack để AI dùng đúng libraries
  - Specify file location để AI follow structure
- ✅ **Requirements:** Numbered list, specific
  - Break down thành small, specific requirements
  - Use numbered lists (1, 2, 3...)
  - Avoid vague requirements like "make it nice"
- ✅ **Constraints:** Free tier, mobile-first, performance
  - Specify limitations (free tier Supabase = no Edge Functions)
  - Mention design constraints (mobile-first, dark mode support)
  - Performance requirements (bundle size, load time)
- ✅ **Expected Output:** Component, types, usage example
  - Specify exactly what files you expect
  - Ask for usage examples để verify code works
  - Request tests nếu cần
- ✅ **Optional:** Styling guide, accessibility requirements
  - TailwindCSS classes for consistency
  - ARIA labels for accessibility
  - Keyboard shortcuts for power users

**Prompt Template:**
```markdown
# Feature Request: [Feature Name]

## Context
- **Project:** NEXUS Productivity OS - Task management app
- **Stack:** Next.js 16, React 19, TypeScript, Zustand, Supabase, TailwindCSS
- **File Location:** `frontend/components/tasks/TaskItem.tsx`

## Requirements
1. Display task title, checkbox, due date badge, priority badge
2. Optimistic UI update when clicking checkbox (toggle completed)
3. Double-click task title to edit inline
   - Auto-save after 500ms debounce
   - Escape key to cancel editing
4. Keyboard shortcuts:
   - `x`: Toggle completed
   - `d`: Delete task (confirm first)
   - `e`: Start editing

## State Management
- Use Zustand store: `useTaskStore`
- Optimistic update pattern:
  1. Update UI immediately (Zustand)
  2. Sync with Supabase
  3. Revert if error + show toast

## Styling
- TailwindCSS classes only
- Hover effect: `hover:bg-gray-50`
- Completed task: `line-through text-gray-500`
- Touch-friendly: min height 44px

## Accessibility
- ARIA labels for checkbox and buttons
- Keyboard navigation support
- Focus visible indicator

## Expected Output
1. `TaskItem.tsx` component file
2. `TaskItemProps` interface
3. Usage example in `TaskList.tsx`

## Constraints
- Mobile-first design
- Performance: < 1ms render time (no heavy computations)
- Free tier Supabase (no Edge Functions)
```

**Tài liệu liên quan:**
- [AI_PROMPTS.md](AI_PROMPTS.md) - Collection of effective prompts

---

### Nguyên tắc #20: When AI Makes Mistakes

**Mô tả:**
AI không phải lúc nào cũng đúng. Biết cách debug và fix AI-generated code tiết kiệm thời gian.

**Quy tắc chi tiết:**
- ✅ **Don't regenerate entire prompt immediately**
  - Costly (time + API credits)
  - Có thể fix small mistakes manually
- ✅ **Give specific feedback:** "This code has error X, please fix Y"
  - Point to exact line number
  - Explain expected behavior vs actual behavior
  - Provide error message + stack trace
- ✅ **Provide error message + stack trace**
  - Copy full error từ console
  - Include relevant context (browser, OS, etc.)
- ✅ **Ask AI to explain the fix**
  - Học từ mistakes
  - Understand why error happened
  - Apply learning to future prompts

**Debug Workflow:**
```markdown
1. AI generates code
   ↓
2. Test code manually
   ↓
3. If error:
   ├─→ Small mistake (typo, import) → Fix manually
   └─→ Logic error → Ask AI to fix với specific feedback
   ↓
4. Ask AI to explain fix
   ↓
5. Document learning trong TROUBLESHOOTING_LOG.md
```

**Example Feedback Prompt:**
```markdown
The code you generated has a TypeScript error:

\`\`\`typescript
// TaskItem.tsx:15
const toggleTask = useTaskStore(state => state.toggleTask)
\`\`\`

Error:
\`\`\`
Property 'toggleTask' does not exist on type 'TaskStore'
\`\`\`

It seems the Zustand store doesn't have a `toggleTask` method yet.

Please:
1. Update the Zustand store (`lib/stores/tasks.ts`) to add `toggleTask` method
2. Show me the updated TaskItem component using this method
3. Explain how optimistic updates work in this implementation
```

**Tài liệu liên quan:**
- [TROUBLESHOOTING_LOG.md](../04_technical/TROUBLESHOOTING_LOG.md) - Documented errors and solutions

---

### Nguyên tắc #21: Prompt Reusability

**Mô tả:**
Save và reuse good prompts để tăng tốc development và maintain consistency.

**Quy tắc chi tiết:**
- ✅ **Save good prompts trong `AI_PROMPTS.md`**
  - Mark prompts với success rate
  - Include generated code examples
  - Note any modifications needed
- ✅ **Create templates trong `02_ai-prompts/templates/`**
  - Feature request template
  - Bug fix template
  - Component generation template
  - Supabase query template
- ✅ **Update prompts based on learnings**
  - Khi AI makes mistakes, update prompt để tránh lặp lại
  - Add more context nếu cần
  - Refine requirements
- ✅ **Share prompts với team** (nếu có)
  - Document trong shared repository
  - Code review prompts cùng với code
  - Build team knowledge base

**Template Types:**
```
docs/02_ai-prompts/templates/
├── feature-request.md        # New feature development
├── bug-fix.md                # Fix existing bugs
├── component-generation.md   # Generate React components
├── hook-generation.md        # Generate custom hooks
├── supabase-query.md         # Supabase CRUD operations
└── database-migration.md     # Database schema changes
```

**Prompt Versioning:**
```markdown
# Prompt: Generate Task List Component

## Version History
- **v1.0** (2025-11-01): Initial prompt - 70% success rate, missing keyboard shortcuts
- **v1.1** (2025-11-05): Added keyboard shortcuts requirement - 85% success rate
- **v2.0** (2025-11-08): Added optimistic UI pattern - 95% success rate ✅

## Current Version: v2.0

[Prompt content...]
```

**Tài liệu liên quan:**
- [AI_PROMPTS.md](AI_PROMPTS.md) - Prompt collection

---

## VI. UI/UX Principles (Nguyên tắc UI/UX)

### Nguyên tắc #22: Design System

**Mô tả:**
Consistent design system đảm bảo UI cohesive và professional.

**Quy tắc chi tiết:**
- ✅ **Use shadcn/ui components** (consistency)
  - Don't create custom components nếu shadcn/ui đã có
  - Import từ `@/components/ui/*`
  - Customize với TailwindCSS classes nếu cần
- ✅ **Colors:** Follow Tailwind default palette
  - Gray scale: `gray-50` to `gray-900`
  - Primary: `blue-500` (hoặc `indigo-500`)
  - Success: `green-500`
  - Warning: `yellow-500`
  - Error: `red-500`
- ✅ **Spacing:** Tailwind spacing scale
  - Use `p-4`, `gap-2`, `m-8`, etc.
  - Consistent spacing: 4px, 8px, 12px, 16px, 24px, 32px
- ✅ **Typography:** Inter font, `text-sm` default
  - Headings: `text-lg`, `text-xl`, `text-2xl`
  - Body: `text-sm` (14px)
  - Small text: `text-xs` (12px)

**Component Hierarchy:**
```tsx
// Headings
<h1 className="text-2xl font-bold">Page Title</h1>
<h2 className="text-xl font-semibold">Section Title</h2>
<h3 className="text-lg font-medium">Subsection</h3>

// Body Text
<p className="text-sm text-gray-700">Normal text content</p>
<p className="text-xs text-gray-500">Secondary info</p>

// Buttons (shadcn/ui)
<Button variant="default">Primary Action</Button>
<Button variant="outline">Secondary Action</Button>
<Button variant="ghost">Tertiary Action</Button>

// Badges
<Badge variant="default">Default</Badge>
<Badge variant="secondary">Low Priority</Badge>
<Badge variant="destructive">High Priority</Badge>
```

**Color Palette:**
```typescript
// tailwind.config.ts
export default {
  theme: {
    extend: {
      colors: {
        // Primary
        primary: {
          DEFAULT: 'hsl(222, 47%, 55%)',  // Blue
          foreground: 'hsl(210, 40%, 98%)',
        },
        // Success
        success: {
          DEFAULT: 'hsl(142, 71%, 45%)',  // Green
          foreground: 'hsl(210, 40%, 98%)',
        },
        // Destructive
        destructive: {
          DEFAULT: 'hsl(0, 84%, 60%)',    // Red
          foreground: 'hsl(210, 40%, 98%)',
        },
      },
    },
  },
}
```

**Tài liệu liên quan:**
- [shadcn/ui Components](https://ui.shadcn.com/docs/components)
- [TailwindCSS Color Palette](https://tailwindcss.com/docs/customizing-colors)

---

### Nguyên tắc #23: Keyboard Shortcuts

**Mô tả:**
Power users love keyboard shortcuts. Implement shortcuts cho common actions.

**Quy tắc chi tiết:**
- ✅ **Global shortcuts:**
  - `Cmd+K` (Mac) / `Ctrl+K` (Windows): Command palette
  - `Esc`: Close modal/cancel action
- ✅ **Navigation:**
  - `j`: Navigate down (next item)
  - `k`: Navigate up (previous item)
  - `/`: Focus search box
- ✅ **Task actions:**
  - `x`: Toggle complete
  - `c`: Create new task
  - `d`: Delete task (with confirmation)
  - `e`: Edit task
- ✅ **Project actions:**
  - `n`: New project
  - `1-9`: Switch to project 1-9

**Implementation với react-hotkeys-hook:**
```tsx
import { useHotkeys } from 'react-hotkeys-hook'

export default function TaskList() {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const tasks = useTaskStore(state => state.tasks)

  // Navigation
  useHotkeys('j', () => {
    setSelectedIndex(prev => Math.min(prev + 1, tasks.length - 1))
  })

  useHotkeys('k', () => {
    setSelectedIndex(prev => Math.max(prev - 1, 0))
  })

  // Actions
  useHotkeys('x', () => {
    toggleTask(tasks[selectedIndex].id)
  })

  useHotkeys('c', () => {
    openQuickAdd()
  })

  // Command palette
  useHotkeys('mod+k', (e) => {
    e.preventDefault()
    openCommandPalette()
  })

  return (
    <div>
      {tasks.map((task, index) => (
        <TaskItem
          key={task.id}
          task={task}
          isSelected={index === selectedIndex}
        />
      ))}
    </div>
  )
}
```

**Keyboard Shortcut Help:**
```tsx
// Show keyboard shortcuts với `?` key
useHotkeys('shift+/', () => {
  openKeyboardShortcutsModal()
})

function KeyboardShortcutsModal() {
  return (
    <Dialog>
      <DialogContent>
        <DialogTitle>Keyboard Shortcuts</DialogTitle>
        <div className="space-y-2">
          <ShortcutRow keys={['j']} description="Navigate down" />
          <ShortcutRow keys={['k']} description="Navigate up" />
          <ShortcutRow keys={['x']} description="Toggle complete" />
          <ShortcutRow keys={['c']} description="Create task" />
          <ShortcutRow keys={['Cmd', 'K']} description="Command palette" />
        </div>
      </DialogContent>
    </Dialog>
  )
}
```

**Tài liệu liên quan:**
- [react-hotkeys-hook](https://github.com/JohannesKlauss/react-hotkeys-hook)

---

### Nguyên tắc #24: Loading States

**Mô tả:**
Proper loading states giúp user biết app đang làm gì, không bị confuse với white screen.

**Quy tắc chi tiết:**
- ✅ **Always show skeleton hoặc spinner**
  - Skeleton cho list/grid items
  - Spinner cho single items hoặc full-page loads
- ✅ **Never white screen khi loading**
  - Show placeholder content
  - Maintain layout structure
- ✅ **Optimistic UI > Loading spinners**
  - Update UI immediately when possible
  - Show spinners only for unavoidable delays
- ✅ **Minimum 200ms loading state** (avoid flicker)
  - Nếu request < 200ms, không show loading state
  - Tránh flicker effect

**Skeleton Pattern:**
```tsx
// components/ui/TaskSkeleton.tsx
export function TaskSkeleton() {
  return (
    <div className="flex items-center gap-2 p-2 animate-pulse">
      <div className="h-4 w-4 bg-gray-200 rounded" />
      <div className="h-4 flex-1 bg-gray-200 rounded" />
      <div className="h-4 w-16 bg-gray-200 rounded" />
    </div>
  )
}

// Usage in TaskList
export default function TaskList() {
  const { tasks, isLoading } = useTasks(workspaceId)

  if (isLoading) {
    return (
      <div className="space-y-2">
        {Array.from({ length: 5 }).map((_, i) => (
          <TaskSkeleton key={i} />
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-2">
      {tasks.map(task => (
        <TaskItem key={task.id} task={task} />
      ))}
    </div>
  )
}
```

**Spinner Pattern:**
```tsx
import { Loader2 } from 'lucide-react'

// Small inline spinner
<Loader2 className="h-4 w-4 animate-spin" />

// Full-page spinner
<div className="flex items-center justify-center h-screen">
  <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
</div>
```

**Delayed Loading State:**
```tsx
function TaskList() {
  const [showLoading, setShowLoading] = useState(false)
  const { tasks, isLoading } = useTasks(workspaceId)

  useEffect(() => {
    if (isLoading) {
      const timer = setTimeout(() => setShowLoading(true), 200)
      return () => clearTimeout(timer)
    } else {
      setShowLoading(false)
    }
  }, [isLoading])

  if (showLoading) {
    return <TaskSkeleton />
  }

  return <TaskList tasks={tasks} />
}
```

**Tài liệu liên quan:**
- [shadcn/ui Skeleton](https://ui.shadcn.com/docs/components/skeleton)

---

### Nguyên tắc #25: Empty States

**Mô tả:**
Good empty states guide users về next action và make app feel polished.

**Quy tắc chi tiết:**
- ✅ **Helpful message + CTA**
  - Explain why empty
  - Guide user về next action
- ✅ **Icon hoặc illustration**
  - Visual interest
  - Clarify context
- ✅ **Guide user về next action**
  - Primary CTA button
  - Keyboard shortcut hint
- ✅ **Example:** "No tasks yet. Press 'c' to create one"

**Empty State Pattern:**
```tsx
// components/EmptyState.tsx
import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface EmptyStateProps {
  icon: React.ReactNode
  title: string
  description: string
  action?: {
    label: string
    onClick: () => void
    shortcut?: string
  }
}

export function EmptyState({ icon, title, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
      <div className="h-16 w-16 mb-4 text-gray-400">
        {icon}
      </div>

      <h3 className="text-lg font-semibold mb-2">
        {title}
      </h3>

      <p className="text-sm text-gray-500 mb-6 max-w-sm">
        {description}
      </p>

      {action && (
        <Button onClick={action.onClick}>
          <Plus className="h-4 w-4 mr-2" />
          {action.label}
          {action.shortcut && (
            <kbd className="ml-2 px-1.5 py-0.5 text-xs bg-gray-100 rounded">
              {action.shortcut}
            </kbd>
          )}
        </Button>
      )}
    </div>
  )
}
```

**Usage Examples:**
```tsx
// No tasks in Today page
<EmptyState
  icon={<CheckCircle2 />}
  title="No tasks for today"
  description="You're all caught up! Create a new task or enjoy your free time."
  action={{
    label: 'Create Task',
    onClick: () => openQuickAdd(),
    shortcut: 'C'
  }}
/>

// No projects
<EmptyState
  icon={<FolderPlus />}
  title="No projects yet"
  description="Projects help you organize your tasks. Create your first project to get started."
  action={{
    label: 'Create Project',
    onClick: () => openProjectDialog(),
    shortcut: 'N'
  }}
/>

// Search no results
<EmptyState
  icon={<Search />}
  title="No results found"
  description={`No tasks match "${searchQuery}". Try a different search term.`}
/>
```

**Tài liệu liên quan:**
- [Empty State Design Patterns](https://www.nngroup.com/articles/empty-states/)

---

## VII. Project Management (Quản lý Dự án)

### Nguyên tắc #26: Feature Prioritization

**Mô tả:**
MoSCoW method giúp prioritize features hiệu quả khi resources limited.

**Quy tắc chi tiết:**
- ✅ **Must Have:** Task CRUD, Kanban, Calendar
  - Core features không thể thiếu
  - App không hoạt động được nếu thiếu những features này
  - Examples:
    - Task creation, editing, deletion
    - Task completion toggle
    - Basic Kanban board
- ✅ **Should Have:** Pages, App Minis
  - Important nhưng không blocking
  - Có thể launch MVP mà không có những features này
  - Examples:
    - Rich text pages (Notion-like)
    - Dashboard Grid
    - App Minis (CRM, Habit Tracker)
- ✅ **Could Have:** Integrations, Advanced features
  - Nice-to-have
  - Improve UX nhưng không essential
  - Examples:
    - Google Calendar sync
    - Slack notifications
    - AI task suggestions
- ✅ **Won't Have:** (This release)
  - Out of scope
  - Maybe in future versions
  - Examples:
    - Built-in chat
    - Video calls
    - Email client
- ✅ **Use MoSCoW method**

**Priority Matrix:**
```
High Impact, High Effort:
├─ Must Have (Do First)
│  ├─ Task CRUD
│  ├─ Kanban Board
│  └─ Calendar View
│
└─ Should Have (Do Next)
   ├─ Pages Editor
   └─ Dashboard Grid

High Impact, Low Effort:
├─ Quick wins (Do Now)
│  ├─ Keyboard shortcuts
│  ├─ Dark mode
│  └─ Empty states
│
└─ Polish (Do Soon)

Low Impact, High Effort:
└─ Won't Have (Avoid)
   ├─ Built-in chat
   ├─ Video calls
   └─ Email client

Low Impact, Low Effort:
└─ Could Have (Do Last)
   ├─ Fun animations
   └─ Easter eggs
```

**Feature Scoring Template:**
```markdown
# Feature: [Name]

## Impact Score (1-10)
- User value: 8/10
- Business value: 7/10
- Technical value: 5/10
**Total: 20/30**

## Effort Score (1-10)
- Development time: 6/10 (3 days)
- Complexity: 7/10
- Risk: 4/10
**Total: 17/30**

## Priority Calculation
Impact / Effort = 20/17 = **1.18**

## Decision
- Priority: **MEDIUM**
- Category: **Should Have**
- Timeline: Week 2-3
```

---

### Nguyên tắc #27: Weekly Rhythm

**Mô tả:**
Consistent weekly rhythm giúp maintain momentum và track progress hiệu quả.

**Quy tắc chi tiết:**
- ✅ **Monday:** Review last week, plan this week
  - Update `docs/01_status/THIS_WEEK.md`
  - Review completed features
  - Set weekly goals
  - Identify blockers
- ✅ **Daily:** Morning read `QUICKSTART_AI.md`, evening update progress
  - Morning (9 AM):
    - Read `QUICKSTART_AI.md` - Know today's tasks
    - Check `BUGS.md` - Any blockers?
  - Evening (6 PM):
    - Update `FEATURES.md` - Mark completed tasks
    - Update `BUGS.md` - New bugs discovered
    - Commit + push code
- ✅ **Friday:** Week review, update `docs/01_status/THIS_WEEK.md`
  - Review week progress
  - Document learnings
  - Update feature status
  - Celebrate wins
- ✅ **Sunday:** Prepare for next week
  - Review roadmap
  - Plan Monday tasks
  - Mental preparation

**Weekly Template:**
```markdown
# This Week: [Week Number] ([Start Date] - [End Date])

## 🎯 Weekly Goals
- [ ] Goal 1: [Specific, measurable]
- [ ] Goal 2: [Specific, measurable]
- [ ] Goal 3: [Specific, measurable]

## 📅 Daily Breakdown

### Monday (MM/DD)
- [x] Review last week progress
- [x] Plan this week
- [ ] Task 1
- [ ] Task 2

### Tuesday (MM/DD)
- [ ] Task 3
- [ ] Task 4

[... Wednesday, Thursday, Friday ...]

## 🐛 Blockers
- None currently

## 📝 Learnings
- Learning 1
- Learning 2

## 🎉 Wins
- Win 1
- Win 2
```

---

### Nguyên tắc #28: Decision Making

**Mô tả:**
Document major decisions để future you (và team) hiểu why decisions were made.

**Quy tắc chi tiết:**
- ✅ **Document major decisions trong `decisions.md`**
  - Architecture decisions
  - Technology choices
  - Design decisions
- ✅ **Include: Decision, Reason, Pros/Cons, Result**
  - What was decided?
  - Why was it decided?
  - What are trade-offs?
  - How did it turn out?
- ✅ **Review decisions mỗi tháng**
  - Were decisions correct?
  - What would we do differently?
  - Update "Result" section
- ✅ **Learn from mistakes**
  - Document failed decisions
  - Explain what went wrong
  - How to avoid in future

**ADR Template:**
```markdown
### ADR-XXX: [Decision Title]

**Quyết định:** [Brief summary of decision]

**Ngày quyết định:** [Date]

**Lý do/Bối cảnh:**
- Context 1
- Context 2
- Why decision was needed

**Ưu điểm:**
- Pro 1
- Pro 2
- Pro 3

**Nhược điểm/Rủi ro:**
- Con 1
- Con 2
- Con 3

**Kết quả:**
- ✅ Success indicator 1
- ⚠️ Challenge 1
- 📊 Metrics (if applicable)

**Lessons Learned:**
- Learning 1
- Learning 2
```

**Tài liệu liên quan:**
- [decisions.md](../04_technical/architecture/decisions.md) - All ADRs

---

## VIII. Security & Privacy (Bảo mật & Riêng tư)

### Nguyên tắc #29: Row Level Security (RLS)

**Mô tả:**
RLS đảm bảo users chỉ có thể access data của họ, ngay cả khi client-side code bị bypass.

**Quy tắc chi tiết:**
- ✅ **Always enable RLS trên mọi tables**
  - `ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;`
  - No exceptions
- ✅ **Test RLS policies với different users**
  - Create test users
  - Verify User A cannot see User B's data
  - Test all CRUD operations
- ✅ **Never trust client-side filtering**
  - Client-side filters có thể bị bypass
  - RLS là single source of truth
- ✅ **Default deny, explicit allow**
  - No policy = No access
  - Explicitly define what's allowed

**RLS Pattern:**
```sql
-- 1. Enable RLS
ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;

-- 2. SELECT Policy: Users can view tasks in their workspace
CREATE POLICY "Users can view tasks in their workspace"
  ON tasks
  FOR SELECT
  USING (
    workspace_id IN (
      SELECT workspace_id
      FROM workspace_members
      WHERE user_id = auth.uid()
    )
  );

-- 3. INSERT Policy: Users can insert tasks in their workspace
CREATE POLICY "Users can insert tasks in their workspace"
  ON tasks
  FOR INSERT
  WITH CHECK (
    workspace_id IN (
      SELECT workspace_id
      FROM workspace_members
      WHERE user_id = auth.uid()
    )
  );

-- 4. UPDATE Policy: Users can update tasks in their workspace
CREATE POLICY "Users can update tasks in their workspace"
  ON tasks
  FOR UPDATE
  USING (
    workspace_id IN (
      SELECT workspace_id
      FROM workspace_members
      WHERE user_id = auth.uid()
    )
  );

-- 5. DELETE Policy: Users can delete tasks in their workspace
CREATE POLICY "Users can delete tasks in their workspace"
  ON tasks
  FOR DELETE
  USING (
    workspace_id IN (
      SELECT workspace_id
      FROM workspace_members
      WHERE user_id = auth.uid()
    )
  );
```

**Testing RLS:**
```sql
-- Test as User A
SET LOCAL role authenticated;
SET LOCAL request.jwt.claim.sub = 'user-a-uuid';

SELECT * FROM tasks; -- Should only see User A's tasks

-- Test as User B
SET LOCAL request.jwt.claim.sub = 'user-b-uuid';

SELECT * FROM tasks; -- Should only see User B's tasks
```

**Tài liệu liên quan:**
- [Supabase RLS Guide](https://supabase.com/docs/guides/auth/row-level-security)
- [PostgreSQL RLS Documentation](https://www.postgresql.org/docs/current/ddl-rowsecurity.html)

---

### Nguyên tắc #30: Authentication

**Mô tả:**
Secure authentication đảm bảo only authorized users có thể access app.

**Quy tắc chi tiết:**
- ✅ **Never store passwords** (dùng Supabase Auth)
  - Passwords are hashed and stored by Supabase
  - Never log passwords
  - Never transmit passwords over insecure channels
- ✅ **OAuth preferred** (Google, GitHub)
  - Easier for users (no password to remember)
  - More secure (no password to leak)
  - Trusted providers (Google, GitHub)
- ✅ **Session management:** Supabase handles
  - JWT tokens stored in cookies
  - Auto-refresh tokens
  - Secure by default
- ✅ **Protect routes với middleware**
  - Check auth before rendering protected pages
  - Redirect to login nếu không authenticated

**Middleware Pattern:**
```typescript
// middleware.ts
import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  const response = NextResponse.next()

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name) {
          return request.cookies.get(name)?.value
        },
        set(name, value, options) {
          response.cookies.set({ name, value, ...options })
        },
        remove(name, options) {
          response.cookies.set({ name, value: '', ...options })
        },
      },
    }
  )

  // Check auth
  const { data: { session } } = await supabase.auth.getSession()

  // Redirect to login if not authenticated
  if (!session && request.nextUrl.pathname.startsWith('/app')) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  return response
}

export const config = {
  matcher: ['/app/:path*']
}
```

**OAuth Setup:**
```typescript
// Login with Google
import { supabase } from '@/lib/supabase/client'

async function signInWithGoogle() {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${window.location.origin}/auth/callback`,
    },
  })

  if (error) {
    toast.error('Failed to sign in with Google')
  }
}
```

**Tài liệu liên quan:**
- [Supabase Auth Documentation](https://supabase.com/docs/guides/auth)
- [Next.js Middleware](https://nextjs.org/docs/app/building-your-application/routing/middleware)

---

## IX. Learning & Growth (Học tập & Phát triển)

### Nguyên tắc #31: Continuous Learning

**Mô tả:**
Document learnings để không lặp lại mistakes và improve faster.

**Quy tắc chi tiết:**
- ✅ **Document learnings trong `TROUBLESHOOTING_LOG.md`**
  - Every bug encountered
  - Root cause analysis
  - Solution implemented
  - Lessons learned
- ✅ **Review AI-generated code** (hiểu, không chỉ copy)
  - Đọc code AI generate
  - Understand how it works
  - Ask AI to explain nếu không hiểu
  - Learn patterns và best practices
- ✅ **Read docs khi stuck**
  - Supabase docs
  - Next.js docs
  - Library documentation
  - GitHub issues
- ✅ **Join communities**
  - Next.js Discord
  - React Reddit
  - Supabase Community
  - AI coding communities

**Learning Workflow:**
```markdown
1. Encounter problem
   ↓
2. Try to solve (15 min)
   ↓
3. If stuck, search docs
   ↓
4. If still stuck, ask AI với specific question
   ↓
5. If AI can't help, ask community
   ↓
6. Document solution trong TROUBLESHOOTING_LOG.md
   ↓
7. Update AI_PRINCIPLES.md nếu học được new principle
```

**Learning Resources:**
- [Next.js Learn](https://nextjs.org/learn)
- [Supabase Docs](https://supabase.com/docs)
- [React Docs](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)

---

### Nguyên tắc #32: Feedback Loop

**Mô tả:**
Regular feedback từ users giúp build product people actually want.

**Quy tắc chi tiết:**
- ✅ **User interviews mỗi tuần** (Week 0-3)
  - 3-5 users per week
  - 30-minute interviews
  - Ask about pain points
  - Observe how they use app
- ✅ **Iterate based on feedback**
  - Prioritize feedback
  - Implement high-impact changes
  - Communicate changes to users
- ✅ **Track metrics:** Signups, Active users, NPS
  - Weekly active users (WAU)
  - Daily active users (DAU)
  - Net Promoter Score (NPS)
  - Feature usage analytics
- ✅ **GO/NO-GO decision Week 12**
  - Review all metrics
  - Review user feedback
  - Decide: Continue building or pivot?

**Feedback Collection:**
```typescript
// In-app feedback widget
import { MessageSquare } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function FeedbackButton() {
  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => window.open('https://forms.gle/YOUR_FORM', '_blank')}
    >
      <MessageSquare className="h-4 w-4 mr-2" />
      Give Feedback
    </Button>
  )
}
```

**Metrics Dashboard:**
```typescript
// Track feature usage
import { supabase } from '@/lib/supabase/client'

async function trackFeatureUsage(feature: string) {
  await supabase.from('analytics_events').insert({
    user_id: user.id,
    event_type: 'feature_usage',
    feature_name: feature,
    timestamp: new Date().toISOString(),
  })
}

// Usage
trackFeatureUsage('kanban_board')
trackFeatureUsage('task_created')
trackFeatureUsage('keyboard_shortcut_used')
```

**User Interview Template:**
```markdown
# User Interview Template

## Opening (5 min)
- Thank you for your time
- Purpose: Learn how you use NEXUS
- No right or wrong answers
- Feel free to be honest

## Background (5 min)
- How do you currently manage tasks?
- What tools do you use?
- What frustrates you about current tools?

## Usage (15 min)
- Show me how you would use NEXUS
- Think aloud - tell me what you're thinking
- What's confusing?
- What do you love?

## Closing (5 min)
- Would you pay for this? How much?
- Would you recommend to friends?
- Any other feedback?
```

---

## 📊 Statistics

**Total Principles:** 32
**Categories:** 9

**Breakdown by Category:**
- Development Principles: 5
- Code Conventions: 5
- Documentation Conventions: 4
- Deployment & Testing: 4
- AI Prompting: 3
- UI/UX: 4
- Project Management: 3
- Security: 2
- Learning: 2

---

## 🔗 Related Files

- [AI_PROMPTS.md](AI_PROMPTS.md) - AI prompt collection and templates
- [TROUBLESHOOTING_LOG.md](../04_technical/TROUBLESHOOTING_LOG.md) - Bug history and solutions
- [decisions.md](../04_technical/architecture/decisions.md) - Architecture Decision Records
- [ROADMAP.md](../03_roadmap/ROADMAP.md) - 12-week roadmap
- [THIS_WEEK.md](../01_status/THIS_WEEK.md) - Current week focus

---

## 📝 Usage Instructions

**Khi nào đọc file này:**
- Khi onboard vào dự án
- Khi viết code (reference conventions)
- Khi viết prompts cho AI
- Khi make architectural decisions
- Khi stuck và cần guidance

**Cách sử dụng:**
- Bookmark file này
- Ctrl+F để search principles
- Review mỗi tháng
- Update khi có new learnings

---

**Cập nhật lần cuối:** 13 tháng 11, 2025
**Tạo bởi:** NEXUS Team
**Maintain bởi:** Documentation QA Engineer
