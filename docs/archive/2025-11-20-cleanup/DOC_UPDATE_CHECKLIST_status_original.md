# 📋 DOCUMENTATION UPDATE CHECKLIST

**Migration:** Craft.js → @dnd-kit

**Date:** 19 tháng 11, 2025

**Status:** 🟡 In Progress

---

## ✅ COMPLETED

- [X] Uninstall Craft.js dependencies (`@craftjs/core`, `@craftjs/layers`)
- [X] Delete all Craft.js implementation files
  - [X] `frontend/components/app-builder/*`
  - [X] `frontend/app/app-builder/*`
  - [X] `frontend/app/test-craft/*`
- [X] Create migration documentation (`CRAFT_JS_TO_DND_KIT_MIGRATION.md`)
- [X] Create root-level warning (`CRAFT_JS_REACT_19_ISSUE.md`)

---

## 🔄 TO UPDATE

### 1. AI_PROMPTS.md
**File:** `docs/02-EXECUTION/AI_PROMPTS.md`

**Changes needed:**
- [ ] Update PROMPT 1.4 title: "Setup Craft.js Framework" → "Setup App Builder with @dnd-kit"
- [ ] Add migration note at beginning of PROMPT 1.4
- [ ] Replace all Craft.js code examples với @dnd-kit equivalents
- [ ] Update deliverables list
- [ ] Update success criteria
- [ ] Update tech stack section

**Migration Note to Add:**
```markdown
**⚠️ TECHNOLOGY CHANGE (19/11/2025):**

PROMPT ban đầu yêu cầu Craft.js, nhưng phát hiện **Craft.js v0.2.12 không tương thích với React 19.2.0**.

**Quyết định:** Sử dụng **@dnd-kit** thay thế (đang dùng thành công cho KanbanBoard).

**Trade-offs:**
- ✅ React 19 compatible, actively maintained
- ✅ Consistent pattern với Kanban
- ⚠️ Nhiều code hơn (~300 lines), tự implement tree management

Chi tiết: `docs/02-EXECUTION/CRAFT_JS_TO_DND_KIT_MIGRATION.md`
```

---

### 2. ROADMAP.md
**File:** `docs/02-EXECUTION/ROADMAP.md`

**Changes needed:**
- [ ] Week 2 section: Update PROMPT 1.4 description
- [ ] Update tech stack mentions
- [ ] Update timeline (có thể +2 hours do more implementation)

---

### 3. THIS_WEEK.md
**File:** `docs/02-EXECUTION/status/THIS_WEEK.md`

**Changes needed:**
- [ ] PROMPT 1.4 status: "🟢 Hoàn thành" → "🟡 In Progress - Migrating to @dnd-kit"
- [ ] Add migration notes
- [ ] Update deliverables list
- [ ] Update files created section

---

### 4. TECH_STACK.md
**File:** `docs/03-REFERENCE/TECH_STACK.md`

**Changes needed:**
- [ ] Remove Craft.js section entirely
- [ ] Add note about attempted Craft.js usage
- [ ] Emphasize @dnd-kit as primary drag-drop library
- [ ] Update "App Builder Framework" section

**Before:**
```markdown
### Craft.js (App Builder Framework)
**Why Craft.js:** Purpose-built for page builders...
```

**After:**
```markdown
### @dnd-kit (Drag-Drop Library)
**Primary use:** KanbanBoard + App Builder

**Why @dnd-kit:**
- React 19 compatible
- Modern, actively maintained
- Flexible, full control
- Already proven in project (KanbanBoard)

**Note:** Initially evaluated Craft.js for App Builder, but incompatible with React 19. See migration doc.
```

---

### 5. PRIMING_PROMPT.md
**File:** `docs/02-EXECUTION/PRIMING_PROMPT.md`

**Changes needed:**
- [ ] Technology section: Remove Craft.js mention
- [ ] Add @dnd-kit as primary drag-drop solution
- [ ] Update "Key Technologies" list

---

