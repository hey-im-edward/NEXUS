# 🐛 BUGS LOG - Bug Tracker & Fix History

**Nguồn:** [AI_PROMPTS.md](../AI_PROMPTS.md) | [FEATURES.md](FEATURES.md) | [THIS_WEEK.md](THIS_WEEK.md)

**Cập nhật:** 17 tháng 11, 2025

**Mục đích:** Track all bugs discovered during development, their status, and fix history

---

## 📊 BUGS SUMMARY

```text
🔴 Critical:         0 bugs (Blocker - must fix immediately)
🟠 High:             0 bugs (Major issue - fix this week)
🟡 Medium:           0 bugs (Minor issue - fix this sprint)
🔵 Low:              2 bugs (Nice to fix - backlog)
────────────────────────────────────────────────────────────
   Active Bugs:      2 bugs
   Fixed Bugs:       4 bugs
   Total Bugs:       6 bugs
```

**Breakdown by Category:**

| Category | Critical | High | Medium | Low | Total |
|----------|----------|------|--------|-----|-------|
| **Dashboard Grid** | 0 | 0 | 0 | 0 | 0 |
| **App Builder** | 0 | 0 | 0 | 0 | 0 |
| **Marketplace** | 0 | 0 | 0 | 0 | 0 |
| **Task Management** | 0 | 0 | 0 | 2 | 2 |
| **Auth & Security** | 0 | 0 | 0 | 0 | 0 |
| **Performance** | 0 | 0 | 0 | 0 | 0 |
| **UI/UX** | 0 | 0 | 0 | 0 | 0 |
| **Database** | 0 | 0 | 0 | 0 | 0 |
| **Other** | 0 | 0 | 0 | 0 | 0 |

---

## 🔴 ACTIVE BUGS (Open & In Progress)

**Format:**

```markdown
### BUG-XXX: [Short Bug Title]

**Status:** 🔴 Open | 🟡 In Progress | ⏸️ Blocked

**Priority:** 🔴 Critical | 🟠 High | 🟡 Medium | 🔵 Low

**Discovered:** YYYY-MM-DD

**Category:** Dashboard Grid | App Builder | Marketplace | Task Management | Auth | Performance | UI/UX | Database | Other

**Affected Prompt:** [PROMPT X.Y](../AI_PROMPTS.md#prompt-xy-feature-name)

**Description:**
Clear description of the bug, what's expected vs. what's happening

**Steps to Reproduce:**
1. Step 1
2. Step 2
3. Step 3

**Environment:**
- Browser: Chrome 120 / Safari 17 / Firefox 121
- Device: Desktop / Mobile / Tablet
- OS: Windows 11 / macOS 14 / iOS 17

**Screenshots/Logs:**
- [Link to screenshot]
- Error logs (if any)

**Assigned To:** [Name]

**Related Files:**
- [path/to/file.tsx](../../path/to/file.tsx:42)

**Notes:**
- Additional context
```

---

### BUG-001: No empty state images in TaskList

**Status:** 🔴 Open

**Priority:** 🔵 Low

**Discovered:** 2024-11-07

**Category:** Task Management

**Affected Prompt:** Pre-Platform (Task Management MVP)

**Description:**

When users open `/today` or `/inbox` with no tasks, only plain text "No tasks" is shown. There's no illustration, icon, or helpful guidance on what to do next. This makes the UI feel unpolished.

**Steps to Reproduce:**

1. Log in to NEXUS
2. Navigate to `/today` page
3. Delete all tasks (or use fresh account)
4. See empty state with only text "No tasks"

**Environment:**

- Browser: Chrome 120 (Desktop)
- Device: Desktop
- OS: Windows 11

**Screenshots/Logs:**

- (No screenshot available)

**Assigned To:** TBD

**Related Files:**

- [frontend/components/tasks/TaskList.tsx](../../frontend/components/tasks/TaskList.tsx)

**Notes:**

