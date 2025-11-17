# 🎯 NEXUS - TRẠNG THÁI DỰ ÁN & LỘ TRÌNH (Cập nhật 13/11/2024)

**Phiên bản:** 2.0.0 - Productivity OS Core (Pivot sang Platform)
**Giai đoạn:** Week 0 - Architecture & Design (Pivot to Platform)
**Cập nhật lớn cuối:** Pivot chiến lược từ Task Management polish sang Platform MVP

---

## 📊 **TRẠNG THÁI HIỆN TẠI**

### **✅ ĐÃ HOÀN THÀNH (Week 0)**

#### **1. Cấu trúc Dự án**

- ✅ Root directory đã dọn dẹp (xóa monorepo structure)
- ✅ Frontend structure tái tổ chức cho Productivity OS
- ✅ Tạo `(productivity)` route group trong Next.js
- ✅ Tổ chức folder hợp lý (70% Productivity, 20% Pages, 10% App Minis)

#### **2. Database Schema v2**

- ✅ 11 tables đã thiết kế (tasks, projects, pages, time_blocks, etc.)
- ✅ Row Level Security (RLS) policies đã cấu hình
- ✅ Hỗ trợ recurring tasks nâng cao (rrule field)
- ✅ Migration script đã tạo: `002_productivity_core_schema.sql`
- ✅ **ĐÃ DEPLOY** - Schema đã deploy thành công lên Supabase

#### **3. Dependencies Đã Cài**

- ✅ Task Management: `rrule` (recurring), `date-fns`
- ✅ State Management: `zustand`, `immer`
- ✅ Drag & Drop: `@dnd-kit/*` (cho Kanban)
- ✅ Calendar: `react-big-calendar`
- ✅ Command Palette: `cmdk`
- ✅ Editor: `@tiptap/extension-task-list`, `@tiptap/extension-task-item`
- ✅ Keyboard Shortcuts: `react-hotkeys-hook`
- ✅ Tổng packages: 284 (125MB node_modules)

#### **4. Core Components Đã Build**

```
frontend/
├── app/(productivity)/
│   ├── layout.tsx               ✅ Shared sidebar/header
│   ├── today/page.tsx           ✅ My Day smart list
│   ├── inbox/page.tsx           ✅ Unsorted tasks
│   └── projects/page.tsx        ✅ Projects list (placeholder)
│
├── components/
│   ├── tasks/
│   │   ├── task-item.tsx        ✅ Single task với checkbox
│   │   ├── task-list.tsx        ✅ Filtered task list
│   │   └── task-quick-add.tsx   ✅ Quick add input (Enter to add)
│   ├── dashboard/
│   │   ├── productivity-sidebar.tsx  ✅ Navigation
│   │   └── productivity-header.tsx   ✅ Search bar
│   └── projects/
│       ├── project-grid.tsx     ✅ Placeholder
│       └── create-project-button.tsx ✅ Placeholder
│
├── lib/
│   ├── stores/
│   │   └── tasks.ts             ✅ Zustand + Immer (filters, sorting)
│   └── hooks/
│       └── use-tasks.ts         ✅ Supabase CRUD integration
│
└── types/
    └── index.ts                 ✅ Task, Project, Page types
```

#### **5. Nền Tảng Kỹ Thuật**

- ✅ TypeScript: Zero errors
- ✅ Next.js 16.0.1 (App Router, Turbopack)
- ✅ Supabase client/server setup
- ✅ TailwindCSS 4 + shadcn/ui
- ✅ Dev server đang chạy: http://localhost:3000

---

## 🔄 **PIVOT CHIẾN LƯỢC - 13/11/2024**

> **QUYẾT ĐỊNH:** Dừng việc "đánh bóng" Task Management. Bắt đầu xây dựng yếu tố khác biệt: **Platform (Dashboard Grid + App Builder)**.

### **Thay đổi tầm nhìn:**

- ❌ **CŨ:** Task Manager tốt hơn Notion/Todoist
- ✅ **MỚI:** Platform để build & share mini-apps (như Notion dashboard + iOS home screen)

