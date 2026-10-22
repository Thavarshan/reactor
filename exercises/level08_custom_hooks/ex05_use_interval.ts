/**
 * Exercise: useInterval
 * Level:    08 - Custom Hooks
 * Topics:   custom hooks, setInterval, useRef, stale closures, effect
 *           cleanup, fake timers
 *
 * ========================================================================
 * YOUR TASK
 * ========================================================================
 * Write a hook that calls a function again and again, every `delay`
 * milliseconds, for as long as the component is on screen. Passing
 * `null` as the delay pauses it.
 *
 *     useInterval(() => setSeconds((s) => s + 1), isRunning ? 1000 : null);
 *
 * ========================================================================
 * BACKGROUND: STALE CLOSURES
 * ========================================================================
 * A function remembers the variables around it from the moment it was
 * created. This is called a CLOSURE. In a component, every render
 * creates brand new functions that see that render's props and state.
 *
 * That causes a classic bug with timers. Here the effect only runs
 * once, so the timer keeps calling the FIRST render's function, which
 * sees count as 0 forever:
 *
 *     const [count, setCount] = useState(0);
 *     useEffect(() => {
 *       const id = setInterval(() => setCount(count + 1), 1000);
 *       return () => clearInterval(id);
 *     }, []);
 *     // count goes 0, 1, 1, 1, 1...
 *
 * That old function is called a STALE closure. Your hook must always
 * call the function from the NEWEST render.
 *
 * ========================================================================
 * BACKGROUND: REFS
 * ========================================================================
 * useRef gives you a box that survives re-renders. You can read and
 * change box.current at any time, and changing it does NOT re-render:
 *
 *     const box = useRef(0);
 *     box.current = 5;   // React doesn't re-render for this
 *
 * Change refs in effects or event handlers, not while rendering.
 *
 * ========================================================================
 * THE RULES
 * ========================================================================
 * Your hook must:
 * 1. Accept a `callback` and a `delay` that is a number of milliseconds
 *    or null.
 * 2. Call `callback` every `delay` ms. The first call happens after
 *    `delay` ms, not straight away.
 * 3. Never call `callback` while `delay` is null. Changing the delay to
 *    null stops the calls, and changing it back to a number starts a
 *    fresh countdown.
 * 4. Restart with the new timing when `delay` changes to another
 *    number.
 * 5. Always call the callback from the LATEST render. A re-render with
 *    a new callback must NOT restart the countdown: the next call still
 *    happens on time, and it calls the new callback.
 * 6. Stop calling `callback` when the component unmounts, and leave no
 *    timer running.
 * 7. Return nothing.
 *
 * You can assume:
 * - `delay` is null or a number greater than 0.
 *
 * ========================================================================
 * EXAMPLES
 * ========================================================================
 * Time starts at 0 ms.
 *
 *     useInterval(spy, 1000)
 *       999 ms     ->  spy called 0 times
 *       1000 ms    ->  1 time
 *       3000 ms    ->  3 times
 *
 *     useInterval(spy, null)
 *       10000 ms   ->  0 times              paused
 *
 *     useInterval(oldSpy, 1000)
 *       600 ms     rerender with newSpy
 *       1000 ms    ->  newSpy 1 time, oldSpy 0 times
 *                                           no restart, newest callback
 *
 *     A hook that counts with state:
 *       const [n, setN] = useState(0);
 *       useInterval(() => setN(n + 1), 1000);
 *       after 3000 ms  ->  n is 3            not stuck at 1
 *
 * ========================================================================
 * EDGE CASES TO TEST
 * ========================================================================
 * - Not called before `delay` ms, called once at exactly `delay` ms
 * - Called 3 times after 3 delays
 * - A null delay: never called, and vi.getTimerCount() is 0
 * - 1000 -> null stops the calls, null -> 1000 starts them again
 * - Changing 1000 -> 200 uses the new timing
 * - A new callback mid-wait: called on time, old callback not called
 * - A callback that reads state (setN(n + 1)) counts 1, 2, 3
 * - After unmount: no more calls, and vi.getTimerCount() is 0
 *
 * ========================================================================
 * HINTS (read only if you get stuck)
 * ========================================================================
 * 1. Start simple: an effect that calls setInterval and returns a
 *    cleanup that calls clearInterval. Then handle null.
 * 2. If you put `callback` in the effect's dependency array, a new
 *    callback restarts the timer, which breaks rule 5. If you leave it
 *    out, the timer calls a stale callback. You need a third way.
 * 3. Keep the newest callback in a ref, and update the ref in an effect
 *    after every render. The interval calls whatever is in the ref
 *    when it fires: () => savedCallback.current().
 * 4. TESTING: use vi.useFakeTimers() in beforeEach and
 *    vi.useRealTimers() in afterEach. A vi.fn() spy is a good callback.
 * 5. TESTING: when the callback changes state, move time inside act:
 *        act(() => {
 *          vi.advanceTimersByTime(1000);
 *        });
 * 6. TESTING: to test with state, call useState inside the renderHook
 *    callback and return the state:
 *        const { result } = renderHook(() => {
 *          const [n, setN] = useState(0);
 *          useInterval(() => setN(n + 1), 1000);
 *          return n;
 *        });
 * 7. TESTING: React only re-renders when an act finishes. If one act
 *    moves time by 3000 ms, all three ticks run before any re-render,
 *    so they all see n as 0 and n ends at 1, even with a correct hook.
 *    In a real browser each tick re-renders. To copy that, move time
 *    one tick per act:
 *        for (let tick = 0; tick < 3; tick++) {
 *          act(() => {
 *            vi.advanceTimersByTime(1000);
 *          });
 *        }
 *
 * ========================================================================
 * REACT CONCEPTS TO LEARN
 * ========================================================================
 * - Closures, and the stale closure bug
 * - useRef as a box for "the latest value" that doesn't re-render
 * - Choosing effect dependencies carefully
 * - Effect cleanup with clearInterval
 *
 * ========================================================================
 * STRETCH GOALS
 * ========================================================================
 * - React 19.2 added useEffectEvent, made for exactly this problem.
 *   Rewrite the hook with it and check that your tests still pass.
 * - Build a <Countdown from={10} /> that counts down once a second and
 *   pauses itself (delay null) at 0.
 */

export function useInterval(callback: () => void, delay: number | null): void {
  // TODO: implement me, then make your tests pass.
  throw new Error('Not implemented: useInterval');
}
