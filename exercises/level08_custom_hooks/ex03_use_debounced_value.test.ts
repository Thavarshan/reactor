/**
 * Tests for exercises/level08_custom_hooks/ex03_use_debounced_value.ts
 *
 * Write your tests here first, run them and watch them fail, then build
 * the hook until they pass. The "EDGE CASES TO TEST" section of the
 * exercise lists good cases to cover. Turn each `it.todo` into a real test.
 *
 * Run just this file:
 *     npm test -- ex03_use_debounced_value
 */

import { act, renderHook } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { useDebouncedValue } from './ex03_use_debounced_value';

describe('useDebouncedValue', () => {
  // Fake timers let a test move time forward instantly.
  beforeEach(() => {
    vi.useFakeTimers();
  });
  afterEach(() => {
    vi.useRealTimers();
  });

  // Examples to get you started:
  //
  // it("returns the first value straight away", () => {
  //   const { result } = renderHook(() => useDebouncedValue("a", 500));
  //   expect(result.current).toBe("a");
  // });
  //
  // it("returns a new value once it has been quiet for the delay", () => {
  //   const { result, rerender } = renderHook(
  //     ({ value }) => useDebouncedValue(value, 500),
  //     { initialProps: { value: "a" } },
  //   );
  //   rerender({ value: "b" });
  //   expect(result.current).toBe("a");
  //   act(() => {
  //     vi.advanceTimersByTime(500);
  //   });
  //   expect(result.current).toBe("b");
  // });

  it.todo('still returns the old value 1 ms before the delay is over');
  it.todo('waits 500 ms when no delay is given');
  it.todo('restarts the wait on a second change and skips the middle value');
  it.todo('does not restart the wait when re-rendered with the same value');
  it.todo('restarts the wait with the new delay when the delay changes');
  it.todo('leaves no timers behind after unmount');
});
