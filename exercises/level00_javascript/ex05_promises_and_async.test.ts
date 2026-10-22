/**
 * Tests for exercises/level00_javascript/ex05_promises_and_async.ts
 *
 * Write your tests here first, run them and watch them fail, then write
 * the functions until they pass. The "EDGE CASES TO TEST" section of the
 * exercise lists good cases to cover. Turn each `it.todo` into a real test.
 *
 * Run just this file:
 *     npm test -- ex05_promises_and_async
 */

import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { delay, retry, withTimeout } from './ex05_promises_and_async';

describe('promises and async', () => {
  // Fake timers: time only moves when the test says so.
  beforeEach(() => {
    vi.useFakeTimers();
  });
  afterEach(() => {
    vi.useRealTimers();
  });

  // Examples to get you started:
  //
  // it("delay resolves after the given time", async () => {
  //   let done = false;
  //   delay(1000).then(() => {
  //     done = true;
  //   });
  //   await vi.advanceTimersByTimeAsync(999);
  //   expect(done).toBe(false);
  //   await vi.advanceTimersByTimeAsync(1);
  //   expect(done).toBe(true);
  // });
  //
  // it("withTimeout rejects when the promise is too slow", async () => {
  //   const never = new Promise<string>(() => {});
  //   const check = expect(withTimeout(never, 100)).rejects.toThrow("Timed out after 100 ms");
  //   await vi.advanceTimersByTimeAsync(100);
  //   await check;
  // });

  it.todo('withTimeout passes through the value of a fast promise');
  it.todo(
    'withTimeout passes through the error of a fast promise that rejects',
  );
  it.todo('withTimeout leaves no timers behind once the promise settles');
  it.todo('retry resolves straight away when the first attempt works');
  it.todo('retry resolves after two failures, calling fn 3 times');
  it.todo('retry rejects with the last error when every attempt fails');
  it.todo('retry with attempts: 1 never retries');
  it.todo('retry waits waitMs between attempts');
  it.todo('retry with no options makes 3 attempts, 1000 ms apart');
});
