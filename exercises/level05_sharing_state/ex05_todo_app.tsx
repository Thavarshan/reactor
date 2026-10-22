/**
 * Exercise: Todo App
 * Level:    05 - Sharing State
 * Topics:   one state shared by several child components, adding,
 *           toggling and deleting items, filters, derived counts
 *
 * ========================================================================
 * YOUR TASK
 * ========================================================================
 * Build a classic <TodoApp>: add todos, tick them off, delete them,
 * filter the list, and see how many are left.
 *
 *     New todo [ Buy milk          ] [ Add ]
 *
 *     [x] Walk the dog          [ Delete ]
 *     [ ] Write tests           [ Delete ]
 *
 *     1 item left     [ All ] [ Active ] [ Completed ]
 *
 *     <TodoApp initialTodos={[{ id: "1", text: "Walk the dog", done: true }]} />
 *
 * ========================================================================
 * BACKGROUND: ONE OWNER, MANY HELPERS
 * ========================================================================
 * This app splits nicely into pieces: a form for new todos, the list,
 * and a footer with the count and the filters. All of them need the
 * same todos. So TodoApp owns the todos (and the chosen filter) as
 * state, and hands each piece what it needs:
 *
 *     <NewTodoForm onAdd={addTodo} />
 *     <TodoList todos={visibleTodos} onToggle={toggleTodo} onDelete={deleteTodo} />
 *     <Footer left={itemsLeft} filter={filter} onFilterChange={setFilter} />
 *
 * Notice what is NOT state: the visible todos and the "items left"
 * count. Both are worked out from `todos` and `filter` on every render.
 *
 * Splitting into those components is up to you. The tests only look at
 * what ends up on screen.
 *
 * ========================================================================
 * BACKGROUND: UPDATING ONE ITEM IN AN ARRAY
 * ========================================================================
 * To change one object in an array, `map` over it and return a NEW
 * object for the one that matches (copy it with `...`, then change a
 * field). Every other item is returned as it is:
 *
 *     setPets(pets.map((pet) => (pet.id === id ? { ...pet, fed: true } : pet)));
 *
 * ========================================================================
 * WHAT YOUR TESTS CAN FIND
 * ========================================================================
 * Tests find elements by their ARIA role (what kind of thing it is) and
 * their accessible name (the text a screen reader reads out for it).
 * Your component must render exactly these:
 *
 * - A text box named "New todo" and a submit button named "Add", inside
 *   a <form> (so Enter adds too).
 * - The visible todos as a list (<ul>), one <li> per todo, holding:
 *   - a checkbox named by the todo's text, ticked when it is done
 *     (wrap the checkbox and the text in a <label>)
 *   - a button named "Delete <text>", like "Delete Walk the dog".
 * - When no todo is visible: the text "Nothing to show", and no list.
 * - Three buttons named "All", "Active" and "Completed". The current
 *   one has aria-pressed="true", the others aria-pressed="false".
 *   (aria-pressed tells screen readers a button is switched on.)
 * - An element with role="status" holding "3 items left" or, for
 *   exactly one, "1 item left".
 *
 * ========================================================================
 * THE RULES
 * ========================================================================
 * Your component must:
 * 1. Start with `initialTodos` (default none), with the "All" filter.
 * 2. Add a todo when the form is submitted: text trimmed, not done, at
 *    the END of the list. Then empty the "New todo" box.
 * 3. Ignore a submit when the trimmed text is empty (nothing is added).
 * 4. Tick or untick a todo when its checkbox is clicked.
 * 5. Remove a todo when its "Delete" button is clicked.
 * 6. Show, by filter: All = every todo, Active = not done,
 *    Completed = done. Keep the list order.
 * 7. Show how many todos are NOT done in the status element, counting
 *    every todo whatever the filter.
 *
 * You can assume:
 * - Todo texts are unique, so every checkbox has its own name.
 *
 * ========================================================================
 * EXAMPLES
 * ========================================================================
 * Each line shows what the user does, then what they should see.
 *
 *     <TodoApp />
 *       "Nothing to show", "0 items left", "All" pressed
 *       type "Buy milk", click Add   ->  "Buy milk" listed, box empty
 *                                        "1 item left"
 *       tick "Buy milk"              ->  "0 items left"
 *       click "Active"               ->  "Nothing to show"   it's done
 *       click "Completed"            ->  "Buy milk" listed
 *
 *     Filter on "Active", tick a todo  ->  it disappears from view
 *
 * ========================================================================
 * EDGE CASES TO TEST
 * ========================================================================
 * - No initialTodos: "Nothing to show", "0 items left", "All" pressed
 * - initialTodos are shown in order with done ones ticked
 * - Adding trims the text, appends it, and empties the box
 * - Pressing Enter in the box adds too
 * - An empty or spaces-only todo is not added
 * - Ticking and unticking changes the count ("1 item left" singular)
 * - Delete removes only that todo
 * - Each filter shows the right todos, and aria-pressed follows
 * - A filter with nothing to show says "Nothing to show"
 * - The count ignores the filter
 * - Ticking a todo while on "Active" hides it
 *
 * ========================================================================
 * HINTS (read only if you get stuck)
 * ========================================================================
 * 1. Two pieces of state: `todos` (an array) and `filter` ("all",
 *    "active" or "completed"). A third for the "New todo" text.
 * 2. Every new todo needs a unique id for its `key`.
 *    `crypto.randomUUID()` makes one.
 * 3. visible = `todos.filter(...)` based on the filter, and itemsLeft =
 *    `todos.filter((t) => !t.done).length`.
 * 4. `aria-pressed={filter === "active"}` sets the attribute to "true"
 *    or "false" for you.
 * 5. TESTING: find a todo by its checkbox:
 *    `screen.getByRole("checkbox", { name: "Buy milk" })`. To check that
 *    a todo is hidden, use `queryByRole` (it returns null instead of
 *    throwing) with `.not.toBeInTheDocument()`. For the order,
 *    `screen.getAllByRole("listitem")` returns the items top to bottom,
 *    and `expect(items[0]).toHaveTextContent("Walk the dog")` checks one.
 *
 * ========================================================================
 * REACT CONCEPTS TO LEARN
 * ========================================================================
 * - One owner component sharing state with several children
 * - Adding, updating and removing array items without mutation
 * - Deriving the visible list and the count from state
 * - aria-pressed for toggle buttons
 *
 * ========================================================================
 * STRETCH GOALS
 * ========================================================================
 * - Add a "Clear completed" button that only shows when something is
 *   done.
 * - Double-click a todo's text to edit it in place.
 * - A "Toggle all" checkbox like the one in the checkbox group exercise.
 */

import type { ReactElement } from 'react';

export type Todo = {
  /** A unique id, used as the React `key`. */
  id: string;
  /** What to do. */
  text: string;
  /** true once it is ticked off. */
  done: boolean;
};

export type TodoAppProps = {
  /** The todos to start with. Default []. */
  initialTodos?: Todo[];
};

export function TodoApp({ initialTodos = [] }: TodoAppProps): ReactElement {
  // TODO: build me, then make your tests pass.
  throw new Error('Not implemented: TodoApp');
}
