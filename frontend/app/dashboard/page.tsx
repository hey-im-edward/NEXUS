/**
 * Dashboard Page
 * 
 * Main dashboard view with drag & drop grid layout
 * Requires authentication
 */

import { LogoutButton } from '@/components/auth/logout-button'
import { DashboardGrid } from '@/components/dashboard/DashboardGrid'
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export default async function DashboardPage() {
  const supabase = await createClient()

  // Check authentication
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser()

  if (error || !user) {
    redirect('/auth/login')
  }

  // Demo apps - sẽ được thay thế bằng apps thực từ database sau
  const demoApps = [
    {
      id: 'kanban-1',
      title: 'Kanban Board',
      component: (
        <div className="flex items-center justify-center h-full text-muted-foreground">
          Kanban Board Component
        </div>
      ),
    },
    {
      id: 'tasks-1',
      title: 'Tasks',
      component: (
        <div className="flex items-center justify-center h-full text-muted-foreground">
          Tasks Component
        </div>
      ),
    },
    {
      id: 'calendar-1',
      title: 'Calendar',
      component: (
        <div className="flex items-center justify-center h-full text-muted-foreground">
          Calendar Component
        </div>
      ),
    },
    {
      id: 'notes-1',
      title: 'Notes',
      component: (
        <div className="flex items-center justify-center h-full text-muted-foreground">
          Notes Component
        </div>
      ),
    },
    {
      id: 'pomodoro-1',
      title: 'Pomodoro Timer',
      component: (
        <div className="flex items-center justify-center h-full text-muted-foreground">
          Pomodoro Component
        </div>
      ),
    },
    {
      id: 'habits-1',
      title: 'Habit Tracker',
      component: (
        <div className="flex items-center justify-center h-full text-muted-foreground">
          Habit Tracker Component
        </div>
      ),
    },
  ]

  return (
    <main className="min-h-screen bg-linear-to-br from-background via-background to-muted/20">
      {/* Sticky Header với Glassmorphism */}
      <div className="sticky top-0 z-50 backdrop-blur-xl bg-background/70 border-b border-border/40 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold bg-linear-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                Dashboard
              </h1>
              <div className="mt-2">
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground/80">
                  {user.user_metadata?.full_name && (
                    <span className="flex items-center gap-1">
                      <span className="font-medium">Tên:</span> {user.user_metadata.full_name}
                    </span>
                  )}
                  <span className="flex items-center gap-1">
                    <span className="font-medium">Email:</span> {user.email}
                  </span>
                  <span className="flex items-center gap-1 font-mono">
                    <span className="font-medium">ID:</span> {user.id}
                  </span>
                </div>
              </div>
            </div>
            <LogoutButton />
          </div>
        </div>
      </div>

      {/* Dashboard Grid */}
      <div className="container mx-auto pt-6">
        <DashboardGrid userId={user.id} dashboardName="Main" apps={demoApps} />
      </div>
    </main>
  )
}
