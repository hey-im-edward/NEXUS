'use client';

import { Button } from '@/components/ui/button';
import type { Component } from '@/lib/stores/editor';
import { useEditorStore } from '@/lib/stores/editor';
import { clsx } from 'clsx';
import { AlertTriangle, CheckCircle2, ChevronDown, ChevronUp, Maximize2, Minimize2, XCircle } from 'lucide-react';
import { useState } from 'react';

interface DiagnosticResult {
  category: string;
  test: string;
  status: 'pass' | 'fail' | 'warning';
  details: string;
  fix?: string;
}

type StoreHistorySnapshot = {
  components: Record<string, Component>;
  canvasOrder: string[];
};

interface StoreSnapshot {
  components: Record<string, Component>;
  canvasOrder: string[];
  history: StoreHistorySnapshot[];
  historyIndex: number;
  selectedId: string | null;
  hoveredId: string | null;
}

const clone = <T,>(value: T): T => {
  const structured = (globalThis as any).structuredClone as
    | (<K>(input: K) => K)
    | undefined;
  if (structured) {
    return structured(value);
  }
  return JSON.parse(JSON.stringify(value));
};

const captureSnapshot = (): StoreSnapshot => {
  const state = useEditorStore.getState();
  return {
    components: clone(state.components),
    canvasOrder: [...state.canvasOrder],
    history: state.history.map((entry) => ({
      components: clone(entry.components),
      canvasOrder: [...entry.canvasOrder],
    })),
    historyIndex: state.historyIndex,
    selectedId: state.selectedId,
    hoveredId: state.hoveredId,
  };
};

const restoreSnapshot = (snapshot: StoreSnapshot) => {
  useEditorStore.setState((state) => ({
    ...state,
    components: snapshot.components,
    canvasOrder: snapshot.canvasOrder,
    history: snapshot.history,
    historyIndex: snapshot.historyIndex,
    selectedId: snapshot.selectedId,
    hoveredId: snapshot.hoveredId,
  }));
};

