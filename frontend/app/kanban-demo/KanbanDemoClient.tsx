'use client';

import { KanbanBoard } from '@/components/kanban';
import type { Task } from '@/types';
import { useCallback } from 'react';

type KanbanDemoClientProps = {
  workspaceId: string;
};

export function KanbanDemoClient({ workspaceId }: KanbanDemoClientProps) {
  const handleTaskClick = useCallback((task: Task) => {
    console.log('Clicked task:', task);
    alert(`Clicked: ${task.title}`);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-white border-b">
        <div className="max-w-screen-2xl mx-auto px-6 py-4">
          <h1 className="text-2xl font-bold text-gray-900">🎯 Kanban Board Demo</h1>
          <p className="text-sm text-gray-600 mt-1">
            Kéo và thả task giữa các cột để cập nhật trạng thái
          </p>
        </div>
      </div>

      <div className="max-w-screen-2xl mx-auto p-6">
        <KanbanBoard workspaceId={workspaceId} onTaskClick={handleTaskClick} />
      </div>

      <div className="max-w-screen-2xl mx-auto px-6 pb-6">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 className="font-semibold text-blue-900 mb-2">📌 Hướng dẫn sử dụng:</h3>
          <ul className="text-sm text-blue-800 space-y-1 list-disc list-inside">
            <li>Giữ biểu tượng <strong>≡</strong> để kéo task</li>
            <li>Thả vào cột khác để thay đổi trạng thái</li>
            <li>Thả trong cùng cột để sắp xếp lại thứ tự</li>
            <li>Click vào task để xem chi tiết</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
