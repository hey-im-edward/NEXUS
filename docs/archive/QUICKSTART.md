# 🚀 Hướng Dẫn Nhanh - NEXUS Productivity OS

> **Mục tiêu:** Từ zero đến app chạy được trong 15 phút.

---

## ⚡ TL;DR (Cực Nhanh)

```bash
# 1. Cài Node.js 20+ từ nodejs.org

# 2. Clone và setup
git clone https://github.com/hey-im-edward/NEXUS.git
cd NEXUS/frontend
npm install

# 3. Tạo project Supabase tại supabase.com

# 4. Setup environment
cp .env.local.example .env.local
# Edit .env.local với Supabase URL và Anon Key của bạn

# 5. Deploy database schema
# Option A (Recommended): Using Supabase CLI
# npm install -g supabase
# supabase login
# supabase link --project-ref YOUR-PROJECT-REF
# supabase db push
#
# Option B: Manual SQL
# Mở Supabase SQL Editor → Copy từ supabase/migrations/ → Paste và Run

# 6. Start dev server
npm run dev
# Mở http://localhost:3000
```

---

## 📚 Các Bước Chi Tiết

### 1. Yêu Cầu (5 phút)

**Cài Node.js:**

- Vào [nodejs.org](https://nodejs.org)
- Download v20 LTS (hoặc mới nhất)
- Cài đặt (click Next, Next, Finish)
- Xác minh: Mở terminal → `node --version` (nên hiện v20.x.x)

**Cài Git:**

- Windows: [git-scm.com](https://git-scm.com)
- Mac: Đã có sẵn (hoặc `brew install git`)
- Xác minh: `git --version`

**Cài VS Code (Tùy chọn nhưng khuyến nghị):**

- [code.visualstudio.com](https://code.visualstudio.com)

---

### 2. Setup Supabase (10 phút)

**Tạo Tài Khoản:**

1. Vào [supabase.com](https://supabase.com)
2. Đăng nhập với GitHub
3. Click "New project"
4. Điền thông tin:
   - Name: `nexus-dev`
   - Database Password: (generate và LƯU LẠI)
   - Region: Southeast Asia (Singapore)
   - Plan: Free
5. Đợi 2-3 phút

**Lấy Credentials:**

1. Click Settings (icon bánh răng) → API
2. Copy:
   - Project URL: `https://xxxxx.supabase.co`
   - anon public key: `eyJ...`

**Setup Database:**

**Option A: Using Supabase CLI (Recommended)**

```bash
# Install Supabase CLI
npm install -g supabase

# Login
supabase login

# Link project (get project-ref từ Supabase Dashboard → Settings → General)
supabase link --project-ref YOUR-PROJECT-REF

# Deploy migrations
supabase db push
```

**Option B: Manual SQL (Fallback)**

1. Click SQL Editor (thanh bên trái, icon database)
2. Click nút "+ New query"
3. Mở migration files từ `supabase/migrations/` trong VS Code (theo thứ tự: 20251107000000, rồi 20251107000001)
4. Copy TẤT CẢ nội dung từ mỗi file
5. Paste vào Supabase SQL Editor
6. Click "Run" (hoặc nhấn Ctrl+Enter)
7. Đợi 10-15 giây để thấy thông báo SUCCESS

**Xác Minh Tables Đã Tạo:**

```sql
-- Chạy query này để xác minh:
SELECT
  'tasks' as table_name, COUNT(*) FROM public.tasks
UNION ALL
SELECT 'projects', COUNT(*) FROM public.projects;
-- Nên hiện 0 rows mỗi cái (tables tồn tại nhưng rỗng)
```

---

### 3. Setup Dự Án (10 phút)

```bash
# Clone
git clone https://github.com/hey-im-edward/NEXUS.git
cd NEXUS/frontend

# Cài dependencies (mất 2-3 phút)
npm install

# Setup environment
cp .env.local.example .env.local
```

Chỉnh sửa `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=your-project-url-here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

---

### 4. Chạy Dev Server (5 phút)

```bash
npm run dev
```

Mở browser: http://localhost:3000

Bạn nên thấy trang welcome Next.js.

**Nếu bạn thấy lỗi:**

- Check `.env.local` có giá trị đúng chưa
- Restart terminal
- Chạy `npm run dev` lại

---

## ✅ Bạn Đã Sẵn Sàng!

Bây giờ test app:

1. Navigate đến http://localhost:3000/today
2. Bạn nên thấy trang "My Day" với task list
3. Thử thêm task (nó sẽ hoạt động vì workspace đã tự động tạo với helper `getOrCreateWorkspaceId()`)

**Các Bước Tiếp Theo:**

1. Đọc `docs/01_status/THIS_WEEK.md` để hiểu focus của tuần này
2. Sau đó bạn có thể thêm/hoàn thành tasks!

---

## 📁 Các File Quan Trọng Cần Biết

```
NEXUS/
├── README.md                        ← Tổng quan dự án
├── QUICKSTART.md                    ← File này
│
├── docs/
│   ├── 00_start-here/
│   │   ├── README.md               ← ⭐ Chỉ mục tài liệu
│   │   ├── QUICKSTART_AI.md        ← ⭐ Hướng dẫn workflow hàng ngày
│   │   ├── TECH_STACK.md           ← Giải thích tech stack
│   │   └── PROJECT_STRUCTURE.md    ← Hướng dẫn cấu trúc file
│   │
│   ├── 01_status/
│   │   ├── THIS_WEEK.md            ← ⭐ Focus của tuần hiện tại
│   │   ├── FEATURES.md             ← Checklist features
│   │   └── BUGS.md                 ← Bugs đã biết
│   │
│   ├── 02_ai-prompts/
│   │   └── AI_PROMPTS.md           ← ⭐ Thư viện AI prompts
│   │
│   ├── 03_roadmap/
│   │   └── PROJECT_STATUS.md       ← ⭐ Tài liệu master
│   │
│   ├── 04_technical/
│   │   ├── SETUP.md                ← Setup chi tiết
│   │   ├── DEPLOY.md               ← ⭐ Deploy database
│   │   └── architecture/
│   │       └── migrations/
│   │           └── 002_productivity_core_schema.sql
│   │
│   └── 05_research/
│       └── interview-script.md     ← Hướng dẫn phỏng vấn users
│
└── frontend/
    ├── app/(productivity)/
    │   ├── today/page.tsx          ← View "My Day"
    │   ├── inbox/page.tsx          ← View Inbox
    │   └── projects/page.tsx       ← Danh sách Projects
    ├── components/tasks/           ← Task components
    ├── lib/
    │   ├── stores/tasks.ts         ← Task state (Zustand)
    │   └── hooks/use-tasks.ts      ← Task CRUD logic
    └── .env.local                  ← Secrets của bạn (KHÔNG trong git)
```

---

## 🎯 Nhiệm Vụ Đầu Tiên Của Bạn

### **Option A: Test Task Management (Khuyến nghị - 15 phút)**

1. ✅ **Đọc:** `docs/03_roadmap/PROJECT_STATUS.md` để hiểu toàn cảnh
2. ✅ **Test:** Thêm tasks tại http://localhost:3000/today
3. ✅ **Hoàn thành task:** Toggle checkbox
4. ✅ **Ăn mừng:** Task management đang hoạt động! 🎉

### **Option B: Bắt Đầu Architecture & Design (Week 0 Focus)**

1. ✅ **Đọc:** `docs/01_status/THIS_WEEK.md` cho priorities Week 0
2. ✅ **Research:** react-grid-layout, Sandpack, iframe security
3. ✅ **Viết:** ADR-001 Architecture Decision Record
4. ✅ **Thiết kế:** Dashboard Grid wireframes

---

## 🆘 Cần Giúp?

**Vấn Đề Thường Gặp:**

1. **Lỗi `npm install`:**

   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```

2. **Lỗi kết nối Supabase:**

   - Check `.env.local` có URL và Anon Key đúng không
   - Restart dev server: Dừng (Ctrl+C) và chạy `npm run dev` lại

3. **Lỗi TypeScript:**

   - Lưu tất cả files
   - Restart VS Code
   - Hoặc: Ctrl+Shift+P → "Restart TS Server"

4. **Lỗi database migration:**
   - Xem `docs/04_technical/DEPLOY.md` phần Troubleshooting
   - Thường gặp: "relation already exists" (đã deploy rồi, skip sang bước verify)

**Vẫn bí?**

- Check `docs/04_technical/SETUP.md` để troubleshoot chi tiết
- Đọc `docs/01_status/BUGS.md` → phần Known issues
- Google error message
- Hỏi ChatGPT/Claude với full error + context

---

## 🎉 Các Bước Tiếp Theo

Sau khi dev server chạy thành công:

1. ✅ Đọc `docs/01_status/THIS_WEEK.md` cho focus của tuần này
2. ✅ Đọc `docs/03_roadmap/PROJECT_STATUS.md` để hiểu dự án đầy đủ
3. ✅ Test task management tại `/today`
4. ✅ Bắt đầu Week 0: Architecture & Design (nếu pivot sang Platform)

**Bạn chính thức đang trên hành trình xây dựng Productivity Platform! 🚀**

---

**Cập nhật lần cuối:** 13 tháng 11, 2024
**Phiên bản:** 2.0.0 - Productivity OS Core (Pivot to Platform)
