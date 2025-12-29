# Advanced Features

Velox includes features for complex state management and asynchronous data handling.

## Context API

The Context API allows you to share state between components without passing props through every level of the tree.

### createContext / useContext

```typescript
import { createContext, useContext } from '@remyyy/velox';

const ThemeContext = createContext('light');

const App = () => (
    <ThemeContext.Provider value="dark">
        <Child />
    </ThemeContext.Provider>
);

const Child = () => {
    const theme = useContext(ThemeContext);
    return <div>Theme is: {theme}</div>;
};
```

## Suspense and Resources

Velox provides a way to handle asynchronous data loading with integrated fallback UI components.

### createResource

Wraps an asynchronous fetcher into a reactive signal.

```typescript
import { createResource } from '@remyyy/velox';

const [user] = createResource('user-1', async () => {
    const res = await fetch('/api/user/1');
    return res.json();
});
```

### Suspense

Displays a fallback component while resources are loading.

```tsx
import { Suspense } from '@remyyy/velox';

<Suspense fallback={<div>Loading user profile...</div>}>
    <UserProfile user={user()} />
</Suspense>
```

In an SSR environment, `Suspense` is integrated with the asynchronous rendering engine to ensure data is fetched before the final HTML is sent to the client.
