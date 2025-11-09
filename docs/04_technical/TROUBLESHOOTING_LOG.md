# Nhật ký Gỡ lỗi (Troubleshooting Log)

> **Mục đích:** Lưu trữ lịch sử các lỗi, bugs, và cách khắc phục để tránh lặp lại sai lầm và hỗ trợ debug trong tương lai.

**Tạo:** November 9, 2025
**Cập nhật lần cuối:** November 9, 2025

---

## 📋 Quy ước

- **Trạng thái:**
  - ⚠️ Known issue (đã biết, chấp nhận tạm thời)
  - ✅ Fixed (đã sửa)
  - ⏳ Planned (dự định sửa)
  - ❌ Won't fix (không sửa)

- **Mức độ ưu tiên:**
  - 🔴 HIGH: Blocking, cần fix ngay
  - 🟡 MEDIUM: Ảnh hưởng UX, fix sớm
  - 🟢 LOW: Polish, có thể đợi

---

## Bug #1: Hardcoded workspace_id trong task pages

**Ngày phát hiện:** Tháng 10, 2025
**Trạng thái:** ⚠️ Known issue
**Mức độ:** 🟢 LOW

### Vấn đề
Task pages sử dụng hardcoded `workspace_id` thay vì lấy từ user context.

### Triệu chứng
- **File:** `app/(productivity)/today/page.tsx` line 15
- **Code:** 
  ```typescript
  const workspace_id = "c6be91ba-98c3-43e5-8e5e-94e389894fa6"
  ```
- **Hậu quả:** Tasks không load cho users khác ngoài workspace mặc định

### Nguyên nhân gốc rễ
- Trong POC phase, chưa implement user workspace lookup
- Hardcode để test nhanh chức năng
- Chưa có hệ thống quản lý workspace cho từng user

### Giải pháp

#### Temporary (POC)
```typescript
// TODO: Replace with dynamic workspace lookup
const workspace_id = "c6be91ba-98c3-43e5-8e5e-94e389894fa6"
```
- Chấp nhận hardcode
- Add TODO comment rõ ràng
- Acceptable vì hiện tại chỉ có 1 user testing

#### Long-term Solution
```typescript
// lib/hooks/use-workspace.ts
export function useWorkspace() {
  const [workspace, setWorkspace] = useState<Workspace | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  
  useEffect(() => {
    async function fetchWorkspace() {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return
      
      const { data: member } = await supabase
        .from('workspace_members')
        .select('workspace_id, workspaces(*)')
        .eq('user_id', user.id)
        .single()
      
      setWorkspace(member?.workspaces || null)
      setIsLoading(false)
    }
    
    fetchWorkspace()
  }, [])
  
  return { workspace, isLoading }
}
```

### Lesson Learned
- Hardcode cho POC là OK, nhưng phải document rõ ràng
- Add TODO comments để không quên refactor
- Prioritize based on user impact (LOW vì chỉ 1 user)

---

## Bug #2: Tasks disappear after marking complete

**Ngày phát hiện:** Tháng 10, 2025
**Trạng thái:** ✅ Fixed
**Mức độ:** 🟡 MEDIUM

### Vấn đề
Khi click checkbox để complete task, task biến mất khỏi danh sách ngay lập tức.

### Triệu chứng
- **File:** `components/tasks/task-list.tsx`
- **Hành vi:** Click checkbox → Task disappears
- **User feedback:** "Tôi không biết task có được save hay không"

### Nguyên nhân gốc rễ
Filter logic trong `TaskList` component tự động loại bỏ completed tasks:

```typescript
// ❌ Bug code
const incompleteTasks = tasks.filter(task => !task.completed)
return (
  <div>
    {incompleteTasks.map(task => <TaskItem key={task.id} task={task} />)}
  </div>
)
```

**Design decision sai:** Ban đầu nghĩ "Today" page chỉ nên show incomplete tasks, nhưng điều này gây confusing cho users.

### Giải pháp

#### Option 1: Show all tasks (Implemented)
```typescript
// ✅ Fixed code
return (
  <div>
    {tasks.map(task => <TaskItem key={task.id} task={task} />)}
  </div>
)
```

#### Option 2: Add toggle button (Future enhancement)
```typescript
const [showCompleted, setShowCompleted] = useState(false)
const displayTasks = showCompleted 
  ? tasks 
  : tasks.filter(task => !task.completed)

return (
  <div>
    <button onClick={() => setShowCompleted(!showCompleted)}>
      {showCompleted ? 'Hide' : 'Show'} completed
    </button>
    {displayTasks.map(task => <TaskItem key={task.id} task={task} />)}
  </div>
)
```

### Lesson Learned
- Don't hide user actions immediately - provide visual feedback
- Test với real users trước khi assume design decision
- Completed tasks nên được hiển thị (hoặc có toggle option)
- Consider adding "Undo" action cho peace of mind

---

## Bug #3: TypeScript error - workspace_id not in User type

