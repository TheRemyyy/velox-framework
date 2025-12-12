// Global context for dependency tracking
let context: Subscriber | null = null;
let batchDepth = 0;
const batchQueue = new Set<Subscriber>();

interface Subscriber {
  execute(): void;
  dependencies: Set<Set<Subscriber>>;
  cleanups: (() => void)[];
}

type Getter<T> = () => T;
type Setter<T> = (newValue: T | ((prev: T) => T)) => void;

/**
 * Batches signal updates to prevent multiple effect executions.
 * @param fn The function to execute.
 */
export function batch<T>(fn: () => T): T {
  batchDepth++;
  try {
    return fn();
  } finally {
    batchDepth--;
    if (batchDepth === 0) {
      // Flush queue
      const subscribers = [...batchQueue];
      batchQueue.clear();
      subscribers.forEach((sub) => sub.execute());
    }
  }
}

/**
 * Creates a reactive signal.
 * @param initialValue The initial value of the signal.
 * @returns A tuple [getter, setter].
 */
export function createSignal<T>(initialValue: T): [Getter<T>, Setter<T>] {
  let value = initialValue;
  const subscribers = new Set<Subscriber>();

  const read: Getter<T> = () => {
    if (context) {
      subscribers.add(context);
      context.dependencies.add(subscribers);
    }
    return value;
  };

  const write: Setter<T> = (newValue) => {
    const nextValue =
      typeof newValue === 'function'
        ? (newValue as (prev: T) => T)(value)
        : newValue;

    if (value !== nextValue) {
      value = nextValue;
      // Snapshot subscribers before iterating
      [...subscribers].forEach((sub) => {
        if (batchDepth > 0) {
          batchQueue.add(sub);
        } else {
          sub.execute();
        }
      });
    }
  };

  return [read, write];
}

/**
 * Registers a cleanup function that runs before the current effect re-executes or is disposed.
 * @param fn The cleanup function.
 */
export function onCleanup(fn: () => void) {
  if (context) {
    context.cleanups.push(fn);
  }
}

/**
 * Creates a side effect that runs immediately and re-runs whenever its dependencies change.
 * @param fn The function to execute.
 * @returns A dispose function to stop the effect manually.
 */
export function createEffect(fn: () => void): () => void {
  const effect: Subscriber = {
    execute() {
      cleanup(effect);
      const prevContext = context;
      context = effect;
      try {
        fn();
      } finally {
        context = prevContext;
      }
    },
    dependencies: new Set(),
    cleanups: [],
  };

  effect.execute();

  return () => cleanup(effect);
}

/**
 * Creates a computed value (memoized) that only updates when dependencies change.
 * @param fn The function to calculate the value.
 * @returns A getter for the computed value.
 */
export function createMemo<T>(fn: () => T): Getter<T> {
  const [s, set] = createSignal<T>(undefined as any);
  createEffect(() => set(fn()));
  return s;
}

function cleanup(subscriber: Subscriber) {
  subscriber.dependencies.forEach((subs) => subs.delete(subscriber));
  subscriber.dependencies.clear();
  subscriber.cleanups.forEach((c) => c());
  subscriber.cleanups = [];
}
