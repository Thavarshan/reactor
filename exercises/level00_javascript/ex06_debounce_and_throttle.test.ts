/**
 * Tests for exercises/level00_javascript/ex06_debounce_and_throttle.ts
 *
 * Write your tests here first, run them and watch them fail, then write
 * the functions until they pass. The "EDGE CASES TO TEST" section of the
 * exercise lists good cases to cover. Turn each `it.todo` into a real test.
 *
 * Run just this file:
 *     npm test -- ex06_debounce_and_throttle
 */

import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { debounce, throttle } from './ex06_debounce_and_throttle';

describe('debounce and throttle', () => {
  // Fake timers: time only moves when the test says so.
  beforeEach(() => {
    vi.useFakeTimers();
  });
  afterEach(() => {
    vi.useRealTimers();
  });

  // Examples to get you started:
  //
  // it("debounce calls fn once with the last arguments", () => {
  //   const fn = vi.fn();
  //   const d = debounce(fn, 300);
  //   d("a");
  //   d("b");
  //   expect(fn).not.toHaveBeenCalled();
  //   vi.advanceTimersByTime(300);
  //   expect(fn).toHaveBeenCalledTimes(1);
  //   expect(fn).toHaveBeenCalledWith("b");
  // });
  //
  // it("throttle runs the first call straight away", () => {
  //   const fn = vi.fn();
  //   const t = throttle(fn, 1000);
  //   t("a");
  //   expect(fn).toHaveBeenCalledWith("a");
  // });

  it.todo('debounce restarts the wait on every call');
  it.todo('debounce calls fn again after a second burst');
  it.todo('cancel stops a waiting call');
  it.todo(
    'cancel with nothing waiting does nothing, and later calls still work',
  );
  it.todo('throttle ignores calls inside the window and never runs them later');
  it.todo('throttle runs a call exactly waitMs after the last run');
  it.todo('two debounced functions have separate timers');
});
