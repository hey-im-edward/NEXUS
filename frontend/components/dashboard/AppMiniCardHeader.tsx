'use client'

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { GripVertical, X } from 'lucide-react'
import { useState } from 'react'

interface AppMiniCardHeaderProps {
  /**
   * Title of the app
   */
  title: string

  /**
   * Optional icon to display next to title
   */
  icon?: React.ReactNode

  /**
   * Callback when close button is clicked (confirmed)
   */
  onRemove: () => void

  /**
   * Whether to show drag handle (hide on mobile)
   */
  showDragHandle?: boolean
}

export function AppMiniCardHeader({
  title,
  icon,
  onRemove,
  showDragHandle = true,
}: AppMiniCardHeaderProps) {
  const [showCloseButton, setShowCloseButton] = useState(false)

  return (
    <div
      className="flex items-center gap-2 px-4 h-10 border-b border-border bg-card"
      onMouseEnter={() => setShowCloseButton(true)}
      onMouseLeave={() => setShowCloseButton(false)}
    >
      {/* Drag Handle - Hidden on mobile */}
      {showDragHandle && (
        <div
          className="hidden md:flex cursor-move hover:bg-accent rounded p-1 transition-colors"
          data-drag-handle
        >
          <GripVertical className="h-4 w-4 text-muted-foreground" />
        </div>
      )}

      {/* Icon + Title */}
      <div className="flex items-center gap-2 flex-1 min-w-0">
        {icon && <div className="shrink-0">{icon}</div>}
        <h3 className="text-sm font-semibold truncate">{title}</h3>
      </div>

      {/* Close Button with Confirm Dialog */}
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className={`
              h-6 w-6 shrink-0
              hover:bg-destructive hover:text-destructive-foreground
              transition-all duration-200
              ${showCloseButton ? 'opacity-100 md:opacity-100' : 'opacity-100 md:opacity-0'}
            `}
            aria-label={`Xóa ${title}`}
          >
            <X className="h-4 w-4" />
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Xóa app khỏi dashboard?</AlertDialogTitle>
            <AlertDialogDescription>
              App <strong>{title}</strong> sẽ bị xóa khỏi dashboard này. Bạn có thể add lại sau.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Hủy</AlertDialogCancel>
            <AlertDialogAction onClick={onRemove}>Xóa</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
