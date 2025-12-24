<div align="center">

# Velox Framework

**The Fastest Web Framework in the Universe**

[![NPM Version](https://img.shields.io/npm/v/@theremyyy/velox.svg?style=flat-square)](https://www.npmjs.com/package/@theremyyy/velox)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg?style=flat-square)](LICENSE)
[![Build Status](https://img.shields.io/github/actions/workflow/status/TheRemyyy/velox-framework/publish.yml?style=flat-square)](https://github.com/TheRemyyy/velox-framework/actions)

*Zero VDOM. Fine-Grained Reactivity. Instant Performance.*

[Installation](#installation) • [Quick Start](#quick-start) • [Project Structure](#project-structure) • [Documentation](#documentation)

</div>

---

## Overview

Velox is a next-generation web framework designed for ultimate performance and developer experience. Unlike traditional frameworks that rely on heavy Virtual DOM diffing, Velox compiles your declarative JSX directly into surgical DOM operations. The result is an application with **O(1) updates** and a runtime that is barely there.

### Key Features

- **⚡ Zero Virtual DOM** — We don't diff trees. We update nodes directly using fine-grained reactivity.
- **🎯 Surgical Precision** — Only the specific text node or attribute that changed is updated.
- **📦 Tiny Footprint** — The entire runtime is **< 3kb** (min+gzip).
- **🛠️ Modern Tooling** — Built on **Vite** for instant Hot Module Replacement (HMR).
- **🧩 Simple API** — If you know React hooks, you know Velox signals (`createSignal`, `createEffect`).
- **🔄 Universal Compatibility** — Works seamlessly with existing JS/TS ecosystems.

## <a id="installation"></a>📦 Installation

Get started in seconds with our official scaffolding tool:

```bash
npm create @theremyyy/velox@latest // Not working yet
```

This command sets up a complete workspace with TypeScript, Vite, and Velox pre-configured.

## <a id="quick-start"></a>⚡ Quick Start

### 1. The Basics

Velox uses **Signals** for state management. No class components, no complex `this` binding.

```tsx
// src/App.tsx
import { createSignal } from '@theremyyy/velox';

export default function Counter() {
  const [count, setCount] = createSignal(0);

  return (
    <div className="card">
      <h1>Count is {count}</h1>
      <div className="actions">
        <!-- Updates are instant and targeted -->
        <button onClick={() => setCount(c => c + 1)}>Increment</button>
        <button onClick={() => setCount(c => c - 1)}>Decrement</button>
      </div>
    </div>
  );
}
```

### 2. Effects & Reactivity

Side effects are handled by `createEffect`. It automatically tracks dependencies—no manual dependency arrays needed.

```tsx
import { createSignal, createEffect } from 'velox';

const [userId, setUserId] = createSignal(1);

createEffect(() => {
  // This runs automatically whenever userId() changes
  console.log(`User ID changed to: ${userId()}`);
  fetchUserData(userId());
});
```

## <a id="project-structure"></a>Project Structure

Velox is organized as a monorepo containing the core framework and its ecosystem:

```
velox-framework/
├── packages/
│   ├── velox/               # Core runtime and reactive engine
│   ├── vite-plugin-velox/   # Vite integration & JSX config
│   └── create-velox/        # CLI scaffolding tool
├── docs/                    # Detailed API documentation
└── examples/                # Example applications
```

## <a id="documentation"></a>📚 Documentation

Detailed documentation is available in the `docs` directory:

- [**API Reference**](./docs/API.md) — Deep dive into Signals, Router, SSR, and Components.
- [**Contributing**](./CONTRIBUTING.md) — How to contribute to the core framework.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

Inspired by modern reactive libraries and the quest for peak web performance.

---

<div align="center">
<sub>Built with ❤️ and TypeScript</sub>
</div>
