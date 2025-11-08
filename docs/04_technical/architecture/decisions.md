# Architecture Decisions - NEXUS

## ADR 001: Why Supabase Instead of NestJS Backend?

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

## Summary Table

| Decision | Choice | Rationale | Pivot Trigger |
|----------|--------|-----------|---------------|
| Backend | Supabase | Zero DevOps, free tier | >5K users |
| State | Zustand | Simple, AI-friendly | >10 complex stores |
| Editor | Tiptap | Fast to ship | User demand |
| Real-time | Skip | Not MVP critical | Top 3 request |
| App Mini | Components + iframe later | Hybrid flexibility | Users want custom |
| Database | PostgreSQL JSONB | One DB simpler | >100GB data |

---

## Open Questions (To Decide Later)

1. **Payments:** Stripe vs Paddle vs LemonSqueezy?
2. **Mobile:** PWA vs React Native?
3. **Search:** PostgreSQL full-text vs Algolia vs Elasticsearch?
4. **Email:** SendGrid vs Resend vs Amazon SES?

**Decision timing:** After MVP, based on actual needs

---

**Last Updated:** November 7, 2025  
**Next Review:** Week 4 (POC complete)
