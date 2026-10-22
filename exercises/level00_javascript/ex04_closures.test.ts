/**
 * Tests for exercises/level00_javascript/ex04_closures.ts
 *
 * Write your tests here first, run them and watch them fail, then write
 * the functions until they pass. The "EDGE CASES TO TEST" section of the
 * exercise lists good cases to cover. Turn each `it.todo` into a real test.
 *
 * Run just this file:
 *     npm test -- ex04_closures
 */

import { describe, expect, it, vi } from 'vitest';

import { makeCounter, memoizeOne, once } from './ex04_closures';

describe('closures', () => {
  // Examples to get you started:
  //
  // it("makeCounter counts up from start", () => {
  //   const counter = makeCounter(5);
  //   expect(counter.increment()).toBe(6);
  //   expect(counter.increment()).toBe(7);
  //   expect(counter.value()).toBe(7);
  // });
  //
  // it("once calls fn only the first time", () => {
  //   const fn = vi.fn(() => "ready");
  //   const init = once(fn);
  //   expect(init()).toBe("ready");
  //   expect(init()).toBe("ready");
  //   expect(fn).toHaveBeenCalledTimes(1);
  // });

  it.todo('makeCounter() starts at 0 and can go below zero');
  it.todo('two counters are independent');
  it.todo('reset returns to start after several increments');
  it.todo('once passes the arguments through to fn');
  it.todo('once returns the first result even for different arguments');
  it.todo('once remembers an undefined result and still calls fn once');
  it.todo('memoizeOne calls fn on the first call');
  it.todo('memoizeOne calls fn only once for repeated arguments');
  it.todo('memoizeOne treats equal-looking objects as different arguments');
  it.todo('memoizeOne with A, B, A calls fn three times');
});
