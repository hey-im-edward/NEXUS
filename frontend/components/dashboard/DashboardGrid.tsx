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
import { useCallback, useEffect, useState } from 'react'
import { Layout, Layouts, Responsive, WidthProvider } from 'react-grid-layout'
// @ts-ignore - CSS import không có type definitions
import 'react-grid-layout/css/styles.css'
import { AppMiniCard } from './AppMiniCard'

const ResponsiveGridLayout = WidthProvider(Responsive)

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

  // Update apps when initialApps changes
  useEffect(() => {
    setApps(initialApps)
  }, [initialApps])

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
      // Only save if not loading and layout actually changed
      if (!isLoading) {
        saveLayout(newLayout)
      }
    },
    [isLoading, saveLayout]
  )

  // Breakpoint change handler
  const handleBreakpointChange = useCallback((breakpoint: string) => {
    setCurrentBreakpoint(breakpoint)
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
  const layouts: Layouts = {
    lg: currentLayout,
    md: currentLayout.map(l => ({ ...l, w: Math.min(l.w, 8) })),
    sm: currentLayout.map(l => ({ ...l, w: 4, x: 0 })),
    xs: currentLayout.map((l, index) => ({ ...l, w: 1, h: 3, x: 0, y: index * 3 })),
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
        draggableHandle=".drag-handle"
        isDraggable={currentBreakpoint !== 'xs'}
        isResizable={currentBreakpoint !== 'xs'}
        compactType={null}
        preventCollision={false}
        margin={[32, 32]}
        containerPadding={[16, 16]}
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

        /* Tắt transition để không có animation khi reload */
        .react-grid-item {
          transition: none;
        }

        .react-grid-item.react-draggable-dragging {
          transition: none;
          z-index: 100;
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
