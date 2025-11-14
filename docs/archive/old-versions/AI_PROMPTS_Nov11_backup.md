# AI Prompts Guide - NEXUS Productivity OS

> **Mục đích:** Hướng dẫn viết prompts hiệu quả cho GitHub Copilot, ChatGPT, Claude khi develop NEXUS Productivity OS.
>
> **Triết lý:** Code 100% bằng AI - Tăng tốc development 6-8x (12 tuần → 2 tuần POC)

**Cập nhật:** November 11, 2025  
**Người dùng:** Developer code với AI (ChatGPT, Claude, Copilot)

---

## 🚀 AI-Driven Development Workflow

### **Quy trình hàng ngày:**

```
Sáng:
1. Đọc docs/00_start-here/QUICKSTART_AI.md (1 phút)
2. Check docs/01_status/NOW.md → Biết priority
3. Mở docs/02_ai-prompts/AI_PROMPTS.md → Copy prompt

Code:
4. Paste prompt vào ChatGPT/Claude
5. AI generate code → Copy vào VS Code
6. Test code (npm run dev)
7. Fix errors nếu có (dùng AI để debug)
8. Commit code

Chiều:
9. Update docs/02_ai-prompts/COMPLETED.md
10. Update docs/01_status/FEATURES.md (nếu xong feature)
```

### **Ưu điểm AI-driven 100%:**

- ✅ **Nhanh 6-8x:** Kanban board: 2 giờ (AI) vs 1-2 ngày (manual)
- ✅ **Ít bug:** TypeScript + AI review code → Code quality cao
- ✅ **Consistent:** AI follow conventions, không quên edge cases
- ✅ **Học nhanh:** Đọc code AI generate → Hiểu pattern mới

### **Khi nào KHÔNG dùng AI:**

- ❌ Architecture decisions (cần suy nghĩ kỹ)
- ❌ Security-critical code (auth, permissions)
- ❌ Performance optimization (cần profiling thật)

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

#### Prompt 1: Kanban Board Component ✅

**Status:** ✅ COMPLETED (Nov 8, 2025)

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

---

#### Prompt 1.1: Edit Task Inline 🔄

**Status:** 🔄 IN PROGRESS (Nov 9, 2025)  
**Estimated Time:** 1-2 hours

```
Add inline editing functionality to task items in NEXUS Productivity OS.

Context:
- Project: Task management system with inline editing
- Stack: Next.js 16, React 19, TypeScript, Zustand (state), Supabase (database)
- Location: frontend/components/tasks/task-item.tsx
- Current: Tasks display as read-only text
- Goal: Double-click task title → Edit mode → Save on blur/Enter

Requirements:
1. **Double-click to edit:**
   - Double-click task title → Convert to input field
   - Input field auto-focused with text selected
   - Original text visible in input

2. **Save actions:**
   - Press Enter → Save and exit edit mode
   - Click outside (blur) → Save and exit edit mode
   - ESC key → Cancel (revert to original text)

3. **Optimistic UI:**
   - Update local state immediately (Zustand)
   - Show updated title before Supabase confirms
   - If save fails → Revert to original + Show error toast

4. **Validation:**
   - Min length: 1 character
   - Max length: 200 characters
   - Trim whitespace
   - If empty after trim → Don't save, show error

5. **Loading state:**
   - Show subtle spinner/indicator while saving to Supabase
   - Disable input during save (prevent double-edit)

6. **Accessibility:**
   - ARIA label: "Edit task title"
   - Keyboard navigation (Tab, Shift+Tab)
   - Screen reader friendly

State Management (Zustand):
- Store: lib/stores/tasks.ts
- Action: updateTaskTitle(taskId: string, newTitle: string)
- Optimistic update pattern (update local → sync Supabase → revert if error)

Database (Supabase):
- Table: tasks
- Column: title (TEXT, NOT NULL)
- RLS Policy: Users can update tasks in their workspace

Styling (TailwindCSS):
- Edit mode input: border-2, border-blue-500, focus:ring-2
- Read mode: hover:bg-gray-50 (indicate editable)
- Transition smooth (150ms ease-in-out)

Error Handling:
- Network error → Toast: "Failed to save. Try again."
- Validation error → Toast: "Task title cannot be empty"
- Supabase error → Log to console + Toast

Expected Output:
1. Updated TaskItem.tsx component with inline edit
2. Updated useTaskStore hook with updateTaskTitle action
3. Helper hook: useInlineEdit.ts (reusable for other inline edits)
4. Types: InlineEditProps interface

Testing Checklist:
- [ ] Double-click works
- [ ] Enter saves
- [ ] Blur saves
- [ ] ESC cancels
- [ ] Empty input shows error
- [ ] Optimistic update works
- [ ] Network error reverts
- [ ] Accessible (keyboard + screen reader)

Example Flow:
1. User double-clicks "Buy groceries"
2. Input field appears with "Buy groceries" selected
3. User types "Buy milk and bread"
4. User presses Enter
5. UI updates immediately to "Buy milk and bread"
6. Spinner shows briefly while saving to Supabase
7. Success → Done (or Error → Revert + Toast)
```

