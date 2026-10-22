/**
 * Exercise: Search Filter
 * Level:    04 - Forms
 * Topics:   filtering a list while typing, derived data, case-insensitive
 *           matching, empty results
 *
 * ========================================================================
 * YOUR TASK
 * ========================================================================
 * Build a <SearchFilter>: a search box above a list. As the user types,
 * the list shrinks to the items that contain the typed text. When
 * nothing matches, say so.
 *
 *     Search [ an        ]
 *     2 results
 *     - Banana
 *     - Mango
 *
 *     <SearchFilter items={["Apple", "Banana", "Cherry", "Mango"]} />
 *
 * ========================================================================
 * BACKGROUND: DERIVED DATA
 * ========================================================================
 * It is tempting to keep the filtered list in state too, and update it
 * whenever the text changes. Don't. Two pieces of state that must
 * always agree WILL drift apart one day. Keep the smallest state you
 * need (here: the text in the box), and work everything else out while
 * rendering. A tiny example with numbers:
 *
 *     const [minimum, setMinimum] = useState(0);
 *     const bigOnes = numbers.filter((n) => n >= minimum); // not state!
 *
 * Every keystroke changes the state, React re-renders (runs your
 * component function again), and the list is worked out afresh.
 *
 * ========================================================================
 * WHAT YOUR TESTS CAN FIND
 * ========================================================================
 * Tests find elements by their ARIA role (what kind of thing it is) and
 * their accessible name (the text a screen reader reads out for it).
 * Your component must render exactly these:
 *
 * - An <input type="search"> with a label. Its role is "searchbox" and
 *   its name is the `label` prop (default "Search").
 * - The matches as a <ul> (role "list") with one <li> (role
 *   "listitem") per match, holding just the item text.
 * - An element with role="status" that always shows one of:
 *      "3 results"   (any number other than 1)
 *      "1 result"
 *      `No results for "kiwi"`   (with the trimmed search text)
 *   Screen readers announce changes to a status element, so users hear
 *   how many matches there are.
 *
 * ========================================================================
 * THE RULES
 * ========================================================================
 * Your component must:
 * 1. Start with an empty search box and show every item.
 * 2. Keep the search box controlled (its `value` comes from state).
 * 3. Show only the items that contain the search text, ignoring
 *    upper and lower case, anywhere in the item ("an" matches "Banana"
 *    and "Mango").
 * 4. Trim spaces off both ends of the search text before matching. A
 *    box with only spaces counts as empty, so every item shows.
 * 5. Keep the items in their original order.
 * 6. Show the count in the status element, as described above.
 * 7. When nothing matches, render NO list at all, and show
 *    `No results for "<text>"` in the status element.
 *
 * You can assume:
 * - `items` has at least one item, and no two items are the same.
 *
 * ========================================================================
 * EXAMPLES
 * ========================================================================
 * Each line shows what the user does, then what they should see.
 *
 *     <SearchFilter items={["Apple", "Banana", "Cherry", "Mango"]} />
 *       empty box       ->  all 4 items, "4 results"
 *       type "an"       ->  Banana, Mango, "2 results"
 *       type "AP"       ->  Apple, "1 result"      case doesn't matter
 *       type "kiwi"     ->  no list, `No results for "kiwi"`
 *       type " ch "     ->  Cherry                 spaces trimmed
 *
 *     <SearchFilter items={...} label="Find a fruit" />
 *       the search box is named "Find a fruit"
 *
 * ========================================================================
 * EDGE CASES TO TEST
 * ========================================================================
 * - An empty box shows every item, in order, with the right count
 * - Matching ignores case both ways (typed "AP", item "apple" also works)
 * - The text can match in the middle of an item, not just the start
 * - Exactly one match says "1 result" (singular)
 * - No match: no list, and `No results for "kiwi"`
 * - Spaces around the text are ignored, and only spaces show everything
 * - Deleting the text brings every item back
 * - The `label` prop names the search box
 *
 * ========================================================================
 * HINTS (read only if you get stuck)
 * ========================================================================
 * 1. State: just the text in the box. The visible list and the count
 *    are worked out from it on every render.
 * 2. Compare lower-case versions:
 *    `item.toLowerCase().includes(query.trim().toLowerCase())`.
 *    Every string includes the empty string "", so an empty search
 *    keeps every item without any special case.
 * 3. `{matches.length > 0 && <ul>...</ul>}` renders the list only when
 *    there is something in it.
 * 4. TESTING: get the shown items with
 *    `screen.getAllByRole("listitem").map((li) => li.textContent)` and
 *    compare to an array with `toEqual`. To check that something is
 *    NOT on screen, use `queryByRole` (it returns null instead of
 *    throwing) with `.not.toBeInTheDocument()`.
 *
 * ========================================================================
 * REACT CONCEPTS TO LEARN
 * ========================================================================
 * - Deriving a filtered list during render instead of storing it
 * - Rendering lists with `map` and a `key`
 * - Conditional rendering of the list and the empty message
 * - role="status" for counts that change
 *
 * ========================================================================
 * STRETCH GOALS
 * ========================================================================
 * - Highlight the matching part of each item with a <mark> element.
 * - Add a "Clear search" button that only shows when there is text.
 * - Accept `items` as objects ({ id, name, tags }) and match the tags
 *   too.
 */

import type { ReactElement } from 'react';

export type SearchFilterProps = {
  /** The items to search through, shown in this order. */
  items: string[];
  /** The accessible name of the search box. Default "Search". */
  label?: string;
};

export function SearchFilter({
  items,
  label = 'Search',
}: SearchFilterProps): ReactElement {
  // TODO: build me, then make your tests pass.
  throw new Error('Not implemented: SearchFilter');
}
