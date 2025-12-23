<div align="center">

# Velox API Reference

**Core Primitives & Components**

</div>

---

Velox is built on two core pillars: **Fine-Grained Reactivity** and **Direct DOM Manipulation**.

## 1. Reactivity (`velox/reactive`)

### `createSignal<T>(initialValue: T)`

Creates a reactive state primitive.

**Signature:**

```ts
function createSignal<T>(initialValue: T): [Getter<T>, Setter<T>]
```

**Usage:**

```ts
const [count, setCount] = createSignal(0);

// Read
console.log(count()); // 0

// Write
setCount(1);
setCount(c => c + 1); // 2
```

### `createEffect(fn: () => void)`

Registers a side effect that runs immediately and re-runs whenever its dependencies change. Dependencies are automatically tracked when signals are read.

**Usage:**

```ts
createEffect(() => {
    console.log("Count changed:", count());
});
```

**Returns:** A dispose function to stop the effect manually.

### `createMemo<T>(fn: () => T)`

Creates a derived signal (memoized value). It only re-computes when dependencies change.

**Usage:**

```ts
const double = createMemo(() => count() * 2);
```

### `batch(fn: () => T)`

Batches multiple signal updates into a single re-render cycle to improve performance.

**Usage:**

```ts
batch(() => {
    setFirstName("John");
    setLastName("Doe");
    // Effects run only once after this block
});
```

---

## 2. Components & DOM (`velox/dom`)

Velox uses JSX but compiles it to direct DOM instructions, not VDOM objects.

### `mount(component: Component, root: HTMLElement)`

Mounts a Velox component tree to a DOM node.

**Usage:**

```ts
import { mount } from 'velox';
import App from './App';

mount(App, document.getElementById('root'));
```

### `h(tag, props, ...children)`

Hyperscript function. Usually internal (compiled from JSX), but can be used manually.

---

## 3. Router (`velox/router`)

A lightweight, history-based router.

### `Router`

The root component for routing.

```tsx
<Router>
    <App />
</Router>
```

### `Route`

Defines a path and the component to render.

**Props:**

- `path`: URL path (e.g., `/users/:id`)
- `component`: Component function
- `exact`: Match exact path (default: true)

```tsx
<Route path="/" component={Home} />
<Route path="/about" component={About} />
<Route path="/users/:id" component={UserProfile} />
```

### `Link`

Navigation component.

```tsx
<Link to="/about">Go to About</Link>
```

---

## 4. Suspense & Async (`velox/suspense`)

### `createResource<T>(key: string, fetcher: () => Promise<T>)`

Async data fetching primitive with caching.

**Usage:**

```ts
const [user] = createResource('user', () => fetch('/api/user').then(r => r.json()));

return (
    <Suspense fallback={<div>Loading...</div>}>
       <div>{user()?.name}</div>
    </Suspense>
);
```

### `Suspense`

Handles async boundaries. Shows `fallback` while async descendants are pending.

---

## 5. SSR (`velox/ssr`)

### `renderToString(component)`

Renders the app to an HTML string on the server. Does not attach event listeners.

### `hydrate`

(Internal) Velox automatically handles hydration if it detects pre-rendered HTML with `data-hid` attributes.

---

<div align="center">
<sub>Built with ❤️ and TypeScript</sub>
</div>
