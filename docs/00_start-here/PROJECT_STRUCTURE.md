# 📂 PROJECT STRUCTURE - Cấu trúc dự án

> **Mục đích:** Giải thích cấu trúc folder/file trong NEXUS - Tìm file ở đâu, tại sao tổ chức như vậy.

**Cập nhật:** 8 tháng 11, 2025  
**Phù hợp cho:** Người mới vào dự án, AI cần context

---

## 🌳 **CÂY THƯ MỤC TỔNG QUAN**

```
NEXUS/
├── 📁 docs/                      # ⭐ TẤT CẢ DOCUMENTATION
├── 📁 frontend/                  # ⭐ TẤT CẢ CODE
├── 📄 README.md                  # Trang chủ dự án
├── 📄 QUICKSTART.md              # Setup 15 phút
├── 📄 THIS_WEEK.md               # Focus tuần này
└── 📄 .git-commit-template.md    # Template commit message
```

---

## 📚 **DOCS/ - DOCUMENTATION (Chi tiết)**

### **Quy tắc đặt tên folder:**

- ✅ **Numbered prefix** - `00_`, `01_`, `02_`... để sort logic
- ✅ **Tên ngắn gọn** - Dễ nhớ, dễ gõ
- ✅ **Tiếng Anh** - Standard convention

```
docs/
│
├── 📁 00_start-here/             # ⭐ BẮT ĐẦU TỪ ĐÂY (Người mới)
│   ├── README.md                 # Tổng quan dự án (Tiếng Việt)
│   ├── QUICKSTART_AI.md          # Làm gì hôm nay? (10 giây)
│   ├── TECH_STACK.md             # Giải thích công nghệ
│   └── PROJECT_STRUCTURE.md      # File này!
│
├── 📁 01_status/                 # 📊 TRẠNG THÁI HIỆN TẠI
│   ├── NOW.md                    # Snapshot hôm nay
│   ├── FEATURES.md               # Checklist tính năng (✅📋🔄)
│   ├── UI_UX.md                  # Trạng thái giao diện
│   └── BUGS.md                   # Known bugs
│
├── 📁 02_ai-prompts/             # 🤖 AI PROMPTS (Quan trọng!)
│   ├── AI_PROMPTS.md             # Master prompts
│   ├── COMPLETED.md              # Prompts đã xong
│   └── templates/                # Prompt templates
│       ├── task-feature.md       # Template cho task feature
│       ├── ui-component.md       # Template cho UI component
│       └── bug-fix.md            # Template cho bug fix
│
├── 📁 03_roadmap/                # 🗺️ KẾ HOẠCH
│   ├── ROADMAP.md                # 12 tuần roadmap
│   ├── IDEAS.md                  # Ý tưởng chưa làm
│   ├── HISTORY.md                # Timeline đã làm
│   └── PROJECT_STATUS.md         # Status tổng quan (legacy)
│
├── 📁 04_technical/              # ⚙️ KỸ THUẬT
│   ├── SETUP.md                  # Hướng dẫn setup dev
│   ├── DEPLOY.md                 # Deploy database
│   └── architecture/
│       ├── decisions.md          # Quyết định kỹ thuật
│       ├── database-schema-v2-productivity.sql
│       └── migrations/
│           └── 002_productivity_core_schema.sql
│
├── 📁 05_research/               # 📚 USER RESEARCH
│   ├── interview-script.md       # Script phỏng vấn
│   ├── user-personas.md          # User personas
│   ├── success-metrics.md        # Metrics đo lường
│   └── interview-notes/          # Lưu notes phỏng vấn
│
└── 📁 archive/                   # 📦 LƯU TRỮ (Không xóa)
    ├── old-versions/             # File cũ (_OLD)
    ├── temp-fixes/               # Fix tạm (KANBAN_FIX, etc.)
    └── conversations/            # Chat history với AI
```

---

### **📖 GIẢI THÍCH TỪNG FOLDER:**

#### **00_start-here/** - Điểm bắt đầu

**Mục đích:** Người mới vào dự án đọc đầu tiên.

**Khi nào đọc:**

- ✅ Lần đầu clone project
- ✅ Quên context sau vài tuần không code
- ✅ Onboard thành viên mới

**File quan trọng nhất:**

