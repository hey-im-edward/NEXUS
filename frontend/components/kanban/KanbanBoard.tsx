'use client';

import { useTasks } from '@/lib/hooks/use-tasks';
import { useTaskStore } from '@/lib/stores/tasks';
import { Task, TaskStatus } from '@/types';
import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';
import { useEffect, useMemo, useState } from 'react';
import { KanbanCard } from './KanbanCard';
import { KanbanColumn } from './KanbanColumn';

interface KanbanBoardProps {
  projectId?: string;
  workspaceId: string;
  onTaskClick?: (task: Task) => void;
}

const columns: Array<{ status: TaskStatus; title: string }> = [
  { status: 'todo', title: 'Cần làm' },
  { status: 'in_progress', title: 'Đang làm' },
  { status: 'done', title: 'Hoàn thành' },
];

export function KanbanBoard({ projectId, workspaceId, onTaskClick }: KanbanBoardProps) {
  const { tasks, loading, updateTask: updateTaskInDB } = useTasks(workspaceId);
  const { setFilter, updateTask: updateTaskInStore } = useTaskStore();
  const [activeTask, setActiveTask] = useState<Task | null>(null);
  const [overId, setOverId] = useState<string | null>(null);

  // Filter tasks by project
  useEffect(() => {
    if (projectId) {
      setFilter({ type: 'project', projectId });
    }
  }, [projectId, setFilter]);

  // Group tasks by status
  const tasksByStatus = useMemo(() => {
    const filtered = projectId
      ? tasks.filter(t => t.project_id === projectId)
      : tasks;

    // Group by status and sort by position
    return {
      todo: filtered
        .filter(t => t.status === 'todo')
        .sort((a, b) => a.position - b.position),
      in_progress: filtered
        .filter(t => t.status === 'in_progress')
        .sort((a, b) => a.position - b.position),
      done: filtered
        .filter(t => t.status === 'done')
        .sort((a, b) => a.position - b.position),
      cancelled: filtered
        .filter(t => t.status === 'cancelled')
        .sort((a, b) => a.position - b.position),
    };
  }, [tasks, projectId]);

  // Drag and drop sensors
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8, // 8px movement required to start dragging
      },
    })
  );

  // Handle drag start
  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    const task = tasks.find(t => t.id === active.id);
    if (task) {
      setActiveTask(task);
    }
  };

  // Handle drag over (visual feedback only - NO STATE CHANGES)
  const handleDragOver = (event: DragOverEvent) => {
    const { over } = event;
    setOverId(over ? over.id as string : null);
  };

  // Handle drag end
  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveTask(null);
    setOverId(null); // Clear hover state

    if (!over) return;

    const activeId = active.id as string;
    const overId = over.id as string;

    // Skip if dropped on itself
    if (activeId === overId) return;

    const activeTask = tasks.find(t => t.id === activeId);
    if (!activeTask) return;

    // Check if dropped on empty zone (format: "status-empty")
    const emptyZoneMatch = overId.match(/^(todo|in_progress|done|cancelled)-empty$/);
    
    if (emptyZoneMatch) {
      // === CASE 1: DROP ON EMPTY ZONE → Append to end ===
      const newStatus = emptyZoneMatch[1] as TaskStatus;
      
      if (activeTask.status !== newStatus) {
        console.log('📦 Drop on empty zone:', newStatus);
        
        const targetColumnTasks = tasksByStatus[newStatus];
        const newPosition = targetColumnTasks.length;
        
        updateTaskInStore(activeId, { 
          status: newStatus,
          position: newPosition 
        });
        
        try {
          await updateTaskInDB(activeId, {
            status: newStatus,
            position: newPosition,
          });
          console.log('✅ Moved to end of column');
        } catch (error) {
          console.error('❌ Error:', error);
          updateTaskInStore(activeId, { 
            status: activeTask.status,
            position: activeTask.position 
          });
        }
      }
      return;
    }

    // === CASE 2 & 3: DROP ON ANOTHER TASK ===
    const overTask = tasks.find(t => t.id === overId);
    if (!overTask) return;
    
    if (activeTask.status === overTask.status) {
      // === CASE 2: Same column → Reorder ===
      console.log('🔄 Reorder in same column');
      
      const columnTasks = tasksByStatus[activeTask.status];
      const oldIndex = columnTasks.findIndex(t => t.id === activeId);
      const newIndex = columnTasks.findIndex(t => t.id === overId);

      if (oldIndex === -1 || newIndex === -1 || oldIndex === newIndex) {
        return;
      }

      const reorderedTasks = arrayMove(columnTasks, oldIndex, newIndex);

      reorderedTasks.forEach((task, index) => {
        updateTaskInStore(task.id, { position: index });
      });

      try {
        await Promise.all(
          reorderedTasks.map((task, index) => 
            updateTaskInDB(task.id, { position: index })
          )
        );
        console.log('✅ Reorder successful');
      } catch (error) {
        console.error('❌ Error reordering:', error);
        columnTasks.forEach((task) => {
          updateTaskInStore(task.id, { position: task.position });
        });
      }
    } else {
      // === CASE 3: Different column → Move + Insert at position ===
      console.log('🎯 Move to different column + insert at position');
      
      const newStatus = overTask.status;
      const targetColumnTasks = tasksByStatus[newStatus];
      const insertIndex = targetColumnTasks.findIndex(t => t.id === overId);
      
      if (insertIndex === -1) return;
      
      console.log(`  → Moving "${activeTask.title}" to ${newStatus} at position ${insertIndex}`);
      
      // Step 1: Change status + position for moved task
      updateTaskInStore(activeId, { 
        status: newStatus,
        position: insertIndex 
      });
      
      // Step 2: Shift down all tasks after insert position
      const tasksToShift = targetColumnTasks
        .filter((t, idx) => idx >= insertIndex)
        .map(t => ({ ...t, position: t.position + 1 }));
      
      tasksToShift.forEach(task => {
        updateTaskInStore(task.id, { position: task.position });
      });
      
      try {
        // Update moved task
        await updateTaskInDB(activeId, {
          status: newStatus,
          position: insertIndex,
        });
        
        // Update shifted tasks
        await Promise.all(
          tasksToShift.map(task => 
            updateTaskInDB(task.id, { position: task.position })
          )
        );
        
        console.log('✅ Moved and inserted at position');
      } catch (error) {
        console.error('❌ Error:', error);
        // Revert
        updateTaskInStore(activeId, { 
          status: activeTask.status,
          position: activeTask.position 
        });
        tasksToShift.forEach(task => {
          updateTaskInStore(task.id, { position: task.position - 1 });
        });
      }
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-gray-500">Đang tải...</div>
      </div>
    );
  }

  return (
    <DndContext
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      <div className="flex gap-4 h-[calc(100vh-12rem)] pb-4">
        {columns.map((column) => (
          <KanbanColumn
            key={column.status}
            status={column.status}
            title={column.title}
            tasks={tasksByStatus[column.status]}
            onTaskClick={onTaskClick}
            activeTaskId={activeTask?.id}
            overId={overId}
          />
        ))}
      </div>

      {/* Drag Overlay */}
      <DragOverlay>
        {activeTask ? (
          <div className="rotate-3 opacity-90">
            <KanbanCard task={activeTask} />
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}
