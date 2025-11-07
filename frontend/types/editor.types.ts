import { Editor } from '@tiptap/react';

/**
 * Props cho TiptapEditor component
 */
export interface TiptapEditorProps {
    /** ID của document để lưu vào database */
    docId: string;
    /** Nội dung ban đầu của editor (JSON hoặc HTML) */
    initialContent?: string;
    /** Callback khi save thành công */
    onSave?: (content: string) => void | Promise<void>;
    /** Placeholder text */
    placeholder?: string;
    /** Có thể chỉnh sửa không */
    editable?: boolean;
    /** Class name tùy chỉnh */
    className?: string;
}

/**
 * Props cho EditorToolbar component
 */
export interface EditorToolbarProps {
    /** Editor instance từ Tiptap */
    editor: Editor | null;
}

/**
 * Trạng thái save của editor
 */
export type SaveStatus = 'idle' | 'saving' | 'saved' | 'error';

/**
 * Content type cho editor
 */
export interface EditorContent {
    type: 'doc';
    content: any[];
}
