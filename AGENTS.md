# Velox Framework Development Guidelines

## Principles
1. **Performance First**: All code must be optimized for speed. Avoid unnecessary allocations.
2. **Type Safety**: strict TypeScript must be used. No `any` unless absolutely necessary and justified.
3. **Zero Dependencies**: The core framework should rely on as few external dependencies as possible.
4. **Professionalism**: Code must be clean, commented, and follow standard formatting (Prettier).

## Testing
- All core features must be tested with Vitest.
- Run `npm test` to verify changes.
