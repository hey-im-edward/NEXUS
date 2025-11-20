'use client';

import { Canvas } from '@/components/app-builder/Canvas';
import { ComponentPalette } from '@/components/app-builder/ComponentPalette';
import { DndKitDiagnostic } from '@/components/app-builder/DndKitDiagnostic';
import { PropertiesPanel } from '@/components/app-builder/PropertiesPanel';
import { Toolbar } from '@/components/app-builder/Toolbar';
import type { ComponentType } from '@/lib/stores/editor';
import { useEditorStore } from '@/lib/stores/editor';
import { DndContext, DragEndEvent, DragOverlay, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import dynamic from 'next/dynamic';
import { useState } from 'react';

function AppBuilderPageInner() {
  const { components, canvasOrder, addComponent, moveComponent } = useEditorStore();
  const [activeType, setActiveType] = useState<ComponentType | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  function handleDragStart(event: any) {
    const { active } = event;
    console.log('🎬 DRAG START:', {
      activeId: active.id,
      data: active.data.current,
      isNew: active.data.current?.isNew,
      type: active.data.current?.type,
    });
    
    if (active.data.current?.isNew) {
      setActiveType(active.data.current.type);
    }
  }

  const getDropTarget = (event: DragEndEvent) => {
    const { over } = event;
    if (!over) return null;

    if (typeof over.id === 'string' && over.id === 'canvas-empty') {
      return { parentId: null, index: canvasOrder.length };
    }

    if (typeof over.id === 'string' && over.id.endsWith('-empty')) {
      const parentId = over.id.replace('-empty', '');
      const parent = components[parentId];
      return { parentId, index: parent?.children.length ?? 0 };
    }

    const sortableData = over.data.current?.sortable as
      | { containerId: string; index: number }
      | undefined;

    if (sortableData) {
      const containerId = sortableData.containerId === 'canvas-root' ? null : sortableData.containerId;
      const targetList = containerId
        ? components[containerId]?.children ?? []
        : canvasOrder;
      const overId = over.id as string;
      const currentIndex = targetList.indexOf(overId);
      const index = currentIndex >= 0 ? currentIndex : targetList.length;
      return { parentId: containerId, index };
    }

    return null;
  };

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    console.log('🏁 DRAG END:', {
      activeId: active.id,
      overId: over?.id,
      data: active.data.current,
    });
    
    setActiveType(null);

    if (!over) {
      console.warn('⚠️ No drop target');
      return;
    }

    const dropTarget = getDropTarget(event);

    // Creating new component from palette
    if (active.data.current?.isNew) {
      const type = active.data.current.type as ComponentType;
      console.log('✨ Creating new component:', type);
      if (dropTarget) {
        console.log('📍 Drop target:', dropTarget);
        addComponent(type, dropTarget.parentId, dropTarget.index);
        return;
      }
      console.warn('⚠️ Không xác định được vùng thả');
      return;
    } else {
      // Moving existing component
      const componentId = active.id as string;
      console.log('🔄 Moving existing component:', componentId);
      if (!dropTarget) {
        console.warn('⚠️ Không xác định được điểm đến của component');
        return;
      }

      moveComponent(componentId, dropTarget.parentId, dropTarget.index);
    }
  }

  return (
    <DndContext sensors={sensors} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      <div className="h-screen flex flex-col" suppressHydrationWarning>
        <Toolbar />
        
        <div className="flex-1 flex overflow-hidden">
          <ComponentPalette />
          <Canvas />
          <PropertiesPanel />
        </div>
        
        {/* Debug tool - remove in production */}
        <DndKitDiagnostic />
      </div>

      <DragOverlay>
        {activeType ? (
          <div className="px-4 py-2 bg-primary text-primary-foreground rounded-lg shadow-lg">
            {activeType}
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}

export default dynamic(() => Promise.resolve(AppBuilderPageInner), {
  ssr: false,
});
