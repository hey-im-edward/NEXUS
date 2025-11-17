# 💡 IDEAS - Ý tưởng cho tương lai

> **Mục đích:** Ghi lại TẤT CẢ ý tưởng - Cũ, mới, đã làm, chưa làm, rejected.

**Cập nhật:** 8 tháng 11, 2025

---

## 🌟 **Ý TƯỞNG ĐÃ THỰC HIỆN**

### **1. Kanban Board** ✅

- **Ngày ý tưởng:** Nov 1, 2025
- **Ngày thực hiện:** Nov 8, 2025
- **Kết quả:** Works great! Users love drag & drop
- **Tech:** @dnd-kit/core, Zustand optimistic updates
- **Implementation Time:** 2 hours with AI assistance
- **Key Learning:** Drag & drop with @dnd-kit is complex but powerful

### **2. Smart Lists (Today, Inbox, Upcoming)** ✅

- **Ngày ý tưởng:** Nov 2, 2025
- **Ngày thực hiện:** Nov 7, 2025
- **Kết quả:** Basic filters working
- **Tech:** Client-side filtering with date comparison
- **Filters Implemented:**
  - **Today:** `due_date === today`
  - **Inbox:** `project_id === null`
  - **Upcoming:** `due_date > today AND due_date <= +7 days`
- **Key Learning:** Simple filters provide huge UX value

---

## 💭 **Ý TƯỞNG ĐANG XEM XÉT (High Priority)**

### **3. AI-Powered Task Suggestions**

- **Mô tả:** AI suggest tasks dựa trên:
  - Past tasks patterns (e.g., "You usually add 'Review emails' every Monday 9am")
  - Calendar events
  - Current projects
  - Similar project patterns
- **Example Use Case:**
  - User thường có meeting Mondays 10AM → AI suggest "Prepare weekly report" Sunday evening
  - User completed "Design mockup" → AI suggest "Get feedback" as next task
- **Priority:** MEDIUM (nice-to-have, không critical cho MVP)
- **Timeline:** Week 10-11 (nếu có budget và user validation)
- **Tech Stack:**
  - OpenAI API hoặc local LLM
  - Vector DB (Supabase pgvector) để store task embeddings
  - Pattern recognition algorithms
- **Cost estimate:** $20-100/month (tùy API usage)
- **Pros:**
  - ✅ Unique selling point
  - ✅ Save time for users
  - ✅ Learn user behavior over time
- **Cons:**
  - ❌ Expensive (OpenAI API cost)
  - ❌ Privacy concerns (sending data to OpenAI)
  - ❌ Accuracy challenges
  - ❌ Cần training data (minimum 100+ tasks per user)
- **Challenges:**
  - Privacy: Users might not want task data sent to third-party AI
  - Cost: API costs scale with users
  - Accuracy: AI might suggest irrelevant tasks
- **Decision:** WAIT - Xem user feedback trước, có thể implement simple rule-based suggestions first

---

### **4. Voice Input cho Quick Add**

- **Mô tả:** Nói "Mua sữa lúc 5 giờ chiều" → Auto create task với title + due_date
- **Example Flows:**
  - "Buy milk at 5pm" → Task: "Buy milk", Due: Today 5pm
  - "Schedule meeting with John tomorrow" → Task: "Meeting with John", Due: Tomorrow
  - "Call mom this Friday" → Task: "Call mom", Due: Friday
- **Priority:** LOW (cool feature, không essential)
- **Timeline:** Week 8+ (nice-to-have)
- **Tech:** 
  - Web Speech API (browser built-in, free)
  - Natural Language Processing để parse date/time
  - Chrono library for date parsing
- **Use Case:**
  - Driving, cooking, không tiện type
  - Quick capture without keyboard
  - Accessibility for users với mobility issues
- **Pros:**
  - ✅ Quick task creation
  - ✅ Hands-free
  - ✅ No additional cost (Web Speech API free)
  - ✅ Accessibility benefits
- **Cons:**
  - ❌ Browser compatibility issues (Safari limited support)
  - ❌ Accuracy không 100% (accent, background noise)
  - ❌ NLP complexity (Vietnamese date parsing rất khó)
  - ❌ Requires microphone permission