---

#### Prompt 1.2: Set Priority 🔄

**Status:** 🔄 PLANNED (Nov 9 afternoon)  
**Estimated Time:** 1-2 hours

```
Add priority selection UI for tasks in NEXUS Productivity OS.

Context:
- Project: Task management with priority levels
- Stack: Next.js 16, React 19, TypeScript, Zustand, Supabase
- Location: frontend/components/tasks/task-item.tsx + task-priority-select.tsx
- Database: tasks.priority (TEXT) - 'urgent', 'high', 'medium', 'low', 'none'
- Goal: Dropdown to set task priority with visual indicators

Requirements:
1. **Priority Levels:**
   - 🔴 Urgent (Red badge, P1)
   - 🟠 High (Orange badge, P2)
   - 🟡 Medium (Yellow badge, P3)
   - 🔵 Low (Blue badge, P4)
   - ⚪ None (Gray/no badge, default)

2. **UI Component:**
   - Dropdown/Popover component (use shadcn/ui Select)
   - Show current priority as colored badge
   - Click badge → Open dropdown with 5 options
   - Select option → Update immediately (optimistic)

3. **Visual Design:**
   - Badge: Small pill-shaped badge with color + text
   - Position: Left of task title (before checkbox)
   - Icon: Use emoji or Lucide React icons
   - Hover: Show tooltip with full text ("Urgent Priority - P1")

4. **State Management:**
   - Zustand action: updateTaskPriority(taskId, priority)
   - Optimistic update (instant UI change)
   - Sync with Supabase

5. **Filtering (Future):**
   - Prepare for filter by priority (not in this prompt)
   - Store priority in tasks table
   - Use enum for type safety

6. **Keyboard Shortcuts (Bonus):**
   - Press 1-4 when task focused → Set priority (1=Urgent, 4=Low)
   - Press 0 → Clear priority

Styling (TailwindCSS):
- Urgent: bg-red-100, text-red-800, border-red-300
- High: bg-orange-100, text-orange-800, border-orange-300
- Medium: bg-yellow-100, text-yellow-800, border-yellow-300
- Low: bg-blue-100, text-blue-800, border-blue-300
- None: bg-gray-100, text-gray-600 (or hidden)

Database (Supabase):
- Table: tasks
- Column: priority TEXT CHECK (priority IN ('urgent', 'high', 'medium', 'low', 'none'))
- Default: 'none'
- Index: For filtering in future

Components:
1. TaskPriorityBadge.tsx - Display current priority
2. TaskPrioritySelect.tsx - Dropdown selector
3. Updated TaskItem.tsx - Include priority badge

Expected Output:
1. TaskPriorityBadge.tsx
2. TaskPrioritySelect.tsx
3. Updated TaskItem.tsx
4. Updated useTaskStore.ts (add updateTaskPriority action)
5. Types: TaskPriority type (union of 5 values)
6. Const: PRIORITY_CONFIG (colors, labels, order)

Testing Checklist:
- [ ] Badge displays correct color
- [ ] Dropdown opens on click
- [ ] Selection updates task
- [ ] Optimistic update works
- [ ] Supabase syncs correctly
- [ ] Error handling (network fail)
- [ ] Keyboard shortcuts work (bonus)

Example Flow:
1. User sees task "Prepare presentation" with no priority
2. User clicks the gray badge (or empty space)
3. Dropdown opens with 5 options
4. User selects "🔴 Urgent"
5. Badge immediately turns red with "Urgent" text
6. Supabase updates in background
7. Success → Done (or Error → Revert + Toast)
```

---

#### Prompt 1.3: Add Tags 🔄

**Status:** 🔄 PLANNED (Nov 10 morning)  
**Estimated Time:** 1-2 hours

