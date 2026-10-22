/**
 * Exercise: Key Bugs
 * Level:    10 - Performance
 * Topics:   keys, list identity, uncontrolled inputs, proving a bug with tests
 *
 * ========================================================================
 * YOUR TASK
 * ========================================================================
 * Below is a PROVIDED <BuggyGuestList>. It uses each row's position (its
 * index) as the key, and that makes typed notes jump to the wrong guest
 * when the list changes order. First write tests that prove the bug in
 * BuggyGuestList. Then build <GuestList>, which looks and works the same
 * but uses stable ids as keys, and write tests that prove it's fixed.
 *
 *     New guest: [ Dee      ]  [ Add to top ]      [ Reverse order ]
 *
 *     Guests
 *     - Note for Ada: [ vegetarian ]   [ Remove Ada ]
 *     - Note for Bob: [            ]   [ Remove Bob ]
 *     - Note for Cy:  [            ]   [ Remove Cy ]
 *
 *     <GuestList initialGuests={[{ id: 1, name: "Ada" }, ...]} />
 *
 * ========================================================================
 * BACKGROUND: WHAT A KEY IS FOR
 * ========================================================================
 * When a list re-renders (draws again), React has to match each new
 * item with an item from last time. That's how it knows which DOM
 * elements and which state to keep. The `key` is the name tag it uses
 * to match them.
 *
 * With `key={index}`, the name tag is the position: "row 0", "row 1".
 * Reverse the list, and "row 0" is still "row 0" to React. It keeps the
 * same DOM elements in the same place and only changes the text around
 * them. Anything React doesn't control, like what you typed into an
 * input without `value`, stays where it was. So the note stays in row 0,
 * but row 0 is now a different guest.
 *
 * With `key={guest.id}`, the name tag travels with the guest. React
 * moves the DOM elements along with it, typed text and all.
 *
 *     {people.map((p, i) => <Row key={i} ... />)}     // position: buggy
 *     {people.map((p) => <Row key={p.id} ... />)}     // identity: correct
 *
 * Index keys are only safe when the list never reorders, never has
 * items inserted or removed in the middle, and rows hold no state.
 *
 * The inputs here are "uncontrolled": the browser keeps the typed text,
 * not React state. That's on purpose, because it makes the bug visible.
 *
 * ========================================================================
 * WHAT YOUR TESTS CAN FIND
 * ========================================================================
 * Both components render exactly the same things:
 * - A textbox labelled "New guest" and a button named "Add to top".
 * - A button named "Reverse order".
 * - A list named "Guests" (<ul aria-label="Guests">) with one listitem
 *   per guest. Each listitem holds:
 *   - a textbox labelled "Note for <name>", e.g. "Note for Ada"
 *     (<label>Note for Ada <input /></label>), with no `value` prop
 *   - a button named "Remove <name>"
 *
 * ========================================================================
 * THE RULES
 * ========================================================================
 * Your GuestList must:
 * 1. Start with `initialGuests` in state, in that order.
 * 2. Render the list as described, keyed by `guest.id`. Never by index.
 * 3. "Reverse order" reverses the order of the guests.
 * 4. "Remove <name>" removes that guest.
 * 5. "Add to top" adds a guest with the trimmed "New guest" text at the
 *    top of the list, with a new id that no other guest has, then clears
 *    the box. If the trimmed text is empty, do nothing.
 * 6. Keep each typed note with its guest when the list is reversed, a
 *    guest is removed, or a guest is added.
 *
 * Your tests must also show that BuggyGuestList gets 6 wrong. A test
 * that proves a bug passes while the bug is there. It documents the
 * broken behaviour.
 *
 * You can assume:
 * - Guest names are unique, and ids in `initialGuests` are unique.
 *
 * ========================================================================
 * EXAMPLES
 * ========================================================================
 * Guests Ada, Bob, Cy. Type "vegetarian" into "Note for Ada", then:
 *
 *                       BuggyGuestList (key=index)  GuestList (key=id)
 *     Reverse order     "Note for Cy" has it         "Note for Ada" has it
 *     Remove Ada        "Note for Bob" has it        Ada is gone, Bob ""
 *     Add "Dee" to top  "Note for Dee" has it        "Note for Ada" has it
 *
 * ========================================================================
 * EDGE CASES TO TEST
 * ========================================================================
 * - Buggy: after "Reverse order", the note shows under the wrong guest
 * - Buggy: after removing the guest with the note, the next guest
 *   "inherits" it
 * - Buggy: after "Add to top", the new guest gets the first note
 * - Fixed: the note stays with its guest after reverse, remove and add
 * - Fixed: names are in the right order after "Reverse order"
 * - Fixed: "Add to top" puts the new name first and clears the box
 * - Fixed: "Add to top" with "   " adds nothing
 * - Fixed: two guests added in a row both appear, with separate notes
 *
 * ========================================================================
 * HINTS (read only if you get stuck)
 * ========================================================================
 * 1. Start by reading BuggyGuestList. Your GuestList can begin as a copy
 *    of it. The fix is small. Finding and proving the bug is the lesson.
 * 2. For a new id, use one bigger than the biggest id so far:
 *    `Math.max(0, ...guests.map((g) => g.id)) + 1`.
 * 3. Reverse without mutating: `[...guests].reverse()`. The plain
 *    `.reverse()` changes the array in state, which React can't notice.
 * 4. TESTING: find a row's input by its label,
 *    `screen.getByRole("textbox", { name: "Note for Ada" })`, type into
 *    it, change the list, then find the boxes again and check them with
 *    `toHaveValue("vegetarian")` or `toHaveValue("")`.
 * 5. TESTING: to check order, read every listitem's text:
 *    `screen.getAllByRole("listitem").map((li) => li.textContent)`, or
 *    use `toHaveTextContent` on each one.
 *
 * ========================================================================
 * REACT CONCEPTS TO LEARN
 * ========================================================================
 * - What keys do: matching items between renders
 * - Why index keys break reordering, inserting and removing
 * - Uncontrolled inputs keep their own value in the DOM
 * - Writing a test that proves a bug before you fix it
 *
 * ========================================================================
 * STRETCH GOALS
 * ========================================================================
 * - Make the notes controlled: keep them in state as `{ [id]: text }`.
 *   Does the bug still happen with index keys? Why not?
 * - Use `crypto.randomUUID()` for ids instead. Why should ids never be
 *   made during render, like `key={Math.random()}`?
 */

