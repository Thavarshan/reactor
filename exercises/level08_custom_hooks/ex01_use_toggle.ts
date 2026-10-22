/**
 * Exercise: useToggle
 * Level:    08 - Custom Hooks
 * Topics:   custom hooks, useState, functional updates, renderHook, act,
 *           result.current, rerender
 *
 * ========================================================================
 * YOUR TASK
 * ========================================================================
 * Write a custom hook called useToggle. It remembers a true/false value
 * and gives you three functions: one to flip it, one to switch it on
 * and one to switch it off.
 *
 *     const { value, toggle, setOn, setOff } = useToggle(false);
 *
 * A component could use it for a menu that opens and closes, or a
 * "show password" checkbox.
 *
 * ========================================================================
 * BACKGROUND: CUSTOM HOOKS
 * ========================================================================
 * A HOOK is a function whose name starts with "use", like useState. A
 * CUSTOM HOOK is a hook you write yourself. It is a plain function that
 * calls other hooks and returns whatever is useful:
 *
 *     function useCounter(start: number) {
 *       const [count, setCount] = useState(start);
 *       const increment = () => setCount(count + 1);
 *       return { count, increment };
 *     }
 *
 *     function Clicker() {
 *       const { count, increment } = useCounter(0);
 *       return <button onClick={increment}>{count}</button>;
 *     }
 *
 * Each component that calls useCounter gets its OWN count. A custom
 * hook shares logic between components, not state.
 *
 * ========================================================================
 * BACKGROUND: TESTING A HOOK
 * ========================================================================
 * A hook only works while React is rendering a component. Calling
 * useToggle() directly in a test throws an error. Instead, use
 * renderHook from @testing-library/react. It builds a tiny invisible
 * component that calls your hook for you.
 *
 * 1. renderHook and result.current
 *
 *     const { result } = renderHook(() => useCounter(5));
 *     expect(result.current.count).toBe(5);
 *
 *    result.current is whatever the hook returned on its LATEST render.
 *    Read it again after each change. A copy made earlier goes stale:
 *
 *     const { count } = result.current;   // a snapshot, never updates
 *
 * 2. act
 *
 *    Wrap anything that changes state in act(...). When act finishes,
 *    React has applied the updates and re-rendered, so result.current
 *    holds the new values:
 *
 *     act(() => {
 *       result.current.increment();
 *     });
 *     expect(result.current.count).toBe(6);
 *
 *    Without act, React warns "not wrapped in act(...)" and your test
 *    may read an old value.
 *
 *    Everything inside ONE act happens before the next re-render. So
 *    two calls in one act both run against the same render:
 *
 *     act(() => {
 *       result.current.increment();
 *       result.current.increment();
 *     });
 *
 * 3. rerender and initialProps
 *
 *    A real component re-renders when its parent passes new props. To
 *    copy that, give renderHook some initialProps. Your callback gets
 *    them as its argument. rerender(newProps) then calls the hook again
 *    with the new values:
 *
 *     const { result, rerender } = renderHook(
 *       ({ start }) => useCounter(start),
 *       { initialProps: { start: 5 } },
 *     );
 *     rerender({ start: 99 });
 *
 *    rerender already uses act for you.
 *
 * ========================================================================
 * THE RULES
 * ========================================================================
 * Your hook must:
 * 1. Accept one optional argument, `initialValue` (default false).
 * 2. Return an object with four things: `value`, `toggle`, `setOn` and
 *    `setOff`.
 * 3. Start with `value` equal to `initialValue`.
 * 4. Flip `value` when toggle() is called: true becomes false, and
 *    false becomes true.
 * 5. Make `value` true when setOn() is called, and false when setOff()
 *    is called. Calling setOn() when it is already true keeps it true.
 * 6. Count every call. Calling toggle() twice inside ONE act must flip
 *    the value twice, so it ends where it started.
 * 7. Ignore later changes to `initialValue`. It is only used on the
 *    first render, just like useState's starting value.
 *
 * You can assume:
 * - `initialValue` is always a boolean when it is passed.
 * - toggle, setOn and setOff are called with no arguments.
 *
 * ========================================================================
 * EXAMPLES
 * ========================================================================
 *     useToggle()                       value is false     the default
 *     useToggle(true)                   value is true
 *
 *     useToggle()
 *       toggle()                    ->  true
 *       toggle()                    ->  false
 *       setOn()                     ->  true
 *       setOn()                     ->  true          already on
 *       setOff()                    ->  false
 *
 *     useToggle()
 *       toggle() and toggle() in one act  ->  false   two flips
 *
 *     useToggle(initialValue) starting with false
 *       rerender with initialValue true   ->  still false
 *
 * ========================================================================
 * EDGE CASES TO TEST
 * ========================================================================
 * - No argument: value is false
 * - useToggle(true): value is true
 * - toggle() once -> true, and again -> false
 * - setOn() twice in a row -> still true
 * - setOff() when already false -> still false
 * - setOn() then setOff() -> false
 * - toggle() twice inside ONE act -> back to the starting value
 * - rerender with a different initialValue -> value does NOT change
 *
 * ========================================================================
 * HINTS (read only if you get stuck)
 * ========================================================================
 * 1. One piece of state holds the value. The three functions are
 *    small arrow functions that call its setter.
 * 2. If rule 6 fails, look at how toggle works out the new value. Both
 *    calls in one act come from the SAME render, so they both see the
 *    same old `value`. "!value" twice is the same answer twice.
 * 3. A setter also accepts a function. React calls it with the newest
 *    value, even if earlier updates haven't been rendered yet:
 *    setSomething((current) => ...). Use that form in toggle.
 * 4. TESTING: for rule 7, pass initialProps and use rerender:
 *        const { result, rerender } = renderHook(
 *          ({ initial }) => useToggle(initial),
 *          { initialProps: { initial: false } },
 *        );
 *        rerender({ initial: true });
 *        expect(result.current.value).toBe(false);
 * 5. TESTING: always write result.current.toggle(), not a `toggle`
 *    saved earlier. After a re-render, result.current is the fresh
 *    object.
 *
 * ========================================================================
 * REACT CONCEPTS TO LEARN
 * ========================================================================
 * - Custom hooks: plain functions that call other hooks
 * - Returning an object of values and functions from a hook
 * - Functional updates: setValue((current) => ...)
 * - Testing hooks: renderHook, act, result.current, rerender
 *
 * ========================================================================
 * STRETCH GOALS
 * ========================================================================
 * - Make toggle, setOn and setOff keep the SAME identity across
 *   re-renders. Look up useCallback. Test it: save
 *   result.current.toggle, call rerender(), then
 *   expect(result.current.toggle).toBe(saved).
 * - Write a <ShowPassword> component that uses your hook to switch an
 *   input between type="password" and type="text".
 */

export type UseToggleResult = {
  /** The current true/false value. */
  value: boolean;
  /** Flips the value. */
  toggle: () => void;
  /** Makes the value true. */
  setOn: () => void;
  /** Makes the value false. */
  setOff: () => void;
};

export function useToggle(initialValue = false): UseToggleResult {
  // TODO: implement me, then make your tests pass.
  throw new Error('Not implemented: useToggle');
}
