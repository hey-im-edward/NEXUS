/**
 * Zustand Store for Elastic Grid Engine
 * Implements double-buffered layout with transactional updates
 */

import { create } from 'zustand'
import { tryMoveItem } from './physics-engine'
import { Direction, GridConfig, GridItem, GridPosition } from './types'

export interface GridState {
  // Double-buffered layout
  committedLayout: Record<string, GridItem>   // Saved/persistent state
  projectionLayout: Record<string, GridItem>  // Temporary state during drag
  
  // Drag tracking
  dragItem: string | null
  initialItemState: GridItem | null
  
  // Grid configuration
  gridConfig: GridConfig
  
  // Actions
  setCommittedLayout: (layout: Record<string, GridItem>) => void
  startDrag: (id: string) => void
  updateProjection: (id: string, position: GridPosition, direction: Direction) => void
  commitLayout: () => void
  cancelDrag: () => void
  updateConfig: (config: Partial<GridConfig>) => void
}

export const useGridStore = create<GridState>((set, get) => ({
  // Initial state
  committedLayout: {},
  projectionLayout: {},
  dragItem: null,
  initialItemState: null,
  gridConfig: {
    cols: 12,
    rowHeight: 60,
    gap: 16
  },
  
  // Set committed layout (from DB or initial render)
  setCommittedLayout: (layout) => set({
    committedLayout: layout,
    projectionLayout: layout  // Sync projection
  }),
  
  // Start drag transaction
  startDrag: (id) => set(state => {
    const item = state.committedLayout[id]
    if (!item) return state
    
    return {
      dragItem: id,
      initialItemState: { ...item },
      projectionLayout: { ...state.committedLayout }  // Clone for transaction
    }
  }),
  
  // Update projection during drag (runs physics engine)
  updateProjection: (id, position, direction) => set(state => {
    if (state.dragItem !== id) return state
    
    const newLayout = tryMoveItem(
      state.projectionLayout,
      id,
      position,
      direction,
      state.gridConfig
    )
    
    return { projectionLayout: newLayout }
  }),
  
  // Commit drag (save projection to committed)
  commitLayout: () => set(state => ({
    committedLayout: state.projectionLayout,
    dragItem: null,
    initialItemState: null
  })),
  
  // Cancel drag (snapback to committed)
  cancelDrag: () => set(state => ({
    projectionLayout: state.committedLayout,  // Revert
    dragItem: null,
    initialItemState: null
  })),
  
  // Update grid config
  updateConfig: (config) => set(state => ({
    gridConfig: { ...state.gridConfig, ...config }
  }))
}))
