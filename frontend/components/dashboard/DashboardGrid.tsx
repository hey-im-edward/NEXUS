/**
 * DashboardGrid Component
 * 
 * Main dashboard grid component using react-grid-layout
 * Features:
 * - Native RGL Physics (No custom collision logic)
 * - Drag & drop cards
 * - Resize cards (min: 3x3, max: 12x8)
 * - Auto-save with debounce
 * - Responsive (Desktop: 12 cols, Tablet: 8 cols, Mobile: 1 col)
 */

'use client'

import { useDashboardLayout } from '@/hooks/use-dashboard-layout'
import { saveDashboardLayout } from '@/lib/supabase/dashboard-layouts'
import { useQueryClient } from '@tanstack/react-query'
import { useCallback, useEffect, useState } from 'react'
import { Layout, Layouts, Responsive, WidthProvider } from 'react-grid-layout'
// @ts-ignore - CSS import no types
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

  const [mounted, setMounted] = useState(false)
  const [apps, setApps] = useState(initialApps)
  
  // Hydration fix
  useEffect(() => {
    setMounted(true)
  }, [])

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
        minW: 3, // Enforce min size
        minH: 3,
        maxW: 12,
        maxH: 8,
      }
    })
  }, [apps, layout])

  // Handle layout change (drag/resize)
  const handleLayoutChange = useCallback(
    (currentLayout: Layout[]) => {
      if (isLoading || !mounted) return

      // Save to local state and DB
      saveLayout(currentLayout)
    },
    [isLoading, mounted, saveLayout]
  )

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
    [layout, userId, dashboardName, queryClient]
  )

  // Loading state
  if (isLoading || !mounted) {
    return (
      <div className="relative w-full p-4 min-h-[600px] flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground text-lg">Đang tải dashboard...</div>
      </div>
    )
  }

  // Empty state
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

  // Combine current layout with defaults
  const activeLayout = generateDefaultLayout()

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
        margin={[16, 16]}
        containerPadding={[0, 0]}
        onLayoutChange={handleLayoutChange}
        isDraggable={true}
        isResizable={true}
        draggableHandle=".drag-handle" // Use specific handle if needed, or remove for whole card
      >
        {apps.map((app) => {
          const cardLayout = activeLayout.find(l => l.i === app.id)
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
        /* Disable scrollbars */
        .layout {
          scrollbar-width: none;
        }
        .layout::-webkit-scrollbar {
          display: none;
        }

        /* Smooth transitions */
        .react-grid-item {
          transition: all 200ms ease;
          transition-property: left, top, width, height;
        }
        
        /* Disable transition during drag */
        .react-grid-item.react-grid-placeholder {
          background: rgba(59, 130, 246, 0.1) !important;
          border: 2px dashed rgba(59, 130, 246, 0.5) !important;
          border-radius: 0.75rem !important;
          opacity: 0.8 !important;
        }

        .react-grid-item.resizing {
          z-index: 100;
          box-shadow: 0 0 10px rgba(0,0,0,0.1);
        }

        /* Resize Handle Styling */
        .react-resizable-handle {
          position: absolute;
          width: 20px;
          height: 20px;
          bottom: 0;
          right: 0;
          cursor: se-resize;
          z-index: 10;
        }
        
        .react-resizable-handle::after {
          content: "";
          position: absolute;
          right: 6px;
          bottom: 6px;
          width: 8px;
          height: 8px;
          border-right: 2px solid hsl(var(--muted-foreground));
          border-bottom: 2px solid hsl(var(--muted-foreground));
          transition: all 0.2s;
        }
        
        .react-grid-item:hover .react-resizable-handle::after {
          border-color: hsl(var(--primary));
          width: 12px;
          height: 12px;
        }
      `}</style>
    </div>
  )
}
