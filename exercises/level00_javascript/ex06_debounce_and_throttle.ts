/**
 * Exercise: Debounce and Throttle
 * Level:    00 - Modern JavaScript for React
 * Topics:   setTimeout, clearTimeout, closures over timers, fake timers
 *
 * ========================================================================
 * YOUR TASK
 * ========================================================================
 * Write two wrappers that limit how often a function runs. `debounce`
 * waits until the calls stop, then runs once. `throttle` runs at most
 * once per time window.
 *
 *     const save = debounce((text: string) => api.save(text), 300);
 *     save("h"); save("he"); save("hey");   // 300 ms later: saves "hey" once
 *
 * ========================================================================
 * BACKGROUND: WHY LIMIT CALLS?
 * ========================================================================
 * Some events fire very often. Typing fires on every key, scrolling and
 * resizing fire dozens of times a second. If each one starts a network
 * request or heavy work, the app slows down. Two classic fixes:
 *
 *   DEBOUNCE: "wait until things go quiet". Every call restarts a
 *   countdown. Only when no call has happened for `waitMs` does the
 *   function finally run, with the arguments from the LAST call. Good for
 *   search-as-you-type.
 *
 *       calls:   x x x x . . . . . . RUN
 *                        |<-waitMs->|
 *
 *   THROTTLE: "at most once every N ms". The first call runs straight
 *   away. Calls during the next `waitMs` are ignored. Good for scroll
 *   handlers.
 *
 *       calls:   x x x x x x x x x x x x
 *       runs:    RUN       RUN       RUN     (one per window)
 *
 * Both need to remember something between calls (a timer id, or the time
 * of the last run). A closure is perfect for that.
 *
 * A function in JavaScript is also an object, so you can add properties
 * to it, such as a `cancel` method:
 *
 *     const hello = () => "hi";
 *     const withExtra = Object.assign(hello, { shout: () => "HI" });
 *     withExtra();         // "hi"
 *     withExtra.shout();   // "HI"
 *
 * ========================================================================
 * THE RULES
 * ========================================================================
 * Your functions must:
 * 1. debounce(fn, waitMs): return a function that, when called, does not
 *    call `fn` straight away. It calls `fn` once `waitMs` milliseconds have
 *    passed with no further calls.
 * 2. Each new call restarts the wait. When `fn` finally runs, it gets the
 *    arguments of the most recent call.
 * 3. After `fn` has run, the next call starts a fresh wait.
 * 4. The debounced function has a `cancel()` method. It throws away a
 *    waiting call, so `fn` doesn't run. Calling cancel when nothing is
 *    waiting does nothing.
 * 5. throttle(fn, waitMs): return a function that calls `fn` straight
 *    away (with that call's arguments) if `fn` hasn't run in the last
 *    `waitMs` milliseconds. Otherwise the call is ignored, and is NOT
 *    run later.
 * 6. A call exactly `waitMs` after the last run goes through.
 *
 * You can assume:
 * - `waitMs` is more than 0.
 * - Nobody needs the return value of `fn`. The wrappers return nothing.
 *
 * ========================================================================
 * EXAMPLES
 * ========================================================================
 * Times are in milliseconds. `fn` is a spy.
 *
 *     const d = debounce(fn, 300);
 *       at 0    d("a")
 *       at 100  d("b")         the wait restarts
 *       at 399                 fn not called yet
 *       at 400                 fn("b") called once
 *
 *     d("x"); d.cancel();      300 ms later: fn not called at all
 *
 *     const t = throttle(fn, 1000);
 *       at 0    t("a")  ->  fn("a") called
 *       at 500  t("b")  ->  ignored
 *       at 1000 t("c")  ->  fn("c") called      a new window starts
 *       at 1500 t("d")  ->  ignored, and never called later
 *
 * ========================================================================
 * EDGE CASES TO TEST
 * ========================================================================
 * - debounce: fn is not called right away
 * - debounce: many quick calls -> fn called once, with the last arguments
 * - debounce: each call restarts the wait (fn not called at 399 in the
 *   example above, called at 400)
 * - debounce: two bursts separated by a long pause -> fn called twice
 * - cancel stops a waiting call
 * - cancel when nothing is waiting does not throw, and later calls still
 *   work
 * - throttle: the first call runs straight away with its arguments
 * - throttle: calls inside the window are ignored and never run later
 * - throttle: a call exactly waitMs later runs
 * - Two debounced functions have separate timers
 *
 * ========================================================================
 * HINTS (read only if you get stuck)
 * ========================================================================
 * 1. debounce remembers one thing: the id of the waiting timer. Keep it
 *    in a `let` variable inside debounce, outside the returned function.
 * 2. On every call: clear the old timer, then start a new one that calls
 *    `fn(...args)`.
 * 3. throttle remembers when `fn` last ran. `Date.now()` gives the
 *    current time in milliseconds. Fake timers move `Date.now()` too.
 *    Watch out for the very first call, when `fn` has never run.
 * 4. The type `ReturnType<typeof setTimeout>` describes a timer id, so
 *    `let timer: ReturnType<typeof setTimeout> | undefined`.
 * 5. TESTING: use fake timers (`vi.useFakeTimers()` at the start,
 *    `vi.useRealTimers()` in afterEach) and move time with
 *    `vi.advanceTimersByTime(300)`. No `await` is needed here because
 *    there are no promises.
 *
 * ========================================================================
 * JAVASCRIPT CONCEPTS TO LEARN
 * ========================================================================
 * - setTimeout and clearTimeout
 * - Closures that remember a timer between calls
 * - Rest parameters and spreading arguments: `(...args) => fn(...args)`
 * - Functions are objects, so they can carry methods like `cancel`
 * - Date.now() and fake timers
 *
 * ========================================================================
 * STRETCH GOALS
 * ========================================================================
 * - Add `flush()` to debounce: run the waiting call right now.
 * - Give throttle a "trailing" option: remember the last ignored call and
 *   run it at the end of the window.
 * - In level 06 you'll build a debounced search box in React. Notice how
 *   cancel() becomes the effect's cleanup.
 */

/** A debounced function: call it like the original, plus `cancel()`. */
export type Debounced<A extends unknown[]> = ((...args: A) => void) & {
  /** Throws away the waiting call, if there is one. */
  cancel: () => void;
};

export function debounce<A extends unknown[]>(
  fn: (...args: A) => void,
  waitMs: number,
): Debounced<A> {
  // TODO: implement me, then make your tests pass.
  throw new Error('Not implemented: debounce');
}

export function throttle<A extends unknown[]>(
  fn: (...args: A) => void,
  waitMs: number,
): (...args: A) => void {
  // TODO: implement me, then make your tests pass.
  throw new Error('Not implemented: throttle');
}
