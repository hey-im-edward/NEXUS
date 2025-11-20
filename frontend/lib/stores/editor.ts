import { create } from 'zustand';

export type ComponentType = 'TextBlock' | 'Button' | 'Container';

export interface Component {
  id: string;
  type: ComponentType;
  props: Record<string, any>;
  children: string[];
  parent: string | null;
}

interface EditorSnapshot {
  components: Record<string, Component>;
  canvasOrder: string[];
}

interface EditorState {
  // Component tree
  components: Record<string, Component>;
  canvasOrder: string[];
  
  // UI state
  selectedId: string | null;
  hoveredId: string | null;
  
  // History for undo/redo
  history: EditorSnapshot[];
  historyIndex: number;
  
  // Actions
  addComponent: (type: ComponentType, parentId?: string | null, insertIndex?: number) => string;
  updateComponent: (id: string, updates: Partial<Omit<Component, 'id'>>) => void;
  deleteComponent: (id: string) => void;
  moveComponent: (id: string, newParentId: string | null, insertIndex?: number) => void;
  selectComponent: (id: string | null) => void;
  setHoveredId: (id: string | null) => void;
  undo: () => void;
  redo: () => void;
  clear: () => void;
  canUndo: () => boolean;
  canRedo: () => boolean;
}

const initialState = {
  components: {},
  canvasOrder: [],
  selectedId: null,
  hoveredId: null,
  history: [{ components: {}, canvasOrder: [] }],
  historyIndex: 0,
};

