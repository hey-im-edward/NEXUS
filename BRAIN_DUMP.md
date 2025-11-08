# BRAIN DUMP - Tổng hợp Kiến thức Dự án NEXUS

> **Mục đích:** Lưu trữ toàn bộ kiến thức, quyết định, và kinh nghiệm từ quá trình phát triển dự án NEXUS từ tháng 10-11/2025.

**Tạo:** November 9, 2025
**Nguồn:** Tổng hợp từ cuộc hội thoại AI-driven development

---

## 1. Các Quyết định Kiến trúc Quan trọng (Architecture Decision Records - ADRs)

### **ADR-001: Chọn Supabase thay vì NestJS Backend**

* **Quyết định:** Sử dụng Supabase (BaaS) thay vì xây dựng backend riêng với NestJS
* **Ngày quyết định:** Tháng 10, 2025
* **Lý do/Bối cảnh:**
  * Cần triển khai nhanh MVP trong 12 tuần
  * Đội ngũ nhỏ (1 developer) + AI-driven development
  * Free tier Supabase đủ cho 500-1000 users đầu tiên
* **Ưu điểm:**
  * Auth, Database, Real-time out-of-the-box
  * PostgreSQL với Row Level Security (RLS)
  * Không cần setup DevOps, server, deploy backend
  * AI-friendly: Dễ generate code với Copilot/ChatGPT
  * Tiết kiệm 2-3 tuần development time
  * $0/month cost cho POC phase
* **Nhược điểm/Rủi ro:**
  * Vendor lock-in (khó migrate sang backend khác)
  * Giới hạn về custom business logic (phải handle ở frontend/Edge Functions)
  * Performance có thể kém hơn custom backend khi scale lớn
* **Kết quả:** ✅ Quyết định đúng - Database deployed trong 1 ngày, auth working ngay

---

### **ADR-002: Chọn Zustand + Immer thay vì Redux**

* **Quyết định:** Dùng Zustand với Immer middleware cho state management
* **Ngày quyết định:** Tháng 10, 2025
* **Lý do/Bối cảnh:**
  * Redux quá phức tạp cho dự án nhỏ (actions, reducers, boilerplate)
  * Cần optimistic updates cho UX tốt hơn
  * Context API không đủ mạnh cho complex state
* **Ưu điểm:**
  * Code gọn hơn Redux 10x (không cần actions, reducers)
  * Immer cho phép mutate state một cách immutable
  * TypeScript support tốt
  * Dễ implement optimistic updates
  * Bundle size nhỏ (~2KB)
* **Nhược điểm/Rủi ro:**
  * Ít được sử dụng rộng rãi hơn Redux (ít tài liệu)
  * Không có DevTools mạnh như Redux DevTools
  * Team mới có thể khó học
* **Kết quả:** ✅ Hoạt động tốt - Task updates cực nhanh với optimistic UI

---

### **ADR-003: Chọn AI-Driven Development Workflow**

* **Quyết định:** Sử dụng AI (ChatGPT, Claude, Copilot) để generate phần lớn code
* **Ngày quyết định:** Tháng 10, 2025 (sau khi test thử)
* **Lý do/Bối cảnh:**
  * Kanban board test: 2 giờ với AI vs 1-2 ngày manual coding
  * Developer làm việc một mình, cần tăng tốc
  * AI code quality tốt nếu prompt đúng
* **Ưu điểm:**
  * Tăng tốc 6-8x (12 tuần → 2 tuần POC)
  * Code consistent (AI follow patterns)
  * Học được best practices từ AI
  * Focus vào product, không stuck ở implementation details
* **Nhược điểm/Rủi ro:**
  * Phụ thuộc vào chất lượng prompts
  * Cần hiểu code AI generate để debug
  * Đôi khi AI generate sai, phải fix manual
  * Không học sâu về implementation
* **Nguyên tắc áp dụng:**
  * Viết prompt chi tiết (context, stack, requirements)
  * Luôn test code AI generate
  * Document lại prompts trong `AI_PROMPTS.md`
  * Update `COMPLETED.md` sau mỗi prompt
* **Kết quả:** ✅ Game-changer - Kanban board done trong 2h, chất lượng cao

---

### **ADR-004: Chọn Next.js App Router (không phải Pages Router)**

* **Quyết định:** Dùng Next.js 16 App Router với React Server Components
* **Ngày quyết định:** Tháng 10, 2025
* **Lý do/Bối cảnh:**
  * App Router là future của Next.js
  * Server Components giúp giảm bundle size
  * Better DX với nested layouts
