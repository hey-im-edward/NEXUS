'use client';

import { TaskPriorityBadge } from './task-priority-badge';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { getPriorityConfig, PRIORITY_OPTIONS } from '@/lib/constants/priority';
import { cn } from '@/lib/utils';
import { TaskPriority } from '@/types';
import { Check } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

/**
 * TaskPrioritySelect Component
 * 
 * Dropdown to select task priority
 * Shows current priority as badge, opens popover with options
 */

interface TaskPrioritySelectProps {
  taskId: string;
  currentPriority: TaskPriority;
  onSelect: (taskId: string, priority: TaskPriority) => void;
  className?: string;
}

export function TaskPrioritySelect({ 
  taskId, 
  currentPriority, 
  onSelect,
  className 
}: TaskPrioritySelectProps) {
  const [open, setOpen] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(
    PRIORITY_OPTIONS.findIndex(p => p === currentPriority)
  );
  const optionRefs = useRef<(HTMLButtonElement | null)[]>([]);
  
  const handleSelect = async (priority: TaskPriority) => {
    setIsUpdating(true);
    setOpen(false);
    
    try {
      await onSelect(taskId, priority);
    } finally {
      setIsUpdating(false);
    }
  };
  
  // Reset focused index when popover opens
  useEffect(() => {
    if (open) {
      const currentIndex = PRIORITY_OPTIONS.findIndex(p => p === currentPriority);
      setFocusedIndex(currentIndex);
      // Focus the current priority option
      setTimeout(() => {
        optionRefs.current[currentIndex]?.focus();
      }, 0);
    }
  }, [open, currentPriority]);
  
  // Keyboard navigation handler
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!open) return;
    
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setFocusedIndex((prev) => {
          const next = (prev + 1) % PRIORITY_OPTIONS.length;
          optionRefs.current[next]?.focus();
          return next;
        });
        break;
      case 'ArrowUp':
        e.preventDefault();
        setFocusedIndex((prev) => {
          const next = (prev - 1 + PRIORITY_OPTIONS.length) % PRIORITY_OPTIONS.length;
          optionRefs.current[next]?.focus();
          return next;
        });
        break;
      case 'Enter':
      case ' ':
        e.preventDefault();
        if (focusedIndex >= 0) {
          handleSelect(PRIORITY_OPTIONS[focusedIndex]);
        }
        break;
      case 'Escape':
        e.preventDefault();
        setOpen(false);
        break;
    }
  };
  
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <div className={cn('inline-block', className)}>
          <TaskPriorityBadge 
            priority={currentPriority} 
            onClick={() => !isUpdating && setOpen(true)}
          />
        </div>
      </PopoverTrigger>
      
      <PopoverContent 
        className="w-48 p-1" 
        align="start"
        side="bottom"
        onKeyDown={handleKeyDown}
      >
        <div className="space-y-0.5" role="menu" aria-label="Select priority">
          {PRIORITY_OPTIONS.map((priority, index) => {
            const config = getPriorityConfig(priority);
            const isSelected = priority === currentPriority;
            const isFocused = index === focusedIndex;
            
            return (
              <button
                key={priority}
                ref={(el) => {
                  optionRefs.current[index] = el;
                }}
                onClick={() => handleSelect(priority)}
                className={cn(
                  'w-full flex items-center justify-between px-3 py-2 rounded text-sm transition-colors',
                  'hover:bg-accent focus:bg-accent focus:outline-none',
                  isSelected && 'bg-accent/50',
                  isFocused && 'ring-2 ring-primary ring-inset'
                )}
                type="button"
                role="menuitem"
                tabIndex={isFocused ? 0 : -1}
              >
                <div className="flex items-center gap-2">
                  <span className="text-base">{config.icon}</span>
                  <span className="font-medium">{config.label}</span>
                  {config.shortLabel && (
                    <span className="text-xs text-muted-foreground">
                      ({config.shortLabel})
                    </span>
                  )}
                </div>
                
                {isSelected && (
                  <Check className="h-4 w-4 text-primary" />
                )}
              </button>
            );
          })}
        </div>
      </PopoverContent>
    </Popover>
  );
}
