import { TaskPriority } from '@/types';

/**
 * PRIORITY CONFIGURATION
 * 
 * Centralized config for task priority levels
 * Used across: TaskPriorityBadge, TaskPrioritySelect, filters
 */

export const PRIORITY_CONFIG = {
  urgent: {
    label: 'Urgent',
    shortLabel: 'P1',
    color: 'red',
    bgClass: 'bg-red-100',
    textClass: 'text-red-800',
    borderClass: 'border-red-300',
    hoverClass: 'hover:bg-red-200',
    icon: '🔴',
    order: 4,
  },
  high: {
    label: 'High',
    shortLabel: 'P2',
    color: 'orange',
    bgClass: 'bg-orange-100',
    textClass: 'text-orange-800',
    borderClass: 'border-orange-300',
    hoverClass: 'hover:bg-orange-200',
    icon: '🟠',
    order: 3,
  },
  medium: {
    label: 'Medium',
    shortLabel: 'P3',
    color: 'yellow',
    bgClass: 'bg-yellow-100',
    textClass: 'text-yellow-800',
    borderClass: 'border-yellow-300',
    hoverClass: 'hover:bg-yellow-200',
    icon: '🟡',
    order: 2,
  },
  low: {
    label: 'Low',
    shortLabel: 'P4',
    color: 'blue',
    bgClass: 'bg-blue-100',
    textClass: 'text-blue-800',
    borderClass: 'border-blue-300',
    hoverClass: 'hover:bg-blue-200',
    icon: '🔵',
    order: 1,
  },
  none: {
    label: 'None',
    shortLabel: '',
    color: 'gray',
    bgClass: 'bg-gray-100',
    textClass: 'text-gray-600',
    borderClass: 'border-gray-300',
    hoverClass: 'hover:bg-gray-200',
    icon: '⚪',
    order: 0,
  },
} as const;

export const PRIORITY_OPTIONS: TaskPriority[] = ['urgent', 'high', 'medium', 'low', 'none'];

/**
 * Helper to get priority config by key
 */
export function getPriorityConfig(priority: TaskPriority) {
  return PRIORITY_CONFIG[priority];
}