- **Challenges:**
  - Accuracy with accents and background noise
  - Vietnamese date parsing ("thứ 6 tuần sau", "mai chiều")
  - Privacy concerns (microphone access)
- **Decision:** MAYBE - Test với small group users trước

---

### **5. Time Tracking Integration**

- **Mô tả:** Track time spent on each task (Pomodoro-style)
- **Features:**
  - Click "Start timer" on task
  - Auto-log time to `task_time_logs` table
  - Weekly/monthly reports
  - Pomodoro timer integration (25min work, 5min break)
  - Export time logs (for billing)
- **Priority:** MEDIUM
- **Timeline:** Week 6-7
- **Use Case:**
  - Freelancers billing clients
  - Personal productivity analytics
  - Team time reporting
  - Identify time-consuming tasks
- **Tech:**
  - Simple timer component (React state)
  - Supabase table: `task_time_logs (task_id, started_at, ended_at, duration)`
  - Chart.js for analytics
- **Database Schema:**
  ```sql
  CREATE TABLE task_time_logs (
    id UUID PRIMARY KEY,
    task_id UUID REFERENCES tasks(id),
    user_id UUID REFERENCES auth.users(id),
    started_at TIMESTAMPTZ NOT NULL,
    ended_at TIMESTAMPTZ,
    duration_seconds INTEGER,
    created_at TIMESTAMPTZ DEFAULT NOW()
  );
  ```
- **Pros:**
  - ✅ Requested by multiple potential users
  - ✅ Easy to implement (simple timer)
  - ✅ Valuable for freelancers
  - ✅ Analytics provide insights
- **Cons:**
  - ❌ Cạnh tranh với Toggl, Clockify (specialized tools)
  - ❌ Users might forget to stop timer
  - ❌ Additional database writes
- **Decision:** LIKELY YES - Nếu user interviews confirm need

---

### **6. Project Templates**

- **Mô tả:** Pre-built project structures (e.g., "Website Launch" template)
- **Example Templates:**
  - **Website Launch:**
    1. Design mockups
    2. Frontend development
    3. Backend API
    4. Testing
    5. Deploy to production
  - **Client Onboarding:**
    1. Send welcome email
    2. Schedule kickoff call
    3. Gather requirements
    4. Create project plan
  - **Event Planning:**
    1. Book venue
    2. Send invitations
    3. Arrange catering
    4. Setup decorations
- **Priority:** LOW (nice QoL improvement)
- **Timeline:** Week 9+
- **Tech:**
  - Store templates in `project_templates` table
  - "Use template" button → Copy tasks to new project
  - Allow users to create custom templates
- **Implementation:**
  ```sql
  CREATE TABLE project_templates (
    id UUID PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    tasks JSONB, -- Array of task templates
    is_public BOOLEAN DEFAULT false,
    created_by UUID REFERENCES auth.users(id)
  );
  ```
- **Pros:**
  - ✅ Save time for repetitive projects
  - ✅ Consistency across similar projects
  - ✅ Easy to implement
  - ✅ Users can share templates
- **Cons:**
  - ❌ Cần curate good templates
  - ❌ Might not fit everyone's workflow
- **Decision:** LIKELY YES - Easy win, high user value

---

### **7. Public Task Sharing**

- **Mô tả:** Share task list/project publicly (read-only link)
- **Use Cases:**
  - Share wedding planning checklist với guests
  - Share project roadmap với clients (without giving access)
  - Portfolio showcase (e.g., "How I built X")
  - Public accountability (e.g., "My 30-day challenge")
- **Priority:** MEDIUM
- **Timeline:** Week 7-8
- **Implementation:**
  - Generate shareable UUID link: `/share/[uuid]`
  - Public route (no auth required)
  - RLS: Allow public read nếu `is_public = true`
- **Security:**
  ```sql
  -- Add column to projects/tasks
  ALTER TABLE projects ADD COLUMN is_public BOOLEAN DEFAULT false;
  ALTER TABLE projects ADD COLUMN share_token UUID DEFAULT gen_random_uuid();
  
  -- RLS policy
  CREATE POLICY "Public projects are viewable by anyone"
    ON projects FOR SELECT
    USING (is_public = true);
  ```
