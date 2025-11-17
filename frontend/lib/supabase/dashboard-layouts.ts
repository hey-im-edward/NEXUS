import { createClient } from './client'

export interface LayoutItem {
  i: string // Unique identifier for the layout item (e.g., "app-1", "app-2")
  x: number // X position in grid units
  y: number // Y position in grid units
  w: number // Width in grid units
  h: number // Height in grid units
  minW?: number // Minimum width
  minH?: number // Minimum height
  maxW?: number // Maximum width
  maxH?: number // Maximum height
  static?: boolean // If true, item cannot be moved or resized
}

export interface DashboardLayout {
  id: string
  user_id: string
  dashboard_name: string
  layout_data: LayoutItem[]
  is_default: boolean
  created_at: string
  updated_at: string
}

/**
 * Save or update a dashboard layout for the current user
 * @param userId - The user's ID
 * @param dashboardName - Name of the dashboard (default: "Main")
 * @param layout - Array of layout items from react-grid-layout
 * @returns The saved dashboard layout
 */
export async function saveDashboardLayout(
  userId: string,
  dashboardName: string,
  layout: LayoutItem[]
): Promise<DashboardLayout> {
  const supabase = createClient()

  const { data, error } = await supabase
    .from('user_dashboard_layouts')
    .upsert(
      {
        user_id: userId,
        dashboard_name: dashboardName,
        layout_data: layout,
        updated_at: new Date().toISOString(),
      },
      {
        onConflict: 'user_id,dashboard_name',
      }
    )
    .select()
    .single()

  if (error) {
    throw new Error(`Failed to save dashboard layout: ${error.message}`)
  }

  return data
}

/**
 * Load a dashboard layout for the current user
 * @param userId - The user's ID
 * @param dashboardName - Name of the dashboard to load (default: "Main")
 * @returns The layout data or empty array if not found
 */
export async function loadDashboardLayout(
  userId: string,
  dashboardName: string = 'Main'
): Promise<LayoutItem[]> {
  const supabase = createClient()

  const { data, error } = await supabase
    .from('user_dashboard_layouts')
    .select('layout_data')
    .eq('user_id', userId)
    .eq('dashboard_name', dashboardName)
    .maybeSingle()

  // PGRST116 is "not found" error, which is expected for new users
  if (error && error.code !== 'PGRST116') {
    throw new Error(`Failed to load dashboard layout: ${error.message}`)
  }

  return data?.layout_data || []
}

/**
 * Delete a dashboard layout
 * @param userId - The user's ID
 * @param dashboardName - Name of the dashboard to delete
 */
export async function deleteDashboardLayout(
  userId: string,
  dashboardName: string
): Promise<void> {
  const supabase = createClient()

  const { error } = await supabase
    .from('user_dashboard_layouts')
    .delete()
    .eq('user_id', userId)
    .eq('dashboard_name', dashboardName)

  if (error) {
    throw new Error(`Failed to delete dashboard layout: ${error.message}`)
  }
}

/**
 * Get all dashboard layouts for a user
 * @param userId - The user's ID
 * @returns Array of all dashboard layouts
 */
export async function getAllDashboardLayouts(
  userId: string
): Promise<DashboardLayout[]> {
  const supabase = createClient()

  const { data, error } = await supabase
    .from('user_dashboard_layouts')
    .select('*')
    .eq('user_id', userId)
    .order('dashboard_name', { ascending: true })

  if (error) {
    throw new Error(`Failed to load dashboard layouts: ${error.message}`)
  }

  return data || []
}
