<p align="center">
  <img src="https://via.placeholder.com/200x50?text=VELOX+FRAMEWORK" alt="Velox Logo" width="200" />
</p>

# ⚡ Velox Framework

> **The fastest web framework in the universe.**  
> Zero VDOM. Fine-Grained Reactivity. Instant Performance.

[![npm version](https://img.shields.io/npm/v/velox.svg)](https://www.npmjs.com/package/velox)
[![License](https://img.shields.io/github/license/TheRemyyy/velox-framework)](https://github.com/TheRemyyy/velox-framework/blob/main/LICENSE)
[![Build Status](https://img.shields.io/github/actions/workflow/status/TheRemyyy/velox-framework/publish.yml)](https://github.com/TheRemyyy/velox-framework/actions)

Velox is a next-generation web framework designed for ultimate performance and developer experience. Unlike traditional frameworks that rely on heavy Virtual DOM diffing, Velox compiles your declarative JSX directly into surgical DOM operations. The result? **O(1) updates** and a runtime that is barely there.

---

## 🚀 Why Velox?

* **⚡ Zero Virtual DOM**: We don't diff trees. We update nodes directly.
* **🎯 Surgical Precision**: Reactivity is fine-grained. Only the text node or attribute that changed is updated.
* **📦 tiny bundle**: The entire runtime is **< 3kb** (min+gzip).
* **🛠️ Modern Tooling**: Built on **Vite**. Hot Module Replacement (HMR) just works.
* **🧩 Simple API**: If you know React hooks, you know Velox signals (`createSignal`, `createEffect`).

---

## 📦 Installation

Get started in seconds with our official scaffolding tool:

```bash
npm create velox@latest
```

This will set up a complete workspace with TypeScript, Vite, and Velox pre-configured.

---

## ⚡ Quick Start

### 1. The Basics

Velox uses **Signals** for state. No class components, no complex `this` binding.

```tsx
// src/App.tsx
import { createSignal } from 'velox';

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

---

## 📚 Documentation

Detailed documentation is available in the `docs` directory:

* [**API Reference**](./docs/API.md) - Deep dive into Signals, Router, SSR, and Components.
* [**Contributing**](./CONTRIBUTING.md) - How to contribute to the core framework.

---

## 🏗️ Architecture

Velox is a monorepo consisting of:

* **`packages/velox`**: The core runtime and reactive engine.
* **`packages/vite-plugin-velox`**: Build optimizations and JSX configuration.
* **`packages/create-velox`**: The CLI for scaffolding new projects.

---

## 🤝 Contributing

We are building the future of web performance. Contributions are welcome!
Please check out [CONTRIBUTING.md](CONTRIBUTING.md) to get started.

## 📄 License

MIT © [TheRemyyy](https://github.com/TheRemyyy)
