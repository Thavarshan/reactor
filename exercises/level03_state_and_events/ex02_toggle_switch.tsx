/**
 * Exercise: Toggle Switch
 * Level:    03 - State and Events
 * Topics:   boolean state, role="switch", aria-checked, labels, onChange callbacks
 *
 * ========================================================================
 * YOUR TASK
 * ========================================================================
 * Build a <ToggleSwitch>: an on/off switch with a label, like the ones
 * in a phone's settings.
 *
 *     Dark mode   ( o   )  Off       click  ->   Dark mode   (   o )  On
 *
 *     <ToggleSwitch label="Dark mode" onChange={(on) => setTheme(on ? "dark" : "light")} />
 *
 * ========================================================================
 * BACKGROUND: BOOLEAN STATE AND THE SWITCH ROLE
 * ========================================================================
 * STATE is a value React remembers between renders. Changing it with
 * its setter makes React draw the component again (a "re-render"). An
 * on/off value is a boolean state:
 *
 *     const [isOpen, setIsOpen] = useState(false);
 *     <button onClick={() => setIsOpen(!isOpen)}>Menu</button>
 *
 * HTML has no switch element. You can make one from a <button> and two
 * ARIA attributes (extra attributes that describe an element to screen
 * readers):
 *
 *     role="switch"          "this is an on/off switch, not a plain button"
 *     aria-checked="true"    "and it is currently on"
 *
 * Using a real <button> underneath gives you keyboard support for free:
 * a focused button already reacts to Space and Enter.
 *
 * The switch also needs an ACCESSIBLE NAME (what a screen reader reads
 * for it). A <label htmlFor="id"> can name a <button id="id">, just
 * like it names an <input>. React's `useId()` makes a unique id for
 * you, so two switches on one page never share one.
 *
 * ========================================================================
 * WHAT YOUR TESTS CAN FIND
 * ========================================================================
 * - A <button type="button"> with role="switch", named by `label`:
 *   screen.getByRole("switch", { name: "Dark mode" }).
 * - aria-checked="true" when on, "false" when off. Tests can also query
 *   getByRole("switch", { name: "Dark mode", checked: true }).
 * - The label text visible on the page.
 * - Any "On"/"Off" text you show must NOT change the name. Keep it out
 *   of the name, for example with aria-hidden="true" around it.
 *
 * ========================================================================
 * THE RULES
 * ========================================================================
 * Your component must:
 * 1. Start on when `defaultChecked` is true, off otherwise (default
 *    false).
 * 2. Flip between on and off each time it's clicked.
 * 3. Call the optional `onChange` with the NEW value after each flip.
 *    Don't call it on the first render.
 * 4. Be disabled when `disabled` is true: clicks change nothing and
 *    don't call onChange.
 * 5. Use type="button", so it never submits a surrounding form.
 * 6. Keep its own state: two switches on one page are independent.
 *
 * You can assume:
 * - `label` is never blank.
 *
 * ========================================================================
 * EXAMPLES
 * ========================================================================
 *     <ToggleSwitch label="Dark mode" />
 *       aria-checked "false"
 *       click  ->  "true"
 *       click  ->  "false"
 *
 *     <ToggleSwitch label="Dark mode" defaultChecked />
 *       aria-checked "true"
 *
 *     <ToggleSwitch label="Dark mode" onChange={spy} />
 *       click  ->  spy called with true
 *       click  ->  spy called with false
 *
 *     Tab to the switch, press Space  ->  on       a button does this
 *     press Enter                     ->  off      for free
 *
 * ========================================================================
 * EDGE CASES TO TEST
 * ========================================================================
 * - Found as a switch named "Dark mode", and the label text is visible
 * - Off by default, on with defaultChecked
 * - Click, click: true, then false
 * - It's a <button> with type="button", and clicking it inside a <form>
 *   doesn't submit the form
 * - onChange gets true then false, exactly twice, and is not called on
 *   the first render
 * - Keyboard: Tab focuses it, Space turns it on, Enter turns it off
 * - disabled: toBeDisabled(), a click leaves aria-checked "false", and
 *   onChange is not called
 * - Two switches ("Wi-Fi", "Bluetooth"): clicking one leaves the other
 *   off
 *
 * ========================================================================
 * HINTS (read only if you get stuck)
 * ========================================================================
 * 1. One boolean state is enough: `useState(defaultChecked)`.
 * 2. React writes `aria-checked={checked}` as "true" or "false", so you
 *    can pass the boolean straight in.
 * 3. In the click handler, work out the new value ONCE and use it
 *    twice: `const next = !checked; setChecked(next); onChange?.(next);`.
 *    Calling `setChecked` doesn't change `checked` right away. The new
 *    value only arrives on the next render.
 * 4. Pass `disabled` to the <button>. A disabled button ignores clicks,
 *    so you don't need an `if` in the handler.
 * 5. TESTING: `await user.tab()` moves focus like the Tab key, and
 *    `await user.keyboard(" ")` and `await user.keyboard("{Enter}")`
 *    press keys on whatever has focus.
 *
 * ========================================================================
 * REACT CONCEPTS TO LEARN
 * ========================================================================
 * - Boolean state and flipping it
 * - Why the new state isn't visible until the next render
 * - Notifying a parent with a callback prop (onChange)
 * - role="switch", aria-checked, <label htmlFor> and useId
 *
 * ========================================================================
 * STRETCH GOALS
 * ========================================================================
 * - Make it work CONTROLLED too: when a `checked` prop is passed, show
 *   that instead of internal state. (Level 05 covers this pattern.)
 * - Add CSS that draws a sliding knob, using [aria-checked="true"] as
 *   the selector.
 */

import type { ReactElement } from 'react';

export type ToggleSwitchProps = {
  /** The switch's visible label and accessible name. */
  label: string;
  /** Whether the switch starts on. Default false. */
  defaultChecked?: boolean;
  /** Disables the switch. Default false. */
  disabled?: boolean;
  /** Called with the new value (true = on) after every flip. */
  onChange?: (checked: boolean) => void;
};

export function ToggleSwitch({
  label,
  defaultChecked = false,
  disabled = false,
  onChange,
}: ToggleSwitchProps): ReactElement {
  // TODO: build me, then make your tests pass.
  throw new Error('Not implemented: ToggleSwitch');
}
