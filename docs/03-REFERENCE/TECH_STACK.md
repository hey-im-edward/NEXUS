# 🏭 TECH STACK NEXUS - Tài Liệu Kỹ Thuật Toàn Diện

**Nguồn chính:** [NEXUS_WHITEPAPER.md](../01-STRATEGY/NEXUS_WHITEPAPER.md) (Phần 4.1)

**Cập nhật:** 17 tháng 11, 2025

**Version:** v3.0 (Code First Strategy)

---

 > [!IMPORTANT]
> **📌 NGUỒN CHUẨN DUY NHẤT (SOURCE OF TRUTH)** cho mọi quyết định kỹ thuật
>
> **Sau khi cập nhật file này:**
>
> 1. Copy section "Stack Overview at a Glance" (lines 11-55 bên dưới)
> 2. Paste vào `AI_PROMPTS.md` → Section "📚 TECH STACK - Tham Khảo Nhanh"
> 3. Cập nhật timestamp trong `AI_PROMPTS.md`
> 4. Review để đảm bảo YAML syntax đúng (spaces, không tabs)
>
> **Files cần sync thủ công:**
>
> - `AI_PROMPTS.md` (section "TECH STACK - Tham Khảo Nhanh")
>
> **Frequency:** Chỉ khi có major tech stack changes (~1 lần/tháng)

---

## 📊 Tổng Quan Nhanh Về Stack

```yaml
Frontend Framework:
  Core: Next.js 16.0.1 (App Router, Turbopack stable)
  Language: TypeScript 5.6 (Strict Mode enabled)
  UI Library: React 19.2 (Concurrent rendering default)
  Styling: TailwindCSS 4.0 Alpha
  Components: shadcn/ui (copy-paste, fully customizable)

Backend as a Service:
  Platform: Supabase (PostgreSQL 15.6)
  Database: PostgreSQL with Row Level Security (RLS)
  Authentication: Supabase Auth (Google OAuth, Email)
  Storage: Supabase Storage (CDN-enabled)
  Real-time: WebSocket subscriptions

State Management:
  Client State: Zustand v5 + Immer (slice pattern)
  Server State: TanStack Query v5 (React Query)
  Form State: React Hook Form v7

Specialized Libraries:
  Dashboard Grid: react-grid-layout v1.5.0 (verified working)
  App Builder: @dnd-kit v6.3.1 + Zustand (React 19 compatible)
  Drag & Drop: @dnd-kit v6.3.1 + @dnd-kit/sortable v10.0.0
  Rich Text: Tiptap v2 (ProseMirror wrapper)
  Dates: date-fns v3 (tree-shakeable)
  Recurrence: rrule v2 (RFC-5545 compliant)

Deployment:
  Frontend Hosting: Vercel (Edge Network, 300+ locations)
  Backend Hosting: Supabase Cloud (Singapore region)
  CDN: Vercel Edge Network + Supabase CDN
  Domain: Custom domain (.app or .io)

Monitoring:
  Analytics: Vercel Analytics (Web Vitals, page views)
  Errors: Sentry (optional, if needed)
  Logs: Vercel Logs + Supabase Logs

Cost (Estimated):
  MVP Phase: $0-12/month (free tiers + domain)
  Scale Phase: $45-70/month (Vercel Pro + Supabase Pro)
```

---

## 🎯 Tại Sao Tech Stack Này? (Why This Stack? - Strategic Rationale)

### 1. Phát Triển AI-First (AI-First Development)

**Tất cả công nghệ được chọn đều thân thiện với AI:**

- ✅ **Well-documented (Tài liệu tốt):** Next.js, React, Supabase có extensive docs
- ✅ **Large training data (Dữ liệu training lớn):** Claude/GPT đã thấy hàng triệu examples
- ✅ **Clear patterns (Patterns rõ ràng):** Conventional file structure, established best practices
- ✅ **TypeScript:** Self-documenting, AI có thể infer types và catch errors

### 2. Tốc Độ Phát Triển (Speed of Development)

**Tập trung: Ship nhanh, iterate nhanh**

- ✅ **No backend code (Không code backend):** Supabase auto-generates REST API + real-time subscriptions
- ✅ **Copy-paste UI:** shadcn/ui = không npm dependency hell
- ✅ **Utility-first CSS:** TailwindCSS = không cần separate CSS files
- ✅ **Batteries included (Đầy đủ tính năng):** Next.js = routing + SSR + API routes trong một

### 3. Hiệu Quả Chi Phí (Cost Efficiency)

**Tối ưu cho $0 hosting trong MVP phase:**

| Service  | Free Tier                          | Sufficient for    |
| -------- | ---------------------------------- | ----------------- |
| Vercel   | 100GB bandwidth, unlimited deploys | 1,000+ users      |
| Supabase | 500MB DB, 50K MAU                  | 1,000+ users      |
| Total    | **$0/month**                 | First 1,000 users |

### 4. Lộ Trình Mở Rộng (Scale Path)

**Clear upgrade path (Lộ trình nâng cấp rõ ràng) khi cần:**

- Vercel Free → Vercel Pro ($20/month): More bandwidth, priority support
- Supabase Free → Supabase Pro ($25/month): 8GB DB, unlimited MAU
- Add Cloudflare CDN ($0): Giảm Vercel bandwidth usage
- Add Redis (Upstash $0-10): Cache layer nếu cần

