# Server-Side Rendering (SSR)

Velox is designed for high-performance server-side rendering with built-in hydration support.

## Rendering to String

The SSR engine converts Velox components into standard HTML strings.

### hSSR

The server-side equivalent of the `h` factory. It produces an `SSRVNode` which can be executed to string.

```typescript
import { hSSR } from '@remyyy/velox';
const vnode = hSSR('div', { class: 'ssr' }, 'Content');
```

Typically, you won't call this directly as the compiler handles it, but it is available for manual server-side component construction.

### renderToString

Performs a synchronous render of the application.

```typescript
import { renderToString } from '@remyyy/velox';
import App from './App';

const html = renderToString(App);
```

## Asynchronous SSR

Velox can wait for asynchronous operations (like database queries or API calls) before completing the render.

### renderToStringAsync

Renders the application and recursively waits for all `Suspense` boundaries to resolve their resources.

```typescript
import { renderToStringAsync } from '@remyyy/velox';

const html = await renderToStringAsync(App);
```

## Hydration IDs

During SSR, Velox generates unique `data-hid` attributes for every element. These IDs are used by the client-side `hydrate` function to correlate the existing DOM with the reactive state.

### resetHydrationId

Resets the global hydration ID counter. This should be called before at the start of every request on the server to ensure consistency.

```typescript
import { resetHydrationId } from '@remyyy/velox';

app.get('*', async (req, res) => {
    resetHydrationId();
    const html = await renderToStringAsync(App);
    res.send(html);
});
```

## Technical Details

- **Void Elements**: The SSR engine correctly handles self-closing tags (e.g., `<img>`, `<input>`).
- **HTML Escaping**: All text and attribute values are automatically escaped to prevent XSS.
- **SafeString**: Allows injecting raw HTML strings into the render output when necessary.
