/**
 * Exercise: Counter
 * Level:    03 - State and Events
 * Topics:   useState, onClick, disabled buttons, props with defaults
 *
 * ========================================================================
 * YOUR TASK
 * ========================================================================
 * Build a <Counter> component: a number with a "−" button that makes it
 * smaller and a "+" button that makes it bigger. It never goes below
 * `min` or above `max`.
 *
 *     [ − ]   3   [ + ]
 *
 *     <Counter initial={3} min={0} max={5} />
 *
 * ========================================================================
 * BACKGROUND: STATE
 * ========================================================================
 * A normal variable inside a component is forgotten every time React
 * draws the component again ("re-renders"). STATE is a value React
 * remembers for you between renders. Changing it makes React re-render
 * the component with the new value:
 *
 *     const [count, setCount] = useState(0);
 *     //     ^ current value   ^ function that changes it
 *
 *     <button onClick={() => setCount(count + 1)}>+</button>
 *
 * Never change the value directly (`count = count + 1` does nothing
 * useful). Always call the setter.
 *
 * ========================================================================
 * WHAT YOUR TESTS CAN FIND
 * ========================================================================
 * Tests find elements the way a user (or a screen reader) would: by
 * their role and their name. So your component must render exactly
 * these, or the tests can't find them:
 *
 * - A button named "Decrease". Its visible text can be "−", but give it
 *   aria-label="Decrease" so screen readers (and tests) know what it
 *   does.
 * - A button named "Increase" (aria-label="Increase", text "+").
 * - The current number inside an element with role="status", e.g.
 *   <output role="status">3</output>. Screen readers announce changes
 *   to a status element.
 *
 * ========================================================================
 * THE RULES
 * ========================================================================
 * Your component must:
 * 1. Accept three optional props: `initial` (default 0), `min` (default
 *    0) and `max` (default 10).
 * 2. Show `initial` when it first appears.
 * 3. Add 1 when "Increase" is clicked, and subtract 1 when "Decrease"
 *    is clicked.
 * 4. Disable "Decrease" (the HTML `disabled` attribute) when the
 *    number equals `min`, and disable "Increase" when it equals `max`.
 *    A disabled button ignores clicks, so the number can never leave
 *    the range.
 * 5. Call the optional `onChange` prop with the NEW number after every
 *    change. Don't call it on the first render.
 *
 * You can assume:
 * - `min <= initial <= max`, and all three are whole numbers.
 *
 * ========================================================================
 * EXAMPLES
 * ========================================================================
 * Each line shows what the user does, then what they should see.
 *
 *     <Counter />
 *       shows 0, "Decrease" is disabled     0 is the default min
 *       click "Increase"  ->  shows 1        "Decrease" is enabled now
 *
 *     <Counter initial={4} max={5} />
 *       click "Increase"  ->  shows 5        "Increase" is now disabled
 *       click "Increase"  ->  still 5        a disabled button does nothing
 *
 *     <Counter onChange={spy} />
 *       click "Increase"  ->  spy called with 1
 *       click "Decrease"  ->  spy called with 0
 *
 * ========================================================================
 * EDGE CASES TO TEST
 * ========================================================================
 * - No props: shows 0, "Decrease" disabled, "Increase" enabled
 * - `initial` is shown first: <Counter initial={7} /> shows 7
 * - Click "Increase" 3 times from 0 -> shows 3
 * - At `max`: "Increase" disabled, and clicking it leaves the number alone
 * - At `min`: "Decrease" disabled
 * - min === max (e.g. both 2): both buttons disabled
 * - Negative ranges work: min={-3} initial={-3} -> "Increase" -> -2
 * - onChange is called with the new value each time, and is NOT called
 *   on the first render (check `expect(spy).not.toHaveBeenCalled()`)
 *
 * ========================================================================
 * HINTS (read only if you get stuck)
 * ========================================================================
 * 1. One piece of state is enough: `const [count, setCount] =
 *    useState(initial)`.
 * 2. "Is Decrease disabled?" isn't separate state. Work it out from
 *    count on every render: `disabled={count === min}`.
 * 3. Call onChange inside the click handler, right where you call
 *    setCount, not in a useEffect. Use `onChange?.(next)`: the `?.`
 *    skips the call when no onChange was passed.
 * 4. In a test, `vi.fn()` makes a spy function that records its calls:
 *    `expect(spy).toHaveBeenLastCalledWith(1)`.
 *
 * ========================================================================
 * REACT CONCEPTS TO LEARN
 * ========================================================================
 * - useState: the current value and its setter
 * - Event handlers: onClick={() => ...}
 * - Deriving values from state instead of storing them twice
 * - Optional props with default values (destructuring defaults)
 * - aria-label and role="status" for accessible names
 *
 * ========================================================================
 * STRETCH GOALS
 * ========================================================================
 * - Add a `step` prop (default 1). Clamp at the edges, so step 3 from 8
 *   with max 10 goes to 10.
 * - Add a "Reset" button that returns to `initial`.
 * - Make the number keyboard-adjustable: ArrowUp/ArrowDown on a
 *   focused element. Look up role="spinbutton".
 */

import type { ReactElement } from "react";

export type CounterProps = {
  /** The number shown at first. Default 0. */
  initial?: number;
  /** The smallest allowed number. Default 0. */
  min?: number;
  /** The largest allowed number. Default 10. */
  max?: number;
  /** Called with the new number after every change. */
  onChange?: (value: number) => void;
};

export function Counter({ initial = 0, min = 0, max = 10, onChange }: CounterProps): ReactElement {
  // TODO: build me, then make your tests pass.
  throw new Error("Not implemented: Counter");
}
