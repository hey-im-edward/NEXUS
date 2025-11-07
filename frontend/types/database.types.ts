export interface Database {
    public: {
        Tables: {
            profiles: {
                Row: {
                    id: string
                    email: string
                    full_name: string | null
                    avatar_url: string | null
                    created_at: string
                    updated_at: string
                }
                Insert: {
                    id: string
                    email: string
                    full_name?: string | null
                    avatar_url?: string | null
                    created_at?: string
                    updated_at?: string
                }
                Update: {
                    id?: string
                    email?: string
                    full_name?: string | null
                    avatar_url?: string | null
                    created_at?: string
                    updated_at?: string
                }
            }
            workspaces: {
                Row: {
                    id: string
                    name: string
                    owner_id: string
                    created_at: string
                    updated_at: string
                }
                Insert: {
                    id?: string
                    name: string
                    owner_id: string
                    created_at?: string
                    updated_at?: string
                }
                Update: {
                    id?: string
                    name?: string
                    owner_id?: string
                    created_at?: string
                    updated_at?: string
                }
            }
            dashboards: {
                Row: {
                    id: string
                    workspace_id: string
                    name: string
                    layout: any
                    created_at: string
                    updated_at: string
                }
                Insert: {
                    id?: string
                    workspace_id: string
                    name: string
                    layout?: any
                    created_at?: string
                    updated_at?: string
                }
                Update: {
                    id?: string
                    workspace_id?: string
                    name?: string
                    layout?: any
                    created_at?: string
                    updated_at?: string
                }
            }
            app_minis: {
                Row: {
                    id: string
                    dashboard_id: string
                    type: 'todo-list' | 'kanban' | 'table' | 'iframe'
                    config: any
                    position: any
                    created_at: string
                    updated_at: string
                }
                Insert: {
                    id?: string
                    dashboard_id: string
                    type: 'todo-list' | 'kanban' | 'table' | 'iframe'
                    config?: any
                    position?: any
                    created_at?: string
                    updated_at?: string
                }
                Update: {
                    id?: string
                    dashboard_id?: string
                    type?: 'todo-list' | 'kanban' | 'table' | 'iframe'
                    config?: any
                    position?: any
                    created_at?: string
                    updated_at?: string
                }
            }
            documents: {
                Row: {
                    id: string
                    workspace_id: string
                    title: string
                    content: string
                    parent_id: string | null
                    position: number
                    is_public: boolean
                    created_by: string
                    last_edited_by: string | null
                    created_at: string
                    updated_at: string
                    version: number
                }
                Insert: {
                    id?: string
                    workspace_id: string
                    title?: string
                    content?: string
                    parent_id?: string | null
                    position?: number
                    is_public?: boolean
                    created_by: string
                    last_edited_by?: string | null
                    created_at?: string
                    updated_at?: string
                    version?: number
                }
                Update: {
                    id?: string
                    workspace_id?: string
                    title?: string
                    content?: string
                    parent_id?: string | null
                    position?: number
                    is_public?: boolean
                    created_by?: string
                    last_edited_by?: string | null
                    created_at?: string
                    updated_at?: string
                    version?: number
                }
            }
        }
        Views: {
            [_ in never]: never
        }
        Functions: {
            [_ in never]: never
        }
        Enums: {
            [_ in never]: never
        }
    }
}
