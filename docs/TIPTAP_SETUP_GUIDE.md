# 📝 Hướng dẫn Setup Tiptap Editor cho NEXUS

## ✅ Đã hoàn thành

### 1. Component Files
- ✅ `frontend/components/editor/TiptapEditor.tsx` - Main editor component
- ✅ `frontend/components/editor/EditorToolbar.tsx` - Toolbar với format buttons
- ✅ `frontend/components/editor/index.tsx` - Lazy loading wrapper
- ✅ `frontend/types/editor.types.ts` - TypeScript types

### 2. Dependencies
```json
{
  "@tiptap/react": "^3.10.2",
  "@tiptap/starter-kit": "^3.10.2",
  "@tiptap/extension-link": "^3.10.2",
  "@tiptap/extension-placeholder": "^3.10.2",
  "@tailwindcss/typography": "^0.5.19",
  "lucide-react": "latest"
}
```

### 3. Styling
- ✅ Đã thêm Tiptap styles vào `frontend/app/globals.css`
- ✅ Notion-like appearance (clean, spacious)
- ✅ Mobile-friendly responsive design

### 4. Demo Page
- ✅ `frontend/app/editor-demo/page.tsx` - Trang test editor

## 🚀 Cách sử dụng

### Basic Usage

```tsx
import { Editor } from '@/components/editor';

export default function MyPage() {
  const handleSave = async (content: string) => {
    console.log('Saving:', content);
    // Custom save logic
  };

  return (
    <Editor
      docId="unique-document-id"
      initialContent="<h1>Hello World</h1>"
      onSave={handleSave}
      placeholder="Start typing..."
    />
  );
}
```

### With Workspace Context

```tsx
'use client';

import { Editor } from '@/components/editor';
import { useWorkspace } from '@/hooks/use-workspace';

export default function DocumentPage({ params }: { params: { docId: string } }) {
  const { workspace } = useWorkspace();
  
  return (
    <Editor
      docId={params.docId}
      initialContent="<p>Loading...</p>"
      onSave={async (content) => {
        // Auto-save to Supabase
        await fetch(`/api/documents/${params.docId}`, {
          method: 'PATCH',
          body: JSON.stringify({ content }),
        });
      }}
    />
  );
}
```

## 🗄️ Database Setup

### 1. Chạy Migration

Copy nội dung từ `docs/architecture/migrations/001_add_documents_table.sql` và chạy trong Supabase SQL Editor:

```sql
-- Tạo documents table với RLS policies
-- Hỗ trợ nested documents (Notion-style)
-- Full-text search ready
```

### 2. Verify Schema

Sau khi chạy migration, check trong Supabase Dashboard:

```
public.documents
├── id (uuid, PK)
├── workspace_id (uuid, FK -> workspaces)
├── title (text)
├── content (text) <- HTML from Tiptap
├── parent_id (uuid, FK -> documents) <- for nesting
├── position (integer)
├── is_public (boolean)
├── created_by (uuid, FK -> profiles)
├── last_edited_by (uuid, FK -> profiles)
├── created_at (timestamptz)
├── updated_at (timestamptz)
└── version (integer)
```

### 3. Test trong Supabase

```sql
-- Insert test document
INSERT INTO documents (workspace_id, title, content, created_by)
VALUES (
  'your-workspace-id',
  'Test Document',
  '<h1>Hello World</h1><p>This is a test.</p>',
  'your-user-id'
);

-- Query documents
SELECT id, title, content, created_at 
FROM documents 
WHERE workspace_id = 'your-workspace-id'
ORDER BY position;
```

## 🎨 Features

### Formatting Options
- **Bold** - Ctrl/Cmd + B
- *Italic* - Ctrl/Cmd + I
- Headings (H1, H2, H3)
- Bullet Lists
- Numbered Lists
- Links

### Auto-save
- Debounced save every 2 seconds
- Optimistic UI updates
- Visual save status indicator
- Error handling với retry logic

### Performance
- Lazy loading với Next.js dynamic import
- SSR disabled (client-side only)
- Minimal bundle size

## 🧪 Testing

### 1. Start Development Server

```bash
cd frontend
npm run dev
```

### 2. Open Demo Page

```
http://localhost:3000/editor-demo
```

### 3. Test Features

