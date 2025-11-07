# Login Page Architecture & Flow

## Component Hierarchy

```
RootLayout (app/layout.tsx)
├── <body>
│   ├── {children}
│   │   └── LoginPage (app/(auth)/login/page.tsx) [Client Component]
│   │       ├── Container <div>
│   │       │   ├── Header Section
│   │       │   │   ├── <h1> "Welcome back"
│   │       │   │   └── <p> "Sign in to your account..."
│   │       │   │
│   │       │   ├── Login Card <div>
│   │       │   │   ├── Google OAuth Button
│   │       │   │   │   ├── Google Icon (SVG)
│   │       │   │   │   ├── Loading Spinner (conditional)
│   │       │   │   │   └── Text: "Continue with Google"
│   │       │   │   │
│   │       │   │   ├── Divider
│   │       │   │   │   └── "Or continue with email"
│   │       │   │   │
│   │       │   │   └── Email/Password Form
│   │       │   │       ├── Email Field
│   │       │   │       │   ├── Label
│   │       │   │       │   ├── Input
│   │       │   │       │   └── Error Message (conditional)
│   │       │   │       │
│   │       │   │       ├── Password Field
│   │       │   │       │   ├── Label + Forgot Link
│   │       │   │       │   ├── Input
│   │       │   │       │   └── Error Message (conditional)
│   │       │   │       │
│   │       │   │       └── Submit Button
│   │       │   │           ├── Loading Spinner (conditional)
│   │       │   │           └── Text: "Sign in" / "Signing in..."
│   │       │   │
│   │       │   └── Sign Up Link Section
│   │       │       └── "Don't have an account? Sign up"
│   └── <Toaster /> [Global Toast Provider]
```

## State Management

```typescript
LoginPage Component State:
├── isLoading: boolean           // Email/password form loading
├── isGoogleLoading: boolean     // Google OAuth loading
└── form: UseFormReturn          // React Hook Form state
    ├── email: string
    ├── password: string
    ├── errors: { email?, password? }
    └── formState: { isValid, isDirty }
```

## Authentication Flow Diagrams

### 1. Google OAuth Flow
```
┌─────────────────────────────────────────────────────────────┐
│                         User Action                         │
└────────────────────────────┬────────────────────────────────┘
                             │
                             ▼
               Click "Continue with Google"
                             │
                             ▼
                  handleGoogleLogin() called
                             │
                             ▼
          ┌──────────────────────────────────────┐
          │ setIsGoogleLoading(true)             │
          └────────────────┬─────────────────────┘
                           │
                           ▼
          ┌──────────────────────────────────────┐
          │ supabase.auth.signInWithOAuth()      │
          │ - provider: 'google'                 │
          │ - redirectTo: /auth/callback         │
          └────────────────┬─────────────────────┘
                           │
                           ▼
                 User Redirected to Google
                           │
                           ▼
          ┌──────────────────────────────────────┐
          │ Google OAuth Consent Screen          │
          │ - User authorizes application        │
          └────────────────┬─────────────────────┘
                           │
                           ▼
            Redirect to /auth/callback?code=xxx
                           │
                           ▼
          ┌──────────────────────────────────────┐
          │ Callback Route Handler               │
          │ - Exchange code for session          │
          │ - Set secure cookies                 │
          └────────────────┬─────────────────────┘
                           │
              ┌────────────┴────────────┐
              │                         │
              ▼                         ▼
          Success                    Error
              │                         │
              ▼                         ▼
    Redirect to /dashboard    Redirect to /login?error
              │
              ▼
          ┌──────────────────────────────────────┐
          │ Middleware Validates Session         │
          │ - Check user authentication          │
          └────────────────┬─────────────────────┘
                           │
                           ▼
                   Dashboard Page Loads
                           │
                           ▼
                Display User Information
```

