# Reactivity

The Velox reactivity system is built on fine-grained primitives that track dependencies automatically and update the DOM surgically.

## Signals

Signals are the primary state primitive in Velox. They wrap a value and provide a way to track when that value changes.

### createSignal

Creates a reactive signal.

```typescript
import { createSignal } from '@remyyy/velox';

const [count, setCount] = createSignal(0);

// Getter: Tracks dependency when called inside an effect or memo
console.log(count()); 

// Setter: Updates the value and triggers dependent effects
setCount(1);
setCount(prev => prev + 1);
```

## Effects

Effects are side-effects that run once and then re-run whenever any of their reactive dependencies change.

### createEffect

Registers an effect function.

```typescript
import { createEffect } from '@remyyy/velox';

createEffect(() => {
    // This runs whenever 'count' changes
    console.log("Current count:", count());
});
```

### onCleanup

Registers a cleanup function that runs before the next effect execution or when the effect is disposed.

```typescript
createEffect(() => {
    const timer = setInterval(() => console.log(count()), 1000);
    onCleanup(() => clearInterval(timer));
});
```

## Derived State

### createMemo

Creates a memoized value that only re-calculates when its dependencies change. This is useful for expensive computations.

```typescript
const double = createMemo(() => count() * 2);
```

## Batching

### batch

Combines multiple signal updates into a single re-render cycle. This prevents unnecessary intermediate effect executions.

```typescript
import { batch, createSignal, createEffect } from '@remyyy/velox';

const [a, setA] = createSignal(0);
const [b, setB] = createSignal(0);

createEffect(() => console.log(a(), b()));

batch(() => {
    setA(1);
    setB(1);
}); // Effect runs only once here
```

## Types

Velox provides TypeScript types for its reactive primitives:

```typescript
import type { Getter, Setter } from '@remyyy/velox';

const getter: Getter<number> = () => 10;
const setter: Setter<number> = (val) => {};
```
