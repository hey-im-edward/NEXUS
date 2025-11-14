# AI Prompts Library - NEXUS Productivity OS

> **Mục đích:** Hướng dẫn viết prompts hiệu quả cho GitHub Copilot, ChatGPT, Claude khi develop NEXUS.

**Cập nhật:** 13 tháng 11, 2024

---

## 🔄 **THAY ĐỔI CHIẾN LƯỢC**

**Quyết định 13/11/2024:** PIVOT sang Platform Strategy

- ✅ **Prompts 1, 1.1, 1.2:** Hoàn thành (Task Management cơ bản)
- 🔄 **Prompts 1.3-1.6:** Di chuyển xuống Backlog
- 🚀 **Prompts 2.0+:** Tập trung vào Dashboard Grid + App Builder

---

## 📋 Nguyên Tắc Chung

### ✅ NÊN:

1. **Context rõ ràng** - Cho AI biết đang làm gì, ở đâu trong project
2. **Yêu cầu cụ thể** - Càng cụ thể càng tốt
3. **Nhắc tech stack** - Next.js 16, React 19, Supabase, TypeScript, Zustand
4. **Expected output** - Nói rõ muốn component, function, hay full page
5. **Constraints** - Free tier, performance, mobile-first, keyboard shortcuts

### ❌ KHÔNG NÊN:

1. Prompts mơ hồ: "Làm task manager"
2. Bỏ qua context: "Thêm recurring tasks" (logic ở đâu? dùng library gì?)
3. Giả định AI biết project: "Fix cái filter" (filter nào? ở file nào?)
4. Multi-tasking prompts: "Build Kanban + Calendar + Pages cùng lúc"

---

## ✅ **PROMPTS ĐÃ HOÀN THÀNH (3)**

### ✅ Prompt 1: Kanban Board Component

**Trạng thái:** ✅ HOÀN THÀNH (8/11/2024)
**Thời gian:** 3 giờ
**Files:** `frontend/app/kanban-demo/page.tsx`

**Tóm tắt:** Component Kanban board với drag & drop tasks giữa 3 columns (TODO, IN_PROGRESS, DONE) sử dụng @dnd-kit.

---

### ✅ Prompt 1.1: Sửa Task Inline

**Trạng thái:** ✅ HOÀN THÀNH (9/11/2024)
**Thời gian:** 1.5 giờ
**Files:** `frontend/components/tasks/task-list.tsx`

**Tóm tắt:** Double-click task → Edit inline → Enter/Blur để lưu → ESC để hủy. Có optimistic UI updates.

---

### ✅ Prompt 1.2: Set Ưu Tiên Cho Task

**Trạng thái:** ✅ HOÀN THÀNH (9/11/2024)
**Thời gian:** 2 giờ
**Files:** `frontend/components/tasks/TaskPrioritySelect.tsx`

**Tóm tắt:** Click priority badge → Dropdown chọn Urgent/High/Medium/Low/None với colored badges.

---

## 🎯 **PRIORITY 1: PLATFORM MVP (Tuần 0-4)**

### 🚀 Prompt 2.0: Architecture Decision & Dashboard Grid Design

**Trạng thái:** 📋 TUẦN 0 (13-20/11/2024)
**Thời gian ước tính:** 2-3 giờ research + 2-3 giờ design = 4-6 giờ

````markdown
# PROMPT 2.0: Thiết Kế Kiến Trúc Hệ Thống App Mini

## Bối cảnh

Chúng ta đang pivot NEXUS từ task manager sang platform builder.
Người dùng sẽ có dashboard nơi họ thêm/sắp xếp/resize app mini cards.
Giống như: Notion dashboard gặp iOS home screen.

## Nhiệm vụ

Tạo Architecture Decision Record (ADR) và wireframe cho hệ thống Dashboard Grid.

## Deliverables

### 1. ADR Document (`docs/04_technical/APP_MINI_ARCHITECTURE.md`)

So sánh 3 approaches:

- react-grid-layout (phổ biến nhất)
- dnd-kit (low-level, flexible)
- Custom CSS Grid

**Tiêu chí so sánh:**

