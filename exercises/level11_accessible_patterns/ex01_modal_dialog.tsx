/**
 * Exercise: Modal Dialog
 * Level:    11 - Accessible UI Patterns
 * Topics:   role="dialog", aria-modal, focus management, focus trap, Escape
 *
 * ========================================================================
 * YOUR TASK
 * ========================================================================
 * Build a <ModalDialog>: a button that opens a dialog. While it's open,
 * keyboard focus moves into the dialog and can't Tab out of it. Escape
 * or the "Close" button closes it, and focus goes back to the button
 * that opened it.
 *
 *     [ Edit profile ]          <- the trigger button
 *
 *     +-- Edit profile -------------------+
 *     |  Name: [ Ada        ]             |   <- your `children`
 *     |  [ Save ]                         |
 *     |                        [ Close ]  |
 *     +-----------------------------------+
 *
 *     <ModalDialog triggerLabel="Edit profile" title="Edit profile">
 *       <label>Name <input /></label>
 *       <button>Save</button>
 *     </ModalDialog>
 *
 * ========================================================================
 * BACKGROUND: WHAT MAKES A DIALOG ACCESSIBLE
 * ========================================================================
 * A sighted mouse user sees a box pop up and clicks in it. A keyboard or
 * screen reader user only knows what has focus (the element that gets
 * the keys you press). So a modal dialog (one that blocks the page
 * behind it) must manage focus itself. The WAI-ARIA Authoring Practices,
 * the standard guide for accessible widgets, say:
 *
 * - The box has role="dialog" and aria-modal="true", which tell screen
 *   readers "this is a dialog, and the page behind it is off-limits".
 * - Its accessible name (what a screen reader reads out) comes from its
 *   title, linked with aria-labelledby="<id of the title>".
 * - Opening it moves focus inside. Tab and Shift+Tab cycle through the
 *   things inside it and never escape to the page behind.
 * - Escape closes it. Closing it puts focus back where it came from.
 *
 * In React you move focus with a ref (a handle on the real DOM element):
 *
 *     const boxRef = useRef<HTMLInputElement>(null);
 *     useEffect(() => { boxRef.current?.focus(); }, []);
 *     return <input ref={boxRef} />;
 *
 * Why not the HTML <dialog> element with showModal()? It does much of
 * this for you in real browsers, and it's worth learning later. But
 * jsdom (the fake browser your tests run in) doesn't support
 * showModal(), and building it by hand teaches you what it does.
 *
 * ========================================================================
 * WHAT YOUR TESTS CAN FIND
 * ========================================================================
 * - A button named `triggerLabel` (always rendered).
 * - While open: a dialog, <div role="dialog" aria-modal="true"
 *   aria-labelledby="...">, whose accessible name is `title`. Inside it,
 *   in this order:
 *   1. a heading <h2> with `title` (its id is what aria-labelledby uses)
 *   2. your `children`
 *   3. a button named "Close"
 * - While closed: no dialog at all.
 *
 * ========================================================================
 * THE RULES
 * ========================================================================
 * Your component must:
 * 1. Start closed. Clicking the trigger opens the dialog.
 * 2. When it opens, focus the first focusable element inside the dialog
 *    (use the PROVIDED getFocusable). If `children` has nothing
 *    focusable, that's the "Close" button.
 * 3. Trap focus: Tab on the last focusable element moves to the first,
 *    and Shift+Tab on the first moves to the last. Tab between them
 *    works normally.
 * 4. Close when the user presses Escape anywhere inside the dialog, or
 *    clicks "Close".
 * 5. Every time it closes, move focus back to the trigger button and
 *    call `onClose` if it was given.
 * 6. Make ids with useId, so two dialogs on one page don't clash.
 *
 * You can assume:
 * - `children` contains no disabled or hidden elements that need
 *   special care, and doesn't change while the dialog is open.
 *
 * ========================================================================
 * EXAMPLES
 * ========================================================================
 * With the "Edit profile" example above:
 *
 *     click "Edit profile"   ->  dialog "Edit profile" opens,
 *                                focus is on the Name box
 *     Tab                    ->  focus on Save
 *     Tab                    ->  focus on Close
 *     Tab                    ->  focus back on Name (it wraps)
 *     Shift+Tab              ->  focus on Close (wraps backwards)
 *     Escape                 ->  dialog gone, focus on "Edit profile"
 *
 * ========================================================================
 * EDGE CASES TO TEST
 * ========================================================================
 * - Closed at first: no dialog
 * - The dialog is named by its title and has aria-modal="true"
 * - Opening focuses the first focusable child
 * - With text-only children, opening focuses "Close"
 * - Tab from the last element wraps to the first
 * - Shift+Tab from the first element wraps to the last
 * - With only "Close" focusable, Tab keeps focus on "Close"
 * - Escape closes it and focuses the trigger
 * - "Close" closes it and focuses the trigger
 * - onClose is called once per close, and not when opening
 * - It can be opened again after closing, and focus moves in again
 * - Two ModalDialogs on one page get different aria-labelledby ids
 *
 * ========================================================================
 * HINTS (read only if you get stuck)
 * ========================================================================
 * 1. You need two refs: one on the trigger button, one on the dialog
 *    <div>.
 * 2. After opening, the dialog only exists after React renders it. A
 *    useEffect that runs when `open` becomes true can then call
 *    `getFocusable(dialogRef.current)[0].focus()`.
 * 3. Handle keys with one onKeyDown on the dialog <div>. Keys pressed on
 *    anything inside it bubble up to it.
 * 4. For the trap: when `event.key === "Tab"`, get the focusable list.
 *    If `!event.shiftKey` and `document.activeElement` is the last one,
 *    call `event.preventDefault()` (stop the normal Tab) and focus the
 *    first. Do the mirror image for Shift+Tab.
 * 5. Write one `close()` function that sets open to false, focuses the
 *    trigger and calls onClose. Use it for both Escape and "Close".
 * 6. TESTING: `await user.tab()` presses Tab, and
 *    `await user.tab({ shift: true })` presses Shift+Tab.
 *    `await user.keyboard("{Escape}")` presses Escape.
 * 7. TESTING: check focus with `expect(element).toHaveFocus()`.
 *
 * ========================================================================
 * REACT CONCEPTS TO LEARN
 * ========================================================================
 * - Refs to real DOM elements, and calling .focus()
 * - useEffect to act after the DOM has updated
 * - useId for unique, matching ids
 * - Keyboard events, event.key, event.shiftKey and preventDefault
 * - The WAI-ARIA dialog pattern: role, aria-modal, aria-labelledby
 *
 * ========================================================================
 * STRETCH GOALS
 * ========================================================================
 * - Render a backdrop behind the dialog. Clicking it (but not the
 *   dialog) closes it.
 * - Render the dialog into document.body with createPortal, and make
 *   the rest of the page `inert` while it's open.
 * - Rebuild it with the real <dialog> element and showModal() in the
 *   playground. What did you no longer need to write?
 */

import { ReactNode, type ReactElement } from "react";

export type ModalDialogProps = {
  /** The text of the button that opens the dialog. */
  triggerLabel: string;
  /** The dialog's heading, which is also its accessible name. */
  title: string;
  /** What goes inside the dialog, between the heading and "Close". */
  children?: ReactNode;
  /** Called every time the dialog closes. */
  onClose?: () => void;
};

/**
 * PROVIDED: you don't need to change this.
 * Returns the elements inside `container` that Tab can reach, in order.
 */
export function getFocusable(container: HTMLElement): HTMLElement[] {
  const selector = [
    "a[href]",
    "button:not([disabled])",
    "input:not([disabled])",
    "select:not([disabled])",
    "textarea:not([disabled])",
    '[tabindex]:not([tabindex="-1"])',
  ].join(", ");
  return Array.from(container.querySelectorAll<HTMLElement>(selector));
}

export function ModalDialog({ triggerLabel, title, children, onClose }: ModalDialogProps): ReactElement {
  // TODO: build me, then make your tests pass.
  throw new Error("Not implemented: ModalDialog");
}
