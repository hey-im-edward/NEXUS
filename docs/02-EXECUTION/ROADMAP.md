# 🗺️ NEXUS ROADMAP - 12 Tuần Code First

**Nguồn chính:** [NEXUS_WHITEPAPER.md](../01-STRATEGY/NEXUS_WHITEPAPER.md) (Phần 4.3)

**Cập nhật:** 17 tháng 11, 2025

**Chiến lược:** Code First - Gộp Tuần 0-4, bỏ qua giai đoạn design chi tiết

**Prompts chi tiết:** Xem [AI_PROMPTS.md](AI_PROMPTS.md) để biết các prompts cụ thể cho từng tuần

---

## 📊 Tổng Quan Timeline 12 Tuần

```text
┌─────────────────────────────────────────────────────────────────────┐
│  GIAI ĐOẠN 1: PLATFORM MVP           │ Tuần 1-4  │ [███░░░░░░░] 30% │
│  GIAI ĐOẠN 2: MARKETPLACE            │ Tuần 5-6  │ [░░░░░░░░░░]  0% │
│  GIAI ĐOẠN 3: VALIDATION             │ Tuần 7-8  │ [░░░░░░░░░░]  0% │
│  GIAI ĐOẠN 4: DECISION POINT         │ Tuần 9-12 │ [░░░░░░░░░░]  0% │
└─────────────────────────────────────────────────────────────────────┘
```

### Các Mốc Quan Trọng

| Tuần              | Mốc Quan Trọng       | Tiêu Chí Thành Công                                  |
| ------------------ | ------------------------------- | -------------------------------------------------------- |
| **Tuần 4**  | **Hoàn Thành Platform MVP** | Người dùng đầu tiên có thể build app đơn giản |
| **Tuần 6**  | **Marketplace Phát Hành**      | Marketplace có 10+ apps, users có thể install         |
| **Tuần 8**  | **Hoàn Thành Validation**   | 20+ beta users, 10+ users build apps                     |
| **Tuần 12** | **Quyết Định GO/NO-GO (GO/NO-GO Decision)**     | Quyết định tiếp tục hay pivot (Decision to continue or pivot)                       |

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

**Sản phẩm bàn giao:** Dashboard Grid + 3 App Minis + App Builder MVP (No-Code Tier)

