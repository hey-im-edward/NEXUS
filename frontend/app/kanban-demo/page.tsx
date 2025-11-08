'use client';

import { KanbanBoard } from '@/components/kanban';
import { useWorkspace } from '@/hooks/use-workspace';

/**
 * KANBAN DEMO PAGE
 * Route: /kanban-demo
 * 
 * Trang demo để test Kanban board
 * - Hiển thị tất cả tasks trong workspace
 * - Drag & drop giữa các cột
 * - Optimistic updates
 */

export default function KanbanDemoPage() {
  const { workspaceId, loading, error } = useWorkspace();

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Đang tải workspace...</p>
        </div>
      </div>
    );
  }

  if (error || !workspaceId) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md">
          <h2 className="text-red-900 font-semibold mb-2">⚠️ Lỗi</h2>
          <p className="text-red-700 text-sm mb-4">
            {error || 'Không thể tải workspace'}
          </p>
          <button
            onClick={() => window.location.reload()}
            className="bg-red-600 text-white px-4 py-2 rounded-md text-sm hover:bg-red-700"
          >
            Thử lại
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-screen-2xl mx-auto px-6 py-4">
          <h1 className="text-2xl font-bold text-gray-900">
            🎯 Kanban Board Demo
          </h1>
          <p className="text-sm text-gray-600 mt-1">
            Kéo và thả task giữa các cột để cập nhật trạng thái
          </p>
        </div>
      </div>

      {/* Kanban Board */}
      <div className="max-w-screen-2xl mx-auto p-6">
        <KanbanBoard
          workspaceId={workspaceId}
          onTaskClick={(task) => {
            console.log('Clicked task:', task);
            alert(`Clicked: ${task.title}`);
          }}
        />
      </div>

      {/* Instructions */}
      <div className="max-w-screen-2xl mx-auto px-6 pb-6">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 className="font-semibold text-blue-900 mb-2">
            📌 Hướng dẫn sử dụng:
          </h3>
          <ul className="text-sm text-blue-800 space-y-1 list-disc list-inside">
            <li>Di chuột vào task và giữ biểu tượng <strong>≡</strong> để kéo</li>
            <li>Thả task vào cột khác để thay đổi trạng thái</li>
            <li>Thả task vào vị trí khác trong cùng cột để sắp xếp lại</li>
            <li>Click vào task để xem chi tiết</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
