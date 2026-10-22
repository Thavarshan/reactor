/**
 * Tests for exercises/level08_custom_hooks/ex01_use_toggle.ts
 *
 * Write your tests here first, run them and watch them fail, then build
 * the hook until they pass. The "EDGE CASES TO TEST" section of the
 * exercise lists good cases to cover. Turn each `it.todo` into a real test.
 *
 * Run just this file:
 *     npm test -- ex01_use_toggle
 */

import { act, renderHook } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { useToggle } from './ex01_use_toggle';

describe('useToggle', () => {
  // Examples to get you started:
  //
  // it("starts as false by default", () => {
  //   const { result } = renderHook(() => useToggle());
  //   expect(result.current.value).toBe(false);
  // });
  //
  // it("flips the value when toggle is called", () => {
  //   const { result } = renderHook(() => useToggle());
  //   act(() => {
  //     result.current.toggle();
  //   });
  //   expect(result.current.value).toBe(true);
  // });

  it.todo('starts as true when given true');
  it.todo('flips back to false when toggled a second time');
  it.todo('stays true when setOn is called twice');
  it.todo('stays false when setOff is called while already false');
  it.todo('ends false after setOn then setOff');
  it.todo('flips twice when toggle is called twice inside one act');
  it.todo('ignores a new initialValue after the first render');
});
