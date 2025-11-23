/**
 * Grid Utility Functions
 * Pure logic - operates on grid coordinates only
 */

import { GridItem } from './types'

/**
 * Check if two items intersect in GRID SPACE (not pixels)
 */
export function hasIntersection(a: GridItem, b: GridItem): boolean {
  return !(
    a.x >= b.x + b.w ||
    b.x >= a.x + a.w ||
    a.y >= b.y + b.h ||
    b.y >= a.y + a.h
  )
}

/**
 * Find all items that collide with target item
 */
export function findCollisions(
  target: GridItem,
  allItems: Record<string, GridItem>
): GridItem[] {
  return Object.values(allItems)
    .filter(item => item.id !== target.id)
    .filter(item => hasIntersection(target, item))
}

/**
 * Calculate overlap ratio (for 50% threshold check)
 * Returns: intersection area / active item area
 */
export function calculateOverlapRatio(
  active: GridItem,
  target: GridItem
): number {
  if (!hasIntersection(active, target)) return 0
  
  const overlapWidth = Math.min(active.x + active.w, target.x + target.w) 
                     - Math.max(active.x, target.x)
  const overlapHeight = Math.min(active.y + active.h, target.y + target.h) 
                      - Math.max(active.y, target.y)
  
  const overlapArea = overlapWidth * overlapHeight
  const activeArea = active.w * active.h
  
  return overlapArea / activeArea
}
