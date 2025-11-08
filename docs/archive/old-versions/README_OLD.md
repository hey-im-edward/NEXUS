# NEXUS - Productivity OS

> **Vision:** Personal productivity platform combining task management, calendar, and flexible pages—built for SMEs and power users who need more than simple todo apps.

## 🎯 What is NEXUS?

NEXUS is a **Productivity OS** focused on three core systems:

### **70% Priority: Productivity Core**

- **Smart Task Management** - Advanced recurring tasks (rrule), smart lists (Today, Inbox, Upcoming)
- **Kanban Boards** - Project visualization with drag-drop
- **Calendar Time Blocking** - Schedule tasks as time blocks

### **20% Priority: Flexible Pages**

- **Notion-like Editor** - Create notes, docs, wikis with Tiptap
- **Mix with Tasks** - Embed task lists inside pages

### **10% Priority: App Minis**

- **Lightweight Extensions** - CRM, Habit Tracker, Pomodoro Timer
- **Dashboard Widgets** - Add to your workspace dashboard

### Target Users

- **Primary:** SME Project Managers and freelancers managing 20-100+ tasks
- **Secondary:** Knowledge workers who need both tasks + notes in one place
- **Pain Point:** Current tools are either too simple (Todoist) or too complex (ClickUp/Notion full suite)

### Value Proposition

- ✅ **Advanced task management** (recurring patterns like "every 2 days", "last Friday of month")
- ✅ **Flexible structure** (Projects + Standalone tasks + Pages)
- ✅ **Calendar integration** (Time blocking, not just due dates)
- ✅ **Clean, fast UI** (Not bloated like ClickUp)

**Target Price:** $10-15/month per user (positioning between Todoist Pro $4 and ClickUp $9)

---

## 🚀 Current Status

**Phase:** Week 0 - User Research  
**Last Updated:** November 7, 2025  
**Version:** 2.0.0 - Productivity OS Core

### Progress

- [x] Project structure reorganized (Productivity OS focus)
- [x] Database schema v2 designed (11 tables with rrule support)
- [x] Core task components built (TaskItem, TaskList, TaskQuickAdd)
- [x] State management setup (Zustand + Immer)
- [x] Dependencies installed (rrule, date-fns, @dnd-kit, react-big-calendar)
- [ ] **Database NOT YET DEPLOYED** ⚠️ Critical blocker
- [ ] 0/10 user interviews completed
- [ ] First working prototype

---

## 🏗️ Tech Stack

### Architecture Decision: Supabase + Next.js (No Backend)

**Why NOT NestJS backend?**

- Supabase provides auth, database, real-time out of the box
- Free tier: 500MB DB, 50K MAU - đủ cho 1000 users đầu
- Faster development: No server setup, deploy, DevOps
- AI-friendly: Easier for Cursor/Copilot to generate code

### Stack

```yaml
Frontend:
  - Next.js 16.0.1 (App Router, Turbopack)
  - React 19
  - TypeScript strict mode
  - TailwindCSS 4
  - shadcn/ui components
  - Zustand + Immer (optimistic updates)
  - rrule (RFC-5545 recurring tasks)
  - @dnd-kit/* (Kanban drag-drop)
  - react-big-calendar (Calendar view)
  - Tiptap (Rich text editor)
  - react-hotkeys-hook (Keyboard shortcuts)

Backend:
  - Supabase (PostgreSQL + Row Level Security)
  - 11 tables: tasks, projects, pages, time_blocks, workspaces, etc.

Deployment:
  - Vercel (frontend, free tier)
  - Supabase Cloud (database, free tier)
```

**Cost:** $0/month for first 500-1000 users

---

## 📂 Project Structure

```
NEXUS/
├── frontend/
│   ├── app/
│   │   ├── (auth)/login/         # Authentication pages
│   │   ├── (productivity)/       # Main app routes
│   │   │   ├── today/           # "My Day" smart list
│   │   │   ├── inbox/           # Unsorted tasks
│   │   │   ├── projects/        # Project list + Kanban boards
│   │   │   ├── upcoming/        # Upcoming tasks view
│   │   │   └── calendar/        # Calendar time blocking
│   │   ├── auth/callback/       # OAuth callback
│   │   └── dashboard/           # User dashboard
│   ├── components/
│   │   ├── tasks/              # TaskItem, TaskList, TaskQuickAdd
│   │   ├── projects/           # Project components
│   │   ├── kanban/             # Kanban board (to be built)
│   │   ├── calendar/           # Calendar components
│   │   ├── pages/              # Pages editor components
│   │   ├── dashboard/          # ProductivitySidebar, Header
│   │   ├── editor/             # Tiptap editor
│   │   └── ui/                 # shadcn/ui primitives
│   ├── lib/
│   │   ├── stores/             # Zustand stores (tasks, etc.)
│   │   ├── hooks/              # useTasks, useKeyboard
│   │   ├── supabase/           # Supabase client/server
│   │   └── utils/              # Helper functions
│   └── types/                  # Task, Project, Page types
├── docs/
│   ├── PROJECT_STATUS.md       # ⭐ Master documentation
│   ├── DEPLOY_DATABASE.md      # ⭐ Quick deployment guide
│   ├── AI_PROMPTS.md           # ⭐ AI prompts guide
│   ├── SETUP.md                # Development setup
│   ├── AUTH_SETUP.md           # Supabase Auth config
│   ├── architecture/
│   │   ├── database-schema-v2-productivity.sql  # Full schema
│   │   ├── migrations/         # Safe migration scripts
│   │   └── decisions.md        # Tech decisions
│   └── research/               # User interviews
├── THIS_WEEK.md                # ⭐ Weekly focus tracker
├── QUICKSTART.md               # ⭐ Quick project overview
└── README.md                   # ⭐ This file
```

