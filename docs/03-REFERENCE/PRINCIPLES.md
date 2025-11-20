# 🧭 NGUYÊN TẮC NEXUS - Triết Lý Phát Triển Cốt Lõi

**Nguồn chính:** [NEXUS_WHITEPAPER.md](../01-STRATEGY/NEXUS_WHITEPAPER.md)

**Cập nhật:** 17 tháng 11, 2025

**Version:** v3.0 (The Platform Pivot)

---

 > [!IMPORTANT]
> **NGUỒN CHUẨN (SOURCE OF TRUTH)** cho development principles và decision framework
>
> **Khi cập nhật file này:**
>
> 1. Cập nhật principles ở đây trước
> 2. Nếu có major change, cập nhật `PRIMING_PROMPT.md` Section V (summary)
> 3. KHÔNG duplicate principles chi tiết ở file khác - link về file này

---

## 📖 Tổng Quan

Tài liệu này nêu rõ các nguyên tắc cốt lõi dẫn dắt phát triển NEXUS. Đây không chỉ là guidelines - chúng là **các framework ra quyết định** giúp ta tập trung vào những gì quan trọng.

**Triết Lý Cốt Lõi:**

> "NEXUS là một Platform để xây dựng và chia sẻ apps, KHÔNG phải task manager với các tính năng thêm."

---

## 🎯 NGUYÊN TẮC #1: Platform Trước, Task Management Sau

### Niềm Tin Cốt Lõi (#1)

#### KHÔNG

Xây dựng task manager tốt nhất thế giới

#### MÀ LÀ

Xây dựng platform nơi users xây dựng và chia sẻ apps (bao gồm cả task managers)

### Ý Nghĩa (#1)

#### NÊN LÀM (DO)

- ✅ Ưu tiên các tính năng App Builder
- ✅ Ưu tiên các tính năng Marketplace
- ✅ Đo lường thành công bằng "Apps Được Xây Dựng và Chia Sẻ"
- ✅ Giữ Task Management ở mức "đủ tốt"

#### KHÔNG NÊN (DON'T)

- ❌ Thêm các tính năng task management nâng cao (tags, search, recurring, etc.)
- ❌ Polish Task Management quá mức MVP
- ❌ Cạnh tranh với Todoist/Notion về tính năng tasks
- ❌ Đo lường thành công bằng "Tasks Được Tạo"

### Khung Quyết Định (#1)

**Khi quyết định một tính năng, hãy hỏi:**

1. **Tính năng này có giúp users xây dựng apps không?** → Ưu tiên
2. **Tính năng này có giúp users khám phá/cài đặt apps không?** → Ưu tiên
3. **Tính năng này có cải thiện Task Management không?** → Backlog (trừ khi là critical bug)

### Các Ví Dụ (#1)

#### Ví dụ 1: User requests "Tags for Tasks"

- ❌ **DON'T:** Build tags system for tasks
- ✅ **DO:** Let users build a "Task Manager with Tags" app using App Builder

#### Ví dụ 2: User requests "App Templates"

- ✅ **DO:** Build app templates for App Builder
- ✅ **DO:** Pre-seed marketplace with 10+ templates

#### Ví dụ 3: User requests "Keyboard Shortcuts for Tasks"

- ❌ **DON'T:** Add keyboard shortcuts (nice-to-have)
- ✅ **DO:** Focus on App Builder UX (critical path)

---

## 🏗️ NGUYÊN TẮC #2: Chiến Lược Code Trước (Code First Strategy)

### Niềm Tin Cốt Lõi (#2)

#### KHÔNG

Thiết kế mọi thứ trước, rồi mới code

#### MÀ LÀ

Code trước, thiết kế trong quá trình làm

### Ý Nghĩa (#2)

#### NÊN LÀM (DO)

- ✅ Bắt đầu coding ASAP (Tuần 1, không phải Tuần 5)
- ✅ Gộp Tuần 0-4 vào Tuần 1-4
- ✅ Bỏ qua giai đoạn thiết kế chi tiết
- ✅ Iterate dựa trên code thực tế, không phải mockups

#### KHÔNG NÊN (DON'T)

- ❌ Dành hàng tuần cho Figma mockups
- ❌ Over-plan trước khi coding
- ❌ Trì hoãn coding cho đến khi "thiết kế hoàn hảo"

