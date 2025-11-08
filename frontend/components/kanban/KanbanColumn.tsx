'use client';

import { Task, TaskStatus } from '@/types';
import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { useEffect, useRef, useState } from 'react';
import { KanbanCard } from './KanbanCard';

interface KanbanColumnProps {
  status: TaskStatus;
  title: string;
  tasks: Task[];
  onTaskClick?: (task: Task) => void;
  activeTaskId?: string;
  overId?: string | null;
}

const statusColors: Record<TaskStatus, string> = {
  todo: 'bg-gray-100 border-gray-300',
  in_progress: 'bg-blue-50 border-blue-300',
  done: 'bg-green-50 border-green-300',
  cancelled: 'bg-red-50 border-red-300',
};

const statusIcons: Record<TaskStatus, string> = {
  todo: '📋',
  in_progress: '⚡',
  done: '✅',
  cancelled: '❌',
};

export function KanbanColumn({ status, title, tasks, onTaskClick, activeTaskId, overId }: KanbanColumnProps) {
  // Droppable cho empty zone (khi column rỗng hoặc drop vào cuối)
  const { setNodeRef: setEmptyZoneRef, isOver: isOverEmpty } = useDroppable({
    id: `${status}-empty`,
  });

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isScrolling, setIsScrolling] = useState(false);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      setIsScrolling(true);
      
      // Clear existing timeout
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }

      // Hide scrollbar after 1.5 seconds of inactivity
      scrollTimeoutRef.current = setTimeout(() => {
        setIsScrolling(false);
      }, 1500);
    };

    container.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      container.removeEventListener('scroll', handleScroll);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, []);

  return (
    <div className="flex flex-col min-w-80 h-full">
      {/* Column Header */}
      <div className={`
        px-4 py-3 rounded-t-lg border-t border-x
        ${statusColors[status]}
      `}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-lg">{statusIcons[status]}</span>
            <h3 className="font-semibold text-gray-900">{title}</h3>
            <span className="text-sm text-gray-600 bg-white/60 px-2 py-0.5 rounded-full">
              {tasks.length}
            </span>
          </div>
        </div>
      </div>

      {/* Drop Zone - Auto-hide scrollbar with smooth animation */}
      <div
        ref={scrollContainerRef}
        className={`
          flex-1 p-4 bg-gray-50 rounded-b-lg border-x border-b
          overflow-y-auto scrollbar-modern
          ${statusColors[status].split(' ')[1]}
          ${isScrolling ? 'scrollbar-visible' : ''}
        `}
        style={{ minHeight: 'calc(100vh - 18rem)' }}
      >
        <SortableContext
          items={tasks.map(t => t.id)}
          strategy={verticalListSortingStrategy}
        >
          {tasks.length === 0 ? (
            <div 
              ref={setEmptyZoneRef}
              className={`
                text-center py-8 text-gray-400 text-sm rounded-lg border-2 border-dashed
                ${isOverEmpty ? 'bg-blue-50 border-blue-400' : 'border-gray-300'}
              `}
            >
              Kéo task vào đây
            </div>
          ) : (
            <>
              {tasks.map((task) => (
                <KanbanCard
                  key={task.id}
                  task={task}
                  onTaskClick={onTaskClick}
                  isOver={overId === task.id}
                  isDraggingFromOtherColumn={activeTaskId !== undefined && overId === task.id && tasks.every(t => t.id !== activeTaskId)}
                />
              ))}
              {/* Empty zone at bottom for appending */}
              <div 
                ref={setEmptyZoneRef}
                className={`
                  mt-2 py-4 rounded-lg border-2 border-dashed transition-colors
                  ${isOverEmpty ? 'bg-blue-50 border-blue-400' : 'border-transparent hover:border-gray-300'}
                `}
              />
            </>
          )}
        </SortableContext>
      </div>
    </div>
  );
}