**Prompts liên quan:** [PROMPT 1.1 - 1.8](AI_PROMPTS.md#prompt-11-build-dashboardgrid-component)

---

### Tuần 1: Dashboard Foundation + App Minis

**Chủ đề:** "iOS Home Screen for Productivity"

**Mục tiêu:** Build the "container" that holds all apps

**Tiến độ:** `[███░░░░░░░] 30%` (4/14 prompts hoàn thành)

#### PROMPT 1.1: Build DashboardGrid Component ✅ Hoàn thành

**Sản phẩm bàn giao:**

- [x] Setup `react-grid-layout` library
- [x] Component `DashboardGrid` với drag-and-drop functionality
- [x] Responsive layout (desktop: free-form, mobile: stack vertically)
- [x] Database schema: `user_dashboard_layouts` table
- [x] Persist layout across sessions

**Công nghệ sử dụng:**

- `react-grid-layout` v1.5.0 (code verified)
- TailwindCSS for styling
- Supabase PostgreSQL for persistence

**Tiêu chí thành công (Success Criteria):**

- ✅ Users có thể kéo & thay đổi kích thước cards trên dashboard (Users can drag & resize cards on dashboard)
- ✅ Layout được lưu giữ qua các lần reload trang (Layout persists across page reloads)
- ✅ Grid responsive trên mobile (tự động xếp chồng) (Grid responsive on mobile - auto-stack)

**Files đã tạo:**

```text
frontend/app/dashboard/page.tsx (16 lines)
frontend/components/dashboard/DashboardGrid.tsx (235 lines)
frontend/lib/supabase/dashboard-layouts.ts
frontend/hooks/useDashboardLayout.ts
```

**Thời gian thực tế:** ~5 hours

**Tham khảo:** [AI_PROMPTS.md - PROMPT 1.1](AI_PROMPTS.md#prompt-11-build-dashboardgrid-component)

---

#### PROMPT 1.2: Build AppMiniCard Wrapper ✅ Hoàn thành

**Sản phẩm bàn giao:**

- [x] Component `AppMiniCardHeader` wrapper
- [x] Resize handles (via react-grid-layout)
- [x] Close button với confirm dialog
- [x] Drag handle
- [x] Auto-save layout on change

**Tiêu chí thành công (Success Criteria):**

- ✅ Users có thể thay đổi kích thước cards (min: 3x3, max: 12x8 grid units)
- ✅ Users có thể đóng cards (Users can close cards)
- ✅ Layout tự động lưu vào database (Layout auto-saves to database)

**Files đã tạo:**

```text
frontend/components/dashboard/AppMiniCardHeader.tsx (2992 bytes)
```

**Thời gian thực tế:** ~3 hours

**Tham khảo:** [AI_PROMPTS.md - PROMPT 1.2](AI_PROMPTS.md#prompt-12-build-appminicard-wrapper)

---

#### PROMPT 1.3: Build 3 App Minis (QuickNotes, Pomodoro, TodayTasks) ✅ Hoàn thành

**Sản phẩm bàn giao:**

- [x] **QuickNotesApp:** Text input, character count, localStorage
- [x] **PomodoroApp:** 25-min countdown, Start/Pause/Reset, browser notification
- [x] **TodayTasksApp:** Display tasks due today, real-time subscription
- [x] App registry system (hard-coded list)
- [x] "Add App" button on Dashboard

**Tiêu chí thành công (Success Criteria):**

- ✅ Users có thể thêm 3 apps vào dashboard (Users can add 3 apps to dashboard)
- ✅ Apps hoạt động độc lập trong cards của chúng (Apps work independently in their cards)
- ✅ State được lưu giữ (localStorage cho QuickNotes, Supabase cho TodayTasks) (State persists)

**Files đã tạo:**

```text
frontend/components/app-minis/QuickNotesApp.tsx (76 lines)
frontend/components/app-minis/PomodoroApp.tsx (92 lines)
frontend/components/app-minis/TodayTasksApp.tsx (108 lines)
frontend/components/app-minis/index.ts
frontend/hooks/useDebounce.ts
```

**Thời gian thực tế:** ~6 hours

**Tham khảo:** [AI_PROMPTS.md - PROMPT 1.3](AI_PROMPTS.md#prompt-13-build-3-app-minis)

---

### Tuần 2-3: App Builder MVP Setup

**Chủ đề:** "Build Apps Without Code"

**Mục tiêu:** Users có thể build simple apps bằng drag-and-drop

**Tiến độ:** `[░░░░░░░░░░] 0%`

---

#### PROMPT 1.4: Setup App Builder Framework ✅ Hoàn thành (@dnd-kit Migration)

**Sản phẩm bàn giao:**

- [x] Install @dnd-kit libraries (NOT Craft.js - React 19 incompatibility)
- [x] Setup `/app-builder` route
- [x] DndContext setup với sensors
- [x] Editor canvas với SortableContext
- [x] Component palette UI với useDraggable
- [x] Properties panel UI
- [x] Toolbar (Undo/Redo/Save/Preview)
- [x] Zustand store (component tree + history)

**Tech Stack (UPDATED):**

- **@dnd-kit/core** v6.3.1 + **@dnd-kit/sortable** v10.0.0 (React 19 compatible)
- **Zustand** (custom state management)
- React 19.2.0 (verified working)
- TailwindCSS

**Migration Note:**
> Originally planned Craft.js, but v0.2.12 incompatible with React 19 (drag events không fire). Migrated to @dnd-kit + manual Zustand store (~600 lines). Extra time: +13 hours investigation + migration.

**Tiêu chí thành công (Success Criteria):**

- ✅ Trang Editor tải không có lỗi (Editor page loads without errors)
- ✅ Có thể kéo component từ palette vào canvas (Can drag component from palette to canvas)
- ✅ Sắp xếp lại thứ tự hoạt động (Sortable reordering works)
- ✅ Undo/Redo hoạt động (Undo/Redo functional)
- ✅ Quản lý component tree (Component tree management)

**Files đã tạo:**

```text
frontend/app/app-builder/page.tsx (142 lines)
frontend/components/app-builder/Canvas.tsx (67 lines)
frontend/components/app-builder/RenderedComponent.tsx (157 lines)
frontend/components/app-builder/ComponentPalette.tsx (91 lines)
frontend/components/app-builder/PropertiesPanel.tsx (164 lines)
frontend/components/app-builder/Toolbar.tsx (98 lines)
frontend/lib/stores/editor.ts (334 lines) - Zustand store
frontend/components/app-builder/DndKitDiagnostic.tsx
```

**Thời gian thực tế:** ~21 hours (including migration: investigation 4h + implementation 7h + cleanup 2h)

**Tham khảo:** [AI_PROMPTS.md - PROMPT 1.4](AI_PROMPTS.md#prompt-14-setup-craftjs-framework)

---

#### PROMPT 1.5: Build 5 Builder Components

**Sản phẩm bàn giao:**

Implement **only 5 components** for MVP:

- [ ] **1. TextBlock:** Display text (configurable: content, size, color)
- [ ] **2. Button:** Clickable button (configurable: label, action)
- [ ] **3. TextInput:** Input field (configurable: placeholder, onChange action)
- [ ] **4. Container:** Box to group components (configurable: layout, gap)
- [ ] **5. SimpleList:** Display array of items (configurable: data source)

**KHÔNG TRONG PHẠM VI (NOT in scope):**

- ❌ Không tích hợp database (No database integration)
- ❌ Không có logic điều kiện (No conditional logic)
- ❌ Không custom styling (No custom styling)
- ❌ Chỉ 5 components (không thêm) (Only 5 components - no more)

**Tiêu chí thành công (Success Criteria):**

- ✅ Tất cả 5 components có thể kéo vào canvas (All 5 components can be dragged to canvas)
- ✅ Properties panel hiển thị đúng settings cho mỗi component (Properties panel shows correct settings)
- ✅ Components render đúng trên canvas (Components render correctly on canvas)

**Files đã tạo:**

```text
frontend/components/app-builder/components/TextBlock.tsx
frontend/components/app-builder/components/Button.tsx
frontend/components/app-builder/components/TextInput.tsx
frontend/components/app-builder/components/Container.tsx
frontend/components/app-builder/components/SimpleList.tsx
```

**Time Estimate:** 8-10 hours

**Tham khảo:** [AI_PROMPTS.md - PROMPT 1.5](AI_PROMPTS.md#prompt-15-build-5-builder-components)

---

#### PROMPT 1.6: Build 3 Actions System

**Sản phẩm bàn giao:**

Implement **only 3 actions** for MVP:

- [ ] **Action 1: Append to List** (add item to SimpleList)
- [ ] **Action 2: Clear Input** (clear TextInput value)
- [ ] **Action 3: Show/Hide** (toggle component visibility)

**Tiêu chí thành công (Success Criteria):**

- ✅ Users có thể kết nối Button clicks với actions (Users can wire Button clicks to actions)
- ✅ Actions hoạt động ở preview mode (Actions work in preview mode)
- ✅ Cấu hình action được lưu trong JSON (Action configuration persists in JSON)

**Files đã tạo:**

```text
frontend/lib/app-builder/actions.ts
frontend/components/app-builder/ActionSelector.tsx
```

**Thời gian ước tính (Time Estimate):** 4-6 giờ (hours)

**Tham khảo:** [AI_PROMPTS.md - PROMPT 1.6](AI_PROMPTS.md#prompt-16-build-3-actions-system)

---

### Tuần 4: Save, Load, and Templates

**Chủ đề:** "Publish to Dashboard + Pre-built Templates"

**Mục tiêu:** Users can save apps, load them on dashboard, and use templates

**Tiến độ:** `[░░░░░░░░░░] 0%`

---

#### PROMPT 1.7: Save/Load App Definition + AppRenderer

**Sản phẩm bàn giao:**

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

**Tiêu chí thành công (Success Criteria):**

- ✅ Users có thể lưu app definition (Users can save app definition)
- ✅ App xuất hiện trên dashboard của user (App appears on user's dashboard)
- ✅ App hoạt động đúng khi load từ JSON (App works correctly when loaded from JSON)

**Files đã tạo:**

```text
frontend/components/app-builder/AppRenderer.tsx
backend/supabase/migrations/004_app_minis.sql
frontend/lib/app-builder/save-load.ts
```

**Time Estimate:** 6-8 hours

**Tham khảo:** [AI_PROMPTS.md - PROMPT 1.7](AI_PROMPTS.md#prompt-17-saveload-app-definition--apprenderer)

---

#### PROMPT 1.8: Build 3 Template Apps

**Sản phẩm bàn giao:**

Pre-built templates to demonstrate builder capabilities:

- [ ] **Template 1: Guest Book** (TextInput → Button → SimpleList)
- [ ] **Template 2: Quick Notes** (TextInput → Button → TextBlock display)
- [ ] **Template 3: Shopping List** (TextInput → Button → SimpleList with Clear)

**Tiêu chí thành công (Success Criteria):**

- ✅ Templates có sẵn trong App Builder (Templates available in App Builder)
- ✅ Users có thể "Start from Template" (Bắt đầu từ Template)
- ✅ Templates hoạt động ngay lập tức (Templates work out-of-the-box)

**Files đã tạo:**

```text
frontend/lib/app-builder/templates.ts
frontend/components/app-builder/TemplateGallery.tsx
```

**Thời gian ước tính (Time Estimate):** 4-5 giờ (hours)

**Tham khảo:** [AI_PROMPTS.md - PROMPT 1.8](AI_PROMPTS.md#prompt-18-build-3-template-apps)

---

---

### ✅ Điểm Kiểm Tra (Checkpoint): Cuối Tuần 1 (End of Week 1 - 19/11/2025)

**Trạng thái Mong Đợi (Expected State):**

- ✅ Dashboard Grid hoạt động (working)
- ✅ 3 App Minis hoạt động (working)
- ✅ App Builder framework setup

**Trạng thái Thực Tế (Actual State):**

✅ Tất cả mong đợi đều đạt được (All expectations met)

**Thay Đổi Công Nghệ (Technology Change):**

- Craft.js → @dnd-kit (React 19 incompatibility discovered during PROMPT 1.4)
- Extra time: +13 hours (investigation + migration + cleanup)
- **Impact:** Better long-term architecture, React 19 compatible

**Metrics Target:**

- 10 beta users recruited: ⏳ Not started
- 3 apps per user on dashboard: ⏳ Not started
- 5 custom apps created total: ⏳ Not started
- 15 min avg session time: ⏳ Not started

**Demo-able:** ✅ YES

---

### Checkpoint: Cuối Tuần 4 (End of Week 4)

**Trạng thái Mong Đợi (Expected State):**

- [ ] Dashboard Grid hoạt động với drag-and-drop (Dashboard Grid working with drag-and-drop)
- [ ] 3 built-in App Minis (QuickNotes, Pomodoro, TodayTasks)
- [ ] App Builder MVP với 5 components + 3 actions
- [ ] Users có thể build "Guest Book" app và publish lên dashboard (Users can build "Guest Book" app and publish to dashboard)
- [ ] 3 templates có sẵn (3 templates available)

**Demo được cho users đầu tiên (Demo-able to first users):** TBD

**Mục Tiêu Metrics (Metrics Target):**

- 10 beta users được tuyển dụng (recruited)
- 3 apps trên mỗi user dashboard
- 5 custom apps được tạo tổng cộng (total)
- 15 phút thời gian session trung bình (avg session time)

---

## 🛒 GIAI ĐOẠN 2: MARKETPLACE FOUNDATION (Tuần 5-6)

**Mục tiêu tổng quan:** Users có thể browse, install, và publish apps

**Timeline:** 2 tuần

**Sản phẩm bàn giao:** Marketplace Browse/Detail/Install/Publish

**Prompts liên quan:** [PROMPT 2.1 - 2.3](AI_PROMPTS.md#prompt-21-build-marketplace-browse-page)

---

### Tuần 5: Browse & Detail Pages

**Tiến độ:** `[░░░░░░░░░░] 0%`

---

#### PROMPT 2.1: Build Marketplace Browse Page

**Sản phẩm bàn giao:**

- [ ] Route `/marketplace`
- [ ] Grid layout for apps (responsive)
- [ ] Category filters (Productivity, Finance, Fun, etc.)
- [ ] Search bar
- [ ] Sort options (Popular, Recent, Trending)
- [ ] App cards (thumbnail, name, author, install count)

**Tiêu chí thành công (Success Criteria):**

- ✅ Marketplace hiển thị 10+ apps được seed sẵn (Marketplace shows 10+ pre-seeded apps)
- ✅ Bộ lọc và tìm kiếm hoạt động đúng (Filters and search work correctly)
- ✅ Trang tải nhanh (< 1s) (Page loads fast)

**Files đã tạo:**

```text
frontend/app/marketplace/page.tsx
frontend/components/marketplace/AppCard.tsx
frontend/components/marketplace/CategoryFilter.tsx
frontend/components/marketplace/SearchBar.tsx
```

**Time Estimate:** 6-8 hours

**Tham khảo:** [AI_PROMPTS.md - PROMPT 2.1](AI_PROMPTS.md#prompt-21-build-marketplace-browse-page)

---

#### PROMPT 2.2: Build App Detail Page + Install Flow

**Sản phẩm bàn giao:**

- [ ] Route `/marketplace/[appId]`
- [ ] App detail view (screenshot, description, author, stats)
- [ ] "Install" button
- [ ] One-click install flow
- [ ] Installed apps appear in user's library
- [ ] Users can add to dashboard from library

**Tiêu chí thành công (Success Criteria):**

- ✅ Users có thể click app card → xem chi tiết (Users can click app card → see detail)
- ✅ Users có thể cài đặt với 1 click (Users can install with 1 click)
- ✅ App đã cài hiển thị trong library (Installed app appears in library)
- ✅ Users có thể thêm vào dashboard (Users can add to dashboard)

**Files đã tạo:**

```text
frontend/app/marketplace/[appId]/page.tsx
frontend/components/marketplace/AppDetail.tsx
frontend/lib/marketplace/install.ts
frontend/app/library/page.tsx
```

**Time Estimate:** 6-8 hours

**Tham khảo:** [AI_PROMPTS.md - PROMPT 2.2](AI_PROMPTS.md#prompt-22-build-app-detail-page--install-flow)

---

### Tuần 6: Publish Flow + Pre-seeding

**Tiến độ:** `[░░░░░░░░░░] 0%`

---

#### PROMPT 2.3: Build Publish Flow

**Sản phẩm bàn giao:**

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

**Tiêu chí thành công (Success Criteria):**

- ✅ Users có thể publish custom apps (Users can publish custom apps)
- ✅ Apps đã publish xuất hiện trên marketplace ngay lập tức (Published apps appear on marketplace immediately)
- ✅ Marketplace có 10+ apps (pre-seeded + user-created)
- ✅ Thống kê theo dõi chính xác (Stats track correctly)

**Files đã tạo:**

```text
frontend/components/app-builder/PublishModal.tsx
frontend/lib/marketplace/publish.ts
backend/supabase/migrations/005_marketplace_apps.sql
backend/supabase/seed/marketplace-apps.sql
```

**Time Estimate:** 8-10 hours

**Tham khảo:** [AI_PROMPTS.md - PROMPT 2.3](AI_PROMPTS.md#prompt-23-build-publish-flow)

---

### Checkpoint: Cuối Tuần 6 (End of Week 6)

**Trạng thái Mong Đợi (Expected State):**

✅ Marketplace browse page với 10+ apps

✅ Users có thể cài đặt apps với 1 click (Users can install apps with 1 click)

✅ Users có thể publish custom apps (Users can publish custom apps)

✅ App stats tracking đang hoạt động (App stats tracking working)

**Demo được cho investors (Demo-able to investors):** CÓ (YES)

**Mục Tiêu Metrics (Metrics Target):**

- 10+ apps trên marketplace (pre-seeded + user-created)
- 20+ lượt cài đặt tổng cộng (total installations)
- 3+ apps do users tạo được publish (user-created apps published)

---

## 🧪 GIAI ĐOẠN 3: VALIDATION WITH BETA USERS (Tuần 7-8)

**Mục tiêu tổng quan:** Thu thập feedback từ real users, validate giả thuyết

**Timeline:** 2 tuần

**Sản phẩm bàn giao:** 20 beta users, onboarding flow, feedback system

**Prompts liên quan:** [PROMPT 3.1 - 3.2](AI_PROMPTS.md#prompt-31-beta-recruitment-strategy)

---

### Tuần 7: Recruit Beta Users + Onboarding

**Tiến độ:** `[░░░░░░░░░░] 0%`

---

#### PROMPT 3.1: Beta Recruitment Strategy

**Sản phẩm bàn giao:**

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

**Tiêu chí thành công (Success Criteria):**

- ✅ 20 beta users đăng ký (20 beta users signed up)
- ✅ Onboarding flow hoàn thành (Onboarding flow complete)
- ✅ Feedback system được triển khai (Feedback system deployed)

**Files đã tạo:**

```text
frontend/components/onboarding/WelcomeModal.tsx
frontend/components/feedback/FeedbackButton.tsx
docs/marketing/beta-recruitment-plan.md
docs/marketing/onboarding-email-template.md
```

**Time Estimate:** 1 week (mostly outreach + interviews)

**Tham khảo:** [AI_PROMPTS.md - PROMPT 3.1](AI_PROMPTS.md#prompt-31-beta-recruitment-strategy)

---

### Tuần 8: Analyze Feedback + Iterate

**Tiến độ:** `[░░░░░░░░░░] 0%`

---

#### PROMPT 3.2: Onboarding Flow + Feedback System

**Sản phẩm bàn giao:**

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

**Tiêu chí thành công (Success Criteria):**

- ✅ 10+ users đã build custom apps (10+ users built custom apps)
- ✅ 30+ apps được cài đặt từ marketplace (30+ apps installed from marketplace)
- ✅ 5+ users đang sử dụng tích cực 3+ apps (5+ users actively using 3+ apps)
- ✅ Feedback nhìn chung tích cực (Feedback generally positive - NPS > 30)

**Files đã tạo:**

```text
docs/research/beta-feedback-analysis.md
docs/research/ux-improvements.md
frontend/lib/analytics/metrics.ts
```

**Time Estimate:** 1 week (analysis + iteration)

**Tham khảo:** [AI_PROMPTS.md - PROMPT 3.2](AI_PROMPTS.md#prompt-32-onboarding-flow--feedback-system)

---

### Checkpoint: Cuối Tuần 8 (End of Week 8)

**Trạng thái Mong Đợi (Expected State):**

✅ 20 beta users đã test platform (20 beta users tested platform)

✅ Feedback được thu thập và phân tích (Feedback collected and analyzed)

✅ Metrics được đo lường (Metrics measured - see below)

✅ Dữ liệu sẵn sàng cho quyết định GO/NO-GO (Data ready for GO/NO-GO decision)

**Demo được cho investors (Demo-able to investors):** CÓ (YES - with real user data)

**Mục Tiêu Metrics (Metrics Target):**

- 20 beta users
- 10+ users đã build custom apps (built custom apps)
- 30+ lượt cài đặt (installations)
- 5+ users đang sử dụng tích cực 3+ apps (actively using 3+ apps)
- NPS > 30

---

## 🔄 GIAI ĐOẠN 4: DECISION POINT (Tuần 9-12)

**Mục tiêu tổng quan:** GO/NO-GO decision dựa trên metrics và feedback

**Timeline:** 4 tuần

**Sản phẩm bàn giao:** Decision framework, analytics dashboard, next steps plan

**Prompts liên quan:** [PROMPT 4.1](AI_PROMPTS.md#prompt-41-analytics--decision-framework)

---

### Tuần 9: GO/NO-GO Decision

**Tiến độ:** `[░░░░░░░░░░] 0%`

---

#### PROMPT 4.1: Analytics & Decision Framework

**Sản phẩm bàn giao:**

- [ ] Analytics dashboard:
  - Apps created per week
  - Marketplace installs per week
  - Active users (DAU/WAU/MAU)
  - North Star Metric chart
- [ ] GO/NO-GO criteria evaluation
- [ ] Decision doc (GO or NO-GO với reasoning)

**Tiêu Chí GO (GO Criteria - Cần 2/3):**

1. ✅ **Apps Được Tạo (Apps Created):** 10+ users đã build custom apps (10+ users built custom apps)
2. ✅ **Hoạt Động Marketplace (Marketplace Activity):** 30+ lượt cài đặt (30+ installations)
3. ✅ **Mức Độ Tương Tác (Engagement):** 5+ users đang sử dụng tích cực 3+ apps (5+ users actively using 3+ apps)

**Nếu GO (If GO):**

- Tuần 10-12: Build tính năng Low-Code (Build Low-Code features)
- Chuẩn bị cho public launch (Product Hunt, HackerNews) (Prepare for public launch)
- Mở rộng beta lên 100 users (Expand beta to 100 users)

**Nếu NO-GO (If NO-GO):**

- Phân tích lý do (user interviews, data analysis) (Analyze why)
- Các tùy chọn pivot (Pivot options):
  - Đơn giản hóa thành template marketplace (không có builder) (Simplify to template marketplace - no builder)
  - Tập trung vào vertical cụ thể (CRM, Finance, Healthcare) (Focus on specific vertical)
  - Shutdown một cách khéo léo (Shut down gracefully)
- Quyết định vào cuối Tuần 9 (Decision by end of Week 9)

**Files đã tạo:**

```text
frontend/app/admin/analytics/page.tsx
frontend/components/analytics/NorthStarChart.tsx
frontend/lib/analytics/decision-criteria.ts
docs/decisions/go-no-go-decision.md
```

**Time Estimate:** 1 week

**Tham khảo:** [AI_PROMPTS.md - PROMPT 4.1](AI_PROMPTS.md#prompt-41-analytics--decision-framework)

---

### Tuần 10-12: Các Bước Tiếp Theo (Next Steps - If GO)

**Nếu quyết định GO (If GO is decided):**

**Tuần 10-11: Tính Năng Low-Code (Low-Code Features - Builder Tier 2)**

- [ ] Logic điều kiện (Conditional logic - IF/THEN workflows)
- [ ] Tích hợp database (Database integration - Supabase tables)
- [ ] Form validation
- [ ] Thêm components (mở rộng từ 5 lên 15 tổng cộng) (More components - expand from 5 to 15 total)
- [ ] Tích hợp API (Zapier, webhooks) (API integrations)

**Tuần 12: Chuẩn Bị Public Launch (Public Launch Prep)**

- [ ] Product Hunt launch
- [ ] HackerNews post ("Show HN: NEXUS")
- [ ] Tối ưu landing page (Landing page optimization)
- [ ] Mở rộng beta lên 100 users (Expand beta to 100 users)
- [ ] Quyết định mô hình giá (free tier + paid) (Pricing model decision)

**Nếu quyết định NO-GO (If NO-GO is decided):**

**Tuần 10-12: Pivot hoặc Shutdown (Pivot or Shutdown)**

- Phân tích nguyên nhân gốc rễ của thất bại (Analyze root cause of failure)
- Phân tích các tùy chọn pivot (Pivot options analysis)
- Phỏng vấn users (exit interviews) (User interviews)
- Kế hoạch shutdown khéo léo (nếu có) (Graceful shutdown plan - if applicable)

---

### Checkpoint: Cuối Tuần 12 (End of Week 12)

**Trạng thái Mong Đợi (Expected State):**

✅ Quyết định GO/NO-GO đã được đưa ra (GO/NO-GO decision made)

✅ Nếu GO: Tính năng Low-Code đang được phát triển, public launch được lên kế hoạch (If GO: Low-Code features in progress, public launch planned)

✅ Nếu NO-GO: Kế hoạch pivot hoặc shutdown sẵn sàng (If NO-GO: Pivot plan or shutdown plan ready)

**Mục Tiêu Metrics (nếu GO) (Metrics Target - if GO):**

- 30+ apps được tạo (apps created)
- 100+ lượt cài đặt (installations)
- 50+ users hoạt động (active users)
- NPS > 40

---

## 📈 Metrics Thành Công Theo Giai Đoạn (Success Metrics by Phase)

### Platform MVP (Tuần 1-4)

| Metric                                        | Target |
| --------------------------------------------- | ------ |
| Beta users được tuyển dụng (recruited)       | 10     |
| Apps trên mỗi user (on dashboard)            | 3      |
| Custom apps được tạo (created)               | 5      |
| Thời gian session trung bình (Avg session time) | 15 min |

### Marketplace (Tuần 5-6)

| Metric                                      | Target |
| ------------------------------------------- | ------ |
| Apps trên marketplace (Apps on marketplace) | 10+    |
| Tổng lượt cài đặt (Total installations)    | 20+    |
| Apps do users tạo được publish (User-created apps published) | 3+     |

### Validation (Tuần 7-8)

| Metric                                      | Target |
| ------------------------------------------- | ------ |
| Beta users được tuyển dụng (recruited)     | 20     |
| Users đã build apps (Users who built apps) | 10+    |
| Tổng lượt cài đặt (Total installations)    | 30+    |
| Users hoạt động (sử dụng 3+ apps) (Active users - using 3+ apps) | 5+     |
| Điểm NPS (NPS Score)                        | > 30   |

### Decision (Tuần 9-12)

| Metric                                      | Tiêu Chí GO (GO Criteria)            |
| ------------------------------------------- | ---------------------- |
| Apps được tạo (Apps created)               | 10+ users              |
| Lượt cài đặt Marketplace (Marketplace installs) | 30+                    |
| Users hoạt động (Active users)             | 5+ users sử dụng 3+ apps (using 3+ apps) |

**Lưu ý (Note):** Cần 2/3 tiêu chí để tiếp tục với GO (Need 2 out of 3 criteria to proceed with GO).

---

## 🎯 Chiến Lược Task Management (Task Management Strategy): "Giữ Nguyên, Không Polish"

**Triết lý (Philosophy):** Task management là "đủ tốt" (good enough), tập trung vào Platform.

**GIỮ NGUYÊN (Good Enough):**

- ✅ CRUD cơ bản cho task (Create, Read, Update, Complete, Prioritize)
- ✅ Kanban Board (Today, Inbox, Backlog)
- ✅ Bộ lọc Today/Inbox (Today/Inbox filters)
- ✅ Priority levels (High, Medium, Low)

**KHÔNG LÀM (Backlog Forever):**

- 🔄 Tags, bộ lọc nâng cao, tìm kiếm (Tags, advanced filters, search)
- 🔄 Task detail modal
- 🔄 Chức năng xóa task (Delete task functionality)
- 🔄 Phím tắt (Keyboard shortcuts)
- 🔄 Tasks lặp lại (Recurring tasks)
- 🔄 Chế độ xem lịch (Calendar view)
- 🔄 Task dependencies
- 🔄 Theo dõi thời gian (Time tracking)

**Thông Điệp cho Users (Message to Users):**

> "Task manager của chúng tôi đơn giản theo thiết kế. Sử dụng nó để theo dõi công việc building apps của bạn. Nếu cần task management nâng cao, hãy tiếp tục dùng Todoist hoặc Notion song song với NEXUS."
>
> (Our task manager is simple by design. Use it to track your work building apps. If you need advanced task management, continue using Todoist or Notion alongside NEXUS.)

**Tại sao? (Why?)**

- Tính năng Platform (App Builder + Marketplace) là điểm khác biệt (Platform features are the differentiator)
- Task management là commodity (Todoist, Notion đã tồn tại) (Task management is commodity - Todoist, Notion already exist)
- Thời gian có hạn (12 tuần) (Time is limited - 12 weeks)
- Tập trung vào North Star Metric: "Apps Built and Shared"

---

## 🧭 Quy Trình Review Hàng Tuần (Weekly Review Process)

**Mỗi Thứ Hai (Every Monday):**

1. Cập nhật progress bars trong file này (Update progress bars in this file)
2. Review các sản phẩm bàn giao tuần trước (tick off các items đã hoàn thành) (Review last week's deliverables - check off completed items)
3. Cập nhật [THIS_WEEK.md](status/THIS_WEEK.md) với prompts của tuần hiện tại (Update with current week's prompts)
4. Review metrics (cập nhật [FEATURES.md](status/FEATURES.md) với features đã hoàn thành) (Review metrics - update with completed features)
5. Triage bugs (cập nhật [BUGS.md](status/BUGS.md)) (Triage bugs - update BUGS.md)

**Công cụ (Tools):**

- Sử dụng [update-status.sh](../scripts/update-status.sh) hoặc [update-status.ps1](../scripts/update-status.ps1) để tự động cập nhật status (Use to automate status updates)

---

## 📚 Related Documents

- **Strategy:** [NEXUS_WHITEPAPER.md](../01-STRATEGY/NEXUS_WHITEPAPER.md)
- **Prompts:** [AI_PROMPTS.md](AI_PROMPTS.md)
- **Current Week:** [THIS_WEEK.md](status/THIS_WEEK.md)
- **Features Log:** [FEATURES.md](status/FEATURES.md)
- **Bugs Log:** [BUGS.md](status/BUGS.md)
- **Công nghệ sử dụng:** [TECH_STACK.md](../03-REFERENCE/TECH_STACK.md)
- **Principles:** [PRINCIPLES.md](../03-REFERENCE/PRINCIPLES.md)

---

## 🚦 Trạng Thái Hiện Tại (Current Status)

**Tuần (Week):** Pre-Week 1 (Planning)

**Giai Đoạn (Phase):** Platform MVP

**Prompt Tiếp Theo (Next Prompt):** [PROMPT 1.1: Build DashboardGrid Component](AI_PROMPTS.md#prompt-11-build-dashboardgrid-component)

**Hành Động Tiếp Theo (Next Action):**

1. Đọc [AI_PROMPTS.md](AI_PROMPTS.md) (Read AI_PROMPTS.md)
2. Bắt đầu với PROMPT 1.1 (Start with PROMPT 1.1)
3. Ship từng phần (Ship incrementally)
4. Đo lường hàng tuần (Measure weekly)

---

**Cập nhật lần cuối:** 17 tháng 11, 2025

**Review tiếp theo:** Mỗi tuần (cập nhật progress sau khi hoàn thành prompts)

**Owner:** NEXUS Development Team

---

**Nhớ rằng (Remember):** Code First, Ship Fast, Measure Everything.
