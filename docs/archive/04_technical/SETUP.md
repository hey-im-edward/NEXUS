# NEXUS Development Setup Guide

## Prerequisites

### Required Software

- [Node.js 20+ LTS](https://nodejs.org/) - JavaScript runtime
- [Git](https://git-scm.com/) - Version control
- [VS Code](https://code.visualstudio.com/) - Code editor

### Accounts Needed

- [GitHub](https://github.com/) - Code repository (you have this)
- [Supabase](https://supabase.com/) - Backend & database (free tier)
- [Vercel](https://vercel.com/) - Frontend hosting (free tier)

---

## Step 1: Supabase Setup (15 minutes)

### 1.1 Create Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Click "Start your project"
3. Sign in with GitHub
4. Click "New project"
5. Fill in:
   - **Name:** nexus-dev (or any name)
   - **Database Password:** Generate strong password (SAVE THIS!)
   - **Region:** Southeast Asia (Singapore) - closest to Vietnam
   - **Pricing Plan:** Free
6. Click "Create new project"
7. Wait 2-3 minutes for setup

### 1.2 Get API Credentials

1. In Supabase dashboard, click **Settings** (gear icon)
2. Click **API** in sidebar
3. Copy these values:
   - **Project URL** (looks like `https://xxxxx.supabase.co`): https://tapouzhhelegyvtzowzr.supabase.co
   - **anon public** key (starts with `eyJ...`): eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRhcG91emhoZWxlZ3l2dHpvd3pyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI0NTM5NjAsImV4cCI6MjA3ODAyOTk2MH0.DoX-SM2x3m1sROaCyVIgzKrx4rzisgqt44ViB_IFw2Y

### 1.3 Setup Database Schema

**Option A: Using Supabase CLI (Recommended)**

```bash
# Install Supabase CLI (if not already installed)
npm install -g supabase

# Login to Supabase
supabase login

# Link to your project (get project-ref from Supabase dashboard → Settings → General)
supabase link --project-ref YOUR-PROJECT-REF

# Push migrations to cloud database
supabase db push
```

**Option B: Manual SQL (Fallback)**

1. In Supabase dashboard, click **SQL Editor** (left sidebar)
2. Click "New query"
3. Open migration files in `supabase/migrations/` in VS Code
4. Copy content from each migration file (in order: 20251107000000, then 20251107000001)
5. Paste into Supabase SQL Editor
6. Click "Run" (or Ctrl+Enter)
   - **Note:** Nếu gặp lỗi "relation already exists", bỏ qua bước này (tables đã được tạo rồi)
7. Should see "Success. No rows returned"

### 1.4 Enable Authentication

1. Click **Authentication** in left sidebar
2. Click **Providers**
3. Enable **Google** (for OAuth):
   - Toggle "Enable Google"
   - For now, use defaults (we'll configure later)
   - Click "Save"

---

## Step 2: Project Setup (10 minutes)

### 2.1 Clone Repository

```bash
# If not already cloned
git clone https://github.com/hey-im-edward/NEXUS.git
cd NEXUS/frontend
```

### 2.2 Install Dependencies

```bash
npm install
```

This will install:

- Next.js, React
- Supabase client
- TailwindCSS
- shadcn/ui components
- All dev dependencies

Expected time: 2-3 minutes

### 2.3 Setup Environment Variables

```bash
# Copy example file
cp .env.local.example .env.local

# Open in VS Code
code .env.local
```

Fill in with your Supabase credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=https://YOUR-PROJECT.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ... (your anon key)
```

**Important:**

- Replace `YOUR-PROJECT` and the key with actual values from Step 1.2
- DO NOT commit `.env.local` to git (already in .gitignore)

### 2.4 Verify Setup

```bash
npm run dev
```

Open browser: http://localhost:3000

You should see Next.js welcome page (not login yet, we haven't built it).

Press Ctrl+C to stop server.

---

## Step 3: VS Code Setup (5 minutes)

### 3.1 Install Recommended Extensions

Open VS Code, press `Ctrl+Shift+X` (Extensions), install:

1. **ES7+ React/Redux Snippets** - React snippets
2. **Tailwind CSS IntelliSense** - Tailwind autocomplete
3. **Pretty TypeScript Errors** - Better error messages
4. **Error Lens** - Inline error display
5. **GitLens** - Git superpowers
6. **GitHub Copilot** (optional, if you have it)

### 3.2 Configure VS Code Settings

Create `.vscode/settings.json` (already exists):

```json
{
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "typescript.tsdk": "node_modules/typescript/lib",
  "tailwindCSS.experimental.classRegex": [
    ["cn\\(([^)]*)\\)", "(?:'|\"|`)([^']*)(?:'|\"|`)"]
  ]
}
```

---

## Step 4: First Run (Development Workflow)

### 4.1 Start Development Server

```bash
cd frontend
npm run dev
```

Open http://localhost:3000

### 4.2 File Structure Tour

```
frontend/
├── app/                    # Next.js 14 App Router
│   ├── layout.tsx         # Root layout (navbar, etc.)
│   ├── page.tsx           # Home page (/)
│   ├── globals.css        # Global styles
│   └── (auth)/            # Auth routes
│       ├── login/
│       └── signup/
├── components/
│   ├── ui/                # shadcn/ui components
│   ├── auth/              # Auth components
│   ├── dashboard/         # Dashboard components
│   └── app-mini/          # App mini components
├── lib/
│   ├── supabase/          # Supabase clients
│   │   ├── client.ts      # Browser client
│   │   └── server.ts      # Server client
│   └── utils/             # Helper functions
├── types/
│   ├── database.types.ts  # Generated from Supabase
│   └── index.ts           # App types
├── hooks/                 # Custom React hooks
└── public/                # Static files
```

### 4.3 Making Changes

1. Edit any file (e.g., `app/page.tsx`)
2. Save
3. Browser auto-refreshes (Fast Refresh)
4. Check console for errors

---

## Step 5: Common Commands

```bash
# Development server (port 3000)
npm run dev

# Build for production
npm run build

# Start production server
npm run start

# Type checking (find TypeScript errors)
npm run type-check

# Lint code
npm run lint
```

---

## Step 6: Supabase Local Development (Optional)

For advanced users who want to work offline with local database:

```bash
# Install Supabase CLI (if not already installed)
npm install -g supabase

# Start local Supabase (requires Docker)
supabase start

# This will:
# - Start local PostgreSQL database
# - Run all migrations from supabase/migrations/
# - Start Supabase Studio at http://localhost:54323
# - Provide local connection strings

# To stop local Supabase:
supabase stop

# To reset local database (run all migrations again):
supabase db reset
```

**Local Development Benefits:**
- Test migrations offline
- No cloud costs during development
- Faster iteration
- Can test rollbacks safely

**For POC/MVP:** You can skip this and use cloud Supabase directly. Local development is optional but recommended for production workflows.

---

## Troubleshooting

### "Module not found" errors

```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Supabase connection errors

Check `.env.local`:

- Are variables correct?
- Did you restart dev server after editing `.env.local`?

```bash
# Stop server (Ctrl+C)
# Restart
npm run dev
```

### TypeScript errors

```bash
# Check for errors
npm run type-check

# Often fixed by:
# 1. Save all files
# 2. Restart VS Code
# 3. Restart TS server: Ctrl+Shift+P → "Restart TS Server"
```

### Tailwind classes not working

1. Check `tailwind.config.js` exists
2. Check `postcss.config.mjs` exists
3. Restart dev server

---

## Next Steps

Now that setup is complete, you're ready to build!

**Week 1 Focus:**

- [ ] Read `docs/research/user-personas.md`
- [ ] Start 10 user interviews (use `docs/research/interview-script.md`)
- [ ] Begin coding: Auth + Dashboard layout

**Resources:**

- [Next.js Docs](https://nextjs.org/docs)
- [Supabase Docs](https://supabase.com/docs)
- [Tailwind Docs](https://tailwindcss.com/docs)
- [shadcn/ui](https://ui.shadcn.com)

---

## Getting Help

- **VS Code Issues:** Press F1 → "Help" → "Show All Commands"
- **Supabase Issues:** Check [supabase.com/docs](https://supabase.com/docs)
- **Next.js Issues:** Check [nextjs.org/docs/app](https://nextjs.org/docs/app)

---

**Estimated Total Setup Time:** 30-40 minutes

**You're ready to ship! 🚀**
