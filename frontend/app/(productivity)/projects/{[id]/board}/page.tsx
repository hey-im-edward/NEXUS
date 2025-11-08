'use client';

import { KanbanBoard } from '@/components/kanban';
import { useWorkspace } from '@/hooks/use-workspace';
import { useParams } from 'next/navigation';

/**
 * PROJECT KANBAN BOARD PAGE
 * Route: /projects/[id]/board
 * 
 * Hiển thị Kanban board cho project cụ thể
 * - 3 cột: TODO, IN_PROGRESS, DONE
 * - Drag & drop tasks giữa các cột
 * - Optimistic UI updates
 */

export default function ProjectBoardPage() {
  const params = useParams();
  const projectId = params?.id as string;
  const { workspaceId, loading, error } = useWorkspace();

  if (loading) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Đang tải...</p>
        </div>
      </div>
    );
  }

  if (error || !workspaceId) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md">
          <h2 className="text-red-900 font-semibold mb-2">⚠️ Lỗi</h2>
          <p className="text-red-700 text-sm">
            {error || 'Không thể tải workspace'}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="border-b bg-white px-6 py-4">
        <h1 className="text-2xl font-bold text-gray-900">Bảng Kanban</h1>
        <p className="text-sm text-gray-600 mt-1">
          Kéo và thả task giữa các cột để cập nhật trạng thái
        </p>
      </div>

      {/* Kanban Board */}
      <div className="flex-1 p-6 overflow-hidden">
        <KanbanBoard
          projectId={projectId}
          workspaceId={workspaceId}
          onTaskClick={(task) => {
            console.log('Clicked task:', task);
            // TODO: Open task detail modal
          }}
        />
      </div>
    </div>
  );
}
