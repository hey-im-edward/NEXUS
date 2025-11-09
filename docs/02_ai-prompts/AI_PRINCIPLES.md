# AI Principles & Development Conventions

> **Mục đích:** Định nghĩa các nguyên tắc vàng, best practices, và quy ước coding cho dự án NEXUS khi làm việc với AI-driven development.

**Tạo:** November 9, 2025
**Cập nhật lần cuối:** November 9, 2025

---

## 📖 Table of Contents

1. [Development Principles](#-development-principles)
2. [Code Conventions](#-code-conventions)
3. [Documentation Conventions](#️-documentation-conventions)
4. [Deployment & Testing](#-deployment--testing)
5. [AI Prompting Best Practices](#-ai-prompting-best-practices)
6. [UI/UX Principles](#-uiux-principles)
7. [Project Management](#-project-management)
8. [Security & Privacy](#-security--privacy)
9. [Learning & Growth](#-learning--growth)

---

## 🎯 Development Principles

### Principle #1: AI-Driven Development Workflow

**Philosophy:** Leverage AI để tăng tốc development, nhưng luôn hiểu code AI generate.

**Best Practices:**
- ✅ Luôn viết prompt chi tiết trước khi code
- ✅ Document prompts trong `docs/02_ai-prompts/AI_PROMPTS.md`
- ✅ Update `docs/02_ai-prompts/COMPLETED.md` sau khi xong feature
- ✅ Test code AI generate trước khi commit
- ✅ Review và understand code, không chỉ copy-paste

**Workflow:**
```
1. Write detailed prompt → 
2. AI generates code → 
3. Test code locally → 
4. Review & understand → 
5. Commit with meaningful message → 
6. Document in COMPLETED.md
```

**Evidence of Success:**
- Kanban board: 2 giờ với AI vs 1-2 ngày manual coding
- Tăng tốc 6-8x (12 tuần → 2 tuần POC)
- Code quality cao và consistent

---

### Principle #2: Optimistic UI Updates

**Philosophy:** Update UI immediately, sync với database sau để tạo UX mượt mà.

**Implementation Pattern:**
```typescript
// 1. Optimistic update (UI updates immediately)
set((state) => {
  const task = state.tasks.find(t => t.id === taskId)
  if (task) {
    task.completed = !task.completed
  }
})

// 2. Sync with Supabase
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
```

**When to Use:**
- ✅ Toggle checkboxes (complete/incomplete)
- ✅ Drag & drop operations
- ✅ Quick edits (title, due date)
- ❌ DELETE operations (ask confirmation first)
- ❌ Critical data (billing, permissions)

**Key Points:**
- Show toast notification khi error
- Always revert state nếu database update fails
- Use Zustand with Immer for clean state updates

---

### Principle #3: TypeScript Strict Mode

**Philosophy:** Type safety prevents bugs. No compromises.

**Rules:**
- ✅ Luôn dùng TypeScript strict mode
- ✅ Không dùng `any` (dùng `unknown` nếu thực sự cần)
- ✅ Define interfaces rõ ràng cho props, state, API responses
- ✅ Generate types từ Supabase: `npm run db:types`

**TypeScript Config:**
```json
// tsconfig.json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "strictFunctionTypes": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true
  }
}
```

**Type Definition Pattern:**
```typescript
// ✅ Good: Explicit types
interface TaskItemProps {
  task: Task
  workspaceId: string
  onToggle?: (taskId: string) => void
}

// ❌ Bad: Using 'any'
function TaskItem(props: any) { }

// ✅ Good: Unknown for third-party data
async function fetchData(url: string): Promise<unknown> {
  const response = await fetch(url)
  return response.json() // Type checked later
}
```

---

### Principle #4: Mobile-First Design

**Philosophy:** Design cho mobile trước, progressive enhancement cho desktop.

**Guidelines:**
- ✅ Design breakpoints: Mobile (< 640px) → Tablet (640-1024px) → Desktop (> 1024px)
- ✅ Touch-friendly buttons: minimum 44x44px (Apple HIG standard)
- ✅ Test trên Chrome DevTools mobile view
- ✅ Avoid hover-only interactions (không work trên mobile)

**Responsive Pattern:**
```tsx
// Mobile-first Tailwind classes
<button className="
  px-4 py-3           // Mobile: larger touch target
  md:px-3 md:py-2     // Desktop: smaller, mouse-friendly
  text-base           // Mobile: readable text
  md:text-sm          // Desktop: compact
">
  Create Task
</button>
```

**Testing Checklist:**
- [ ] Test on iPhone SE (small screen)
- [ ] Test on iPad (tablet)
- [ ] Test on desktop (1920px+)
- [ ] Test landscape and portrait orientations
- [ ] Test with touch interactions

---

### Principle #5: Performance First

**Philosophy:** Fast apps = Happy users. Optimize from the start.

**Key Strategies:**

#### 1. Lazy Loading
```tsx
// ✅ Lazy load heavy components
import { lazy, Suspense } from 'react'

const TiptapEditor = lazy(() => import('@/components/editor'))

function PageEditor() {
  return (
    <Suspense fallback={<EditorSkeleton />}>
      <TiptapEditor />
    </Suspense>
  )
}
```

#### 2. Debouncing
```tsx
// ✅ Debounce expensive operations
import { useDebouncedCallback } from 'use-debounce'

const debouncedSave = useDebouncedCallback(
  (value: string) => {
    saveToDatabase(value)
  },
  500 // 500ms delay
)
```

#### 3. Image Optimization
```tsx
// ✅ Use Next.js Image component
import Image from 'next/image'

<Image
  src="/avatar.jpg"
  alt="User avatar"
  width={40}
  height={40}
  loading="lazy" // Lazy load images
/>
```

#### 4. Code Splitting
```typescript
// next.config.ts
const config = {
  webpack: (config) => {
    config.optimization.splitChunks = {
      chunks: 'all',
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          priority: 10
        }
      }
    }
    return config
  }
}
```

**Performance Targets:**
- First Contentful Paint (FCP): < 1.8s
- Largest Contentful Paint (LCP): < 2.5s
- Time to Interactive (TTI): < 3.5s
- Lighthouse score: > 90

---

## 📝 Code Conventions

### Convention #1: File Naming

**Rules:**

| Type | Convention | Example |
|------|------------|---------|
| Components | PascalCase.tsx | `TaskItem.tsx` |
| Hooks | use-kebab-case.ts | `use-tasks.ts` |
| Utils | kebab-case.ts | `date-utils.ts` |
| Types | PascalCase.types.ts | `Task.types.ts` |
| Constants | UPPER_SNAKE_CASE.ts | `API_ROUTES.ts` |

**Examples:**
```
components/
  tasks/
    TaskItem.tsx          ✅ PascalCase component
    TaskList.tsx          ✅ PascalCase component
    task-utils.ts         ✅ kebab-case utility
lib/
  hooks/
    use-tasks.ts          ✅ kebab-case hook
    use-workspace.ts      ✅ kebab-case hook
  utils/
    date-utils.ts         ✅ kebab-case utility
    string-helpers.ts     ✅ kebab-case utility
types/
  Task.types.ts           ✅ PascalCase types
  Database.types.ts       ✅ PascalCase types
```

---

### Convention #2: Component Structure

**Template:**
```tsx
// 1. Imports (React → Third-party → Internal → Relative)
import { useState, useEffect } from 'react'
import { create } from 'zustand'
import { supabase } from '@/lib/supabase/client'
import type { Task } from '@/types'
import { TaskItem } from './task-item'

// 2. Types/Interfaces
interface TaskListProps {
  workspaceId: string
  onTaskClick?: (task: Task) => void
}

// 3. Constants (if needed)
const DEFAULT_PAGE_SIZE = 20

// 4. Main component (export default function, not const)
export default function TaskList({ workspaceId, onTaskClick }: TaskListProps) {
  // 4a. State
  const [tasks, setTasks] = useState<Task[]>([])
  
  // 4b. Effects
  useEffect(() => {
    fetchTasks()
  }, [workspaceId])
  
  // 4c. Event handlers
  const handleTaskClick = (task: Task) => {
    onTaskClick?.(task)
  }
  
  // 4d. Render
  return (
    <div>
      {tasks.map(task => (
        <TaskItem 
          key={task.id} 
          task={task} 
          onClick={handleTaskClick}
        />
      ))}
    </div>
  )
}

// 5. Helper components (if small and only used here)
function TaskSkeleton() {
  return <div>Loading...</div>
}
```

**Client vs Server Components:**
```tsx
// ✅ Client component (needs interactivity)
'use client'

import { useState } from 'react'

export default function TaskList() {
  const [tasks, setTasks] = useState([])
  return <div>{/* ... */}</div>
}

// ✅ Server component (no interactivity, fetch data)
import { supabase } from '@/lib/supabase/server'

export default async function TaskList() {
  const { data: tasks } = await supabase.from('tasks').select()
  return <div>{/* ... */}</div>
}
```

---

### Convention #3: Import Order

**Standard Order:**
```typescript
// 1. React imports
import { useState, useEffect, type FC } from 'react'

// 2. Third-party imports (alphabetical)
import { create } from 'zustand'
import { format } from 'date-fns'
import { toast } from 'sonner'

// 3. Internal imports (alphabetical by folder)
import { supabase } from '@/lib/supabase/client'
import { cn } from '@/lib/utils'
import type { Task, Project } from '@/types'

// 4. Relative imports
import { TaskItem } from './task-item'
import { EmptyState } from '../ui/empty-state'
```

**Why this order?**
- React first (most important)
- Third-party next (external dependencies)
- Internal next (project code)
- Relative last (local files)

---

### Convention #4: Comments

**Guidelines:**

| Scenario | Language | Format |
|----------|----------|--------|
| Complex business logic | Tiếng Việt | `// Giải thích tại sao, không phải cái gì` |
| Public APIs | English | `/** JSDoc */` |
| TODO items | English | `// TODO: Description` |
| FIXME items | English | `// FIXME: Bug description` |

**Examples:**
```typescript
// ✅ Good: Explains WHY, not WHAT
// Dùng debounce để tránh spam Supabase API khi user type nhanh
const debouncedSave = useDebouncedCallback(saveToDatabase, 500)

// ❌ Bad: States the obvious
// Create a debounced callback
const debouncedSave = useDebouncedCallback(saveToDatabase, 500)

// ✅ Good: JSDoc for public API
/**
 * Fetch tasks for a specific workspace
 * @param workspaceId - The workspace UUID
 * @returns Promise<Task[]>
 */
export async function fetchTasks(workspaceId: string): Promise<Task[]> {
  // Implementation
}

// ✅ Good: TODO with context
// TODO: Replace hardcoded workspace_id with useWorkspace() hook
const workspace_id = "c6be91ba-98c3-43e5-8e5e-94e389894fa6"

// ✅ Good: FIXME with priority
// FIXME: HIGH - Tasks disappear after complete (Bug #2)
const incompleteTasks = tasks.filter(t => !t.completed)
```

---

### Convention #5: Error Handling

**Async Functions:**
```typescript
// ✅ Good: Try-catch with user-friendly messages
async function deleteTask(taskId: string) {
  try {
    const { error } = await supabase
      .from('tasks')
      .delete()
      .eq('id', taskId)
    
    if (error) throw error
    
    toast.success('Task deleted')
  } catch (error) {
    console.error('Failed to delete task:', error)
    toast.error('Could not delete task. Please try again.')
  }
}

// ❌ Bad: Silent failure
async function deleteTask(taskId: string) {
  const { error } = await supabase
    .from('tasks')
    .delete()
    .eq('id', taskId)
  // Error is ignored!
}
```

**Error Boundaries:**
```tsx
// ✅ Use Error Boundaries for component errors
import { ErrorBoundary } from '@/components/error-boundary'

<ErrorBoundary fallback={<ErrorMessage />}>
  <TaskList />
</ErrorBoundary>
```

**Principles:**
- Never swallow errors silently
- Show user-friendly messages (không show raw error)
- Log errors to console (dev) hoặc Sentry (production)
- Provide recovery options when possible

---

## 🗂️ Documentation Conventions

### Convention #6: Documentation Language

**Rules:**

| Document Type | Language | Reason |
|--------------|----------|---------|
| User-facing docs | **Tiếng Việt** | Primary audience is Vietnamese users |
| Technical docs | **Flexible** | English or Tiếng Việt, whatever clearer |
| Code comments | **Tiếng Việt** | Complex logic easier to explain in native language |
| Commit messages | **English** | Industry standard |
| API documentation | **English** | JSDoc standard |

**Examples:**
```
QUICKSTART_AI.md        → Tiếng Việt (user-facing)
FEATURES.md             → Tiếng Việt (user-facing)
SETUP.md                → Tiếng Việt (technical, but OK)
architecture/decisions.md → English/Tiếng Việt mix (technical)
Commit: "feat(tasks): add inline edit" → English
```

---

### Convention #7: Documentation Structure

**Folder Organization:**

```
docs/
  00_start-here/       # Entry point, daily workflow
    README.md          # Documentation overview
    QUICKSTART_AI.md   # Quick start guide
    PROJECT_STRUCTURE.md
    TECH_STACK.md
    
  01_status/           # Current state
    NOW.md             # What's happening now
    THIS_WEEK.md       # This week's priorities
    FEATURES.md        # Feature list
    BUGS.md            # Known bugs
    UI_UX.md           # UI/UX decisions
    
  02_ai-prompts/       # AI prompts và templates
    AI_PROMPTS.md      # Prompt library
    AI_PRINCIPLES.md   # This file
    COMPLETED.md       # Completed prompts
    templates/         # Reusable templates
    
  03_roadmap/          # Planning
    ROADMAP.md         # Project roadmap
    IDEAS.md           # Ideas backlog
    HISTORY.md         # Project timeline
    PROJECT_STATUS.md  # Overall status
    
  04_technical/        # Technical docs
    SETUP.md
    DEPLOY.md
    TESTING_STRATEGY.md
    TROUBLESHOOTING_LOG.md
    architecture/      # Architecture docs
      decisions.md
      database-schema.sql
      migrations/
      
  05_research/         # User research
    user-personas.md
    interview-script.md
    success-metrics.md
    interview-notes/
```

**Why numbered folders?**
- Auto-sort theo logical order
- Clear hierarchy (00 = start, 01 = current status, etc.)
- Easier navigation for AI and humans

---

### Convention #8: Daily Workflow

**Morning Routine:**
```
1. Mở VS Code
2. Đọc docs/00_start-here/QUICKSTART_AI.md
3. Check docs/01_status/NOW.md → Biết priority hôm nay
4. Check docs/01_status/BUGS.md → Aware của issues
5. Start coding!
```

**Khi Code:**
```
1. Mở docs/02_ai-prompts/AI_PROMPTS.md
2. Copy template phù hợp (bug-fix, task-feature, ui-component)
3. Fill in details
4. Generate code với AI
5. Test code
```

**Evening Routine:**
```
1. Update docs/02_ai-prompts/COMPLETED.md (ghi lại prompt đã dùng)
2. Update docs/01_status/FEATURES.md (nếu có feature mới)
3. Update docs/01_status/BUGS.md (nếu fix bug hoặc phát hiện bug mới)
4. Commit code với meaningful message
```

**Weekly Routine (Monday):**
```
1. Review last week trong docs/01_status/THIS_WEEK.md
2. Update docs/03_roadmap/HISTORY.md (major milestones)
3. Plan this week trong docs/01_status/THIS_WEEK.md
4. Update docs/03_roadmap/PROJECT_STATUS.md
```

---

### Convention #9: File Naming (Documentation)

**Rules:**

| Type | Convention | Example |
|------|------------|---------|
| Important docs | UPPERCASE.md | `README.md`, `NOW.md` |
| Regular docs | PascalCase.md | `ProjectStructure.md` |
| Folders | lowercase + numbered prefix | `00_start-here/`, `01_status/` |
| Archives | lowercase | `old-versions/`, `temp-fixes/` |

---

## 🚀 Deployment & Testing

### Convention #10: Git Workflow

**Branch Naming:**
```
feature/feature-name    ✅ feature/kanban-board
fix/bug-name            ✅ fix/hardcoded-workspace-id
docs/update-name        ✅ docs/refactor-and-integrate-knowledge
chore/task-name         ✅ chore/update-dependencies
```

**Commit Messages (Conventional Commits):**
```
type(scope): message

Types:
- feat: New feature
- fix: Bug fix
- docs: Documentation only
- style: Formatting, missing semicolons, etc.
- refactor: Code change that neither fixes bug nor adds feature
- test: Adding tests
- chore: Updating build tasks, configs, etc.

Examples:
✅ feat(tasks): add inline edit functionality
✅ fix(kanban): resolve drag and drop bug
✅ docs(ai-prompts): add troubleshooting section
✅ style(tasks): format with prettier
✅ refactor(hooks): simplify use-tasks hook
✅ test(tasks): add unit tests for task store
✅ chore(deps): update next.js to 16.0.1
```

**Git Commands:**
```bash
# ✅ Always use git mv when moving files
git mv old/path/file.md new/path/file.md

# ✅ Meaningful commit messages
git commit -m "feat(tasks): add recurring tasks support"

# ❌ Avoid generic messages
git commit -m "update files"
git commit -m "fix bug"
```

---

### Convention #11: Testing Strategy

**Testing Pyramid:**
```
     /\
    /E2E\         ← 10% (Critical flows)
   /------\
  /Integration\   ← 30% (Component + DB)
 /------------\
/  Unit Tests  \  ← 60% (Hooks, utils, pure functions)
----------------
```

**What to Test:**

1. **Unit Tests (Vitest):**
   ```typescript
   // ✅ Test hooks
   test('useTaskStore toggles task', () => {
     const { toggleTask } = useTaskStore.getState()
     // Test logic
   })
   
   // ✅ Test utils
   test('formatDate formats ISO string correctly', () => {
     expect(formatDate('2025-11-09')).toBe('Nov 9, 2025')
   })
   ```

2. **Integration Tests (React Testing Library):**
   ```typescript
   // ✅ Test component + Supabase interaction
   test('TaskList fetches and displays tasks', async () => {
     render(<TaskList workspaceId="uuid" />)
     await waitFor(() => {
       expect(screen.getByText('Buy milk')).toBeInTheDocument()
     })
   })
   ```

3. **E2E Tests (Playwright):**
   ```typescript
   // ✅ Test critical user flows
   test('user can create and complete task', async ({ page }) => {
     await page.goto('/today')
     await page.click('text=Create task')
     await page.fill('input[name="title"]', 'Buy milk')
     await page.click('button:has-text("Save")')
     await page.check('input[type="checkbox"]')
     await expect(page.locator('.task.completed')).toBeVisible()
   })
   ```

**Coverage Target:**
- Overall: 70%+
- Critical paths (auth, task CRUD): 90%+
- UI components: 50%+ (testing interactions, not styling)

**Manual Testing Checklist:**
- [ ] Test trên Chrome
- [ ] Test trên Firefox
- [ ] Test trên Safari
- [ ] Test on mobile (iOS Safari, Chrome Android)
- [ ] Test with slow 3G network (Chrome DevTools)

---

### Convention #12: Database Migrations

**Migration Files:**
```
docs/04_technical/architecture/migrations/
  001_initial_schema.sql
  002_add_recurring_tasks.sql
  003_add_documents_table.sql
```

**Naming Pattern:**
```
XXX_description.sql

XXX = Sequential number (001, 002, 003...)
description = Short kebab-case description
```

**Migration Template:**
```sql
-- Migration: 002_add_recurring_tasks
-- Created: 2025-11-09
-- Description: Add support for recurring tasks using rrule

-- 1. Add new columns
ALTER TABLE tasks 
ADD COLUMN recurrence_rule TEXT,
ADD COLUMN recurrence_end_date TIMESTAMPTZ;

-- 2. Add indexes
CREATE INDEX idx_tasks_recurrence ON tasks(recurrence_rule) 
WHERE recurrence_rule IS NOT NULL;

-- 3. Update RLS policies if needed
-- (No changes needed for this migration)

-- Rollback:
-- ALTER TABLE tasks DROP COLUMN recurrence_rule, DROP COLUMN recurrence_end_date;
-- DROP INDEX idx_tasks_recurrence;
```

**Best Practices:**
- ✅ Test migration trên local database trước
- ✅ Backup production database trước khi run migration
- ✅ Include rollback instructions trong comments
- ✅ Run migrations trong transaction (nếu database hỗ trợ)

---

### Convention #13: Environment Variables

**File Structure:**
```
.env.local              ← Never commit (gitignore)
.env.local.example      ← Commit this (template)
```

**.env.local.example:**
```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Analytics (Optional)
NEXT_PUBLIC_GOOGLE_ANALYTICS_ID=
```

**Rules:**
- ✅ Use `NEXT_PUBLIC_` prefix cho client-side variables
- ✅ Document mỗi variable trong README hoặc example file
- ✅ Never commit `.env.local` (add to .gitignore)
- ✅ Always provide `.env.local.example` template

---

## 💡 AI Prompting Best Practices

### Principle #19: Good Prompt Structure

**Template:**
```markdown
Create [Component/Feature Name] for NEXUS Productivity OS.

**Context:**
- Project: NEXUS - Notion-like productivity OS
- Stack: Next.js 16 (App Router), React 19, TypeScript, Supabase, Zustand, TailwindCSS, shadcn/ui
- File location: [exact path]

**Requirements:**
1. [Specific requirement 1]
2. [Specific requirement 2]
3. [Specific requirement 3]

**State Management:**
[Zustand pattern, if needed]

**Database:**
[Supabase schema, if needed]

**Styling:**
- Use shadcn/ui components
- Mobile-first responsive (Tailwind)
- Follow design system

**Accessibility:**
- ARIA labels
- Keyboard navigation
- Focus management

**Expected Output:**
- Component file with full implementation
- TypeScript types (if needed)
- Usage example

**Constraints:**
- Supabase free tier (no Edge Functions yet)
- Mobile-first design
- Performance-optimized
```

**Example (Actual Prompt):**
```markdown
Create TaskList component for NEXUS Productivity OS.

**Context:**
- Project: NEXUS - Notion-like productivity OS
- Stack: Next.js 16, React 19, TypeScript, Supabase, Zustand, TailwindCSS
- File location: components/tasks/TaskList.tsx

**Requirements:**
1. Display list of tasks from Zustand store
2. Support checkbox toggle (optimistic updates)
3. Inline edit on double-click
4. Show empty state when no tasks
5. Keyboard navigation (j/k to move, x to toggle)

**State Management:**
- Use useTaskStore from @/lib/stores/tasks
- Optimistic updates pattern (update UI → sync DB → revert on error)

**Database:**
- Fetch from 'tasks' table
- Filter by workspace_id
- Order by position

**Styling:**
- Use shadcn/ui Checkbox component
- Tailwind for responsive layout
- Hover effects on task items

**Expected Output:**
- components/tasks/TaskList.tsx (main component)
- types/Task.types.ts (if new types needed)
- Usage example in page component
```

---

### Principle #20: When AI Makes Mistakes

**Don't Regenerate Immediately:**
```
❌ Bad: "That's wrong, try again"
✅ Good: "The code has an error on line 15: 
         'workspace_id' does not exist on User type. 
         Please fetch workspace_id from workspace_members table instead."
```

**Provide Specific Feedback:**
```markdown
The generated code has the following issues:

1. **TypeError on line 15:** 
   `user.workspace_id` does not exist. 
   Solution: Fetch from `workspace_members` table.

2. **Missing error handling:** 
   Supabase query doesn't handle errors.
   Solution: Add try-catch and show toast on error.

3. **Performance issue:** 
   Component re-renders on every state change.
   Solution: Memoize expensive computations with useMemo.

Please fix these issues.
```

**Ask AI to Explain:**
```
"Can you explain why you used useEffect here instead of 
 React Server Components for data fetching?"
```

---

### Principle #21: Prompt Reusability

**Save Good Prompts:**
- Document trong `docs/02_ai-prompts/AI_PROMPTS.md`
- Create templates trong `docs/02_ai-prompts/templates/`
- Update prompts based on learnings

**Template Library:**
```
docs/02_ai-prompts/templates/
  bug-fix.md          ← Bug fix prompt template
  task-feature.md     ← Feature prompt template
  ui-component.md     ← UI component prompt template
  database-query.md   ← Database query prompt template
```

**Evolution:**
```
Prompt v1 → Test → Works but has bugs → 
Prompt v2 (improved) → Test → Works perfectly → 
Save to AI_PROMPTS.md
```

---

## 🎨 UI/UX Principles

### Principle #22: Design System

**Component Library:** shadcn/ui (Radix UI + Tailwind)

**Color Palette:**
```typescript
// Tailwind default palette
primary: 'blue'    // Buttons, links
success: 'green'   // Success states
warning: 'yellow'  // Warnings
danger: 'red'      // Destructive actions
neutral: 'gray'    // Text, borders
```

**Spacing Scale (Tailwind):**
```
px-2  = 0.5rem (8px)   // Tight spacing
px-4  = 1rem   (16px)  // Default spacing
px-6  = 1.5rem (24px)  // Medium spacing
px-8  = 2rem   (32px)  // Large spacing

gap-2 = 0.5rem         // Between small items
gap-4 = 1rem           // Between regular items
```

**Typography:**
```
Font: Inter (default) or system font
text-xs   = 0.75rem (12px)  // Captions
text-sm   = 0.875rem (14px) // Body text (default)
text-base = 1rem (16px)     // Emphasized text
text-lg   = 1.125rem (18px) // Headings
text-xl   = 1.25rem (20px)  // Large headings
```

---

### Principle #23: Keyboard Shortcuts

**Global Shortcuts:**
```
Cmd/Ctrl + K   → Open command palette
C              → Create new task
/              → Focus search
Esc            → Close modal/cancel
```

**Task List Navigation:**
```
j / ↓          → Move down
k / ↑          → Move up
x              → Toggle complete
Enter          → Edit task
d              → Delete task (with confirmation)
```

**Implementation:**
```tsx
useEffect(() => {
  const handleKeyPress = (e: KeyboardEvent) => {
    // Ignore if typing in input
    if (e.target instanceof HTMLInputElement) return
    
    switch(e.key) {
      case 'j':
      case 'ArrowDown':
        moveDown()
        break
      case 'k':
      case 'ArrowUp':
        moveUp()
        break
      case 'x':
        toggleCurrent()
        break
      case 'c':
        createTask()
        break
    }
  }
  
  window.addEventListener('keydown', handleKeyPress)
  return () => window.removeEventListener('keydown', handleKeyPress)
}, [])
```

---

### Principle #24: Loading States

**Rules:**
- ✅ Always show skeleton hoặc spinner khi loading
- ✅ Never white screen
- ✅ Optimistic UI > Loading spinners (update UI immediately)
- ✅ Minimum 200ms loading state (tránh flicker cho fast networks)

**Implementation:**
```tsx
function TaskList() {
  const { tasks, isLoading } = useTasks()
  const [showSkeleton, setShowSkeleton] = useState(true)
  
  useEffect(() => {
    if (!isLoading) {
      // Wait 200ms before hiding skeleton (avoid flicker)
      const timer = setTimeout(() => setShowSkeleton(false), 200)
      return () => clearTimeout(timer)
    }
  }, [isLoading])
  
  if (showSkeleton) {
    return <TaskListSkeleton />
  }
  
  return <div>{/* Actual tasks */}</div>
}
```

---

### Principle #25: Empty States

**Guidelines:**
- ✅ Helpful message + Call to Action
- ✅ Icon hoặc illustration (undraw.co, Storyset)
- ✅ Guide user về next action

**Example:**
```tsx
function EmptyTaskList() {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <img src="/empty-tasks.svg" alt="" className="w-48 h-48 mb-4" />
      <h3 className="text-lg font-semibold mb-2">No tasks yet</h3>
      <p className="text-sm text-gray-500 mb-4">
        Get started by creating your first task
      </p>
      <button 
        onClick={createTask}
        className="px-4 py-2 bg-blue-500 text-white rounded"
      >
        Create Task
      </button>
      <p className="text-xs text-gray-400 mt-2">
        Or press <kbd>C</kbd> to create
      </p>
    </div>
  )
}
```

---

## 📊 Project Management

### Principle #26: Feature Prioritization (MoSCoW)

**Must Have (MVP):**
- ✅ Task CRUD
- ✅ Kanban board
- ✅ Smart lists (Today/Inbox/Upcoming)
- ✅ Basic auth

**Should Have:**
- 🔄 Calendar view
- 🔄 Projects
- 🔄 Search

**Could Have:**
- ⏳ Pages (Notion-like documents)
- ⏳ Recurring tasks
- ⏳ App Minis

**Won't Have (For MVP):**
- ❌ Team collaboration
- ❌ Integrations (Slack, Google Calendar)
- ❌ Mobile app
- ❌ AI features

---

### Principle #27: Weekly Rhythm

**Monday (Week Planning):**
1. Review last week trong `docs/01_status/THIS_WEEK.md`
2. Update `docs/03_roadmap/HISTORY.md` (major milestones)
3. Plan this week priorities
4. Update `docs/03_roadmap/PROJECT_STATUS.md`

**Daily:**
- **Morning:** Read `QUICKSTART_AI.md`, check `NOW.md`
- **Evening:** Update `COMPLETED.md`, `FEATURES.md`, commit code

**Friday (Week Review):**
1. Review what got done
2. Update `docs/01_status/NOW.md`
3. Document learnings trong `HISTORY.md`

**Sunday (Prep for next week):**
1. Review `IDEAS.md` for inspiration
2. Plan Monday priorities
3. Rest!

---

### Principle #28: Decision Making

**Document Major Decisions:**
- File: `docs/03_roadmap/HISTORY.md`
- Format: Date, Decision, Reason, Pros/Cons, Result

**Example:**
```markdown
## Nov 8, 2025: Switched from Redux to Zustand

**Decision:** Use Zustand for state management

**Reason:** Redux too complex for small team

**Pros:**
- 10x less boilerplate
- Easier optimistic updates
- Better TypeScript support

**Cons:**
- Less ecosystem (fewer middlewares)
- Team might not know Zustand

**Result:** ✅ Great decision - development faster
```

---

## 🔐 Security & Privacy

### Principle #29: Row Level Security (RLS)

**Always Enable RLS:**
```sql
-- ✅ Enable RLS on all tables
ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE workspace_members ENABLE ROW LEVEL SECURITY;
```

**Default Deny Policy:**
```sql
-- Start with: No access
-- Then: Explicitly allow specific actions

-- Users can only view tasks in their workspace
CREATE POLICY "Users can view tasks in their workspace"
  ON tasks FOR SELECT
  USING (
    workspace_id IN (
      SELECT workspace_id 
      FROM workspace_members 
      WHERE user_id = auth.uid()
    )
  );
```

**Test RLS Policies:**
```sql
-- Test as specific user
SET LOCAL role TO authenticated;
SET LOCAL request.jwt.claim.sub TO 'user-uuid';

-- Try to access data
SELECT * FROM tasks; -- Should only see user's tasks
```

---

### Principle #30: Authentication

**Best Practices:**
- ✅ Never store passwords (use Supabase Auth)
- ✅ OAuth preferred (Google, GitHub)
- ✅ Session management: Let Supabase handle it
- ✅ Protect routes với middleware

**Middleware Pattern:**
```typescript
// middleware.ts
export async function middleware(request: NextRequest) {
  const supabase = createMiddlewareClient({ req: request })
  const { data: { session } } = await supabase.auth.getSession()
  
  // Redirect to login if not authenticated
  if (!session && request.nextUrl.pathname.startsWith('/app')) {
    return NextResponse.redirect(new URL('/login', request.url))
  }
  
  return NextResponse.next()
}
```

---

## 🎓 Learning & Growth

### Principle #31: Continuous Learning

**Document Learnings:**
- File: `docs/03_roadmap/HISTORY.md`
- When: After completing features, fixing bugs, making decisions

**Review AI-Generated Code:**
```
Don't just copy-paste AI code!

1. Read the code
2. Understand what it does
3. Ask yourself: "Could this be simpler?"
4. Learn new patterns
5. Apply to future code
```

**Resources:**
- Supabase docs (khi stuck)
- Next.js docs (App Router patterns)
- React docs (hooks, Server Components)
- Zustand docs (state management)

---

### Principle #32: Feedback Loop

**User Interviews:**
- Week 0-3: Mỗi tuần (validate MVP)
- Week 4-8: Mỗi 2 tuần (iterate)
- Week 9-12: Final testing

**Metrics to Track:**
- Signups (goal: 100 beta users)
- Active users (goal: 50 WAU)
- Task creation rate
- NPS (Net Promoter Score)

**GO/NO-GO Decision (Week 12):**
```
GO if:
- 50+ active users
- NPS > 30
- Positive feedback on core features

NO-GO if:
- <20 active users
- NPS < 0
- Major complaints about core UX
```

---

## 📝 Summary

**Total Principles:** 32

**Breakdown:**
- Development Principles: 5
- Code Conventions: 5
- Documentation Conventions: 4
- Deployment & Testing: 4
- AI Prompting: 3
- UI/UX Principles: 4
- Project Management: 3
- Security & Privacy: 2
- Learning & Growth: 2

---

## 🔗 Related Files

- `docs/02_ai-prompts/AI_PROMPTS.md` - Prompt library
- `docs/02_ai-prompts/COMPLETED.md` - Completed prompts log
- `docs/02_ai-prompts/templates/` - Prompt templates
- `docs/00_start-here/QUICKSTART_AI.md` - Daily workflow
- `docs/04_technical/TROUBLESHOOTING_LOG.md` - Bug tracking
- `docs/03_roadmap/HISTORY.md` - Decision history

---

**Usage:**
- Reference này khi bắt đầu code
- Share với team members mới
- Update khi có new learnings
- Review quarterly để ensure compliance

**Next Update:** As needed (new principles, refined conventions)
