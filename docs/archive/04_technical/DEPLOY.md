# 🚀 DEPLOY DATABASE - QUICK GUIDE

**⏱️ Time:** 5 minutes  
**Status:** ⚠️ MUST DO BEFORE TESTING APP

---

## 📋 **STEPS**

### **1. Install Supabase CLI (if not already installed)**

```bash
npm install -g supabase
```

### **2. Login and Link Project**

```bash
# Login to Supabase
supabase login

# Link to your project
# Get project-ref from: Supabase Dashboard → Settings → General → Reference ID
supabase link --project-ref YOUR-PROJECT-REF
```

### **3. Deploy Migrations**

```bash
# Push all migrations from supabase/migrations/ to cloud database
supabase db push

# This will:
# - Run all migrations in order (by timestamp)
# - Track which migrations have been applied
# - Show success/error for each migration
```

**Alternative: Manual SQL (Fallback)**

If you prefer to run SQL manually:

1. Open Supabase Dashboard → SQL Editor
2. Open migration files from `supabase/migrations/` in order:
   - `20251107000000_add_documents_table.sql`
   - `20251107000001_productivity_core_schema.sql`
3. Copy and paste each file content
4. Click "Run"

### **4. Verify Tables Created**

```sql
-- Run this query to verify:
SELECT
  'projects' as table_name, COUNT(*) as row_count FROM public.projects
UNION ALL
SELECT 'tasks', COUNT(*) FROM public.tasks
UNION ALL
SELECT 'time_blocks', COUNT(*) FROM public.time_blocks
UNION ALL
SELECT 'pages', COUNT(*) FROM public.pages;

-- Expected output: 4 rows with 0 count each
```

### **5. Create Test Workspace**

```sql
-- Get your user ID first:
SELECT auth.uid();

-- Create workspace:
INSERT INTO public.workspaces (name, slug, owner_id)
VALUES (
  'My Workspace',
  'my-workspace',
  'YOUR_USER_ID_FROM_ABOVE'  -- Replace this
)
RETURNING id;

-- ⚠️ SAVE THE RETURNED WORKSPACE ID!
-- You'll need it in Step 6
```

### **6. Add Yourself to Workspace**

```sql
-- Replace YOUR_USER_ID and YOUR_WORKSPACE_ID:
INSERT INTO public.workspace_members (workspace_id, user_id, role, joined_at)
VALUES (
  'YOUR_WORKSPACE_ID',
  'YOUR_USER_ID',
  'owner',
  NOW()
);
```

### **7. Update Frontend Code**

```tsx
// File: frontend/app/(productivity)/today/page.tsx
// Add at top of file (temporarily):

const WORKSPACE_ID = 'paste-your-workspace-id-here';

// Then find useTasks() and pass workspace:
export default function TodayPage() {
  const { tasks, loading, createTask, toggleComplete } = useTasks(WORKSPACE_ID);
  // ... rest of code
}
```

### **8. Test App**

```bash
cd frontend
npm run dev

# Open: http://localhost:3000/today
# Try:
# 1. Type task name in Quick Add input
# 2. Press Enter
# 3. Check if task appears
# 4. Click checkbox to complete
# 5. Go to Supabase → Table Editor → tasks
# 6. Verify task exists
```

---

## ❌ **TROUBLESHOOTING**

### **Error: "relation already exists"**

**Cause:** Tables already created  
**Fix:** Skip to Step 4 (verify), then continue to Step 5

### **Error: "permission denied for schema public"**

**Cause:** Not logged in or wrong project  
**Fix:** Check you're in correct Supabase project

### **Error: "auth.uid() is null"**

**Cause:** Not authenticated  
**Fix:**

```sql
-- Check if you're authenticated:
SELECT auth.uid();

-- If NULL, go to Authentication tab → Sign up manually
-- Or use your login page: http://localhost:3000/login
```

### **Error: "new row violates row-level security policy"**

**Cause:** User not in workspace_members  
**Fix:** Run Step 6 again (add yourself to workspace)

### **Tasks don't appear in UI**

**Checklist:**

- [ ] Workspace ID correct in frontend code?
- [ ] User added to workspace_members?
- [ ] Browser console shows errors?
- [ ] Supabase Table Editor shows task?

**Debug:**

```sql
-- Check if task was created:
SELECT * FROM public.tasks WHERE workspace_id = 'YOUR_WORKSPACE_ID';

-- Check workspace_members:
SELECT * FROM public.workspace_members WHERE user_id = 'YOUR_USER_ID';
```

---

## 🎯 **NEXT STEPS AFTER DEPLOYMENT**

✅ **If tasks work:**

1. Continue to Kanban board implementation
2. Add recurring tasks UI (rrule)
3. Build Calendar view

❌ **If errors:**

1. Check browser DevTools console
2. Check Supabase Logs (Dashboard → Logs → Postgres Logs)
3. Verify all 6 steps completed
4. Ask AI for help with specific error message

---

## 🔄 **ROLLBACK MIGRATIONS**

If you need to rollback a migration:

```bash
# List applied migrations
supabase migration list

# Rollback to a specific migration
supabase db reset --version TIMESTAMP

# Example: Rollback to before the last migration
supabase db reset --version 20251107000000
```

**⚠️ Warning:** Rollback will reset database to that migration state. Make sure to backup data first!

---

## 📚 **RELATED DOCS**

- Full documentation: `docs/03_roadmap/PROJECT_STATUS.md`
- Database schema reference: `docs/04_technical/architecture/database-schema-v2-productivity.sql`
- Architecture decisions: `docs/04_technical/architecture/decisions.md`
- Migration files: `supabase/migrations/`

---

## 🎯 **MIGRATION WORKFLOW**

### **Creating New Migrations**

```bash
# Create a new migration file
supabase migration new add_feature_name

# This creates: supabase/migrations/YYYYMMDDHHMMSS_add_feature_name.sql
# Edit the file, then:
supabase db push
```

### **Local Development**

```bash
# Start local Supabase (runs all migrations automatically)
supabase start

# Reset local database (re-run all migrations)
supabase db reset

# Stop local Supabase
supabase stop
```

---

**Last Updated:** November 13, 2025  
**Next:** Test task management, then start Kanban board
