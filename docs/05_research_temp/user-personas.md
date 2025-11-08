# User Persona - SME Project Manager

## Primary Persona: Mai - Agency Project Manager

### Demographics
- **Tuổi:** 28-35
- **Vị trí:** Project Manager / Team Lead
- **Công ty:** Creative agency / Software house (10-30 người)
- **Location:** Hà Nội / TP.HCM
- **Tech savviness:** Medium-High (dùng Notion, Trello, Slack thành thạo)

### Background
Mai làm việc tại một agency nhỏ, quản lý 3-5 dự án đồng thời với 5-8 team members. Cô phải:
- Track tiến độ dự án
- Quản lý khách hàng
- Assign tasks cho team
- Report cho sếp hàng tuần
- Handle budget và invoicing

### Goals
1. **Tăng hiệu suất team** - giảm thời gian meeting, report
2. **Giảm tool fragmentation** - đang dùng 6-8 tools khác nhau
3. **Visibility tốt hơn** - biết ai đang làm gì real-time
4. **Dễ onboard members mới** - training hiện tại mất 1-2 tuần

### Pain Points

#### 🔥 Critical (Must Solve)
1. **Tool Switching Hell**
   - Notion (docs) → Trello (tasks) → Google Sheets (budget) → Email (client comms) → Slack (team chat)
   - Mất 30-60 phút/ngày chỉ để switch tools và sync data
   - Thường quên check một tool nào đó

2. **No Single Source of Truth**
   - Thông tin rải rác nhiều nơi
   - Team members không biết tìm info ở đâu
   - Phải hỏi lại nhau nhiều lần

3. **Customization Limits**
   - Trello quá đơn giản cho workflow phức tạp
   - Notion database không đủ flexible
   - Không thể tự tạo tool fit 100%

#### ⚠️ Important (Should Solve)
4. **Expensive Subscriptions**
   - Notion Team: $8/user
   - Asana: $10/user
   - Slack: $7/user
   - Harvest: $12/user
   - **Total: ~$40/user/month** cho team 10 người = $400/month

5. **Training Time**
   - Member mới phải học 5-6 tools
   - Mất 1-2 tuần để quen
   - Nhiều best practices không được document

6. **Lack of Integration**
   - Data không sync giữa tools
   - Phải copy-paste thủ công
   - Export/import vất vả

### Current Tools & Workflow

**Morning Routine (30-45 min):**
1. Check Slack → xem có urgent gì
2. Trello → update trạng thái tasks
3. Notion → review notes từ meeting hôm qua
4. Google Sheets → check budget dự án
5. Email → reply clients

**Problem:** Quá nhiều tabs, dễ miss information

### Jobs to Be Done

**When** Mai bắt đầu ngày làm việc  
**She wants to** see overview của tất cả dự án, tasks, và client requests  
**So she can** prioritize work và assign cho team  
**Without** phải mở 5-6 tools khác nhau

**When** Client request thay đổi scope  
**She wants to** update task, doc, và budget trong cùng một nơi  
**So she can** không miss bất kỳ update nào  
**Without** phải update 3-4 tools riêng lẻ

**When** Member mới join team  
**She wants to** onboard họ với clear workflow và tools  
**So she can** họ productive trong 2-3 ngày thay vì 2 tuần  
**Without** phải training 1-on-1 nhiều giờ

### Feature Priorities

#### Must Have (Can't Live Without)
- [ ] Unified dashboard với overview projects
- [ ] Task management với assign, due dates
- [ ] Doc editor để notes và requirements
- [ ] Simple CRM để track clients
- [ ] Mobile app để check on-the-go

#### Should Have (Would Pay Extra)
- [ ] Time tracking built-in
- [ ] Budget/invoicing module
- [ ] File storage
- [ ] Calendar integration
- [ ] Customizable views (kanban, list, calendar)

#### Nice to Have (But Not Critical)
- [ ] Automation (Zapier-like)
- [ ] Analytics/reports
- [ ] Gantt chart
- [ ] Resource planning

### Willingness to Pay
- **Current spend:** $40/user/month across multiple tools
- **Willing to pay for all-in-one:** $15-25/user/month
- **Condition:** Phải thay thế ít nhất 3-4 tools hiện tại
- **Decision maker:** Self (team lead) or Boss approval needed

### Objections & Concerns

1. **"Another tool to learn?"**
   - Concern: Training time, switching cost
   - Need: Onboarding <30 minutes

2. **"What if it doesn't fit our workflow?"**
   - Concern: Lack of customization
   - Need: Flexible, customizable components

3. **"Data migration from current tools?"**
   - Concern: Import Notion, Trello data
   - Need: Import tools or manual migration support

4. **"What if you shut down?"**
   - Concern: Lock-in, data export
   - Need: Easy export, no vendor lock

### How to Reach Mai

**Online:**
- Facebook groups: "Project Manager Vietnam", "Startup Vietnam"
- LinkedIn: Vietnamese PM communities
- Reddit: r/projectmanagement (nếu English OK)

**Offline:**
- PM meetups (Hà Nội, HCM)
- Startup events
- Coworking spaces (Toong, Work Saigon, etc.)

**Content:**
- "7 tools PMs use → How to reduce to 1"
- "Cut PM tool costs from $400 to $100/month"
- "Onboard team members in 1 day not 1 week"

---

## Secondary Persona: Tuấn - Freelancer Team Lead

### Demographics
- **Tuổi:** 25-32
- **Vị trí:** Freelancer, leading 2-3 person team
- **Industry:** Design / Development / Marketing
- **Tech savviness:** High

### Goals
- Simple tool để coordinate với 2-3 freelancers
- Track deliverables và invoices
- Client communication history

### Pain Points
- Không cần tool "enterprise" phức tạp
- Budget thấp (<$50/month cho cả team)
- Cần mobile-first (làm việc remote nhiều)

### Willingness to Pay
- $10-15/month flat (không theo user)
- Hoặc free với ads/limits

---

## Anti-Persona: Hùng - Enterprise IT Manager

### Why Not Target?
- **Company size:** 500+ employees
- **Decision process:** RFP, 3-6 months procurement
- **Requirements:** Enterprise SSO, compliance, SLA
- **Budget:** High, but slow sales cycle

**We should avoid:** Targeting enterprises in MVP phase. Focus SMEs first, scale later.

---

## Summary: Who We're Building For

**Primary:** Project Managers at SMEs (10-50 people)
**Secondary:** Freelancer teams (2-5 people)
**Avoid:** Enterprises (too slow), Solo individuals (low willingness to pay)

**Core Need:** All-in-one tool that's:
1. Simple to learn (<30 min)
2. Customizable to workflow
3. Affordable ($15-20/user vs $40+ currently)
4. Replaces 3-5 existing tools
