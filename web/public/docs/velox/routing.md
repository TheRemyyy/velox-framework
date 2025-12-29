# Routing

Velox provides a comprehensive routing solution that works on both the client and the server.

## Basic Setup

Routes are defined using the `Router` and `Route` components.

```tsx
import { Router, Route } from '@remyyy/velox';

const App = () => (
    <Router>
        <Route path="/" component={Home} />
        <Route path="/users/:id" component={UserProfile} />
        <Route path="*" component={NotFound} />
    </Router>
);
```

## Router Components

### Router

The top-level container for all routes. In a server environment, it accepts a `url` prop to determine the initial path.

### Route

Defines a mapping between a URL path and a component.

- `path`: The URL pattern (supports dynamic segments like `:id`).
- `component`: The component to render when the path matches.
- `exact`: (Optional) Whether to match the path exactly. Defaults to `true`.

### Outlet

Used within a parent component to render matched child routes.

### Link

The preferred way to navigate between routes. It prevents full page refreshes and updates the URL via the History API.

```tsx
import { Link } from '@remyyy/velox';

<Link to="/about" class="nav-link">About</Link>
```

## Programmatic Navigation

### navigate

Allows navigating to a different URL via code.

```typescript
import { navigate } from '@remyyy/velox';

const handleSubmit = () => {
    // ... logic
    navigate('/dashboard');
};
```

### useLocation

A reactive hook that returns the current location information.

```typescript
import { useLocation } from '@remyyy/velox';

const location = useLocation();

createEffect(() => {
    // derived from a signal, so it tracks reactivity
    console.log("Current path:", location.pathname);
});
```

The `useLocation` hook returns a reactive object. accessing `location.pathname` calls the underlying signal getter, so it can be used in effects, memos, or JSX to trigger updates when the route changes.

## Advanced Routing

### configureRouter

Used to manually set the current router path, primarily during testing or custom SSR setups.

```typescript
import { configureRouter } from '@remyyy/velox';
configureRouter('/custom-path');
```