### **Thay đổi North Star Metric:**

- ❌ **CŨ:** "tasks created" (giống tất cả task managers)
- ✅ **MỚI:** "apps built and shared" (độc nhất)

### **Impact lên Roadmap:**

- ✅ Task Management là "đủ tốt" - DỪNG polish
- 🚀 NEW FOCUS: Dashboard Grid, App Minis, App Builder
- 📋 BACKLOG: Tags UI, Modal chi tiết, Delete confirmation, Keyboard shortcuts

**Xem:** [`docs/03_roadmap/ROADMAP.md`](./ROADMAP.md) để hiểu chiến lược mới chi tiết

---

## ⚠️ **BLOCKERS & NHIỆM VỤ QUAN TRỌNG**

### **PHẢI LÀM TRƯỚC KHI CODE TIẾP:**

#### **1. Database Schema ✅ ĐÃ HOÀN THÀNH**

```sql
-- File: supabase/migrations/20251107000001_productivity_core_schema.sql
-- Trạng thái: ✅ ĐÃ DEPLOY - Schema đã deploy thành công lên Supabase
-- Kết quả: Đã tạo 6 tables (projects, tasks, recurring_instances, time_blocks, time_entries, pages)
-- Deploy với: supabase db push
-- Xác minh: Tất cả tables đã tạo và có thể truy cập
```

**Trạng thái:**

- ✅ Frontend code giờ hoạt động với database tables
- ✅ `useTasks` hook kết nối thành công với `tasks` table
- ✅ Task management features có thể test được

#### **2. Architecture & Design (Week 0) 🔥 PRIORITY CAO NHẤT**

**Trạng thái:** Đang trong Week 0 (13-20/11)

**Mục tiêu:** Quyết định kiến trúc App Mini system trước khi code

**Nhiệm vụ:**

- [ ] **Research Libraries** (1-2 ngày)
  - `react-grid-layout` (drag-drop grid)
  - `Sandpack` hoặc `@monaco-editor/react` (code editor)
  - iframe sandboxing strategies
  - So sánh: Client-side vs Server-side execution

- [ ] **Viết ADR-001** (1 ngày)
  - File: `docs/04_technical/architecture/decisions/ADR-001-app-mini-system.md`
  - Nội dung: Context, Decision, Consequences, Alternatives

- [ ] **Dashboard Grid Wireframes** (2-3 ngày)
  - Sketch trên giấy: Layout, AppMiniCard sizes, States
  - Digital wireframes: Figma/Excalidraw (3 screens)
  - Export: `UX-UI/wireframes/dashboard-grid.png`

**Tại sao quan trọng:**

- Quyết định sai kiến trúc → Phải refactor toàn bộ sau này
- Security risks cao (App Minis chạy user code)
- Wireframes giúp code đúng ngay từ đầu

**File:** [`docs/01_status/THIS_WEEK.md`](../01_status/THIS_WEEK.md) - Chi tiết Week 0 deliverables

#### **3. Tạo Workspace & Test Data ✅ DONE**

```sql
-- Đã chạy để tạo workspace:
INSERT INTO public.workspaces (name, slug, owner_id)
VALUES (
  'My Workspace',
  'my-workspace',
  (SELECT auth.uid())
)
RETURNING id;  -- workspace_id đã lưu
```

Workspace đã tạo và frontend đã cập nhật để dùng `getOrCreateWorkspaceId()` helper.

---

## 📅 **LỘ TRÌNH 12 TUẦN (ĐÃ PIVOT)**

### **Week 0 (13-20/11): Architecture & Design** ⬅️ **BẠN Ở ĐÂY**

- [x] Pivot decision: Dừng Task Polish, focus Platform
- [x] Update ROADMAP.md, FEATURES.md, AI_PROMPTS.md
- [ ] Research: react-grid-layout, Sandpack, iframe security
- [ ] Write ADR-001: App Mini System Architecture
- [ ] Create wireframes: Dashboard Grid (3 screens)
- [ ] (Optional) Technical spike: Test react-grid-layout prototype

