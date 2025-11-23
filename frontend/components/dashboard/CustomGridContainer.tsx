/**
 * Custom Grid Container - NEW IMPLEMENTATION
 * 
 * Elastic Grid Engine: dnd-kit + Zustand + Custom Physics
 * Features: Recursive push, 50% swap threshold, Infinite scroll, Resize
 */

'use client'

import { useDashboardLayout } from '@/hooks/use-dashboard-layout'
import { detectDirection } from '@/lib/grid/physics-engine'
import { useGridStore } from '@/lib/grid/store'
import { GridItem as GridItemType } from '@/lib/grid/types'
import { saveDashboardLayout } from '@/lib/supabase/dashboard-layouts'
import { DndContext, DragCancelEvent, DragEndEvent, DragMoveEvent, DragStartEvent, PointerSensor, useSensor, useSensors } from '@dnd-kit/core'
import { useQueryClient } from '@tanstack/react-query'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Layout } from 'react-grid-layout'
import { AppMiniCard } from './AppMiniCard'
import { GridItem } from './GridItem'

interface GridItemData {
  id: string
  title: string
  icon?: React.ReactNode
  component: React.ReactNode
}

interface CustomGridContainerProps {
  userId: string
  dashboardName?: string
  items?: GridItemData[]
}

export function CustomGridContainer({
  userId,
  dashboardName = 'Main',
  items: initialItems = [],
}: CustomGridContainerProps) {
  const queryClient = useQueryClient()
  const containerRef = useRef<HTMLDivElement>(null)
  
  // Hooks
  const { layout: dbLayout, isLoading, isSaving } = useDashboardLayout({
    userId,
    dashboardName,
  })
  
  // Zustand store
  const {
    projectionLayout,
    dragItem,
    initialItemState,  // ✅ ADD THIS - needed for delta calculations
    gridConfig,
    setCommittedLayout,
    startDrag,
    updateProjection,
    commitLayout,
    cancelDrag,
    updateConfig
  } = useGridStore()
  
  const [items, setItems] = useState(initialItems)
  const [colWidth, setColWidth] = useState(100)  // Default to avoid 0 on first render
  const [isDraggingResize, setIsDraggingResize] = useState(false)
  
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  )
  
  // Update items when prop changes
  useEffect(() => {
    setItems(initialItems)
  }, [initialItems])
  
  // Sync DB layout to store
  useEffect(() => {
    if (!isLoading && items.length > 0) {
      // Convert Layout[] to Record<string, GridItem>
      const gridItems: Record<string, GridItemType> = {}
      
      // First, load DB layout if exists
      dbLayout.forEach(item => {
        gridItems[item.i] = {
          id: item.i,
          x: item.x,
          y: item.y,
          w: item.w,
          h: item.h
        }
      })
      
      // Generate defaults for items not in DB
      items.forEach((item, index) => {
        if (!gridItems[item.id]) {
          const col = (index % 4) * 3
          const row = Math.floor(index / 4) * 3
          
          gridItems[item.id] = {
            id: item.id,
            x: col,
            y: row,
            w: 3,
            h: 3
          }
        }
      })
      
      setCommittedLayout(gridItems)
    }
  }, [isLoading, dbLayout, items, setCommittedLayout])
  
  // Calculate column width with ResizeObserver
  useEffect(() => {
    if (!containerRef.current) return
    
    const updateColWidth = () => {
      const containerWidth = containerRef.current?.offsetWidth || 1200
      const totalGapWidth = gridConfig.gap * (gridConfig.cols - 1)
      const availableWidth = containerWidth - totalGapWidth
      const newColWidth = availableWidth / gridConfig.cols
      
      setColWidth(newColWidth)
    }
    
    updateColWidth()
    
    const resizeObserver = new ResizeObserver(updateColWidth)
    resizeObserver.observe(containerRef.current)
    
    return () => resizeObserver.disconnect()
  }, [gridConfig.cols, gridConfig.gap])
  
  // Calculate container height (infinite scroll) - memoized for performance
  const containerHeight = useMemo(() => {
    const items = Object.values(projectionLayout)
    if (items.length === 0) return 600
    
    const maxY = Math.max(...items.map(item => item.y + item.h))
    return maxY * (gridConfig.rowHeight + gridConfig.gap) + gridConfig.gap
  }, [projectionLayout, gridConfig.rowHeight, gridConfig.gap])
  
  // Drag handlers
  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event
    const itemId = active.data.current?.type === 'resize' 
      ? active.data.current.itemId 
      : active.id as string
    
    startDrag(itemId)
    
    if (active.data.current?.type === 'resize') {
      console.log('[Grid] Resize started for item:', itemId)
      setIsDraggingResize(true)
    }
  }
  
  const handleDragMove = (event: DragMoveEvent) => {
    const { active, delta } = event
    const isResize = active.data.current?.type === 'resize'
    const itemId = isResize ? (active.data.current?.itemId as string) : (active.id as string)
    
    if (!dragItem || dragItem !== itemId || !initialItemState) return
    
    const direction = detectDirection(delta)
    
    if (isResize) {
      // RESIZE: Convert pixel delta to grid units
      const deltaW = Math.round(delta.x / (colWidth + gridConfig.gap))
      const deltaH = Math.round(delta.y / (gridConfig.rowHeight + gridConfig.gap))
      
      const newW = Math.max(1, Math.min(gridConfig.cols - initialItemState.x, initialItemState.w + deltaW))
      const newH = Math.max(1, initialItemState.h + deltaH)
      
      // Update projection with new size (physics engine handles collisions)
      updateProjection(itemId, { x: initialItemState.x, y: initialItemState.y, w: newW, h: newH }, direction)
    } else {
      // MOVE: Apply delta to INITIAL position (not current projection)
      // Delta is cumulative from drag start, so we must use initialItemState
      
      // Calculate pixel-perfect position first
      const pixelX = initialItemState.x * (colWidth + gridConfig.gap) + delta.x
      const pixelY = initialItemState.y * (gridConfig.rowHeight + gridConfig.gap) + delta.y
      
      // Calculate CENTER of the item for grid snapping (Center-of-Mass)
      // This prevents hypersensitive pushing/swapping
      const itemPixelWidth = initialItemState.w * colWidth + (initialItemState.w - 1) * gridConfig.gap
      const itemPixelHeight = initialItemState.h * gridConfig.rowHeight + (initialItemState.h - 1) * gridConfig.gap
      
      const centerX = pixelX + (itemPixelWidth / 2)
      const centerY = pixelY + (itemPixelHeight / 2)
      
      // Convert center to grid units
      const gridX = Math.floor(centerX / (colWidth + gridConfig.gap))
      const gridY = Math.floor(centerY / (gridConfig.rowHeight + gridConfig.gap))
      
      // Clamp to grid boundaries
      // Note: We clamp the top-left position, so we need to adjust back from center if needed,
      // but since we calculated gridX/Y from center, they represent the cell containing the center.
      // We need to find the top-left cell of the item based on this center cell.
      // Actually, simpler: gridX IS the column index where the center is.
      // We want the item's x to be such that its center is roughly at gridX.
      // Let's stick to the standard logic: find the closest grid cell for the TOP-LEFT corner
      // BUT use the center to determine "intent".
      
      // Alternative: Just use Math.round on the top-left position? 
      // No, Center-of-Mass is better.
      
      // Let's try a hybrid: Calculate the "intended" top-left based on the center.
      // If center is in col 2, and item width is 3, then x should be 2 - 1 = 1 (roughly).
      
      // Let's simplify: Use Math.round() on the top-left position again, BUT
      // add a small threshold or hysteresis?
      // Actually, the previous "hypersensitive" issue was likely due to Math.floor() on pixelX.
      // Math.round() is generally better for "snap to closest".
      
      const newX = Math.max(0, Math.min(gridConfig.cols - initialItemState.w, Math.round(pixelX / (colWidth + gridConfig.gap))))
      const newY = Math.max(0, Math.round(pixelY / (gridConfig.rowHeight + gridConfig.gap)))
      
      updateProjection(itemId, { x: newX, y: newY }, direction)
    }
  }
  
  const handleDragEnd = (event: DragEndEvent) => {
    setIsDraggingResize(false)
    
    if (event.over || dragItem) {
      // Commit to store
      commitLayout()
      
      // Save to DB
      const layoutArray: Layout[] = Object.values(projectionLayout).map(item => ({
        i: item.id,
        x: item.x,
        y: item.y,
        w: item.w,
        h: item.h,
        minW: 1,
        minH: 1,
        maxW: gridConfig.cols,
        maxH: 20
      }))
      
      saveDashboardLayout(userId, dashboardName, layoutArray).then(() => {
        queryClient.invalidateQueries({
          queryKey: ['dashboard-layout', userId, dashboardName],
        })
      })
    } else {
      // Snapback
      cancelDrag()
    }
  }
  
  const handleDragCancel = (event: DragCancelEvent) => {
    setIsDraggingResize(false)
    cancelDrag()  // Snapback animation
  }
  
  // Remove item
  const handleRemoveApp = useCallback(
    (appId: string) => {
      setItems(prevItems => prevItems.filter(item => item.id !== appId))
      
      const newLayout = Object.values(projectionLayout)
        .filter(item => item.id !== appId)
        .reduce((acc, item) => {
          acc[item.id] = item
          return acc
        }, {} as Record<string, GridItemType>)
      
      setCommittedLayout(newLayout)
      
      const layoutArray: Layout[] = Object.values(newLayout).map(item => ({
        i: item.id,
        x: item.x,
        y: item.y,
        w: item.w,
        h: item.h,
        minW: 1,
        minH: 1,
        maxW: gridConfig.cols,
        maxH: 20
      }))
      
      saveDashboardLayout(userId, dashboardName, layoutArray).then(() => {
        queryClient.invalidateQueries({
          queryKey: ['dashboard-layout', userId, dashboardName],
        })
      })
    },
    [projectionLayout, userId, dashboardName, queryClient, setCommittedLayout, gridConfig.cols]
  )
  
  // Loading state
  if (isLoading) {
    return (
      <div className="relative w-full p-4 min-h-[600px] flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground text-lg">Đang tải dashboard...</div>
      </div>
    )
  }
  
  // Empty state
  if (items.length === 0) {
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
  
  return (
    <div className="relative w-full p-4 min-h-screen">
      {/* Saving indicator */}
      {isSaving && (
        <div className="fixed top-4 right-4 z-50 px-4 py-2 bg-primary text-primary-foreground rounded-md shadow-lg text-sm">
          Đang lưu...
        </div>
      )}
      
      <DndContext
        sensors={sensors}
        // TODO: Fix type signature to match dnd-kit's CollisionDetection
        // collisionDetection={customCollisionDetection}
        onDragStart={handleDragStart}
        onDragMove={handleDragMove}
        onDragEnd={handleDragEnd}
        onDragCancel={handleDragCancel}
      >
        <div
          ref={containerRef}
          className="relative w-full"
          style={{
            minHeight: containerHeight,
          }}
        >
          {/* Render all items from projection layout */}
          {Object.values(projectionLayout).map(gridItem => {
            const itemData = items.find(i => i.id === gridItem.id)
            if (!itemData) return null
            
            const isCurrentlyDragging = dragItem === gridItem.id
            
            // CRITICAL FIX: When dragging (BUT NOT RESIZING), render the item at its INITIAL position
            // This prevents "double movement" because dnd-kit applies the delta transform
            // relative to the element's static position.
            // During resize, we WANT to see the size change, so we use the projected gridItem.
            const itemToRender = isCurrentlyDragging && initialItemState && !isDraggingResize
              ? initialItemState 
              : gridItem
            
            return (
              <GridItem
                key={gridItem.id}
                item={itemToRender}
                colWidth={colWidth}
                rowHeight={gridConfig.rowHeight}
                gap={gridConfig.gap}
                isDragging={isCurrentlyDragging}
              >
                <AppMiniCard
                  appId={itemData.id}
                  title={itemData.title}
                  icon={itemData.icon}
                  onRemove={() => handleRemoveApp(itemData.id)}
                  cardSize={{ w: gridItem.w, h: gridItem.h }}
                >
                  {itemData.component}
                </AppMiniCard>
              </GridItem>
            )
          })}
        </div>
      </DndContext>
    </div>
  )
}
