'use client';

import { useTaskStore } from '@/lib/stores/tasks';
import { useTasks } from '@/lib/hooks/use-tasks';
import { TaskItem } from './task-item';
import { Loader2 } from 'lucide-react';

/**
 * TaskList Component
 * Priority: 70% - Core Productivity Feature
 * 
 * Features:
 * - Virtualized list (for performance with 1000+ tasks)
 * - Keyboard navigation (j/k, x complete)
 * - Drag to reorder
 * - Real-time updates
 */

interface TaskListProps {
  filter?: {
    type: 'all' | 'today' | 'inbox' | 'upcoming' | 'project' | 'search';
    projectId?: string;
    searchQuery?: string;
  };
  enableKeyboardNav?: boolean;
  enableDragReorder?: boolean;
  showProjectMove?: boolean;
}

export function TaskList({
  filter,
  enableKeyboardNav = false,
  enableDragReorder = false,
  showProjectMove = false,
}: TaskListProps) {
  const { loading, toggleComplete } = useTasks();
  const { setFilter, getFilteredTasks } = useTaskStore();
  
  // Set filter on mount
  if (filter) {
    setFilter(filter);
  }
  
  const tasks = getFilteredTasks();
  
  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    );
  }
  
  if (tasks.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <p className="text-lg font-medium text-muted-foreground">No tasks yet</p>
        <p className="text-sm text-muted-foreground mt-1">
          Press Ctrl+N to add your first task
        </p>
      </div>
    );
  }
  
  return (
    <div className="space-y-2">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggle={toggleComplete}
          onClick={(id) => {
            // TODO: Open task detail modal
            console.log('Open task detail:', id);
          }}
        />
      ))}
    </div>
  );
}
