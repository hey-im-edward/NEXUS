# 🤖 AI PROMPTS - NEXUS Platform (DEMO FORMAT)

> **Mục đích của file DEMO này:** Minh họa cách format mới để copy prompts dễ dàng.
>
> **Cách sử dụng:** Double-click vào code block bên dưới → Copy → Paste vào AI chat.

---

## 📋 FORMAT MỚI: Mỗi Prompt trong 1 Code Block

### Ưu điểm:

1. ✅ **Double-click để select toàn bộ prompt** (từ "Bối cảnh" đến "Success Criteria")
2. ✅ **Copy 1 lần** thay vì phải scroll và select thủ công
3. ✅ **Không bỏ sót** sections quan trọng
4. ✅ **Format nhất quán** - dễ đọc trong AI chat

---

## 🚀 GIAI ĐOẠN 1: PLATFORM MVP (Tuần 1-4)

### 📋 PROMPT 1.1: Xây Dựng DashboardGrid Component

**Tuần:** 1
**Thời gian ước tính:** 4-6 giờ
**Trạng thái:** 🔴 Chưa bắt đầu

**👇 COPY TOÀN BỘ PROMPT BÊN DƯỚI:**

```
PROMPT 1.1: Xây Dựng DashboardGrid Component

============================================================
BỐI CẢNH:
============================================================

NEXUS Platform cần Dashboard Grid - một "iOS Home Screen for Productivity"
cho phép users sắp xếp App Minis theo ý muốn.

============================================================
NHIỆM VỤ:
============================================================

Build component `DashboardGrid` với đầy đủ drag-and-drop functionality
sử dụng `react-grid-layout` v1.5.2.

============================================================
YÊU CẦU CHỨC NĂNG:
============================================================

**1. Drag & Resize**

- Users drag cards để sắp xếp lại vị trí
- Users resize cards (min: 3x3, max: 12x8 grid units)
- Users xóa card (nút X khi hover)
- Smooth animations (spring physics)

**2. Persistence**

- Auto-save layout vào Supabase khi change (debounced 1 second)
- Load layout khi page mount
- Show loading skeleton khi fetch
- Handle empty state (first-time users)

**3. Responsive**

- Desktop (>= 1024px): 12 columns
- Tablet (768-1023px): 8 columns
- Mobile (< 768px): 1 column (stack dọc, no drag)

============================================================
TECHNICAL REQUIREMENTS:
============================================================

**Library Setup:**

npm install react-grid-layout
npm install --save-dev @types/react-grid-layout

**Component Structure:**

- Wrap mỗi app trong `AppMiniCard` component
- Store layout trong bảng `user_dashboard_layouts` (JSONB column)
- Use TanStack Query for data fetching
- Use Zustand for local state (current layout)

**Styling (TailwindCSS + shadcn/ui):**

- Grid gap: 16px (`gap-4`)
- Card background: `bg-card`
- Card border: `border border-border`
- Drag handle: Icon nhỏ góc trên trái (lucide-react `GripVertical`)
- Hover effects: `shadow-lg transition-shadow`

============================================================
DATABASE SCHEMA:
============================================================

-- Table: user_dashboard_layouts
CREATE TABLE IF NOT EXISTS user_dashboard_layouts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  dashboard_name TEXT NOT NULL DEFAULT 'Main',
  layout_data JSONB NOT NULL DEFAULT '[]'::jsonb,
  is_default BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, dashboard_name)
);

-- Example layout_data JSONB:
-- [
--   { "i": "app-1", "x": 0, "y": 0, "w": 4, "h": 2, "minW": 3, "minH": 3 },
--   { "i": "app-2", "x": 4, "y": 0, "w": 4, "h": 2, "minW": 3, "minH": 3 }
-- ]

-- RLS Policies
ALTER TABLE user_dashboard_layouts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage their own dashboard layouts"
ON user_dashboard_layouts
FOR ALL
USING (auth.uid() = user_id);

============================================================
DATABASE QUERIES:
============================================================

// frontend/lib/supabase/dashboard-layouts.ts

import { supabase } from './client';

export async function saveDashboardLayout(
  userId: string,
  dashboardName: string,
  layout: any[]
) {
  const { data, error } = await supabase
    .from('user_dashboard_layouts')
    .upsert({
      user_id: userId,
      dashboard_name: dashboardName,
      layout_data: layout,
      updated_at: new Date().toISOString(),
    })
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function loadDashboardLayout(
  userId: string,
  dashboardName: string = 'Main'
) {
  const { data, error } = await supabase
    .from('user_dashboard_layouts')
    .select('layout_data')
    .eq('user_id', userId)
    .eq('dashboard_name', dashboardName)
    .single();

  if (error && error.code !== 'PGRST116') throw error; // PGRST116 = not found
  return data?.layout_data || [];
}

============================================================
FILES CẦN TẠO/SỬA:
============================================================

1. `frontend/app/dashboard/page.tsx` (new)
2. `frontend/components/dashboard/DashboardGrid.tsx` (new)
3. `frontend/components/dashboard/AppMiniCard.tsx` (new)
4. `frontend/lib/supabase/dashboard-layouts.ts` (new)
5. `frontend/hooks/useDashboardLayout.ts` (new - TanStack Query hook)

============================================================
SUCCESS CRITERIA:
============================================================

- ✅ Users có thể drag & drop cards
- ✅ Users có thể resize cards
- ✅ Layout persist across sessions (save/load from Supabase)
- ✅ Responsive: Desktop 12 cols, Mobile 1 col
- ✅ No bugs trên mobile (touch events work)
- ✅ Performance: < 1s load time, smooth 60fps animations

============================================================
TECH STACK (để nhắc AI):
============================================================

- Next.js 16.0.1, React 19.2, TypeScript 5.6
- Supabase PostgreSQL 15.6
- TailwindCSS 4.0 Alpha, shadcn/ui
- Zustand + Immer, TanStack Query v5
- react-grid-layout v1.5.2

============================================================
```

