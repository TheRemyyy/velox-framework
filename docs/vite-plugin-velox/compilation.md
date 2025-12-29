# JSX Transformation

A core feature of the plugin is its ability to handle JSX without the overhead of a Virtual DOM.

## Automatic Runtime

The plugin enables the automatic JSX runtime, which leverages the `@remyyy/velox/jsx-runtime` and `@remyyy/velox/jsx-dev-runtime` entry points.

### In Production

When running a production build, JSX is transformed into calls to the surgical `h` factory. These calls are highly optimized for speed and size.

### In Development

In development mode, the plugin provides additional debugging metadata (via `jsx-dev-runtime`) to help track components and elements in the browser's developer tools.

## The Transformation Process

When the plugin encounters a `.tsx` or `.jsx` file:

1. **Detection**: Identification of JSX elements.
2. **Injection**: Automatic injection of necessary imports from `@remyyy/velox`.
3. **Compilation**: ESBuild transforms the JSX syntax into standard JavaScript function calls.
4. **Minification**: During the build phase, these calls are minified to ensure the smallest possible runtime footprint.

## Advantages over Traditional VDOM

- **No Diffing**: Because the transformation targets the DOM directly, the browser doesn't need to diff two large object trees on every update.
- **Atomic Updates**: Combined with Velox signals, the transformation allows the framework to update only the specific attribute or text node that changed, rather than the entire component.