**Ngày phát hiện:** Tháng 10, 2025
**Trạng thái:** ✅ Fixed
**Mức độ:** 🔴 HIGH

### Vấn đề
TypeScript compilation error khi cố gắng access `user.workspace_id`.

### Triệu chứng
- **File:** `lib/hooks/use-tasks.ts`
- **Error:** 
  ```
  Property 'workspace_id' does not exist on type 'User'
  ```
- **Hậu quả:** Build fails, không thể deploy

### Nguyên nhân gốc rễ
- Supabase User type không có `workspace_id` field
- User table trong database không có `workspace_id` column
- Workspace ID phải được fetch từ join table `workspace_members`

**Schema:**
```sql
-- users table (Supabase Auth)
users (
  id UUID PRIMARY KEY,
  email TEXT,
  -- NO workspace_id here
)

-- workspace_members table (Junction table)
workspace_members (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  workspace_id UUID REFERENCES workspaces(id)
)
```

### Giải pháp

```typescript
// ❌ Wrong approach
const workspace_id = user.workspace_id // Type error!

// ✅ Correct approach
async function getWorkspaceId(userId: string) {
  const { data: member } = await supabase
    .from('workspace_members')
    .select('workspace_id')
    .eq('user_id', userId)
    .single()

  return member?.workspace_id
}

// Usage
const { data: { user } } = await supabase.auth.getUser()
if (user) {
  const workspaceId = await getWorkspaceId(user.id)
  // Now fetch tasks with workspaceId
}
```

### Pattern Documented
Created template: `docs/02_ai-prompts/templates/bug-fix.md` with this pattern.

### Lesson Learned
- Always check database schema trước khi assume field tồn tại
- Supabase Auth tables khác với custom tables
- Junction tables cần extra query
- Document common patterns để AI không repeat mistakes

---

## Bug #4: Empty state không có images

**Ngày phát hiện:** Tháng 11, 2025
**Trạng thái:** ⏳ Planned (Week 4)
**Mức độ:** 🟢 LOW

### Vấn đề
Empty states (khi chưa có tasks) chỉ hiển thị text, không có illustrations.

### Triệu chứng
- **Pages affected:** `/today`, `/inbox`, `/upcoming`, `/projects`
- **Hành vi:** Chỉ hiển thị "No tasks yet" text
- **UX impact:** Trang trông trống rỗng, không friendly

### Nguyên nhân gốc rễ
- Chưa có empty state illustrations
- Chưa implement `EmptyState` component
- Focus vào functionality trước, polish sau

### Giải pháp

#### Short-term (Current)
```tsx
// Acceptable text-only empty state
{tasks.length === 0 && (
  <div className="text-center py-8 text-gray-500">
    <p>No tasks yet</p>
    <p className="text-sm mt-2">Press 'c' to create one</p>
  </div>
)}
```

#### Long-term (Planned)
```tsx
// EmptyState component with illustration
import { EmptyState } from '@/components/ui/empty-state'

{tasks.length === 0 && (
  <EmptyState
    illustration="/images/empty-tasks.svg"
    title="No tasks yet"
    description="Get started by creating your first task"
    action={{
      label: "Create task",
      onClick: () => setIsCreating(true)
    }}
  />
)}
```

