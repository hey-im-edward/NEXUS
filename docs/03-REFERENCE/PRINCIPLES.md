# 🧭 NEXUS PRINCIPLES - Core Development Philosophy

**Nguồn chính:** [NEXUS_WHITEPAPER.md](../01-STRATEGY/NEXUS_WHITEPAPER.md)

**Cập nhật:** 17 tháng 11, 2025

**Version:** v3.0 (The Platform Pivot)

---

## 📖 Overview

This document outlines the core principles that guide NEXUS development. These are not just guidelines - they are **decision-making frameworks** that help us stay focused on what matters.

**Core Philosophy:**

> "NEXUS is a Platform for building and sharing apps, NOT a task manager with extra features."

---

## 🎯 PRINCIPLE #1: Platform First, Task Management Second

### The Core Belief

**NOT:** Build the best task manager in the world

**BUT:** Build a platform where users build and share apps (including task managers)

### What This Means

**DO:**

- ✅ Prioritize App Builder features
- ✅ Prioritize Marketplace features
- ✅ Measure success by "Apps Built and Shared"
- ✅ Keep Task Management "good enough"

**DON'T:**

- ❌ Add advanced task management features (tags, search, recurring, etc.)
- ❌ Polish Task Management beyond MVP
- ❌ Compete with Todoist/Notion on task features
- ❌ Measure success by "Tasks Created"

### Decision Framework

**When deciding on a feature, ask:**

1. **Does this help users build apps?** → Prioritize
2. **Does this help users discover/install apps?** → Prioritize
3. **Does this improve Task Management?** → Backlog (unless critical bug)

### Examples

**Example 1: User requests "Tags for Tasks"**

- ❌ **DON'T:** Build tags system for tasks
- ✅ **DO:** Let users build a "Task Manager with Tags" app using App Builder

**Example 2: User requests "App Templates"**

- ✅ **DO:** Build app templates for App Builder
- ✅ **DO:** Pre-seed marketplace with 10+ templates

**Example 3: User requests "Keyboard Shortcuts for Tasks"**

- ❌ **DON'T:** Add keyboard shortcuts (nice-to-have)
- ✅ **DO:** Focus on App Builder UX (critical path)

---

## 🏗️ PRINCIPLE #2: Code First Strategy

### The Core Belief

**NOT:** Design everything upfront, then code

**BUT:** Code first, design as you go

### What This Means

**DO:**

- ✅ Start coding ASAP (Tuần 1, not Tuần 5)
- ✅ Merge Tuần 0-4 into Tuần 1-4
- ✅ Skip detailed design phase
- ✅ Iterate based on real code, not mockups

**DON'T:**

- ❌ Spend weeks on Figma mockups
- ❌ Over-plan before coding
- ❌ Delay coding until "design is perfect"

### Decision Framework

**When deciding on approach, ask:**

1. **Can I code this now?** → Code it
2. **Do I need to design this first?** → Only if complex (e.g., multi-step flows)
3. **Is this blocking me from coding?** → Find workaround, keep coding

### Examples

**Example 1: App Builder UI unclear**

- ❌ **DON'T:** Spend 1 week on Figma mockups
- ✅ **DO:** Code basic UI, iterate based on usage

**Example 2: Marketplace layout unclear**

- ❌ **DON'T:** Design all possible layouts
- ✅ **DO:** Code grid layout, adjust based on real content

**Example 3: Dashboard Grid unclear**

- ✅ **DO:** Reference existing products (Notion, iOS Home Screen)
- ✅ **DO:** Code simple version, improve later

---

## 🚀 PRINCIPLE #3: Ship Fast, Iterate Later

### The Core Belief

**NOT:** Ship perfect features slowly

**BUT:** Ship imperfect features fast, iterate based on feedback

### What This Means

**DO:**

- ✅ Ship MVP features in 1-2 days
- ✅ Get user feedback immediately
- ✅ Iterate based on real usage
- ✅ Fix bugs in production

**DON'T:**

- ❌ Perfectionism before shipping
- ❌ Wait for all edge cases to be handled
- ❌ Delay shipping for "polish"

### Decision Framework

