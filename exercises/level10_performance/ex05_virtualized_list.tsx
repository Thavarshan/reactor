/**
 * Exercise: Virtualized List
 * Level:    10 - Performance
 * Topics:   windowing, scroll events, derived values, inline styles, aria-setsize
 *
 * ========================================================================
 * YOUR TASK
 * ========================================================================
 * Build a <VirtualList> that can show 10,000 rows without putting 10,000
 * elements on the page. It renders only the rows you can currently see
 * in its scroll box, and swaps them as you scroll.
 *
 *     +---------------------------+  <- the scroll box, `height` px tall
 *     | Item 26                   |
 *     | Item 27                   |     only these rows exist in the DOM
 *     | Item 28                   |
 *     | Item 29                   |
 *     | Item 30                   |
 *     +---------------------------+
 *       (the other 995 rows are just empty space above and below)
 *
 *     <VirtualList label="Items" items={items} rowHeight={20} height={100} />
 *
 * ========================================================================
 * BACKGROUND: WINDOWING
 * ========================================================================
 * Every element on the page costs memory and time. A list of 10,000
 * rows takes a long time to render (to draw), even though only a few
 * fit on screen. "Windowing" (or "virtualizing") renders only what's
 * inside the visible window.
 *
 * The trick has three parts:
 *
 * 1. A scroll box with a fixed height and `overflow-y: auto`.
 * 2. Inside it, one tall empty "spacer" as tall as all the rows would
 *    be. That makes the scrollbar look and work like the full list.
 * 3. Only the visible rows, placed inside the spacer with
 *    `position: absolute` at the height where they belong.
 *
 * When the box scrolls, its `scrollTop` says how many pixels are hidden
 * above the top edge. Which rows are visible is simple arithmetic:
 *
 *     rows 0-4 are 0-99px, rows 5-9 are 100-199px, and so on
 *     scrollTop 100, rowHeight 20  ->  the first visible row is 100 / 20 = 5
 *
 * In React, an inline style is an object. Numbers become pixels:
 *
 *     <div style={{ position: "absolute", top: 40, height: 20 }} />
 *     //  becomes style="position: absolute; top: 40px; height: 20px;"
 *
 * ========================================================================
 * WHAT YOUR TESTS CAN FIND
 * ========================================================================
 * - The scroll box: a <div role="list" aria-label={label}> with inline
 *   style `height: <height>px` and `overflow-y: auto`.
 * - Its only child: the spacer <div>, with inline style
 *   `position: relative` and `height: <items.length * rowHeight>px`.
 * - Inside the spacer, one <div role="listitem"> per rendered row, in
 *   order. Each one:
 *   - has the item's text, e.g. "Item 26"
 *   - has inline style `position: absolute`, `top: <index * rowHeight>px`
 *     and `height: <rowHeight>px` (index counts from 0)
 *   - has aria-posinset={index + 1} and aria-setsize={items.length}.
 *     These tell a screen reader "row 26 of 1000", even though most
 *     rows aren't in the page.
 *
 * ========================================================================
 * THE RULES
 * ========================================================================
 * Your component must:
 * 1. Keep `scrollTop` in state, starting at 0. Update it from the scroll
 *    box's onScroll event: `event.currentTarget.scrollTop`.
 * 2. Work out the visible range on every render:
 *      first = Math.floor(scrollTop / rowHeight)
 *      last  = Math.ceil((scrollTop + height) / rowHeight) - 1
 * 3. Widen the range by `overscan` rows on each side (default 0). Extra
 *    rows hide flicker when scrolling fast.
 * 4. Clamp the range to real rows: never below 0, never past the last
 *    item.
 * 5. Render only the rows from first to last (inclusive), as described
 *    above.
 *
 * You can assume:
 * - rowHeight and height are positive whole numbers.
 * - scrollTop never goes past the end (browsers stop it there).
 *
 * ========================================================================
 * EXAMPLES
 * ========================================================================
 * 1,000 items "Item 1" to "Item 1000", rowHeight 20, height 100:
 *
 *     at the top                  ->  Item 1 to Item 5 (5 rows)
 *     scroll to 500               ->  Item 26 to Item 30
 *                                     (500 / 20 = index 25 = "Item 26")
 *     scroll to 510               ->  Item 26 to Item 31 (6 rows: the
 *                                     top and bottom ones are cut off)
 *     overscan={2}, scroll to 500 ->  Item 24 to Item 32
 *     overscan={2}, at the top    ->  Item 1 to Item 7 (nothing above 0)
 *     scroll to 19900 (the end)   ->  Item 996 to Item 1000
 *
 *     3 items, height 100         ->  all 3 rows (nothing to hide)
 *
 * ========================================================================
 * EDGE CASES TO TEST
 * ========================================================================
 * - 1,000 items: only 5 listitems at first, "Item 1" to "Item 5"
 * - Scroll box style: height 100px and overflow-y auto
 * - Spacer height: 20000px for 1,000 rows of 20px
 * - Row 26 is placed at top 500px with height 20px
 * - aria-posinset and aria-setsize on a row, e.g. 26 and 1000
 * - Scrolling to 500 shows Item 26 to Item 30, and Item 1 is gone
 * - A scroll position between rows (510) shows 6 rows
 * - overscan adds rows on both sides, but never before the first item
 * - Scrolled to the very end: the last row is "Item 1000", nothing after
 * - Fewer items than fit: all of them render
 * - No items: no listitems, spacer height 0px
 *
 * ========================================================================
 * HINTS (read only if you get stuck)
 * ========================================================================
 * 1. The range isn't state. Only scrollTop is. Everything else is worked
 *    out from it during render.
 * 2. Build the list of indexes with a loop from first to last, then map
 *    each index to a row. Use the index as the key here: each key means
 *    "the row for item N", and it doesn't move.
 * 3. Clamp with Math.max(0, ...) and Math.min(items.length - 1, ...).
 * 4. TESTING: jsdom (the fake browser in tests) doesn't do layout, so it
 *    never scrolls by itself. Fake a scroll and set scrollTop in one go:
 *
 *        fireEvent.scroll(screen.getByRole("list"), {
 *          target: { scrollTop: 500 },
 *        });
 *
 * 5. TESTING: `expect(row).toHaveStyle({ top: "500px" })` checks an
 *    inline style. The spacer is `screen.getByRole("list").firstElementChild`.
 *
 * ========================================================================
 * REACT CONCEPTS TO LEARN
 * ========================================================================
 * - Rendering less: windowing a long list
 * - Scroll events and event.currentTarget
 * - Inline style objects
 * - Keeping only the source value in state and deriving the rest
 * - aria-setsize / aria-posinset for partly rendered lists
 *
 * ========================================================================
 * STRETCH GOALS
 * ========================================================================
 * - Support keyboard scrolling: give the box tabIndex={0} so it can be
 *   focused, and check that arrow keys scroll it in the playground.
 * - Let each item have a different height. (Hard: you need running
 *   totals and a binary search to find the first visible row.)
 */

import type { ReactElement } from 'react';

export type VirtualListProps = {
  /** The accessible name of the list. */
  label: string;
  /** The text of every row. */
  items: string[];
  /** The height of one row, in pixels. */
  rowHeight: number;
  /** The height of the scroll box, in pixels. */
  height: number;
  /** Extra rows to render above and below the visible ones. Default 0. */
  overscan?: number;
};

export function VirtualList({
  label,
  items,
  rowHeight,
  height,
  overscan = 0,
}: VirtualListProps): ReactElement {
  // TODO: build me, then make your tests pass.
  throw new Error('Not implemented: VirtualList');
}