**Deliverables:** ADR-001, Wireframes, Technical spike report (optional)

---

### **Week 1 (21-27/11): Dashboard Infrastructure**

**Mục tiêu:** Build Dashboard Grid component functional

**Deliverables:**

- [ ] Component: `DashboardGrid.tsx` (drag-drop grid using react-grid-layout)
- [ ] Component: `AppMiniCard.tsx` (card wrapper với resize/delete)
- [ ] Hook: `useGridLayout.ts` (persist layout to database)
- [ ] Page: `/dashboard` route functional
- [ ] Test: Can add/drag/resize/delete cards

**Files to Create:**

- `app/(productivity)/dashboard/page.tsx` - Dashboard page
- `components/dashboard/DashboardGrid.tsx` - Grid container
- `components/dashboard/AppMiniCard.tsx` - Card wrapper
- `lib/hooks/useGridLayout.ts` - Layout state management

---

### **Week 2 (28/11 - 4/12): First App Minis**

**Mục tiêu:** Build 2 App Minis đơn giản để test hệ thống

**Deliverables:**

- [ ] **App Mini #1: Quick Notes** (Textarea + Save)
- [ ] **App Mini #2: Pomodoro Timer** (25 min countdown)
- [ ] App registry system (register new app minis)
- [ ] Data persistence (mỗi app lưu state riêng)

**Files to Create:**

- `components/app-minis/QuickNotes.tsx`
- `components/app-minis/PomodoroTimer.tsx`
- `lib/app-registry.ts` - Register & discover apps

---

### **Week 3-4 (5-18/12): App Builder v0.1**

**Mục tiêu:** No-code builder để users tự build mini-apps

**Deliverables:**

- [ ] Builder canvas (drag-drop components)
- [ ] 3 basic components: Text Input, Button, Text Block
- [ ] Component palette (sidebar with available components)
- [ ] Properties panel (configure selected component)
- [ ] Preview mode (test app before saving)
- [ ] Save & load app definitions (JSON to database)

**Files to Create:**

- `app/app-builder/page.tsx` - Builder page
- `components/app-builder/BuilderCanvas.tsx` - Drop zone
- `components/app-builder/ComponentPalette.tsx` - Component list
- `components/app-builder/PropertiesPanel.tsx` - Config panel
- `lib/app-builder/component-registry.ts` - Available components

---

### **Week 5-8: User Validation & Feedback**

**Mục tiêu:** Ship MVP, get users, gather feedback

**Deliverables:**

- [ ] Public beta launch (landing page + signup)
- [ ] 10 beta users testing (invite from network)
- [ ] Analytics: Track "apps created", "apps shared"
- [ ] User interviews: What features needed most?
- [ ] Bug fixes & polish based on feedback

**Success Metrics:**

- 50 signups
- 10 active users (3+ sessions)
- 5 apps created by users (not us)
- 2 apps shared publicly

---

### **Week 9-12: Iteration or Pivot Decision**

**Mục tiêu:** Decide GO/NO-GO based on Week 5-8 data

**Scenario A - GO (Traction tốt):**

- [ ] Add more builder components (Checkbox, Dropdown, etc.)
- [ ] App marketplace (browse & install community apps)
- [ ] Collaboration (share apps with team)
- [ ] Pricing: Launch paid tier ($15/month for unlimited apps)

**Scenario B - NO-GO (Không có traction):**

- [ ] Analyze why (interviews, data)
- [ ] Pivot hoặc shut down
- [ ] Document learnings

**GO/NO-GO Decision Criteria:**

- ✅ GO nếu: 10+ active users, 1-2 paying users, NPS > 40
- ❌ NO-GO nếu: < 5 active users, 0 paid conversions, users confused

---

## 🛠️ **KIẾN TRÚC KỸ THUẬT**

### **Tech Stack Tổng Quan**

