# NEXUS - 12 Week Roadmap Checklist

**Project:** NEXUS - All-in-One Project Management Platform  
**Target:** SME Project Managers (10-50 people companies)  
**Stack:** Next.js 14 + Supabase + TypeScript  
**Timeline:** 12 weeks to MVP + Pivot Decision

---

## ✅ COMPLETED: Project Setup (Week 0)

- [x] Repository structure created
- [x] Backend NestJS removed (using Supabase instead)
- [x] Frontend structure organized
- [x] Supabase configuration files created
- [x] Documentation complete:
  - [x] README with roadmap
  - [x] Setup guide
  - [x] Architecture decisions
  - [x] Database schema
  - [x] User research templates
  - [x] AI prompts guide
- [x] VS Code configuration
- [x] TypeScript types defined

---

## 📅 CURRENT: Phase 0 - User Research (Week 0-3)

**Timeline:** Started November 7, 2025  
**Goal:** Validate problem exists and our solution fits

### Week 0-1: Preparation ✅ DONE
- [x] Create interview script
- [x] Define success metrics
- [x] Create user personas
- [x] List 20 potential interviewees

### Week 1-2: Interviews 🔄 IN PROGRESS
- [ ] Schedule 10 interviews with SME PMs
- [ ] Conduct interviews (use script in `docs/research/interview-script.md`)
- [ ] Document insights after each interview
- [ ] Track in spreadsheet:
  - Name, Company, Role
  - Pain points (top 3)
  - Willingness to pay
  - Tools used currently
  - Beta test interest (Y/N)

**Interview Progress:**
- [ ] Interview 1: _____ (Date: ___)
- [ ] Interview 2: _____ (Date: ___)
- [ ] Interview 3: _____ (Date: ___)
- [ ] Interview 4: _____ (Date: ___)
- [ ] Interview 5: _____ (Date: ___)
- [ ] Interview 6: _____ (Date: ___)
- [ ] Interview 7: _____ (Date: ___)
- [ ] Interview 8: _____ (Date: ___)
- [ ] Interview 9: _____ (Date: ___)
- [ ] Interview 10: _____ (Date: ___)

### Week 2-3: Analysis & MVP Scope
- [ ] Analyze interview insights
- [ ] Identify top 3 pain points (consensus)
- [ ] Define must-have features for MVP
- [ ] Adjust roadmap if needed
- [ ] Get 20 people to commit to beta test

### Success Criteria (End of Week 3):
- [ ] ✅ 7/10 interviews show strong interest
- [ ] ✅ Clear top 3 pain points identified
- [ ] ✅ 50%+ willing to pay $10+/user/month
- [ ] ✅ 20 people committed to beta testing

**GO/NO-GO Decision:** If <7/10 interested → Reassess idea

---

## 🚀 Phase 1: POC - Proof of Concept (Week 4-7)

**Goal:** Prove technical concept works, get 5 people to test

### Week 4: Setup + Authentication

#### Supabase Setup
- [ ] Create Supabase project
- [ ] Run database schema (`docs/architecture/database-schema.sql`)
- [ ] Enable Google OAuth provider
- [ ] Get API keys and add to `.env.local`

#### Development Setup
- [ ] Install dependencies: `cd frontend && npm install`
- [ ] Verify dev server runs: `npm run dev`
- [ ] Fix any TypeScript errors

#### Authentication Pages
- [ ] Create `app/(auth)/login/page.tsx`
  - [ ] Google OAuth button
  - [ ] Email/password form
  - [ ] Error handling
  - [ ] Loading states
  - [ ] Link to signup page
- [ ] Create `app/(auth)/signup/page.tsx`
  - [ ] Similar to login
  - [ ] Terms & Privacy checkbox
- [ ] Create auth middleware to protect routes
- [ ] Test: Can sign up, login, logout

#### Dashboard Shell
- [ ] Create `app/(dashboard)/layout.tsx`
  - [ ] Sidebar with navigation
  - [ ] Header with user menu
  - [ ] Logout button
- [ ] Create `app/(dashboard)/page.tsx`
  - [ ] Empty state: "Create your first dashboard"
  - [ ] "New Dashboard" button

#### Deployment
- [ ] Connect GitHub to Vercel
- [ ] Add environment variables to Vercel
- [ ] Deploy and test on public URL

**Week 4 Success:**
- [ ] ✅ You can signup/login on live URL
- [ ] ✅ See empty dashboard after login
- [ ] ✅ Share link with 2 friends, they can login

---

### Week 5: Simple Doc Editor

