# NEXUS - All-in-One Project Management Platform

> **Vision:** Giảm tool fragmentation cho SMEs bằng dashboard có thể mở rộng với app mini ecosystem.

## 🎯 What is NEXUS?

NEXUS là nền tảng quản lý dự án **all-in-one** cho SMEs (10-50 người), kết hợp:
- **Core Dashboard** giống Notion để docs và organization
- **App Mini System** - Các modules có thể cài đặt (CRM, Kanban, Time tracking, etc.)
- **Marketplace** - Chia sẻ và download app minis từ cộng đồng

### Target Users
- **Primary:** Project Managers tại SMEs (agencies, software houses)
- **Secondary:** Freelancer teams (2-5 người)
- **Pain Point:** Đang dùng 5-8 tools rời rạc, tốn $40+/user/month, mất thời gian switch

### Value Proposition
Replace 5+ tools với 1 platform:
- ✅ Docs (thay Notion)
- ✅ Tasks (thay Trello/Asana)
- ✅ CRM (thay Google Sheets)
- ✅ Time tracking (thay Harvest)
- ✅ Files (thay Drive)

**Target Price:** $15-20/user/month (save 50%+ so với multiple tools)

---

## 🚀 Current Status

**Phase:** POC (Proof of Concept)  
**Timeline:** Week 0 - User Research  
**Next Milestone:** Week 4 - POC Demo

### Progress
- [x] Project setup
- [x] User research templates created
- [ ] 0/10 user interviews completed
- [ ] Supabase project setup
- [ ] First prototype

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
  - Next.js 14 (App Router)
  - React 19
  - TailwindCSS 4
  - shadcn/ui components
  - Zustand (state management)
  - react-grid-layout (dashboard drag & drop)

Backend:
  - Supabase (PostgreSQL + Auth + Storage + Edge Functions)
  - No separate backend needed for MVP

Deployment:
  - Vercel (frontend, free tier)
  - Supabase Cloud (database, free tier)

Monitoring:
  - Vercel Analytics (built-in)
  - Sentry (error tracking, free tier)
