# 📅 THIS WEEK - Current Sprint

**Tuần hiện tại:** Tuần 1 (17-23 tháng 11, 2025)

**Giai đoạn:** Platform MVP (Tuần 1-4)

**Nguồn:** [ROADMAP.md](../ROADMAP.md) | [AI_PROMPTS.md](../AI_PROMPTS.md)

**Cập nhật:** 17 tháng 11, 2025

---

## 🎯 TUẦN NÀY: Dashboard Foundation + App Minis

**Theme:** "iOS Home Screen for Productivity"

**Mục tiêu chính:** Xây dựng Dashboard Grid - container chứa tất cả apps

**Timeline:** Tuần 1 (17-23/11/2025)

**Progress:** `[░░░░░░░░░░] 0%`

---

## 📋 PROMPTS TUẦN NÀY

### PROMPT 1.1: Build DashboardGrid Component

**Trạng thái:** 🔴 Chưa bắt đầu

**Thời gian ước tính:** 4-6 giờ

**Deliverables:**

- [ ] Setup `react-grid-layout` v1.5.2
- [ ] Component `DashboardGrid` với drag-and-drop
- [ ] Responsive layout (desktop: free-form, mobile: stack)
- [ ] Database schema: `user_dashboard_layouts` table
- [ ] Persist layout across sessions

**Success Criteria:**

- ✅ Users can drag & resize cards
- ✅ Layout persists across page reloads
- ✅ Grid responsive on mobile

