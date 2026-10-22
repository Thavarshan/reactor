/**
 * Exercise: Controlled Input
 * Level:    04 - Forms
 * Topics:   controlled inputs, value + onChange, deriving text from state
 *
 * ========================================================================
 * YOUR TASK
 * ========================================================================
 * Build a <NameGreeting> component: a "Name" text box and a greeting
 * that updates on every keystroke. A "Clear" button empties the box.
 *
 *     Name [ Ada            ]  [ Clear ]
 *
 *     Hello, Ada!
 *
 *     <NameGreeting initialName="Ada" />
 *
 * ========================================================================
 * BACKGROUND: CONTROLLED INPUTS
 * ========================================================================
 * An <input> normally keeps its own text, hidden away inside the
 * browser. A CONTROLLED input is different: React state holds the text,
 * and the input just shows it. Two props make this work:
 *
 * - `value` tells the input what to show (always the state).
 * - `onChange` runs on every keystroke. It receives an event, and
 *   `event.target.value` is the text the user wants to see.
 *
 *     const [city, setCity] = useState("");
 *
 *     <input value={city} onChange={(e) => setCity(e.target.value)} />
 *
 * Why bother? Because now the text lives in state, the rest of your
 * component can use it while the user types. And to change the text
 * from code (say, to empty it) you just set the state.
 *
 * Careful: `value` without `onChange` makes an input the user can't
 * type in. React warns you about this in the console.
 *
 * ========================================================================
 * WHAT YOUR TESTS CAN FIND
 * ========================================================================
 * Tests find elements by their ARIA role (what kind of thing it is,
 * like "button" or "textbox") and their accessible name (the text a
 * screen reader reads out for it). Your component must render exactly
 * these:
 *
 * - A text box named "Name". Use <label htmlFor="..."> with a matching
 *   `id` on the <input>, or wrap the input inside the <label>. The
 *   label's text becomes the input's accessible name.
 * - A button named "Clear".
 * - The greeting inside an element with role="status", for example
 *   <p role="status">Hello, Ada!</p>. Screen readers announce changes
 *   to a status element.
 *
 * ========================================================================
 * THE RULES
 * ========================================================================
 * Your component must:
 * 1. Accept one optional prop, `initialName` (default ""). The text box
 *    starts with this text in it.
 * 2. Keep the text box controlled: its `value` always comes from state.
 * 3. Show "Hello, <name>!" in the status element, using the text from
 *    the box with spaces trimmed off both ends. It updates on every
 *    keystroke.
 * 4. Show "Hello, stranger!" when the trimmed text is empty.
 * 5. Empty the text box when "Clear" is clicked.
 * 6. Disable "Clear" (the HTML `disabled` attribute) when the text box
 *    is completely empty (""). A box holding only spaces is NOT empty,
 *    so "Clear" stays enabled.
 *
 * You can assume:
 * - `initialName` is a string. It may be empty or only spaces.
 *
 * ========================================================================
 * EXAMPLES
 * ========================================================================
 * Each line shows what the user does, then what they should see.
 *
 *     <NameGreeting />
 *       shows "Hello, stranger!", "Clear" disabled   the box is empty
 *       type "Ada"   ->  "Hello, Ada!"                live, per keystroke
 *       click Clear  ->  box empty, "Hello, stranger!"
 *
 *     <NameGreeting initialName="Grace" />
 *       the box shows "Grace", the greeting says "Hello, Grace!"
 *
 *     <NameGreeting />
 *       type "  Bo  "  ->  "Hello, Bo!"      the box still shows "  Bo  "
 *
 * ========================================================================
 * EDGE CASES TO TEST
 * ========================================================================
 * - No props: the box is empty, "Hello, stranger!", "Clear" disabled
 * - `initialName` fills the box and the greeting
 * - The greeting changes after each letter: type "A", check
 *   "Hello, A!", then type "l" and check "Hello, Al!"
 * - Spaces around the name are trimmed in the greeting, but the box
 *   keeps exactly what was typed
 * - Only spaces: "Hello, stranger!", and "Clear" is enabled
 * - Clear empties the box, resets the greeting, and disables itself
 * - Typing after Clear works normally
 * - Deleting all the text by hand acts just like Clear
 *
 * ========================================================================
 * HINTS (read only if you get stuck)
 * ========================================================================
 * 1. One piece of state is enough: the text in the box. The greeting
 *    is worked out from it on every render, so it is not state.
 * 2. `name.trim()` removes spaces from both ends.
 *    `name.trim() || "stranger"` picks "stranger" when the trimmed text
 *    is empty.
 * 3. Clear doesn't touch the input element at all. It sets the state,
 *    and the controlled input follows.
 * 4. TESTING: `await user.type(box, "Ada")` types letter by letter.
 *    `expect(box).toHaveValue("Ada")` checks what an input shows.
 *    `await user.clear(box)` empties a box the way a user would.
 *
 * ========================================================================
 * REACT CONCEPTS TO LEARN
 * ========================================================================
 * - Controlled inputs: `value` + `onChange`
 * - `event.target.value` in a change handler
 * - Deriving display text from state instead of storing it twice
 * - Linking a <label> to an <input> for an accessible name
 *
 * ========================================================================
 * STRETCH GOALS
 * ========================================================================
 * - After Clear, move the keyboard focus back into the box. You'll
 *   need a ref (look up useRef and `ref.current.focus()`).
 * - Show "Hello, Ada! (3 letters)" with the length of the trimmed name.
 * - Make the greeting say "Good morning" or "Good evening" based on
 *   the time of day (pass the hour in as a prop so it stays testable).
 */

import type { ReactElement } from "react";

export type NameGreetingProps = {
  /** The text the "Name" box starts with. Default "". */
  initialName?: string;
};

export function NameGreeting({ initialName = "" }: NameGreetingProps): ReactElement {
  // TODO: build me, then make your tests pass.
  throw new Error("Not implemented: NameGreeting");
}
