/**
 * Exercise: useMemo
 * Level:    10 - Performance
 * Topics:   useMemo, dependency arrays, derived data, spying on a function
 *
 * ========================================================================
 * YOUR TASK
 * ========================================================================
 * Build a <ProductSearch> with a search box, a "Dark mode" checkbox and
 * a list of matching products. Filtering is slow (pretend it is), so
 * only run it again when the search text or the products change.
 * Ticking "Dark mode" must not filter again.
 *
 *     Search products: [ ap        ]     [x] Dark mode
 *
 *     2 results
 *     - Apple
 *     - Grapes
 *
 *     <ProductSearch products={sampleProducts} />
 *
 * ========================================================================
 * BACKGROUND: useMemo
 * ========================================================================
 * Every time a component re-renders (React calls the function again),
 * every line inside it runs again. That includes slow calculations,
 * even when their inputs haven't changed.
 *
 * useMemo remembers ("memoizes") the result of a calculation between
 * renders. You give it a function and a list of inputs, called the
 * dependency array:
 *
 *     const total = useMemo(
 *       () => orders.reduce((sum, o) => sum + o.amount, 0),
 *       [orders],
 *     );
 *
 * On the first render React calls the function and stores the result.
 * On later renders React compares each dependency with its old value
 * (with Object.is). If none changed, it returns the stored result
 * without calling the function. If any changed, it calls the function
 * again.
 *
 * A dependency is any value from the component (props, state, or
 * things made from them) that the function reads. Leave one out and
 * you'll show stale results.
 *
 * useMemo is a speed-up, not a guarantee. Your code must still be
 * correct if React calls the function more often. For example, in
 * <StrictMode> React calls it twice on purpose. Tests here don't use
 * StrictMode, so the counts are exact.
 *
 * ========================================================================
 * WHAT YOUR TESTS CAN FIND
 * ========================================================================
 * - A textbox labelled "Search products".
 * - A checkbox labelled "Dark mode", unticked at first.
 * - A region named "Product search" (<section aria-label="Product
 *   search">) around everything. Its className is "theme-light", or
 *   "theme-dark" when "Dark mode" is ticked.
 * - A status (<p role="status">) with the number of results: "1 result"
 *   for exactly one, otherwise "N results" (including "0 results").
 * - A list named "Results" (<ul aria-label="Results">) with one
 *   listitem per matching product, showing its name. When nothing
 *   matches, render the paragraph "No products found." instead of the
 *   list.
 *
 * ========================================================================
 * THE RULES
 * ========================================================================
 * Your component must:
 * 1. Keep the search text and the dark mode flag in state. The text
 *    starts empty and dark mode starts off.
 * 2. Get the visible products by calling `filter(products, query)`.
 *    Use the `filter` PROP, never `filterProducts` directly. (The prop
 *    defaults to filterProducts. Tests pass a spy instead.)
 * 3. Call `filter` once on the first render, and again only when
 *    `products`, the search text or `filter` changes.
 * 4. Not call `filter` when "Dark mode" is toggled, or when the parent
 *    re-renders with the same props.
 * 5. Show the result count and the list (or the empty message) as
 *    described above, based on the filtered products.
 *
 * You can assume:
 * - Product ids are unique.
 * - `filter` doesn't change the array it's given.
 *
 * ========================================================================
 * EXAMPLES
 * ========================================================================
 *     <ProductSearch products={sampleProducts} filter={spy} />
 *       first render          ->  spy called 1 time, with (products, "")
 *       type "ap"             ->  spy called 2 more times (one per letter)
 *                                 shows "2 results": Apple, Grapes
 *       tick "Dark mode"      ->  no new call. Class is "theme-dark"
 *       untick "Dark mode"    ->  still no new call
 *
 *     rerender with the same products array  ->  no new call
 *     rerender with a new products array     ->  1 new call
 *
 * ========================================================================
 * EDGE CASES TO TEST
 * ========================================================================
 * - First render: filter called exactly once, with the products and ""
 * - All products listed at first, with "6 results"
 * - Typing calls filter once per keystroke, and the last call gets the
 *   full text
 * - Toggling "Dark mode" changes the class and calls filter zero times
 * - Re-rendering with the same `products` array: zero calls
 * - Re-rendering with a new `products` array: exactly one call
 * - Exactly one match shows "1 result" (not "1 results")
 * - No match shows "0 results" and "No products found.", and no list
 *
 * ========================================================================
 * HINTS (read only if you get stuck)
 * ========================================================================
 * 1. Build it without useMemo first. Your filtering tests pass, but the
 *    "Dark mode calls filter zero times" test fails. Now you've proved
 *    the problem.
 * 2. The count and the list both come from the same filtered array.
 *    Don't put the filtered array in state. Work it out during render.
 * 3. Your function reads three outside values. Each one belongs in the
 *    dependency array.
 * 4. TESTING: wrap the real function in a spy, so it still works but
 *    records each call: `const spy = vi.fn(filterProducts);`. Then
 *    `expect(spy).toHaveBeenCalledTimes(1)` and
 *    `expect(spy).toHaveBeenLastCalledWith(sampleProducts, "ap")`.
 * 5. TESTING: `spy.mockClear()` resets the count, so the next
 *    expectation only counts what happened after it.
 *
 * ========================================================================
 * REACT CONCEPTS TO LEARN
 * ========================================================================
 * - useMemo and its dependency array
 * - Deriving values during render instead of copying them into state
 * - Why unrelated state changes still re-run every line of a component
 * - Spying on a function prop with vi.fn(realFunction)
 *
 * ========================================================================
 * STRETCH GOALS
 * ========================================================================
 * - Add a "Sort by price" checkbox. Sorting must also be memoized, but
 *   ticking it must not call `filter` again. (Hint: two useMemos.)
 * - Make filterProducts truly slow with a loop, then use <Profiler> in
 *   the playground to compare `actualDuration` with and without useMemo.
 */

import type { ReactElement } from "react";

export type Product = {
  id: number;
  name: string;
  price: number;
};

/**
 * PROVIDED: you don't need to change this.
 * Returns the products whose name contains `query`, ignoring case and
 * extra spaces. An empty query returns every product. Pretend it's slow.
 */
export function filterProducts(products: Product[], query: string): Product[] {
  const q = query.trim().toLowerCase();
  if (q === "") return products;
  return products.filter((p) => p.name.toLowerCase().includes(q));
}

/** PROVIDED: sample data for your tests and the playground. */
export const sampleProducts: Product[] = [
  { id: 1, name: "Apple", price: 0.5 },
  { id: 2, name: "Banana", price: 0.25 },
  { id: 3, name: "Cherry", price: 3 },
  { id: 4, name: "Grapes", price: 2.5 },
  { id: 5, name: "Lemon", price: 0.4 },
  { id: 6, name: "Mango", price: 1.2 },
];

export type ProductSearchProps = {
  /** All products. */
  products: Product[];
  /** The (slow) filter function. Default: filterProducts. */
  filter?: (products: Product[], query: string) => Product[];
};

export function ProductSearch({ products, filter = filterProducts }: ProductSearchProps): ReactElement {
  // TODO: build me, then make your tests pass.
  throw new Error("Not implemented: ProductSearch");
}
