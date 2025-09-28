# Tech Context

## Stack Table

| Component | Technology | Version | Purpose |
|-----------|------------|---------|---------|
| Frontend | Next.js | 15.x | React framework với SSR/SSG |
| Language | TypeScript | 5.x | Type safety và developer experience |
| Styling | Tailwind CSS | 3.x | Utility-first CSS framework |
| Database | Supabase | Latest | PostgreSQL + Auth + Realtime |
| Rich Text | TipTap/Quill | TBD | Rich text editing (quyết định sau) |
| State | React Query | 5.x | Server state management |
| UI Components | Custom + Tailwind | - | Consistent design system |
| Deployment | Vercel | Latest | Hosting và CI/CD |

## Version Requirements
- **Node.js**: 18.x+ (LTS)
- **npm/yarn**: Latest stable
- **Next.js**: 15.x với app router
- **TypeScript**: 5.x với strict mode

## Environment Setup Summary
- **Development**: `npm run dev` với hot reload
- **Production**: Vercel auto-deployment từ Git
- **Database**: Supabase project với RLS enabled
- **Auth**: Supabase Auth với email provider

## External Services
- **Supabase**: Database, Auth, Storage, Realtime
- **Vercel**: Deployment, Analytics, Domain
- **GitHub**: Source code, Issues, Projects

## Technical Constraints
- **Bundle Size**: Keep under 500KB gzipped cho initial load
- **API Latency**: All endpoints < 200ms P95
- **Security**: RLS enabled, no user-generated code execution
- **Browser Support**: Chrome 90+, Firefox 88+, Safari 14+
- **Mobile**: PWA-ready với offline core features

## Development Environment
- **IDE**: VS Code/Cursor với TypeScript support
- **Linting**: ESLint + Prettier
- **Testing**: Jest + React Testing Library
- **Git Hooks**: Husky cho pre-commit checks

## Performance Targets
- **Lighthouse Score**: 90+ cho all metrics
- **Core Web Vitals**: All green
- **Bundle Analysis**: Regular checks với webpack-bundle-analyzer
- **Database**: Query optimization với EXPLAIN ANALYZE
