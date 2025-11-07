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
