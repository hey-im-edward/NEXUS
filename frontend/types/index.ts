export type Json =
    | string
    | number
    | boolean
    | null
    | { [key: string]: Json | undefined }
    | Json[]

export interface AppMiniConfig {
    id: string
    name: string
    type: 'todo-list' | 'kanban' | 'table' | 'iframe'

    // For iframe type
    url?: string

    // For component types
    componentId?: string
    config?: Record<string, any>
}

export interface DashboardLayout {
    items: Array<{
        i: string // app mini id
        x: number
        y: number
        w: number
        h: number
    }>
}

export interface Profile {
    id: string
    email: string
    full_name: string | null
    avatar_url: string | null
    created_at: string
    updated_at: string
}

export interface Workspace {
    id: string
    name: string
    owner_id: string
    created_at: string
    updated_at: string
}

export interface Dashboard {
    id: string
    workspace_id: string
    name: string
    layout: DashboardLayout | null
    created_at: string
    updated_at: string
}

export interface AppMini {
    id: string
    dashboard_id: string
    type: 'todo-list' | 'kanban' | 'table' | 'iframe'
    config: AppMiniConfig
    position: { x: number; y: number; w: number; h: number }
    created_at: string
    updated_at: string
}

// ============================================
// PRODUCTIVITY OS TYPES (70% Priority)
// ============================================

export type TaskStatus = 'todo' | 'in_progress' | 'done' | 'cancelled';
export type TaskPriority = 'none' | 'low' | 'medium' | 'high' | 'urgent';

export interface Task {
    id: string;
    workspace_id: string;
    project_id: string | null; // NULL = Inbox
    parent_task_id: string | null; // For sub-tasks
    
    // Basic Info
    title: string;
    description: string | null;
    status: TaskStatus;
    priority: TaskPriority;
    
    // Dates
    due_date: string | null; // ISO string
    start_date: string | null; // ISO string
    completed_at: string | null; // ISO string
    
    // Recurring (Advanced)
    is_recurring: boolean;
    rrule: string | null; // RFC-5545 format
    recurring_parent_id: string | null;
    
    // Assignment
    assignee_id: string | null;
    created_by: string;
    
    // Metadata
    tags: string[];
    position: number; // For drag-drop ordering
    
    created_at: string;
    updated_at: string;
    
    // Computed (not in DB)
    subtasks?: Task[]; // Loaded separately
}

export interface Project {
    id: string;
    workspace_id: string;
    name: string;
    description: string | null;
    color: string; // Hex color
    icon: string; // Emoji or icon
    is_archived: boolean;
    created_by: string;
    created_at: string;
    updated_at: string;
    
    // Computed
    task_count?: number;
    completed_count?: number;
}

export interface TimeBlock {
    id: string;
    workspace_id: string;
    user_id: string;
    task_id: string | null;
    title: string;
    description: string | null;
    start_time: string; // ISO string
    end_time: string; // ISO string
    color: string;
    created_at: string;
    updated_at: string;
}

export interface Page {
    id: string;
    workspace_id: string;
    parent_page_id: string | null;
    title: string;
    icon: string | null;
    cover_url: string | null;
    content: any; // Tiptap JSON
    is_archived: boolean;
    created_by: string;
    created_at: string;
    updated_at: string;
}