### Khung Quyết Định (#2)

**Khi quyết định cách tiếp cận, hãy hỏi:**

1. **Tôi có thể code ngay bây giờ không?** → Code ngay
2. **Tôi có cần thiết kế trước không?** → Chỉ khi phức tạp (ví dụ: multi-step flows)
3. **Điều này có đang block tôi khỏi coding không?** → Tìm workaround, tiếp tục coding

### Các Ví Dụ (#2)

#### Ví dụ 1: App Builder UI unclear

- ❌ **DON'T:** Spend 1 week on Figma mockups
- ✅ **DO:** Code basic UI, iterate based on usage

#### Ví dụ 2: Marketplace layout unclear

- ❌ **DON'T:** Design all possible layouts
- ✅ **DO:** Code grid layout, adjust based on real content

#### Ví dụ 3: Dashboard Grid unclear

- ✅ **DO:** Reference existing products (Notion, iOS Home Screen)
- ✅ **DO:** Code simple version, improve later

---

## 🚀 NGUYÊN TẮC #3: Ship Nhanh, Iterate Sau (Ship Fast, Iterate Later)

### Niềm Tin Cốt Lõi (#3)

#### KHÔNG

Ship các tính năng hoàn hảo một cách chậm chạp

#### MÀ LÀ

Ship các tính năng chưa hoàn hảo nhanh chóng, iterate dựa trên feedback

### Ý Nghĩa (#3)

#### NÊN LÀM (DO)

- ✅ Ship các tính năng MVP trong 1-2 ngày
- ✅ Nhận user feedback ngay lập tức
- ✅ Iterate dựa trên usage thực tế
- ✅ Fix bugs trong production

#### KHÔNG NÊN (DON'T)

- ❌ Cầu toàn trước khi shipping
- ❌ Chờ đợi xử lý tất cả edge cases
- ❌ Trì hoãn shipping để "polish"

### Khung Quyết Định (#3)

**Khi quyết định xem tính năng đã sẵn sàng chưa, hãy hỏi:**

1. **Nó có hoạt động cho happy path không?** → Ship ngay
2. **Nó có xử lý edge cases không?** → Ship, fix sau
3. **Nó có được polish không?** → Ship, polish sau

### Các Ví Dụ (#3)

#### Ví dụ 1: DashboardGrid has minor layout bug on mobile

- ✅ **DO:** Ship it, fix bug in next iteration
- ❌ **DON'T:** Hold release for perfect mobile behavior

#### Ví dụ 2: App Builder missing undo/redo

- ✅ **DO:** Ship without undo/redo (v0.1)
- ✅ **DO:** Add undo/redo in v0.2 if users complain

#### Ví dụ 3: Marketplace missing advanced search

- ✅ **DO:** Ship with basic search
- ✅ **DO:** Add advanced search later if needed

---

## 🎨 NGUYÊN TẮC #4: Giữ Đơn Giản, Giữ Nhàm Chán (Keep It Simple, Keep It Boring)

### Niềm Tin Cốt Lõi (#4)

#### KHÔNG

Sử dụng công nghệ mới nhất, tiên tiến nhất

#### MÀ LÀ

Sử dụng công nghệ nhàm chán, đã được chứng minh

### Ý Nghĩa (#4)

#### NÊN LÀM (DO)

- ✅ Sử dụng các libraries có tài liệu tốt (Next.js, React, Supabase)
- ✅ Sử dụng các patterns phổ biến (mọi người đều làm vậy)
- ✅ Chọn sự đơn giản hơn là sự thông minh
- ✅ Chọn nhàm chán hơn là thú vị

#### KHÔNG NÊN (DON'T)