---

### 📋 PROMPT 1.2: Xây Dựng AppMiniCard Wrapper

**Tuần:** 1
**Thời gian ước tính:** 3-4 giờ
**Trạng thái:** 🔴 Chưa bắt đầu

**👇 COPY TOÀN BỘ PROMPT BÊN DƯỚI:**

```
PROMPT 1.2: Xây Dựng AppMiniCard Wrapper

============================================================
BỐI CẢNH:
============================================================

Component wrapper bao quanh mỗi App Mini (QuickNotes, Pomodoro, TodayTasks, etc.).

Cung cấp: header với title + icon, drag handle, close button, và content area.

============================================================
PROPS INTERFACE:
============================================================

// frontend/components/dashboard/AppMiniCard.tsx

interface AppMiniCardProps {
  appId: string;
  appType: 'quick-notes' | 'pomodoro' | 'today-tasks' | 'custom';
  title: string;
  icon?: React.ReactNode; // lucide-react icon
  onRemove: () => void;
  children: React.ReactNode; // App component thực tế
}

============================================================
VISUAL DESIGN:
============================================================

**Header (40px height):**

- Left: Drag handle icon (`GripVertical` from lucide-react)
- Center: App icon + title
- Right: Close button (X)

**Body:**

- Area cho app content
- `flex-1` để fill available space
- Padding: 16px (`p-4`)

============================================================
STYLING (TailwindCSS + shadcn/ui):
============================================================

**Base:**

- Use shadcn/ui `Card` component as base
- Card class: `relative flex flex-col h-full`
- Header class: `flex items-center gap-2 px-4 h-10 border-b border-border`
- Body class: `flex-1 p-4 overflow-auto`

**Interactions:**

- Hover card → Show close button (hidden by default)
- Hover close button → Background `bg-destructive`, color `text-destructive-foreground`
- Drag handle cursor: `cursor-move`

**Responsive:**

- Mobile: Hide drag handle (no drag on mobile)
- Mobile: Always show close button

============================================================
CONFIRM MODAL:
============================================================

When user clicks close button, show confirm dialog:

// Use shadcn/ui AlertDialog
<AlertDialog>
  <AlertDialogTrigger asChild>
    <Button variant="ghost" size="icon">
      <X className="h-4 w-4" />
    </Button>
  </AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Xóa app khỏi dashboard?</AlertDialogTitle>
      <AlertDialogDescription>
        App sẽ bị xóa khỏi dashboard này. Bạn có thể add lại sau.
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>Hủy</AlertDialogCancel>
      <AlertDialogAction onClick={onRemove}>Xóa</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>

============================================================
FILES CẦN TẠO:
============================================================

1. `frontend/components/dashboard/AppMiniCard.tsx` (new)
2. `frontend/components/dashboard/AppMiniCardHeader.tsx` (new)

============================================================
SUCCESS CRITERIA:
============================================================

- ✅ Header nhất quán across all apps
- ✅ Hover interactions mượt mà (close button fade in/out)
- ✅ Close button với confirm dialog hoạt động đáng tin cậy
- ✅ Drag handle visible on desktop, hidden on mobile
- ✅ Content area scrollable nếu overflow

============================================================
TECH STACK (để nhắc AI):
============================================================

- Next.js 16.0.1, React 19.2, TypeScript 5.6
- TailwindCSS 4.0 Alpha, shadcn/ui
- lucide-react (for icons)

============================================================
```

---

## 💡 HƯỚNG DẪN SỬ DỤNG

### Cách copy prompt:

1. **Double-click** vào bất kỳ chỗ nào trong code block (vùng màu xám)
2. Trình editor sẽ **tự động select toàn bộ** nội dung trong block
3. **Ctrl+C** (hoặc Cmd+C trên Mac) để copy
4. **Paste vào AI chat** (Claude, ChatGPT, v.v.)

### Lợi ích:

- ✅ **Không bỏ sót** các sections quan trọng (Database Schema, Success Criteria, etc.)
- ✅ **Copy nhanh** - chỉ 1-2 giây thay vì phải scroll và select thủ công
- ✅ **Format đẹp** - AI sẽ nhận được prompt có structure rõ ràng với separators (====)
- ✅ **Nhất quán** - mọi prompt đều có cùng format

---

## 🎯 NEXT STEPS

**Nếu bạn thấy format này OK:**

Tôi sẽ apply format này cho **tất cả 14 prompts** trong file `AI_PROMPTS.md`:

- ✅ Giai đoạn 1: 8 prompts (1.1 → 1.8)
- ✅ Giai đoạn 2: 3 prompts (2.1 → 2.3)
- ✅ Giai đoạn 3: 2 prompts (3.1 → 3.2)
- ✅ Giai đoạn 4: 1 prompt (4.1)

**Đồng thời fix:**

- 🔧 83 markdown errors (add language to code blocks, fix list spacing, etc.)
- 🔧 Cải thiện structure để dễ đọc hơn
- 🔧 Thêm "TECH STACK" section ở cuối mỗi prompt để nhắc AI

---

**Bạn có OK với format này không?** 👍
