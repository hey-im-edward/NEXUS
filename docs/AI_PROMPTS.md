# AI Prompts Guide - NEXUS Development

> **Mục đích:** Hướng dẫn viết prompts hiệu quả cho GitHub Copilot, ChatGPT, Claude khi develop NEXUS.

---

## 📋 Nguyên Tắc Chung

### ✅ DO:
1. **Context rõ ràng** - Cho AI biết đang làm gì, ở đâu trong project
2. **Specific requirements** - Càng cụ thể càng tốt
3. **Tech stack mention** - Nhắc Next.js 14, Supabase, TypeScript
4. **Expected output** - Nói rõ muốn component, function, hay full page
5. **Include constraints** - Free tier, performance, mobile-first

### ❌ DON'T:
1. Vague prompts: "Make a dashboard"
2. Skip context: "Add auth" (auth ở đâu? dùng gì?)
3. Assume AI biết project: "Fix the bug" (bug gì?)
4. Multi-tasking prompts: "Build auth + dashboard + CRM in one go"

---

## 🎯 Template Prompts by Phase

### Phase 1: Week 1 - Auth Setup

#### Prompt 1: Supabase Client Setup
```
Create Supabase client configuration for Next.js 14 App Router.

Context:
- Project: NEXUS (project management platform)
- Stack: Next.js 14, TypeScript, Supabase
- Location: frontend/lib/supabase/

Requirements:
1. Create client.ts for browser-side
2. Create server.ts for server components
3. Use @supabase/ssr package (latest)
4. Handle cookies properly for SSR
5. TypeScript strict mode

Environment variables needed:
- NEXT_PUBLIC_SUPABASE_URL
- NEXT_PUBLIC_SUPABASE_ANON_KEY

Expected output: 2 files with full implementation + comments
```

#### Prompt 2: Login Page
```
Create login page with Google OAuth using Supabase Auth.

Context:
- Next.js 14 App Router
- Location: frontend/app/(auth)/login/page.tsx
- Using Supabase Auth (already configured in lib/supabase/)
- Design: Clean, minimal, mobile-first

Requirements:
1. Google OAuth button (primary)
2. Email/password form (secondary)
3. "Sign up" link to /signup
4. Error handling with toast
5. Redirect to /dashboard after success
6. Loading states
7. Form validation with react-hook-form + zod

Styling:
- TailwindCSS
- shadcn/ui Button component
- Responsive (mobile-first)

Expected output: Full page component with types
```

---

### Phase 2: Week 2 - Doc Editor

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
- [ ] Supabase client setup
- [ ] Login page (Google OAuth + Email)
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
