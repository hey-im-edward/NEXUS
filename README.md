# 🚀 NEXUS Platform

<div align="center">

![NEXUS Banner](https://via.placeholder.com/800x200/0EA5E9/FFFFFF?text=NEXUS+Platform)

**"Hệ điều hành" cho Năng suất Cá nhân và Đội Nhóm Nhỏ**

**The Operating System for Personal & Small Team Productivity**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6-blue)](https://www.typescriptlang.org/)
[![Next.js](https://img.shields.io/badge/Next.js-16.0-black)](https://nextjs.org/)
[![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL-green)](https://supabase.com/)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)

[📖 Whitepaper](#-whitepaper) • [✨ Features](#-features) • [🚀 Quick Start](#-quick-start) • [📚 Docs](#-documentation) • [🤝 Contributing](#-contributing)

</div>

---

## 🎯 NEXUS là gì?

> **NEXUS không phải là một ứng dụng. NEXUS là một Platform.**

### Câu hỏi cốt lõi chúng tôi giải quyết:

**"Tại sao chúng ta phải 'uốn mình' để phù hợp với công cụ, thay vì công cụ phù hợp với chúng ta?"**

**Thực tế hiện nay:**

- 📱 **10+ productivity apps riêng lẻ** → Context switching hell
- 🔧 **Rigid tools** (Todoist, Trello) → Không đủ flexible
- 🏢 **Complex platforms** (ClickUp, Monday) → Overkill, đắt đỏ, overwhelming
- 📝 **Flexible tools** (Notion, Airtable) → Vẫn bị giới hạn, không phải platform thực sự

### Giải pháp của NEXUS:

**What if bạn có thể:**

- ✅ Tự **build các công cụ** bạn cần với **visual programming**
- ✅ **Chia sẻ công cụ** đó với người khác qua **Marketplace**
- ✅ **Customize** bất kỳ app nào cho riêng bạn
- ✅ Tất cả trong **một dashboard duy nhất**

**Đó chính là NEXUS.**

---

## 💡 Vision: Democratize Tools Creation

Giống như:

- **WordPress** dân chủ hóa việc tạo website → Ai cũng có thể tạo blog
- **Canva** dân chủ hóa thiết kế đồ họa → Ai cũng có thể thiết kế poster
- **NEXUS** dân chủ hóa việc tạo productivity tools → **Ai cũng có thể build apps riêng**

---

## 🏗️ Kiến Trúc: 3 Trụ Cột

### 🏠 Trụ Cột 1: Dashboard Grid

**"iOS Home Screen for Productivity"**

```
┌──────────────────────────────────────┐
│  Dashboard: Your Workspace           │
├────────────┬────────────┬────────────┤
│ Today      │ Team       │ Invoices   │
│ Tasks      │ Workload   │ Tracker    │
│ [App Mini] │ [App Mini] │ [App Mini] │
├────────────┴────────────┴────────────┤
│ Client CRM                           │
│ [App Mini]                           │
├──────────────────────┬───────────────┤
│ Meeting Notes        │ Quick Capture │
│ [App Mini]           │ [App Mini]    │
└──────────────────────┴───────────────┘
```

- ✅ **Drag & Drop:** Sắp xếp app minis như iOS Home Screen
- ✅ **Resizable:** Thay đổi kích thước widgets
- ✅ **Multi-Dashboard:** Tạo nhiều dashboards cho contexts khác nhau
- ✅ **Auto-Save:** Layout lưu real-time vào Supabase

**Tech:** `react-grid-layout` v1.5.2 (used by 767+ projects)

---

### 🛠️ Trụ Cột 2: App Builder (3 Levels)

**"LEGO for Productivity Tools"**

#### 🎨 Level 1: No-Code (Week 1-4 MVP)

```typescript
const components = [
  'Text',      // Display text
  'Button',    // Trigger actions
  'Input',     // User input
  'Container', // Layout wrapper
  'List'       // Dynamic lists
]

const actions = [
  'appendToList',  // Add item to list
  'clearInput',    // Clear input field
  'toggleElement'  // Show/hide elements
]
```

**Target:** Người không biết code
**Example Apps:** Guest Book, Shopping List, Expense Tracker
**Limitations:** Không có conditional logic, không có database

---

#### ⚙️ Level 2: Low-Code (Week 9-12 nếu GO)

**Target:** Power users
**Add:**

- Conditional logic (if/else)
- Database integration (Supabase)
- Form validation
- Workflows (giống Zapier)

**Example Apps:** CRM với auto-assignment, Invoice tracker với calculations

---

#### 💻 Level 3: God Mode (Post-MVP)

**Target:** Developers
**Add:**

- Custom code (JavaScript/TypeScript)
- API integrations
- Git, CI/CD, testing
- npm packages

**Example Apps:** Custom Stripe integration, Slack bot, API connectors

---

**Progressive Disclosure:**

```
👶 Người mới → No-Code (easy entry)
         ↓
👨‍💼 Power user → Low-Code (advanced features)
         ↓
👨‍💻 Developer → God Mode (full control)
```

---

### 🛒 Trụ Cột 3: Marketplace

**"App Store for Productivity"**

- **Browse:** Khám phá apps do community tạo
- **Install:** 1-click install vào dashboard
- **Fork:** Clone và customize bất kỳ app nào
- **Publish:** Share apps của bạn

**Categories:**

- 📋 Task Management (Kanban, GTD, Eisenhower Matrix)
- 💰 Finance (Expense Tracker, Invoice Manager, Budget Planner)
- 👥 CRM (Sales Pipeline, Client Tracker, Lead Scoring)
- 📊 Analytics (Time Tracker, Goal Tracker, Habit Tracker)
- 🎯 Custom (Bất kỳ thứ gì bạn nghĩ ra)

**Network Effect:**
Càng nhiều users → Càng nhiều apps → Càng thu hút users → Self-sustaining ecosystem

---

## ✨ Features

### 📱 3 App Minis Built-in

1. **QuickNotes** - Ghi chú nhanh với localStorage
2. **Pomodoro** - Timer 25 phút focus
3. **TodayTasks** - Hiển thị tasks hôm nay real-time từ Task Management

### 📋 Task Management (Entry Point)

- ✅ Kanban Boards
- ✅ Inbox + Today + Projects views
- ✅ Priority labels (P1/P2/P3)
- ✅ Drag-and-drop tasks
- ✅ Inline editing

**Philosophy:** "Keep It, Don't Polish It"

Task Management ở mức "**đủ tốt**" để:

- Users có data trong platform ngay từ ngày đầu
- Có entry point dễ onboarding
- **Nhưng không lãng phí time** polish features (focus vào Platform instead)

---

## 🏗️ Tech Stack

<div align="center">

| Category                   | Technology        | Version         | Rationale                              |
| -------------------------- | ----------------- | --------------- | -------------------------------------- |
| **Framework**        | Next.js           | 16.0.1          | App Router, Turbopack stable, RSC      |
|                            | React             | 19.2            | Concurrent rendering default           |
|                            | TypeScript        | 5.6             | Type safety, developer experience      |
| **UI**               | TailwindCSS       | 4.0 Alpha       | Utility-first, performance             |
|                            | shadcn/ui         | Latest          | Beautiful, accessible components       |
| **Backend**          | Supabase          | PostgreSQL 15.6 | BaaS, RLS policies, real-time          |
| **State Management** | Zustand + Immer   | Latest          | Simple, performant client state        |
|                            | TanStack Query    | v5              | Server state, caching, optimistic UI   |
| **Grid Layout**      | react-grid-layout | v1.5.2          | Drag & drop, responsive (767+ users)   |
| **App Builder**      | Craft.js          | Latest          | Visual page editor, JSON serialization |
| **Deployment**       | Vercel            | -               | Edge network, zero-config              |
|                            | Supabase Cloud    | -               | Managed PostgreSQL, Auth               |

</div>

**📖 Chi tiết:** [TECH_STACK.md](docs/03-REFERENCE/TECH_STACK.md)

**💰 Cost Estimate:**

- **MVP (Week 1-4):** $1/tháng (Supabase Free + Vercel Hobby)
- **Scale (100 users):** $46-72/tháng
- **Growth (1000 users):** $101/tháng

---

## 🚀 Quick Start

### Requirements

```bash
Node.js >= 18.x
npm >= 9.x (hoặc pnpm >= 8.x)
Supabase Account (free tier)
```

### Installation

```bash
# 1. Clone repository
git clone https://github.com/yourusername/NEXUS.git
cd NEXUS

# 2. Install dependencies
npm install

# 3. Setup environment variables
cp .env.example .env.local

# Thêm Supabase credentials vào .env.local:
# NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
# NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
# SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# 4. Run database migrations
cd backend/supabase
npx supabase db reset
cd ../..

# 5. Start development server
cd frontend
npm run dev
```

Mở [http://localhost:3000](http://localhost:3000)

### Docker Setup (Optional)

```bash
docker-compose up -d
```

---

## 📚 Documentation

### 📖 Strategy Docs

- **[NEXUS_WHITEPAPER.md](docs/01-STRATEGY/NEXUS_WHITEPAPER.md)** - Vision, strategy, market analysis (3,000+ words)

### 🗺️ Execution Docs

- **[ROADMAP.md](docs/02-EXECUTION/ROADMAP.md)** - 12-week roadmap (Platform MVP → Validation → Decision Point)
- **[AI_PROMPTS.md](docs/02-EXECUTION/AI_PROMPTS.md)** - 14 parent prompts cho từng tuần (copy-paste ready)
- **[PRIMING_PROMPT.md](docs/02-EXECUTION/PRIMING_PROMPT.md)** - Context cho AI assistants

### 📊 Status Docs

- **[THIS_WEEK.md](docs/02-EXECUTION/status/THIS_WEEK.md)** - Current week progress
- **[FEATURES.md](docs/02-EXECUTION/status/FEATURES.md)** - Changelog (10 completed, 2 in progress, 128 planned)
- **[BUGS.md](docs/02-EXECUTION/status/BUGS.md)** - Bug tracker (2 active, 4 fixed)

### 🛠️ Reference Docs

- **[TECH_STACK.md](docs/03-REFERENCE/TECH_STACK.md)** - Tech decisions & rationales (1,264 lines)
- **[PRINCIPLES.md](docs/03-REFERENCE/PRINCIPLES.md)** - 12 core development principles

---

## 🎯 Roadmap & Status

### ✅ Week 0-4: Platform MVP (Current)

**Status:** 🚧 In Progress (2/8 completed)

| Prompt        | Feature                 | Status         |
| ------------- | ----------------------- | -------------- |
| **1.1** | DashboardGrid component | ✅ Completed   |
| **1.2** | AppMiniCard wrapper     | ✅ Completed   |
| **1.3** | 3 App Minis             | 🚧 In Progress |
| **1.4** | Craft.js setup          | ⏳ Pending     |
| **1.5** | 5 Builder components    | ⏳ Pending     |
| **1.6** | 3 Actions system        | ⏳ Pending     |
| **1.7** | Save/load + AppRenderer | ⏳ Pending     |
| **1.8** | 3 Template apps         | ⏳ Pending     |

---

### 🔜 Week 5-6: Marketplace

| Prompt        | Feature                   | Status     |
| ------------- | ------------------------- | ---------- |
| **2.1** | Marketplace browse page   | ⏳ Pending |
| **2.2** | App detail + install flow | ⏳ Pending |
| **2.3** | Publish flow              | ⏳ Pending |

---

### 💭 Week 7-8: Validation

| Prompt        | Feature                     | Status     |
| ------------- | --------------------------- | ---------- |
| **3.1** | Beta recruitment (20 users) | ⏳ Pending |
| **3.2** | Onboarding + feedback       | ⏳ Pending |

---

### 🚀 Week 9-12: Decision Point

| Prompt        | Feature              | Status     |
| ------------- | -------------------- | ---------- |
| **4.1** | Analytics & GO/NO-GO | ⏳ Pending |

**📖 Chi tiết:** [ROADMAP.md](docs/02-EXECUTION/ROADMAP.md)

---

## 📊 North Star Metric

```
Formula: (Apps Built by Users) × (Average Installs per App)

Targets:
├─ Week 4:   5 apps × 2 installs  = 10 points
├─ Week 8:  15 apps × 3 installs  = 45 points
└─ Week 12: 30 apps × 5 installs  = 150 points
```

**❌ KHÔNG PHẢI:** "How many tasks created?" (Task Management thinking)

**✅ MÀ LÀ:** **"How many apps built and shared?"** (Platform thinking)

---

## 🤝 Contributing

Contributions are welcome! 🎉

### Quick Contribution Flow

```bash
# 1. Fork repo
# 2. Create feature branch
git checkout -b feature/amazing-feature

# 3. Make changes
# 4. Commit (following conventions)
git commit -m 'feat: add amazing feature'

# 5. Push
git push origin feature/amazing-feature

# 6. Open Pull Request
```

### Guidelines

Đọc [CONTRIBUTING.md](CONTRIBUTING.md) để biết:

- 🔧 Development environment setup
- 📝 Coding conventions (TypeScript strict mode, ESLint, Prettier)
- 🧪 Testing strategy
- 📋 Pull Request process
- 🐛 Bug reporting template
- 📜 Commit message conventions

---

## 🌟 Contributors

<div align="center">

<!-- ALL-CONTRIBUTORS-LIST:START -->

<!-- Auto-generated by all-contributors bot -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

Cảm ơn tất cả contributors! ❤️

[Become a contributor](CONTRIBUTING.md)

</div>

---

## 📊 Project Stats

<div align="center">

![GitHub Stars](https://img.shields.io/github/stars/yourusername/NEXUS?style=social)
![GitHub Forks](https://img.shields.io/github/forks/yourusername/NEXUS?style=social)
![GitHub Issues](https://img.shields.io/github/issues/yourusername/NEXUS)
![GitHub PRs](https://img.shields.io/github/issues-pr/yourusername/NEXUS)
![Last Commit](https://img.shields.io/github/last-commit/yourusername/NEXUS)

</div>

---

## 📞 Contact & Community

- 📧 **Email:** [support@nexus.dev](mailto:support@nexus.dev)
- 💬 **Discord:** [Join community](https://discord.gg/nexus)
- 🐦 **Twitter:** [@NexusPlatform](https://twitter.com/NexusPlatform)
- 📝 **Blog:** [blog.nexus.dev](https://blog.nexus.dev)
- 🐛 **Issues:** [GitHub Issues](https://github.com/yourusername/NEXUS/issues)

---

## 📄 License

This project is licensed under the **MIT License** - see [LICENSE](LICENSE) file for details.

```text
Copyright (c) 2025 NEXUS Contributors

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software...
```

---

## 🙏 Acknowledgments

**Technologies:**

- [Next.js](https://nextjs.org/) - React framework for production
- [Supabase](https://supabase.com/) - Open source Firebase alternative
- [shadcn/ui](https://ui.shadcn.com/) - Beautiful, accessible component library
- [Craft.js](https://craft.js.org/) - React framework for drag-and-drop page editors
- [react-grid-layout](https://github.com/react-grid-layout/react-grid-layout) - Draggable and resizable grid layouts

**Inspiration:**

- [Notion](https://notion.so) - Document-centric platform approach
- [Airtable](https://airtable.com) - Database-first flexibility
- [Bubble.io](https://bubble.io) - No-code app builder concept
- [WordPress](https://wordpress.org) - Platform democratization

---

## 🚀 Deploy

### Vercel (Recommended)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/NEXUS&env=NEXT_PUBLIC_SUPABASE_URL,NEXT_PUBLIC_SUPABASE_ANON_KEY,SUPABASE_SERVICE_ROLE_KEY)

1. Click button trên
2. Connect GitHub repository
3. Add environment variables (Supabase credentials)
4. Deploy!

### Manual Deployment

```bash
# Build for production
npm run build

# Start production server
npm start
```

**📖 Chi tiết:** [DEPLOY.md](docs/04-technical/DEPLOY.md)

---

<div align="center">

## 📜 Documentation Index

| Document                                                 | Description                                      |
| -------------------------------------------------------- | ------------------------------------------------ |
| [NEXUS_WHITEPAPER.md](docs/01-STRATEGY/NEXUS_WHITEPAPER.md) | Vision, strategy, market analysis (3,000+ words) |
| [ROADMAP.md](docs/02-EXECUTION/ROADMAP.md)                  | 12-week execution roadmap                        |
| [AI_PROMPTS.md](docs/02-EXECUTION/AI_PROMPTS.md)            | 14 parent prompts (copy-paste ready)             |
| [TECH_STACK.md](docs/03-REFERENCE/TECH_STACK.md)            | Tech stack rationales & examples                 |
| [PRINCIPLES.md](docs/03-REFERENCE/PRINCIPLES.md)            | 12 core development principles                   |
| [CONTRIBUTING.md](CONTRIBUTING.md)                          | How to contribute                                |
| [FEATURES.md](docs/02-EXECUTION/status/FEATURES.md)         | Changelog & progress tracker                     |
| [BUGS.md](docs/02-EXECUTION/status/BUGS.md)                 | Bug tracker & fix history                        |

</div>

---

<div align="center">

**[⬆ Back to top](#-nexus-platform)**

---

**Made with ❤️ by [NEXUS Team](https://github.com/yourusername)**

⭐ **Star this repo nếu bạn thấy hữu ích!**

**Platform First. Code Second. Ship Fast.**

</div>
