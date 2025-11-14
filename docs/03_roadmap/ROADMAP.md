# 🗺️ ROADMAP - Lộ trình phát triển NEXUS

**Cập nhật lần cuối:** 13 tháng 11, 2024
**Trạng thái:** 🔄 ĐANG PIVOT SANG CHIẾN LƯỢC NỀN TẢNG

---

## 🎯 Quyết Định Chiến Lược: Từ Task Manager sang Platform

**QUYẾT ĐỊNH:** Dừng việc "đánh bóng" Task Management. Bắt đầu xây dựng yếu tố khác biệt.

**TẠI SAO?** Chúng ta có nguy cơ trở thành "một task manager nữa". Giá trị độc đáo của chúng ta là **App Mini Marketplace + No-Code Builder**.

**TRỌNG TÂM MỚI:** Chứng minh rằng chúng ta có thể xây dựng một nền tảng nơi người dùng tạo và chia sẻ mini-apps.

---

## 📊 Tổng quan Timeline 12 tuần

```
Tuần 0-4:  MVP Nền tảng                   [████░░░░░░░░] 10%
Tuần 5-8:  Validation & Thu thập feedback [░░░░░░░░░░░░]  0%
Tuần 9-12: Iteration hoặc Pivot           [░░░░░░░░░░░░]  0%
```

**Các mốc quan trọng:**
- ✅ **Tuần 0:** Đóng băng Task Management ở mức "đủ tốt"
- 🎯 **Tuần 4:** Người dùng đầu tiên có thể build một app đơn giản
- 🎯 **Tuần 8:** 5+ người dùng test App Builder
- 🎯 **Tuần 12:** Quyết định GO/NO-GO

---

## 🚀 Giai đoạn 1: MVP Nền tảng (Tuần 0-4)

### **Tuần 0 (13-20/11): Đóng Băng Chiến Lược**

**DỪNG LÀM:**
- ❌ Không đánh bóng Task Management nữa (Tags, Modal, Delete, Shortcuts → Backlog)
- ❌ Không cạnh tranh feature với Todoist/ClickUp
- ❌ Không mắc hội chứng "thêm một tính năng nữa thôi"

**GIỮ NGUYÊN CÁI ĐÃ CÓ:**
- ✅ CRUD cơ bản cho task (Thêm, Sửa, Hoàn thành, Ưu tiên)
- ✅ Kanban Board
- ✅ Bộ lọc Today/Inbox
- ✅ Google OAuth + Database v2

**BẮT ĐẦU LÀM:**
- 📐 Thiết kế hệ thống Dashboard Grid
- 📝 Viết tài liệu kiến trúc App Mini
- 🧪 Nghiên cứu: React Grid Layout, Sandpack, hoặc iframe approach

**Deliverables:**
- [ ] Architecture Decision Record (ADR) cho hệ thống App Mini
- [ ] Wireframes cho Dashboard Grid (Figma hoặc mockup đơn giản)
- [ ] Technical spike: Test thư viện drag-and-drop grid

**Tiêu chí thành công:**
- Quyết định rõ ràng về công nghệ grid (react-grid-layout vs. tự làm)
- Wireframe hiển thị 3-4 mini apps trên dashboard
- Team thống nhất về chiến lược pivot

---

### **Tuần 1 (21-27/11): Dashboard Grid & App Container**

**Mục tiêu:** Xây dựng "vỏ" chứa các App Minis.

**Deliverables:**
- [ ] Component `Dashboard` với grid kéo thả được
- [ ] Component wrapper `AppMiniCard` (resize, di chuyển, đóng)
- [ ] Lưu trạng thái grid vào Supabase
- [ ] Grid responsive (mobile: xếp dọc, desktop: tự do)

**Tech Stack:**
- `react-grid-layout` để drag-and-drop
- Tailwind cho styling
- Bảng `user_dashboard_layouts` trong Supabase

**Tiêu chí thành công:**
- Người dùng có thể thêm/xóa/resize cards trên dashboard
- Layout được lưu và khôi phục sau khi reload
- Grid hoạt động tốt trên mobile (xếp dọc)

**Files cần tạo:**
```
frontend/app/dashboard/page.tsx
frontend/components/dashboard/DashboardGrid.tsx
frontend/components/dashboard/AppMiniCard.tsx
backend/supabase/migrations/003_dashboard_layouts.sql
```

