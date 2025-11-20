# 🐛 BUGS LOG - Bug Tracker & Fix History

**Nguồn:** [AI_PROMPTS.md](../AI_PROMPTS.md) | [FEATURES.md](FEATURES.md) | [THIS_WEEK.md](THIS_WEEK.md)

**Cập nhật:** 17 tháng 11, 2025

**Mục đích:** Theo dõi tất cả bugs phát hiện trong quá trình phát triển, trạng thái, và lịch sử sửa

---

## 📊 BUGS SUMMARY

```text
🔴 Critical (Nghiêm trọng):         0 bugs (Blocker - phải sửa ngay - must fix immediately)
🟠 High (Cao):                      0 bugs (Vấn đề lớn - sửa tuần này - Major issue, fix this week)
🟡 Medium (Trung bình):             0 bugs (Vấn đề nhỏ - sửa sprint này - Minor issue, fix this sprint)
🔵 Low (Thấp):                      2 bugs (Nên sửa - backlog - Nice to fix, backlog)
────────────────────────────────────────────────────────────
   Bugs Đang Hoạt Động (Active):    2 bugs
   Bugs Đã Sửa (Fixed):             5 bugs
   Tổng Bugs (Total):               7 bugs
```

**Phân Chia Theo Danh Mục:**

| Danh Mục (Category) | Nghiêm trọng (Critical) | Cao (High) | Trung bình (Medium) | Thấp (Low) | Tổng (Total) |
|----------|----------|------|--------|-----|-------|
| **Dashboard Grid** | 0 | 0 | 0 | 0 | 0 |
| **App Builder** | 0 | 0 | 0 | 0 | 0 |
| **Marketplace** | 0 | 0 | 0 | 0 | 0 |
| **Task Management** | 0 | 0 | 0 | 2 | 2 |
| **Auth & Security** | 0 | 0 | 0 | 0 | 0 |
| **Performance** | 0 | 0 | 0 | 0 | 0 |
| **UI/UX** | 0 | 0 | 0 | 0 | 0 |
| **Database** | 0 | 0 | 0 | 0 | 0 |
| **Other** | 0 | 0 | 0 | 0 | 0 |

---

## 🔴 BUGS ĐANG HOẠT ĐỘNG (Active Bugs - Open & In Progress)

**Định Dạng (Format):**

```markdown
### BUG-XXX: [Tiêu Đề Bug Ngắn Gọn - Short Bug Title]

**Trạng thái (Status):** 🔴 Mở (Open) | 🟡 Đang Làm (In Progress) | ⏸️ Bị Chặn (Blocked)

**Ưu tiên (Priority):** 🔴 Nghiêm trọng (Critical) | 🟠 Cao (High) | 🟡 Trung bình (Medium) | 🔵 Thấp (Low)

**Ngày phát hiện (Discovered):** YYYY-MM-DD

**Danh mục (Category):** Dashboard Grid | App Builder | Marketplace | Task Management | Auth | Performance | UI/UX | Database | Other

**Prompt bị ảnh hưởng (Affected Prompt):** [PROMPT X.Y](../AI_PROMPTS.md#prompt-xy-feature-name)

**Mô tả (Description):**
Mô tả rõ ràng về bug, mong đợi gì so với thực tế đang xảy ra (Clear description of the bug, what's expected vs. what's happening)

**Các bước tái hiện (Steps to Reproduce):**
1. Bước 1 (Step 1)
2. Bước 2 (Step 2)
3. Bước 3 (Step 3)

**Môi trường (Environment):**
- Trình duyệt (Browser): Chrome 120 / Safari 17 / Firefox 121
- Thiết bị (Device): Desktop / Mobile / Tablet
- Hệ điều hành (OS): Windows 11 / macOS 14 / iOS 17

**Screenshots/Logs:**
- [Link to screenshot]
- Error logs (if any)

**Được giao cho (Assigned To):** [Name]

**Các file liên quan (Related Files):**
- [path/to/file.tsx](../../path/to/file.tsx:42)

**Lưu ý (Notes):**
- Ngữ cảnh bổ sung (Additional context)
```

---

### BUG-001: No empty state images in TaskList

**Status:** 🔴 Open

**Ưu tiên:** 🔵 Low

**Discovered:** 2025-11-07

**Danh mục:** Task Management

**Affected Prompt:** Pre-Platform (Task Management MVP)

**Mô tả (Description):**

Khi users mở `/today` hoặc `/inbox` không có tasks, chỉ hiển thị text "No tasks". Không có illustration, icon, hoặc hướng dẫn làm gì tiếp theo. UI cảm giác chưa hoàn thiện (unpolished).

**Các bước tái hiện (Steps to Reproduce):**

