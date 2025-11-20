# 🔧 DRAG FIX - Testing Guide

## ✅ What Was Fixed

**Issue:** Component được nhấn nhưng không kéo được

**Root Cause:** 
- `useDraggable` ref được attach vào component wrapper
- Nhưng drag handle (`{...listeners}`) ở div con bên trong
- @dnd-kit không biết handle nào để track drag events

**Solution:**
- Sử dụng `setActivatorNodeRef` từ `useDraggable`
- Connect ref này vào drag handle div
- Giờ @dnd-kit biết chính xác element nào để listen drag events

**Code Changed:**
```tsx
// BEFORE:
const { listeners, setNodeRef, ... } = useDraggable({ id });
<div ref={setNodeRef}>  {/* ← Wrapper */}
  <div {...listeners}>   {/* ← Handle */}

// AFTER:
const { listeners, setActivatorNodeRef, ... } = useDraggable({ id });
<div>
  <div ref={setActivatorNodeRef} {...listeners}>  {/* ← Handle connected! */}
```

---

## 🧪 Testing Steps

### 1. Reload Page
```
Ctrl + Shift + R  (hard reload)
```

### 2. Create Component
1. Drag "Text Block" từ palette vào canvas
2. Component được tạo → auto-selected
3. Control bar xuất hiện trên component: `[≡ TextBlock] [🗑️]`

### 3. Test Drag (NEW FIX)
1. **Hover** vào phần `[≡ TextBlock]`
   - ✅ Cursor should change to **move** (4 arrows)
   
2. **Click + Hold** chuột trên `[≡ TextBlock]`
   - ✅ Giữ chuột ít nhất 1 giây
   
3. **Kéo** 10-15 pixels (important!)
   - ✅ Activation constraint = 8px
   - ✅ Component opacity → 50%
   - ✅ Drag overlay xuất hiện: "TextBlock"
   
4. **Di chuyển** cursor lên/xuống
   - ✅ Component follow cursor
   - ✅ Canvas border highlight khi hover
   
5. **Thả** chuột
   - ✅ Component stay at new position
   - ✅ Can undo/redo

### 4. Check Console Logs
Open F12 Console, should see:
```
🎬 DRAG START: { activeId: "textblock-...", isNew: false, ... }
🔄 Moving existing component: textblock-...
📍 Move to: Canvas root
🏁 DRAG END: { activeId: "textblock-...", overId: "canvas-root" }
```

### 5. Use Debug Panel
Bottom-right corner có "Drag Debug Tools" panel:

**Button 1: "Test Drag Setup"**
- Click this AFTER selecting a component
- Console shows:
  - Selected component ✅
  - Drag handle element ✅
  - @dnd-kit attributes ✅
  - Data attributes ✅

**Button 2: "Test Pointer Events"**
- Click this then try dragging
- Console logs all pointer events (pointerdown, pointermove, etc.)

**Button 3: "Check @dnd-kit Setup"**
- Shows all draggable/droppable elements in DOM
- Verify IDs are correct

---

## ❌ If Still Not Working

### Symptom 1: Cursor không đổi thành "move"
**Check:**
```javascript
// Console:
const handle = document.querySelector('[title="Drag to move"]');
console.log(getComputedStyle(handle).cursor);
// Should be: "move"
```

**Fix:** Clear browser cache + hard reload

### Symptom 2: Click được nhưng không kéo
**Check activation constraint:**
- Phải kéo **ít nhất 8 pixels** mới trigger drag
- Try kéo 20-30px to be safe

**Alternative:** Giảm activation distance
```tsx
// Canvas.tsx
useSensor(PointerSensor, {
  activationConstraint: {
    distance: 3,  // ← Reduce from 8 to 3
  },
})
```

### Symptom 3: Kéo được nhưng không thả được
**Check console for:**
```
🏁 DRAG END: { overId: null }  ← BAD: No drop target
🏁 DRAG END: { overId: "canvas-root" }  ← GOOD
```

**If overId is null:**
- Canvas useDroppable not working
- Check Canvas.tsx `useDroppable({ id: 'canvas-root' })`

### Symptom 4: Console không log gì
**Check DndContext:**
```tsx
// Canvas.tsx - Make sure onDragStart and onDragEnd are connected:
<DndContext 
  sensors={sensors} 
  onDragStart={handleDragStart}   ← Must have
  onDragEnd={handleDragEnd}       ← Must have
>
```

---

## 🎯 Expected Console Output (Working)

```
🎬 DRAG START: {
  activeId: "textblock-1732012345678",
  data: { type: "TextBlock", isNew: false },
  isNew: false,
  type: "TextBlock"
}

🔄 Moving existing component: textblock-1732012345678
📍 Move to: Canvas root
🏁 DRAG END: {
  activeId: "textblock-1732012345678",
  overId: "canvas-root",
  data: { type: "TextBlock", isNew: false }
}
```

---

## 📊 Comparison

| Aspect           | Before Fix              | After Fix                  |
| ---------------- | ----------------------- | -------------------------- |
| Ref connection   | ❌ Wrapper only          | ✅ Activator (handle)       |
| Drag trigger     | ❌ Anywhere (confusing)  | ✅ Handle only (clear UX)   |
| Visual feedback  | ⚠️ Inconsistent         | ✅ Cursor + hover           |
| @dnd-kit aware   | ❌ No                    | ✅ Yes (via setActivatorNodeRef) |

---

## 🚀 Next Test: Nesting

After drag working:

1. Drag "Container" vào canvas
2. Drag "Button" vào canvas  
3. Select Button
4. Drag Button handle **onto Container**
5. Button should:
   - Become child of Container
   - Render indented with border-left
   - Can be dragged back out

---

**Report kết quả test!** 

Nếu vẫn lỗi, cung cấp:
1. Screenshot console logs
2. Cursor có đổi thành move không?
3. Kéo bao xa? (thử kéo 30px)
4. Debug panel output
