# 📋 Bước Tiếp Theo Sau Cleanup

> **Tạo:** November 9, 2025  
> **Mục đích:** Roadmap ngắn hạn sau khi cleanup docs xong

---

## ✅ ĐÃ HOÀN THÀNH

- [x] Phân tích 31 files markdown trong dự án
- [x] Xác định 1 file lỗi thời cần xóa
- [x] Xác định 4 files thiếu cần tạo
- [x] Tạo `cleanup-docs.sh` script (tự động hóa cleanup)
- [x] Tạo `DOCS_RESTRUCTURE_REPORT.md` (báo cáo chi tiết)
- [x] Tạo file này (roadmap tiếp theo)

---

## 🎯 HÀNH ĐỘNG NGAY (5 phút)

### **1. Chạy cleanup script**

```bash
# Từ thư mục root NEXUS
bash cleanup-docs.sh
```

**Kết quả mong đợi:**
```
✗ Removed:
  - .git-commit-template.md (outdated)

✓ Created:
  - LICENSE (MIT License)
  - CONTRIBUTING.md
  - .github/ISSUE_TEMPLATE/bug_report.md
  - .github/ISSUE_TEMPLATE/feature_request.md

Documentation structure is now clean and complete! ✨
```

---

### **2. Review files được tạo**

```bash
# Xem LICENSE
cat LICENSE

# Xem CONTRIBUTING.md (CẦN UPDATE EMAIL!)
cat CONTRIBUTING.md

# Xem bug report template
cat .github/ISSUE_TEMPLATE/bug_report.md

# Xem feature request template
cat .github/ISSUE_TEMPLATE/feature_request.md
```

---

### **3. Update email trong CONTRIBUTING.md**

**Tìm và thay thế:**
- `[your-email@example.com]` → Email thật của bạn

**Cách 1: Manual (VS Code)**
```bash
code CONTRIBUTING.md
# Ctrl+F → Find "[your-email@example.com]"
# Thay bằng email thật → Save
```

**Cách 2: Command line**
```bash
# Linux/Mac
sed -i 's/\[your-email@example.com\]/your.email@gmail.com/g' CONTRIBUTING.md

# Windows PowerShell
(Get-Content CONTRIBUTING.md) -replace '\[your-email@example.com\]', 'your.email@gmail.com' | Set-Content CONTRIBUTING.md
```

---

### **4. Commit changes**

```bash
# Add all changes
git add .

# Commit
git commit -m "docs: cleanup documentation and add missing files

- Remove: .git-commit-template.md (outdated)
- Add: LICENSE (MIT)
- Add: CONTRIBUTING.md
- Add: GitHub issue templates (bug report, feature request)
- Add: cleanup-docs.sh script
- Add: DOCS_RESTRUCTURE_REPORT.md
- Add: NEXT_STEPS_AFTER_CLEANUP.md

Documentation structure is now complete and follows best practices."

# Push (if needed)
git push origin docs/overhaul-documentation
```

---

## 📝 TUẦN NÀY (Week 0 - Optional)

### **5. Fix broken links (if any)**

**Check for broken links:**
```bash
# Install markdown-link-check (if not installed)
npm install -g markdown-link-check

# Check all markdown files
find . -name "*.md" -not -path "./node_modules/*" -not -path "./.git/*" | xargs markdown-link-check
```

**Fix broken links:**
- Update references trong các files
- Use relative links (không dùng absolute URLs)

---

### **6. Sync content consistency**

**Check và update:**
- [ ] `docs/01_status/FEATURES.md` - Phản ánh actual features?
- [ ] `docs/01_status/BUGS.md` - Có bugs mới chưa document?
- [ ] `docs/01_status/NOW.md` - Sync với `THIS_WEEK.md`?
- [ ] `docs/03_roadmap/PROJECT_STATUS.md` - Up-to-date?

**Action:**
```bash
# Đọc và so sánh
code docs/01_status/FEATURES.md
code docs/01_status/NOW.md
code THIS_WEEK.md

# Update nếu cần
```

---

### **7. Test GitHub issue templates**

**Trên GitHub:**
1. Go to Issues tab
2. Click "New issue"
3. Verify templates hiển thị:
   - Bug Report
   - Feature Request
4. Test fill form (draft, không submit)
5. Verify format OK

---

## 🔜 TUẦN SAU (Week 1-2 - If Time)

### **8. Create FAQ.md**

**Nội dung:**
- Q: What is NEXUS?
- Q: Why another productivity tool?
- Q: What's the tech stack?
- Q: How is this different from Notion/Asana/ClickUp?
- Q: Can I self-host?
- Q: Is this free?
- Q: When will X feature be available?

**Location:** `docs/00_start-here/FAQ.md`

---

### **9. Create TROUBLESHOOTING.md**

**Nội dung:** Tổng hợp từ `BUGS.md` + common issues
- Supabase connection errors
- TypeScript errors
- Build errors
- Runtime errors
- Deploy issues

**Location:** `docs/04_technical/TROUBLESHOOTING.md`

---

### **10. Add missing AI prompt templates**

**Review:**
- `docs/02_ai-prompts/AI_PROMPTS.md` - Prompts đã dùng
- `docs/02_ai-prompts/COMPLETED.md` - Prompts completed

**Create templates cho:**
- Database schema changes
- API endpoint creation (if needed)
- Component refactoring
- Performance optimization

**Location:** `docs/02_ai-prompts/templates/`

---

## 🎓 LONG-TERM (Week 4+)

### **11. Documentation automation**
- Auto-generate TypeScript docs
- Markdown linting (markdownlint)
- Link checking automation (CI/CD)

### **12. Video documentation**
- Quick start video (5 min)
- Feature demos
- Tutorial series

### **13. Internationalization**
- Dịch key docs sang English
- Keep Vietnamese as primary

---

## ❓ CÂU HỎI CHO BẠN

Sau khi cleanup xong, bạn muốn tôi làm gì tiếp theo?

**Option A: Fix & Polish (Recommended)**
- [ ] Fix broken links
- [ ] Create FAQ.md
- [ ] Create TROUBLESHOOTING.md
- [ ] Sync content consistency

**Option B: New Features (Week 0 focus)**
- [ ] Continue với Task Management Polish (theo THIS_WEEK.md)
- [ ] User interviews
- [ ] Feature development

**Option C: Both**
- [ ] Quick polish (1-2 giờ)
- [ ] Then focus on features

→ **Hãy cho tôi biết sau khi chạy `cleanup-docs.sh`!** 🚀

---

## 📞 CONTACT

Nếu có vấn đề khi chạy script:
1. Check error message
2. Review `DOCS_RESTRUCTURE_REPORT.md` section "Q&A"
3. Ask me với full error message

---

**Last Updated:** November 9, 2025  
**Status:** ⏳ Waiting for cleanup script execution
