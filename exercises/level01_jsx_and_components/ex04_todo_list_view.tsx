/**
 * Exercise: Todo List View
 * Level:    01 - JSX and Components
 * Topics:   rendering lists with map, keys, empty states, className
 *
 * ========================================================================
 * YOUR TASK
 * ========================================================================
 * Build a <TodoListView> that shows a list of todos. Finished todos get a
 * "done" class (so CSS can strike them through), a line underneath counts
 * how many are done, and an empty list shows a friendly message instead.
 *
 *     - Buy milk
 *     - ~~Walk the dog~~          <- done
 *     - Write tests
 *     1 of 3 done
 *
 *     <TodoListView todos={todos} />
 *
 * ========================================================================
 * BACKGROUND: LISTS AND KEYS
 * ========================================================================
 * To show an array in JSX, turn each item into an element with `map`.
 * JSX can show an array of elements directly:
 *
 *     const fruits = [
 *       { id: "a1", name: "Apple" },
 *       { id: "b2", name: "Banana" },
 *     ];
 *
 *     <ol>
 *       {fruits.map((fruit) => (
 *         <li key={fruit.id}>{fruit.name}</li>
 *       ))}
 *     </ol>
 *
 * Every item in a list needs a KEY: a value that is unique among its
 * siblings and stays the same for the same item over time. React uses
 * keys to match items between renders (each time React calls your
 * component again to update the screen, called a RE-RENDER). Without
 * keys it gets confused when items are added, removed or reordered.
 *
 * A database id is the perfect key. The item's text is a bad key, because
 * two items can have the same text. The array index is a risky key,
 * because it changes when items move. (Level 10 shows the bugs this
 * causes.) When a key is missing or repeated, React prints a warning in
 * the console.
 *
 * ========================================================================
 * WHAT YOUR TESTS CAN FIND
 * ========================================================================
 * Tests find elements by their ARIA ROLE (what kind of thing it is). A
 * <ul> has the role "list" and each <li> has the role "listitem". Your
 * component must render:
 *
 * - When there are todos: one <ul> (role "list") with one <li> (role
 *   "listitem") per todo, in the same order as the array. Each <li>
 *   contains exactly the todo's text and nothing else.
 * - Finished todos' <li> has the class "done". Unfinished ones don't.
 *   (A class name is only for styling. That's fine here, since the
 *   summary line tells everyone how many are done.)
 * - A paragraph with the summary text, e.g. "1 of 3 done".
 * - When there are no todos: a paragraph with the empty message, and NO
 *   list and NO summary.
 *
 * ========================================================================
 * THE RULES
 * ========================================================================
 * Your component must:
 * 1. Accept a `todos` prop and an optional `emptyMessage` prop (default
 *    "Nothing to do!").
 * 2. Render one list item per todo, in order, showing its text.
 * 3. Give each list item the todo's `id` as its key.
 * 4. Add className "done" to the list item of each finished todo.
 * 5. Show "D of T done" under the list, where D is the number of finished
 *    todos and T is the total.
 * 6. When `todos` is empty, show only the empty message.
 *
 * You can assume:
 * - Todo ids are unique. Texts may repeat.
 *
 * ========================================================================
 * EXAMPLES
 * ========================================================================
 *     todos = [
 *       { id: 1, text: "Buy milk",     done: false },
 *       { id: 2, text: "Walk the dog", done: true  },
 *       { id: 3, text: "Write tests",  done: false },
 *     ]
 *
 *     <TodoListView todos={todos} />
 *       3 list items: "Buy milk", "Walk the dog" (class "done"), "Write tests"
 *       and the text "1 of 3 done"
 *     <TodoListView todos={[]} />
 *       "Nothing to do!", and no list
 *     <TodoListView todos={[]} emptyMessage="All clear" />
 *       "All clear"
 *
 * ========================================================================
 * EDGE CASES TO TEST
 * ========================================================================
 * - Three todos -> three list items, in the same order
 * - Only done todos have the "done" class
 * - The summary counts correctly: "1 of 3 done", and "0 of 2 done" when
 *   nothing is finished
 * - All done -> "3 of 3 done"
 * - Empty array -> "Nothing to do!", no list (`queryByRole("list")` is
 *   null), and no summary
 * - A custom emptyMessage is shown
 * - Two todos with the same text both show up
 * - React prints no key warnings, even with repeated texts (see hint 5)
 *
 * ========================================================================
 * HINTS (read only if you get stuck)
 * ========================================================================
 * 1. Handle the empty case first with an early `return`. Then the rest of
 *    the component can assume there are todos.
 * 2. `todos.filter((todo) => todo.done).length` counts the finished ones.
 * 3. className can be worked out per item:
 *    `className={todo.done ? "done" : undefined}`. React leaves the
 *    attribute out when the value is undefined.
 * 4. TESTING: `screen.getAllByRole("listitem")` returns an array. Map it
 *    to text with `.map((li) => li.textContent)` to check the order, and
 *    use `expect(items[1]).toHaveClass("done")` for the class.
 * 5. TESTING keys: React reports key problems with `console.error`. Spy on
 *    it before rendering, then check it was never called:
 *
 *        const spy = vi.spyOn(console, "error").mockImplementation(() => {});
 *        render(<TodoListView todos={todos} />);
 *        expect(spy).not.toHaveBeenCalled();
 *        spy.mockRestore();
 *
 *    React prints the "missing key" warning only the FIRST time, so this
 *    check is most reliable as the first test in the file, or when you
 *    run it alone with `it.only`.
 *
 * ========================================================================
 * REACT CONCEPTS TO LEARN
 * ========================================================================
 * - Rendering arrays with `map`
 * - Keys: why they matter and what makes a good one
 * - Empty states and early returns
 * - Working out classNames and counts from props
 * - List roles: "list" and "listitem"
 *
 * ========================================================================
 * STRETCH GOALS
 * ========================================================================
 * - Wrap done texts in <s> so the strike-through shows even without CSS.
 * - Show "All done!" instead of the summary when every todo is finished.
 * - Accept an `onToggle(id)` prop and add a checkbox to each item. (You'll
 *   learn about events properly in level 03.)
 */

import type { ReactElement } from "react";

export type Todo = {
  /** A unique id. Use it as the React key. */
  id: number;
  /** What needs doing. Two todos may have the same text. */
  text: string;
  /** True when it's finished. */
  done: boolean;
};

export type TodoListViewProps = {
  /** The todos to show, in order. */
  todos: Todo[];
  /** Shown when there are no todos. Default "Nothing to do!". */
  emptyMessage?: string;
};

export function TodoListView({ todos, emptyMessage = "Nothing to do!" }: TodoListViewProps): ReactElement {
  // TODO: build me, then make your tests pass.
  throw new Error("Not implemented: TodoListView");
}
