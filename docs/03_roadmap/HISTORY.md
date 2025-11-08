# 📜 HISTORY - Lịch sử dự án

> **Mục đích:** Timeline TẤT CẢ quyết định, milestone, thay đổi lớn từ đầu đến giờ.

**Dự án:** NEXUS - Productivity OS  
**Bắt đầu:** October 2025  
**Cập nhật:** November 8, 2025

---

## 🎬 **ORIGIN STORY**

### **Tháng 10, 2025 - Ý tưởng ban đầu**

**Context:**  
Cần tool quản lý tasks + projects + notes trong một app. Tools hiện tại:
- Todoist: Quá đơn giản, thiếu project management
- ClickUp: Quá phức tạp, bloated features
- Notion: Tốt cho notes nhưng yếu về task management

**Quyết định:** Build NEXUS - "Productivity OS" tập trung vào:
- 70% Task Management (advanced recurring, smart lists)
- 20% Flexible Pages (Notion-like)
- 10% App Minis (lightweight extensions)

---

## 📅 **TIMELINE CHI TIẾT**

### **Week -2 (Oct 21-27, 2025) - Planning**

#### **Oct 21:** Brainstorm ý tưởng
- Viết vision: "Personal productivity platform for SMEs and power users"
- Target users: SME project managers, freelancers (20-100+ tasks)

#### **Oct 23:** Tech stack research
- Evaluated: Next.js vs Vite, Supabase vs Firebase, Redux vs Zustand
- **Quyết định chọn:**
  - ✅ Next.js 15 (App Router) - SSR, SEO, API routes
  - ✅ Supabase - PostgreSQL, auth, free tier
  - ✅ Zustand + Immer - Simple state management
  - ❌ KHÔNG chọn NestJS backend (quá complex, tốn thời gian)

#### **Oct 25:** Database schema v1
- Designed 8 tables: tasks, projects, users, workspaces, etc.
- **Problem discovered:** Không support recurring tasks tốt
- **Quyết định:** Redesign schema → v2

---

### **Week -1 (Oct 28 - Nov 3, 2025) - Setup**

#### **Oct 28:** Project init
- Created GitHub repo: `NEXUS`
- Installed Next.js 15, TypeScript, Tailwind CSS
- Setup folder structure

#### **Oct 30:** Database schema v2
- **Major change:** Added `recurring_patterns` table
- Added `rrule` field to tasks table (RFC-5545 standard)
- Total 11 tables now (thêm pages, app_minis, time_blocks)

#### **Nov 1:** UI component setup
- Installed shadcn/ui
- Added 15 components: Button, Input, Dialog, etc.
- Created design system (colors, typography, spacing)

#### **Nov 3:** Critical decision - Architecture
- **Question:** Monorepo (frontend + backend) hay chỉ frontend?
- **Quyết định:** ONLY frontend + Supabase
- **Lý do:** 
  - ✅ Faster development
  - ✅ $0/month hosting (free tiers)
  - ✅ AI dễ generate Supabase code hơn backend code

---

### **Week 0 (Nov 4-10, 2025) - Development Starts**

#### **Nov 4:** Documentation setup
- Created `docs/` folder
- Wrote initial README.md, PROJECT_STATUS.md
- Setup AI_PROMPTS.md workflow

#### **Nov 5:** Authentication
- Integrated Supabase Auth
- Google OAuth working
- **Bug:** RLS policy infinite recursion → Fixed same day

#### **Nov 6:** Task components scaffolding
- Created TaskItem, TaskList, TaskQuickAdd components
- Basic CRUD working (add, display, complete)

#### **Nov 7: 🎉 MAJOR MILESTONE - Database Deployed**
- **9:00 AM:** Ran migration `002_productivity_core_schema.sql`
- **10:30 AM:** Created test workspace: `c6be91ba-98c3-43e5-8e5e-94e389894fa6`
- **11:00 AM:** `/today` page working
- **14:00 PM:** `/inbox` page working
- **16:00 PM:** Fixed 3 bugs (useEffect loop, tasks disappearing, etc.)
- **Result:** Task management BASIC done! ✅

**Insight:** Với AI (ChatGPT/Claude), công việc 5 ngày → 1 ngày!

#### **Nov 8: 🎉 MAJOR MILESTONE - Kanban Board Done**
- **10:00 AM:** Started Prompt 1 (Kanban Board)
- **12:00 PM:** AI generated code (KanbanBoard, KanbanColumn, KanbanCard)
- **14:00 PM:** Fixed 2 bugs (ghost card offset, position không update)
- **15:30 PM:** Testing - All scenarios work ✅
- **16:00 PM:** Pushed to GitHub, marked Prompt 1 completed
- **Result:** Kanban board 100% done! 🚀

**Timeline:** 2 giờ (planned 1 ngày) - AI rất nhanh!

#### **Nov 8 (Chiều): Documentation Overhaul**
- **Problem discovered:** Docs lộn xộn, nhiều file duplicate/empty
- **Quyết định:** Tái cấu trúc toàn bộ docs/
- **Changes:**
  - Tạo numbered folders: `00_start-here/`, `01_status/`, `02_ai-prompts/`, etc.
  - Di chuyển 8 files
  - Xóa 5 files empty
  - Tạo 11 files mới với nội dung đầy đủ (Tiếng Việt)