**When deciding if feature is ready, ask:**

1. **Does it work for happy path?** → Ship it
2. **Does it handle edge cases?** → Ship, fix later
3. **Is it polished?** → Ship, polish later

### Examples

**Example 1: DashboardGrid has minor layout bug on mobile**

- ✅ **DO:** Ship it, fix bug in next iteration
- ❌ **DON'T:** Hold release for perfect mobile behavior

**Example 2: App Builder missing undo/redo**

- ✅ **DO:** Ship without undo/redo (v0.1)
- ✅ **DO:** Add undo/redo in v0.2 if users complain

**Example 3: Marketplace missing advanced search**

- ✅ **DO:** Ship with basic search
- ✅ **DO:** Add advanced search later if needed

---

## 🎨 PRINCIPLE #4: Keep It Simple, Keep It Boring

### The Core Belief

**NOT:** Use latest, cutting-edge technology

**BUT:** Use boring, proven technology

### What This Means

**DO:**

- ✅ Use well-documented libraries (Next.js, React, Supabase)
- ✅ Use conventional patterns (everyone does it this way)
- ✅ Choose simplicity over cleverness
- ✅ Choose boring over exciting

**DON'T:**

- ❌ Use experimental libraries (no production usage)
- ❌ Use custom solutions (when library exists)
- ❌ Over-engineer (YAGNI - You Aren't Gonna Need It)
- ❌ Reinvent the wheel

### Decision Framework

**When choosing technology, ask:**

1. **Is this well-documented?** → Use it
2. **Do millions of developers use this?** → Use it
3. **Is this cutting-edge/experimental?** → Avoid it
4. **Can AI generate code for this?** → Prefer it

### Examples

**Example 1: State Management**

- ✅ **DO:** Use Zustand (simple, boring, proven)
- ❌ **DON'T:** Use MobX (less popular, steeper learning curve)

**Example 2: Styling**

- ✅ **DO:** Use TailwindCSS (utility-first, boring, AI-friendly)
- ❌ **DON'T:** Use styled-components (more boilerplate)

**Example 3: Backend**

- ✅ **DO:** Use Supabase (BaaS, no backend code needed)
- ❌ **DON'T:** Build custom NestJS backend (overkill for MVP)

---

## 🔒 PRINCIPLE #5: Security First, Always

### The Core Belief

**NOT:** Ship fast, fix security later

**BUT:** Ship fast with security baked in

### What This Means

**DO:**

- ✅ Use Row Level Security (RLS) for all tables
- ✅ Validate all inputs (client + server)
- ✅ Never trust user data
- ✅ Use parameterized queries (no SQL injection)
- ✅ Use HTTPS everywhere (automatic via Vercel)

**DON'T:**

- ❌ Ship without RLS policies
- ❌ Trust client-side validation only
- ❌ Store sensitive data in localStorage
- ❌ Expose API keys in frontend code

### Decision Framework

**When shipping a feature, ask:**

1. **Does this table have RLS policies?** → Required before ship
2. **Is user input validated?** → Required before ship
3. **Can this be exploited?** → Fix before ship

### Examples

**Example 1: User Dashboard Layouts table**

- ✅ **DO:** Add RLS policy: `auth.uid() = user_id`
- ❌ **DON'T:** Ship without RLS (users can see others' layouts)

**Example 2: App Marketplace**

- ✅ **DO:** Validate app definition JSON (schema validation)
- ❌ **DON'T:** Allow arbitrary JSON (XSS risk)

**Example 3: User Authentication**

- ✅ **DO:** Use Supabase Auth (built-in security)
- ❌ **DON'T:** Build custom auth (security nightmare)

---

## 📊 PRINCIPLE #6: Measure What Matters

### The Core Belief

**NOT:** Measure vanity metrics

**BUT:** Measure North Star Metric

### What This Means

**North Star Metric:**

> **"How many apps built and shared?"**
>
> Formula: (Apps Built by Users) × (Average Installs per App)

**DO:**

- ✅ Track apps created
- ✅ Track apps installed from marketplace
- ✅ Track active users (using 3+ apps)
- ✅ Track marketplace activity

**DON'T:**