#### Rich Text Editor
- [ ] Install Tiptap: `npm install @tiptap/react @tiptap/starter-kit`
- [ ] Create `components/editor/tiptap-editor.tsx`
  - [ ] Bold, Italic, Headings (H1-H3)
  - [ ] Lists (bullet, numbered)
  - [ ] Toolbar component
- [ ] Create `components/editor/editor-toolbar.tsx`
  - [ ] Format buttons (Bold, Italic, etc.)
  - [ ] Headings dropdown

#### Document CRUD
- [ ] Create `app/(dashboard)/docs/page.tsx`
  - [ ] List all docs (sidebar)
  - [ ] Create new doc button
- [ ] Create `app/(dashboard)/docs/[docId]/page.tsx`
  - [ ] Load doc from Supabase
  - [ ] Render TiptapEditor
  - [ ] Auto-save every 2 seconds
  - [ ] "Saving..." indicator

#### Database Operations
- [ ] Create `lib/supabase/docs.ts`
  - [ ] createDoc()
  - [ ] updateDoc()
  - [ ] deleteDoc()
  - [ ] getDoc()
  - [ ] listDocs()

#### Testing
- [ ] Create 5 docs
- [ ] Edit content, verify auto-save
- [ ] Refresh page, content persists
- [ ] Share with 2 people, they can create docs

**Week 5 Success:**
- [ ] ✅ Can create and edit docs
- [ ] ✅ Auto-save works
- [ ] ✅ 2 testers can use without bugs

---

### Week 6: App Mini System v0.1

#### Pre-built Components

**Todo List:**
- [ ] Create `components/app-mini/todo-list.tsx`
  - [ ] Add todo input
  - [ ] Todo items with checkbox
  - [ ] Delete button
  - [ ] Empty state
- [ ] Create `hooks/use-todo-store.ts` (Zustand)
  - [ ] addTodo, toggleTodo, deleteTodo
- [ ] Connect to Supabase app_minis table
  - [ ] Load data on mount
  - [ ] Save on every change

**Kanban Board:**
- [ ] Create `components/app-mini/kanban-board.tsx`
  - [ ] 3 columns: Todo, In Progress, Done
  - [ ] Drag & drop cards between columns
  - [ ] Add card modal
- [ ] Use `@dnd-kit/core` for drag & drop
- [ ] Save to Supabase

**Simple Table:**
- [ ] Create `components/app-mini/simple-table.tsx`
  - [ ] Editable cells
  - [ ] Add row button
  - [ ] Delete row button
  - [ ] Column headers
- [ ] Save to Supabase

#### App Mini Container
- [ ] Create `components/app-mini/app-mini-card.tsx`
  - [ ] Header with icon and title
  - [ ] Delete button (with confirm)
  - [ ] Body renders component based on type
  - [ ] Loading state

#### Testing
- [ ] Create 1 of each app mini
- [ ] Test CRUD operations
- [ ] Verify data persists

**Week 6 Success:**
- [ ] ✅ All 3 app minis working
- [ ] ✅ Data saves to Supabase
- [ ] ✅ 3 testers give feedback

---

### Week 7: Dashboard Grid Layout

#### Grid Layout
- [ ] Install react-grid-layout: `npm install react-grid-layout`
- [ ] Create `components/dashboard/grid-layout.tsx`
  - [ ] Load layout from Supabase
  - [ ] Drag & drop app mini cards
  - [ ] Resize cards
  - [ ] Save layout on change (debounced)
  - [ ] Responsive (12-col desktop, 1-col mobile)

#### Add App Mini Flow
- [ ] Create "Add App Mini" button on dashboard
- [ ] Create modal to select app mini type
- [ ] Add to grid when selected
- [ ] Save to Supabase

#### Dashboard Management
- [ ] Create multiple dashboards
- [ ] Switch between dashboards (sidebar)
- [ ] Delete dashboard (with confirm)
- [ ] Set default dashboard

#### Testing
- [ ] Add 5 app minis to dashboard
- [ ] Rearrange them
- [ ] Refresh page, layout persists
- [ ] Test on mobile (should stack vertically)

**Week 7 Success:**
- [ ] ✅ Grid layout works
- [ ] ✅ Drag & drop smooth
- [ ] ✅ Mobile responsive
- [ ] ✅ 5 people tested, collect feedback

---

## 🎯 POC GO/NO-GO Decision (End of Week 7)

**Review Criteria:**
- [ ] 5 people tested POC
- [ ] 3/5 say "I would use this" 
- [ ] Technical foundation solid (no major bugs)
- [ ] You understand codebase (can explain to others)