- `QUICKSTART_AI.md` - Làm gì hôm nay? (đọc mỗi sáng)

---

#### **01_status/** - Trạng thái hiện tại

**Mục đích:** Snapshot nhanh của dự án.

**Khi nào đọc:**

- ✅ Muốn biết tính năng nào đã xong
- ✅ Check bugs hiện tại
- ✅ Đánh giá UI/UX

**Update tần suất:**

- `NOW.md` - Mỗi ngày
- `FEATURES.md` - Khi xong feature mới
- `BUGS.md` - Khi phát hiện/fix bug

---

#### **02_ai-prompts/** - AI Prompts

**Mục đích:** Kho prompts để AI generate code.

**Khi nào dùng:**

- ✅ Mỗi ngày (copy prompt → paste AI)
- ✅ Tạo feature mới (dùng templates)
- ✅ Mark completed (update COMPLETED.md)

**Workflow:**

```
1. Đọc AI_PROMPTS.md
2. Copy prompt
3. Paste vào ChatGPT/Claude
4. AI generate code
5. Test → Fix
6. ✅ Done → Update COMPLETED.md
```

---

#### **03_roadmap/** - Kế hoạch

**Mục đích:** Định hướng dài hạn.

**Khi nào đọc:**

- ✅ Đầu tuần (plan tuần)
- ✅ Đầu tháng (review roadmap)
- ✅ Brainstorm feature mới (IDEAS.md)

**File quan trọng:**

- `ROADMAP.md` - 12 tuần roadmap
- `IDEAS.md` - Ghi ý tưởng ngẫu nhiên

---

#### **04_technical/** - Kỹ thuật

**Mục đích:** Hướng dẫn setup, deploy, debug.

**Khi nào đọc:**

- ✅ Setup lần đầu (SETUP.md)
- ✅ Deploy database (DEPLOY.md)
- ✅ Hiểu database schema (architecture/)
- ✅ Gặp lỗi kỹ thuật

---

#### **05_research/** - User Research

**Mục đích:** User interviews, personas, metrics.

**Khi nào dùng:**

- ✅ Chuẩn bị phỏng vấn (interview-script.md)
- ✅ Lưu notes phỏng vấn (interview-notes/)
- ✅ Review insights (cuối tuần)

---

#### **archive/** - Lưu trữ

**Mục đích:** Giữ file cũ, không xóa (có thể cần xem lại).

**Quy tắc:**

- ✅ File `_OLD` → vào `old-versions/`
- ✅ Fix tạm thời → vào `temp-fixes/`
- ✅ Chat history → vào `conversations/`

---

## 💻 **FRONTEND/ - CODE (Chi tiết)**

