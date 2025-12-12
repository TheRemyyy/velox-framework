# Velox Framework

**The Fastest Web Framework in the Universe.**

Velox is a next-generation JavaScript framework built for extreme performance, 100% SEO, and professional-grade development. It combines the syntax you love with the performance you dream of.

## Features

- **🚀 Blazing Fast**: Zero Virtual DOM. Fine-grained reactivity using Signals.
- **⚡ 100% SEO**: First-class Server-Side Rendering (SSR) support.
- **🛡️ Secure**: Built-in XSS protection and Type Safety.
- **🔥 React-like Syntax**: Use JSX and familiar hooks (`createSignal`, `createEffect`).
- **📦 Zero Dependencies**: Lightweight core.
- **🌐 Built-in Router**: SPA navigation made easy.

## Getting Started

### Installation

```bash
npm install velox
```

### Usage

```tsx
import { mount, createSignal } from 'velox';

function Counter() {
  const [count, setCount] = createSignal(0);

  return (
    <div>
      <h1>Count: {count}</h1>
      <button onClick={() => setCount(c => c + 1)}>Increment</button>
    </div>
  );
}

mount(Counter, document.getElementById('root'));
```

## Performance

Velox bypasses the Virtual DOM overhead by compiling JSX directly to DOM nodes and connecting fine-grained signals. When a signal updates, only the exact text node or attribute changes. No diffing. No reconciliation. Just speed.

## License

MIT