- Not blocking current development
- Can be fixed during Week 4 UI polish phase
- Consider using illustration from undraw.co or humaaans.com
- Should include CTA button ("Add your first task")

---

### BUG-002: No loading skeletons in TaskList

**Status:** 🔴 Open

**Priority:** 🔵 Low

**Discovered:** 2024-11-07

**Category:** Task Management

**Affected Prompt:** Pre-Platform (Task Management MVP)

**Description:**

When fetching tasks from Supabase, there's a 1-2 second delay with a blank screen. No loading skeleton is shown, making it feel like the page is broken or laggy.

**Steps to Reproduce:**

1. Log in to NEXUS
2. Navigate to `/today` page
3. Observe blank screen for 1-2 seconds during initial load
4. Tasks suddenly appear

**Environment:**

- Browser: Chrome 120 (Desktop)
- Device: Desktop
- OS: Windows 11

**Screenshots/Logs:**

- (No screenshot available)

**Assigned To:** TBD

**Related Files:**

- [frontend/components/tasks/TaskList.tsx](../../frontend/components/tasks/TaskList.tsx)

**Notes:**

- Not blocking current development
- Can be fixed during Week 4 UI polish phase
- Use shadcn/ui Skeleton component
- Show 3-5 skeleton rows during loading

---

## ✅ FIXED BUGS (Newest First)

**Format:**

```markdown
### ✅ BUG-XXX: [Short Bug Title]

**Fixed:** YYYY-MM-DD

**Priority:** 🔴 Critical | 🟠 High | 🟡 Medium | 🔵 Low

**Discovered:** YYYY-MM-DD

**Time to Fix:** X hours

**Category:** [Category]

**Root Cause:**
What caused the bug

**Solution:**
How it was fixed

**Files Modified:**
- [path/to/file.tsx](../../path/to/file.tsx)

**Verification:**
How we verified the fix works

**Lessons Learned:**
- What we learned from this bug
```

---

### ✅ BUG-003: Hardcoded workspace_id in Supabase queries

**Fixed:** 2024-11-09

**Priority:** 🟠 High

**Discovered:** 2024-11-08

**Time to Fix:** 2 hours

**Category:** Task Management

**Root Cause:**

