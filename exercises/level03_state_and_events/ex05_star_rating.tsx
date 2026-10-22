/**
 * Exercise: Star Rating
 * Level:    03 - State and Events
 * Topics:   two pieces of state, mouse events, hover preview, clearing a value
 *
 * ========================================================================
 * YOUR TASK
 * ========================================================================
 * Build a <StarRating>: five stars the user clicks to rate something.
 * Hovering previews a rating, clicking sets it, and clicking the
 * current rating again clears it.
 *
 *     ★ ★ ★ ☆ ☆        3 out of 5
 *
 *     <StarRating onChange={(stars) => save(stars)} />
 *
 * ========================================================================
 * BACKGROUND: MORE THAN ONE PIECE OF STATE
 * ========================================================================
 * A component can call useState as many times as it needs. Each call is
 * a separate, independent value:
 *
 *     const [name, setName] = useState("");
 *     const [isEditing, setIsEditing] = useState(false);
 *
 * This rating has two different things to remember: the rating the user
 * CHOSE, and the star the mouse is OVER right now (if any). What the
 * stars show is worked out from both.
 *
 * Mouse events in React:
 *
 *     onMouseEnter   the pointer moved onto this element
 *     onMouseLeave   the pointer left this element (and its children)
 *
 * Put onMouseLeave on the box AROUND all the stars, not on each star.
 * Otherwise moving from star 2 to star 3 briefly "leaves" and the
 * preview flickers.
 *
 * ========================================================================
 * WHAT YOUR TESTS CAN FIND
 * ========================================================================
 * - An element with role="group" named by `label` (default "Rating")
 *   around the stars: getByRole("group", { name: "Rating" }).
 * - One <button type="button"> per star, named "1 star", "2 stars",
 *   ... "5 stars" (aria-label). Note the singular "1 star".
 * - Each star's text is "★" (filled) or "☆" (empty), and nothing else.
 *   So joining all the buttons' text gives "★★★☆☆" for 3.
 * - An element with role="status" showing "3 out of 5", or "No rating"
 *   when the rating is 0.
 *
 * ========================================================================
 * THE RULES
 * ========================================================================
 * Your component must:
 * 1. Show `max` stars (default 5) and start at `defaultValue` (default
 *    0, meaning no rating).
 * 2. Fill stars 1 to N (★) and leave the rest empty (☆), where N is the
 *    hovered star while the mouse is over a star, and the rating
 *    otherwise.
 * 3. Set the rating to N when star N is clicked.
 * 4. Clear the rating to 0 when the star that equals the current rating
 *    is clicked.
 * 5. Show the rating (NOT the hover preview) in the status element.
 * 6. Go back to showing the rating when the mouse leaves the group.
 * 7. Call the optional `onChange` with the new rating (0 when cleared)
 *    after each click. Hovering never calls it.
 *
 * You can assume:
 * - `max` is at least 1 and `defaultValue` is between 0 and `max`.
 *
 * ========================================================================
 * EXAMPLES
 * ========================================================================
 *     <StarRating />
 *       ☆☆☆☆☆, "No rating"
 *       hover "4 stars"      ->  ★★★★☆, still "No rating"     a preview
 *       mouse leaves         ->  ☆☆☆☆☆
 *       click "3 stars"      ->  "3 out of 5"
 *       click "3 stars"      ->  "No rating"                  cleared
 *
 *     <StarRating defaultValue={4} />
 *       ★★★★☆, "4 out of 5"
 *       hover "1 star"       ->  ★☆☆☆☆        the preview can be lower
 *       click "2 stars"      ->  "2 out of 5"
 *
 *     <StarRating onChange={spy} />
 *       hover "4 stars"      ->  spy not called
 *       click "4 stars"      ->  spy called with 4
 *       click "4 stars"      ->  spy called with 0
 *
 * ========================================================================
 * EDGE CASES TO TEST
 * ========================================================================
 * - 5 buttons named "1 star", "2 stars" ... "5 stars"
 * - A group named "Rating", or named by the label prop
 * - Starts as ☆☆☆☆☆ and "No rating". defaultValue={2} gives ★★☆☆☆ and
 *   "2 out of 5"
 * - Click "3 stars", mouse leaves: ★★★☆☆ and "3 out of 5"
 * - Clicking a different star changes the rating
 * - Clicking the same star twice clears it: "No rating", and ☆☆☆☆☆
 *   once the mouse leaves
 * - Hover previews more stars, and fewer stars, without changing the
 *   status
 * - Hover follows the mouse: "2 stars" then "5 stars"
 * - After the mouse leaves, the stars show the rating again
 * - onChange gets 4, then 0, exactly twice. Never on hover or on the
 *   first render
 * - max={3} defaultValue={3}: 3 buttons and "3 out of 3"
 * - Keyboard: Tab, Tab focuses "2 stars", Enter sets "2 out of 5"
 * - Every star has type="button"
 *
 * ========================================================================
 * HINTS (read only if you get stuck)
 * ========================================================================
 * 1. Two states: `value` (a number) and `hovered` (a number, or null
 *    when the mouse isn't over a star).
 * 2. The number of filled stars is `hovered ?? value`. The `??`
 *    operator picks the right side only when the left is null or
 *    undefined (unlike `||`, which would also skip a 0).
 * 3. `Array.from({ length: max }, (_, i) => i + 1)` gives [1, 2, ..., max]
 *    to map over.
 * 4. On click: `const next = star === value ? 0 : star;`, then set it
 *    and call onChange with it.
 * 5. TESTING: `await user.hover(star)` moves the mouse onto an element
 *    and `await user.unhover(group)` moves it off. A small helper makes
 *    the stars easy to check:
 *    `screen.getAllByRole("button").map((b) => b.textContent).join("")`
 *    then `expect(...).toBe("★★★☆☆")`.
 * 6. TESTING: after a click the mouse is still over that star, so the
 *    stars show the hover preview. Unhover the group before checking
 *    the stars against the rating.
 *
 * ========================================================================
 * REACT CONCEPTS TO LEARN
 * ========================================================================
 * - Several independent pieces of state in one component
 * - Deriving what to show from more than one state
 * - onMouseEnter / onMouseLeave, and where to attach them
 * - The ?? operator versus ||
 *
 * ========================================================================
 * STRETCH GOALS
 * ========================================================================
 * - Preview on keyboard focus too (onFocus / onBlur).
 * - Rebuild it as a radio group (role="radiogroup" with role="radio"
 *   stars and arrow keys), which is the ARIA pattern for a rating. How
 *   would "click again to clear" work then?
 * - Allow half stars.
 */

import type { ReactElement } from "react";

export type StarRatingProps = {
  /** How many stars. Default 5. */
  max?: number;
  /** The starting rating, 0 for none. Default 0. */
  defaultValue?: number;
  /** The group's accessible name. Default "Rating". */
  label?: string;
  /** Called with the new rating (0 when cleared) after each click. */
  onChange?: (value: number) => void;
};

export function StarRating({ max = 5, defaultValue = 0, label = "Rating", onChange }: StarRatingProps): ReactElement {
  // TODO: build me, then make your tests pass.
  throw new Error("Not implemented: StarRating");
}
