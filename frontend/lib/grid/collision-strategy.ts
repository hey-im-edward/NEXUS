/**
 * Custom Collision Detection Strategy for dnd-kit
 * Implements 50% overlap threshold to prevent jitter
 */

import { GridItem } from './types'
import { calculateOverlapRatio } from './utils'

export interface CollisionArgs {
  active: {
    id: string
    data: {
      current?: GridItem
    }
  }
  droppableContainers: Array<{
    id: string
    data: {
      current?: GridItem
    }
  }>
}

export interface CollisionDescriptor {
  id: string
  data: {
    value: number  // Overlap ratio
  }
}

/**
 * Custom collision detection for dnd-kit
 * Only returns collisions when overlap > 50% of active item area
 * 
 * This prevents premature layout shifts when dragging
 */
export function customCollisionDetection(
  args: CollisionArgs
): CollisionDescriptor[] {
  const { active, droppableContainers } = args
  const activeItem = active.data.current
  
  if (!activeItem) return []
  
  // Calculate overlap ratio for all potential collisions
  const collisions = droppableContainers
    .filter(container => container.id !== active.id)
    .map(container => {
      const targetItem = container.data.current
      if (!targetItem) return null
      
      const overlapRatio = calculateOverlapRatio(activeItem, targetItem)
      
      return {
        id: container.id,
        data: { value: overlapRatio }
      }
    })
    .filter(
      (collision): collision is CollisionDescriptor =>
        collision !== null &&
        collision.data !== undefined &&
        collision.data.value > 0.5
    )
    .sort((a, b) => b.data.value - a.data.value)  // Strongest overlap first

  return collisions
}
