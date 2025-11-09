# ✅ FEATURES - Danh sách tính năng

> **Mục đích:** Checklist TẤT CẢ tính năng - Đã làm, đang làm, chưa làm.

**Cập nhật:** 9 tháng 11, 2025

---

## 📊 **TỔNG QUAN**

```
✅ Completed:     9 features  (23%)
🔄 In Progress:   5 features  (13%)
📋 Planned:      26 features  (64%)
─────────────────────────────────
   Total:        40 features
```

---

## ✅ **ĐÃ HOÀN THÀNH (8)**

### **1. Database & Authentication**

#### ✅ 1.1 Database Schema v2

- **Mô tả:** 11 tables (tasks, projects, pages, workspaces, etc.)
- **Ngày hoàn thành:** Nov 7, 2025
- **File:** `docs/04_technical/architecture/database-schema-v2-productivity.sql`

#### ✅ 1.2 Google OAuth Authentication

- **Mô tả:** Login bằng Google account
- **Ngày hoàn thành:** Nov 7, 2025
- **Route:** `/login`

---

### **2. Task Management - Basic**

#### ✅ 2.1 Add Task (Quick Add)

- **Mô tả:** Nhập task nhanh, Enter để thêm
- **Component:** `TaskQuickAdd.tsx`
- **Ngày hoàn thành:** Nov 7, 2025

#### ✅ 2.2 Display Tasks (List View)

- **Mô tả:** Hiển thị danh sách tasks
- **Component:** `TaskList.tsx`
- **Ngày hoàn thành:** Nov 7, 2025

#### ✅ 2.3 Toggle Complete (Checkbox)

- **Mô tả:** Click checkbox để đánh dấu done/todo
- **Component:** `TaskItem.tsx`
- **Ngày hoàn thành:** Nov 7, 2025

#### ✅ 2.4 Filter Tasks (Today/Inbox)

- **Mô tả:** Lọc tasks theo due date
- **Routes:** `/today`, `/inbox`
- **Ngày hoàn thành:** Nov 7, 2025

---

### **3. Projects & Kanban**

#### ✅ 3.1 Kanban Board

- **Mô tả:** Drag & drop tasks giữa columns (TODO/IN PROGRESS/DONE)
- **Component:** `KanbanBoard.tsx`
- **Ngày hoàn thành:** Nov 8, 2025
- **Prompt:** Prompt 1 - AI_PROMPTS.md

#### ✅ 3.2 Project List Page

- **Mô tả:** Hiển thị danh sách projects
- **Route:** `/projects`
- **Ngày hoàn thành:** Nov 7, 2025

#### ✅ 3.3 Edit Task Inline

- **Mô tả:** Double-click task title → Edit inline, Enter/Blur to save, ESC to cancel
- **Component:** `TaskItem.tsx` + `useInlineEdit` hook
- **Ngày hoàn thành:** Nov 9, 2025
- **Prompt:** Prompt 1.1 - AI_PROMPTS.md
- **Features:**
  - Optimistic UI updates
  - Validation (min 1, max 200 chars)
  - Loading indicator
  - Error rollback
  - Reusable hook for future inline edits

---

## 🔄 **ĐANG LÀM (5 - Tuần này)**

### **4. Task Management - Polish**

#### 🔄 4.1 Set Priority

- **Mô tả:** Dropdown chọn priority (Urgent/High/Medium/Low/None)
- **Timeline:** Nov 9 (Thứ 7 chiều)
- **Prompt:** Prompt 1.2

#### 🔄 4.2 Add Tags

