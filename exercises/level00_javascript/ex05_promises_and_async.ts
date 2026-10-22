/**
 * Exercise: Promises and Async
 * Level:    00 - Modern JavaScript for React
 * Topics:   Promise, async/await, setTimeout, try/catch, fake timers
 *
 * ========================================================================
 * YOUR TASK
 * ========================================================================
 * Write three helpers for working with slow things like network requests:
 * one that waits, one that gives up when something takes too long, and
 * one that tries again after a failure.
 *
 *     await retry(() => fetchUser(1), { attempts: 3, waitMs: 500 });
 *
 * ========================================================================
 * BACKGROUND: PROMISES AND ASYNC/AWAIT
 * ========================================================================
 * A PROMISE is a placeholder for a value that arrives later. It starts
 * "pending", then either RESOLVES (with a value) or REJECTS (with an
 * error). Once it has done one of those, it is SETTLED and never changes.
 *
 * You can build your own promise around anything that calls you back:
 *
 *     const coinFlip = new Promise<string>((resolve, reject) => {
 *       setTimeout(() => {
 *         if (Math.random() > 0.5) resolve("heads");
 *         else reject(new Error("tails"));
 *       }, 100);
 *     });
 *
 * Only the FIRST call to resolve or reject counts. Later calls are
 * ignored. That rule turns out to be very handy in this exercise.
 *
 * `await` pauses an `async` function until a promise settles. A rejected
 * promise throws, so you catch it with try/catch:
 *
 *     async function show() {
 *       try {
 *         const side = await coinFlip;
 *         console.log(side);
 *       } catch (error) {
 *         console.log("failed:", error);
 *       }
 *     }
 *
 * `setTimeout(callback, ms)` returns an id. `clearTimeout(id)` cancels the
 * timer before it fires.
 *
 * ========================================================================
 * THE RULES
 * ========================================================================
 * Your functions must:
 * 1. delay(ms): return a promise that resolves (with no value) after `ms`
 *    milliseconds.
 * 2. withTimeout(promise, ms): return a promise that settles the same way
 *    as `promise` (same value, or same error) if `promise` settles within
 *    `ms` milliseconds. If `ms` passes first, reject with an Error whose
 *    message is exactly `Timed out after ${ms} ms`, e.g.
 *    "Timed out after 100 ms".
 * 3. withTimeout cancels its timer as soon as `promise` settles, so no
 *    timer is left running.
 * 4. retry(fn, options): call `fn` (which returns a promise). If it
 *    resolves, resolve with its value. If it rejects, wait `waitMs`
 *    milliseconds and call `fn` again. Call `fn` at most `attempts` times
 *    in total. If every attempt fails, reject with the error from the
 *    LAST attempt.
 * 5. retry does not wait before the first attempt, and does not wait
 *    after the last failed attempt.
 * 6. `options` is optional. `attempts` defaults to 3 and `waitMs`
 *    defaults to 1000.
 *
 * You can assume:
 * - `ms` and `waitMs` are 0 or more, and `attempts` is at least 1.
 *
 * ========================================================================
 * EXAMPLES
 * ========================================================================
 * Times are in milliseconds after the call.
 *
 *     delay(1000)
 *       at 999  -> still pending
 *       at 1000 -> resolved
 *
 *     withTimeout(promiseThatResolvesAt50("hi"), 100)
 *       at 50   -> resolves with "hi" (and the 100 ms timer is cleared)
 *     withTimeout(promiseThatNeverSettles, 100)
 *       at 100  -> rejects with Error("Timed out after 100 ms")
 *
 *     retry(fn, { attempts: 3, waitMs: 500 }), fn fails twice then works
 *       at 0    -> 1st call fails
 *       at 500  -> 2nd call fails
 *       at 1000 -> 3rd call resolves, so retry resolves with its value
 *
 * ========================================================================
 * EDGE CASES TO TEST
 * ========================================================================
 * - delay(1000) is still pending at 999 ms and resolved at 1000 ms
 * - withTimeout passes through the value of a fast promise
 * - withTimeout passes through the error of a fast promise that rejects
 * - withTimeout rejects with "Timed out after 100 ms" when too slow
 * - withTimeout leaves no timers behind once the promise settles
 *   (`vi.getTimerCount()` is 0)
 * - retry resolves straight away when the first attempt works (fn called
 *   once)
 * - retry with fn failing twice then working: resolves, fn called 3 times
 * - retry rejects with the LAST error when every attempt fails
 * - retry with attempts: 1 never retries
 * - retry waits waitMs between attempts (fn not called again before then)
 * - retry with no options makes 3 attempts, 1000 ms apart
 *
 * ========================================================================
 * HINTS (read only if you get stuck)
 * ========================================================================
 * 1. delay is one line: a `new Promise` whose executor calls setTimeout
 *    with `resolve`.
 * 2. withTimeout: create a `new Promise((resolve, reject) => ...)`. Start
 *    a timer that rejects. Then attach `.then` to the original promise to
 *    resolve or reject with its result. Whichever happens first wins,
 *    because only the first call to resolve or reject counts.
 * 3. Put `clearTimeout(timerId)` in both the success and the failure
 *    path of the original promise. (Or look up `.finally`.)
 * 4. retry reads best as an `async` function with a `for` loop around a
 *    try/catch. `await delay(waitMs)` between attempts.
 * 5. TESTING with fake timers: call `vi.useFakeTimers()` at the start of
 *    the test and `vi.useRealTimers()` in `afterEach`. Time then only
 *    moves when you say so: `await vi.advanceTimersByTimeAsync(1000)`.
 *    Use the Async version, because it also lets waiting promises finish.
 * 6. TESTING a pending promise: record when it settles with a flag,
 *
 *        let done = false;
 *        delay(1000).then(() => { done = true; });
 *        await vi.advanceTimersByTimeAsync(999);
 *        expect(done).toBe(false);
 *
 * 7. TESTING a rejection with fake timers: attach the expectation BEFORE
 *    you move time forward, then await it afterwards. Otherwise the
 *    rejection happens while nothing is listening and Vitest reports an
 *    "unhandled rejection":
 *
 *        const check = expect(promise).rejects.toThrow("Timed out after 100 ms");
 *        await vi.advanceTimersByTimeAsync(100);
 *        await check;
 *
 * 8. TESTING retry: `vi.fn().mockRejectedValueOnce(new Error("a"))
 *    .mockResolvedValue("ok")` fails once, then works.
 *
 * ========================================================================
 * JAVASCRIPT CONCEPTS TO LEARN
 * ========================================================================
 * - Promises: pending, resolved, rejected, settled
 * - Wrapping callbacks (setTimeout) in a `new Promise`
 * - async/await and try/catch for errors
 * - Racing two things and letting the first one win
 * - Cleaning up timers (this becomes the "cleanup" idea in useEffect)
 * - Fake timers in tests, so a 10 second wait takes no time at all
 *
 * ========================================================================
 * STRETCH GOALS
 * ========================================================================
 * - Make retry's wait double after each failure ("exponential backoff").
 * - Rewrite withTimeout using `Promise.race`. Can you still clear the
 *   timer?
 * - Look up AbortController, which the real fetch uses to cancel
 *   requests.
 */

export type RetryOptions = {
  /** How many times to call fn in total. Default 3. */
  attempts?: number;
  /** How long to wait between attempts, in milliseconds. Default 1000. */
  waitMs?: number;
};

export function delay(ms: number): Promise<void> {
  // TODO: implement me, then make your tests pass.
  throw new Error("Not implemented: delay");
}

export function withTimeout<T>(promise: Promise<T>, ms: number): Promise<T> {
  // TODO: implement me, then make your tests pass.
  throw new Error("Not implemented: withTimeout");
}

export async function retry<T>(
  fn: () => Promise<T>,
  { attempts = 3, waitMs = 1000 }: RetryOptions = {},
): Promise<T> {
  // TODO: implement me, then make your tests pass.
  throw new Error("Not implemented: retry");
}
