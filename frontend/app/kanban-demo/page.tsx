import { getOrCreateWorkspaceId } from '@/lib/supabase/workspace';
import { redirect } from 'next/navigation';
import { KanbanDemoClient } from './KanbanDemoClient';

/**
 * KANBAN DEMO PAGE
 * Route: /kanban-demo
 *
 * Trang demo hiển thị Kanban board cho toàn bộ task trong workspace.
 * Sử dụng helper server-side để đảm bảo workspace được lấy/tạo trước khi render.
 */
export default async function KanbanDemoPage() {
  const { user, workspaceId } = await getOrCreateWorkspaceId();

  if (!user || !workspaceId) {
    redirect('/login');
  }

  return <KanbanDemoClient workspaceId={workspaceId} />;
}