- **Mô tả:** Add/remove tags cho tasks (#work, #personal)
- **Timeline:** Nov 10 (Chủ nhật sáng)
- **Prompt:** Prompt 1.3

#### 🔄 4.3 Task Detail Modal

- **Mô tả:** Click task → Modal hiện full info (description, due date, priority, tags)
- **Timeline:** Nov 10 (Chủ nhật chiều)
- **Prompt:** Prompt 1.4

#### 🔄 4.5 Delete Task

- **Mô tả:** Right-click → Delete (với Undo option)
- **Timeline:** Nov 11 (Thứ 2 sáng)
- **Prompt:** Prompt 1.5

#### 🔄 4.6 Keyboard Shortcuts

- **Mô tả:** j/k navigate, x complete, d delete, Cmd+N new task
- **Timeline:** Nov 11 (Thứ 2 chiều)
- **Prompt:** Prompt 1.6

---

## 📋 **CHƯA LÀM (26)**

### **5. Recurring Tasks (Week 1)**

#### 📋 5.1 Recurring Pattern UI

- **Mô tả:** Dropdown chọn pattern (Daily, Weekly, Every 2 days, etc.)
- **Timeline:** Week 1
- **Priority:** HIGH

#### 📋 5.2 rrule Integration

- **Mô tả:** Dùng rrule library để generate recurring tasks
- **Timeline:** Week 1
- **Priority:** HIGH

#### 📋 5.3 Next Occurrence Calculation

- **Mô tả:** Tính task lặp lại khi nào
- **Timeline:** Week 1
- **Priority:** MEDIUM

---

### **6. Calendar View (Week 1-2)**

#### 📋 6.1 Calendar Component

- **Mô tả:** Month/Week/Day views
- **Library:** react-big-calendar
- **Timeline:** Week 1
- **Priority:** HIGH

#### 📋 6.2 Time Blocking

- **Mô tả:** Drag task vào calendar, chọn time slot
- **Timeline:** Week 2
- **Priority:** HIGH

#### 📋 6.3 Drag Events on Calendar

- **Mô tả:** Move tasks giữa các ngày
- **Timeline:** Week 2
- **Priority:** MEDIUM

---

### **7. Pages (Notion-like) (Week 2-3)**

#### 📋 7.1 Tiptap Editor Integration

- **Mô tả:** Rich text editor (bold, italic, headings, etc.)
- **Timeline:** Week 2
- **Priority:** HIGH

#### 📋 7.2 Create/Edit Page

- **Mô tả:** CRUD pages
- **Timeline:** Week 2
- **Priority:** HIGH

#### 📋 7.3 Embed Tasks in Pages

- **Mô tả:** @mention task trong page
- **Timeline:** Week 3
- **Priority:** MEDIUM

#### 📋 7.4 Page Templates

- **Mô tả:** Templates cho Meeting Notes, Project Brief, etc.
- **Timeline:** Week 3
- **Priority:** LOW

---

### **8. Command Palette (Week 2)**

#### 📋 8.1 Cmd+K Quick Actions

- **Mô tả:** Press Cmd+K → Search/Create tasks, projects, pages
- **Library:** cmdk
- **Timeline:** Week 2
- **Priority:** HIGH

#### 📋 8.2 Fuzzy Search

- **Mô tả:** Type "crtsk" → "Create Task"
- **Timeline:** Week 2
- **Priority:** MEDIUM

---

### **9. App Minis (Week 3-4)**

#### 📋 9.1 CRM Mini

- **Mô tả:** Simple contact management
- **Timeline:** Week 3
- **Priority:** MEDIUM

#### 📋 9.2 Habit Tracker Mini

- **Mô tả:** Daily habits checklist
- **Timeline:** Week 3
- **Priority:** MEDIUM

#### 📋 9.3 Pomodoro Timer Mini

- **Mô tả:** 25-min focus timer
- **Timeline:** Week 4
- **Priority:** LOW

#### 📋 9.4 Dashboard Widgets

- **Mô tả:** Add minis vào dashboard
- **Timeline:** Week 4
- **Priority:** LOW

---

### **10. Polish & Optimization (Week 4+)**

#### 📋 10.1 Loading Skeletons

- **Timeline:** Week 4
- **Priority:** LOW

#### 📋 10.2 Empty States

- **Timeline:** Week 4
- **Priority:** LOW

#### 📋 10.3 Error Boundaries

- **Timeline:** Week 4
- **Priority:** MEDIUM

#### 📋 10.4 Toast Notifications

- **Timeline:** Week 4
- **Priority:** MEDIUM

#### 📋 10.5 Mobile Responsive

- **Timeline:** Week 5
- **Priority:** HIGH

#### 📋 10.6 Dark Mode

- **Timeline:** Week 5
- **Priority:** LOW

#### 📋 10.7 Onboarding Flow

- **Timeline:** Week 6
- **Priority:** HIGH

#### 📋 10.8 Search & Filters Advanced

- **Timeline:** Week 6
- **Priority:** MEDIUM

---

## 🎯 **PRIORITY MATRIX**

### **Must Have (MVP):**

```
✅ Task CRUD Basic
✅ Kanban Board
🔄 Task Management Polish (6 features)
📋 Recurring Tasks
📋 Calendar View
📋 Command Palette
📋 Mobile Responsive
```

### **Nice to Have:**

```
📋 Pages (Notion-like)
📋 App Minis
📋 Dark Mode
📋 Advanced Search
```

### **Can Wait:**

```
📋 Page Templates
📋 Dashboard Widgets
📋 Integrations (Google Calendar, etc.)
```

---

## 📈 **PROGRESS TIMELINE**

```
Week 0  (Nov 7-13):   [████████░░░░░░░░░░] 40%  ← You are here
Week 1  (Nov 14-20):  [██████████████░░░░] 70%
Week 2  (Nov 21-27):  [████████████████░░] 80%
Week 3  (Nov 28-Dec4): [██████████████████] 90%
Week 4+ (Dec 5+):     [████████████████████] 100% MVP
```

---

## 🔗 **LINKS**

- **Roadmap chi tiết:** [ROADMAP.md](../03_roadmap/ROADMAP.md)
- **AI Prompts:** [AI_PROMPTS.md](../02_ai-prompts/AI_PROMPTS.md)
- **Ý tưởng mới:** [IDEAS.md](../03_roadmap/IDEAS.md)

---

**Last Updated:** November 8, 2025  
**Next Update:** November 9, 2025 (khi xong Prompt 1.1)
