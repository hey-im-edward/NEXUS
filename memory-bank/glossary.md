# Glossary

## Thuật ngữ Domain

| Term | Definition | Notes |
|------|------------|-------|
| **App-mini** | Ứng dụng mini tạo từ predefined blocks | Config-only, không chạy code. Core differentiator của NEXUS |
| **Tool Sprawl** | Vấn đề sử dụng quá nhiều công cụ rời rạc | Core problem mà NEXUS giải quyết |
| **TTV** | Time to Value | Thời gian từ signup đến tạo task đầu tiên (target ≤ 10 phút) |
| **RLS** | Row Level Security | Supabase security feature cho data access control |
| **PoC** | Proof of Concept | Validate tính khả thi trước khi đầu tư vào MVP |
| **Extended PoC** | Phiên bản PoC nội bộ mở rộng | 8 tuần development với internal marketplace |
| **Config-only** | Approach chỉ dùng configuration | Không cho phép user-generated code execution |
| **Internal Marketplace** | Chợ nội bộ cho nhân viên công ty | Submit, review, install app-mini templates |
| **Layer Architecture** | UI → Hooks/Services → API Routes → Supabase | Data flow pattern của hệ thống |
| **Go/No-Go Criteria** | Tiêu chí quyết định tiếp tục | ≥3/5 metrics phải đạt để tiến tới MVP |
| **ADR** | Architecture Decision Record | Document các quyết định kiến trúc quan trọng |
| **Memory Bank** | Persistent context storage | Nguồn truth duy nhất cho project context |
| **Feature Branch** | Development workflow | `feature/scope` naming convention |
| **PWA** | Progressive Web App | Web app với native-like capabilities |
| **Monorepo** | Single repository structure | Chứa multiple packages/apps trong 1 repo |
