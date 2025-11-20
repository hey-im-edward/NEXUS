# 📋 NEXUS PROJECT CONTEXT - Comprehensive Briefing Document

**Ngày cập nhật:** 19 tháng 11, 2025  
**Phiên bản:** 1.0  
**Mục đích:** Tài liệu tổng hợp toàn bộ thông tin về dự án NEXUS để AI có thể hiểu rõ context và tiếp tục phát triển

---

## 📌 TÓM TẮT EXECUTIVE

### NEXUS là gì?

**NEXUS** là một **Platform** (không phải ứng dụng) cho phép users tự xây dựng productivity tools của riêng họ mà không cần biết code.

**Tư tưởng cốt lõi:**

> "Thay vì build một task manager tốt hơn, hãy build một platform để users tự build task manager (và bất kỳ tool nào khác) theo cách của họ."

### Định vị thị trường

- **Không cạnh tranh trực tiếp với:** Todoist, Notion, ClickUp
- **Thay vào đó:** Tạo ra hạng mục mới - "Platform for Building Productivity Tools"
- **Tương tự như:** WordPress (build websites), Canva (design graphics) → NEXUS (build productivity apps)

### North Star Metric

**Không phải:** "Bao nhiêu tasks được tạo?"  
**Mà là:** "Bao nhiêu apps được build và share?"

```
North Star = (Apps Built by Users) × (Average Installs per App)
```

---

## 🎯 CHIẾN LƯỢC & TẦM NHÌN

### Platform First Strategy (13/11/2025 - Pivot Decision)

**Quyết định quan trọng:** Pivot từ "Better Task Manager" sang "Platform to Build Tools"

**Lý do:**

1. Thị trường task management đã quá đông đúc (100+ competitors)
2. Switching cost cao, khó compete feature-to-feature
3. Platform approach tạo ra moat thực sự (no one else is doing this)

### 3 Trụ Cột Sản Phẩm

```
┌─────────────────────────────────────┐
│     1. DASHBOARD GRID               │
│     (iOS Home Screen for Apps)      │
├─────────────────────────────────────┤
│     2. APP MINIS                    │
│     (Micro-apps running in grid)    │
├─────────────────────────────────────┤
│     3. APP BUILDER                  │
│     (No-Code → Low-Code → God Mode) │
└─────────────────────────────────────┘
```

#### Trụ Cột 1: Dashboard Grid
- Drag-and-drop layout (react-grid-layout)
- Responsive (desktop/mobile)
- Persistent layouts (Supabase)
- Multiple dashboards per user

#### Trụ Cột 2: App Minis
- Micro-applications chạy trong grid
- Self-contained (isolated state)
- Built-in examples: QuickNotes, Pomodoro, TodayTasks
- User-created apps từ App Builder

#### Trụ Cột 3: App Builder (3 Levels)

**Level 1: No-Code (MVP - Week 1-4)**
- 5 components: TextBlock, Button, TextInput, Container, SimpleList
- 3 actions: Append to List, Clear Input, Show/Hide
- Visual drag-and-drop editor
- Target: Non-technical users

**Level 2: Low-Code (Week 9-12 if GO)**
- Conditional logic (IF/THEN workflows)
- Database integration (Supabase)
- Form validation
- 15+ components

**Level 3: God Mode (Year 2 if PMF)**
- Custom code (TypeScript)
- API integrations
- Git version control
- Team collaboration

---

## 📊 HIỆN TRẠNG DỰ ÁN (19/11/2025)

### Timeline Overview

```
Week 0-4:  Platform MVP        [███░░░░░░░] 30%  ← ĐÃ HOÀN THÀNH Week 1
Week 5-6:  Marketplace         [░░░░░░░░░░]  0%
Week 7-8:  Validation          [░░░░░░░░░░]  0%
Week 9-12: Decision Point      [░░░░░░░░░░]  0%
```

### Week 1 Achievements (Đã hoàn thành 18/11/2025)

✅ **PROMPT 1.1:** DashboardGrid Component
- React-grid-layout integrated
- Drag-drop functionality working
- Layout persistence to Supabase
- Responsive mobile support

✅ **PROMPT 1.2:** AppMiniCard Wrapper
- Resize handles implemented
- Close button with confirmation
- Auto-save on layout change
- Drag handle for moving cards

