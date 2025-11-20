'use client';

import type { Component } from '@/lib/stores/editor';
import { useEditorStore } from '@/lib/stores/editor';
import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { RenderedComponent } from './RenderedComponent';

export function Canvas() {
  const components = useEditorStore((state) => state.components);
  const canvasOrder = useEditorStore((state) => state.canvasOrder);
  const { setNodeRef, isOver } = useDroppable({ id: 'canvas-surface' });
  const {
    setNodeRef: setEmptyRef,
    isOver: isOverEmpty,
  } = useDroppable({ id: 'canvas-empty', data: { parentId: null } });

  const rootComponents: Component[] = canvasOrder
    .map((componentId) => components[componentId])
    .filter((component): component is Component => Boolean(component));

  return (
    <div className="flex-1 p-4">
      <div
        ref={setNodeRef}
        data-dnd-kit-droppable-id="canvas-root"
        className={`
          min-h-[600px] p-8 bg-background rounded-lg
          border-2 border-dashed transition-colors
          ${isOver ? 'border-primary bg-primary/5' : 'border-border'}
        `}
      >
        <SortableContext
          id="canvas-root"
          items={rootComponents.map((component) => component.id)}
          strategy={verticalListSortingStrategy}
        >
          <div className="space-y-4">
            {rootComponents.map((component) => (
              <RenderedComponent key={`root-${component.id}`} componentId={component.id} />
            ))}

            <div
              ref={setEmptyRef}
              data-drop-zone="canvas"
              className={`rounded border-2 border-dashed transition-colors flex flex-col items-center justify-center text-center text-sm text-muted-foreground ${
                rootComponents.length === 0
                  ? 'h-full min-h-80'
                  : 'h-16 border-border/70'
              } ${isOverEmpty ? 'border-primary bg-primary/10 text-primary' : 'border-border'}`}
            >
              {rootComponents.length === 0 ? (
                <div className="px-6 py-8">
                  <p className="text-lg font-medium mb-2">Empty Canvas</p>
                  <p className="text-sm">Drag components từ palette vào đây</p>
                </div>
              ) : (
                <span>Thả vào đây để thêm component cuối cùng</span>
              )}
            </div>
          </div>
        </SortableContext>
      </div>
    </div>
  );
}
