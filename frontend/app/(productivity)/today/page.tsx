import { Metadata } from 'next';
import { TaskList } from '@/components/tasks/task-list';
import { TaskQuickAdd } from '@/components/tasks/task-quick-add';

export const metadata: Metadata = {
  title: 'Today | NEXUS',
  description: 'My Day - Smart task list for today',
};

/**
 * TODAY VIEW (My Day)
 * Priority: 70% - Core Productivity Feature
 * 
 * Shows:
 * - Tasks due today
 * - Tasks scheduled for today (start_date)
 * - Overdue tasks (auto-pulled from previous days)
 * - Recurring task instances for today
 * 
 * Features:
 * - Quick add with Ctrl+N
 * - Keyboard navigation (j/k, x complete, c add)
 * - Drag to reorder
 */
export default function TodayPage() {
  return (
    <div className="mx-auto max-w-4xl space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">My Day</h1>
        <p className="text-muted-foreground">
          {new Date().toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </p>
      </div>

      {/* Quick Add */}
      <TaskQuickAdd placeholder="Add a task to My Day..." defaultDate="today" />

      {/* Task List - Filtered by today */}
      <TaskList
        filter={{
          type: 'today', // Will fetch tasks due today + overdue
        }}
        enableKeyboardNav
        enableDragReorder
      />
    </div>
  );
}
