
# PROMPT KHỞI ĐỘNG (PRIMING PROMPT) CHO DỰ ÁN NEXUS

Chào bạn! Chúng ta sẽ làm việc trên dự án **NEXUS Productivity Platform**. Đây là bản tóm tắt ngữ cảnh toàn diện để bạn hiểu rõ dự án ngay từ đầu. Hãy đọc kỹ và xác nhận đã hiểu trước khi tiếp tục.

---

## 1. TỔNG QUAN DỰ ÁN - "PLATFORM FIRST"

### Tầm nhìn

NEXUS là một **Productivity Platform** - không chỉ là ứng dụng quản lý công việc mà là một nền tảng cho phép người dùng xây dựng và chia sẻ các công cụ năng suất của riêng họ.

### Pivot Strategy (Tuần 0 - Tháng 11, 2024)

Dự án đã **pivot từ Task Management** sang **Platform MVP** với 3 trụ cột chính:

1.**Dashboard Grid (30%)** - Canvas để sắp xếp và chạy các App Minis

2.**App Minis (40%)** - Các công cụ nhỏ, tái sử dụng (Quick Notes, Pomodoro, Habit Tracker...)

3.**App Builder (30%)** - Công cụ no-code để người dùng tự tạo App Minis

**Mục tiêu 12 tuần:** Validation với 10+ active users, 5+ apps created by users

### Giai đoạn hiện tại

**Week 0: Architecture & Design (13-20/11/2024)**

- ✅ Pivot decision documented
- ✅ Update all documentation
- ⏳ ADR-001: App Mini Architecture
- ⏳ Dashboard Grid wireframes
- ⏳ Technical spike: react-grid-layout

### Tài liệu tham khảo

-**Tổng quan đầy đủ:** [`docs/00_start-here/README.md`](../00_start-here/README.md)

-**Trạng thái dự án:** [`docs/03_roadmap/PROJECT_STATUS.md`](../03_roadmap/PROJECT_STATUS.md)

-**Roadmap 12 tuần:** [`docs/03_roadmap/ROADMAP.md`](../03_roadmap/ROADMAP.md)

---

## 2. TECH STACK

### Frontend Stack

```

Next.js 16.0.1 (App Router, Turbopack, React Server Components)

├── React 19 (latest features)

├── TypeScript (Strict Mode - NO `any` allowed)

└── TailwindCSS 4 (utility-first CSS)

```

### Backend & Database

```

Supabase (PostgreSQL + Auth + RLS)

├── Cloud: Supabase Cloud (free tier)
│   └── Deploy migrations: `supabase db push`
│
├── Local: Supabase CLI (optional, recommended)
│   └── `supabase start` → Local PostgreSQL + Studio
│
└── LƯU Ý QUAN TRỌNG: KHÔNG có backend server riêng
    (No NestJS/Express/tRPC)
    Mọi logic đều xử lý ở frontend hoặc qua Supabase Policies

```

### State Management

```

Zustand + Immer

└── Ưu tiên: Optimistic Updates

    (UI updates instantly → sync with Supabase → rollback if error)

```

### UI Components

```

shadcn/ui (Radix UI primitives)

├── Tiptap (rich text editor)

├── @dnd-kit/* (drag and drop for Kanban)

├── react-big-calendar (calendar view)

└── cmdk (command palette)

```

### Utilities

```

date-fns (date manipulation)

├── react-hotkeys-hook (keyboard shortcuts: j/k/x/c)

├── react-hook-form + zod (form handling + validation)

└── rrule (recurring tasks - RFC-5545)

```

**Tài liệu chi tiết:** [`docs/00_start-here/TECH_STACK.md`](../00_start-here/TECH_STACK.md)

---

## 3. CẤU TRÚC DỰ ÁN

### Tổ chức Thư mục

```

NEXUS/

├── frontend/               ← Toàn bộ code ứng dụng

│   ├── app/               ← Next.js App Router

│   ├── components/        ← React components

│   ├── lib/               ← Hooks, stores, utils

│   └── types/             ← TypeScript types

│

├── docs/                  ← Toàn bộ tài liệu (đánh số)

│   ├── 00_start-here/     ← Điểm bắt đầu

│   ├── 01_status/         ← Trạng thái dự án

│   ├── 02_ai-prompts/     ← AI prompts & principles

│   ├── 03_roadmap/        ← Kế hoạch & ý tưởng

│   ├── 04_technical/      ← Tài liệu kỹ thuật

│   └── 05_research/       ← User research

│

└── supabase/              ← Database schema & migrations
    ├── config.toml        ← Supabase CLI configuration
    ├── migrations/        ← Database migrations (timestamp-based)
    │   ├── 20251107000000_add_documents_table.sql
    │   └── 20251107000001_productivity_core_schema.sql
    └── seed.sql           ← Seed data for local development

```

