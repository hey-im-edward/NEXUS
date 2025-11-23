/**
 * Grid Utilities for dnd-kit Dashboard
 * 
 * Helper functions for:
 * - Layout ↔ CSS Grid position conversion
 * - AABB collision detection
 * - Direction detection
 * - Center crossing detection (50% rule)
 */

import { Layout } from 'react-grid-layout'

export interface GridPosition {
  x: number
  y: number
  w: number
  h: number
}

export interface Direction {
  isHorizontal: boolean
  isPositive: boolean // right/down = true, left/up = false
}

/**
 * Convert Layout to CSS Grid style properties
 */
export function layoutToGridPosition(layout: Layout, cols: number = 12) {
  return {
    gridColumn: `${layout.x + 1} / span ${layout.w}`,
    gridRow: `${layout.y + 1} / span ${layout.h}`,
  }
}

/**
 * AABB (Axis-Aligned Bounding Box) collision detection
 */
export function checkCollision(rect1: GridPosition, rect2: GridPosition): boolean {
  return (
    rect1.x < rect2.x + rect2.w &&
    rect1.x + rect1.w > rect2.x &&
    rect1.y < rect2.y + rect2.h &&
    rect1.y + rect1.h > rect2.y
  )
}

/**
 * Detect primary direction từ delta movement
 */
export function detectDirection(deltaX: number, deltaY: number): Direction {
  const isHorizontal = Math.abs(deltaX) > Math.abs(deltaY)
  const isPositive = isHorizontal ? deltaX > 0 : deltaY > 0
  
  return { isHorizontal, isPositive }
}

/**
 * Calculate center point của item
 */
export function getCenter(pos: GridPosition) {
  return {
    x: pos.x + pos.w / 2,
    y: pos.y + pos.h / 2,
  }
}

/**
 * Check nếu dragged item center đã vượt qua target item center (50% rule)
 * Chỉ check theo primary direction
 */
export function checkCenterCrossing(
  draggedPos: GridPosition,
  targetPos: GridPosition,
  direction: Direction
): boolean {
  const draggedCenter = getCenter(draggedPos)
  const targetCenter = getCenter(targetPos)

  if (direction.isHorizontal) {
    // Moving right: dragged center > target center
    // Moving left: dragged center < target center
    return direction.isPositive
      ? draggedCenter.x > targetCenter.x
      : draggedCenter.x < targetCenter.x
  } else {
    // Moving down: dragged center > target center
    // Moving up: dragged center < target center
    return direction.isPositive
      ? draggedCenter.y > targetCenter.y
      : draggedCenter.y < targetCenter.y
  }
}

/**
 * Calculate new position sau khi push 1 unit theo direction
 */
export function calculatePushPosition(
  pos: GridPosition,
  direction: Direction,
  cols: number = 12
): GridPosition | null {
  let newX = pos.x
  let newY = pos.y

  if (direction.isHorizontal) {
    newX = direction.isPositive ? pos.x + 1 : pos.x - 1
    // Check horizontal bounds
    if (newX < 0 || newX + pos.w > cols) {
      return null // Out of bounds
    }
  } else {
    newY = direction.isPositive ? pos.y + 1 : pos.y - 1
    // Check vertical bounds (only bottom, no top limit)
    if (newY < 0) {
      return null // Out of bounds
    }
  }

  return { ...pos, x: newX, y: newY }
}

/**
 * Check if position is within grid bounds
 */
export function isWithinBounds(pos: GridPosition, cols: number = 12): boolean {
  return pos.x >= 0 && pos.x + pos.w <= cols && pos.y >= 0
}
