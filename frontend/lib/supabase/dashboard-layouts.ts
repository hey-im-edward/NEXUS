/**
 * Dashboard Layouts - Supabase Helper Functions
 * 
 * Handles saving and loading dashboard layouts to/from Supabase
 * Uses user_dashboard_layouts table with JSONB layout_data
 */

import { createClient } from '@/lib/supabase/client'
import { Layout } from 'react-grid-layout'

export interface DashboardLayout {
  id?: string
  user_id: string
  dashboard_name: string
  layout_data: Layout[]
  is_default?: boolean
  created_at?: string
  updated_at?: string
}

/**
 * Save dashboard layout to Supabase (upsert)
 * Auto-saves when user drags/resizes cards
 */
export async function saveDashboardLayout(
  userId: string,
  dashboardName: string = 'Main',
  layout: Layout[]
): Promise<DashboardLayout> {
  const supabase = createClient()

  const { data, error } = await supabase
    .from('user_dashboard_layouts')
    .upsert({
      user_id: userId,
      dashboard_name: dashboardName,
      layout_data: layout,
      updated_at: new Date().toISOString(),
    }, {
      onConflict: 'user_id,dashboard_name'
    })
    .select()
    .single()

  if (error) {
    console.error('Error saving dashboard layout:', error)
    throw error
  }

  return data
}

/**
 * Load dashboard layout from Supabase
 * Returns empty array if no layout exists (first-time user)
 */
export async function loadDashboardLayout(
  userId: string,
  dashboardName: string = 'Main'
): Promise<Layout[]> {
  const supabase = createClient()

  const { data, error } = await supabase
    .from('user_dashboard_layouts')
    .select('layout_data')
    .eq('user_id', userId)
    .eq('dashboard_name', dashboardName)
    .single()

  // PGRST116 = no rows returned (first-time user)
  if (error && error.code !== 'PGRST116') {
    console.error('Error loading dashboard layout:', error)
    throw error
  }

  return data?.layout_data || []
}

/**
 * Delete a dashboard layout
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
    console.error('Error deleting dashboard layout:', error)
    throw error
  }
}

/**
 * Get all dashboards for a user
 */
export async function listUserDashboards(userId: string): Promise<DashboardLayout[]> {
  const supabase = createClient()

  const { data, error } = await supabase
    .from('user_dashboard_layouts')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error listing dashboards:', error)
    throw error
  }

  return data || []
}
