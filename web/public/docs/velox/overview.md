# Velox Core Overview

The `@remyyy/velox` package constitutes the runtime kernel of the framework. It is designed to be lightweight, fast, and completely free of a Virtual DOM.

## Modules

The core package is divided into several logical modules:

### [Reactivity](./reactivity.md)

The engine that drives the framework. Learn about:

- `createSignal`: The atomic unit of state.
- `createEffect`: Managing side effects.
- `createMemo`: Derived state calculations.
- `batch`: Performance optimization for multiple updates.

### [DOM & Rendering](./dom.md)

How Velox paints to the screen.

- `h`: The surgical DOM factory.
- `mount` / `hydrate`: Entry points for client and server.
- `components`: How to structure your UI.
- `For`: Optimized list rendering.

### [Routing](./routing.md)

Built-in solution for Single Page Applications (SPA).

- `Router` / `Route`: Defining your navigation structure.
- `Outlet`: Nested layouts.
- `useLocation`: Reactive access to the URL.

### [Advanced](./advanced.md)

Tools for complex applications.

- `Context`: Dependency injection.
- `Resource` / `Suspense`: Async data management.

### [SSR](./ssr.md)

Server-side rendering capabilities.

- `renderToString`: Snapshotting your app to HTML.
- `hydration`: Waking up static HTML on the client.