export const useEditorStore = create<EditorState>((set, get) => ({
  ...initialState,

  addComponent: (type, parentId, insertIndex) => {
    const id = `${type.toLowerCase()}-${Date.now()}`;
    const newComponent: Component = {
      id,
      type,
      props: getDefaultProps(type),
      children: [],
      parent: parentId || null,
    };

    set((state) => {
      const newComponents = {
        ...state.components,
        [id]: newComponent,
      };

      let newCanvasOrder = state.canvasOrder;

      if (parentId) {
        const parent = state.components[parentId];
        if (parent) {
          const childrenIndex =
            typeof insertIndex === 'number'
              ? insertIndex
              : parent.children.length;
          newComponents[parentId] = {
            ...parent,
            children: insertAt(parent.children, childrenIndex, id),
          };
        }
      } else {
        const targetIndex =
          typeof insertIndex === 'number'
            ? insertIndex
            : state.canvasOrder.length;
        newCanvasOrder = insertAt(state.canvasOrder, targetIndex, id);
      }

      const snapshot = { components: newComponents, canvasOrder: newCanvasOrder };
      const newHistory = state.history.slice(0, state.historyIndex + 1);
      newHistory.push(snapshot);

      return {
        components: newComponents,
        canvasOrder: newCanvasOrder,
        history: newHistory,
        historyIndex: newHistory.length - 1,
        selectedId: id,
      };
    });

    return id;
  },

  updateComponent: (id, updates) => {
    set((state) => {
      if (!state.components[id]) return state;

      const newComponents = {
        ...state.components,
        [id]: {
          ...state.components[id],
          ...updates,
        },
      };

      const snapshot = { components: newComponents, canvasOrder: state.canvasOrder };
      const newHistory = state.history.slice(0, state.historyIndex + 1);
      newHistory.push(snapshot);

      return {
        components: newComponents,
        history: newHistory,
        historyIndex: newHistory.length - 1,
      };
    });
  },

  deleteComponent: (id) => {
    set((state) => {
      const component = state.components[id];
      if (!component) return state;

      const newComponents = { ...state.components };
      let newCanvasOrder = removeFromList(state.canvasOrder, id);

      const deleteRecursive = (componentId: string) => {
        const comp = newComponents[componentId];
        if (!comp) return;

        comp.children.forEach(deleteRecursive);
        delete newComponents[componentId];
        newCanvasOrder = removeFromList(newCanvasOrder, componentId);
      };

      deleteRecursive(id);

      if (component.parent && newComponents[component.parent]) {
        newComponents[component.parent] = {
          ...newComponents[component.parent],
          children: newComponents[component.parent].children.filter(
            (childId) => childId !== id
          ),
        };
      }

      const snapshot = { components: newComponents, canvasOrder: newCanvasOrder };
      const newHistory = state.history.slice(0, state.historyIndex + 1);
      newHistory.push(snapshot);

      return {
        components: newComponents,
        canvasOrder: newCanvasOrder,
        history: newHistory,
        historyIndex: newHistory.length - 1,
        selectedId: state.selectedId === id ? null : state.selectedId,
      };
    });
  },

  moveComponent: (id, newParentId, insertIndex) => {
    set((state) => {
      const component = state.components[id];
      if (!component) return state;
      if (newParentId === id) return state;

      if (newParentId && isAncestor(state.components, id, newParentId)) {
        return state;
      }

      const newComponents = { ...state.components };
      let newCanvasOrder = state.canvasOrder;

      // Remove from current parent or root
      if (component.parent) {
        const parent = newComponents[component.parent];
        if (parent) {
          newComponents[component.parent] = {
            ...parent,
            children: parent.children.filter((childId) => childId !== id),
          };
        }
      } else {
        newCanvasOrder = removeFromList(newCanvasOrder, id);
      }

      // Insert under new parent or root
      if (newParentId) {
        const parent = newComponents[newParentId];
        if (parent) {
          const childrenIndex =
            typeof insertIndex === 'number' ? insertIndex : parent.children.length;
          newComponents[newParentId] = {
            ...parent,
            children: insertAt(parent.children, childrenIndex, id),
          };
        }
      } else {
        const targetIndex =
          typeof insertIndex === 'number' ? insertIndex : newCanvasOrder.length;
        newCanvasOrder = insertAt(newCanvasOrder, targetIndex, id);
      }

      newComponents[id] = {
        ...component,
        parent: newParentId,
      };

      const snapshot = { components: newComponents, canvasOrder: newCanvasOrder };
      const newHistory = state.history.slice(0, state.historyIndex + 1);
      newHistory.push(snapshot);

      return {
        components: newComponents,
        canvasOrder: newCanvasOrder,
        history: newHistory,
        historyIndex: newHistory.length - 1,
      };
    });
  },

  selectComponent: (id) => {
    set({ selectedId: id });
  },

  setHoveredId: (id) => {
    set({ hoveredId: id });
  },

  undo: () => {
    set((state) => {
      if (state.historyIndex <= 0) return state;

      const snapshot = state.history[state.historyIndex - 1];
      return {
        components: snapshot.components,
        canvasOrder: snapshot.canvasOrder,
        historyIndex: state.historyIndex - 1,
        selectedId: null,
      };
    });
  },

  redo: () => {
    set((state) => {
      if (state.historyIndex >= state.history.length - 1) return state;

      const snapshot = state.history[state.historyIndex + 1];
      return {
        components: snapshot.components,
        canvasOrder: snapshot.canvasOrder,
        historyIndex: state.historyIndex + 1,
        selectedId: null,
      };
    });
  },

  clear: () => {
    set({
      ...initialState,
    });
  },

  canUndo: () => get().historyIndex > 0,
  canRedo: () => get().historyIndex < get().history.length - 1,
}));

function insertAt(list: string[], index: number, value: string) {
  const safeIndex = Math.max(0, Math.min(index, list.length));
  const result = [...list];
  result.splice(safeIndex, 0, value);
  return result;
}

function removeFromList(list: string[], value: string) {
  return list.filter((item) => item !== value);
}

function isAncestor(
  components: Record<string, Component>,
  potentialAncestorId: string | null,
  childId: string
) {
  if (!potentialAncestorId) return false;
  let cursor: Component | undefined = components[childId];
  while (cursor) {
    if (cursor.parent === potentialAncestorId) return true;
    cursor = cursor.parent ? components[cursor.parent] : undefined;
  }
  return false;
}

// Helper function to get default props for each component type
function getDefaultProps(type: ComponentType): Record<string, any> {
  switch (type) {
    case 'TextBlock':
      return {
        content: 'Enter text here...',
        fontSize: '16px',
        color: '#000000',
      };
    case 'Button':
      return {
        text: 'Click me',
        variant: 'default',
        onClick: '',
      };
    case 'Container':
      return {
        padding: '16px',
        backgroundColor: 'transparent',
        flexDirection: 'column',
      };
    default:
      return {};
  }
}
