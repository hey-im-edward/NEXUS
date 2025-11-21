/**
 * AppMiniCard Component
 * 
 * Wrapper component for each app mini in the dashboard grid
 * Includes drag handle and remove button
 */

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
import { ReactNode } from 'react'

interface AppMiniCardProps {
  appId: string
  title: string
  icon?: ReactNode
  onRemove?: () => void
  children: ReactNode
  isDragging?: boolean
  cardSize?: { w: number; h: number }
}

export function AppMiniCard({
  appId,
  title,
  icon,
  onRemove,
  children,
  isDragging = false,
  cardSize = { w: 3, h: 3 },
}: AppMiniCardProps) {
  // Card nhỏ (1x1 hoặc 1x2 hoặc 2x1) cần thu nhỏ content
  const isSmallCard = cardSize.w <= 2 && cardSize.h <= 2
  const isMiniCard = cardSize.w <= 3 || cardSize.h <= 3

  return (
    <div
      className={`
        relative flex flex-col h-full
        bg-card/60 backdrop-blur-md border border-border/40 rounded-lg
        shadow-sm hover:shadow-lg hover:bg-card/80 hover:border-border/60
        transition-all duration-200
        overflow-hidden
        ${isDragging ? 'opacity-50' : ''}
      `}
    >
      {/* Header with drag handle and close button */}
      <div className={`
        flex items-center gap-2 border-b border-border bg-muted/30 shrink-0
        ${isSmallCard ? 'px-2 h-8' : 'px-3 h-10'}
      `}>
        {/* Drag handle - Only visible on desktop */}
        <div
          className="drag-handle cursor-move hover:text-foreground text-muted-foreground transition-colors hidden md:block"
          data-testid={`drag-handle-${appId}`}
        >
          <GripVertical className="h-4 w-4" />
        </div>

        {/* App icon */}
        {icon && <div className="text-muted-foreground shrink-0">{icon}</div>}

        {/* App title */}
        <h3 className={`font-medium truncate flex-1 ${
          isSmallCard ? 'text-xs' : 'text-sm'
        }`}>{title}</h3>

        {/* Remove button - Always visible on mobile, hover on desktop */}
        {onRemove && (
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 shrink-0 md:opacity-0 md:group-hover:opacity-100 transition-opacity"
                data-testid={`remove-${appId}`}
              >
                <X className="h-4 w-4" />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Xóa app khỏi dashboard?</AlertDialogTitle>
                <AlertDialogDescription>
                  App <strong>{title}</strong> sẽ bị xóa khỏi dashboard này. Bạn có thể thêm lại sau.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Hủy</AlertDialogCancel>
                <AlertDialogAction onClick={onRemove}>Xóa</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        )}
      </div>

      {/* App content area */}
      <div className={`
        flex-1 overflow-auto
        ${isSmallCard ? 'p-1 text-xs' : isMiniCard ? 'p-1.5 text-xs' : 'p-2 text-sm'}
      `}>
        {children}
      </div>
    </div>
  )
}