- **Features:**
  - Toggle "Make public" switch
  - Copy shareable link
  - View count (optional)
  - Disable sharing anytime
- **Pros:**
  - ✅ Easy sharing without account
  - ✅ Portfolio use case
  - ✅ Marketing opportunity (shared pages show NEXUS branding)
- **Cons:**
  - ❌ Privacy risk (accidentally share sensitive info)
  - ❌ Need clear UI to prevent mistakes
- **Decision:** LIKELY YES - Good for growth, needs careful UX

---

## 🔮 **Ý TƯỞNG MỚI (Chưa đánh giá)**

### **8. Daily Standup Email Summary**

- **Mô tả:** Mỗi sáng 8AM, email summary:
  - Tasks completed yesterday
  - Tasks due today
  - Overdue tasks
  - Upcoming tasks this week
- **Priority:** TBD (Need user validation)
- **Timeline:** Week 8+ (if validated)
- **Tech:** 
  - Supabase Edge Functions + Cron job
  - SendGrid/Resend for email delivery
  - Email templates (HTML)
- **Cost:** 
  - SendGrid: Free tier (100 emails/day)
  - Or Resend: $0 for first 3000 emails/month
- **Pros:**
  - ✅ Start day with clear priorities
  - ✅ Never forget overdue tasks
  - ✅ Email is universal (no app needed)
- **Cons:**
  - ❌ Another email (inbox fatigue)
  - ❌ Requires email service setup
  - ❌ Timezone complexity
- **Submitted by:** Self-brainstorm
- **Date:** Nov 8, 2025
- **Status:** Need to validate với users
- **Alternative:** In-app daily summary instead of email

---

### **9. Gamification (Streaks, Points, Badges)**

- **Mô tả:**
  - **Streaks:** Complete at least 1 task for 7 days straight → 🔥 7-day streak
  - **Points:** Earn points khi complete tasks
    - Simple task: 10 points
    - Medium complexity: 25 points
    - Hard task: 50 points
  - **Badges/Achievements:**
    - "First Task" - Create first task
    - "10 Tasks Completed" 
    - "100 Tasks Completed"
    - "7-Day Streak"
    - "30-Day Streak"
  - **Leaderboard:** (nếu có teams) Top performers this week/month
- **Inspiration:** Duolingo, Habitica, GitHub contribution graph
- **Priority:** TBD (Need user validation)
- **Timeline:** Week 10+ (Polish phase)
- **Tech:**
  - Supabase table: `user_achievements`, `user_stats`
  - Real-time updates với Supabase Realtime
  - Badge icons (custom SVG or emoji)
- **Pros:**
  - ✅ Motivate users to complete tasks
  - ✅ Fun, engaging
  - ✅ Viral potential (share achievements)
- **Cons:**
  - ❌ Risk of making it feel like a game, not serious productivity tool
  - ❌ Some users might dislike gamification
  - ❌ Can become distraction from actual work
- **Submitted by:** Self-brainstorm
- **Date:** Nov 8, 2025
- **Status:** HIGH RISK - Need careful UX design to avoid feeling gimmicky
- **Decision:** MAYBE - A/B test with small group first

---

### **10. Recurring Tasks (rrule-based)**

- **Mô tả:** Tasks that repeat automatically
- **Examples:**
  - "Review emails" - Every weekday 9am
  - "Grocery shopping" - Every Sunday
  - "Pay rent" - 1st of every month
  - "Quarterly review" - Every 3 months
- **Priority:** HIGH (Highly requested feature)
- **Timeline:** Week 5-6 (Planned)
- **Tech:**
  - rrule library (RFC-5545 standard - same as Google Calendar)
  - Supabase columns: `recurrence_rule TEXT`, `recurrence_end_date TIMESTAMPTZ`
- **Implementation:**
  ```typescript
  // Example rrule
  import { RRule } from 'rrule'
  
  const rule = new RRule({
    freq: RRule.DAILY,
    interval: 1,
    dtstart: new Date(2025, 10, 9),
    until: new Date(2026, 10, 9)
  })
  
  // Generate next 10 occurrences
  const dates = rule.all((date, i) => i < 10)
  ```