```yaml
Frontend:
  - Next.js 16 (App Router, Turbopack)
  - TypeScript 5
  - TailwindCSS 4
  - shadcn/ui (Radix UI)

State Management:
  - Zustand + Immer (optimistic updates)
  - @tanstack/react-query (optional sau)

Backend:
  - Supabase (PostgreSQL + Auth + Storage)
  - Row Level Security (RLS)

Libraries:
  - rrule (recurring tasks RFC-5545)
  - @dnd-kit (drag & drop Kanban)
  - @tiptap (rich text editor)
  - react-big-calendar (calendar view)
  - cmdk (command palette)
  - react-hotkeys-hook (keyboard shortcuts)
  - react-grid-layout (dashboard grid) ← MỚI cho Platform

Deployment:
  - Frontend: Vercel (free tier)
  - Backend: Supabase Cloud (free tier)
  - Cost: $0/month cho 500-1000 users đầu
```

### **Database Schema v2 (11 Tables)**

```
CORE (70% Priority - Productivity OS):
1. tasks                  - Quản lý tasks chính (rrule cho recurring)
2. projects               - Tổ chức projects
3. recurring_instances    - Track recurring task instances
4. time_blocks            - Calendar time blocking
5. time_entries           - Time tracking

FLEXIBILITY (20% Priority):
6. pages                  - Notion-like blank canvas (Tiptap JSON)

FOUNDATION (Bắt buộc):
7. profiles               - User data (extends auth.users)
8. workspaces             - Team/workspace management
9. workspace_members      - Collaboration & roles

EXTENSIBILITY (10% Priority - FOCUS MỚI):
10. dashboards            - App mini containers (cho Platform)
11. app_minis             - Embedded apps metadata (CRM, Habit, Pomodoro, v.v.)
```

**Tính năng chính:**

- ✅ Advanced Recurring: `rrule` field hỗ trợ "every 2 days", "last Friday of month"
- ✅ Sub-tasks: `parent_task_id` cho hierarchical tasks
- ✅ Flexible Assignment: tasks có thể ở projects hoặc inbox (`project_id = NULL`)
- ✅ Multi-tenant: RLS policies đảm bảo workspace-level data isolation
- ✅ JSONB Flexibility: config/data fields cho extensibility không cần migrations

---

## 📝 **CÁC BƯỚC TIẾP THEO**

### **🚀 PIVOT CHIẾN LƯỢC: Platform MVP (Week 0-4)**

**Trạng thái:** ✅ Database đã deploy, Task Management hoạt động
**Focus:** Architecture & Design cho Dashboard Grid + App Builder

### **Week 0 (13-20/11): Architecture & Design - GIAI ĐOẠN HIỆN TẠI**

**Priority 1: Architecture Decision Record**

```bash
# 1. Research libraries (1-2 ngày)
- react-grid-layout (drag-drop grid)
- Sandpack hoặc @monaco-editor/react (code editor)
- iframe sandboxing strategies

# 2. Viết ADR (1 ngày)
- File: docs/04_technical/architecture/decisions/ADR-001-app-mini-system.md
- Nội dung: Context, Decision, Consequences, Alternatives

# 3. Review security (1 ngày)
- Check XSS risks, infinite loops, memory leaks
```

**Priority 2: Dashboard Grid Wireframes**

```bash
# 1. Sketch wireframes (1-2 ngày)
- Dashboard layout (sidebar + grid)
- AppMiniCard sizes (2x2, 2x4, 4x4)
- States: Empty, Loading, Dragging

# 2. Digital wireframes (1-2 ngày)
- Tool: Figma hoặc Excalidraw
- Export to: UX-UI/wireframes/dashboard-grid.png
```

**Priority 3: Technical Spike (Optional)**

```bash
# Test react-grid-layout với minimal prototype
mkdir frontend/prototypes
npm create vite@latest grid-test -- --template react-ts
npm install react-grid-layout
```

**Deliverables cuối Week 0:**
- ✅ ADR-001 hoàn thiện và đã review security
- ✅ Dashboard Grid wireframes (3 screens)
- ⚠️ Technical spike report (optional)

---