- ❌ Sử dụng các libraries thử nghiệm (không có production usage)
- ❌ Sử dụng custom solutions (khi đã có library)
- ❌ Over-engineer (YAGNI - You Aren't Gonna Need It)
- ❌ Phát minh lại bánh xe

### Khung Quyết Định (#4)

**Khi chọn công nghệ, hãy hỏi:**

1. **Nó có được document tốt không?** → Sử dụng nó
2. **Hàng triệu developers có đang dùng không?** → Sử dụng nó
3. **Nó có phải cutting-edge/experimental không?** → Tránh nó
4. **AI có thể generate code cho nó không?** → Ưu tiên nó

### Các Ví Dụ (#4)

#### Ví dụ 1: State Management

- ✅ **DO:** Use Zustand (simple, boring, proven)
- ❌ **DON'T:** Use MobX (less popular, steeper learning curve)

#### Ví dụ 2: Styling

- ✅ **DO:** Use TailwindCSS (utility-first, boring, AI-friendly)
- ❌ **DON'T:** Use styled-components (more boilerplate)

#### Ví dụ 3: Backend

- ✅ **DO:** Use Supabase (BaaS, no backend code needed)
- ❌ **DON'T:** Build custom NestJS backend (overkill for MVP)

#### Ví dụ 4: App Builder Framework (Bài học rút ra)

- ❌ **KHÔNG NÊN:** Sử dụng Craft.js v0.2.12 (không tương thích React 19, cập nhật lần cuối 2+ năm trước)
- ✅ **NÊN:** Sử dụng @dnd-kit (được bảo trì tích cực, đã verify hỗ trợ React 19)

**Bài học:** Luôn kiểm tra ngày cập nhật và khả năng tương thích React version của library trước khi commit. React 19 mới ra (Oct 2025), nhiều libraries chưa cập nhật. Chọn libraries có:

- Cập nhật lần cuối trong vòng 6 tháng
- Explicit React 19 support trong docs
- Active maintenance (GitHub commits, issue responses)
- Large user base cho community support

**Kết quả:** Đầu tư vào @dnd-kit đã xứng đáng - hoạt động hoàn hảo với React 19, sử dụng thành công trong cả KanbanBoard lẫn App Builder.

---

## 🔒 NGUYÊN TẮC #5: Bảo Mật Trước Tiên, Luôn Luôn (Security First, Always)

### Niềm Tin Cốt Lõi (#5)

#### KHÔNG

Ship nhanh, fix security sau

#### MÀ LÀ

Ship nhanh với security đã được tích hợp sẵn

### Ý Nghĩa (#5)

#### NÊN LÀM (DO)

- ✅ Sử dụng Row Level Security (RLS) cho tất cả tables
- ✅ Validate tất cả inputs (client + server)
- ✅ Không bao giờ tin tưởng user data
- ✅ Sử dụng parameterized queries (không SQL injection)
- ✅ Sử dụng HTTPS mọi nơi (tự động qua Vercel)

#### KHÔNG NÊN (DON'T)

- ❌ Ship mà không có RLS policies
- ❌ Chỉ tin tưởng client-side validation
- ❌ Lưu sensitive data trong localStorage
- ❌ Expose API keys trong frontend code

### Khung Quyết Định (#5)

**Khi shipping một tính năng, hãy hỏi:**

1. **Table này có RLS policies chưa?** → Bắt buộc trước khi ship
2. **User input đã được validated chưa?** → Bắt buộc trước khi ship
3. **Điều này có thể bị exploit không?** → Fix trước khi ship

### Các Ví Dụ (#5)

#### Ví dụ 1: User Dashboard Layouts table

- ✅ **DO:** Add RLS policy: `auth.uid() = user_id`
- ❌ **DON'T:** Ship without RLS (users can see others' layouts)

#### Ví dụ 2: App Marketplace

- ✅ **DO:** Validate app definition JSON (schema validation)
- ❌ **DON'T:** Allow arbitrary JSON (XSS risk)

#### Ví dụ 3: User Authentication

- ✅ **DO:** Use Supabase Auth (built-in security)
- ❌ **DON'T:** Build custom auth (security nightmare)

---

## 📊 NGUYÊN TẮC #6: Đo Lường Những Gì Quan Trọng (Measure What Matters)

### Niềm Tin Cốt Lõi (#6)

#### KHÔNG

Đo lường các vanity metrics

#### MÀ LÀ

Đo lường North Star Metric

### Ý Nghĩa (#6)

**North Star Metric (Chỉ Số Ngôi Sao Bắc Đẩu):**

> **"Bao nhiêu apps được xây dựng và chia sẻ?"**
>
> Công thức: (Apps Được Xây Dựng bởi Users) × (Số Lượt Cài Đặt Trung Bình mỗi App)

#### NÊN LÀM (DO)