### 6. package.json
**File:** `frontend/package.json`

**Status:** ✅ Already updated (Craft.js removed)

**Verify:**
- [ ] `@craftjs/core` NOT in dependencies
- [ ] `@craftjs/layers` NOT in dependencies
- [ ] `@dnd-kit/core` PRESENT (already installed)
- [ ] `@dnd-kit/sortable` PRESENT (already installed)

---

## 🎯 NEW IMPLEMENTATION TASKS

### Phase 1: State Management (EditorStore)
**File to create:** `frontend/lib/stores/editor.ts`

```typescript
import { create } from 'zustand';

interface Component {
  id: string;
  type: 'TextBlock' | 'Button' | 'Container';
  props: Record<string, any>;
  children: string[];
  parent: string | null;
}

interface EditorState {
  components: Record<string, Component>;
  selectedId: string | null;
  history: Record<string, Component>[];
  historyIndex: number;
  
  // Actions
  addComponent: (type: string, parentId?: string) => void;
  updateComponent: (id: string, props: Record<string, any>) => void;
  deleteComponent: (id: string) => void;
  selectComponent: (id: string | null) => void;
  undo: () => void;
  redo: () => void;
}

export const useEditorStore = create<EditorState>((set, get) => ({
  components: {},
  selectedId: null,
  history: [{}],
  historyIndex: 0,
  
  addComponent: (type, parentId) => {
    const id = `${type}-${Date.now()}`;
    const newComponent: Component = {
      id,
      type: type as any,
      props: {},
      children: [],
      parent: parentId || null,
    };
    
    set((state) => {
      const newComponents = {
        ...state.components,
        [id]: newComponent,
      };
      
      // Add to parent's children
      if (parentId && state.components[parentId]) {
        newComponents[parentId] = {
          ...state.components[parentId],
          children: [...state.components[parentId].children, id],
        };
      }
      
      return {
        components: newComponents,
        history: [...state.history.slice(0, state.historyIndex + 1), newComponents],
        historyIndex: state.historyIndex + 1,
      };
    });
  },
  
  // ... other actions
}));
```

---

### Phase 2: Canvas with DndContext
**File to create:** `frontend/components/app-builder/Canvas.tsx`

```typescript
import { DndContext, DragEndEvent, useDroppable } from '@dnd-kit/core';
import { useEditorStore } from '@/lib/stores/editor';
import { RenderedComponent } from './RenderedComponent';

export function Canvas() {
  const { components, addComponent } = useEditorStore();
  const { setNodeRef } = useDroppable({ id: 'canvas' });
  
  const rootComponents = Object.values(components).filter(c => !c.parent);
  
  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    
    if (over?.id === 'canvas' && active.data.current?.isNew) {
      addComponent(active.data.current.type);
    }
  }
  
  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div
        ref={setNodeRef}
        className="w-full min-h-[500px] p-4 bg-background border-2 border-dashed border-border rounded-lg"
      >
        {rootComponents.length === 0 ? (
          <div className="text-center text-muted-foreground py-12">
            <p>Drop components here</p>
          </div>
        ) : (
          rootComponents.map((comp) => (
            <RenderedComponent key={comp.id} {...comp} />
          ))
        )}
      </div>
    </DndContext>
  );
}
```

---

### Phase 3: Component Palette
**File to create:** `frontend/components/app-builder/ComponentPalette.tsx`

```typescript
import { useDraggable } from '@dnd-kit/core';
import { Type, MousePointer, Box } from 'lucide-react';

const COMPONENTS = [
  { type: 'TextBlock', name: 'Text Block', icon: Type },
  { type: 'Button', name: 'Button', icon: MousePointer },
  { type: 'Container', name: 'Container', icon: Box },
];

function DraggableItem({ type, name, icon: Icon }: any) {
  const { attributes, listeners, setNodeRef } = useDraggable({
    id: `palette-${type}`,
    data: { type, isNew: true },
  });
  
  return (
    <button
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className="w-full p-3 border rounded-lg hover:bg-accent cursor-move"
    >
      <div className="flex items-center gap-3">
        <Icon className="h-4 w-4" />
        <span>{name}</span>
      </div>
    </button>
  );
}

export function ComponentPalette() {
  return (
    <div className="w-64 border-r p-4">
      <h2 className="font-semibold mb-4">Components</h2>
      <div className="space-y-2">
        {COMPONENTS.map((comp) => (
          <DraggableItem key={comp.type} {...comp} />
        ))}
      </div>
    </div>
  );
}
```