* **Ưu điểm:**
  * Faster page loads (RSC)
  * Layouts reuse dễ dàng hơn
  * Data fetching tốt hơn
  * SEO friendly
* **Nhược điểm/Rủi ro:**
  * Learning curve cao hơn Pages Router
  * Client/Server Components phải phân biệt rõ
  * Một số thư viện chưa support RSC
* **Kết quả:** ✅ Hoạt động tốt, nested layout cho productivity routes rất tiện

---

### **ADR-005: Chọn Tiptap thay vì Slate/Draft.js cho Rich Text Editor**

* **Quyết định:** Dùng Tiptap cho Pages editor (Notion-like)
* **Ngày quyết định:** Tháng 10, 2025
* **Lý do/Bối cảnh:**
  * Cần editor giống Notion (clean, extensible)
  * Slate quá low-level, Draft.js deprecated
* **Ưu điểm:**
  * Modular, dễ thêm extensions
  * TypeScript support tốt
  * Documentation đầy đủ
  * Active community
* **Nhược điểm/Rủi ro:**
  * Bundle size lớn hơn plain textarea
  * Cần lazy load để tránh slow down app
* **Kết quả:** ✅ Editor demo working, cần optimize lazy loading

---

### **ADR-006: Chọn @dnd-kit thay vì react-beautiful-dnd**

* **Quyết định:** Dùng @dnd-kit cho Kanban drag & drop
* **Ngày quyết định:** November 2025
* **Lý do/Bối cảnh:**
  * react-beautiful-dnd không support React 18+ strict mode
  * @dnd-kit modern, TypeScript-first
* **Ưu điểm:**
  * React 19 compatible
  * Modular (chỉ import những gì cần)
  * Touch support tốt (mobile)
  * Accessibility built-in
* **Nhược điểm/Rủi ro:**
  * API phức tạp hơn react-beautiful-dnd
  * Cần học cách setup sensors, collision detection
* **Kết quả:** ✅ Kanban drag-drop hoạt động smooth

---

### **ADR-007: Chọn rrule thay vì tự code recurring logic**

* **Quyết định:** Dùng rrule library (RFC-5545 standard) cho recurring tasks
* **Ngày quyết định:** Tháng 10, 2025
* **Lý do/Bối cảnh:**
  * Recurring tasks rất phức tạp (every 2 days, last Friday of month, etc.)
  * Không nên reinvent the wheel
* **Ưu điểm:**
  * Industry standard (Google Calendar, Apple Calendar dùng)
  * Handle mọi edge cases (leap year, timezone, etc.)
  * TypeScript support
* **Nhược điểm/Rủi ro:**
  * Syntax khó đọc (FREQ=DAILY;INTERVAL=2)
  * Cần helper function để convert sang human-readable
* **Kết quả:** ⏳ Chưa implement (planned Week 1)

---

### **ADR-008: Chọn Numbered Folder Structure cho Documentation**

* **Quyết định:** Đổi tên folders thành `00_start-here`, `01_status`, `02_ai-prompts`, etc.
* **Ngày quyết định:** November 8, 2025
* **Lý do/Bối cảnh:**
  * 31 files .md lộn xộn, khó tìm
  * AI và người dùng cần structure rõ ràng
  * Alphabetical sort không phản ánh logical order
* **Ưu điểm:**
  * Auto-sort theo thứ tự logic
  * Dễ navigate cho AI và humans
  * Clear hierarchy (00 = start, 01 = status, etc.)
* **Nhược điểm/Rủi ro:**
  * Breaking links (phải update tất cả references)
  * Folder names dài hơn
* **Kết quả:** ✅ Documentation rõ ràng hơn nhiều, navigation dễ dàng

---

## 2. Nhật ký Gỡ lỗi (Troubleshooting Log)

### **Bug #1: Hardcoded workspace_id trong task pages**

* **Vấn đề:** Task pages dùng hardcoded `workspace_id` thay vì lấy từ user context
* **Triệu chứng:**
  * File: `app/(productivity)/today/page.tsx` line 15
  * Code: `const workspace_id = "c6be91ba-98c3-43e5-8e5e-94e389894fa6"`
  * Tasks không load cho users khác
* **Nguyên nhân gốc rễ:**
  * Trong POC phase, chưa implement user workspace lookup
  * Hardcode để test nhanh