- ✅ Theo dõi apps được tạo ra
- ✅ Theo dõi apps được cài đặt từ marketplace
- ✅ Theo dõi active users (đang dùng 3+ apps)
- ✅ Theo dõi hoạt động marketplace

#### KHÔNG NÊN (DON'T)

- ❌ Theo dõi tasks được tạo (sai metric)
- ❌ Theo dõi page views (vanity metric)
- ❌ Chỉ theo dõi sign-ups (không có engagement)

### Khung Quyết Định (#6)

**Khi đo lường thành công, hãy hỏi:**

1. **Metric này có align với Platform vision không?** → Theo dõi nó
2. **Metric này có đo lường Task Management không?** → Không ưu tiên
3. **Đây có phải vanity metric không?** → Bỏ qua nó

### Các Ví Dụ (#6)

#### Ví dụ 1: User creates 100 tasks

- ❌ **NOT SUCCESS:** Tasks created (wrong metric)
- ✅ **SUCCESS IF:** User built custom Task Manager app + published

#### Ví dụ 2: User signs up

- ❌ **NOT SUCCESS:** Sign-up alone (no engagement)
- ✅ **SUCCESS IF:** User installs 3+ apps, builds 1+ app

#### Ví dụ 3: Marketplace has 100 page views

- ❌ **NOT SUCCESS:** Page views (vanity metric)
- ✅ **SUCCESS IF:** 50 apps installed, 10 apps published

---

## 🧪 NGUYÊN TẮC #7: Validate Sớm, Pivot Nhanh (Validate Early, Pivot Fast)

### Niềm Tin Cốt Lõi (#7)

#### KHÔNG

Cam kết với kế hoạch, thực hiện mù quáng

#### MÀ LÀ

Validate các giả thuyết, pivot nếu sai

### Ý Nghĩa (#7)

#### NÊN LÀM (DO)

- ✅ Đặt GO/NO-GO criteria (Tuần 9)
- ✅ Đo lường metrics hàng tuần
- ✅ Sẵn sàng pivot (Tuần 9-12)
- ✅ Shutdown một cách duyên dáng nếu NO-GO

#### KHÔNG NÊN (DON'T)

- ❌ Cam kết với roadmap một cách mù quáng
- ❌ Bỏ qua các tín hiệu tiêu cực
- ❌ Tiếp tục xây dựng nếu users không quan tâm

### Khung Quyết Định (#7)

**Tại Tuần 9, đánh giá GO/NO-GO:**

**GO Criteria (Tiêu Chí Tiếp Tục) - cần 2 trong 3:**

1. ✅ **Apps Created (Apps Được Tạo):** 10+ users đã xây dựng custom apps
2. ✅ **Marketplace Activity (Hoạt Động Marketplace):** 30+ lượt cài đặt
3. ✅ **Engagement (Tương Tác):** 5+ users đang tích cực sử dụng 3+ apps

**Nếu GO (Tiếp Tục):**

- Tiếp tục với Low-Code features (Tuần 10-12)
- Chuẩn bị cho public launch

**Nếu NO-GO (Dừng Lại):**

- Phân tích tại sao (user interviews, data)
- Pivot options:
  - Đơn giản hóa thành template marketplace (không có builder)
  - Tập trung vào vertical cụ thể (CRM, Finance)
  - Shutdown một cách duyên dáng

### Các Ví Dụ (#7)

#### Ví dụ 1: Week 8 - Only 2 users built apps

- ⚠️ **WARNING:** Not hitting target (10+ users)
- ✅ **ACTION:** Investigate why, iterate on App Builder UX

#### Ví dụ 2: Week 9 - Only 1 of 3 GO criteria met

- ❌ **NO-GO:** Pivot or shutdown
- ✅ **ACTION:** User interviews, analyze root cause

#### Ví dụ 3: Week 9 - All 3 GO criteria met

- ✅ **GO:** Continue to Low-Code tier
- ✅ **ACTION:** Expand beta to 100 users, prepare launch

---

## 🎯 NGUYÊN TẮC #8: Tiết Lộ Dần Dần (Progressive Disclosure) - 3-Tier Builder

### Niềm Tin Cốt Lõi (#8)

#### KHÔNG

Hiển thị tất cả features ngay từ đầu (làm users overwhelm)

#### MÀ LÀ

Tiết lộ dần dần (progressive disclosure) - lộ diện độ phức tạp từ từ

