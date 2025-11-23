/**
 * GridItem Component
 * Wrapper for draggable grid items with dnd-kit
 */

'use client'

import { GridItem as GridItemType } from '@/lib/grid/types'
import { useDraggable } from '@dnd-kit/core'
import { CSS } from '@dnd-kit/utilities'
import { ResizeHandle } from './ResizeHandle'

interface GridItemProps {
  item: GridItemType
  children: React.ReactNode
  colWidth: number
  rowHeight: number
  gap: number
  isDragging?: boolean
}

export function GridItem({ 
  item, 
  children, 
  colWidth, 
  rowHeight, 
  gap,
  isDragging 
}: GridItemProps) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: item.id,
    data: { type: 'move', item }
  })

  // Convert grid units to pixels
  const left = item.x * (colWidth + gap)
  const top = item.y * (rowHeight + gap)
  const width = item.w * colWidth + (item.w - 1) * gap
  const height = item.h * rowHeight + (item.h - 1) * gap

  const style: React.CSSProperties = {
    position: 'absolute',
    left,
    top,
    width,
    height,
    transform: transform ? CSS.Translate.toString(transform) : undefined,
    transition: isDragging 
      ? 'none' 
      : 'all 0.2s cubic-bezier(0.25, 0.8, 0.25, 1)',  // Smooth push animation
    zIndex: isDragging ? 100 : 1,
    opacity: isDragging ? 0.95 : 1,
    touchAction: 'none',
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`group ${isDragging ? 'shadow-2xl' : ''}`}
      {...attributes}
      // Don't apply drag listeners during resize to prevent conflicts
      {...listeners}
    >
      {children}
      <ResizeHandle itemId={item.id} />
    </div>
  )
}
