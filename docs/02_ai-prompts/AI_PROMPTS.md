# AI Prompts Guide - NEXUS Productivity OS

> **Mục đích:** Hướng dẫn viết prompts hiệu quả cho GitHub Copilot, ChatGPT, Claude khi develop NEXUS Productivity OS.

---

## 📋 Nguyên Tắc Chung

### ✅ DO:

1. **Context rõ ràng** - Cho AI biết đang làm gì, ở đâu trong project
2. **Specific requirements** - Càng cụ thể càng tốt
3. **Tech stack mention** - Nhắc Next.js 16, React 19, Supabase, TypeScript, Zustand
4. **Expected output** - Nói rõ muốn component, function, hay full page
5. **Include constraints** - Free tier, performance, mobile-first, keyboard shortcuts

### ❌ DON'T:

1. Vague prompts: "Make a task manager"
2. Skip context: "Add recurring tasks" (logic ở đâu? dùng thư viện gì?)
3. Assume AI biết project: "Fix the filter" (filter nào? ở file nào?)
4. Multi-tasking prompts: "Build Kanban + Calendar + Pages in one go"

---

## 🎯 Template Prompts by Feature

### Priority 1: Task Management (70%)

#### Prompt 1: Kanban Board Component

```
Create Kanban board component for NEXUS Productivity OS.

Context:
- Project: Task management system with drag-drop boards
- Stack: Next.js 16, React 19, TypeScript, @dnd-kit/core, Zustand
- Location: frontend/components/kanban/kanban-board.tsx

Requirements:
1. 3 columns: TODO, IN_PROGRESS, DONE
2. Drag & drop tasks between columns using @dnd-kit
3. Update task.status and task.position in Supabase
4. Optimistic UI updates (show change immediately)
5. Props: projectId (UUID)
6. Load tasks from useTasks(projectId) hook

State Management:
- Use Zustand store from lib/stores/tasks.ts
- Update task position on drop
- Handle loading and error states

Styling:
- TailwindCSS
- Each column: min-w-80, bg-gray-50
- Cards: bg-white, shadow-sm, rounded-lg
- Drag handle visible on hover

Expected output:
- KanbanBoard.tsx
- KanbanColumn.tsx
- KanbanCard.tsx
```

#### Prompt 2: Recurring Tasks with rrule

```
Add recurring task support to task creation form.

Context:
- Stack: React 19, TypeScript, rrule library (already installed)
- Location: frontend/components/tasks/task-quick-add.tsx
- Database: tasks table has `rrule` TEXT field

Requirements:
1. Add "Repeat" button next to quick add input
2. Clicking opens modal with recurrence options:
   - Daily, Weekly, Monthly, Yearly
   - Custom: "Every 2 days", "Last Friday of month", etc.
3. Generate rrule string (RFC-5545 format)
4. Save to tasks.rrule field in Supabase
5. Display recurrence summary: "Every 2 days" below task

rrule examples:
- Daily: "FREQ=DAILY"
- Every 2 days: "FREQ=DAILY;INTERVAL=2"
- Last Friday: "FREQ=MONTHLY;BYDAY=-1FR"

Expected output:
- Updated TaskQuickAdd.tsx
- RecurrenceModal.tsx (new component)
- Helper function: rruleToHumanReadable()
```

#### Prompt 3: Rich Text Editor

```
Create rich text editor component using Tiptap for NEXUS.

Context:
- Component for creating/editing docs (like Notion pages)
- Stack: React 19, TypeScript, Tiptap
- Location: frontend/components/editor/tiptap-editor.tsx

Requirements:
1. Extensions: Bold, Italic, Heading (H1-H3), Lists, Link
2. Toolbar with formatting buttons
3. Auto-save every 2 seconds to Supabase
4. Props: initialContent, onSave callback, docId
5. Debounced save to prevent too many requests
6. Loading indicator when saving
7. Placeholder: "Start typing..."

Performance:
- Lazy load Tiptap (Next.js dynamic import)
- Optimistic UI (update local state immediately)

Styling:
- Minimal toolbar (top fixed)
- Editor looks like Notion (clean, spacious)
- Mobile-friendly

Expected output:
- TiptapEditor.tsx component
- EditorToolbar.tsx component
- Types for editor props
```

---

### Phase 3: Week 3 - App Mini System

#### Prompt 4: Todo List App Mini

```
Create Todo List app mini component for NEXUS dashboard.

Context:
- App mini = widget that can be added to dashboard
- Stack: React, TypeScript, Zustand (state), Supabase (data)
- Location: frontend/components/app-mini/todo-list.tsx

Requirements:
1. CRUD operations: add, edit, delete, toggle complete
2. State management: Zustand store (create new store)
3. Persistence: Save to Supabase app_minis table
4. UI: Checkbox, input field, delete button
5. Empty state: "No todos yet"
6. Props: appMiniId (to load data from Supabase)

Database schema (already exists):
- Table: app_minis
- Columns: id, dashboard_id, type, data (JSONB)
- Data format: { items: [{ id, text, completed }] }

Styling:
- Compact, fits in dashboard card
- shadcn/ui Checkbox component
- Mobile-friendly

Expected output:
- TodoList.tsx component
- useTodoStore.ts (Zustand store)
- Types for todo item
```

#### Prompt 5: App Mini Container