---

### Phase 4: Rendered Component (Draggable + Selectable)
**File to create:** `frontend/components/app-builder/RenderedComponent.tsx`

```typescript
import { useDraggable } from '@dnd-kit/core';
import { useEditorStore } from '@/lib/stores/editor';
import { PlaceholderComponent } from './components/PlaceholderComponent';

interface Props {
  id: string;
  type: string;
  props: Record<string, any>;
  children: string[];
}

export function RenderedComponent({ id, type, props, children }: Props) {
  const { selectedId, selectComponent } = useEditorStore();
  const { attributes, listeners, setNodeRef } = useDraggable({
    id,
    data: { type, isNew: false },
  });
  
  const isSelected = selectedId === id;
  
  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      onClick={(e) => {
        e.stopPropagation();
        selectComponent(id);
      }}
      className={`
        relative cursor-move
        ${isSelected ? 'ring-2 ring-primary' : ''}
      `}
    >
      {/* For now, render PlaceholderComponent */}
      <PlaceholderComponent {...props} />
    </div>
  );
}
```

---

### Phase 5: Properties Panel & Toolbar
**Files to create:**
- `frontend/components/app-builder/PropertiesPanel.tsx` (read from store)
- `frontend/components/app-builder/Toolbar.tsx` (undo/redo from store)

---

## 📊 PROGRESS TRACKING

| Task                      | Status        | Time Est. | Actual |
| ------------------------- | ------------- | --------- | ------ |
| Remove Craft.js deps      | ✅ Done        | 5 min     | 5 min  |
| Delete old files          | ✅ Done        | 5 min     | 5 min  |
| Create migration docs     | ✅ Done        | 30 min    | 30 min |
| Update AI_PROMPTS.md      | 🔄 To Do       | 30 min    | -      |
| Update ROADMAP.md         | 🔄 To Do       | 15 min    | -      |
| Update THIS_WEEK.md       | 🔄 To Do       | 15 min    | -      |
| Update TECH_STACK.md      | 🔄 To Do       | 20 min    | -      |
| Update PRIMING_PROMPT.md  | 🔄 To Do       | 10 min    | -      |
| Implement EditorStore     | 🔄 To Do       | 2 hours   | -      |
| Implement Canvas          | 🔄 To Do       | 1 hour    | -      |
| Implement Palette         | 🔄 To Do       | 1 hour    | -      |
| Implement RenderedComp    | 🔄 To Do       | 1 hour    | -      |
| Implement Panels          | 🔄 To Do       | 1 hour    | -      |
| Testing                   | 🔄 To Do       | 1 hour    | -      |

**Total Estimated:** ~9 hours

**Completed:** 40 minutes

**Remaining:** ~8 hours 20 minutes

---

## ✅ FINAL VERIFICATION

Before marking PROMPT 1.4 complete:

- [ ] All documentation updated
- [ ] No Craft.js references remaining (except in archive/migration docs)
- [ ] @dnd-kit App Builder working:
  - [ ] Drag from palette → creates component
  - [ ] Drag on canvas → moves component
  - [ ] Click → selects component
  - [ ] Props panel updates component
  - [ ] Undo/redo works
  - [ ] Save/load works
- [ ] Zero TypeScript errors
- [ ] Zero ESLint errors
- [ ] README.md updated in app-builder folder

---

**Last Updated:** 19 tháng 11, 2025

**Next Action:** Start implementing EditorStore (Zustand)
