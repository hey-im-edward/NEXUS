# Architecture Decisions - NEXUS

> **Mục đích:** Lưu trữ các quyết định kiến trúc quan trọng (Architecture Decision Records - ADRs) để hiểu tại sao chọn X thay vì Y.

**Created:** November 7, 2025  
**Last Updated:** November 9, 2025

---

## Table of Contents

1. [ADR-001: Supabase vs NestJS Backend](#adr-001-supabase-vs-nestjs-backend)
2. [ADR-002: Next.js App Router vs Pages Router](#adr-002-nextjs-app-router-vs-pages-router)
3. [ADR-003: Zustand vs Redux](#adr-003-zustand-vs-redux-for-state-management)
4. [ADR-004: Tiptap vs Block Editor](#adr-004-block-editor-vs-rich-text-editor)
5. [ADR-005: Real-time Collaboration](#adr-005-real-time-collaboration---skip-for-mvp)
6. [ADR-006: App Mini Architecture](#adr-006-app-mini-architecture)
7. [ADR-007: Database Schema Strategy](#adr-007-database-schema-strategy)
8. [ADR-008: @dnd-kit vs react-beautiful-dnd](#adr-008-dnd-kit-vs-react-beautiful-dnd)
9. [ADR-009: rrule for Recurring Tasks](#adr-009-rrule-for-recurring-tasks)
10. [ADR-010: Documentation Structure](#adr-010-documentation-structure)

---

## ADR-001: Supabase vs NestJS Backend

**Date:** November 7, 2025  
**Status:** Accepted  
**Decision Maker:** Edward (Founder)

### Context
Ban đầu ChatGPT và Claude đều đề xuất:
- Frontend: Next.js
- Backend: NestJS
- Database: PostgreSQL + MongoDB + Redis
- Deployment: Docker + Kubernetes

Tuy nhiên, với context thực tế:
- Team: 1-2 người
- Budget: Free tier only ($0/month)
- Timeline: 12 tuần đến MVP
- Skill: Zero backend experience, học qua AI (Cursor)

### Decision
**Chọn Supabase thay vì NestJS + PostgreSQL self-hosted**

### Rationale

#### Pros of Supabase:
1. **No server management**
   - Không cần setup Docker, Kubernetes
   - Không cần manage PostgreSQL backups, scaling
   - Vercel deploy 1-click cho frontend

2. **Auth built-in**
   - Google OAuth trong 5 phút
   - Email/password auth
   - Row Level Security (RLS) cho permissions

3. **Real-time built-in**
   - WebSocket subscriptions tự động
   - Không cần setup Socket.io, Redis pub/sub

4. **Cost-effective**
   - Free tier: 500MB DB, 50K MAU
   - Đủ cho 500-1000 users đầu tiên
   - Upgrade $25/month khi cần

5. **AI-friendly code generation**
   - Cursor/Copilot có nhiều examples với Supabase
   - Simpler API → easier prompts

#### Cons of Supabase:
1. **Vendor lock-in**
   - Mitigation: Supabase is open-source, có thể self-host sau
   
2. **Less control over backend logic**
   - Mitigation: Dùng Edge Functions cho custom logic nếu cần

3. **Query complexity limits**
   - Mitigation: Đủ cho MVP, refactor sau nếu cần

#### Why NOT NestJS:
1. **Overkill cho MVP**
   - NestJS best for large teams, microservices
   - We're 2 people, monolithic app

2. **Slower development**
   - Setup: Docker, database migrations, auth middleware
   - Estimate: +2 weeks just setup

3. **Deployment complexity**
   - Need separate hosting for backend
   - CI/CD setup
   - Database backups, monitoring

4. **Cost**
   - Backend hosting: $10-50/month minimum
   - Database: $10-20/month
   - Redis: $10/month
   - Total: $30-80/month vs $0 with Supabase

### Consequences

**Positive:**
- Ship faster (cut 2-3 weeks from timeline)
- Zero DevOps burden
- Free hosting for POC/MVP
- Focus on product, not infrastructure

**Negative:**
- Limited backend customization
- May need refactor later if Supabase limits hit

### Pivot Plan
If Supabase becomes bottleneck (unlikely before 10K users):
1. Migrate to self-hosted PostgreSQL
2. Build NestJS API layer
3. Keep using Supabase Auth (can be decoupled)

**Effort estimate:** 4-6 weeks  
**Trigger:** >5K active users OR complex backend logic needed

---

## ADR 002: Next.js App Router vs Pages Router

**Date:** November 7, 2025  
**Status:** Accepted

### Decision
**Use Next.js 14 App Router (not Pages Router)**

### Rationale

#### Pros:
- Server Components → smaller bundle size
- Better SEO (important for marketing pages)
- Streaming and Suspense
- Future of Next.js (Pages Router in maintenance mode)

#### Cons:
- Slightly steeper learning curve
- Some libraries not fully compatible yet

### Decision
**App Router** - bite the bullet, learn it right

---

## ADR 003: Zustand vs Redux for State Management

**Date:** November 7, 2025  
**Status:** Accepted

### Decision
**Zustand (not Redux, not Context API)**

### Rationale

#### Why Zustand:
```typescript
// Zustand - 10 lines
import create from 'zustand'

const useStore = create((set) => ({
  dashboards: [],
  addDashboard: (dashboard) => set((state) => ({ 
    dashboards: [...state.dashboards, dashboard] 
  })),
}))

// vs Redux - 50+ lines (store, reducer, actions, types...)
```

- **Simpler:** 80% less boilerplate
- **AI-friendly:** Cursor can generate Zustand easier
- **Performance:** Same as Redux (subscriptions)
- **DevTools:** Has dev tools support

#### Why NOT Redux:
- Overkill for MVP
- Too much boilerplate
- Harder for AI to generate correctly

#### Why NOT Context API:
- Re-render issues at scale
- No DevTools

### When to Migrate to Redux?
**Trigger:** If state becomes too complex (>10 stores with dependencies)  
**Likelihood:** <10% (Zustand scales well)

---

## ADR 004: Block Editor vs Rich Text Editor

**Date:** November 7, 2025  
**Status:** Accepted

### Decision
**Rich Text Editor (Tiptap) for POC/MVP, NOT Block Editor**

### Context
Notion uses block-based editor (each paragraph is a "block").  
We initially wanted to clone this.

### Why NOT Block Editor for MVP:

1. **Complexity:**
   - Block editor = 2-3 weeks dev time
   - Rich text editor = 3-5 days

2. **MVP doesn't need it:**
   - Users want "docs" + "tasks" + "CRM"
   - Block editor is nice-to-have, not must-have

3. **AI code generation:**
   - Tiptap has more examples → easier Cursor prompts
   - Block editor logic is custom → harder to gen

### POC Approach:
```typescript
// Use Tiptap with extensions:
- Bold, Italic, Lists
- Headings (H1, H2, H3)
- Links
- Code blocks

// Skip for POC:
- Todo checkboxes
- Tables
- Embeds
- Database views
```

### Pivot Plan:
**When:** After MVP, if users request it  
**Effort:** 3-4 weeks to migrate from Tiptap to block-based  
**Libraries to consider:** 
- BlockNote
- Slate
- Lexical (Facebook)
- Custom (like Notion - hardest)

---

## ADR 005: Real-time Collaboration - Skip for MVP

**Date:** November 7, 2025  
**Status:** Accepted

### Decision
**NO real-time collaboration in MVP**

### Context
Google Docs-like collaboration where you see:
- Other users' cursors
- Live edits
- Conflict-free merging

Technologies needed:
- CRDT (Yjs) or OT (ShareDB)
- WebSocket server
- Conflict resolution logic

### Why Skip:

1. **Extremely complex:**
   - Notion spent 2 years on real-time
   - Yjs learning curve: 2-3 weeks minimum

2. **Not must-have for SME use case:**
   - Most SME teams work async, not real-time
   - "Last edited by X at Y" is enough for MVP

3. **MVP success doesn't depend on it:**
   - Core value: tool consolidation, not real-time collab

### MVP Approach:
```typescript
// Simple approach:
- Optimistic UI updates
- Manual refresh to see others' changes
- "Last edited" indicator
- Conflict warning: "X edited this while you were editing"

// No:
- Live cursors
- Real-time text updates
- Auto-merge conflicts
```

### Pivot Plan:
**When:** After MVP, if top 3 feature request  
**Effort:** 6-8 weeks with Yjs  
**Priority:** Medium (nice-to-have, not critical)

---

## ADR 006: App Mini Architecture

**Date:** November 7, 2025  
**Status:** Accepted

### Decision
**Hybrid approach: Pre-built Components + iframe for custom**

### App Mini Types:

#### Type 1: Pre-built Components (POC/MVP)
```typescript
interface PrebuiltAppMini {
  type: 'todo-list' | 'kanban' | 'table'
  config: {
    columns?: string[]
    defaultStatus?: string
    // etc.
  }
}

// Render:
{type === 'todo-list' && <TodoListComponent config={config} />}
```

**Pros:**
- Fast to build (reuse React components)
- Type-safe
- Can share database with host

**Cons:**
- Limited to what we pre-build
- Not extensible by users

#### Type 2: iframe (Future - Marketplace)
```typescript
interface IframeAppMini {
  type: 'iframe'
  url: string
  permissions: {
    database: boolean
    network: boolean
  }
}

// Render:
<iframe 
  sandbox="allow-scripts"
  src={url}
/>
```

**Pros:**
- Users can build anything
- Marketplace potential

**Cons:**
- Security concerns (need sandbox)
- Harder communication with host

### MVP Strategy:
1. **POC (Week 1-4):** Only Type 1 (3 pre-built)
2. **MVP (Week 5-8):** Add 5-10 more pre-built
3. **Post-MVP:** Add Type 2 (iframe) if needed

### When to Add iframe Support?
**Trigger:** Users request custom app minis  
**Effort:** 2-3 weeks for security, sandbox, postMessage API

---

## ADR 007: Database Schema Strategy

**Date:** November 7, 2025  
**Status:** Accepted

### Decision
**Single PostgreSQL (via Supabase), use JSONB for flexible schemas**

### Why NOT MongoDB for App Minis?

ChatGPT/Claude suggested:
- PostgreSQL for core (users, teams)
- MongoDB for app minis (flexible schemas)

**Our decision: Skip MongoDB**

### Rationale:

1. **JSONB is enough:**
```sql
CREATE TABLE app_minis (
  id UUID PRIMARY KEY,
  type TEXT NOT NULL,
  config JSONB,  -- Flexible schema
  data JSONB,    -- App mini data
  created_at TIMESTAMPTZ
);

-- Query still fast with GIN index:
CREATE INDEX idx_config ON app_minis USING GIN (config);

-- Query example:
SELECT * FROM app_minis 
WHERE config @> '{"type": "kanban"}';
```

2. **Cost:**
   - MongoDB: Need separate hosting ($10-50/month)
   - PostgreSQL JSONB: Included in Supabase free tier

3. **Complexity:**
   - Managing 2 databases → 2x complexity
   - For <10K app minis, JSONB performs fine

### When to Add MongoDB?
**Trigger:** 
- App mini data >100GB
- Need full-text search on JSONB (Elasticsearch better choice)
- Performance issues with JSONB queries

**Likelihood:** <5% before 10K users

---

## ADR-008: @dnd-kit vs react-beautiful-dnd

**Date:** November 2025  
**Status:** Accepted  
**Decision Maker:** Edward (Founder)

### Context
Cần drag & drop library cho Kanban board. Hai options phổ biến:
- `react-beautiful-dnd` - By Atlassian, used in Trello
- `@dnd-kit` - Modern, modular library

### Decision
**Chọn @dnd-kit thay vì react-beautiful-dnd**

### Rationale

#### Why @dnd-kit:

1. **React 18+ Support**
   - `react-beautiful-dnd` không support React 18 Strict Mode
   - Causes double rendering, warnings in console
   - Atlassian chưa update (maintenance mode)

2. **Modern Architecture**
   - TypeScript-first design
   - Modular (chỉ import những gì cần)
   - Better performance với virtualized lists

3. **Mobile Support**
   - Touch support out-of-the-box
   - Better multi-touch handling
   - Works on iOS Safari (no quirks)

4. **Accessibility**
   - Built-in ARIA attributes
   - Keyboard navigation support
   - Screen reader friendly

5. **Future-proof**
   - Active development
   - React 19 compatible
   - Regular updates

#### Why NOT react-beautiful-dnd:

1. **Maintenance mode**
   - Last major update: 2021
   - React 18 strict mode issues
   - Unclear future roadmap

2. **Bundle size**
   - Monolithic (must import everything)
   - Larger bundle size

3. **API complexity**
   - Less intuitive API
   - Harder to customize

### Implementation Example:

```typescript
// @dnd-kit setup
import { DndContext, closestCenter } from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'

function KanbanBoard() {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor)
  )

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext items={tasks} strategy={verticalListSortingStrategy}>
        {tasks.map(task => <TaskCard key={task.id} task={task} />)}
      </SortableContext>
    </DndContext>
  )
}
```

### Consequences

**Positive:**
- ✅ React 19 compatible (future-proof)
- ✅ Works perfectly với Next.js App Router
- ✅ Touch support = mobile-friendly
- ✅ Accessibility built-in

**Negative:**
- ⚠️ API phức tạp hơn react-beautiful-dnd (steeper learning curve)
- ⚠️ Cần học về sensors, collision detection
- ⚠️ Ít examples trên internet hơn react-beautiful-dnd

### Result
✅ Kanban drag-drop hoạt động smooth, no React warnings, mobile works great

**Effort:** 4 hours to learn API + implement  
**Alternative considered:** HTML5 Drag & Drop API (rejected - poor mobile support)

---

## ADR-009: rrule for Recurring Tasks

**Date:** October 2025  
**Status:** Accepted (Planned for Week 5-6)  
**Decision Maker:** Edward (Founder)

### Context
Users need recurring tasks (e.g., "Review emails every weekday 9am", "Pay rent 1st of month").

Options:
1. **Build custom recurring logic** - Code our own solution
2. **Use rrule library** - Industry standard (RFC-5545)
3. **Use cron syntax** - Server-style scheduling

### Decision
**Chọn rrule library (RFC-5545 standard)**

### Rationale

#### Why rrule:

1. **Industry Standard**
   - RFC-5545 (iCalendar standard)
   - Google Calendar, Apple Calendar, Outlook use it
   - Interoperable with calendar apps

2. **Handles Edge Cases**
   - Leap years
   - Timezone changes (DST)
   - "Last Friday of month"
   - "Every 2 weeks on Monday and Wednesday"
   - Exclusion dates (skip holidays)

3. **Battle-tested**
   - Used by millions of calendar apps
   - Edge cases already solved
   - TypeScript support

4. **Future-proof**
   - Can export to .ics files
   - Can sync with Google Calendar (future feature)

#### Why NOT Custom Logic:

```typescript
// Custom logic would look like:
if (frequency === 'daily') {
  nextDate = addDays(currentDate, interval)
} else if (frequency === 'weekly') {
  nextDate = addWeeks(currentDate, interval)
  // But what about "every 2nd Tuesday"?
  // What about "last Friday of month"?
  // What about DST?
}

// Too many edge cases to handle!
```

- ❌ Reinventing the wheel
- ❌ Bugs with edge cases (leap years, DST)
- ❌ Can't sync with external calendars

#### Why NOT Cron Syntax:

```
0 9 * * 1-5  # Every weekday 9am
```

- ❌ Server-centric (not designed for user-facing apps)
- ❌ Confusing for users
- ❌ Doesn't handle "until date" well
- ❌ Timezone handling poor

### Implementation Plan:

```typescript
import { RRule, RRuleSet } from 'rrule'

// Database schema
interface Task {
  id: string
  title: string
  recurrence_rule: string | null  // rrule string
  recurrence_end_date: Date | null
}

// Example usage
const rule = new RRule({
  freq: RRule.DAILY,
  interval: 1,
  dtstart: new Date(2025, 10, 9),
  until: new Date(2026, 10, 9)
})

// Get next 10 occurrences
const nextDates = rule.all((date, i) => i < 10)

// Human-readable
rule.toText() // "every day until November 9, 2026"
```

**UI Approach:**
- Simple dropdown: "Does not repeat" | "Daily" | "Weekly" | "Monthly" | "Custom"
- Custom modal for complex patterns
- Display human-readable version below

### Consequences

**Positive:**
- ✅ Solves all edge cases (DST, leap years, etc.)
- ✅ Industry standard (interoperable)
- ✅ Future-proof (can export/sync with calendars)
- ✅ TypeScript support

**Negative:**
- ⚠️ rrule syntax is cryptic (FREQ=DAILY;INTERVAL=2)
  - Mitigation: Hide syntax, show human-readable text
- ⚠️ Bundle size (~15KB)
  - Mitigation: Lazy load rrule library
- ⚠️ Learning curve for developers
  - Mitigation: Create helper functions

### Result
⏳ Planned for Week 5-6 implementation

**Alternatives considered:**
- Cronitor (paid service)
- Custom date math (rejected - too complex)

---

## ADR-010: Documentation Structure

**Date:** November 8, 2025  
**Status:** Accepted  
**Decision Maker:** Edward (Founder)

### Context
Documentation lộn xộn:
- 31 files .md
- Không rõ đọc file nào trước
- AI và humans khó navigate
- Alphabetical sort không phản ánh logical order

### Decision
**Chọn Numbered Folder Structure**

### Folder Structure:

```
docs/
  00_start-here/       # Số thấp = đọc trước
    README.md
    QUICKSTART_AI.md
    PROJECT_STRUCTURE.md
    
  01_status/           # Current state
    NOW.md
    THIS_WEEK.md
    FEATURES.md
    BUGS.md
    
  02_ai-prompts/       # AI workflow
    AI_PROMPTS.md
    AI_PRINCIPLES.md
    COMPLETED.md
    templates/
    
  03_roadmap/          # Future planning
    ROADMAP.md
    IDEAS.md
    HISTORY.md
    
  04_technical/        # Technical docs
    SETUP.md
    DEPLOY.md
    TROUBLESHOOTING_LOG.md
    architecture/
    
  05_research/         # User research
    user-personas.md
    interview-notes/
    
  archive/             # Old files
    old-versions/
    temp-fixes/
```

### Rationale

#### Why Numbered Folders:

1. **Auto-sort by Importance**
   - File explorer sorts: 00 → 01 → 02...
   - Matches logical reading order
   - No manual organizing needed

2. **Clear Hierarchy**
   - `00_` = Start here
   - `01_` = Current status
   - `02_` = Workflow
   - `03_` = Future
   - `04_` = Technical
   - `05_` = Research

3. **AI-friendly**
   - AI can easily find relevant docs
   - Clear naming = better context

4. **Human-friendly**
   - New team members know where to start
   - No guessing "which file to read first?"

#### Why NOT Alphabetical:

```
❌ Alphabetical (confusing):
- architecture/
- BUGS.md
- FEATURES.md
- NOW.md
- README.md
- ROADMAP.md

✅ Numbered (logical):
- 00_start-here/
- 01_status/
- 02_ai-prompts/
- 03_roadmap/
- 04_technical/
```

#### Why NOT Date-based:

```
❌ Date folders:
- 2025-10/
- 2025-11/
- latest/

Problems:
- Hard to find current docs
- Duplication across months
- Doesn't show importance
```

### Consequences

**Positive:**
- ✅ Auto-sorted logically
- ✅ Easy navigation (humans + AI)
- ✅ Clear hierarchy
- ✅ Scalable (can add 06_, 07_ later)

**Negative:**
- ⚠️ Breaking change (need update all links)
  - Mitigation: Used `git mv` to preserve history
- ⚠️ Folder names longer (`00_start-here` vs `start-here`)
  - Acceptable trade-off for clarity

### Migration:

```bash
# Used git mv to preserve history
git mv docs/NOW.md docs/01_status/NOW.md
git mv docs/FEATURES.md docs/01_status/FEATURES.md
git mv docs/AI_PROMPTS.md docs/02_ai-prompts/AI_PROMPTS.md
# etc.
```

### Result
✅ Documentation rõ ràng hơn nhiều, navigation dễ dàng

**Lesson learned:** Structure matters, especially for AI-driven workflows

---

## Summary Table

| ADR | Decision | Choice | Rationale | Pivot Trigger | Status |
|-----|----------|--------|-----------|---------------|--------|
| 001 | Backend | Supabase | Zero DevOps, free tier | >5K users | ✅ Working |
| 002 | Router | App Router | Future of Next.js | - | ✅ Working |
| 003 | State | Zustand | Simple, AI-friendly | >10 complex stores | ✅ Working |
| 004 | Editor | Tiptap | Fast to ship | User demand | ✅ Working |
| 005 | Real-time | Skip | Not MVP critical | Top 3 request | ⏳ Skipped |
| 006 | App Mini | Components + iframe | Hybrid flexibility | Users want custom | ⏳ Planned |
| 007 | Database | PostgreSQL JSONB | One DB simpler | >100GB data | ✅ Working |
| 008 | Drag & Drop | @dnd-kit | React 19 compatible | - | ✅ Working |
| 009 | Recurring | rrule | Industry standard | - | ⏳ Planned |
| 010 | Docs | Numbered folders | Logical order | - | ✅ Implemented |

**Legend:**
- ✅ Working: Implemented and working
- ⏳ Planned: Decision made, not yet implemented
- ⏳ Skipped: Intentionally skipped for MVP

---

## Open Questions (To Decide Later)

### Future Decisions (Post-MVP)

1. **Payments Integration**
   - **Options:** Stripe vs Paddle vs LemonSqueezy
   - **Decision timing:** Week 10-12 (before launch)
   - **Factors:** Transaction fees, EU VAT handling, UX

2. **Mobile Strategy**
   - **Options:** PWA vs React Native vs Flutter
   - **Decision timing:** Month 6+ (after web traction)
   - **Factors:** Development time, maintenance cost, user demand

3. **Search Infrastructure**
   - **Options:** PostgreSQL full-text vs Algolia vs Meilisearch vs Typesense
   - **Decision timing:** When search becomes slow (>1000 docs)
   - **Factors:** Cost, performance, maintenance

4. **Email Service**
   - **Options:** SendGrid vs Resend vs Amazon SES vs Postmark
   - **Decision timing:** Week 8-10 (notifications needed)
   - **Factors:** Deliverability, cost, developer experience

5. **Analytics**
   - **Options:** Posthog vs Mixpanel vs Amplitude vs Google Analytics 4
   - **Decision timing:** Week 4-6 (track MVP metrics)
   - **Factors:** Privacy, cost, features needed

6. **Error Tracking**
   - **Options:** Sentry vs LogRocket vs Highlight vs Rollbar
   - **Decision timing:** Week 6-8 (production bugs)
   - **Factors:** Cost, debugging features, performance impact

7. **Hosting (if leave Vercel)**
   - **Options:** Railway vs Fly.io vs Render vs AWS
   - **Decision timing:** If Vercel costs >$100/month
   - **Factors:** Cost, performance, deployment ease

---

## Decision-Making Framework

**When to make ADR:**
- ✅ Technology choice với long-term impact
- ✅ Trade-offs giữa 2+ viable options
- ✅ Affects multiple parts của system
- ✅ Có thể gây confusion cho future team members

**ADR Template:**
```markdown
## ADR-XXX: [Title]

**Date:** [Date]
**Status:** Proposed | Accepted | Rejected | Superseded
**Decision Maker:** [Who decided]

### Context
[Why this decision needed? What's the problem?]

### Decision
[What did we choose?]

### Rationale
[Why this choice? Pros/cons analysis]

### Consequences
**Positive:**
- [Benefit 1]

**Negative:**
- [Trade-off 1]

### Result
[How did it turn out? Post-implementation notes]
```

---

## Related Documents

- `docs/03_roadmap/HISTORY.md` - Project timeline và major milestones
- `docs/04_technical/TROUBLESHOOTING_LOG.md` - Bug fixes và learnings
- `docs/02_ai-prompts/AI_PRINCIPLES.md` - Development principles
- `docs/00_start-here/TECH_STACK.md` - Current technology stack

---

**Last Updated:** November 9, 2025  
**Next Review:** Week 4 (POC complete) - Review all decisions, document any pivots  
**Total ADRs:** 10