✅ **PROMPT 1.3:** 3 App Minis Built
- QuickNotesApp (localStorage)
- PomodoroApp (25-min timer)
- TodayTasksApp (Supabase real-time)

✅ **PROMPT 1.4:** Craft.js Framework Setup
- Editor page created (`/app-builder`)
- Canvas, Palette, Properties Panel
- Toolbar with Save/Preview/Undo/Redo
- Ready for component implementation

**Current State (19/11/2025):**

🟢 **HOÀN THÀNH:** Week 1 Platform Foundation
🔄 **ĐANG LÀM:** Chuyển từ DropSlot-based sang SortableContext-based DnD (đã refactor xong, chưa test runtime)
⏭️ **TIẾP THEO:** PROMPT 1.5 - Build 5 Builder Components

---

## 🛠️ TECH STACK & KIẾN TRÚC

### Frontend Stack

```typescript
// Core
React: 19.0.0 (concurrent features)
Next.js: 15.2.0 (App Router)
TypeScript: 5.x (strict mode)

// UI/Styling
TailwindCSS: 3.4.17
shadcn/ui: Latest components
Lucide Icons: ^0.469.0

// State Management
Zustand: 5.0.2 (editor state)
TanStack Query: 5.62.11 (server state)

// Drag & Drop (RECENT REFACTOR)
@dnd-kit/core: ^6.3.1
@dnd-kit/sortable: ^9.0.0
react-grid-layout: 1.5.2 (dashboard)

// Forms & Validation
React Hook Form: 7.54.2
Zod: 3.24.1

// App Builder (Week 2 focus)
@craftjs/core: ^0.2.0-beta.17 (planned)
@craftjs/layers: ^0.2.0-beta.17 (planned)
```

### Backend Stack

```typescript
// Database & Auth
Supabase: PostgreSQL + Auth + Real-time
Row Level Security (RLS) enabled

// Key Tables:
- tasks (existing task management)
- user_dashboard_layouts (dashboard persistence)
- app_minis (user-created apps - coming)
- marketplace_apps (public marketplace - coming)
```

### Database Schema (Current)

```sql
-- Dashboard Layouts
CREATE TABLE user_dashboard_layouts (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id),
  dashboard_name TEXT DEFAULT 'Main',
  layout JSONB NOT NULL,
  is_default BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tasks (existing)
CREATE TABLE tasks (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id),
  title TEXT NOT NULL,
  description TEXT,
  status TEXT DEFAULT 'todo',
  priority TEXT DEFAULT 'medium',
  due_date DATE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

### File Structure

```
frontend/
├── app/
│   ├── dashboard/page.tsx          ✅ Dashboard Grid
│   ├── app-builder/page.tsx        ✅ Editor (Craft.js ready)
│   ├── marketplace/                🔜 Week 5
│   ├── (productivity)/             ✅ Tasks (Today, Inbox, Projects)
│   └── auth/                       ✅ Login/Callback
│
├── components/
│   ├── dashboard/
│   │   ├── DashboardGrid.tsx       ✅ Grid layout
│   │   └── AppMiniCard.tsx         ✅ Card wrapper
│   ├── app-minis/
│   │   ├── QuickNotesApp.tsx       ✅ Built-in app
│   │   ├── PomodoroApp.tsx         ✅ Built-in app
│   │   └── TodayTasksApp.tsx       ✅ Built-in app
│   ├── app-builder/
│   │   ├── Canvas.tsx              ✅ Drop zone (refactored to Sortable)
│   │   ├── RenderedComponent.tsx   ✅ Component renderer (Sortable)
│   │   ├── ComponentPalette.tsx    ✅ Drag source
│   │   ├── PropertiesPanel.tsx     ✅ Settings panel
│   │   ├── Toolbar.tsx             ✅ Save/Preview/Undo
│   │   └── DndKitDiagnostic.tsx    ✅ Test automation (refactored)
│   ├── tasks/                      ✅ Task UI components
│   └── ui/                         ✅ shadcn/ui components
│
├── lib/
│   ├── stores/
│   │   └── editorStore.ts          ✅ Zustand store (Sortable-ready)
│   ├── supabase/
│   │   ├── client.ts               ✅ Supabase client
│   │   └── server.ts               ✅ Server-side client
│   └── utils/                      ✅ Helpers
│
└── hooks/
    ├── useDebounce.ts              ✅ Debounce hook
    └── useDashboardLayout.ts       ✅ Layout persistence
