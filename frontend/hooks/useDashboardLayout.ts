'use client'

import {
  loadDashboardLayout,
  saveDashboardLayout,
  type LayoutItem,
} from '@/lib/supabase/dashboard-layouts'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useCallback, useMemo, useRef } from 'react'

interface UseDashboardLayoutOptions {
  userId: string
  dashboardName?: string
}

export function useDashboardLayout({
  userId,
  dashboardName = 'Main',
}: UseDashboardLayoutOptions) {
  const queryClient = useQueryClient()
  const saveTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  // Query key for this specific dashboard (memoized to prevent recreation)
  const queryKey = useMemo(
    () => ['dashboard-layout', userId, dashboardName],
    [userId, dashboardName]
  )

  // Fetch the dashboard layout
  const {
    data: layout = [],
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey,
    queryFn: () => loadDashboardLayout(userId, dashboardName),
    enabled: !!userId, // Only run query if userId is available
    staleTime: 5 * 60 * 1000, // Consider data fresh for 5 minutes
  })

  // Mutation to save the dashboard layout
  const saveMutation = useMutation({
    mutationFn: (newLayout: LayoutItem[]) =>
      saveDashboardLayout(userId, dashboardName, newLayout),
    onSuccess: (data) => {
      // Update the cache with the new data
      queryClient.setQueryData(queryKey, data.layout_data)
    },
    onError: (error) => {
      console.error('Failed to save dashboard layout:', error)
    },
  })

  // Debounced save function (1 second delay)
  const debouncedSave = useCallback(
    (newLayout: LayoutItem[]) => {
      // Clear existing timeout
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current)
      }

      // Optimistically update the UI immediately
      queryClient.setQueryData(queryKey, newLayout)

      // Set new timeout to save to server after 1 second
      saveTimeoutRef.current = setTimeout(() => {
        saveMutation.mutate(newLayout)
      }, 1000)
    },
    [queryClient, queryKey, saveMutation]
  )

  // Immediate save function (no debounce)
  const saveImmediately = useCallback(
    (newLayout: LayoutItem[]) => {
      // Clear any pending debounced saves
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current)
        saveTimeoutRef.current = null
      }

      // Update cache and save immediately
      queryClient.setQueryData(queryKey, newLayout)
      saveMutation.mutate(newLayout)
    },
    [queryClient, queryKey, saveMutation]
  )

  return {
    layout,
    isLoading,
    error,
    isSaving: saveMutation.isPending,
    saveLayout: debouncedSave,
    saveLayoutImmediately: saveImmediately,
    refetch,
  }
}
