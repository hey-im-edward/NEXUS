# 🚀 Quick Start - NEXUS Productivity OS

> **Goal:** Get from zero to running app in 15 minutes.

---

## ⚡ TL;DR (Super Quick)

```bash
# 1. Install Node.js 20+ from nodejs.org

# 2. Clone and setup
git clone https://github.com/hey-im-edward/NEXUS.git
cd NEXUS/frontend
npm install

# 3. Create Supabase project at supabase.com

# 4. Setup environment
cp .env.local.example .env.local
# Edit .env.local with your Supabase URL and Anon Key

# 5. Deploy database schema
# Open Supabase SQL Editor
# Copy from docs/04_technical/architecture/migrations/002_productivity_core_schema.sql
# Paste and Run

# 6. Start dev server
npm run dev
# Open http://localhost:3000
```

---

## 📚 Detailed Steps

### 1. Prerequisites (5 min)

**Install Node.js:**

- Go to [nodejs.org](https://nodejs.org)
- Download v20 LTS (or latest)
- Install (click Next, Next, Finish)
- Verify: Open terminal → `node --version` (should show v20.x.x)

**Install Git:**

- Windows: [git-scm.com](https://git-scm.com)
- Mac: Already installed (or `brew install git`)
- Verify: `git --version`

**Install VS Code (Optional but Recommended):**

- [code.visualstudio.com](https://code.visualstudio.com)

---

### 2. Supabase Setup (10 min)

**Create Account:**

1. Go to [supabase.com](https://supabase.com)
2. Sign in with GitHub
3. Click "New project"
4. Fill in:
   - Name: `nexus-dev`
   - Database Password: (generate and SAVE)
   - Region: Southeast Asia (Singapore)
   - Plan: Free
5. Wait 2-3 minutes

**Get Credentials:**

1. Click Settings (gear icon) → API
2. Copy:
   - Project URL: `https://xxxxx.supabase.co`
   - anon public key: `eyJ...`

**Setup Database:**

1. Click SQL Editor (left sidebar, database icon)
2. Click "+ New query" button
3. Open `docs/04_technical/architecture/migrations/002_productivity_core_schema.sql` in VS Code
4. Copy ALL content (400+ lines)
5. Paste in Supabase SQL Editor
6. Click "Run" (or press Ctrl+Enter)
7. Wait 10-15 seconds for SUCCESS message

**Verify Tables Created:**

```sql
-- Run this query to verify:
SELECT
  'tasks' as table_name, COUNT(*) FROM public.tasks
UNION ALL
SELECT 'projects', COUNT(*) FROM public.projects;
-- Should show 0 rows each (tables exist but empty)
```

---

### 3. Project Setup (10 min)

```bash
# Clone
git clone https://github.com/hey-im-edward/NEXUS.git
cd NEXUS/frontend

# Install dependencies (takes 2-3 min)
npm install

# Setup environment
cp .env.local.example .env.local
```

Edit `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=your-project-url-here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

---

### 4. Run Dev Server (5 min)

```bash
npm run dev
```

Open browser: http://localhost:3000

You should see Next.js welcome page.

**If you see errors:**

- Check `.env.local` has correct values
- Restart terminal
- Run `npm run dev` again

---

## ✅ You're Ready!

Now test the app:

1. Navigate to http://localhost:3000/today
2. You should see "My Day" page with task list
3. Try adding a task (it won't work yet - need to create workspace)

**Next Steps:**

1. Follow `docs/04_technical/DEPLOY.md` - Steps 5-7 to create workspace
2. Then you can add/complete tasks!

---

## 📁 Key Files to Know

```
NEXUS/
├── THIS_WEEK.md                    ← Weekly focus (read every Monday)
├── README.md                        ← Project overview
├── QUICKSTART.md                    ← This file
│
├── docs/
│   ├── PROJECT_STATUS.md           ← ⭐ Master documentation
│   ├── DEPLOY_DATABASE.md          ← ⭐ Database deployment
│   ├── AI_PROMPTS.md               ← ⭐ AI prompting guide
│   ├── SETUP.md                    ← Detailed setup
│   └── architecture/
│       └── migrations/
│           └── 002_productivity_core_schema.sql  ← Database schema
│
└── frontend/
    ├── app/
    │   └── (productivity)/
    │       ├── today/page.tsx      ← "My Day" view
    │       ├── inbox/page.tsx      ← Inbox view
    │       └── projects/page.tsx   ← Projects list
    ├── components/
    │   └── tasks/                  ← Task components
    ├── lib/
    │   ├── stores/tasks.ts         ← Task state (Zustand)
    │   └── hooks/use-tasks.ts      ← Task CRUD logic
    └── .env.local                  ← Your secrets (NOT in git)
```

---

## 🎯 Your First Tasks

### **Option A: Deploy & Test (Recommended - 30 min)**

1. ✅ **Read:** `docs/03_roadmap/PROJECT_STATUS.md` for full context
2. ✅ **Follow:** `docs/04_technical/DEPLOY.md` Steps 5-7 (create workspace)
3. ✅ **Test:** Add tasks at http://localhost:3000/today
4. ✅ **Celebrate:** You have working task management! 🎉

### **Option B: Start User Research (Week 0 Focus)**

1. ✅ **Read:** `docs/05_research/interview-script.md`
2. ✅ **Schedule:** 3 interviews this week
3. ✅ **Update:** `THIS_WEEK.md` with your progress
4. ✅ **Code later:** After getting user feedback

---

## 🆘 Need Help?

**Common Issues:**

1. **`npm install` errors:**

   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```

2. **Supabase connection error:**

   - Check `.env.local` has correct URL and Anon Key
   - Restart dev server: Stop (Ctrl+C) and run `npm run dev` again

3. **TypeScript errors:**

   - Save all files
   - Restart VS Code
   - Or: Ctrl+Shift+P → "Restart TS Server"

4. **Database migration error:**
   - See `docs/04_technical/DEPLOY.md` Troubleshooting section
   - Common: "relation already exists" (already deployed, skip to verify step)

**Still stuck?**

- Check `docs/04_technical/SETUP.md` for detailed troubleshooting
- Read `docs/03_roadmap/PROJECT_STATUS.md` → Known Issues section
- Google the error message
- Ask ChatGPT/Claude with full error + context

---

## 🎉 Next Steps

Once dev server runs successfully:

1. ✅ Read `THIS_WEEK.md` for current week focus
2. ✅ Read `docs/03_roadmap/PROJECT_STATUS.md` for full project understanding
3. ✅ Follow `docs/04_technical/DEPLOY.md` to create workspace
4. ✅ Test task management at `/today`
5. ✅ Schedule user interviews (Week 0 priority!)

**You're officially on the journey to building Productivity OS! 🚀**

---

**Last Updated:** November 7, 2025  
**Version:** 2.0.0 - Productivity OS Core