const escapeSelector = (value: string) => {
  if (typeof CSS !== 'undefined' && typeof CSS.escape === 'function') {
    return CSS.escape(value);
  }
  return value.replace(/([ !"#$%&'()*+,./:;<=>?@[\\\]^`{|}~])/g, '\\$1');
};

const getRootDomOrder = () => {
  const nodes = Array.from(
    document.querySelectorAll<HTMLElement>('[data-component-id]')
  );
  const { components } = useEditorStore.getState();
  return nodes
    .map((node) => node.getAttribute('data-component-id'))
    .filter((id): id is string => {
      if (!id) return false;
      return Boolean(components[id]);
    })
    .filter((id) => components[id].parent === null);
};

const detectOverlaps = (ids: string[]) => {
  const overlaps: string[] = [];
  const rects = ids
    .map((id) => {
      const el = document.querySelector<HTMLElement>(
        `[data-component-id="${escapeSelector(id)}"]`
      );
      return el ? { id, rect: el.getBoundingClientRect() } : null;
    })
    .filter((entry): entry is { id: string; rect: DOMRect } => Boolean(entry));

  for (let i = 1; i < rects.length; i += 1) {
    const current = rects[i];
    const prev = rects[i - 1];
    if (current.rect.top < prev.rect.bottom - 2) {
      overlaps.push(`${current.id} overlaps ${prev.id}`);
    }
  }
  return overlaps;
};

export function DndKitDiagnostic() {
  const [results, setResults] = useState<DiagnosticResult[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [panelSize, setPanelSize] = useState<'compact' | 'expanded'>('compact');
  const { components, addComponent } = useEditorStore();

  const waitForDom = async (label: string, delay = 400) => {
    console.log(`⏳ Waiting ${delay}ms for ${label}...`);
    await new Promise((resolve) => setTimeout(resolve, delay));
    await new Promise((resolve) => requestAnimationFrame(() => resolve(undefined)));
    console.log(`✅ DOM ready for ${label}`);
  };

  const dropZoneSelector = (parentId: string | null) =>
    parentId ? `[data-drop-zone="container-${parentId}"]` : '[data-drop-zone="canvas"]';

  const simulatePointerDrag = async (componentId: string, targetSelector: string) => {
    const handle = document.querySelector<HTMLElement>(
      `[data-component-id="${escapeSelector(componentId)}"] [title="Drag to move"]`
    );
    const target = document.querySelector<HTMLElement>(targetSelector);
    if (!handle || !target) {
      throw new Error(`Cannot find drag handle (${componentId}) hoặc drop zone (${targetSelector})`);
    }

    const startRect = handle.getBoundingClientRect();
    const endRect = target.getBoundingClientRect();
    const start = {
      x: startRect.left + startRect.width / 2,
      y: startRect.top + startRect.height / 2,
    };
    const end = {
      x: endRect.left + endRect.width / 2,
      y: endRect.top + endRect.height / 2,
    };
    const mid = {
      x: (start.x + end.x) / 2,
      y: (start.y + end.y) / 2,
    };
    const pointerId = Math.floor(Math.random() * 10000);

    const createPointerEvent = (type: string, coords: { x: number; y: number }) => {
      if (typeof PointerEvent !== 'undefined') {
        return new PointerEvent(type, {
          bubbles: true,
          pointerId,
          pointerType: 'mouse',
          clientX: coords.x,
          clientY: coords.y,
        });
      }
      const mouseType = type.replace('pointer', 'mouse');
      return new MouseEvent(mouseType, {
        bubbles: true,
        clientX: coords.x,
        clientY: coords.y,
      });
    };

    handle.dispatchEvent(createPointerEvent('pointerdown', start));
    handle.setPointerCapture?.(pointerId);
    document.dispatchEvent(createPointerEvent('pointermove', mid));
    target.dispatchEvent(createPointerEvent('pointermove', end));
    document.dispatchEvent(createPointerEvent('pointermove', end));
    handle.releasePointerCapture?.(pointerId);
    document.dispatchEvent(createPointerEvent('pointerup', end));

    await waitForDom('pointer drag settle', 500);
  };

  const ensureNestedScenario = () => {
    const store = useEditorStore.getState();
    let containerId = store.canvasOrder.find(
      (id) => store.components[id]?.type === 'Container'
    );
    if (!containerId) {
      containerId = store.addComponent('Container');
    }

    let childId = store.components[containerId]?.children[0];
    if (!childId) {
      childId = store.addComponent('TextBlock', containerId);
    }

    return { containerId, childId };
  };

  const runFullDiagnostic = async () => {
    setIsRunning(true);
    const diagnostics: DiagnosticResult[] = [];

    console.group('🔍 FULL @DND-KIT DIAGNOSTIC');
    await waitForDom('initial DOM settle', 300);

    // ===== CATEGORY 1: DND-KIT INSTALLATION =====
    console.group('1️⃣ Installation Check');
    
    try {
      const { DndContext } = await import('@dnd-kit/core');
      diagnostics.push({
        category: '1. Installation',
        test: '@dnd-kit/core imported',
        status: 'pass',
        details: 'Package installed correctly',
      });
    } catch (e) {
      diagnostics.push({
        category: '1. Installation',
        test: '@dnd-kit/core imported',
        status: 'fail',
        details: `Error: ${e}`,
        fix: 'Run: npm install @dnd-kit/core',
      });
    }

    console.groupEnd();

    // ===== CATEGORY 2: CANVAS SETUP =====
    console.group('2️⃣ Canvas Component');

    // Check if Canvas has DndContext
    const canvasElement = document.querySelector('[class*="min-h-"]');
    if (canvasElement) {
      diagnostics.push({
        category: '2. Canvas',
        test: 'Canvas element found',
        status: 'pass',
        details: `Found: ${canvasElement.className}`,
      });

      // Check if canvas is droppable
      const canvasDroppable = document.querySelector('[data-dnd-kit-droppable-id="canvas-root"]');
      if (canvasDroppable) {
        diagnostics.push({
          category: '2. Canvas',
          test: 'Canvas droppable registered',
          status: 'pass',
          details: 'data-dnd-kit-droppable-id="canvas-root" found',
        });
      } else {
        diagnostics.push({
          category: '2. Canvas',
          test: 'Canvas droppable registered',
          status: 'fail',
          details: 'Canvas not registered as droppable!',
          fix: 'Check Canvas.tsx - useDroppable({ id: "canvas-root" }) may not be working',
        });
      }
    } else {
      diagnostics.push({
        category: '2. Canvas',
        test: 'Canvas element found',
        status: 'fail',
        details: 'Canvas DOM element not found',
      });
    }

    console.groupEnd();

    // ===== CATEGORY 3: PALETTE ITEMS =====
    console.group('3️⃣ Component Palette');

    const paletteItems = document.querySelectorAll('[data-dnd-kit-draggable-id^="palette-"]');
    if (paletteItems.length > 0) {
      diagnostics.push({
        category: '3. Palette',
        test: 'Palette items draggable',
        status: 'pass',
        details: `Found ${paletteItems.length} draggable palette items`,
      });
    } else {
      console.warn('❌ Diagnostic: No palette items detected. Sample button markup:', document.querySelector('.w-full.p-3.border.rounded-lg.text-left')?.outerHTML);
      diagnostics.push({
        category: '3. Palette',
        test: 'Palette items draggable',
        status: 'fail',
        details: 'No palette items found with data-dnd-kit-draggable-id',
        fix: 'Check ComponentPalette.tsx - useDraggable hooks not initializing',
      });
    }

    console.groupEnd();

    // ===== CATEGORY 4: CREATE TEST COMPONENT =====
    console.group('4️⃣ Test Component Creation');

    const testId = addComponent('TextBlock');
    await waitForDom('test component render', 600);

    const testComponent = useEditorStore.getState().components[testId];
    if (testComponent) {
      diagnostics.push({
        category: '4. Component',
        test: 'Component created in store',
        status: 'pass',
        details: `ID: ${testId}, Type: ${testComponent.type}`,
      });

      // Select it
      useEditorStore.getState().selectComponent(testId);
      await waitForDom('selection highlight', 300);

      // Check if selected
      const selectedId = useEditorStore.getState().selectedId;
      if (selectedId === testId) {
        diagnostics.push({
          category: '4. Component',
          test: 'Component selected',
          status: 'pass',
          details: `Selected ID: ${selectedId}`,
        });
      } else {
        diagnostics.push({
          category: '4. Component',
          test: 'Component selected',
          status: 'fail',
          details: `Expected ${testId}, got ${selectedId}`,
        });
      }
    } else {
      diagnostics.push({
        category: '4. Component',
        test: 'Component created in store',
        status: 'fail',
        details: 'addComponent() did not create component',
      });
    }

    console.groupEnd();

    // ===== CATEGORY 5: RENDERED COMPONENT DOM =====
    console.group('5️⃣ RenderedComponent DOM');

    const componentWrappers = document.querySelectorAll('[class*="ring-primary"]');
    diagnostics.push({
      category: '5. DOM',
      test: 'Component wrappers rendered',
      status: componentWrappers.length > 0 ? 'pass' : 'fail',
      details: `Found ${componentWrappers.length} component wrapper(s)`,
    });

    // Check for drag handles
    const dragHandles = document.querySelectorAll('[title="Drag to move"]');
    if (dragHandles.length > 0) {
      diagnostics.push({
        category: '5. DOM',
        test: 'Drag handles rendered',
        status: 'pass',
        details: `Found ${dragHandles.length} drag handle(s)`,
      });

      // Check first drag handle
      const firstHandle = dragHandles[0] as HTMLElement;
      const hasRef = firstHandle.hasAttribute('data-dnd-kit-draggable-id');
      const computedStyle = getComputedStyle(firstHandle);
      const parentStyle = firstHandle.parentElement ? getComputedStyle(firstHandle.parentElement) : null;

      diagnostics.push({
        category: '5. DOM',
        test: 'Drag handle has @dnd-kit ID',
        status: hasRef ? 'pass' : 'fail',
        details: hasRef 
          ? `ID: ${firstHandle.getAttribute('data-dnd-kit-draggable-id')}`
          : 'setActivatorNodeRef not applied!',
        fix: hasRef ? undefined : 'Check RenderedComponent.tsx - ref={setActivatorNodeRef} missing or not working',
      });

      diagnostics.push({
        category: '5. DOM',
        test: 'Drag handle styles',
        status: 'pass',
        details: JSON.stringify({
          cursor: computedStyle.cursor,
          pointerEvents: computedStyle.pointerEvents,
          opacity: computedStyle.opacity,
          parentOpacity: parentStyle?.opacity || 'N/A',
          parentPointerEvents: parentStyle?.pointerEvents || 'N/A',
        }, null, 2),
      });
    } else {
      diagnostics.push({
        category: '5. DOM',
        test: 'Drag handles rendered',
        status: 'fail',
        details: 'No elements with title="Drag to move" found',
        fix: 'Component not selected OR drag handle div not rendering',
      });
    }

    console.groupEnd();

    // ===== CATEGORY 6: DND-KIT REGISTRATION =====
    console.group('6️⃣ @dnd-kit Registration');

    await waitForDom('draggable/droppable registration', 500);

    const allDraggables = document.querySelectorAll('[data-dnd-kit-draggable-id]');
    const allDroppables = document.querySelectorAll('[data-dnd-kit-droppable-id]');

    diagnostics.push({
      category: '6. Registration',
      test: 'Total draggable elements',
      status: allDraggables.length > 0 ? 'pass' : 'fail',
      details: `${allDraggables.length} element(s) registered as draggable`,
      fix: allDraggables.length === 0 ? 'useDraggable hooks not initializing! Check if refs are properly connected.' : undefined,
    });

    if (allDraggables.length === 0) {
      console.warn('❌ Diagnostic: No draggables found. Drag handle outerHTML:', document.querySelector('[title="Drag to move"]')?.outerHTML);
    }

    diagnostics.push({
      category: '6. Registration',
      test: 'Total droppable elements',
      status: allDroppables.length > 0 ? 'pass' : 'fail',
      details: `${allDroppables.length} element(s) registered as droppable`,
      fix: allDroppables.length === 0 ? 'useDroppable hooks not initializing! Check Canvas.tsx' : undefined,
    });

    if (allDroppables.length === 0) {
      console.warn('❌ Diagnostic: No droppables found. Canvas markup:', document.querySelector('[class*="min-h-"]')?.outerHTML);
    }

    // List all draggables
    if (allDraggables.length > 0) {
      const draggableIds: string[] = [];
      allDraggables.forEach(el => {
        const id = el.getAttribute('data-dnd-kit-draggable-id');
        if (id) draggableIds.push(id);
      });
      diagnostics.push({
        category: '6. Registration',
        test: 'Draggable IDs list',
        status: 'pass',
        details: draggableIds.join(', '),
      });
    }

    console.groupEnd();

    // ===== CATEGORY 7: REACT/NEXT.JS CONTEXT =====
    console.group('7️⃣ React/Next.js Context');

    diagnostics.push({
      category: '7. Context',
      test: 'React version',
      status: 'pass',
      details: `React ${(window as any).React?.version || 'unknown'}`,
    });

    diagnostics.push({
      category: '7. Context',
      test: 'Environment',
      status: 'pass',
      details: process.env.NODE_ENV || 'unknown',
    });

    console.groupEnd();

    // ===== CATEGORY 8: MOVEMENT REGRESSION =====
    console.group('8️⃣ Movement Regression');

    const snapshot = captureSnapshot();
    try {
      const store = useEditorStore.getState();
      const ensureTestComponents = () => {
        if (store.canvasOrder.length >= 3) {
          return store.canvasOrder.slice(0, 3);
        }
        const created = [
          store.addComponent('TextBlock'),
          store.addComponent('Button'),
          store.addComponent('Container'),
        ];
        return created;
      };

      const testIds = ensureTestComponents();
      await waitForDom('movement test render', 600);

      const slotElements = document.querySelectorAll('[data-drop-zone]');
      diagnostics.push({
        category: '8. Movement',
        test: 'Drop zone availability',
        status: slotElements.length > 0 ? 'pass' : 'fail',
        details: `Detected ${slotElements.length} slot element(s)`,
        fix:
          slotElements.length === 0
            ? 'Drop zones không render. Kiểm tra Canvas.tsx và RenderedComponent.tsx.'
            : undefined,
      });

      const initialOrder = getRootDomOrder();
      const expectedInitial = useEditorStore.getState().canvasOrder.slice();
      const orderMismatch =
        initialOrder.length !== expectedInitial.length ||
        initialOrder.some((id, index) => id !== expectedInitial[index]);

      diagnostics.push({
        category: '8. Movement',
        test: 'DOM order matches store',
        status: orderMismatch ? 'fail' : 'pass',
        details: orderMismatch
          ? `DOM order ${initialOrder.join(' -> ')} differs from store ${expectedInitial.join(' -> ')}`
          : `DOM order synchronized (${initialOrder.length} nodes)`,
        fix: orderMismatch
          ? 'SortableContext order lệch store. Kiểm tra moveComponent và container ids.'
          : undefined,
      });

      store.moveComponent(testIds[2], null, 0);
      await waitForDom('movement reorder render', 600);
      const reorderedOrder = getRootDomOrder();

      diagnostics.push({
        category: '8. Movement',
        test: 'Programmatic reorder works',
        status: reorderedOrder[0] === testIds[2] ? 'pass' : 'fail',
        details: `Expected ${testIds[2]} to be first. Actual order: ${reorderedOrder.join(
          ' -> '
        )}`,
        fix:
          reorderedOrder[0] !== testIds[2]
            ? 'moveComponent(id, null, index) is not updating canvasOrder. Inspect store logic.'
            : undefined,
      });

      const overlaps = detectOverlaps(reorderedOrder);
      diagnostics.push({
        category: '8. Movement',
        test: 'Component overlap check',
        status: overlaps.length === 0 ? 'pass' : 'fail',
        details:
          overlaps.length === 0
            ? 'All root components have non-overlapping bounding boxes'
            : overlaps.join(' | '),
        fix:
          overlaps.length > 0
            ? 'Khoảng cách giữa component bị chồng. Kiểm tra spacing và drop zone padding.'
            : undefined,
      });
    } catch (error) {
      diagnostics.push({
        category: '8. Movement',
        test: 'Movement regression harness',
        status: 'fail',
        details: `Error: ${String(error)}`,
        fix: 'Check console for stack trace during automated move validation.',
      });
    } finally {
      restoreSnapshot(snapshot);
      await waitForDom('restore canvas after regression test', 400);
      console.groupEnd();
    }

    // ===== CATEGORY 9: NESTED CONTAINERS & POINTER SIM =====
    console.group('9️⃣ Nested Containers & Pointer Simulation');
    const nestedSnapshot = captureSnapshot();
    try {
      const { containerId, childId } = ensureNestedScenario();
      await waitForDom('nested container render', 600);

      const containerDropZone = document.querySelector(dropZoneSelector(containerId));
      diagnostics.push({
        category: '9. Nested',
        test: 'Container drop zone rendered',
        status: containerDropZone ? 'pass' : 'fail',
        details: containerDropZone
          ? `Drop zone ready for ${containerId}`
          : `Không tìm thấy data-drop-zone="container-${containerId}"`,
        fix:
          containerDropZone
            ? undefined
            : 'Drop zone trong Container chưa render. Kiểm tra RenderedComponent.tsx.',
      });

      const rootSlot = dropZoneSelector(null);
      await simulatePointerDrag(childId, rootSlot);
      const parentAfterRoot = useEditorStore.getState().components[childId]?.parent;
      diagnostics.push({
        category: '9. Nested',
        test: 'Pointer drag to root slot',
        status: parentAfterRoot === null ? 'pass' : 'fail',
        details:
          parentAfterRoot === null
            ? `${childId} successfully moved to root`
            : `${childId} parent after drag: ${parentAfterRoot}`,
        fix:
          parentAfterRoot === null
            ? undefined
            : 'Pointer sensors không cập nhật store. Kiểm tra drop zone selector và pointer events.',
      });

          const containerSlot = dropZoneSelector(containerId);
          await simulatePointerDrag(childId, containerSlot);
      const parentAfterNested = useEditorStore.getState().components[childId]?.parent;
      diagnostics.push({
        category: '9. Nested',
        test: 'Pointer drag back into container',
        status: parentAfterNested === containerId ? 'pass' : 'fail',
        details:
          parentAfterNested === containerId
            ? `${childId} nested under ${containerId}`
            : `${childId} parent after drag: ${parentAfterNested}`,
        fix:
          parentAfterNested === containerId
            ? undefined
            : 'Pointer drag không đưa component vào container. Xem lại drop zone id và moveComponent.',
      });
    } catch (error) {
      diagnostics.push({
        category: '9. Nested',
        test: 'Pointer simulation harness',
        status: 'fail',
        details: `Error: ${String(error)}`,
        fix: 'Pointer events may be blocked. Ensure browser supports PointerEvent and drag handles are visible.',
      });
    } finally {
      restoreSnapshot(nestedSnapshot);
      await waitForDom('restore after pointer tests', 400);
      console.groupEnd();
    }

    console.groupEnd();

    setResults(diagnostics);
    setIsRunning(false);
  };

  const panelClasses = clsx(
    'fixed bottom-4 right-4 bg-background border-2 border-orange-500 rounded-lg shadow-xl z-50 flex flex-col backdrop-blur-sm',
    panelSize === 'expanded' ? 'w-[520px] max-h-[90vh]' : 'w-[360px] max-h-[70vh]'
  );

  return (
    <div className={panelClasses}>
      <div className="flex items-center justify-between gap-2 border-b px-4 py-2 bg-orange-50">
        <div className="flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-orange-500" />
          <div>
            <h3 className="font-semibold text-sm">@dnd-kit System Diagnostic</h3>
            <p className="text-xs text-muted-foreground">Giám sát drag & drop tự động</p>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => setPanelSize((size) => (size === 'compact' ? 'expanded' : 'compact'))}
            className="p-1 rounded hover:bg-orange-100 text-orange-700"
            title={panelSize === 'compact' ? 'Phóng to panel' : 'Thu nhỏ panel'}
          >
            {panelSize === 'compact' ? (
              <Maximize2 className="h-4 w-4" />
            ) : (
              <Minimize2 className="h-4 w-4" />
            )}
          </button>
          <button
            type="button"
            onClick={() => setIsCollapsed((prev) => !prev)}
            className="p-1 rounded hover:bg-orange-100 text-orange-700"
            title={isCollapsed ? 'Mở panel' : 'Thu gọn panel'}
          >
            {isCollapsed ? <ChevronDown className="h-4 w-4" /> : <ChevronUp className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {!isCollapsed && (
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          <Button
            onClick={runFullDiagnostic}
            disabled={isRunning}
            className="w-full"
            variant="destructive"
          >
            {isRunning ? '🔄 Đang chạy diagnostic...' : '🔍 Run Full System Check'}
          </Button>

          {results.length > 0 && (
            <div className="space-y-2">
              {results.map((result, i) => (
                <div key={i} className="border rounded p-2 text-xs">
                  <div className="flex items-start gap-2">
                    {result.status === 'pass' ? (
                      <CheckCircle2 className="h-4 w-4 text-green-600 shrink-0 mt-0.5" />
                    ) : result.status === 'warning' ? (
                      <AlertTriangle className="h-4 w-4 text-yellow-600 shrink-0 mt-0.5" />
                    ) : (
                      <XCircle className="h-4 w-4 text-red-600 shrink-0 mt-0.5" />
                    )}
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-foreground">
                        {result.category}: {result.test}
                      </div>
                      <div className={`mt-1 ${
                        result.status === 'pass' ? 'text-green-700' :
                        result.status === 'warning' ? 'text-yellow-700' :
                        'text-red-700'
                      }`}>
                        {result.details}
                      </div>
                      {result.fix && (
                        <div className="mt-2 p-2 bg-blue-50 border border-blue-200 rounded text-blue-900">
                          <strong>Fix:</strong> {result.fix}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="text-xs text-muted-foreground border-t pt-2">
            <p className="font-medium mb-1">Diagnostic checks:</p>
            <ul className="list-disc list-inside space-y-0.5">
              <li>@dnd-kit package installation</li>
              <li>Canvas DndContext & useDroppable</li>
              <li>Palette items useDraggable</li>
              <li>Component creation & selection</li>
              <li>RenderedComponent DOM structure</li>
              <li>setActivatorNodeRef connection</li>
              <li>Total registered draggables/droppables</li>
              <li>Automatic movement regression (order + overlap)</li>
              <li>Nested container drop zones & pointer drag simulation</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
