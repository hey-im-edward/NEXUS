# 🔄 CRAFT.JS → @DND-KIT MIGRATION

**Date:** 19 tháng 11, 2025

**Reason:** Craft.js v0.2.12 không tương thích với React 19.2.0

**Decision:** Chuyển sang @dnd-kit (đã có trong project cho Kanban Board)

---

## 🚨 VẤN ĐỀ PHÁT HIỆN

### Craft.js + React 19 Incompatibility

**Evidence:**
- ✅ Craft.js v0.2.12 released 2021, built for React 17/18
- ✅ NEXUS đang dùng React 19.2.0 (released Nov 2024)
- ✅ Connectors được tạo thành công (console logs)
- ✅ `draggable="true"` attribute được set
- ❌ **Drag events KHÔNG fire** (cả main app VÀ working example)
- ❌ Last Craft.js update: 2+ years ago (có thể abandoned)

**React 19 Breaking Changes ảnh hưởng:**
- Ref callback timing changes
- Event handler attachment changes
- Synthetic event pooling removed
- Different render behavior

### Test Results

**Test 1: Main App (/app-builder)**
- Console output: Connectors created successfully
- Behavior: Không drag được, không thả được
- Conclusion: Setup đúng nhưng library không hoạt động

**Test 2: Working Example (/test-craft)**
- Copied trực tiếp từ Craft.js official docs
- Console output: Tương tự main app
- Behavior: Cũng KHÔNG hoạt động
- Conclusion: **Xác nhận incompatibility với React 19**

---

## 💡 QUYẾT ĐỊNH

### Options Considered

#### Option A: Downgrade React 18 ❌
**Pros:**
- Craft.js hoạt động ngay
- Theo đúng PROMPT 1.4 requirement
- Less code to write

**Cons:**
- ⚠️ Mất React 19 features (Server Components improvements, better SSR)
- ⚠️ Risk: Next.js 16 build cho React 19, downgrade có thể gây issues
- ⚠️ Technical debt: Phụ thuộc vào unmaintained library
- ⚠️ Future migration pain khi upgrade lại React 19

#### Option B: Use @dnd-kit ✅ CHOSEN
**Pros:**
- ✅ Modern, actively maintained (last update: Nov 2024)
- ✅ React 19 compatible
- ✅ Already in project (working for KanbanBoard)
- ✅ Consistent pattern across codebase
- ✅ Full control over implementation
- ✅ Future-proof

**Cons:**
- ⚠️ More boilerplate code (~200-300 lines extra)
- ⚠️ Implementation time: 1-2 hours
- ⚠️ Technically không follow PROMPT 1.4 đúng 100%

### Final Decision: Option B

**Rationale:**
1. **Architecture > Speed:** Foundation tốt > làm nhanh
2. **Consistency:** Cùng pattern với Kanban → maintainable
3. **Future-proof:** 6 tháng sau sẽ cảm ơn quyết định này
4. **Learning:** Hiểu visual editor internals (valuable skill)

---

## 🗑️ FILES REMOVED

### Craft.js Dependencies
```bash
npm uninstall @craftjs/core @craftjs/layers
```

**Removed:**
- `@craftjs/core@0.2.12`
- `@craftjs/layers@0.2.7`
- `@craftjs/utils@0.2.5`
- `react-contenteditable@3.3.7` (dependency)
- `styled-components@6.1.19` (dependency)
- ... và 15 packages khác

### Files Deleted

