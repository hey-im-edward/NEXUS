/**
 * ResizeHandle Component
 * Draggable handle for resizing grid items
 */

'use client'

import { useDraggable } from '@dnd-kit/core'
import { CSS } from '@dnd-kit/utilities'

interface ResizeHandleProps {
  itemId: string
}

export function ResizeHandle({ itemId }: ResizeHandleProps) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: `resize-${itemId}`,
    data: { type: 'resize', itemId }
  })

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      onPointerDown={(e) => e.stopPropagation()}  // CRITICAL: Prevent parent drag
      className="absolute bottom-0 right-0 w-4 h-4 cursor-se-resize z-50 opacity-0 group-hover:opacity-100 transition-opacity"
      style={{
        transform: transform ? CSS.Translate.toString(transform) : undefined,
      }}
    >
      {/* Visual indicator */}
      <div className="w-full h-full flex items-end justify-end p-0.5">
        <svg 
          width="12" 
          height="12" 
          viewBox="0 0 12 12" 
          className="text-muted-foreground"
        >
          <path 
            d="M11 11L11 8M11 11L8 11M11 11L7 7M11 4L4 11" 
            stroke="currentColor" 
            strokeWidth="1.5" 
            strokeLinecap="round"
          />
        </svg>
      </div>
    </div>
  )
}