```

**Cost:** $0/month for first 500 users

---

## 📂 Project Structure

```
NEXUS/
├── frontend/                 # Next.js app
│   ├── app/                 # App Router pages
│   │   ├── (auth)/         # Auth routes (login, signup)
│   │   ├── (dashboard)/    # Dashboard routes
│   │   └── (marketing)/    # Landing page
│   ├── components/
│   │   ├── ui/            # shadcn/ui components
│   │   ├── auth/          # Auth components
│   │   ├── dashboard/     # Dashboard layout
│   │   └── app-mini/      # App mini components
│   ├── lib/
│   │   ├── supabase/      # Supabase client configs
│   │   └── utils/         # Helper functions
│   ├── types/             # TypeScript types
│   └── hooks/             # Custom React hooks
├── docs/
│   ├── research/          # User research
│   │   ├── interview-script.md
│   │   ├── success-metrics.md
│   │   └── user-personas.md
│   ├── architecture/      # Tech decisions
│   └── archive/           # Old chat logs
├── scripts/               # Automation scripts
└── README.md
```

---

## 🗓️ 12-Week Roadmap

### Phase 0: User Research (Week 0-3) - CURRENT
**Goal:** Validate problem and solution

**Tasks:**
- [ ] Complete 10 user interviews with SME PMs
- [ ] Document pain points and must-have features
- [ ] Get 20 people to commit to beta testing
- [ ] Define MVP scope based on insights

**Success Criteria:**
- ✅ 7/10 interviews show strong interest
- ✅ Clear top 3 pain points
- ✅ 50%+ willing to pay $10+/user/month

---

### Phase 1: POC (Week 1-4)
**Goal:** Prove technical concept works

#### Week 1: Auth + Dashboard Shell
- [ ] Supabase setup (auth, database)
- [ ] Google OAuth login
- [ ] Empty dashboard layout
- [ ] Deploy to Vercel

#### Week 2: Simple Doc Editor
- [ ] Rich text editor (Tiptap)
- [ ] Create/edit/delete docs
- [ ] Auto-save to Supabase
- [ ] Sidebar navigation

#### Week 3: App Mini System v0.1
- [ ] 3 pre-built app minis:
  - [ ] Todo List
  - [ ] Kanban Board
  - [ ] Simple Table
- [ ] Add to dashboard
- [ ] Data persistence

#### Week 4: Dashboard Grid Layout
- [ ] react-grid-layout integration
- [ ] Drag & drop app minis
- [ ] Save layout to Supabase
- [ ] Mobile responsive

**Success Criteria:**
- ✅ 5 people test it, 3/5 say "would use"
- ✅ Technical foundation solid
- ✅ Public demo URL

**GO/NO-GO Decision:** If <3/5 interested → Pivot

---

### Phase 2: MVP (Week 5-8)
**Goal:** Production-ready MVP for beta testers

#### Week 5: Team Collaboration
- [ ] Invite users to workspace
- [ ] Share dashboards
- [ ] Basic permissions (owner/viewer/editor)

#### Week 6: App Mini Marketplace
- [ ] Browse marketplace UI
- [ ] Install app mini to dashboard
- [ ] 5-10 curated app minis
- [ ] Basic ratings

#### Week 7-8: Polish
- [ ] Mobile optimization
- [ ] Error handling
- [ ] Loading states
- [ ] Onboarding flow (3 questions)
- [ ] Help docs

**Success Criteria:**
- ✅ 20 sign-ups from beta list
- ✅ 10 active users (≥2x/week)
- ✅ 0 critical bugs
- ✅ Average session >5 minutes

---

### Phase 3: Iteration (Week 9-12)
**Goal:** Product-market fit

- [ ] Fix top 5 bugs
- [ ] Add top 3 requested features
- [ ] Performance optimization
- [ ] Prepare for public launch

**Success Criteria:**
- ✅ 50+ sign-ups
- ✅ 20+ active users
- ✅ Organic referrals
- ✅ 1-2 paying customers

**GO/NO-GO Decision:** 
- If <10 active users after 12 weeks → Pivot or stop

---

## 🚦 Getting Started (For Developers)

### Prerequisites
- Node.js 20+ LTS
- Git
- VS Code (recommended)
- Supabase account (free)

### Setup Instructions

1. **Clone repo**
```bash
git clone https://github.com/hey-im-edward/NEXUS.git
cd NEXUS/frontend
```

2. **Install dependencies**
```bash
npm install
```

3. **Setup Supabase**
- Go to [supabase.com](https://supabase.com)
- Create new project
- Copy URL and Anon Key

4. **Environment variables**
```bash
cp .env.local.example .env.local
# Edit .env.local with your Supabase credentials
```

5. **Run development server**
```bash
npm run dev
# Open http://localhost:3000
```

6. **Setup database schema**
```sql
-- Run in Supabase SQL Editor
-- See docs/architecture/database-schema.sql
```

---

## 📚 Documentation

- **[User Research](./docs/research/)** - Interview scripts, personas, metrics
- **[Architecture](./docs/architecture/)** - Tech decisions, database schema
- **[Archive](./docs/archive/)** - Historical chat logs with ChatGPT/Claude

---

## 🎨 Design System

**Colors:**
- Primary: #2563eb (blue-600)
- Background: #ffffff / #f9fafb
- Text: #111827
- Border: #e5e7eb

**Typography:**
- Font: Inter (system fallback)
- Headings: 700 weight
- Body: 400 weight

**Components:**
- Using [shadcn/ui](https://ui.shadcn.com)
- Customized with Tailwind

---

## 🤝 Contributing

Currently in **private development**. Will open source after MVP.

If you're a beta tester:
1. Use the app
2. Report bugs via [GitHub Issues]
3. Share feedback in user interviews

---

## 📊 Key Metrics (Updated Weekly)

**Current Week:** 0 (User Research)
- Sign-ups: 0
- Active users: 0
- User interviews: 0/10
- Beta commitments: 0/20

---

## 📝 License

Proprietary (for now)

---

## 📧 Contact

**Founder:** Edward  
**Email:** [your-email]  
**GitHub:** [@hey-im-edward](https://github.com/hey-im-edward)

---

## 🙏 Acknowledgments

- Next.js team for amazing framework
- Supabase team for free tier
- shadcn for beautiful components
- ChatGPT & Claude for initial architecture discussions

---

**Last Updated:** November 7, 2025  
**Version:** 0.1.0-poc