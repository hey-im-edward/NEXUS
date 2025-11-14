# 🎯 THIS WEEK'S FOCUS - Week 0 (Architecture & Design)

**Ngày bắt đầu:** 13 tháng 11, 2024
**Giai đoạn hiện tại:** Week 0 - Architecture & Design (Pivot to Platform)
**Team:** 2 người (part-time, 20h/tuần mỗi người)

---

## 🔄 **PIVOT CHIẾN LƯỢC - 13/11/2024**

> **QUYẾT ĐỊNH:** Dừng việc "đánh bóng" Task Management. Bắt đầu xây dựng yếu tố khác biệt: **Platform (Dashboard Grid + App Builder)**.

**Thay đổi tầm nhìn:**
- ❌ **CŨ:** Task Manager tốt hơn Notion/Todoist
- ✅ **MỚI:** Platform để build & share mini-apps (như Notion dashboard + iOS home screen)

**Thay đổi North Star Metric:**
- ❌ **CŨ:** "tasks created" (giống tất cả task managers)
- ✅ **MỚI:** "apps built and shared" (độc nhất)

---

## 📌 TOP PRIORITIES THIS WEEK (13-20/11)

### 1. Architecture Decision Record (URGENT) 🔥

**Mục tiêu:** Quyết định kiến trúc hệ thống App Mini

**Action Items:**

- [ ] **Ngày 1-2: Nghiên cứu Libraries**
  - Research `react-grid-layout` (drag-drop grid)
  - Research `@monaco-editor/react` hoặc `Sandpack` (code editor trong browser)
  - Research iframe isolation strategy
  - So sánh: Client-side rendering vs Server-side execution

- [ ] **Ngày 3: Viết ADR (Architecture Decision Record)**
  - File: `docs/04_technical/architecture/decisions/ADR-001-app-mini-system.md`
  - Nội dung:
    - **Context:** Tại sao cần App Mini system?
    - **Decision:** Chọn approach nào? (react-grid-layout + sandboxed iframe? hoặc Sandpack?)
    - **Consequences:** Trade-offs, security implications
    - **Alternatives Considered:** List 2-3 approaches khác

- [ ] **Ngày 4: Review ADR**
  - Đọc lại ADR với perspective "an toàn không?"
  - Check: XSS risks, infinite loops, memory leaks
  - Update ADR nếu phát hiện issues

**Success Metric:** ADR file hoàn thiện, đã review security

---

### 2. Dashboard Grid Wireframes (URGENT) 🔥

**Mục tiêu:** Vẽ wireframe chi tiết cho Dashboard Grid

**Action Items:**

- [ ] **Ngày 1-2: Sketches trên giấy**
  - Vẽ layout: Sidebar + Main dashboard grid area
  - Vẽ AppMiniCard: 2x2, 2x4, 4x4 sizes
  - Vẽ states: Empty state, Loading, Dragging
  - Vẽ interactions: Drag to reorder, Click to open, Delete button

- [ ] **Ngày 3-4: Digital wireframes**
  - Tool: Figma (hoặc Excalidraw nếu nhanh hơn)
  - Create 3 screens:
    - Screen 1: Empty dashboard ("Add your first app")
    - Screen 2: Dashboard với 3 app minis
    - Screen 3: Dragging state (ghost card, drop zones)

- [ ] **Ngày 5: Annotate wireframes**
  - Add notes: Behaviors, animations, data flow
  - Export as PNG/PDF to `UX-UI/wireframes/dashboard-grid.png`

**Success Metric:** Wireframes rõ ràng, sẵn sàng để code

---

### 3. Technical Spike (OPTIONAL - If Time) 🧪

**Mục tiêu:** Test `react-grid-layout` với prototype

**Action Items:**

- [ ] **Tạo prototype folder**
  ```bash
  mkdir frontend/prototypes
  cd frontend/prototypes
  npm create vite@latest grid-test -- --template react-ts
  npm install react-grid-layout
  ```

- [ ] **Build minimal grid**
  - 3 cards: "Notes", "Timer", "Counter"
  - Drag to reorder
  - Save layout to localStorage
  - Measure: Bundle size, performance

- [ ] **Document findings**
  - File: `docs/04_technical/spikes/react-grid-layout-test.md`
  - Kết quả: Có dùng được không? Bundle size? Bugs?

**Success Metric:** Prototype chạy được, có document kết quả

---

## 📊 PROGRESS TRACKING

### **Monday (13/11):**
- [x] ✅ Pivot decision: Dừng Task Polish, focus Platform
- [x] ✅ Update ROADMAP.md, FEATURES.md, AI_PROMPTS.md
- [ ] 🚀 Start research: react-grid-layout docs (1h)
- [ ] 🚀 Start sketching Dashboard Grid wireframes (1h)

### **Tuesday (14/11):**
- [ ] Research: @monaco-editor/react vs Sandpack (2h)
- [ ] Continue wireframes: AppMiniCard sizes (1h)
- [ ] Start writing ADR-001 (1h)

### **Wednesday (15/11):**
- [ ] Finish ADR-001 draft (2h)
- [ ] Digital wireframes in Figma/Excalidraw (2h)

### **Thursday (16/11):**
- [ ] Review ADR-001 for security issues (1h)
- [ ] Annotate wireframes with behaviors (1h)
- [ ] (Optional) Start technical spike prototype (2h)

