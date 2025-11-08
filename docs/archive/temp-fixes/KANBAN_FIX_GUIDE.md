# 🔧 Fix Kanban Drag & Drop Issues

## 🐛 Bugs đã fix:

### 1. ❌ Task không persist sau reload

**Nguyên nhân**: `updateTask` không `.select()` sau khi update, nên không sync lại với store

**Fix**:

```typescript
// Before
const { error } = await supabase.from('tasks').update(...).eq('id', id);

// After ✅
const { data, error } = await supabase
  .from('tasks')
  .update(...)
  .eq('id', id)
  .select()
  .single();

// Sync back to store
updateTaskStore(id, data as Task);
```

### 2. ❌ Reorder trong cùng cột không hoạt động

**Nguyên nhân**: Logic drag-drop không phân biệt rõ "drop on column" vs "drop on task"

**Fix**:

- Added check `if (activeId === overId) return;`
- Improved logging để debug
- Fixed reorder logic với `arrayMove`

---

## 📋 SQL Demo Data

File: `docs/insert-demo-tasks.sql`

### Cách chạy:

1. **Mở Supabase SQL Editor**

   ```
   https://supabase.com/dashboard/project/YOUR_PROJECT/sql
   ```

2. **Copy toàn bộ content từ file** `insert-demo-tasks.sql`

3. **Paste và Run** → Sẽ insert:

   - ✅ 5 tasks trong cột **TODO**
   - ✅ 4 tasks trong cột **IN_PROGRESS**
   - ✅ 3 tasks trong cột **DONE**

4. **Verify**: Script tự động show summary table

---

## 🧪 Test Cases

### Test 1: Drag giữa các cột ✅

```
1. Kéo "Review code PR #123" từ TODO → IN_PROGRESS
2. Check console:
   📦 Drag over column: { from: "todo", to: "in_progress" }
   🔄 Moving task to new column: { ... }
   ✅ Task moved successfully

3. Reload page (F5)
4. Verify: Task vẫn ở cột IN_PROGRESS ✅
```

### Test 2: Reorder trong cùng cột ✅

```
1. Trong cột TODO, kéo "Review code PR #123" lên trên "Thiết kế UI"
2. Check console:
   🔄 Reordering tasks within column: { oldIndex: 1, newIndex: 0 }
   → Review code PR #123: position 1 → 0
   → Thiết kế UI: position 0 → 1
   ✅ Reorder successful

3. Reload page
4. Verify: Thứ tự vẫn giữ nguyên ✅
```

### Test 3: Click vào task ✅

```
1. Click vào bất kỳ task nào
2. Alert popup: "Clicked: [Task title]"
```

---

## 🔍 Debug Console Logs

Sau khi fix, console sẽ show chi tiết:

### Khi kéo giữa các cột:

```
📦 Drag over column: { from: "todo", to: "in_progress" }
🔄 Moving task to new column: {
  taskId: "xxx",
  task: "Review code PR #123",
  oldStatus: "todo",
  newStatus: "in_progress",
  newPosition: 4
}
📝 Updating task in DB: { id: "xxx", updates: { status: "in_progress", position: 4 } }
✅ Task updated in DB: { ... }
✅ Task moved successfully
```

### Khi reorder trong cùng cột:

```
🔄 Reordering tasks within column: {
  column: "todo",
  task: "Review code PR #123",
  oldIndex: 1,
  newIndex: 0
}
  → Review code PR #123: position 1 → 0
  → Thiết kế UI: position 0 → 1
  → Viết documentation: position 2 → 2
📝 Updating task in DB: { id: "xxx", updates: { position: 0 } }
✅ Task updated in DB: { ... }
✅ Reorder successful
```

---

## 📊 Expected Results

| Action            | Before Fix          | After Fix     |
| ----------------- | ------------------- | ------------- |
| Drag TODO → DONE  | ❌ Reset sau reload | ✅ Persist    |
| Reorder trong cột | ❌ Không hoạt động  | ✅ Hoạt động  |
| Console logs      | ❌ Thiếu detail     | ✅ Chi tiết   |
| Error handling    | ❌ Silent fail      | ✅ Show error |

---

## 🚀 Next Steps

### 1. Test với demo data

```bash
# Run SQL script in Supabase
# Reload http://localhost:3000/kanban-demo
# Test drag & drop
```

### 2. Verify persistence

```bash
# Kéo vài tasks
# F5 reload
# Check positions vẫn đúng
```

### 3. Ready for next features

- [ ] Task Modal (edit on click)
- [ ] Quick Add Button (+ ở mỗi cột)
- [ ] Real-time sync (Supabase Realtime)

---

## ⚠️ Troubleshooting

### Tasks vẫn reset sau reload?

1. Check Supabase connection
2. Check RLS policies cho UPDATE
3. Check console errors: `❌ Supabase update error`

### Reorder không hoạt động?

1. Check console: phải thấy "🔄 Reordering tasks"
2. Verify tasks trong cùng cột (status)
3. Check position values trong DB

### Console logs không hiện?

1. Hard refresh: Ctrl + Shift + R
2. Clear cache và reload
3. Check Network tab trong DevTools

---

**Last Updated**: 2025-11-07  
**Status**: ✅ Ready to test  
**TypeScript Errors**: 0
