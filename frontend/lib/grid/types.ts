/**
 * Grid System Type Definitions
 * Pure data model - NO UI concerns
 */

export interface GridItem {
  id: string
  x: number       // Column position (0-based)
  y: number       // Row position (0-based, infinite)
  w: number       // Width in columns
  h: number       // Height in rows
}

export interface GridConfig {
  cols: number        // Total columns (e.g., 6)
  rowHeight: number   // Height of one row in pixels (rendering only)
  gap: number        // Gap between items in pixels (rendering only)
}

export interface GridPosition {
  x: number
  y: number
  w?: number  // Optional width for resize
  h?: number  // Optional height for resize
}

export type Direction = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT'
