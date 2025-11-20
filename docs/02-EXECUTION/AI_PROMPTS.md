# 🤖 AI PROMPTS - NEXUS Platform

> **Mục đích:** Collection các "Prompt Cha" (Parent Prompts) theo Lộ trình 12 Tuần Code First Strategy. Mỗi prompt được đánh số liên tục và chi tiết.

**Nguồn:** [NEXUS_WHITEPAPER.md](../01-STRATEGY/NEXUS_WHITEPAPER.md) (Phần 4.3)

**Cập nhật:** 20 tháng 11, 2025

**Version:** 3.0 - Copy-Paste Optimized Format

---

## 💡 CÁCH SỬ DỤNG FILE NÀY

### ✨ Format Mới - Mỗi Prompt trong Code Block

**Cách copy prompt:**

1. **Scroll** đến prompt bạn cần (ví dụ: PROMPT 1.1)
2. **Double-click** vào bất kỳ chỗ nào trong code block (vùng màu xám)
3. Editor sẽ **tự động select toàn bộ** nội dung
4. **Ctrl+C** (hoặc Cmd+C) để copy
5. **Paste vào AI chat** (Claude, ChatGPT, v.v.)

**Lợi ích:**

- ✅ Copy **toàn bộ prompt** từ "Bối cảnh" đến "Success Criteria" chỉ trong 1 lần
- ✅ Không bỏ sót sections quan trọng (Database Schema, Files, etc.)
- ✅ Format đẹp với separators (====) dễ đọc cho AI
- ✅ Có section "TECH STACK" ở cuối mỗi prompt để nhắc AI

---

## 📚 TECH STACK - Tham Khảo Nhanh

```yaml
Frontend Framework:
  Core: Next.js 16.0.1 (App Router, Turbopack stable)
  Language: TypeScript 5.6 (Strict Mode enabled)
  UI Library: React 19.2 (Concurrent rendering default)
  Styling: TailwindCSS 4.0 Alpha
  Components: shadcn/ui (copy-paste, fully customizable)

Backend as a Service:
  Platform: Supabase (PostgreSQL 15.6)
  Database: PostgreSQL with Row Level Security (RLS)
  Authentication: Supabase Auth (Google OAuth, Email)
  Storage: Supabase Storage (CDN-enabled)
  Real-time: WebSocket subscriptions

State Management:
  Client State: Zustand v5 + Immer (slice pattern)
  Server State: TanStack Query v5 (React Query)
  Form State: React Hook Form v7

Specialized Libraries:
  Dashboard Grid: react-grid-layout v1.5.0 (verified working)
  App Builder: @dnd-kit v6.3.1 + Zustand (React 19 compatible)
  Drag & Drop: @dnd-kit v6.3.1 + @dnd-kit/sortable v10.0.0
  Rich Text: Tiptap v2 (ProseMirror wrapper)
  Dates: date-fns v3 (tree-shakeable)
  Recurrence: rrule v2 (RFC-5545 compliant)

Deployment:
  Frontend Hosting: Vercel (Edge Network, 300+ locations)
  Backend Hosting: Supabase Cloud (Singapore region)
  CDN: Vercel Edge Network + Supabase CDN
  Domain: Custom domain (.app or .io)

Cost (Estimated):
  MVP Phase: $0-12/month (free tiers + domain)
  Scale Phase: $45-70/month (Vercel Pro + Supabase Pro)
```

> [!NOTE]
> **AI_PROMPTS.md là file HOÀN TOÀN ĐỘC LẬP (100% STANDALONE)**
>
> Mọi thông tin tech stack cần thiết đã có trong section trên. Bạn **KHÔNG CẦN mở file khác** khi dùng prompts.
>
> **Khi nào cần update Tech Stack:**
>
> - Chỉ khi TECH_STACK.md có major changes (React version, library thay đổi)
> - Frequency: ~1 lần/tháng
> - Quy trình: Copy section "Stack Overview" từ TECH_STACK.md → Paste vào đây → Update timestamp

---

## 📋 MỤC LỤC

