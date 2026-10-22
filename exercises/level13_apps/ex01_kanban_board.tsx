/**
 * Exercise: Kanban board
 * Level:    13 - Small Apps
 * Topics:   lifting state, derived lists, immutable updates, accessible
 *           alternatives to drag and drop
 *
 * ========================================================================
 * YOUR TASK
 * ========================================================================
 * Build a <KanbanBoard>: three columns of cards ("To do", "In progress"
 * and "Done"). You can add a card, move a card one column left or right
 * with buttons, and delete a card.
 *
 *     New card [ Write tests       ] [ Add card ]
 *
 *     To do               In progress          Done
 *     +---------------+   +---------------+    +--------------+
 *     | Buy milk      |   | Fix the bug   |    | No cards     |
 *     | [<] [>] [x]   |   | [<] [>] [x]   |    |              |
 *     +---------------+   +---------------+    +--------------+
 *
 *     <KanbanBoard initialCards={cards} onChange={save} />
 *
 * ========================================================================
 * BACKGROUND: ONE LIST, MANY VIEWS
 * ========================================================================
 * It's tempting to keep three arrays in state, one per column. Then
 * moving a card means removing it from one array AND adding it to
 * another, and it's easy to get them out of sync.
 *
 * A simpler idea: keep ONE array of cards, where each card knows its
 * column. Each column is just a filtered view, worked out during render:
 *
 *     const todo = cards.filter((card) => card.column === "todo");
 *
 * Moving a card then means changing one field of one card. Remember to
 * update state immutably (make new arrays and objects, never change the
 * old ones), so React notices the change.
 *
 * Why buttons instead of drag and drop? Dragging needs a mouse or a
 * finger. Buttons work for keyboard and screen reader users too, and
 * they are easy to test.
 *
 * ========================================================================
 * WHAT YOUR TESTS CAN FIND
 * ========================================================================
 * - A text input with the label "New card" and a button "Add card",
 *   inside a <form>.
 * - One <section> per column, in the order of COLUMNS. Each has an <h2>
 *   with the column title, and the section is labelled by that heading
 *   (aria-labelledby), which gives it role="region" and a name like
 *   "To do".
 * - Inside each section: a <ul> with one <li> per card, in order. Or,
 *   when the column is empty, <p>No cards</p> instead of the list.
 * - Inside each card's <li>: the card title, then three buttons with
 *   these accessible names (use aria-label, the visible text can be an
 *   arrow or an icon):
 *     "Move <title> left", "Move <title> right", "Delete <title>"
 *
 * ========================================================================
 * THE RULES
 * ========================================================================
 * Your component must:
 * 1. Start with `initialCards` (default: no cards).
 * 2. Show each card in its column, keeping the order of the cards array.
 * 3. Add a card when the form is submitted (button or Enter). Trim the
 *    title. An empty title does nothing. New cards go at the END of
 *    "To do". Empty the input after adding.
 * 4. "Move left" and "Move right" move a card to the neighbouring
 *    column, at the END of that column.
 * 5. Disable "Move left" in the first column and "Move right" in the
 *    last column.
 * 6. "Delete" removes the card.
 * 7. Call the optional `onChange` with the NEW array of all cards after
 *    every change (add, move, delete). Not on the first render.
 *
 * You can assume:
 * - Card ids in `initialCards` are unique. Titles in a test are unique
 *   too, so the button names are unique.
 *
 * ========================================================================
 * EXAMPLES
 * ========================================================================
 *     initialCards: Buy milk (todo), Fix the bug (doing)
 *
 *     type "Write tests" + Enter     ->  To do: Buy milk, Write tests
 *     click "Move Buy milk right"    ->  To do: Write tests
 *                                        In progress: Fix the bug, Buy milk
 *     click "Delete Fix the bug"     ->  In progress: Buy milk
 *     "Done" has no cards            ->  shows "No cards"
 *     "Move Buy milk left" in To do  ->  disabled
 *
 * ========================================================================
 * EDGE CASES TO TEST
 * ========================================================================
 * - No initialCards: three columns, each saying "No cards"
 * - Cards start in their own columns, in order
 * - Adding: trimmed title, at the end of "To do", input emptied
 * - Adding an empty or spaces-only title does nothing (no onChange)
 * - Moving right and left, landing at the END of the new column
 * - First column's "left" and last column's "right" are disabled
 * - Deleting a card, and the column shows "No cards" when it empties
 * - onChange gets the full new array, and is not called on first render
 *
 * ========================================================================
 * HINTS (read only if you get stuck)
 * ========================================================================
 * 1. State: the cards array, and the new-card text (a controlled input).
 * 2. A new card needs a unique id: `crypto.randomUUID()` works in
 *    browsers and in tests.
 * 3. To move a card to the end of its new column, remove it from the
 *    array and add an updated copy at the end:
 *        [...cards.filter((c) => c.id !== id), { ...card, column: next }]
 *    The other columns' order doesn't change, because each column is
 *    filtered from the same array.
 * 4. The neighbouring column: find the card's column index in COLUMNS
 *    and add or subtract 1.
 * 5. Write one helper, `update(nextCards)`, that calls setCards AND
 *    onChange. Then every change goes through it.
 * 6. TESTING: `within` limits a search to one column:
 *        const todo = screen.getByRole("region", { name: "To do" });
 *        expect(within(todo).getAllByRole("listitem")).toHaveLength(2);
 * 7. TESTING: to check the order, map the list items to their text. An
 *    item's text also holds any visible button text (like arrows), so
 *    match loosely:
 *        expect(items.map((li) => li.textContent)).toEqual([
 *          expect.stringContaining("Buy milk"),
 *          expect.stringContaining("Write tests"),
 *        ]);
 *
 * ========================================================================
 * REACT CONCEPTS TO LEARN
 * ========================================================================
 * - One source of truth, with derived views (filter during render)
 * - Immutable updates of arrays of objects
 * - Callback props that report changes (onChange)
 * - Landmarks and regions labelled by headings
 *
 * ========================================================================
 * STRETCH GOALS
 * ========================================================================
 * - Show the count in each heading, e.g. "To do (2)".
 * - Add "Move up" and "Move down" buttons to reorder cards inside a
 *   column.
 * - After a move, put keyboard focus on the moved card's matching
 *   button in its new column, so a keyboard user can keep moving it.
 */

import type { ReactElement } from 'react';

export type ColumnId = 'todo' | 'doing' | 'done';

export type Card = {
  /** A unique id. */
  id: string;
  /** The text shown on the card. */
  title: string;
  /** Which column the card is in. */
  column: ColumnId;
};

/** PROVIDED: you don't need to change this. The columns, left to right. */
export const COLUMNS: { id: ColumnId; title: string }[] = [
  { id: 'todo', title: 'To do' },
  { id: 'doing', title: 'In progress' },
  { id: 'done', title: 'Done' },
];

export type KanbanBoardProps = {
  /** The cards to start with. Default: none. */
  initialCards?: Card[];
  /** Called with the new array of ALL cards after every change. */
  onChange?: (cards: Card[]) => void;
};

export function KanbanBoard({
  initialCards = [],
  onChange,
}: KanbanBoardProps): ReactElement {
  // TODO: build me, then make your tests pass.
  throw new Error('Not implemented: KanbanBoard');
}