### Ý Nghĩa (#8)

**3-Tier Builder (Builder 3 Cấp Độ):**

**Tier 1: No-Code (Tuần 1-4 MVP)**

- 5 components (TextBlock, Button, Input, Container, List)
- 3 actions (Append to List, Clear Input, Show/Hide)
- KHÔNG có conditional logic, KHÔNG có database, KHÔNG có custom styling

**Tier 2: Low-Code (Tuần 10-12 nếu GO)**

- 15 components
- Conditional logic (IF/THEN)
- Database integration (Supabase tables)
- Form validation

**Tier 3: Pro-Code (Tương Lai)**

- Custom React components
- API integrations (Zapier, webhooks)
- Custom JavaScript logic

#### NÊN LÀM (DO)

- ✅ Bắt đầu với No-Code (đơn giản nhất)
- ✅ Chỉ thêm độ phức tạp nếu users cần
- ✅ Ẩn advanced features phía sau tab "Advanced"

#### KHÔNG NÊN (DON'T)

- ❌ Hiển thị tất cả features trong v0.1
- ❌ Làm choáng ngợp users với quá nhiều options

### Khung Quyết Định (#8)

**Khi thêm một feature, hãy hỏi:**

1. **Feature này có cần cho No-Code tier không?** → Thêm vào v0.1
2. **Feature này có cần cho Low-Code tier không?** → Thêm vào v0.2 (nếu GO)
3. **Đây có phải advanced/niche không?** → Thêm vào v0.3+ (tương lai)

### Các Ví Dụ (#8)

#### Ví dụ 1: User requests "Custom JavaScript in App"

- ❌ **DON'T:** Add to No-Code tier (too complex)
- ✅ **DO:** Backlog for Tier 3 (Pro-Code)

#### Ví dụ 2: User requests "IF/THEN workflows"

- ❌ **DON'T:** Add to No-Code tier (complexity)
- ✅ **DO:** Add to Tier 2 (Low-Code, if GO)

#### Ví dụ 3: User requests "More components"

- ✅ **DO:** Add simple components to No-Code (e.g., Image)
- ❌ **DON'T:** Add complex components (e.g., Chart) yet

---

## 💬 NGUYÊN TẮC #9: Giữ Lại, Đừng Polish (Keep It, Don't Polish It) - Task Management

### Niềm Tin Cốt Lõi (#9)

#### KHÔNG

Xây dựng task manager tốt nhất

#### MÀ LÀ

Xây dựng task manager "đủ tốt", tập trung vào Platform

### Ý Nghĩa (#9)

**GIỮ LẠI (KEEP) - Đủ Tốt (Good Enough):**

- ✅ CRUD for tasks (Create, Read, Update, Complete, Prioritize)
- ✅ Kanban Board (Today, Inbox, Backlog)
- ✅ Filters (Today, Inbox)
- ✅ Priority levels (High, Medium, Low)

