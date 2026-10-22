/**
 * Exercise: Combobox (Autocomplete)
 * Level:    11 - Accessible UI Patterns
 * Topics:   ARIA combobox + listbox, aria-activedescendant, keyboard handling
 *
 * ========================================================================
 * YOUR TASK
 * ========================================================================
 * Build a <Combobox>: a text box that suggests matching options as you
 * type. The arrow keys move a highlight through the suggestions, and
 * Enter picks one. Focus stays in the text box the whole time, following
 * the WAI-ARIA Authoring Practices "combobox with list autocomplete".
 *
 *     Fruit
 *     [ an               ]
 *     +------------------+
 *     | Banana           |
 *     |>Mango<           |   <- the active (highlighted) option
 *     | Orange           |
 *     +------------------+
 *
 *     <Combobox label="Fruit" options={["Apple", "Banana", "Mango", "Orange"]} />
 *
 * ========================================================================
 * BACKGROUND: aria-activedescendant
 * ========================================================================
 * In the tabs pattern, the arrow keys move real focus from element to
 * element. A combobox can't do that: the user must keep typing in the
 * text box. So focus stays in the input, and the input points at the
 * highlighted option instead:
 *
 *     <input role="combobox" aria-activedescendant="fruit-option-2" />
 *     ...
 *     <li role="option" id="fruit-option-2" aria-selected="true">Mango</li>
 *
 * A screen reader reads the option that aria-activedescendant points
 * to, as if it had focus. When nothing is highlighted, leave the
 * attribute off.
 *
 * The other attributes on the input:
 * - role="combobox": "a text box with a popup of suggestions"
 * - aria-expanded="true" or "false": is the popup showing?
 * - aria-controls="<listbox id>": which element is the popup
 * - aria-autocomplete="list": the popup lists matching suggestions
 *
 * The popup is a list of choices: role="listbox", with one
 * role="option" per suggestion. aria-selected="true" marks the active
 * option.
 *
 * ========================================================================
 * WHAT YOUR TESTS CAN FIND
 * ========================================================================
 * - A combobox labelled `label`: <label htmlFor> plus
 *   <input role="combobox">, with aria-expanded, aria-controls,
 *   aria-autocomplete="list" and (only while an option is active)
 *   aria-activedescendant.
 * - While open: a listbox named `label` (e.g. aria-label={label}), whose
 *   id matches the input's aria-controls. Inside it, one option per
 *   match, named by its text, each with its own unique id and
 *   aria-selected ("true" only on the active option).
 * - While closed: no listbox.
 *
 * ========================================================================
 * THE RULES
 * ========================================================================
 * Your component must:
 * 1. Start closed, with an empty text box and no active option.
 * 2. Matches: the options whose text contains the typed text, ignoring
 *    case, in their original order. Empty text matches every option.
 * 3. Typing (any change to the text) opens the list if there's at least
 *    one match, closes it if there are none, and clears the active
 *    option.
 * 4. ArrowDown: if closed, open the list (if anything matches) and make
 *    the first match active. If open, move to the next match, wrapping
 *    from the last to the first. With nothing active, go to the first.
 * 5. ArrowUp: like ArrowDown, but backwards. If closed, open and make
 *    the LAST match active. With nothing active, go to the last.
 * 6. Enter: if an option is active, put its text in the box, close the
 *    list and call `onSelect(text)`. Otherwise do nothing.
 * 7. Escape: close the list, keep the text.
 * 8. Clicking an option does the same as Enter on it, and focus stays
 *    in (or comes back to) the text box.
 * 9. Whenever the list closes, clear the active option.
 * 10. Keep real focus in the text box the whole time. Call
 *    preventDefault() for ArrowUp, ArrowDown and Enter.
 *
 * You can assume:
 * - Option texts are unique.
 *
 * ========================================================================
 * EXAMPLES
 * ========================================================================
 * Options Apple, Banana, Mango, Orange:
 *
 *     type "an"        ->  open: Banana, Mango, Orange. None active
 *     ArrowDown        ->  Banana active (aria-activedescendant = its id)
 *     ArrowDown x2     ->  Orange active
 *     ArrowDown        ->  Banana active again (wraps)
 *     ArrowUp          ->  Orange active (wraps backwards)
 *     Enter            ->  box says "Orange", list closed,
 *                          onSelect("Orange")
 *
 *     empty box, ArrowUp  ->  open with all 4, Orange active
 *     type "xyz"          ->  no matches: closed, aria-expanded="false"
 *     type "AP"           ->  Apple (case doesn't matter)
 *
 * ========================================================================
 * EDGE CASES TO TEST
 * ========================================================================
 * - Closed at first: aria-expanded="false", no listbox, no
 *   aria-activedescendant
 * - Typing shows only matches, ignoring case, in the original order
 * - aria-controls points at the listbox, which is named by the label
 * - ArrowDown/ArrowUp move the active option and wrap
 * - aria-activedescendant equals the active option's id, and only that
 *   option has aria-selected="true"
 * - ArrowDown on a closed, empty box opens all options with the first
 *   active. ArrowUp does the same with the last active
 * - Enter picks the active option and calls onSelect once
 * - Enter with no active option does nothing (no onSelect call)
 * - Escape closes the list and keeps the text
 * - No matches closes the list, and ArrowDown then does nothing
 * - After Escape, ArrowDown starts again from the first match
 * - Typing again after moving the highlight clears it
 * - Clicking an option picks it, and the text box still has focus
 * - Focus stays in the text box while using the arrow keys
 * - ArrowDown, ArrowUp and Enter call preventDefault
 *
 * ========================================================================
 * HINTS (read only if you get stuck)
 * ========================================================================
 * 1. You need three pieces of state: the text, whether it's open, and
 *    the active index (a number, or -1 for none). The matches aren't
 *    state. Work them out from the text on every render.
 * 2. Make ids from one useId: the listbox `${id}-listbox`, and each
 *    option `${id}-option-${index}`.
 * 3. "Open" only shows a listbox when there are matches:
 *    `const showList = open && matches.length > 0`.
 * 4. Clicking an <li> would normally move focus away from the input.
 *    Call `event.preventDefault()` in the option's onMouseDown to keep
 *    focus where it is, then do the selecting in onClick.
 * 5. TESTING: `await user.type(box, "an")`, then
 *    `await user.keyboard("{ArrowDown}{Enter}")`.
 * 6. TESTING: compare the pointer with the option:
 *    `expect(box).toHaveAttribute("aria-activedescendant",
 *    screen.getByRole("option", { name: "Banana" }).id)`.
 *    `getByRole("option", { name: "Banana", selected: true })` only
 *    finds it when aria-selected is "true".
 * 7. TESTING: `fireEvent.keyDown(box, { key: "Enter" })` returns false
 *    when your handler called preventDefault().
 *
 * ========================================================================
 * REACT CONCEPTS TO LEARN
 * ========================================================================
 * - The WAI-ARIA combobox and listbox patterns
 * - aria-activedescendant: a "virtual" focus that keeps real focus put
 * - Deriving filtered data during render
 * - Keyboard handling with a switch on event.key
 * - onMouseDown + preventDefault to keep focus
 *
 * ========================================================================
 * STRETCH GOALS
 * ========================================================================
 * - Close the list when the text box loses focus (onBlur).
 * - Show "No matches" in a role="status" element when nothing matches.
 * - Bold the matching part of each option's text.
 * - Scroll the active option into view with scrollIntoView({ block:
 *   "nearest" }). (jsdom doesn't have it, so guard with `?.`.)
 */

import type { ReactElement } from "react";

export type ComboboxProps = {
  /** The label of the text box, also the name of the listbox. */
  label: string;
  /** All the choices. */
  options: string[];
  /** Called with the option's text when the user picks one. */
  onSelect?: (value: string) => void;
};

export function Combobox({ label, options, onSelect }: ComboboxProps): ReactElement {
  // TODO: build me, then make your tests pass.
  throw new Error("Not implemented: Combobox");
}
