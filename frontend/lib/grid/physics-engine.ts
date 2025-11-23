/**
 * Elastic Grid Physics Engine
 * Core recursive push algorithm
 */

import { Direction, GridConfig, GridItem, GridPosition } from './types';
import { findCollisions } from './utils';

/**
 * Detect drag direction from delta movement
 */
export function detectDirection(delta: { x: number; y: number }): Direction {
  if (Math.abs(delta.x) > Math.abs(delta.y)) {
    return delta.x > 0 ? 'RIGHT' : 'LEFT'
  } else {
    return delta.y > 0 ? 'DOWN' : 'UP'
  }
}

/**
 * CORE ALGORITHM: Recursive Displacement
 * Moves activeItem to targetPosition, recursively pushing colliding items
 * 
 * @param layout - Current grid layout (Record of items by ID)
 * @param activeItemId - ID of item being moved/resized
 * @param targetPosition - Desired grid position
 * @param direction - Push direction for collisions
 * @param config - Grid configuration
 * @returns New layout with resolved collisions
 */
export function tryMoveItem(
  layout: Record<string, GridItem>,
  activeItemId: string,
  targetPosition: GridPosition,
  direction: Direction,
  config: GridConfig
): Record<string, GridItem> {
  // Clone layout for transactional update (structural sharing - much faster than JSON)
  const newLayout: Record<string, GridItem> = Object.fromEntries(
    Object.entries(layout).map(([k, v]) => [k, { ...v }])
  )
  const activeItem = newLayout[activeItemId]
  
  if (!activeItem) {
    console.warn(`Item ${activeItemId} not found in layout`)
    return layout
  }
  
  // Update active item position AND size (with boundary checks)
  activeItem.x = Math.max(0, Math.min(config.cols - activeItem.w, targetPosition.x))
  activeItem.y = Math.max(0, targetPosition.y)
  
  // Update size if provided (for resize operations)
  if (targetPosition.w !== undefined) {
    activeItem.w = Math.max(1, Math.min(config.cols - activeItem.x, targetPosition.w))
  }
  if (targetPosition.h !== undefined) {
    activeItem.h = Math.max(1, targetPosition.h)
  }
  
  // Recursive pusher with cycle detection
  const visited = new Set<string>()
  
  const pushItem = (itemId: string, pushDir: Direction): void => {
    // Prevent infinite loops
    if (visited.has(itemId)) return
    visited.add(itemId)
    
    const item = newLayout[itemId]
    if (!item) return
    
    // Calculate new position based on push direction
    let newX = item.x
    let newY = item.y
    
    switch (pushDir) {
      case 'LEFT':
        newX = item.x - 1
        // Hit left edge → fallback to DOWN
        if (newX < 0) {
          newX = item.x
          newY = item.y + 1
        }
        break
        
      case 'RIGHT':
        newX = item.x + 1
        // Hit right edge → BLOCK (don't move)
        if (newX + item.w > config.cols) {
          newX = item.x // Revert to previous X
          // Do NOT change Y, do NOT change pushDir
          // This prevents the "wrap-around" overlap bug
        }
        break
        
      case 'UP':
        newY = Math.max(0, item.y - 1)
        break
        
      case 'DOWN':
        newY = item.y + 1  // Infinite scroll
        break
    }
    
    // Tentatively move item to new position
    item.x = newX
    item.y = newY
    
    // Find items now colliding with pushed item at new position
    const colliders = findCollisions(item, newLayout)
    
    // Recursively push all colliders in same direction
    colliders.forEach(collider => {
      pushItem(collider.id, pushDir)
    })
  }
  
  // Start chain reaction: push all items initially colliding with activeItem
  const initialCollisions = findCollisions(activeItem, newLayout)
  initialCollisions.forEach(collider => {
    pushItem(collider.id, direction)
  })
  
  return newLayout
}