---

### **Tuần 2 (28/11 - 4/12): 2 Mini Apps Đầu Tiên**

**Mục tiêu:** Chứng minh concept với các apps cực kỳ đơn giản.

**App Mini #1: Ghi Chú Nhanh**
- Text input + hiển thị
- Lưu vào localStorage (chưa cần database)
- Tối đa 50 dòng code

**App Mini #2: Đồng Hồ Pomodoro**
- Đếm ngược 25 phút
- Nút Start/Pause/Reset
- Browser notification khi hết giờ

**Deliverables:**
- [ ] Component `QuickNotesApp.tsx`
- [ ] Component `PomodoroApp.tsx`
- [ ] Hệ thống app registry (danh sách hard-coded)
- [ ] Nút "Thêm App" trên Dashboard

**Tiêu chí thành công:**
- Người dùng có thể thêm Notes và Pomodoro vào dashboard
- Apps hoạt động độc lập trong cards của chúng
- State được lưu trong session (localStorage OK)

**Files cần tạo:**
```
frontend/components/app-minis/QuickNotesApp.tsx
frontend/components/app-minis/PomodoroApp.tsx
frontend/lib/app-registry.ts
```

---

### **Tuần 3-4 (5-18/12): App Builder v0.1**

**Mục tiêu:** Người dùng có thể build một app đơn giản KHÔNG CẦN CODE.

**Phạm vi (Builder Tối Thiểu):**
- Drag-and-drop **chỉ 3 components:**
  1. Text Input
  2. Button
  3. Text Block (hiển thị text)
- Canvas để sắp xếp components
- Nút "Publish to My Dashboard"

**KHÔNG LÀM (lúc này):**
- ❌ Không có logic điều kiện
- ❌ Không tích hợp database
- ❌ Không custom styling
- ❌ Không chia sẻ lên marketplace

**Deliverables:**
- [ ] Trang `AppBuilder` (`/app-builder`)
- [ ] Component palette (3 components)
- [ ] Canvas drag-and-drop
- [ ] JSON schema để lưu định nghĩa app
- [ ] Runtime renderer (render app từ JSON)

**Tiêu chí thành công:**
- Người dùng có thể tạo app "Guest Book" (text input → button → display)
- App xuất hiện trên dashboard của họ
- Định nghĩa app được lưu vào bảng `user_apps`

**Files cần tạo:**
```
frontend/app/app-builder/page.tsx
frontend/components/app-builder/BuilderCanvas.tsx
frontend/components/app-builder/ComponentPalette.tsx
frontend/components/app-builder/AppRenderer.tsx
backend/supabase/migrations/004_user_apps.sql
```

**Nghiên cứu kỹ thuật:**
- Craft.js, Grape.js, hay tự làm?
- JSON schema cho định nghĩa app
- Bảo mật: Làm sao sandbox user-generated apps?

---

## 🧪 Giai đoạn 2: Validation (Tuần 5-8)

### **Tuần 5-6 (19/12 - 1/1): Dogfooding + User Testing**

**Mục tiêu:** Có 5-10 người dùng test App Builder.

**Hoạt động:**
- [ ] Tuyển 5 bạn bè/đồng nghiệp để test
- [ ] Tạo tutorial onboarding ("Build app đầu tiên trong 5 phút")
- [ ] Setup form feedback (Typeform hoặc Tally)
- [ ] Phỏng vấn người dùng hàng tuần (30 phút mỗi người)

**Câu hỏi cần trả lời:**
1. Người dùng có hiểu concept App Builder không?
2. Họ có thể build app mà không bị mắc kẹt?
3. App đầu tiên họ muốn build là gì?
4. Họ có muốn chia sẻ apps với người khác không?

**Tiêu chí thành công:**
- 3+ người dùng build thành công một app
- Xác định 3 pain points lớn nhất
- Quyết định: "Nên thêm components?" hay "Nên làm marketplace?"

---

### **Tuần 7-8 (2-15/1): Iterate dựa trên Feedback**

