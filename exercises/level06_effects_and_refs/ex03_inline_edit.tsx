/**
 * Exercise: Inline Edit
 * Level:    06 - Effects and Refs
 * Topics:   useRef, DOM refs, focus management, keyboard events
 *
 * ========================================================================
 * YOUR TASK
 * ========================================================================
 * Build an <InlineEdit> component: a piece of text with an "Edit" button.
 * Clicking "Edit" swaps the text for a text box, with the cursor already
 * in it. Enter saves, Escape cancels, and either way the keyboard focus
 * goes back to the "Edit" button.
 *
 *     Viewing:   Buy milk  [ Edit ]
 *     Editing:   [ Buy milk|        ]      (focused)
 *
 *     <InlineEdit initialValue="Buy milk" label="Task name" onSave={save} />
 *
 * ========================================================================
 * BACKGROUND: REFS AND FOCUS
 * ========================================================================
 * FOCUS is which element the keyboard talks to right now. Only one
 * element has it at a time. Moving focus well matters a lot for people
 * who use a keyboard or a screen reader: if the element they were on
 * disappears, they get dumped at the top of the page.
 *
 * To call `.focus()` you need the real DOM element, not JSX. A REF gives
 * you that. `useRef` creates a box that survives re-renders (React
 * calling your component again), and the `ref` attribute tells React to
 * put the element in it:
 *
 *     const boxRef = useRef<HTMLDivElement>(null);
 *     ...
 *     <div ref={boxRef} tabIndex={-1}>Hi</div>
 *     ...
 *     boxRef.current?.focus();   // current is the <div>, or null
 *
 * The element only exists after React has put it on the page. So you
 * can't focus something in the same click handler that makes it appear.
 * An effect runs after the page updates, which makes it the right place.
 *
 * A ref can hold any value, not only elements. Changing `ref.current`
 * does NOT cause a re-render. That makes refs handy for "notes to self"
 * that the screen doesn't depend on.
 *
 * ========================================================================
 * WHAT YOUR TESTS CAN FIND
 * ========================================================================
 * While viewing:
 * - The current text, e.g. screen.getByText("Buy milk").
 * - A button named "Edit".
 * - No text box.
 * While editing:
 * - A text box (an <input>, role "textbox") whose accessible name is the
 *   `label` prop. The ACCESSIBLE NAME is what a screen reader reads out.
 *   Use <label> or aria-label="Task name".
 * - No "Edit" button.
 *
 * ========================================================================
 * THE RULES
 * ========================================================================
 * Your component must:
 * 1. Start in viewing mode, showing `initialValue`.
 * 2. NOT move focus when it first appears. Stealing focus on page load
 *    is confusing.
 * 3. On "Edit": show the text box filled with the current text, and
 *    focus it.
 * 4. On Enter in the text box: trim the text. If it is not empty and
 *    differs from the current text, call `onSave` with it and show the
 *    new text. Either way, go back to viewing mode.
 * 5. On Escape in the text box: go back to viewing mode, keep the old
 *    text, and don't call `onSave`.
 * 6. After Enter or Escape, focus the "Edit" button.
 * 7. Start every edit from the current saved text, never from an
 *    earlier cancelled draft.
 *
 * You can assume:
 * - `initialValue` never changes after the first render.
 * - `initialValue` is not empty.
 *
 * ========================================================================
 * EXAMPLES
 * ========================================================================
 *     <InlineEdit initialValue="Buy milk" label="Task name" onSave={spy} />
 *       click "Edit"                ->  text box "Task name" has focus,
 *                                       its value is "Buy milk"
 *       type " and eggs", Enter     ->  shows "Buy milk and eggs",
 *                                       spy called with "Buy milk and eggs",
 *                                       focus is on "Edit"
 *       click "Edit", type "x", Escape
 *                                   ->  still "Buy milk and eggs",
 *                                       spy not called again
 *       clear the box, Enter        ->  still "Buy milk and eggs"   blank is ignored
 *
 * ========================================================================
 * EDGE CASES TO TEST
 * ========================================================================
 * - First render: shows the text, an "Edit" button, no text box, and
 *   nothing is focused (`document.body` has focus)
 * - "Edit" focuses the text box, filled with the current text
 * - Enter saves the new text, calls onSave once, and focuses "Edit"
 * - Spaces around the text are trimmed: "  Tea  " saves "Tea"
 * - Escape keeps the old text, doesn't call onSave, and focuses "Edit"
 * - Enter with a blank box keeps the old text and doesn't call onSave
 * - Enter without changes doesn't call onSave
 * - Editing again after Escape starts from the saved text
 * - Works without an onSave prop
 *
 * ========================================================================
 * HINTS (read only if you get stuck)
 * ========================================================================
 * 1. State: the saved text, whether you're editing, and the draft
 *    being typed.
 * 2. Listen for keys with `onKeyDown` on the input and check `e.key`:
 *    it is "Enter" or "Escape".
 * 3. Focusing the input: the `autoFocus` attribute works when an input
 *    first appears. Focusing the "Edit" button needs a ref and an
 *    effect, because the button comes back after the input goes.
 * 4. An effect with `[isEditing]` as its dependency runs on the first
 *    render too. If it focuses the button every time you're not editing,
 *    it breaks rule 2. Keep a "should I focus the button?" note in a
 *    second ref: set it to true when Enter or Escape is pressed, and
 *    check it (then reset it) in the effect.
 * 5. A sneaky one: if your tests show you straight back in editing mode
 *    after Enter, the Enter key "clicked" the Edit button. Your code
 *    moved focus to that button while the key was still being handled,
 *    and Enter on a focused button presses it. Call
 *    `e.preventDefault()` when you handle Enter, so the key does
 *    nothing more after your code.
 * 6. TESTING: user-event types like a person, including special keys
 *    in braces:
 *        const user = userEvent.setup();
 *        await user.click(screen.getByRole("button", { name: "Edit" }));
 *        const box = screen.getByRole("textbox", { name: "Task name" });
 *        await user.clear(box);
 *        await user.type(box, "Tea{Enter}");
 * 7. TESTING: check focus with the jest-dom matcher `toHaveFocus()`:
 *    `expect(screen.getByRole("button", { name: "Edit" })).toHaveFocus()`.
 *    For "nothing is focused", use
 *    `expect(document.body).toHaveFocus()`.
 *
 * ========================================================================
 * REACT CONCEPTS TO LEARN
 * ========================================================================
 * - useRef for DOM elements, and `ref.current`
 * - useRef for values that shouldn't trigger a re-render
 * - Running code after the page updates (useEffect)
 * - Focus management for keyboard and screen reader users
 *
 * ========================================================================
 * STRETCH GOALS
 * ========================================================================
 * - Select all the text when the input gets focus (`input.select()`).
 * - Save when the input loses focus (onBlur), like many apps do.
 * - Give the "Edit" button a clearer name when there are many on one
 *   page, e.g. aria-label="Edit Task name".
 */

import type { ReactElement } from 'react';

export type InlineEditProps = {
  /** The text shown at first. */
  initialValue: string;
  /** The accessible name of the text box, e.g. "Task name". */
  label: string;
  /** Called with the new, trimmed text when the user saves a change. */
  onSave?: (value: string) => void;
};

export function InlineEdit({
  initialValue,
  label,
  onSave,
}: InlineEditProps): ReactElement {
  // TODO: build me, then make your tests pass.
  throw new Error('Not implemented: InlineEdit');
}
