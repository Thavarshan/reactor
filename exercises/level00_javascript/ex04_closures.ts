/**
 * Exercise: Closures
 * Level:    00 - Modern JavaScript for React
 * Topics:   closures, functions that return functions, private variables
 *
 * ========================================================================
 * YOUR TASK
 * ========================================================================
 * Write three functions that each build and return something that
 * REMEMBERS values between calls: a counter, a "run only once" wrapper,
 * and a wrapper that remembers its last answer.
 *
 *     const counter = makeCounter(5);
 *     counter.increment();   // 6
 *
 * ========================================================================
 * BACKGROUND: CLOSURES
 * ========================================================================
 * A function can use the variables around the place where it was
 * written. If a function is created inside another function, it keeps
 * those variables alive even after the outer function has finished.
 * This is called a CLOSURE:
 *
 *     function makeGreeter(greeting: string) {
 *       let times = 0;                        // lives on inside the closure
 *       return (name: string) => {
 *         times = times + 1;
 *         return `${greeting}, ${name}! (${times})`;
 *       };
 *     }
 *
 *     const hi = makeGreeter("Hi");
 *     hi("Ada");     // "Hi, Ada! (1)"
 *     hi("Bo");      // "Hi, Bo! (2)"    `times` was remembered
 *
 *     const hey = makeGreeter("Hey");
 *     hey("Cy");     // "Hey, Cy! (1)"   a separate `times` of its own
 *
 * Each call to makeGreeter makes a fresh set of variables. Nothing outside
 * can read or change `times` directly, so it's private.
 *
 * Closures are everywhere in React. Every event handler you write inside
 * a component is a closure over that render's props and state.
 *
 * `(...args: A) => R` in the types below means "a function that takes
 * any arguments (their types are called A) and returns an R". It lets
 * your wrappers work with any function.
 *
 * ========================================================================
 * THE RULES
 * ========================================================================
 * Your functions must:
 * 1. makeCounter(start): return an object with four methods. `start` is
 *    optional and defaults to 0.
 *    - increment(): add 1 and return the new value
 *    - decrement(): subtract 1 and return the new value
 *    - reset(): go back to `start` and return it
 *    - value(): return the current value without changing it
 * 2. Two counters made by two makeCounter calls never affect each other.
 * 3. once(fn): return a new function. The first time it's called, it
 *    calls `fn` with the same arguments and returns fn's result. Every
 *    later call returns that FIRST result again without calling `fn`.
 * 4. memoizeOne(fn): return a new function that remembers only its most
 *    recent arguments and result. When it's called with the same
 *    arguments as last time (the same number of them, and each one `===`
 *    the previous one), return the remembered result without calling
 *    `fn`. Otherwise call `fn`, remember the new arguments and result, and
 *    return it.
 *
 * You can assume:
 * - `fn` never throws an error.
 *
 * ========================================================================
 * EXAMPLES
 * ========================================================================
 *     const c = makeCounter(5);
 *     c.increment()    ->  6
 *     c.increment()    ->  7
 *     c.decrement()    ->  6
 *     c.value()        ->  6
 *     c.reset()        ->  5
 *
 *     const init = once(() => "ready");   // fn is a spy
 *     init()           ->  "ready"        fn called once
 *     init()           ->  "ready"        fn NOT called again
 *
 *     const add = memoizeOne((a: number, b: number) => a + b);
 *     add(1, 2)        ->  3              fn called
 *     add(1, 2)        ->  3              remembered, fn not called
 *     add(2, 2)        ->  4              new arguments, fn called
 *     add(1, 2)        ->  3              fn called again (only ONE result is kept)
 *
 * ========================================================================
 * EDGE CASES TO TEST
 * ========================================================================
 * - makeCounter() with no argument starts at 0
 * - makeCounter can go below zero: decrement from 0 -> -1
 * - Two counters are independent
 * - reset after several increments returns `start`
 * - once passes the arguments through: once((a, b) => a + b)(2, 3) -> 5
 * - once: later calls with DIFFERENT arguments still return the first
 *   result, and fn was called exactly once
 * - once remembers a result of `undefined` too (fn still called once)
 * - memoizeOne calls fn on the very first call
 * - memoizeOne with the same arguments calls fn only once
 * - memoizeOne compares objects by identity: two equal-looking objects
 *   count as different arguments
 * - memoizeOne with A, B, A calls fn three times
 *
 * ========================================================================
 * HINTS (read only if you get stuck)
 * ========================================================================
 * 1. In makeCounter, keep the current value in a `let` variable inside
 *    makeCounter, then return an object whose methods change it.
 * 2. once needs two remembered things: "have I been called yet?" and
 *    "what was the result?". Why not just check whether the result is
 *    undefined? Look at the edge cases.
 * 3. memoizeOne needs to remember the last arguments (an array, or
 *    `undefined` before the first call) and the last result. Compare the
 *    arrays item by item with `every((arg, i) => arg === lastArgs[i])`,
 *    after checking the lengths match.
 * 4. TESTING: `const fn = vi.fn(() => "ready")` makes a spy that also
 *    returns a value. `expect(fn).toHaveBeenCalledTimes(1)` counts calls.
 *    Import `vi` from "vitest".
 *
 * ========================================================================
 * JAVASCRIPT CONCEPTS TO LEARN
 * ========================================================================
 * - Closures: functions that remember the variables around them
 * - Functions that return functions (or objects full of functions)
 * - Private state that nothing else can touch
 * - Rest parameters `(...args)` to accept any arguments
 * - Memoization: remembering a result so you don't compute it twice.
 *   React's useMemo and React.memo work like memoizeOne.
 *
 * ========================================================================
 * STRETCH GOALS
 * ========================================================================
 * - Give makeCounter a `step` option: makeCounter(0, 5).increment() -> 5.
 * - Make `once` try again next time if `fn` throws, instead of
 *   remembering nothing.
 * - Write `memoize(fn)` that remembers EVERY result, keyed by its single
 *   argument, using a Map.
 */

export type Counter = {
  /** Adds 1 and returns the new value. */
  increment: () => number;
  /** Subtracts 1 and returns the new value. */
  decrement: () => number;
  /** Goes back to the start value and returns it. */
  reset: () => number;
  /** Returns the current value without changing it. */
  value: () => number;
};

export function makeCounter(start = 0): Counter {
  // TODO: implement me, then make your tests pass.
  throw new Error('Not implemented: makeCounter');
}

export function once<A extends unknown[], R>(
  fn: (...args: A) => R,
): (...args: A) => R {
  // TODO: implement me, then make your tests pass.
  throw new Error('Not implemented: once');
}

export function memoizeOne<A extends unknown[], R>(
  fn: (...args: A) => R,
): (...args: A) => R {
  // TODO: implement me, then make your tests pass.
  throw new Error('Not implemented: memoizeOne');
}