---

## 🎨 FRONTEND STACK (Chi Tiết)

### Next.js 16.0.1

**Release Date:** October 21, 2025

**Tại sao chọn Next.js 16 cụ thể (Why Next.js 16 specifically):**

- ✅ **Turbopack Stable:** 2-5x faster builds, 10x faster Fast Refresh
- ✅ **Cache Components:** New "use cache" directive cho granular caching
- ✅ **proxy.ts:** Thay thế middleware.ts cho cleaner request handling
- ✅ **React 19.2 Integration:** Full support cho Server Components
- ✅ **App Router Maturity:** File-based routing, nested layouts, loading states
- ✅ **Next.js DevTools MCP:** AI debugging support (experimental)

**Các Tính Năng Chính Được Sử Dụng (Key Features Used):**

```typescript
// App Router structure
app/
├── dashboard/
│   └── page.tsx              // Dashboard route
├── app-builder/
│   └── page.tsx              // App Builder route
├── marketplace/
│   ├── page.tsx              // Browse page
│   └── [appId]/
│       └── page.tsx          // Dynamic app detail
├── layout.tsx                // Root layout
├── loading.tsx               // Loading UI
└── error.tsx                 // Error boundary
```

**Chiến Lược Server Components (Server Components Strategy):**

- ✅ **Default to Server (Mặc định Server):** Fetch data trên server, giảm client JS
- ✅ **Client when needed (Client khi cần):** Use "use client" cho interactive components
- ✅ **Streaming:** Use Suspense cho progressive rendering

**Tối Ưu Hiệu Suất (Performance Optimizations):**

- Image optimization (next/image)
- Font optimization (next/font)
- Route prefetching (tự động - automatic)
- Static generation nơi có thể

