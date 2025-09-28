# ADR-001: Technology Stack Selection

## Date
2025-09-28

## Status
Accepted

## Context
Dự án NEXUS PoC cần một technology stack cân bằng giữa development speed, scalability, và maintainability. Stack phải support real-time features, authentication, và rich text editing.

## Decision
Chọn technology stack sau:
- **Frontend**: Next.js 15.x với TypeScript
- **Styling**: Tailwind CSS 3.x
- **Database**: Supabase (PostgreSQL + Auth + Realtime)
- **Rich Text**: TipTap hoặc Quill (quyết định sau PoC phase)

## Rationale
- **Next.js**: Cung cấp SSR/SSG, API routes, và excellent developer experience
- **TypeScript**: Type safety quan trọng cho codebase lớn
- **Tailwind CSS**: Rapid UI development với consistent design system
- **Supabase**: All-in-one solution cho database, auth, và real-time mà không cần manage infrastructure

## Consequences
- **Positive**: Fast development, good performance, easy deployment
- **Negative**: Vendor lock-in với Supabase, learning curve cho team mới
- **Risks**: Supabase downtime có thể affect service

## Alternatives Considered
- **Next.js + Prisma + PostgreSQL**: Hơn complexity trong setup và maintenance
- **Remix + Supabase**: Remix còn mới và ecosystem chưa mature
- **SvelteKit + Supabase**: SvelteKit excellent nhưng TypeScript support chưa hoàn thiện

## Related Decisions
- ADR-002: Security Model
- ADR-003: No User-Generated Code Execution
