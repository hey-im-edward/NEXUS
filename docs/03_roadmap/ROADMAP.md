# 🗺️ ROADMAP - Kế hoạch 12 tuần

> **Mục đích:** Roadmap chi tiết 12 tuần - Từ POC → MVP → GO/NO-GO Decision.

**Cập nhật:** 8 tháng 11, 2025  
**Timeline:** Nov 7, 2025 → Feb 6, 2026 (12 tuần)

---

## 📅 **TIMELINE OVERVIEW**

```
Week 0-3:  User Research + POC Foundation     [████████░░░░░░░░░░░░░░] 30%
Week 4-7:  POC (Proof of Concept)             [░░░░░░░░░░░░░░░░░░░░░░] 0%
Week 8-11: MVP (Minimum Viable Product)       [░░░░░░░░░░░░░░░░░░░░░░] 0%
Week 12:   GO/NO-GO Decision Point            [░░░░░░░░░░░░░░░░░░░░░░] 0%
```

**YOU ARE HERE:** Week 0 (Nov 7-13, 2025) ← 📍

---

## 🎯 **WEEK 0-3: USER RESEARCH + POC FOUNDATION**

### **Week 0 (Nov 7-13) - Foundation ✅🔄**

**Goal:** Task Management Polish + 3-5 User Interviews

**Deliverables:**

- [x] Database v2 deployed
- [x] Google OAuth working
- [x] Task CRUD basic
- [x] Kanban Board 100%
- [ ] Task Management Polish (6 prompts)
- [ ] 3-5 User interviews

**Success Criteria:**

- Task management 80% polished
- 3+ interviews completed
- Insights documented

**Timeline với AI:**

- Planned: 5 ngày manual work
- Actual: 2 ngày với AI (ahead of schedule!)

---

### **Week 1 (Nov 14-20) - Recurring + Calendar**

**Goal:** Advanced task features + More interviews

**Deliverables:**

- [ ] Recurring tasks (rrule integration)
- [ ] Calendar view basic
- [ ] Command palette (Cmd+K)
- [ ] 5+ User interviews

**Key Features:**

```
1. Recurring Patterns
   - Daily, Weekly, Monthly
   - Custom (Every 2 days, Last Friday of month)
   - rrule string generation

2. Calendar View
   - Month/Week/Day views
   - react-big-calendar integration
   - Click date → Create task

3. Command Palette
   - Cmd+K quick actions
   - Fuzzy search
   - Create task/project/page từ palette
```

**Success Criteria:**

- Recurring tasks working
- Calendar displays tasks correctly
- 8/10 total interviews done

---

### **Week 2 (Nov 21-27) - Pages + Integrations**

**Goal:** Notion-like pages + Polish

**Deliverables:**

- [ ] Tiptap editor integration
- [ ] Create/Edit pages
- [ ] Embed tasks in pages
- [ ] Mobile responsive basic

**Key Features:**

```
1. Page Editor (Tiptap)
   - Rich text (bold, italic, headings)
   - Task list blocks
   - @mention tasks
   - Markdown support

2. Mobile Responsive
   - Sidebar collapse on mobile
   - Touch-friendly buttons
   - Swipe actions (nice-to-have)
```

**Success Criteria:**

- Pages editor working
- Can create notes with embedded tasks
- Mobile usable (not perfect)

---

### **Week 3 (Nov 28 - Dec 4) - App Minis + Polish**

**Goal:** 1-2 App Minis + UI Polish

**Deliverables:**

- [ ] Habit Tracker mini
- [ ] OR Pomodoro Timer mini
- [ ] Empty states với illustrations
- [ ] Loading skeletons
- [ ] 10/10 interviews done

**Success Criteria:**

- 1 App Mini working
- UI polished, no major bugs
- All 10 interviews done, insights analyzed

---

## 🚀 **WEEK 4-7: POC (PROOF OF CONCEPT)**

### **Week 4 (Dec 5-11) - Deploy & Test**

**Goal:** Deploy to production + Get first testers

**Deliverables:**

- [ ] Deploy to Vercel
- [ ] Invite 5 beta testers
- [ ] Onboarding flow
- [ ] Fix deployment bugs

**Success Criteria:**

- App live tại nexus-productivity.vercel.app
- 5 testers signed up
- No critical bugs

---

### **Week 5 (Dec 12-18) - Feedback Round 1**

**Goal:** Collect feedback, iterate

**Deliverables:**

- [ ] User feedback sessions (5 testers)
- [ ] Bug fixes từ feedback
- [ ] UX improvements
- [ ] Performance optimization

**Success Criteria:**

- 3/5 testers say "I would use this daily"
- Average session time >10 minutes
- NPS score >30