**ĐỪNG THÊM (DON'T ADD) - Backlog Mãi Mãi:**

- 🔄 Tags, advanced filters, search
- 🔄 Task detail modal
- 🔄 Delete task functionality
- 🔄 Keyboard shortcuts
- 🔄 Recurring tasks
- 🔄 Calendar view
- 🔄 Task dependencies
- 🔄 Time tracking

### Tại Sao? (#9)

1. **Platform features là điểm khác biệt** (App Builder + Marketplace)
2. **Task management là commodity** (Todoist, Notion đã tồn tại)
3. **Thời gian có hạn** (12 tuần)
4. **Tập trung vào North Star Metric** ("Apps Được Xây Dựng và Chia Sẻ")

### Thông Điệp Cho Users (#9)

> "Task manager của chúng tôi đơn giản theo thiết kế. Sử dụng nó để theo dõi công việc xây dựng apps của bạn. Nếu bạn cần quản lý task nâng cao, hãy tiếp tục sử dụng Todoist hoặc Notion bên cạnh NEXUS."

---

## 🤖 NGUYÊN TẮC #10: Phát Triển AI-First (AI-First Development)

### Niềm Tin Cốt Lõi (#10)

#### KHÔNG

Viết tất cả code thủ công

#### MÀ LÀ

Sử dụng AI để tăng tốc phát triển

### Ý Nghĩa (#10)

#### NÊN LÀM (DO)

- ✅ Sử dụng tech stack thân thiện với AI (Next.js, React, Supabase)
- ✅ Sử dụng các libraries có tài liệu tốt (AI đã thấy examples)
- ✅ Sử dụng Claude/GPT cho code generation
- ✅ Sử dụng các patterns phổ biến (AI biết chúng)
- ✅ Viết prompts rõ ràng cho AI

#### KHÔNG NÊN (DON'T)

- ❌ Sử dụng obscure libraries (AI chưa thấy)
- ❌ Sử dụng custom solutions (AI không thể generate)
- ❌ Viết mọi thứ từ đầu

### Khung Quyết Định (#10)

**Khi chọn cách tiếp cận, hãy hỏi:**

1. **AI có thể generate cái này không?** → Ưu tiên nó
2. **Cái này có được document tốt không?** → AI có thể giúp
3. **Cái này có phải custom/obscure không?** → Tránh nó

### Các Ví Dụ (#10)

#### Ví dụ 1: Building Dashboard Grid

- ✅ **DO:** Use `react-grid-layout` (AI knows it, 20K stars)
- ❌ **DON'T:** Build custom grid from scratch

#### Ví dụ 2: Building Form Validation

- ✅ **DO:** Use React Hook Form (AI knows it)
- ❌ **DON'T:** Build custom validation library

#### Ví dụ 3: Database Queries

- ✅ **DO:** Use Supabase SDK (AI can generate)
- ❌ **DON'T:** Write raw SQL (error-prone)

---

## 📝 NGUYÊN TẮC #11: Document Quyết Định, Không Phải Code (Document Decisions, Not Code)

### Niềm Tin Cốt Lõi (#11)

#### KHÔNG

Viết code comments cho mọi thứ

#### MÀ LÀ

Document các quyết định cấp cao, không phải low-level code

### Ý Nghĩa (#11)

#### NÊN LÀM (DO)

- ✅ Document TẠI SAO (WHY - lý do quyết định)
- ✅ Document CÁI GÌ (WHAT - yêu cầu feature)
- ✅ Document NHƯ THẾ NÀO (HOW - kiến trúc, không phải code)
- ✅ Cập nhật docs khi quyết định thay đổi

#### KHÔNG NÊN (DON'T)

- ❌ Viết code comments cho code hiển nhiên
- ❌ Document implementation details (code tự giải thích)
- ❌ Viết docs mà sẽ trở nên outdated

### Khung Quyết Định (#11)

**Khi documenting, hãy hỏi:**

1. **Đây có phải quyết định cấp cao không?** → Document nó
2. **Điều này có hiển nhiên từ code không?** → Bỏ qua
3. **Tương lai tôi có quên tại sao không?** → Document nó

### Các Ví Dụ (#11)

#### Ví dụ 1: Why Zustand instead of Redux?

- ✅ **DO:** Document in [TECH_STACK.md](TECH_STACK.md)
- **Reason:** Simpler, smaller bundle, TypeScript-first

#### Ví dụ 2: Why 12 columns for grid?

- ✅ **DO:** Document in [ROADMAP.md](../02-EXECUTION/ROADMAP.md)
- **Reason:** Standard for responsive grids

#### Ví dụ 3: How to use Zustand?

- ❌ **DON'T:** Write detailed usage guide
- ✅ **DO:** Link to official docs

---

## ✅ NGUYÊN TẮC #12: Testing Trong Production (Testing in Production)

### Niềm Tin Cốt Lõi (#12)

#### KHÔNG

Viết unit tests cho mọi thứ trước khi shipping

#### MÀ LÀ

Ship lên production, fix bugs khi chúng xuất hiện

### Ý Nghĩa (#12)

#### NÊN LÀM (DO)

- ✅ Ship features lên production nhanh chóng
- ✅ Monitor errors (Sentry, logs)
- ✅ Fix critical bugs ngay lập tức
- ✅ Iterate dựa trên usage thực tế

#### KHÔNG NÊN (DON'T)

- ❌ Viết unit tests cho MVP (overkill)
- ❌ Viết E2E tests trước v1.0 (iteration chậm)
- ❌ Hold releases để có 100% test coverage

### Khung Quyết Định (#12)

**Khi quyết định testing strategy, hãy hỏi:**

1. **Đây có phải critical path không?** → Test thủ công, ship
2. **Đây có phải nice-to-have không?** → Ship, fix nếu break
3. **Đây có phải v1.0+ không?** → Cân nhắc automated tests

### Các Ví Dụ (#12)

#### Ví dụ 1: Dashboard Grid

- ✅ **DO:** Test manually, ship to production
- ❌ **DON'T:** Write unit tests for drag-drop logic

#### Ví dụ 2: App Builder

- ✅ **DO:** Test manually, ship to beta users
- ❌ **DON'T:** Write E2E tests before v1.0

#### Ví dụ 3: Payment Flow (Future)

- ✅ **DO:** Write tests (critical, high-risk)
- ✅ **DO:** Test in staging before production

---

## 🚦 Tóm Tắt Framework Ra Quyết Định (Decision Framework Summary)

**Khi đưa ra BẤT KỲ quyết định nào, hãy hỏi các câu hỏi sau theo thứ tự:**

1. **Điều này có align với nguyên tắc Platform First không?** (Nguyên Tắc #1)
2. **Tôi có thể code điều này ngay bây giờ không?** (Nguyên Tắc #2)
3. **Tôi có thể ship điều này nhanh không?** (Nguyên Tắc #3)
4. **Điều này có đơn giản và nhàm chán không?** (Nguyên Tắc #4)
5. **Điều này có an toàn không?** (Nguyên Tắc #5)
6. **Điều này có di chuyển North Star Metric không?** (Nguyên Tắc #6)
7. **Tôi có thể validate điều này sớm không?** (Nguyên Tắc #7)

**Nếu CÓ với hầu hết → LÀM NÓ**

**Nếu KHÔNG với hầu hết → ĐỪNG LÀM (hoặc backlog)**

---

## 📚 Tài Liệu Liên Quan

- **Strategy:** [NEXUS_WHITEPAPER.md](../01-STRATEGY/NEXUS_WHITEPAPER.md)
- **Execution:** [ROADMAP.md](../02-EXECUTION/ROADMAP.md)
- **Execution:** [AI_PROMPTS.md](../02-EXECUTION/AI_PROMPTS.md)
- **Reference:** [TECH_STACK.md](TECH_STACK.md)
- **Status:** [THIS_WEEK.md](../02-EXECUTION/status/THIS_WEEK.md)
- **Status:** [FEATURES.md](../02-EXECUTION/status/FEATURES.md)
- **Status:** [BUGS.md](../02-EXECUTION/status/BUGS.md)

---

## 🎯 TL;DR - 12 Nguyên Tắc

1. **Platform Trước, Task Management Sau** - Xây dựng platform, không phải task manager
2. **Chiến Lược Code Trước** - Code ngay, thiết kế sau
3. **Ship Nhanh, Iterate Sau** - Không hoàn hảo nhưng nhanh > hoàn hảo nhưng chậm
4. **Giữ Đơn Giản, Giữ Nhàm Chán** - Công nghệ đã chứng minh > cutting-edge
5. **Bảo Mật Trước Tiên, Luôn Luôn** - RLS, validation, không shortcuts
6. **Đo Lường Những Gì Quan Trọng** - Chỉ North Star Metric
7. **Validate Sớm, Pivot Nhanh** - GO/NO-GO tại Tuần 9
8. **Tiết Lộ Dần Dần** - Builder 3 cấp (No-Code → Low-Code → Pro-Code)
9. **Giữ Lại, Đừng Polish** - Task management giữ ở mức "đủ tốt"
10. **Phát Triển AI-First** - Sử dụng AI để tăng tốc
11. **Document Quyết Định, Không Phải Code** - TẠI SAO (WHY), không phải NHƯ THẾ NÀO (HOW)
12. **Testing Trong Production** - Ship nhanh, fix bugs trong prod

---

**Ghi Nhớ (Remember):** Các nguyên tắc này là frameworks ra quyết định. Khi nghi ngờ, hãy quay lại với chúng.

**Cập nhật lần cuối:** 17 tháng 11, 2025

**Owner:** NEXUS Development Team

**Version:** v3.0 (The Platform Pivot)

---

**"Xây dựng một platform, không phải một product. Ship nhanh, iterate nhanh. Đo lường những gì quan trọng."**