### **Week 1+ (21/11+): Giai Đoạn Implementation**

**Sau khi Week 0 hoàn thành, tiếp tục với:**

1. **Week 1 (21-27/11):** Build Dashboard Grid component
2. **Week 2 (28/11-4/12):** Tạo 2 App Minis đầu tiên (Notes, Timer)
3. **Week 3-4 (5-18/12):** Build App Builder v0.1

**Xem:** [`docs/03_roadmap/ROADMAP.md`](./ROADMAP.md) cho timeline chi tiết

---

## 📚 **CHỈ MỤC TÀI LIỆU**

### **Bắt Đầu**

- `README.md` - Tổng quan dự án nhanh
- `QUICKSTART.md` - Setup từng bước (15 phút)
- `docs/00_start-here/README.md` - Điều hướng tài liệu
- `docs/00_start-here/QUICKSTART_AI.md` - Hướng dẫn workflow hàng ngày
- `docs/04_technical/SETUP.md` - Setup môi trường development

### **Trạng Thái & Tiến Độ**

- `docs/01_status/THIS_WEEK.md` - Focus của tuần hiện tại và priorities
- `docs/01_status/FEATURES.md` - Checklist triển khai features
- `docs/01_status/BUGS.md` - Bugs đã biết và issues
- `docs/01_status/UI_UX.md` - Trạng thái UI components

### **Kiến Trúc**

- `docs/04_technical/architecture/database-schema-v2-productivity.sql` - Full schema (tham khảo)
- `supabase/migrations/` - **Database migrations (deploy với `supabase db push`)**
- `docs/04_technical/architecture/decisions.md` - Lý do chọn tech stack
- `docs/04_technical/TESTING_STRATEGY.md` - Triết lý và practices testing

### **Lộ Trình & Planning**

- `docs/03_roadmap/ROADMAP.md` - Lộ trình 12 tuần chi tiết
- `docs/03_roadmap/PROJECT_STATUS.md` - File này (tài liệu master)
- `docs/03_roadmap/HISTORY.md` - Timeline và quyết định dự án
- `docs/03_roadmap/IDEAS.md` - Backlog ý tưởng features

### **AI Development**

- `docs/02_ai-prompts/AI_PROMPTS.md` - Thư viện AI prompts
- `docs/02_ai-prompts/COMPLETED.md` - Log prompts đã hoàn thành
- `docs/02_ai-prompts/templates/` - Template prompts

### **User Research**

- `docs/05_research/interview-script.md` - Câu hỏi phỏng vấn
- `docs/05_research/user-personas.md` - Hồ sơ users mục tiêu
- `docs/05_research/success-metrics.md` - KPIs để track
- `docs/05_research/interview-notes/` - Folder insights phỏng vấn

### **Knowledge Base**

- `BRAIN_DUMP.md` - Repository kiến thức hoàn chỉnh (ADRs, bugs, ideas, patterns)

### **AI Assistance**

- `docs/AI_PROMPTS.md` - Best practices làm việc với AI
- `.git-commit-template.md` - Template commit message Git

---

## 🚨 **CÁC VẤN ĐỀ ĐÃ BIẾT**

### **1. Middleware Deprecation Warning**

```
⚠ The "middleware" file convention is deprecated. Please use "proxy" instead.
```

**Impact:** Thấp (chỉ là warning, app vẫn hoạt động tốt)
**Fix:** Cập nhật lên Next.js 16 proxy pattern (Week 5)
**File:** `frontend/middleware.ts`

### **2. Missing Checkbox Radix Dependency**

**Trạng thái:** FIXED (đã cài @radix-ui/react-checkbox)
**Component:** `frontend/components/ui/checkbox.tsx`

### **3. Database Schema Deployment**

**Trạng thái:** ✅ ĐÃ DEPLOY - Schema đã deploy thành công
**Action:** Hoàn thành - Tất cả tables đã tạo trong Supabase
**Impact:** ĐÃ GIẢI QUYẾT - Frontend giờ hoạt động với database tables

---