```
frontend/
│
├── 📁 app/                       # Next.js App Router
│   ├── layout.tsx                # Root layout
│   ├── page.tsx                  # Home page (/)
│   ├── globals.css               # Global styles
│   │
│   ├── 📁 (auth)/                # Auth routes (grouped)
│   │   └── login/
│   │       └── page.tsx          # /login
│   │
│   ├── 📁 (productivity)/        # Main app routes (grouped)
│   │   ├── layout.tsx            # Sidebar + Header
│   │   ├── today/
│   │   │   └── page.tsx          # /today (My Day)
│   │   ├── inbox/
│   │   │   └── page.tsx          # /inbox
│   │   ├── projects/
│   │   │   ├── page.tsx          # /projects (list)
│   │   │   └── [id]/
│   │   │       ├── page.tsx      # /projects/:id (detail)
│   │   │       └── board/
│   │   │           └── page.tsx  # /projects/:id/board (Kanban)
│   │   ├── upcoming/
│   │   │   └── page.tsx          # /upcoming
│   │   ├── calendar/
│   │   │   └── page.tsx          # /calendar
│   │   └── pages/
│   │       └── [id]/
│   │           └── page.tsx      # /pages/:id (Notion-like)
│   │
│   ├── 📁 auth/
│   │   └── callback/
│   │       └── route.ts          # OAuth callback
│   │
│   └── 📁 dashboard/
│       └── page.tsx              # /dashboard
│
├── 📁 components/                # React Components
│   ├── 📁 tasks/
│   │   ├── task-item.tsx         # Single task
│   │   ├── task-list.tsx         # List of tasks
│   │   ├── task-quick-add.tsx    # Quick add input
│   │   └── task-filters.tsx      # Filter buttons
│   │
│   ├── 📁 kanban/
│   │   ├── kanban-board.tsx      # Board container
│   │   ├── kanban-column.tsx     # Column (TODO/IN PROGRESS/DONE)
│   │   └── kanban-card.tsx       # Task card
│   │
│   ├── 📁 projects/
│   │   ├── project-grid.tsx      # Project cards grid
│   │   └── create-project-button.tsx
│   │
│   ├── 📁 calendar/
│   │   └── calendar-view.tsx     # Calendar component
│   │
│   ├── 📁 pages/
│   │   └── page-editor.tsx       # Tiptap editor
│   │
│   ├── 📁 dashboard/
│   │   ├── productivity-sidebar.tsx  # Left sidebar
│   │   └── productivity-header.tsx   # Top header
│   │
│   ├── 📁 editor/
│   │   ├── tiptap-editor.tsx     # Rich text editor
│   │   └── editor-toolbar.tsx    # Editor toolbar
│   │
│   ├── 📁 auth/
│   │   └── logout-button.tsx     # Logout button
│   │
│   └── 📁 ui/                    # shadcn/ui components
│       ├── button.tsx
│       ├── dialog.tsx
│       ├── dropdown-menu.tsx
│       ├── input.tsx
│       ├── calendar.tsx
│       └── ...                   # 30+ components
│
├── 📁 lib/                       # Utilities & Logic
│   ├── 📁 stores/                # Zustand stores
│   │   ├── tasks.ts              # Task state
│   │   ├── projects.ts           # Project state
│   │   └── pages.ts              # Page state
│   │
│   ├── 📁 hooks/                 # Custom hooks
│   │   ├── use-tasks.ts          # Task CRUD logic
│   │   ├── use-projects.ts       # Project logic
│   │   └── use-keyboard.ts       # Keyboard shortcuts
│   │
│   ├── 📁 supabase/              # Supabase clients
│   │   ├── client.ts             # Client-side
│   │   └── server.ts             # Server-side
│   │
│   └── utils/                    # Helper functions
│       ├── cn.ts                 # Tailwind class merger
│       ├── date.ts               # Date utilities
│       └── rrule.ts              # Recurring logic
│
├── 📁 types/                     # TypeScript types
│   ├── database.types.ts         # Supabase generated types
│   ├── task.types.ts             # Task types
│   ├── project.types.ts          # Project types
│   └── index.ts                  # Re-exports
│
├── 📁 public/                    # Static files
│   ├── images/
│   └── fonts/
│
├── 📄 package.json               # Dependencies
├── 📄 tsconfig.json              # TypeScript config
├── 📄 tailwind.config.ts         # Tailwind config
├── 📄 next.config.ts             # Next.js config
├── 📄 .env.local                 # Environment variables (NOT in git)
└── 📄 README.md                  # Frontend docs
```

---

### **📖 GIẢI THÍCH FRONTEND STRUCTURE:**

#### **app/ - Next.js App Router**

**Route Groups:**

- `(auth)` - Routes không cần sidebar (login)
- `(productivity)` - Routes có sidebar (today, inbox, projects)

**Ưu điểm:**

- ✅ Folder `(auth)` không tạo route `/auth`
- ✅ Dễ share layout giữa routes

**Ví dụ:**

```
app/(productivity)/today/page.tsx → /today
app/(productivity)/inbox/page.tsx → /inbox

Cả 2 dùng chung layout.tsx (sidebar + header)
```

---

#### **components/ - Tổ chức theo feature**

**Quy tắc:**

- ✅ Group theo feature: `tasks/`, `kanban/`, `projects/`
- ✅ `ui/` - Shared components (shadcn/ui)
- ✅ Tên file: kebab-case (`task-item.tsx`)

**Tại sao không flat structure:**

```
❌ components/TaskItem.tsx
❌ components/TaskList.tsx
❌ components/ProjectGrid.tsx
... (50+ files lộn xộn)

✅ components/tasks/task-item.tsx
✅ components/tasks/task-list.tsx
✅ components/projects/project-grid.tsx
... (Dễ tìm hơn)
```

---

#### **lib/ - Business Logic**

**Quy tắc:**

