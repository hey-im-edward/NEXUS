/**
 * DashboardGrid Component
 * 
 * Main dashboard grid component using react-grid-layout
 * Features:
 * - Drag & drop cards
 * - Resize cards (min: 3x3, max: 12x8)
 * - Auto-save with debounce (1 second)
 * - Responsive (Desktop: 12 cols, Tablet: 8 cols, Mobile: 1 col)
 * - Loading skeleton
 * - Empty state
 */

'use client'

import { useDashboardLayout } from '@/hooks/useDashboardLayout'
import { saveDashboardLayout } from '@/lib/supabase/dashboard-layouts'
import { useQueryClient } from '@tanstack/react-query'
import { useCallback, useEffect, useRef, useState } from 'react'
import { Layout, Layouts, Responsive, WidthProvider } from 'react-grid-layout'
// @ts-ignore - CSS import không có type definitions
import 'react-grid-layout/css/styles.css'
import { AppMiniCard } from './AppMiniCard'

const ResponsiveGridLayout = WidthProvider(Responsive)

// Helper function: Handle collision với push (1 unit) hoặc swap logic
function handleCollision(
  layout: Layout[],
  draggedItem: Layout,
  dragStartPosition: { x: number; y: number }
): Layout[] {
  const result = [...layout]
  const draggedIndex = result.findIndex(item => item.i === draggedItem.i)

  if (draggedIndex === -1) return result

  // Calculate TOTAL movement delta từ drag start để detect direction
  const totalDeltaX = draggedItem.x - dragStartPosition.x
  const totalDeltaY = draggedItem.y - dragStartPosition.y

  // Determine primary direction (horizontal vs vertical)
  const isHorizontal = Math.abs(totalDeltaX) > Math.abs(totalDeltaY)
  const isMovingRight = totalDeltaX > 0
  const isMovingDown = totalDeltaY > 0

  // Calculate dragged item center
  const draggedCenter = {
    x: draggedItem.x + draggedItem.w / 2,
    y: draggedItem.y + draggedItem.h / 2,
  }

  // Handle ALL collisions in one pass
  let hasChanges = false
  for (let i = 0; i < result.length; i++) {
    if (i === draggedIndex) continue

    const item = result[i]
    const hasCollision =
      draggedItem.x < item.x + item.w &&
      draggedItem.x + draggedItem.w > item.x &&
      draggedItem.y < item.y + item.h &&
      draggedItem.y + draggedItem.h > item.y

    if (hasCollision) {
      // Calculate item center
      const itemCenter = {
        x: item.x + item.w / 2,
        y: item.y + item.h / 2,
      }

      // Check swap condition: dragged center đã vượt qua item center?
      let shouldSwap = false
      if (isHorizontal) {
        shouldSwap = isMovingRight
          ? draggedCenter.x > itemCenter.x
          : draggedCenter.x < itemCenter.x
      } else {
        shouldSwap = isMovingDown
          ? draggedCenter.y > itemCenter.y
          : draggedCenter.y < itemCenter.y
      }

      if (shouldSwap) {
        // SWAP: Đổi vị trí giữa dragged item và colliding item
        result[draggedIndex] = { ...draggedItem, x: item.x, y: item.y }
        result[i] = { ...item, x: dragStartPosition.x, y: dragStartPosition.y }
        hasChanges = true
        break // Stop sau khi swap
      } else {
        // PUSH: Đẩy item 1 grid unit theo hướng movement của DRAGGED ITEM
        if (isHorizontal) {
          const newX = isMovingRight
            ? item.x + 1 // Push right
            : item.x - 1 // Push left
          // Check bounds
          if (newX >= 0 && newX + item.w <= 12) {
            result[i] = { ...item, x: newX }
            hasChanges = true
          }
        } else {
          const newY = isMovingDown
            ? item.y + 1 // Push down
            : item.y - 1 // Push up
          // Check bounds
          if (newY >= 0) {
            result[i] = { ...item, y: newY }
            hasChanges = true
          }
        }
      }
    }
  }

  // Nếu có thay đổi, check recursively cho chain collisions
  if (hasChanges) {
    // Check if any pushed items now collide with others
    for (let i = 0; i < result.length; i++) {
      if (i === draggedIndex) continue

      const item = result[i]

      // Check collision của item này với tất cả items khác
      for (let j = 0; j < result.length; j++) {
        if (j === i || j === draggedIndex) continue

        const otherItem = result[j]
        const collision =
          item.x < otherItem.x + otherItem.w &&
          item.x + item.w > otherItem.x &&
          item.y < otherItem.y + otherItem.h &&
          item.y + item.h > otherItem.y

        if (collision) {
          // Push otherItem cùng direction
          if (isHorizontal) {
            const newX = isMovingRight ? otherItem.x + 1 : otherItem.x - 1
            if (newX >= 0 && newX + otherItem.w <= 12) {
              result[j] = { ...otherItem, x: newX }
            }
          } else {
            const newY = isMovingDown ? otherItem.y + 1 : otherItem.y - 1
            if (newY >= 0) {
              result[j] = { ...otherItem, y: newY }
            }
          }
        }
      }
    }
  }

  return result
}

