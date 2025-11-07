'use client';

import { Editor } from '@/components/editor';
import { useState } from 'react';

/**
 * Editor Demo Page
 * Trang demo để test TiptapEditor component
 */
export default function EditorDemoPage() {
    const [savedContent, setSavedContent] = useState<string>('');

    const handleSave = (content: string) => {
        console.log('Content saved:', content);
        setSavedContent(content);
    };

    return (
        <div className="min-h-screen bg-slate-50">
            {/* Header */}
            <header className="border-b border-slate-200 bg-white shadow-sm">
                <div className="mx-auto max-w-5xl px-6 py-6">
                    <h1 className="text-3xl font-bold text-slate-900">📝 Tiptap Editor Demo</h1>
                    <p className="mt-2 text-slate-600">
                        Rich text editor với auto-save, formatting và Notion-like UI
                    </p>
                </div>
            </header>

            {/* Editor Container */}
            <main className="mx-auto max-w-5xl px-6 py-8">
                <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xl">
                    <Editor
                        docId="demo-doc-123"
                        initialContent="<h1>👋 Chào mừng đến với NEXUS Editor</h1><p>Đây là một rich text editor mạnh mẽ được xây dựng với Tiptap. Hãy thử các tính năng bên dưới:</p><h2>✨ Tính năng nổi bật</h2><ul><li><strong>Bold</strong> và <em>Italic</em> formatting</li><li>Headings đa cấp (H1, H2, H3)</li><li>Bullet lists và numbered lists</li><li>Links và nhiều hơn nữa</li></ul><h3>🚀 Bắt đầu viết</h3><p>Bạn có thể bắt đầu viết ngay bây giờ. Nội dung sẽ tự động lưu sau 2 giây!</p>"
                        onSave={handleSave}
                        placeholder="Bắt đầu viết gì đó tuyệt vời..."
                    />
                </div>

                {/* Saved Content Preview */}
                {savedContent && (
                    <div className="mt-8 rounded-xl border border-emerald-200 bg-emerald-50 p-6 shadow-md">
                        <div className="mb-3 flex items-center gap-2">
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500">
                                <span className="text-lg">✓</span>
                            </div>
                            <h2 className="text-lg font-semibold text-emerald-900">
                                Đã lưu thành công!
                            </h2>
                        </div>
                        <div className="max-h-[300px] overflow-auto rounded-lg border border-emerald-300 bg-white p-4">
                            <pre className="text-xs text-slate-700 whitespace-pre-wrap font-mono">{savedContent}</pre>
                        </div>
                    </div>
                )}

                {/* Instructions */}
                <div className="mt-8 rounded-xl border border-blue-200 bg-linear-to-br from-blue-50 to-indigo-50 p-6 shadow-md">
                    <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-blue-900">
                        <span>💡</span> Hướng dẫn sử dụng
                    </h3>
                    <div className="grid gap-3 text-sm text-blue-800 md:grid-cols-2">
                        <div className="rounded-lg bg-white/50 p-3">
                            <strong className="text-blue-900">⌨️ Keyboard Shortcuts:</strong>
                            <ul className="mt-2 space-y-1 pl-4">
                                <li>• <code className="rounded bg-blue-100 px-1.5 py-0.5 text-xs">Ctrl/Cmd + B</code> - Bold</li>
                                <li>• <code className="rounded bg-blue-100 px-1.5 py-0.5 text-xs">Ctrl/Cmd + I</code> - Italic</li>
                            </ul>
                        </div>
                        <div className="rounded-lg bg-white/50 p-3">
                            <strong className="text-blue-900">🖱️ Toolbar Features:</strong>
                            <ul className="mt-2 space-y-1 pl-4">
                                <li>• Click H1/H2/H3 cho headings</li>
                                <li>• Click list icons cho bullet/numbered lists</li>
                                <li>• Select text và click link icon để thêm link</li>
                            </ul>
                        </div>
                    </div>
                    <div className="mt-4 rounded-lg bg-blue-100 p-3">
                        <p className="text-sm text-blue-900">
                            <strong>💾 Auto-save:</strong> Nội dung tự động lưu sau 2 giây kể từ lần thay đổi cuối cùng.
                            Xem status ở phía trên editor!
                        </p>
                    </div>
                </div>
            </main>
        </div>
    );
}