- ❌ Track tasks created (wrong metric)
- ❌ Track page views (vanity metric)
- ❌ Track sign-ups only (no engagement)

### Decision Framework

**When measuring success, ask:**

1. **Does this metric align with Platform vision?** → Track it
2. **Does this metric measure Task Management?** → Don't prioritize
3. **Is this a vanity metric?** → Ignore it

### Examples

**Example 1: User creates 100 tasks**

- ❌ **NOT SUCCESS:** Tasks created (wrong metric)
- ✅ **SUCCESS IF:** User built custom Task Manager app + published

**Example 2: User signs up**

- ❌ **NOT SUCCESS:** Sign-up alone (no engagement)
- ✅ **SUCCESS IF:** User installs 3+ apps, builds 1+ app

**Example 3: Marketplace has 100 page views**

- ❌ **NOT SUCCESS:** Page views (vanity metric)
- ✅ **SUCCESS IF:** 50 apps installed, 10 apps published

---

## 🧪 PRINCIPLE #7: Validate Early, Pivot Fast

### The Core Belief

**NOT:** Commit to plan, execute blindly

**BUT:** Validate hypotheses, pivot if wrong

### What This Means

**DO:**

- ✅ Set GO/NO-GO criteria (Week 9)
- ✅ Measure metrics weekly
- ✅ Be ready to pivot (Week 9-12)
- ✅ Shut down gracefully if NO-GO

**DON'T:**

- ❌ Commit to roadmap blindly
- ❌ Ignore negative signals
- ❌ Continue building if users don't care

### Decision Framework

**At Week 9, evaluate GO/NO-GO:**

**GO Criteria (need 2 of 3):**

1. ✅ **Apps Created:** 10+ users built custom apps
2. ✅ **Marketplace Activity:** 30+ installations
3. ✅ **Engagement:** 5+ users actively using 3+ apps

**If GO:**

- Continue to Low-Code features (Week 10-12)
- Prepare for public launch

**If NO-GO:**

- Analyze why (user interviews, data)
- Pivot options:
  - Simplify to template marketplace (no builder)
  - Focus on specific vertical (CRM, Finance)
  - Shut down gracefully

### Examples

**Example 1: Week 8 - Only 2 users built apps**

- ⚠️ **WARNING:** Not hitting target (10+ users)
- ✅ **ACTION:** Investigate why, iterate on App Builder UX

**Example 2: Week 9 - Only 1 of 3 GO criteria met**

- ❌ **NO-GO:** Pivot or shutdown
- ✅ **ACTION:** User interviews, analyze root cause

**Example 3: Week 9 - All 3 GO criteria met**

- ✅ **GO:** Continue to Low-Code tier
- ✅ **ACTION:** Expand beta to 100 users, prepare launch

---

## 🎯 PRINCIPLE #8: Progressive Disclosure (3-Tier Builder)

### The Core Belief

**NOT:** Expose all features upfront (overwhelm users)

**BUT:** Progressive disclosure (reveal complexity gradually)

### What This Means

**3-Tier Builder:**

**Tier 1: No-Code (Week 1-4 MVP)**

- 5 components (TextBlock, Button, Input, Container, List)
- 3 actions (Append to List, Clear Input, Show/Hide)
- NO conditional logic, NO database, NO custom styling

**Tier 2: Low-Code (Week 10-12 if GO)**

- 15 components
- Conditional logic (IF/THEN)
- Database integration (Supabase tables)
- Form validation

**Tier 3: Pro-Code (Future)**

- Custom React components
- API integrations (Zapier, webhooks)
- Custom JavaScript logic

**DO:**

- ✅ Start with No-Code (simplest)
- ✅ Only add complexity if users need it
- ✅ Hide advanced features behind "Advanced" tab

**DON'T:**

- ❌ Expose all features in v0.1
- ❌ Overwhelm users with options

### Decision Framework

**When adding a feature, ask:**

1. **Is this needed for No-Code tier?** → Add to v0.1
2. **Is this needed for Low-Code tier?** → Add to v0.2 (if GO)
3. **Is this advanced/niche?** → Add to v0.3+ (future)

### Examples

