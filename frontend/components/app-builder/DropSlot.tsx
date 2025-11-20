'use client';

import { useDroppable } from '@dnd-kit/core';
import { clsx } from 'clsx';

interface DropSlotProps {
  parentId: string | null;
  index: number;
}

export function DropSlot({ parentId, index }: DropSlotProps) {
  const slotId = `slot-${parentId ?? 'canvas'}-${index}`;
  const { setNodeRef, isOver } = useDroppable({ id: slotId });

  const slotScope = parentId ? 'child' : 'root';

  return (
    <div
      ref={setNodeRef}
      data-drop-slot={slotScope}
      data-drop-slot-id={slotId}
      className={clsx(
        'relative w-full h-4 rounded transition-colors duration-150',
        isOver
          ? 'bg-primary/20 border border-primary'
          : 'border border-dashed border-border/40 bg-transparent'
      )}
    >
      <div className="absolute inset-x-4 top-1/2 h-px bg-border" />
    </div>
  );
}
