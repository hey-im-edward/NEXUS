# 🔧 NHẬT KÝ GỠ LỖI - Troubleshooting Log

> **Mục đích:** Ghi lại tất cả bugs đã gặp, nguyên nhân, giải pháp, và bài học từ quá trình phát triển.

**Tạo:** 13 tháng 11, 2024
**Nguồn:** Tích hợp từ Brain Dump và thực tế development

---

## 📋 **MỤC LỤC**

1. [Bug #1: Hardcoded workspace_id](#bug-1-hardcoded-workspace_id-trong-task-pages)
2. [Bug #2: Tasks biến mất sau khi complete](#bug-2-tasks-biến-mất-sau-khi-complete)
3. [Bug #3: Lỗi TypeScript - workspace_id](#bug-3-lỗi-typescript---workspace_id-không-có-trong-user-type)
4. [Bug #4: Empty state không có hình ảnh](#bug-4-empty-state-không-có-hình-ảnh)
5. [Bug #5: Không có loading skeleton](#bug-5-không-có-loading-skeleton)
6. [Bug #6: Conflict khi move files với Git](#bug-6-conflict-khi-move-files-với-git)

---

## Bug #1: Hardcoded workspace_id trong task pages

**Ngày phát hiện:** Tháng 10, 2024
**Trạng thái:** ✅ **ĐÃ SỬA** - Giải quyết với `getOrCreateWorkspaceId()` helper

### **Vấn đề**

Task pages sử dụng hardcoded `workspace_id` thay vì lấy từ user context

### **Triệu chứng**

* **File:** `app/(productivity)/today/page.tsx` dòng 15
* **Code:**
  ```typescript
  const workspace_id = "c6be91ba-98c3-43e5-8e5e-94e389894fa6"
  ```
* **Tác động:** Tasks không load cho users khác

### **Nguyên nhân gốc rễ**

* Trong giai đoạn POC, chưa triển khai user workspace lookup
* Hardcode để test nhanh
* Thiếu helper function để fetch workspace từ user

### **Giải pháp**

#### **Tạm thời (POC):**
```typescript
// Chấp nhận hardcode, thêm TODO comment
const workspace_id = "c6be91ba-..." // TODO: Thay bằng workspace của user
```

#### **Lâu dài (Đã triển khai):**

```typescript
// Tạo helper function: lib/supabase/workspace.ts
export async function getOrCreateWorkspaceId(userId: string) {
  // 1. Kiểm tra xem user đã có workspace chưa
  const { data: member } = await supabase
    .from('workspace_members')
    .select('workspace_id')
    .eq('user_id', userId)
    .single()

  if (member?.workspace_id) {
    return member.workspace_id
  }

  // 2. Tạo workspace mới nếu chưa có
  const { data: workspace } = await supabase
    .from('workspaces')
    .insert({
      name: `Workspace của ${user.email}`,
      owner_id: userId
    })
    .select()
    .single()

  // 3. Thêm user vào workspace_members
  await supabase
    .from('workspace_members')
    .insert({
      workspace_id: workspace.id,
      user_id: userId,
      role: 'owner'
    })

  return workspace.id
}
```

#### **Cách sử dụng:**

```typescript
// app/(productivity)/today/page.tsx
const user = await getUser()
const workspaceId = await getOrCreateWorkspaceId(user.id)
const { tasks } = await getTasks(workspaceId)
```

### **Bài học kinh nghiệm**

- ✅ **Best Practice:** Tạo helper functions cho các patterns phổ biến
- ✅ **Tự động tạo:** Tự động tạo workspace cho users mới
- ✅ **Single Source of Truth:** Tập trung logic workspace vào một chỗ
- ⚠️ **Đừng Hardcode:** Tránh hardcode IDs, ngay cả khi đang development

### **Files liên quan**

- `lib/supabase/workspace.ts` - Helper function
- `app/(productivity)/today/page.tsx` - Đã fix
- `app/(productivity)/inbox/page.tsx` - Đã fix
- `app/(productivity)/projects/page.tsx` - Đã fix

---

## Bug #2: Tasks biến mất sau khi complete

**Ngày phát hiện:** Tháng 10, 2024
**Trạng thái:** ✅ **ĐÃ SỬA**

### **Vấn đề**

Click checkbox → Task biến mất khỏi list ngay lập tức

### **Triệu chứng**

* **File:** `components/tasks/task-list.tsx`
* **Code:**
  ```typescript
  const incompleteTasks = tasks.filter(task => !task.completed)
  ```
* **Tác động:** Users không thấy feedback khi complete task (gây nhầm lẫn)

### **Nguyên nhân gốc rễ**

* Filter logic trong `TaskList` component lọc bỏ completed tasks
* Quyết định thiết kế ban đầu: Trang "Today" chỉ hiển thị incomplete tasks
* Không có visual feedback (gạch ngang, fade out, v.v.)

### **Giải pháp**

#### **Option 1: Xóa Filter (Đã triển khai)**

```typescript
// Trước:
const incompleteTasks = tasks.filter(task => !task.completed)

// Sau:
const allTasks = tasks // Hiển thị tất cả tasks, bao gồm cả completed
```

#### **Option 2: Thêm nút "Hiện Completed" (Cải tiến tương lai)**

```typescript
const [showCompleted, setShowCompleted] = useState(true)

const displayTasks = showCompleted
  ? tasks
  : tasks.filter(task => !task.completed)
```

### **Cải tiến bổ sung**

```typescript
// Thêm gạch ngang cho completed tasks
<span className={task.completed ? 'line-through text-gray-500' : ''}>
  {task.title}
</span>

// Thêm fade animation
<div className={`transition-opacity ${task.completed ? 'opacity-50' : 'opacity-100'}`}>
  {/* Nội dung task */}
</div>
```

### **Bài học kinh nghiệm**

- ✅ **UX First:** Luôn hiển thị feedback cho hành động của user
- ✅ **Đừng ẩn ngay:** Sử dụng animations/transitions trước khi ẩn
- ✅ **Kiểm soát của User:** Để users kiểm soát những gì họ thấy (show/hide completed)
- ⚠️ **Test giả định:** "Chỉ hiện incomplete" nghe có vẻ hợp lý nhưng test UX chứng minh ngược lại

### **Files liên quan**

- `components/tasks/task-list.tsx` - Đã fix filter logic
- `components/tasks/task-item.tsx` - Đã thêm styling
- `lib/stores/tasks.ts` - Zustand store (không thay đổi)

---

## Bug #3: Lỗi TypeScript - workspace_id không có trong User type

**Ngày phát hiện:** Tháng 10, 2024
**Trạng thái:** ✅ **ĐÃ SỬA** - Pattern đã documented

### **Vấn đề**

```typescript
Property 'workspace_id' does not exist on type 'User'
```

### **Triệu chứng**

* **File:** `lib/hooks/use-tasks.ts`
* **Code:**
  ```typescript
  const workspaceId = user.workspace_id // ❌ Lỗi
  ```
* **Tác động:** Lỗi biên dịch TypeScript

### **Nguyên nhân gốc rễ**

* User table (Supabase Auth) không có field `workspace_id`
* Workspace ID phải fetch từ table `workspace_members` (quan hệ many-to-many)
* Hiểu lầm thiết kế database schema

### **Giải pháp**

```typescript
// Cách tiếp cận đúng: Fetch từ workspace_members
async function getUserWorkspace(userId: string) {
  const { data: member, error } = await supabase
    .from('workspace_members')
    .select('workspace_id')
    .eq('user_id', userId)
    .single()

  if (error) {
    throw new Error('Không thể fetch workspace')
  }

  return member?.workspace_id
}

// Cách sử dụng:
const user = await getUser()
const workspaceId = await getUserWorkspace(user.id)
```

### **Database Schema (Tham khảo)**

```sql
-- Users table (Supabase Auth - không thể sửa)
CREATE TABLE auth.users (
  id UUID PRIMARY KEY,
  email TEXT NOT NULL,
  -- ... các fields auth khác
  -- ❌ KHÔNG có workspace_id ở đây
);

-- Workspace membership (many-to-many)
CREATE TABLE public.workspace_members (
  id UUID PRIMARY KEY,
  workspace_id UUID REFERENCES workspaces(id),
  user_id UUID REFERENCES auth.users(id),
  role TEXT CHECK (role IN ('owner', 'admin', 'member')),
  -- ✅ workspace_id ở ĐÂY
);
```

### **Bài học kinh nghiệm**

- ✅ **Hiểu Schema:** Biết table nào lưu data nào
- ✅ **Many-to-Many:** Sử dụng junction tables cho quan hệ user-workspace
- ✅ **Type Safety:** Lỗi TypeScript giúp phát hiện hiểu lầm về schema
- ⚠️ **Đừng mở rộng Auth Tables:** Tables Supabase Auth được quản lý, dùng junction tables thay vào đó

### **Tài liệu liên quan**

- `docs/04_technical/architecture/database-schema-v2-productivity.sql` - Tham khảo schema đầy đủ
- `docs/02_ai-prompts/templates/bug-fix.md` - Template fix bug

---

## Bug #4: Empty state không có hình ảnh

**Ngày phát hiện:** Tháng 10, 2024
**Trạng thái:** ⏳ **ĐÃ LÊN KẾ HOẠCH** - Week 4 (Giai đoạn Polish)

### **Vấn đề**

Empty states chỉ có text, không có illustration → Thiếu hấp dẫn

### **Triệu chứng**

* **Files:**
  - `app/(productivity)/today/page.tsx`
  - `app/(productivity)/inbox/page.tsx`
* **Trạng thái hiện tại:**
  ```tsx
  {tasks.length === 0 && (
    <p className="text-gray-500">Chưa có tasks nào</p>
  )}
  ```
* **Tác động:** UX kém chuyên nghiệp, không engaging

### **Nguyên nhân gốc rễ**

* Focus vào POC/MVP: Chưa có thời gian thiết kế empty states
* Chưa có illustrations (undraw.co, custom SVG)
* Chưa triển khai EmptyState component tái sử dụng được

### **Giải pháp (Đã lên kế hoạch)**

#### **Ngắn hạn (Hiện tại - Chấp nhận được):**

```tsx
// Empty state chỉ có text
<div className="text-center py-12">
  <p className="text-gray-500 text-lg">Chưa có tasks nào</p>
  <p className="text-gray-400 text-sm mt-2">
    Nhấn 'c' để tạo task đầu tiên
  </p>
</div>
```

#### **Dài hạn (Week 4):**

```tsx
// EmptyState component với illustration
<EmptyState
  title="Chưa có tasks nào"
  description="Bắt đầu hành trình năng suất bằng cách tạo task đầu tiên"
  illustration="/images/empty-tasks.svg"
  action={{
    label: "Tạo Task",
    onClick: () => setIsCreating(true),
    shortcut: "C"
  }}
/>
```

#### **Nguồn Illustration:**

1. **undraw.co** (Free, có thể tùy chỉnh SVGs)
   - https://undraw.co/illustrations
   - Tìm kiếm: "empty", "task", "productivity"

2. **Custom SVG** (Đơn giản, nhẹ)
   - Icon clipboard tối giản
   - Pattern checkmark
   - Illustration inbox

### **Kế hoạch triển khai**

**Các việc cần làm Week 4:**
- [ ] Tạo component `EmptyState.tsx`
- [ ] Download/tạo 5 illustrations (tasks, projects, inbox, calendar, pages)
- [ ] Thêm animations nhẹ (fade in, hover effects)
- [ ] Thêm gợi ý hữu ích ("Nhấn 'c' để tạo", "Kéo thả để sắp xếp")

### **Ưu tiên**

- **Mức độ ưu tiên:** THẤP (Polish UX, không blocking)
- **Thời gian:** Week 4 (Giai đoạn Polish)
- **Công sức:** 2-3 giờ (tìm illustrations + triển khai component)

### **Bài học kinh nghiệm**

- ⚠️ **Đánh đổi MVP:** OK để bỏ qua polish trong POC, thêm sau
- ✅ **Empty States quan trọng:** Ấn tượng đầu tiên cho users mới
- ✅ **Components tái sử dụng:** Tạo một lần, dùng nhiều chỗ
- ✅ **Tài nguyên miễn phí:** undraw.co, illustrations.co, icons8.com

### **Files liên quan**

- `app/(productivity)/today/page.tsx` - Cần EmptyState
- `app/(productivity)/inbox/page.tsx` - Cần EmptyState
- `app/(productivity)/projects/page.tsx` - Cần EmptyState
- `components/ui/empty-state.tsx` - Sẽ được tạo

---

## Bug #5: Không có loading skeleton

**Ngày phát hiện:** Tháng 10, 2024
**Trạng thái:** ⏳ **ĐÃ LÊN KẾ HOẠCH** - Week 4

### **Vấn đề**

Khi fetch data, không có loading state → Màn hình trắng hoặc flicker

### **Triệu chứng**

* **Tác động:**
  - Task list bị flicker khi load
  - Query Supabase mất 200-500ms
  - UX kém: Users không biết app đang load hay bị lỗi

* **Hành vi hiện tại:**
  ```tsx
  if (isLoading) {
    return <p>Đang tải...</p> // ❌ Text đơn giản, không chuyên nghiệp
  }
  ```

### **Nguyên nhân gốc rễ**

* Chưa triển khai Skeleton components
* State `isLoading` không được xử lý đúng cách
* Focus vào functionality trước, polish UX sau

### **Giải pháp (Đã lên kế hoạch)**

#### **Bước 1: Tạo TaskSkeleton Component**

```tsx
// components/tasks/task-skeleton.tsx
export function TaskSkeleton() {
  return (
    <div className="flex items-center gap-2 p-2 animate-pulse">
      <div className="h-4 w-4 bg-gray-200 rounded" /> {/* Checkbox */}
      <div className="flex-1 h-4 bg-gray-200 rounded" /> {/* Title */}
      <div className="h-4 w-16 bg-gray-200 rounded" /> {/* Due date */}
    </div>
  )
}

// Cách sử dụng:
if (isLoading) {
  return (
    <>
      <TaskSkeleton />
      <TaskSkeleton />
      <TaskSkeleton />
    </>
  )
}
```

#### **Bước 2: Sử dụng shadcn/ui Skeleton**

```tsx
import { Skeleton } from "@/components/ui/skeleton"

// Linh hoạt hơn
<Skeleton className="h-12 w-full" />
<Skeleton className="h-12 w-3/4" />
<Skeleton className="h-12 w-1/2" />
```

#### **Bước 3: Thêm vào tất cả Pages**

```tsx
// app/(productivity)/today/page.tsx
export default async function TodayPage() {
  return (
    <Suspense fallback={<TaskListSkeleton />}>
      <TaskList />
    </Suspense>
  )
}
```

### **Kế hoạch triển khai**

**Các việc cần làm Week 4:**
- [ ] Tạo `TaskSkeleton.tsx`
- [ ] Tạo `ProjectCardSkeleton.tsx`
- [ ] Tạo `KanbanBoardSkeleton.tsx`
- [ ] Thêm Suspense boundaries vào tất cả pages
- [ ] Test loading states (throttle network trong DevTools)

### **Best Practices**

```tsx
// ✅ Tốt: Skeleton khớp với cấu trúc nội dung thực tế
<div className="space-y-2">
  <Skeleton className="h-12 w-full" /> {/* Khớp với chiều cao task */}
  <Skeleton className="h-12 w-full" />
  <Skeleton className="h-12 w-3/4" />  {/* Thay đổi width cho thật */}
</div>

// ❌ Tệ: Spinner chung chung
<div className="flex justify-center p-12">
  <Spinner />
</div>
```

### **Ưu tiên**

- **Mức độ ưu tiên:** TRUNG BÌNH (Polish UX, ảnh hưởng perception)
- **Thời gian:** Week 4 (Giai đoạn Polish)
- **Công sức:** 3-4 giờ

### **Bài học kinh nghiệm**

- ✅ **Loading States quan trọng:** Perceived performance > actual performance
- ✅ **Skeleton > Spinner:** Skeletons cảm giác nhanh hơn (hiển thị cấu trúc)
- ✅ **Suspense Boundaries:** Next.js streaming làm việc này dễ dàng
- ⚠️ **Đừng quên:** Dễ bỏ qua trong POC, quan trọng cho UX tốt

### **Files liên quan**

- `components/tasks/task-skeleton.tsx` - Sẽ được tạo
- `components/ui/skeleton.tsx` - Component shadcn/ui (đã cài)
- `app/(productivity)/*/page.tsx` - Tất cả pages cần Suspense

---

## Bug #6: Conflict khi move files với Git

**Ngày phát hiện:** November 8, 2024
**Trạng thái:** ✅ **ĐÃ GIẢI QUYẾT** - Pattern đã documented

### **Vấn đề**

Khi move files với `git mv`, một số files bị conflict và mất Git history

### **Triệu chứng**

* **Tác động:**
  - Files như `THIS_WEEK_OLD.md` không track được history
  - `git log` không hiển thị file movement
  - Commit history khó hiểu

* **Nguyên nhân gốc rễ:**
  - Dùng `mv` (shell command) thay vì `git mv`
  - Git không phát hiện file movement
  - File xuất hiện là "deleted + new file" thay vì "renamed"

### **Giải pháp**

#### **Cách sai:**

```bash
# ❌ Shell mv - Git mất history
mv docs/NOW.md docs/01_status/NOW.md
git add .
git commit -m "Tổ chức lại docs"
```

#### **Cách đúng:**

```bash
# ✅ Git mv - Bảo toàn history
git mv docs/NOW.md docs/01_status/NOW.md
git commit -m "docs: chuyển NOW.md vào folder 01_status"

# Xác minh:
git log --follow docs/01_status/NOW.md
# Hiển thị full history bao gồm cả commits trước khi move
```

### **Best Practices**

#### **Với Tracked Files:**

```bash
# Luôn dùng git mv
git mv old-path/file.md new-path/file.md
```

#### **Với Untracked Files:**

```bash
# Có thể dùng mv thường (không có history để bảo toàn)
mv new-file.md another-location/
git add .
```

#### **Move nhiều files:**

```bash
# Move nhiều files với git mv
for file in docs/*.md; do
  git mv "$file" "docs/01_status/$(basename $file)"
done

git commit -m "docs: tổ chức lại status files"
```

### **Phục hồi (Nếu đã commit)**

```bash
# Nếu bạn đã dùng mv thay vì git mv:

# 1. Tìm commit
git log --oneline

# 2. Revert commit
git revert <commit-hash>

# 3. Làm lại với git mv
git mv docs/NOW.md docs/01_status/NOW.md
git commit -m "docs: chuyển NOW.md đúng cách với history"
```

### **Bài học kinh nghiệm**

- ✅ **Luôn `git mv`:** Bảo toàn file history cho tracked files
- ✅ **Xác minh:** Dùng `git log --follow` để kiểm tra history
- ✅ **Ngoại lệ:** Untracked files không cần `git mv`
- ⚠️ **IDEs giúp đỡ:** VS Code, IntelliJ tự động dùng `git mv` khi kéo files

### **Lệnh liên quan**

```bash
# Kiểm tra xem file history có được bảo toàn không
git log --follow path/to/file.md

# Xem file movements trong commit
git show <commit-hash> --stat

# Tìm renamed files
git log --diff-filter=R --summary
```

### **Files liên quan**

- Tất cả files trong `docs/00_start-here/`, `docs/01_status/`, v.v.
- `.git/` - Git internals track file movements

---

## 📊 **THỐNG KÊ BUGS**

| Trạng thái | Số lượng | % |
|-----------|----------|---|
| ✅ Đã sửa | 4 | 67% |
| ⏳ Đã lên kế hoạch | 2 | 33% |
| ⏸️ Ưu tiên thấp | 2 | 33% |

### **Danh mục Bugs:**

1. **Database/Backend:** 2 bugs (workspace_id, lỗi TypeScript type)
2. **UX/Polish:** 2 bugs (empty states, loading skeletons)
3. **Lỗi Logic:** 1 bug (tasks biến mất)
4. **Development Workflow:** 1 bug (git mv)

### **Thời gian giải quyết trung bình:**

- Critical bugs: 1-2 ngày
- Medium bugs: Lên kế hoạch cho Week 4
- Low priority: Week 8+

---

## 🔍 **MẸO DEBUG**

### **Khi bạn gặp Bug:**

1. **Tái tạo:** Bạn có thể trigger nó một cách nhất quán không?
2. **Cô lập:** Các bước tối thiểu để tái tạo?
3. **Tìm kiếm:** Check log này trước (có thể đã được giải quyết)
4. **Ghi chép:** Thêm vào file này với template bên dưới

### **Template Báo cáo Bug:**

```markdown
## Bug #X: [Tiêu đề]

**Ngày phát hiện:** [Ngày]
**Trạng thái:** ⏳ Đang xử lý / ✅ Đã sửa / ⏸️ Ưu tiên thấp

### **Vấn đề**
[Cái gì bị hỏng?]

### **Triệu chứng**
- **File:** [path/to/file.tsx]
- **Code:** [code snippet]
- **Tác động:** [Ảnh hưởng đến users như thế nào?]

### **Nguyên nhân gốc rễ**
[Tại sao điều này xảy ra?]

### **Giải pháp**
[Bạn đã fix như thế nào? Code examples]

### **Bài học kinh nghiệm**
- ✅ [Best practice đã học được]
- ⚠️ [Điều cần tránh]

### **Files liên quan**
- [file1.tsx]
- [file2.ts]
```

---

## 🛠️ **LỆNH DEBUG THƯỜNG DÙNG**

### **Next.js:**

```bash
# Clear cache và rebuild
rm -rf .next
npm run build

# Kiểm tra lỗi TypeScript
npx tsc --noEmit

# Logs chi tiết
npm run dev -- --verbose
```

### **Supabase:**

```bash
# Test query trong browser console
const { data, error } = await supabase
  .from('tasks')
  .select('*')

console.log({ data, error })

# Kiểm tra RLS policies
SELECT * FROM pg_policies WHERE tablename = 'tasks';
```

### **Git:**

```bash
# Tìm khi nào bug được introduce
git bisect start
git bisect bad HEAD
git bisect good <last-known-good-commit>

# Kiểm tra file history
git log --follow --patch path/to/file.tsx

# Xem thay đổi gì
git diff HEAD~1 path/to/file.tsx
```

---

## 🔗 **TÀI LIỆU LIÊN QUAN**

- **Báo cáo Bugs:** [docs/01_status/BUGS.md](../01_status/BUGS.md) - Bugs đang hoạt động hiện tại
- **AI Prompts:** [docs/02_ai-prompts/templates/bug-fix.md](../02_ai-prompts/templates/bug-fix.md) - Template prompt để fix bugs
- **Kiến trúc:** [docs/04_technical/architecture/decisions.md](./architecture/decisions.md) - Quyết định kiến trúc giúp ngăn bugs
- **Nguồn:** Tích hợp từ [BRAIN_DUMP_from_initial_chat.md](../archive/conversations/BRAIN_DUMP_from_initial_chat.md)

---

**Cập nhật lần cuối:** 13 tháng 11, 2024
**Tổng bugs đã ghi chép:** 6
**Bugs đã giải quyết:** 4 (67%)
**Review tiếp theo:** Cuối Week 0 (20/11/2024)

**Lưu ý:** File này được tạo để track lịch sử bugs, giải pháp, và bài học từ quá trình phát triển. Mỗi bug mới nên được thêm vào với template ở trên.