```
Create wrapper component for app minis on dashboard.

Context:
- Container wraps each app mini (TodoList, Kanban, etc.)
- Provides: header with title, delete button, resize handle
- Location: frontend/components/app-mini/app-mini-card.tsx

Requirements:
1. Props: appMini object (from database), onDelete callback
2. Header:
   - Icon (based on type)
   - Title (editable inline)
   - Delete button (with confirmation)
3. Body: Render appropriate component based on type
4. Loading state while fetching data
5. Error boundary

Type mapping:
- 'todo-list' → <TodoList />
- 'kanban' → <KanbanBoard />
- 'table' → <SimpleTable />

Styling:
- Card with border, shadow
- Header: flex justify-between
- Delete button: hover to show

Expected output:
- AppMiniCard.tsx
- Type for AppMini interface
```

---

### Phase 4: Week 4 - Dashboard Layout

#### Prompt 6: Grid Layout

```
Create draggable dashboard grid using react-grid-layout.

Context:
- Dashboard displays multiple app minis in grid
- Users can drag, drop, resize
- Layout saved to Supabase
- Stack: Next.js, react-grid-layout, Supabase
- Location: frontend/components/dashboard/grid-layout.tsx

Requirements:
1. Load layout from Supabase on mount
2. Drag & drop app mini cards
3. Resize cards
4. Save layout on drag/resize end (debounced)
5. Responsive: 12-col desktop, 1-col mobile
6. "Add App Mini" button (opens modal)

Props:
- dashboardId: UUID
- appMinis: AppMini[] (from parent)

Performance:
- Debounce save (1 second after drag stop)
- Optimistic UI

Styling:
- Gap between cards: 16px
- Mobile: stack vertically (no drag on mobile)

Expected output:
- GridLayout.tsx
- useDashboardLayout.ts hook (fetch/save logic)
```

---

## 🔧 Troubleshooting Prompts

### When AI generates wrong code:

**Prompt:**

```
The code you generated has this error:
[paste error message]

Context: [where it's used, what you're trying to do]

Please fix the code.
Additional constraints: [if any]
```

### When you need explanation:

**Prompt:**

```
Explain this code in Vietnamese, line by line:

[paste code]

Focus on:
1. What each function does
2. Why certain patterns are used
3. Potential issues or improvements
```

---

## 💡 Advanced Prompts

### Refactoring:

```
Refactor this component to be more performant and maintainable:

[paste code]

Issues to fix:
1. Too many re-renders
2. Props drilling
3. Inline functions in JSX
4. Missing error handling

Stack: React 19, TypeScript
Constraints: Keep using Zustand for state
```

### Testing:

```
Generate unit tests for this component using Vitest:

[paste component]

Test cases:
1. Renders correctly with props
2. Handles user interactions (click, input)
3. Error states
4. Loading states

Use @testing-library/react
```

---

## 📚 Prompt Library by Feature

### Authentication

- [x] Supabase client setup
- [x] Login page (Google OAuth + Email)
- [ ] Signup page
- [ ] Password reset flow
- [ ] Auth middleware (protect routes)

### Dashboard

- [ ] Dashboard layout (sidebar + main)
- [ ] Sidebar navigation
- [ ] Create new dashboard modal
- [ ] Dashboard settings

### App Minis

- [ ] Todo List component
- [ ] Kanban Board component
- [ ] Simple Table component
- [ ] App Mini Card wrapper
- [ ] App Mini marketplace browse

### User Management

- [ ] Invite user modal
- [ ] User permissions UI
- [ ] Member list component

---

## 🎓 Learning Prompts (When Stuck)

### Understanding Concepts:

```
I'm learning [concept] in the context of NEXUS project.

Explain:
1. What is [concept]?
2. Why do we need it?
3. How does it work in Next.js 14?
4. Show me a simple example

Keep it practical and beginner-friendly.
```

Example:

```
I'm learning Server Components in the context of NEXUS project.

Explain:
1. What is Server Component?
2. Why do we need it? (vs Client Component)
3. How does it work in Next.js 14?
4. Show me a simple example with Supabase query

Keep it practical and beginner-friendly.
```

---

## 🚀 Quick Reference

### Essential Info to Include in Every Prompt:

```markdown
Context: [What you're building, where in project]
Stack: Next.js 14, TypeScript, Supabase, TailwindCSS
Location: [file path]
Requirements: [numbered list]
Constraints: [free tier, performance, mobile-first]
Expected output: [component, function, full page]
```

### Copy-Paste Template:

```
Create [what] for NEXUS [context].

Context:
- [Brief description]
- Stack: Next.js 14, React 19, TypeScript, Supabase
- Location: [file path]

Requirements:
1. [Requirement 1]
2. [Requirement 2]
3. [Requirement 3]

[Additional sections as needed: Styling, Performance, Database, etc.]

Expected output: [What files/code you want]
```

---

## 🎯 Success Metrics for Good Prompts

✅ **Good prompt results in:**

- Code that runs without major errors
- Follows project conventions (TypeScript, TailwindCSS)
- Includes error handling and loading states
- Mobile-responsive by default
- <5 minor fixes needed

❌ **Bad prompt results in:**

- Code doesn't compile
- Wrong libraries used
- Missing key requirements
- Requires complete rewrite

---

**Remember:** Spend 2 minutes crafting a good prompt → Save 20 minutes debugging bad code.

**Last Updated:** November 7, 2025