**Example 1: User requests "Custom JavaScript in App"**

- ❌ **DON'T:** Add to No-Code tier (too complex)
- ✅ **DO:** Backlog for Tier 3 (Pro-Code)

**Example 2: User requests "IF/THEN workflows"**

- ❌ **DON'T:** Add to No-Code tier (complexity)
- ✅ **DO:** Add to Tier 2 (Low-Code, if GO)

**Example 3: User requests "More components"**

- ✅ **DO:** Add simple components to No-Code (e.g., Image)
- ❌ **DON'T:** Add complex components (e.g., Chart) yet

---

## 💬 PRINCIPLE #9: Keep It, Don't Polish It (Task Management)

### The Core Belief

**NOT:** Build the best task manager

**BUT:** Build "good enough" task manager, focus on Platform

### What This Means

**KEEP (Good Enough):**

- ✅ CRUD for tasks (Create, Read, Update, Complete, Prioritize)
- ✅ Kanban Board (Today, Inbox, Backlog)
- ✅ Filters (Today, Inbox)
- ✅ Priority levels (High, Medium, Low)

**DON'T ADD (Backlog Forever):**

- 🔄 Tags, advanced filters, search
- 🔄 Task detail modal
- 🔄 Delete task functionality
- 🔄 Keyboard shortcuts
- 🔄 Recurring tasks
- 🔄 Calendar view
- 🔄 Task dependencies
- 🔄 Time tracking

### Why?

1. **Platform features are the differentiator** (App Builder + Marketplace)
2. **Task management is commodity** (Todoist, Notion already exist)
3. **Time is limited** (12 weeks)
4. **Focus on North Star Metric** ("Apps Built and Shared")

### Message to Users

> "Our task manager is simple by design. Use it to track your work building apps. If you need advanced task management, continue using Todoist or Notion alongside NEXUS."

---

## 🤖 PRINCIPLE #10: AI-First Development

### The Core Belief

**NOT:** Write all code manually

**BUT:** Use AI to accelerate development

### What This Means

**DO:**

- ✅ Use AI-friendly tech stack (Next.js, React, Supabase)
- ✅ Use well-documented libraries (AI has seen examples)
- ✅ Use Claude/GPT for code generation
- ✅ Use conventional patterns (AI knows them)
- ✅ Write clear prompts for AI

**DON'T:**