**Lưu ý quan trọng về Database:**
- Migrations nằm trong `supabase/migrations/` (KHÔNG phải `docs/04_technical/architecture/migrations/`)
- Sử dụng Supabase CLI để quản lý: `supabase db push`, `supabase migration new`
- Format: `YYYYMMDDHHMMSS_description.sql` (timestamp-based, tự động sort)
- Local development: `supabase start` (requires Docker)

```

**Cấu trúc chi tiết:** [`docs/00_start-here/PROJECT_STRUCTURE.md`](../00_start-here/PROJECT_STRUCTURE.md)

---

## 4. NGUYÊN TẮC LÀM VIỆC BẮT BUỘC (32 PRINCIPLES)

### A. Development Principles (5 nguyên tắc)

1.**AI-Driven Development**

- Luôn viết prompt chi tiết, test code do AI tạo
- Cập nhật tài liệu tiến độ: `COMPLETED.md`, `FEATURES.md`
- Sử dụng các template prompt trong `docs/02_ai-prompts/templates/`

2.**Optimistic UI**

- UI cập nhật ngay lập tức → đồng bộ với Supabase sau → rollback nếu lỗi

```typescript

   // Pattern: Zustand + Immer

   set((state) => { state.tasks[id].completed= true })  // Instant

   awaitsupabase.from('tasks').update(...)              // Sync

   if (error) set((state) => { state.tasks[id].completed= false }) // Rollback

```

3.**TypeScript Strict Mode**

- KHÔNG BAO GIỜ sử dụng `any`
- Luôn định nghĩa interface rõ ràng trong `types/`
- Sử dụng type guards cho các giá trị nullable

4.**Mobile-First Design**

- Thiết kế cho mobile (375px) trước
- Breakpoints: mobile → tablet → desktop
- Touch targets ≥ 44x44px

5.**Performance First**

- Lighthouse score > 90
- Lazy load các component nặng
- Optimize images, use `next/image`

### B. Code Conventions (5 nguyên tắc)

6.**File Naming:**

- Components: `PascalCase` (TaskItem.tsx)
- Utils/hooks: `kebab-case` (use-tasks.ts)
- Pages: `lowercase` (today/page.tsx)

7.**Component Structure:**

```typescript

   // 1. Imports (react → third-party → local)

   // 2. Types/Interfaces

   // 3. Component definition

   // 4. Exports

```

8.**Import Order:**

```typescript

   // React

   import { useState } from'react'

   // Third-party

   import { toast } from'sonner'

   // Local

   import { useTaskStore } from'@/lib/stores/tasks'