- Performance (với 10+ cards)
- Learning curve
- Flexibility (custom behaviors)
- Mobile support
- Bundle size

**Quyết định:** Library nào và tại sao?
**Trade-offs:** Những gì phải hy sinh?
**Security:** Sandbox user-generated apps như thế nào?

### 2. Wireframe

Vẽ (Figma hoặc tay) dashboard với:

- 3-4 app cards (Notes, Pomodoro, Todo, Weather)
- Nút "Add App"
- Card interactions (resize handles, close button, drag handle)
- Mobile view (stack vertically)

### 3. Database Schema

```sql
CREATE TABLE dashboard_layouts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  layout_data JSONB NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

**JSON structure example:**

```json
{
  "cards": [
    { "id": "notes-1", "app": "quick-notes", "x": 0, "y": 0, "w": 6, "h": 4 },
    { "id": "pomodoro-1", "app": "pomodoro", "x": 6, "y": 0, "w": 6, "h": 4 }
  ]
}
```

### 4. Component Structure

```
DashboardPage

├── DashboardGrid (container)

│   ├── AppMiniCard (wrapper)

│   │   ├── QuickNotesApp

│   │   ├── PomodoroApp

│   │   └── [Future apps]

│   └── AddAppButton

└── AppGalleryModal (Tuần 2)
```

#### Yêu cầu

- Grid hoạt động trên mobile (stack dọc)
- Layout persist vào Supabase
- Cards resize và drag được
- Performant với 10+ cards

#### Tech Stack

- Next.js 14 (App Router)
- Tailwind CSS + shadcn/ui
- Supabase
- TypeScript

#### Success Criteria

- ✅ Quyết định rõ ràng về grid library
- ✅ Database schema sẵn sàng implement
- ✅ Team aligned về technical approach
````

---

### 🚀 Prompt 2.1: Build Dashboard Grid Component

**Trạng thái:** 📋 TUẦN 1 (21-27/11)
**Thời gian ước tính:** 4-6 giờ

````markdown
# PROMPT 2.1: Xây Dựng Component Dashboard Grid

## Bối cảnh

Bạn đã hoàn thành Prompt 2.0 và quyết định dùng react-grid-layout.
Đây là "vỏ" chứa tất cả App Mini cards.
Layout phải persist vào Supabase.

## Nhiệm vụ

Build component `DashboardGrid` với đầy đủ drag-and-drop functionality.

## Yêu cầu Chức Năng

1. **Drag & Resize:**

   - User drag cards để sắp xếp lại
   - User resize cards (min: 3x3, max: 12x8 grid units)
   - User xóa card (nút X khi hover)

2. **Persistence:**

   - Auto-save layout vào Supabase khi change (debounced 1 second)
   - Load layout khi page mount

3. **Responsive:**
   - Desktop: 12 columns
   - Mobile: 1 column (stack dọc, no drag)

## Technical Requirements

- Dùng `react-grid-layout` library
- Wrap mỗi app trong `AppMiniCard` component
- Store layout trong bảng `dashboard_layouts` (JSON)
- Show loading skeleton khi fetch layout

## Styling (Tailwind)

- Card background: `bg-card` (shadcn/ui)
- Drag handle: Icon nhỏ góc trên trái
- Grid gap: 16px (`gap-4`)
- Card border: `border border-border`

## Database Queries

```typescript
// Save layout
await supabase.from('dashboard_layouts').upsert({
  user_id: userId,
  layout_data: layout,
  updated_at: new Date(),
});

// Load layout
const { data } = await supabase
  .from('dashboard_layouts')
  .select('layout_data')
  .eq('user_id', userId)
  .single();
```

#### Files Cần Tạo/Sửa

- `frontend/app/dashboard/page.tsx` (new)
- `frontend/components/dashboard/DashboardGrid.tsx` (new)
- `frontend/components/dashboard/AppMiniCard.tsx` (new)
- `frontend/lib/supabase/dashboard-layouts.ts` (new)

#### Example Code Structure

```tsx
import GridLayout from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';

