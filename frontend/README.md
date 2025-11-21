# NEXUS Productivity OS - Frontend

**Stack:** Next.js 16.0.1 + React 19 + TypeScript + Supabase + TailwindCSS 4

---

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Configure environment
cp .env.local.example .env.local
# Add your Supabase URL and Anon Key

# Start dev server
npm run dev
# Open http://localhost:3000
```

---

## 📁 Project Structure

```text
frontend/
├── app/
│   ├── (auth)/login/          # Authentication
│   ├── (productivity)/        # Main app
│   │   ├── layout.tsx        # Shared sidebar/header
│   │   ├── today/            # "My Day" smart list
│   │   ├── inbox/            # Unsorted tasks
│   │   ├── upcoming/         # Upcoming tasks
│   │   ├── projects/         # Projects list + Kanban
│   │   ├── calendar/         # Calendar view
│   │   └── pages/            # Notion-like pages
│   ├── auth/callback/         # OAuth callback
│   └── dashboard/             # User dashboard
│
├── components/
│   ├── tasks/                 # Task management
│   │   ├── task-item.tsx
│   │   ├── task-list.tsx
│   │   └── task-quick-add.tsx
│   ├── projects/              # Project components
│   ├── kanban/                # Kanban board (to be built)
│   ├── calendar/              # Calendar components
│   ├── pages/                 # Pages editor
│   ├── dashboard/             # Sidebar + Header
│   │   ├── productivity-sidebar.tsx
│   │   └── productivity-header.tsx
│   ├── editor/                # Tiptap editor
│   │   ├── TiptapEditor.tsx
│   │   └── EditorToolbar.tsx
│   └── ui/                    # shadcn/ui primitives
│
├── lib/
│   ├── stores/                # Zustand stores
│   │   ├── tasks.ts          # Task state management
│   │   └── editor.ts         # Editor state management
│   ├── supabase/              # Supabase clients & queries
│   │   ├── client.ts         # Browser client
│   │   ├── server.ts         # Server client
│   │   └── workspace.ts      # Workspace helpers
│   ├── constants/             # App constants
│   │   └── priority.ts       # Task priorities
│   ├── utils/                 # Helper functions
│   └── utils.ts              # General utilities
│
├── hooks/                     # Custom React hooks
│   ├── use-tasks.ts          # Task CRUD + Supabase
│   ├── use-inline-edit.ts    # Inline editing
│   ├── use-toast.ts          # Toast notifications
│   └── useDebounce.ts        # Debounce utility
│
├── scripts/                   # Utility scripts
│   ├── test-supabase-connection.js
│   └── README.md             # Scripts documentation
│
├── types/                     # TypeScript types
│   ├── index.ts              # Task, Project, Page types
│   ├── database.types.ts     # Supabase generated types
│   ├── editor.types.ts       # Tiptap types
│   └── auth.types.ts         # Auth types
│
├── middleware.ts              # Route protection
├── globals.css                # Global styles
└── .env.local                 # Environment variables (gitignored)
```

---

## 🛠️ Tech Stack

### Core

- **Next.js 16.0.1** - App Router, Turbopack, React Server Components
- **React 19** - Latest features
- **TypeScript** - Strict mode
- **TailwindCSS 4** - Utility-first CSS

### UI & Components

- **shadcn/ui** - Radix UI components
- **Tiptap** - Rich text editor
- **@dnd-kit/** - Drag and drop (Kanban)
- **react-big-calendar** - Calendar view
- **cmdk** - Command palette

### State & Data

- **Zustand** - Client state management
- **Immer** - Immutable updates
- **Supabase** - Database + Auth
- **rrule** - Recurring tasks (RFC-5545)

### Utils

- **date-fns** - Date manipulation
- **react-hotkeys-hook** - Keyboard shortcuts
- **react-hook-form** - Form handling
- **zod** - Validation

---

## 🎯 Key Features

### Task Management (70% Priority)

- **Smart Lists:** Today, Inbox, Upcoming
- **Advanced Recurring:** rrule support ("every 2 days", "last Friday")
- **Quick Add:** Press Enter to add task
- **Keyboard Shortcuts:** j/k navigate, x complete, c create
- **Optimistic Updates:** Instant UI feedback

### Projects & Kanban (70% Priority)

- **Project Organization:** Group tasks by project
- **Kanban Boards:** Drag-drop task status
- **List/Board Views:** Toggle between views

### Pages (20% Priority)

- **Tiptap Editor:** Rich text with task lists
- **Flexible Canvas:** Mix notes + tasks
- **Auto-save:** Save as you type

### App Minis (10% Priority)

- **Lightweight Widgets:** CRM, Habit Tracker, Pomodoro
- **Dashboard Integration:** Add to workspace

---

## 📝 Scripts

```bash
# Development
npm run dev          # Start dev server (Turbopack)
npm run build        # Build for production
npm run start        # Start production server

# Code Quality
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript compiler
npm run test         # Run tests

# Database
npm run test:db      # Test Supabase connection
```

---

## 🔧 Configuration Files

- **`next.config.ts`** - Next.js configuration
- **`tsconfig.json`** - TypeScript configuration
- **`tailwind.config.ts`** - TailwindCSS configuration
- **`postcss.config.mjs`** - PostCSS configuration
- **`middleware.ts`** - Auth middleware
- **`.env.local`** - Environment variables (create from `.env.local.example`)

---

## 🌐 Environment Variables

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

Get these from: Supabase Dashboard → Project Settings → API

---

## 🐛 Common Issues

### TypeScript Errors

```bash
# Restart TypeScript server in VS Code
Ctrl+Shift+P → "Restart TS Server"
```

### Supabase Connection Error

```bash
# Check environment variables
cat .env.local

# Restart dev server
npm run dev
```

### Build Errors

```bash
# Clear cache and rebuild
rm -rf .next
npm run build
```

---

## 📚 Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [shadcn/ui](https://ui.shadcn.com/)
- [Tiptap Documentation](https://tiptap.dev/)
- [Zustand Documentation](https://zustand-demo.pmnd.rs/)

---

## 📊 Trạng Thái Dự Án

**Xem chi tiết:** [`../docs/01_status/THIS_WEEK.md`](../docs/01_status/THIS_WEEK.md)

**Giai đoạn hiện tại:** Week 0 - Architecture & Design (Pivot to Platform)

---

**Cập nhật lần cuối:** 21 tháng 11, 2025
**Phiên bản:** 0.1.0 - POC Phase