**Illustration sources:**
- [undraw.co](https://undraw.co) - Free SVG illustrations
- [Storyset](https://storyset.com) - Animated illustrations
- Custom SVG - Simple, brand-consistent

### Priority
- 🟢 LOW priority (UX polish, không blocking functionality)
- Planned cho Week 4 (Polish phase)
- Quick win: 1-2 hours implementation

### Lesson Learned
- Empty states matter cho first impression
- Text-only là acceptable cho MVP
- Plan visual polish phase riêng

---

## Bug #5: No loading skeletons

**Ngày phát hiện:** Tháng 11, 2025
**Trạng thái:** ⏳ Planned (Week 4)
**Mức độ:** 🟡 MEDIUM

### Vấn đề
Khi fetch data từ Supabase, không có loading state → white screen hoặc content flicker.

### Triệu chứng
- **Affected components:** TaskList, ProjectGrid, CalendarView
- **Hành vi:** 
  - 200-500ms white screen while loading
  - Content "pops in" suddenly
  - Poor perceived performance
- **User feedback:** "App feels slow even though it's fast"

### Nguyên nhân gốc rễ
- Chưa implement Skeleton components
- `isLoading` state không được handle trong UI
- Focus vào functionality, bỏ qua loading states

```tsx
// ❌ Current code - No loading state
function TaskList() {
  const { tasks, isLoading } = useTasks()
  
  return (
    <div>
      {tasks.map(task => <TaskItem key={task.id} task={task} />)}
    </div>
  )
}
```

### Giải pháp

#### Option 1: Simple spinner (Quick fix)
```tsx
// ✅ Basic loading state
function TaskList() {
  const { tasks, isLoading } = useTasks()
  
  if (isLoading) {
    return <div className="flex justify-center py-8">
      <Spinner />
    </div>
  }
  
  return (
    <div>
      {tasks.map(task => <TaskItem key={task.id} task={task} />)}
    </div>
  )
}
```

#### Option 2: Skeleton UI (Recommended)
```tsx
// ✅ Better UX with skeleton
import { Skeleton } from '@/components/ui/skeleton'

function TaskList() {
  const { tasks, isLoading } = useTasks()
  
  if (isLoading) {
    return (
      <div className="space-y-2">
        {[1, 2, 3, 4, 5].map(i => (
          <TaskSkeleton key={i} />
        ))}
      </div>
    )
  }
  
  return (
    <div>
      {tasks.map(task => <TaskItem key={task.id} task={task} />)}
    </div>
  )
}

// TaskSkeleton component
function TaskSkeleton() {
  return (
    <div className="flex items-center gap-2 p-2">
      <Skeleton className="h-4 w-4 rounded" />
      <Skeleton className="h-4 flex-1" />
      <Skeleton className="h-4 w-20" />
    </div>
  )
}
```

### Implementation Plan
1. Install shadcn/ui Skeleton component
2. Create skeleton components for:
   - TaskSkeleton
   - ProjectCardSkeleton
   - CalendarEventSkeleton
3. Update all data-fetching components
4. Test on slow 3G connection

### Lesson Learned
- Loading states are crucial for perceived performance
- Skeleton UI > Spinners (shows structure, less jarring)
- Always handle `isLoading` state in UI
- Test on slow connections (Chrome DevTools throttling)

---

## Bug #6: Git merge conflict trong restructure

**Ngày phát hiện:** November 8, 2025
**Trạng thái:** ✅ Fixed
**Mức độ:** 🟡 MEDIUM

### Vấn đề
Khi move files trong documentation restructure, một số files bị conflict và mất Git history.

### Triệu chứng
- **File:** `THIS_WEEK_OLD.md`
- **Hành vi:** Git không track được file history sau khi move
- **Command used:** `mv` thay vì `git mv`

### Nguyên nhân gốc rễ
- Dùng `mv` command thay vì `git mv`
- Git coi file cũ bị deleted và file mới là untracked
- History bị đứt gãy

```bash
# ❌ Wrong command
mv docs/THIS_WEEK.md docs/archive/old-versions/THIS_WEEK_OLD.md

# Git sees:
# deleted:    docs/THIS_WEEK.md
# untracked:  docs/archive/old-versions/THIS_WEEK_OLD.md
```

### Giải pháp

```bash
# ✅ Correct command
git mv docs/THIS_WEEK.md docs/archive/old-versions/THIS_WEEK_OLD.md

# Git sees:
# renamed:    docs/THIS_WEEK.md -> docs/archive/old-versions/THIS_WEEK_OLD.md
```

### Best Practice
- **ALWAYS use `git mv`** khi move files trong Git repo
- `git mv` preserves file history
- Exception: Untracked files hoặc files mới tạo (có thể dùng `mv`)

### Recovery (nếu đã dùng `mv` nhầm)
```bash
# If you already used `mv` and staged the changes:
git reset HEAD .
git mv old/path/file.md new/path/file.md
git add .
git commit -m "docs: restructure documentation"
```

### Lesson Learned
- `git mv` > `mv` when working with Git
- File history is valuable, preserve it
- Test restructure commands trên branch riêng trước
- Document Git best practices cho team

---

## 📝 Template cho Bug mới

Khi phát hiện bug mới, copy template này:

```markdown
## Bug #X: [Tên bug ngắn gọn]

**Ngày phát hiện:** [Date]
**Trạng thái:** [⚠️ Known / ✅ Fixed / ⏳ Planned / ❌ Won't fix]
**Mức độ:** [🔴 HIGH / 🟡 MEDIUM / 🟢 LOW]

### Vấn đề
[Mô tả vấn đề một cách ngắn gọn]

### Triệu chứng
- **File:** [File path và line number]
- **Hành vi:** [Cách bug biểu hiện]
- **Hậu quả:** [Impact lên users/system]

### Nguyên nhân gốc rễ
[Tại sao bug xảy ra? Root cause analysis]

### Giải pháp
[Code hoặc steps để fix]

### Lesson Learned
[Bài học rút ra để tránh lặp lại]
```

---

## 📊 Thống kê

- **Tổng số bugs:** 6
- **Đã fix:** 3 (Bug #2, #3, #6)
- **Đang theo dõi:** 1 (Bug #1)
- **Dự định fix:** 2 (Bug #4, #5)
- **Won't fix:** 0

---

## 🔗 Related Files

- `docs/01_status/BUGS.md` - Current bugs tracking
- `docs/02_ai-prompts/templates/bug-fix.md` - Bug fix prompt template
- `docs/04_technical/TESTING_STRATEGY.md` - Testing strategy
- `docs/03_roadmap/THIS_WEEK.md` - Current priorities

---

**Next Update:** Khi phát hiện bug mới hoặc fix bug hiện tại