export function DashboardGrid() {
  const [layout, setLayout] = useState([]);
  const [apps, setApps] = useState([]);

  useEffect(() => {
    fetchLayout();
  }, []);

  const handleLayoutChange = useDebouncedCallback((newLayout) => {
    saveLayout(newLayout);
  }, 1000);

  return (
    <GridLayout
      className="layout"
      layout={layout}
      cols={12}
      rowHeight={30}
      width={1200}
      onLayoutChange={handleLayoutChange}
    >
      {apps.map((app) => (
        <div key={app.id}>
          <AppMiniCard appId={app.id} appType={app.type} />
        </div>
      ))}
    </GridLayout>
  );
}
```

#### Testing Checklist

- [ ] Drag card → Vị trí persist sau page reload
- [ ] Resize card → Kích thước persist sau page reload
- [ ] Remove card → Card biến mất và không quay lại
- [ ] Mobile view → Cards xếp dọc (no overlap)
- [ ] Thêm 10 cards → Grid vẫn responsive

#### Success Criteria

- User customize hoàn toàn dashboard layout
- Layout persist across sessions
- Không có bug trên mobile
````

### 🚀 Prompt 2.2: Build AppMiniCard Wrapper

**Trạng thái:** 📋 TUẦN 1 (21-27/11)
**Thời gian ước tính:** 3-4 giờ

````markdown
# PROMPT 2.2: Xây Dựng AppMiniCard Wrapper

## Bối cảnh

Component wrapper bao quanh mỗi App Mini (Notes, Pomodoro, v.v.)
Cung cấp: header với title, delete button, resize handle
Giống: iOS app icon + card UI

## Props Interface

```typescript
interface AppMiniCardProps {
  appId: string;
  appType: string; // 'quick-notes', 'pomodoro', etc.
  onRemove: () => void;
  children: React.ReactNode; // App component thực tế
}
```

#### Visual Design

1. **Header:**

   - Icon app + title
   - Close button (X) ở góc phải
   - Drag handle (⋮⋮) ở góc trái

2. **Body:**

   - Area cho app content
   - `flex-1` để fill space

3. **Footer (optional):**

   - App-specific actions

#### Styling (Tailwind + shadcn/ui)

- Dùng shadcn/ui `Card` làm base
- Header height: 40px
- Body: `flex-1` fill available
- Border radius: `rounded-lg`
- Shadow: `shadow-sm` on hover

#### Interactions

- Hover → Show close button
- Click drag handle → Enable drag
- Click close → Confirm modal "Xóa app khỏi dashboard?"

#### Files Cần Tạo

- `frontend/components/dashboard/AppMiniCard.tsx`
- `frontend/components/dashboard/AppMiniCardHeader.tsx`

#### Example Code

```tsx
export function AppMiniCard({ appId, appType, onRemove, children }: AppMiniCardProps) {
  const [showClose, setShowClose] = useState(false);

  return (
    <Card
      className="h-full flex flex-col"
      onMouseEnter={() => setShowClose(true)}
      onMouseLeave={() => setShowClose(false)}
    >
      <AppMiniCardHeader
        title={getAppTitle(appType)}
        icon={getAppIcon(appType)}
        showClose={showClose}
        onClose={onRemove}
      />
      <CardContent className="flex-1 overflow-auto">{children}</CardContent>
    </Card>
  );
}
```

#### Success Criteria

- Header nhất quán across apps
- Hover interactions mượt mà
- Close button hoạt động đáng tin cậy
````

### 🚀 Prompt 2.3: Build App Mini - Ghi Chú Nhanh

**Trạng thái:** 📋 TUẦN 2 (28/11 - 4/12)
**Thời gian ước tính:** 1-2 giờ

````markdown
# PROMPT 2.3: App Mini Ghi Chú Nhanh

## Bối cảnh

App Mini proof-of-concept đầu tiên
Phải CỰC KỲ ĐƠNGIẢN (< 50 dòng code)
Chưa cần database (dùng localStorage)

## Yêu cầu

1. **Features:**

   - Text input (multiline)
   - Auto-save vào localStorage on change (debounced 500ms)
   - Load note từ localStorage khi mount
   - Character count ở bottom

2. **UI:**

   - Clean, minimal
   - Placeholder: "Ghi chú nhanh..."
   - Character counter: "42 ký tự"

3. **Technical:**
   - Dùng hook `useLocalStorage`
   - Debounce saves 500ms
   - Unique localStorage key per instance

## Files Cần Tạo

- `frontend/components/app-minis/QuickNotesApp.tsx`
- `frontend/hooks/useLocalStorage.ts` (nếu chưa có)

## Example Code

```tsx
export function QuickNotesApp({ instanceId }: { instanceId: string }) {
  const [note, setNote] = useLocalStorage(`quick-notes-${instanceId}`, '');

  return (
    <div className="h-full flex flex-col">
      <Textarea
        value={note}
        onChange={(e) => setNote(e.target.value)}
        placeholder="Ghi chú nhanh..."
        className="flex-1 resize-none border-0"
      />
      <div className="text-xs text-muted-foreground p-2">{note.length} ký tự</div>
    </div>
  );
}
```

#### Success Criteria

- User type và text persist
- Notes lưu across page reloads
- Multiple instances không conflict
````

### 🚀 Prompt 2.4: Build App Mini - Pomodoro Timer

**Trạng thái:** 📋 TUẦN 2 (28/11 - 4/12)
**Thời gian ước tính:** 2-3 giờ

````markdown
# PROMPT 2.4: App Mini Pomodoro Timer

## Bối cảnh

Pomodoro = 25 phút làm việc + 5 phút nghỉ
Browser notification khi hết giờ
UI đơn giản, không cần persistence

## Yêu cầu

1. **Features:**

   - Start/Pause/Reset buttons
   - Display time trong format MM:SS
   - Browser notification khi timer hết
   - Auto-switch sang break sau work session (optional)

2. **UI:**

   - Large timer display (text-4xl)
   - 3 buttons dưới timer
   - Progress ring (optional, dùng `react-circular-progressbar`)

3. **Technical:**
   - Dùng `setInterval` cho countdown
   - Request notification permission khi first start
   - Clear interval on component unmount

## Files Cần Tạo

- `frontend/components/app-minis/PomodoroApp.tsx`

## Example Code

```tsx
export function PomodoroApp() {
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          new Notification('Pomodoro Hoàn Thành!', {
            body: 'Giờ nghỉ ngơi!',
          });
          setIsRunning(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <div className="text-4xl font-mono mb-4">
        {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
      </div>
      <div className="flex gap-2">
        <Button onClick={() => setIsRunning(!isRunning)}>{isRunning ? 'Pause' : 'Start'}</Button>
        <Button variant="outline" onClick={() => setTimeLeft(25 * 60)}>
          Reset
        </Button>
      </div>
    </div>
  );
}
```

## Success Criteria

- Timer đếm ngược chính xác
- Notification xuất hiện khi hết giờ
- Start/Pause/Reset hoạt động đúng
````

---

### 🚀 Prompt 2.5: Build App Builder v0.1 (NÂNG CAO)

**Trạng thái:** 📋 TUẦN 3-4 (5-18/12)
**Thời gian ước tính:** 8-12 giờ (hoặc chia thành 3-4 sub-prompts)

````markdown
# PROMPT 2.5: App Builder v0.1 - No-Code Builder

## Bối cảnh

ĐÂY LÀ TÍNH NĂNG CỐT LÕI của NEXUS
Người dùng build apps đơn giản KHÔNG CẦN CODE
Bắt đầu với 3 components: Text Input, Button, Text Block

## Phạm vi (Tối Thiểu)

**TRONG PHẠM VI:**

- ✅ Drag-and-drop 3 components vào canvas
- ✅ Edit component properties (placeholder, label, text)
- ✅ Save app definition dưới dạng JSON
- ✅ Render app từ JSON trên dashboard

**NGOÀI PHẠM VI (lúc này):**

- ❌ Conditional logic
- ❌ Database integration
- ❌ Styling customization
- ❌ Marketplace sharing

## Component Schema (JSON)

```json
{
  "appName": "Guest Book",
  "components": [
    {
      "id": "input-1",
      "type": "TextInput",
      "props": {
        "placeholder": "Nhập tên",
        "label": "Tên"
      },
      "position": { "x": 0, "y": 0 }
    },
    {
      "id": "button-1",
      "type": "Button",
      "props": {
        "label": "Submit",
        "onClick": "log-to-console"
      },
      "position": { "x": 0, "y": 1 }
    },
    {
      "id": "text-1",
      "type": "TextBlock",
      "props": {
        "content": "Chào mừng!"
      },
      "position": { "x": 0, "y": 2 }
    }
  ]
}
```

## Tech Stack Options

**Option A:** Craft.js (builder library)
**Option B:** dnd-kit + custom renderer
**Option C:** Build từ đầu với react-dnd

## Files Cần Tạo

1. `frontend/app/app-builder/page.tsx`
2. `frontend/components/app-builder/BuilderCanvas.tsx`
3. `frontend/components/app-builder/ComponentPalette.tsx`
4. `frontend/components/app-builder/PropertiesPanel.tsx`
5. `frontend/components/app-builder/AppRenderer.tsx`
6. `backend/supabase/migrations/004_user_apps.sql`

## Database Schema

```sql
CREATE TABLE user_apps (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  app_name TEXT NOT NULL,
  app_schema JSONB NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

## Example App Renderer

```tsx
export function AppRenderer({ schema }: { schema: AppSchema }) {
  return (
    <div className="p-4">
      {schema.components.map((component) => {
        switch (component.type) {
          case 'TextInput':
            return <Input key={component.id} {...component.props} />;
          case 'Button':
            return <Button key={component.id}>{component.props.label}</Button>;
          case 'TextBlock':
            return <p key={component.id}>{component.props.content}</p>;
          default:
            return null;
        }
      })}
    </div>
  );
}
```

## Success Criteria

- User drag components vào canvas
- User edit component properties
- User save app và thấy trên dashboard
- App render đúng từ JSON

## ⚠️ LƯU Ý

Task này lớn (8-12 giờ). Cân nhắc chia thành sub-prompts:

- 2.5.1: Component Palette + Drag-Drop
- 2.5.2: Properties Panel + Edit
- 2.5.3: Save/Load App Definition
- 2.5.4: App Renderer + Deploy to Dashboard
````

---

## 🔄 **BACKLOG: TASK MANAGEMENT POLISH**

> **Quyết định 13/11/2024:** Các prompts này được hoãn lại. Task Management đã "đủ tốt". Sẽ xem xét lại sau Tuần 8 dựa trên user feedback.

---

### 🔄 Prompt 1.3: Thêm Tags Cho Tasks

**Trạng thái:** 🔄 BACKLOG (trước đây Tuần 0)
**Thời gian ước tính:** 1-2 giờ

**Tóm tắt:** Multi-select tags (#work, #personal) với auto-suggest, colored pills, many-to-many relationship.

**Chi tiết:** Xem phiên bản cũ của file này (commit trước 13/11) nếu cần implement.

---

### 🔄 Prompt 1.4: Task Detail Modal

**Trạng thái:** 🔄 BACKLOG (trước đây Tuần 0)
**Thời gian ước tính:** 2-3 giờ

**Tóm tắt:** Click task → Modal với full info (description, due date, priority, tags, subtasks).

---

### 🔄 Prompt 1.5: Xóa Task

**Trạng thái:** 🔄 BACKLOG (trước đây Tuần 0)
**Thời gian ước tính:** 1-2 giờ

**Tóm tắt:** Right-click → Delete với confirmation + Undo option (5 seconds).

---

### 🔄 Prompt 1.6: Keyboard Shortcuts

**Trạng thái:** 🔄 BACKLOG (trước đây Tuần 0)
**Thời gian ước tính:** 2-3 giờ

**Tóm tắt:** j/k navigate, x toggle complete, d delete, Cmd+K command palette, ? help modal.

---

### 🔄 Prompt 3: Recurring Tasks với rrule

**Trạng thái:** 🔄 BACKLOG
**Thời gian ước tính:** 3-4 giờ

**Tóm tắt:** Dropdown chọn pattern (Daily, Weekly, Custom), generate rrule string, save vào database.

---

### 🔄 Prompt 4: Calendar View Component

**Trạng thái:** 🔄 BACKLOG
**Thời gian ước tính:** 4-6 giờ

**Tóm tắt:** Month/Week/Day views với tasks trên due dates, dùng react-big-calendar.

---

### 🔄 Prompt 5: Command Palette (Cmd+K)

**Trạng thái:** 🔄 BACKLOG
**Thời gian ước tính:** 3-4 giờ

**Tóm tắt:** Quick actions với fuzzy search (Create task, Navigate, Search), dùng cmdk library.

---

## 🔧 **TROUBLESHOOTING PROMPTS**

### Khi AI Generate Code Lỗi:

```

Code bạn generate có lỗi này:
[paste error message]

Context: [đang làm gì, ở đâu trong project]

Hãy fix code.
Constraints thêm: [nếu có]

```

### Khi Cần Giải Thích:

```

Giải thích code này từng dòng:

[paste code]

Focus vào:

1. Mỗi function làm gì
2. Tại sao dùng pattern này
3. Potential issues hoặc improvements

```

---

## 💡 **ADVANCED PROMPTS**

### Refactoring:

```

Refactor component này để performant và maintainable hơn:

[paste code]

Issues cần fix:

1. Quá nhiều re-renders
2. Props drilling
3. Inline functions trong JSX
4. Thiếu error handling

Stack: React 19, TypeScript
Constraints: Tiếp tục dùng Zustand cho state

```

### Testing:

```

Generate unit tests cho component này dùng Vitest:

[paste component]

Test cases:

1. Renders đúng với props
2. Handles user interactions (click, input)
3. Error states
4. Loading states

Dùng @testing-library/react

```

---

## 🎓 **LEARNING PROMPTS (Khi Bí)**

### Hiểu Concepts:

```

Tôi đang học [concept] trong context của NEXUS.

Giải thích:

1. [Concept] là gì?
2. Tại sao cần nó?
3. Hoạt động thế nào trong Next.js 14?
4. Cho tôi example đơn giản

Giải thích thực tế và beginner-friendly.

```

**Example:**

```

Tôi đang học Server Components trong context của NEXUS.

Giải thích:

1. Server Component là gì?
2. Tại sao cần nó? (vs Client Component)
3. Hoạt động thế nào trong Next.js 14?
4. Cho tôi example với Supabase query

Giải thích thực tế và beginner-friendly.

```

---

## 🚀 **QUICK REFERENCE**

### Essential Info Trong Mỗi Prompt:

```markdown
Context: [Đang build gì, ở đâu trong project]
Stack: Next.js 14, TypeScript, Supabase, TailwindCSS
Location: [file path]
Requirements: [numbered list]
Constraints: [free tier, performance, mobile-first]
Expected output: [component, function, full page]
```

### Copy-Paste Template:

```
Tạo [gì] cho NEXUS [context].

Context:
- [Mô tả ngắn gọn]
- Stack: Next.js 14, React 19, TypeScript, Supabase
- Location: [file path]

Requirements:
1. [Requirement 1]
2. [Requirement 2]
3. [Requirement 3]

[Sections khác nếu cần: Styling, Performance, Database]

Expected output: [Files/code muốn nhận]
```

---

## 🎯 **SUCCESS METRICS CHO PROMPTS TỐT**

✅ **Prompt tốt tạo ra:**

- Code chạy được mà không có lỗi lớn
- Follow project conventions (TypeScript, TailwindCSS)
- Có error handling và loading states
- Mobile-responsive by default
- < 5 lỗi nhỏ cần fix

❌ **Prompt tệ tạo ra:**

- Code không compile
- Dùng sai libraries
- Thiếu requirements quan trọng
- Cần viết lại hoàn toàn

---

**Nhớ:** Dành 2 phút craft prompt tốt → Tiết kiệm 20 phút debug code tệ.

**Cập nhật lần cuối:** 13 tháng 11, 2024

---

## 📚 **GHI CHÚ VỀ PIVOT**

Nếu sau này cần quay lại prompts Task Management (1.3-1.6), xem git history:

```bash
git log --all --full-history -- docs/02_ai-prompts/AI_PROMPTS.md
git show <commit-hash>:docs/02_ai-prompts/AI_PROMPTS.md
```

Hoặc check file backup: `docs/archive/AI_PROMPTS_pre_pivot.md`