- **UI:**
  - Dropdown: "Does not repeat" | "Daily" | "Weekly" | "Monthly" | "Custom"
  - Custom dialog: Complex patterns (e.g., "Last Friday of every month")
- **Pros:**
  - ✅ Industry standard (RFC-5545)
  - ✅ Handles all edge cases (leap years, timezones, etc.)
  - ✅ Highly requested by users
- **Cons:**
  - ❌ Complex UI (hard to make user-friendly)
  - ❌ rrule syntax is cryptic (FREQ=DAILY;INTERVAL=2)
  - ❌ Need helper functions for human-readable format
- **Submitted by:** User feedback + self-brainstorm
- **Date:** Nov 2, 2025
- **Status:** PLANNED - Week 5-6 implementation
- **Decision:** YES - Core feature for productivity app

---

### **11. Mobile App (React Native/PWA)**

- **Mô tả:** Native iOS/Android app hoặc Progressive Web App
- **Options:**
  - **Option A:** React Native (true native app)
  - **Option B:** PWA (web app that feels native)
- **Comparison:**
  
  | Feature | React Native | PWA |
  |---------|--------------|-----|
  | Development time | 2-3 months | 1-2 weeks |
  | Offline support | ✅ Full | ✅ Service Workers |
  | Push notifications | ✅ Full | ⚠️ Limited (iOS) |
  | App store | ✅ Yes | ❌ No |
  | Install size | 20-50MB | ~5MB |
  | Maintenance | 3 codebases | 1 codebase |

- **Priority:** LOW (Post-MVP)
- **Timeline:** Month 6+ (after web app success)
- **Recommendation:** Start with PWA (Week 12), React Native only if traction
- **PWA Checklist:**
  - [ ] Service Worker for offline support
  - [ ] manifest.json for install prompt
  - [ ] App icons (multiple sizes)
  - [ ] Splash screens
- **Pros:**
  - ✅ Better mobile UX than web
  - ✅ Push notifications (PWA on Android, limited on iOS)
  - ✅ Offline mode
  - ✅ Home screen icon
- **Cons:**
  - ❌ React Native: 2-3 tháng development time
  - ❌ React Native: Need to maintain 3 codebases (Web, iOS, Android)
  - ❌ React Native: App Store approval process (2-4 weeks)
  - ❌ React Native: Yearly $99 Apple Developer fee
  - ❌ PWA: Limited iOS support (no push notifications)
- **Submitted by:** Self-brainstorm
- **Date:** Nov 8, 2025
- **Decision:** WAIT - Web PWA first (Week 12), native app later if demand exists

---

## ❌ **Ý TƯỞNG BỊ REJECTED**

### **12. Built-in Chat/Messaging ❌**

- **Mô tả:** Team chat như Slack bên trong NEXUS
- **Features Proposed:**
  - Direct messages
  - Group channels
  - File sharing
  - @mentions, reactions
- **Lý do reject:**
  - ❌ Cạnh tranh với Slack, Teams, Discord (đã established)
  - ❌ Out of scope (không phải productivity core)
  - ❌ Tốn quá nhiều resources để maintain (real-time infrastructure)
  - ❌ Security/privacy concerns (message encryption, data retention)
  - ❌ Scope creep (pulls focus from core task management)
- **Alternative Solution:**
  - ✅ Integrate với Slack notifications (send task updates to Slack)
  - ✅ Webhook support để connect với existing chat tools
- **Rejected date:** Nov 3, 2025

---

### **13. Video Calls Integration ❌**

- **Mô tả:** Built-in video call như Zoom
- **Features Proposed:**
  - 1-on-1 calls
  - Group meetings
  - Screen sharing
- **Lý do reject:**
  - ❌ Zoom, Google Meet, Microsoft Teams đã tốt
  - ❌ WebRTC technical complexity (signaling server, STUN/TURN)
  - ❌ Bandwidth costs (video streaming expensive)
  - ❌ Out of scope (không phải core productivity feature)
  - ❌ Maintenance nightmare (different browsers, network conditions)
- **Alternative Solution:**
  - ✅ Add Zoom/Meet/Teams links to calendar events
  - ✅ One-click join meeting from task/event
- **Rejected date:** Nov 3, 2025

---

### **14. Email Client Inside App ❌**

