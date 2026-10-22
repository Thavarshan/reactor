/**
 * Exercise: Checkbox Group
 * Level:    04 - Forms
 * Topics:   controlled checkboxes, arrays in state, fieldset + legend,
 *           the indeterminate state, callback refs
 *
 * ========================================================================
 * YOUR TASK
 * ========================================================================
 * Build a <CheckboxGroup>: one checkbox per option, plus a "Select all"
 * checkbox at the top. When only SOME options are ticked, "Select all"
 * shows a dash (the "indeterminate" look).
 *
 *     Toppings
 *     [-] Select all
 *     [x] Cheese
 *     [ ] Ham
 *     [x] Olives
 *     2 of 3 selected
 *
 *     <CheckboxGroup label="Toppings" options={["Cheese", "Ham", "Olives"]} />
 *
 * ========================================================================
 * BACKGROUND: CONTROLLED CHECKBOXES
 * ========================================================================
 * A checkbox is controlled with `checked` (not `value`), and its change
 * event tells you the new state in `event.target.checked`:
 *
 *     const [agreed, setAgreed] = useState(false);
 *
 *     <input
 *       type="checkbox"
 *       checked={agreed}
 *       onChange={(e) => setAgreed(e.target.checked)}
 *     />
 *
 * Keeping a LIST of chosen things in state works the same way. Just
 * never change the array in place (no `push` or `splice`). Make a new
 * array, for example with `filter` or the spread syntax `[...list, x]`.
 *
 * ========================================================================
 * BACKGROUND: THE INDETERMINATE STATE
 * ========================================================================
 * A checkbox can look ticked, empty, or "in between" (a dash). The in
 * between look comes from the `indeterminate` PROPERTY of the DOM
 * element. It is not an HTML attribute, so you can't write it in JSX.
 * You set it from JavaScript, through a ref. A callback ref is a
 * function React calls with the real DOM element after it renders:
 *
 *     <input
 *       type="checkbox"
 *       ref={(element) => {
 *         if (element) element.indeterminate = isHalfDone;
 *       }}
 *     />
 *
 * React calls this function again after every render, so the property
 * always matches your latest state.
 *
 * ========================================================================
 * WHAT YOUR TESTS CAN FIND
 * ========================================================================
 * Tests find elements by their ARIA role (what kind of thing it is) and
 * their accessible name (the text a screen reader reads out for it).
 * Your component must render exactly these:
 *
 * - A <fieldset> with a <legend> holding the `label` text. A fieldset
 *   has the role "group", and the legend gives it its name, so tests
 *   use `getByRole("group", { name: "Toppings" })`.
 * - Inside it, a checkbox named "Select all".
 * - One checkbox per option, named by the option text. Wrap each
 *   <input type="checkbox"> in a <label>, or link them with htmlFor.
 * - An element with role="status" containing "N of M selected", for
 *   example "2 of 3 selected".
 *
 * ========================================================================
 * THE RULES
 * ========================================================================
 * Your component must:
 * 1. Start with the options in `defaultSelected` ticked (default: none).
 * 2. Tick or untick an option when its checkbox is clicked.
 * 3. Show "Select all" as:
 *      ticked                      when every option is ticked
 *      unticked                    when no option is ticked
 *      unticked AND indeterminate  when some, but not all, are ticked
 * 4. When "Select all" is clicked: untick everything if every option was
 *    ticked, otherwise tick everything (also from the in between state).
 * 5. Show "N of M selected" in the status element.
 * 6. Call the optional `onChange` with the new list of selected options
 *    after every change. The list is always in the same order as
 *    `options`, no matter the order they were clicked in. Don't call
 *    it on the first render.
 *
 * You can assume:
 * - `options` has at least one item, and no two options are the same.
 * - Every item in `defaultSelected` is also in `options`.
 *
 * ========================================================================
 * EXAMPLES
 * ========================================================================
 * Each line shows what the user does, then what they should see.
 *
 *     <CheckboxGroup label="Toppings" options={["Cheese", "Ham", "Olives"]} />
 *       nothing ticked, "0 of 3 selected"
 *       click "Olives"      ->  Select all is indeterminate, "1 of 3 selected"
 *       click "Select all"  ->  all three ticked, "3 of 3 selected"
 *       click "Select all"  ->  none ticked, "0 of 3 selected"
 *
 *     same group, with onChange={spy}
 *       click "Olives", then "Cheese"
 *         ->  spy last called with ["Cheese", "Olives"]   options order
 *
 * ========================================================================
 * EDGE CASES TO TEST
 * ========================================================================
 * - No defaultSelected: nothing ticked, "Select all" not ticked and not
 *   indeterminate, "0 of 3 selected"
 * - defaultSelected with some options: those are ticked, "Select all"
 *   is indeterminate
 * - defaultSelected with every option: "Select all" is ticked
 * - Ticking the last unticked option ticks "Select all" too
 * - "Select all" from the in between state ticks everything
 * - "Select all" when everything is ticked unticks everything
 * - onChange gets the list in options order, and is NOT called on the
 *   first render
 * - A group with a single option works
 *
 * ========================================================================
 * HINTS (read only if you get stuck)
 * ========================================================================
 * 1. One piece of state: an array of the selected option strings.
 *    "Is everything ticked?" and "how many?" are worked out from it.
 * 2. To keep the options order, build the new list from `options`:
 *    `options.filter((o) => o === clicked || selected.includes(o))`.
 * 3. allSelected = `selected.length === options.length`, and
 *    someSelected = `selected.length > 0 && !allSelected`.
 * 4. Compute the new list once, then pass the SAME list to your state
 *    setter and to `onChange?.(next)`.
 * 5. TESTING: `expect(box).toBeChecked()` and
 *    `expect(box).toBePartiallyChecked()` check the two looks. Use
 *    `.not.toBePartiallyChecked()` for "not indeterminate".
 *
 * ========================================================================
 * REACT CONCEPTS TO LEARN
 * ========================================================================
 * - Controlled checkboxes: `checked` + `event.target.checked`
 * - Arrays in state, updated without mutation
 * - Deriving values (counts, "all", "some") from state
 * - DOM properties that JSX can't set, and callback refs
 * - fieldset and legend for grouping related inputs
 *
 * ========================================================================
 * STRETCH GOALS
 * ========================================================================
 * - Add a `disabledOptions` prop. "Select all" must skip those options.
 * - Make it fully controlled: accept `selected` + `onChange` instead of
 *   keeping state inside (level 05 covers this pattern).
 * - Group the options into sections, each with its own "Select all".
 */

import type { ReactElement } from 'react';

export type CheckboxGroupProps = {
  /** The group's name, shown in the <legend>. */
  label: string;
  /** The options to show, one checkbox each, in this order. */
  options: string[];
  /** The options ticked at the start. Default []. */
  defaultSelected?: string[];
  /** Called with the selected options (in options order) after every change. */
  onChange?: (selected: string[]) => void;
};

export function CheckboxGroup({
  label,
  options,
  defaultSelected = [],
  onChange,
}: CheckboxGroupProps): ReactElement {
  // TODO: build me, then make your tests pass.
  throw new Error('Not implemented: CheckboxGroup');
}
