# Project Brief
Mục tiêu:
- Xây dựng một nền tảng làm việc "all-in-one" (PoC) để giải quyết vấn đề "tool-sprawl".
- Cung cấp cốt lõi quản lý công việc (docs, tasks, goals) và khả năng tạo "app-mini" từ các block có sẵn.

Core Features (PoC):
- Auth (email, internal).
- Docs editor (rich text) với autosave.
- Tạo Task từ selection trong doc.
- Task Board (Kanban) với drag & drop.
- Goals (tạo, đính kèm, cập nhật tiến độ).
- App-mini Builder v0 (dùng predefined blocks, lưu manifest JSON).
- Internal Marketplace (submit, approve, install, rate).

Không làm (Non-goals):
- Public marketplace, thanh toán.
- Cho phép người dùng chạy code tự do (no user-generated code).
- SSO, offline sync.

Thành công khi (Go/No-Go Criteria):
- Time to first value (TTV) ≤ 10 phút.
- Success rate ≥ 70% (pilot nội bộ).
- Board latency ≤ 150 ms (local).
- Error rate < 1% cho các endpoint chính.