- **Mô tả:** Quản lý email trong NEXUS (như Superhuman)
- **Features Proposed:**
  - Read/send emails
  - Email → Task conversion
  - Unified inbox
- **Lý do reject:**
  - ❌ Gmail, Outlook, Apple Mail đã tốt
  - ❌ Security/privacy concerns (storing email credentials)
  - ❌ IMAP/SMTP complexity
  - ❌ Too complex (email is a full product by itself)
  - ❌ Focus on tasks, not emails
  - ❌ Legal compliance (GDPR, data handling)
- **Alternative Solution:**
  - ✅ Email → Task automation (forward email to special address to create task)
  - ✅ Email notifications for task updates
  - ✅ Browser extension to create tasks from emails (future)
- **Rejected date:** Nov 4, 2025

---

## 🎯 **Ý TƯỞNG TỪ USER INTERVIEWS**

### **Interview #1 (Pending)**

- [ ] Schedule interview

### **Interview #2 (Pending)**

- [ ] Schedule interview

### **Interview #3 (Pending)**

- [ ] Schedule interview

_(Cập nhật sau khi interviews done)_

---

## 📝 **IDEA SUBMISSION TEMPLATE**

Có ý tưởng mới? Thêm vào đây:

```markdown
### **[Số]. [Tên Ý Tưởng]**

- **Mô tả:** [Chi tiết ý tưởng]
- **Use case:** [Ai dùng? Dùng khi nào?]
- **Priority:** [HIGH / MEDIUM / LOW]
- **Timeline:** [Week X]
- **Tech required:** [Library/API cần dùng]
- **Pros:**
  - ✅ [Ưu điểm 1]
  - ✅ [Ưu điểm 2]
- **Cons:**
  - ❌ [Nhược điểm 1]
  - ❌ [Nhược điểm 2]
- **Submitted by:** [Tên]
- **Date:** [DD/MM/YYYY]
- **Status:** [Need validation / Likely YES / Likely NO / Rejected]
```

---

## 🔗 **RELATED DOCS**

- **Roadmap:** [ROADMAP.md](./ROADMAP.md)
- **Features:** [FEATURES.md](../01_status/FEATURES.md)
- **User Research:** [../05_research/](../05_research/)
- **Source:** Ideas được tổng hợp từ [BRAIN_DUMP_from_initial_chat.md](../archive/conversations/BRAIN_DUMP_from_initial_chat.md)

---

**Last Updated:** November 9, 2025  
**Next Update:** After each user interview or major brainstorming session

**Note:** Các ý tưởng trong file này được tích hợp từ Brain Dump và bổ sung thêm chi tiết, phân tích, và trạng thái cập nhật.

---

## 📊 **STATISTICS**

- **Total Ideas:** 14
- **Implemented:** 2 ✅
- **High Priority (Considering):** 5 💭
- **New Ideas (Need validation):** 4 🔮
- **Rejected:** 3 ❌

**Acceptance Rate:** 2/14 = 14% (strict filtering = high quality)

---

## 💡 **IDEA GENERATION TIPS**

**Where ideas come from:**
1. ✅ User interviews (best source)
2. ✅ Competitor analysis (Linear, Notion, ClickUp)
3. ✅ Personal pain points
4. ✅ Team brainstorming
5. ⚠️ Random Reddit/HN threads (validate first!)

**How to evaluate ideas:**
1. **Is it core to productivity?** If no → probably reject
2. **Can we build it in 1 week?** If no → delay or break down
3. **Do 3+ users ask for it?** If no → low priority
4. **Does it exist elsewhere better?** If yes → integrate, don't rebuild
5. **Will it scale with free tier Supabase?** If no → reconsider architecture

**Red flags (Probably reject):**
- ❌ "Wouldn't it be cool if..."
- ❌ Features that Notion/Linear already do perfectly
- ❌ Anything requiring dedicated infrastructure (video, real-time chat)
- ❌ Ideas that distract from core value prop (task management)

**Green lights (Prioritize):**
- ✅ Users explicitly request it (3+ mentions)
- ✅ Solves YOUR OWN pain point
- ✅ Easy to build (1-2 days max)
- ✅ Differentiates from competitors
- ✅ Fits within Supabase free tier