interface DashboardApp {
  id: string
  title: string
  icon?: React.ReactNode
  component: React.ReactNode
}

interface DashboardGridProps {
  userId: string
  dashboardName?: string
  apps?: DashboardApp[]
}

export function DashboardGrid({
  userId,
  dashboardName = 'Main',
  apps: initialApps = [],
}: DashboardGridProps) {
  const queryClient = useQueryClient()
  const { layout, isLoading, saveLayout, isSaving } = useDashboardLayout({
    userId,
    dashboardName,
  })

  const [currentBreakpoint, setCurrentBreakpoint] = useState('lg')
  const [apps, setApps] = useState(initialApps)
  const [isDragging, setIsDragging] = useState(false)
  const [processedLayout, setProcessedLayout] = useState<Layout[]>([])
  const draggedItemRef = useRef<string | null>(null)
  const dragStartPositionRef = useRef<{ x: number; y: number } | null>(null)

  // Update apps when initialApps changes
  useEffect(() => {
    setApps(initialApps)
  }, [initialApps])

  // Initialize processedLayout from database layout
  useEffect(() => {
    if (!isLoading && layout.length > 0) {
      setProcessedLayout(layout)
    }
  }, [isLoading, layout])

  // Auto-scroll when dragging near edges
  useEffect(() => {
    if (!isDragging) return

    let scrollInterval: NodeJS.Timeout | null = null
    const scrollSpeed = 10
    const edgeSize = 100

    const handleMouseMove = (e: MouseEvent) => {
      const viewportHeight = window.innerHeight
      const mouseY = e.clientY

      // Clear previous interval
      if (scrollInterval) {
        clearInterval(scrollInterval)
        scrollInterval = null
      }

      // Scroll down when near bottom
      if (mouseY > viewportHeight - edgeSize) {
        scrollInterval = setInterval(() => {
          window.scrollBy(0, scrollSpeed)
        }, 16)
      }
      // Scroll up when near top
      else if (mouseY < edgeSize) {
        scrollInterval = setInterval(() => {
          window.scrollBy(0, -scrollSpeed)
        }, 16)
      }
    }

    const handleMouseUp = () => {
      setIsDragging(false)
      if (scrollInterval) {
        clearInterval(scrollInterval)
      }
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseup', handleMouseUp)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseup', handleMouseUp)
      if (scrollInterval) {
        clearInterval(scrollInterval)
      }
    }
  }, [isDragging])

  // Generate default layout for apps that don't have positions yet
  const generateDefaultLayout = useCallback((): Layout[] => {
    return apps.map((app, index) => {
      const existingLayout = layout.find((l) => l.i === app.id)
      if (existingLayout) return existingLayout

      // Default positioning: 3 cols wide, 3 rows tall
      const col = (index % 4) * 3
      const row = Math.floor(index / 4) * 3

      return {
        i: app.id,
        x: col,
        y: row,
        w: 3,
        h: 3,
        minW: 1,
        minH: 1,
        maxW: 12,
        maxH: 8,
      }
    })
  }, [apps, layout])

  // Handle layout change (drag/resize)
  const handleLayoutChange = useCallback(
    (newLayout: Layout[]) => {
      if (isLoading) return

      // Nếu đang drag, apply collision logic
      if (isDragging && draggedItemRef.current && dragStartPositionRef.current) {
        const draggedItem = newLayout.find(item => item.i === draggedItemRef.current)
        if (draggedItem) {
          // Handle collision với push/swap logic
          const finalLayout = handleCollision(
            newLayout,
            draggedItem,
            dragStartPositionRef.current
          )

          setProcessedLayout(finalLayout)
          saveLayout(finalLayout)
          return
        }
      }

      // Không drag, save bình thường
      setProcessedLayout(newLayout)
      saveLayout(newLayout)
    },
    [isLoading, isDragging, saveLayout]
  )

  // Breakpoint change handler
  const handleBreakpointChange = useCallback((breakpoint: string) => {
    setCurrentBreakpoint(breakpoint)
  }, [])

  // Drag start handler
  const handleDragStart = useCallback((_layout: Layout[], _oldItem: Layout, newItem: Layout) => {
    setIsDragging(true)
    draggedItemRef.current = newItem.i
    dragStartPositionRef.current = { x: newItem.x, y: newItem.y }
  }, [])

  // Drag stop handler
  const handleDragStop = useCallback(() => {
    setIsDragging(false)
    draggedItemRef.current = null
    dragStartPositionRef.current = null
  }, [])

  // Handle remove app from dashboard
  const handleRemoveApp = useCallback(
    (appId: string) => {
      // Remove app from state immediately for instant UI update
      setApps(prevApps => prevApps.filter(app => app.id !== appId))
      
      // Filter layout to remove the card
      const newLayout = layout.filter((l) => l.i !== appId)
      
      // Save to database immediately
      saveDashboardLayout(userId, dashboardName, newLayout).then(() => {
        queryClient.invalidateQueries({
          queryKey: ['dashboard-layout', userId, dashboardName],
        })
      })
    },
    [layout, userId, dashboardName, queryClient, setApps]
  )

  // Nếu đang loading, chỉ hiển thị loading indicator
  if (isLoading) {
    return (
      <div className="relative w-full p-4 min-h-[600px] flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground text-lg">Đang tải dashboard...</div>
      </div>
    )
  }

  // Nếu không có apps, hiển thị empty state
  if (apps.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[calc(100vh-200px)] text-center px-4">
        <div className="max-w-md space-y-4">
          <h2 className="text-2xl font-semibold">Dashboard trống</h2>
          <p className="text-muted-foreground">
            Bạn chưa có app nào trên dashboard. Hãy thêm app từ marketplace hoặc tạo app mới!
          </p>
        </div>
      </div>
    )
  }

  // Chỉ generate layout khi đã có data từ database
  const currentLayout = generateDefaultLayout()

  // Use processedLayout if available, otherwise use currentLayout
  const activeLayout = processedLayout.length > 0 ? processedLayout : currentLayout

  const layouts: Layouts = {
    lg: activeLayout,
    md: activeLayout.map(l => ({ ...l, w: Math.min(l.w, 8) })),
    sm: activeLayout.map(l => ({ ...l, w: 4, x: 0 })),
    xs: activeLayout.map((l, index) => ({ ...l, w: 1, h: 3, x: 0, y: index * 3 })),
  }

  return (
    <div className="relative w-full p-4 min-h-screen">
      {/* Saving indicator */}
      {isSaving && (
        <div className="fixed top-4 right-4 z-50 px-4 py-2 bg-primary text-primary-foreground rounded-md shadow-lg text-sm">
          Đang lưu...
        </div>
      )}

      <ResponsiveGridLayout
        className="layout"
        layouts={layouts}
        breakpoints={{ lg: 1024, md: 768, sm: 640, xs: 0 }}
        cols={{ lg: 12, md: 8, sm: 4, xs: 1 }}
        rowHeight={60}
        onLayoutChange={handleLayoutChange}
        onBreakpointChange={handleBreakpointChange}
        onDragStart={handleDragStart}
        onDragStop={handleDragStop}
      >
        {apps.map((app) => {
          const cardLayout = currentLayout.find(l => l.i === app.id)
          return (
            <div key={app.id} className="group">
              <AppMiniCard
                appId={app.id}
                title={app.title}
                icon={app.icon}
                onRemove={() => handleRemoveApp(app.id)}
                cardSize={cardLayout ? { w: cardLayout.w, h: cardLayout.h } : undefined}
              >
                {app.component}
              </AppMiniCard>
            </div>
          )
        })}
      </ResponsiveGridLayout>

      {/* Custom styles for grid layout */}
      <style jsx global>{`
        /* Ẩn scrollbar ngang */
        .layout {
          scrollbar-width: none; /* Firefox */
          -ms-overflow-style: none; /* IE/Edge */
        }
        .layout::-webkit-scrollbar {
          display: none; /* Chrome/Safari */
        }

        /* Fix text selection khi drag */
        .react-grid-item.react-draggable-dragging * {
          user-select: none !important;
          -webkit-user-select: none !important;
        }

        /* Fix text selection khi resize */
        .react-grid-item.react-resizable-resizing *,
        .react-grid-item:active * {
          user-select: none !important;
          -webkit-user-select: none !important;
        }

        /* Smooth transitions cho drag & drop */
        .react-grid-item {
          transition: transform 250ms cubic-bezier(0.4, 0, 0.2, 1),
                      width 250ms cubic-bezier(0.4, 0, 0.2, 1),
                      height 250ms cubic-bezier(0.4, 0, 0.2, 1);
        }

        /* Card đang drag - không có transition để follow cursor tức thì */
        .react-grid-item.react-draggable-dragging {
          transition: none !important;
          z-index: 100;
          opacity: 0.95;
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
        }

        .react-grid-item.react-resizable-resizing {
          transition: none !important;
          z-index: 100;
        }

        .react-grid-item.cssTransforms {
          transition-property: transform, width, height;
          transition-duration: 250ms;
          transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
        }

        /* Override khi đang drag */
        .react-grid-item.react-draggable-dragging.cssTransforms {
          transition: none !important;
        }

        /* Hiển thị grid dots khi đang drag */\n        .layout.react-grid-layout:has(.react-draggable-dragging)::before {
          content: '';
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          pointer-events: none;
          z-index: 1;
          background-image: 
            radial-gradient(circle at center, rgba(59, 130, 246, 0.5) 2px, transparent 2px);
          background-size: calc((100vw - 2rem) / 12) 60px;
          background-position: 1rem 0;
        }

        .react-grid-item.react-grid-placeholder {
          background: rgba(59, 130, 246, 0.15);
          opacity: 1;
          border: 2px dashed rgba(59, 130, 246, 0.6);
          border-radius: 0.5rem;
          z-index: 2;
          -webkit-user-select: none;
          -moz-user-select: none;
          -ms-user-select: none;
          -o-user-select: none;
          user-select: none;
        }

        .react-grid-item > .react-resizable-handle::after {
          border-right: 2px solid hsl(var(--border));
          border-bottom: 2px solid hsl(var(--border));
        }

        .react-grid-item:hover > .react-resizable-handle::after {
          border-right: 2px solid hsl(var(--primary));
          border-bottom: 2px solid hsl(var(--primary));
        }

        /* Hide resize handle on mobile */
        @media (max-width: 640px) {
          .react-grid-item > .react-resizable-handle {
            display: none;
          }
        }
      `}</style>
    </div>
  )
}
