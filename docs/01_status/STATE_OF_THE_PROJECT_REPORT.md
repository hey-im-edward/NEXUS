# Báo cáo Hiện trạng Dự án NEXUS

**Ngày tạo:** 9 tháng 11, 2025
**Mục đích:** Cung cấp thông tin chi tiết cho AI thiết kế về trạng thái hiện tại của dự án NEXUS.

---

## 1. Tóm tắt Dự án

- **Tên dự án:** **NEXUS - Productivity OS**
- **Tầm nhìn:** Xây dựng một công cụ quản lý năng suất "tất cả trong một", kết hợp **Task Management**, **Calendar**, và **Flexible Pages**. NEXUS hướng tới việc cân bằng giữa các tính năng mạnh mẽ và một giao diện người dùng sạch sẽ, trực quan.
- **Đối tượng người dùng chính:** Các doanh nghiệp vừa và nhỏ (SMEs) và những người dùng chuyên nghiệp (power users) đang tìm kiếm một giải pháp thay thế cho các công cụ quá đơn giản (như Todoist) hoặc quá phức tạp (như ClickUp, Jira).

---

## 2. Phân tích Tech Stack

Bản phân tích này dựa trên `package.json` và tài liệu `TECH_STACK.md`.

### Công nghệ chính

| Category       | Technology      | Version  | Ghi chú                                                    |
| :------------- | :-------------- | :------- | :--------------------------------------------------------- |
| **Framework**  | Next.js         | `16.0.1` | Sử dụng App Router, Server Components, và Turbopack.       |
| **UI Library** | React           | `19.2.0` | Nền tảng cho việc xây dựng component.                      |
| **Ngôn ngữ**   | TypeScript      | `5.x`    | Sử dụng ở chế độ `strict` để đảm bảo an toàn kiểu dữ liệu. |
| **Styling**    | Tailwind CSS    | `4.x`    | Framework CSS dạng utility-first.                          |
| **Components** | shadcn/ui       | Mới nhất | Bộ component được xây dựng trên Tailwind CSS và Radix UI.  |
| **Backend**    | Supabase        | `2.x`    | Backend-as-a-Service (BaaS).                               |
| **Database**   | PostgreSQL      | -        | Được cung cấp bởi Supabase.                                |
| **State Mgmt** | Zustand + Immer | `5.x`    | Giải pháp quản lý state đơn giản, thay thế cho Redux.      |

### Quyết định Kiến trúc Quan trọng

- **Kiến trúc "No Backend":** Dự án **không có một server backend riêng biệt** (như Node.js/Express). Thay vào đó, toàn bộ logic backend, xác thực, và tương tác database được xử lý trực tiếp từ frontend thông qua Supabase SDK.
- **Bảo mật ở tầng Database:** An ninh và phân quyền người dùng được thực thi bằng **Row Level Security (RLS)** của PostgreSQL, được cấu hình trong Supabase.
- **UI Components sở hữu bởi dự án:** Thay vì import từ một thư viện đóng gói, các component từ `shadcn/ui` được "copy" vào mã nguồn, cho phép tùy chỉnh hoàn toàn.
- **State Management với Optimistic UI:** Zustand được sử dụng để cập nhật giao diện người dùng ngay lập tức, trước khi nhận được phản hồi từ server, mang lại trải nghiệm người dùng nhanh và mượt mà.

---

## 3. Phân tích Cấu trúc Thư mục `frontend/`

Cấu trúc này được tối ưu cho Next.js App Router và việc tổ chức code theo tính năng.

### Cây thư mục quan trọng

```
frontend/
│
├── 📁 app/                       # Next.js App Router (Routes)
│   ├── 📁 (auth)/                # Nhóm route cho xác thực (vd: /login)
│   ├── 📁 (productivity)/        # Nhóm route chính của ứng dụng (có sidebar, header)
│   │   ├── layout.tsx            # Layout chung cho các trang năng suất
│   │   ├── today/
│   │   ├── inbox/
│   │   ├── projects/
│   │   │   └── [id]/
│   │   │       ├── page.tsx
│   │   │       └── board/        # Route cho Kanban board
│   │   ├── upcoming/
│   │   ├── calendar/
│   │   └── pages/
│   └── 📁 dashboard/
│
├── 📁 components/                # React Components (Tổ chức theo tính năng)
│   ├── 📁 tasks/                 # Components liên quan đến Task
│   ├── 📁 kanban/                # Components cho Kanban Board
│   ├── 📁 projects/              # Components cho Project
│   ├── 📁 calendar/              # Components cho Lịch
│   ├── 📁 pages/                 # Components cho Pages (Editor)
│   ├── 📁 dashboard/             # Components layout chính (Sidebar, Header)
│   ├── 📁 auth/                  # Components xác thực (Logout button)
│   └── 📁 ui/                    # Base components từ shadcn/ui (Button, Dialog, etc.)
│
├── 📁 lib/                       # Logic và các hàm tiện ích
│   ├── 📁 stores/                # Zustand stores (global state)
│   ├── 📁 hooks/                 # Custom React hooks
│   ├── 📁 supabase/              # Supabase clients (client & server)
│   └── 📁 utils/                 # Các hàm tiện ích chung
│
└── 📁 types/                     # Định nghĩa kiểu dữ liệu TypeScript
    ├── database.types.ts         # Types tự động sinh ra từ schema Supabase
    └── index.ts                  # Các types tự định nghĩa của ứng dụng
```

### Chức năng các thư mục chính