import { useState, type ReactElement } from "react";

export type Guest = {
  id: number;
  name: string;
};

export type GuestListProps = {
  /** The guests to start with, in order. */
  initialGuests: Guest[];
};

/**
 * PROVIDED: you don't need to change this. It has the bug on purpose.
 * Same UI as GuestList, but each row's key is its index.
 */
export function BuggyGuestList({ initialGuests }: GuestListProps) {
  const [guests, setGuests] = useState(initialGuests);
  const [newName, setNewName] = useState("");

  function addToTop() {
    const name = newName.trim();
    if (name === "") return;
    const id = Math.max(0, ...guests.map((g) => g.id)) + 1;
    setGuests([{ id, name }, ...guests]);
    setNewName("");
  }

  return (
    <div>
      <label>
        New guest <input value={newName} onChange={(e) => setNewName(e.target.value)} />
      </label>
      <button type="button" onClick={addToTop}>
        Add to top
      </button>
      <button type="button" onClick={() => setGuests([...guests].reverse())}>
        Reverse order
      </button>
      <ul aria-label="Guests">
        {guests.map((guest, index) => (
          // The bug: the key is the position, not the guest.
          <li key={index}>
            <label>
              Note for {guest.name} <input />
            </label>{" "}
            <button type="button" onClick={() => setGuests(guests.filter((g) => g.id !== guest.id))}>
              Remove {guest.name}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function GuestList({ initialGuests }: GuestListProps): ReactElement {
  // TODO: build me, then make your tests pass.
  throw new Error("Not implemented: GuestList");
}
