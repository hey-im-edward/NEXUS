import { createClient } from '@/lib/supabase/server'
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

// Define protected routes
const protectedRoutes = [
  '/dashboard',
  '/today',
  '/inbox',
  '/upcoming',
  '/projects',
  '/calendar',
  '/pages',
]
const authRoutes = ['/login', '/signup']

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl

    // Check if the current route is protected
    const isProtectedRoute = protectedRoutes.some(route =>
        pathname.startsWith(route)
    )
    const isAuthRoute = authRoutes.some(route =>
        pathname.startsWith(route)
    )

    if (isProtectedRoute || isAuthRoute) {
        const supabase = await createClient()
        const { data: { user } } = await supabase.auth.getUser()

        // Redirect to login if accessing protected route without authentication
        if (isProtectedRoute && !user) {
            const redirectUrl = new URL('/login', request.url)
            redirectUrl.searchParams.set('redirect', pathname)
            return NextResponse.redirect(redirectUrl)
        }

        // Redirect to dashboard if accessing auth route while authenticated
        if (isAuthRoute && user) {
            return NextResponse.redirect(new URL('/dashboard', request.url))
        }
    }

    return NextResponse.next()
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * - public folder
         */
        '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
    ],
}
