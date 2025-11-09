import { createClient } from '@/lib/supabase/client';
import { Task, TaskPriority, TaskStatus } from '@/types';
import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

/**
 * TASK STORE
 * Priority: 70% - Core Productivity Feature
 * 
 * Manages:
 * - Task list state (optimistic updates)
 * - Filters (today, inbox, project, search)
 * - Sorting (priority, due date, position)
 * - CRUD operations (create, update, delete)
 * 
 * Pattern: Zustand + Immer for immutable updates
 */

interface TaskFilter {
  type: 'all' | 'today' | 'inbox' | 'upcoming' | 'project' | 'search';
  projectId?: string;
  searchQuery?: string;
  status?: TaskStatus[];
  priority?: TaskPriority[];
}

interface TaskState {
  // Data
  tasks: Task[];
  loading: boolean;
  error: string | null;
  
  // Filters & UI State
  filter: TaskFilter;
  sortBy: 'position' | 'due_date' | 'priority' | 'created_at';
  sortOrder: 'asc' | 'desc';
  selectedTaskId: string | null;
  
  // Actions
  setTasks: (tasks: Task[]) => void;
  addTask: (task: Task) => void;
  updateTask: (id: string, updates: Partial<Task>) => void;
  updateTaskTitle: (taskId: string, newTitle: string) => Promise<void>;
  updateTaskPriority: (taskId: string, newPriority: TaskPriority) => Promise<void>;
  deleteTask: (id: string) => void;
  reorderTasks: (taskIds: string[]) => void;
  
  // Filters
  setFilter: (filter: TaskFilter) => void;
  setSortBy: (sortBy: TaskState['sortBy'], order?: 'asc' | 'desc') => void;
  setSelectedTask: (id: string | null) => void;
  
  // Computed
  getFilteredTasks: () => Task[];
  getTaskById: (id: string) => Task | undefined;
  getSubtasks: (parentId: string) => Task[];
}

