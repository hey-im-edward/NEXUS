'use client';

import type { ComponentType } from '@/lib/stores/editor';
import { useDraggable } from '@dnd-kit/core';
import { Box, MousePointer, Type } from 'lucide-react';

interface PaletteItem {
  type: ComponentType;
  name: string;
  icon: typeof Type;
  description: string;
}

const COMPONENTS: PaletteItem[] = [
  {
    type: 'TextBlock',
    name: 'Text Block',
    icon: Type,
    description: 'Add text content',
  },
  {
    type: 'Button',
    name: 'Button',
    icon: MousePointer,
    description: 'Interactive button',
  },
  {
    type: 'Container',
    name: 'Container',
    icon: Box,
    description: 'Layout container',
  },
];

function DraggableItem({ type, name, icon: Icon, description }: PaletteItem) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: `palette-${type}`,
    data: { type, isNew: true },
  });

  return (
    <button
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      data-dnd-kit-draggable-id={`palette-${type}`}
      className={`
        w-full p-3 border rounded-lg text-left
        transition-all cursor-move
        hover:bg-accent hover:border-primary
        active:scale-95
        ${isDragging ? 'opacity-50' : ''}
      `}
    >
      <div className="flex items-start gap-3">
        <Icon className="h-5 w-5 mt-0.5 text-primary" />
        <div className="flex-1">
          <div className="font-medium text-sm">{name}</div>
          <div className="text-xs text-muted-foreground">{description}</div>
        </div>
      </div>
    </button>
  );
}

export function ComponentPalette() {
  return (
    <div className="w-64 border-r p-4 bg-background">
      <div className="mb-4">
        <h2 className="font-semibold text-lg mb-1">Components</h2>
        <p className="text-xs text-muted-foreground">
          Drag components onto the canvas
        </p>
      </div>

      <div className="space-y-2">
        {COMPONENTS.map((comp) => (
          <DraggableItem key={comp.type} {...comp} />
        ))}
      </div>

      <div className="mt-6 p-3 bg-muted/50 rounded-lg text-xs text-muted-foreground">
        <p className="font-medium mb-1">💡 Tip</p>
        <p>
          Drop on <span className="font-medium text-foreground">Container</span> to nest components
        </p>
      </div>
    </div>
  );
}
