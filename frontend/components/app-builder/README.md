# 🎨 App Builder - Visual App Constructor

Built with **@dnd-kit** (React 19 compatible)

## 📁 Architecture

```
components/app-builder/
├── Canvas.tsx              # Main drop zone (DndContext + useDroppable)
├── ComponentPalette.tsx    # Draggable component library (useDraggable)
├── RenderedComponent.tsx   # Component wrapper (useDraggable + useDroppable for Container)
├── PropertiesPanel.tsx     # Props editor (reads from Zustand)
├── Toolbar.tsx             # Undo/Redo/Save/Preview
└── components/
    └── PlaceholderComponent.tsx  # Component renderers (TextBlock, Button, Container)

lib/stores/
└── editor.ts               # Zustand state management
```

## 🎯 Features

### ✅ Implemented

- **Drag-and-drop:** Component palette → Canvas
- **Component tree:** Parent-child relationships (Container can nest components)
- **Selection:** Click to select, shows controls
- **Move:** Drag existing components to new positions
- **Delete:** Remove component and all children
- **Properties:** Edit component props in real-time
- **Undo/Redo:** Full history management with Zustand
- **Visual feedback:** Hover states, drop indicators, drag overlays

### 📦 Available Components

1. **TextBlock**
   - Props: `content`, `fontSize`, `color`
   - Renders text with styling

2. **Button**
   - Props: `text`, `variant` (default | destructive)
   - Interactive button component

3. **Container**
   - Props: `padding`, `flexDirection` (row | column), `backgroundColor`
   - Can nest other components (droppable)

## 🔧 State Management

**Zustand Store (`useEditorStore`):**

```typescript
{
  components: {
    [id]: {
      id: string;
      type: 'TextBlock' | 'Button' | 'Container';
      props: Record<string, any>;
      children: string[];
      parent: string | null;
    }
  },
  selectedId: string | null,
  history: Record<string, Component>[],
  historyIndex: number,
  
  // Actions
  addComponent(type, parentId?)
  updateComponent(id, updates)
  deleteComponent(id)
  moveComponent(id, newParentId)
  selectComponent(id)
  undo()
  redo()
}
```

## 🎮 Usage

```bash
# Navigate to App Builder
http://localhost:3000/app-builder
```

### Workflow:

1. **Add component:** Drag from palette to canvas
2. **Select:** Click on component (shows controls)
3. **Edit props:** Use properties panel on right
4. **Move:** Drag component handle to reposition
5. **Nest:** Drop on Container to create hierarchy
6. **Delete:** Click trash icon on selected component
7. **Undo/Redo:** Use toolbar buttons

## 🔄 Migration from Craft.js

**Why @dnd-kit instead of Craft.js?**

- ✅ React 19 compatible (Craft.js incompatible)
- ✅ Actively maintained (Craft.js last update 2+ years ago)
- ✅ Already used in KanbanBoard (consistent pattern)
- ✅ Full control over component tree

**Trade-offs:**
- ⚠️ More code (~300 lines vs Craft.js hooks)
- ⚠️ Manual tree management (no built-in Frame/Element)

See: `docs/02-EXECUTION/CRAFT_JS_TO_DND_KIT_MIGRATION.md`

## 🧪 Testing

**Manual Test Steps:**

1. **Palette → Canvas (Create):**
   ```
   - Drag "Text Block" to canvas
   - Should create component with default props
   - Component should be auto-selected
   ```

2. **Canvas → Canvas (Move):**
   ```
   - Drag component handle to new position
   - Component should move
   - Can undo/redo
   ```

3. **Nesting (Container):**
   ```
   - Drag "Container" to canvas
   - Drag "Text Block" onto Container
   - TextBlock should become child
   - Should render indented with left border
   ```

4. **Properties Panel:**
   ```
   - Select TextBlock
   - Change "Content" text
   - Component should update immediately
   ```

5. **Delete:**
   ```
   - Select component
   - Click trash icon
   - Component removed (children also removed)
   - Can undo
   ```

6. **Undo/Redo:**
   ```
   - Add 3 components
   - Undo 2 times
   - Redo 1 time
   - History should work correctly
   ```

## 🚀 Next Steps (Future)

- [ ] Save/Load app definitions to database
- [ ] Preview mode (render without editor controls)
- [ ] More components (Image, Form, Grid, etc.)
- [ ] Component library (save/reuse custom components)
- [ ] Responsive breakpoints
- [ ] Custom CSS classes
- [ ] Event handlers (onClick, onChange, etc.)
- [ ] Data binding
- [ ] Publishing to production

## 📝 Code Examples

### Adding a New Component Type

**Step 1:** Update `ComponentType` in `editor.ts`:
```typescript
export type ComponentType = 'TextBlock' | 'Button' | 'Container' | 'Image';
```

**Step 2:** Add to palette (`ComponentPalette.tsx`):
```typescript
const COMPONENTS = [
  // ... existing
  { type: 'Image', name: 'Image', icon: ImageIcon, description: 'Display image' },
];
```

**Step 3:** Add renderer (`PlaceholderComponent.tsx`):
```typescript
case 'Image':
  return <img src={props.src || '/placeholder.png'} alt={props.alt} />;
```

**Step 4:** Add properties editor (`PropertiesPanel.tsx`):
```typescript
{type === 'Image' && (
  <Input
    label="Image URL"
    value={props.src}
    onChange={(e) => handlePropChange('src', e.target.value)}
  />
)}
```

## 🐛 Known Issues

- ⚠️ Inline styles in PlaceholderComponent (ESLint warning - acceptable for dynamic props)
- ⚠️ Save/Preview not yet implemented (placeholders)

## 📚 References

- [@dnd-kit docs](https://docs.dndkit.com/)
- [Zustand docs](https://docs.pmnd.rs/zustand/)
- [KanbanBoard.tsx](../kanban/KanbanBoard.tsx) - reference @dnd-kit implementation
