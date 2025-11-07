# Tiptap Editor Component

Rich text editor component được xây dựng với Tiptap cho NEXUS platform.

## 📋 Tổng quan

Component này cung cấp một editor WYSIWYG (What You See Is What You Get) giống Notion với các tính năng:

- ✅ Text formatting (Bold, Italic)
- ✅ Headings (H1, H2, H3)
- ✅ Lists (Bullet & Numbered)
- ✅ Links
- ✅ Auto-save mỗi 2 giây
- ✅ Optimistic UI updates
- ✅ Loading indicators
- ✅ Mobile-friendly
- ✅ Lazy loading với Next.js dynamic import

## 🚀 Cách sử dụng

### Basic Usage

```tsx
import { Editor } from '@/components/editor';

function MyPage() {
  return (
    <Editor
      docId="unique-doc-id"
      initialContent="<p>Nội dung ban đầu</p>"
      onSave={(content) => console.log('Saved:', content)}
      placeholder="Bắt đầu viết..."
    />
  );
}
```

### With Custom Styling

```tsx
<Editor
  docId="doc-123"
  initialContent="<h1>Hello World</h1>"
  className="min-h-screen"
  editable={true}
  onSave={async (content) => {
    // Custom save logic
    await saveToDatabase(content);
  }}
/>
```

## 📦 Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `docId` | `string` | ✅ | - | ID của document để lưu vào database |
| `initialContent` | `string` | ❌ | `''` | Nội dung HTML ban đầu |
| `onSave` | `(content: string) => void \| Promise<void>` | ❌ | - | Callback khi save thành công |
| `placeholder` | `string` | ❌ | `'Start typing...'` | Placeholder text |
| `editable` | `boolean` | ❌ | `true` | Có thể chỉnh sửa không |
| `className` | `string` | ❌ | `''` | Custom CSS classes |

## 🎨 Styling

Editor sử dụng Tailwind CSS và có thể customize thông qua:

1. **Global styles** trong `app/globals.css`:
```css
.tiptap h1 {
  font-size: 2.5rem;
  font-weight: 700;
}
```

2. **Component props**:
```tsx
<Editor className="border rounded-lg shadow-xl" />
```

3. **Tailwind prose plugin** (đã cài sẵn):
```tsx
// Editor tự động apply prose classes
```

## 🔧 Architecture

### Components

```
components/editor/
├── index.tsx           # Export & lazy loading wrapper
├── TiptapEditor.tsx    # Main editor component
├── EditorToolbar.tsx   # Toolbar với format buttons
└── README.md           # Documentation
```

### Data Flow

```
User types
    ↓
Editor onChange
    ↓
Update local state (Optimistic UI)
    ↓
Debounce 2 seconds
    ↓
Save to Supabase
    ↓
Show save status
```

## ⚡ Performance

### Lazy Loading

Component sử dụng Next.js `dynamic` import để lazy load:

```tsx
// Chỉ load khi component được render
const TiptapEditor = dynamic(() => import('./TiptapEditor'), {
  ssr: false,
  loading: () => <LoadingSpinner />
});
```

### Debouncing

Auto-save được debounce để tránh quá nhiều requests:

```tsx
// Chỉ save sau 2 giây kể từ lần thay đổi cuối
const debouncedSave = useCallback((content) => {
  clearTimeout(timeout);
  timeout = setTimeout(() => save(content), 2000);
}, []);
```

### Optimistic Updates

UI update ngay lập tức, không đợi server response:

```tsx
onUpdate: ({ editor }) => {
  setContent(editor.getHTML()); // Update UI ngay
  debouncedSave(content);       // Save sau
}
```

## 🎯 Extensions

Editor sử dụng các Tiptap extensions:

- **StarterKit**: Base functionality (paragraphs, bold, italic, etc.)
- **Link**: Hyperlink support
- **Placeholder**: Placeholder text

### Thêm Extensions

```tsx
import Highlight from '@tiptap/extension-highlight';

const editor = useEditor({
  extensions: [
    StarterKit,
    Link,
    Placeholder,
    Highlight, // Thêm extension mới
  ],
});
```

## 📱 Mobile Support

Editor hoàn toàn responsive:

- Touch-friendly toolbar buttons
- Proper viewport scaling
- Mobile keyboard optimization

## 🐛 Troubleshooting

### Editor không hiển thị

```tsx
// Đảm bảo wrap trong 'use client' component
'use client';

import { Editor } from '@/components/editor';
```

### Auto-save không hoạt động

```tsx
// Kiểm tra Supabase connection
// Xem console logs để debug
onSave={(content) => {
  console.log('Saving:', content);
}}
```

### Styling không đúng

```bash
# Đảm bảo đã cài @tailwindcss/typography
npm install @tailwindcss/typography
```

## 📚 Resources

- [Tiptap Documentation](https://tiptap.dev)
- [Tiptap Examples](https://tiptap.dev/examples)
- [Next.js Dynamic Import](https://nextjs.org/docs/advanced-features/dynamic-import)

## 🔄 Future Improvements

- [ ] Image upload support
- [ ] Table support
- [ ] Code block với syntax highlighting
- [ ] Collaborative editing
- [ ] Version history
- [ ] Export to Markdown/PDF
- [ ] Comments & mentions
- [ ] Emoji picker
