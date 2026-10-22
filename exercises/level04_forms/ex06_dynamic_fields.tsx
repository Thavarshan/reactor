/**
 * Exercise: Dynamic Fields
 * Level:    04 - Forms
 * Topics:   a list of inputs in state, adding and removing rows, stable
 *           keys, submitting a list
 *
 * ========================================================================
 * YOUR TASK
 * ========================================================================
 * Build an <EmailListForm> where the user can add and remove email
 * fields, then send the whole list in one go.
 *
 *     Email 1 [ ada@example.com    ]  [ Remove email 1 ]
 *     Email 2 [ lin@example.com    ]  [ Remove email 2 ]
 *     [ Add email ]
 *
 *     [ Send invites ]
 *
 *     <EmailListForm onSubmit={(emails) => console.log(emails)} />
 *
 * ========================================================================
 * BACKGROUND: A LIST OF INPUTS
 * ========================================================================
 * When the number of fields can change, keep their values in ONE array
 * in state, and render one input per item with `map`. Each change makes
 * a new array (never change the old one in place):
 *
 *     const [names, setNames] = useState(["", ""]);
 *
 *     // change item i:
 *     setNames(names.map((n, index) => (index === i ? newText : n)));
 *     // add an item at the end:
 *     setNames([...names, ""]);
 *     // remove item i:
 *     setNames(names.filter((_, index) => index !== i));
 *
 * ========================================================================
 * BACKGROUND: KEYS FOR ROWS THAT MOVE
 * ========================================================================
 * React uses each item's `key` to tell rows apart between renders.
 * Using the array index as the key goes wrong when rows are removed
 * from the middle: the row that WAS number 3 is now number 2, so React
 * thinks it is the old row 2. Inputs that keep any of their own state
 * (and focus) then end up in the wrong row. The fix is to give every
 * row its own id that never changes, and use that as the key:
 *
 *     type Row = { id: number; value: string };
 *     {rows.map((row) => <li key={row.id}>...</li>)}
 *
 * ========================================================================
 * WHAT YOUR TESTS CAN FIND
 * ========================================================================
 * Tests find elements by their ARIA role (what kind of thing it is) and
 * their accessible name (the text a screen reader reads out for it).
 * Your component must render exactly these:
 *
 * - A <form> with aria-label="Invite people" and `noValidate`.
 * - One <input type="email"> per row, labelled "Email 1", "Email 2", and
 *   so on, numbered from the top (role "textbox").
 * - Next to each input, a button named "Remove email 1", "Remove
 *   email 2"... Its visible text can be just "Remove" or "×" if you
 *   give it an aria-label with the full name.
 * - A button named "Add email" (type="button", so it doesn't submit).
 * - A submit button named "Send invites" (type="submit").
 * - When needed (rule 6), the text "Add at least one email" in an
 *   element with role="alert". Screen readers read alerts out at once.
 *
 * ========================================================================
 * THE RULES
 * ========================================================================
 * Your component must:
 * 1. Start with exactly one empty field, "Email 1".
 * 2. Add a new empty field at the end when "Add email" is clicked.
 * 3. Disable "Add email" when there are `max` fields (default 5).
 * 4. Remove that row when its "Remove email N" button is clicked. The
 *    rows below move up and are renumbered, and every other field keeps
 *    its text.
 * 5. Always keep at least one field: disable the remove button while
 *    only one field is left.
 * 6. On submit, call `event.preventDefault()`. Then collect the text of
 *    the fields from top to bottom, leaving out empty ones.
 *    - If that list is empty, show the "Add at least one email" alert
 *      and don't call onSubmit.
 *    - Otherwise, remove the alert (if shown) and call `onSubmit` once
 *      with the list.
 *
 * You can assume:
 * - `max` is at least 1.
 * - The emails don't need checking. Any text is fine.
 *
 * ========================================================================
 * EXAMPLES
 * ========================================================================
 * Each line shows what the user does, then what they should see.
 *
 *     <EmailListForm onSubmit={spy} />
 *       one field "Email 1", "Remove email 1" disabled
 *       click "Add email"        ->  "Email 1" and "Email 2"
 *       type a@x.io, b@x.io, add, type c@x.io in "Email 3"
 *       click "Remove email 2"   ->  "Email 1" a@x.io, "Email 2" c@x.io
 *       click "Send invites"     ->  spy(["a@x.io", "c@x.io"])
 *
 *     two fields, only "Email 2" filled with b@x.io, submit
 *       ->  spy(["b@x.io"])                   empty fields are skipped
 *
 *     one empty field, submit
 *       ->  alert "Add at least one email", spy not called
 *
 * ========================================================================
 * EDGE CASES TO TEST
 * ========================================================================
 * - At the start: one empty "Email 1", its remove button disabled
 * - "Add email" adds "Email 2", and both remove buttons are enabled
 * - "Add email" is disabled at `max` (try max={2})
 * - Removing the MIDDLE row keeps the right text in the other rows and
 *   renumbers them
 * - Removing down to one field disables the last remove button
 * - Submitting sends the non-empty values in order
 * - Submitting with only empty fields shows the alert and doesn't call
 *   onSubmit
 * - After a good submit the alert goes away
 * - The submit event's default is prevented
 *
 * ========================================================================
 * HINTS (read only if you get stuck)
 * ========================================================================
 * 1. Keep an array of rows in state: `{ id: number; value: string }[]`.
 *    The labels ("Email 2") come from the position in the array
 *    (`index + 1`), not from the id.
 * 2. For new ids, keep a counter that only goes up. A `useRef(1)`
 *    works (`nextId.current++`), or work it out as one more than the
 *    biggest id in the list.
 * 3. To link each label to its input you need a unique `id` attribute
 *    per row. Build it from the row id, for example `email-${row.id}`,
 *    or wrap the <input> inside its <label>.
 * 4. Keep a boolean in state for the alert. Set it in the submit handler.
 * 5. TESTING: `screen.getAllByRole("textbox")` returns the fields from
 *    top to bottom. `.map((input) => (input as HTMLInputElement).value)`
 *    turns them into their texts, ready for `toEqual([...])`.
 *    `fireEvent.submit(form)` returns `false` when the default was
 *    prevented.
 *
 * ========================================================================
 * REACT CONCEPTS TO LEARN
 * ========================================================================
 * - An array of objects in state: add, update, remove without mutating
 * - Why stable keys matter when rows are removed or reordered
 * - Deriving labels from positions
 * - Submitting a variable-length list from a form
 *
 * ========================================================================
 * STRETCH GOALS
 * ========================================================================
 * - Move focus into the new field after "Add email" (you'll need refs).
 * - Show an error under each field whose text isn't an email.
 * - Add "Move up" and "Move down" buttons for each row.
 */

import type { ReactElement } from "react";

export type EmailListFormProps = {
  /** Called with the non-empty emails, top to bottom, on a valid submit. */
  onSubmit: (emails: string[]) => void;
  /** The most fields allowed. Default 5. */
  max?: number;
};

export function EmailListForm({ onSubmit, max = 5 }: EmailListFormProps): ReactElement {
  // TODO: build me, then make your tests pass.
  throw new Error("Not implemented: EmailListForm");
}