* **Giải pháp:**
  * **Temporary (POC):** Chấp nhận hardcode, add TODO comment
  * **Long-term:** Create `useWorkspace()` hook để fetch workspace của user
  * Priority: LOW (vì hiện tại chỉ có 1 user testing)
* **Trạng thái:** ⚠️ Known issue, acceptable cho POC

---

### **Bug #2: Tasks disappear after marking complete**

* **Vấn đề:** Click checkbox → Task biến mất khỏi list
* **Triệu chứng:**
  * File: `components/tasks/task-list.tsx`
  * Filter: `!task.completed` ẩn completed tasks
* **Nguyên nhân gốc rễ:**
  * Filter logic trong `TaskList` component lọc bỏ completed tasks
  * Design decision: Ban đầu nghĩ "Today" page chỉ show incomplete tasks
* **Giải pháp:**
  * **Option 1:** Remove `&& !task.completed` filter → Show all tasks
  * **Option 2:** Add toggle "Show completed" button
  * **Implemented:** Option 1 (simple fix)
* **Trạng thái:** ✅ Fixed

---

### **Bug #3: TypeScript error - workspace_id not in User type**

* **Vấn đề:** `Property 'workspace_id' does not exist on type 'User'`
* **Triệu chứng:**
  * File: `lib/hooks/use-tasks.ts`
  * Error: `user.workspace_id` không tồn tại
* **Nguyên nhân gốc rễ:**
  * User table không có `workspace_id` field
  * Workspace ID phải fetch từ `workspace_members` table
* **Giải pháp:**
  ```typescript
  // Fetch workspace_id from workspace_members
  const { data: member } = await supabase
    .from('workspace_members')
    .select('workspace_id')
    .eq('user_id', user.id)
    .single()

  const workspaceId = member?.workspace_id
  ```
* **Trạng thái:** ✅ Pattern documented in bug-fix template

---

### **Bug #4: Empty state không có images**

* **Vấn đề:** Empty states chỉ có text, không có illustration
* **Triệu chứng:**
  * Pages `/today`, `/inbox` khi chưa có tasks
  * Chỉ hiển thị "No tasks yet"
* **Nguyên nhân gốc rễ:**
  * Chưa có empty state illustrations
  * Chưa implement EmptyState component
* **Giải pháp:**
  * **Short-term:** Text-only empty state (acceptable)
  * **Long-term:** Add illustrations (undraw.co hoặc custom SVG)
  * Priority: LOW (UX polish, không blocking)
* **Trạng thái:** ⏳ Planned cho Week 4 (Polish phase)

---

### **Bug #5: No loading skeletons**

* **Vấn đề:** Khi fetch data, không có loading state → white screen
* **Triệu chứng:**
  * Task list flicker khi load
  * Supabase query takes 200-500ms
* **Nguyên nhân gốc rễ:**
  * Chưa implement Skeleton components
  * `isLoading` state không được handle
* **Giải pháp:**
  * Tạo `TaskSkeleton.tsx` component
  * Render skeleton khi `isLoading === true`
  * Dùng shadcn/ui Skeleton component
* **Trạng thái:** ⏳ Planned cho Week 4

---

### **Bug #6: Git merge conflict trong restructure**

* **Vấn đề:** Khi move files với `git mv`, một số files bị conflict
* **Triệu chứng:**
  * Files như `THIS_WEEK_OLD.md` không track được history
* **Nguyên nhân gốc rễ:**
  * Dùng `mv` thay vì `git mv` cho 1 file
* **Giải pháp:**
  * Luôn dùng `git mv` để preserve history
  * Exception: Untracked files hoặc files mới tạo
* **Lesson learned:** `git mv` > `mv` khi làm việc với Git
* **Trạng thái:** ✅ Resolved, documented

---

## 3. Ngân hàng Ý tưởng (Ideas Bank)

### **💡 Implemented Ideas (2)**

#### **Idea #1: Kanban Board**

* **Mô tả:** Drag & drop tasks giữa columns (TODO/IN PROGRESS/DONE)
* **Nguồn:** Lấy ý tưởng từ Trello, Linear
* **Implementation:** Nov 8, 2025 (2 hours with AI)
* **Tech:** @dnd-kit/core, Zustand optimistic updates
* **Kết quả:** ✅ Working perfectly

#### **Idea #2: Smart Lists (Today/Inbox/Upcoming)**