- ✅ `stores/` - Global state (Zustand)
- ✅ `hooks/` - Reusable logic
- ✅ `supabase/` - Database clients
- ✅ `utils/` - Pure functions

**Tại sao tách ra:**

- ✅ Components chỉ focus UI
- ✅ Logic dễ test
- ✅ Reuse logic giữa components

---

## 🎯 **NAVIGATION QUICK GUIDE**

### **Tôi muốn...**

| Mục đích                    | File cần mở                                                          |
| --------------------------- | -------------------------------------------------------------------- |
| **Biết làm gì hôm nay**     | `docs/00_start-here/QUICKSTART_AI.md`                                |
| **Copy prompt cho AI**      | `docs/02_ai-prompts/AI_PROMPTS.md`                                   |
| **Check tính năng đã xong** | `docs/01_status/FEATURES.md`                                         |
| **Xem bugs hiện tại**       | `docs/01_status/BUGS.md`                                             |
| **Setup lần đầu**           | `docs/04_technical/SETUP.md`                                         |
| **Deploy database**         | `docs/04_technical/DEPLOY.md`                                        |
| **Hiểu công nghệ**          | `docs/00_start-here/TECH_STACK.md`                                   |
| **Edit task component**     | `frontend/components/tasks/task-item.tsx`                            |
| **Edit Kanban board**       | `frontend/components/kanban/kanban-board.tsx`                        |
| **Add Zustand state**       | `frontend/lib/stores/tasks.ts`                                       |
| **Database schema**         | `docs/04_technical/architecture/database-schema-v2-productivity.sql` |

---

## 📏 **QUY TẮC ĐẶT TÊN**

### **File naming:**

```
✅ kebab-case.tsx       # task-item.tsx
❌ PascalCase.tsx       # TaskItem.tsx
❌ camelCase.tsx        # taskItem.tsx
```

### **Component naming:**

```typescript
// File: task-item.tsx
export default function TaskItem() {
  // ✅ PascalCase
  // ...
}
```

### **Folder naming:**

```
✅ lowercase            # tasks/
✅ kebab-case           # ai-prompts/
✅ numbered prefix      # 00_start-here/
❌ PascalCase           # Tasks/
❌ camelCase            # aiPrompts/
```

---

## 🔍 **TÌM FILE NHANH VỚI VS CODE**

### **Shortcuts:**

```
Ctrl+P           → Tìm file theo tên
Ctrl+Shift+F     → Search trong toàn bộ file
Ctrl+T           → Tìm symbol (function, component)
Ctrl+Click       → Go to definition
```

### **Tips:**

```
# Tìm file
Ctrl+P → "task-item"

# Tìm component
Ctrl+T → "TaskItem"

# Tìm text
Ctrl+Shift+F → "toggleTask"
```

---

## 🎓 **BEST PRACTICES**

### **1. File mới → Đúng folder:**

```
Task component      → frontend/components/tasks/
Prompt template     → docs/02_ai-prompts/templates/
Bug documentation   → docs/01_status/BUGS.md
Interview notes     → docs/05_research/interview-notes/
```

### **2. Update docs khi thay đổi:**

```
Xong feature mới    → Update docs/01_status/FEATURES.md
Fix bug             → Remove từ docs/01_status/BUGS.md
Xong prompt         → Update docs/02_ai-prompts/COMPLETED.md
```

### **3. Archive thay vì xóa:**

```
File cũ             → docs/archive/old-versions/
Fix tạm             → docs/archive/temp-fixes/
Chat history        → docs/archive/conversations/
```

---

## ❓ **FAQ**

### **Tại sao docs/ dùng numbered prefix nhưng frontend/ không?**

- ✅ **Docs:** Numbered folders giúp người mới biết đọc theo thứ tự
- ✅ **Frontend:** Code nên group theo feature, không cần số

### **Tại sao không dùng `/src` folder?**

- ✅ Next.js App Router không yêu cầu `/src`
- ✅ Ít folder hơn = dễ navigate hơn

### **Tại sao component files dùng kebab-case thay vì PascalCase?**

- ✅ Convention của Next.js, Vercel, shadcn/ui
- ✅ Dễ phân biệt component file vs component name

---

**Last Updated:** November 8, 2025  
**Next Review:** When restructuring folders
