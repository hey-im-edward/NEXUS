import { KanbanBoard } from '@/components/kanban';
import { getOrCreateWorkspaceId } from '@/lib/supabase/workspace';
import { redirect } from 'next/navigation';

/**
 * PROJECT KANBAN BOARD PAGE
 * Route: /projects/[id]/board
 *
 * Hiển thị Kanban board cho project cụ thể
 * - 3 cột: TODO, IN_PROGRESS, DONE
 * - Drag & drop tasks giữa các cột
 * - Optimistic UI updates
 */
type ProjectBoardPageProps = {
  params: { id: string };
};

export default async function ProjectBoardPage({ params }: ProjectBoardPageProps) {
  const { user, workspaceId } = await getOrCreateWorkspaceId();

  if (!user || !workspaceId) {
    redirect('/login');
  }

  return (
    <div className="h-full flex flex-col">
      <div className="border-b bg-white px-6 py-4">
        <h1 className="text-2xl font-bold text-gray-900">Bảng Kanban</h1>
        <p className="text-sm text-gray-600 mt-1">
          Kéo và thả task giữa các cột để cập nhật trạng thái
        </p>
      </div>

      <div className="flex-1 p-6 overflow-hidden">
        <KanbanBoard
          projectId={params.id}
          workspaceId={workspaceId}
        />
      </div>
    </div>
  );
}