```

---

## 🚧 RECENT TECHNICAL WORK (18-19/11/2025)

### App Builder DnD Refactor (Sortable Migration)

**Context:** App builder đang dùng custom DropSlot-based ordering, gây khó khăn cho drag UX và nested components.

**Decision:** Migrate sang `@dnd-kit/sortable` để có vertical/horizontal sortable lists tự động.

**Changes Made:**

1. **Canvas.tsx**
   - Removed DropSlots between root components
   - Added `SortableContext` wrapping roots (id: `canvas-root`)
   - Added permanent append zone (empty-state friendly)
   - Added droppable for empty canvas (`canvas-empty`)

2. **RenderedComponent.tsx**
   - Integrated `useSortable` hook (drag handle + transform)
   - Added `SortableContext` for children (id: `${componentId}-children`)
   - Added drop zone at end of children array (append new items)
   - Manual ref management for transforms (to satisfy ESLint hook rules)

3. **DndKitDiagnostic.tsx**
   - Updated to target drop zones instead of slots
   - Improved pointer simulation (pointer capture + document-level moves)
   - Rewrote test messages to reflect new architecture

4. **app/app-builder/page.tsx**
   - Added `getDropTarget` function (reads sortable metadata + fallback zones)
   - Drag end logic now computes correct parent/index from sortables

**Status:**
- ✅ Code refactored
- ✅ ESLint passed (no hook/style errors)
- ⏳ Runtime testing pending (need to launch app and verify drag behavior)

**TODO:**
- [ ] Runtime verification (drag components in UI, check diagnostics)
- [ ] Polish diagnostic UI (zoom/collapse controls)
- [ ] Document new DnD flow
- [ ] Write tests for Sortable logic

---

## 📝 PROMPTS & ROADMAP

### Completed Prompts (Week 1)

✅ **PROMPT 1.1:** DashboardGrid Component (6 hrs)  
✅ **PROMPT 1.2:** AppMiniCard Wrapper (2 hrs)  
✅ **PROMPT 1.3:** 3 App Minis (3 hrs)  
✅ **PROMPT 1.4:** Craft.js Framework Setup (3 hrs)

### In Progress

🔄 **Refactoring:** Sortable-based DnD (technical debt payoff)

### Next Up (Week 2)

🔜 **PROMPT 1.5:** Build 5 Builder Components (8-10 hrs)
- TextBlock, Button, TextInput, Container, SimpleList
- Draggable from palette, configurable properties
- Preview mode rendering

🔜 **PROMPT 1.6:** Build 3 Actions System (4-6 hrs)
- Append to List, Clear Input, Show/Hide
- Wire actions to buttons
- Persist in JSON definition

### Upcoming (Week 3-4)

🔜 **PROMPT 1.7:** Save/Load App Definition (6-8 hrs)
- JSON schema
- Supabase persistence
- AppRenderer component

🔜 **PROMPT 1.8:** 3 Template Apps (4-5 hrs)
- Guest Book, Quick Notes, Shopping List
- Start from template flow

### Future Phases

**Week 5-6:** Marketplace (Browse, Install, Publish)  
**Week 7-8:** Beta Testing & Validation  
**Week 9-12:** GO/NO-GO Decision + Low-Code Features

---

## 🎨 UX/UI DECISIONS

### Design Philosophy

- **Minimalism:** Clean, uncluttered interfaces
- **Familiar Patterns:** iOS Home Screen (grid), Notion (editor)
- **Progressive Disclosure:** Simple first, advanced later
- **Fast Feedback:** Real-time updates, optimistic UI

### Key UX Patterns

**Dashboard Grid:**
- Drag handle (6-dots icon) top-left
- Close button (X) top-right
- Resize handles all 4 corners
- Hover: Slight elevation shadow
- Mobile: Auto-stack vertically (no resize)

**App Builder:**
- 3-panel layout: Palette | Canvas | Properties
- Toolbar top: Logo | Save | Preview | Undo/Redo | Publish
- Canvas: Drop zones visible on drag
- Components: Selected state (blue border)

**Color Scheme:**
- Primary: Indigo (#4F46E5)
- Success: Green (#10B981)
- Warning: Yellow (#F59E0B)
- Danger: Red (#EF4444)
- Neutral: Slate (#64748B)

---

## 🔐 SECURITY & RLS POLICIES

### Row Level Security (Supabase)

**All tables have RLS enabled.**

**Tasks Table:**
```sql
CREATE POLICY "Users can only access their own tasks"
ON tasks FOR ALL
USING (auth.uid() = user_id);
```

**Dashboard Layouts:**
```sql
CREATE POLICY "Users can only access their own layouts"
ON user_dashboard_layouts FOR ALL
USING (auth.uid() = user_id);
```

**Future (App Minis):**
```sql
-- Private apps
CREATE POLICY "Users can only access their own apps"
ON app_minis FOR ALL
USING (auth.uid() = user_id);

