/**
 * Grid Utility Functions
 * 
 * Helper functions for grid calculations:
 * - Position to pixel conversion
 * - Pixel to grid position conversion
 * - Snapping logic
 * - Collision detection
 */

import { Layout } from 'react-grid-layout'

export interface GridConfig {
  cols: number
  rowHeight: number
  gap: number
}

export interface GridPosition {
  x: number // Grid column (0-based)
  y: number // Grid row (0-based)
  w: number // Width in columns
  h: number // Height in rows
}

export interface PixelPosition {
  x: number // Pixel offset
  y: number // Pixel offset
}

/**
 * Convert grid position to pixel offset
 */
export function gridToPixel(
  gridPos: GridPosition,
  config: GridConfig,
  containerWidth: number
): PixelPosition {
  const colWidth = (containerWidth - config.gap * (config.cols - 1)) / config.cols
  
  return {
    x: gridPos.x * (colWidth + config.gap),
    y: gridPos.y * (config.rowHeight + config.gap),
  }
}

/**
 * Convert pixel offset to grid position (with snapping)
 */
export function pixelToGrid(
  pixelPos: PixelPosition,
  config: GridConfig,
  containerWidth: number
): GridPosition {
  const colWidth = (containerWidth - config.gap * (config.cols - 1)) / config.cols
  
  const x = Math.round(pixelPos.x / (colWidth + config.gap))
  const y = Math.round(pixelPos.y / (config.rowHeight + config.gap))
  
  return {
    x: Math.max(0, Math.min(x, config.cols - 1)),
    y: Math.max(0, y),
    w: 1,
    h: 1,
  }
}

/**
 * Check if two grid items collision
 */
export function checkGridCollision(item1: GridPosition, item2: GridPosition): boolean {
  return !(
    item1.x + item1.w <= item2.x ||
    item1.x >= item2.x + item2.w ||
    item1.y + item1.h <= item2.y ||
    item1.y >= item2.y + item2.h
  )
}

/**
 * Calculate center point of grid item
 */
export function getGridCenter(item: GridPosition): { x: number; y: number } {
  return {
    x: item.x + item.w / 2,
    y: item.y + item.h / 2,
  }
}

/**
 * Check if dragged item's center crossed 50% of target's center
 */
export function checkCenterCrossing(
  dragged: GridPosition,
  target: GridPosition,
  direction: 'horizontal' | 'vertical',
  isPositive: boolean
): boolean {
  const draggedCenter = getGridCenter(dragged)
  const targetCenter = getGridCenter(target)

  if (direction === 'horizontal') {
    return isPositive
      ? draggedCenter.x > targetCenter.x
      : draggedCenter.x < targetCenter.x
  } else {
    return isPositive
      ? draggedCenter.y > targetCenter.y
      : draggedCenter.y < targetCenter.y
  }
}

/**
 * Detect primary drag direction
 */
export function detectDragDirection(
  deltaX: number,
  deltaY: number
): {
  direction: 'horizontal' | 'vertical'
  isPositive: boolean
} {
  const isHorizontal = Math.abs(deltaX) > Math.abs(deltaY)
  
  return {
    direction: isHorizontal ? 'horizontal' : 'vertical',
    isPositive: isHorizontal ? deltaX > 0 : deltaY > 0,
  }
}

/**
 * Calculate pushed position (1 grid unit in direction)
 */
export function calculatePushPosition(
  item: GridPosition,
  direction: 'horizontal' | 'vertical',
  isPositive: boolean,
  maxCols: number
): GridPosition | null {
  const newPos = { ...item }

  if (direction === 'horizontal') {
    newPos.x = isPositive ? item.x + 1 : item.x - 1
    // Check bounds
    if (newPos.x < 0 || newPos.x + newPos.w > maxCols) {
      return null
    }
  } else {
    newPos.y = isPositive ? item.y + 1 : item.y - 1
    // Check bounds (y can be negative for upward push, but minimum 0)
    if (newPos.y < 0) {
      return null
    }
  }

  return newPos
}

/**
 * Check if position is within grid bounds
 */
export function isWithinGridBounds(pos: GridPosition, maxCols: number): boolean {
  return pos.x >= 0 && pos.x + pos.w <= maxCols && pos.y >= 0
}

/**
 * Snap layout item to grid
 */
export function snapToGrid(layout: Layout, config: GridConfig): Layout {
  return {
    ...layout,
    x: Math.max(0, Math.min(layout.x, config.cols - layout.w)),
    y: Math.max(0, layout.y),
    w: Math.max(1, Math.min(layout.w, config.cols)),
    h: Math.max(1, layout.h),
  }
}
