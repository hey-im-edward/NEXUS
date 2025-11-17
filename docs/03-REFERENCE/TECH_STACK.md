# 🏗️ NEXUS TECH STACK - Complete Technical Reference

**Nguồn chính:** [NEXUS_WHITEPAPER.md](../01-STRATEGY/NEXUS_WHITEPAPER.md) (Phần 4.1)

**Cập nhật:** 17 tháng 11, 2025

**Version:** v3.0 (Code First Strategy)

---

## 📊 Stack Overview at a Glance

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
  Dashboard Grid: react-grid-layout v1.5.2 (767+ projects using)
  App Builder: Craft.js (MIT, $11K+ Open Collective funding)
  Drag & Drop: @dnd-kit v6 (accessibility-first)
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

## 🎯 Why This Stack? (Strategic Rationale)

### 1. AI-First Development

**All technologies chosen are AI-friendly:**

- ✅ **Well-documented:** Next.js, React, Supabase have extensive docs
- ✅ **Large training data:** Claude/GPT have seen millions of examples
- ✅ **Clear patterns:** Conventional file structure, established best practices
- ✅ **TypeScript:** Self-documenting, AI can infer types and catch errors

### 2. Speed of Development

**Focus: Ship fast, iterate fast**

- ✅ **No backend code:** Supabase auto-generates REST API + real-time subscriptions
- ✅ **Copy-paste UI:** shadcn/ui means no npm dependency hell
- ✅ **Utility-first CSS:** TailwindCSS = no separate CSS files
- ✅ **Batteries included:** Next.js = routing + SSR + API routes in one

### 3. Cost Efficiency

**Optimize for $0 hosting in MVP phase:**

| Service | Free Tier | Sufficient for |
|---------|-----------|----------------|
| Vercel | 100GB bandwidth, unlimited deploys | 1,000+ users |
| Supabase | 500MB DB, 50K MAU | 1,000+ users |
| Total | **$0/month** | First 1,000 users |

### 4. Scale Path

**Clear upgrade path when needed:**

- Vercel Free → Vercel Pro ($20/month): More bandwidth, priority support
- Supabase Free → Supabase Pro ($25/month): 8GB DB, unlimited MAU
- Add Cloudflare CDN ($0): Reduce Vercel bandwidth usage
- Add Redis (Upstash $0-10): Cache layer if needed

---

## 🎨 FRONTEND STACK (Detailed)

### Next.js 16.0.1

**Release Date:** October 21, 2025

**Why Next.js 16 specifically:**

- ✅ **Turbopack Stable:** 2-5x faster builds, 10x faster Fast Refresh
- ✅ **Cache Components:** New "use cache" directive for granular caching
- ✅ **proxy.ts:** Replaces middleware.ts for cleaner request handling
- ✅ **React 19.2 Integration:** Full support for Server Components
- ✅ **App Router Maturity:** File-based routing, nested layouts, loading states
- ✅ **Next.js DevTools MCP:** AI debugging support (experimental)

**Key Features Used:**

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

**Server Components Strategy:**

- ✅ **Default to Server:** Fetch data on server, reduce client JS
- ✅ **Client when needed:** Use "use client" for interactive components
- ✅ **Streaming:** Use Suspense for progressive rendering

**Performance Optimizations:**

- Image optimization (next/image)
- Font optimization (next/font)
- Route prefetching (automatic)
- Static generation where possible