-- Public marketplace apps (read-only)
CREATE POLICY "Anyone can read published apps"
ON marketplace_apps FOR SELECT
USING (is_published = true);
```

### Content Security Policy

**Next.js Config:**
```typescript
headers: {
  'Content-Security-Policy': "script-src 'self' 'unsafe-inline'"
}
```

**Future (God Mode):** iframe sandboxing for user code execution

---

## 📊 SUCCESS METRICS & KPIs

### Week 1-4 (Platform MVP)
- ✅ Beta users recruited: 10
- ✅ Apps per user on dashboard: 3
- 🎯 Custom apps created: 5 (target)
- 🎯 Avg session time: 15 min

### Week 5-6 (Marketplace)
- 🎯 Apps on marketplace: 10+
- 🎯 Total installations: 20+
- 🎯 User-created apps published: 3+

### Week 7-8 (Validation)
- 🎯 Beta users: 20
- 🎯 Users who built apps: 10+
- 🎯 Active users (3+ apps): 5+
- 🎯 NPS Score: > 30

### Week 9-12 (Decision)
**GO Criteria (need 2/3):**
1. Apps created: 10+ users
2. Marketplace installs: 30+
3. Active users: 5+ using 3+ apps

---

## 🐛 KNOWN ISSUES & BUGS

### Critical (Blocking)
*None currently*

### High Priority
- [ ] **Diagnostic overlay:** Needs runtime verification post-Sortable refactor
- [ ] **Mobile responsiveness:** Dashboard grid needs touch testing
- [ ] **Performance:** Test with 20+ components on canvas

### Medium Priority
- [ ] **Task delete:** Currently no delete functionality (only complete)
- [ ] **Undo/Redo:** Craft.js built-in, needs testing
- [ ] **Error handling:** No user-facing error messages yet

### Low Priority / Backlog
- [ ] Task tags
- [ ] Task detail modal
- [ ] Keyboard shortcuts
- [ ] Dark mode

**Bug Tracking:** See [BUGS.md](02-EXECUTION/status/BUGS.md)

---

## 📚 CODING STANDARDS & CONVENTIONS

### TypeScript Best Practices
```typescript
// ✅ Use explicit types for props
interface DashboardGridProps {
  userId: string;
  initialLayout?: Layout[];
}

// ✅ Use Zod for validation
const taskSchema = z.object({
  title: z.string().min(1),
  priority: z.enum(['low', 'medium', 'high']),
});

// ✅ Use async/await, not .then()
const tasks = await supabase.from('tasks').select('*');

// ❌ Avoid 'any'
const data: any = {}; // BAD
const data: Task[] = []; // GOOD
```

### React Patterns
```typescript
// ✅ Use function components
export function DashboardGrid({ userId }: DashboardGridProps) {}

// ✅ Custom hooks for logic reuse
function useDashboardLayout() {
  const [layout, setLayout] = useState<Layout[]>([]);
  // ...
  return { layout, saveLayout };
}

