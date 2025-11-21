import { LogoutButton } from '@/components/auth/logout-button'
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export default async function DashboardPage() {
    const supabase = await createClient()

    const { data: { user }, error } = await supabase.auth.getUser()

    if (error || !user) {
        redirect('/login')
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8">
                    <div className="flex items-center justify-between mb-4">
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                            Dashboard
                        </h1>
                        <LogoutButton />
                    </div>
                    <div className="space-y-4">
                        <div className="border-l-4 border-green-500 bg-green-50 dark:bg-green-900/20 p-4">
                            <p className="text-green-700 dark:text-green-300 font-medium">
                                ✓ Successfully authenticated!
                            </p>
                        </div>
                        <div className="space-y-2">
                            <p className="text-gray-600 dark:text-gray-400">
                                <span className="font-semibold">Email:</span> {user.email}
                            </p>
                            <p className="text-gray-600 dark:text-gray-400">
                                <span className="font-semibold">User ID:</span> {user.id}
                            </p>
                            {user.user_metadata?.full_name && (
                                <p className="text-gray-600 dark:text-gray-400">
                                    <span className="font-semibold">Name:</span>{' '}
                                    {user.user_metadata.full_name}
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