* **Mô tả:** Auto-filter tasks theo date và context
* **Implementation:** Nov 7, 2025
* **Filters:**
  * Today: `due_date === today`
  * Inbox: `project_id === null`
  * Upcoming: `due_date > today AND due_date <= +7 days`

---

### **💭 High Priority - Considering (5)**

#### **Idea #3: AI-Powered Task Suggestions**

* **Mô tả:** AI suggest tasks dựa trên:
  * Past tasks patterns
  * Calendar events
  * Current projects
* **Example:**
  * User thường có meeting Mondays 10AM → AI suggest "Prepare weekly report" Sunday evening
* **Tech Stack:**
  * OpenAI API hoặc local LLM
  * Vector DB (Supabase pgvector) để store task embeddings
* **Challenges:**
  * Cost (OpenAI API $$$)
  * Privacy concerns
  * Accuracy
* **Priority:** MEDIUM (nice-to-have, không critical cho MVP)

---

#### **Idea #4: Voice Input cho Quick Add**

* **Mô tả:** Nói "Mua sữa lúc 5 giờ chiều" → Auto create task với title + due_date
* **Tech:**
  * Web Speech API (browser built-in)
  * Natural Language Processing để parse date/time
* **Use Case:**
  * Driving, cooking, không tiện type
* **Challenges:**
  * Accuracy (accent, background noise)
  * NLP complexity (Vietnamese date parsing)
* **Priority:** LOW (cool feature, không essential)

---

#### **Idea #5: Time Tracking Integration**

* **Mô tả:** Track time spent on each task (Pomodoro-style)
* **Features:**
  * Click "Start timer" on task
  * Auto-log time to `task_time_logs` table
  * Weekly/monthly reports
* **Use Case:**
  * Freelancers billing clients
  * Personal productivity analytics
* **Tech:**
  * Simple timer component
  * Supabase table: `task_time_logs (task_id, started_at, ended_at, duration)`
* **Priority:** MEDIUM

---

#### **Idea #6: Project Templates**

* **Mô tả:** Pre-built project structures (e.g., "Website Launch" template)
* **Example Template:**
  * Website Launch:
    * Task 1: Design mockups
    * Task 2: Frontend development
    * Task 3: Backend API
    * Task 4: Testing
    * Task 5: Deploy
* **Implementation:**
  * Store templates in `project_templates` table
  * "Use template" button → Copy tasks to new project
* **Priority:** LOW (nice QoL improvement)

---

#### **Idea #7: Public Task Sharing**

* **Mô tả:** Share task list publicly (read-only link)
* **Use Case:**
  * Share wedding planning checklist
  * Share project roadmap với clients
* **Implementation:**
  * Generate shareable UUID link
  * Public route: `/share/[uuid]`
  * RLS: Allow public read nếu `is_public = true`
* **Priority:** MEDIUM

---

### **🆕 New Ideas - Not Prioritized (3)**

#### **Idea #8: Daily Standup Email**

* **Mô tả:** Mỗi sáng 8AM, email summary:
  * Tasks completed yesterday
  * Tasks due today
  * Overdue tasks
* **Tech:** Supabase Edge Functions + Cron job + SendGrid
* **Ghi chú:** Cần email service (có cost)

---

#### **Idea #9: Gamification (Streaks, Points)**

* **Mô tả:**
  * Earn points khi complete tasks
  * Streaks: Complete task 7 days liên tiếp
  * Leaderboard (nếu có teams)
* **Inspiration:** Duolingo, Habitica
* **Ghi chú:** Risk of making it feel like a game, not serious productivity tool

---

#### **Idea #10: Mobile App (React Native)**

* **Mô tả:** Native iOS/Android app
* **Tech:** React Native, Expo
* **Challenges:**
  * Development time (2-3 tháng)
  * Maintenance overhead
  * Need separate codebase
* **Decision:** Focus on web responsive trước, mobile app sau khi có traction

---

### **❌ Rejected Ideas (3) - With Reasons**

#### **Idea #11: Built-in Chat/Messaging (REJECTED)**

* **Lý do reject:**
  * Quá phức tạp (real-time, notifications, etc.)
  * Đã có Slack, Discord, Teams
  * Not core value prop
  * Scope creep
* **Alternative:** Integrate với Slack notifications

---

#### **Idea #12: Video Calls Integration (REJECTED)**

* **Lý do reject:**
  * Zoom, Google Meet already exist
  * Technical complexity (WebRTC)
  * Out of scope