### **Friday (17/11):**
- [ ] Finalize all Week 0 deliverables
- [ ] (Optional) Continue technical spike
- [ ] Update `docs/01_status/NOW.md` with progress
- [ ] Plan Week 1: Ready to code Dashboard Grid?

### **Weekend (Optional):**
- [ ] Test react-grid-layout prototype thoroughly
- [ ] Research App Builder no-code patterns
- [ ] Review all Week 0 documents

---

## 🎯 WEEK 0 DELIVERABLES

**Bắt buộc phải có vào Chủ nhật (20/11):**

1. ✅ **ADR-001: App Mini System Architecture**
   - File: `docs/04_technical/architecture/decisions/ADR-001-app-mini-system.md`
   - Nội dung: Context, Decision, Consequences, Alternatives

2. ✅ **Dashboard Grid Wireframes**
   - Files: `UX-UI/wireframes/dashboard-grid-*.png`
   - Screens: Empty state, With apps, Dragging state

3. ✅ **Updated Documentation**
   - [x] ROADMAP.md ✅
   - [x] FEATURES.md ✅
   - [x] AI_PROMPTS.md ✅
   - [x] QUICKSTART_AI.md ✅
   - [x] THIS_WEEK.md ✅ (file này)

4. ⚠️ **Technical Spike Report (Optional)**
   - File: `docs/04_technical/spikes/react-grid-layout-test.md`
   - Nội dung: Test results, bundle size, performance

---

## 🚧 BLOCKERS / CHALLENGES

**Current Blockers:**

- [ ] Chưa quyết định: Client-side render hay Server-side execution cho App Minis?
- [ ] Chưa rõ: Security model (sandboxed iframe? Web Workers?)
- [ ] Chưa biết: `react-grid-layout` có đáp ứng được requirements không?

**If Blocked:**

1. Read related docs: `docs/04_technical/architecture/decisions.md`
2. Google: "react-grid-layout vs react-dnd", "sandboxing iframe security"
3. Ask ChatGPT/Claude with full context
4. If still stuck after 1 hour, document the blocker and move to next task

---

## 💡 IDEAS / NOTES

### **Random thoughts this week:**
- Có nên cho phép users upload custom JavaScript vào App Minis không? (Security risk!)
- Dashboard Grid nên persist layout ở đâu? (localStorage? database?)
- App Builder v0.1 nên đơn giản đến mức nào? (chỉ 3 components: Input, Button, Text?)

### **Questions to research:**
- `react-grid-layout` có support mobile responsive không?
- Sandpack có hỗ trợ custom libraries (như axios, date-fns) không?
- iframe sandbox có block được tất cả malicious code không?

---

## ✅ DEFINITION OF DONE (End of Week 0)

**Tuần này thành công nếu:**

- [x] ✅ Strategic pivot documented (ROADMAP.md updated)
- [ ] ✅ ADR-001 hoàn thiện và đã review security
- [ ] ✅ Dashboard Grid wireframes rõ ràng (3 screens)
- [ ] ✅ Hiểu rõ trade-offs của approach đã chọn
- [ ] ✅ Sẵn sàng để code Dashboard Grid vào Tuần 1 (21/11)

---

## 🔜 NEXT WEEK PREVIEW (Week 1: 21-27/11)

**Week 1: Dashboard Infrastructure**

**Mục tiêu:** Build Dashboard Grid component functional

**Deliverables:**
- [ ] Component: `DashboardGrid.tsx` (drag-drop grid)
- [ ] Component: `AppMiniCard.tsx` (card wrapper với resize/delete)
- [ ] Hook: `useGridLayout.ts` (persist layout to database)
- [ ] Page: `/dashboard` route functional
- [ ] Test: Can add/drag/resize/delete cards

**Prep for Next Week:**
- [ ] Review ADR-001 lần cuối
- [ ] Prepare dev environment: install react-grid-layout
- [ ] Create feature branch: `feature/dashboard-grid`
- [ ] Clear 20 hours in calendar for coding

---

## 📚 LEARNING RESOURCES

### **Must Read (Tuần 0):**
- [ ] `react-grid-layout` docs: https://github.com/react-grid-layout/react-grid-layout
- [ ] Sandpack docs: https://sandpack.codesandbox.io/
- [ ] OWASP XSS Prevention: https://cheatsheetseries.owasp.org/cheatsheets/XSS_Prevention_Cheat_Sheet.html

### **Optional (If Time):**
- [ ] Notion's dashboard system (reverse engineer cách họ làm)
- [ ] iOS home screen interaction patterns
- [ ] Retool/Budibase (no-code builder inspiration)

---

**Remember:**

- 🎨 **Week 0 = Design & Research** - KHÔNG code features mới
- 📐 **Wireframes trước, code sau** - Prevent wasted effort
- 🔒 **Security first** - App Minis có thể chạy user code, phải cẩn thận
- 📝 **Document decisions** - ADR giúp nhớ lý do chọn approach

**Tuần này là tuần nền móng - Làm chậm nhưng làm đúng! 💪**

---

**Last Updated:** 13 tháng 11, 2024
**Next Review:** Sunday, 20 tháng 11, 2024 (End of Week 0)
**Current Status:** 🚀 Week 0 - Architecture & Design Phase (Pivot to Platform)
