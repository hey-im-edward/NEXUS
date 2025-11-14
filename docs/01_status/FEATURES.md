# ✅ FEATURES - Danh sách tính năng

> **Mục đích:** Checklist TẤT CẢ tính năng - Đã làm, đang làm, chưa làm.

**Cập nhật:** 13 tháng 11, 2024

---

## 📊 **TỔNG QUAN**

```
✅ Hoàn thành:      10 tính năng  (25%)
🚀 Đang làm:         4 tính năng  (10%)
📋 Đã lên kế hoạch: 26 tính năng  (65%)
─────────────────────────────────────
   Tổng:            40 tính năng
```

---

## ✅ **ĐÃ HOÀN THÀNH (10)**

### **1. Database & Authentication**

#### ✅ 1.1 Database Schema v2

- **Mô tả:** 11 bảng (tasks, projects, pages, workspaces, v.v.)
- **Ngày hoàn thành:** 7/11/2024
- **File:** `docs/04_technical/architecture/database-schema-v2-productivity.sql`

#### ✅ 1.2 Google OAuth Authentication

- **Mô tả:** Đăng nhập bằng Google account
- **Ngày hoàn thành:** 7/11/2024
- **Route:** `/login`

---

### **2. Task Management - Cơ Bản**

#### ✅ 2.1 Thêm Task (Quick Add)

- **Mô tả:** Nhập task nhanh, Enter để thêm
- **Component:** `TaskQuickAdd.tsx`
- **Ngày hoàn thành:** 7/11/2024

#### ✅ 2.2 Hiển Thị Tasks (List View)

- **Mô tả:** Hiển thị danh sách tasks
- **Component:** `TaskList.tsx`
- **Ngày hoàn thành:** 7/11/2024

#### ✅ 2.3 Toggle Hoàn Thành (Checkbox)

- **Mô tả:** Click checkbox để đánh dấu done/todo
- **Component:** `TaskItem.tsx`
- **Ngày hoàn thành:** 7/11/2024

#### ✅ 2.4 Lọc Tasks (Today/Inbox)

- **Mô tả:** Lọc tasks theo due date
- **Routes:** `/today`, `/inbox`
- **Ngày hoàn thành:** 7/11/2024

---

### **3. Projects & Kanban**

#### ✅ 3.1 Kanban Board

- **Mô tả:** Drag & drop tasks giữa columns (TODO/IN PROGRESS/DONE)
- **Component:** `KanbanBoard.tsx`
- **Ngày hoàn thành:** 8/11/2024
- **Prompt:** Prompt 1 - AI_PROMPTS.md

#### ✅ 3.2 Trang Danh Sách Project

- **Mô tả:** Hiển thị danh sách projects
- **Route:** `/projects`
- **Ngày hoàn thành:** 7/11/2024

#### ✅ 3.3 Sửa Task Inline

- **Mô tả:** Double-click task title → Sửa inline, Enter/Blur để lưu, ESC để hủy
- **Component:** `TaskItem.tsx` + `useInlineEdit` hook
- **Ngày hoàn thành:** 9/11/2024
- **Prompt:** Prompt 1.1 - AI_PROMPTS.md
- **Tính năng:**
  - Optimistic UI updates
  - Validation (tối thiểu 1, tối đa 200 ký tự)
  - Loading indicator
  - Error rollback
  - Reusable hook cho inline edits tương lai

#### ✅ 3.4 Set Ưu Tiên Cho Task

- **Mô tả:** Click priority badge → Dropdown chọn priority (Urgent/High/Medium/Low/None)
- **Component:** `TaskPrioritySelect.tsx` + `TaskPriorityBadge.tsx`
- **Ngày hoàn thành:** 9/11/2024
- **Prompt:** Prompt 1.2 - AI_PROMPTS.md
- **Tính năng:**
  - Colored priority badges (🔴🟠🟡🔵⚪)
  - Optimistic UI updates
  - Network timeout detection (5s)
  - Keyboard navigation (↑↓ arrows, Enter, ESC)
  - Focus management & visual indicators
  - shadcn/ui Popover integration

---

## 🚀 **ĐANG LÀM (4 - TRỌNG TÂM NỀN TẢNG)**

### **Tuần 0: Lên Kế Hoạch Chiến Lược**

#### 🚀 4.1 Quyết Định Kiến Trúc: Hệ Thống App Mini

- **Mô tả:** Nghiên cứu và quyết định tech stack cho App Builder
- **Trạng thái:** 🚀 Đang làm (13-15/11)
- **Mục tiêu:** Quyết định react-grid-layout, Craft.js hay tự làm
- **Deliverable:** Tài liệu ADR, technical spike

