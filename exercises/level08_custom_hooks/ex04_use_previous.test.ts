/**
 * Tests for exercises/level08_custom_hooks/ex04_use_previous.ts
 *
 * Write your tests here first, run them and watch them fail, then build
 * the hook until they pass. The "EDGE CASES TO TEST" section of the
 * exercise lists good cases to cover. Turn each `it.todo` into a real test.
 *
 * Run just this file:
 *     npm test -- ex04_use_previous
 */

import { renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { usePrevious } from "./ex04_use_previous";

describe("usePrevious", () => {
  // Examples to get you started:
  //
  // it("returns undefined on the first render", () => {
  //   const { result } = renderHook(() => usePrevious(1));
  //   expect(result.current).toBeUndefined();
  // });
  //
  // it("returns the old value after a change", () => {
  //   const { result, rerender } = renderHook(
  //     ({ value }) => usePrevious(value),
  //     { initialProps: { value: 1 } },
  //   );
  //   rerender({ value: 2 });
  //   expect(result.current).toBe(1);
  // });

  it.todo("returns the value before the latest change after several changes");
  it.todo("keeps the previous value when re-rendered with the same value");
  it.todo("treats the same object as unchanged");
  it.todo("treats a new object with the same contents as a change");
  it.todo("returns 2 after changing 1 -> 2 -> 1");
});
