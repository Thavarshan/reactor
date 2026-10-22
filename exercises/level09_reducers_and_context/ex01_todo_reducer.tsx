/**
 * Exercise: Todo Reducer
 * Level:    09 - Reducers and Context
 * Topics:   reducers, actions, pure functions, immutable updates,
 *           useReducer, forms
 *
 * ========================================================================
 * YOUR TASK
 * ========================================================================
 * Part 1: write `todoReducer`, a pure function that works out the next
 * list of todos from the current list and an action.
 *
 *     todoReducer(todos, { type: "added", text: "Buy milk" })
 *
 * Part 2: build a <TodoApp> that runs your reducer with useReducer.
 *
 *     New todo [______________] [ Add ]
 *
 *     [x] Buy milk               [ Delete ]
 *     [ ] Walk the dog           [ Delete ]
 *
 *     [ Clear completed ]
 *
 *     <TodoApp initialTodos={[{ id: 1, text: "Buy milk", done: true }]} />
 *
 * ========================================================================
 * BACKGROUND: REDUCERS
 * ========================================================================
 * A REDUCER takes the current state and an ACTION, and returns the next
 * state. An action is a plain object that says what happened. Its
 * `type` names the event, and the other fields carry the details:
 *
 *     type LightAction = { type: "switched_on" } | { type: "dimmed"; by: number };
 *
 *     function lightReducer(brightness: number, action: LightAction): number {
 *       switch (action.type) {
 *         case "switched_on":
 *           return 100;
 *         case "dimmed":
 *           return Math.max(0, brightness - action.by);
 *       }
 *     }
 *
 * A reducer must be PURE: it never changes (MUTATES) the state it is
 * given, and the same input always gives the same output. To change one
 * item in an array, make a new array. The untouched items can be reused
 * as they are.
 *
 * When nothing needs to change, return the SAME state object you were
 * given. React compares old and new state with Object.is, and skips the
 * re-render when they are the same object.
 *
 * The types below say `readonly Todo[]`. That is a normal array that
 * TypeScript won't let you change: todos.push(...) is an error. It's a
 * handy reminder to build a new array instead.
 *
 * ========================================================================
 * BACKGROUND: useReducer
 * ========================================================================
 * useReducer is like useState, but every change goes through your
 * reducer:
 *
 *     const [brightness, dispatch] = useReducer(lightReducer, 0);
 *     <button onClick={() => dispatch({ type: "dimmed", by: 10 })}>Dim</button>
 *
 * `dispatch(action)` asks React to run the reducer with that action and
 * re-render with the result.
 *
 * ========================================================================
 * WHAT YOUR TESTS CAN FIND
 * ========================================================================
 * - A text input labelled "New todo" (a <label> tied to the input).
 * - A button named "Add". The input and the button are inside a <form>,
 *   so pressing Enter in the input also adds the todo.
 * - A list (<ul>) with one list item (<li>) per todo, in order.
 * - In each list item: a checkbox whose accessible name is the todo's
 *   text (wrap the checkbox and the text in one <label>), checked when
 *   the todo is done.
 * - In each list item: a button named "Delete <text>", for example
 *   "Delete Buy milk". Its visible text can be just "Delete", with
 *   aria-label="Delete Buy milk". The ACCESSIBLE NAME is what a screen
 *   reader reads out, and aria-label sets it.
 * - When there are no todos: the text "Nothing to do!" and NO list.
 * - A button named "Clear completed".
 *
 * ========================================================================
 * THE RULES
 * ========================================================================
 * todoReducer must:
 * 1. Never mutate the array or the todo objects it is given.
 * 2. "added": trim the text. If the trimmed text is empty, return the
 *    SAME array. Otherwise add { id, text, done: false } at the END.
 *    The id is 1 more than the largest id in the list, or 1 when the
 *    list is empty.
 * 3. "toggled": flip `done` on the todo with that id. That todo becomes
 *    a new object, and every other todo is reused as it is (same
 *    object). If no todo has that id, return the SAME array.
 * 4. "deleted": remove the todo with that id. If no todo has that id,
 *    return the SAME array.
 * 5. "cleared_done": remove every todo whose done is true. If none are
 *    done, return the SAME array.
 *
 * Your component must:
 * 6. Accept an optional `initialTodos` prop (default: an empty list)
 *    and show those todos first.
 * 7. Keep the todos with useReducer and todoReducer. Every change goes
 *    through dispatch.
 * 8. Add a todo when the form is submitted (the "Add" button or Enter),
 *    then empty the input. A blank input adds nothing.
 * 9. Toggle a todo when its checkbox is clicked.
 * 10. Delete a todo when its "Delete <text>" button is clicked.
 * 11. Remove all done todos when "Clear completed" is clicked. Disable
 *     that button (the HTML `disabled` attribute) when no todo is done.
 *
 * You can assume:
 * - Ids in `initialTodos` are unique whole numbers above 0.
 * - Todo texts are unique, so each "Delete <text>" name is unique.
 *
 * ========================================================================
 * EXAMPLES
 * ========================================================================
 * The reducer (todos written as id:text, with a * when done):
 *
 *     []                + added "  Milk "    ->  [1:Milk]        trimmed
 *     [1:Milk, 5:Eggs]  + added "Tea"        ->  [1:Milk, 5:Eggs, 6:Tea]
 *     [1:Milk]          + added "   "        ->  the SAME array
 *     [1:Milk, 2:Eggs]  + toggled 1          ->  [1:Milk*, 2:Eggs]
 *                                                2:Eggs is the same object
 *     [1:Milk]          + toggled 9          ->  the SAME array
 *     [1:Milk*, 2:Eggs] + cleared_done       ->  [2:Eggs]
 *
 * The component:
 *
 *     type "Buy milk", click "Add"       ->  "Buy milk" appears, input empty
 *     click the "Buy milk" checkbox      ->  it is checked
 *                                            "Clear completed" is enabled
 *     click "Clear completed"            ->  "Nothing to do!"
 *
 * ========================================================================
 * EDGE CASES TO TEST
 * ========================================================================
 * Reducer:
 * - added to an empty list -> id 1
 * - added after ids 1 and 5 -> id 6
 * - added text is trimmed, and blank text returns the same array (toBe)
 * - toggled keeps the other todos as the same objects (toBe)
 * - toggled, deleted with an unknown id -> the same array
 * - cleared_done with nothing done -> the same array
 * - Frozen input (Object.freeze) never throws, so nothing was mutated
 * Component:
 * - No initialTodos -> "Nothing to do!" and no list
 * - Typing and pressing Enter adds the todo and empties the input
 * - A blank submit adds nothing
 * - Clicking a checkbox toggles it
 * - "Delete Walk the dog" removes only that todo
 * - "Clear completed" is disabled until a todo is done, then removes it
 *
 * ========================================================================
 * HINTS (read only if you get stuck)
 * ========================================================================
 * 1. Use a switch on action.type, with one case per action.
 * 2. For the new id: Math.max(0, ...todos.map((t) => t.id)) + 1.
 * 3. For "toggled": todos.map((t) => (t.id === action.id ? { ...t, done:
 *    !t.done } : t)). Check first whether any todo has that id
 *    (todos.some(...)), and return `todos` if not.
 * 4. For "deleted" and "cleared_done": filter, then compare lengths. If
 *    the new array is just as long, nothing was removed, so return the
 *    original.
 * 5. In the form's onSubmit, call event.preventDefault() first, so the
 *    browser doesn't reload the page.
 * 6. TESTING: test the reducer like any function. No render needed:
 *        const todos = [{ id: 1, text: "Milk", done: false }];
 *        expect(todoReducer(todos, { type: "toggled", id: 9 })).toBe(todos);
 * 7. TESTING: Object.freeze makes an object read-only. Changing a frozen
 *    object throws in strict mode, so freezing the input proves the
 *    reducer doesn't mutate it:
 *        const todos = Object.freeze([Object.freeze({ id: 1, text: "Milk", done: false })]);
 * 8. TESTING: to press Enter, type it: await user.type(input, "Tea{Enter}").
 *
 * ========================================================================
 * REACT CONCEPTS TO LEARN
 * ========================================================================
 * - Reducers and actions: what happened vs. how the state changes
 * - Pure functions and immutable updates
 * - Returning the same state when nothing changes
 * - useReducer and dispatch
 * - Testing pure logic without rendering anything
 *
 * ========================================================================
 * STRETCH GOALS
 * ========================================================================
 * - Add an "edited" action that carries an id and the new text, and a
 *   way to rename a todo.
 * - Show "2 items left" by counting the todos that aren't done.
 *   Remember: work it out while rendering, don't store it.
 * - Save the todos in localStorage with the useLocalStorage idea from
 *   level 08.
 */

import type { ReactElement } from "react";

export type Todo = {
  /** A unique whole number. */
  id: number;
  /** What needs doing. */
  text: string;
  /** True once the todo is finished. */
  done: boolean;
};

export type TodoAction =
  | { type: "added"; text: string }
  | { type: "toggled"; id: number }
  | { type: "deleted"; id: number }
  | { type: "cleared_done" };

export function todoReducer(todos: readonly Todo[], action: TodoAction): readonly Todo[] {
  // TODO: implement me, then make your tests pass.
  throw new Error("Not implemented: todoReducer");
}

export type TodoAppProps = {
  /** The todos shown at first. Default: an empty list. */
  initialTodos?: readonly Todo[];
};

export function TodoApp({ initialTodos = [] }: TodoAppProps): ReactElement {
  // TODO: build me, then make your tests pass.
  throw new Error("Not implemented: TodoApp");
}