```
Add tag system for tasks in NEXUS Productivity OS.

Context:
- Project: Task management with tagging (like Notion, Todoist)
- Stack: Next.js 16, React 19, TypeScript, Zustand, Supabase
- Location: frontend/components/tasks/task-tags.tsx
- Database: task_tags table (many-to-many relationship)
- Goal: Add/remove tags on tasks (e.g., #work, #personal, #urgent)

Requirements:
1. **Tag Input:**
   - Click "Add tag" button on task → Opens tag input
   - Type tag name → Press Enter to add
   - Auto-suggest existing tags (from workspace)
   - Support multiple tags per task

2. **Tag Display:**
   - Show tags as colored pills below task title
   - Color: Auto-generate from tag name (consistent hash)
   - Format: #tagname (lowercase, no spaces)
   - Max 5 tags visible, "+2 more" if exceeds

3. **Tag Management:**
   - Click tag → Option to remove
   - Click "x" icon on tag → Remove tag
   - Hover tag → Show tooltip with full name

4. **Auto-suggest:**
   - Fetch existing tags from workspace when typing
   - Show dropdown with matching tags
   - Arrow keys to navigate, Enter to select
   - Create new tag if not in list

5. **Database Schema:**
   - Table: tags (id, workspace_id, name, color)
   - Table: task_tags (task_id, tag_id) - junction table
   - RLS: Users can only see tags in their workspace

6. **State Management:**
   - Zustand actions: addTag, removeTag, fetchTags
   - Optimistic update (add/remove instantly)
   - Sync with Supabase

Styling (TailwindCSS):
- Tag pill: px-2, py-1, rounded-full, text-xs
- Color: bg-{color}-100, text-{color}-800
- Input: Inline below task, border-b-2 focus:border-blue-500
- Dropdown: Absolute positioned, shadow-lg, max-h-48 overflow-auto

Database (Supabase):
```sql
-- tags table
CREATE TABLE tags (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id UUID REFERENCES workspaces(id),
  name TEXT NOT NULL,
  color TEXT DEFAULT '#3B82F6', -- Hex color
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(workspace_id, name)
);

