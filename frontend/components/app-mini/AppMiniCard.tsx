'use client'

import { Button } from '@/components/ui/button'
import { GripVertical, X } from 'lucide-react'
import { ReactNode } from 'react'

interface AppMiniCardProps {
  /**
   * Unique identifier for the card (matches layout item 'i' property)
   */
  id: string

  /**
   * Title/name of the app mini
   */
  title: string

  /**
   * Content to display inside the card
   */
  children?: ReactNode

  /**
   * Callback when the close button is clicked
   */
  onRemove?: (id: string) => void

  /**
   * Whether the card is being dragged
   */
  isDragging?: boolean

  /**
   * Additional CSS classes
   */
  className?: string
}

export function AppMiniCard({
  id,
  title,
  children,
  onRemove,
  isDragging = false,
  className = '',
}: AppMiniCardProps) {
  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (onRemove) {
      onRemove(id)
    }
  }

  return (
    <div
      className={`
        relative h-full w-full
        bg-white dark:bg-gray-800
        border-2 border-gray-200 dark:border-gray-700
        rounded-lg
        shadow-md hover:shadow-lg
        transition-all duration-200
        ${isDragging ? 'opacity-50 cursor-grabbing' : 'cursor-grab'}
        ${className}
      `}
      data-card-id={id}
    >
      {/* Header with drag handle and close button */}
      <div className="flex items-center justify-between px-3 py-2 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 rounded-t-lg">
        {/* Drag Handle */}
        <div className="flex items-center gap-2 flex-1 min-w-0">
          <div
            className="cursor-grab active:cursor-grabbing hover:bg-gray-200 dark:hover:bg-gray-700 rounded p-1 transition-colors"
            data-drag-handle
          >
            <GripVertical className="h-4 w-4 text-gray-500 dark:text-gray-400" />
          </div>

          {/* Title */}
          <h3 className="text-sm font-semibold text-gray-900 dark:text-white truncate">
            {title}
          </h3>
        </div>

        {/* Close Button */}
        <Button
          variant="ghost"
          size="icon"
          className="h-6 w-6 hover:bg-red-100 dark:hover:bg-red-900/20 hover:text-red-600 dark:hover:text-red-400"
          onClick={handleRemove}
          aria-label={`Remove ${title}`}
        >
          <X className="h-4 w-4" />
        </Button>
      </div>

      {/* Content Area */}
      <div className="p-4 h-[calc(100%-42px)] overflow-auto">
        {children || (
          <div className="flex items-center justify-center h-full text-gray-400 dark:text-gray-500 text-sm">
            {title} content will appear here
          </div>
        )}
      </div>
    </div>
  )
}
