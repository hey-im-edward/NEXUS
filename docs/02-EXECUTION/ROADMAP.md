# 🗺️ NEXUS ROADMAP - 12 Tuần Code First

**Nguồn chính:** [NEXUS_WHITEPAPER.md](../01-STRATEGY/NEXUS_WHITEPAPER.md) (Phần 4.3)

**Cập nhật:** 17 tháng 11, 2025

**Chiến lược:** Code First - Gộp Tuần 0-4, bỏ qua giai đoạn design chi tiết

**Prompts chi tiết:** Xem [AI_PROMPTS.md](AI_PROMPTS.md) để biết các prompts cụ thể cho từng tuần

---

## 📊 Tổng Quan Timeline 12 Tuần

```text
┌─────────────────────────────────────────────────────────────────────┐
│  GIAI ĐOẠN 1: PLATFORM MVP           │ Tuần 1-4  │ [░░░░░░░░░░]  0% │
│  GIAI ĐOẠN 2: MARKETPLACE            │ Tuần 5-6  │ [░░░░░░░░░░]  0% │
│  GIAI ĐOẠN 3: VALIDATION             │ Tuần 7-8  │ [░░░░░░░░░░]  0% │
│  GIAI ĐOẠN 4: DECISION POINT         │ Tuần 9-12 │ [░░░░░░░░░░]  0% │
└─────────────────────────────────────────────────────────────────────┘
```

### Các Mốc Quan Trọng (Critical Milestones)

| Tuần              | Milestone                       | Success Criteria                                         |
| ------------------ | ------------------------------- | -------------------------------------------------------- |
| **Tuần 4**  | **Platform MVP Complete** | Người dùng đầu tiên có thể build app đơn giản |
| **Tuần 6**  | **Marketplace Live**      | Marketplace có 10+ apps, users có thể install         |
| **Tuần 8**  | **Validation Complete**   | 20+ beta users, 10+ users build apps                     |
| **Tuần 12** | **GO/NO-GO Decision**     | Quyết định tiếp tục hay pivot                       |

---

## 🎯 North Star Metric

**Không phải:** "How many tasks created?" (Task Management)

**Mà là:** "How many apps built and shared?" (Platform)

**Formula:**

```text
North Star Metric = (Apps Built by Users) × (Average Installs per App)

Target by Phase:
├─ Week 4:  5 apps × 2 installs  = 10 points
├─ Week 8:  15 apps × 3 installs = 45 points
└─ Week 12: 30 apps × 5 installs = 150 points
```

---

## 🚀 GIAI ĐOẠN 1: PLATFORM MVP (Tuần 1-4)

**Mục tiêu tổng quan:** Xây dựng nền tảng cơ bản cho users build và run simple apps

**Timeline:** 4 tuần (gộp Tuần 0-4 từ design ban đầu)

**Deliverables:** Dashboard Grid + 3 App Minis + App Builder MVP (No-Code Tier)

