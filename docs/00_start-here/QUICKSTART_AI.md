# 🚀 QUICKSTART AI - Làm gì hôm nay?

> **Mục đích:** Trả lời câu hỏi "Hôm nay tôi code gì tiếp theo?" trong 10 giây.

**Cập nhật:** 8 tháng 11, 2025
**Làm việc với AI:** ChatGPT, Claude, GitHub Copilot

---

## ⚡ TL;DR - Đọc ngay

### ✅ **ĐÃ HOÀN THÀNH (Hôm nay - 9/11/2025)**

- ✅ **Database v2** - Deployed (11 tables)
- ✅ **Authentication** - Google OAuth working
- ✅ **Task Management Basic** - Add, display, complete tasks
- ✅ **Kanban Board** - 100% hoàn thành (Prompt 1)
- ✅ **/today page** - My Day view functional
- ✅ **/inbox page** - Inbox view functional
- ✅ **Edit Task Inline** - Double-click to edit (Prompt 1.1) ✅
- ✅ **Set Priority UI** - Colored badges + dropdown (Prompt 1.2) ✅

**Kết quả:** Ahead of schedule! 🎉 2 prompts done in 1 day!

---

## 🔥 **LÀM TIẾP HÔM NAY (10/11/2025)**

### **Prompt tiếp theo: 1.3 - Add Tags**

**File prompt:** `docs/02_ai-prompts/AI_PROMPTS.md` (Dòng 200-300)

**Yêu cầu:**