## 💡 **MẸO ĐỂ Ở ĐÚNG HƯỚNG**

### **Sử Dụng Tài Liệu**

- **Trước khi code:** Đọc docs liên quan (vd: TIPTAP_ARCHITECTURE trước khi sửa editor)
- **Sau thay đổi lớn:** Cập nhật doc tương ứng (vd: update ROADMAP_CHECKLIST)
- **Khi bí:** Check AI_PROMPTS.md để biết cách hỏi AI

### **Follow Git Workflow**

- **Luôn commit trước thay đổi lớn:** `git commit -m "feat: description"`
- **Dùng messages mô tả:** Follow `.git-commit-template.md`
- **Tạo branches:** `feature/kanban-board`, `fix/task-list-error`

### **Ưu Tiên Tuyệt Đối**

- **70% Productivity Core:** Tasks, Kanban, Calendar
- **20% Pages:** Tiptap editor integration
- **10% App Minis:** Chỉ sau khi core hoạt động

### **User Feedback > Assumptions**

- **Phỏng vấn 10 SMEs** trước khi build advanced features
- **Test với 5 users** trước khi thêm features mới
- **Track metrics:** Signups, Active users, Task completion rate

---

## 📞 **HỖ TRỢ & TÀI NGUYÊN**

### **Khi Bạn Cần Giúp:**

1. **Check docs trước:** `docs/` folder có 20+ guides
2. **Hỏi AI với context:** Cung cấp file paths, error messages
3. **Review commit history:** `git log --oneline` để xem thay đổi gì

### **Tài Nguyên Bên Ngoài:**

- **Supabase Docs:** https://supabase.com/docs
- **Next.js 16 Docs:** https://nextjs.org/docs
- **Zustand Guide:** https://zustand-demo.pmnd.rs/
- **rrule Library:** https://github.com/jakubroztocil/rrule
- **Tiptap Docs:** https://tiptap.dev/docs
- **react-grid-layout:** https://github.com/react-grid-layout/react-grid-layout ← MỚI

---

## ✅ **TIÊU CHÍ THÀNH CÔNG**

### **Week 0 (Architecture & Design):**

- [x] Pivot decision documented ✅
- [ ] ADR-001 hoàn thiện và đã review security
- [ ] Dashboard Grid wireframes rõ ràng (3 screens)
- [ ] Hiểu rõ trade-offs của approach đã chọn
- [ ] Sẵn sàng để code Dashboard Grid vào Week 1

### **Week 1 (Dashboard Infrastructure):**

- [ ] Component `DashboardGrid.tsx` functional
- [ ] Component `AppMiniCard.tsx` với resize/delete
- [ ] Hook `useGridLayout.ts` persist layout
- [ ] Page `/dashboard` route functional
- [ ] Test: Có thể add/drag/resize/delete cards

### **Week 2 (First App Minis):**

- [ ] Quick Notes app hoạt động
- [ ] Pomodoro Timer hoạt động
- [ ] App registry system functional
- [ ] Data persistence cho mỗi app

### **Week 3-4 (App Builder v0.1):**

- [ ] Builder canvas với drag-drop
- [ ] 3 basic components (Input, Button, Text)
- [ ] Properties panel để config
- [ ] Preview mode
- [ ] Save & load app definitions

### **Week 5-8 (User Validation):**

- [ ] 50 signups
- [ ] 10 active users (3+ sessions)
- [ ] 5 apps created bởi users
- [ ] 2 apps shared publicly

### **Week 9-12 (GO/NO-GO):**

- [ ] 10 active users (3+ sessions mỗi người)
- [ ] 1-2 paying users ($15/month)
- [ ] NPS > 40
- [ ] < 500ms API response time
- [ ] Zero critical bugs

---

**Cập nhật lần cuối:** 13 tháng 11, 2024
**Phiên bản:** 2.0.0 (Pivot to Platform)
**Trạng thái:** Week 0 - Architecture & Design Phase
**Milestone tiếp theo:** ADR-001 + Wireframes + Technical Spike (20/11)
