'use client';

import { Checkbox } from '@/components/ui/checkbox';
import { createClient } from '@/lib/supabase/client';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';

type TaskStatus = 'todo' | 'in_progress' | 'done' | 'cancelled';

interface Task {
  id: string;
  title: string;
  status: TaskStatus;
  due_date: string;
}

export function TodayTasksApp() {
  const supabase = createClient();
  const queryClient = useQueryClient();
  const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD

  const { data: tasks } = useQuery<Task[]>({
    queryKey: ['tasks', 'today', today],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('tasks')
        .select('id, title, status, due_date')
        .gte('due_date', `${today}T00:00:00`)
        .lte('due_date', `${today}T23:59:59`)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching today tasks:', error);
        throw error;
      }
      return data || [];
    },
    refetchInterval: 5000, // Fallback: refetch every 5 seconds
  });

  // Real-time subscription
  useEffect(() => {
    const channel = supabase
      .channel('today-tasks-realtime')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'tasks',
        },
        (payload) => {
          console.log('Real-time event:', payload);
          // Invalidate queries to refetch
          queryClient.invalidateQueries({ queryKey: ['tasks', 'today', today] });
        }
      )
      .subscribe((status) => {
        console.log('Subscription status:', status);
      });

    return () => {
      supabase.removeChannel(channel);
    };
  }, [today, queryClient, supabase]);

  const handleToggleTask = async (taskId: string, currentStatus: TaskStatus) => {
    try {
      const newStatus: TaskStatus = currentStatus === 'done' ? 'todo' : 'done';
      const { error } = await supabase
        .from('tasks')
        .update({ status: newStatus })
        .eq('id', taskId);
      
      if (error) throw error;
      
      // Manually invalidate to ensure UI updates immediately
      queryClient.invalidateQueries({ queryKey: ['tasks', 'today', today] });
    } catch (error) {
      console.error('Error toggling task:', error);
    }
  };

  if (!tasks?.length) {
    return (
      <div className="flex items-center justify-center h-full text-sm text-muted-foreground">
        No tasks due today
      </div>
    );
  }

  return (
    <div className="space-y-2 overflow-auto h-full">
      {tasks.map((task) => (
        <div key={task.id} className="flex items-center gap-2">
          <Checkbox 
            checked={task.status === 'done'} 
            onCheckedChange={() => handleToggleTask(task.id, task.status)}
          />
          <span className={`text-sm ${task.status === 'done' ? 'line-through text-muted-foreground' : ''}`}>
            {task.title}
          </span>
        </div>
      ))}
    </div>
  );
}
