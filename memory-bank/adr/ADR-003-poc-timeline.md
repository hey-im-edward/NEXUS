# ADR-003: Internal PoC Timeline

## Date
2025-09-28

## Status
Accepted

## Context
Dự án NEXUS cần validation trước khi invest vào full MVP. Cần timeline realistic để test core assumptions.

## Decision
**Chạy internal PoC 8 tuần** trước khi quyết định build full MVP:
- **Tuần 0**: Setup & Onboarding
- **Tuần 1**: Auth & Layout
- **Tuần 2**: Docs Editor (TipTap/Quill)
- **Tuần 3**: Create Task from Doc
- **Tuần 4**: Tasks & Kanban Board
- **Tuần 5**: Goals
- **Tuần 6**: App-mini Builder v0
- **Tuần 7**: Admin & Marketplace Core
- **Tuần 8**: Deploy & Pilot

## Rationale
- **Risk Mitigation**: Validate assumptions trước khi scale
- **Learning**: Internal testing để refine UX và features
- **Resource**: 8 tuần realistic cho team size và scope
- **Go/No-Go**: Clear checkpoint để decide future investment

## Consequences
- **Positive**: Data-driven decisions, early feedback, manageable scope
- **Negative**: Delay to market, potential opportunity cost
- **Risks**: Scope creep, timeline slippage, team burnout

## Alternatives Considered
- **6-week PoC**: Quá aggressive, risk quality và burnout
- **12-week PoC**: Quá conservative, có thể lose momentum
- **Direct to MVP**: High risk nếu assumptions sai

## Related Decisions
- ADR-001: Technology Stack Selection
- ADR-002: Security Model
