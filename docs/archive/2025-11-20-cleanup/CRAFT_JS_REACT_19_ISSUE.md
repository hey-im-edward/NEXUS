# CRAFT.JS + REACT 19 INCOMPATIBILITY ISSUE

## Problem Identified:
- **Craft.js version:** 0.2.12 (released 2021, built for React 17/18)
- **Current React version:** 19.2.0 (released Nov 2024)
- **Status:** 🔴 INCOMPATIBLE

## Evidence:
1. ✅ Connectors created successfully (logs show)
2. ✅ `draggable="true"` attribute set
3. ❌ Drag events NOT firing
4. ❌ Both main app AND working example fail

## React 19 Breaking Changes affecting Craft.js:
- Ref callback timing changes
- Event handler attachment changes  
- Synthetic event pooling removed
- Different render behavior

## Solutions:

### Option A: Downgrade to React 18 (QUICK FIX)
```bash
cd frontend
npm install react@18.3.1 react-dom@18.3.1
npm install @types/react@18 @types/react-dom@18 --save-dev
```

**Pros:** 
- Craft.js works immediately
- Battle-tested combo

**Cons:**
- Lose React 19 features
- May break other dependencies

### Option B: Use @dnd-kit for App Builder (RECOMMENDED)
```bash
# Already installed! Just use it
```

**Pros:**
- Already in project (working for Kanban)
- React 19 compatible
- Modern, maintained library
- More flexible than Craft.js

**Cons:**
- Need to implement editor state management ourselves
- More setup code

### Option C: Wait for Craft.js update
Check: https://github.com/prevwong/craft.js/issues
**Status:** Last release 2+ years ago, may be abandoned

## Recommendation:
👉 **USE @DND-KIT** - Project already uses it successfully for KanbanBoard

## Implementation Plan with @dnd-kit:
1. Create droppable Canvas with <DndContext>
2. Create draggable Palette items with useDraggable()
3. Build component tree state with Zustand/useState
4. Render components from state
5. Add selection, properties panel, undo/redo

Similar to KanbanBoard but for visual components!
