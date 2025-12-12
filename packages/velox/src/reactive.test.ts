import { describe, it, expect, vi } from 'vitest';
import { createSignal, createEffect, createMemo } from './reactive';

describe('Reactivity System', () => {
  it('should create a signal and read its value', () => {
    const [count, setCount] = createSignal(0);
    expect(count()).toBe(0);
    setCount(1);
    expect(count()).toBe(1);
  });

  it('should react to signal changes with createEffect', () => {
    const [count, setCount] = createSignal(0);
    const fn = vi.fn(() => count());

    createEffect(fn);
    expect(fn).toHaveBeenCalledTimes(1); // Initial run

    setCount(1);
    expect(fn).toHaveBeenCalledTimes(2); // Update

    setCount(1); // Same value
    expect(fn).toHaveBeenCalledTimes(2); // Should not update
  });

  it('should handle computed values with createMemo', () => {
    const [count, setCount] = createSignal(1);
    const double = createMemo(() => count() * 2);

    expect(double()).toBe(2);

    setCount(2);
    expect(double()).toBe(4);
  });

  it('should handle functional updates', () => {
    const [count, setCount] = createSignal(1);
    setCount(prev => prev + 1);
    expect(count()).toBe(2);
  });

  it('should cleanup dependencies', () => {
     const [a, setA] = createSignal(true);
     const [b, setB] = createSignal(1);
     const [c, setC] = createSignal(2);

     const fn = vi.fn(() => {
         return a() ? b() : c();
     });

     createEffect(fn);
     expect(fn).toHaveBeenCalledTimes(1); // b is dependency

     setB(2);
     expect(fn).toHaveBeenCalledTimes(2);

     // Switch a to false, now c should be dependency, b should be removed
     setA(false);
     expect(fn).toHaveBeenCalledTimes(3);

     setB(3);
     expect(fn).toHaveBeenCalledTimes(3); // Should not trigger

     setC(3);
     expect(fn).toHaveBeenCalledTimes(4); // Should trigger
  });
});
