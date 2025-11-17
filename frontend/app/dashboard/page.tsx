import { DashboardGrid } from '@/components/dashboard/DashboardGrid'
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export default async function DashboardPage() {
    const supabase = await createClient()

    const { data: { user }, error } = await supabase.auth.getUser()

    if (error || !user) {
        redirect('/login')
    }

    return <DashboardGrid userId={user.id} dashboardName="Main" isEditable={true} />
}
