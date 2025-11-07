'use client';

import { useEffect, useState } from 'react';
import { useTaskStore } from '@/lib/stores/tasks';
import { createClient } from '@/lib/supabase/client';
import { Task } from '@/types';

/**
 * useTasks Hook
 * Priority: 70% - Core Productivity Feature
 * 
 * Responsibilities:
 * - Fetch tasks from Supabase
 * - Sync with Zustand store
 * - Optimistic updates
 * - Real-time subscriptions (optional - Week 8+)
 * 
 * Usage:
 * ```tsx
 * const { tasks, loading, createTask, updateTask, deleteTask } = useTasks();
 * ```
 */

export function useTasks(workspaceId?: string) {
  const supabase = createClient();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const {
    tasks,
    setTasks,
    addTask,
    updateTask: updateTaskStore,
    deleteTask: deleteTaskStore,
  } = useTaskStore();
  
  // Fetch tasks on mount
  useEffect(() => {
    if (!workspaceId) return;
    
    async function fetchTasks() {
      try {
        setLoading(true);
        
        const { data, error } = await supabase
          .from('tasks')
          .select('*')
          .eq('workspace_id', workspaceId)
          .order('position', { ascending: true });
        
        if (error) throw error;
        
        setTasks(data as Task[]);
      } catch (err) {
        console.error('Error fetching tasks:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch tasks');
      } finally {
        setLoading(false);
      }
    }
    
    fetchTasks();
  }, [workspaceId]);
  
  // Create Task
  async function createTask(input: Partial<Task>) {
    if (!workspaceId) throw new Error('Workspace ID required');
    
    try {
      // Optimistic update
      const tempId = `temp_${Date.now()}`;
      const optimisticTask: Task = {
        id: tempId,
        workspace_id: workspaceId,
        project_id: input.project_id || null,
        parent_task_id: input.parent_task_id || null,
        title: input.title || '',
        description: input.description || null,
        status: input.status || 'todo',
        priority: input.priority || 'none',
        due_date: input.due_date || null,
        start_date: input.start_date || null,
        completed_at: null,
        is_recurring: input.is_recurring || false,
        rrule: input.rrule || null,
        recurring_parent_id: input.recurring_parent_id || null,
        assignee_id: input.assignee_id || null,
        created_by: '', // Will be set by Supabase
        tags: input.tags || [],
        position: tasks.length, // Append to end
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
      
      addTask(optimisticTask);
      
      // Real insert
      const { data, error } = await supabase
        .from('tasks')
        .insert({
          workspace_id: workspaceId,
          project_id: input.project_id,
          parent_task_id: input.parent_task_id,
          title: input.title,
          description: input.description,
          status: input.status || 'todo',
          priority: input.priority || 'none',
          due_date: input.due_date,
          start_date: input.start_date,
          is_recurring: input.is_recurring || false,
          rrule: input.rrule,
          assignee_id: input.assignee_id,
          tags: input.tags || [],
          position: tasks.length,
        })
        .select()
        .single();
      
      if (error) throw error;
      
      // Replace optimistic task with real task
      deleteTaskStore(tempId);
      addTask(data as Task);
      
      return data as Task;
    } catch (err) {
      console.error('Error creating task:', err);
      throw err;
    }
  }
  
  // Update Task
  async function updateTask(id: string, updates: Partial<Task>) {
    try {
      // Optimistic update
      updateTaskStore(id, updates);
      
      // Real update
      const { error } = await supabase
        .from('tasks')
        .update({
          title: updates.title,
          description: updates.description,
          status: updates.status,
          priority: updates.priority,
          due_date: updates.due_date,
          start_date: updates.start_date,
          completed_at: updates.completed_at,
          project_id: updates.project_id,
          assignee_id: updates.assignee_id,
          tags: updates.tags,
          position: updates.position,
        })
        .eq('id', id);
      
      if (error) throw error;
    } catch (err) {
      console.error('Error updating task:', err);
      // Revert optimistic update
      throw err;
    }
  }
  
  // Delete Task
  async function deleteTask(id: string) {
    try {
      // Optimistic delete
      deleteTaskStore(id);
      
      // Real delete
      const { error } = await supabase
        .from('tasks')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
    } catch (err) {
      console.error('Error deleting task:', err);
      throw err;
    }
  }
  
  // Toggle Task Complete
  async function toggleComplete(id: string) {
    const task = tasks.find(t => t.id === id);
    if (!task) return;
    
    const newStatus = task.status === 'done' ? 'todo' : 'done';
    const completedAt = newStatus === 'done' ? new Date().toISOString() : null;
    
    await updateTask(id, {
      status: newStatus,
      completed_at: completedAt,
    });
  }
  
  return {
    tasks,
    loading,
    error,
    createTask,
    updateTask,
    deleteTask,
    toggleComplete,
  };
}
