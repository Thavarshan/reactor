/**
 * Exercise: Dropdown (click outside to close)
 * Level:    06 - Effects and Refs
 * Topics:   document event listeners, refs, Node.contains, cleanup, Escape key
 *
 * ========================================================================
 * YOUR TASK
 * ========================================================================
 * Build a <Dropdown>: a button that opens a small list of choices.
 * Picking a choice, clicking anywhere else on the page, or pressing
 * Escape closes it.
 *
 *     [ Options v ]
 *     +-------------+
 *     | Edit        |
 *     | Duplicate   |
 *     | Delete      |
 *     +-------------+
 *
 *     <Dropdown label="Options" items={["Edit", "Duplicate", "Delete"]}
 *               onSelect={(item) => console.log(item)} />
 *
 * ========================================================================
 * BACKGROUND: LISTENING OUTSIDE YOUR COMPONENT
 * ========================================================================
 * `onClick` on your JSX only hears clicks on YOUR elements. To hear a
 * click anywhere on the page, add a listener to the whole `document`.
 * That's a side effect (it reaches outside your component), so it goes
 * in useEffect, and the cleanup function must remove the SAME function
 * again:
 *
 *     useEffect(() => {
 *       function handleScroll() { console.log("scrolled"); }
 *       document.addEventListener("scroll", handleScroll);
 *       return () => document.removeEventListener("scroll", handleScroll);
 *     }, []);
 *
 * Without the cleanup, every time the effect runs you'd add one more
 * listener, and they'd keep running after the component is gone. In
 * development, React's <StrictMode> runs each effect twice (effect,
 * cleanup, effect) to catch exactly this mistake.
 *
 * To know whether a click was "outside", ask the browser whether your
 * wrapper element contains the clicked element. With a ref (a box that
 * holds the real DOM element, from useRef) on the wrapper:
 *
 *     wrapperRef.current?.contains(event.target as Node)   // true = inside
 *
 * ========================================================================
 * WHAT YOUR TESTS CAN FIND
 * ========================================================================
 * - A button whose accessible name (the name a screen reader reads out)
 *   is the `label` prop. It has aria-expanded="false" while closed and
 *   aria-expanded="true" while open. That tells screen reader users
 *   whether the list is showing.
 * - While open: a list (<ul>, role "list") with one button per item,
 *   named by the item's text, each inside an <li>.
 * - While closed: no list in the page at all.
 *
 * ========================================================================
 * THE RULES
 * ========================================================================
 * Your component must:
 * 1. Start closed.
 * 2. Open when the button is clicked, and close when it is clicked
 *    again.
 * 3. When an item is clicked, call `onSelect` with its text, then
 *    close.
 * 4. Close when the user presses the mouse anywhere OUTSIDE the
 *    component. Don't move focus in that case.
 * 5. Stay open when the user clicks inside the open list, but not on an
 *    item.
 * 6. Close when Escape is pressed while it's open, wherever the focus
 *    is, and move focus back to the toggle button.
 * 7. Do nothing at all on Escape while closed (in particular, don't
 *    move focus).
 * 8. Remove every listener it added to `document` when it closes or is
 *    unmounted.
 *
 * You can assume:
 * - Item texts are unique and not empty.
 *
 * ========================================================================
 * EXAMPLES
 * ========================================================================
 *     <Dropdown label="Options" items={["Edit", "Delete"]} onSelect={spy} />
 *
 *       click "Options"            ->  list shows, aria-expanded="true"
 *       click "Delete"             ->  spy called with "Delete", list gone
 *       click "Options", then click some text elsewhere
 *                                  ->  list gone
 *       click "Options", press Escape
 *                                  ->  list gone, focus is on "Options"
 *
 * ========================================================================
 * EDGE CASES TO TEST
 * ========================================================================
 * - Starts closed: aria-expanded="false" and no list
 * - Clicking the button twice opens, then closes
 * - Clicking an item calls onSelect once with its text, and closes
 * - Clicking outside (e.g. another button on the page) closes it
 * - Clicking the list itself (not an item) keeps it open
 * - Escape while open closes it and focuses the toggle button
 * - Escape while closed doesn't move focus (focus an input outside,
 *   press Escape, the input still has focus)
 * - It opens and closes correctly a second time (listeners are added
 *   and removed each time)
 *
 * ========================================================================
 * HINTS (read only if you get stuck)
 * ========================================================================
 * 1. One piece of state: is it open?
 * 2. Put a ref on an element that wraps BOTH the toggle button and the
 *    list. Clicks inside it are "inside".
 * 3. Add the document listeners only while open: start the effect with
 *    `if (!open) return;` and put `open` in the dependency array.
 * 4. Listen for "mousedown" rather than "click". In a real browser, a
 *    "click" listener can be added while the opening click is still
 *    travelling up to `document`. It then hears that very same click
 *    and closes the list the moment it opened. (Tests may not show
 *    this bug, because they wait for each event to finish first.)
 *    "mousedown" happens before the click, so it can't happen.
 * 5. For Escape, listen for "keydown" on `document` and check
 *    `event.key === "Escape"`. Keep a ref on the toggle button so you
 *    can call `.focus()` on it.
 * 6. TESTING: to click "outside", render something next to the
 *    dropdown and click it:
 *        render(<><Dropdown ... /><p>Somewhere else</p></>);
 *        await user.click(screen.getByText("Somewhere else"));
 *    user.click fires the whole real sequence (pointerdown, mousedown,
 *    mouseup, click), so any of those listeners will hear it.
 * 7. TESTING: press a key with `await user.keyboard("{Escape}")`. It
 *    goes to whatever element has focus, and bubbles up to `document`.
 * 8. TESTING: `toHaveAttribute("aria-expanded", "true")` checks the
 *    attribute. `queryByRole("list")` returns null when there's no list,
 *    so `expect(screen.queryByRole("list")).not.toBeInTheDocument()`
 *    proves it's closed.
 *
 * ========================================================================
 * REACT CONCEPTS TO LEARN
 * ========================================================================
 * - Adding and removing document listeners in useEffect
 * - Effects that only run while some state is true
 * - Refs to DOM elements, and Node.contains
 * - aria-expanded for disclosure buttons
 *
 * ========================================================================
 * STRETCH GOALS
 * ========================================================================
 * - Return focus to the toggle button after an item is picked, too.
 * - Move between items with ArrowUp and ArrowDown (see the menu button
 *   exercise in the accessible patterns level).
 * - Extract the logic into a reusable `useClickOutside(ref, onOutside)`
 *   hook.
 */

import type { ReactElement } from 'react';

export type DropdownProps = {
  /** The toggle button's text and accessible name, e.g. "Options". */
  label: string;
  /** The choices shown in the list. */
  items: string[];
  /** Called with the chosen item's text. */
  onSelect?: (item: string) => void;
};

export function Dropdown({
  label,
  items,
  onSelect,
}: DropdownProps): ReactElement {
  // TODO: build me, then make your tests pass.
  throw new Error('Not implemented: Dropdown');
}
