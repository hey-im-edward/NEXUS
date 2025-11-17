# 🎯 PRIMING PROMPT - NEXUS Platform

> **Mục đích:** Tài liệu này tóm tắt toàn bộ chiến lược, kiến trúc và lộ trình của NEXUS để AI assistant và developer có thể hiểu rõ và hỗ trợ phát triển hiệu quả.

**Nguồn gốc:** [NEXUS_WHITEPAPER.md](../01-STRATEGY/NEXUS_WHITEPAPER.md)

**Phiên bản:** 3.0 (Platform First)

**Cập nhật:** 17 tháng 11, 2025

**Trạng thái:** Code First Strategy - Platform MVP

---

## 📑 MỤC LỤC

- [I. Tuyên Ngôn Tầm Nhìn](#i-tuyên-ngôn-tầm-nhìn)
- [II. Mô Hình Sản Phẩm - 3 Trụ Cột](#ii-mô-hình-sản-phẩm---3-trụ-cột)
- [III. Chiến Lược & Thị Trường](#iii-chiến-lược--thị-trường)
- [IV. Kỹ Thuật & Lộ Trình](#iv-kỹ-thuật--lộ-trình)
- [V. Nguyên Tắc Phát Triển](#v-nguyên-tắc-phát-triển)

---

## I. TUYÊN NGÔN TẦM NHÌN

### 🎯 Câu Hỏi Trung Tâm

> **Tại sao chúng ta phải "uốn mình" để phù hợp với công cụ, thay vì công cụ phù hợp với chúng ta?**

**Thực trạng hiện nay:**

1. **Rigid Tools (Công cụ cứng nhắc)** như Todoist, Trello:
   - Làm một việc rất tốt nhưng không thể customize
   - Không đủ linh hoạt cho workflows phức tạp
   - Users phải chuyển đổi giữa 3-4 công cụ → Context switching hell

2. **Complex Platforms (Nền tảng phức tạp)** như ClickUp, Jira:
   - Quá phức tạp cho teams nhỏ (learning curve 3-5 ngày)
   - Đắt đỏ ($9-20/user/month)
   - Performance chậm, users chỉ dùng 30% features

3. **Flexible Tools (Công cụ linh hoạt)** như Notion:
   - "Gần đúng" nhưng vẫn bị giới hạn
   - Document-centric, không phải app platform thực thụ
   - Performance issues với 500+ records (load time 3-5s)
   - Không có marketplace cho apps

### 🚀 Sứ Mệnh

**Vision Statement:**

> **NEXUS là "Hệ điều hành" cho Năng suất Cá nhân và Đội Nhóm Nhỏ**

**Core Mission: Democratize Tools Creation**

Giống như:

- **WordPress** dân chủ hóa website creation
- **Canva** dân chủ hóa graphic design
- **NEXUS** sẽ dân chủ hóa productivity tools creation

→ Bất kỳ ai cũng có thể build apps riêng, không cần biết code.

### 📊 North Star Metric

**KHÔNG PHẢI:** "Bao nhiêu tasks được tạo ra?"

**MÀ LÀ:** **"Bao nhiêu apps được build và chia sẻ?"**

**Success Metrics:**

- **Week 8:** 5+ apps published by users, 20+ installations
- **Week 12:** 15+ apps, 50+ installations, 5+ users installed 3+ apps
- **Year 1:** 100 users build apps, 50 apps được share

### 🏗️ NEXUS là gì

**NEXUS không phải là một ứng dụng. NEXUS là một Platform.**

| Đặc điểm | Product (Todoist, ClickUp) | Platform (NEXUS) |
|----------|----------------------------|------------------|
| **Tính năng** | Cố định, do PM quyết định | Tùy chỉnh, do user tạo ra |
| **Mở rộng** | Cài đặt integrations | Build apps mới |
| **Giá trị** | Tool cho user | Playground + building blocks |
| **Ecosystem** | Đóng, 1 vendor | Mở, community-driven |

**Platform = Product + Platform Hybrid**

- **Product Layer (Entry Point):**
  - Task Management (MVP đã có)
  - Kanban Boards
  - "Đủ tốt" để users có data trong platform

- **Platform Layer (Differentiation - MOAT):**
  - App Builder (tạo apps riêng)
  - App Minis (micro-apps trên dashboard)
  - Marketplace (share & discover)

---

## II. MÔ HÌNH SẢN PHẨM - 3 TRỤ CỘT

### 🎨 Trụ Cột 1: Dashboard Grid

**Concept:** "iOS Home Screen for Productivity Tools"

**Functionality:**

- Drag-and-drop grid layout (powered by `react-grid-layout` v1.5.2)
- Arrange App Minis theo ý muốn
- Resize, reorder, customize dashboard
- Nhiều dashboards cho contexts khác nhau (Work, Personal, Team)
- Responsive: Desktop (12 cols), Tablet (8 cols), Mobile (1 col)

**Technical Implementation:**

```typescript
// react-grid-layout features:
- Draggable & Resizable widgets
- Responsive breakpoints (lg/md/sm/xs)
- Auto-packing algorithm
- Static widgets support
- No jQuery required
- 767+ projects using it
```

**Data Persistence:**

- Layout saved to Supabase table: `user_dashboard_layouts`
- JSONB format: `{ items: [{ i, x, y, w, h }] }`

**Example Dashboard:**

```text
┌──────────────────────────────────────┐
│  Dashboard: Mai's Work Space         │
├────────────┬────────────┬────────────┤
│ Today      │ Team       │ Invoices   │
│ Tasks      │ Workload   │ Tracker    │
├────────────┴────────────┴────────────┤
│ Client CRM                           │
├──────────────────────┬───────────────┤
│ Meeting Notes        │ Quick Capture │
└──────────────────────┴───────────────┘
```

---

### 🧩 Trụ Cột 2: App Builder (3 Cấp Độ)

**Concept:** "LEGO for Productivity Tools"

#### 🎨 Level 1: No-Code Builder (Tuần 1-4 - MVP)

**Target:** Người không biết code, casual users

**Technology:** Craft.js framework

- MIT licensed
- React-based drag-and-drop editor
- Serializes to JSON (easy storage)
- Modular approach
- Community support ($11K+ raised on Open Collective)

**Available Components (5 basic):**

1. **Text Block** - Hiển thị static text
2. **Text Input** - User nhập text
3. **Button** - Click để trigger action
4. **Text Display** - Hiển thị dynamic text
5. **Simple List** - Hiển thị danh sách items

**Available Actions (3 basic):**

1. **Append to List** - Thêm item vào list
2. **Clear Input** - Xóa input field
3. **Show/Hide** - Toggle visibility

**Intentional Limitations:**

- ❌ No conditional logic (if/else)
- ❌ No database integration
- ❌ No custom styling (preset themes only)
- ❌ No external API calls
- ❌ State chỉ lưu trong localStorage

**Why This Is Enough:**

- ✅ Build useful apps: Notes, Shopping List, Guest Book
- ✅ Proof of concept: Platform approach works
- ✅ Low barrier to entry
- ✅ Quick wins → Users see value immediately

**Example App: Guest Book**

```json
{
  "app_id": "guest-book-v1",
  "components": [
    { "id": "input-1", "type": "TextInput", "props": { "placeholder": "Your name..." } },
    { "id": "button-1", "type": "Button", "props": { "text": "Submit" }, "actions": { "onClick": "append-to-list-1" } },
    { "id": "list-1", "type": "TextList", "props": { "items": [] } }
  ]
}
```

#### ⚙️ Level 2: Low-Code Builder (Tuần 9-12 - Post-validation)

**Target:** Power users, small business owners

**New Capabilities:**

- Conditional logic (visual workflow builder, Zapier-style)
- Database integration (Supabase tables)
- Form validation (email, required fields)
- Data calculations (SUM, COUNT, AVERAGE)
- Custom styling (color picker, fonts)

**Pricing:** Pro Plan ($10/month)

#### 💻 Level 3: God Mode (Post-MVP - Year 2)

**Target:** Professional developers, development teams

**Full Developer Capabilities:**

- Custom code editor (Monaco/VS Code engine)
- API integrations (REST, GraphQL, OAuth)
- Custom React components
- Git integration (version control)
- CI/CD pipeline
- Team collaboration features

**Pricing:** Enterprise Plan ($50+/month)

---

### 🛒 Trụ Cột 3: Marketplace

**Concept:** "App Store for Productivity"

**User Flow:**

```text
Browse by category → Preview app → Install → Add to Dashboard → (Optional) Fork & Customize
```

**Features:**

1. **Browse & Search**
   - Categories: Task Management, Finance, CRM, Analytics, Custom
   - Filters: Most popular, Recently added, Highest rated
   - Search by name, description, tags

2. **App Detail Page**
   - Preview (screenshot or live demo)
   - Description, Author, Stats (downloads, rating)
   - One-click install
   - Fork to customize

3. **Publishing Flow**
   - Build app in App Builder → Publish to Marketplace
   - Fill metadata (name, description, category, screenshot)
   - Automated checks → App goes live

4. **Forking & Customization**
   - Fork app → Copy to your account
   - Modify in App Builder
   - Save as variant
   - (Optional) Publish fork

**Network Effect Flywheel:**

```text
More Users → More Apps Created → More Apps on Marketplace → More Value → More Users (cycle repeats)
```

**Database Schema:**

```sql
marketplace_apps (id, app_id, author_id, name, category, download_count, rating_avg, forked_from)
app_installations (user_id, marketplace_app_id)
app_reviews (marketplace_app_id, user_id, rating, review_text)
```

---

## III. CHIẾN LƯỢC & THỊ TRƯỜNG

### 🎯 Vấn Đề Thị Trường

**The Productivity Tools Fragmentation Crisis:**

Thị trường bị phân mảnh thành 3 thái cực, không ai giải quyết được khoảng trống ở giữa:

1. **Rigid Tools** (Todoist, Trello) - Quá đơn giản
2. **Complex Platforms** (ClickUp, Jira) - Quá phức tạp
3. **Notion** - "Gần đúng" nhưng chưa phải platform thực thụ

**Target Market:**

- **Primary:** SMEs 5-50 employees
- **Secondary:** Power users & Freelancers 1-5 người
- **Tertiary:** No-code enthusiasts

**Market Size:**

- Global productivity software: **$50B** (2024)
- No-code/Low-code: **$13B** (growing 23% YoY)
- **NEXUS TAM:** ~$5-8B (conservative)

### 🏢 Tại Sao Big Tech Chưa Làm

**Innovator's Dilemma:**

| Company | Có khả năng? | Sẽ làm? | Lý do không làm |
|---------|-------------|---------|----------------|
| **Microsoft** | ✅ Yes | ❌ No | Organizational silos, revenue cannibalization |
| **Atlassian** | ✅ Yes | ❌ No | Brand separation, technical debt |
| **Notion** | ✅ Yes | ❌ No | Architecture rewrite needed, focusing on AI |
| **ClickUp** | ✅ Yes | ❌ No | Feature bloat risk, revenue model concern |

### ⚡ Lợi Thế Solo Founder

**Speed:**

- Decision making: Vài phút vs vài tuần (corporate)
- Pivot ability: Ngay lập tức

**Focus:**

- One goal: Platform MVP
- No distractions: Meetings, politics

**Low Cost:**

- Burn rate: $21/month vs $71K/month
- Runway: Vô hạn (bootstrap)

**AI as Force Multiplier:**

- 1 person + AI ≈ 5-7 person team
- Code generation, documentation, testing

### 📅 Quyết Định Pivot (13/11/2024)

**Decision:**

> **DỪNG đánh bóng Task Management. Pivot to Platform Strategy.**

**Rationale:**

1. Thị trường task managers đã quá đông (100+ competitors)
2. Nguy cơ feature creep (6 tháng mà vẫn chỉ là task manager thứ 100)
3. Platform First là differentiation thực sự (moat)

**Lesson from Platforms:**

- **Notion:** Giữ document editor, focus vào databases/templates
- **Airtable:** Giữ spreadsheet, focus vào views/automations
- **ClickUp:** Feature bloat → Chậm, phức tạp (anti-pattern)
- **Bubble.io:** Không có base feature → Khó onboarding

**NEXUS Strategy:**

- ✅ Giữ Task Management ở mức "đủ tốt" (entry point)
- ✅ Focus vào App Builder + Marketplace (platform differentiator)

---

## IV. KỸ THUẬT & LỘ TRÌNH

### 💻 Tech Stack (Phần 4.1)

#### Frontend

**Core Framework:**

- **Next.js 16.0.1** (Released Oct 21, 2025)
  - App Router (file-based routing)
  - Turbopack stable (2-5x faster builds)
  - Cache Components with "use cache" directive
  - Next.js DevTools MCP (AI debugging)
  - proxy.ts (replaces middleware.ts)
  - React 19.2 integration

**React Ecosystem:**

- **React 19.2** (Released Oct 2025)
  - Concurrent rendering (default, automatic)
  - React Server Components (stable)
  - useTransition, useDeferredValue hooks
  - Optimized automatic batching
  - Improved resource allocation

**Language & Styling:**

- **TypeScript 5.6** (Strict Mode)
- **TailwindCSS 4.0 Alpha**
- **shadcn/ui** (component library)

#### Backend & Database

- **Supabase** (PostgreSQL 15.6)
  - Database (PostgreSQL)
  - Authentication (Google OAuth)
  - Storage (file uploads)
  - Realtime (WebSocket subscriptions)
  - Row Level Security (RLS)

#### State Management

- **Zustand + Immer** (client state)
- **TanStack Query v5** (server state, caching)

#### Specialized Libraries

**Dashboard Grid:**

- **react-grid-layout v1.5.2**
  - Draggable & resizable widgets
  - Responsive breakpoints
  - Auto-packing
  - No jQuery
  - 767+ projects using it

**App Builder:**

- **Craft.js**
  - React drag-and-drop framework
  - JSON serialization
  - MIT licensed
  - Community support ($11K+ raised)

**Other:**

- **@dnd-kit** (Drag & Drop)
- **Tiptap** (Rich Text Editor)
- **date-fns** (Date utilities)
- **rrule** (Recurring tasks)

#### Deployment

- **Vercel** (Frontend, free tier)
- **Supabase Cloud** (Backend, free tier)
- **Cost:** $0-25/month (MVP)

### 🗓️ Lộ Trình 12 Tuần - Code First Strategy

**Philosophy:** Code First, Not Design First

- Bỏ qua phase design
- Gộp Tuần 1-4 thành một sprint liên tục
- Ship nhanh, iterate dựa trên feedback

#### 📦 Giai Đoạn 1: Platform MVP (Tuần 1-4)

**Mục tiêu:** Dashboard Grid + App Builder No-Code + 3 App Minis working

**Tuần 1: Dashboard Grid Foundation**

- Setup `react-grid-layout` v1.5.2
- Build `DashboardGrid` component
  - Grid layout: 12 columns (desktop)
  - Responsive breakpoints: lg/md/sm/xs
  - Drag-drop handlers
- Build `AppMiniCard` wrapper
  - Drag handle
  - Remove button
  - Content area
- Supabase schema: `user_dashboard_layouts`
  - JSONB column for layout data
  - CRUD functions
- Layout persistence (save/load)

**Tuần 2: App Minis (Built-in Examples)**

- **QuickNotesApp**
  - Textarea component
  - localStorage persistence
  - Auto-save on change
- **PomodoroApp**
  - Timer: 25 min countdown
  - Start/Pause/Reset buttons
  - Browser notification
- **TodayTasksApp**
  - Supabase real-time subscription
  - Display tasks due today
  - Compact task item view

**Tuần 3-4: App Builder No-Code**

- Setup **Craft.js**
  - Configure editor
  - Canvas area
  - Component palette
  - Properties panel
- Build **5 Components**
  1. Text Block (static text)
  2. Text Input (user input)
  3. Button (click action)
  4. Text Display (dynamic text)
  5. Simple List (array display)
- Build **3 Actions**
  1. Append to List
  2. Clear Input
  3. Show/Hide toggle
- Build **AppRenderer**
  - Read JSON definition
  - Dynamically render components
  - Handle actions/events
- Supabase schema: `app_minis`
  - JSON column for app definition
  - CRUD functions
- Save/Load flow
  - Save → JSON to database
  - Load → JSON to AppRenderer
- **3 Template Apps**
  - Guest Book
  - Shopping List
  - Expense Tracker (simple)

**Deliverables Week 4:**

- ✅ Dashboard với 3 App Minis working
- ✅ App Builder có thể tạo simple apps
- ✅ 3 template apps có thể install
- ✅ Demo video (2 min)

#### 🛒 Giai Đoạn 2: Marketplace Foundation (Tuần 5-6)

**Tuần 5: Marketplace Browse & Detail**

- **Browse Page**
  - Grid layout of apps
  - Category filters
  - Search bar
  - Sort options (Popular, Recent, Top Rated)
- **App Detail Page**
  - Preview (screenshot or embed)
  - Description, author
  - Stats (downloads, rating)
  - Install button
  - Fork button

**Tuần 6: Install & Publish Flows**

- **Install Flow**
  - Click Install → Copy app to user's library
  - Add to Dashboard → Grid layout
- **Publish Flow**
  - Build app → Click "Publish to Marketplace"
  - Form: Name, Description, Category, Screenshot
  - Automated checks (validation)
  - Submit → App live
- **Pre-seed Apps**
  - 10 built-in apps (pre-built by me)
  - Diverse categories: Tasks, Finance, CRM, Custom
  - High-quality examples

**Deliverables Week 6:**

- ✅ Marketplace có 10+ apps
- ✅ Install flow works
- ✅ Publish flow works
- ✅ Ready for beta users

#### 🧪 Giai Đoạn 3: Validation (Tuần 7-8)

**Tuần 7: Beta Recruitment**

- Post on Reddit (r/productivity, r/nocode)
- ProductHunt soft launch
- Twitter/X threads
- Direct outreach (email)
- Target: 20 beta users

**Tuần 8: Feedback & Iteration**

- Onboarding sessions (1-on-1 calls)
- Feedback form (embedded in app)
- Analytics tracking
  - Apps created
  - Apps installed
  - Time spent
  - User retention (D1, D7)

**Success Criteria (Week 8):**

- 🎯 **5+ user-created apps** published
- 🎯 **20+ app installations** (not counting pre-seeds)
- 🎯 **1+ app forked** and customized
- 🎯 **3+ users** return on Day 7

#### 🚦 Giai Đoạn 4: Decision Point (Tuần 9-12)

**Week 9: Analyze Results**

- Quantitative metrics
- Qualitative feedback
- GO/NO-GO decision

**If GO (metrics đạt):**

- **Week 10-12:** Build Low-Code features
  - Conditional logic (visual workflow)
  - Database integration (Supabase)
  - Form validation
  - 5+ advanced components

**If NO-GO (metrics không đạt):**

- **Option A:** Pivot strategy (focus khác)
- **Option B:** Shutdown gracefully
- **Option C:** Continue as side project

### 🎯 Quyết Định "Keep It, Don't Polish It"

**Task Management Strategy:**

**✅ Features to KEEP (Already Implemented):**

1. Basic CRUD (Add, Edit, Complete task)
2. Kanban Board (drag-drop between columns)
3. Priority System (High, Medium, Low)
4. Basic Filters (Today view, Inbox view)

**🔄 Features to BACKLOG (Not Now):**

1. Tags System → Users có thể build "Tag Manager" app
2. Task Detail Modal → Inline edit đã "đủ tốt"
3. Delete Task → Soft delete với `is_archived` column
4. Keyboard Shortcuts → Power user feature, add later
5. Recurring Tasks (Advanced) → Basic OK, advanced sau
6. Calendar View → Can build với App Builder

**Messaging:**

> "NEXUS Task Manager is intentionally simple by design. It's good enough for tracking your work. If you need advanced features, use NEXUS alongside Todoist. **The real power is the Platform** - build the exact tools YOU need."

---

## V. NGUYÊN TẮC PHÁT TRIỂN

### 1️⃣ Code First Strategy

**Không design trước, code ngay:**

- Bỏ qua wireframes, mockups
- UI/UX iterate dựa trên working prototype
- Speed > Perfection

**Gộp sprints:**

- Tuần 1-4: Một sprint liên tục
- Không pause giữa chừng
- Ship incrementally

**MVP Mindset:**

- Build "đủ tốt" để validate
- Avoid perfectionism
- Iterate dựa trên feedback thực

### 2️⃣ Keep It, Don't Polish It

**Focus allocation:**

- 80% effort → Platform features (App Builder, Marketplace)
- 20% effort → Task Management (bug fixes only)

**Avoid feature creep:**

- Không thêm features nếu không validate trước
- Mỗi feature mới phải answer: "Does this help users BUILD apps?"
- Nếu không → Reject

**Clear positioning:**

- "We're not another task manager"
- "We're a platform to build productivity tools"

### 3️⃣ AI-Driven Development

**Use AI for:**

- Code generation (components, functions)
- Documentation (JSDoc, README)
- Testing (unit tests, integration tests)
- Debugging (error analysis)

**Best Practices:**

- Document all prompts in [AI_PROMPTS.md](./AI_PROMPTS.md)
- Review AI-generated code before commit
- Test thoroughly (AI code may have bugs)
- Iterate prompts for better results

**Tools:**

- ChatGPT (brainstorming, planning)
- Claude (code review, documentation)
- GitHub Copilot (inline code completion)

### 4️⃣ Tech Stack Consistency

**Never change mid-flight:**

- Stick với tech stack đã quyết định
- Không swap libraries giữa chừng
- Research trước khi commit

**Follow conventions:**

- File structure: See [TECH_STACK.md](../03-REFERENCE/TECH_STACK.md)
- Naming: camelCase (JS), kebab-case (files)
- Components: PascalCase
- Hooks: use* prefix

**Code quality:**

- TypeScript strict mode
- ESLint + Prettier
- No `any` types (use `unknown` hoặc specific)
- Test critical paths

### 5️⃣ Ship Fast, Iterate Faster

**Weekly demos:**

- Record demo video mỗi tuần
- Share với potential users
- Gather feedback

**Git workflow:**

- Main branch: stable, deployable
- Feature branches: short-lived (1-3 days)
- Commit messages: Conventional Commits
  - `feat: add dashboard grid`
  - `fix: resolve layout persistence bug`
  - `docs: update PRIMING_PROMPT.md`

**Deployment:**

- Deploy to Vercel on every push to main
- Preview deployments for PRs
- Monitor errors (Vercel Analytics)

---

## 📚 TÀI LIỆU THAM KHẢO

### Chiến Lược & Kế Hoạch

- **Whitepaper đầy đủ:** [NEXUS_WHITEPAPER.md](../01-STRATEGY/NEXUS_WHITEPAPER.md)
- **Lộ trình 12 tuần:** [ROADMAP.md](./ROADMAP.md)
- **AI Prompts:** [AI_PROMPTS.md](./AI_PROMPTS.md)

### Kỹ Thuật

- **Tech Stack chi tiết:** [TECH_STACK.md](../03-REFERENCE/TECH_STACK.md)
- **Nguyên tắc phát triển:** [PRINCIPLES.md](../03-REFERENCE/PRINCIPLES.md)

### Trạng Thái

- **Tuần này:** [status/THIS_WEEK.md](./status/THIS_WEEK.md)
- **Features log:** [status/FEATURES.md](./status/FEATURES.md)
- **Bugs log:** [status/BUGS.md](./status/BUGS.md)

---

## 🎯 QUICKSTART FOR AI ASSISTANT

**Khi bắt đầu một task mới:**

1. **Đọc context:**
   - `status/THIS_WEEK.md` - Biết đang ở đâu trong lộ trình
   - `status/BUGS.md` - Có bugs nào liên quan?
   - Section liên quan trong Whitepaper

2. **Hiểu requirements:**
   - Feature này giải quyết vấn đề gì?
   - Thuộc trụ cột nào? (Dashboard, Builder, Marketplace)
   - Level nào? (No-Code, Low-Code, God Mode)

3. **Check tech stack:**
   - Dùng library nào? (`TECH_STACK.md`)
   - Có examples không? (trong codebase)
   - Best practices? (`PRINCIPLES.md`)

4. **Code & Document:**
   - Generate code (follow conventions)
   - Add JSDoc comments
   - Update `FEATURES.md` log
   - Update `THIS_WEEK.md` checklist

5. **Test & Ship:**
   - Test locally
   - Commit với message rõ ràng
   - Push to branch
   - Create PR (if needed)

---

**Cập nhật lần cuối:** 17 tháng 11, 2025

**Nguồn:** NEXUS Whitepaper v3.0 (The Platform Pivot)

**Tác giả:** Solo Founder + AI Collaboration

**Version:** 3.0 - Code First Strategy
