'use client';

import { TiptapEditorProps } from '@/types/editor.types';
import dynamic from 'next/dynamic';

/**
 * Lazy-loaded TiptapEditor component
 * Sử dụng Next.js dynamic import để optimize performance
 * Component chỉ load khi cần thiết
 */
const TiptapEditor = dynamic(
    () => import('./TiptapEditor').then((mod) => ({ default: mod.TiptapEditor })),
    {
        ssr: false,
        loading: () => (
            <div className="flex h-[500px] items-center justify-center bg-white">
                <div className="flex flex-col items-center gap-3">
                    <div className="h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-t-slate-900" />
                    <p className="text-sm text-slate-500">Đang tải editor...</p>
                </div>
            </div>
        ),
    }
);

/**
 * Export wrapper component
 */
export function Editor(props: TiptapEditorProps) {
    return <TiptapEditor {...props} />;
}

export { TiptapEditor };
export type { TiptapEditorProps };