During initial development, workspace_id was hardcoded as a temporary UUID to speed up development. This meant:
- All users shared the same workspace
- No multi-workspace support
- Security risk (users could see each other's tasks)

**Solution:**

Created `getOrCreateWorkspaceId()` helper function in `lib/supabase/workspace.ts`:
- Automatically fetches user's workspace from database
- Creates new workspace if user doesn't have one
- Returns workspace_id for use in queries
- Updated all productivity pages to use this helper

**Files Modified:**

- `frontend/lib/supabase/workspace.ts` (NEW)
- `frontend/app/(productivity)/today/page.tsx`
- `frontend/app/(productivity)/inbox/page.tsx`
- `frontend/app/(productivity)/projects/[id]/board/page.tsx`
- `frontend/app/kanban-demo/page.tsx`

**Verification:**

- Created 2 test accounts
- Verified each account has separate workspace
- Verified tasks are not shared between accounts
- Verified RLS policies enforce workspace isolation

**Lessons Learned:**

- Don't hardcode IDs, even for POC
- Set up proper workspace management from Day 1
- RLS policies are critical for multi-tenancy

---

### ✅ BUG-004: Tasks disappear after marking complete

**Fixed:** 2024-11-08

**Priority:** 🟠 High

**Discovered:** 2024-11-08

**Time to Fix:** 0.5 hours

**Category:** Task Management

**Root Cause:**

Supabase query in `/today` page filtered out completed tasks:

```typescript
const { data: tasks } = await supabase
  .from('tasks')
  .select('*')
  .eq('workspace_id', workspaceId)
  .eq('completed', false) // ❌ This caused the bug
```

When user toggled task completion, the task was marked as `completed: true`, which removed it from the query results, making it disappear from the UI.

**Solution:**

Removed the `.eq('completed', false)` filter to show all tasks (both complete and incomplete):

```typescript
const { data: tasks } = await supabase
  .from('tasks')
  .select('*')
  .eq('workspace_id', workspaceId)
// ✅ Show all tasks, let UI handle styling
```

**Files Modified:**

- `frontend/app/(productivity)/today/page.tsx`
- `frontend/app/(productivity)/inbox/page.tsx`

**Verification:**

- Toggled task completion on `/today` page
- Verified task stays visible (with strikethrough)
- Verified task state persists across page reloads

**Lessons Learned:**

- Consider UX before filtering data
- Completed tasks should remain visible (with visual distinction)
- Test edge cases (empty state, all complete, etc.)

---

### ✅ BUG-005: RLS infinite recursion in workspace_members

**Fixed:** 2024-11-07

**Priority:** 🔴 Critical

**Discovered:** 2024-11-07

**Time to Fix:** 1 hour

**Category:** Database

**Root Cause:**

Row Level Security (RLS) policy on `workspace_members` table created infinite recursion:

```sql
-- ❌ BROKEN POLICY
CREATE POLICY "Users can view workspace members"
ON workspace_members FOR SELECT
USING (
  workspace_id IN (
    SELECT workspace_id FROM workspace_members WHERE user_id = auth.uid()
  )
);
```

The policy checked `workspace_members` table to determine access to `workspace_members` table, creating infinite loop.

**Solution:**

Simplified RLS policy to only check user_id:

```sql
-- ✅ FIXED POLICY
CREATE POLICY "Users can view workspace members"
ON workspace_members FOR SELECT
USING (user_id = auth.uid());
```

**Files Modified:**

- `backend/supabase/migrations/001_task_management_schema.sql`

**Verification:**

- Ran `npx supabase db reset` to apply migration
- Verified query executes without timeout
- Verified users can only see their own workspace memberships

**Lessons Learned:**

- Avoid recursive subqueries in RLS policies
- Test RLS policies in Supabase SQL editor before applying
- Keep RLS policies simple (complexity = bugs)

---

### ✅ BUG-006: TaskList infinite re-render loop

**Fixed:** 2024-11-07

**Priority:** 🔴 Critical

**Discovered:** 2024-11-07

**Time to Fix:** 0.5 hours

**Category:** Task Management

**Root Cause:**

`useEffect` dependency array included `fetchTasks` function, which was recreated on every render:

```typescript
// ❌ BROKEN CODE
const fetchTasks = async () => {
  // ...
}

useEffect(() => {
  fetchTasks()
}, [fetchTasks]) // ❌ fetchTasks changes every render
```

This caused infinite loop:
1. Component renders → fetchTasks created
2. useEffect runs → fetchTasks called → state updated
3. Component re-renders → new fetchTasks created
4. useEffect runs again (dependency changed) → repeat

**Solution:**

Changed dependency to only re-run when `workspace_id` changes:

```typescript
// ✅ FIXED CODE
useEffect(() => {
  fetchTasks()
}, [workspace_id]) // ✅ Only re-run when workspace_id changes
```

**Files Modified:**

- `frontend/components/tasks/TaskList.tsx`

**Verification:**

- Opened `/today` page
- Verified tasks load once (not infinite loop)
- Checked browser console (no errors)
- Verified React DevTools shows single render

**Lessons Learned:**

- Be careful with useEffect dependencies
- Functions should not be in dependency arrays (use useCallback or primitives)
- Test for infinite loops in development

---

## 🚨 CRITICAL BUGS (Fix Immediately)

**Definition:** Bugs that block core functionality or cause data loss

**Priority:** These bugs MUST be fixed before continuing with new features

**Current Critical Bugs:** 0

**Examples of Critical Bugs:**

- Users cannot log in (Auth broken)
- Data loss when saving (Database corruption)
- App crashes on load (Runtime error)
- Security vulnerability (RLS policy broken)
- Payment system broken (Billing issue)

**Escalation Process:**

1. **Discover Critical Bug** → Immediately stop current work
2. **Document Bug** → Use BUG-XXX template above
3. **Notify Team** → Post in team chat/Slack
4. **Assign Owner** → Who will fix this?
5. **Estimate Time** → How long to fix?
6. **Fix & Test** → Fix bug, verify with tests
7. **Deploy Hotfix** → Deploy to production ASAP
8. **Postmortem** → Document lessons learned

---

## 📋 BUG CATEGORIES

### 1. Dashboard Grid

**Scope:** All bugs related to DashboardGrid, AppMiniCard, drag-and-drop, layout persistence

**Examples:**

- Layout not persisting
- Cards overlapping
- Drag-and-drop not working on mobile
- Resize handles not functional

**Current Bugs:** 0

---

### 2. App Builder

**Scope:** All bugs related to Craft.js, Builder Components, Actions System, App Renderer

**Examples:**

- Components not draggable
- Actions not triggering
- App definition not saving
- Renderer crashes

**Current Bugs:** 0

---

### 3. Marketplace

**Scope:** All bugs related to Browse Page, App Detail Page, Install Flow, Publish Flow

**Examples:**

- Apps not showing in marketplace
- Install button not working
- Publish flow broken
- App stats not updating

**Current Bugs:** 0

---

### 4. Task Management

**Scope:** All bugs related to Tasks, Projects, Kanban, Inline Editing, Priority Select

**Examples:**

- Tasks not saving
- Kanban drag-and-drop broken
- Inline edit not persisting
- Priority badge color wrong

**Current Bugs:** 2 (both Low priority)

**Bug List:**

- BUG-001: No empty state images in TaskList
- BUG-002: No loading skeletons in TaskList

---

### 5. Auth & Security

**Scope:** All bugs related to Google OAuth, Supabase Auth, RLS Policies, Session Management

**Examples:**

- Users cannot log in
- RLS policy allowing unauthorized access
- Session expiring too early
- OAuth redirect broken

**Current Bugs:** 0

---

### 6. Performance

**Scope:** All bugs related to slow load times, lag, memory leaks, poor responsiveness

**Examples:**

- Dashboard takes 5+ seconds to load
- Grid layout lags when dragging
- Memory leak in App Renderer
- Supabase query too slow (>2s)

**Current Bugs:** 0

---

### 7. UI/UX

**Scope:** All bugs related to visual issues, layout problems, accessibility, mobile responsiveness

**Examples:**

- Button text cut off on mobile
- Color contrast too low (WCAG fail)
- Tooltip not showing
- Modal not closing on ESC

**Current Bugs:** 0

---

### 8. Database

**Scope:** All bugs related to Supabase database, migrations, RLS policies, data integrity

**Examples:**

- Migration failed to apply
- RLS policy blocking authorized user
- Foreign key constraint error
- Data corruption (NULL where shouldn't be)

**Current Bugs:** 0

---

### 9. Other

**Scope:** All other bugs not covered by above categories

**Current Bugs:** 0

---

## 📝 HOW TO REPORT A BUG

**When you discover a bug:**

1. **Check if bug already exists** in "ACTIVE BUGS" section above
2. **Reproduce the bug** at least twice to confirm
3. **Assign a Bug ID** (next available BUG-XXX number)
4. **Fill out the template** below:

```markdown
### BUG-XXX: [Short Bug Title]

**Status:** 🔴 Open

**Priority:** [🔴 Critical | 🟠 High | 🟡 Medium | 🔵 Low]

**Discovered:** YYYY-MM-DD

**Category:** [Category]

**Affected Prompt:** [PROMPT X.Y](../AI_PROMPTS.md#prompt-xy)

**Description:**
[Clear description]

**Steps to Reproduce:**
1. Step 1
2. Step 2
3. Step 3

**Environment:**
- Browser: [Browser version]
- Device: [Desktop/Mobile/Tablet]
- OS: [OS version]

**Screenshots/Logs:**
- [Link or paste logs]

**Assigned To:** [Name or TBD]

**Related Files:**
- [path/to/file.tsx](../../path/to/file.tsx)

**Notes:**
- [Additional context]
```

5. **Paste into "ACTIVE BUGS" section** (sorted by priority: Critical → High → Medium → Low)
6. **Update BUGS SUMMARY** table (increment counts)
7. **Update THIS_WEEK.md** if blocking current sprint
8. **Notify team** if Critical or High priority

---

## ✅ HOW TO CLOSE A BUG

**When you fix a bug:**

1. **Verify the fix** works in all environments (desktop, mobile, different browsers)
2. **Copy the bug** from "ACTIVE BUGS" section
3. **Move to "FIXED BUGS" section** (at the top, newest first)
4. **Update the template** with:

```markdown
### ✅ BUG-XXX: [Short Bug Title]

**Fixed:** YYYY-MM-DD

**Priority:** [Priority]

**Discovered:** YYYY-MM-DD

**Time to Fix:** X hours

**Category:** [Category]

**Root Cause:**
[What caused the bug]

**Solution:**
[How it was fixed]

**Files Modified:**
- [path/to/file.tsx](../../path/to/file.tsx)

**Verification:**
[How we verified the fix works]

**Lessons Learned:**
- [What we learned]
```

5. **Update BUGS SUMMARY** table (decrement active count, increment fixed count)
6. **Update FEATURES.md** if bug fix is significant enough
7. **Run update script** (if available):

```bash
# Bash
./scripts/update-bugs.sh BUG-XXX "Bug Title" "Fixed"

# PowerShell
.\scripts\update-bugs.ps1 -BugID "BUG-XXX" -Title "Bug Title" -Status "Fixed"
```

---

## 🔧 BUG PRIORITY GUIDE

**How to assign priority:**

### 🔴 Critical

**Criteria:**

- Blocks core functionality (cannot use app)
- Causes data loss or corruption
- Security vulnerability (RLS policy broken)
- Affects all users (not edge case)

**Examples:**

- Users cannot log in
- Saving dashboard layout causes data loss
- RLS policy allows unauthorized access
- App crashes on load for all users

**Action:** Fix immediately, stop all other work

---

### 🟠 High

**Criteria:**

- Affects major feature (but has workaround)
- Affects many users (>50%)
- Causes significant UX degradation
- No data loss, but functionality broken

**Examples:**

- Drag-and-drop not working on mobile (but works on desktop)
- App install button broken (but can install via URL)
- Kanban board not loading (but list view works)

**Action:** Fix this week, prioritize over new features

---

### 🟡 Medium

**Criteria:**

- Affects minor feature
- Affects some users (10-50%)
- Causes minor UX degradation
- Has easy workaround

**Examples:**

- Priority badge color wrong
- Tooltip text typo
- Modal animation glitchy
- Mobile layout slightly off

**Action:** Fix this sprint, after Critical/High bugs

---

### 🔵 Low

**Criteria:**

- Cosmetic issue
- Affects few users (<10%)
- Very minor UX degradation
- Easy workaround available

**Examples:**

- Button hover color slightly off
- Console warning (not error)
- Missing icon
- Typo in help text
- No empty state illustration
- No loading skeleton

**Action:** Fix when time permits, backlog

---

## 📊 BUG METRICS

**Tracking bug health:**

| Metric | Target | Current |
|--------|--------|---------|
| **Active Bugs** | <5 | 2 |
| **Critical Bugs** | 0 | 0 ✅ |
| **High Priority Bugs** | <3 | 0 ✅ |
| **Average Time to Fix (Critical)** | <4 hours | 0.75 hours ✅ |
| **Average Time to Fix (High)** | <24 hours | 1.25 hours ✅ |
| **Bugs Fixed This Week** | - | 0 |
| **Bugs Discovered This Week** | - | 0 |

**Bug Velocity (Weekly):**

| Week | Discovered | Fixed | Net Change | Active (End of Week) |
|------|------------|-------|------------|----------------------|
| Week 1 (17-23/11) | 0 | 0 | 0 | 2 (from previous) |
| Week 2 (24-30/11) | - | - | - | - |
| Week 3 (01-07/12) | - | - | - | - |
| Week 4 (08-14/12) | - | - | - | - |

**Goal:** Keep Active Bugs <5, Fix Critical bugs within 4 hours, Fix High Priority bugs within 24 hours

---

## 🧪 TESTING CHECKLIST (Prevent Bugs)

**Before marking a feature as "completed", test:**

### Desktop Testing

- [ ] Chrome (latest version)
- [ ] Safari (latest version)
- [ ] Firefox (latest version)
- [ ] Edge (latest version)

### Mobile Testing

- [ ] iOS Safari (iPhone)
- [ ] iOS Safari (iPad)
- [ ] Android Chrome (Phone)
- [ ] Android Chrome (Tablet)

### Functional Testing

- [ ] Happy path (everything works)
- [ ] Error path (network timeout, server error)
- [ ] Edge cases (empty state, max characters, special characters)
- [ ] Accessibility (keyboard navigation, screen reader)

### Performance Testing

- [ ] Page load time <2 seconds
- [ ] Interaction latency <100ms
- [ ] No console errors
- [ ] No memory leaks

### Security Testing

- [ ] RLS policies prevent unauthorized access
- [ ] XSS prevention (sanitize user input)
- [ ] SQL injection prevention (parameterized queries)
- [ ] CSRF protection (Supabase handles this)

---

## 🚀 AUTOMATED SCRIPTS

### Bash Script: Update Bug Status

**File:** `scripts/update-bugs.sh`

```bash
#!/bin/bash
# update-bugs.sh - Update bug status in BUGS.md

BUG_ID=$1        # e.g., "BUG-001"
BUG_TITLE=$2     # e.g., "DashboardGrid not persisting"
STATUS=$3        # e.g., "Fixed" or "Open"
TODAY=$(date +"%Y-%m-%d")

if [ "$STATUS" == "Fixed" ]; then
  echo "✅ Marking $BUG_ID as Fixed..."

  # Update BUGS.md (move from ACTIVE to FIXED section)
  sed -i "s/### $BUG_ID:/### ✅ $BUG_ID:/g" docs/02-EXECUTION/status/BUGS.md
  sed -i "s/\*\*Status:\*\* 🔴 Open/\*\*Fixed:\*\* $TODAY/g" docs/02-EXECUTION/status/BUGS.md

  echo "✅ Bug $BUG_ID marked as Fixed!"
else
  echo "🔴 Creating new bug $BUG_ID..."

  # Append new bug to ACTIVE BUGS section
  echo "" >> docs/02-EXECUTION/status/BUGS.md
  echo "### $BUG_ID: $BUG_TITLE" >> docs/02-EXECUTION/status/BUGS.md
  echo "**Status:** 🔴 Open" >> docs/02-EXECUTION/status/BUGS.md
  echo "**Discovered:** $TODAY" >> docs/02-EXECUTION/status/BUGS.md
  echo "" >> docs/02-EXECUTION/status/BUGS.md

  echo "✅ Bug $BUG_ID created!"
fi
```

**How to Run:**

```bash
# Create new bug
./scripts/update-bugs.sh "BUG-007" "DashboardGrid not persisting" "Open"

# Mark bug as fixed
./scripts/update-bugs.sh "BUG-001" "No empty state images" "Fixed"
```

---

### PowerShell Script: Update Bug Status

**File:** `scripts/update-bugs.ps1`

```powershell
# update-bugs.ps1 - Update bug status in BUGS.md

param(
    [string]$BugID = "BUG-001",
    [string]$Title = "Bug Title",
    [string]$Status = "Open"  # "Open" or "Fixed"
)

$TODAY = Get-Date -Format "yyyy-MM-dd"
$BUGS_FILE = "docs\02-EXECUTION\status\BUGS.md"

if ($Status -eq "Fixed") {
    Write-Host "✅ Marking $BugID as Fixed..." -ForegroundColor Green

    # Update BUGS.md (move from ACTIVE to FIXED section)
    $content = Get-Content -Path $BUGS_FILE
    $updatedContent = $content -replace "### $BugID:", "### ✅ $BugID:"
    $updatedContent = $updatedContent -replace "\*\*Status:\*\* 🔴 Open", "**Fixed:** $TODAY"
    Set-Content -Path $BUGS_FILE -Value $updatedContent

    Write-Host "✅ Bug $BugID marked as Fixed!" -ForegroundColor Green
} else {
    Write-Host "🔴 Creating new bug $BugID..." -ForegroundColor Yellow

    # Append new bug to ACTIVE BUGS section
    $newBug = @"

### $BugID: $Title
**Status:** 🔴 Open
**Discovered:** $TODAY

"@

    Add-Content -Path $BUGS_FILE -Value $newBug

    Write-Host "✅ Bug $BugID created!" -ForegroundColor Green
}
```

**How to Run:**

```powershell
# Create new bug
.\scripts\update-bugs.ps1 -BugID "BUG-007" -Title "DashboardGrid not persisting" -Status "Open"

# Mark bug as fixed
.\scripts\update-bugs.ps1 -BugID "BUG-001" -Title "No empty state images" -Status "Fixed"
```

---

## 🔗 QUICK LINKS

- [AI_PROMPTS.md](../AI_PROMPTS.md) - All prompts for 12-week roadmap
- [ROADMAP.md](../ROADMAP.md) - 12-week Code First roadmap
- [FEATURES.md](FEATURES.md) - Completed features log
- [THIS_WEEK.md](THIS_WEEK.md) - Current week's tasks
- [TECH_STACK.md](../../03-REFERENCE/TECH_STACK.md) - Tech stack reference
- [PRINCIPLES.md](../../03-REFERENCE/PRINCIPLES.md) - Development principles

---

## 💡 BUG PREVENTION TIPS

**How to prevent bugs before they happen:**

1. **Write TypeScript strictly** - Enable strict mode, no `any` types
2. **Test before committing** - Manual testing on desktop + mobile
3. **Use RLS policies** - Always test auth scenarios (logged in, logged out, wrong user)
4. **Handle errors gracefully** - Network timeouts, server errors, empty states
5. **Validate user input** - Min/max length, sanitize HTML, prevent XSS
6. **Use loading states** - Optimistic UI, skeleton loaders, disable buttons during submit
7. **Test responsive design** - Desktop, tablet, mobile breakpoints
8. **Review before shipping** - Code review, manual QA, automated tests
9. **Monitor production** - Supabase logs, browser console errors, user reports
10. **Document decisions** - Why did you choose this approach? Future you will thank you.

---

## 🎯 BUG PHILOSOPHY

> "Bugs are inevitable. Fast fixes are what matter."

**Principles:**

1. **Acknowledge bugs quickly** - Don't ignore, don't blame
2. **Prioritize ruthlessly** - Critical bugs block everything else
3. **Fix root cause** - Don't just patch symptoms
4. **Document lessons learned** - Every bug is a learning opportunity
5. **Prevent recurrence** - Add tests, update checklists, improve process
6. **Ship fast, fix fast** - Better to ship with minor bugs and fix quickly than delay for perfection

**Decision Framework:**

- **Critical Bug?** → Fix immediately, deploy hotfix
- **High Priority?** → Fix this week, prioritize over new features
- **Medium Priority?** → Fix this sprint, after Critical/High
- **Low Priority?** → Backlog, fix when time permits

---

**Cập nhật lần cuối:** 17 tháng 11, 2025

**Next Review:** End of Week 1 (23/11/2025)

**Owner:** NEXUS Development Team

---

**Remember:** "The best bug is the one that never happens. The second best is the one fixed in <4 hours."