**Reference:** [AI_PROMPTS.md - PROMPT 1.1](../AI_PROMPTS.md#prompt-11-build-dashboardgrid-component)

**Files to Create:**

```text
frontend/app/dashboard/page.tsx
frontend/components/dashboard/DashboardGrid.tsx
backend/supabase/migrations/003_dashboard_layouts.sql
```

---

### PROMPT 1.2: Build AppMiniCard Wrapper

**Trạng thái:** 🔴 Chưa bắt đầu

**Thời gian ước tính:** 2-3 giờ

**Deliverables:**

- [ ] Component `AppMiniCard` wrapper
- [ ] Resize handles
- [ ] Close button
- [ ] Drag handle
- [ ] Auto-save layout on change

**Success Criteria:**

- ✅ Users can resize cards (min: 3x3, max: 12x8 grid units)
- ✅ Users can close cards
- ✅ Layout auto-saves to database

**Reference:** [AI_PROMPTS.md - PROMPT 1.2](../AI_PROMPTS.md#prompt-12-build-appminicard-wrapper)

**Files to Create:**

```text
frontend/components/dashboard/AppMiniCard.tsx
frontend/lib/dashboard-helpers.ts
```

---

### PROMPT 1.3: Build 3 App Minis (Optional, if time permits)

**Trạng thái:** 🟡 Tuần 2 (nhưng có thể bắt đầu nếu xong sớm)

**Thời gian ước tính:** 6-8 giờ

**Deliverables:**

- [ ] **QuickNotesApp:** Text input, character count, localStorage
- [ ] **PomodoroApp:** 25-min countdown, Start/Pause/Reset, notification
- [ ] **TodayTasksApp:** Display tasks due today, real-time subscription

**Reference:** [AI_PROMPTS.md - PROMPT 1.3](../AI_PROMPTS.md#prompt-13-build-3-app-minis)

---

## 🗓️ DAILY BREAKDOWN

### Monday 17/11 - Planning & Setup

**Goal:** Kickoff, setup project structure

**Tasks:**

- [X] Review [NEXUS_WHITEPAPER.md](../../01-STRATEGY/NEXUS_WHITEPAPER.md)
- [X] Review [ROADMAP.md](../ROADMAP.md)
- [X] Review [AI_PROMPTS.md](../AI_PROMPTS.md)
- [ ] Install dependencies

```bash
npm install react-grid-layout
npm install --save-dev @types/react-grid-layout
```

- [ ] Create project structure

```text
frontend/
├── app/
│   └── dashboard/
│       └── page.tsx
├── components/
│   └── dashboard/
│       ├── DashboardGrid.tsx
│       └── AppMiniCard.tsx
```

**Time:** 2-3 hours

---

### Tuesday 18/11 - Start PROMPT 1.1

**Goal:** Begin DashboardGrid implementation

**Tasks:**

- [ ] Read `react-grid-layout` docs
- [ ] Create `DashboardGrid.tsx` component
- [ ] Implement basic grid layout (12 columns)
- [ ] Test drag-and-drop functionality
- [ ] Add responsive breakpoints (lg/md/sm/xs)

**Time:** 4-5 hours

---

### Wednesday 19/11 - Continue PROMPT 1.1

**Goal:** Complete layout persistence

**Tasks:**

- [ ] Create Supabase migration for `user_dashboard_layouts` table
- [ ] Implement save layout to database
- [ ] Implement load layout from database
- [ ] Test layout persistence across sessions
- [ ] Handle edge cases (empty layout, first-time user)

**Time:** 4-5 hours

---

### Thursday 20/11 - Start PROMPT 1.2

**Goal:** Build AppMiniCard wrapper

**Tasks:**

- [ ] Create `AppMiniCard.tsx` component
- [ ] Add header (title, close button, drag handle)
- [ ] Add body area for app content
- [ ] Implement resize handles
- [ ] Test integration with DashboardGrid

**Time:** 3-4 hours

---

### Friday 21/11 - Complete PROMPT 1.2 + Polish

**Goal:** Finish AppMiniCard, polish UI

**Tasks:**

- [ ] Complete AppMiniCard component
- [ ] Implement auto-save on layout change
- [ ] Add hover interactions (highlight, shadows)
- [ ] Test responsive behavior on mobile
- [ ] Fix any bugs found during testing
- [ ] Update [FEATURES.md](FEATURES.md) with completed features
- [ ] Update [BUGS.md](BUGS.md) if any bugs found

**Time:** 3-4 hours

---

### Weekend 22-23/11 - Buffer & Preparation

**Goal:** Code review, bug fixes, prep for Tuần 2

**Tasks:**

- [ ] Code review (check for TypeScript errors)
- [ ] Fix any remaining bugs
- [ ] Test on different browsers (Chrome, Safari, Firefox)
- [ ] Test on different devices (desktop, tablet, mobile)
- [ ] Update this file (THIS_WEEK.md) with progress
- [ ] Prepare for Tuần 2 (read PROMPT 1.3)

**Time:** 2-3 hours (optional)

---

## 📊 PROGRESS TRACKER

| Prompt               | Status         | Progress | Completed Date |
| -------------------- | -------------- | -------- | -------------- |
| **PROMPT 1.1** | 🔴 Not Started | 0%       | -              |
| **PROMPT 1.2** | 🔴 Not Started | 0%       | -              |
| **PROMPT 1.3** | 🟡 Next Week   | 0%       | -              |

**Legend:**

- 🔴 Not Started
- 🟡 In Progress
- 🟢 Completed
- ⏸️ Blocked

---

## 🐛 BLOCKERS & CHALLENGES

**Current Blockers:**

*None yet. Update this section if blocked.*

**Potential Challenges:**

- ⚠️ **Challenge 1:** `react-grid-layout` mobile responsive behavior
  - **Mitigation:** Test early on mobile, read docs thoroughly
- ⚠️ **Challenge 2:** Supabase RLS policies for `user_dashboard_layouts`
  - **Mitigation:** Reference existing RLS policies for `tasks` table

**If Blocked:**

1. Check [AI_PROMPTS.md](../AI_PROMPTS.md) for detailed requirements
2. Search `react-grid-layout` docs: [github.com/react-grid-layout/react-grid-layout](https://github.com/react-grid-layout/react-grid-layout)
3. Ask AI with full context from PROMPT 1.1/1.2
4. Document blocker here and move to next task
5. Schedule unblocking session (pair programming, research)

---

## 💡 NOTES & LEARNINGS

### Technical Decisions

**Decision 1: Where to persist layout?**

- ❌ localStorage: Doesn't sync across devices
- ✅ **Supabase database:** Sync across devices, RLS for security
- **Table:** `user_dashboard_layouts`

**Decision 2: How many grid columns?**

- **Answer:** 12 columns (standard for responsive grids)
- **Min card size:** 3x3 grid units
- **Max card size:** 12x8 grid units

**Decision 3: Mobile responsive strategy?**

- **Answer:** Stack vertically on mobile (automatic via `react-grid-layout` breakpoints)

### Learnings (To Be Updated)

*Update this section as you work:*

- **Learning 1:** [e.g., "react-grid-layout requires CSS imports"]
- **Learning 2:** [e.g., "Supabase RLS policies syntax is..."]
- **Learning 3:** [e.g., "Grid layout JSON structure is..."]

### Questions to Research

- [ ] **Q1:** Does `react-grid-layout` support touch events on mobile?
  - **Answer:** [To be researched]
- [ ] **Q2:** How to optimize layout re-renders?
  - **Answer:** [To be researched]
- [ ] **Q3:** Best way to handle grid item overflow (too many apps)?
  - **Answer:** [To be researched]

---

## ✅ DEFINITION OF DONE (End of Tuần 1)

**Tuần này thành công nếu:**

- [X] ~~Reviewed Whitepaper, Roadmap, AI_PROMPTS~~
- [ ] **PROMPT 1.1 COMPLETED:**
  - [ ] DashboardGrid component working
  - [ ] Drag & drop functional
  - [ ] Layout persists to Supabase
  - [ ] Responsive on mobile
- [ ] **PROMPT 1.2 COMPLETED:**
  - [ ] AppMiniCard wrapper working
  - [ ] Resize handles functional
  - [ ] Auto-save on layout change
- [ ] **DOCUMENTATION UPDATED:**
  - [ ] [FEATURES.md](FEATURES.md) updated with completed features
  - [ ] [BUGS.md](BUGS.md) updated if any bugs found
  - [ ] THIS_WEEK.md updated with final progress
- [ ] **READY FOR TUẦN 2:**
  - [ ] Codebase ready to add App Minis
  - [ ] No blocking bugs

---

## 🔜 NEXT WEEK PREVIEW (Tuần 2: 24-30/11)

**Tuần 2: 3 App Minis Đầu Tiên**

**Theme:** "Prove the Concept with Simple Apps"

**Prompts:**

- **PROMPT 1.3:** Build 3 App Minis (QuickNotes, Pomodoro, TodayTasks)

**Deliverables:**

- QuickNotesApp component
- PomodoroApp component
- TodayTasksApp component
- App Registry system
- "Add App" button on Dashboard

**Prep for Next Week:**

- [ ] Review PROMPT 1.3 in [AI_PROMPTS.md](../AI_PROMPTS.md)
- [ ] Prepare localStorage hooks for QuickNotes
- [ ] Prepare Supabase queries for TodayTasks
- [ ] Research browser notification API for Pomodoro

---

## 📚 LEARNING RESOURCES (Tuần này)

### Must Read

- [ ] **react-grid-layout docs:** [github.com/react-grid-layout/react-grid-layout](https://github.com/react-grid-layout/react-grid-layout)
- [ ] **Supabase RLS guide:** [supabase.com/docs/guides/auth/row-level-security](https://supabase.com/docs/guides/auth/row-level-security)
- [ ] **Next.js 16 docs:** [nextjs.org/docs](https://nextjs.org/docs)

### Optional (If Time)

- [ ] Notion's dashboard system (reverse engineer UI patterns)
- [ ] iOS home screen interaction patterns (study drag behavior)
- [ ] MacOS Dashboard widgets (historical reference)

### Video Tutorials

- [ ] "Building a Drag & Drop Dashboard with React" (YouTube, find relevant)
- [ ] "Supabase Authentication & RLS Policies" (Official Supabase)

---

## 🎨 DESIGN REFERENCES

**Dashboard Grid Inspiration:**

- Notion Dashboard (flexible grid)
- iOS Home Screen (drag & drop)
- MacOS Dashboard (widgets)
- Trello Board (drag cards)

**Key Design Principles:**

- **Simplicity:** Clean, minimal UI
- **Responsiveness:** Works on all devices
- **Performance:** Smooth drag & drop (60fps)
- **Accessibility:** Keyboard navigation (future)

---

## 🛠️ COMMANDS REFERENCE

### Install Dependencies

```bash
# React Grid Layout
npm install react-grid-layout
npm install --save-dev @types/react-grid-layout

# Supabase (if not installed)
npm install @supabase/supabase-js
```

### Run Dev Server

```bash
npm run dev
```

### Database Migrations

```bash
# Apply migration
npx supabase db push

# Reset database (careful!)
npx supabase db reset
```

### Update Status (Automated)

```bash
# Bash (Linux/Mac)
./scripts/update-status.sh

# PowerShell (Windows)
.\scripts\update-status.ps1
```

---

## 🔗 QUICK LINKS

- [NEXUS_WHITEPAPER.md](../../01-STRATEGY/NEXUS_WHITEPAPER.md)
- [ROADMAP.md](../ROADMAP.md)
- [AI_PROMPTS.md](../AI_PROMPTS.md)
- [TECH_STACK.md](../../03-REFERENCE/TECH_STACK.md)
- [PRINCIPLES.md](../../03-REFERENCE/PRINCIPLES.md)
- [FEATURES.md](FEATURES.md)
- [BUGS.md](BUGS.md)

---

## 🚀 REMEMBER

- 🎨 **Code First Strategy:** Ship fast, iterate later
- 📐 **Keep It Simple:** MVP mindset, no over-engineering
- 🔒 **Security First:** RLS policies for all tables
- 📝 **Document Everything:** Update docs as you go
- 🧪 **Test Early:** Test on mobile, test responsive behavior
- ⏱️ **Timeboxing:** Stick to estimates, don't perfectionism

**Tuần này là tuần bắt đầu - Focus vào Dashboard Grid! 💪**

---

**Last Updated:** 17 tháng 11, 2025

**Next Review:** Sunday, 23 tháng 11, 2025 (End of Tuần 1)

**Current Status:** 🚀 Tuần 1 - Dashboard Grid Foundation

**Current Prompt:** PROMPT 1.1 (Not Started)
