# PROMPT KHỞI ĐỘNG (PRIMING PROMPT) CHO DỰ ÁN NEXUS

Chào bạn, chúng ta sẽ làm việc trên dự án NEXUS. Đây là một bản tóm tắt ngữ cảnh để bạn bắt đầu. Hãy đọc kỹ và xác nhận đã hiểu trước khi chúng ta tiếp tục.

###### **1. TỔNG QUAN DỰ ÁN:**

- NEXUS là một "Productivity OS" giống Notion, được xây dựng cho SMEs và power users.
- Tầm nhìn: Cân bằng giữa tính năng mạnh mẽ (như ClickUp) và giao diện sạch đẹp, tốc độ nhanh (như Linear).
- Tập trung vào 3 mảng chính: Task Management (70%), Flexible Pages (20%), App Minis (10%).
- Tài liệu tổng quan đầy đủ có tại: `docs/00_start-here/README.md`.

###### **2. TECH STACK:**

- **Frontend:** Next.js 16 (App Router), React 19, TypeScript (Strict Mode), TailwindCSS 4.
- **Backend:** **Supabase** (PostgreSQL + Auth + RLS). **LƯU Ý QUAN TRỌNG: KHÔNG có backend server riêng (No NestJS/Express).** Mọi logic đều được xử lý ở frontend hoặc qua các policy của Supabase.
- **State Management:** Zustand + Immer (ưu tiên Optimistic Updates).
- **UI:** shadcn/ui.
- Tài liệu chi tiết về tech stack: `docs/00_start-here/TECH_STACK.md`.

###### **3. CẤU TRÚC DỰ ÁN:**

- Toàn bộ code ứng dụng nằm trong thư mục `frontend/`.
- Toàn bộ tài liệu nằm trong thư mục `docs/` với cấu trúc được đánh số.
- Cấu trúc chi tiết có tại: `docs/00_start-here/PROJECT_STRUCTURE.md`.

###### **4. CÁC NGUYÊN TẮC LÀM VIỆC BẮT BUỘC (QUAN TRỌNG):**

- **AI-Driven Workflow:** Luôn viết prompt chi tiết, test code do AI tạo, và cập nhật tài liệu tiến độ (`COMPLETED.md`, `FEATURES.md`).
- **Optimistic UI:** Ưu tiên cập nhật UI ngay lập tức, đồng bộ với Supabase sau, và có cơ chế rollback nếu lỗi.
- **TypeScript Strict Mode:** Không bao giờ sử dụng `any`. Luôn định nghĩa interface rõ ràng.
- **Mobile-First & Performance:** Thiết kế cho mobile trước, lazy load các component nặng, và giữ Lighthouse score > 90.
- **Git Workflow:** Tên nhánh (`feature/`, `fix/`) và commit message (`feat(scope): message`) phải tuân thủ quy ước.
- **Ngôn ngữ:** Tài liệu hướng người dùng và comment code phức tạp bằng Tiếng Việt. Commit message và tài liệu kỹ thuật bằng Tiếng Anh.
- Tài liệu đầy đủ về các nguyên tắc này có tại: `docs/02_ai-prompts/AI_PRINCIPLES.md`.

###### **5. KINH NGHIỆM VÀ B\*\***ÀI HỌC (NHẬT KÝ GỠ LỖI):\*\*

- Các kinh nghiệm xử lý lỗi khó trong quá khứ (ví dụ: lỗi RLS, lỗi `git mv`, lỗi optimistic update...) được ghi lại tại `docs/04_technical/TROUBLESHOOTING_LOG.md`. Hãy tham khảo file này để tránh lặp lại các sai lầm.

###### **6. NHIỆM VỤ HIỆN TẠI:**

- Để biết nhiệm vụ cụ thể chúng ta cần làm ngay bây giờ, hãy tham khảo file `docs/00_start-here/QUICKSTART_AI.md`.

---

##### **HÀNH ĐỘNG CỦA BẠN (AI):**

Bây giờ, hãy đọc nội dung của file `docs/00_start-here/QUICKSTART_AI.md` và cho tôi biết nhiệm vụ đầu tiên của chúng ta là gì.