**Option A:** Người dùng thích → Thêm 3 components nữa (Image, List, Form)
**Option B:** Người dùng confused → Đơn giản hóa UI, thêm video hướng dẫn
**Option C:** Người dùng hỏi "Có thể share không?" → Ưu tiên Marketplace v0.1

**Deliverables:** Phụ thuộc vào feedback (giữ linh hoạt!)

---

## 🔄 Giai đoạn 3: Điểm Quyết Định (Tuần 9-12)

### **Tuần 9-10 (16-29/1): Build dựa trên Data**

**Nếu feedback tích cực:**
- Build Marketplace v0.1 (browse + install apps)
- Thêm 5 builder components nữa
- Cải thiện bảo mật (iframe sandboxing)

**Nếu feedback lanhl nhạt:**
- Quay lại polish Task Management
- Hoặc: Pivot sang tính năng độc đáo khác (Pages, AI assistant, v.v.)

---

### **Tuần 11-12 (30/1 - 12/2): Quyết Định GO / NO-GO**

**Tiêu chí GO (Tiếp tục làm Platform):**
- ✅ 20+ signups
- ✅ 5+ người dùng đã build app với App Builder
- ✅ Ít nhất 1 người dùng hỏi "Khi nào có thể share app?"
- ✅ NPS > 30 cho tính năng App Builder

**Tiêu chí NO-GO (Pivot hoặc Dừng):**
- ❌ Người dùng không hiểu App Builder
- ❌ Không ai build app ngoài tutorial
- ❌ Feedback: "Làm task manager tốt hơn đi"

**Quyết định:**
- **GO:** Huy động vốn pre-seed, thuê 1 developer, build thêm 6 tháng
- **NO-GO:** Đóng dự án hoặc pivot sang tính năng khác

---

## 📈 Chỉ Số Thành Công

| Chỉ số | Tuần 4 | Tuần 8 | Tuần 12 |
|--------|--------|--------|---------|
| **Signups** | 5 | 15 | 30 |
| **Apps đã Build** | 2 (do chúng ta) | 5 (do users) | 15 |
| **Active Users** | 3 | 7 | 12 |
| **App Builder NPS** | N/A | > 20 | > 30 |
| **Yêu cầu "Share"** | 0 | 1 | 3+ |

---

## 🎯 Task Management "Đủ Tốt" Là Như Thế Nào?

Chúng ta **KHÔNG** cạnh tranh với Todoist. Chúng ta đang xây dựng một nền tảng mà **tình cờ có** task management.

**Giữ các tính năng này:**
- ✅ Thêm/Sửa/Hoàn thành tasks
- ✅ Kanban board
- ✅ Bộ lọc Today/Inbox
- ✅ Set priority
- ✅ Subtasks cơ bản (nếu < 2 giờ để làm)

**Cho vào Backlog:**
- 🔄 Tags, filters, search
- 🔄 Task detail modal
- 🔄 Delete task (cứ ẩn đi)
- 🔄 Keyboard shortcuts
- 🔄 Recurring tasks
- 🔄 Calendar view

**Thông điệp cho người dùng:** "Task manager của chúng tôi đơn giản theo thiết kế. Dùng nó để track việc build apps. Nếu cần task management nâng cao, hãy dùng Todoist song song với NEXUS."

---

## 🧭 North Star Metric

**Không phải:** "Bao nhiêu tasks người dùng tạo?"
**Mà là:** "Bao nhiêu apps người dùng build và share?"

Pivot này là về việc **chọn chiến trường**. Chúng ta thắng bằng cách là nhất trong App Building, không phải là task manager thứ 100.

---

**Bước tiếp theo:**
1. Đọc roadmap này mỗi ngày
2. Nói KHÔNG với các yêu cầu tính năng task management
3. Bắt đầu Tuần 1: Dashboard Grid

---

## 🔗 **TÀI LIỆU LIÊN QUAN**

- **Features:** [FEATURES.md](../01_status/FEATURES.md)
- **Ideas:** [IDEAS.md](./IDEAS.md)
- **History:** [HISTORY.md](./HISTORY.md)
- **Project Status (Legacy):** [PROJECT_STATUS.md](./PROJECT_STATUS.md)

---

**Cập nhật lần cuối:** 13 tháng 11, 2024
**Review tiếp theo:** 20 tháng 11, 2024 (Cuối Tuần 0)