**Prompts liên quan:** [PROMPT 1.1 - 1.8](AI_PROMPTS.md#prompt-11-build-dashboardgrid-component)

---

### Tuần 1: Dashboard Foundation + App Minis

**Theme:** "iOS Home Screen for Productivity"

**Objective:** Build the "container" that holds all apps

**Progress:** `[░░░░░░░░░░] 0%`

#### PROMPT 1.1: Build DashboardGrid Component

**Deliverables:**

- [ ] Setup `react-grid-layout` library
- [ ] Component `DashboardGrid` với drag-and-drop functionality
- [ ] Responsive layout (desktop: free-form, mobile: stack vertically)
- [ ] Database schema: `user_dashboard_layouts` table
- [ ] Persist layout across sessions

**Tech Stack:**

- `react-grid-layout` v1.5.2 (767+ projects using it)
- TailwindCSS for styling
- Supabase PostgreSQL for persistence

**Success Criteria:**

- ✅ Users can drag & resize cards on dashboard
- ✅ Layout persists across page reloads
- ✅ Grid responsive on mobile (auto-stack)

**Files Created:**

```text
frontend/app/dashboard/page.tsx
frontend/components/dashboard/DashboardGrid.tsx
backend/supabase/migrations/003_dashboard_layouts.sql
```

**Time Estimate:** 4-6 hours

**Reference:** [AI_PROMPTS.md - PROMPT 1.1](AI_PROMPTS.md#prompt-11-build-dashboardgrid-component)

---

#### PROMPT 1.2: Build AppMiniCard Wrapper

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

**Files Created:**

```text
frontend/components/dashboard/AppMiniCard.tsx
frontend/lib/dashboard-helpers.ts
```

**Time Estimate:** 2-3 hours

**Reference:** [AI_PROMPTS.md - PROMPT 1.2](AI_PROMPTS.md#prompt-12-build-appminicard-wrapper)

---

#### PROMPT 1.3: Build 3 App Minis (QuickNotes, Pomodoro, TodayTasks)

**Deliverables:**

- [ ] **QuickNotesApp:** Text input, character count, localStorage
- [ ] **PomodoroApp:** 25-min countdown, Start/Pause/Reset, browser notification
- [ ] **TodayTasksApp:** Display tasks due today, real-time subscription
- [ ] App registry system (hard-coded list)
- [ ] "Add App" button on Dashboard

**Success Criteria:**

- ✅ Users can add 3 apps to dashboard
- ✅ Apps work independently in their cards
- ✅ State persists (localStorage for QuickNotes, Supabase for TodayTasks)

**Files Created:**

```text
frontend/components/app-minis/QuickNotesApp.tsx
frontend/components/app-minis/PomodoroApp.tsx
frontend/components/app-minis/TodayTasksApp.tsx
frontend/lib/app-registry.ts
```

**Time Estimate:** 6-8 hours

**Reference:** [AI_PROMPTS.md - PROMPT 1.3](AI_PROMPTS.md#prompt-13-build-3-app-minis)

---

### Tuần 2-3: App Builder MVP Setup

**Theme:** "Build Apps Without Code"

**Objective:** Users có thể build simple apps bằng drag-and-drop

**Progress:** `[░░░░░░░░░░] 0%`

---

#### PROMPT 1.4: Setup Craft.js Framework

**Deliverables:**

- [ ] Install Craft.js library
- [ ] Setup `/app-builder` route
- [ ] Editor canvas
- [ ] Component palette UI
- [ ] Properties panel UI

**Tech Stack:**

- Craft.js (MIT licensed, $11K+ Open Collective funding)
- React 19.2 (concurrent rendering)
- TailwindCSS

**Success Criteria:**

- ✅ Craft.js editor renders
- ✅ Empty canvas ready for drag-and-drop
- ✅ UI matches design mockups

**Files Created:**

```text
frontend/app/app-builder/page.tsx
frontend/components/app-builder/Editor.tsx
frontend/components/app-builder/Canvas.tsx
frontend/components/app-builder/ComponentPalette.tsx
frontend/components/app-builder/PropertiesPanel.tsx
```

**Time Estimate:** 4-5 hours

**Reference:** [AI_PROMPTS.md - PROMPT 1.4](AI_PROMPTS.md#prompt-14-setup-craftjs-framework)

---

#### PROMPT 1.5: Build 5 Builder Components

**Deliverables:**

Implement **only 5 components** for MVP:

- [ ] **1. TextBlock:** Display text (configurable: content, size, color)
- [ ] **2. Button:** Clickable button (configurable: label, action)
- [ ] **3. TextInput:** Input field (configurable: placeholder, onChange action)
- [ ] **4. Container:** Box to group components (configurable: layout, gap)
- [ ] **5. SimpleList:** Display array of items (configurable: data source)

**NOT in scope:**

- ❌ No database integration
- ❌ No conditional logic
- ❌ No custom styling
- ❌ Only 5 components (no more)

**Success Criteria:**

- ✅ All 5 components can be dragged to canvas
- ✅ Properties panel shows correct settings for each component
- ✅ Components render correctly on canvas

**Files Created:**

```text
frontend/components/app-builder/components/TextBlock.tsx
frontend/components/app-builder/components/Button.tsx
frontend/components/app-builder/components/TextInput.tsx
frontend/components/app-builder/components/Container.tsx
frontend/components/app-builder/components/SimpleList.tsx
```

**Time Estimate:** 8-10 hours

**Reference:** [AI_PROMPTS.md - PROMPT 1.5](AI_PROMPTS.md#prompt-15-build-5-builder-components)

---

#### PROMPT 1.6: Build 3 Actions System

**Deliverables:**

Implement **only 3 actions** for MVP:

- [ ] **Action 1: Append to List** (add item to SimpleList)
- [ ] **Action 2: Clear Input** (clear TextInput value)
- [ ] **Action 3: Show/Hide** (toggle component visibility)

**Success Criteria:**

- ✅ Users can wire Button clicks to actions
- ✅ Actions work in preview mode
- ✅ Action configuration persists in JSON

**Files Created:**

```text
frontend/lib/app-builder/actions.ts
frontend/components/app-builder/ActionSelector.tsx
```

**Time Estimate:** 4-6 hours

**Reference:** [AI_PROMPTS.md - PROMPT 1.6](AI_PROMPTS.md#prompt-16-build-3-actions-system)

---

### Tuần 4: Save, Load, and Templates

**Theme:** "Publish to Dashboard + Pre-built Templates"

**Objective:** Users can save apps, load them on dashboard, and use templates

**Progress:** `[░░░░░░░░░░] 0%`

---

#### PROMPT 1.7: Save/Load App Definition + AppRenderer

**Deliverables:**

- [ ] JSON schema for app definition
- [ ] Save app to Supabase (`app_minis` table)
- [ ] "Publish to My Dashboard" button
- [ ] AppRenderer component (render app from JSON)
- [ ] Load custom apps on dashboard

**Database Schema:**

```sql
CREATE TABLE IF NOT EXISTS app_minis (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  app_name TEXT NOT NULL,
  app_definition JSONB NOT NULL,
  is_published BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

**Success Criteria:**

- ✅ Users can save app definition
- ✅ App appears on user's dashboard
- ✅ App works correctly when loaded from JSON

**Files Created:**

```text
frontend/components/app-builder/AppRenderer.tsx
backend/supabase/migrations/004_app_minis.sql
frontend/lib/app-builder/save-load.ts
```

**Time Estimate:** 6-8 hours

**Reference:** [AI_PROMPTS.md - PROMPT 1.7](AI_PROMPTS.md#prompt-17-saveload-app-definition--apprenderer)

---

#### PROMPT 1.8: Build 3 Template Apps

**Deliverables:**

Pre-built templates to demonstrate builder capabilities:

- [ ] **Template 1: Guest Book** (TextInput → Button → SimpleList)
- [ ] **Template 2: Quick Notes** (TextInput → Button → TextBlock display)
- [ ] **Template 3: Shopping List** (TextInput → Button → SimpleList with Clear)

**Success Criteria:**

- ✅ Templates available in App Builder
- ✅ Users can "Start from Template"
- ✅ Templates work out-of-the-box

**Files Created:**

```text
frontend/lib/app-builder/templates.ts
frontend/components/app-builder/TemplateGallery.tsx
```

**Time Estimate:** 4-5 hours

**Reference:** [AI_PROMPTS.md - PROMPT 1.8](AI_PROMPTS.md#prompt-18-build-3-template-apps)

---

### Checkpoint: End of Week 4

**Expected State:**

✅ Dashboard Grid working với drag-and-drop

✅ 3 built-in App Minis (QuickNotes, Pomodoro, TodayTasks)

✅ App Builder MVP với 5 components + 3 actions

✅ Users can build "Guest Book" app và publish to dashboard

✅ 3 templates available

**Demo-able to first users:** YES

**Metrics Target:**

- 10 beta users recruited
- 3 apps per user on dashboard
- 5 custom apps created total
- 15 min avg session time

---

## 🛒 GIAI ĐOẠN 2: MARKETPLACE FOUNDATION (Tuần 5-6)

**Mục tiêu tổng quan:** Users có thể browse, install, và publish apps

**Timeline:** 2 tuần

**Deliverables:** Marketplace Browse/Detail/Install/Publish

**Prompts liên quan:** [PROMPT 2.1 - 2.3](AI_PROMPTS.md#prompt-21-build-marketplace-browse-page)

---

### Tuần 5: Browse & Detail Pages

**Progress:** `[░░░░░░░░░░] 0%`

---

#### PROMPT 2.1: Build Marketplace Browse Page

**Deliverables:**

- [ ] Route `/marketplace`
- [ ] Grid layout for apps (responsive)
- [ ] Category filters (Productivity, Finance, Fun, etc.)
- [ ] Search bar
- [ ] Sort options (Popular, Recent, Trending)
- [ ] App cards (thumbnail, name, author, install count)

**Success Criteria:**

- ✅ Marketplace shows 10+ pre-seeded apps
- ✅ Filters and search work correctly
- ✅ Page loads fast (< 1s)

**Files Created:**

```text
frontend/app/marketplace/page.tsx
frontend/components/marketplace/AppCard.tsx
frontend/components/marketplace/CategoryFilter.tsx
frontend/components/marketplace/SearchBar.tsx
```

**Time Estimate:** 6-8 hours

**Reference:** [AI_PROMPTS.md - PROMPT 2.1](AI_PROMPTS.md#prompt-21-build-marketplace-browse-page)

---

#### PROMPT 2.2: Build App Detail Page + Install Flow

**Deliverables:**

- [ ] Route `/marketplace/[appId]`
- [ ] App detail view (screenshot, description, author, stats)
- [ ] "Install" button
- [ ] One-click install flow
- [ ] Installed apps appear in user's library
- [ ] Users can add to dashboard from library

**Success Criteria:**

- ✅ Users can click app card → see detail
- ✅ Users can install with 1 click
- ✅ Installed app appears in library
- ✅ Users can add to dashboard

**Files Created:**

```text
frontend/app/marketplace/[appId]/page.tsx
frontend/components/marketplace/AppDetail.tsx
frontend/lib/marketplace/install.ts
frontend/app/library/page.tsx
```

**Time Estimate:** 6-8 hours

**Reference:** [AI_PROMPTS.md - PROMPT 2.2](AI_PROMPTS.md#prompt-22-build-app-detail-page--install-flow)

---

### Tuần 6: Publish Flow + Pre-seeding

**Progress:** `[░░░░░░░░░░] 0%`

---

#### PROMPT 2.3: Build Publish Flow

**Deliverables:**

- [ ] "Publish to Marketplace" button in App Builder
- [ ] Publish modal (fill metadata):
  - App name
  - Description
  - Category
  - Screenshot upload
  - Tags
- [ ] Schema validation
- [ ] App goes live on marketplace
- [ ] Pre-seed 10 built-in apps
- [ ] App stats tracking (downloads, views)

**Success Criteria:**

- ✅ Users can publish custom apps
- ✅ Published apps appear on marketplace immediately
- ✅ Marketplace has 10+ apps (pre-seeded + user-created)
- ✅ Stats track correctly

**Files Created:**

```text
frontend/components/app-builder/PublishModal.tsx
frontend/lib/marketplace/publish.ts
backend/supabase/migrations/005_marketplace_apps.sql
backend/supabase/seed/marketplace-apps.sql
```

**Time Estimate:** 8-10 hours

**Reference:** [AI_PROMPTS.md - PROMPT 2.3](AI_PROMPTS.md#prompt-23-build-publish-flow)

---

### Checkpoint: End of Week 6

**Expected State:**

✅ Marketplace browse page với 10+ apps

✅ Users can install apps với 1 click

✅ Users can publish custom apps

✅ App stats tracking working

**Demo-able to investors:** YES

**Metrics Target:**

- 10+ apps on marketplace (pre-seeded + user-created)
- 20+ total installations
- 3+ user-created apps published

---

## 🧪 GIAI ĐOẠN 3: VALIDATION WITH BETA USERS (Tuần 7-8)

**Mục tiêu tổng quan:** Thu thập feedback từ real users, validate giả thuyết

**Timeline:** 2 tuần

**Deliverables:** 20 beta users, onboarding flow, feedback system

**Prompts liên quan:** [PROMPT 3.1 - 3.2](AI_PROMPTS.md#prompt-31-beta-recruitment-strategy)

---

### Tuần 7: Recruit Beta Users + Onboarding

**Progress:** `[░░░░░░░░░░] 0%`

---

#### PROMPT 3.1: Beta Recruitment Strategy

**Deliverables:**

- [ ] Recruit 20 beta users:
  - Post on IndieHackers (show MVP demo)
  - Post on Reddit r/SideProject
  - Post on Twitter/X with demo video
  - Personal network (friends, colleagues)
  - Y Combinator Co-Founder Matching
- [ ] Onboarding flow:
  - Welcome email with 5-min video tutorial
  - "First App Challenge" (build Guest Book)
  - Checklist: Install 3 apps, Build 1 app, Publish to marketplace
- [ ] Feedback system:
  - In-app feedback button (Featurebase/Canny)
  - Weekly surveys (Google Forms)
  - 1-on-1 interviews (5 users, 30 min each)

**Success Criteria:**

- ✅ 20 beta users signed up
- ✅ Onboarding flow complete
- ✅ Feedback system deployed

**Files Created:**

```text
frontend/components/onboarding/WelcomeModal.tsx
frontend/components/feedback/FeedbackButton.tsx
docs/marketing/beta-recruitment-plan.md
docs/marketing/onboarding-email-template.md
```

**Time Estimate:** 1 week (mostly outreach + interviews)

**Reference:** [AI_PROMPTS.md - PROMPT 3.1](AI_PROMPTS.md#prompt-31-beta-recruitment-strategy)

---

### Tuần 8: Analyze Feedback + Iterate

**Progress:** `[░░░░░░░░░░] 0%`

---

#### PROMPT 3.2: Onboarding Flow + Feedback System

**Deliverables:**

- [ ] Analyze feedback:
  - Top 5 feature requests
  - Top 5 bug reports
  - UX friction points
- [ ] Prioritize improvements:
  - Critical bugs (blocking users)
  - Quick wins (< 2 hours)
  - Long-term enhancements
- [ ] Iterate on builder UX:
  - Based on user feedback
  - A/B test improvements
- [ ] Measure metrics (see Success Metrics section)
- [ ] Prepare GO/NO-GO decision data

**Success Criteria:**

- ✅ 10+ users built custom apps
- ✅ 30+ apps installed from marketplace
- ✅ 5+ users actively using 3+ apps
- ✅ Feedback generally positive (NPS > 30)

**Files Created:**

```text
docs/research/beta-feedback-analysis.md
docs/research/ux-improvements.md
frontend/lib/analytics/metrics.ts
```

**Time Estimate:** 1 week (analysis + iteration)

**Reference:** [AI_PROMPTS.md - PROMPT 3.2](AI_PROMPTS.md#prompt-32-onboarding-flow--feedback-system)

---

### Checkpoint: End of Week 8

**Expected State:**

✅ 20 beta users tested platform

✅ Feedback collected and analyzed

✅ Metrics measured (see below)

✅ Data ready for GO/NO-GO decision

**Demo-able to investors:** YES (with real user data)

**Metrics Target:**

- 20 beta users
- 10+ users built custom apps
- 30+ installations
- 5+ users actively using 3+ apps
- NPS > 30

---

## 🔄 GIAI ĐOẠN 4: DECISION POINT (Tuần 9-12)

**Mục tiêu tổng quan:** GO/NO-GO decision dựa trên metrics và feedback

**Timeline:** 4 tuần

**Deliverables:** Decision framework, analytics dashboard, next steps plan

**Prompts liên quan:** [PROMPT 4.1](AI_PROMPTS.md#prompt-41-analytics--decision-framework)

---

### Tuần 9: GO/NO-GO Decision

**Progress:** `[░░░░░░░░░░] 0%`

---

#### PROMPT 4.1: Analytics & Decision Framework

**Deliverables:**

- [ ] Analytics dashboard:
  - Apps created per week
  - Marketplace installs per week
  - Active users (DAU/WAU/MAU)
  - North Star Metric chart
- [ ] GO/NO-GO criteria evaluation
- [ ] Decision doc (GO or NO-GO với reasoning)

**GO Criteria (Need 2 out of 3):**

1. ✅ **Apps Created:** 10+ users built custom apps
2. ✅ **Marketplace Activity:** 30+ installations
3. ✅ **Engagement:** 5+ users actively using 3+ apps

**If GO:**

- Week 10-12: Build Low-Code features
- Prepare for public launch (Product Hunt, HackerNews)
- Expand beta to 100 users

**If NO-GO:**

- Analyze why (user interviews, data analysis)
- Pivot options:
  - Simplify to template marketplace (no builder)
  - Focus on specific vertical (CRM, Finance, Healthcare)
  - Shut down gracefully
- Decision by end of Week 9

**Files Created:**

```text
frontend/app/admin/analytics/page.tsx
frontend/components/analytics/NorthStarChart.tsx
frontend/lib/analytics/decision-criteria.ts
docs/decisions/go-no-go-decision.md
```

**Time Estimate:** 1 week

**Reference:** [AI_PROMPTS.md - PROMPT 4.1](AI_PROMPTS.md#prompt-41-analytics--decision-framework)

---

### Tuần 10-12: Next Steps (If GO)

**If GO is decided:**

**Week 10-11: Low-Code Features (Builder Tier 2)**

- [ ] Conditional logic (IF/THEN workflows)
- [ ] Database integration (Supabase tables)
- [ ] Form validation
- [ ] More components (expand from 5 to 15 total)
- [ ] API integrations (Zapier, webhooks)

**Week 12: Public Launch Prep**

- [ ] Product Hunt launch
- [ ] HackerNews post ("Show HN: NEXUS")
- [ ] Landing page optimization
- [ ] Expand beta to 100 users
- [ ] Pricing model decision (free tier + paid)

**If NO-GO is decided:**

**Week 10-12: Pivot or Shutdown**

- Analyze root cause of failure
- Pivot options analysis
- User interviews (exit interviews)
- Graceful shutdown plan (if applicable)

---

### Checkpoint: End of Week 12

**Expected State:**

✅ GO/NO-GO decision made

✅ If GO: Low-Code features in progress, public launch planned

✅ If NO-GO: Pivot plan or shutdown plan ready

**Metrics Target (if GO):**

- 30+ apps created
- 100+ installations
- 50+ active users
- NPS > 40

---

## 📈 Success Metrics by Phase

### Platform MVP (Week 1-4)

| Metric                       | Target |
| ---------------------------- | ------ |
| Beta users recruited         | 10     |
| Apps per user (on dashboard) | 3      |
| Custom apps created          | 5      |
| Avg session time             | 15 min |

### Marketplace (Week 5-6)

| Metric                      | Target |
| --------------------------- | ------ |
| Apps on marketplace         | 10+    |
| Total installations         | 20+    |
| User-created apps published | 3+     |

### Validation (Week 7-8)

| Metric                       | Target |
| ---------------------------- | ------ |
| Beta users recruited         | 20     |
| Users who built apps         | 10+    |
| Total installations          | 30+    |
| Active users (using 3+ apps) | 5+     |
| NPS Score                    | > 30   |

### Decision (Week 9-12)

| Metric               | GO Criteria            |
| -------------------- | ---------------------- |
| Apps created         | 10+ users              |
| Marketplace installs | 30+                    |
| Active users         | 5+ users using 3+ apps |

**Note:** Need 2 out of 3 criteria to proceed with GO.

---

## 🎯 Task Management Strategy: "Keep It, Don't Polish It"

**Philosophy:** Task management là "good enough", focus vào Platform.

**GIỮ NGUYÊN (Good Enough):**

- ✅ CRUD cơ bản cho task (Create, Read, Update, Complete, Prioritize)
- ✅ Kanban Board (Today, Inbox, Backlog)
- ✅ Bộ lọc Today/Inbox
- ✅ Priority levels (High, Medium, Low)

**KHÔNG LÀM (Backlog Forever):**

- 🔄 Tags, advanced filters, search
- 🔄 Task detail modal
- 🔄 Delete task functionality
- 🔄 Keyboard shortcuts
- 🔄 Recurring tasks
- 🔄 Calendar view
- 🔄 Task dependencies
- 🔄 Time tracking

**Thông Điệp cho Users:**

> "Our task manager is simple by design. Use it to track your work building apps. If you need advanced task management, continue using Todoist or Notion alongside NEXUS."

**Why?**

- Platform features (App Builder + Marketplace) are the differentiator
- Task management is commodity (Todoist, Notion already exist)
- Time is limited (12 weeks)
- Focus on North Star Metric: "Apps Built and Shared"

---

## 🧭 Weekly Review Process

**Every Monday:**

1. Update progress bars in this file
2. Review last week's deliverables (check off completed items)
3. Update [THIS_WEEK.md](status/THIS_WEEK.md) with current week's prompts
4. Review metrics (update [FEATURES.md](status/FEATURES.md) with completed features)
5. Triage bugs (update [BUGS.md](status/BUGS.md))

**Tools:**

- Use [update-status.sh](../scripts/update-status.sh) or [update-status.ps1](../scripts/update-status.ps1) to automate status updates

---

## 📚 Related Documents

- **Strategy:** [NEXUS_WHITEPAPER.md](../01-STRATEGY/NEXUS_WHITEPAPER.md)
- **Prompts:** [AI_PROMPTS.md](AI_PROMPTS.md)
- **Current Week:** [THIS_WEEK.md](status/THIS_WEEK.md)
- **Features Log:** [FEATURES.md](status/FEATURES.md)
- **Bugs Log:** [BUGS.md](status/BUGS.md)
- **Tech Stack:** [TECH_STACK.md](../03-REFERENCE/TECH_STACK.md)
- **Principles:** [PRINCIPLES.md](../03-REFERENCE/PRINCIPLES.md)

---

## 🚦 Current Status

**Week:** Pre-Week 1 (Planning)

**Phase:** Platform MVP

**Next Prompt:** [PROMPT 1.1: Build DashboardGrid Component](AI_PROMPTS.md#prompt-11-build-dashboardgrid-component)

**Next Action:**

1. Read [AI_PROMPTS.md](AI_PROMPTS.md)
2. Start with PROMPT 1.1
3. Ship incrementally
4. Measure weekly

---

**Cập nhật lần cuối:** 17 tháng 11, 2025

**Review tiếp theo:** Mỗi tuần (cập nhật progress sau khi hoàn thành prompts)

**Owner:** NEXUS Development Team

---

**Remember:** Code First, Ship Fast, Measure Everything.
