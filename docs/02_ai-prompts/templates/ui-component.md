# 🎨 Prompt Template: UI Component

> **Sử dụng khi:** Tạo UI component mới (Button, Modal, Dropdown, etc.)

---

## 🎯 **TEMPLATE**

````
Create [Component Name] component for NEXUS Productivity OS using shadcn/ui patterns.

### Context:
- Project: Next.js 16 + React 19 + TypeScript
- UI Library: shadcn/ui (copy-paste components)
- Styling: Tailwind CSS 4
- Location: frontend/components/[category]/[component-name].tsx

### Requirements:
1. [Requirement 1 - Visual specs]
2. [Requirement 2 - Interaction specs]
3. [Requirement 3 - Props/API]
...

### Design Specs:

**Visual:**
- Size: [sm / md / lg / xl]
- Colors: [primary / secondary / destructive / ghost]
- Border radius: [rounded-sm / rounded-md / rounded-lg]
- Shadow: [shadow-sm / shadow-md / shadow-lg]
- Padding: [p-2 / p-4 / p-6]

**Typography:**
- Font: Inter
- Size: [text-xs / text-sm / text-base / text-lg]
- Weight: [font-normal / font-medium / font-semibold]
- Color: [text-gray-900 / text-gray-600 / text-gray-500]

**Interactions:**
- Hover: [Màu gì? Scale? Shadow?]
- Active: [Màu gì? Transform?]
- Focus: [Ring color? Outline?]
- Disabled: [opacity-50? cursor-not-allowed?]

### Component API:

```tsx
interface [ComponentName]Props {
  // Required props
  children: React.ReactNode

  // Optional props
  variant?: 'default' | 'primary' | 'secondary' | 'destructive'
  size?: 'sm' | 'md' | 'lg'
  className?: string

  // Event handlers
  onClick?: () => void
  onClose?: () => void
  // ... other handlers
}

export function [ComponentName]({
  children,
  variant = 'default',
  size = 'md',
  className,
  ...props
}: [ComponentName]Props) {
  // Implementation
}
````

### Variants:

**variant="default":**

- Background: bg-white
- Border: border border-gray-200
- Text: text-gray-900
- Hover: bg-gray-50

**variant="primary":**

- Background: bg-blue-600
- Border: No border
- Text: text-white
- Hover: bg-blue-700

**variant="destructive":**

- Background: bg-red-600
- Border: No border
- Text: text-white
- Hover: bg-red-700

### Sizes:

**size="sm":**

- Height: h-8
- Padding: px-3
- Text: text-sm

**size="md":**

- Height: h-10
- Padding: px-4
- Text: text-base

**size="lg":**

- Height: h-12
- Padding: px-6
- Text: text-lg

### Accessibility:

- [ ] role="[button/dialog/menu/etc]"
- [ ] aria-label for icon-only components
- [ ] aria-expanded for dropdowns
- [ ] aria-disabled for disabled state
- [ ] Keyboard navigation (Tab, Enter, Space, Esc)
- [ ] Focus visible ring

### Implementation Details:

**Use Class Variance Authority (cva):**

```tsx
import { cva, type VariantProps } from "class-variance-authority"

const [componentName]Variants = cva(
  "base-classes", // Base classes cho tất cả variants
  {
    variants: {
      variant: {
        default: "bg-white border border-gray-200",
        primary: "bg-blue-600 text-white",
        destructive: "bg-red-600 text-white",
      },
      size: {
        sm: "h-8 px-3 text-sm",
        md: "h-10 px-4 text-base",
        lg: "h-12 px-6 text-lg",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
)
```

**Use cn() utility for className merging:**

```tsx
import { cn } from "@/lib/utils"

<div className={cn([componentName]Variants({ variant, size }), className)}>
  {children}
</div>
```

### Files to Create:

```
frontend/components/[category]/[component-name].tsx
```

### Example Usage:

```tsx
import { [ComponentName] } from '@/components/[category]/[component-name]'

// Default
<[ComponentName]>Content here</[ComponentName]>

// Primary variant, large size
<[ComponentName] variant="primary" size="lg">
  Click me
</[ComponentName]>

// With custom className
<[ComponentName] className="mt-4">
  Custom styled
</[ComponentName]>
```

### Testing:

- [ ] All variants render correctly
- [ ] All sizes work
- [ ] Custom className merges properly
- [ ] Hover states work
- [ ] Click handlers fire
- [ ] Keyboard navigation works
- [ ] Accessible (screen reader test)

```

---

## 📋 **EXAMPLE - Priority Badge**

```

Create **Priority Badge** component for NEXUS Productivity OS using shadcn/ui patterns.

### Context:

- Project: Next.js 16 + React 19 + TypeScript
- UI Library: shadcn/ui
- Styling: Tailwind CSS 4
- Location: frontend/components/tasks/priority-badge.tsx

### Requirements:

1. Display priority level với color-coded badges
2. 5 priority levels: Urgent, High, Medium, Low, None
3. Each level có màu riêng (red, orange, blue, gray, default)
4. Size: sm (task list) và lg (task detail modal)
5. Optional: Click to change priority (với dropdown)

### Design Specs:

**Visual:**

- Size: sm (h-5 px-2 text-xs), lg (h-6 px-3 text-sm)
- Border radius: rounded-full (pill shape)
- Font: Inter, font-medium

**Colors:**

- Urgent: bg-red-100 text-red-700 border-red-200
- High: bg-orange-100 text-orange-700 border-orange-200
- Medium: bg-blue-100 text-blue-700 border-blue-200
- Low: bg-gray-100 text-gray-700 border-gray-200
- None: bg-transparent text-gray-400 (no border)

### Component API:

```tsx
interface PriorityBadgeProps {
  priority: 'urgent' | 'high' | 'medium' | 'low' | 'none';
  size?: 'sm' | 'lg';
  onClick?: () => void; // Optional - for clickable badge
  className?: string;
}

export function PriorityBadge({ priority, size = 'sm', onClick, className }: PriorityBadgeProps) {
  // Implementation
}
```

### Variants:

```tsx
const badgeVariants = cva('inline-flex items-center border font-medium transition-colors', {
  variants: {
    priority: {
      urgent: 'bg-red-100 text-red-700 border-red-200 hover:bg-red-200',
      high: 'bg-orange-100 text-orange-700 border-orange-200 hover:bg-orange-200',
      medium: 'bg-blue-100 text-blue-700 border-blue-200 hover:bg-blue-200',
      low: 'bg-gray-100 text-gray-700 border-gray-200 hover:bg-gray-200',
      none: 'bg-transparent text-gray-400 border-transparent',
    },
    size: {
      sm: 'h-5 px-2 text-xs rounded-full',
      lg: 'h-6 px-3 text-sm rounded-full',
    },
  },
  defaultVariants: {
    priority: 'none',
    size: 'sm',
  },
});
```

### Example Usage:

```tsx
import { PriorityBadge } from '@/components/tasks/priority-badge'

// In task list
<PriorityBadge priority="urgent" size="sm" />

// In task detail modal
<PriorityBadge priority="high" size="lg" />

// Clickable (with dropdown)
<PriorityBadge
  priority="medium"
  onClick={() => setShowDropdown(true)}
/>
```

```

---

**Last Updated:** November 8, 2025
**Usage:** Copy template, fill in details, paste to AI
```
