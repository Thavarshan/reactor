/**
 * Exercise: useDebouncedValue
 * Level:    08 - Custom Hooks
 * Topics:   custom hooks, useEffect cleanup, setTimeout, fake timers,
 *           rerender
 *
 * ========================================================================
 * YOUR TASK
 * ========================================================================
 * Write a hook that returns a "slow copy" of a value. The copy only
 * catches up once the value has STOPPED changing for `delay`
 * milliseconds. A search box can use it to send a request when the user
 * pauses, instead of on every key press.
 *
 *     const debouncedQuery = useDebouncedValue(query, 300);
 *
 * ========================================================================
 * BACKGROUND: DEBOUNCING
 * ========================================================================
 * "Debounce" means "wait until things go quiet, then act once". Think of
 * a lift door: each person who walks in restarts the countdown, and the
 * door only closes once nobody has come in for a few seconds.
 *
 * In plain JavaScript you restart a countdown by cancelling the old
 * timer and starting a new one:
 *
 *     let timer: ReturnType<typeof setTimeout> | undefined;
 *     function onKeyPress() {
 *       clearTimeout(timer);
 *       timer = setTimeout(() => console.log("quiet now"), 300);
 *     }
 *
 * In a hook, an effect's CLEANUP function is a natural place to cancel
 * the old timer. React runs the cleanup before running the effect
 * again, and when the component goes away (unmounts).
 *
 * ========================================================================
 * THE RULES
 * ========================================================================
 * Your hook must:
 * 1. Accept a `value` of any type and an optional `delay` in
 *    milliseconds (default 500).
 * 2. Return `value` straight away on the first render.
 * 3. Keep returning the OLD value after `value` changes. Once `value`
 *    has stayed the same for `delay` ms, return the new value.
 * 4. Restart the wait every time `value` changes. Values that are
 *    replaced before their wait is over are never returned.
 * 5. NOT restart the wait when the hook re-renders with the same value.
 *    "The same" means Object.is(old, new) is true, which is how React
 *    compares effect dependencies.
 * 6. Restart the wait, using the new delay, if `delay` changes while a
 *    new value is waiting.
 * 7. Cancel any waiting timer when the component unmounts.
 *
 * You can assume:
 * - `delay` is 0 or more.
 * - `value` is usually a string or a number. (A new object with the
 *   same contents counts as a change, because Object.is compares
 *   objects by identity.)
 *
 * ========================================================================
 * EXAMPLES
 * ========================================================================
 * Each line is a moment in time, starting at 0 ms, with delay 500.
 *
 *     0 ms     render with "a"           ->  "a"    first render
 *     0 ms     rerender with "b"         ->  "a"    waiting for quiet
 *     499 ms                             ->  "a"
 *     500 ms                             ->  "b"    quiet for 500 ms
 *
 *     0 ms     rerender "a" -> "b"       ->  "a"
 *     300 ms   rerender with "c"         ->  "a"    the wait restarts
 *     799 ms                             ->  "a"
 *     800 ms                             ->  "c"    "b" never appears
 *
 *     0 ms     rerender "a" -> "b"       ->  "a"
 *     300 ms   rerender with "b" again   ->  "a"    same value: no restart
 *     500 ms                             ->  "b"
 *
 * ========================================================================
 * EDGE CASES TO TEST
 * ========================================================================
 * - First render returns the value immediately
 * - The new value appears after exactly `delay` ms, not 1 ms earlier
 * - The default delay is 500 ms
 * - A second change restarts the wait, and the middle value never shows
 * - Re-rendering with the same value doesn't restart the wait
 * - Changing `delay` while waiting restarts the wait with the new delay
 * - After unmount, no timers are left (vi.getTimerCount() is 0)
 *
 * ========================================================================
 * HINTS (read only if you get stuck)
 * ========================================================================
 * 1. You need one piece of state: the debounced value that you return.
 * 2. Use an effect that starts a setTimeout. When the timer fires, it
 *    copies `value` into that state.
 * 3. Return a cleanup function from the effect that clears the timer.
 *    Then think about the dependency array. Which inputs should
 *    restart the timer?
 * 4. TESTING: use fake timers so a test doesn't really wait:
 *        beforeEach(() => vi.useFakeTimers());
 *        afterEach(() => vi.useRealTimers());
 *    Then move time forward inside act, because the timer changes state:
 *        act(() => {
 *          vi.advanceTimersByTime(500);
 *        });
 * 5. TESTING: pass the value and delay as initialProps, so rerender can
 *    change them:
 *        const { result, rerender } = renderHook(
 *          ({ value, delay }) => useDebouncedValue(value, delay),
 *          { initialProps: { value: "a", delay: 500 } },
 *        );
 *        rerender({ value: "b", delay: 500 });
 * 6. TESTING: vi.getTimerCount() tells you how many fake timers are
 *    still waiting. Check it after unmount().
 *
 * ========================================================================
 * REACT CONCEPTS TO LEARN
 * ========================================================================
 * - Effect cleanup: cancelling work the effect started
 * - The dependency array decides when an effect runs again
 * - Testing time with fake timers and act
 * - Generic hooks: useDebouncedValue<T> returns the same type it gets
 *
 * ========================================================================
 * STRETCH GOALS
 * ========================================================================
 * - Write a <SearchBox> that shows "Searching for: ..." using the
 *   debounced text, and test it with user-event and fake timers.
 * - Add an option `{ leading: true }` that returns the FIRST change
 *   right away, then debounces the rest.
 */

export function useDebouncedValue<T>(value: T, delay = 500): T {
  // TODO: implement me, then make your tests pass.
  throw new Error('Not implemented: useDebouncedValue');
}