#### 🚀 4.2 Thiết Kế Dashboard Grid

- **Mô tả:** Wireframe bố cục dashboard
- **Trạng thái:** 🚀 Đang làm (13-15/11)
- **Mục tiêu:** Mockup hiển thị 3-4 mini apps
- **Deliverable:** Figma mockup hoặc sketch vẽ tay

### **Tuần 1: Infrastructure Dashboard**

#### 🚀 4.3 Component Dashboard Grid

- **Mô tả:** Grid drag-and-drop với react-grid-layout
- **Trạng thái:** 📅 Bắt đầu 21/11
- **Location:** `frontend/app/dashboard/page.tsx`
- **Tech:** react-grid-layout
- **Ước tính:** 4-6 giờ

#### 🚀 4.4 Wrapper AppMiniCard

- **Mô tả:** Component wrapper cho mỗi app mini
- **Trạng thái:** 📅 Bắt đầu 21/11
- **Location:** `frontend/components/dashboard/AppMiniCard.tsx`
- **Tính năng:** Resize, move, close, persist layout
- **Ước tính:** 3-4 giờ

---

## 📋 **ĐÃ LÊN KẾ HOẠCH (26)**

### **🎯 ƯU TIÊN 1: MVP Nền Tảng (Tuần 1-4)**

#### Tuần 2: App Minis Đầu Tiên

15. **App Mini Ghi Chú Nhanh**

    - **Mô tả:** Text input + display đơn giản
    - **Location:** `frontend/components/app-minis/QuickNotesApp.tsx`
    - **Ước tính:** 2 giờ
    - **Dependencies:** Dashboard Grid

16. **App Mini Đồng Hồ Pomodoro**

    - **Mô tả:** Đếm ngược 25 phút
    - **Location:** `frontend/components/app-minis/PomodoroApp.tsx`
    - **Ước tính:** 2-3 giờ
    - **Dependencies:** Dashboard Grid

17. **Hệ Thống App Registry**
    - **Mô tả:** Danh sách hard-coded các apps có sẵn
    - **Location:** `frontend/lib/app-registry.ts`
    - **Ước tính:** 1 giờ

#### Tuần 3-4: App Builder v0.1

18. **Canvas App Builder**

    - **Mô tả:** Giao diện drag-and-drop để build apps
    - **Location:** `frontend/app/app-builder/page.tsx`
    - **Tech:** Craft.js hoặc custom
    - **Ước tính:** 8-12 giờ

19. **Component Palette (3 components)**

    - **Mô tả:** Text Input, Button, Text Block
    - **Location:** `frontend/components/app-builder/ComponentPalette.tsx`
    - **Ước tính:** 4 giờ

20. **App Renderer (JSON → React)**

    - **Mô tả:** Render user-built apps từ JSON schema
    - **Location:** `frontend/components/app-builder/AppRenderer.tsx`
    - **Ước tính:** 6-8 giờ

21. **Database User Apps**
    - **Mô tả:** Lưu trữ app definitions do người dùng tạo
    - **Location:** `backend/supabase/migrations/004_user_apps.sql`
    - **Schema:** `id, user_id, app_name, app_schema (JSON), created_at`

---

### **🔄 BACKLOG: Task Management Polish**

> **Quyết Định Chiến Lược (13/11):** Các tính năng này bị hạ ưu tiên. Task Management đã "đủ tốt". Sẽ xem xét lại dựa trên feedback Tuần 8.

22. **Thêm Tags Cho Tasks**

    - **Mô tả:** Multi-select tags (Work, Personal, Urgent)
    - **Location:** `frontend/components/tasks/task-list.tsx`
    - **Ước tính:** 1-2 giờ
    - **Trạng thái:** 🔄 Backlog (trước đó Đang làm)

23. **Task Detail Modal**

    - **Mô tả:** Click task → mở modal với description, subtasks, comments
    - **Location:** `frontend/components/tasks/TaskDetailModal.tsx`
    - **Ước tính:** 2-3 giờ
    - **Trạng thái:** 🔄 Backlog (trước đó Đang làm)

24. **Xóa Task**

    - **Mô tả:** Icon thùng rác → soft delete (set deleted_at)
    - **Location:** `frontend/components/tasks/task-list.tsx`
    - **Ước tính:** 1 giờ
    - **Trạng thái:** 🔄 Backlog (trước đó Đang làm)