1. Đăng nhập vào NEXUS (Log in to NEXUS)
2. Điều hướng đến trang `/today` (Navigate to `/today` page)
3. Xóa tất cả tasks (hoặc dùng tài khoản mới - or use fresh account)
4. Thấy empty state chỉ có text "No tasks"

**Môi trường (Environment):**

- Trình duyệt (Browser): Chrome 120 (Desktop)
- Thiết bị (Device): Desktop
- Hệ điều hành (OS): Windows 11

**Screenshots/Logs:**

- (Không có screenshot - No screenshot available)

**Được giao cho (Assigned To):** TBD

**Các file liên quan (Related Files):**

- [frontend/components/tasks/TaskList.tsx](../../frontend/components/tasks/TaskList.tsx)

**Lưu ý (Notes):**

- Không chặn phát triển hiện tại (Not blocking current development)
- Có thể sửa trong Week 4 UI polish phase
- Cân nhắc dùng illustration từ undraw.co hoặc humaaans.com (Consider using illustration from)
- Nên có nút CTA ("Add your first task" - Thêm task đầu tiên của bạn)

---

### BUG-002: No loading skeletons in TaskList

**Status:** 🔴 Open

**Ưu tiên:** 🔵 Low

**Discovered:** 2025-11-07

**Danh mục:** Task Management

**Affected Prompt:** Pre-Platform (Task Management MVP)

**Mô tả (Description):**

