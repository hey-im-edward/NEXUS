'use client'

import { AppMiniCard } from '@/components/app-mini/AppMiniCard'
import { useDashboardLayout } from '@/hooks/useDashboardLayout'
import type { LayoutItem } from '@/lib/supabase/dashboard-layouts'
import { useCallback, useMemo } from 'react'
import { Layout, Layouts, Responsive, WidthProvider } from 'react-grid-layout'

// Import react-grid-layout CSS
import 'react-grid-layout/css/styles.css'
import 'react-resizable/css/styles.css'

const ResponsiveGridLayout = WidthProvider(Responsive)

interface DashboardGridProps {
  /**
   * User ID for loading/saving layouts
   */
  userId: string

  /**
   * Dashboard name (default: "Main")
   */
  dashboardName?: string

  /**
   * Whether the grid is in edit mode (allows drag/drop)
   */
  isEditable?: boolean
}

// Default layout for new users
const DEFAULT_LAYOUT: LayoutItem[] = [
  { i: 'app-1', x: 0, y: 0, w: 4, h: 4, minW: 3, minH: 3, maxW: 12, maxH: 8 },
  { i: 'app-2', x: 4, y: 0, w: 4, h: 4, minW: 3, minH: 3, maxW: 12, maxH: 8 },
  { i: 'app-3', x: 8, y: 0, w: 4, h: 4, minW: 3, minH: 3, maxW: 12, maxH: 8 },
]

// Breakpoint configurations
const BREAKPOINTS = {
  lg: 1024, // Desktop
  md: 768,  // Tablet
  sm: 0,    // Mobile
}

const COLS = {
  lg: 12, // 12 columns on desktop
  md: 8,  // 8 columns on tablet
  sm: 1,  // 1 column on mobile
}

export function DashboardGrid({
  userId,
  dashboardName = 'Main',
  isEditable = true,
}: DashboardGridProps) {
  const {
    layout: savedLayout,
    isLoading,
    error,
    saveLayout,
    isSaving,
  } = useDashboardLayout({ userId, dashboardName })

  // Use savedLayout as the source of truth, fallback to DEFAULT_LAYOUT if empty
  const displayLayout = useMemo(() => {
    if (isLoading) return DEFAULT_LAYOUT
    if (savedLayout && savedLayout.length > 0) return savedLayout
    return DEFAULT_LAYOUT
  }, [savedLayout, isLoading])

  // Handle layout change (drag/drop/resize)
  const handleLayoutChange = useCallback(
    (layout: Layout[], layouts: Layouts) => {
      if (!isEditable) return

      const newLayout: LayoutItem[] = layout.map((item) => ({
        i: item.i,
        x: item.x,
        y: item.y,
        w: item.w,
        h: item.h,
        minW: 3,
        minH: 3,
        maxW: 12,
        maxH: 8,
      }))

      saveLayout(newLayout)
    },
    [isEditable, saveLayout]
  )

  // Handle removing a card
  const handleRemoveCard = useCallback(
    (id: string) => {
      const newLayout = displayLayout.filter((item) => item.i !== id)
      saveLayout(newLayout)
    },
    [displayLayout, saveLayout]
  )

  // Handle adding a new card
  const handleAddCard = useCallback(() => {
    const newId = `app-${Date.now()}`
    const newCard: LayoutItem = {
      i: newId,
      x: 0,
      y: Infinity, // Place at the bottom
      w: 4,
      h: 4,
      minW: 3,
      minH: 3,
      maxW: 12,
      maxH: 8,
    }

    const newLayout = [...displayLayout, newCard]
    saveLayout(newLayout)
  }, [displayLayout, saveLayout])

  // Show loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  // Show error state
  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="text-center max-w-md">
          <div className="text-red-600 dark:text-red-400 text-xl mb-4">⚠️</div>
          <p className="text-gray-900 dark:text-white font-semibold mb-2">
            Failed to load dashboard
          </p>
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            {error instanceof Error ? error.message : 'Unknown error occurred'}
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4">
      {/* Header */}
      <div className="max-w-[1920px] mx-auto mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              {dashboardName} Dashboard
            </h1>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              {isEditable ? 'Drag cards to rearrange' : 'View only mode'}
              {isSaving && (
                <span className="ml-2 text-blue-600 dark:text-blue-400">
                  • Saving...
                </span>
              )}
            </p>
          </div>
          {isEditable && (
            <button
              onClick={handleAddCard}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-sm font-medium"
            >
              + Add Card
            </button>
          )}
        </div>
      </div>

      {/* Grid Container */}
      <div className="max-w-[1920px] mx-auto">
        {displayLayout.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              No cards on your dashboard yet
            </p>
            {isEditable && (
              <button
                onClick={handleAddCard}
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-medium"
              >
                + Add Your First Card
              </button>
            )}
          </div>
        ) : (
          <ResponsiveGridLayout
            className="layout"
            layouts={{ lg: displayLayout, md: displayLayout, sm: displayLayout }}
            breakpoints={BREAKPOINTS}
            cols={COLS}
            rowHeight={60}
            onLayoutChange={handleLayoutChange}
            isDraggable={isEditable}
            isResizable={isEditable}
            compactType="vertical"
            preventCollision={false}
            draggableHandle="[data-drag-handle]"
            margin={[16, 16]}
            containerPadding={[0, 0]}
          >
            {displayLayout.map((item) => (
              <div key={item.i} data-grid={item}>
                <AppMiniCard
                  id={item.i}
                  title={`App ${item.i.split('-')[1]}`}
                  onRemove={isEditable ? handleRemoveCard : undefined}
                >
                  {/* Placeholder content - will be replaced with actual app minis */}
                  <div className="flex flex-col items-center justify-center h-full text-gray-500 dark:text-gray-400">
                    <p className="text-sm">App Mini Placeholder</p>
                    <p className="text-xs mt-2">
                      Size: {item.w}x{item.h}
                    </p>
                  </div>
                </AppMiniCard>
              </div>
            ))}
          </ResponsiveGridLayout>
        )}
      </div>
    </div>
  )
}