### 2. Email/Password Flow
```
┌─────────────────────────────────────────────────────────────┐
│                         User Action                         │
└────────────────────────────┬────────────────────────────────┘
                             │
                             ▼
                Enter Email & Password
                             │
                             ▼
          ┌──────────────────────────────────────┐
          │ Real-time Validation (Zod)           │
          │ - Email format check                 │
          │ - Password length check              │
          └────────────────┬─────────────────────┘
                           │
              ┌────────────┴────────────┐
              │                         │
              ▼                         ▼
          Invalid                   Valid
              │                         │
              ▼                         │
    Show Error Messages                 │
    (Under inputs)                      │
                                        │
                                        ▼
                              Click "Sign in"
                                        │
                                        ▼
          ┌──────────────────────────────────────┐
          │ onSubmit() called                    │
          │ - setIsLoading(true)                 │
          └────────────────┬─────────────────────┘
                           │
                           ▼
          ┌──────────────────────────────────────┐
          │ supabase.auth.signInWithPassword()   │
          │ - email: form.email                  │
          │ - password: form.password            │
          └────────────────┬─────────────────────┘
                           │
              ┌────────────┴────────────┐
              │                         │
              ▼                         ▼
          Success                    Error
              │                         │
              ▼                         ▼
    Show Success Toast         Show Error Toast
              │                         │
              ▼                         ▼
    setIsLoading(false)        setIsLoading(false)
              │
              ▼
      router.push('/dashboard')
              │
              ▼
      router.refresh()
              │
              ▼
    Dashboard Page Loads
```

### 3. Middleware Protection Flow
```
┌─────────────────────────────────────────────────────────────┐
│                    User Navigates to Route                  │
└────────────────────────────┬────────────────────────────────┘
                             │
                             ▼
          ┌──────────────────────────────────────┐
          │ Middleware Intercepts Request        │
          │ (middleware.ts)                      │
          └────────────────┬─────────────────────┘
                           │
                           ▼
                  Check Route Type
                           │
          ┌────────────────┼────────────────┐
          │                │                │
          ▼                ▼                ▼
    Protected Route   Auth Route      Public Route
    (/dashboard)      (/login)        (other)
          │                │                │
          ▼                ▼                ▼
    Get User         Get User         Pass Through
    Session          Session          (no check)
          │                │
          ▼                ▼
    ┌─────────┐      ┌─────────┐
    │ User?   │      │ User?   │
    └────┬────┘      └────┬────┘
         │                │
    ┌────┴────┐      ┌────┴────┐
    │         │      │         │
    ▼         ▼      ▼         ▼
  Yes        No    Yes        No
    │         │      │         │
    │         ▼      ▼         │
    │    Redirect  Redirect    │
    │    to Login  to Dash     │
    │         │      │         │
    ▼         ▼      ▼         ▼
  Allow     Block  Block     Allow
  Access    Access Access    Access
```

## Data Flow

### Authentication Data Flow
```
┌──────────────┐
│   User Input │
│  (Form Data) │
└──────┬───────┘
       │
       ▼
┌──────────────────────┐
│  React Hook Form     │
│  - Validation (Zod)  │
│  - Error handling    │
└──────┬───────────────┘
       │
       ▼
┌──────────────────────┐
│  Supabase Client     │
│  - signInWithOAuth() │
│  - signInWith        │
│    Password()        │
└──────┬───────────────┘
       │
       ▼
┌──────────────────────┐
│  Supabase Backend    │
│  - Authenticate      │
│  - Create session    │
│  - Set cookies       │
└──────┬───────────────┘
       │
       ▼
┌──────────────────────┐
│  Session Storage     │
│  - Secure cookies    │
│  - httpOnly          │
│  - Encrypted         │
└──────┬───────────────┘
       │
       ▼
┌──────────────────────┐
│  User State          │
│  - User object       │
│  - Access token      │
│  - Refresh token     │
└──────────────────────┘
```

## Component Dependencies

```
LoginPage
├── Dependencies:
│   ├── react (useState, useForm)
│   ├── next/navigation (useRouter)
│   ├── react-hook-form (useForm)
│   ├── zod (validation schema)
│   ├── @supabase/supabase-js (createClient)
│   │
│   ├── UI Components:
│   │   ├── Button (components/ui/button.tsx)
│   │   ├── Input (components/ui/input.tsx)
│   │   └── Label (components/ui/label.tsx)
│   │
│   ├── Hooks:
│   │   └── useToast (hooks/use-toast.ts)
│   │
│   └── Utils:
│       └── cn (lib/utils/index.ts)
│
└── Used By:
    └── Root Layout (app/layout.tsx)
```

## File Relationships

