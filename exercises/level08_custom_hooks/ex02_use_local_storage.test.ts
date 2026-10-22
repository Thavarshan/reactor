/**
 * Tests for exercises/level08_custom_hooks/ex02_use_local_storage.ts
 *
 * Write your tests here first, run them and watch them fail, then build
 * the hook until they pass. The "EDGE CASES TO TEST" section of the
 * exercise lists good cases to cover. Turn each `it.todo` into a real test.
 *
 * Run just this file:
 *     npm test -- ex02_use_local_storage
 */

import { act, renderHook } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { useLocalStorage } from './ex02_use_local_storage';

describe('useLocalStorage', () => {
  // localStorage keeps its data between tests, so start each test empty.
  beforeEach(() => {
    localStorage.clear();
  });
  // Remove any spies a test created.
  afterEach(() => {
    vi.restoreAllMocks();
  });

  // Examples to get you started:
  //
  // it("uses the initial value when nothing is stored", () => {
  //   const { result } = renderHook(() => useLocalStorage("count", 0));
  //   expect(result.current[0]).toBe(0);
  // });
  //
  // it("saves new values as JSON", () => {
  //   const { result } = renderHook(() => useLocalStorage("count", 0));
  //   act(() => {
  //     result.current[1](5);
  //   });
  //   expect(result.current[0]).toBe(5);
  //   expect(localStorage.getItem("count")).toBe("5");
  // });

  it.todo('starts with a stored number, string or object, parsed');
  it.todo('falls back to the initial value when the stored JSON is bad');
  it.todo('stores strings with their JSON quotes');
  it.todo('applies two functional updates made inside one act');
  it.todo('saves the initial value right after the first render');
  it.todo('reads localStorage only once, even after a rerender');
  it.todo('keeps two keys independent');
  it.todo('starts with the saved value after unmounting and rendering again');
});