- [ ] Type text và check auto-format
- [ ] Test các toolbar buttons
- [ ] Verify auto-save (watch save status)
- [ ] Test links (select text → click link button)
- [ ] Test headings (H1, H2, H3)
- [ ] Test lists (bullet & numbered)
- [ ] Check mobile responsive

## 📂 File Structure

```
frontend/
├── components/
│   └── editor/
│       ├── index.tsx              # Lazy loading wrapper
│       ├── TiptapEditor.tsx       # Main editor
│       ├── EditorToolbar.tsx      # Toolbar component
│       ├── README.md              # Component docs
│       └── INTEGRATION.md         # Integration guide
├── types/
│   ├── editor.types.ts            # Editor types
│   └── database.types.ts          # Updated with documents
├── app/
│   ├── globals.css                # Tiptap styles
│   └── editor-demo/
│       └── page.tsx               # Demo page
└── lib/
    └── supabase/
        ├── client.ts              # Supabase client
        └── server.ts              # Server client
```

## 🔧 Customization

### Add More Extensions

```tsx
import Highlight from '@tiptap/extension-highlight';
import CodeBlock from '@tiptap/extension-code-block';

const editor = useEditor({
  extensions: [
    StarterKit,
    Link,
    Placeholder,
    Highlight,           // Text highlighting
    CodeBlock,           // Code blocks
  ],
});
```

### Custom Toolbar Buttons

Trong `EditorToolbar.tsx`:

```tsx
<ToolbarButton
  onClick={() => editor.chain().focus().toggleHighlight().run()}
  isActive={editor.isActive('highlight')}
  title="Highlight"
>
  <HighlightIcon className="h-4 w-4" />
</ToolbarButton>
```

### Custom Styling

Trong `globals.css`:

```css
.tiptap h1 {
  font-size: 3rem;  /* Larger H1 */
  color: #1e40af;   /* Blue headings */
}

.tiptap a {
  color: #10b981;   /* Green links */
}
```

## 🐛 Troubleshooting

### Editor không hiển thị

**Problem:** Component render nhưng editor không xuất hiện

**Solution:**
1. Check browser console cho errors
2. Verify Tiptap dependencies đã cài
3. Ensure component wrap trong 'use client'

```tsx
'use client'; // MUST have this

import { Editor } from '@/components/editor';
```

### Auto-save không hoạt động

**Problem:** Content không save vào database

**Solution:**
1. Check Supabase connection
2. Verify RLS policies
3. Check console logs

```tsx
onSave={(content) => {
  console.log('Saving:', content);  // Debug
}}
```

### Toolbar buttons không hoạt động

**Problem:** Click buttons nhưng không format

**Solution:**
1. Verify extensions đã import đúng
2. Check editor instance có null không
3. Test với keyboard shortcuts (Ctrl+B, Ctrl+I)

## 📚 Next Steps

### Immediate (POC)
- [x] Basic editor component
- [x] Auto-save functionality
- [x] Mobile responsive
- [ ] Connect to real Supabase instance
- [ ] Test with actual workspace data

### Short-term (Week 2-3)
- [ ] Image upload support
- [ ] Markdown shortcuts (type `#` for H1)
- [ ] Slash commands (type `/` for menu)
- [ ] Document templates
- [ ] Version history

### Long-term (Week 4+)
- [ ] Collaborative editing (multiplayer)
- [ ] Comments & mentions (@user)
- [ ] Export to Markdown/PDF
- [ ] Document sharing (public links)
- [ ] Table of contents (auto-generated)

## 🔗 Resources

- [Tiptap Documentation](https://tiptap.dev)
- [Tiptap Extensions](https://tiptap.dev/extensions)
- [Next.js Dynamic Import](https://nextjs.org/docs/advanced-features/dynamic-import)
- [Supabase RLS](https://supabase.com/docs/guides/auth/row-level-security)

## ✨ Tips

1. **Performance**: Always use lazy loading cho editor
2. **Debouncing**: 2 giây là optimal cho auto-save
3. **Optimistic UI**: Update local state trước khi save
4. **Error Handling**: Always show save status
5. **Mobile**: Test trên mobile devices thật

---

**Created:** November 7, 2025  
**Author:** GitHub Copilot  
**Status:** ✅ Ready for testing