* **Alternative:** Add Zoom/Meet links to calendar events

---

#### **Idea #13: Email Client Inside App (REJECTED)**

* **Lý do reject:**
  * Too ambitious
  * Gmail/Outlook đã tốt
  * Focus on tasks, not emails
* **Alternative:** Email → task automation (forward email to create task)

---

## 4. Thư viện Snippet và Mẫu (Code Snippets & Patterns)

### **Pattern #1: Zustand Store với Optimistic Updates**

* **Mục đích:** Update UI instantly, sync với Supabase sau
* **Snippet:**
  ```typescript
  // lib/stores/tasks.ts
  import { create } from 'zustand'
  import { immer } from 'zustand/middleware/immer'
  import { supabase } from '@/lib/supabase/client'

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

---

### **Pattern #2: Supabase Query với Error Handling**

* **Mục đích:** Fetch data từ Supabase, handle loading + error
* **Snippet:**
  ```typescript
  // lib/hooks/use-tasks.ts
  import { useEffect, useState } from 'react'
  import { supabase } from '@/lib/supabase/client'
  import type { Task } from '@/types'

  export function useTasks(workspaceId: string) {
    const [tasks, setTasks] = useState<Task[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<Error | null>(null)

    useEffect(() => {
      async function fetchTasks() {
        try {
          setIsLoading(true)
          const { data, error } = await supabase
            .from('tasks')
            .select('*')
            .eq('workspace_id', workspaceId)
            .order('position', { ascending: true })

          if (error) throw error
          setTasks(data || [])
        } catch (err) {
          setError(err as Error)
        } finally {
          setIsLoading(false)
        }
      }

      fetchTasks()
    }, [workspaceId])

    return { tasks, isLoading, error }
  }
  ```

---

### **Pattern #3: AI Prompt Template Structure**

* **Mục đích:** Viết prompts hiệu quả cho ChatGPT/Claude
* **Template:**
  ````markdown
  Create [Component Name] for NEXUS Productivity OS.

  Context:
  - Project: [Brief description]
  - Stack: Next.js 16, React 19, TypeScript, [other libs]
  - Location: [file path]

  Requirements:
  1. [Requirement 1 - Specific and clear]
  2. [Requirement 2]
  3. [Requirement 3]

  [Optional Sections:]
  State Management: [Zustand pattern]
  Database: [Supabase schema]
  Styling: [TailwindCSS classes]
  Accessibility: [ARIA labels, keyboard nav]

  Expected Output:
  - [Component file]
  - [Types file if needed]
  - [Usage example]
  ````

---

### **Pattern #4: Task Component Structure**

* **Mục đích:** Consistent component structure
* **Snippet:**
  ```tsx
  // components/tasks/task-item.tsx
  'use client'

  import { useState } from 'react'
  import { useTaskStore } from '@/lib/stores/tasks'
  import type { Task } from '@/types'

  interface TaskItemProps {
    task: Task
    workspaceId: string
  }

  export function TaskItem({ task, workspaceId }: TaskItemProps) {
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

---

### **Pattern #5: Database Schema Pattern (RLS)**

* **Mục đích:** Row Level Security setup
* **Snippet:**
  ```sql
  -- Enable RLS
  ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;

  -- Policy: Users can only see tasks in their workspace
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

  -- Policy: Users can insert tasks in their workspace
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
  ```

---

### **Pattern #6: Error Boundary Component**

* **Mục đích:** Catch errors gracefully
* **Snippet:**
  ```tsx
  // components/error-boundary.tsx
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
            <p className="text-red-600 text-sm mt-2">{this.state.error?.message}</p>
          </div>
        )
      }

      return this.props.children
    }
  }
  ```

---

## 5. Nguyên tắc Vàng và Quy ước (AI Principles & Conventions)

### **🎯 Development Principles**

1. **AI-Driven Development Workflow:**

   * Luôn viết prompt chi tiết trước khi code
   * Document prompts trong `AI_PROMPTS.md`
   * Update `COMPLETED.md` sau khi xong feature
   * Test code AI generate trước khi commit
2. **Optimistic UI Updates:**

   * Update UI immediately (Zustand)
   * Sync với database sau
   * Revert nếu database update fails
   * Show toast notification khi error
3. **TypeScript Strict Mode:**

   * Luôn dùng TypeScript strict
   * Không dùng `any` (dùng `unknown` nếu cần)
   * Define interfaces rõ ràng
   * Generate types từ Supabase: `npm run db:types`
4. **Mobile-First Design:**

   * Design cho mobile trước
   * Progressive enhancement cho desktop
   * Touch-friendly buttons (min 44x44px)
   * Test trên Chrome DevTools mobile view
5. **Performance First:**

   * Lazy load components không cần thiết (`React.lazy()`)
   * Debounce expensive operations (search, autosave)
   * Optimize images (WebP, lazy loading)
   * Code splitting cho routes

---

### **📝 Code Conventions**

6. **File Naming:**

   * Components: `PascalCase.tsx` (TaskItem.tsx)
   * Hooks: `use-kebab-case.ts` (use-tasks.ts)
   * Utils: `kebab-case.ts` (date-utils.ts)
   * Types: `PascalCase.types.ts` (Task.types.ts)
7. **Component Structure:**

   * Props interface luôn ở đầu file
   * Export default function (không export const)
   * Client components: `'use client'` ở dòng đầu
   * Server components: Không cần directive
8. **Import Order:**

   ```tsx
   // 1. React imports
   import { useState, useEffect } from 'react'

   // 2. Third-party imports
   import { create } from 'zustand'

   // 3. Internal imports
   import { supabase } from '@/lib/supabase/client'
   import type { Task } from '@/types'

   // 4. Relative imports
   import { TaskItem } from './task-item'
   ```
9. **Comments Convention:**

   * Complex logic: Comment bằng tiếng Việt
   * Public APIs: Comment bằng tiếng Anh (JSDoc)
   * TODO comments: `// TODO: [Mô tả cần làm]`
   * FIXME comments: `// FIXME: [Mô tả bug]`
10. **Error Handling:**

    * Luôn handle errors trong async functions
    * Show user-friendly error messages
    * Log errors to console (dev) hoặc Sentry (production)
    * Never swallow errors silently

---

### **🗂️ Documentation Conventions**

11. **Documentation Language:**

    * User-facing docs: **Tiếng Việt** (QUICKSTART_AI.md, FEATURES.md)
    * Technical docs: **Tiếng Anh** hoặc **Tiếng Việt** (flexible)
    * Code comments: **Tiếng Việt** cho logic phức tạp
    * Commit messages: **Tiếng Anh**
12. **Documentation Structure:**

    * `00_start-here/`: Entry point, daily workflow
    * `01_status/`: Current state (NOW.md, FEATURES.md, BUGS.md)
    * `02_ai-prompts/`: AI prompts và templates
    * `03_roadmap/`: Planning (ROADMAP.md, IDEAS.md, HISTORY.md)
    * `04_technical/`: Technical docs (SETUP.md, DEPLOY.md, architecture/)
    * `05_research/`: User research
13. **Daily Workflow:**

    * **Mỗi sáng:** Đọc `QUICKSTART_AI.md` → Biết làm gì hôm nay
    * **Khi code:** Mở `AI_PROMPTS.md` → Copy prompt
    * **Mỗi tối:** Update `COMPLETED.md` + `FEATURES.md`
    * **Mỗi thứ 2:** Update `THIS_WEEK.md`
14. **File Naming (Docs):**

    * UPPERCASE cho important files: `README.md`, `NOW.md`
    * Folders: lowercase + numbered prefix: `00_start-here/`
    * Archives: `old-versions/`, `temp-fixes/`

---

### **🚀 Deployment & Testing**

15. **Git Workflow:**

    * Branch naming: `feature/feature-name`, `fix/bug-name`, `docs/update-name`
    * Commit messages: `type(scope): message` (conventional commits)
    * Example: `feat(tasks): add inline edit functionality`
    * Always use `git mv` khi move files (preserve history)
16. **Testing Strategy:**

    * **Unit Tests:** Hooks, utils (Vitest)
    * **Integration Tests:** Component + Supabase (Testing Library)
    * **E2E Tests:** Critical flows (Playwright)
    * **Manual Testing:** Mỗi feature sau khi AI generate
    * Target coverage: 70%+ cho core features
17. **Database Migrations:**

    * Luôn tạo migration script trong `architecture/migrations/`
    * Naming: `XXX_description.sql` (001_add_documents_table.sql)
    * Test migration trên local trước khi deploy
    * Backup database trước khi run migration
18. **Environment Variables:**

    * Never commit `.env.local`
    * Always provide `.env.local.example`
    * Document mỗi env var trong README
    * Use `NEXT_PUBLIC_` prefix cho client-side vars

---

### **💡 AI Prompting Best Practices**

19. **Good Prompt Structure:**

    * **Context:** Project name, tech stack, file location
    * **Requirements:** Numbered list, specific
    * **Constraints:** Free tier, mobile-first, performance
    * **Expected Output:** Component, types, usage example
    * **Optional:** Styling guide, accessibility requirements
20. **When AI Makes Mistakes:**

    * Don't regenerate entire prompt immediately
    * Give specific feedback: "This code has error X, please fix Y"
    * Provide error message + stack trace
    * Ask AI to explain the fix
21. **Prompt Reusability:**

    * Save good prompts in `AI_PROMPTS.md`
    * Create templates in `02_ai-prompts/templates/`
    * Update prompts based on learnings
    * Share prompts với team (nếu có)

---

### **🎨 UI/UX Principles**

22. **Design System:**

    * Use shadcn/ui components (consistency)
    * Colors: Follow Tailwind default palette
    * Spacing: Tailwind spacing scale (p-4, gap-2, etc.)
    * Typography: Inter font, text-sm default
23. **Keyboard Shortcuts:**

    * `j/k`: Navigate up/down
    * `x`: Toggle complete
    * `c`: Create new task
    * `d`: Delete task
    * `Cmd+K`: Command palette
    * `Esc`: Close modal/cancel
24. **Loading States:**

    * Always show skeleton hoặc spinner
    * Never white screen khi loading
    * Optimistic UI > Loading spinners
    * Minimum 200ms loading state (avoid flicker)
25. **Empty States:**

    * Helpful message + CTA
    * Icon hoặc illustration
    * Guide user về next action
    * Example: "No tasks yet. Press 'c' to create one"

---

### **📊 Project Management**

26. **Feature Prioritization:**

    * **Must Have:** Task CRUD, Kanban, Calendar
    * **Nice to Have:** Pages, App Minis
    * **Can Wait:** Integrations, Advanced features
    * Use MoSCoW method
27. **Weekly Rhythm:**

    * **Monday:** Review last week, plan this week (update `THIS_WEEK.md`)
    * **Daily:** Morning read `QUICKSTART_AI.md`, evening update progress
    * **Friday:** Week review, update `docs/01_status/NOW.md`
    * **Sunday:** Prepare for next week
28. **Decision Making:**

    * Document major decisions trong `HISTORY.md`
    * Include: Decision, Reason, Pros/Cons, Result
    * Review decisions mỗi tháng
    * Learn from mistakes

---

### **🔐 Security & Privacy**

29. **Row Level Security (RLS):**

    * Always enable RLS trên mọi tables
    * Test RLS policies với different users
    * Never trust client-side filtering
    * Default deny, explicit allow
30. **Authentication:**

    * Never store passwords (dùng Supabase Auth)
    * OAuth preferred (Google, GitHub)
    * Session management: Supabase handles
    * Protect routes với middleware

---

### **🎓 Learning & Growth**

31. **Continuous Learning:**

    * Document learnings trong `HISTORY.md`
    * Review AI-generated code (hiểu, không chỉ copy)
    * Read Supabase docs khi stuck
    * Join Next.js, React communities
32. **Feedback Loop:**

    * User interviews mỗi tuần (Week 0-3)
    * Iterate based on feedback
    * Track metrics: Signups, Active users, NPS
    * GO/NO-GO decision Week 12

---

**End of Brain Dump**

---

**Metadata:**

- **Created:** November 9, 2025
- **Total Decisions:** 8 ADRs
- **Total Bugs:** 6 documented
- **Total Ideas:** 13 (2 implemented, 5 considering, 3 new, 3 rejected)
- **Code Patterns:** 6 snippets
- **Principles:** 32 golden rules
- **Next Update:** As needed (add new learnings)

**Usage:**

- Reference this file khi onboard team members mới
- Use as decision log (Why did we choose X over Y?)
- Review quarterly để learn from past decisions
- Update khi có new learnings hoặc decisions

**Related Files:**

- `docs/03_roadmap/HISTORY.md` - Project timeline
- `docs/03_roadmap/IDEAS.md` - Ideas backlog
- `docs/04_technical/architecture/decisions.md` - Technical decisions
- `docs/02_ai-prompts/AI_PROMPTS.md` - AI prompting guide
