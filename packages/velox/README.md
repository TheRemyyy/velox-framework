# @remyyy/velox

**The Fastest Web Framework in the Universe**

Velox is a next-generation web framework designed for ultimate performance and surgical DOM updates.

## Installation

```bash
npm install @remyyy/velox
```

## Usage

Velox uses **Signals** for state management.

```tsx
import { createSignal } from '@remyyy/velox';

export default function Counter() {
  const [count, setCount] = createSignal(0);

  return (
    <button onClick={() => setCount(c => c + 1)}>
      Count: {count}
    </button>
  );
}
```

## Documentation

For full documentation, visit the [main repository](https://github.com/TheRemyyy/velox-framework).