```
LoginPage Component (page.tsx)
    │
    ├── Imports Supabase Client
    │   └── lib/supabase/client.ts
    │       └── Creates browser client
    │
    ├── Uses UI Components
    │   ├── components/ui/button.tsx
    │   ├── components/ui/input.tsx
    │   └── components/ui/label.tsx
    │       └── All use lib/utils/index.ts (cn function)
    │
    ├── Uses Toast System
    │   └── hooks/use-toast.ts
    │       └── components/ui/toast.tsx
    │           └── components/ui/toaster.tsx
    │               └── Rendered in app/layout.tsx
    │
    └── Redirects to
        ├── /auth/callback (OAuth)
        │   └── app/auth/callback/route.ts
        │       └── Uses lib/supabase/server.ts
        │
        └── /dashboard (Success)
            └── app/dashboard/page.tsx
                └── Protected by middleware.ts
```

## Error Handling Flow

```
Error Occurs
    │
    ├── Network Error
    │   └── Catch in try/catch
    │       └── toast({ variant: "destructive", ... })
    │
    ├── Validation Error
    │   └── Caught by react-hook-form
    │       └── Display under input field
    │
    ├── Auth Error
    │   └── Returned from Supabase
    │       └── toast({ variant: "destructive", ... })
    │
    └── Redirect Error
        └── Caught in callback handler
            └── Redirect to /login?error=auth_failed
```

## State Transitions

```
Page Load
    │
    ▼
[IDLE STATE]
    │
    ├─────────────────────────┐
    │                         │
    ▼                         ▼
Google Button Click    Email Form Submit
    │                         │
    ▼                         ▼
[GOOGLE_LOADING]         [EMAIL_LOADING]
    │                         │
    ├─────────┐               ├─────────┐
    │         │               │         │
    ▼         ▼               ▼         ▼
SUCCESS    ERROR          SUCCESS    ERROR
    │         │               │         │
    ▼         ▼               ▼         ▼
REDIRECT   [IDLE]         REDIRECT   [IDLE]
 to OAuth   + Toast        to Dash   + Toast
    │
    ▼
[CALLBACK]
    │
    ├─────────┐
    │         │
    ▼         ▼
SUCCESS    ERROR
    │         │
    ▼         ▼
REDIRECT   REDIRECT
 to Dash    to Login
```

## Security Layers

```
┌─────────────────────────────────────────┐
│         Client-Side Security            │
├─────────────────────────────────────────┤
│ - Environment variables validation      │
│ - HTTPS enforcement (production)        │
│ - Input validation (Zod)                │
│ - XSS prevention (React)                │
└────────────────┬────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────┐
│      Supabase Client Security           │
├─────────────────────────────────────────┤
│ - Secure token storage                  │
│ - Automatic token refresh               │
│ - CORS configuration                    │
└────────────────┬────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────┐
│      Middleware Security                │
├─────────────────────────────────────────┤
│ - Route protection                      │
│ - Session validation                    │
│ - Redirect unauthorized access          │
└────────────────┬────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────┐
│      Supabase Backend Security          │
├─────────────────────────────────────────┤
│ - Password hashing (bcrypt)             │
│ - JWT token generation                  │
│ - CSRF protection                       │
│ - Rate limiting                         │
│ - SQL injection prevention              │
└─────────────────────────────────────────┘
```

## Performance Optimization

```
Code Splitting
    │
    ├── Route-based splitting
    │   └── (auth) group keeps auth pages separate
    │
    ├── Component-based splitting
    │   └── UI components imported separately
    │
    └── Dynamic imports (future)
        └── Heavy components lazy loaded

Bundle Optimization
    │
    ├── Tree shaking
    │   └── Unused exports removed
    │
    ├── Minification
    │   └── Production build optimized
    │
    └── Code compression
        └── Gzip/Brotli enabled

Asset Optimization
    │
    ├── SVG icons
    │   └── Inline, no HTTP requests
    │
    ├── No external fonts loaded
    │   └── System fonts used
    │
    └── Minimal CSS
        └── Tailwind purges unused styles
```

---

## Quick Reference

### Key Functions:
- `handleGoogleLogin()` - Initiates Google OAuth flow
- `onSubmit()` - Handles email/password form submission
- `toast()` - Shows toast notifications
- `createClient()` - Creates Supabase client instance

### Key States:
- `isLoading` - Email/password form loading state
- `isGoogleLoading` - Google OAuth loading state
- `errors` - Form validation errors

### Key Routes:
- `/login` - Login page
- `/auth/callback` - OAuth callback handler
- `/dashboard` - Protected dashboard

### Key Components:
- `LoginPage` - Main component
- `Button` - Reusable button component
- `Input` - Form input component
- `Toaster` - Global toast provider
