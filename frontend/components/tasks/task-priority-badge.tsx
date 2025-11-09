'use client';

import { getPriorityConfig } from '@/lib/constants/priority';
import { cn } from '@/lib/utils';
import { TaskPriority } from '@/types';
import { Flag } from 'lucide-react';

/**
 * TaskPriorityBadge Component
 * 
 * Displays task priority as a colored badge
 * Can be clickable to trigger priority selection
 */

interface TaskPriorityBadgeProps {
  priority: TaskPriority;
  onClick?: () => void;
  className?: string;
  showLabel?: boolean; // Show text label or just icon
}

export function TaskPriorityBadge({ 
  priority, 
  onClick, 
  className,
  showLabel = false 
}: TaskPriorityBadgeProps) {
  const config = getPriorityConfig(priority);
  
  // Don't render if priority is none and not clickable
  if (priority === 'none' && !onClick) {
    return null;
  }
  
  const tooltipText = onClick 
    ? `${config.icon} ${config.label} Priority${config.shortLabel ? ` (${config.shortLabel})` : ''} - Click to change`
    : `Priority: ${config.label}`;
  
  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        onClick?.();
      }}
      className={cn(
        'inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium border transition-all',
        config.bgClass,
        config.textClass,
        config.borderClass,
        onClick && [
          'cursor-pointer',
          config.hoverClass,
          'hover:scale-105',
          'active:scale-95',
        ],
        !onClick && 'cursor-default',
        className
      )}
      disabled={!onClick}
      type="button"
      title={tooltipText}
      aria-label={onClick ? `Change priority (currently ${config.label})` : `Priority: ${config.label}`}
    >
      <Flag className="h-3 w-3" fill="currentColor" />
      {showLabel && config.label && (
        <span>{config.label}</span>
      )}
      {!showLabel && config.shortLabel && (
        <span>{config.shortLabel}</span>
      )}
    </button>
  );
}