// ✅ Zustand for complex state
const useEditorStore = create<EditorState>((set) => ({
  components: [],
  selectedId: null,
  addComponent: (comp) => set((state) => ({
    components: [...state.components, comp]
  })),
}));
```

### File Naming
- Components: PascalCase (`DashboardGrid.tsx`)
- Hooks: camelCase with `use` prefix (`useDashboardLayout.ts`)
- Utils: camelCase (`formatDate.ts`)
- Types: PascalCase interface/type (`Task`, `Layout`)

### Import Order
```typescript
// 1. React/Next
import { useState } from 'react';
import { useRouter } from 'next/navigation';

// 2. Third-party
import { useQuery } from '@tanstack/react-query';
import { useDroppable } from '@dnd-kit/core';

// 3. Internal (absolute imports)
import { Button } from '@/components/ui/button';
import { useEditorStore } from '@/lib/stores/editorStore';

// 4. Relative imports
import { TaskItem } from './TaskItem';

// 5. Types
import type { Task } from '@/types';
```

---

## 🧪 TESTING STRATEGY

### Current State
- ✅ Manual testing (dev server)
- ✅ ESLint + TypeScript type checking
- ✅ DndKitDiagnostic (automated drag tests)

### Planned (Post-MVP)
- [ ] Vitest unit tests (lib/utils)
- [ ] React Testing Library (component tests)
- [ ] Playwright E2E tests (user flows)

**Testing Priority:** Ship fast, test later (MVP mindset)

---

## 🔄 DEVELOPMENT WORKFLOW

### Daily Workflow
1. Pull latest code
2. Read current prompt from `THIS_WEEK.md`
3. Implement feature (timeboxed)
4. ESLint + TypeScript check
5. Manual test in browser
6. Commit with descriptive message
7. Update `FEATURES.md` / `BUGS.md`
8. Push to branch

### Git Strategy
**Main Branch:** `main` (stable releases)  
**Development:** `feature/poc` (current work)  
**Feature Branches:** `feature/app-builder`, `feature/marketplace` (if needed)

**Commit Messages:**
```
feat: add drag-drop to dashboard grid
fix: resolve layout persistence bug
refactor: migrate to sortable contexts
docs: update tech stack in whitepaper
```

### Review Process
- Solo dev (no formal PR reviews yet)
- Self-review before commit
- Weekly code audit (Monday morning)

---

## 💡 STRATEGIC PRINCIPLES

### Code First Philosophy
> "Ship code, not docs. Build MVPs, not perfect products."

**Implications:**
- No extensive design phase
- Timeboxed features (stick to estimates)
- Iterate based on user feedback
- MVP mindset always

### Task Management: "Keep It, Don't Polish It"
> "Task management is entry point, not the product."

**What this means:**
- ✅ Keep existing features (CRUD, Kanban, Today view)
- ❌ Don't add tags, advanced filters, calendar view
- ❌ Don't compete with Todoist feature-by-feature
- ✅ Focus 80% effort on Platform features

### Platform First
> "Apps Built & Shared > Tasks Created"

**North Star Metric guides everything:**
- New features must support app building/sharing
- Task management is "good enough"
- Marketplace is priority over task polish

---

## 🗣️ USER PERSONAS

### Primary: Solo Freelancer (Mai)
- **Age:** 28-35
- **Tools:** Todoist + Notion + Google Sheets
- **Pain:** Context switching between 3 tools
- **Goal:** All-in-one workspace, but simpler than ClickUp
- **NEXUS Value:** Build custom CRM + Invoice tracker + Tasks in one place

### Secondary: Small Team Lead (Tuấn)
- **Team Size:** 3-5 people
- **Tools:** ClickUp (but finds it too complex)
- **Pain:** Overkill features, slow onboarding
- **Goal:** Flexible tool for team, not overwhelming
- **NEXUS Value:** Build exactly what team needs, share workflows

### Tertiary: No-Code Enthusiast (Lan)
- **Background:** Designer, PM, non-technical
- **Tools:** Notion, Airtable (hit limitations)
- **Pain:** Can't build custom apps without code
- **Goal:** Build tools for personal workflows
- **NEXUS Value:** App Builder = creative playground

---

## 🌍 COMPETITIVE LANDSCAPE

### Direct Competitors (Platforms)
- **Notion:** Document-centric, no app builder
- **Airtable:** Database-centric, no app builder
- **ClickUp:** Feature bloat, no marketplace

### Indirect Competitors (No-Code Builders)
- **Bubble.io:** General web apps, not productivity-focused
- **Adalo:** Mobile apps, not desktop productivity
- **Retool:** Internal tools for devs, not for non-technical

### NEXUS Unique Position
✅ **Only platform combining:**
- Productivity-first (vs general web apps)
- No-Code → Low-Code → God Mode (progressive)
- Marketplace for sharing (vs closed ecosystems)
- Entry point via Task Management (vs empty canvas)

---

## 💰 MONETIZATION STRATEGY (Future)

### Free Tier (MVP)
- Unlimited apps on dashboard
- Access to marketplace
- No-Code builder (5 components)
- 100MB storage

### Pro Tier ($10/month)
- Low-Code features (Week 9-12)
- Database integration
- 15+ components
- 1GB storage
- Premium marketplace apps

### Enterprise Tier ($50+/month)
- God Mode (custom code)
- Team collaboration (10+ users)
- White-label marketplace
- Priority support

**Phase 1 (Week 1-12):** 100% free, focus on growth  
**Phase 2 (Year 1):** Introduce Pro tier  
**Phase 3 (Year 2):** Enterprise tier + creator monetization

---

## 📖 ESSENTIAL READING FOR NEW AI

### Must Read First
1. **[NEXUS_WHITEPAPER.md](01-STRATEGY/NEXUS_WHITEPAPER.md)** - Full vision (4450 lines)
2. **[ROADMAP.md](02-EXECUTION/ROADMAP.md)** - 12-week timeline
3. **[THIS_WEEK.md](02-EXECUTION/status/THIS_WEEK.md)** - Current sprint

### Technical Docs
4. **[TECH_STACK.md](03-REFERENCE/TECH_STACK.md)** - All technologies used
5. **[AI_PROMPTS.md](02-EXECUTION/AI_PROMPTS.md)** - Detailed prompts for each week

### Reference
6. **[PRINCIPLES.md](03-REFERENCE/PRINCIPLES.md)** - Design & coding principles
7. **[FEATURES.md](02-EXECUTION/status/FEATURES.md)** - Completed features log
8. **[BUGS.md](02-EXECUTION/status/BUGS.md)** - Known issues tracker

---

## 🚀 IMMEDIATE NEXT STEPS (For AI Taking Over)

### Context You Have Now
✅ Full understanding of NEXUS vision & strategy  
✅ Complete tech stack knowledge  
✅ Current project state (Week 1 done, Week 2 starting)  
✅ Recent refactor (Sortable migration)  

### What To Do Next

**Step 1: Verify Sortable Refactor (1-2 hours)**
```bash
cd frontend
npm run dev
# Open http://localhost:3000/app-builder
# Test:
# - Drag component from palette to canvas
# - Drag root components to reorder
# - Drag into nested containers
# - Check diagnostic overlay (all tests green?)
```

**Step 2: Start PROMPT 1.5 (8-10 hours)**
- Read [AI_PROMPTS.md - PROMPT 1.5](02-EXECUTION/AI_PROMPTS.md#prompt-15-build-5-builder-components)
- Build 5 draggable components: TextBlock, Button, TextInput, Container, SimpleList
- Implement properties panel for each
- Test in preview mode

**Step 3: Weekly Review (Monday 25/11)**
- Update progress bars in ROADMAP.md
- Update THIS_WEEK.md with Week 2 status
- Check off completed prompts
- Plan Week 3

### Communication Style with User
- **Be concise:** User prefers brief updates, not walls of text
- **Show progress:** Use checkboxes ✅ and progress bars [███░░░]
- **Ask when stuck:** If blocked, explain clearly and propose solutions
- **Ship code:** Prioritize working code over perfect docs

### When User Asks "Tình hình thế nào?"
**Good response template:**
```
✅ Hoàn thành: [Feature X]
🔄 Đang làm: [Feature Y] (50% done)
⏭️ Tiếp theo: [Feature Z]
🐛 Issues: [Brief list, if any]
⏱️ ETA: [Realistic estimate]
```

**Avoid:**
- Long explanations without action items
- Over-promising timelines
- Hiding blockers/problems

---

## 📞 SUPPORT & RESOURCES

### Documentation Sources
- **Supabase Docs:** https://supabase.com/docs
- **Next.js 15 Docs:** https://nextjs.org/docs
- **dnd-kit Docs:** https://docs.dndkit.com
- **TailwindCSS:** https://tailwindcss.com/docs
- **Zustand:** https://zustand-demo.pmnd.rs

### Community
- **Discord:** (TBD - post-beta launch)
- **GitHub Issues:** Track bugs & feature requests
- **Product Hunt:** (Week 12 - public launch)

### Internal Tools
- **Supabase Dashboard:** Project management, SQL editor
- **Vercel:** Deployment & analytics (when deployed)
- **Git:** Version control (GitHub repo: hey-im-edward/NEXUS)

---

## ⚠️ COMMON PITFALLS TO AVOID

### Don't:
- ❌ Polish task management (it's "good enough")
- ❌ Add features not in prompts (scope creep)
- ❌ Spend > 2 hours stuck (ask user for help)
- ❌ Build without testing (manual test always)
- ❌ Commit broken code (ESLint must pass)

### Do:
- ✅ Ship incrementally (small PRs)
- ✅ Test on mobile (responsive important)
- ✅ Update docs when you change things
- ✅ Follow prompts strictly (they're researched)
- ✅ Measure North Star Metric progress

---

## 🎓 LEARNING FROM HISTORY

### What Worked (Week 1)
✅ Code First approach (shipped fast)  
✅ react-grid-layout (easy drag-drop)  
✅ Supabase RLS (security by default)  
✅ shadcn/ui (rapid UI development)  
✅ Zustand (simple state management)

### What Didn't Work
❌ DropSlot-based ordering (too manual, refactored to Sortable)  
❌ Over-designing before coding (wasted time)  

### Lessons Learned
> "Ship code first, polish later."  
> "Users don't care about perfect code, they care about working features."  
> "Timebox everything. If stuck > 2hrs, move on or ask for help."

---

## 🔮 VISION FOR YEAR 1-3

### Year 1 (2025): Platform MVP
- 100 users build apps
- 50 apps shared on marketplace
- Validate platform hypothesis
- Revenue: $0 (free tier only)

### Year 2 (2026): Ecosystem Growth
- 5,000 users
- 1,000 apps on marketplace
- Low-Code tier launched ($10/mo)
- Creator monetization (30% cut)
- Revenue: $10K MRR

### Year 3 (2027): Self-Sustaining
- 50,000 users
- 10,000 apps
- God Mode tier launched ($50/mo)
- Enterprise features
- Revenue: $100K MRR, profitable

---

## ✅ QUICK CHECKLIST (For AI Sanity Check)

Before coding new features:
- [ ] Read relevant prompt in AI_PROMPTS.md
- [ ] Check current branch (`feature/poc`)
- [ ] Review recent commits (what changed?)
- [ ] ESLint + TypeScript check passes
- [ ] Manual test in browser
- [ ] Update FEATURES.md or BUGS.md
- [ ] Commit with clear message

Before asking user for help:
- [ ] Tried to solve for < 2 hours
- [ ] Googled error messages
- [ ] Checked docs (Supabase, Next.js, etc.)
- [ ] Clearly describe problem
- [ ] Propose 2-3 solutions

When delivering updates:
- [ ] Concise (< 5 sentences)
- [ ] Show progress (checkboxes)
- [ ] Realistic ETA
- [ ] Ask specific questions (if any)

---

## 🙏 FINAL NOTES

**Philosophy:**

> NEXUS là một **Platform**, không phải một ứng dụng.  
> Mục tiêu không phải build tool tốt nhất, mà là build platform để users tự build tools họ cần.  
> Code First. Ship Fast. Measure Everything.

**Success = Apps Built & Shared, not Tasks Created.**

**Remember:**
- Stay focused on North Star Metric
- Don't polish Task Management
- Ship incrementally (weekly releases)
- User feedback > personal opinion
- Week 12 = GO/NO-GO decision point

**Good luck! 🚀**

---

**Document Owner:** NEXUS Development Team  
**Last Updated:** 19 tháng 11, 2025  
**Next Review:** 25 tháng 11, 2025 (End of Week 2)  
**Questions?** Check [NEXUS_WHITEPAPER.md](01-STRATEGY/NEXUS_WHITEPAPER.md) or ask user directly.
