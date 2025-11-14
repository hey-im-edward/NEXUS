'use client';

import { createClient } from '@/lib/supabase/client';
import { SaveStatus, TiptapEditorProps } from '@/types/editor.types';
import Link from '@tiptap/extension-link';
import Placeholder from '@tiptap/extension-placeholder';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { EditorToolbar } from './EditorToolbar';

/**
 * TiptapEditor Component
 * 
 * Rich text editor sử dụng Tiptap với các tính năng:
 * - Formatting: Bold, Italic, Headings, Lists, Links
 * - Auto-save mỗi 2 giây
 * - Optimistic UI updates
 * - Loading indicator khi đang save
 * - Mobile-friendly
 */
export function TiptapEditor({
    docId,
    initialContent = '',
    onSave,
    placeholder = 'Start typing...',
    editable = true,
    className = '',
}: TiptapEditorProps) {
    const [saveStatus, setSaveStatus] = useState<SaveStatus>('idle');
    const [content, setContent] = useState(initialContent);
    const saveTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const supabase = useMemo(() => createClient(), []);

    /**
     * Save content to Supabase
     */
    const saveContent = useCallback(
        async (html: string) => {
            try {
                setSaveStatus('saving');

                // TODO: Uncomment khi đã setup Supabase table
                // const { error } = await supabase
                //   .from('documents')
                //   .update({
                //     content: html,
                //     updated_at: new Date().toISOString()
                //   })
                //   .eq('id', docId);

                // if (error) {
                //   throw error;
                // }

                // Simulate save for demo (remove when Supabase is ready)
                await new Promise((resolve) => setTimeout(resolve, 500));

                if (onSave) {
                    await onSave(html);
                }

                setSaveStatus('saved');

                // Reset về idle sau 2 giây
                setTimeout(() => {
                    setSaveStatus('idle');
                }, 2000);
            } catch (error) {
                console.error('Error saving document:', error);
                setSaveStatus('error');

                setTimeout(() => {
                    setSaveStatus('idle');
                }, 3000);
            }
        },
    [onSave]
    );

    /**
     * Debounced save function
     * Delay save 2 giây sau lần thay đổi cuối cùng
     */
    const debouncedSave = useCallback(
        (html: string) => {
            if (saveTimeoutRef.current) {
                clearTimeout(saveTimeoutRef.current);
            }

            saveTimeoutRef.current = setTimeout(() => {
                void saveContent(html);
            }, 2000);
        },
        [saveContent]
    );

    /**
     * Khởi tạo Tiptap editor với các extensions
     */
    const editor = useEditor({
        immediatelyRender: false, // Fix SSR hydration mismatch
        extensions: [
            StarterKit.configure({
                heading: {
                    levels: [1, 2, 3],
                },
            }),
            Link.configure({
                openOnClick: false,
                HTMLAttributes: {
                    class: 'text-blue-600 underline cursor-pointer hover:text-blue-800',
                },
            }),
            Placeholder.configure({
                placeholder,
            }),
        ],
        content: initialContent,
        editable,
        editorProps: {
            attributes: {
                class: 'prose prose-slate max-w-none focus:outline-none min-h-[500px] px-8 py-6 text-slate-900',
                style: 'font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;',
            },
        },
        onUpdate: ({ editor }) => {
            const html = editor.getHTML();
            setContent(html);
            debouncedSave(html);
        },
    }, [debouncedSave, editable, initialContent, placeholder]);

    /**
     * Cleanup timeout khi unmount
     */
    useEffect(() => {
        return () => {
            if (saveTimeoutRef.current) {
                clearTimeout(saveTimeoutRef.current);
            }
        };
    }, []);

    /**
     * Update editor content khi initialContent thay đổi
     */
    useEffect(() => {
        if (!editor) return;
        if (editor.getHTML() === initialContent) return;

        editor.commands.setContent(initialContent);
    }, [editor, initialContent]);

    /**
     * Render save status indicator
     */
    const renderSaveStatus = () => {
        switch (saveStatus) {
            case 'saving':
                return (
                    <div className="flex items-center gap-2 text-sm text-slate-500">
                        <div className="h-2 w-2 animate-pulse rounded-full bg-blue-500" />
                        Đang lưu...
                    </div>
                );
            case 'saved':
                return (
                    <div className="flex items-center gap-2 text-sm text-green-600">
                        <div className="h-2 w-2 rounded-full bg-green-500" />
                        Đã lưu
                    </div>
                );
            case 'error':
                return (
                    <div className="flex items-center gap-2 text-sm text-red-600">
                        <div className="h-2 w-2 rounded-full bg-red-500" />
                        Lỗi khi lưu
                    </div>
                );
            default:
                return null;
        }
    };

    if (!editor) {
        return (
            <div className="flex h-[500px] items-center justify-center">
                <div className="text-slate-500">Đang tải editor...</div>
            </div>
        );
    }

    return (
        <div className={`flex flex-col bg-white ${className}`}>
            {/* Toolbar */}
            <EditorToolbar editor={editor} />

            {/* Save Status */}
            <div className="flex items-center justify-end border-b border-slate-100 px-8 py-2">
                {renderSaveStatus()}
            </div>

            {/* Editor Content */}
            <div className="flex-1 overflow-y-auto">
                <EditorContent editor={editor} />
            </div>
        </div>
    );
}
