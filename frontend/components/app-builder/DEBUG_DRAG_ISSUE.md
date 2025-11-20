# 🐛 DEBUG: App Builder Drag Issue

**Issue:** Component chỉ click được, không kéo được

## 📋 Test Steps

1. Open http://localhost:3000/app-builder
2. Drag "Text Block" from palette → canvas ✅ (works)
3. Click on TextBlock → should show controls with GripVertical icon
4. Try to drag GripVertical handle → ❌ **NOT WORKING**

## 🔍 Root Cause Analysis

**Current Code:**
```tsx
// RenderedComponent.tsx lines 55-61
<button
  {...listeners}      // ← Drag listeners ONLY on button
  {...attributes}     // ← Drag attributes ONLY on button
  className="p-0.5 hover:bg-primary-foreground/20 rounded cursor-move"
>
  <GripVertical className="h-3 w-3" />
</button>
```

**Problem:**
- `listeners` và `attributes` chỉ apply lên button GripVertical
- Button nhỏ (3x3), khó target
- Có thể button click handler conflict với drag handler

## 🧪 Quick Test in Console

Open browser console (F12) và chạy:

```javascript
// Test 1: Check if drag listeners attached
const gripButton = document.querySelector('[title="Drag to move"]');
console.log('Grip button:', gripButton);
console.log('Has mousedown listener:', gripButton?.onmousedown);
console.log('Has pointerdown listener:', gripButton?.onpointerdown);

// Test 2: Check PointerSensor activation
// Select a component first, then try dragging grip
// Watch console for @dnd-kit logs
```

## 💡 Possible Fixes

### Fix 1: Increase grab area (Quick)
Make button bigger/easier to grab:
```tsx
<button
  {...listeners}
  {...attributes}
  className="p-1.5 hover:bg-primary-foreground/20 rounded cursor-move"
  onMouseDown={(e) => e.stopPropagation()} // Prevent click-to-select
>
  <GripVertical className="h-4 w-4" />
</button>
```

### Fix 2: Apply listeners to entire component (Best UX)
Allow dragging from anywhere on component:
```tsx
<div
  ref={setNodeRef}
  {...listeners}        // ← Apply to whole component
  {...attributes}
  onClick={(e) => {
    e.stopPropagation();
    selectComponent(componentId);
  }}
  className={`cursor-move ...`}  // ← Show move cursor everywhere
>
```

**Trade-off:** Need to handle onClick + drag conflict

### Fix 3: Separate drag handle div (Medium)
Make entire top control bar draggable:
```tsx
<div 
  {...listeners}
  {...attributes}
  className="absolute -top-8 left-0 flex items-center gap-1 bg-primary ... cursor-move"
>
  <GripVertical className="h-3 w-3" />
  <span className="font-medium">{component.type}</span>
  {/* Delete button WITHOUT listeners */}
</div>
```

## 🎯 Recommended Solution

**Use Fix 3:** Make entire control bar draggable
- Clear visual affordance (whole bar is grab area)
- No conflict with component click-to-select
- Delete button still clickable separately
- Matches UX patterns (Notion, Figma)

## ⚠️ Additional Checks

1. **Check PointerSensor activation:**
   - Current: `activationConstraint: { distance: 8 }`
   - This means need to drag 8px before drag starts
   - Might feel unresponsive on small button

2. **Check React event propagation:**
   - Button click might be stopping propagation
   - Test: Remove `e.stopPropagation()` from delete button

3. **Check z-index:**
   - Control bar has `z-10`
   - Make sure nothing covers it

## 🔧 Implementation

Apply Fix 3 to RenderedComponent.tsx
