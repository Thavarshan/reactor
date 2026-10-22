/**
 * Tests for exercises/level08_custom_hooks/ex05_use_interval.ts
 *
 * Write your tests here first, run them and watch them fail, then build
 * the hook until they pass. The "EDGE CASES TO TEST" section of the
 * exercise lists good cases to cover. Turn each `it.todo` into a real test.
 *
 * Run just this file:
 *     npm test -- ex05_use_interval
 */

import { act, renderHook } from "@testing-library/react";
import { useState } from "react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { useInterval } from "./ex05_use_interval";

describe("useInterval", () => {
  // Fake timers let a test move time forward instantly.
  beforeEach(() => {
    vi.useFakeTimers();
  });
  afterEach(() => {
    vi.useRealTimers();
  });

  // Examples to get you started:
  //
  // it("calls the callback once after the delay", () => {
  //   const callback = vi.fn();
  //   renderHook(() => useInterval(callback, 1000));
  //   vi.advanceTimersByTime(999);
  //   expect(callback).not.toHaveBeenCalled();
  //   vi.advanceTimersByTime(1);
  //   expect(callback).toHaveBeenCalledTimes(1);
  // });
  //
  // it("keeps counting when the callback reads state", () => {
  //   const { result } = renderHook(() => {
  //     const [n, setN] = useState(0);
  //     useInterval(() => setN(n + 1), 1000);
  //     return n;
  //   });
  //   // One act per tick: React re-renders when each act ends.
  //   for (let tick = 0; tick < 3; tick++) {
  //     act(() => {
  //       vi.advanceTimersByTime(1000);
  //     });
  //   }
  //   expect(result.current).toBe(3);
  // });

  it.todo("calls the callback 3 times after 3 delays");
  it.todo("never calls the callback when the delay is null");
  it.todo("stops when the delay becomes null and starts again after");
  it.todo("uses the new timing when the delay changes");
  it.todo("calls a new callback on time without restarting the countdown");
  it.todo("stops and leaves no timers after unmount");
});
