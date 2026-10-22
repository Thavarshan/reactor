/**
 * Exercise: Memoized List Item
 * Level:    10 - Performance
 * Topics:   React.memo, re-renders, object identity, counting renders
 *
 * ========================================================================
 * YOUR TASK
 * ========================================================================
 * Build a <TaskList> that shows a list of tasks, one <TaskRow> per task.
 * Wrap TaskRow in React.memo, so a row only draws again when its own
 * task changes. Changing one task must not redraw the other rows.
 *
 *     Tasks
 *     - Buy milk
 *     - Walk the dog (done)
 *     - Call Grandma
 *
 *     <TaskList tasks={tasks} onRowRender={(id) => console.log(id)} />
 *
 * ========================================================================
 * BACKGROUND: RE-RENDERS AND React.memo
 * ========================================================================
 * "Rendering" means React calls your component function to find out
 * what it should show. A "re-render" is any call after the first one.
 *
 * When a parent component re-renders, React re-renders all of its
 * children too, even if their props (the values passed to them) are
 * exactly the same as last time. Usually that's fine, because React is
 * fast. In a long list it can add up.
 *
 * React.memo wraps a component and gives it a memory. Before it
 * re-renders, it compares each new prop with the old one. If every prop
 * is the same, React skips the component and reuses what it drew last
 * time:
 *
 *     import { memo, type ReactElement } from "react";
 *
 *     const Price = memo(function Price({ amount }: { amount: number }) {
 *       return <span>${amount}</span>;
 *     });
 *
 * "The same" means `Object.is(oldProp, newProp)`. For numbers and
 * strings that compares the value. For objects, arrays and functions it
 * compares identity: is it the very same object in memory? A copy with
 * equal contents counts as different:
 *
 *     const a = { title: "Milk" };
 *     Object.is(a, a);               // true
 *     Object.is(a, { ...a });        // false: a new object
 *
 * So memo only helps when unchanged data keeps its identity. Immutable
 * updates do exactly that: `tasks.map(t => t.id === id ? { ...t, done:
 * true } : t)` makes one new task object and keeps the others.
 *
 * ========================================================================
 * BACKGROUND: COUNTING RENDERS IN A TEST
 * ========================================================================
 * You can't see a re-render on screen, so how can a test prove that
 * memo works? Give the component a "spy" prop that it calls every time
 * it renders. A test passes `vi.fn()` and counts the calls.
 *
 * Calling a prop during render is a side effect (it reaches outside the
 * component), which you'd normally avoid. Here it's only a measuring
 * tool, like a stopwatch in a race.
 *
 * Note: React's <StrictMode> renders every component twice in
 * development, to catch bugs. That would double every count. Tests don't
 * use StrictMode, so the counts in this level are exact.
 *
 * ========================================================================
 * WHAT YOUR TESTS CAN FIND
 * ========================================================================
 * - A list named "Tasks": <ul aria-label="Tasks">.
 * - One listitem (<li>) per task, in the same order as `tasks`. Its text
 *   is the task title. A done task adds " (done)" after the title, so
 *   its text is e.g. "Walk the dog (done)".
 *
 * ========================================================================
 * THE RULES
 * ========================================================================
 * Your component must:
 * 1. TaskRow: render one <li> for `task` as described above.
 * 2. TaskRow: call `onRender?.(task.id)` once, at the top of the
 *    function, every time it renders.
 * 3. TaskRow: be exported as the memoized component ITSELF, so
 *    `<TaskRow ... />` in a test is already the memo version.
 * 4. TaskList: render the "Tasks" list with one TaskRow per task, using
 *    `task.id` as the key. Pass `onRowRender` down to each row as its
 *    `onRender` prop.
 * 5. When TaskList re-renders, a row whose `task` object (and
 *    `onRender`) is the same as last time must not re-render.
 *
 * You can assume:
 * - Task ids are unique.
 * - The parent updates tasks immutably: a changed task is a new object,
 *   and unchanged tasks keep their identity.
 *
 * ========================================================================
 * EXAMPLES
 * ========================================================================
 *     render 3 tasks           ->  onRowRender called 3 times ("1", "2", "3")
 *
 *     re-render with the same array
 *                              ->  no new calls: every row skipped
 *
 *     re-render with a new array where only task "2" is a new object
 *                              ->  exactly 1 new call, with "2"
 *                                  and row 2 now shows "(done)"
 *
 *     re-render with copies of every task ({ ...task })
 *                              ->  3 new calls: copies are new objects,
 *                                  even though nothing really changed
 *
 * ========================================================================
 * EDGE CASES TO TEST
 * ========================================================================
 * - First render: onRowRender called once per task, with each id
 * - Re-render with the same array, or with a new array that holds the
 *   same task objects (`[...tasks]`): zero new calls
 * - One task replaced by an updated copy: one new call, with its id,
 *   and the new text is shown
 * - Every task copied: every row re-renders (memo compares identity)
 * - A task added at the end: one new call, only for the new row
 * - TaskRow on its own: `rerender` with the same task object -> still
 *   one call. With a new object -> two calls
 * - An empty `tasks` array renders an empty list and no calls
 *
 * ========================================================================
 * HINTS (read only if you get stuck)
 * ========================================================================
 * 1. Write TaskRow as a normal component first and get the text right.
 *    Then add memo.
 * 2. `export function TaskRow` can't be memoized in place. Change it to
 *    `export const TaskRow = memo(function TaskRow(props) { ... });`.
 *    Naming the inner function keeps a nice name in React DevTools.
 * 3. TESTING: `render` returns `rerender`. Call it with new JSX to act
 *    like a parent passing new props:
 *
 *        const spy = vi.fn();
 *        const { rerender } = render(<TaskList tasks={tasks} onRowRender={spy} />);
 *        spy.mockClear();               // forget the first-render calls
 *        rerender(<TaskList tasks={tasks} onRowRender={spy} />);
 *        expect(spy).not.toHaveBeenCalled();
 *
 * 4. TESTING: build the "one task changed" array with map, so the other
 *    tasks keep their identity:
 *    `tasks.map(t => t.id === "2" ? { ...t, done: true } : t)`.
 * 5. Another way to measure is React's <Profiler id="x" onRender={spy}>.
 *    It calls `spy` each time anything inside it renders and commits.
 *    That measures a whole subtree. A spy prop measures one component,
 *    which is what this exercise needs.
 *
 * ========================================================================
 * REACT CONCEPTS TO LEARN
 * ========================================================================
 * - When and why components re-render
 * - React.memo and shallow prop comparison (Object.is)
 * - Why immutable updates make memo work
 * - Measuring renders with a spy (and why StrictMode doubles them)
 *
 * ========================================================================
 * STRETCH GOALS
 * ========================================================================
 * - Pass a custom compare function as memo's second argument that only
 *   compares `task.title` and `task.done`. Now copies don't re-render.
 *   What could go wrong if you add a field later?
 * - Wrap the list in <Profiler> in the playground and log `actualDuration`
 *   with and without memo, for 5,000 tasks.
 */

import type { ReactElement } from 'react';

export type Task = {
  id: string;
  title: string;
  done: boolean;
};

export type TaskRowProps = {
  /** The task to show. */
  task: Task;
  /** Called with `task.id` every time this row renders. For tests. */
  onRender?: (id: string) => void;
};

export type TaskListProps = {
  /** The tasks to show, in order. */
  tasks: Task[];
  /** Passed down to every row as its `onRender` prop. */
  onRowRender?: (id: string) => void;
};

export function TaskRow({ task, onRender }: TaskRowProps): ReactElement {
  // TODO: build me (and wrap me in memo), then make your tests pass.
  throw new Error('Not implemented: TaskRow');
}

export function TaskList({ tasks, onRowRender }: TaskListProps): ReactElement {
  // TODO: build me, then make your tests pass.
  throw new Error('Not implemented: TaskList');
}
