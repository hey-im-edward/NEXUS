import { createServerClient } from '@supabase/ssr'
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
    const response = NextResponse.next()

    // Check if the current route is protected
    const isProtectedRoute = protectedRoutes.some(route =>
        pathname.startsWith(route)
    )
    const isAuthRoute = authRoutes.some(route =>
        pathname.startsWith(route)
    )

    if (isProtectedRoute || isAuthRoute) {
        const supabase = createServerClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL!,
            process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
            {
                cookies: {
                    getAll() {
                        return request.cookies.getAll()
                    },
                    setAll(cookiesToSet) {
                        cookiesToSet.forEach(({ name, value, options }) => {
                            response.cookies.set(name, value, options)
                        })
                    },
                },
            }
        )

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

    return response
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