export const useTaskStore = create<TaskState>()(
  immer((set, get) => ({
    // Initial State
    tasks: [],
    loading: false,
    error: null,
    filter: { type: 'today' },
    sortBy: 'position',
    sortOrder: 'asc',
    selectedTaskId: null,
    
    // Actions
    setTasks: (tasks) => set({ tasks }),
    
    addTask: (task) => set((state) => {
      state.tasks.push(task);
    }),
    
    updateTask: (id, updates) => set((state) => {
      const index = state.tasks.findIndex(t => t.id === id);
      if (index !== -1) {
        state.tasks[index] = { ...state.tasks[index], ...updates };
      }
    }),
    
    updateTaskTitle: async (taskId: string, newTitle: string) => {
      const supabase = createClient();
      const originalTask = get().getTaskById(taskId);
      if (!originalTask) return;
      
      // 1. Optimistic update (instant UI change)
      set((state) => {
        const index = state.tasks.findIndex(t => t.id === taskId);
        if (index !== -1) {
          state.tasks[index].title = newTitle;
          state.tasks[index].updated_at = new Date().toISOString();
        }
      });
      
      try {
        // 2. Sync with Supabase
        const { error } = await supabase
          .from('tasks')
          .update({ 
            title: newTitle,
            updated_at: new Date().toISOString()
          })
          .eq('id', taskId);
        
        if (error) throw error;
        
      } catch (error) {
        // 3. Rollback on error
        console.error('Failed to update task title:', error);
        
        set((state) => {
          const index = state.tasks.findIndex(t => t.id === taskId);
          if (index !== -1) {
            state.tasks[index].title = originalTask.title;
            state.tasks[index].updated_at = originalTask.updated_at;
          }
        });
        
        throw error; // Re-throw để component handle error
      }
    },
    
    updateTaskPriority: async (taskId: string, newPriority: TaskPriority) => {
      const supabase = createClient();
      const originalTask = get().getTaskById(taskId);
      if (!originalTask) return;
      
      // 1. Optimistic update (instant UI change)
      set((state) => {
        const index = state.tasks.findIndex(t => t.id === taskId);
        if (index !== -1) {
          state.tasks[index].priority = newPriority;
          state.tasks[index].updated_at = new Date().toISOString();
        }
      });
      
      try {
        // 2. Sync with Supabase (with timeout to detect offline faster)
        const updatePromise = supabase
          .from('tasks')
          .update({ 
            priority: newPriority,
            updated_at: new Date().toISOString()
          })
          .eq('id', taskId);
        
        // Add 5 second timeout to detect network issues faster
        const timeoutPromise = new Promise((_, reject) => {
          setTimeout(() => reject(new Error('Network timeout')), 5000);
        });
        
        const { error } = await Promise.race([updatePromise, timeoutPromise]) as any;
        
        if (error) throw error;
        
      } catch (error) {
        // 3. Rollback on error
        console.error('Failed to update task priority:', error);
        
        set((state) => {
          const index = state.tasks.findIndex(t => t.id === taskId);
          if (index !== -1) {
            state.tasks[index].priority = originalTask.priority;
            state.tasks[index].updated_at = originalTask.updated_at;
          }
        });
        
        throw error; // Re-throw để component handle error
      }
    },
    
    deleteTask: (id) => set((state) => {
      state.tasks = state.tasks.filter(t => t.id !== id);
    }),
    
    reorderTasks: (taskIds) => set((state) => {
      taskIds.forEach((id, index) => {
        const task = state.tasks.find(t => t.id === id);
        if (task) {
          task.position = index;
        }
      });
    }),
    
    // Filters
    setFilter: (filter) => set({ filter }),
    
    setSortBy: (sortBy, order = 'asc') => set({ sortBy, sortOrder: order }),
    
    setSelectedTask: (id) => set({ selectedTaskId: id }),
    
    // Computed Getters
    getFilteredTasks: () => {
      const { tasks, filter, sortBy, sortOrder } = get();
      let filtered = [...tasks];
      
      // Apply filter
      switch (filter.type) {
        case 'today': {
          const today = new Date();
          today.setHours(0, 0, 0, 0);
          const tomorrow = new Date(today);
          tomorrow.setDate(tomorrow.getDate() + 1);
          
          filtered = filtered.filter(task => {
            // ✅ CHANGED: Show completed tasks too (will be styled differently)
            // if (task.status === 'done' || task.status === 'cancelled') return false;
            
            // Due today
            if (task.due_date) {
              const dueDate = new Date(task.due_date);
              if (dueDate >= today && dueDate < tomorrow) return true;
            }
            
            // Overdue
            if (task.due_date && new Date(task.due_date) < today) return true;
            
            // Start date today
            if (task.start_date) {
              const startDate = new Date(task.start_date);
              if (startDate >= today && startDate < tomorrow) return true;
            }
            
            return false;
          });
          break;
        }
        
        case 'inbox':
          filtered = filtered.filter(task => 
            task.project_id === null && task.status !== 'done'
          );
          break;
          
        case 'upcoming': {
          const today = new Date();
          today.setHours(0, 0, 0, 0);
          const nextWeek = new Date(today);
          nextWeek.setDate(nextWeek.getDate() + 7);
          
          filtered = filtered.filter(task => {
            if (task.status === 'done' || task.status === 'cancelled') return false;
            if (!task.due_date) return false;
            
            const dueDate = new Date(task.due_date);
            return dueDate >= today && dueDate < nextWeek;
          });
          break;
        }
        
        case 'project':
          if (filter.projectId) {
            filtered = filtered.filter(task => task.project_id === filter.projectId);
          }
          break;
          
        case 'search':
          if (filter.searchQuery) {
            const query = filter.searchQuery.toLowerCase();
            filtered = filtered.filter(task => 
              task.title.toLowerCase().includes(query) ||
              task.description?.toLowerCase().includes(query) ||
              task.tags.some(tag => tag.toLowerCase().includes(query))
            );
          }
          break;
      }
      
      // Apply status filter
      if (filter.status && filter.status.length > 0) {
        filtered = filtered.filter(task => filter.status!.includes(task.status));
      }
      
      // Apply priority filter
      if (filter.priority && filter.priority.length > 0) {
        filtered = filtered.filter(task => filter.priority!.includes(task.priority));
      }
      
      // Sort
      filtered.sort((a, b) => {
        let comparison = 0;
        
        switch (sortBy) {
          case 'position':
            comparison = a.position - b.position;
            break;
          case 'due_date':
            if (!a.due_date && !b.due_date) comparison = 0;
            else if (!a.due_date) comparison = 1;
            else if (!b.due_date) comparison = -1;
            else comparison = new Date(a.due_date).getTime() - new Date(b.due_date).getTime();
            break;
          case 'priority': {
            const priorityOrder = { none: 0, low: 1, medium: 2, high: 3, urgent: 4 };
            comparison = priorityOrder[a.priority] - priorityOrder[b.priority];
            break;
          }
          case 'created_at':
            comparison = new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
            break;
        }
        
        return sortOrder === 'asc' ? comparison : -comparison;
      });
      
      return filtered;
    },
    
    getTaskById: (id) => {
      return get().tasks.find(t => t.id === id);
    },
    
    getSubtasks: (parentId) => {
      return get().tasks.filter(t => t.parent_task_id === parentId);
    },
  }))
);
