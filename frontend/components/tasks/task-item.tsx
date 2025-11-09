'use client';

import { Checkbox } from '@/components/ui/checkbox';
import { cn } from '@/lib/utils';
import { Task } from '@/types';
import { format } from 'date-fns';
import { Calendar, Flag, MoreHorizontal, Loader2 } from 'lucide-react';
import { useInlineEdit } from '@/hooks/use-inline-edit';
import { useTaskStore } from '@/lib/stores/tasks';

/**
 * TaskItem Component
 * Priority: 70% - Core Productivity Feature
 * 
 * Single task row with:
 * - Checkbox (complete/uncomplete)
 * - Title (inline editable)
 * - Priority indicator
 * - Due date
 * - Actions menu
 */

interface TaskItemProps {
  task: Task;
  onToggle?: (id: string) => void;
  onClick?: (id: string) => void;
  className?: string;
}

const PRIORITY_COLORS = {
  none: 'text-gray-400',
  low: 'text-blue-500',
  medium: 'text-yellow-500',
  high: 'text-orange-500',
  urgent: 'text-red-500',
};

export function TaskItem({ task, onToggle, onClick, className }: TaskItemProps) {
  const isOverdue = task.due_date && new Date(task.due_date) < new Date() && task.status !== 'done';
  const updateTaskTitle = useTaskStore((state) => state.updateTaskTitle);
  
  // Inline edit functionality
  const {
    isEditing,
    editValue,
    isSaving,
    inputRef,
    handleStartEdit,
    handleSave,
    handleKeyDown,
    setEditValue,
  } = useInlineEdit({
    initialValue: task.title,
    onSave: async (newTitle) => {
      await updateTaskTitle(task.id, newTitle);
    },
    maxLength: 200,
    minLength: 1,
  });
  
  return (
    <div
      className={cn(
        'group flex items-center gap-3 rounded-lg border bg-card p-3 hover:bg-accent/50 transition-colors',
        task.status === 'done' && 'opacity-60',
        className
      )}
      onClick={() => onClick?.(task.id)}
    >
      {/* Checkbox */}
      <Checkbox
        checked={task.status === 'done'}
        onCheckedChange={() => onToggle?.(task.id)}
        className="shrink-0"
        onClick={(e) => e.stopPropagation()}
      />
      
      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          {/* Title - Inline Editable */}
          {isEditing ? (
            <input
              ref={inputRef}
              type="text"
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              onKeyDown={handleKeyDown}
              onBlur={handleSave}
              className={cn(
                'flex-1 px-2 py-1 text-sm font-medium border-2 border-blue-500 rounded',
                'focus:ring-2 focus:ring-blue-300 outline-none',
                'transition-all duration-150'
              )}
              disabled={isSaving}
              aria-label="Edit task title"
              onClick={(e) => e.stopPropagation()}
            />
          ) : (
            <span
              onDoubleClick={(e) => {
                e.stopPropagation();
                handleStartEdit();
              }}
              className={cn(
                'text-sm font-medium truncate cursor-text',
                'hover:bg-accent/30 px-2 py-1 rounded transition-colors',
                task.status === 'done' && 'line-through text-muted-foreground'
              )}
              title="Double-click to edit"
            >
              {task.title}
            </span>
          )}
          
          {/* Loading Indicator */}
          {isSaving && (
            <Loader2 className="h-3 w-3 animate-spin text-blue-500 shrink-0" />
          )}
          
          {/* Priority Flag */}
          {task.priority !== 'none' && !isEditing && (
            <Flag className={cn('h-3 w-3 shrink-0', PRIORITY_COLORS[task.priority])} />
          )}
        </div>
        
        {/* Metadata */}
        <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
          {task.due_date && (
            <div className={cn(
              'flex items-center gap-1',
              isOverdue && 'text-red-500 font-medium'
            )}>
              <Calendar className="h-3 w-3" />
              {format(new Date(task.due_date), 'MMM d')}
            </div>
          )}
          
          {task.tags.length > 0 && (
            <div className="flex gap-1">
              {task.tags.slice(0, 2).map(tag => (
                <span key={tag} className="px-1.5 py-0.5 rounded bg-accent text-[10px]">
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
      
      {/* Actions */}
      <button
        className="opacity-0 group-hover:opacity-100 shrink-0 p-1 hover:bg-accent rounded transition-opacity"
        onClick={(e) => {
          e.stopPropagation();
          // TODO: Open actions menu
        }}
      >
        <MoreHorizontal className="h-4 w-4" />
      </button>
    </div>
  );
}
