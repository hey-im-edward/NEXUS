# Kanban Demo Guide

Trang `/kanban-demo` cho phép đội ngũ kiểm tra nhanh trải nghiệm kéo thả trong Kanban Board. Các thao tác chính:

- Giữ biểu tượng `≡` để kéo một task.
- Thả vào cột mới để đổi trạng thái.
- Thả lại trong cùng cột để sắp xếp lại thứ tự.
- Nhấp vào một task để kích hoạt sự kiện xem chi tiết (hiện tại hiển thị bằng `alert`).

## Luồng dữ liệu

- Server component dùng `getOrCreateWorkspaceId()` để đảm bảo mỗi yêu cầu có `workspaceId` hợp lệ.
- Client component (`KanbanDemoClient`) nhận `workspaceId` và truyền xuống `KanbanBoard`.
- `KanbanBoard` sử dụng hooks Zustand để đồng bộ trạng thái và thực hiện optimistic update.

## Lưu ý mở rộng

- Khi triển khai modal chi tiết task, thay thế `alert` bằng UI hợp lệ.
- Nếu cần tài liệu hướng dẫn người dùng cuối, cân nhắc tái sử dụng nội dung này trong tài liệu onboarding.
