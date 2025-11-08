# 🏗️ TECH STACK - Công nghệ sử dụng

> **Mục đích:** Giải thích TẤT CẢ công nghệ trong dự án NEXUS - Tại sao dùng, cách hoạt động, ưu/nhược điểm.

**Cập nhật:** 8 tháng 11, 2025  
**Trình độ:** Người mới bắt đầu → Hiểu được

---

## 📚 **MỤC LỤC**

1. [Frontend Framework](#1-frontend-framework)
2. [Backend & Database](#2-backend--database)
3. [UI Components & Styling](#3-ui-components--styling)
4. [State Management](#4-state-management)
5. [Specialized Libraries](#5-specialized-libraries)
6. [Development Tools](#6-development-tools)

---

## 1. 🎨 **FRONTEND FRAMEWORK**

### **Next.js 16.0.1 (App Router)**

**Là gì:**  
Framework React để build web app production-ready.

**Tại sao dùng:**
- ✅ **File-based routing** - Tạo file = tự động có route
  - `app/today/page.tsx` → `/today` URL
  - Không cần config router như React Router
- ✅ **Server Components** - Render phía server, nhanh hơn
- ✅ **SEO built-in** - Google dễ index hơn
- ✅ **API Routes** - Backend + Frontend trong 1 project
- ✅ **Turbopack** - Build nhanh hơn Webpack 700%

**Nhược điểm:**
- ⚠️ Học curve cao hơn Create React App
- ⚠️ App Router mới (từ v13), ít tutorial tiếng Việt

**Ví dụ code:**
```tsx
// app/today/page.tsx
export default function TodayPage() {
  return <h1>My Day</h1>
}
// Tự động có route /today - KHÔNG CẦN CONFIG!
```

**Đọc thêm:**  
- Docs: https://nextjs.org/docs
- Tutorial: "Next.js 15 App Router Tutorial" (YouTube)

---

### **React 19**

**Là gì:**  
Thư viện JavaScript để build UI (User Interface).

**Tại sao dùng:**
- ✅ **Component-based** - Chia UI thành các component nhỏ, dễ maintain
- ✅ **Declarative** - Viết "UI trông như thế nào", không phải "làm gì để có UI đó"
- ✅ **Ecosystem lớn** - Có library cho mọi thứ
- ✅ **Hooks** - `useState`, `useEffect` giúp logic đơn giản

**Nhược điểm:**
- ⚠️ Re-render nhiều nếu không optimize
- ⚠️ Hooks rules khó nhớ (phải follow strict)

**Ví dụ code:**
```tsx
import { useState } from 'react'

function TaskItem() {
  const [completed, setCompleted] = useState(false)
  
  return (
    <div onClick={() => setCompleted(!completed)}>
      {completed ? '✅' : '⬜'} Buy milk
    </div>
  )
}
```

---

### **TypeScript (Strict Mode)**

**Là gì:**  
JavaScript + Types (kiểu dữ liệu).

**Tại sao dùng:**
- ✅ **Catch bugs sớm** - Lỗi hiện ở editor thay vì runtime
- ✅ **Auto-complete tốt** - VS Code gợi ý chính xác
- ✅ **Refactor an toàn** - Đổi tên function, TS tự update mọi nơi
- ✅ **Document code** - Type = comment tự động

**Nhược điểm:**
- ⚠️ Viết code lâu hơn 10-20% (phải define types)
- ⚠️ Học curve cao cho người mới

**Ví dụ code:**
```typescript
// Không có TypeScript
function addTask(task) {
  // task là gì? string? object? 🤷
}

// Có TypeScript
interface Task {
  id: string
  title: string
  completed: boolean
}

function addTask(task: Task) {
  // VS Code biết task.title là string
  // Lỗi nếu bạn viết task.titel (typo)
}
```

---

## 2. 💾 **BACKEND & DATABASE**

### **Supabase (PostgreSQL + Auth + Storage)**

**Là gì:**  
"Firebase nhưng dùng PostgreSQL" - Backend-as-a-Service.

**Tại sao dùng:**
- ✅ **Không cần code backend** - Auth, Database, Storage out-of-the-box
- ✅ **PostgreSQL** - SQL database mạnh, không giới hạn queries
- ✅ **Row Level Security (RLS)** - Bảo mật multi-tenant tự động
- ✅ **Real-time** - Subscribe changes trong database
- ✅ **Free tier** - 500MB DB, 50K users - Đủ cho 1000 users đầu

**Nhược điểm:**
- ⚠️ Vendor lock-in (khó migrate ra nếu sau này cần)
- ⚠️ RLS policies khó debug

**Tại sao KHÔNG dùng NestJS/Express backend:**
- ❌ Phải setup server, deploy, DevOps
- ❌ Viết auth từ đầu (tốn 2-3 tuần)
- ❌ Chi phí server ($5-20/tháng)
- ❌ AI khó generate backend code chính xác

**Ví dụ code:**
```typescript
// Fetch tasks từ database (1 dòng!)
const { data: tasks } = await supabase
  .from('tasks')
  .select('*')
  .eq('workspace_id', workspaceId)

// Không cần Express, routes, controllers!
```

**Database Schema:**
```sql
-- 11 tables
tasks, projects, pages, tags, workspaces, 
users, workspace_members, task_tags, 
app_minis, time_blocks, recurring_patterns

-- Xem chi tiết: docs/04_technical/architecture/database-schema-v2-productivity.sql
```

---

## 3. 🎨 **UI COMPONENTS & STYLING**

### **Tailwind CSS 4**

**Là gì:**  
Utility-first CSS framework.

**Tại sao dùng:**
- ✅ **Không phải đặt tên class** - Dùng `flex`, `mt-4`, `bg-blue-500`
- ✅ **Responsive dễ** - `md:flex-col`, `lg:grid-cols-3`
- ✅ **Không bị conflict CSS** - Mọi style inline, không global
- ✅ **File CSS nhỏ** - Chỉ ship class bạn dùng
- ✅ **AI-friendly** - AI biết Tailwind, generate code chính xác

**Nhược điểm:**
- ⚠️ HTML dài (nhiều class names)
- ⚠️ Phải nhớ class names (hoặc dùng VS Code extension)

**Ví dụ code:**
```tsx
// Không dùng Tailwind
<div className="task-card">
  <h2 className="task-title">Buy milk</h2>
</div>

// CSS riêng:
// .task-card { padding: 1rem; background: white; ... }
// .task-title { font-size: 1.25rem; ... }

// Dùng Tailwind
<div className="p-4 bg-white rounded-lg shadow-md">
  <h2 className="text-xl font-semibold">Buy milk</h2>
</div>
// Không cần file CSS riêng!
```

---

### **shadcn/ui**

**Là gì:**  
Component library - NHƯNG không phải npm package!

**Tại sao dùng:**
- ✅ **Copy-paste components** - Không vào `node_modules`
- ✅ **Full control** - Edit code thoải mái
- ✅ **Tailwind + Radix UI** - Accessible, đẹp, customizable
- ✅ **30+ components** - Button, Dialog, Dropdown, Calendar, etc.

**So sánh với Material UI:**
- ❌ MUI: Import từ package, khó customize
- ✅ shadcn/ui: Code trong project, edit thoải mái

**Ví dụ code:**
```bash
# Install component (copy vào project)
npx shadcn-ui@latest add button

# Tạo file: components/ui/button.tsx
# Giờ bạn sở hữu code, edit thoải mái!
```

```tsx
import { Button } from '@/components/ui/button'

<Button variant="destructive" size="lg">
  Delete Task
</Button>
```

---

## 4. 🔄 **STATE MANAGEMENT**

### **Zustand + Immer**

**Là gì:**  
- **Zustand:** State management library (thay Redux)
- **Immer:** Write "mutable" code → Tự động immutable

**Tại sao dùng:**
- ✅ **Đơn giản hơn Redux 10 lần** - Không boilerplate
- ✅ **Optimistic updates dễ** - UI update ngay, sync sau
- ✅ **TypeScript-first** - Auto-complete tốt
- ✅ **Immer magic** - Viết `task.completed = true` thay vì `{ ...task, completed: true }`

**Nhược điểm:**
- ⚠️ Ít tutorial tiếng Việt
- ⚠️ Debug khó hơn Redux DevTools

**Ví dụ code:**
```typescript
// Tạo store với Zustand + Immer
import create from 'zustand'
import { immer } from 'zustand/middleware/immer'

interface TaskStore {
  tasks: Task[]
  toggleTask: (id: string) => void
}

export const useTaskStore = create<TaskStore>()(
  immer((set) => ({
    tasks: [],
    
    // Immer cho phép viết mutable-looking code
    toggleTask: (id) => set((state) => {
      const task = state.tasks.find(t => t.id === id)
      if (task) {
        task.completed = !task.completed // Trông mutable nhưng thật ra immutable!
      }
    }),
  }))
)

// Dùng trong component
function TaskItem({ id }) {
  const toggleTask = useTaskStore(state => state.toggleTask)
  
  return <button onClick={() => toggleTask(id)}>Toggle</button>
}
```

---

## 5. 🔧 **SPECIALIZED LIBRARIES**

### **rrule (RFC-5545 Recurring Tasks)**

**Là gì:**  
Library xử lý recurring patterns (lặp lại).

**Tại sao dùng:**
- ✅ **Chuẩn quốc tế RFC-5545** - Google Calendar, Outlook đều dùng
- ✅ **Flexible patterns:**
  - "Every 2 days"
  - "Last Friday of every month"
  - "Weekdays only"
  - "3 times per week"
- ✅ **Calculate next occurrence** - Biết task lặp lại khi nào

**Ví dụ code:**
```javascript
import { RRule } from 'rrule'

// "Every Monday and Thursday"
const rule = new RRule({
  freq: RRule.WEEKLY,
  byweekday: [RRule.MO, RRule.TH],
  dtstart: new Date(2025, 0, 1),
})

rule.all() // [Jan 2, Jan 6, Jan 9, Jan 13, ...]
```

---

### **@dnd-kit (Drag & Drop)**

**Là gì:**  
Modern drag-and-drop library cho React.

**Tại sao dùng:**
- ✅ **Accessible** - Screen reader friendly
- ✅ **Performant** - Smooth trên mobile
- ✅ **Touch support** - Drag trên điện thoại
- ✅ **Flexible** - List, grid, tree, kanban board

**So sánh react-beautiful-dnd:**
- ❌ rbd: Deprecated, không update nữa
- ✅ @dnd-kit: Active development, modern

**Ví dụ use case:**
- Kanban board: Drag task từ TODO → IN PROGRESS
- Task list: Reorder tasks by drag

---

### **Tiptap (Rich Text Editor)**

**Là gì:**  
Headless rich text editor (như Notion/Google Docs).

**Tại sao dùng:**
- ✅ **Headless** - Bạn control UI 100%
- ✅ **Extensible** - Add custom nodes (task list, table, etc.)
- ✅ **React-first** - Hooks, components
- ✅ **Markdown support** - `**bold**` → **bold**

**So sánh Draft.js / Slate.js:**
- ❌ Draft.js: Facebook deprecated
- ⚠️ Slate.js: Quá low-level, phức tạp
- ✅ Tiptap: Balance giữa flexibility và ease-of-use

**Ví dụ use case:**
- Pages editor (like Notion)
- Task description (rich text)

---

### **react-big-calendar**

**Là gì:**  
Google Calendar-like component.

**Tại sao dùng:**
- ✅ **Month/Week/Day views**
- ✅ **Drag events** - Move tasks on calendar
- ✅ **Time blocking** - Schedule tasks as events

**Ví dụ use case:**
- Calendar view: Xem tasks theo ngày/tuần/tháng

---

### **date-fns**

**Là gì:**  
Modern date utility library.

**Tại sao dùng:**
- ✅ **Immutable** - Không mutate dates
- ✅ **Tree-shakable** - Import chỉ function cần dùng
- ✅ **TypeScript** - Full type safety

**So sánh Moment.js:**
- ❌ Moment.js: Deprecated, mutable, bundle size lớn
- ✅ date-fns: Modern, recommended

**Ví dụ code:**
```typescript
import { format, addDays, isToday } from 'date-fns'

format(new Date(), 'dd/MM/yyyy') // "08/11/2025"
addDays(new Date(), 3) // 3 ngày sau
isToday(task.dueDate) // true/false
```

---

## 6. 🛠️ **DEVELOPMENT TOOLS**

### **react-hotkeys-hook**

**Là gì:**  
Keyboard shortcuts cho React.

**Tại sao dùng:**
- ✅ **Easy API** - `useHotkeys('j', goDown)`
- ✅ **Global + Local scopes**
- ✅ **Combos** - `Ctrl+K`, `Cmd+Shift+P`

**Ví dụ use case:**
- `j/k` - Navigate tasks (như Gmail)
- `x` - Toggle complete
- `Cmd+K` - Command palette

---

### **cmdk (Command Palette)**

**Là gì:**  
Command palette component (như VS Code `Cmd+Shift+P`).

**Tại sao dùng:**
- ✅ **Keyboard-first** - Power users love it
- ✅ **Fuzzy search** - Type "crtsk" → "Create Task"
- ✅ **Accessible** - Screen reader friendly

**Ví dụ use case:**
- `Cmd+K` → Search/create tasks
- Quick actions without mouse

---

## 📊 **TÓM TẮT - STACK ĐẦY ĐỦ**

```yaml
Frontend:
  Framework: Next.js 16.0.1 (App Router, Turbopack)
  Language: TypeScript (Strict Mode)
  UI Library: React 19
  Styling: Tailwind CSS 4
  Components: shadcn/ui (30+ components)
  State: Zustand + Immer

Backend:
  BaaS: Supabase
  Database: PostgreSQL (11 tables)
  Auth: Supabase Auth (Google OAuth)
  Storage: Supabase Storage

Specialized:
  Recurring: rrule (RFC-5545)
  Drag-Drop: @dnd-kit
  Editor: Tiptap
  Calendar: react-big-calendar
  Dates: date-fns
  Shortcuts: react-hotkeys-hook
  Command: cmdk

Dev Tools:
  Package Manager: npm
  Linter: ESLint
  Formatter: Prettier
  Git Hooks: Husky (optional)
```

---

## 💰 **CHI PHÍ HOSTING**

### **POC/MVP (0-1000 users):**
```
Vercel (Frontend):     $0/month (Free tier)
Supabase (Backend):    $0/month (Free tier)
Domain:                $12/year (optional)

TOTAL: $0/month ✅
```

### **Scale (1K-10K users):**
```
Vercel Pro:            $20/month
Supabase Pro:          $25/month
CDN (Cloudflare):      $0/month

TOTAL: $45/month
```

---

## 🎓 **HỌC THÊM**

### **Ưu tiên cao:**
1. ✅ **Next.js App Router** - Watch: "Next.js 15 Tutorial" (YouTube, 2h)
2. ✅ **TypeScript Basics** - Read: https://www.typescriptlang.org/docs/handbook/intro.html (1h)
3. ✅ **Zustand** - Read: https://zustand-demo.pmnd.rs/ (30 min)

### **Khi cần:**
4. **Supabase** - When: Setup database
5. **Tailwind** - When: Build UI
6. **rrule** - When: Implement recurring tasks

---

## ❓ **FAQ**

### **Tại sao không dùng Vite thay vì Next.js?**
- ✅ Next.js có SSR, SEO, API routes built-in
- ⚠️ Vite chỉ là build tool, không có framework features

### **Tại sao không dùng Redux?**
- ✅ Zustand đơn giản hơn 10 lần
- ⚠️ Redux quá nhiều boilerplate cho dự án nhỏ

### **Tại sao không tự build backend với NestJS?**
- ✅ Supabase nhanh hơn (không cần code auth, RLS, etc.)
- ✅ Free tier đủ cho 1000 users đầu
- ✅ AI dễ generate Supabase code hơn backend code

---

**Last Updated:** November 8, 2025  
**Next Review:** When adding new technology
