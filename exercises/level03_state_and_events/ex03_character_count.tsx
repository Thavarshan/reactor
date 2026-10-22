/**
 * Exercise: Character Count
 * Level:    03 - State and Events
 * Topics:   controlled textarea, onChange, derived values, live regions, maxLength
 *
 * ========================================================================
 * YOUR TASK
 * ========================================================================
 * Build a <CharacterCount>: a text box with a counter under it, like the
 * one under a social media post. When the user gets close to the limit,
 * a warning appears.
 *
 *     Bio
 *     +--------------------------------+
 *     | Hello, world                   |
 *     +--------------------------------+
 *     12 / 100
 *
 *     (later, near the limit)
 *     95 / 100
 *     5 characters left
 *
 *     <CharacterCount label="Bio" maxLength={100} />
 *
 * ========================================================================
 * BACKGROUND: CONTROLLED INPUTS
 * ========================================================================
 * A CONTROLLED input is one whose value lives in React state. React
 * sets the value, and every keystroke goes through your onChange
 * handler, which stores the new text:
 *
 *     const [name, setName] = useState("");
 *     <input value={name} onChange={(e) => setName(e.target.value)} />
 *
 * Now `name` is always up to date, so anything you work out from it
 * (its length, a warning...) updates on every keystroke. A <textarea>
 * works exactly the same way in React, with `value` and `onChange`.
 *
 * Don't store values you can work out from other state. The text's
 * length is `text.length`. It never needs its own useState.
 *
 * A LIVE REGION is an element whose changes screen readers announce on
 * their own. role="status" makes a polite one: it speaks when the user
 * pauses. Screen readers only notice changes to a live region that was
 * ALREADY on the page, so render it from the start (empty is fine) and
 * change only its text.
 *
 * ========================================================================
 * WHAT YOUR TESTS CAN FIND
 * ========================================================================
 * - A <textarea> (role "textbox") named by `label` with a <label>:
 *   screen.getByRole("textbox", { name: "Bio" }). It has the HTML
 *   `maxLength` attribute set to the maxLength prop.
 * - The counter text, exactly "12 / 100" (length, space, slash, space,
 *   maxLength), found with getByText("12 / 100").
 * - The textarea's ACCESSIBLE DESCRIPTION (extra help text a screen
 *   reader reads after the name) is the counter. Link them with
 *   aria-describedby="<the counter's id>".
 * - An element with role="status" that is ALWAYS on the page. It's empty
 *   while there's plenty of room, and shows the warning otherwise.
 *
 * ========================================================================
 * THE RULES
 * ========================================================================
 * Your component must:
 * 1. Start with `defaultValue` (default "") in the textarea.
 * 2. Show "<length> / <maxLength>" and update it on every change.
 *    `maxLength` defaults to 100.
 * 3. Set the textarea's maxLength attribute, so the browser itself
 *    stops the user at the limit (typing AND pasting).
 * 4. When FEWER than 10 characters are left, show "N characters left"
 *    in the status element. Use "1 character left" (singular) for one.
 *    With 10 or more left, the status element is empty.
 * 5. Describe the textarea with the counter (aria-describedby).
 *
 * You can assume:
 * - `defaultValue` is never longer than `maxLength`.
 * - "Characters" means JavaScript string length (`text.length`), the
 *   same thing the maxLength attribute counts.
 *
 * ========================================================================
 * EXAMPLES
 * ========================================================================
 *     <CharacterCount label="Bio" />
 *       "0 / 100", status empty
 *       type "Hello, world"  ->  "12 / 100"
 *
 *     <CharacterCount label="Bio" maxLength={20} defaultValue="0123456789" />
 *       "10 / 20", status empty                10 left is not FEWER than 10
 *       type "a"          ->  "9 characters left"
 *       press Backspace   ->  status empty again
 *
 *     <CharacterCount label="Bio" maxLength={5} />
 *       "5 characters left" from the start
 *       type "abcdefgh"   ->  textarea holds "abcde", "5 / 5",
 *                             "0 characters left"
 *
 *     maxLength 5, defaultValue "abcd"  ->  "1 character left"
 *
 * ========================================================================
 * EDGE CASES TO TEST
 * ========================================================================
 * - First render: a labelled TEXTAREA and "0 / 100"
 * - Typing "Hello, world" shows "12 / 100" and that value
 * - "abc" then Backspace shows "2 / 100". Clearing shows "0 / 100"
 * - maxLength={20}: "0 / 20" and maxlength="20" on the textarea
 * - defaultValue="Hi": that value and "2 / 100"
 * - The accessible description is "0 / 100", then "3 / 100" after
 *   typing "abc"
 * - Exactly 10 left: status empty. 9 left: "9 characters left"
 * - 1 left: "1 character left" (no "characters")
 * - Full: "0 characters left"
 * - Deleting back to 10 left empties the status
 * - A small maxLength (5) warns from the start
 * - Typing past maxLength stops at maxLength
 * - Pasting past maxLength also stops at maxLength
 * - Spaces and new lines count: "a b", Enter, "c" is 5 characters
 *
 * ========================================================================
 * HINTS (read only if you get stuck)
 * ========================================================================
 * 1. One piece of state: the text. Everything else (the length, how
 *    many are left, the warning) is worked out from it on each render.
 * 2. `const left = maxLength - text.length;` then build the warning
 *    string, or "" when `left` is 10 or more.
 * 3. Call `useId()` once and build two ids from it: one for the
 *    textarea (for the label's htmlFor) and one for the counter, e.g.
 *    `${id}-counter`.
 * 4. In JSX, write `maxLength={maxLength}` (capital L). React turns it
 *    into the HTML attribute `maxlength`.
 * 5. TESTING: `user.type(box, "abc{Backspace}")` types and deletes.
 *    `user.clear(box)` empties it. To paste, click the box first, then
 *    `await user.paste("abcdefgh")`. `user.type` and `user.paste` both
 *    respect the maxLength attribute, like a real browser.
 * 6. TESTING: `toHaveAccessibleDescription("0 / 100")` checks the
 *    description, and `toBeEmptyDOMElement()` checks that the status
 *    element is empty.
 *
 * ========================================================================
 * REACT CONCEPTS TO LEARN
 * ========================================================================
 * - Controlled inputs: value + onChange
 * - Deriving values from state instead of storing them
 * - Live regions (role="status") that exist before they change
 * - aria-describedby, and useId for linked ids
 *
 * ========================================================================
 * STRETCH GOALS
 * ========================================================================
 * - Add a `warnAt` prop (default 10) instead of the fixed 10.
 * - Count emoji as one character each with `[...text].length`. Why does
 *   "😀".length give 2? What does that mean for the maxLength
 *   attribute?
 * - Turn the counter red with a CSS class while the warning shows.
 */

import type { ReactElement } from "react";

export type CharacterCountProps = {
  /** The textarea's label, e.g. "Bio". */
  label: string;
  /** The most characters allowed. Default 100. */
  maxLength?: number;
  /** The text the textarea starts with. Default "". */
  defaultValue?: string;
};

export function CharacterCount({ label, maxLength = 100, defaultValue = "" }: CharacterCountProps): ReactElement {
  // TODO: build me, then make your tests pass.
  throw new Error("Not implemented: CharacterCount");
}