---

### **Week 6 (Dec 19-25) - Polish + More Features**

**Goal:** Add must-have features từ feedback

**Deliverables:**

- [ ] Features requested by users (top 3)
- [ ] Advanced search & filters
- [ ] Notifications (toast/email)
- [ ] Export data (CSV/JSON)

**Success Criteria:**

- Top 3 requested features done
- User retention 60% (3/5 testers still active)

---

### **Week 7 (Dec 26 - Jan 1) - Scale to 20 Users**

**Goal:** Invite more testers, test scale

**Deliverables:**

- [ ] Invite 15 more testers (total 20)
- [ ] Monitor Supabase usage
- [ ] Fix performance issues
- [ ] Improve onboarding based on feedback

**Success Criteria:**

- 20 signups
- 10 active users (3+ sessions/week)
- Supabase free tier sufficient

---

## 🎨 **WEEK 8-11: MVP (MINIMUM VIABLE PRODUCT)**

### **Week 8 (Jan 2-8) - Payment Integration**

**Goal:** Add pricing, payment

**Deliverables:**

- [ ] Stripe integration
- [ ] Pricing page ($10-15/month)
- [ ] Subscription management
- [ ] Free trial (14 days)

**Success Criteria:**

- Payment flow working
- 1-2 paying users

---

### **Week 9 (Jan 9-15) - Team Features**

**Goal:** Multi-user workspaces

**Deliverables:**

- [ ] Invite team members
- [ ] Workspace settings
- [ ] Permissions (Owner, Member)
- [ ] Activity log

**Success Criteria:**

- 2+ teams using NEXUS
- Team collaboration working

---

### **Week 10 (Jan 16-22) - Integrations**

**Goal:** External integrations

**Deliverables:**

- [ ] Google Calendar sync
- [ ] Slack notifications (optional)
- [ ] Email integration
- [ ] API webhooks

**Success Criteria:**

- Google Calendar sync working
- Users find value in integrations

---

### **Week 11 (Jan 23-29) - Final Polish**

**Goal:** Bug fixes, performance, UX

**Deliverables:**

- [ ] Fix all critical bugs
- [ ] Performance optimization (<1s page load)
- [ ] Mobile app-like experience
- [ ] Dark mode (nice-to-have)

**Success Criteria:**

- Zero critical bugs
- Lighthouse score >90
- User satisfaction >80%

---

## 🎯 **WEEK 12 (Jan 30 - Feb 6): GO/NO-GO DECISION**

### **Metrics to Evaluate:**

```
✅ GO Criteria (Must have ALL):
- 50+ signups
- 10+ active users (3+ sessions/week)
- 1-2 paying users ($10-15/month)
- NPS score >40
- Positive user feedback (80% would recommend)

❌ NO-GO Criteria (Any of these):
- <20 signups
- <5 active users
- 0 paying users
- NPS score <20
- Negative feedback (majority say won't use)
```

### **Decision Tree:**

```
IF GO:
   → Continue to Scale phase (Week 13+)
   → Hire 1-2 developers
   → Marketing budget $500-1000/month
   → Target 100 users by Month 6

IF PIVOT:
   → Analyze what users actually need
   → Rebuild features or change focus
   → 4 tuần pivot experiment
   → Re-evaluate

IF NO-GO:
   → Shut down gracefully
   → Refund any paying users
   → Archive code for future reference
   → Lessons learned document
```

---

## 📊 **SUCCESS METRICS BY WEEK**

| Week | Signups               | Active Users | Paying | NPS | Tasks Created |
| ---- | --------------------- | ------------ | ------ | --- | ------------- |
| 0    | 1                     | 1            | 0      | N/A | 50            |
| 1    | 5                     | 3            | 0      | N/A | 200           |
| 2    | 10                    | 5            | 0      | N/A | 500           |
| 3    | 15                    | 8            | 0      | N/A | 800           |
| 4    | 20                    | 10           | 0      | 30  | 1,000         |
| 7    | 30                    | 15           | 0      | 35  | 2,000         |
| 8    | 35                    | 18           | 1      | 40  | 2,500         |
| 11   | 50                    | 20           | 2      | 45  | 4,000         |
| 12   | **GO/NO-GO DECISION** |              |        |     |

---

## 🔗 **RELATED DOCS**

- **Features:** [FEATURES.md](../01_status/FEATURES.md)
- **Ideas:** [IDEAS.md](./IDEAS.md)
- **History:** [HISTORY.md](./HISTORY.md)
- **Project Status (Legacy):** [PROJECT_STATUS.md](./PROJECT_STATUS.md)

---

**Last Updated:** November 8, 2025  
**Next Review:** November 11, 2025 (End of Week 0)
