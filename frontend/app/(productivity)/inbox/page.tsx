import { TaskList } from '@/components/tasks/task-list';
import { TaskQuickAdd } from '@/components/tasks/task-quick-add';
import { getOrCreateWorkspaceId } from '@/lib/supabase/workspace';
import { Inbox } from 'lucide-react';
import { Metadata } from 'next';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Inbox | NEXUS',
  description: 'Capture all your tasks',
};

/**
 * INBOX VIEW
 * Priority: 70% - Core Productivity Feature
 * 
 * Shows:
 * - All tasks without a project (project_id = NULL)
 * - Unsorted, uncategorized tasks
 * - Default landing place for quick adds
 * 
 * Use Case:
 * - Quick brain dump (GTD methodology)
 * - Process later → move to projects
 */
export default async function InboxPage() {
  const { user, workspaceId } = await getOrCreateWorkspaceId();

  if (!user || !workspaceId) {
    redirect('/login');
  }

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900/20">
          <Inbox className="h-6 w-6 text-blue-600 dark:text-blue-400" />
        </div>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Inbox</h1>
          <p className="text-sm text-muted-foreground">
            Capture everything, organize later
          </p>
        </div>
      </div>

      {/* Quick Add */}
      <TaskQuickAdd 
        workspaceId={workspaceId}
        placeholder="What's on your mind?" 
      />

      {/* Task List - Filtered by no project */}
      <TaskList
        workspaceId={workspaceId}
        filter={{
          type: 'inbox', // project_id = NULL
        }}
        enableKeyboardNav
        showProjectMove // Show "Move to project" action
      />
    </div>
  );
}