- Tag input với auto-suggest từ existing tags
- Colored pills display (#work, #personal, etc.)
- Many-to-many relationship (task_tags table)
- Click "x" to remove tag
- Color generation từ tag name (consistent hash)

**Thời gian ước tính:** 1-2 giờ (với AI)

**Test ở đâu:** http://localhost:3000/today

**Cách làm:**

```bash
1. Mở docs/02_ai-prompts/AI_PROMPTS.md
2. Copy Prompt 1.3 (Add Tags)
3. Paste vào ChatGPT/Claude
4. AI generate code → Copy vào VS Code
5. Test tại /today page
6. Fix bugs nếu có
7. ✅ Done → Mark completed trong docs/02_ai-prompts/COMPLETED.md
```

---

## 📋 **SAU ĐÓ - TUẦN NÀY (10-11/11)**

### **Chủ nhật (10/11):**

- [ ] **Sáng:** Prompt 1.3 - Add Tags (1-2h)
- [ ] **Chiều:** Prompt 1.4 - Task Detail Modal (2-3h)

### **Thứ 2 (11/11):**

- [ ] **Sáng:** Prompt 1.5 - Delete Task (1-2h)
- [ ] **Chiều:** Prompt 1.6 - Keyboard Shortcuts (2-3h)

**Mục tiêu cuối tuần:** Task Management 80% polished ✨

---

## 🎯 **ROADMAP - 3 TUẦN TỚI**

### **Week 0 (Tuần này - 7-13/11):**

- [x] Kanban Board 100% ✅
- [x] Edit Task Inline (Prompt 1.1) ✅
- [x] Set Priority UI (Prompt 1.2) ✅
- [ ] Task Management Polish 66%+ (4/6 prompts)
- [ ] 3-5 User Interviews

### **Week 1 (14-20/11):**

- [ ] Recurring Tasks (rrule integration)
- [ ] Calendar View (Time blocking)
- [ ] 5+ User Interviews

### **Week 2 (21-27/11):**

- [ ] Pages Integration (Tiptap rich text)
- [ ] Command Palette (Cmd+K)
- [ ] Mobile Responsive

**Xem chi tiết:** `docs/03_roadmap/ROADMAP.md`

---

## 📊 **TRẠNG THÁI DỰ ÁN**

### **Tính năng đã xong:**

```
✅ Database (11 tables)           100%
✅ Authentication (Google)        100%
✅ Task CRUD Basic                100%
✅ Kanban Board                   100%
✅ Edit Task Inline               100% ✅
✅ Set Priority UI                100% ← Vừa xong hôm nay!
⚠️ Task Management Polish          50% ← Đang làm tuần này
❌ Recurring Tasks                  0%
❌ Calendar View                    0%
❌ Pages (Tiptap)                   0%
```

**Xem chi tiết:** `docs/01_status/FEATURES.md`

---

## 🐛 **BUGS CẦN FIX (Nếu có thời gian)**

1. **Hardcoded workspace_id** (Priority: LOW)

   - File: `app/(productivity)/today/page.tsx`
   - Dòng: 15
   - Fix: Dùng user context thay vì hardcode

2. **No empty state images** (Priority: LOW)
3. **No loading skeletons** (Priority: LOW)

**Quyết định:** Chấp nhận bugs này cho POC, fix sau ✅

**Xem đầy đủ:** `docs/01_status/BUGS.md`

---

## 💡 **WORKFLOW VỚI AI**

### **Cách tôi làm việc hàng ngày:**

```
1. Mở QUICKSTART_AI.md (file này)
2. Xem "Làm tiếp hôm nay"
3. Mở file prompt trong docs/02_ai-prompts/
4. Copy prompt → Paste vào AI
5. AI generate code
6. Test → Fix bugs
7. ✅ Done → Update COMPLETED.md
8. Quay lại bước 1 ngày mai
```

### **Tips làm việc với AI:**

✅ **DO:**

- Luôn đọc prompt đầy đủ trước khi paste
- Test ngay sau khi AI generate code
- Document bugs ngay khi phát hiện
- Update COMPLETED.md sau khi xong

❌ **DON'T:**

- Paste prompt mà không hiểu context
- Generate nhiều feature cùng lúc
- Skip testing
- Quên update docs

---

## 📁 **FILE QUAN TRỌNG - ĐỌC THƯỜNG XUYÊN**

| File                               | Mục đích              | Tần suất đọc        |
| ---------------------------------- | --------------------- | ------------------- |
| **QUICKSTART_AI.md** (file này)    | Làm gì hôm nay?       | Mỗi sáng ☀️         |
| `docs/02_ai-prompts/AI_PROMPTS.md` | Prompts để code       | Mỗi ngày 📝         |
| `THIS_WEEK.md` (root)              | Focus tuần này        | Thứ 2 hàng tuần 📅  |
| `docs/01_status/FEATURES.md`       | Tính năng đã/chưa làm | Khi cần kiểm tra ✅ |
| `docs/03_roadmap/ROADMAP.md`       | Kế hoạch 12 tuần      | Mỗi tuần 🗓️         |

---

## 🆘 **GẶP VẤN ĐỀ?**

### **Lỗi thường gặp:**

**1. AI generate code lỗi syntax:**

```
→ Paste lại prompt + thêm context (file đang làm, tech stack)
→ Hoặc: "Fix this error: [paste error message]"
```

**2. Feature không hoạt động:**

```
→ Check browser console (F12)
→ Check Supabase logs
→ Test từng function riêng lẻ
→ Kiểm tra network timeout (offline rollback)
```

**3. Không biết làm gì tiếp:**

```
→ Đọc lại file này (QUICKSTART_AI.md)
→ Check THIS_WEEK.md
→ Xem docs/02_ai-prompts/AI_PROMPTS.md
```

**4. Muốn thêm feature mới không có trong prompts:**

```
→ Tạo prompt mới trong docs/02_ai-prompts/templates/
→ Follow template có sẵn
→ Test → Document → Update AI_PROMPTS.md
```

---

## 🎉 **CHECKLIST HÀNG NGÀY**

### **Mỗi sáng (9:00):**

- [x] Đọc QUICKSTART_AI.md (file này)
- [x] Check THIS_WEEK.md (cập nhật gì mới?)
- [x] Mở prompt cần làm tiếp
- [x] Chuẩn bị môi trường (VS Code + AI)

### **Khi code (10:00-16:00):**

- [x] Copy prompt → Paste AI
- [x] Generate code → Test
- [x] Fix bugs → Commit
- [x] Repeat

### **Mỗi tối (18:00):**

- [x] Update docs/02_ai-prompts/COMPLETED.md
- [x] Update docs/01_status/FEATURES.md (nếu xong feature)
- [x] Commit + Push code
- [x] Plan ngày mai (đọc prompt tiếp theo)

---

## 🚀 **BẮT ĐẦU NGAY!**

**Bước tiếp theo của bạn:**

1. ✅ Mở `docs/02_ai-prompts/AI_PROMPTS.md`
2. ✅ Tìm "Prompt 1.3 - Add Tags"
3. ✅ Copy prompt
4. ✅ Paste vào ChatGPT/Claude
5. ✅ Generate code
6. ✅ Test tại http://localhost:3000/today
7. ✅ Celebrate! 🎉

**Thời gian làm:** 1-2 giờ
**Kết quả:** Task management tốt hơn 20%

---

**Good luck! You got this! 💪**

---

**Last Updated:** November 9, 2025
**Next Update:** November 10, 2025 (sau khi xong Prompt 1.3 - Add Tags)