---

## 🗓️ 12-Week Roadmap

### **Week 0-3: User Research** (YOU ARE HERE)

**Goal:** Validate Productivity OS priorities

- [x] Project restructured for Productivity OS focus
- [x] Database schema v2 designed (11 tables)
- [x] Core task components scaffolded
- [ ] **10 SME interviews** ⚠️ Critical
- [ ] Validate priorities (70% tasks, 20% pages, 10% app minis)
- [ ] Identify must-have vs nice-to-have features

**Key Questions for Interviews:**

- Do you need advanced recurring tasks? (e.g., "every 2 days", "last Friday of month")
- Kanban board essential, or can start with list view?
- Calendar time blocking vs simple due dates?
- Would you pay $10-15/month for this?

---

### **Week 4-7: POC (Proof of Concept)**

**Goal:** Working task management + basic Kanban + Pages

**Deliverables:**

- [ ] Task CRUD (create, read, update, delete, toggle complete)
- [ ] Smart filters (Today, Inbox, Upcoming)
- [ ] Kanban board with drag-drop (`/projects/[id]/board`)
- [ ] Keyboard shortcuts (j/k navigate, x complete, c create)
- [ ] Simple Pages editor (Tiptap integration)
- [ ] Deploy to Vercel

**Success Criteria:**

- 5 testers try it
- 3/5 say "I would use this daily"
- Core task flow works smoothly

---

### **Week 8-11: MVP**

**Goal:** Add Calendar + Polish + 1-2 App Minis

**Deliverables:**

- [ ] Calendar view with time blocking
- [ ] Recurring tasks (rrule implementation)
- [ ] 1-2 App Minis (Habit Tracker or Pomodoro)
- [ ] Command palette (Ctrl+K quick actions)
- [ ] Mobile responsive (basic)
- [ ] Onboarding flow

**Success Criteria:**

- 20 signups
- 10 active users (3+ sessions/week)
- Average session >10 minutes

---

### **Week 12: GO/NO-GO Decision**

**Metrics to Evaluate:**

- 50+ signups
- 10+ active users (using 3+ times/week)
- 1-2 paying users ($10-15/month)
- NPS score >40

**Decision:**

- **GO** → Continue to Scale phase (Week 13+)
- **NO-GO** → Pivot or shut down

---

For detailed roadmap, see `docs/PROJECT_STATUS.md`

---

## 🚦 Quick Start

### Prerequisites

- Node.js 20+ LTS
- Supabase account (free tier)

### Setup (5 minutes)

1. **Clone and install**

```bash
git clone https://github.com/hey-im-edward/NEXUS.git
cd NEXUS/frontend
npm install
```

2. **Configure Supabase**

```bash
# Create .env.local with your Supabase credentials
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

3. **Deploy database**

```bash
# Open Supabase Dashboard → SQL Editor
# Copy and run: docs/architecture/migrations/002_productivity_core_schema.sql
# See docs/DEPLOY_DATABASE.md for detailed steps
```

4. **Start dev server**

```bash
npm run dev
# Open http://localhost:3000
```

### Important Files

- **`THIS_WEEK.md`** - Your weekly focus and tasks
- **`docs/PROJECT_STATUS.md`** - Master documentation (read this!)
- **`docs/DEPLOY_DATABASE.md`** - Database deployment guide
- **`docs/AI_PROMPTS.md`** - How to prompt AI effectively

### Next Steps After Setup

1. Read `docs/PROJECT_STATUS.md` for full context
2. Follow `docs/DEPLOY_DATABASE.md` to deploy schema
3. Test task management at `/today` route
4. See `THIS_WEEK.md` for current week goals

---

## 📚 Documentation

### Essential Docs (Start Here)

- **`THIS_WEEK.md`** - Weekly focus and tasks
- **`docs/PROJECT_STATUS.md`** - Complete project overview
- **`docs/DEPLOY_DATABASE.md`** - Deploy database schema
- **`docs/AI_PROMPTS.md`** - AI prompting guide

### Additional Docs

- **[Research](./docs/research/)** - User interview scripts
- **[Architecture](./docs/architecture/)** - Database schema, tech decisions
- **[Setup Guide](./docs/SETUP.md)** - Detailed development setup
- **[Auth Setup](./docs/AUTH_SETUP.md)** - Supabase authentication

---

## 🎨 Design Philosophy

**Productivity First:**

- Fast keyboard navigation (j/k, x, c shortcuts)
- Quick add everywhere (just press Enter)
- Zero friction task capture

**Clean UI:**

- Minimal, focused interface
- No overwhelming sidebars
- Smart defaults (Today view on open)

**Flexible Structure:**

- Projects when you need structure
- Inbox for quick capture
- Pages for freeform notes

---

## 📊 Current Metrics

**Week 0 Status:**

- User interviews: 0/10
- Tasks scaffolded: ✅ Complete
- Database deployed: ⚠️ Not yet
- Dev server: ✅ Running

---

**Last Updated:** November 7, 2025  
**Version:** 2.0.0 - Productivity OS Core  
**Current Phase:** Week 0 - User Research

**⚠️ Critical Next Step:** Deploy database schema (see `docs/DEPLOY_DATABASE.md`)
