# Elastic Grid Engine

**Logic-first 2D grid system** với recursive push algorithm, built với @dnd-kit + Zustand.

## 📦 Architecture

```plaintext
lib/grid/
├── types.ts                    # Core type definitions
├── utils.ts                    # Collision detection utilities  
├── physics-engine.ts           # Recursive push algorithm (TESTED ✅)
├── collision-strategy.ts       # 50% overlap threshold for dnd-kit
├── store.ts                    # Zustand double-buffer state
└── __tests__/
    └── physics-engine.test.ts  # Unit tests (all passing)
```

## 🎯 Key Features

- **Recursive Push**: Item A pushes B, B pushes C (chain reaction)
- **Edge Fallback**: Horizontal push at boundary falls back to vertical
- **50% Threshold**: Collision only triggers when overlap > 50% of active item
- **Double-Buffer**: Committed vs projection layout for smooth snapback
- **Infinite Scroll**: Dynamic container height

## 🧪 Testing

```bash
# Run unit tests
npx tsx lib/grid/__tests__/physics-engine.test.ts
```

All 5 tests passing ✅

## 📚 Usage

See `components/dashboard/CustomGridContainer.tsx` for integration example.
