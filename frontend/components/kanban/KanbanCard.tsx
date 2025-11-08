'use client';

import { Task, TaskPriority } from '@/types';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { format } from 'date-fns';
import { vi } from 'date-fns/locale';
import { Calendar, GripVertical, Tag } from 'lucide-react';

interface KanbanCardProps {
  task: Task;
  onTaskClick?: (task: Task) => void;
  isOver?: boolean;
  isDraggingFromOtherColumn?: boolean;
}

const priorityColors: Record<TaskPriority, string> = {
  none: 'bg-gray-100 text-gray-600',
  low: 'bg-blue-100 text-blue-600',
  medium: 'bg-yellow-100 text-yellow-600',
  high: 'bg-orange-100 text-orange-600',
  urgent: 'bg-red-100 text-red-600',
};

const priorityLabels: Record<TaskPriority, string> = {
  none: 'Không',
  low: 'Thấp',
  medium: 'Trung bình',
  high: 'Cao',
  urgent: 'Khẩn cấp',
};

export function KanbanCard({ task, onTaskClick, isOver, isDraggingFromOtherColumn }: KanbanCardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <>
      {/* Visual drop indicator - shows space where card will be inserted */}
      {isOver && isDraggingFromOtherColumn && (
        <div className="mb-2 transition-all duration-200">
          <div className="min-h-[88px] bg-linear-to-r from-blue-50 to-blue-100 rounded-lg border-2 border-dashed border-blue-400 flex items-center justify-center shadow-sm animate-in fade-in duration-200">
            <span className="text-blue-600 text-xs font-medium">
              ↓ Thả vào đây
            </span>
          </div>
        </div>
      )}
      
      <div
        ref={setNodeRef}
        style={style}
        className={`
          group bg-white rounded-lg shadow-sm border p-3 mb-2
          hover:shadow-md transition-all duration-200 cursor-pointer
          ${isDragging ? 'opacity-50 scale-105 rotate-2 ring-2 ring-blue-400 shadow-2xl' : ''}
          ${isOver && isDraggingFromOtherColumn 
            ? 'ring-2 ring-blue-400 bg-blue-50/30 scale-[0.98]' 
            : 'border-gray-200'
          }
        `}
        onClick={() => onTaskClick?.(task)}
      >
        {/* Drag Handle */}
        <div className="flex items-start gap-2">
          <button
            {...attributes}
            {...listeners}
            className="opacity-0 group-hover:opacity-100 transition-opacity cursor-grab active:cursor-grabbing p-1 -m-1"
            onClick={(e) => e.stopPropagation()}
          >
            <GripVertical className="w-4 h-4 text-gray-400" />
          </button>

          <div className="flex-1 min-w-0">
            {/* Title */}
            <h4 className="font-medium text-gray-900 text-sm mb-2">
              {task.title}
            </h4>

            {/* Description */}
            {task.description && (
              <p className="text-xs text-gray-600 mb-2 line-clamp-2">
                {task.description}
              </p>
            )}

            {/* Metadata */}
            <div className="flex items-center gap-2 flex-wrap">
              {/* Priority Badge */}
              {task.priority !== 'none' && (
                <span
                  className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                    priorityColors[task.priority]
                  }`}
                >
                  {priorityLabels[task.priority]}
                </span>
              )}

              {/* Due Date */}
              {task.due_date && (
                <div className="flex items-center gap-1 text-xs text-gray-600">
                  <Calendar className="w-3 h-3" />
                  <span>
                    {format(new Date(task.due_date), 'd MMM', { locale: vi })}
                  </span>
                </div>
              )}

              {/* Tags */}
              {task.tags.length > 0 && (
                <div className="flex items-center gap-1">
                  <Tag className="w-3 h-3 text-gray-400" />
                  <span className="text-xs text-gray-600">
                    {task.tags.length}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
