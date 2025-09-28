# System Patterns

## Layer Diagram
```
┌─────────────────────────────────────┐
│         UI Components               │ ← React Components
├─────────────────────────────────────┤
│       Hooks/Services               │ ← Business Logic
├─────────────────────────────────────┤
│        API Routes                   │ ← Next.js API
├─────────────────────────────────────┤
│      Supabase Client               │ ← Database & Auth
└─────────────────────────────────────┘
```

## Data Flow
1. **UI → Hooks**: User interactions trigger hooks/services
2. **Hooks → API**: Business logic calls Next.js API routes
3. **API → Supabase**: Server-side calls to database/auth
4. **Supabase → Response**: Data flows back through same path

## Key Patterns
- **Layered Architecture**: UI ↔ Hooks/Services ↔ API Routes ↔ Supabase
- **No Direct DB Calls**: UI components không gọi Supabase trực tiếp
- **TypeScript First**: All code phải có type safety
- **Functional Components**: React với hooks pattern

## Integration Points
- **Supabase**: Database, Auth, RLS (Row Level Security)
- **Next.js**: SSR/SSG, API Routes, Image optimization
- **Tailwind CSS**: Utility-first styling
- **TipTap/Quill**: Rich text editing (chọn sau)

## Constraints
- **Security**: Không tin user input, luôn validate & sanitize
- **Performance**: API response < 200ms, board latency < 150ms
- **Scalability**: Design for horizontal scaling
- **Maintainability**: Code phải testable và documented

## Error Handling
- **Global Error Boundary**: Catch React errors
- **API Error Handling**: Consistent error responses
- **User Feedback**: Clear error messages và loading states
- **Logging**: Structured logging cho debugging

## State Management
- **Local State**: React useState/useReducer cho component state
- **Server State**: React Query/SWR cho server data
- **Global State**: Context API cho app-wide settings (theme, user)