**frontend/components/app-builder/**
- `Editor.tsx` - Craft.js Editor wrapper ❌
- `Canvas.tsx` - Craft.js Frame/Element ❌
- `ComponentPalette.tsx` - Craft.js connectors.create() ❌
- `PropertiesPanel.tsx` - Craft.js useEditor() ❌
- `Toolbar.tsx` - Craft.js actions.history ❌
- `components/PlaceholderComponent.tsx` - Craft.js useNode() ❌
- `WORKING_EXAMPLE.tsx` - Test file ❌
- `DEBUG.md` - Debug instructions ❌
- `README.md` - Craft.js setup guide ❌

**frontend/app/**
- `app-builder/page.tsx` - App builder route ❌
- `test-craft/page.tsx` - Test route ❌

**Total:** ~600 lines of Craft.js code removed

---

## 🎯 NEW IMPLEMENTATION PLAN

### @dnd-kit App Builder Architecture

**Inspiration:** KanbanBoard implementation (đã working với React 19)

**Core Concepts:**
```typescript
// Kanban uses DndContext, useDraggable, useDroppable
// App Builder sẽ dùng CÙNG pattern nhưng cho visual components

// Old Craft.js way:
connectors.create(ref, <Component />)

// New @dnd-kit way:
const { attributes, listeners, setNodeRef } = useDraggable({ id: 'component-1' })
```

### Components to Build

#### 1. **EditorProvider** (thay Craft.js Editor)
- Zustand store for component tree state
- Selection management
- Undo/redo history

#### 2. **Canvas** (thay Craft.js Frame)
- `<DndContext>` wrapper
- Droppable zone với `useDroppable()`
- Render component tree from state

#### 3. **ComponentPalette** (tương tự old)
- `useDraggable()` for each component type
- Visual list of available components

#### 4. **RenderedComponent** (thay useNode)
- `useDraggable()` for drag to move
- Click to select
- Highlight on hover/selection

#### 5. **PropertiesPanel** (giữ nguyên logic)
- Read from selected component state
- Update component props

#### 6. **Toolbar** (rebuild undo/redo)
- Implement với Zustand history
- Save/Load from state

### State Management Structure

```typescript
// Zustand store
interface EditorState {
  // Component tree
  components: {
    [id: string]: {
      type: 'TextBlock' | 'Button' | 'Container'
      props: Record<string, any>
      children: string[] // IDs of child components
      parent: string | null
    }
  }
  
  // UI state
  selectedId: string | null
  hoveredId: string | null
  
  // History
  history: EditorState[]
  historyIndex: number
  
  // Actions
  addComponent: (type, parentId?) => void
  updateComponent: (id, props) => void
  deleteComponent: (id) => void
  selectComponent: (id) => void
  undo: () => void
  redo: () => void
}
```

### Drag-Drop Flow

```typescript
// ComponentPalette - SOURCE
function DraggableComponent({ type }: { type: string }) {
  const { attributes, listeners, setNodeRef } = useDraggable({
    id: `palette-${type}`,
    data: { type, isNew: true }
  })
  
  return (
    <div ref={setNodeRef} {...listeners} {...attributes}>
      {type}
    </div>
  )
}

// Canvas - DROP ZONE
function Canvas() {
  const { setNodeRef } = useDroppable({ id: 'canvas' })
  const { components } = useEditorStore()
  
  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event
    if (over?.id === 'canvas') {
      // Create new component
      addComponent(active.data.current.type)
    }
  }
  
  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div ref={setNodeRef}>
        {Object.values(components).map(comp => (
          <RenderedComponent key={comp.id} {...comp} />
        ))}
      </div>
    </DndContext>
  )
}

// RenderedComponent - DRAGGABLE + SELECTABLE
function RenderedComponent({ id, type, props }: Component) {
  const { attributes, listeners, setNodeRef } = useDraggable({
    id,
    data: { type, isNew: false }
  })
  
  const { selectComponent } = useEditorStore()
  
  return (
    <div 
      ref={setNodeRef} 
      {...listeners} 
      {...attributes}
      onClick={() => selectComponent(id)}
    >
      <ComponentRenderer type={type} props={props} />
    </div>
  )
}
```

---

## 📋 IMPLEMENTATION TASKS

### Phase 1: Core Infrastructure (2 hours)
- [ ] Create Zustand store `useEditorStore`
- [ ] Implement component tree state management
- [ ] Add undo/redo history logic
- [ ] Create selection state management

### Phase 2: Drag-Drop System (2 hours)
- [ ] Setup DndContext in Canvas
- [ ] Implement ComponentPalette with useDraggable
- [ ] Implement Canvas with useDroppable
- [ ] Handle DragEnd event → create component

### Phase 3: Components (2 hours)
- [ ] Build RenderedComponent wrapper
- [ ] Implement PlaceholderComponent (simple test)
- [ ] Add selection highlight
- [ ] Add hover effects

### Phase 4: UI Panels (1 hour)
- [ ] Rebuild PropertiesPanel (read from store)
- [ ] Rebuild Toolbar (undo/redo from store)
- [ ] Add Save/Load buttons

### Phase 5: Testing (1 hour)
- [ ] Test drag from palette → create new
- [ ] Test drag existing → move
- [ ] Test selection
- [ ] Test undo/redo
- [ ] Test props editing

**Total Estimate:** 8 hours (1 working day)

---

## 📝 DOCUMENTATION UPDATES

### Files to Update

**Updated:**
- [ ] `docs/02-EXECUTION/AI_PROMPTS.md` - PROMPT 1.4 section
- [ ] `docs/02-EXECUTION/ROADMAP.md` - Week 2 section
- [ ] `docs/02-EXECUTION/status/THIS_WEEK.md` - Current week status
- [ ] `docs/03-REFERENCE/TECH_STACK.md` - Remove Craft.js, emphasize @dnd-kit
- [ ] `docs/02-EXECUTION/PRIMING_PROMPT.md` - Update technology section

**Created:**
- [X] `docs/02-EXECUTION/CRAFT_JS_TO_DND_KIT_MIGRATION.md` (this file)
- [ ] `CRAFT_JS_REACT_19_ISSUE.md` (root level warning)

---

## 🎓 LEARNINGS

### What Went Wrong
- **Assumption:** Latest React = compatible với all libraries
- **Reality:** React 19 breaking changes incompatible với old libraries
- **Lesson:** Check library maintenance status BEFORE choosing

### What Went Right
- **Decision process:** Evaluated options systematically
- **Fallback option:** @dnd-kit already in project
- **Pattern reuse:** Can learn from KanbanBoard implementation

### For Future
- ✅ Check "Last Updated" date for libraries
- ✅ Check React version compatibility explicitly
- ✅ Have backup plans for critical dependencies
- ✅ Prefer actively maintained libraries

---

## 🔗 REFERENCES

**@dnd-kit Documentation:**
- https://docs.dndkit.com/

**KanbanBoard Implementation:**
- `frontend/components/kanban/KanbanBoard.tsx`
- Pattern reference for DndContext usage

**Craft.js Issues:**
- https://github.com/prevwong/craft.js/issues
- Last issue: 6 months ago, no response from maintainer

**React 19 Migration Guide:**
- https://react.dev/blog/2024/04/25/react-19-upgrade-guide

---

## ✅ SUCCESS CRITERIA (Post-Migration)

**Migration successful when:**
- [ ] Drag component từ palette vào canvas → component xuất hiện
- [ ] Drag component trên canvas → component di chuyển
- [ ] Click component → selection highlight
- [ ] Edit props trong PropertiesPanel → component updates
- [ ] Undo/Redo hoạt động
- [ ] Save/Load app definition hoạt động
- [ ] Zero Craft.js dependencies remaining
- [ ] All documentation updated
- [ ] Ready for PROMPT 1.5 (Build 5 real components)

---

**Migration Status:** 🟡 In Progress

**Next Step:** Implement EditorProvider with Zustand store

**Last Updated:** 19 tháng 11, 2025
