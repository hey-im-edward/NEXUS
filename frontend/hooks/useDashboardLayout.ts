/**
 * useDashboardLayout Hook
 * 
 * TanStack Query hook for fetching and mutating dashboard layouts
 * Includes auto-save with 1 second debounce
 */

import { loadDashboardLayout, saveDashboardLayout } from '@/lib/supabase/dashboard-layouts'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useCallback, useEffect, useRef } from 'react'
import { Layout } from 'react-grid-layout'

interface UseDashboardLayoutProps {
  userId: string
  dashboardName?: string
}

export function useDashboardLayout({ userId, dashboardName = 'Main' }: UseDashboardLayoutProps) {
  const queryClient = useQueryClient()
  const saveTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const pendingLayoutRef = useRef<Layout[] | null>(null)

  // Query to fetch layout
  const {
    data: layout = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ['dashboard-layout', userId, dashboardName],
    queryFn: () => loadDashboardLayout(userId, dashboardName),
    enabled: !!userId,
    staleTime: 1000 * 60 * 5, // 5 minutes
  })

  // Mutation to save layout
  const mutation = useMutation({
    mutationFn: (newLayout: Layout[]) =>
      saveDashboardLayout(userId, dashboardName, newLayout),
    onSuccess: () => {
      if (pendingLayoutRef.current) {
        const nextLayout = pendingLayoutRef.current
        pendingLayoutRef.current = null
        mutation.mutate(nextLayout)
      }
      // KHÔNG invalidateQueries để UI luôn theo layout mới nhất
    },
    onError: (error) => {
      console.error('Failed to save dashboard layout:', error)
    },
  })

  // Debounced save function (500ms delay - faster response)
  const debouncedSave = useCallback(
    (newLayout: Layout[]) => {
      queryClient.cancelQueries({
        queryKey: ['dashboard-layout', userId, dashboardName],
      })

      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current)
      }

      saveTimeoutRef.current = setTimeout(() => {
        if (mutation.isPending) {
          pendingLayoutRef.current = newLayout
        } else {
          mutation.mutate(newLayout)
        }
      }, 800)
    },
    [mutation, queryClient, userId, dashboardName]
  )

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current)
      }
    }
  }, [])

  return {
    layout,
    isLoading,
    error,
    saveLayout: debouncedSave,
    isSaving: mutation.isPending,
  }
}