Khi fetch tasks từ Supabase, có độ trễ 1-2 giây với màn hình trống. Không có loading skeleton hiển thị, làm cảm giác trang bị lỗi hoặc lag (there's a 1-2 second delay with a blank screen, making it feel broken or laggy).

**Các bước tái hiện (Steps to Reproduce):**

1. Đăng nhập vào NEXUS (Log in to NEXUS)
2. Điều hướng đến trang `/today` (Navigate to `/today` page)
3. Quan sát màn hình trống 1-2 giây trong lần load đầu tiên (Observe blank screen during initial load)
4. Tasks đột ngột xuất hiện (Tasks suddenly appear)

**Môi trường (Environment):**

- Trình duyệt (Browser): Chrome 120 (Desktop)
- Thiết bị (Device): Desktop
- Hệ điều hành (OS): Windows 11

**Screenshots/Logs:**

- (Không có screenshot - No screenshot available)

**Được giao cho (Assigned To):** TBD

**Các file liên quan (Related Files):**

- [frontend/components/tasks/TaskList.tsx](../../frontend/components/tasks/TaskList.tsx)

**Lưu ý (Notes):**

- Không chặn phát triển hiện tại (Not blocking current development)
- Có thể sửa trong Week 4 UI polish phase
- Sử dụng shadcn/ui Skeleton component (Use)
- Hiển thị 3-5 skeleton rows trong lúc loading (Show during loading)

---

## ✅ BUGS ĐÃ SỬA (Fixed Bugs - Newest First)

**Định Dạng (Format):**

```markdown
### ✅ BUG-XXX: [Tiêu Đề Bug Ngắn Gọn - Short Bug Title]

**Ngày sửa (Fixed):** YYYY-MM-DD

**Ưu tiên (Priority):** 🔴 Nghiêm trọng (Critical) | 🟠 Cao (High) | 🟡 Trung bình (Medium) | 🔵 Thấp (Low)

**Ngày phát hiện (Discovered):** YYYY-MM-DD

**Thời gian sửa (Time to Fix):** X giờ (hours)

**Danh mục (Category):** [Category]

**Nguyên nhân gốc (Root Cause):**
Điều gì gây ra bug (What caused the bug)

**Cách giải quyết (Solution):**
Cách bug được sửa (How it was fixed)

**Các file đã sửa đổi (Files Modified):**
- [path/to/file.tsx](../../path/to/file.tsx)

**Xác thực (Verification):**
Cách chúng ta xác thực fix hoạt động (How we verified the fix works)

**Bài học rút ra (Lessons Learned):**
- Chúng ta học được gì từ bug này (What we learned from this bug)
```

---

### ✅ BUG-007: Craft.js incompatible with React 19.2.0

**Ngày sửa:** 2025-11-19

**Ưu tiên:** 🔴 Critical

**Ngày phát hiện:** 2025-11-18 (trong quá trình implement PROMPT 1.4)

**Thời gian sửa:** 13 giờ (điều tra: 4h, migration: 7h, cleanup/testing: 2h)

**Danh mục:** App Builder

**Nguyên nhân gốc:**

Craft.js v0.2.12 được xây dựng cho React 17/18. React 19.2.0 có breaking changes:

- Ref callback timing thay đổi
- Event handler attachment thay đổi
- Synthetic event pooling bị loại bỏ

**Chứng cứ:**

```typescript
// Drag setup hiển thị đúng:
connectors.create() ✅ succeeded
draggable="true" ✅ set correctly
cursor: move ✅ displayed

// Nhưng drag events KHÔNG BAO GIỞ FIRE:
dragstart event ❌ not triggered
dragover event ❌ not triggered
drop event ❌ not triggered
```

Test official Craft.js working example → cũng failed trong React 19.

**Cách giải quyết:**

Migrate sang @dnd-kit + Zustand manual implementation:

- Cài đặt @dnd-kit/core v6.3.1, @dnd-kit/sortable v10.0.0
- Gỡ bỏ @craftjs/core, @craftjs/layers
- Xây dựng custom Zustand store (lib/stores/editor.ts, 334 dòng)
- Triển khai Canvas với SortableContext
- Triển khai ComponentPalette với useDraggable
- Triển khai RenderedComponent với useSortable

**Files đã sửa đổi:**

- `package.json` - Added @dnd-kit packages, removed Craft.js
- `app/app-builder/page.tsx` (NEW)
- `components/app-builder/Canvas.tsx` (NEW)
- `components/app-builder/RenderedComponent.tsx` (NEW)
- `components/app-builder/ComponentPalette.tsx` (NEW)
- `components/app-builder/PropertiesPanel.tsx` (NEW)
- `components/app-builder/Toolbar.tsx` (NEW)
- `lib/stores/editor.ts` (NEW)

**Xác thực (Verification):**

- ✅ Kéo từ palette vào canvas hoạt động
- ✅ Sắp xếp lại (sortable reordering) hoạt động
- ✅ Nested Container children sortable hoạt động
- ✅ Undo/redo hoạt động
- ✅ Properties panel cập nhật real-time
- ✅ Xóa loại bỏ components đệ quy
- ✅ Không lỗi TypeScript
- ✅ Dev server chạy thành công

**Bài học rút ra (Lessons Learned):**

- Luôn verify library compatibility TRƯỚC KHI implement (đặc biệt với React 19)
- React 19 rất mới (Oct 2025), nhiều libraries chưa cập nhật
- Kiểm tra ngày cập nhật cuối của library (Craft.js: 2+ năm trước = cờ đỏ)
- @dnd-kit chứng minh đáng tin cậy hơn Craft.js "chuyên biệt" cho React 19
- Triển khai manual = nhiều code hơn nhưng hiểu rõ hơn + không có vấn đề black-box
- Tài liệu trong quá trình migration tiết kiệm thời gian sau này

**Cân nhắc tương lai:**

- Theo dõi Craft.js repo cho React 19 support
- Nếu Craft.js phát hành phiên bản tương thích React 19, cân nhắc migrate ngược lại để tận dụng các tính năng built-in (Frame/Element, serialization, undo/redo hooks)
- Hiện tại, @dnd-kit + Zustand ổn định và đã được chứng minh

---

### ✅ BUG-003: Hardcoded workspace_id trong Supabase queries

**Ngày sửa (Fixed):** 2025-11-09

**Ưu tiên (Priority):** 🟠 Cao (High)

**Ngày phát hiện (Discovered):** 2025-11-08

**Thời gian sửa (Time to Fix):** 2 giờ (hours)

**Danh mục (Category):** Task Management

**Nguyên nhân gốc (Root Cause):**

Trong quá trình phát triển ban đầu (during initial development), workspace_id bị hardcoded thành UUID tạm để tăng tốc development. Điều này có nghĩa:

- Tất cả users chia sẻ cùng workspace (All users shared the same workspace)
- Không hỗ trợ multi-workspace (No multi-workspace support)
- Rủi ro bảo mật (Security risk - users có thể thấy tasks của nhau)

**Cách giải quyết (Solution):**

Tạo helper function `getOrCreateWorkspaceId()` trong `lib/supabase/workspace.ts`:

- Tự động fetch workspace của user từ database (Automatically fetches)
- Tạo workspace mới nếu user chưa có (Creates new workspace if user doesn't have one)
- Trả về workspace_id để dùng trong queries (Returns for use in queries)
- Cập nhật tất cả productivity pages để dùng helper này (Updated all pages to use this helper)

**Các file đã sửa đổi (Files Modified):**

- `frontend/lib/supabase/workspace.ts` (MỚI - NEW)
- `frontend/app/(productivity)/today/page.tsx`
- `frontend/app/(productivity)/inbox/page.tsx`
- `frontend/app/(productivity)/projects/[id]/board/page.tsx`
- `frontend/app/kanban-demo/page.tsx`

**Xác thực (Verification):**

- Tạo 2 tài khoản test (Created 2 test accounts)
- Xác thực mỗi tài khoản có workspace riêng biệt (Verified each account has separate workspace)
- Xác thực tasks không được chia sẻ giữa tài khoản (Verified tasks are not shared between accounts)
- Xác thực RLS policies thực thi workspace isolation

**Bài học rút ra (Lessons Learned):**

- Không hardcode IDs, ngay cả cho POC (Don't hardcode IDs, even for POC)
- Thiết lập workspace management đúng cách từ ngày 1 (Set up proper workspace management from Day 1)
- RLS policies rất quan trọng cho multi-tenancy (RLS policies are critical for multi-tenancy)

---

### ✅ BUG-004: Tasks disappear after marking complete

**Ngày sửa (Fixed):** 2025-11-08

**Ưu tiên (Priority):** 🟠 Cao (High)

**Ngày phát hiện (Discovered):** 2025-11-08

**Thời gian sửa (Time to Fix):** 0.5 giờ (hours)

**Danh mục:** Task Management

**Nguyên nhân gốc (Root Cause):**

Supabase query trong trang `/today` đã lọc bỏ completed tasks (filtered out):

```typescript
const { data: tasks } = await supabase
  .from('tasks')
  .select('*')
  .eq('workspace_id', workspaceId)
  .eq('completed', false) // ❌ This caused the bug
```

Khi user toggle task completion, task được đánh dấu `completed: true`, bị loại bỏ khỏi query results, làm nó biến mất khỏi UI (which removed it from the query results, making it disappear from the UI).

**Cách giải quyết (Solution):**

Gỡ bỏ filter `.eq('completed', false)` để hiển thị tất cả tasks (cả complete và incomplete - both complete and incomplete):

```typescript
const { data: tasks } = await supabase
  .from('tasks')
  .select('*')
  .eq('workspace_id', workspaceId)
// ✅ Show all tasks, let UI handle styling
```

**Các file đã sửa đổi (Files Modified):**

- `frontend/app/(productivity)/today/page.tsx`
- `frontend/app/(productivity)/inbox/page.tsx`

**Xác thực (Verification):**

- Toggle task completion trên trang `/today` (Toggled on page)
- Xác thực task vẫn hiển thị (với strikethrough - with strikethrough)
- Xác thực trạng thái task tồn tại qua các lần reload trang (persists across page reloads)

**Bài học rút ra (Lessons Learned):**

- Cân nhắc UX trước khi lọc data (Consider UX before filtering data)
- Tasks đã hoàn thành nên vẫn hiển thị (với visual distinction - Completed tasks should remain visible)
- Test edge cases (empty state, tất cả complete, etc.)

---

### ✅ BUG-005: RLS infinite recursion in workspace_members

**Ngày sửa (Fixed):** 2025-11-07

**Ưu tiên (Priority):** 🔴 Nghiêm trọng (Critical)

**Ngày phát hiện (Discovered):** 2025-11-07

**Thời gian sửa (Time to Fix):** 1 giờ (hour)

**Danh mục:** Database

**Nguyên nhân gốc (Root Cause):**

Row Level Security (RLS) policy trên bảng `workspace_members` tạo ra infinite recursion (vòng lặp vô hạn - created infinite recursion):

```sql
-- ❌ BROKEN POLICY
CREATE POLICY "Users can view workspace members"
ON workspace_members FOR SELECT
USING (
  workspace_id IN (
    SELECT workspace_id FROM workspace_members WHERE user_id = auth.uid()
  )
);
```

Policy kiểm tra bảng `workspace_members` để xác định quyền truy cập vào bảng `workspace_members`, tạo ra vòng lặp vô hạn (The policy checked table to determine access to table, creating infinite loop).

**Cách giải quyết (Solution):**

Đơn giản hóa RLS policy chỉ kiểm tra user_id (Simplified to only check):

```sql
-- ✅ FIXED POLICY
CREATE POLICY "Users can view workspace members"
ON workspace_members FOR SELECT
USING (user_id = auth.uid());
```

**Các file đã sửa đổi (Files Modified):**

- `backend/supabase/migrations/001_task_management_schema.sql`

**Xác thực (Verification):**

- Chạy `npx supabase db reset` để apply migration (Ran to apply)
- Xác thực query thực thi không timeout (Verified executes without timeout)
- Xác thực users chỉ có thể thấy workspace memberships của riêng mình (can only see their own)

**Bài học rút ra (Lessons Learned):**

- Tránh recursive subqueries trong RLS policies (Avoid)
- Test RLS policies trong Supabase SQL editor trước khi apply (before applying)
- Giữ RLS policies đơn giản (complexity = bugs - Keep simple)

---

### ✅ BUG-006: TaskList infinite re-render loop

**Ngày sửa (Fixed):** 2025-11-07

**Ưu tiên (Priority):** 🔴 Nghiêm trọng (Critical)

**Ngày phát hiện (Discovered):** 2025-11-07

**Thời gian sửa (Time to Fix):** 0.5 giờ (hours)

**Danh mục:** Task Management

**Nguyên nhân gốc (Root Cause):**

`useEffect` dependency array bao gồm function `fetchTasks`, được tạo lại mỗi render (included function which was recreated on every render):

```typescript
// ❌ BROKEN CODE
const fetchTasks = async () => {
  // ...
}

useEffect(() => {
  fetchTasks()
}, [fetchTasks]) // ❌ fetchTasks changes every render
```

Điều này gây ra vòng lặp vô hạn (This caused infinite loop):

1. Component renders → fetchTasks được tạo (created)
2. useEffect chạy (runs) → fetchTasks được gọi (called) → state được cập nhật (updated)
3. Component re-renders → fetchTasks mới được tạo (new created)
4. useEffect chạy lại (runs again - dependency changed) → lặp lại (repeat)

**Cách giải quyết (Solution):**

Thay đổi dependency để chỉ re-run khi `workspace_id` thay đổi (Changed to only re-run when changes):

```typescript
// ✅ FIXED CODE
useEffect(() => {
  fetchTasks()
}, [workspace_id]) // ✅ Only re-run when workspace_id changes
```

**Các file đã sửa đổi (Files Modified):**

- `frontend/components/tasks/TaskList.tsx`

**Xác thực (Verification):**

- Mở trang `/today` (Opened page)
- Xác thực tasks load một lần (không vòng lặp vô hạn - not infinite loop)
- Kiểm tra browser console (không có lỗi - no errors)
- Xác thực React DevTools hiển thị single render (shows)

**Bài học rút ra (Lessons Learned):**

- Cẩn thận với useEffect dependencies (Be careful with)
- Functions không nên ở trong dependency arrays (dùng useCallback hoặc primitives - should not be in, use or)
- Test cho vòng lặp vô hạn trong development (Test for infinite loops in)

---

## 🚨 BUGS NGHIÊM TRỌNG (Critical Bugs - Fix Immediately)

**Định nghĩa (Definition):** Bugs chặn chức năng cốt lõi hoặc gây mất dữ liệu (that block core functionality or cause data loss)

**Ưu tiên (Priority):** Những bugs này PHẢI được sửa trước khi tiếp tục với tính năng mới (These bugs MUST be fixed before continuing with new features)

**Bugs Nghiêm trọng Hiện tại (Current Critical Bugs):** 0

**Ví dụ về Bugs Nghiêm trọng (Examples of Critical Bugs):**

- Users không thể đăng nhập (Auth bị hỏng - cannot log in, Auth broken)
- Mất dữ liệu khi lưu (Database bị hỏng - Data loss when saving, Database corruption)
- App crashes khi load (Runtime error)
- Lỗ hổng bảo mật (RLS policy bị hỏng - Security vulnerability, RLS policy broken)
- Hệ thống thanh toán bị hỏng (Payment system broken - Billing issue)

**Quy Trình Báo Cáo Khẩn (Escalation Process):**

1. **Phát hiện Critical Bug (Discover)** → Ngay lập tức dừng công việc hiện tại (Immediately stop current work)
2. **Tài liệu hóa Bug (Document)** → Dùng template BUG-XXX ở trên (Use template above)
3. **Thông báo Team (Notify)** → Đăng trong team chat/Slack (Post in)
4. **Giao Owner (Assign)** → Ai sẽ sửa? (Who will fix this?)
5. **Ước tính Thời gian (Estimate Time)** → Mất bao lâu để sửa? (How long to fix?)
6. **Sửa & Test (Fix & Test)** → Sửa bug, xác thực với tests (verify with tests)
7. **Deploy Hotfix** → Deploy lên production ASAP
8. **Phân tích sau sự cố (Postmortem)** → Tài liệu hóa bài học rút ra (Document lessons learned)

---

## 📋 BUG CATEGORIES

### 1. Dashboard Grid

**Scope:** All bugs related to DashboardGrid, AppMiniCard, drag-and-drop, layout persistence

**Examples:**

- Layout not persisting
- Cards overlapping
- Drag-and-drop not working on mobile
- Resize handles not functional

**Current Bugs:** 0

---

### 2. App Builder

**Scope:** All bugs related to Craft.js, Builder Components, Actions System, App Renderer

**Examples:**

- Components not draggable
- Actions not triggering
- App definition not saving
- Renderer crashes

**Current Bugs:** 0

---

### 3. Marketplace

**Scope:** All bugs related to Browse Page, App Detail Page, Install Flow, Publish Flow

**Examples:**

- Apps not showing in marketplace
- Install button not working
- Publish flow broken
- App stats not updating

**Current Bugs:** 0

---

### 4. Task Management

**Scope:** All bugs related to Tasks, Projects, Kanban, Inline Editing, Priority Select

**Examples:**

- Tasks not saving
- Kanban drag-and-drop broken
- Inline edit not persisting
- Priority badge color wrong

**Current Bugs:** 2 (both Low priority)

**Bug List:**

- BUG-001: No empty state images in TaskList
- BUG-002: No loading skeletons in TaskList

---

### 5. Auth & Security

**Scope:** All bugs related to Google OAuth, Supabase Auth, RLS Policies, Session Management

**Examples:**

- Users cannot log in
- RLS policy allowing unauthorized access
- Session expiring too early
- OAuth redirect broken

**Current Bugs:** 0

---

### 6. Performance

**Scope:** All bugs related to slow load times, lag, memory leaks, poor responsiveness

**Examples:**

- Dashboard takes 5+ seconds to load
- Grid layout lags when dragging
- Memory leak in App Renderer
- Supabase query too slow (>2s)

**Current Bugs:** 0

---

### 7. UI/UX

**Scope:** All bugs related to visual issues, layout problems, accessibility, mobile responsiveness

**Examples:**

- Button text cut off on mobile
- Color contrast too low (WCAG fail)
- Tooltip not showing
- Modal not closing on ESC

**Current Bugs:** 0

---

### 8. Database

**Scope:** All bugs related to Supabase database, migrations, RLS policies, data integrity

**Examples:**

- Migration failed to apply
- RLS policy blocking authorized user
- Foreign key constraint error
- Data corruption (NULL where shouldn't be)

**Current Bugs:** 0

---

### 9. Other

**Scope:** All other bugs not covered by above categories

**Current Bugs:** 0

---

## 📝 HOW TO REPORT A BUG

**When you discover a bug:**

1. **Check if bug already exists** in "ACTIVE BUGS" section above
2. **Reproduce the bug** at least twice to confirm
3. **Assign a Bug ID** (next available BUG-XXX number)
4. **Fill out the template** below:

```markdown
### BUG-XXX: [Short Bug Title]

**Status:** 🔴 Open

**Ưu tiên:** [🔴 Critical | 🟠 High | 🟡 Medium | 🔵 Low]

**Discovered:** YYYY-MM-DD

**Danh mục:** [Category]

**Affected Prompt:** [PROMPT X.Y](../AI_PROMPTS.md#prompt-xy)

**Description:**
[Clear description]

**Steps to Reproduce:**
1. Step 1
2. Step 2
3. Step 3

**Environment:**
- Browser: [Browser version]
- Device: [Desktop/Mobile/Tablet]
- OS: [OS version]

**Screenshots/Logs:**
- [Link or paste logs]

**Assigned To:** [Name or TBD]

**Related Files:**
- [path/to/file.tsx](../../path/to/file.tsx)

**Notes:**
- [Additional context]
```

1. **Paste into "ACTIVE BUGS" section** (sorted by priority: Critical → High → Medium → Low)
2. **Update BUGS SUMMARY** table (increment counts)
3. **Update THIS_WEEK.md** if blocking current sprint
4. **Notify team** if Critical or High priority

---

## ✅ HOW TO CLOSE A BUG

**When you fix a bug:**

1. **Verify the fix** works in all environments (desktop, mobile, different browsers)
2. **Copy the bug** from "ACTIVE BUGS" section
3. **Move to "FIXED BUGS" section** (at the top, newest first)
4. **Update the template** with:

```markdown
### ✅ BUG-XXX: [Short Bug Title]

**Fixed:** YYYY-MM-DD

**Ưu tiên:** [Priority]

**Discovered:** YYYY-MM-DD

**Time to Fix:** X hours

**Danh mục:** [Category]

**Root Cause:**
[What caused the bug]

**Solution:**
[How it was fixed]

**Files Modified:**

- [path/to/file.tsx](../../path/to/file.tsx)

**Verification:**
[How we verified the fix works]

**Lessons Learned:**
- [What we learned]
```

5. **Update BUGS SUMMARY** table (decrement active count, increment fixed count)
6. **Update FEATURES.md** if bug fix is significant enough
7. **Run update script** (if available):

```bash
# Bash
./scripts/update-bugs.sh BUG-XXX "Bug Title" "Fixed"

# PowerShell
.\scripts\update-bugs.ps1 -BugID "BUG-XXX" -Title "Bug Title" -Status "Fixed"
```

---

## 🔧 BUG PRIORITY GUIDE

**How to assign priority:**

### 🔴 Critical

**Criteria:**

- Blocks core functionality (cannot use app)
- Causes data loss or corruption
- Security vulnerability (RLS policy broken)
- Affects all users (not edge case)

**Examples:**

- Users cannot log in
- Saving dashboard layout causes data loss
- RLS policy allows unauthorized access
- App crashes on load for all users

**Action:** Fix immediately, stop all other work

---

### 🟠 High

**Criteria:**

- Affects major feature (but has workaround)
- Affects many users (>50%)
- Causes significant UX degradation
- No data loss, but functionality broken

**Examples:**

- Drag-and-drop not working on mobile (but works on desktop)
- App install button broken (but can install via URL)
- Kanban board not loading (but list view works)

**Action:** Fix this week, prioritize over new features

---

### 🟡 Medium

**Criteria:**

- Affects minor feature
- Affects some users (10-50%)
- Causes minor UX degradation
- Has easy workaround

**Examples:**

- Priority badge color wrong
- Tooltip text typo
- Modal animation glitchy
- Mobile layout slightly off

**Action:** Fix this sprint, after Critical/High bugs

---

### 🔵 Low

**Criteria:**

- Cosmetic issue
- Affects few users (<10%)
- Very minor UX degradation
- Easy workaround available

**Examples:**

- Button hover color slightly off
- Console warning (not error)
- Missing icon
- Typo in help text
- No empty state illustration
- No loading skeleton

**Action:** Fix when time permits, backlog

---

## 📊 BUG METRICS

**Tracking bug health:**

| Metric | Target | Current |
|--------|--------|---------|
| **Active Bugs** | <5 | 2 |
| **Critical Bugs** | 0 | 0 ✅ |
| **High Priority Bugs** | <3 | 0 ✅ |
| **Average Time to Fix (Critical)** | <4 hours | 0.75 hours ✅ |
| **Average Time to Fix (High)** | <24 hours | 1.25 hours ✅ |
| **Bugs Fixed This Week** | - | 0 |
| **Bugs Discovered This Week** | - | 0 |

**Bug Velocity (Weekly):**

| Week | Discovered | Fixed | Net Change | Active (End of Week) |
|------|------------|-------|------------|----------------------|
| Week 1 (17-23/11) | 0 | 0 | 0 | 2 (from previous) |
| Week 2 (24-30/11) | - | - | - | - |
| Week 3 (01-07/12) | - | - | - | - |
| Week 4 (08-14/12) | - | - | - | - |

**Goal:** Keep Active Bugs <5, Fix Critical bugs within 4 hours, Fix High Priority bugs within 24 hours

---

## 🧪 TESTING CHECKLIST (Prevent Bugs)

**Before marking a feature as "completed", test:**

### Desktop Testing

- [ ] Chrome (latest version)
- [ ] Safari (latest version)
- [ ] Firefox (latest version)
- [ ] Edge (latest version)

### Mobile Testing

- [ ] iOS Safari (iPhone)
- [ ] iOS Safari (iPad)
- [ ] Android Chrome (Phone)
- [ ] Android Chrome (Tablet)

### Functional Testing

- [ ] Happy path (everything works)
- [ ] Error path (network timeout, server error)
- [ ] Edge cases (empty state, max characters, special characters)
- [ ] Accessibility (keyboard navigation, screen reader)

### Performance Testing

- [ ] Page load time <2 seconds
- [ ] Interaction latency <100ms
- [ ] No console errors
- [ ] No memory leaks

### Security Testing

- [ ] RLS policies prevent unauthorized access
- [ ] XSS prevention (sanitize user input)
- [ ] SQL injection prevention (parameterized queries)
- [ ] CSRF protection (Supabase handles this)

---

## 🚀 AUTOMATED SCRIPTS

### Bash Script: Update Bug Status

**File:** `scripts/update-bugs.sh`

```bash
#!/bin/bash
# update-bugs.sh - Update bug status in BUGS.md

BUG_ID=$1        # e.g., "BUG-001"
BUG_TITLE=$2     # e.g., "DashboardGrid not persisting"
STATUS=$3        # e.g., "Fixed" or "Open"
TODAY=$(date +"%Y-%m-%d")

if [ "$STATUS" == "Fixed" ]; then
  echo "✅ Marking $BUG_ID as Fixed..."

  # Update BUGS.md (move from ACTIVE to FIXED section)
  sed -i "s/### $BUG_ID:/### ✅ $BUG_ID:/g" docs/02-EXECUTION/status/BUGS.md
  sed -i "s/\*\*Status:\*\* 🔴 Open/\*\*Fixed:\*\* $TODAY/g" docs/02-EXECUTION/status/BUGS.md

  echo "✅ Bug $BUG_ID marked as Fixed!"
else
  echo "🔴 Creating new bug $BUG_ID..."

  # Append new bug to ACTIVE BUGS section
  echo "" >> docs/02-EXECUTION/status/BUGS.md
  echo "### $BUG_ID: $BUG_TITLE" >> docs/02-EXECUTION/status/BUGS.md
  echo "**Status:** 🔴 Open" >> docs/02-EXECUTION/status/BUGS.md
  echo "**Discovered:** $TODAY" >> docs/02-EXECUTION/status/BUGS.md
  echo "" >> docs/02-EXECUTION/status/BUGS.md

  echo "✅ Bug $BUG_ID created!"
fi
```

**How to Run:**

```bash
# Create new bug
./scripts/update-bugs.sh "BUG-007" "DashboardGrid not persisting" "Open"

# Mark bug as fixed
./scripts/update-bugs.sh "BUG-001" "No empty state images" "Fixed"
```

---

### PowerShell Script: Update Bug Status

**File:** `scripts/update-bugs.ps1`

```powershell
# update-bugs.ps1 - Update bug status in BUGS.md

param(
    [string]$BugID = "BUG-001",
    [string]$Title = "Bug Title",
    [string]$Status = "Open"  # "Open" or "Fixed"
)

$TODAY = Get-Date -Format "yyyy-MM-dd"
$BUGS_FILE = "docs\02-EXECUTION\status\BUGS.md"

if ($Status -eq "Fixed") {
    Write-Host "✅ Marking $BugID as Fixed..." -ForegroundColor Green

    # Update BUGS.md (move from ACTIVE to FIXED section)
    $content = Get-Content -Path $BUGS_FILE
    $updatedContent = $content -replace "### $BugID:", "### ✅ $BugID:"
    $updatedContent = $updatedContent -replace "\*\*Status:\*\* 🔴 Open", "**Fixed:** $TODAY"
    Set-Content -Path $BUGS_FILE -Value $updatedContent

    Write-Host "✅ Bug $BugID marked as Fixed!" -ForegroundColor Green
} else {
    Write-Host "🔴 Creating new bug $BugID..." -ForegroundColor Yellow

    # Append new bug to ACTIVE BUGS section
    $newBug = @"

### $BugID: $Title
**Status:** 🔴 Open
**Discovered:** $TODAY

"@

    Add-Content -Path $BUGS_FILE -Value $newBug

    Write-Host "✅ Bug $BugID created!" -ForegroundColor Green
}
```

**How to Run:**

```powershell
# Create new bug
.\scripts\update-bugs.ps1 -BugID "BUG-007" -Title "DashboardGrid not persisting" -Status "Open"

# Mark bug as fixed
.\scripts\update-bugs.ps1 -BugID "BUG-001" -Title "No empty state images" -Status "Fixed"
```

---

## 🔗 QUICK LINKS

- [AI_PROMPTS.md](../AI_PROMPTS.md) - All prompts for 12-week roadmap
- [ROADMAP.md](../ROADMAP.md) - 12-week Code First roadmap
- [FEATURES.md](FEATURES.md) - Completed features log
- [THIS_WEEK.md](THIS_WEEK.md) - Current week's tasks
- [TECH_STACK.md](../../03-REFERENCE/TECH_STACK.md) - Tech stack reference
- [PRINCIPLES.md](../../03-REFERENCE/PRINCIPLES.md) - Development principles

---

## 💡 BUG PREVENTION TIPS

**How to prevent bugs before they happen:**

1. **Write TypeScript strictly** - Enable strict mode, no `any` types
2. **Test before committing** - Manual testing on desktop + mobile
3. **Use RLS policies** - Always test auth scenarios (logged in, logged out, wrong user)
4. **Handle errors gracefully** - Network timeouts, server errors, empty states
5. **Validate user input** - Min/max length, sanitize HTML, prevent XSS
6. **Use loading states** - Optimistic UI, skeleton loaders, disable buttons during submit
7. **Test responsive design** - Desktop, tablet, mobile breakpoints
8. **Review before shipping** - Code review, manual QA, automated tests
9. **Monitor production** - Supabase logs, browser console errors, user reports
10. **Document decisions** - Why did you choose this approach? Future you will thank you.

---

## 🎯 BUG PHILOSOPHY

> "Bugs are inevitable. Fast fixes are what matter."

**Principles:**

1. **Acknowledge bugs quickly** - Don't ignore, don't blame
2. **Prioritize ruthlessly** - Critical bugs block everything else
3. **Fix root cause** - Don't just patch symptoms
4. **Document lessons learned** - Every bug is a learning opportunity
5. **Prevent recurrence** - Add tests, update checklists, improve process
6. **Ship fast, fix fast** - Better to ship with minor bugs and fix quickly than delay for perfection

**Decision Framework:**

- **Critical Bug?** → Fix immediately, deploy hotfix
- **High Priority?** → Fix this week, prioritize over new features
- **Medium Priority?** → Fix this sprint, after Critical/High
- **Low Priority?** → Backlog, fix when time permits

---

**Cập nhật lần cuối:** 17 tháng 11, 2025

**Next Review:** End of Week 1 (23/11/2025)

**Owner:** NEXUS Development Team

---

**Remember:** "The best bug is the one that never happens. The second best is the one fixed in <4 hours."
