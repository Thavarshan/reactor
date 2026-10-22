/**
 * Exercise: Nested Immutable Updates
 * Level:    00 - Modern JavaScript for React
 * Topics:   updating nested data without mutation, object identity, map
 *
 * ========================================================================
 * YOUR TASK
 * ========================================================================
 * Write four functions that change something deep inside nested data:
 * a todo inside a list, and columns and cards inside a board. Copy only
 * the objects on the path to the change. Every part that did NOT change
 * must be the very same object as before.
 *
 *     toggleTodo(list, 2)  ->  a new list where todo 2 is flipped
 *
 * ========================================================================
 * BACKGROUND: IDENTITY, AND COPYING ONLY THE PATH
 * ========================================================================
 * Two objects can look the same but still be different objects:
 *
 *     const a = { x: 1 };
 *     const b = { x: 1 };
 *     a === b;               // false: two separate objects
 *     a === a;               // true:  the very same object
 *
 * This is called IDENTITY (or "reference equality"). React uses it to
 * decide what changed. When you give React a new object, it assumes
 * something inside changed. When you give it the same object, it assumes
 * nothing did and can skip work.
 *
 * So to change one thing deep inside nested data, you copy every object
 * on the PATH from the top down to the change, and reuse everything else.
 * Here's how to relabel one shelf in a library, leaving the others alone:
 *
 *     const library = {
 *       city: "Paris",
 *       shelves: [{ id: 1, label: "A" }, { id: 2, label: "B" }],
 *     };
 *
 *     const next = {
 *       ...library,                              // new top object
 *       shelves: library.shelves.map((shelf) =>  // new array
 *         shelf.id === 2
 *           ? { ...shelf, label: "Poetry" }      // new shelf: it changed
 *           : shelf,                             // same shelf: reused
 *       ),
 *     };
 *
 *     next === library                           // false (it changed)
 *     next.shelves[0] === library.shelves[0]     // true  (untouched)
 *
 * The pattern "map, and for the one matching id return a copy, else the
 * original" is everywhere in React code. Learn it by heart.
 *
 * ========================================================================
 * THE RULES
 * ========================================================================
 * Your functions must:
 * 1. toggleTodo(list, todoId): return a new list where that todo's `done`
 *    is flipped (true becomes false, false becomes true).
 * 2. renameColumn(board, columnId, name): return a new board where that
 *    column has the new name.
 * 3. addCard(board, columnId, card): return a new board where `card` is
 *    added to the END of that column's cards.
 * 4. moveCard(board, cardId, fromColumnId, toColumnId): return a new
 *    board where the card is removed from the "from" column and added to
 *    the end of the "to" column. The card object itself is reused, not
 *    copied.
 * 5. Keep identity: every object or array that didn't change must be the
 *    very same one (`toBe`) in the result. Every object on the path to a
 *    change must be a new one.
 * 6. When there is nothing to do, return the ORIGINAL input itself:
 *    - toggleTodo with an id that isn't in the list
 *    - renameColumn or addCard with a column id that isn't on the board
 *    - moveCard when the card isn't in the "from" column, or when the
 *      "from" and "to" columns are the same
 * 7. Never mutate anything you were given.
 *
 * You can assume:
 * - Todo ids are unique, column ids are unique, and card ids are unique
 *   across the whole board.
 * - In moveCard, both column ids exist on the board.
 *
 * ========================================================================
 * EXAMPLES
 * ========================================================================
 *     list = { title: "Chores", todos: [dishes(id 1), laundry(id 2, done: false)] }
 *
 *     toggleTodo(list, 2)
 *       -> new list, new todos array, new laundry with done: true
 *       -> result.todos[0] is dishes itself    (untouched, so reused)
 *     toggleTodo(list, 99)  ->  list itself     (nothing to do)
 *
 *     board = { name: "Sprint", columns: [todo(cards: [c1, c2]), done(cards: [])] }
 *
 *     renameColumn(board, "done", "Finished")
 *       -> new board, new "done" column, the "todo" column reused
 *     addCard(board, "done", c3)
 *       -> the "done" column's cards are [c3]
 *     moveCard(board, 1, "todo", "done")
 *       -> "todo" has [c2], "done" has [c1], and c1 is the same object
 *     moveCard(board, 1, "todo", "todo")  ->  board itself
 *
 * ========================================================================
 * EDGE CASES TO TEST
 * ========================================================================
 * - toggleTodo flips false -> true, and true -> false
 * - toggleTodo: the other todos are the same objects (`toBe`), but the
 *   list, the todos array and the toggled todo are new (`not.toBe`)
 * - toggleTodo with an unknown id returns the list itself
 * - renameColumn: the other columns and the renamed column's cards array
 *   are reused
 * - renameColumn or addCard with an unknown column id -> board itself
 * - addCard to an empty column
 * - moveCard: the card is the same object, and columns not involved
 *   are reused
 * - moveCard with the same from and to column -> board itself
 * - moveCard with a card that isn't in the "from" column -> board itself
 * - Nothing changes deep-frozen input (see hint 6)
 *
 * ========================================================================
 * HINTS (read only if you get stuck)
 * ========================================================================
 * 1. Draw the path first. For toggleTodo it's list -> todos array -> one
 *    todo. Those three get copied. Everything else is reused.
 * 2. For the "nothing to do" check in toggleTodo, `some` tells you
 *    whether the id is in the list at all.
 * 3. renameColumn and addCard both "map over columns, change the one
 *    with the matching id". Only the inside of the change differs.
 * 4. For moveCard, find the card first:
 *    `const card = from.cards.find((c) => c.id === cardId)`. Then map
 *    over the columns once, and return a different copy for the "from"
 *    column (filter the card out) and the "to" column (spread it in).
 * 5. A `return` early at the top of a function, for the "nothing to do"
 *    cases, keeps the rest of the code simple.
 * 6. TESTING: `Object.freeze` only freezes the top level. To freeze
 *    everything, write a small helper for your test file:
 *
 *        function deepFreeze<T>(value: T): T {
 *          if (value && typeof value === "object") {
 *            Object.values(value).forEach(deepFreeze);
 *            Object.freeze(value);
 *          }
 *          return value;
 *        }
 *
 *    `expect(result.columns[1]).toBe(board.columns[1])` checks identity.
 *    `expect(result.columns[0]).not.toBe(board.columns[0])` checks that a
 *    new copy was made.
 *
 * ========================================================================
 * JAVASCRIPT CONCEPTS TO LEARN
 * ========================================================================
 * - Object identity: `===` on objects compares WHICH object, not contents
 * - Copying only the path to a change (structural sharing)
 * - The "map and replace the matching item" pattern
 * - Early returns for "nothing to do"
 * - Why React cares: new object means "changed", same object means
 *   "unchanged"
 *
 * ========================================================================
 * STRETCH GOALS
 * ========================================================================
 * - Write `removeCard(board, cardId)` that works without knowing which
 *   column the card is in.
 * - Let moveCard take a position: `moveCard(board, id, from, to, index)`.
 * - Look up "Immer", a library that lets you write mutating code that
 *   produces immutable updates.
 */

