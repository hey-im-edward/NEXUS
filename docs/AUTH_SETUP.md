# Authentication Setup Guide

## Overview
This guide covers the authentication implementation using Supabase Auth with Google OAuth and email/password authentication.

## Features
- ✅ Google OAuth authentication
- ✅ Email/password authentication
- ✅ Form validation with react-hook-form + zod
- ✅ Error handling with toast notifications
- ✅ Loading states
- ✅ Responsive design (mobile-first)
- ✅ TypeScript support
- ✅ Dark mode support

## File Structure
```
frontend/
├── app/
│   ├── (auth)/
│   │   └── login/
│   │       └── page.tsx          # Login page component
│   ├── auth/
│   │   └── callback/
│   │       └── route.ts          # OAuth callback handler
│   └── layout.tsx                # Root layout with Toaster
├── components/
│   └── ui/
│       ├── button.tsx            # shadcn/ui Button component
│       ├── input.tsx             # shadcn/ui Input component
│       ├── label.tsx             # shadcn/ui Label component
│       ├── toast.tsx             # shadcn/ui Toast component
│       └── toaster.tsx           # Toast provider
├── hooks/
│   └── use-toast.ts              # Toast hook
├── lib/
│   ├── supabase/
│   │   ├── client.ts             # Client-side Supabase client
│   │   └── server.ts             # Server-side Supabase client
│   └── utils/
│       └── index.ts              # Utility functions (cn)
└── types/
    └── auth.types.ts             # Authentication type definitions
```

## Setup Instructions

### 1. Environment Variables
Create a `.env.local` file in the `frontend` directory:

```bash
NEXT_PUBLIC_SUPABASE_URL=your-project-url.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

### 2. Supabase Configuration

#### Enable Google OAuth:
1. Go to your Supabase project dashboard
2. Navigate to **Authentication** > **Providers**
3. Enable **Google** provider
4. Add your Google OAuth credentials:
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Create a new project or select existing
   - Enable Google+ API
   - Create OAuth 2.0 credentials
   - Add authorized redirect URIs:
     - `https://your-project.supabase.co/auth/v1/callback`
     - `http://localhost:3000/auth/callback` (for development)
5. Copy Client ID and Client Secret to Supabase

#### Configure Redirect URLs:
In Supabase Dashboard > Authentication > URL Configuration:
- Add redirect URLs:
  - `http://localhost:3000/auth/callback` (development)
  - `https://yourdomain.com/auth/callback` (production)

### 3. Install Dependencies
```bash
cd frontend
npm install
```

Required dependencies:
- `@supabase/supabase-js` - Supabase client
- `@supabase/ssr` - Supabase SSR utilities
- `react-hook-form` - Form handling
- `@hookform/resolvers` - Form validation resolvers
- `zod` - Schema validation
- `@radix-ui/react-label` - Label component
- `@radix-ui/react-toast` - Toast notifications
- `@radix-ui/react-slot` - Slot component
- `@radix-ui/react-icons` - Icon components
- `class-variance-authority` - CSS variants
- `clsx` - Class name utility
- `tailwind-merge` - Tailwind class merging

## Usage

### Login Page
The login page is accessible at `/login` and includes:

1. **Google OAuth Button**
   - Primary authentication method
   - One-click sign in with Google account
   - Handles OAuth flow and redirects

2. **Email/Password Form**
   - Alternative authentication method
   - Real-time validation
   - Error messages for invalid inputs

3. **Features**
   - Loading states for both auth methods
   - Form validation (email format, password length)
   - Error handling with toast notifications
   - Redirect to dashboard on success
   - Link to sign up page

### Authentication Flow

#### Google OAuth:
1. User clicks "Continue with Google"
2. Redirected to Google OAuth consent screen
3. After authorization, redirected to `/auth/callback`
4. Callback handler exchanges code for session
5. User redirected to `/dashboard`

#### Email/Password:
1. User enters email and password
2. Form validates inputs
3. Supabase authenticates credentials
4. On success, redirected to `/dashboard`
5. On error, toast notification displayed

### Error Handling
All authentication errors are caught and displayed using toast notifications:
- Invalid credentials
- Network errors
- OAuth failures
- Validation errors

### TypeScript Types
Authentication types are defined in `types/auth.types.ts`:
- `LoginCredentials`
- `SignupCredentials`
- `AuthError`
- `AuthSession`
- `OAuthProvider`
- `OAuthOptions`

## Customization

### Styling
The login page uses Tailwind CSS with custom classes. To modify:
- Edit classes in `app/(auth)/login/page.tsx`
- Update UI components in `components/ui/`
- Modify global styles in `app/globals.css`

### Validation
Form validation schema is defined using Zod in the login page:
```typescript
const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
})
```

Modify schema to add/change validation rules.

### OAuth Providers
To add more OAuth providers (GitHub, GitLab, etc.):
1. Enable provider in Supabase Dashboard
2. Update `handleGoogleLogin` function to accept provider parameter
3. Update UI to include new provider button

## Security Considerations

1. **Environment Variables**: Never commit `.env.local` to version control
2. **HTTPS**: Always use HTTPS in production
3. **Redirect URLs**: Whitelist only trusted domains
4. **Password Policy**: Enforce strong passwords in Supabase settings
5. **Rate Limiting**: Configure rate limits in Supabase Dashboard

## Testing

### Manual Testing:
1. **Google OAuth**:
   - Click "Continue with Google"
   - Verify redirect to Google
   - Complete OAuth flow
   - Check dashboard redirect

2. **Email/Password**:
   - Enter valid credentials
   - Verify login success
   - Enter invalid credentials
   - Verify error handling

3. **Form Validation**:
   - Submit empty form
   - Enter invalid email
   - Enter short password
   - Verify error messages

### Test Accounts:
Create test accounts in Supabase Dashboard > Authentication > Users

## Troubleshooting

### Common Issues:

1. **"Invalid login credentials"**
   - Verify email/password are correct
   - Check if email is confirmed in Supabase

2. **OAuth redirect not working**
   - Verify redirect URLs in Supabase settings
   - Check Google OAuth credentials
   - Ensure callback route is accessible

3. **Toast notifications not showing**
   - Verify Toaster is in root layout
   - Check console for errors

4. **TypeScript errors**
   - Run `npm run type-check`
   - Verify all dependencies are installed

5. **Environment variables not loading**
   - Restart dev server after adding `.env.local`
   - Check file name is exactly `.env.local`

## Next Steps

1. **Create Sign Up Page**: Implement `/signup` route
2. **Password Reset**: Add forgot password functionality
3. **Protected Routes**: Add middleware for authentication
4. **Session Management**: Implement session refresh logic
5. **Profile Page**: Add user profile management
6. **Email Verification**: Require email verification

## Resources
- [Supabase Auth Documentation](https://supabase.com/docs/guides/auth)
- [Next.js App Router](https://nextjs.org/docs/app)
- [React Hook Form](https://react-hook-form.com/)
- [Zod Validation](https://zod.dev/)
- [shadcn/ui](https://ui.shadcn.com/)
