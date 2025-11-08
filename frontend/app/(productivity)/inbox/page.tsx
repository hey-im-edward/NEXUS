import { TaskList } from '@/components/tasks/task-list';
import { TaskQuickAdd } from '@/components/tasks/task-quick-add';
import { Inbox } from 'lucide-react';
import { Metadata } from 'next';

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
export default function InboxPage() {
  // ⚠️ TEMPORARY: Hardcoded workspace_id
  // TODO: Get from context/auth after workspace creation
  const WORKSPACE_ID = 'c6be91ba-98c3-43e5-8e5e-94e389894fa6'; // ✅ Edward's workspace
  
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
        workspaceId={WORKSPACE_ID}
        placeholder="What's on your mind?" 
      />

      {/* Task List - Filtered by no project */}
      <TaskList
        workspaceId={WORKSPACE_ID}
        filter={{
          type: 'inbox', // project_id = NULL
        }}
        enableKeyboardNav
        showProjectMove // Show "Move to project" action
      />
    </div>
  );
}
