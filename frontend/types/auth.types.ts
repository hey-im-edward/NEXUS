// Authentication Types
export interface LoginCredentials {
    email: string
    password: string
}

export interface SignupCredentials extends LoginCredentials {
    fullName?: string
    confirmPassword?: string
}

export interface AuthError {
    message: string
    status?: number
}

export interface AuthSession {
    user: {
        id: string
        email: string
        user_metadata?: {
            full_name?: string
            avatar_url?: string
        }
    }
    access_token: string
    refresh_token: string
}

// OAuth Provider Types
export type OAuthProvider = 'google' | 'github' | 'gitlab'

export interface OAuthOptions {
    redirectTo: string
    scopes?: string
    queryParams?: Record<string, string>
}
