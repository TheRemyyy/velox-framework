# Velox Framework

**The Fastest Web Framework in the Universe.**

Velox is a next-generation JavaScript framework built for extreme performance, 100% SEO, and professional-grade development. It combines the syntax you love with the performance you dream of.

## Features

- **🚀 Blazing Fast**: Zero Virtual DOM. Fine-grained reactivity using Signals.
- **⚡ 100% SEO**: First-class Server-Side Rendering (SSR) support with **Robust Hierarchical Hydration**.
- **🛡️ Secure**: Built-in XSS protection and Type Safety.
- **🔥 React-like Syntax**: Use JSX and familiar hooks (`createSignal`, `createEffect`, `useContext`).
- **📦 Zero Dependencies**: Lightweight core.
- **🌐 Advanced Router**: Built-in router supporting nested routes, dynamic parameters (`/user/:id`), and SSR.
- **🔄 Smart Control Flow**: Optimized `<For>` component for keyed list rendering and reconciliation.

## Architecture

Velox uses a **Lazy VNode Factory** architecture. Unlike traditional VDOM (which creates object trees) or immediate DOM (which creates nodes eagerly), Velox defers execution until mount. This allows:
1.  **Top-Down Context**: Robust passing of Router and Hydration context.
2.  **Fine-Grained Reactivity**: Signals bind directly to DOM nodes upon creation.
3.  **Deterministic Hydration**: Generates stable hierarchical IDs (`0.1.2`) for perfect SSR matches.

## Getting Started

### Installation

```bash
npm install velox
```

### Basic Usage

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

### Context API

Velox supports deep state passing via Context, compatible with both Client and SSR.

```tsx
import { createContext, useContext } from 'velox';

const ThemeContext = createContext('light');

function App() {
  return (
    <ThemeContext.Provider value="dark">
      <Toolbar />
    </ThemeContext.Provider>
  );
}

function Toolbar() {
  const theme = useContext(ThemeContext);
  return <div>Current theme: {theme}</div>;
}
```

### Router & SSR

The Router supports nested layouts and SSR configuration.

```tsx
// server.ts
import { configureRouter, renderToString } from 'velox';

// In your request handler:
app.get('*', (req, res) => {
  configureRouter(req.url); // Setup request context
  const html = renderToString(App);
  res.send(html);
});
```

```tsx
// App.tsx
import { Router, Route, Outlet, Link } from 'velox';

function App() {
  return (
    <Router>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/user">User</Link>
      </nav>
      <Route path="/" component={Home} />
      <Route path="/user" component={UserLayout}>
        <Route path="/:id" component={UserProfile} />
      </Route>
    </Router>
  );
}
```

### Efficient Lists

Use `<For>` for optimized list rendering with key support.

```tsx
import { For } from 'velox';

<For each={items} key={(item) => item.id}>
  {(item, index) => <div>{index}: {item.name}</div>}
</For>
```

## Performance

Velox bypasses the Virtual DOM overhead by compiling JSX directly to DOM nodes (via lazy factories) and connecting fine-grained signals. When a signal updates, only the exact text node or attribute changes. No diffing. No reconciliation. Just speed.

## License

MIT
