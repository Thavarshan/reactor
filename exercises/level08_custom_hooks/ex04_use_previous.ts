/**
 * Exercise: usePrevious
 * Level:    08 - Custom Hooks
 * Topics:   custom hooks, remembering information from earlier renders,
 *           Object.is, rerender
 *
 * ========================================================================
 * YOUR TASK
 * ========================================================================
 * Write a hook that remembers what a value was BEFORE its most recent
 * change. A price tag could use it to show "was $12, now $9", or a
 * counter could show an arrow pointing up or down.
 *
 *     const previousPrice = usePrevious(price);
 *
 * ========================================================================
 * BACKGROUND: "CHANGED" MEANS Object.is
 * ========================================================================
 * React decides whether a value changed with Object.is(a, b). It works
 * like === for numbers and strings. For objects and arrays it checks
 * IDENTITY: is this the very same object?
 *
 *     Object.is(3, 3);                    // true   no change
 *     Object.is("a", "b");                // false  changed
 *     const user = { name: "Ada" };
 *     Object.is(user, user);              // true   same object
 *     Object.is(user, { name: "Ada" });   // false  a NEW object
 *
 * ========================================================================
 * BACKGROUND: COMPONENTS RE-RENDER FOR MANY REASONS
 * ========================================================================
 * A component re-renders when its own state changes, when its parent
 * re-renders, or when a context it reads changes. So a hook can be
 * called many times in a row with the SAME value. Your hook must not
 * mistake "rendered again" for "the value changed".
 *
 * ========================================================================
 * THE RULES
 * ========================================================================
 * Your hook must:
 * 1. Accept a `value` of any type.
 * 2. Return undefined on the first render, since there is no earlier
 *    value yet.
 * 3. After `value` changes from A to B, return A.
 * 4. Keep returning the same previous value when the hook re-renders
 *    with an unchanged value. A re-render for some other reason must
 *    NOT wipe out the previous value.
 * 5. Use Object.is to decide whether `value` changed.
 *
 * You can assume:
 * - You don't need to tell apart "no previous value" and "the previous
 *   value was undefined". Both return undefined.
 *
 * ========================================================================
 * EXAMPLES
 * ========================================================================
 * Each line is one render of the same component.
 *
 *     render with 1        ->  undefined    nothing came before
 *     rerender with 2      ->  1
 *     rerender with 2      ->  1            same value: keep the old answer
 *     rerender with 2      ->  1            still the same
 *     rerender with 5      ->  2
 *
 *     const a = { n: 1 };
 *     render with a                ->  undefined
 *     rerender with a              ->  undefined   same object, no change
 *     rerender with { n: 1 }       ->  a           a new object is a change
 *
 * ========================================================================
 * EDGE CASES TO TEST
 * ========================================================================
 * - First render -> undefined
 * - Change 1 -> 2 -> returns 1
 * - Several changes 1 -> 2 -> 3 -> returns 2
 * - Re-render with the same value (several times) -> previous stays 1
 * - Same object re-rendered -> still undefined
 * - New object with the same contents -> returns the old object (toBe)
 * - Changing back 1 -> 2 -> 1 -> returns 2
 *
 * ========================================================================
 * HINTS (read only if you get stuck)
 * ========================================================================
 * 1. The hook needs to remember TWO things between renders: the value
 *    it saw last time, and the value before that.
 * 2. Rule 4 is the tricky one. Only update what you remember when the
 *    value is different from the one you saw last time.
 * 3. React lets you call a state setter WHILE rendering, as long as it
 *    is inside an `if` that stops it running forever. React then
 *    throws away that render and renders again straight away:
 *        const [lastSeen, setLastSeen] = useState(something);
 *        if (!Object.is(something, lastSeen)) {
 *          setLastSeen(something);
 *          // ...update anything else you remember here too
 *        }
 * 4. TESTING: pass the value through initialProps and change it with
 *    rerender:
 *        const { result, rerender } = renderHook(
 *          ({ value }) => usePrevious(value),
 *          { initialProps: { value: 1 } },
 *        );
 *        rerender({ value: 2 });
 *        expect(result.current).toBe(1);
 *
 * ========================================================================
 * REACT CONCEPTS TO LEARN
 * ========================================================================
 * - Remembering information from earlier renders
 * - Updating state during render (guarded by a condition)
 * - Object.is: how React decides whether something changed
 * - Generic hooks: usePrevious<T> returns T | undefined
 *
 * ========================================================================
 * STRETCH GOALS
 * ========================================================================
 * - Many blog posts write usePrevious with useRef and useEffect. Write
 *   that version too and run your tests against it. Which rule fails,
 *   and why?
 * - Write a <PriceTag price={...} /> component that shows "was $12"
 *   next to the price when the price dropped.
 */

export function usePrevious<T>(value: T): T | undefined {
  // TODO: implement me, then make your tests pass.
  throw new Error("Not implemented: usePrevious");
}