- [Nguyên Tắc Chung](#-nguyên-tắc-chung)
- [Giai Đoạn 1: Platform MVP (Tuần 1-4)](#-giai-đoạn-1-platform-mvp-tuần-1-4)
  - [Prompt 1.1: DashboardGrid Component](#-prompt-11-xây-dựng-dashboardgrid-component)
  - [Prompt 1.2: AppMiniCard Wrapper](#-prompt-12-xây-dựng-appminicard-wrapper)
  - [Prompt 1.3: 3 App Minis](#-prompt-13-xây-dựng-3-app-minis)
  - [Prompt 1.4: Thiết lập Craft.js](#-prompt-14-setup-craftjs-framework)
  - [Prompt 1.5: 5 Builder Components](#-prompt-15-xây-dựng-5-builder-components)
  - [Prompt 1.6: 3 Actions System](#-prompt-16-xây-dựng-3-actions-system)
  - [Prompt 1.7: Save/Load + AppRenderer](#-prompt-17-saveload-app-definition--apprenderer)
  - [Prompt 1.8: 3 Template Apps](#-prompt-18-xây-dựng-3-template-apps)
- [Giai Đoạn 2: Marketplace (Tuần 5-6)](#-giai-đoạn-2-marketplace-tuần-5-6)
  - [Prompt 2.1: Marketplace Browse](#-prompt-21-xây-dựng-marketplace-browse-page)
  - [Prompt 2.2: App Detail + Install](#-prompt-22-xây-dựng-app-detail-page--install-flow)
  - [Prompt 2.3: Publish Flow](#-prompt-23-xây-dựng-publish-flow)
- [Giai Đoạn 3: Validation (Tuần 7-8)](#-giai-đoạn-3-validation-tuần-7-8)
  - [Prompt 3.1: Beta Recruitment](#-prompt-31-beta-recruitment-strategy)
  - [Prompt 3.2: Onboarding + Feedback](#-prompt-32-onboarding-flow--feedback-system)
- [Giai Đoạn 4: Decision Point (Tuần 9-12)](#-giai-đoạn-4-decision-point-tuần-9-12)
  - [Prompt 4.1: Analytics & Decision](#-prompt-41-analytics--decision-framework)
- [Workflow Templates](#-workflow-templates-dùng-hàng-ngày)
- [Quick Reference](#-quick-reference)

---

## 📐 NGUYÊN TẮC CHUNG

### ✅ NÊN

**1. Context rõ ràng**

- Cho AI biết đang build gì, ở đâu trong project
- Mention lộ trình (Tuần 1-4: Platform MVP, etc.)
- Reference Whitepaper section nếu cần

**2. Yêu cầu cụ thể**

- Numbered list requirements
- Acceptance criteria rõ ràng
- Edge cases cần handle

**3. Nhắc tech stack**

- Next.js 16, React 19, TypeScript 5.6
- Supabase (PostgreSQL 15.6)
- TailwindCSS 4.0 Alpha, shadcn/ui
- Zustand, TanStack Query, react-grid-layout, Craft.js

**4. Expected output**

- Nói rõ muốn: component, function, full page, database schema
- File paths cụ thể
- Format code mong muốn

**5. Constraints**

- Free tier (Vercel, Supabase)
- Performance targets (< 1s load time)
- Mobile-first approach
- Accessibility (keyboard shortcuts, screen readers)

### ❌ KHÔNG NÊN

**1. Prompts mơ hồ**

- ❌ "Làm task manager"
- ✅ "Build TaskListView component with CRUD, filters, and real-time sync using Supabase"

**2. Bỏ qua context**

- ❌ "Thêm recurring tasks"
- ✅ "Add recurring tasks to TaskForm using rrule library, store in tasks.recurrence_rule column"

**3. Giả định AI biết project**

- ❌ "Fix cái filter"
- ✅ "Fix priority filter in TaskListView.tsx line 42, currently not filtering High priority tasks"

**4. Multi-tasking prompts**

- ❌ "Build Kanban + Calendar + Pages cùng lúc"
- ✅ "Build Kanban Board first (Prompt 1.1), then Calendar (Prompt 1.2), then Pages (Prompt 1.3)"

---

## 🚀 GIAI ĐOẠN 1: PLATFORM MVP (Tuần 1-4)

**Mục tiêu:** Dashboard Grid + App Builder No-Code + 3 App Minis working

---

### 📋 PROMPT 1.1: Xây Dựng DashboardGrid Component

**Tuần:** 1 | **Thời gian:** 4-6 giờ | **Trạng thái:** ✅ Hoàn thành (19/11/2025)

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
TECHNICAL YÊU CẦU:
============================================================

**Library Thiết lập:**

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
TIÊU CHÍ THÀNH CÔNG:
============================================================

- ✅ Users có thể drag & drop cards
- ✅ Users có thể resize cards
- ✅ Layout persist across sessions (save/load from Supabase)
- ✅ Responsive: Desktop 12 cols, Mobile 1 col
- ✅ No bugs trên mobile (touch events work)
- ✅ Performance: < 1s load time, smooth 60fps animations

============================================================
TECH STACK:
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

**Tuần:** 1 | **Thời gian:** 3-4 giờ | **Trạng thái:** ✅ Hoàn thành (19/11/2025)

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
TIÊU CHÍ THÀNH CÔNG:
============================================================

- ✅ Header nhất quán across all apps
- ✅ Hover interactions mượt mà (close button fade in/out)
- ✅ Close button với confirm dialog hoạt động đáng tin cậy
- ✅ Drag handle visible on desktop, hidden on mobile
- ✅ Content area scrollable nếu overflow

============================================================
TECH STACK:
============================================================

- Next.js 16.0.1, React 19.2, TypeScript 5.6
- TailwindCSS 4.0 Alpha, shadcn/ui
- lucide-react (for icons)

============================================================
```

---

### 📋 PROMPT 1.3: Xây Dựng 3 App Minis

**Tuần:** 2 | **Thời gian:** 6-8 giờ | **Trạng thái:** ✅ Hoàn thành (19/11/2025)

**👇 COPY TOÀN BỘ PROMPT BÊN DƯỚI:**

```
PROMPT 1.3: Xây Dựng 3 App Minis (QuickNotes, Pomodoro, TodayTasks)

============================================================
BỐI CẢNH:
============================================================

Chúng ta cần 3 App Minis proof-of-concept để chứng minh concept Dashboard Grid hoạt động.

Mỗi app sẽ demo một cách lưu state khác nhau:

1. QuickNotes: localStorage
2. Pomodoro: component state (không persist)
3. TodayTasks: Supabase real-time

============================================================
APP MINI #1: QuickNotesApp
============================================================

**Chức năng:**

- Textarea cho user nhập notes
- Auto-save vào localStorage on change (debounced 500ms)
- Load note từ localStorage khi mount
- Character count ở bottom
- Clear button (confirm dialog)

**Technical Implementation:**

// frontend/components/app-minis/QuickNotesApp.tsx

import { useState, useEffect } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useDebounce } from '@/hooks/useDebounce';

export function QuickNotesApp() {
  const [text, setText] = useState('');
  const debouncedText = useDebounce(text, 500);

  // Load từ localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('nexus-quick-notes');
    if (saved) setText(saved);
  }, []);

  // Save vào localStorage khi text change
  useEffect(() => {
    localStorage.setItem('nexus-quick-notes', debouncedText);
  }, [debouncedText]);

  return (
    <div className="flex flex-col h-full gap-2">
      <Textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Quick notes..."
        className="flex-1 resize-none"
      />
      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <span>{text.length} characters</span>
        <Button variant="ghost" size="sm" onClick={() => setText('')}>
          Clear
        </Button>
      </div>
    </div>
  );
}

**Files:**
- `frontend/components/app-minis/QuickNotesApp.tsx`
- `frontend/hooks/useDebounce.ts` (nếu chưa có)

============================================================
APP MINI #2: PomodoroApp
============================================================

**Chức năng:**

- Timer countdown 25 min (Pomodoro) hoặc 5 min (Break)
- Start/Pause/Reset buttons
- Display time trong format MM:SS
- Browser notification khi timer hết
- Auto-switch sang break sau work session

**Technical Implementation:**

// frontend/components/app-minis/PomodoroApp.tsx

import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Play, Pause, RotateCcw } from 'lucide-react';

const WORK_TIME = 25 * 60; // 25 min
const BREAK_TIME = 5 * 60; // 5 min

export function PomodoroApp() {
  const [timeLeft, setTimeLeft] = useState(WORK_TIME);
  const [isRunning, setIsRunning] = useState(false);
  const [mode, setMode] = useState<'work' | 'break'>('work');
  const intervalRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((t) => t - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      // Timer finished
      new Notification(`${mode === 'work' ? 'Work' : 'Break'} session finished!`);
      // Auto-switch mode
      setMode((m) => (m === 'work' ? 'break' : 'work'));
      setTimeLeft(mode === 'work' ? BREAK_TIME : WORK_TIME);
      setIsRunning(false);
    }

    return () => clearInterval(intervalRef.current);
  }, [isRunning, timeLeft, mode]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  const toggleTimer = () => setIsRunning((r) => !r);
  const resetTimer = () => {
    setTimeLeft(mode === 'work' ? WORK_TIME : BREAK_TIME);
    setIsRunning(false);
  };

  return (
    <div className="flex flex-col items-center justify-center h-full gap-4">
      <div className="text-sm font-medium text-muted-foreground uppercase">
        {mode === 'work' ? 'Work' : 'Break'}
      </div>
      <div className="text-6xl font-bold tabular-nums">
        {minutes.toString().padStart(2, '0')}:{seconds.toString().padStart(2, '0')}
      </div>
      <div className="flex gap-2">
        <Button onClick={toggleTimer} size="icon">
          {isRunning ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
        </Button>
        <Button onClick={resetTimer} size="icon" variant="outline">
          <RotateCcw className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}

**Files:**
- `frontend/components/app-minis/PomodoroApp.tsx`

**Note:** Request Notification permission on first load.

============================================================
APP MINI #3: TodayTasksApp
============================================================

**Chức năng:**

- Display tasks due today (từ Supabase `tasks` table)
- Real-time subscription (Supabase Realtime)
- Compact view: checkbox + title only
- Click task → Navigate to task detail (future)
- Empty state: "No tasks due today"

**Technical Implementation:**

// frontend/components/app-minis/TodayTasksApp.tsx

import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase/client';
import { Checkbox } from '@/components/ui/checkbox';

export function TodayTasksApp() {
  const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD

  const { data: tasks, refetch } = useQuery({
    queryKey: ['tasks', 'today', today],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('tasks')
        .select('id, title, completed')
        .eq('due_date', today)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data;
    },
  });

  // Real-time subscription
  useEffect(() => {
    const channel = supabase
      .channel('today-tasks-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'tasks',
          filter: `due_date=eq.${today}`,
        },
        () => refetch()
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [today, refetch]);

  if (!tasks?.length) {
    return (
      <div className="flex items-center justify-center h-full text-sm text-muted-foreground">
        No tasks due today
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {tasks.map((task) => (
        <div key={task.id} className="flex items-center gap-2">
          <Checkbox checked={task.completed} />
          <span className="text-sm">{task.title}</span>
        </div>
      ))}
    </div>
  );
}

**Files:**
- `frontend/components/app-minis/TodayTasksApp.tsx`

**Note:** Requires `tasks` table already exists from Task Management MVP.

============================================================
TIÊU CHÍ THÀNH CÔNG:
============================================================

- ✅ QuickNotesApp: User type và text persist across sessions (localStorage)
- ✅ PomodoroApp: Timer đếm ngược chính xác, notification khi hết
- ✅ TodayTasksApp: Tasks hiển thị real-time (auto-update khi có thay đổi)
- ✅ Multiple instances không conflict (mỗi card độc lập)
- ✅ All apps responsive (work on mobile)

============================================================
TECH STACK:
============================================================

- Next.js 16.0.1, React 19.2, TypeScript 5.6
- Supabase PostgreSQL 15.6, Realtime subscriptions
- TailwindCSS 4.0 Alpha, shadcn/ui
- TanStack Query v5, lucide-react

============================================================
```

---

### 📋 PROMPT 1.4: Thiết lập App Builder Framework

**Tuần:** 3 | **Thời gian:** 2-3 giờ | **Trạng thái:** ✅ Hoàn thành (19/11/2025) - @dnd-kit migration

**👇 COPY TOÀN BỘ PROMPT BÊN DƯỚI:**

```
PROMPT 1.4: Thiết lập Craft.js Framework

============================================================
BỐI CẢNH:
============================================================

Chúng ta cần setup Craft.js - một React framework cho building page/app builders.

Craft.js sẽ power App Builder feature, cho phép users tạo apps riêng bằng drag-and-drop.

============================================================
NHIỆM VỤ:
============================================================

**1. Install Craft.js và dependencies**

npm install @craftjs/core
npm install @craftjs/layers  # Optional: Layer panel

**2. Thiết lập basic editor structure**

- Create Editor page (`/app-builder`)
- Thiết lập Craft.js Provider
- Create Canvas area (drag-drop zone)
- Create Component Palette (sidebar)

**3. Test drag-drop functionality**

- Drag placeholder component vào canvas
- Verify Craft.js state management works

============================================================
TECHNICAL YÊU CẦU:
============================================================

**Editor Structure:**

/app-builder
├── Canvas (center) - Drop zone
├── ComponentPalette (left sidebar) - Draggable components
├── PropertiesPanel (right sidebar) - Edit component props
└── Toolbar (top) - Save, Preview, Publish buttons

**Example Implementation:**

// frontend/components/app-builder/Editor.tsx

import { Editor as CraftEditor, Frame } from '@craftjs/core';
import { Canvas } from './Canvas';
import { ComponentPalette } from './ComponentPalette';
import { PropertiesPanel } from './PropertiesPanel';
import { Toolbar } from './Toolbar';

export function Editor() {
  return (
    <CraftEditor>
      <div className="flex h-screen">
        {/* Left: Component Palette */}
        <ComponentPalette />

        {/* Center: Canvas */}
        <div className="flex-1 flex flex-col">
          <Toolbar />
          <div className="flex-1 bg-muted/30 p-4">
            <Frame>
              <Canvas />
            </Frame>
          </div>
        </div>

        {/* Right: Properties Panel */}
        <PropertiesPanel />
      </div>
    </CraftEditor>
  );
}

============================================================
FILES CẦN TẠO:
============================================================

1. `frontend/app/app-builder/page.tsx` (new)
2. `frontend/components/app-builder/Editor.tsx` (new)
3. `frontend/components/app-builder/Canvas.tsx` (new)
4. `frontend/components/app-builder/ComponentPalette.tsx` (new)
5. `frontend/components/app-builder/PropertiesPanel.tsx` (new)
6. `frontend/components/app-builder/Toolbar.tsx` (new)

============================================================
TIÊU CHÍ THÀNH CÔNG:
============================================================

- ✅ Craft.js editor loads without errors
- ✅ Can drag placeholder component vào canvas
- ✅ Canvas renders correctly
- ✅ Craft.js state management working (can select/deselect components)

============================================================
TECH STACK:
============================================================

- Next.js 16.0.1, React 19.2, TypeScript 5.6
- Craft.js (latest)
- TailwindCSS 4.0 Alpha, shadcn/ui

============================================================
```

---

### ⚠️ TECHNOLOGY MIGRATION NOTE (PROMPT 1.4)

**Original Plan:** Craft.js
**Actual Implementation:** @dnd-kit + Zustand
**Date:** 19/11/2025

**Reason:**Craft.js (v0.2.12) không tương thích với React 19.2.0:

- Drag events (dragstart, dragover, drop) không fire
- Root cause: React 19 breaking changes (ref callback timing, event handler attachment)
- Tested official Craft.js examples → cũng failed trong React 19

**Decision:**
Migrate to **@dnd-kit** + custom Zustand store:

```bash
npm install @dnd-kit/core @dnd-kit/sortable @dnd-kit/utilities
npm install zustand
npm uninstall @craftjs/core @craftjs/layers
```

**Implementation:**

- ✅ **Zustand store** (`lib/stores/editor.ts`, 334 lines) - Component tree + history management
- ✅ **DndContext** setup (`app/app-builder/page.tsx`)
- ✅ **Canvas** với SortableContext (`components/app-builder/Canvas.tsx`)
- ✅ **ComponentPalette** với useDraggable
- ✅ **RenderedComponent** với useSortable (nested containers support)
- ✅ **PropertiesPanel** - Props editor
- ✅ **Toolbar** - Undo/Redo/Save/Preview

**Trade-offs:**

- ⚠️ More implementation code (~600 lines custom vs Craft.js hooks)
- ⚠️ Manual tree management (no built-in Frame/Element abstractions)
- ✅ Better understanding (no black-box magic)
- ✅ Proven React 19 compatibility
- ✅ Full control over architecture

**Note on Craft.js:**

> Craft.js là framework xuất sắc cho page builders với built-in abstractions rất mạnh. Khi Craft.js release phiên bản hỗ trợ React 19, nên review lại việc migrate về Craft.js để tận dụng:
>
> - Frame/Element component wrappers
> - Built-in undo/redo
> - Serialization utilities
> - Layer management
>
> Hiện tại (19/11/2025), Craft.js v0.2.12 (last update: 2+ years ago) chưa compatible.

**Time Impact:**

- Originally estimated: 2-3 hours
- Actual time: ~21 hours (investigation: 4h, migration: 13h, testing: 4h)

---

### 📋 PROMPT 1.5: Xây Dựng 5 Builder Components

**Tuần:** 3 | **Thời gian:** 6-8 giờ | **Trạng thái:** 🔴 Chưa bắt đầu

**👇 COPY TOÀN BỘ PROMPT BÊN DƯỚI:**

```
PROMPT 1.5: Xây Dựng 5 Builder Components

============================================================
BỐI CẢNH:
============================================================

Chúng ta cần 5 components cơ bản để users có thể build simple apps (No-Code level).

Mỗi component phải là Craft.js Node với editable properties.

============================================================
COMPONENT #1: TextBlock
============================================================

**Props:**

- `text`: string (editable)
- `fontSize`: 'sm' | 'base' | 'lg' | 'xl'
- `color`: string (hex color)
- `align`: 'left' | 'center' | 'right'

**Implementation:**

// frontend/components/app-builder/components/TextBlock.tsx

import { useNode } from '@craftjs/core';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';

export const TextBlock = ({ text, fontSize, color, align }) => {
  const {
    connectors: { connect, drag },
  } = useNode();

  return (
    <div
      ref={(ref) => connect(drag(ref))}
      className={`text-${fontSize} text-${align}`}
      style={{ color }}
    >
      {text}
    </div>
  );
};

TextBlock.craft = {
  displayName: 'Text Block',
  props: {
    text: 'Enter text here',
    fontSize: 'base',
    color: '#000000',
    align: 'left',
  },
  related: {
    settings: function TextBlockSettings() {
      const {
        actions: { setProp },
        text,
        fontSize,
        color,
        align,
      } = useNode((node) => ({
        text: node.data.props.text,
        fontSize: node.data.props.fontSize,
        color: node.data.props.color,
        align: node.data.props.align,
      }));

      return (
        <div className="space-y-4">
          <div>
            <label>Text</label>
            <Input
              value={text}
              onChange={(e) => setProp((props) => (props.text = e.target.value))}
            />
          </div>
          {/* Other property inputs... */}
        </div>
      );
    },
  },
};

============================================================
COMPONENT #2: Button
============================================================

**Props:**

- `label`: string
- `variant`: 'default' | 'secondary' | 'outline'
- `onClick`: string (action ID)

**Implementation:**

Similar structure to TextBlock, with Button styling from shadcn/ui.

============================================================
COMPONENT #3: TextInput
============================================================

**Props:**

- `placeholder`: string
- `label`: string
- `value`: string (controlled)

**Implementation:**

Use shadcn/ui Input component as base.

============================================================
COMPONENT #4: Container
============================================================

**Props:**

- `direction`: 'row' | 'column'
- `gap`: number (px)
- `padding`: number (px)
- `children`: React.ReactNode

**Implementation:**

Flex container with configurable layout.

============================================================
COMPONENT #5: SimpleList
============================================================

**Props:**

- `items`: string[] (array of strings)
- `emptyText`: string

**Implementation:**

Display list of items, with empty state.

============================================================
FILES CẦN TẠO:
============================================================

1. `frontend/components/app-builder/components/TextBlock.tsx`
2. `frontend/components/app-builder/components/Button.tsx`
3. `frontend/components/app-builder/components/TextInput.tsx`
4. `frontend/components/app-builder/components/Container.tsx`
5. `frontend/components/app-builder/components/SimpleList.tsx`
6. `frontend/components/app-builder/ComponentPalette.tsx` (update - add 5 components)

============================================================
TIÊU CHÍ THÀNH CÔNG:
============================================================

- ✅ 5 components có thể drag vào canvas
- ✅ Properties panel hiển thị đúng props cho mỗi component
- ✅ Props editable (change text, color, etc.)
- ✅ Preview mode render components đúng

============================================================
TECH STACK:
============================================================

- Next.js 16.0.1, React 19.2, TypeScript 5.6
- Craft.js (latest)
- TailwindCSS 4.0 Alpha, shadcn/ui

============================================================
```

---

### 📋 PROMPT 1.6: Xây Dựng 3 Actions System

**Tuần:** 4 | **Thời gian:** 4-5 giờ | **Trạng thái:** 🔴 Chưa bắt đầu

**👇 COPY TOÀN BỘ PROMPT BÊN DƯỚI:**

```
PROMPT 1.6: Xây Dựng 3 Actions System

============================================================
BỐI CẢNH:
============================================================

Users cần actions để connect components với nhau.

Example: Button click → Append text from TextInput to SimpleList.

============================================================
ACTIONS CẦN XÂY DỰNG:
============================================================

**1. Append to List**

- Trigger: Button onClick
- Source: TextInput (value)
- Target: SimpleList (items array)
- Action: Append value to items

**2. Clear Input**

- Trigger: Button onClick
- Target: TextInput
- Action: Set value to empty string

**3. Show/Hide**

- Trigger: Button onClick
- Target: Any component
- Action: Toggle visibility (CSS display none)

============================================================
TECHNICAL YÊU CẦU:
============================================================

**Action System Design:**

- Use Zustand store for action state
- Visual connector (drag line from Button to Target)
- Action definitions với type, source, target, params

**Example Action Definition:**

// frontend/lib/app-builder/actions.ts

export type Action = {
  id: string;
  type: 'append-to-list' | 'clear-input' | 'show-hide';
  sourceId: string; // Component ID (Button)
  targetId: string; // Component ID (SimpleList, TextInput)
  params?: Record<string, any>;
};

export function executeAction(action: Action, state: any) {
  switch (action.type) {
    case 'append-to-list': {
      const source = state.components[action.sourceId];
      const target = state.components[action.targetId];
      target.items.push(source.value);
      break;
    }
    case 'clear-input': {
      const target = state.components[action.targetId];
      target.value = '';
      break;
    }
    case 'show-hide': {
      const target = state.components[action.targetId];
      target.visible = !target.visible;
      break;
    }
  }
}

============================================================
FILES CẦN TẠO:
============================================================

1. `frontend/lib/app-builder/actions.ts` (action definitions + executor)
2. `frontend/components/app-builder/ActionConnector.tsx` (visual UI để connect)
3. `frontend/components/app-builder/ActionsPanel.tsx` (sidebar hiển thị actions)
4. `frontend/stores/actionsStore.ts` (Zustand store)

============================================================
TIÊU CHÍ THÀNH CÔNG:
============================================================

- ✅ Actions có thể connect với components (visual workflow)
- ✅ Actions hoạt động trong preview mode
- ✅ Visual feedback khi connect actions (drag line animation)
- ✅ Actions persist when save app definition

============================================================
TECH STACK:
============================================================

- Next.js 16.0.1, React 19.2, TypeScript 5.6
- Craft.js (latest)
- Zustand + Immer
- TailwindCSS 4.0 Alpha, shadcn/ui

============================================================
```

---

### 📋 PROMPT 1.7: Save/Load App Definition + AppRenderer

**Tuần:** 4 | **Thời gian:** 5-6 giờ | **Trạng thái:** 🔴 Chưa bắt đầu

**👇 COPY TOÀN BỘ PROMPT BÊN DƯỚI:**

```
PROMPT 1.7: Save/Load App Definition + AppRenderer

============================================================
BỐI CẢNH:
============================================================

Users build app trong App Builder → Cần save vào database → Render trên Dashboard.

============================================================
NHIỆM VỤ:
============================================================

**1. Save App Definition**

- Serialize Craft.js state thành JSON
- Save vào bảng `app_minis` (Supabase)
- Include: name, description, schema (JSONB)

**2. Load App Definition**

- Load từ `app_minis`
- Deserialize JSON → Craft.js state
- Restore editor state

**3. AppRenderer**

- Component render app từ JSON definition
- Dùng trong Dashboard (khi user add app)
- Runtime render (không phải editor mode)

============================================================
TECHNICAL YÊU CẦU:
============================================================

**Serialization:**

// frontend/lib/app-builder/serializer.ts

import { useEditor } from '@craftjs/core';

export function serializeApp() {
  const { query } = useEditor();
  return query.serialize();
}

export function deserializeApp(json: string) {
  const { actions } = useEditor();
  actions.deserialize(json);
}

**Database Queries:**

// frontend/lib/supabase/app-minis.ts

export async function saveApp(userId: string, appData: {
  name: string;
  description: string;
  schema: any;
}) {
  const { data, error } = await supabase
    .from('app_minis')
    .insert({
      user_id: userId,
      type: 'custom',
      name: appData.name,
      description: appData.description,
      schema: appData.schema,
    })
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function loadApp(appId: string) {
  const { data, error } = await supabase
    .from('app_minis')
    .select('*')
    .eq('id', appId)
    .single();

  if (error) throw error;
  return data;
}

============================================================
DATABASE SCHEMA:
============================================================

-- Table: app_minis
CREATE TABLE IF NOT EXISTS app_minis (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  type TEXT NOT NULL DEFAULT 'custom',
  name TEXT NOT NULL,
  description TEXT,
  icon TEXT, -- Lucide icon name
  schema JSONB NOT NULL, -- Craft.js serialized state
  data JSONB DEFAULT '{}'::jsonb, -- Runtime data (items, state)
  config JSONB DEFAULT '{}'::jsonb, -- User config
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS Policies
ALTER TABLE app_minis ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage their own apps"
ON app_minis
FOR ALL
USING (auth.uid() = user_id);

-- Index
CREATE INDEX idx_app_minis_user_id ON app_minis(user_id);
CREATE INDEX idx_app_minis_type ON app_minis(type);

============================================================
APPRENDERER COMPONENT:
============================================================

// frontend/components/app-builder/AppRenderer.tsx

export function AppRenderer({ appId }: { appId: string }) {
  const { data: app } = useQuery({
    queryKey: ['app', appId],
    queryFn: () => loadApp(appId),
  });

  if (!app) return <div>Loading...</div>;

  // Render app từ schema
  return <CraftJSRenderer schema={app.schema} />;
}

============================================================
FILES CẦN TẠO:
============================================================

1. `frontend/lib/app-builder/serializer.ts`
2. `frontend/components/app-builder/AppRenderer.tsx`
3. `frontend/lib/supabase/app-minis.ts`
4. Migration: `supabase/migrations/003_app_minis_table.sql`

============================================================
TIÊU CHÍ THÀNH CÔNG:
============================================================

- ✅ App save vào database thành công
- ✅ App load từ database và restore editor state
- ✅ AppRenderer render app đúng từ JSON
- ✅ App xuất hiện trên Dashboard sau khi publish
- ✅ Multiple apps không conflict (isolated state)

============================================================
TECH STACK:
============================================================

- Next.js 16.0.1, React 19.2, TypeScript 5.6
- Craft.js (latest)
- Supabase PostgreSQL 15.6
- TanStack Query v5

============================================================
```

---

### 📋 PROMPT 1.8: Xây Dựng 3 Template Apps

**Tuần:** 4 | **Thời gian:** 4-5 giờ | **Trạng thái:** 🔴 Chưa bắt đầu

**👇 COPY TOÀN BỘ PROMPT BÊN DƯỚI:**

```
PROMPT 1.8: Xây Dựng 3 Template Apps

============================================================
BỐI CẢNH:
============================================================

Cần 3 template apps pre-built để users có thể clone và customize.

Mục đích: Onboarding, showcase App Builder capabilities.

============================================================
TEMPLATE APPS:
============================================================

**1. Guest Book**

- Components: TextInput (name), Button (submit), SimpleList (guests)
- Actions: Button onClick → Append name to list → Clear input

**2. Shopping List**

- Components: TextInput (item), Button (add), SimpleList (items), Button (clear all)
- Actions: Add button → Append, Clear button → Clear list

**3. Expense Tracker (Simple)**

- Components: TextInput (amount), TextInput (description), Button (add),
  SimpleList (expenses), TextBlock (total)
- Actions: Add button → Append to list → Update total

============================================================
TECHNICAL YÊU CẦU:
============================================================

**Pre-seed Script:**

// scripts/seed-template-apps.ts

import { supabase } from './supabase-client';

const TEMPLATE_APPS = [
  {
    name: 'Guest Book',
    description: 'Simple guest book for events',
    icon: 'BookUser',
    schema: { /* Craft.js JSON */ },
  },
  // ... other templates
];

async function seedTemplates() {
  for (const app of TEMPLATE_APPS) {
    await supabase.from('app_minis').insert({
      user_id: 'system', // System user
      type: 'template',
      ...app,
    });
  }
}

============================================================
FILES CẦN TẠO:
============================================================

1. `scripts/seed-template-apps.ts`
2. `frontend/app/templates/page.tsx` (Templates gallery)

============================================================
TIÊU CHÍ THÀNH CÔNG:
============================================================

- ✅ 3 template apps available in Templates gallery
- ✅ Users can preview template before install
- ✅ Users can clone template to their library
- ✅ Cloned app fully customizable

============================================================
TECH STACK:
============================================================

- Next.js 16.0.1, React 19.2, TypeScript 5.6
- Craft.js (latest)
- Supabase PostgreSQL 15.6
- Node.js for seed script

============================================================
```

---

## 🛒 GIAI ĐOẠN 2: MARKETPLACE (Tuần 5-6)

**Mục tiêu:** Marketplace có 10+ apps, install flow works, publish flow works

---

### 📋 PROMPT 2.1: Xây Dựng Marketplace Browse Page

**Tuần:** 5 | **Thời gian:** 4-5 giờ | **Trạng thái:** 🔴 Chưa bắt đầu

**👇 COPY TOÀN BỘ PROMPT BÊN DƯỚI:**

```
PROMPT 2.1: Xây Dựng Marketplace Browse Page

============================================================
BỐI CẢNH:
============================================================

Users cần browse apps được publish bởi community.

============================================================
YÊU CẦU CHỨC NĂNG:
============================================================

**1. Grid Layout**

- App cards trong responsive grid
- Desktop: 3 columns
- Tablet: 2 columns
- Mobile: 1 column

**2. Filters**

- Category: All, Productivity, Finance, CRM, Analytics, Custom
- Sort: Popular (downloads), Recent, Top Rated

**3. Search**

- Search bar (fuzzy search by name, description)
- Real-time filter as user types

**4. App Card**

- Screenshot/icon
- Name + description (truncate)
- Author avatar + name
- Stats: Downloads, rating (stars)
- Install button

============================================================
DATABASE SCHEMA:
============================================================

-- Table: marketplace_apps
CREATE TABLE IF NOT EXISTS marketplace_apps (
  id UUID PRIMARY KEY REFERENCES app_minis(id) ON DELETE CASCADE,
  is_published BOOLEAN DEFAULT FALSE,
  category TEXT NOT NULL,
  tags TEXT[],
  screenshot_url TEXT,
  download_count INTEGER DEFAULT 0,
  rating_avg DECIMAL(3,2) DEFAULT 0,
  rating_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS: Public read, owner write
ALTER TABLE marketplace_apps ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read published apps"
ON marketplace_apps
FOR SELECT
USING (is_published = true);

CREATE POLICY "Users can publish their apps"
ON marketplace_apps
FOR INSERT
WITH CHECK (EXISTS (
  SELECT 1 FROM app_minis
  WHERE app_minis.id = marketplace_apps.id
  AND app_minis.user_id = auth.uid()
));

============================================================
FILES CẦN TẠO:
============================================================

1. `frontend/app/marketplace/page.tsx`
2. `frontend/components/marketplace/AppCard.tsx`
3. `frontend/components/marketplace/Filters.tsx`
4. `frontend/lib/supabase/marketplace.ts`

============================================================
TIÊU CHÍ THÀNH CÔNG:
============================================================

- ✅ Marketplace browse page loads < 1s
- ✅ Filter/sort works correctly
- ✅ Search returns relevant results
- ✅ App cards display correctly

============================================================
TECH STACK:
============================================================

- Next.js 16.0.1, React 19.2, TypeScript 5.6
- Supabase PostgreSQL 15.6
- TailwindCSS 4.0 Alpha, shadcn/ui
- TanStack Query v5

============================================================
```

---

### 📋 PROMPT 2.2: Xây Dựng App Detail Page + Install Flow

**Tuần:** 5-6 | **Thời gian:** 4-5 giờ | **Trạng thái:** 🔴 Chưa bắt đầu

**👇 COPY TOÀN BỘ PROMPT BÊN DƯỚI:**

```
PROMPT 2.2: Xây Dựng App Detail Page + Install Flow

============================================================
BỐI CẢNH:
============================================================

Users click app card → Navigate to detail page → Can install or fork.

============================================================
YÊU CẦU CHỨC NĂNG:
============================================================

**App Detail Page:**

- Large screenshot or live preview (iframe)
- Full description (markdown support)
- Author profile (avatar, name, link)
- Stats: Downloads, rating, created date
- Install button (primary CTA)
- Fork button (secondary)
- Reviews section (future)

**Install Flow:**

1. User clicks "Install"
2. Copy app definition to user's library
3. Show success toast: "App installed! Add to dashboard?"
4. Redirect to Dashboard or Library

============================================================
DATABASE SCHEMA:
============================================================

-- Table: app_installations
CREATE TABLE IF NOT EXISTS app_installations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  marketplace_app_id UUID REFERENCES marketplace_apps(id) ON DELETE CASCADE,
  installed_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, marketplace_app_id)
);

-- Increment download count trigger
CREATE OR REPLACE FUNCTION increment_download_count()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE marketplace_apps
  SET download_count = download_count + 1
  WHERE id = NEW.marketplace_app_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER on_app_install
AFTER INSERT ON app_installations
FOR EACH ROW
EXECUTE FUNCTION increment_download_count();

============================================================
FILES CẦN TẠO:
============================================================

1. `frontend/app/marketplace/[id]/page.tsx`
2. `frontend/components/marketplace/InstallButton.tsx`
3. `frontend/lib/supabase/install-app.ts`

============================================================
TIÊU CHÍ THÀNH CÔNG:
============================================================

- ✅ App detail page loads < 1s
- ✅ Install button works (copy app to user's library)
- ✅ Download count increments
- ✅ Installed app appears in user's library

============================================================
TECH STACK:
============================================================

- Next.js 16.0.1, React 19.2, TypeScript 5.6
- Supabase PostgreSQL 15.6
- TailwindCSS 4.0 Alpha, shadcn/ui
- TanStack Query v5

============================================================
```

---

### 📋 PROMPT 2.3: Xây Dựng Publish Flow

**Tuần:** 6 | **Thời gian:** 4-5 giờ | **Trạng thái:** 🔴 Chưa bắt đầu

**👇 COPY TOÀN BỘ PROMPT BÊN DƯỚI:**

```
PROMPT 2.3: Xây Dựng Publish Flow

============================================================
BỐI CẢNH:
============================================================

Users muốn publish app họ đã build lên Marketplace.

============================================================
PUBLISH FLOW:
============================================================

**1. Publish Button (trong App Builder)**

- Button "Publish to Marketplace"
- Open modal với form

**2. Publish Form**

- Name (pre-filled)
- Description (markdown editor)
- Category (dropdown)
- Tags (multi-select)
- Screenshot (file upload to Supabase Storage)

**3. Validation**

- App must have at least 1 component
- Name không trống, <= 50 chars
- Description <= 500 chars
- Screenshot < 2MB, aspect ratio 16:9

**4. Submit**

- Create entry trong `marketplace_apps`
- Upload screenshot to Supabase Storage
- Show success: "App published!"
- Redirect to app detail page

============================================================
FILES CẦN TẠO:
============================================================

1. `frontend/components/app-builder/PublishModal.tsx`
2. `frontend/lib/supabase/publish-app.ts`

============================================================
TIÊU CHÍ THÀNH CÔNG:
============================================================

- ✅ Publish form validation works
- ✅ Screenshot upload works
- ✅ Published app appears on Marketplace browse
- ✅ Owner can unpublish app

============================================================
TECH STACK:
============================================================

- Next.js 16.0.1, React 19.2, TypeScript 5.6
- Supabase PostgreSQL 15.6, Storage
- TailwindCSS 4.0 Alpha, shadcn/ui
- TanStack Query v5

============================================================
```

---

## 🧪 GIAI ĐOẠN 3: VALIDATION (Tuần 7-8)

**Mục tiêu:** 20 beta users, 5+ user-created apps published

---

### 📋 PROMPT 3.1: Beta Recruitment Strategy

**Tuần:** 7 | **Thời gian:** 10-15 giờ | **Trạng thái:** 🔴 Chưa bắt đầu

**👇 COPY TOÀN BỘ PROMPT BÊN DƯỚI:**

```
PROMPT 3.1: Beta Recruitment Strategy

============================================================
BỐI CẢNH:
============================================================

Cần recruit 20 beta users để validate product-market fit.

============================================================
CHANNELS:
============================================================

**1. Reddit**

- r/productivity (250K members)
- r/nocode (50K members)
- r/SideProject (200K members)

**Post Template:**

I built a platform where you can create your own productivity tools (no code required)

Hey r/productivity! I've been working on NEXUS - a platform that lets you
build custom productivity apps without coding.

**What it does:**
- Drag-and-drop app builder
- Pre-built templates (to-do, habit tracker, expense tracker)
- Marketplace to share/discover apps

**Why I built this:**
I was tired of switching between 5 different tools. Wanted one dashboard
with exactly the tools I need.

**Looking for beta testers!**
- Free lifetime access for first 20 users
- Your feedback shapes the product

**Try it:** [link]

Happy to answer any questions!

**2. ProductHunt (Soft Launch)**

- "Ship" page (preview)
- Collect emails for launch day
- Engage with comments

**3. Twitter/X**

- Build in public threads
- Demo GIFs/videos
- Engage with #nocode community

**4. Direct Outreach**

- Email to previous users (if any)
- DM to productivity influencers
- Post in indie hacker communities

============================================================
TARGET:
============================================================

- 20 beta users signed up
- 10 active users (use app >= 3 times)

============================================================
TIÊU CHÍ THÀNH CÔNG:
============================================================

- ✅ 20+ signups within 7 days
- ✅ 10+ active users
- ✅ 5+ user-created apps published to marketplace

============================================================
NOTES:
============================================================

This is a marketing/outreach prompt, not a coding prompt. Focus on crafting
compelling copy and identifying the right channels.

============================================================
```

---

### 📋 PROMPT 3.2: Onboarding Flow + Feedback System

**Tuần:** 8 | **Thời gian:** 6-8 giờ | **Trạng thái:** 🔴 Chưa bắt đầu

**👇 COPY TOÀN BỘ PROMPT BÊN DƯỚI:**

```
PROMPT 3.2: Onboarding Flow + Feedback System

============================================================
BỐI CẢNH:
============================================================

New users cần onboarding để understand NEXUS, và cần feedback system
để collect insights.

============================================================
ONBOARDING FLOW:
============================================================

**Step 1: Welcome Screen**

- Explain NEXUS in 3 bullet points
- CTA: "Get Started"

**Step 2: Choose Template or Start Fresh**

- Gallery of 3 template apps
- Or "Start from scratch" button

**Step 3: Add to Dashboard**

- Drag template app vào dashboard
- Show tooltip: "You can resize and move cards"

**Step 4: Build Your First App (Optional)**

- Guided tour of App Builder
- Steps: Drag component → Edit props → Preview → Save

**Step 5: Invite to Community**

- Discord link
- Feedback form link

============================================================
FEEDBACK SYSTEM:
============================================================

**In-App Feedback Widget:**

- Floating button (bottom right)
- Click → Open modal
- Form: Rating (1-5 stars), Comment, Screenshot (optional)
- Submit → Save to `feedback` table

**Database Schema:**

CREATE TABLE IF NOT EXISTS feedback (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id),
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  screenshot_url TEXT,
  page_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

============================================================
FILES CẦN TẠO:
============================================================

1. `frontend/app/onboarding/page.tsx`
2. `frontend/components/onboarding/WelcomeScreen.tsx`
3. `frontend/components/onboarding/TemplateGallery.tsx`
4. `frontend/components/feedback/FeedbackWidget.tsx`
5. Migration: `supabase/migrations/004_feedback_table.sql`

============================================================
TIÊU CHÍ THÀNH CÔNG:
============================================================

- ✅ 80% users complete onboarding
- ✅ 50% users submit feedback
- ✅ Average rating >= 4.0

============================================================
TECH STACK:
============================================================

- Next.js 16.0.1, React 19.2, TypeScript 5.6
- Supabase PostgreSQL 15.6
- TailwindCSS 4.0 Alpha, shadcn/ui
- TanStack Query v5

============================================================
```

---

## 🚦 GIAI ĐOẠN 4: DECISION POINT (Tuần 9-12)

---

### 📋 PROMPT 4.1: Analytics & Decision Framework

**Tuần:** 9 | **Thời gian:** 4-6 giờ | **Trạng thái:** 🔴 Chưa bắt đầu

**👇 COPY TOÀN BỘ PROMPT BÊN DƯỚI:**

```
PROMPT 4.1: Analytics & Decision Framework

============================================================
BỐI CẢNH:
============================================================

Week 8 results sẽ quyết định GO/NO-GO cho Low-Code phase.

============================================================
METRICS DASHBOARD:
============================================================

**Key Metrics:**

1. **Signups:** Total users
2. **Activation:** % users who add >= 1 app to dashboard
3. **Retention:** D1, D7, D30 retention rates
4. **Engagement:** Apps created, apps installed from marketplace
5. **Virality:** Shares, referrals

**Implementation:**

Build simple admin dashboard displaying:

- Total signups (count from auth.users)
- Activation rate (users with >= 1 app on dashboard)
- Retention cohorts (D1, D7, D30)
- User-created apps count
- Marketplace installations count
- Average feedback rating

============================================================
GO CRITERIA (Week 8):
============================================================

- ✅ 20+ signups
- ✅ 5+ user-created apps published
- ✅ 20+ app installations
- ✅ 1+ app forked & customized
- ✅ 3+ users return on Day 7
- ✅ Average rating >= 4.0

============================================================
NO-GO CRITERIA:
============================================================

- ❌ < 10 signups
- ❌ < 2 user-created apps
- ❌ < 10 installations
- ❌ Average rating < 3.0

============================================================
DECISION TREE:
============================================================

Week 8 Results
├─ GO (metrics đạt)
│  └─ Week 10-12: Build Low-Code features
│     ├─ Conditional logic
│     ├─ Database integration
│     ├─ Form validation
│     └─ 5+ advanced components
│
└─ NO-GO (metrics không đạt)
   ├─ Option A: Pivot (change target market/positioning)
   ├─ Option B: Shutdown (graceful sunset)
   └─ Option C: Continue as side project (no full-time)

============================================================
FILES CẦN TẠO:
============================================================

1. `frontend/app/admin/analytics/page.tsx`
2. `frontend/lib/analytics/queries.ts`
3. `frontend/components/admin/MetricsCard.tsx`

============================================================
TIÊU CHÍ THÀNH CÔNG:
============================================================

- ✅ Dashboard hiển thị accurate metrics
- ✅ Data updates real-time
- ✅ Export metrics to CSV

============================================================
TECH STACK:
============================================================

- Next.js 16.0.1, React 19.2, TypeScript 5.6
- Supabase PostgreSQL 15.6
- TailwindCSS 4.0 Alpha, shadcn/ui
- TanStack Query v5, Recharts (for charts)

============================================================
```

---

## ⚡ WORKFLOW TEMPLATES (DÙNG HÀNG NGÀY)

### TEMPLATE #1: Tự Động Cập Nhật Trạng Thái

**Khi nào dùng:** Mỗi khi hoàn thành một Prompt (1.1, 1.2, etc.)

**Mục đích:** Tự động update `status/FEATURES.md` và `status/THIS_WEEK.md`

#### TEMPLATE PROMPT (Copy-Paste)

```markdown
# NHIỆM VỤ: [Prompt X.Y - Tên Prompt]

## 1. BỐI CẢNH HIỆN TẠI

**Từ `status/THIS_WEEK.md`:**

- Current week: [Tuần X]
- Current phase: [Platform MVP / Marketplace / Validation]
- Tasks planned this week: [list]

**Từ `status/BUGS.md`:**

- Related bugs: [list or "None"]

## 2. YÊU CẦU KỸ THUẬT

[Copy requirements từ Prompt X.Y]

## 3. SẢN PHẨM BÀN GIAO

### Phần 1: Code Hoàn Chỉnh

[AI generate code here]

### Phần 2: Script Tự Động Cập Nhật Trạng Thái

#### Bash Script (Linux/Mac)

```bash
#!/bin/bash
# update-status.sh

FEATURE_NAME="[Prompt X.Y - Tên Feature]"
TODAY=$(date +"%Y-%m-%d")

# Update FEATURES.md
echo "## ✅ $FEATURE_NAME" >> docs/02-EXECUTION/status/FEATURES.md
echo "**Completed:** $TODAY" >> docs/02-EXECUTION/status/FEATURES.md
echo "" >> docs/02-EXECUTION/status/FEATURES.md
echo "**Files Modified:**" >> docs/02-EXECUTION/status/FEATURES.md
echo "- [list files]" >> docs/02-EXECUTION/status/FEATURES.md
echo "" >> docs/02-EXECUTION/status/FEATURES.md

# Update THIS_WEEK.md (check off task)
sed -i "s/- \[ \] \*\*Prompt X.Y\*\*/- [x] **Prompt X.Y**/" docs/02-EXECUTION/status/THIS_WEEK.md

echo "✅ Status updated!"
```

#### PowerShell Script (Windows)

```powershell
# update-status.ps1

param(
    [string]$PromptNumber = "X.Y",
    [string]$FeatureName = "Feature Name"
)

$TODAY = Get-Date -Format "yyyy-MM-dd"
$FEATURES_FILE = "docs\02-EXECUTION\status\FEATURES.md"
$THIS_WEEK_FILE = "docs\02-EXECUTION\status\THIS_WEEK.md"

# Update FEATURES.md
$newEntry = @"

## ✅ Prompt $PromptNumber - $FeatureName
**Completed:** $TODAY

**Files Modified:**
- [list files]

"@

Add-Content -Path $FEATURES_FILE -Value $newEntry

# Update THIS_WEEK.md (check off task)
$content = Get-Content -Path $THIS_WEEK_FILE
$updatedContent = $content -replace "- \[ \] \*\*Prompt $PromptNumber\*\*", "- [x] **Prompt $PromptNumber**"
Set-Content -Path $THIS_WEEK_FILE -Value $updatedContent

Write-Host "✅ Status updated!" -ForegroundColor Green
```

#### How to Run

**Bash:**

```bash
chmod +x update-status.sh
./update-status.sh
```

**PowerShell:**

```powershell
.\update-status.ps1 -PromptNumber "1.1" -FeatureName "DashboardGrid Component"
```

```

---

### TEMPLATE #2: Debug Session

**Khi nào dùng:** Khi gặp bug trong code AI-generated

**Template:**

```markdown
# DEBUG SESSION: [Bug Description]

## 1. BUG DETAILS

- **File:** [path]
- **Line:** [number]
- **Error:** [exact error message]
- **Expected:** [what should happen]
- **Actual:** [what actually happens]

## 2. CONTEXT

- **Related Prompt:** [Prompt X.Y]
- **Tech Stack:** [relevant libraries]
- **Browser/Environment:** [if relevant]

## 3. REPRODUCTION STEPS

1. [Step 1]
2. [Step 2]
3. [Step 3]

## 4. FIX REQUEST

Please provide:

- Root cause analysis
- Fix code
- Explanation of fix
- Prevention tips
```

---

### TEMPLATE #3: Feature Request (Mid-Flight)

**Khi nào dùng:** Khi muốn thêm feature nhỏ không có trong Prompt gốc

**Template:**

```markdown
# FEATURE REQUEST: [Feature Name]

## 1. RATIONALE

**Why this is needed:**

- [Reason 1]
- [Reason 2]

**Impact if not added:**

- [Impact]

## 2. SPECIFICATION

**Functionality:**

- [Detailed spec]

**Acceptance Criteria:**

- [ ] [Criteria 1]
- [ ] [Criteria 2]

## 3. SCOPE CHECK

**Does this align with Whitepaper?** [Yes/No + explanation]

**Is this "Keep It, Don't Polish It" territory?** [Yes/No]

**Can this wait until post-MVP?** [Yes/No]
```

---

## 📚 QUICK REFERENCE

### Essential Info Trong Mỗi Prompt

**Format Chuẩn:**

```markdown
Context: [Đang build gì, ở đâu trong project]
Stack: Next.js 16, React 19, TypeScript, Supabase, TailwindCSS
Location: [file path]
Requirements:

1. [Requirement 1]
2. [Requirement 2]

Constraints: [free tier, performance, mobile-first]
Expected output: [component, function, full page]
```

### Copy-Paste Template

```markdown
Tạo [gì] cho NEXUS [context].

Context:

- [Mô tả ngắn gọn]
- Stack: Next.js 16, React 19, TypeScript, Supabase
- Location: [file path]

Requirements:

1. [Requirement 1]
2. [Requirement 2]
3. [Requirement 3]

[Sections khác nếu cần: Styling, Performance, Database]

Expected output: [Files/code muốn nhận]
```

---

## 🎯 SUCCESS METRICS CHO PROMPTS TỐT

### ✅ Prompt Tốt Tạo Ra

- Code chạy được mà không có lỗi lớn
- Follow project conventions (TypeScript, TailwindCSS)
- Có error handling và loading states
- Mobile-responsive by default
- < 5 lỗi nhỏ cần fix

### ❌ Prompt Tệ Tạo Ra

- Code không compile
- Dùng sai libraries
- Thiếu requirements quan trọng
- Cần viết lại hoàn toàn

---

## 📊 PROMPT PROGRESS TRACKER

| Prompt        | Name                  | Week | Status | Completed |
| ------------- | --------------------- | ---- | ------ | --------- |
| **1.1** | DashboardGrid         | 1    | 🔴     | -         |
| **1.2** | AppMiniCard           | 1    | 🔴     | -         |
| **1.3** | 3 App Minis           | 2    | 🔴     | -         |
| **1.4** | Thiết lập Craft.js  | 3    | 🔴     | -         |
| **1.5** | 5 Builder Components  | 3    | 🔴     | -         |
| **1.6** | 3 Actions System      | 4    | 🔴     | -         |
| **1.7** | Save/Load + Renderer  | 4    | 🔴     | -         |
| **1.8** | 3 Template Apps       | 4    | 🔴     | -         |
| **2.1** | Marketplace Browse    | 5    | 🔴     | -         |
| **2.2** | App Detail + Install  | 5-6  | 🔴     | -         |
| **2.3** | Publish Flow          | 6    | 🔴     | -         |
| **3.1** | Beta Recruitment      | 7    | 🔴     | -         |
| **3.2** | Onboarding + Feedback | 8    | 🔴     | -         |
| **4.1** | Analytics & Decision  | 9    | 🔴     | -         |

**Legend:**

- 🔴 Chưa bắt đầu
- 🟡 Đang làm
- 🟢 Hoàn thành

---

**Nhớ:** Dành 2 phút craft prompt tốt → Tiết kiệm 20 phút debug code tệ.

**Cập nhật lần cuối:** 17 tháng 11, 2025

**Version:** 3.0 - Copy-Paste Optimized Format
