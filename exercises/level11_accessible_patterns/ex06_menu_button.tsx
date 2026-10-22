/**
 * Exercise: Menu Button
 * Level:    11 - Accessible UI Patterns
 * Topics:   ARIA menu button pattern, focus management, arrow keys, Escape
 *
 * ========================================================================
 * YOUR TASK
 * ========================================================================
 * Build a <MenuButton>: a button that opens a small menu of actions,
 * like "Edit / Duplicate / Delete". It works fully from the keyboard,
 * following the WAI-ARIA Authoring Practices "menu button" pattern.
 *
 *     [ Actions v ]
 *     +-------------+
 *     | >Edit<      |   <- focused item
 *     |  Duplicate  |
 *     |  Delete     |
 *     +-------------+
 *
 *     <MenuButton label="Actions" items={[
 *       { label: "Edit", onSelect: () => edit() },
 *       { label: "Duplicate", onSelect: () => duplicate() },
 *       { label: "Delete", onSelect: () => remove() },
 *     ]} />
 *
 * ========================================================================
 * BACKGROUND: THE MENU BUTTON PATTERN
 * ========================================================================
 * The button tells assistive technology (like a screen reader) that it
 * opens a menu, and whether the menu is open:
 *
 *     <button aria-haspopup="menu" aria-expanded={open} aria-controls="...">
 *
 * The menu is role="menu" and each action is role="menuitem". Unlike
 * the combobox, focus really moves into the menu: each item is focused
 * in turn with `.focus()`. Items get tabIndex={-1}: focusable from code,
 * but skipped by the Tab key.
 *
 * Closing the menu must always put focus somewhere sensible. If the
 * focused item simply disappears, focus falls back to <body>, and a
 * keyboard user is lost at the top of the page. So whenever the menu
 * closes on purpose, focus goes back to the button.
 *
 * The keyboard rules, from the Authoring Practices:
 *
 *     on the button:  Enter, Space, ArrowDown  open, focus the first item
 *                     ArrowUp                  open, focus the last item
 *     in the menu:    ArrowDown / ArrowUp      next / previous item (wraps)
 *                     Home / End               first / last item
 *                     Enter / Space            activate the item, close
 *                     Escape                   close
 *                     Tab                      close, move on as usual
 *
 * A <button> already turns Enter and Space into a click, so a click
 * handler covers those two on the button.
 *
 * ========================================================================
 * WHAT YOUR TESTS CAN FIND
 * ========================================================================
 * - A button named `label`, with aria-haspopup="menu" and
 *   aria-expanded="false" (closed) or "true" (open). While open,
 *   aria-controls is the menu's id.
 * - While open: a menu named `label` (role="menu", aria-labelledby set
 *   to the button's id), containing one menuitem per item, named by
 *   its label, each with tabIndex={-1}.
 * - While closed: no menu.
 *
 * ========================================================================
 * THE RULES
 * ========================================================================
 * Your component must:
 * 1. Start closed.
 * 2. Clicking the button while closed (and so Enter or Space on it)
 *    opens the menu and focuses the first item. Clicking it while open
 *    closes the menu, and focus stays on the button.
 * 3. ArrowDown on the button opens the menu and focuses the first item.
 *    ArrowUp opens it and focuses the last item.
 * 4. In the menu, ArrowDown and ArrowUp move focus to the next and
 *    previous item, wrapping at the ends. Home and End go to the first
 *    and last item.
 * 5. Enter or Space on an item, or clicking it, calls that item's
 *    `onSelect` once, closes the menu and focuses the button.
 * 6. Escape in the menu closes it and focuses the button.
 * 7. Tab in the menu closes it, and focus moves on to the next thing
 *    after the button, as if the menu wasn't there. Don't
 *    preventDefault Tab.
 * 8. Call preventDefault() for the arrow keys, Home, End, Enter, Space
 *    and Escape when you handle them, so the page doesn't scroll.
 * 9. Make ids with useId.
 *
 * You can assume:
 * - There's at least one item, and labels are unique.
 *
 * ========================================================================
 * EXAMPLES
 * ========================================================================
 * Items Edit, Duplicate, Delete:
 *
 *     click "Actions"         ->  menu open, "Edit" focused,
 *                                 aria-expanded="true"
 *     ArrowDown, ArrowDown    ->  "Delete" focused
 *     ArrowDown               ->  "Edit" focused (wraps)
 *     ArrowUp                 ->  "Delete" focused (wraps)
 *     Enter                   ->  Delete's onSelect called once,
 *                                 menu closed, focus on "Actions"
 *
 *     focus "Actions", ArrowUp  ->  open, "Delete" focused
 *     Escape                    ->  closed, focus on "Actions"
 *
 *     <button>After</button> rendered next:
 *     open, Tab                 ->  closed, focus on "After"
 *
 * ========================================================================
 * EDGE CASES TO TEST
 * ========================================================================
 * - Closed at first: aria-expanded="false", aria-haspopup="menu", no
 *   menu
 * - Clicking opens it, names the menu by the button, and focuses the
 *   first item. The button's aria-controls is the menu's id
 * - Clicking the button again closes it
 * - Enter and Space on the focused button open it too
 * - ArrowDown / ArrowUp on the button focus the first / last item
 * - Arrow keys move through the items and wrap at both ends
 * - Home and End jump to the first and last item
 * - Enter on an item calls its onSelect once, closes, focuses the button
 * - Space on an item does the same, and the menu stays closed
 * - Clicking an item does the same
 * - Escape closes and focuses the button, without calling onSelect
 * - Tab closes the menu and focuses the next element after the button
 * - Every menuitem has tabIndex -1
 *
 * ========================================================================
 * HINTS (read only if you get stuck)
 * ========================================================================
 * 1. State: `open` and `focusIndex` (which item should have focus).
 *    Keep refs to the button and to each item.
 * 2. Opening only renders the menu. Focus the item in a useEffect that
 *    runs when `open` or `focusIndex` changes, after the items exist.
 * 3. Write `close()` once: set open to false and focus the button. Use
 *    it for selecting, Escape and Tab.
 * 4. Tab: call close() WITHOUT preventDefault. Focus is now on the
 *    button, so the browser's normal Tab moves on from there.
 * 5. Space on an item: if you only handle it in onKeyDown, the browser
 *    may still turn the key-up into a click on the button, which now
 *    has focus, and re-open the menu. preventDefault on the keydown
 *    stops that.
 * 6. TESTING: `await user.keyboard("{ArrowDown}")`, `"{Home}"`,
 *    `"{End}"`, `"{Enter}"`, `"{Escape}"` and `" "` (Space). Put focus
 *    on the button first with `act(() => button.focus())`.
 * 7. TESTING: `await user.tab()` presses Tab. Render
 *    `<><MenuButton ... /><button>After</button></>` to see where focus
 *    goes.
 *
 * ========================================================================
 * REACT CONCEPTS TO LEARN
 * ========================================================================
 * - The WAI-ARIA menu button pattern: aria-haspopup, aria-expanded,
 *   menu and menuitem
 * - Moving real focus between items, with an array of refs
 * - Returning focus to the button when a popup closes
 * - Keyboard events and the browser's default actions
 *
 * ========================================================================
 * STRETCH GOALS
 * ========================================================================
 * - Typeahead: pressing a letter focuses the next item starting with it.
 * - Close the menu when the user clicks anywhere outside it.
 * - Support `disabled` items: focusable, with aria-disabled="true", but
 *   selecting them does nothing.
 */

import type { ReactElement } from "react";

export type MenuItem = {
  /** The item's text and accessible name. */
  label: string;
  /** Called when the user picks this item. */
  onSelect: () => void;
};

export type MenuButtonProps = {
  /** The button's text, which also names the menu. */
  label: string;
  /** The menu items, in order. */
  items: MenuItem[];
};

export function MenuButton({ label, items }: MenuButtonProps): ReactElement {
  // TODO: build me, then make your tests pass.
  throw new Error("Not implemented: MenuButton");
}