export type Todo = {
  /** A unique number for this todo. */
  id: number;
  /** What needs doing. */
  text: string;
  /** True when it's finished. */
  done: boolean;
};

export type TodoList = {
  /** The list's title, e.g. "Chores". */
  title: string;
  /** The todos, in order. */
  todos: readonly Todo[];
};

export type Card = {
  /** A unique number for this card, across the whole board. */
  id: number;
  /** The text on the card. */
  title: string;
};

export type Column = {
  /** A unique id such as "todo" or "done". */
  id: string;
  /** The heading shown above the column. */
  name: string;
  /** The cards in this column, top to bottom. */
  cards: readonly Card[];
};

export type Board = {
  /** The board's name, e.g. "Sprint 4". */
  name: string;
  /** The columns, left to right. */
  columns: readonly Column[];
};

export function toggleTodo(list: TodoList, todoId: number): TodoList {
  // TODO: implement me, then make your tests pass.
  throw new Error("Not implemented: toggleTodo");
}

export function renameColumn(board: Board, columnId: string, name: string): Board {
  // TODO: implement me, then make your tests pass.
  throw new Error("Not implemented: renameColumn");
}

export function addCard(board: Board, columnId: string, card: Card): Board {
  // TODO: implement me, then make your tests pass.
  throw new Error("Not implemented: addCard");
}

export function moveCard(
  board: Board,
  cardId: number,
  fromColumnId: string,
  toColumnId: string,
): Board {
  // TODO: implement me, then make your tests pass.
  throw new Error("Not implemented: moveCard");
}