-- task_tags junction table
CREATE TABLE task_tags (
  task_id UUID REFERENCES tasks(id) ON DELETE CASCADE,
  tag_id UUID REFERENCES tags(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT now(),
  PRIMARY KEY (task_id, tag_id)
);
```

Components:
1. TaskTags.tsx - Display tags on task
2. TagInput.tsx - Input with auto-suggest
3. TagPill.tsx - Single tag display
4. useTagsStore.ts - Zustand store for tags

Helpers:
- generateTagColor(tagName: string) → string (consistent hash → color)
- formatTagName(input: string) → string (lowercase, remove spaces)

Expected Output:
1. TaskTags.tsx component
2. TagInput.tsx component
3. TagPill.tsx component
4. useTagsStore.ts (Zustand store)
5. Helper: generateTagColor.ts
6. Types: Tag, TaskTag interfaces
7. SQL migration: Create tags + task_tags tables

Testing Checklist:
- [ ] Can add tag to task
- [ ] Can remove tag from task
- [ ] Auto-suggest shows existing tags
- [ ] New tag creates entry in tags table
- [ ] Color consistent for same tag name
- [ ] Optimistic update works
- [ ] Supabase sync works
- [ ] Max 5 tags display, rest hidden

Example Flow:
1. User clicks "Add tag" on task "Write blog post"
2. Input field appears
3. User types "#w" → Auto-suggest shows "#work", "#writing"
4. User selects "#work" → Tag added instantly
5. User types "#" → All workspace tags shown
6. User types "#personal" (new tag) → Creates new tag
7. Both tags display as colored pills below task
```

---

#### Prompt 1.4: Task Detail Modal 🔄

**Status:** 🔄 PLANNED (Nov 10 afternoon)  
**Estimated Time:** 2-3 hours

```
Create task detail modal for viewing and editing full task information in NEXUS Productivity OS.

Context:
- Project: Task management with detailed task view
- Stack: Next.js 16, React 19, TypeScript, Zustand, Supabase
- Location: frontend/components/tasks/task-detail-modal.tsx
- Trigger: Click task row (not checkbox, not inline edit)
- Goal: Modal dialog showing all task details with inline editing

Requirements:
1. **Modal Trigger:**
   - Click anywhere on task row (except checkbox/priority/tags) → Open modal
   - Keyboard: Press Space/Enter when task focused → Open modal
   - URL update: /today?task=<taskId> (for deep linking)

2. **Modal Content:**
   - **Header:**
     - Task title (large, editable inline)
     - Close button (X top-right)
     - Project badge (if task belongs to project)
   
   - **Body:**
     - ✅ Status checkbox (Complete/Incomplete)
     - 📅 Due date picker (calendar dropdown)
     - 🔴 Priority selector (same as Prompt 1.2)
     - 🏷️ Tags (same as Prompt 1.3)
     - 📝 Description (Textarea, rich text optional)
     - 📎 Attachments (Future - placeholder for now)
     - 🔁 Recurring pattern (if applicable, read-only for now)
   
   - **Footer:**
     - Created date (small gray text)
     - Last updated date
     - Delete button (left, red, with confirmation)
     - Save button (right, blue, or auto-save)

3. **Inline Editing:**
   - All fields editable directly in modal
   - Auto-save on blur (debounced 500ms)
   - Or "Save" button (user preference)

4. **Due Date Picker:**
   - Use shadcn/ui Calendar component
   - Quick options: Today, Tomorrow, Next week, Custom
   - Time picker optional (default 9:00 AM if not set)

5. **Description Field:**
   - Textarea for now (Tiptap rich text in future)
   - Auto-expand as user types
   - Max height with scroll
   - Placeholder: "Add description..."

6. **Keyboard Shortcuts:**
   - ESC → Close modal
   - Cmd/Ctrl+Enter → Save and close
   - Cmd/Ctrl+Backspace → Delete task

7. **State Management:**
   - Open/close via Zustand store: useModalStore
   - Task data fetched on open (if not already loaded)
   - All edits update Zustand → Supabase

Styling (TailwindCSS):
- Modal: Fixed overlay (bg-black/50), centered card
- Card: max-w-2xl, p-6, rounded-lg, shadow-xl
- Fields: Grouped with labels, mb-4 spacing
- Responsive: Full-screen on mobile (<768px)

Components:
1. TaskDetailModal.tsx - Main modal component
2. DueDatePicker.tsx - Calendar dropdown
3. DescriptionEditor.tsx - Textarea (future: Tiptap)
4. useModalStore.ts - Zustand store for modal state

Database (Supabase):
- Table: tasks
- Columns: title, description, due_date, priority, status, project_id
- Fetch: Join with projects, tags, and recurring_patterns

Expected Output:
1. TaskDetailModal.tsx
2. DueDatePicker.tsx
3. DescriptionEditor.tsx (simple textarea)
4. useModalStore.ts
5. Updated TaskItem.tsx (add onClick handler)
6. Types: ModalState interface

Testing Checklist:
- [ ] Modal opens on task click
- [ ] All fields display correctly
- [ ] Inline editing works for all fields
- [ ] Due date picker works
- [ ] Auto-save triggers on blur
- [ ] ESC closes modal
- [ ] Delete button works (with confirmation)
- [ ] URL updates with task ID
- [ ] Deep link works (open modal from URL)
- [ ] Mobile responsive (full-screen)

Example Flow:
1. User clicks task "Buy groceries" in /today
2. Modal opens with full task details
3. User edits description: "Milk, bread, eggs"
4. User sets due date: Tomorrow at 5:00 PM
5. User adds priority: High
6. All changes auto-save on blur
7. User presses ESC → Modal closes
8. Task updates visible in list
```

---

#### Prompt 1.5: Delete Task 🔄

**Status:** 🔄 PLANNED (Nov 11 morning)  
**Estimated Time:** 1-2 hours

```
Add delete functionality with confirmation and undo for tasks in NEXUS Productivity OS.

Context:
- Project: Task management with safe delete
- Stack: Next.js 16, React 19, TypeScript, Zustand, Supabase
- Location: frontend/components/tasks/task-item.tsx
- Goal: Right-click menu or button to delete task with confirmation + undo

Requirements:
1. **Delete Triggers:**
   - Right-click on task → Context menu → "Delete" option
   - Hover task → Show delete icon (trash) on right
   - Keyboard: Press Delete/Backspace when task focused
   - In Task Detail Modal: Delete button in footer

2. **Confirmation Dialog:**
   - Before delete → Show confirmation dialog
   - Message: "Are you sure you want to delete '[Task Title]'?"
   - Buttons: "Cancel" (gray), "Delete" (red)
   - Keyboard: ESC → Cancel, Enter → Confirm delete

3. **Optimistic Delete:**
   - Immediately remove task from UI (fade out animation)
   - Show toast: "Task deleted. [Undo]"
   - If Supabase fails → Restore task + Show error toast

4. **Undo Feature:**
   - Toast shows "Undo" button for 5 seconds
   - Click Undo → Restore task (cancel delete in Supabase)
   - After 5 seconds → Permanent delete from Supabase
   - Multiple deletes → Stack toasts

5. **Context Menu (Right-click):**
   - Use shadcn/ui ContextMenu component
   - Options: Edit (future), Delete, Duplicate (future)
   - Position menu near cursor

6. **Animations:**
   - Delete: Fade out + slide left (200ms)
   - Restore: Fade in + slide right (200ms)
   - Toast: Slide in from bottom

7. **Database (Soft Delete - Optional):**
   - Option A: Hard delete (DELETE FROM tasks WHERE id = ?)
   - Option B: Soft delete (UPDATE tasks SET deleted_at = NOW())
   - Recommend: Hard delete for POC, soft delete for production

State Management (Zustand):
- Action: deleteTask(taskId: string)
- Undo queue: Store deleted tasks temporarily (5 seconds)
- After 5s → Actually delete from Supabase

Expected Output:
1. Updated TaskItem.tsx (add delete button + context menu)
2. DeleteConfirmDialog.tsx - Confirmation modal
3. TaskContextMenu.tsx - Right-click menu
4. Updated useTaskStore.ts (deleteTask, undoDelete actions)
5. Toast component with Undo button (use shadcn/ui Toast)

Styling (TailwindCSS):
- Delete icon: Hidden by default, show on hover
- Icon: Lucide Trash2, text-red-500 hover:text-red-700
- Confirmation dialog: Center screen, max-w-md
- Toast: Bottom-right, slide-in animation

Testing Checklist:
- [ ] Delete icon shows on hover
- [ ] Right-click shows context menu
- [ ] Delete key triggers delete
- [ ] Confirmation dialog shows
- [ ] Task removed from UI immediately
- [ ] Toast shows with Undo button
- [ ] Undo restores task
- [ ] After 5s, Supabase deletes task
- [ ] Network error restores task + shows error
- [ ] Multiple deletes work (queue)

Example Flow:
1. User hovers over task "Old task"
2. Trash icon appears on right
3. User clicks trash icon
4. Confirmation dialog: "Delete 'Old task'?"
5. User clicks "Delete"
6. Task fades out and disappears
7. Toast shows: "Task deleted. [Undo]"
8. User clicks "Undo" within 5 seconds
9. Task fades back in at original position
10. (Or) After 5s → Permanent delete from Supabase
```

---

#### Prompt 1.6: Keyboard Shortcuts 🔄

**Status:** 🔄 PLANNED (Nov 11 afternoon)  
**Estimated Time:** 2-3 hours

```
Implement comprehensive keyboard shortcuts system for NEXUS Productivity OS.

Context:
- Project: Power-user friendly task management
- Stack: Next.js 16, React 19, TypeScript
- Location: frontend/hooks/use-keyboard-shortcuts.ts + components
- Goal: Fast keyboard navigation like Todoist, Linear, Height

Requirements:
1. **Task Navigation:**
   - `j` or `↓` → Select next task
   - `k` or `↑` → Select previous task
   - `Enter` or `Space` → Open task detail modal
   - `ESC` → Close modal / Deselect task

2. **Task Actions:**
   - `x` or `e` → Toggle complete (when task selected)
   - `d` or `Delete` → Delete task (with confirmation)
   - `Shift+D` → Delete without confirmation
   - `#` → Open tag input
   - `1-4` → Set priority (1=Urgent, 4=Low, 0=None)
   - `t` → Set due date (open date picker)

3. **Task Creation:**
   - `c` or `n` → Focus on "Add task" input
   - `Cmd/Ctrl+Enter` → Create task from input
   - `Shift+Enter` → Create task and add another

4. **View Navigation:**
   - `g` then `t` → Go to Today view (/today)
   - `g` then `i` → Go to Inbox view (/inbox)
   - `g` then `p` → Go to Projects view (/projects)
   - `g` then `u` → Go to Upcoming view (/upcoming)

5. **Global Shortcuts:**
   - `Cmd/Ctrl+K` → Open command palette (future)
   - `Cmd/Ctrl+/` → Show keyboard shortcuts help modal
   - `?` → Same as Cmd+/ (show help)

6. **Multi-select (Bonus):**
   - `Shift+↑/↓` → Select multiple tasks
   - `Cmd/Ctrl+A` → Select all tasks
   - `Shift+X` → Complete all selected tasks
   - `Shift+D` → Delete all selected tasks

7. **Conflict Prevention:**
   - Disable shortcuts when typing in input fields
   - Disable shortcuts in modals (except ESC)
   - Show visual indicator of selected task (highlight)

8. **Help Modal:**
   - Press `?` or `Cmd+/` → Show shortcuts cheatsheet
   - Grouped by category (Navigation, Actions, Views)
   - Searchable (filter shortcuts by name)
   - Pretty design (like Linear's shortcuts modal)

Implementation:
- Use custom hook: useKeyboardShortcuts(config)
- Global event listener (document.addEventListener)
- Cleanup on unmount
- TypeScript types for shortcut config

Components:
1. useKeyboardShortcuts.ts - Main hook
2. KeyboardShortcutsHelp.tsx - Help modal
3. TaskFocus.tsx - Visual indicator for selected task
4. Updated TaskItem.tsx (add focus state)

Example Hook API:
```ts
const shortcuts = useKeyboardShortcuts({
  'j': () => selectNextTask(),
  'k': () => selectPreviousTask(),
  'x': () => toggleComplete(selectedTaskId),
  'g+t': () => router.push('/today'),
  // ...more shortcuts
})
```

Styling (TailwindCSS):
- Selected task: ring-2 ring-blue-500, bg-blue-50
- Keyboard shortcut badges in help modal: bg-gray-200, rounded, px-2, font-mono
- Help modal: max-w-3xl, grid layout, categorized

Expected Output:
1. useKeyboardShortcuts.ts hook
2. KeyboardShortcutsHelp.tsx modal
3. Updated TaskItem.tsx (focus state)
4. Updated TaskList.tsx (navigation logic)
5. Constants: KEYBOARD_SHORTCUTS config object
6. Types: KeyboardShortcut interface

Testing Checklist:
- [ ] j/k navigation works
- [ ] x toggles complete
- [ ] d deletes task
- [ ] c focuses add task input
- [ ] g+t goes to /today
- [ ] Cmd+K opens command palette (future)
- [ ] ? shows help modal
- [ ] Shortcuts disabled in input fields
- [ ] ESC closes modals
- [ ] Visual indicator on selected task
- [ ] Help modal displays all shortcuts
- [ ] Multi-select works (bonus)

Example Flow:
1. User presses `j` → First task selected (blue highlight)
2. User presses `j` 3 more times → 4th task selected
3. User presses `x` → Task toggled complete
4. User presses `k` → Previous task selected
5. User presses `1` → Priority set to Urgent
6. User presses `g` then `t` → Navigate to /today
7. User presses `?` → Shortcuts help modal opens
8. User presses `ESC` → Modal closes
```

#### Prompt 2: Recurring Tasks with rrule 📋

**Status:** 📋 PLANNED (Week 1)  
**Estimated Time:** 3-4 hours

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

#### Prompt 3: Rich Text Editor with Tiptap 📋

**Status:** 📋 PLANNED (Week 2)  
**Estimated Time:** 4-6 hours

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

### Phase 2: Calendar & Time Management (Week 1-2)

#### Prompt 4: Calendar View Component 📋

**Status:** 📋 PLANNED (Week 1)  
**Estimated Time:** 4-6 hours

```
Create calendar view component for NEXUS Productivity OS.

Context:
- Project: Task management with calendar view
- Stack: Next.js 16, React 19, TypeScript, react-big-calendar, Supabase
- Location: frontend/app/(productivity)/calendar/page.tsx
- Goal: Month/Week/Day views with tasks displayed on due dates

Requirements:
1. **Calendar Library:**
   - Use react-big-calendar (or @fullcalendar if preferred)
   - Install: npm install react-big-calendar date-fns
   - Views: Month (default), Week, Day

2. **Task Display:**
   - Show tasks on their due_date
   - Color-code by priority (urgent=red, high=orange, etc.)
   - Show task title + time (if set)
   - Click task → Open task detail modal

3. **Navigation:**
   - Today button → Jump to current date
   - Prev/Next buttons → Navigate months/weeks
   - Date picker → Jump to specific date

4. **Time Blocking (Week 2 - Optional):**
   - Drag tasks from sidebar → Drop on calendar time slot
   - Set task due_date + time
   - Visual time blocks (9AM-5PM grid)

5. **Integration:**
   - Fetch tasks from Supabase (where due_date IS NOT NULL)
   - Filter by workspace_id
   - Real-time updates when tasks change

6. **Views:**
   - Month: 7x5 grid, task dots/badges
   - Week: Time slots (9AM-9PM), drag-drop time blocks
   - Day: Hour-by-hour schedule

Styling (TailwindCSS):
- Calendar: Full page layout
- Header: Flex with nav buttons + view switcher
- Tasks: Small pills/badges with color
- Today: Highlighted cell (blue border)

Expected Output:
1. CalendarPage.tsx (route page)
2. CalendarView.tsx (calendar component)
3. useCalendarTasks.ts (fetch tasks hook)
4. Updated useTaskStore.ts (support time in due_date)
5. Types: CalendarEvent interface

Testing:
- [ ] Calendar displays correctly
- [ ] Tasks show on due dates
- [ ] Click task opens modal
- [ ] Navigation works
- [ ] View switcher works
- [ ] Color-coding by priority
```

---

#### Prompt 5: Command Palette (Cmd+K) 📋

**Status:** 📋 PLANNED (Week 2)  
**Estimated Time:** 3-4 hours

```
Create command palette for quick actions in NEXUS Productivity OS.

Context:
- Project: Power-user friendly command palette like Linear, Raycast
- Stack: Next.js 16, React 19, TypeScript, cmdk library
- Location: frontend/components/command/command-palette.tsx
- Trigger: Cmd+K (Mac) or Ctrl+K (Windows/Linux)

Requirements:
1. **Installation:**
   - npm install cmdk
   - Use shadcn/ui Command component (built on cmdk)

2. **Trigger:**
   - Global keyboard shortcut: Cmd/Ctrl+K
   - Show overlay modal with search input

3. **Commands:**
   - **Create:**
     - "Create task" → Open quick add
     - "Create project" → Open project modal
     - "Create page" → Navigate to new page editor
   
   - **Navigate:**
     - "Go to Today" → /today
     - "Go to Inbox" → /inbox
     - "Go to Projects" → /projects
     - "Go to Calendar" → /calendar
   
   - **Search:**
     - Search tasks by title
     - Search projects by name
     - Search pages by title
   
   - **Actions:**
     - "Toggle dark mode" (future)
     - "Show keyboard shortcuts" → Help modal
     - "Sign out"

4. **Fuzzy Search:**
   - Type "crtsk" → Match "Create task"
   - Type "tdlist" → Match "Go to Today"
   - Use cmdk's built-in fuzzy matching

5. **UI/UX:**
   - Overlay: Semi-transparent backdrop
   - Input: Large, centered, auto-focused
   - Results: List with icons + descriptions
   - Arrow keys: Navigate results
   - Enter: Execute command
   - ESC: Close palette

6. **Recent Commands:**
   - Track recently used commands
   - Show at top of results
   - Clear recent history option

Styling (TailwindCSS):
- Modal: Center screen, max-w-2xl
- Input: text-lg, p-4, border-b
- Results: Grouped by category (Create, Navigate, Search)
- Icons: Lucide React icons for each command

Expected Output:
1. CommandPalette.tsx component
2. useCommandPalette.ts hook (keyboard listener)
3. commands.config.ts (command definitions)
4. Updated layout.tsx (include CommandPalette globally)
5. Types: Command interface

Testing:
- [ ] Cmd+K opens palette
- [ ] Search works
- [ ] Commands execute correctly
- [ ] Arrow keys navigate
- [ ] Enter runs command
- [ ] ESC closes palette
- [ ] Fuzzy search matches
```

---

### Phase 3: App Mini System (Week 3-4)

#### Prompt 6: Todo List App Mini 📋

**Status:** 📋 PLANNED (Week 3)  
**Estimated Time:** 2-3 hours

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

---

#### Prompt 7: App Mini Container 📋

**Status:** 📋 PLANNED (Week 3)  
**Estimated Time:** 2-3 hours

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

### Phase 4: Dashboard Layout (Week 4)

#### Prompt 8: Grid Layout with react-grid-layout 📋

**Status:** 📋 PLANNED (Week 4)  
**Estimated Time:** 4-5 hours

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
