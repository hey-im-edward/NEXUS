# ADR-002: Security Model - No User-Generated Code

## Date
2025-09-28

## Status
Accepted

## Context
App-mini builder feature có thể cho phép user tạo mini-apps từ predefined blocks. Cần balance giữa flexibility và security risks.

## Decision
**Không cho phép user-generated code execution**. Chỉ support "config-only app-mini" với:
- Predefined blocks với fixed behavior
- Configuration-driven UI generation
- JSON manifest cho app-mini structure
- No eval(), no dynamic code execution

## Rationale
- **Security**: Loại bỏ risk của malicious code injection
- **Maintainability**: Dễ debug và maintain system
- **Performance**: Predictable performance characteristics
- **Compliance**: Đơn giản hóa security reviews và audits

## Consequences
- **Positive**: High security, predictable behavior, easy maintenance
- **Negative**: Limited flexibility cho advanced users
- **Risks**: Có thể cần custom solutions cho edge cases

## Alternatives Considered
- **Sandboxed Code Execution**: Quá complex và risky cho PoC
- **WASM Modules**: Overhead không cần thiết cho use case hiện tại
- **Full Code Editor**: Security nightmare và maintenance burden

## Related Decisions
- ADR-001: Technology Stack Selection
- ADR-003: Internal PoC Timeline
