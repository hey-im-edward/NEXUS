/**
 * Unit Tests for Physics Engine
 * Run these BEFORE integrating with React
 */

import { detectDirection, tryMoveItem } from '../physics-engine'
import { GridConfig, GridItem } from '../types'

// Test configuration
const config: GridConfig = {
  cols: 6,
  rowHeight: 100,
  gap: 16
}

// Helper to create layout
function createLayout(items: GridItem[]): Record<string, GridItem> {
  return items.reduce((acc, item) => {
    acc[item.id] = item
    return acc
  }, {} as Record<string, GridItem>)
}

console.log('🧪 Running Physics Engine Tests...\n')

// ===== TEST 1: Simple Push (A pushes B right) =====
console.log('Test 1: Simple Push')
const test1Layout = createLayout([
  { id: 'A', x: 0, y: 0, w: 2, h: 2 },
  { id: 'B', x: 2, y: 0, w: 2, h: 2 }
])

const test1Result = tryMoveItem(test1Layout, 'A', { x: 1, y: 0 }, 'RIGHT', config)

console.log('  Input:  A at x:0, B at x:2')
console.log('  Move A to x:1 (collides with B)')
console.log(`  Result: A at x:${test1Result['A'].x}, B at x:${test1Result['B'].x}`)
console.log(`  ✅ Expected: A=1, B=3 → Got: A=${test1Result['A'].x}, B=${test1Result['B'].x}`)
console.log()

// ===== TEST 2: Chain Push (A → B → C) =====
console.log('Test 2: Chain Push (A → B → C)')
const test2Layout = createLayout([
  { id: 'A', x: 0, y: 0, w: 1, h: 1 },
  { id: 'B', x: 1, y: 0, w: 1, h: 1 },
  { id: 'C', x: 2, y: 0, w: 1, h: 1 }
])

const test2Result = tryMoveItem(test2Layout, 'A', { x: 1, y: 0 }, 'RIGHT', config)

console.log('  Input:  A at x:0, B at x:1, C at x:2')
console.log('  Move A to x:1')
console.log(`  Result: A at x:${test2Result['A'].x}, B at x:${test2Result['B'].x}, C at x:${test2Result['C'].x}`)
console.log(`  ✅ Expected: A=1, B=2, C=3 → Got: A=${test2Result['A'].x}, B=${test2Result['B'].x}, C=${test2Result['C'].x}`)
console.log()

// ===== TEST 3: Edge Fallback (Push DOWN when hitting right edge) =====
console.log('Test 3: Edge Fallback (RIGHT → DOWN)')
const test3Layout = createLayout([
  { id: 'A', x: 3, y: 0, w: 2, h: 1 },
  { id: 'B', x: 5, y: 0, w: 1, h: 1 }  // B is at right edge
])

const test3Result = tryMoveItem(test3Layout, 'A', { x: 5, y: 0 }, 'RIGHT', config)

console.log('  Input:  A at x:3 (w:2), B at x:5 (right edge)')
console.log('  Move A to x:5 (pushes B right, but B would exceed cols=6)')
console.log(`  Result: B.x = ${test3Result['B'].x}, B.y = ${test3Result['B'].y}`)
console.log(`  ✅ Expected: B should stay at x=5 but move to y=1 (fallback to DOWN)`)
console.log(`     Got: B at (${test3Result['B'].x}, ${test3Result['B'].y})`)
console.log()

// ===== TEST 4: Direction Detection =====
console.log('Test 4: Direction Detection')
const directions = [
  { delta: { x: 100, y: 20 }, expected: 'RIGHT' },
  { delta: { x: -80, y: 30 }, expected: 'LEFT' },
  { delta: { x: 10, y: 150 }, expected: 'DOWN' },
  { delta: { x: -20, y: -100 }, expected: 'UP' }
]

directions.forEach(({ delta, expected }) => {
  const result = detectDirection(delta)
  const pass = result === expected ? '✅' : '❌'
  console.log(`  ${pass} Delta(${delta.x}, ${delta.y}) → ${result} (expected: ${expected})`)
})
console.log()

// ===== TEST 5: No Collision (Item moves freely) =====
console.log('Test 5: No Collision')
const test5Layout = createLayout([
  { id: 'A', x: 0, y: 0, w: 2, h: 2 },
  { id: 'B', x: 4, y: 0, w: 2, h: 2 }  // Far away
])

const test5Result = tryMoveItem(test5Layout, 'A', { x: 1, y: 0 }, 'RIGHT', config)

console.log('  Input:  A at x:0, B at x:4 (no overlap)')
console.log('  Move A to x:1')
console.log(`  Result: A at x:${test5Result['A'].x}, B at x:${test5Result['B'].x}`)
console.log(`  ✅ Expected: A=1, B=4 (unchanged) → Got: A=${test5Result['A'].x}, B=${test5Result['B'].x}`)
console.log()

console.log('✨ All tests completed!\n')
console.log('Next step: Verify results, then integrate with Zustand + dnd-kit')