**Documentation:** [nextjs.org/docs](https://nextjs.org/docs)

---

### React 19.2

**Release Date:** October 2025

**Why React 19.2 specifically:**

- ✅ **Concurrent Rendering Default:** Automatic, no opt-in needed
- ✅ **React Server Components:** Stable, production-ready
- ✅ **useTransition:** Built-in for non-blocking updates
- ✅ **useDeferredValue:** Defer expensive renders
- ✅ **Automatic Batching:** Optimized state updates
- ✅ **Improved Resource Allocation:** Better memory management

**Key Hooks Used:**

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

**Documentation:** [react.dev](https://react.dev/)

---

### TypeScript 5.6 (Strict Mode)

**Why TypeScript:**

- ✅ **Type Safety:** Catch bugs at compile time, not runtime
- ✅ **Better DX:** IntelliSense, autocomplete, inline docs
- ✅ **AI-Assisted Refactoring:** AI can safely refactor typed code
- ✅ **Self-Documenting:** Types serve as inline documentation

**Strict Mode Config:**

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

**Documentation:** [typescriptlang.org/docs](https://www.typescriptlang.org/docs/)

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

**Documentation:** [tailwindcss.com/docs](https://tailwindcss.com/docs)

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

**Documentation:** [ui.shadcn.com](https://ui.shadcn.com/)

---

## 💾 BACKEND & DATABASE (Detailed)

### Supabase (PostgreSQL 15.6)

**Why Supabase:**

- ✅ **PostgreSQL + Auth + Storage + Real-time** in one platform
- ✅ **Auto-generated REST API:** No backend code needed
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

**Documentation:** [supabase.com/docs](https://supabase.com/docs)

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

**Documentation:** [zustand-demo.pmnd.rs](https://zustand-demo.pmnd.rs/)

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

**Documentation:** [tanstack.com/query](https://tanstack.com/query)

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

**Features Used:**

- Drag & drop cards
- Resize cards (min: 3x3, max: 12x8 grid units)
- Responsive breakpoints
- Auto-packing algorithm
- Save layout to Supabase

**Bundle Size:** ~80KB gzipped

**Documentation:** [github.com/react-grid-layout/react-grid-layout](https://github.com/react-grid-layout/react-grid-layout)

---

### Craft.js (App Builder Framework)

**Why Craft.js:**

- ✅ **React-First:** Built for React, TypeScript support
- ✅ **MIT License:** Free, open-source
- ✅ **$11K+ Raised:** Active community on Open Collective
- ✅ **Visual Editor:** Drag-drop components to canvas
- ✅ **Component Tree:** Hierarchical structure
- ✅ **Undo/Redo:** Built-in history
- ✅ **JSON Serialization:** Save/load app definitions

**Use Case:** No-Code App Builder (3-Tier Progressive Disclosure)

**Implementation:**

```typescript
import { Editor, Frame, Element } from '@craftjs/core'
import { TextBlock, Button, TextInput, Container, SimpleList } from './components'

function AppBuilder() {
  return (
    <Editor resolver={{ TextBlock, Button, TextInput, Container, SimpleList }}>
      <Frame>
        <Element is={Container} canvas>
          {/* User drops components here */}
        </Element>
      </Frame>
    </Editor>
  )
}
```

**Component Definition:**

```typescript
// components/TextBlock.tsx
import { useNode } from '@craftjs/core'

export const TextBlock = ({ text, fontSize, color }) => {
  const { connectors: { connect, drag } } = useNode()

  return (
    <div ref={ref => connect(drag(ref))} style={{ fontSize, color }}>
      {text}
    </div>
  )
}

TextBlock.craft = {
  props: {
    text: 'Default text',
    fontSize: '16px',
    color: '#000',
  },
  related: {
    settings: TextBlockSettings, // Properties panel
  },
}
```

**Save/Load:**

```typescript
// Save app definition
const { query } = useEditor()
const json = query.serialize()
await supabase.from('app_minis').insert({ app_definition: json })

// Load app definition
const json = lzstring.decompress(app.app_definition)
editor.actions.deserialize(json)
```

**Bundle Size:** ~50KB gzipped

**Documentation:** [craft.js.org](https://craft.js.org/)

---

### @dnd-kit v6

**Why @dnd-kit:**

- ✅ **Accessibility-First:** Keyboard navigation, screen reader support
- ✅ **Touch Support:** Mobile-friendly
- ✅ **Flexible:** Works with any component
- ✅ **Performance:** GPU-accelerated animations

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

**Bundle Size:** ~60KB gzipped

**Documentation:** [docs.dndkit.com](https://docs.dndkit.com/)

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

**Bundle Size:** ~100KB gzipped

**Documentation:** [tiptap.dev](https://tiptap.dev/)

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

**Bundle Size:** ~10KB gzipped (only functions used)

**Documentation:** [date-fns.org](https://date-fns.org/)

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

**Bundle Size:** ~30KB gzipped

**Documentation:** [github.com/jakubroztocil/rrule](https://github.com/jakubroztocil/rrule)

---

## 🚀 DEPLOYMENT & INFRASTRUCTURE (Detailed)

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

**Documentation:** [vercel.com/docs](https://vercel.com/docs)

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

| Plan | Price | Database | Storage | MAU |
|------|-------|----------|---------|-----|
| Free | $0 | 500MB | 1GB | 50K |
| Pro | $25 | 8GB | 100GB | Unlimited |
| Team | $599 | 100GB | 500GB | Unlimited |

**When to Upgrade:**

- Database > 500MB (lots of apps/tasks)
- MAU > 50K (successful product)
- Need priority support

**Backup Strategy:**

- Daily automatic backups (Pro tier)
- Point-in-time recovery (Pro tier)
- Manual exports (Free tier, via `pg_dump`)

**Documentation:** [supabase.com/docs](https://supabase.com/docs)

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

**Documentation:** [docs.sentry.io](https://docs.sentry.io/)

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

### Why not Vite instead of Next.js?

**Next.js wins because:**

- ✅ Next.js is a **framework** (routing, SSR, API routes built-in)
- ⚠️ Vite is a **build tool** (needs additional setup for routing, SSR)
- ✅ Next.js has better AI code generation (more examples in training data)
- ✅ Next.js has better SEO (Server Components, SSR by default)

**When to use Vite:** Simple SPAs without SSR needs

---

### Why not Redux instead of Zustand?

**Zustand wins because:**

- ✅ **10x simpler:** No actions, no reducers, no boilerplate
- ✅ **Smaller bundle:** ~1KB vs. ~20KB
- ✅ **TypeScript-first:** Full type inference
- ⚠️ Redux is overkill for NEXUS (not a massive state machine)

**When to use Redux:** Large teams, established Redux patterns

---

### Why not build backend with NestJS/Express?

**Supabase wins because:**

- ✅ **Faster:** No need to code auth, RLS, real-time
- ✅ **Free tier:** $0 hosting for first 1,000 users
- ✅ **AI-friendly:** Claude can generate Supabase queries easily
- ✅ **Auto-generated API:** REST + GraphQL included
- ⚠️ NestJS requires backend coding, hosting ($5-20/month), auth setup

**When to use NestJS:** Custom business logic, microservices

---

### Why not MongoDB instead of PostgreSQL?

**PostgreSQL wins because:**

- ✅ **Relational:** Better for structured data (tasks, apps, users)
- ✅ **JSONB support:** Can store JSON when needed
- ✅ **ACID compliant:** Stronger data guarantees
- ✅ **Supabase integration:** Built-in RLS, real-time
- ⚠️ MongoDB is better for unstructured data (not our use case)

**When to use MongoDB:** Highly unstructured data, rapid schema changes

---

### Why not Firebase instead of Supabase?

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

| Version | Date | Changes |
|---------|------|---------|
| v3.0 | 2025-11-17 | Complete rewrite for Code First strategy |
| v2.0 | 2025-10-15 | Added Craft.js, react-grid-layout details |
| v1.0 | 2025-09-01 | Initial tech stack selection |

---

**Cập nhật lần cuối:** 17 tháng 11, 2025

**Nguồn:** NEXUS Whitepaper v3.0 (Phần 4.1)

**Owner:** NEXUS Development Team

**Review tiếp theo:** Sau khi hoàn thành PROMPT 1.1 (kiểm tra library versions)

---

**Remember:** Choose boring technology. Ship fast. Optimize later.