25. **Keyboard Shortcuts**

    - **Mô tả:** `A` = Thêm task, `E` = Sửa, `Del` = Xóa
    - **Location:** `frontend/hooks/useKeyboardShortcuts.ts`
    - **Ước tính:** 2-3 giờ
    - **Trạng thái:** 🔄 Backlog (trước đó Đang làm)

26. **Recurring Tasks**

    - **Mô tả:** Tasks lặp lại hàng ngày, tuần, tháng (dùng rrule)
    - **Ước tính:** 3-4 giờ
    - **Trạng thái:** 🔄 Backlog

27. **Calendar View**

    - **Mô tả:** Xem tháng với tasks trên các ngày
    - **Tech:** FullCalendar hoặc custom
    - **Ước tính:** 4-6 giờ
    - **Trạng thái:** 🔄 Backlog

28. **Rich Text Editor Cho Task Description**

    - **Mô tả:** Tiptap editor cho descriptions kiểu markdown
    - **Ước tính:** 4-6 giờ
    - **Trạng thái:** 🔄 Backlog

29. **Command Palette (Cmd+K)**
    - **Mô tả:** Quick search và actions
    - **Tech:** cmdk library
    - **Ước tính:** 3-4 giờ
    - **Trạng thái:** 🔄 Backlog

---

### **📅 TƯƠNG LAI: Marketplace & Kiếm Tiền (Tuần 5-12)**

30. **Browse App Marketplace**

    - **Mô tả:** Danh sách public apps người dùng có thể cài
    - **Trạng thái:** 📅 Tuần 5-8 (dựa trên feedback)

31. **Cài App Từ Marketplace**

    - **Mô tả:** One-click install vào dashboard
    - **Trạng thái:** 📅 Tuần 5-8

32. **Publish App Lên Marketplace**

    - **Mô tả:** Làm app của bạn public cho người khác
    - **Trạng thái:** 📅 Tuần 6-8

33. **Tích Hợp Payment (Stripe)**

    - **Mô tả:** Charge tiền cho premium apps
    - **Trạng thái:** 📅 Tuần 9-10 (nếu validated)

34. **Team Workspaces**

    - **Mô tả:** Chia sẻ dashboard với team
    - **Trạng thái:** 📅 Tuần 9-10

35. **API Webhooks**
    - **Mô tả:** Kết nối apps với external services
    - **Trạng thái:** 📅 Tuần 10-11

---

### **🎨 Polish & Infrastructure**

36. **Mobile App (React Native)**

    - **Trạng thái:** 📅 Sau MVP

37. **Offline Mode (PWA)**

    - **Trạng thái:** 📅 Sau MVP

38. **Dark Mode**

    - **Trạng thái:** 📅 Quick win (2 giờ)

39. **Onboarding Tutorial**

    - **Trạng thái:** 📅 Tuần 5 (trước user testing)

40. **Analytics Dashboard**
    - **Trạng thái:** 📅 Tuần 6

---

## 📊 Chú Thích Trạng Thái Tính Năng

- ✅ **Hoàn thành** - Đã deploy và hoạt động
- 🚀 **Đang làm** - Đang được xây dựng
- 📅 **Đã lên kế hoạch** - Đã schedule với ngày dự kiến
- 🔄 **Backlog** - Chưa schedule, xem xét lại sau
- ❌ **Đã hủy** - Quyết định không làm

---

## 🎯 Trọng Tâm Sprint Hiện Tại (Tuần 0)

**TUẦN NÀY (13-20/11):**

1. ✍️ Viết Architecture Decision Record cho hệ thống App Mini
2. 📐 Thiết kế wireframe Dashboard Grid
3. 🧪 Technical spike: Test react-grid-layout

**TUẦN SAU (21-27/11):**

1. Build Dashboard Grid
2. Build wrapper AppMiniCard
3. Lưu layout vào database

---

**Triết lý:** Chúng ta đang xây dựng một nền tảng, không phải task manager. Mọi tính năng nên hỏi: "Điều này có giúp người dùng build hoặc discover apps không?"

---

## 🔗 **LINKS**

- **Roadmap chi tiết:** [ROADMAP.md](../03_roadmap/ROADMAP.md)
- **AI Prompts:** [AI_PROMPTS.md](../02_ai-prompts/AI_PROMPTS.md)
- **Ý tưởng mới:** [IDEAS.md](../03_roadmap/IDEAS.md)

---

**Cập nhật lần cuối:** 13 tháng 11, 2024
**Cập nhật tiếp theo:** 20 tháng 11, 2024 (khi xong Tuần 0 - Architecture & Design)