**Decisions:**
- ✅ **GO:** If 3+ criteria met → Proceed to MVP
- ⚠️ **PIVOT:** If 2 criteria met → Iterate, extend POC 1-2 weeks
- ❌ **STOP:** If <2 criteria met → Reassess entire idea

---

## 🏆 Phase 2: MVP (Week 8-11)

**Goal:** Production-ready MVP for 20 beta testers

### Week 8: Team Collaboration

#### Workspace Features
- [ ] Create workspace settings page
- [ ] Invite user by email
  - [ ] Modal with email input
  - [ ] Send invite via Supabase (email template)
  - [ ] Track invite status (pending, accepted)
- [ ] Member list component
  - [ ] Show all members
  - [ ] Role badges (owner, member, viewer)
  - [ ] Remove member (owner only)

#### Permissions
- [ ] Implement RLS policies (Row Level Security)
- [ ] Test: Member can view shared dashboards
- [ ] Test: Viewer cannot edit
- [ ] Test: Only owner can delete workspace

#### Share Dashboard
- [ ] Create "Share" button on dashboard
- [ ] Generate public link (view-only)
- [ ] Test: Share link with external person

**Week 8 Success:**
- [ ] ✅ 2-person team can collaborate
- [ ] ✅ Permissions work correctly
- [ ] ✅ Share link works

---

### Week 9: App Mini Marketplace

#### Marketplace UI
- [ ] Create `app/(dashboard)/marketplace/page.tsx`
  - [ ] Grid of app mini cards
  - [ ] Search bar
  - [ ] Filter by category (Productivity, Business, etc.)
  - [ ] Sort by (Popular, Newest, Rating)
- [ ] Create `app/(dashboard)/marketplace/[appId]/page.tsx`
  - [ ] App mini detail page
  - [ ] Screenshots (if any)
  - [ ] Description
  - [ ] Install button
  - [ ] Reviews (basic)

#### Curated App Minis
- [ ] Add 5-10 app minis to marketplace table
  - [ ] Todo List
  - [ ] Kanban
  - [ ] Simple CRM
  - [ ] Time Tracker
  - [ ] Notes
  - [ ] Calendar
  - [ ] Expense Tracker
  - [ ] File Manager (link to Drive/Dropbox)

#### Install Flow
- [ ] Click "Install" on marketplace app
- [ ] Modal: "Add to which dashboard?"
- [ ] Select dashboard
- [ ] App mini appears on dashboard
- [ ] Track install count

**Week 9 Success:**
- [ ] ✅ Marketplace browsable
- [ ] ✅ Can install app mini from marketplace
- [ ] ✅ 5 users test and give feedback

---

### Week 10-11: Polish & Bug Fixes

#### Mobile Optimization
- [ ] Test all pages on mobile (Chrome DevTools)
- [ ] Fix layout issues
- [ ] Touch-friendly buttons (44px min)
- [ ] Mobile nav (hamburger menu)

#### Error Handling
- [ ] Add error boundaries to all routes
- [ ] User-friendly error messages
- [ ] Toast notifications for actions
- [ ] Retry button for failed requests

