'use client';

import { Input } from '@/components/ui/input';
import { useTasks } from '@/lib/hooks/use-tasks';
import { Plus } from 'lucide-react';
import { useState } from 'react';

/**
 * TaskQuickAdd Component
 * Priority: 70% - Core Productivity Feature
 * 
 * Quick add task input with:
 * - Press Enter to add
 * - Auto-clear after add
 * - Smart date parsing (optional Week 6+)
 * - Keyboard shortcut: Ctrl+N (handled by parent)
 */

interface TaskQuickAddProps {
  workspaceId: string; // ⭐ REQUIRED: Pass workspace_id from parent
  placeholder?: string;
  defaultDate?: 'today' | string | null;
  projectId?: string | null;
  className?: string;
}

export function TaskQuickAdd({
  workspaceId, // ⭐ Pass to useTasks
  placeholder = 'Add a task...',
  defaultDate = null,
  projectId = null,
  className,
}: TaskQuickAddProps) {
  const [title, setTitle] = useState('');
  const [isAdding, setIsAdding] = useState(false);
  const { createTask } = useTasks(workspaceId);
  
  async function handleAdd() {
    if (!title.trim() || isAdding) return;
    
    try {
      setIsAdding(true);
      
      // Calculate due_date
      let dueDate: string | null = null;
      if (defaultDate === 'today') {
        const today = new Date();
        today.setHours(23, 59, 59, 999);
        dueDate = today.toISOString();
      } else if (defaultDate) {
        dueDate = defaultDate;
      }
      
      await createTask({
        title: title.trim(),
        due_date: dueDate,
        project_id: projectId,
        status: 'todo',
        priority: 'none',
        tags: [],
      });
      
      setTitle('');
    } catch (error) {
      console.error('Failed to add task:', error);
    } finally {
      setIsAdding(false);
    }
  }
  
  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') {
      handleAdd();
    }
  }
  
  return (
    <div className={className}>
      <div className="relative">
        <Input
          type="text"
          placeholder={placeholder}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={isAdding}
          className="pl-10"
        />
        <Plus className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
      </div>
    </div>
  );
}
