# DOM and Rendering

Velox uses a specialized compiler that transforms JSX into direct DOM manipulation. It does not use a Virtual DOM or an intermediate reconciliation layer.

## h (HyperScript)

The `h` function is the core JSX factory. It creates a `VNode` object that can be executed to produce a real DOM element.

### Syntax

```typescript
import { h } from '@remyyy/velox';

const node = h('div', { class: 'container' }, 'Hello World');
```

When used with JSX, this is handled automatically via `@remyyy/vite-plugin-velox`.

## Components

Components are regular functions that accept props and return a `VNode`.

```tsx
interface Props {
    title: string;
}

const Button: Component<Props> = (props) => {
    return <button>{props.title}</button>;
};
```

Important: Standard component functions run only **once**. Reactivity is achieved by passing signals as props or using them within the JSX structure.

## mount

The entry point for rendering a Velox application to the DOM.

```typescript
import { mount } from '@remyyy/velox';
import App from './App';

mount(App, document.getElementById('root')!);
```

## Fragments

Allows grouping multiple children without adding an extra DOM node.

```tsx
import { Fragment } from '@remyyy/velox';

const List = () => (
    <Fragment>
        <li>Item 1</li>
        <li>Item 2</li>
    </Fragment>
);
```

## Hydration

Velox supports hydration of server-rendered HTML.

### hydrate

Similar to `mount`, but attempts to reuse existing DOM nodes rendered by the server.

```typescript
import { hydrate } from '@remyyy/velox';
hydrate(App, document.getElementById('root')!);
```

## Control Flow

### For Component

The `For` component is the standard way to render reactive lists. It uses a key-based reconciliation strategy for performance.

```tsx
import { For } from '@remyyy/velox';

<For each={items} key={(item) => item.id}>
    {(item, index) => <li>{index()}: {item.name}</li>}
</For>
```

The `index` argument is a signal that updates when the item's position in the list changes.
