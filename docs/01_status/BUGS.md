# 🐛 BUGS - Known Issues

> **Mục đích:** Track tất cả bugs - Critical, Medium, Low.

**Cập nhật:** 8 tháng 11, 2025

---

## 📊 **TỔNG QUAN**

```
🔴 Critical:   0 bugs
🟡 Medium:     0 bugs
🟢 Low:        2 bugs (Acceptable cho POC)
───────────────────────
   Total:      2 bugs (1 fixed)
```

---

## 🔴 **CRITICAL (0)**

_Không có bugs critical - Tốt! ✅_

---

## 🟡 **MEDIUM (0)**

_Không có bugs medium - Tốt! ✅_

---

## 🟢 **LOW (2 - Acceptable cho POC)**

### **Bug #1: Hardcoded workspace_id** ✅ FIXED

**Mô tả:**  
Workspace ID được hardcode trong code thay vì lấy từ user context.

**Fixed Date:** Nov 9, 2025

**Solution:**  
Đã implement `getOrCreateWorkspaceId()` helper trong `lib/supabase/workspace.ts`:
- Tự động lấy workspace từ user
- Tự động tạo workspace nếu chưa có
- Sử dụng trong tất cả productivity pages

**Files Updated:**
- `frontend/lib/supabase/workspace.ts` ✅ (NEW - Helper function)
- `frontend/app/(productivity)/today/page.tsx` ✅ (Updated)
- `frontend/app/(productivity)/inbox/page.tsx` ✅ (Updated)
- `frontend/app/(productivity)/projects/[id]/board/page.tsx` ✅ (Updated)
- `frontend/app/kanban-demo/page.tsx` ✅ (Updated)

**Status:** ✅ FIXED - Không còn hardcode, tự động tạo workspace

---

### **Bug #2: No empty state images**

**Mô tả:**  
Khi không có tasks, chỉ hiện text "No tasks" - không có illustration.

**File:**  
`frontend/components/tasks/task-list.tsx`

**Impact:**

- ⚠️ UI trông empty, không professional
- ⚠️ User không biết làm gì tiếp theo

**Priority:** LOW (UX improvement, không ảnh hưởng chức năng)

**Plan to Fix:**

```tsx
// Add empty state component
{
  tasks.length === 0 && (
    <div className="text-center py-12">
      <img src="/empty-tasks.svg" alt="No tasks" />
      <p>No tasks yet. Create your first task!</p>
      <Button>Add Task</Button>
    </div>
  );
}
```

**Timeline:** Week 4 (UI polish phase)

---

### **Bug #3: No loading skeletons**

**Mô tả:**  
Khi fetch tasks, không có loading skeleton - chỉ thấy blank screen 1-2 giây.

**File:**  
`frontend/components/tasks/task-list.tsx`

**Impact:**

- ⚠️ Blank screen, user tưởng bị lag
- ⚠️ Không professional

**Priority:** LOW (UX improvement)

**Plan to Fix:**

```tsx
// Add skeleton loader
{
  isLoading && (
    <>
      <Skeleton className="h-12 w-full" />
      <Skeleton className="h-12 w-full" />
      <Skeleton className="h-12 w-full" />
    </>
  );
}
```

**Timeline:** Week 4 (UI polish phase)

---

## ✅ **FIXED BUGS (Historical)**

### **Bug #4: RLS infinite recursion ✅ FIXED**

**Mô tả:**  
Row Level Security policy tạo infinite loop.

**Fixed Date:** Nov 7, 2025

**Solution:**  
Removed recursive workspace_member check.

---

### **Bug #5: TaskList infinite loop ✅ FIXED**

**Mô tả:**  
useEffect dependency array thiếu, tạo infinite re-render.

**Fixed Date:** Nov 7, 2025

**Solution:**

```typescript
// Before
useEffect(() => {
  fetchTasks();
}, [fetchTasks]); // ❌ fetchTasks changes every render

// After
useEffect(() => {
  fetchTasks();
}, [workspace_id]); // ✅ Only re-run when workspace_id changes
```

---

### **Bug #6: Tasks disappear after complete ✅ FIXED**

**Mô tả:**  
Toggle task complete → Task biến mất khỏi UI.

**Fixed Date:** Nov 8, 2025

**Root Cause:**  
Filter only showed `completed: false` tasks.

**Solution:**

```typescript
// Show all tasks in /today, not just incomplete
const tasks = await supabase.from('tasks').select('*').eq('workspace_id', workspaceId);
// Removed: .eq('completed', false)
```

---

## 🔍 **BUG REPORTING TEMPLATE**

Nếu phát hiện bug mới, thêm vào đây theo format:

````markdown
### **Bug #X: [Tên bug ngắn gọn]**

**Mô tả:**  
[Giải thích bug chi tiết - Làm gì → Kết quả sai ra sao]

**File:**  
[Đường dẫn file + dòng]

**Steps to Reproduce:**

1. [Bước 1]
2. [Bước 2]
3. [Kết quả: Bug xuất hiện]

**Expected Behavior:**  
[Nên hoạt động như thế nào]

**Actual Behavior:**  
[Thực tế hoạt động ra sao]

**Impact:**

- [Ảnh hưởng gì đến users/features]

**Priority:** [CRITICAL / MEDIUM / LOW]

**Plan to Fix:**

```code
// Solution ở đây
```
````

**Timeline:** [Week X]

---

## 🎯 **BUG FIX PRIORITY**

### **CRITICAL bugs:**
- ✅ Fix NGAY trong ngày phát hiện
- ✅ Block tất cả features khác

### **MEDIUM bugs:**
- ✅ Fix trong tuần phát hiện
- ✅ Không block features khác

### **LOW bugs:**
- ✅ Accept cho POC
- ✅ Fix trong phase polish (Week 4+)

---

## 📈 **BUG STATISTICS**

### **Week 0 (Nov 7-13):**
```

Bugs found: 6
Bugs fixed: 3
Bugs open: 3 (all LOW)
Fix rate: 50%

```

### **Target:**
```

End of Week 1: 0 CRITICAL, 0 MEDIUM bugs
End of Week 4: 0 bugs total (polish phase)

```

---

## 🔗 **RELATED DOCS**

- **Features:** [FEATURES.md](./FEATURES.md)
- **UI/UX Status:** [UI_UX.md](./UI_UX.md)
- **Technical Fixes:** [../archive/temp-fixes/](../archive/temp-fixes/)

---

**Last Updated:** November 8, 2025
**Next Review:** November 11, 2025 (End of Week 0)
