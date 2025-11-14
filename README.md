# 🚀 NEXUS - Productivity OS

> Công cụ quản lý năng suất kết hợp **Task Management**, **Calendar**, và **Flexible Pages**—được xây dựng cho SMEs và power users.

**Tại sao NEXUS?** Các công cụ hiện tại quá đơn giản (Todoist) hoặc quá phức tạp (ClickUp). NEXUS cân bằng giữa tính năng mạnh mẽ và giao diện sạch đẹp.

---

## 📖 Bắt đầu từ đâu?

### 🎯 **Người mới - Đọc theo thứ tự:**

1. **[QUICKSTART.md](./QUICKSTART.md)** - Cài đặt và chạy dự án (15 phút)
2. **[docs/00_start-here/README.md](./docs/00_start-here/README.md)** - Tổng quan toàn bộ documentation
3. **[docs/03_roadmap/PROJECT_STATUS.md](./docs/03_roadmap/PROJECT_STATUS.md)** - Trạng thái dự án chi tiết

### ⚡ **Developer - Làm việc hàng ngày:**

- **[docs/00_start-here/QUICKSTART_AI.md](./docs/00_start-here/QUICKSTART_AI.md)** ⭐ - Hôm nay làm gì tiếp? (Đọc mỗi sáng)
- **[docs/02_ai-prompts/AI_PROMPTS.md](./docs/02_ai-prompts/AI_PROMPTS.md)** - Prompts để code với AI
- **[docs/01_status/THIS_WEEK.md](./docs/01_status/THIS_WEEK.md)** - Focus tuần này (Cập nhật mỗi thứ 2)

### 🐛 **Gặp lỗi?**

- **[docs/04_technical/DEPLOY.md](./docs/04_technical/DEPLOY.md)** - Hướng dẫn deploy database
- **[docs/04_technical/SETUP.md](./docs/04_technical/SETUP.md)** - Setup môi trường local
- **[docs/01_status/BUGS.md](./docs/01_status/BUGS.md)** - Danh sách bugs đã biết

---

## 📊 Trạng thái dự án

**Giai đoạn:** Week 0 - Architecture & Design (Pivot to Platform)
**Cập nhật:** 13 tháng 11, 2024
**Tiến độ:** Week 0/12 - Platform MVP Focus

### ✅ Đã hoàn thành:

- Database v2 deployed (11 tables) ✅
- Authentication (Google OAuth) ✅
- Task CRUD (add, display, complete) ✅
- Task Management "đủ tốt" (Priority badges, Inline edit) ✅
- Pivot decision documented ✅

### 🔥 Đang làm tuần này (Week 0):

- Architecture Decision Record (ADR-001) cho App Mini system
- Dashboard Grid wireframes (3 screens)
- Research: react-grid-layout, Sandpack, iframe security
- Technical spike (optional)

**Chi tiết:** [docs/01_status/THIS_WEEK.md](./docs/01_status/THIS_WEEK.md) | [docs/03_roadmap/ROADMAP.md](./docs/03_roadmap/ROADMAP.md)

---

## 🛠️ Tech Stack

```
Frontend:  Next.js 16, React 19, TypeScript, TailwindCSS 4, shadcn/ui
State:     Zustand + Immer (optimistic updates)
Backend:   Supabase (PostgreSQL + Auth + RLS)
Deploy:    Vercel (frontend) + Supabase Cloud (database)
```

**Chi tiết:** [docs/00_start-here/TECH_STACK.md](./docs/00_start-here/TECH_STACK.md)

---

## 📁 Cấu trúc dự án

```
NEXUS/
├── README.md                           ← Bạn đang ở đây
├── QUICKSTART.md                       ← Cài đặt nhanh (15 phút)
│
├── docs/                               ← Documentation
│   ├── 00_start-here/                  🎯 Bắt đầu tại đây
│   │   ├── README.md                   ← Index toàn bộ docs
│   │   ├── QUICKSTART_AI.md            ⭐ Làm gì hôm nay?
│   │   ├── TECH_STACK.md               ← Giải thích công nghệ
│   │   └── PROJECT_STRUCTURE.md        ← Cấu trúc folder/file
│   │
│   ├── 01_status/                      📊 Trạng thái
│   │   ├── THIS_WEEK.md                ← Focus tuần hiện tại
│   │   ├── FEATURES.md                 ← 40 features checklist
│   │   ├── UI_UX.md                    ← UI components status
│   │   └── BUGS.md                     ← Bug tracking
│   │
│   ├── 02_ai-prompts/                  🤖 AI Prompts
│   │   ├── AI_PROMPTS.md               ← Danh sách prompts
│   │   ├── COMPLETED.md                ← Prompts đã xong
│   │   └── templates/                  ← Templates cho prompts mới
│   │
│   ├── 03_roadmap/                     🗺️ Kế hoạch
│   │   ├── PROJECT_STATUS.md           ← Overview dự án
│   │   ├── ROADMAP.md                  ← 12 tuần roadmap
│   │   ├── IDEAS.md                    ← Ideas backlog
│   │   └── HISTORY.md                  ← Timeline dự án
│   │
│   ├── 04_technical/                   ⚙️ Kỹ thuật
│   │   ├── SETUP.md                    ← Hướng dẫn cài đặt
│   │   ├── DEPLOY.md                   ← Deploy database
│   │   └── architecture/                ← Database schema & migrations
│   │
│   └── 05_research/                    🔬 User Research
│       ├── user-personas.md
│       ├── interview-script.md
│       └── success-metrics.md
│
└── frontend/                           💻 Source code
    ├── app/                            ← Next.js routes
    ├── components/                     ← React components
    ├── lib/                            ← Stores, hooks, utils
    └── types/                          ← TypeScript types
```

