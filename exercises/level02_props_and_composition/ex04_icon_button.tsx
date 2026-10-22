/**
 * Exercise: Icon Button
 * Level:    02 - Props and Composition
 * Topics:   accessible names, aria-label, aria-hidden, aria-pressed, throwing on bad props
 *
 * ========================================================================
 * YOUR TASK
 * ========================================================================
 * Build an <IconButton>: a button that shows only an icon, like the
 * "✕" in the corner of a dialog. Sighted users understand the icon, but
 * a screen reader can't read a picture, so the button MUST also have a
 * name in words.
 *
 *     [ ✕ ]   [ 🔇 ]   [ ⋯ ]
 *     Close    Mute     More options
 *
 *     <IconButton icon="✕" label="Close" onClick={closeDialog} />
 *
 * ========================================================================
 * BACKGROUND: ACCESSIBLE NAMES WITHOUT VISIBLE TEXT
 * ========================================================================
 * The ACCESSIBLE NAME of a button is what a screen reader says for it.
 * Usually it's the text inside. With only "✕" inside, a screen reader
 * says "multiplication x, button", which helps nobody.
 *
 * Three ARIA attributes fix this. ARIA attributes are extra HTML
 * attributes that describe elements to assistive technology:
 *
 *     <button aria-label="Search">🔍</button>
 *     //      ^ replaces the name: now it's "Search, button"
 *
 *     <span aria-hidden="true">🔍</span>
 *     //    ^ screen readers skip this element completely
 *
 *     <button aria-pressed="true">Bold</button>
 *     //      ^ a toggle button that is currently "on"
 *
 * A `title` attribute shows a small tooltip when a mouse user hovers,
 * which helps sighted users who don't recognise the icon.
 *
 * ========================================================================
 * WHAT YOUR TESTS CAN FIND
 * ========================================================================
 * - One <button type="button"> whose accessible name is `label`:
 *   screen.getByRole("button", { name: "Close" }).
 * - A `title` attribute equal to `label`.
 * - The icon inside the button, wrapped in an element with
 *   aria-hidden="true" (for example <span aria-hidden="true">✕</span>).
 * - aria-pressed="true" / "false" when `pressed` is given, and NO
 *   aria-pressed attribute when it isn't. Tests can also query
 *   getByRole("button", { name: "Mute", pressed: true }).
 * - An Error with the message "IconButton needs a label" when the label
 *   is blank.
 *
 * ========================================================================
 * THE RULES
 * ========================================================================
 * Your component must:
 * 1. Render a <button type="button"> named by `label` (aria-label), with
 *    `title` set to `label` too.
 * 2. Render `icon` inside it, wrapped in an aria-hidden="true" element.
 * 3. Call `onClick` when clicked.
 * 4. Pass `disabled` (default false) to the button.
 * 5. Set aria-pressed from `pressed` when it's true or false, and leave
 *    the attribute out when `pressed` is undefined. A plain action
 *    button (Close) is not a toggle, so it must not say "not pressed".
 * 6. Throw `new Error("IconButton needs a label")` when `label` is empty
 *    or only spaces. A nameless icon button is a bug, so fail loudly
 *    instead of quietly shipping it.
 *
 * You can assume:
 * - `icon` is something React can render: text, an emoji or an <svg>.
 *
 * ========================================================================
 * EXAMPLES
 * ========================================================================
 *     <IconButton icon="✕" label="Close" />
 *       a button named "Close" (not "✕"), with title "Close"
 *
 *     <IconButton icon="🔇" label="Mute" pressed />
 *       aria-pressed="true"
 *
 *     <IconButton icon="🔇" label="Mute" pressed={false} />
 *       aria-pressed="false"
 *
 *     <IconButton icon="✕" label="Close" />
 *       no aria-pressed attribute at all          not a toggle
 *
 *     <IconButton icon="✕" label="" />
 *       throws "IconButton needs a label"
 *
 * ========================================================================
 * EDGE CASES TO TEST
 * ========================================================================
 * - Named by the label: found with { name: "Close" }, and NOT found
 *   with { name: "✕" }
 * - The icon text sits inside an aria-hidden="true" element inside the
 *   button
 * - title is the label, type is "button"
 * - An <svg> as the icon is rendered inside the button
 * - onClick is called once per click
 * - Enabled by default. With `disabled`: disabled, and onClick is not
 *   called
 * - No `pressed`: no aria-pressed attribute
 * - pressed: aria-pressed "true". pressed={false}: aria-pressed "false"
 * - label="" and label="   " both throw "IconButton needs a label"
 *
 * ========================================================================
 * HINTS (read only if you get stuck)
 * ========================================================================
 * 1. React writes `aria-pressed={true}` as aria-pressed="true", and
 *    leaves the attribute out when the value is undefined. So you can
 *    pass `pressed` straight through.
 * 2. Check the label at the very top of the component, before the
 *    return: `if (label.trim() === "") { throw new Error(...); }`.
 * 3. TESTING: a component that throws while rendering makes `render`
 *    throw too, so wrap it in a function:
 *    `expect(() => render(<IconButton icon="✕" label="" />)).toThrow("IconButton needs a label")`.
 *    React also logs the error with console.error. Silence it with
 *    `vi.spyOn(console, "error").mockImplementation(() => {})`, and undo
 *    that with `vi.restoreAllMocks()` at the end of the test.
 * 4. TESTING: `expect(button).toContainElement(icon)` checks that one
 *    element is inside another.
 *
 * ========================================================================
 * REACT CONCEPTS TO LEARN
 * ========================================================================
 * - Accessible names: aria-label versus visible text
 * - Hiding decoration with aria-hidden
 * - Toggle buttons with aria-pressed
 * - How React writes boolean and undefined attribute values
 * - Throwing an error for invalid props
 *
 * ========================================================================
 * STRETCH GOALS
 * ========================================================================
 * - Reuse the Button from ex01 inside IconButton, so it gets the same
 *   variants and sizes.
 * - Add a visually hidden <span className="sr-only"> with the label
 *   instead of aria-label, and compare the two approaches.
 */

import { ReactNode, type ReactElement } from "react";

export type IconButtonProps = {
  /** The icon to show: text, an emoji or an <svg>. */
  icon: ReactNode;
  /** The button's name in words. Must not be blank. */
  label: string;
  /** Called when the button is clicked. */
  onClick?: () => void;
  /** For toggle buttons: true when "on". Leave undefined otherwise. */
  pressed?: boolean;
  /** Disables the button. Default false. */
  disabled?: boolean;
};

export function IconButton({ icon, label, onClick, pressed, disabled = false }: IconButtonProps): ReactElement {
  // TODO: build me, then make your tests pass.
  throw new Error("Not implemented: IconButton");
}
