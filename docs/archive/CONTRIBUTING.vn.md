# Đóng góp cho NEXUS

[![English](https://img.shields.io/badge/lang-English-blue?style=flat-square)](../../CONTRIBUTING.md) [![Tiếng Việt](https://img.shields.io/badge/lang-Tiếng_Việt-red?style=flat-square)](./CONTRIBUTING.vn.md)

Cảm ơn bạn đã quan tâm đến việc đóng góp cho NEXUS! Chúng tôi chào đón mọi đóng góp từ tất cả mọi người.

## 🐛 Cách báo cáo Bug

1. **Kiểm tra issues hiện có** - Tìm kiếm trong [GitHub Issues](https://github.com/hey-im-edward/NEXUS/issues) xem bug đã được báo cáo chưa
2. **Tạo issue mới** - Nếu chưa có, [mở issue mới](https://github.com/hey-im-edward/NEXUS/issues/new)
3. **Cung cấp chi tiết:**
   - Mô tả rõ ràng về bug
   - Các bước để tái hiện
   - Kết quả mong đợi vs thực tế
   - Screenshots (nếu có)
   - Môi trường (trình duyệt, OS, thiết bị)

## 💡 Cách đề xuất tính năng

1. **Kiểm tra discussions hiện có** - Duyệt [GitHub Discussions](https://github.com/hey-im-edward/NEXUS/discussions)
2. **Bắt đầu discussion mới** - Giải thích ý tưởng và use case của bạn
3. **Đợi phản hồi** - Maintainers sẽ xem xét và thảo luận

## 💻 Cách đóng góp Code

### Yêu cầu

- Node.js 18+
- Git
- Tài khoản Supabase (cho các tính năng backend)

### Thiết lập môi trường phát triển

1. **Fork repository** - Click "Fork" trên GitHub

2. **Clone fork của bạn:**

   ```bash
   git clone https://github.com/YOUR_USERNAME/NEXUS.git
   cd NEXUS
   ```

3. **Tạo branch:**

   ```bash
   git checkout -b feature/ten-tinh-nang-cua-ban
   ```

4. **Cài đặt dependencies:**

   ```bash
   cd frontend
   npm install
   ```

5. **Thiết lập biến môi trường:**

   ```bash
   cp .env.example .env.local
   # Sửa .env.local với thông tin Supabase của bạn
   ```

6. **Khởi động development server:**
   ```bash
   npm run dev
   ```

### Thực hiện thay đổi

1. **Thực hiện thay đổi** - Chỉnh sửa code
2. **Test thay đổi** - Đảm bảo mọi thứ hoạt động
3. **Commit thay đổi:**
   ```bash
   git add .
   git commit -m "feat: thêm tính năng tuyệt vời"
   ```

### Định dạng Commit Message

Chúng tôi tuân theo [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` - Tính năng mới
- `fix:` - Sửa bug
- `docs:` - Thay đổi tài liệu
- `style:` - Thay đổi code style (formatting, etc.)
- `refactor:` - Refactoring code
- `test:` - Thêm tests
- `chore:` - Công việc bảo trì

**Ví dụ:**

```bash
git commit -m "feat: thêm drag-and-drop cho dashboard grid"
git commit -m "fix: sửa lỗi xóa task"
git commit -m "docs: cập nhật hướng dẫn cài đặt README"
```

### Gửi Pull Request

1. **Push lên fork của bạn:**

   ```bash
   git push origin feature/ten-tinh-nang-cua-ban
   ```

2. **Tạo Pull Request:**

   - Vào repository NEXUS gốc
   - Click "New Pull Request"
   - Chọn fork và branch của bạn
   - Điền vào PR template

3. **Đợi review:**
   - Maintainers sẽ review PR của bạn
   - Giải quyết các feedback
   - Khi được approve, nó sẽ được merge!

## 📖 Cách cải thiện Tài liệu

- Sửa lỗi chính tả hoặc giải thích chưa rõ
- Thêm ví dụ hoặc use cases
- Dịch tài liệu sang các ngôn ngữ khác
- Cập nhật thông tin đã lỗi thời

Documentation PRs rất được chào đón và đánh giá cao!

## ✨ Hướng dẫn Code Style

- **TypeScript:** Sử dụng strict mode, tránh `any` types
- **Formatting:** Prettier sẽ tự động format khi save
- **Naming:**
  - Components: PascalCase (`DashboardGrid.tsx`)
  - Functions: camelCase (`fetchTasks`)
  - Constants: UPPER_SNAKE_CASE (`MAX_TASKS`)
- **File structure:**
  ```
  components/
    feature-name/
      ComponentName.tsx
      index.ts
  ```

## 🤝 Quy tắc ứng xử

Hãy tôn trọng, hòa nhập, và hợp tác. Chúng ta đều ở đây để cùng xây dựng một thứ tuyệt vời.

## ❓ Câu hỏi?

Nếu bạn có câu hỏi:

- Tham gia [GitHub Discussions](https://github.com/hey-im-edward/NEXUS/discussions)
- Xem [Roadmap](./docs/02-EXECUTION/ROADMAP.md)
- Đọc [Tech Stack docs](./docs/03-REFERENCE/TECH_STACK.md)

---

**Cảm ơn bạn đã đóng góp cho NEXUS!** 🚀