- `app/`: Định nghĩa các route của ứng dụng. Việc sử dụng "route groups" như `(auth)` và `(productivity)` cho phép chia sẻ layout giữa các trang liên quan mà không ảnh hưởng đến URL.
- `components/`: Chứa tất cả các React component, được nhóm theo tính năng (`tasks`, `kanban`, `projects`). Thư mục `ui` chứa các building block cơ bản được tái sử dụng trên toàn bộ ứng dụng.
- `lib/`: Tách biệt business logic khỏi tầng giao diện. `stores` quản lý state toàn cục, `hooks` chứa logic tái sử dụng, và `supabase` cấu hình kết nối đến backend.

---

## 4. Phân tích Tính năng

Dựa trên file `docs/01_status/FEATURES.md`.

### Các tính năng đã hoàn thiện (10/40)

- **Database & Auth:**
  - **Database Schema v2:** 11 bảng đã được thiết kế và triển khai trên Supabase.
  - **Xác thực Google OAuth:** Người dùng có thể đăng nhập bằng tài khoản Google.
- **Task Management (Cơ bản):**
  - **Thêm Task nhanh (Quick Add):** Input để nhập và thêm task mới.
  - **Hiển thị danh sách Task:** Xem danh sách các công việc.
  - **Hoàn thành Task (Checkbox):** Đánh dấu công việc đã hoàn thành hoặc chưa.
  - **Lọc Task cơ bản:** Các trang `/today` và `/inbox` đã hoạt động.
- **Projects & Kanban:**
  - **Kanban Board:** Kéo-thả công việc giữa các cột (TODO, IN PROGRESS, DONE).
  - **Trang danh sách Project:** Hiển thị tất cả các dự án.
  - **Chỉnh sửa Task Inline:** Double-click vào tiêu đề task để chỉnh sửa trực tiếp.
  - **Chọn độ ưu tiên Task:** Gán độ ưu tiên (Urgent, High, Medium, Low, None) cho task.

### Các tính năng đang phát triển (4/40)

Đây là các mục tiêu cho tuần hiện tại:

- **Thêm Tags vào Task:** Gán các nhãn (#work, #personal) cho công việc.
- **Task Detail Modal:** Một cửa sổ modal hiển thị chi tiết đầy đủ của một công việc.
- **Xóa Task:** Chức năng xóa công việc (kèm theo tùy chọn "Undo").
- **Phím tắt:** Điều hướng và thao tác bằng bàn phím (j/k, x, d, etc.).

### Các tính năng đã được lên kế hoạch (26/40)

- **Recurring Tasks:** Tạo các công việc lặp lại (hàng ngày, hàng tuần, tùy chỉnh).
- **Calendar View:** Giao diện lịch để xem công việc theo tháng/tuần/ngày và hỗ trợ time-blocking.
- **Pages (Giống Notion):** Trình soạn thảo văn bản đa phương tiện (Tiptap editor) để tạo các trang tài liệu linh hoạt.
- **Command Palette (Cmd+K):** Hộp lệnh để truy cập nhanh các chức năng.
- **App Minis:** Các ứng dụng nhỏ tích hợp như CRM, Habit Tracker, Pomodoro Timer.
- **Hoàn thiện & Tối ưu:** Loading skeletons, empty states, thông báo (toast), tối ưu cho di động, dark mode, và luồng onboarding.

---

## 5. Phân tích Các Component Giao diện Hiện có

Dưới đây là danh sách các component chính đã được xây dựng trong `frontend/components/`.

### `components/dashboard/`

- `productivity-sidebar.tsx`: Thanh điều hướng bên trái, chứa các link đến Today, Inbox, Projects, etc.
- `productivity-header.tsx`: Thanh header của ứng dụng, chứa breadcrumbs và nút user.

### `components/tasks/`

- `task-item.tsx`: Hiển thị một dòng công việc, bao gồm checkbox, tiêu đề, độ ưu tiên, và các hành động liên quan.
- `task-list.tsx`: Hiển thị một danh sách các `task-item`.
- `task-quick-add.tsx`: Input để người dùng nhanh chóng thêm một công việc mới.
- `task-priority-select.tsx`: Popover cho phép chọn độ ưu tiên của công việc.
- `task-priority-badge.tsx`: Huy hiệu màu sắc hiển thị độ ưu tiên hiện tại.

### `components/kanban/`

- `kanban-board.tsx`: Component chính chứa toàn bộ bảng Kanban, quản lý logic kéo-thả.
- `kanban-column.tsx`: Một cột trong bảng (ví dụ: "Todo", "In Progress").
- `kanban-card.tsx`: Một thẻ công việc hiển thị trong cột Kanban.

### `components/projects/`

- `project-grid.tsx`: (Dự kiến) Hiển thị danh sách các dự án dưới dạng lưới.
- `create-project-button.tsx`: (Dự kiến) Nút để tạo dự án mới.

### `components/auth/`

- `logout-button.tsx`: Nút để thực hiện hành động đăng xuất.

### `components/ui/`

Đây là thư mục chứa hơn 30+ component giao diện cơ bản từ `shadcn/ui`, ví dụ:

- `button.tsx`: Các biến thể của nút.
- `dialog.tsx`: Hộp thoại modal.
- `dropdown-menu.tsx`: Menu xổ xuống.
- `popover.tsx`: Các ô nội dung nhỏ xuất hiện khi click.
- `input.tsx`, `checkbox.tsx`, `label.tsx`: Các element của form.
- `toast.tsx`: Component cho các thông báo nhanh.
- `calendar.tsx`: Component lịch cơ bản.