#### Loading States
- [ ] Skeleton loaders for all async content
- [ ] Spinners for buttons during actions
- [ ] Progressive loading (don't block entire page)

#### Onboarding
- [ ] Create onboarding flow (3 questions):
  1. What's your role? (PM, Developer, Designer, etc.)
  2. Team size? (Solo, 2-5, 6-10, 11-50, 51+)
  3. Main use case? (Project mgmt, CRM, Personal, etc.)
- [ ] Show relevant template after onboarding
- [ ] Skippable (for impatient users)

#### Documentation
- [ ] Help center page
- [ ] FAQ (5-10 common questions)
- [ ] Video tutorial (5 min Loom)
- [ ] Keyboard shortcuts page

**Week 10-11 Success:**
- [ ] ✅ Works on mobile (no major issues)
- [ ] ✅ All errors handled gracefully
- [ ] ✅ New user can onboard in <5 min
- [ ] ✅ Zero critical bugs

---

## 🚢 MVP LAUNCH (Week 11)

### Pre-launch Checklist
- [ ] Analytics setup (Vercel Analytics, PostHog)
- [ ] Error tracking (Sentry)
- [ ] SEO basics (title, description, og:image)
- [ ] Favicon and branding
- [ ] Terms of Service (template)
- [ ] Privacy Policy (template)

### Beta Launch
- [ ] Email 20 beta testers from research phase
- [ ] Subject: "NEXUS is ready - Your early access"
- [ ] Include: Login link, video tutorial, feedback form
- [ ] Track who logs in

### Monitoring
- [ ] Check Sentry daily for errors
- [ ] Check analytics: sign-ups, active users, session duration
- [ ] Schedule 5 user feedback calls (20 min each)

---

## 📊 MVP Success Criteria (End of Week 11)

**Metrics:**
- [ ] ✅ 20 sign-ups (from beta list)
- [ ] ✅ 10 active users (use ≥2x/week)
- [ ] ✅ 5 user interviews completed - majority positive
- [ ] ✅ Average session duration >5 minutes
- [ ] ✅ 0 critical bugs reported
- [ ] ✅ 1-2 users ask about paid plans

**If 4/6 criteria met → Proceed to Iteration**  
**If <4/6 criteria met → Pivot or extend MVP phase**

---

## 🔄 Phase 3: Iteration (Week 12-15)

**Goal:** Product-market fit signals

### Week 12: Feedback Analysis
- [ ] Consolidate all feedback
- [ ] Identify top 5 bugs
- [ ] Identify top 3 feature requests
- [ ] Prioritize: Must-fix vs Nice-to-have

### Week 13: Bug Fixes
- [ ] Fix all critical bugs
- [ ] Fix 80% of minor bugs
- [ ] Improve performance (page load <2s)
- [ ] Optimize Supabase queries

### Week 14: Top Feature Requests
- [ ] Implement top 3 features (if feasible in 1 week)
- [ ] Deploy and notify users
- [ ] Collect feedback on new features

### Week 15: Prepare for Scale
- [ ] Add more app minis (5-10 more)
- [ ] Improve onboarding (based on feedback)
- [ ] Create landing page (marketing site)
- [ ] Pricing page (even if not charging yet)

---

## 🎯 12-Week GO/NO-GO Decision

**Review Metrics (End of Week 12-15):**
- [ ] 50+ sign-ups
- [ ] 20+ active users (≥2x/week)
- [ ] Organic referrals (users invite others)
- [ ] Clear use case patterns
- [ ] 1-2 paying customers (or willingness to pay)

**Decisions:**

### ✅ GO (Persevere):
If 4/5 criteria met:
- Continue development
- Launch publicly (ProductHunt, Reddit, etc.)
- Start charging (freemium or paid)
- Consider fundraising (if ambitious) or bootstrap

### ⚠️ PIVOT:
If 2-3/5 criteria met:
- Change target user (e.g., only agencies, not all SMEs)
- Change features (focus on 1 killer feature)
- Change business model (B2B2C instead of B2B)
- Extend timeline 2-3 months

### ❌ STOP (Perish):
If <2/5 criteria met:
- Accept failure, move on
- Open-source the codebase
- Write post-mortem (what went wrong)
- Start new idea with learnings

---

## 📈 Success Tracking Template

Update this weekly:

**Week [Number]:**
- Sign-ups: ___
- Active users (this week): ___
- User interviews: ___
- Critical bugs: ___
- Top feedback: ___
- Blockers: ___
- Next week focus: ___

---

## 🎓 Learning Goals (Parallel Track)

While building, you'll learn:

- [ ] Next.js 14 App Router
- [ ] React 19 features
- [ ] TypeScript (intermediate level)
- [ ] Supabase (auth, database, RLS)
- [ ] TailwindCSS & shadcn/ui
- [ ] State management (Zustand)
- [ ] Deployment (Vercel)
- [ ] Analytics & monitoring
- [ ] User research & feedback
- [ ] Product prioritization

**Goal:** By week 12, you can build any CRUD app with this stack.

---

## 💰 Budget Tracking

**Target:** $0/month for first 500 users

### Free Tiers:
- Supabase: 500MB DB, 50K MAU
- Vercel: Unlimited deployments
- Sentry: 5K errors/month
- PostHog: 1M events/month

### When to Upgrade:
- 500 users → Supabase Pro ($25/month)
- 1000 users → Vercel Pro ($20/month)
- 2000 users → Consider revenue ($10/user/month = $20K MRR)

---

## 🏁 Final Checklist

Before saying "MVP is done":

- [ ] All core features working
- [ ] Mobile responsive
- [ ] Zero critical bugs
- [ ] 20+ beta users tested
- [ ] 10+ active users
- [ ] Positive feedback majority
- [ ] Documentation complete
- [ ] Monitoring setup
- [ ] Ready to launch publicly

---

**Good luck! You got this! 🚀**

**Remember:**
- ✅ Ship fast, iterate ruthlessly
- ✅ Talk to users weekly
- ✅ Focus on ONE thing: tool consolidation for SMEs
- ✅ Don't over-engineer
- ✅ Pivot is not failure

**Last Updated:** November 7, 2025  
**Next Review:** End of Week 3 (User Research phase)