**Tài liệu:** [nextjs.org/docs](https://nextjs.org/docs)

---

### React 19.2

**Release Date:** October 2025

**Tại sao chọn React 19.2 cụ thể (Why React 19.2 specifically):**

- ✅ **Concurrent Rendering Default:** Tự động (Automatic), không cần opt-in
- ✅ **React Server Components:** Stable, production-ready
- ✅ **useTransition:** Built-in cho non-blocking updates
- ✅ **useDeferredValue:** Defer expensive renders
- ✅ **Automatic Batching:** Optimized state updates
- ✅ **Improved Resource Allocation:** Better memory management

**Các Hooks Chính Được Sử Dụng (Key Hooks Used):**

```typescript
// Concurrent features
import { useTransition, useDeferredValue, Suspense } from 'react'

// State management
import { useState, useEffect, useCallback, useMemo } from 'react'

// Context (for theme, user)
import { useContext, createContext } from 'react'
```

**Server Components Pattern:**

```typescript
// Server Component (default)
async function AppList() {
  const apps = await fetchApps() // Direct DB query
  return <div>{apps.map(app => <AppCard key={app.id} {...app} />)}</div>
}

// Client Component (interactive)
'use client'
function AppBuilder() {
  const [state, setState] = useState()
  return <Canvas onDrop={...} />
}
```

**Tài liệu:** [react.dev](https://react.dev/)

---

### TypeScript 5.6 (Strict Mode)

**Tại sao chọn TypeScript (Why TypeScript):**

- ✅ **Type Safety (An toàn kiểu):** Catch bugs tại compile time, không phải runtime
- ✅ **Better DX (Trải nghiệm dev tốt hơn):** IntelliSense, autocomplete, inline docs
- ✅ **AI-Assisted Refactoring (Refactor hỗ trợ AI):** AI có thể refactor typed code an toàn
- ✅ **Self-Documenting (Tự ghi chép):** Types đóng vai trò như inline documentation

**Cấu Hình Strict Mode (Strict Mode Config):**

```json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "strictFunctionTypes": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noImplicitReturns": true
  }
}
```

**Type Patterns Used:**

```typescript
// Database types (auto-generated from Supabase)
import { Database } from '@/types/supabase'
type Task = Database['public']['Tables']['tasks']['Row']

// Component props
interface DashboardGridProps {
  userId: string
  initialLayout: Layout[]
}

// API responses
type ApiResponse<T> =
  | { success: true; data: T }
  | { success: false; error: string }
```

**Tài liệu:** [typescriptlang.org/docs](https://www.typescriptlang.org/docs/)

---

### TailwindCSS 4.0 Alpha

**Why TailwindCSS 4:**

- ✅ **Utility-First:** No separate CSS files, styles in JSX
- ✅ **Fast Prototyping:** Rapid UI development
- ✅ **Small Bundle:** Only used classes included
- ✅ **Consistent Design:** Pre-defined spacing, colors, breakpoints
- ✅ **AI-Friendly:** Easy for AI to generate styled components

**Configuration:**

```javascript
// tailwind.config.js
module.exports = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f0f9ff',
          500: '#3b82f6',
          900: '#1e3a8a',
        },
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
}
```

**Common Patterns:**

```tsx
// Responsive design
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

// Dark mode support
<div className="bg-white dark:bg-gray-900 text-black dark:text-white">

// Custom spacing
<div className="p-4 md:p-6 lg:p-8">
```

**Tài liệu:** [tailwindcss.com/docs](https://tailwindcss.com/docs)

---

### shadcn/ui

**Why shadcn/ui (not a component library):**

- ✅ **Copy-Paste Components:** No npm dependency, full control
- ✅ **Customizable:** Edit component code directly
- ✅ **Accessible:** Built on Radix UI primitives (keyboard nav, ARIA)
- ✅ **30+ Components:** Button, Dialog, Dropdown, Tabs, etc.
- ✅ **TypeScript Native:** Full type safety

**Installation:**

```bash
npx shadcn-ui@latest init
npx shadcn-ui@latest add button dialog dropdown-menu
```

**Components Used:**

- Button (primary, secondary, ghost variants)
- Dialog (modals for app details, publish flow)
- Dropdown Menu (user menu, context menus)
- Tabs (marketplace categories)
- Card (app cards, task cards)
- Form (app metadata, settings)

**Customization:**

```tsx
// Edit directly in components/ui/button.tsx
export const Button = ({ variant = 'default', ...props }) => {
  return <button className={cn(variants[variant])} {...props} />
}
```

**Tài liệu:** [ui.shadcn.com](https://ui.shadcn.com/)

---

## 💾 BACKEND & DATABASE (Chi Tiết)

### Supabase (PostgreSQL 15.6)

**Tại Sao Supabase:**

- ✅ **PostgreSQL + Auth + Storage + Real-time** in one platform
- ✅ **Auto-generated REST API (Tự động tạo API):** Không cần viết backend code
- ✅ **Row Level Security (RLS):** Built-in multi-tenancy
- ✅ **Real-time Subscriptions:** WebSocket support via PostgreSQL triggers
- ✅ **Free Tier:** 500MB DB, 50K MAU, 1GB storage

**Database Schema (11 Tables):**

```sql
-- Core tables
users (Supabase Auth table)
tasks (Task management)
projects (Projects)
kanban_columns (Kanban board state)

-- Platform tables
user_dashboard_layouts (Dashboard grid state)
app_minis (User-created apps)
marketplace_apps (Published apps)
installed_apps (User's installed apps)
app_templates (Pre-built templates)

-- Settings
user_settings (Preferences, theme)
usage_logs (Analytics, telemetry)
```

**Row Level Security (RLS) Example:**

```sql
-- Users can only see their own tasks
CREATE POLICY "Users can view own tasks"
ON tasks FOR SELECT
USING (auth.uid() = user_id);

-- Users can only edit their own apps
CREATE POLICY "Users can edit own apps"
ON app_minis FOR UPDATE
USING (auth.uid() = user_id);
```

**Real-time Subscriptions:**

```typescript
// Subscribe to task updates
const { data, error } = await supabase
  .from('tasks')
  .select('*')
  .eq('user_id', userId)
  .on('INSERT', payload => {
    console.log('New task:', payload.new)
  })
  .subscribe()
```

**Tài liệu:** [supabase.com/docs](https://supabase.com/docs)

---

### Supabase Auth

**Providers Supported:**

- ✅ Email + Password (with email verification)
- ✅ Google OAuth (primary method)
- ✅ GitHub OAuth (optional)
- ✅ Magic Links (passwordless)

**Features:**

- Email verification
- Password reset
- JWT tokens (automatic)
- RLS policies (user_id from JWT)
- Session management

**Implementation:**

```typescript
// Google OAuth sign-in
const { data, error } = await supabase.auth.signInWithOAuth({
  provider: 'google',
  options: {
    redirectTo: `${window.location.origin}/auth/callback`
  }
})

// Get current user
const { data: { user } } = await supabase.auth.getUser()

// Sign out
await supabase.auth.signOut()
```

---

### Supabase Storage

**Use Cases:**

- App screenshots (marketplace)
- User avatars
- App icons

**Storage Buckets:**

```
app-screenshots/    (public bucket)
user-avatars/       (public bucket)
app-icons/          (public bucket)
```

**Upload Example:**

```typescript
// Upload screenshot
const { data, error } = await supabase.storage
  .from('app-screenshots')
  .upload(`${appId}/screenshot.png`, file)

// Get public URL
const { data: { publicUrl } } = supabase.storage
  .from('app-screenshots')
  .getPublicUrl(`${appId}/screenshot.png`)
```

**Free Tier:** 1GB storage, automatic CDN caching

---

## 🔄 STATE MANAGEMENT (Detailed)

### Zustand v5 + Immer

**Why Zustand:**

- ✅ **Simpler than Redux:** No boilerplate, no actions/reducers
- ✅ **TypeScript-First:** Full type inference
- ✅ **Small Bundle:** ~1KB gzipped
- ✅ **DevTools:** Redux DevTools integration

**Slice Pattern:**

```typescript
// store/slices/taskSlice.ts
export const createTaskSlice = (set, get) => ({
  tasks: [],
  addTask: (task) => set(state => ({
    tasks: [...state.tasks, task]
  })),
  updateTask: (id, updates) => set(state => ({
    tasks: state.tasks.map(t => t.id === id ? {...t, ...updates} : t)
  })),
})

// store/index.ts
import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'

export const useStore = create(
  immer((set, get) => ({
    ...createTaskSlice(set, get),
    ...createAppSlice(set, get),
    ...createDashboardSlice(set, get),
  }))
)
```

**Usage in Components:**

```typescript
// Subscribe to specific slice
const tasks = useStore(state => state.tasks)
const addTask = useStore(state => state.addTask)

// Use in component
addTask({ title: 'New task', priority: 'high' })
```

**Tài liệu:** [zustand-demo.pmnd.rs](https://zustand-demo.pmnd.rs/)

---

### TanStack Query v5 (React Query)

**Why TanStack Query:**

- ✅ **Automatic Caching:** Cache data, reduce API calls
- ✅ **Background Refetching:** Keep data fresh
- ✅ **Optimistic Updates:** Update UI before server responds
- ✅ **Infinite Scroll:** Built-in pagination support
- ✅ **Seamless Supabase Integration**

**Setup:**

```typescript
// app/providers.tsx
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000, // 1 minute
      cacheTime: 5 * 60 * 1000, // 5 minutes
    },
  },
})

export function Providers({ children }) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  )
}
```

**Usage:**

```typescript
// Fetch tasks
const { data: tasks, isLoading, error } = useQuery({
  queryKey: ['tasks', userId],
  queryFn: async () => {
    const { data } = await supabase
      .from('tasks')
      .select('*')
      .eq('user_id', userId)
    return data
  },
})

// Mutate (create task)
const mutation = useMutation({
  mutationFn: async (newTask) => {
    const { data } = await supabase.from('tasks').insert(newTask)
    return data
  },
  onSuccess: () => {
    queryClient.invalidateQueries(['tasks'])
  },
})
```

**Tài liệu:** [tanstack.com/query](https://tanstack.com/query)

---

## 🔧 SPECIALIZED LIBRARIES (Detailed)

### react-grid-layout v1.5.2

**Why react-grid-layout:**

- ✅ **Battle-Tested:** 20K+ GitHub stars, 767+ projects using it
- ✅ **Responsive:** Automatic breakpoints (lg/md/sm/xs)
- ✅ **Touch Support:** Works on mobile
- ✅ **Draggable & Resizable:** Core features
- ✅ **Persistent Layouts:** Save/load via JSON
- ✅ **No jQuery:** Pure React

**Use Case:** Dashboard Grid (iOS Home Screen for Productivity)

**Implementation:**

```typescript
import GridLayout from 'react-grid-layout'
import 'react-grid-layout/css/styles.css'

function DashboardGrid() {
  const layout = [
    { i: 'quick-notes', x: 0, y: 0, w: 4, h: 3 },
    { i: 'pomodoro', x: 4, y: 0, w: 4, h: 3 },
    { i: 'today-tasks', x: 8, y: 0, w: 4, h: 6 },
  ]

  return (
    <GridLayout
      className="layout"
      layout={layout}
      cols={12}
      rowHeight={30}
      width={1200}
      onLayoutChange={handleLayoutChange}
    >
      <div key="quick-notes"><QuickNotesApp /></div>
      <div key="pomodoro"><PomodoroApp /></div>
      <div key="today-tasks"><TodayTasksApp /></div>
    </GridLayout>
  )
}
```

**Tính năng Used:**

- Drag & drop cards
- Resize cards (min: 3x3, max: 12x8 grid units)
- Responsive breakpoints
- Auto-packing algorithm
- Save layout to Supabase

**Kích thước bundle:** ~80KB gzipped

**Tài liệu:** [github.com/react-grid-layout/react-grid-layout](https://github.com/react-grid-layout/react-grid-layout)

---

### @dnd-kit App Builder (Tương thích React 19)

**Tại sao chọn @dnd-kit cho App Builder:**

- ✅ **Tương thích React 19.2.0:** Đã verify hoạt động tốt với React mới nhất
- ✅ **Accessibility-First (Ưu tiên khả năng truy cập):** Hỗ trợ điều hướng bàn phím, screen reader (WCAG 2.1 AA)
- ✅ **Touch Support (Hỗ trợ cảm ứng):** Hoạt động trên mobile/tablet
- ✅ **GPU-Accelerated (Tăng tốc GPU):** Animations mượt mà 60fps
- ✅ **Active Maintenance (Đang được bảo trì):** Cập nhật lần cuối tháng 11, 2025
- ✅ **Battle-Tested (Đã kiểm chứng thực tế):** Sử dụng trong KanbanBoard + App Builder

**Trường hợp sử dụng (Trường hợp sử dụng):** No-Code App Builder (thay thế Craft.js)

**Migration Note (Ghi chú về di chuyển công nghệ):**

> 🚨 **Quan trọng:** Ban đầu dự định sử dụng Craft.js (v0.2.12) cho App Builder, nhưng phát hiện vấn đề incompatibility (không tương thích) với React 19.2.0 trong quá trình implement (triển khai) PROMPT 1.4 (19/11/2025). Craft.js drag events (sự kiện kéo thả) không fire (kích hoạt) do breaking changes (thay đổi không tương thích ngược) trong React 19 (ref callback timing, event handler attachment). Đã migrate (di chuyển) sang @dnd-kit + manual Zustand store (~600 dòng code).
> **Trade-off (Đánh đổi):** Nhiều code hơn nhưng đổi lại được React 19 compatibility và hiểu rõ hơn về architecture. Sẽ reconsider (xem xét lại) Craft.js khi có phiên bản tương thích React 19.

**Packages Sử dụng:**

```json
{
  "@dnd-kit/core": "^6.3.1",
  "@dnd-kit/sortable": "^10.0.0",
  "@dnd-kit/utilities": "^3.2.2",
  "zustand": "^5.0.2"
}
```

**Kiến trúc (Architecture):**

**1. Zustand Store (lib/stores/editor.ts - 334 lines):**

```typescript
import { create } from 'zustand'

interface Component {
  id: string
  type: 'TextBlock' | 'Button' | 'Container'
  props: Record<string, unknown>
  children?: string[]
  parent?: string
}

interface EditorState {
  components: Record<string, Component>
  canvasOrder: string[] // Root-level component IDs
  selectedId: string | null
  history: EditorSnapshot[]
  historyIndex: number
  
  addComponent: (component: Component) => void
  updateComponent: (id: string, updates: Partial<Component>) => void
  deleteComponent: (id: string) => void
  moveComponent: (id: string, newIndex: number, newParent?: string) => void
  undo: () => void
  redo: () => void
  clear: () => void
}

const useEditorStore = create<EditorState>((set, get) => ({
  components: {},
  canvasOrder: [],
  // ... implementation (~334 lines total)
}))
```

**2. DndContext Setup (app/app-builder/page.tsx):**

```typescript
import { DndContext, DragOverlay, PointerSensor, useSensor, useSensors } from '@dnd-kit/core'

function AppBuilderPage() {
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 8 } // Prevent accidental drags
    })
  )
  
  const [activeType, setActiveType] = useState<string | null>(null)
  
  const handleDragStart = (event) => {
    setActiveType(event.active.data.current?.type || null)
  }
  
  const handleDragEnd = (event) => {
    // Logic to add/move components
    setActiveType(null)
  }
  
  return (
    <DndContext sensors={sensors} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      <Toolbar />
      <div className="flex-1 flex">
        <ComponentPalette />  {/* useDraggable */}
        <Canvas />             {/* SortableContext */}
        <PropertiesPanel />
      </div>
      <DragOverlay>
        {activeType ? <ComponentPreview type={activeType} /> : null}
      </DragOverlay>
    </DndContext>
  )
}
```

**3. Canvas with SortableContext (components/app-builder/Canvas.tsx):**

```typescript
import { useDroppable } from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'

function Canvas() {
  const { components, canvasOrder } = useEditorStore()
  const rootComponents = canvasOrder.map(id => components[id])
  
  const { setNodeRef: setEmptyRef } = useDroppable({ id: 'canvas-empty' })
  
  return (
    <div className="canvas">
      <SortableContext id="canvas-root" items={rootComponents.map(c => c.id)} strategy={verticalListSortingStrategy}>
        {rootComponents.map(component => (
          <RenderedComponent key={component.id} componentId={component.id} />
        ))}
      </SortableContext>
    
      {rootComponents.length === 0 && (
        <div ref={setEmptyRef} id="canvas-empty">
          Drop components here to get started
        </div>
      )}
    </div>
  )
}
```

**4. Sortable Components (components/app-builder/RenderedComponent.tsx):**

```typescript
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

function RenderedComponent({ componentId }) {
  const component = useEditorStore(state => state.components[componentId])
  const selectComponent = useEditorStore(state => state.selectComponent)
  
  const {
    setNodeRef,
    setActivatorNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({
    id: componentId,
    data: {
      type: component.type,
      parentId: component.parent
    }
  })
  
  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1
  }
  
  // Nested SortableContext for Container children
  if (component.type === 'Container' && component.children?.length > 0) {
    return (
      <div ref={setNodeRef} style={style}>
        <div ref={setActivatorNodeRef}>Drag handle</div>
        <SortableContext items={component.children}>
          {component.children.map(childId => (
            <RenderedComponent key={childId} componentId={childId} />
          ))}
        </SortableContext>
      </div>
    )
  }
  
  return (
    <div ref={setNodeRef} style={style} onClick={() => selectComponent(componentId)}>
      {/* Render component based on type */}
    </div>
  )
}
```

**5. Component Palette (components/app-builder/ComponentPalette.tsx):**

```typescript
import { useDraggable } from '@dnd-kit/core'

function ComponentPalette() {
  const componentTypes = ['TextBlock', 'Button', 'Container']
  
  return (
    <div className="palette">
      {componentTypes.map(type => (
        <DraggableComponent key={type} type={type} />
      ))}
    </div>
  )
}

function DraggableComponent({ type }) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: `palette-${type}`,
    data: { type }
  })
  
  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      className={isDragging ? 'dragging' : ''}
    >
      {type}
    </div>
  )
}
```

**Tính năng đã triển khai:**

- ✅ Kéo từ palette vào canvas
- ✅ Sắp xếp lại thứ tự (root + nested)
- ✅ Quản lý cây component (quan hệ parent/child)
- ✅ Hệ thống Undo/Redo (history array + historyIndex)
- ✅ Properties panel (chỉnh sửa props của component)
- ✅ Xóa component (đệ quy cho Container children)
- ✅ 3 component cơ bản: TextBlock, Button, Container

**Files đã tạo (PROMPT 1.4):**

```text
frontend/app/app-builder/page.tsx (142 lines)
frontend/components/app-builder/Canvas.tsx (67 lines)
frontend/components/app-builder/RenderedComponent.tsx (157 lines)
frontend/components/app-builder/ComponentPalette.tsx (91 lines)
frontend/components/app-builder/PropertiesPanel.tsx (164 lines)
frontend/components/app-builder/Toolbar.tsx (98 lines)
frontend/lib/stores/editor.ts (334 lines) - Zustand store
frontend/components/app-builder/DndKitDiagnostic.tsx
```

**Kích thước bundle:** ~65KB total (@dnd-kit ~60KB + Zustand ~5KB)

**So sánh với Craft.js:**

| Tiêu chí                  | @dnd-kit + Zustand                    | Craft.js                    |
| --------------------------- | ------------------------------------- | --------------------------- |
| **Hỗ trợ React 19** | ✅ Có (đã verify)                  | ❌ Không (v0.2.12)         |
| **Code cần viết**   | ~600 dòng (manual)                   | ~200 dòng (hooks)          |
| **Bundle Size**       | ~65KB                                 | ~50KB                       |
| **Độ khó học**    | Trung bình (kiểm soát nhiều hơn) | Thấp (đã abstracted)     |
| **Tính linh hoạt**  | Cao (manual tree)                     | Trung bình (Frame/Element) |
| **Cộng đồng**      | 10K+ stars                            | 7K+ stars                   |

**Cân nhắc tương lai:**

> Khi Craft.js phát hành phiên bản tương thích React 19, sẽ đánh giá việc migrate ngược lại để tận dụng các tính năng built-in (Frame/Element abstractions, built-in undo/redo, JSON serialization helpers). Hiện tại, @dnd-kit + Zustand cung cấp React 19 compatibility đã được chứng minh và kiểm soát architecture đầy đủ.

**Tài liệu:** [docs.dndkit.com](https://docs.dndkit.com/)

---

### @dnd-kit v6

**Why @dnd-kit:**

- ✅ **Accessibility-First:** Keyboard navigation, screen reader support
- ✅ **Touch Support:** Mobile-friendly
- ✅ **Flexible:** Works with any component
- ✅ **Hiệu suất:** GPU-accelerated animations

**Use Cases:**

- Kanban board (drag tasks between columns)
- Component palette (drag components to canvas)
- Dashboard grid (alternative to react-grid-layout if needed)

**Implementation:**

```typescript
import { DndContext, closestCenter } from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'

function KanbanBoard() {
  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={tasks} strategy={verticalListSortingStrategy}>
        {tasks.map(task => (
          <SortableTaskCard key={task.id} {...task} />
        ))}
      </SortableContext>
    </DndContext>
  )
}
```

**Kích thước bundle:** ~60KB gzipped

**Tài liệu:** [docs.dndkit.com](https://docs.dndkit.com/)

---

### Tiptap v2 (Rich Text Editor)

**Why Tiptap:**

- ✅ **Headless:** Fully customizable UI
- ✅ **ProseMirror Wrapper:** Powerful, flexible
- ✅ **React Integration:** Native React components
- ✅ **Extensions:** Bold, italic, lists, links, etc.

**Use Cases:**

- App descriptions (marketplace)
- Documentation editor
- Rich notes (future feature)

**Implementation:**

```typescript
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'

function RichTextEditor() {
  const editor = useEditor({
    extensions: [StarterKit],
    content: '<p>Hello World!</p>',
  })

  return <EditorContent editor={editor} />
}
```

**Kích thước bundle:** ~100KB gzipped

**Tài liệu:** [tiptap.dev](https://tiptap.dev/)

---

### date-fns v3

**Why date-fns:**

- ✅ **Modular:** Import only functions you use (tree-shakeable)
- ✅ **Immutable:** No mutations, predictable
- ✅ **TypeScript Support:** Full type definitions

**Use Cases:**

- Date formatting ("Today", "Yesterday", "Mar 15")
- Due date calculations
- Task recurrence

**Implementation:**

```typescript
import { format, isToday, isYesterday, addDays } from 'date-fns'

// Format date
format(new Date(), 'MMM dd, yyyy') // "Nov 17, 2025"

// Check if today
isToday(task.dueDate) // true/false

// Add days
const nextWeek = addDays(new Date(), 7)
```

**Kích thước bundle:** ~10KB gzipped (only functions used)

**Tài liệu:** [date-fns.org](https://date-fns.org/)

---

### rrule v2 (Recurrence Rules)

**Why rrule:**

- ✅ **RFC 5545 Compliant:** iCalendar standard
- ✅ **Powerful Patterns:** Daily, weekly, monthly, custom

**Use Cases:**

- Task recurrence (daily, weekly, monthly)
- Event scheduling

**Implementation:**

```typescript
import { RRule } from 'rrule'

// Every Monday
const rule = new RRule({
  freq: RRule.WEEKLY,
  byweekday: [RRule.MO],
  dtstart: new Date(),
})

rule.all() // Get all occurrences
rule.between(start, end) // Get occurrences in range
```

**Kích thước bundle:** ~30KB gzipped

**Tài liệu:** [github.com/jakubroztocil/rrule](https://github.com/jakubroztocil/rrule)

---

## 🚀 DEPLOYMENT & INFRASTRUCTURE (Chi Tiết)

### Vercel (Frontend Hosting)

**Why Vercel:**

- ✅ **Zero-Config:** Deploy with `git push`
- ✅ **Global CDN:** 300+ edge locations worldwide
- ✅ **Automatic HTTPS:** SSL certificates included
- ✅ **Preview Deployments:** Every PR gets a unique URL
- ✅ **Edge Functions:** Run code at the edge
- ✅ **Analytics:** Web Vitals, page views included

**Free Tier:**

- 100GB bandwidth/month
- Unlimited deployments
- Unlimited team members
- Analytics included

**Deployment:**

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Production deploy
vercel --prod
```

**Environment Variables:**

```
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=xxx
```

**Cost:**

- MVP: $0/month (Free tier)
- Scale: $20/month (Pro tier, if needed)

**Tài liệu:** [vercel.com/docs](https://vercel.com/docs)

---

### Supabase Cloud (Backend Hosting)

**Region:** Singapore (closest to Vietnam)

**Free Tier:**

- 500MB database
- 1GB storage
- 50K monthly active users (MAU)
- 2GB bandwidth/month
- Unlimited API requests

**Upgrade Path:**

| Plan | Price | Database | Storage | MAU       |
| ---- | ----- | -------- | ------- | --------- |
| Free | $0    | 500MB    | 1GB     | 50K       |
| Pro  | $25   | 8GB      | 100GB   | Unlimited |
| Team | $599  | 100GB    | 500GB   | Unlimited |

**When to Upgrade:**

- Database > 500MB (lots of apps/tasks)
- MAU > 50K (successful product)
- Need priority support

**Backup Strategy:**

- Daily automatic backups (Pro tier)
- Point-in-time recovery (Pro tier)
- Manual exports (Free tier, via `pg_dump`)

**Tài liệu:** [supabase.com/docs](https://supabase.com/docs)

---

### Domain & DNS

**Domain Options:**

- nexus.app (~$20/year on Namecheap)
- nexus.io (~$40/year)
- tryNEXUS.com (~$12/year)

**DNS:**

- Vercel DNS (automatic setup)
- Cloudflare DNS (optional, for advanced features)

**SSL:**

- Automatic via Vercel/Cloudflare
- Let's Encrypt certificates
- Auto-renewal

---

## 📊 MONITORING & ANALYTICS (Detailed)

### Vercel Analytics

**Metrics Tracked:**

- Page views
- Unique visitors
- Core Web Vitals (LCP, FID, CLS)
- Top pages
- Top referrers
- Device breakdown (desktop/mobile)

**Setup:** Automatic, no code needed

**Cost:** Included in free tier

---

### Supabase Dashboard

**Metrics Tracked:**

- Database queries (count, duration)
- Storage usage (files, bandwidth)
- Auth events (sign-ups, sign-ins)
- API requests (count, latency)

**Setup:** Automatic, built-in dashboard

**Cost:** Included in free tier

---

### Sentry (Optional, Error Tracking)

**Why Sentry:**

- ✅ Real-time error alerts
- ✅ Stack traces with source maps
- ✅ User feedback on errors
- ✅ Performance monitoring

**Free Tier:** 5K errors/month

**Setup:**

```bash
npm install @sentry/nextjs
npx @sentry/wizard@latest -i nextjs
```

**Cost:**

- Free: 5K errors/month
- Team: $26/month (50K errors)

**Tài liệu:** [docs.sentry.io](https://docs.sentry.io/)

---

## 💰 COST BREAKDOWN (Detailed)

### MVP Phase (0-1K Users)

**Hosting:**

```text
Vercel (Frontend):           $0/month   (Free tier)
Supabase (Backend):          $0/month   (Free tier)
Domain (nexus.app):          $1/month   ($12/year)
Sentry (Errors, optional):   $0/month   (Free tier)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
TOTAL:                       $1/month   ✅
```

**Sufficient for:**

- 1,000 users
- 500MB database
- 100GB bandwidth
- Unlimited deployments

---

### Scale Phase (1K-10K Users)

**Hosting:**

```text
Vercel Pro (Frontend):       $20/month  (More bandwidth, priority support)
Supabase Pro (Backend):      $25/month  (8GB DB, unlimited MAU)
Domain:                      $1/month   (Same)
Sentry Team (Errors):        $26/month  (50K errors, optional)
Cloudflare CDN:              $0/month   (Free tier)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
TOTAL:                       $46-72/month
```

**Sufficient for:**

- 10,000 users
- 8GB database
- Unlimited bandwidth (via Cloudflare)
- Daily backups

---

### Growth Phase (10K-100K Users)

**Hosting:**

```text
Vercel Pro:                  $20/month
Supabase Pro:                $25/month
Cloudflare Pro:              $20/month  (Advanced CDN, DDoS protection)
Sentry Team:                 $26/month
Redis (Upstash):             $10/month  (Cache layer)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
TOTAL:                       $101/month
```

**Sufficient for:**

- 100,000 users
- 8GB database (or upgrade to Team tier)
- Global CDN
- Cache layer for performance

---

## 🎯 TECH STACK DECISIONS (FAQs)

### Tại Sao Chọn not Vite instead of Next.js?

**Next.js wins because:**

- ✅ Next.js is a **framework** (routing, SSR, API routes built-in)
- ⚠️ Vite is a **build tool** (needs additional setup for routing, SSR)
- ✅ Next.js has better AI code generation (more examples in training data)
- ✅ Next.js has better SEO (Server Components, SSR by default)

**When to use Vite:** Simple SPAs without SSR needs

---

### Tại Sao Chọn not Redux instead of Zustand?

**Zustand wins because:**

- ✅ **10x simpler:** No actions, no reducers, no boilerplate
- ✅ **Smaller bundle:** ~1KB vs. ~20KB
- ✅ **TypeScript-first:** Full type inference
- ⚠️ Redux is overkill for NEXUS (not a massive state machine)

**When to use Redux:** Large teams, established Redux patterns

---

### Tại Sao Chọn not build backend with NestJS/Express?

**Supabase wins because:**

- ✅ **Faster:** No need to code auth, RLS, real-time
- ✅ **Free tier:** $0 hosting for first 1,000 users
- ✅ **AI-friendly:** Claude can generate Supabase queries easily
- ✅ **Auto-generated API:** REST + GraphQL included
- ⚠️ NestJS requires backend coding, hosting ($5-20/month), auth setup

**When to use NestJS:** Custom business logic, microservices

---

### Tại Sao Chọn not MongoDB instead of PostgreSQL?

**PostgreSQL wins because:**

- ✅ **Relational:** Better for structured data (tasks, apps, users)
- ✅ **JSONB support:** Can store JSON when needed
- ✅ **ACID compliant:** Stronger data guarantees
- ✅ **Supabase integration:** Built-in RLS, real-time
- ⚠️ MongoDB is better for unstructured data (not our use case)

**When to use MongoDB:** Highly unstructured data, rapid schema changes

---

### Tại Sao Chọn not Firebase instead of Supabase?

**Supabase wins because:**

- ✅ **PostgreSQL:** Full SQL, better queries
- ✅ **Open-source:** Self-hostable if needed
- ✅ **Better DX:** SQL is more powerful than Firestore queries
- ✅ **Cheaper:** Free tier more generous
- ⚠️ Firebase is better for mobile-first apps (offline sync)

**When to use Firebase:** Mobile apps, offline-first

---

## 🔄 MIGRATION PATH (Future-Proofing)

### If Supabase Becomes Too Expensive

**Option 1: Self-Host Supabase**

- Deploy on DigitalOcean/AWS ($10-50/month)
- Use open-source Supabase (Docker)
- Keep same code, just change connection string

**Option 2: Migrate to Neon/PlanetScale**

- Export PostgreSQL data
- Import to Neon (serverless Postgres)
- Update connection string
- Keep Supabase Auth (separate service)

---

### If Vercel Becomes Too Expensive

**Option 1: Move to Netlify**

- Similar DX, similar pricing
- Export Next.js site
- Deploy to Netlify

**Option 2: Self-Host on Cloudflare Pages**

- Free tier: Unlimited bandwidth
- Deploy Next.js via `@cloudflare/next-on-pages`
- Edge functions at 300+ locations

---

## 📚 DOCUMENTATION LINKS

### Official Docs

- **Next.js:** [nextjs.org/docs](https://nextjs.org/docs)
- **React:** [react.dev](https://react.dev/)
- **TypeScript:** [typescriptlang.org/docs](https://www.typescriptlang.org/docs/)
- **TailwindCSS:** [tailwindcss.com/docs](https://tailwindcss.com/docs)
- **shadcn/ui:** [ui.shadcn.com](https://ui.shadcn.com/)
- **Supabase:** [supabase.com/docs](https://supabase.com/docs)
- **Zustand:** [zustand-demo.pmnd.rs](https://zustand-demo.pmnd.rs/)
- **TanStack Query:** [tanstack.com/query](https://tanstack.com/query)

### Specialized Libraries

- **react-grid-layout:** [github.com/react-grid-layout/react-grid-layout](https://github.com/react-grid-layout/react-grid-layout)
- **Craft.js:** [craft.js.org](https://craft.js.org/)
- **@dnd-kit:** [docs.dndkit.com](https://docs.dndkit.com/)
- **Tiptap:** [tiptap.dev](https://tiptap.dev/)
- **date-fns:** [date-fns.org](https://date-fns.org/)
- **rrule:** [github.com/jakubroztocil/rrule](https://github.com/jakubroztocil/rrule)

### Deployment

- **Vercel:** [vercel.com/docs](https://vercel.com/docs)
- **Supabase Cloud:** [supabase.com/docs/guides/platform](https://supabase.com/docs/guides/platform)
- **Cloudflare:** [developers.cloudflare.com](https://developers.cloudflare.com/)

---

## 🚦 Version History

| Version | Date       | Changes                                   |
| ------- | ---------- | ----------------------------------------- |
| v3.0    | 2025-11-17 | Complete rewrite for Code First strategy  |
| v2.0    | 2025-10-15 | Added Craft.js, react-grid-layout details |
| v1.0    | 2025-09-01 | Initial tech stack selection              |

---

**Cập nhật lần cuối:** 17 tháng 11, 2025

**Nguồn:** NEXUS Whitepaper v3.0 (Phần 4.1)

**Owner:** NEXUS Development Team

**Review tiếp theo:** Sau khi hoàn thành PROMPT 1.1 (kiểm tra library versions)

---

**Remember:** Choose boring technology. Ship fast. Optimize later.
