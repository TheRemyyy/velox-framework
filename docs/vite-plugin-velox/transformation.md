# JSX Transformation Technical Details

The Velox framework relies on a specialized JSX transformation to achieve its "Zero Virtual DOM" promise.

## The Automatic Runtime

Unlike older versions of React where you needed to import a global factory (like `React`), Velox uses the automatic JSX runtime. This means the compiler automatically injects the necessary imports.

### Runtime Entry Points

The `@remyyy/velox` package provides two entry points for the compiler:

- `jsx-runtime`: Used for production builds.
- `jsx-dev-runtime`: Used during development for better debugging and error tracking.

## Transformation Mechanics

When you write JSX in a Velox project:

```tsx
const element = <div class="greeting">Hello {name()}</div>;
```

The compiler transforms it into:

```javascript
import { jsx as _jsx } from "@remyyy/velox/jsx-runtime";

const element = _jsx("div", {
  class: "greeting",
  children: ["Hello ", name()]
});
```

The `_jsx` function then maps these calls directly to the surgical `h` factory in the Velox core.

## Why this approach?

1. **Granularity**: By transforming JSX into specific function calls, Velox can associate reactive signals directly with the text nodes or attributes they update.
2. **Performance**: Eliminates the need to construct a Virtual DOM tree. The output of the transformation is a structured call that immediately produces or updates real DOM nodes.
3. **Bundle Size**: Since the transformation is handled at compile-time by ESBuild (configured via our Vite plugin), the runtime footprint remains incredibly small (under 3KB).