**Chi tiết:** [docs/00_start-here/PROJECT_STRUCTURE.md](./docs/00_start-here/PROJECT_STRUCTURE.md)

---

## ⚡ Quick Start

```bash
# 1. Clone repo
git clone https://github.com/hey-im-edward/NEXUS.git
cd NEXUS/frontend

# 2. Install dependencies
npm install

# 3. Setup Supabase (tạo account tại supabase.com)
# 4. Copy .env.local.example → .env.local (điền credentials)
# 5. Deploy database schema (copy từ docs/04_technical/architecture/migrations/)

# 6. Start dev server
npm run dev  # http://localhost:3000
```

**Hướng dẫn chi tiết:** [QUICKSTART.md](./QUICKSTART.md) hoặc [docs/04_technical/SETUP.md](./docs/04_technical/SETUP.md)

---

## 📖 Documentation Index

### **Essential (Đọc trước):**

- [QUICKSTART.md](./QUICKSTART.md) - Cài đặt và chạy (15 phút)
- [docs/00_start-here/README.md](./docs/00_start-here/README.md) - Index toàn bộ docs
- [docs/00_start-here/QUICKSTART_AI.md](./docs/00_start-here/QUICKSTART_AI.md) ⭐ - Làm gì hôm nay?

### **Planning & Status:**

- [docs/01_status/THIS_WEEK.md](./docs/01_status/THIS_WEEK.md) - Focus tuần này
- [docs/01_status/FEATURES.md](./docs/01_status/FEATURES.md) - Checklist 40 features
- [docs/01_status/UI_UX.md](./docs/01_status/UI_UX.md) - UI components status
- [docs/03_roadmap/ROADMAP.md](./docs/03_roadmap/ROADMAP.md) - 12-week roadmap

### **Development:**

- [docs/02_ai-prompts/AI_PROMPTS.md](./docs/02_ai-prompts/AI_PROMPTS.md) - AI coding prompts
- [docs/04_technical/SETUP.md](./docs/04_technical/SETUP.md) - Development setup
- [docs/04_technical/DEPLOY.md](./docs/04_technical/DEPLOY.md) - Database deployment

### **Research:**

- [docs/05_research/interview-script.md](./docs/05_research/interview-script.md) - User interview script
- [docs/05_research/user-personas.md](./docs/05_research/user-personas.md) - Target users

**Xem tất cả:** [docs/00_start-here/README.md](./docs/00_start-here/README.md)

---

## 🎯 Roadmap - 12 Tuần (PIVOT TO PLATFORM)

### **Week 0 (13-20/11): Architecture & Design** ← YOU ARE HERE

- [x] Pivot decision documented ✅
- [x] Update all documentation ✅
- [ ] ADR-001: App Mini Architecture
- [ ] Dashboard Grid wireframes
- [ ] Technical spike: react-grid-layout

### **Week 1 (21-27/11): Dashboard Infrastructure**

- [ ] Build DashboardGrid component
- [ ] Build AppMiniCard wrapper
- [ ] Layout persistence to Supabase
- [ ] `/dashboard` route functional

### **Week 2 (28/11-4/12): First App Minis**

- [ ] Quick Notes app (localStorage)
- [ ] Pomodoro Timer app
- [ ] App registry system

### **Week 3-4 (5-18/12): App Builder v0.1**

- [ ] Builder canvas (drag-drop components)
- [ ] 3 basic components (Input, Button, Text)
- [ ] Save/load app definitions (JSON)

### **Week 5-8: User Validation**

- [ ] Public beta launch
- [ ] 50 signups, 10 active users
- [ ] 5 apps created by users

### **Week 9-12: GO/NO-GO Decision**

**Success Criteria:** 10+ active users, 1-2 paying, "apps built" metric growing

**Chi tiết:** [docs/03_roadmap/ROADMAP.md](./docs/03_roadmap/ROADMAP.md)

---

## 🤝 Contributing

Dự án đang trong giai đoạn **Architecture & Design** (Week 0 - Platform MVP).
Hiện tại chưa nhận contributions từ bên ngoài.

**Nếu bạn quan tâm:**

- ⭐ Star repo này
- 📧 Email: [your-email@example.com]
- 💬 Follow progress tại [docs/01_status/THIS_WEEK.md](./docs/01_status/THIS_WEEK.md)

---

## 📄 License

MIT License - Xem [LICENSE](./LICENSE) để biết chi tiết.

---

## 📞 Liên hệ

**Developer:** Edward
**GitHub:** [@hey-im-edward](https://github.com/hey-im-edward)
**Project:** [NEXUS](https://github.com/hey-im-edward/NEXUS)

---

**Cập nhật:** 13 tháng 11, 2024
**Version:** 2.0.0 - Productivity Platform (Pivot to Platform)
**Giai đoạn:** Week 0 - Architecture & Design

**🚀 Ready to build? → [QUICKSTART.md](./QUICKSTART.md)**