- **Result:** Docs rõ ràng, dễ navigate hơn 10 lần!

---

## 🔄 **MAJOR DECISIONS & PIVOTS**

### **Decision #1: Supabase vs NestJS Backend**
- **Date:** Oct 23, 2025
- **Context:** Cần backend cho auth + database
- **Options:**
  - A) Supabase (BaaS)
  - B) NestJS + PostgreSQL + JWT auth (tự code)
- **Quyết định:** A - Supabase
- **Lý do:**
  - ✅ Save 2-3 tuần (không cần code auth)
  - ✅ Free tier đủ cho 1000 users
  - ✅ AI generate Supabase code dễ hơn
  - ❌ Vendor lock-in (acceptable risk)

---

### **Decision #2: Redux vs Zustand**
- **Date:** Oct 30, 2025
- **Context:** Cần state management cho optimistic updates
- **Options:**
  - A) Redux Toolkit
  - B) Zustand + Immer
- **Quyết định:** B - Zustand + Immer
- **Lý do:**
  - ✅ Đơn giản hơn 10 lần (no boilerplate)
  - ✅ Immer = viết mutable-looking code
  - ✅ Perfect cho optimistic updates
  - ❌ Redux: Quá nhiều code cho dự án nhỏ

---

### **Decision #3: Manual Code vs AI-Driven Development**
- **Date:** Nov 6, 2025
- **Context:** Kanban board estimate 1-2 ngày manual code
- **Experiment:** Thử dùng AI (ChatGPT) với prompts chi tiết
- **Result:** 
  - ✅ Done trong 2 giờ (thay vì 1-2 ngày)
  - ✅ Code quality tốt (zero TypeScript errors)
  - ⚠️ Cần fix 2 bugs nhỏ
- **Quyết định:** ALL-IN on AI-driven development!
- **New workflow:**
  1. Write detailed prompt
  2. AI generate code
  3. Test → Fix bugs
  4. Document → Next prompt
- **Impact:** Roadmap rút ngắn từ 12 tuần → 6-8 tuần (estimate)

---

## 📊 **METRICS OVER TIME**

| Date | Features Done | Lines of Code | Commits | Users | Tasks Created |
|------|---------------|---------------|---------|-------|---------------|
| Nov 4 | 0% | 0 | 1 | 0 | 0 |
| Nov 5 | 5% (Auth) | 500 | 3 | 1 | 0 |
| Nov 7 | 20% (Basic CRUD) | 2,000 | 8 | 1 | 50 |
| Nov 8 | 35% (Kanban) | 3,500 | 13 | 1 | 75 |

---

## 🐛 **BUGS FIXED (Historical)**

### **Nov 5:**
- ✅ RLS infinite recursion (workspace_members policy)

### **Nov 7:**
- ✅ TaskList infinite loop (useEffect dependencies)
- ✅ Tasks disappear after complete (filter issue)
- ✅ Missing created_by field (schema fix)

### **Nov 8:**
- ✅ Kanban ghost card offset (transform adjustment)
- ✅ Task position not updating (added position field)

**Total bugs fixed:** 6  
**Average fix time:** 15-30 min each

---

## 💡 **KEY LEARNINGS**

### **Technical:**
1. ✅ **AI-driven development works!**
   - Prompt quality = code quality
   - Always test & fix 1-2 bugs
   - Document prompts cho reuse

2. ✅ **Supabase RLS tricky nhưng powerful**
   - Cẩn thận với recursive policies
   - Test security với multiple users

3. ✅ **Optimistic updates = better UX**
   - UI update ngay, sync sau
   - Zustand + Immer perfect cho pattern này

### **Process:**
1. ✅ **Documentation crucial**
   - Docs tốt = Biết làm gì tiếp
   - AI cần docs để generate đúng code

2. ✅ **Small iterations win**
   - Deploy → Test → Fix → Repeat
   - Đừng code nhiều rồi mới test

3. ✅ **User research BEFORE building too much**
   - Week 0-3 focus interviews
   - Validate assumptions early

---

## 🎯 **WHAT'S NEXT?**

### **Nov 9-11 (Tuần này):**
- [ ] Complete Prompt 1.1-1.6 (Task Management Polish)
- [ ] 3-5 User interviews
- [ ] Update docs

### **Nov 14+ (Tuần sau):**
- [ ] Recurring tasks (Week 1)
- [ ] Calendar view (Week 1-2)
- [ ] Pages editor (Week 2)

**Xem chi tiết:** [ROADMAP.md](./ROADMAP.md)

---

## 📝 **NOTES FOR FUTURE**

### **Nếu dự án thành công:**
- Archive file HISTORY.md này
- Viết case study: "How we built NEXUS in 12 weeks với AI"
- Share learnings với community

### **Nếu dự án fail:**
- Keep HISTORY.md để học từ mistakes
- Analyze: Sai ở đâu? Tech? Market? Execution?
- Apply learnings vào dự án tiếp theo

---

**Last Updated:** November 8, 2025  
**Next Update:** November 11, 2025 (End of Week 0)  
**Total Development Time:** 5 days (Oct 4 → Nov 8)