- ❌ Use obscure libraries (AI hasn't seen them)
- ❌ Use custom solutions (AI can't generate)
- ❌ Write everything from scratch

### Decision Framework

**When choosing approach, ask:**

1. **Can AI generate this?** → Prefer it
2. **Is this well-documented?** → AI can help
3. **Is this custom/obscure?** → Avoid it

### Examples

**Example 1: Building Dashboard Grid**

- ✅ **DO:** Use `react-grid-layout` (AI knows it, 20K stars)
- ❌ **DON'T:** Build custom grid from scratch

**Example 2: Building Form Validation**

- ✅ **DO:** Use React Hook Form (AI knows it)
- ❌ **DON'T:** Build custom validation library

**Example 3: Database Queries**

- ✅ **DO:** Use Supabase SDK (AI can generate)
- ❌ **DON'T:** Write raw SQL (error-prone)

---

## 📝 PRINCIPLE #11: Document Decisions, Not Code

### The Core Belief

**NOT:** Write code comments for everything

**BUT:** Document high-level decisions, not low-level code

### What This Means

**DO:**

- ✅ Document WHY (decision rationale)
- ✅ Document WHAT (feature requirements)
- ✅ Document HOW (architecture, not code)
- ✅ Update docs as decisions change

**DON'T:**

- ❌ Write code comments for obvious code
- ❌ Document implementation details (code is self-documenting)
- ❌ Write docs that become outdated

### Decision Framework

**When documenting, ask:**

1. **Is this a high-level decision?** → Document it
2. **Is this obvious from code?** → Skip it
3. **Will future me forget why?** → Document it

### Examples

**Example 1: Why Zustand instead of Redux?**

- ✅ **DO:** Document in [TECH_STACK.md](TECH_STACK.md)
- **Reason:** Simpler, smaller bundle, TypeScript-first

**Example 2: Why 12 columns for grid?**

- ✅ **DO:** Document in [ROADMAP.md](../02-EXECUTION/ROADMAP.md)
- **Reason:** Standard for responsive grids

**Example 3: How to use Zustand?**

- ❌ **DON'T:** Write detailed usage guide
- ✅ **DO:** Link to official docs

---

## ✅ PRINCIPLE #12: Testing in Production

### The Core Belief

**NOT:** Write unit tests for everything before shipping

**BUT:** Ship to production, fix bugs as they appear

### What This Means

**DO:**

- ✅ Ship features to production quickly
- ✅ Monitor errors (Sentry, logs)
- ✅ Fix critical bugs immediately
- ✅ Iterate based on real usage

**DON'T:**

- ❌ Write unit tests for MVP (overkill)
- ❌ Write E2E tests before v1.0 (slow iteration)
- ❌ Hold releases for 100% test coverage

### Decision Framework

**When deciding on testing strategy, ask:**

1. **Is this a critical path?** → Test manually, ship
2. **Is this a nice-to-have?** → Ship, fix if breaks
3. **Is this v1.0+?** → Consider automated tests

### Examples

**Example 1: Dashboard Grid**

- ✅ **DO:** Test manually, ship to production
- ❌ **DON'T:** Write unit tests for drag-drop logic

**Example 2: App Builder**

- ✅ **DO:** Test manually, ship to beta users
- ❌ **DON'T:** Write E2E tests before v1.0

**Example 3: Payment Flow (Future)**

- ✅ **DO:** Write tests (critical, high-risk)
- ✅ **DO:** Test in staging before production

---

## 🚦 Decision Framework Summary

**When making ANY decision, ask these questions in order:**

1. **Does this align with Platform First principle?** (Principle #1)
2. **Can I code this now?** (Principle #2)
3. **Can I ship this fast?** (Principle #3)
4. **Is this simple and boring?** (Principle #4)
5. **Is this secure?** (Principle #5)
6. **Does this move North Star Metric?** (Principle #6)
7. **Can I validate this early?** (Principle #7)

**If YES to most → DO IT**

**If NO to most → DON'T DO IT (or backlog)**

---

## 📚 Related Documents

- **Strategy:** [NEXUS_WHITEPAPER.md](../01-STRATEGY/NEXUS_WHITEPAPER.md)
- **Execution:** [ROADMAP.md](../02-EXECUTION/ROADMAP.md)
- **Execution:** [AI_PROMPTS.md](../02-EXECUTION/AI_PROMPTS.md)
- **Reference:** [TECH_STACK.md](TECH_STACK.md)
- **Status:** [THIS_WEEK.md](../02-EXECUTION/status/THIS_WEEK.md)
- **Status:** [FEATURES.md](../02-EXECUTION/status/FEATURES.md)
- **Status:** [BUGS.md](../02-EXECUTION/status/BUGS.md)

---

## 🎯 TL;DR - The 12 Principles

1. **Platform First, Task Management Second** - Build a platform, not a task manager
2. **Code First Strategy** - Code now, design later
3. **Ship Fast, Iterate Later** - Imperfect fast > perfect slow
4. **Keep It Simple, Keep It Boring** - Proven tech > cutting-edge
5. **Security First, Always** - RLS, validation, no shortcuts
6. **Measure What Matters** - North Star Metric only
7. **Validate Early, Pivot Fast** - GO/NO-GO at Week 9
8. **Progressive Disclosure** - 3-tier builder (No-Code → Low-Code → Pro-Code)
9. **Keep It, Don't Polish It** - Task management stays "good enough"
10. **AI-First Development** - Use AI to accelerate
11. **Document Decisions, Not Code** - WHY, not HOW
12. **Testing in Production** - Ship fast, fix bugs in prod

---

**Remember:** These principles are decision-making frameworks. When in doubt, refer back to them.

**Cập nhật lần cuối:** 17 tháng 11, 2025

**Owner:** NEXUS Development Team

**Version:** v3.0 (The Platform Pivot)

---

**"Build a platform, not a product. Ship fast, iterate fast. Measure what matters."**