```

9.**Comments:**

- Code đơn giản: KHÔNG cần comment
- Logic phức tạp: Comment bằng Tiếng Việt giải thích "tại sao"

10.**Error Handling:**

    - Luôn handle errors từ Supabase

    - Show toast.error() cho user

    - Log chi tiết vào console

### C. Documentation Conventions (4 nguyên tắc)

11.**Ngôn ngữ:**

    - Tài liệu hướng người dùng:**Tiếng Việt**

    - Commit messages:**Tiếng Anh**

    - Code comments phức tạp:**Tiếng Việt**

12.**Cấu trúc Documentation:**

    - Đánh số thư mục:`00_`, `01_`, `02_`...

    - File index:`README.md` trong mỗi folder

    - Links tương đối giữa các file

13.**Daily Workflow:**

    -**Sáng:** Đọc `docs/00_start-here/QUICKSTART_AI.md`

    -**Làm việc:** Sử dụng prompts từ `docs/02_ai-prompts/AI_PROMPTS.md`

    -**Cuối ngày:** Cập nhật `docs/01_status/THIS_WEEK.md`

14.**File Naming Convention:**

    - UPPERCASE_WITH_UNDERSCORES.md cho các file quan trọng

    - lowercase-with-dashes.md cho các file phụ

### D. Deployment & Testing (4 nguyên tắc)

15.**Git Workflow:**

    ```bash

    # Branch naming

    feature/task-recurring-ui

    fix/workspace-id-error

    docs/update-quickstart

    # Commit messages (ConventionalCommits)

    feat(tasks): add recurring task UI

    fix(workspace): handle missing workspace_id

    docs: update quickstart guide

    ```

16.**Testing Strategy:**

    - Manual testing trong dev

    - E2E tests cho critical flows (Playwright - planned)

    - Integration tests cho Supabase queries (Vitest - planned)

17.**Database Migrations:**

    - **Location:** `supabase/migrations/` (KHÔNG phải `docs/04_technical/architecture/migrations/`)
    
    - **Workflow:**
      ```bash
      # Create new migration
      supabase migration new add_feature_name
      
      # Test locally (requires Docker)
      supabase start
      supabase db reset  # Runs all migrations
      
      # Deploy to cloud
      supabase db push
      
      # Verify
      supabase migration list
      ```
    
    - **Format:** `YYYYMMDDHHMMSS_description.sql` (timestamp-based, auto-sorted)
    
    - **Best Practices:**
      - Test locally với `supabase db reset` trước khi push
      - Backup production trước khi migrate
      - Không edit migrations đã deploy (tạo migration mới)
      - Mỗi migration = 1 file, chạy theo thứ tự timestamp

18.**Environment Variables:**

    ```bash

    # .env.local (NEVERcommit)

    NEXT_PUBLIC_SUPABASE_URL=...

    NEXT_PUBLIC_SUPABASE_ANON_KEY=...

    ```

### E. AI Prompting Best Practices (3 nguyên tắc)

19.**Good Prompt Structure:**

    ```markdown

    ## Context

    (Dự án, file liên quan, vấn đề gặp phải)

    ## Task

    (Nhiệm vụ cụ thể cần làm)

    ## Requirements

    (Checklist các yêu cầu)

    ## Expected Output

    (Output mong đợi)

    ```

20.**When AI Makes Mistakes:**

    - Đừng chỉ nói "sai", hãy chỉ ra CHỖ SAI cụ thể

    - Cung cấp ví dụ đúng

    - Yêu cầu AI giải thích lý do

21.**Prompt Reusability:**

    - Lưu prompts tốt vào`docs/02_ai-prompts/templates/`

    - Đánh số prompts: "Prompt 1.1", "Prompt 2.3"

    - Ghi rõ completion status

### F. UI/UX Principles (4 nguyên tắc)

22.**Design System:**

    - Sử dụng shadcn/ui components

    - Tuân thủ TailwindCSS spacing scale (4px increments)

    - Color palette:`primary`, `secondary`, `muted`, `accent`

23.**Keyboard Shortcuts:**

    - Global:`Cmd+K` (command palette), `Cmd+N` (new task)

    - Navigation:`j`/`k` (up/down), `Enter` (open)

    - Actions:`x` (complete), `e` (edit), `d` (delete)

24.**Loading States:**

    - Skeleton loaders cho content

    - Spinner cho actions

    - Disable buttons during async operations

25.**Empty States:**

    - Illustration + text + CTA button

    - Giải thích tại sao empty và hướng dẫn action tiếp theo

### G. Project Management (3 nguyên tắc)

26.**Feature Prioritization:**

    - Must-have (P0) → Should-have (P1) → Nice-to-have (P2)

    - Focus vào "good enough" trước khi polish

27.**Weekly Rhythm:**

    -**Thứ 2:** Review tuần trước, plan tuần này

    -**Thứ 2-6:** Ship features

    -**Chủ nhật:** Retrospective, cập nhật docs

28.**Decision Making:**

    - Các quyết định quan trọng → ghi vào`docs/04_technical/architecture/decisions.md` (ADR format)

    - Các quyết định nhỏ → ghi vào commit message

### H. Security & Privacy (2 nguyên tắc)

29.**Row Level Security (RLS):**

    - MỌI table phải có RLS policies

    - Test policies với nhiều users khác nhau

    - Pattern:`workspace_id` hoặc `user_id` check

30.**Authentication:**

    - Sử dụng Supabase Auth (Google OAuth)

    - Protected routes: check`user` trong middleware

    - Session refresh tự động

### I. Learning & Growth (2 nguyên tắc)

31.**Continuous Learning:**

    - Đọc docs của công nghệ mới trước khi dùng

    - Học từ các bugs đã fix (xem`TROUBLESHOOTING_LOG.md`)

    - Experiment với features mới trong branch riêng

32.**Feedback Loop:**

    - Ghi lại mọi bug vào`docs/01_status/BUGS.md`

    - Cập nhật`TROUBLESHOOTING_LOG.md` khi fix bugs khó

    - Review code của AI trước khi commit

**Tài liệu đầy đủ 32 nguyên tắc:** [`docs/02_ai-prompts/AI_PRINCIPLES.md`](./AI_PRINCIPLES.md) (2,336 dòng với examples và code snippets)

---

## 5. BÀI HỌC KINH NGHIỆM & TROUBLESHOOTING

### Troubleshooting Log

File `docs/04_technical/TROUBLESHOOTING_LOG.md` ghi lại **6 bugs khó đã fix** trong quá khứ:

1.**Bug #1: Hardcoded workspace_id** ✅ FIXED

- Vấn đề: Tasks của user A hiển thị cho user B
- Giải pháp: `getOrCreateWorkspaceId()` helper function

2.**Bug #2: Tasks disappear after complete** ✅ FIXED

- Vấn đề: Filter `where('completed', false)` ẩn tasks đã hoàn thành
- Giải pháp: Xóa filter, xử lý display ở UI layer

3.**Bug #3: TypeScript workspace_id error** ✅ FIXED

- Vấn đề: `workspace_id` undefined trong type
- Giải pháp: Lookup `workspace_members` table

4.**Bug #4: Empty state no images** ⏳ PLANNED (Week 4)

- Vấn đề: Empty states chưa có illustrations
- Giải pháp: Tích hợp unDraw hoặc illustrationkit

5.**Bug #5: No loading skeletons** ⏳ PLANNED (Week 4)

- Vấn đề: Blank screen khi loading
- Giải pháp: Add Skeleton components từ shadcn/ui

6.**Bug #6: Git merge conflict** ✅ RESOLVED

- Vấn đề: Conflict khi move file
- Giải pháp: Sử dụng `git mv` pattern

**Thống kê:** 67% bugs đã fix (4/6), 2 bugs planned cho Week 4

### Testing Strategy

File `docs/04_technical/TESTING_STRATEGY.md` (nếu có) chứa:

- Manual testing checklist
- Planned E2E tests (Playwright)
- Planned integration tests (Vitest)

**Lời khuyên:** Trước khi code, hãy search trong `TROUBLESHOOTING_LOG.md` xem có bug tương tự đã fix chưa.

---

## 6. NHIỆM VỤ HIỆN TẠI - ROADMAP 12 TUẦN

### Week 0 (13-20/11): Architecture & Design ← **YOU ARE HERE**

- [X] ✅ Pivot decision documented
- [X] ✅ Update all documentation
- [ ] ⏳ ADR-001: App Mini Architecture
- [ ] ⏳ Dashboard Grid wireframes (3 screens)
- [ ] ⏳ Research: react-grid-layout, Sandpack, iframe security
- [ ] ⏳ Technical spike (optional)

### Week 1 (21-27/11): Dashboard Infrastructure

- [ ] Build `DashboardGrid` component (react-grid-layout)
- [ ] Build `AppMiniCard` wrapper component
- [ ] Layout persistence to Supabase (`dashboard_layouts` table)
- [ ] `/dashboard` route functional

### Week 2 (28/11-4/12): First App Minis

- [ ] Quick Notes app (localStorage)
- [ ] Pomodoro Timer app
- [ ] App registry system (`app-minis/registry.ts`)

### Week 3-4 (5-18/12): App Builder v0.1

- [ ] Builder canvas (drag-drop components)
- [ ] 3 basic components: Input, Button, Text
- [ ] Save/load app definitions (JSON)

### Week 5-8: User Validation

- [ ] Public beta launch
- [ ] 50 signups, 10 active users
- [ ] 5 apps created by users

### Week 9-12: GO/NO-GO Decision

**Success Criteria:**

- 10+ active users (weekly)
- 1-2 paying users (early access)
- "Apps built" metric growing week-over-week

**Chi tiết roadmap:** [`docs/03_roadmap/ROADMAP.md`](../03_roadmap/ROADMAP.md)

---

## 7. TÀI LIỆU QUAN TRỌNG - QUICK LINKS

### 🎯 Bắt đầu hàng ngày

-**[`docs/00_start-here/QUICKSTART_AI.md`](../00_start-here/QUICKSTART_AI.md)** ⭐

  → Đọc MỖI SÁNG để biết làm gì hôm nay

### 🤖 AI Prompts & Principles

-**[`docs/02_ai-prompts/AI_PROMPTS.md`](./AI_PROMPTS.md)**

  → 12 prompts đã viết sẵn (bug fix, new feature, refactor...)

-**[`docs/02_ai-prompts/AI_PRINCIPLES.md`](./AI_PRINCIPLES.md)**

  → 32 nguyên tắc chi tiết với code examples (2,336 dòng)

-**[`docs/02_ai-prompts/COMPLETED.md`](./COMPLETED.md)**

  → Lịch sử các prompts đã hoàn thành

### 📊 Trạng thái & Planning

-**[`docs/01_status/THIS_WEEK.md`](../01_status/THIS_WEEK.md)**

  → Focus tuần này (cập nhật mỗi thứ 2)

-**[`docs/01_status/FEATURES.md`](../01_status/FEATURES.md)**

  → Checklist 40 features (Task Management → Platform)

-**[`docs/01_status/BUGS.md`](../01_status/BUGS.md)**

  → Danh sách bugs đã biết + priority

-**[`docs/03_roadmap/PROJECT_STATUS.md`](../03_roadmap/PROJECT_STATUS.md)**

  → Trạng thái dự án chi tiết

### 🛠️ Technical Docs

-**[`docs/04_technical/TROUBLESHOOTING_LOG.md`](../04_technical/TROUBLESHOOTING_LOG.md)**

  → 6 bugs đã fix + solutions + lessons learned (744 dòng)

-**[`docs/04_technical/SETUP.md`](../04_technical/SETUP.md)**

  → Setup môi trường local (database, .env, dependencies)

-**[`docs/04_technical/DEPLOY.md`](../04_technical/DEPLOY.md)**

  → Deploy database lên Supabase

-**[`docs/04_technical/architecture/decisions.md`](../04_technical/architecture/decisions.md)**

  → 10 ADRs (Architecture Decision Records)

### 💡 Ideas & Research

-**[`docs/03_roadmap/IDEAS.md`](../03_roadmap/IDEAS.md)**

  → 14 ý tưởng features (brainstorm list)

-**[`docs/05_research/user-personas.md`](../05_research/user-personas.md)**

  → 3 user personas (Solo Freelancer, Startup Team Lead, SME Owner)

---

## 8. HÀNH ĐỘNG TIẾP THEO (ACTION REQUIRED)

Bây giờ, hãy thực hiện các bước sau:

### Bước 1: Xác nhận đã hiểu

Hãy xác nhận rằng bạn đã hiểu:

- ✅ Dự án đang pivot sang Platform MVP (App Minis + App Builder)
- ✅ Đang ở Week 0 - Architecture & Design (không code, chỉ research và ADR)
- ✅ Tech stack: Next.js 16 + React 19 + TypeScript + Supabase (NO backend server)
- ✅ 32 nguyên tắc làm việc bắt buộc (đặc biệt: Optimistic UI, TypeScript Strict, AI-Driven)

### Bước 2: Đọc nhiệm vụ hiện tại

Hãy đọc nội dung của file **[`docs/00_start-here/QUICKSTART_AI.md`](../00_start-here/QUICKSTART_AI.md)** và cho tôi biết:

1. Nhiệm vụ đầu tiên của chúng ta là gì?
2. Output mong đợi là gì?
3. Deadline (nếu có)?

### Bước 3: Bắt đầu làm việc

Sau khi xác nhận nhiệm vụ, hãy:

1. Tạo branch mới (nếu cần): `git checkout -b feature/task-name`
2. Bắt đầu code hoặc viết docs
3. Commit theo format: `feat(scope): message`
4. Cập nhật `docs/01_status/THIS_WEEK.md` và `FEATURES.md` khi hoàn thành

---

## 📝 NOTES

-**Ngôn ngữ:** Prompt này bằng Tiếng Việt vì đây là tài liệu hướng dẫn. Code và commit messages vẫn bằng Tiếng Anh.

-**Cập nhật:** File này nên được review và cập nhật mỗi khi có pivot hoặc thay đổi lớn.

-**Version:** 2.0.0 - Platform MVP (Updated: 13 tháng 11, 2024)

-**Recent Changes (13/11/2024):**
  - ✅ Migrated database migrations từ `docs/04_technical/architecture/migrations/` → `supabase/migrations/`
  - ✅ Setup Supabase CLI với `config.toml` và local development support
  - ✅ Migrations format: timestamp-based (`YYYYMMDDHHMMSS_description.sql`)
  - ✅ Added migration history tracking và rollback capability

---

**🚀 Sẵn sàng? Hãy đọc `QUICKSTART_AI.md` và bắt đầu làm việc!**
