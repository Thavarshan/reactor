/**
 * Exercise: List with a Render Prop
 * Level:    02 - Props and Composition
 * Topics:   render props, generic components, keys, empty states
 *
 * ========================================================================
 * YOUR TASK
 * ========================================================================
 * Build a <List> that knows HOW to draw a list (the <ul>, the <li>s,
 * the empty message) but lets the parent decide WHAT each item looks
 * like, by passing a function.
 *
 *     Fruits                       (empty)
 *     - Apple                      Nothing here yet.
 *     - Banana
 *     - Cherry
 *
 *     <List items={fruits} getKey={(f) => f.id} renderItem={(f) => f.name} />
 *
 * ========================================================================
 * BACKGROUND: RENDER PROPS AND GENERICS
 * ========================================================================
 * A RENDER PROP is a prop that holds a function returning JSX. The
 * component calls it whenever it needs that piece of UI:
 *
 *     function Repeat({ times, render }) {
 *       const out = [];
 *       for (let i = 0; i < times; i++) out.push(render(i));
 *       return <>{out}</>;
 *     }
 *     <Repeat times={3} render={(i) => <span key={i}>★</span>} />
 *
 * Your List should work for a list of anything: strings, numbers,
 * products, users. TypeScript handles this with a GENERIC type
 * parameter, written `<T>`. T is a placeholder that TypeScript fills in
 * from the `items` you pass:
 *
 *     function first<T>(items: T[]): T | undefined { return items[0]; }
 *     first([1, 2]);        // T is number
 *     first(["a", "b"]);    // T is string
 *
 * When React draws a list from an array, each <li> needs a KEY: a
 * string or number that is unique among its siblings and stays the
 * same for the same item. React uses keys to tell items apart when the
 * list changes. A missing key makes React print a warning.
 *
 * ========================================================================
 * WHAT YOUR TESTS CAN FIND
 * ========================================================================
 * - With items: one <ul> (role "list") with one <li> (role "listitem")
 *   per item, in the same order.
 * - When `label` is given, the list's accessible name is the label
 *   (aria-label), so getByRole("list", { name: "Fruits" }) finds it.
 * - With no items: a <p> with the `emptyText`, and no list at all.
 *
 * ========================================================================
 * THE RULES
 * ========================================================================
 * Your component must:
 * 1. Render a <ul> with one <li> per item, in order.
 * 2. Fill each <li> with `renderItem(item, index)`, called with exactly
 *    those two arguments.
 * 3. Give each <li> the key `getKey(item)`, so React prints no key
 *    warning.
 * 4. Set aria-label on the <ul> to `label` when given.
 * 5. When `items` is empty, render `emptyText` (default
 *    "Nothing here yet.") in a <p>, render no <ul>, and don't call
 *    renderItem at all.
 *
 * You can assume:
 * - `getKey` returns a different value for every item in the list.
 *
 * ========================================================================
 * EXAMPLES
 * ========================================================================
 *     items = [Apple, Banana, Cherry], renderItem = (f) => f.name
 *       3 list items: "Apple", "Banana", "Cherry"
 *
 *     renderItem = (f) => <a href={`/fruits/${f.id}`}>{f.name}</a>
 *       each item holds a link             the parent decides the look
 *
 *     items = ["a", "b"], renderItem = (s, i) => `${i + 1}. ${s}`
 *       "1. a", "2. b"                      the index is the 2nd argument
 *
 *     items = []
 *       "Nothing here yet.", no list        the empty state
 *
 *     items = [], emptyText = "No fruit today"
 *       "No fruit today"
 *
 * ========================================================================
 * EDGE CASES TO TEST
 * ========================================================================
 * - 3 items: 3 list items with the right text, in order
 * - renderItem returning JSX: a link inside an <li>
 * - renderItem is called with (item, index) for every item
 * - Using the index to number items: "1. a", "2. b"
 * - Empty items: "Nothing here yet." and no list
 * - A custom emptyText is shown
 * - With items: no empty text
 * - label="Fruits": getByRole("list", { name: "Fruits" }) holds 3 items
 * - Works with plain strings and numbers too
 * - No key warning: console.error is never called
 * - Empty items: renderItem is never called
 *
 * ========================================================================
 * HINTS (read only if you get stuck)
 * ========================================================================
 * 1. The signature already has the generic: `function List<T>(...)`.
 *    Inside, `items` is `T[]` and `renderItem` takes a `T`.
 * 2. Check for the empty case first and return early.
 * 3. `items.map((item, index) => <li key={...}>{...}</li>)` builds the
 *    list items. The key goes on the <li>, the outermost element that
 *    map returns.
 * 4. TESTING: a spy is a fake function that records its calls. Pass
 *    `const renderItem = vi.fn((f: Fruit) => f.name)` and check
 *    `expect(renderItem).toHaveBeenCalledWith(fruits[0], 0)`.
 * 5. TESTING: React reports a missing key with console.error. Spy on it
 *    and silence it: `const error = vi.spyOn(console, "error")
 *    .mockImplementation(() => {})`, render, then
 *    `expect(error).not.toHaveBeenCalled()`. Add
 *    `afterEach(() => vi.restoreAllMocks())` so the spy doesn't leak
 *    into other tests.
 *
 * ========================================================================
 * REACT CONCEPTS TO LEARN
 * ========================================================================
 * - Render props: passing a function that returns JSX
 * - Generic components with <T>
 * - Rendering lists with map, and why keys matter
 * - Empty states
 *
 * ========================================================================
 * STRETCH GOALS
 * ========================================================================
 * - Add an `ordered` prop that renders an <ol> instead of a <ul>.
 * - Add a `renderEmpty` render prop as an alternative to `emptyText`.
 * - Make `getKey` optional for items that have an `id` field. (Hard: it
 *   needs a TypeScript overload or a conditional type.)
 */

import { ReactNode, type ReactElement } from "react";

export type ListProps<T> = {
  /** The things to show, in order. */
  items: T[];
  /** Draws one item. Called with the item and its position (0, 1, 2...). */
  renderItem: (item: T, index: number) => ReactNode;
  /** Returns a unique, stable key for an item, e.g. its id. */
  getKey: (item: T) => string | number;
  /** Shown instead of the list when `items` is empty. Default "Nothing here yet." */
  emptyText?: ReactNode;
  /** The list's accessible name. Optional. */
  label?: string;
};

export function List<T>({
  items,
  renderItem,
  getKey,
  emptyText = "Nothing here yet.",
  label,
}: ListProps<T>): ReactElement {
  // TODO: build me, then make your tests pass.
  throw new Error("Not implemented: List");
}
