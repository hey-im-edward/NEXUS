# 🚀 Quick Start - NEXUS Development

> **Goal:** Get from zero to first code in 30 minutes.

---

## ⚡ TL;DR (Too Long; Didn't Read)

```bash
# 1. Install Node.js 20+ from nodejs.org

# 2. Clone and setup
git clone https://github.com/hey-im-edward/NEXUS.git
cd NEXUS/frontend
npm install

# 3. Create Supabase project at supabase.com
# Copy Project URL and Anon Key

# 4. Setup env
cp .env.local.example .env.local
# Edit .env.local with your Supabase credentials

# 5. Run database schema in Supabase SQL Editor
# (Copy from docs/architecture/database-schema.sql)

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

**Install VS Code:**

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

1. Click SQL Editor (left sidebar)
2. Open `docs/architecture/database-schema.sql` in VS Code
3. Copy ALL content
4. Paste in Supabase SQL Editor
5. Run (Ctrl+Enter)

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

Now you can start Week 1 development:

- See `docs/ROADMAP_CHECKLIST.md` for tasks
- See `docs/AI_PROMPTS.md` for prompt templates
- See `docs/SETUP.md` for detailed guide

---

## 📁 Key Files to Know

```
NEXUS/
├── frontend/
│   ├── app/
│   │   └── page.tsx          ← Homepage (start here)
│   ├── components/            ← Reusable components
│   ├── lib/
│   │   └── supabase/
│   │       ├── client.ts     ← Browser Supabase client
│   │       └── server.ts     ← Server Supabase client
│   └── .env.local            ← Your secrets (NOT in git)
└── docs/
    ├── ROADMAP_CHECKLIST.md  ← Week-by-week tasks
    ├── AI_PROMPTS.md         ← Prompt templates
    └── SETUP.md              ← Detailed setup guide
```

---

## 🎯 Your First Task (Week 1)

1. **Read these docs:**

   - [X] `docs/research/user-personas.md`
   - [X] `docs/research/interview-script.md`
2. **Schedule 3 interviews this week**
3. **While waiting for interviews, code:**

   - [ ] Follow Week 4 tasks in `ROADMAP_CHECKLIST.md`
   - [ ] Build login page (use prompts from `AI_PROMPTS.md`)

---

## 🆘 Need Help?

**Common Issues:**

1. **npm install errors:**

   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```
2. **Supabase connection error:**

   - Check `.env.local` values
   - Restart dev server
3. **TypeScript errors:**

   - Save all files
   - Restart VS Code
   - Or: Ctrl+Shift+P → "Restart TS Server"

**Still stuck?**

- Check `docs/SETUP.md` for detailed troubleshooting
- Google the error message
- Ask ChatGPT/Claude with full error + context

---

## 🎉 Next Steps

Once dev server runs successfully:

1. ✅ Mark setup complete
2. 📖 Read `ROADMAP_CHECKLIST.md`
3. 🎤 Start user interviews
4. 💻 Build first feature (Auth)

**You're officially on the journey to MVP! 🚀**
