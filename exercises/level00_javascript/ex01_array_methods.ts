/**
 * Exercise: Array Methods
 * Level:    00 - Modern JavaScript for React
 * Topics:   map, filter, reduce, find, some, every, arrow functions
 *
 * ========================================================================
 * YOUR TASK
 * ========================================================================
 * Write six small helper functions that answer questions about a list of
 * products. Each one takes an array and returns a new value. None of them
 * changes the array it was given.
 *
 *     inStockNames(products)  ->  ["Lamp", "Mug"]
 *
 * ========================================================================
 * BACKGROUND: ARRAY METHODS
 * ========================================================================
 * React code is full of arrays: a list of todos, a list of users, a cart.
 * Instead of writing `for` loops, React code almost always uses array
 * METHODS. Each one takes a small function (a "callback") and calls it
 * once per item. Here they are on a list of numbers:
 *
 *     const nums = [1, 2, 3, 4];
 *
 *     nums.map((n) => n * 10);          // [10, 20, 30, 40]  change each item
 *     nums.filter((n) => n > 2);        // [3, 4]            keep some items
 *     nums.find((n) => n > 2);          // 3                 first match
 *     nums.find((n) => n > 9);          // undefined         no match
 *     nums.some((n) => n > 3);          // true              at least one?
 *     nums.every((n) => n > 0);         // true              all of them?
 *     nums.reduce((sum, n) => sum + n, 0);  // 10            boil down to one value
 *
 * `(n) => n * 10` is an ARROW FUNCTION: a short way to write a function.
 * It takes `n` and returns `n * 10`.
 *
 * `reduce` is the tricky one. It walks the array carrying a value along
 * (here `sum`). The `0` at the end is the starting value. Each call
 * returns the new carried value. It can build any kind of result: a
 * number, a string, or even an object.
 *
 * map, filter, find, some, every and reduce never change the original
 * array. That matters a lot in React, as you'll see in the next
 * exercises.
 *
 * The functions below take a `readonly Product[]`. That means "an array
 * you may read but not change". TypeScript then refuses calls like
 * `products.push(...)` or `products.sort()` that would change it.
 *
 * ========================================================================
 * THE RULES
 * ========================================================================
 * Each `price` is a whole number of CENTS, so 1999 means $19.99. Whole
 * numbers add up exactly, while decimals like 0.1 + 0.2 do not.
 *
 * Your functions must:
 * 1. inStockNames(products): return the names of the products that are
 *    in stock, in their original order.
 * 2. totalPrice(products): return the sum of all prices. An empty array
 *    adds up to 0.
 * 3. findById(products, id): return the product with that id, or
 *    `undefined` when there is none.
 * 4. anySoldOut(products): return true if at least one product is NOT in
 *    stock.
 * 5. allCheaperThan(products, limit): return true if every price is
 *    strictly below `limit`.
 * 6. groupByCategory(products): return an object whose keys are the
 *    categories and whose values are arrays of the products in that
 *    category, in their original order.
 * 7. Never change (mutate) the array or the products you were given.
 *
 * You can assume:
 * - Product ids are unique.
 * - Prices are whole numbers of zero or more.
 *
 * ========================================================================
 * EXAMPLES
 * ========================================================================
 * With these products:
 *
 *     lamp = { id: 1, name: "Lamp", price: 2500, category: "home",   inStock: true  }
 *     pen  = { id: 2, name: "Pen",  price: 150,  category: "office", inStock: false }
 *     mug  = { id: 3, name: "Mug",  price: 800,  category: "home",   inStock: true  }
 *
 *     inStockNames([lamp, pen, mug])          ->  ["Lamp", "Mug"]
 *     totalPrice([lamp, pen, mug])            ->  3450
 *     findById([lamp, pen, mug], 3)           ->  mug
 *     findById([lamp, pen, mug], 99)          ->  undefined
 *     anySoldOut([lamp, pen, mug])            ->  true    the pen is sold out
 *     allCheaperThan([lamp, pen, mug], 3000)  ->  true
 *     allCheaperThan([lamp, pen, mug], 2500)  ->  false   2500 is not BELOW 2500
 *     groupByCategory([lamp, pen, mug])       ->  { home: [lamp, mug], office: [pen] }
 *
 * ========================================================================
 * EDGE CASES TO TEST
 * ========================================================================
 * - inStockNames([]) -> []
 * - inStockNames when nothing is in stock -> []
 * - totalPrice([]) -> 0
 * - findById returns the very same product object, not a copy
 * - findById with an id that doesn't exist -> undefined
 * - anySoldOut([]) -> false (there is nothing to be sold out)
 * - allCheaperThan with a price equal to the limit -> false
 * - allCheaperThan([], 100) -> true (nothing breaks the rule, so "every"
 *   is true. This surprises a lot of people.)
 * - groupByCategory keeps the original order inside each group
 * - groupByCategory([]) -> {}
 * - None of the functions change their input (freeze it in your test
 *   with `Object.freeze(products)`, then call the function)
 *
 * ========================================================================
 * HINTS (read only if you get stuck)
 * ========================================================================
 * 1. Some answers chain two methods. For inStockNames, first keep the
 *    right products, then turn each product into its name.
 * 2. Each of findById, anySoldOut and allCheaperThan is a single method
 *    call. Pick the one whose name matches the question.
 * 3. For groupByCategory, use reduce with an empty object `{}` as the
 *    starting value. For each product, make sure the group for its
 *    category exists (an empty array if not), then add the product to
 *    it, and return the object. Changing the object you are building
 *    inside reduce is fine, because it's yours. Changing the products is
 *    not.
 * 4. TypeScript needs to know the type of that starting `{}`. Write
 *    `products.reduce<Record<string, Product[]>>(..., {})`.
 * 5. TESTING: `toEqual` compares arrays and objects by their contents.
 *    `toBe` checks that two things are the very same object. Use
 *    `toBe(mug)` to prove findById returned the real product, not a copy.
 *
 * ========================================================================
 * JAVASCRIPT CONCEPTS TO LEARN
 * ========================================================================
 * - Arrow functions and callbacks
 * - map, filter, find, some, every and reduce
 * - Chaining array methods
 * - Why these methods return new values instead of changing the array
 * - `toEqual` (same contents) versus `toBe` (the same object)
 *
 * ========================================================================
 * STRETCH GOALS
 * ========================================================================
 * - Write `cheapest(products)` that returns the product with the lowest
 *   price, or undefined for an empty array, using reduce.
 * - Write `formatCents(2500)` that returns "$25.00".
 * - Look up `Object.groupBy` and compare it with your groupByCategory.
 */

export type Product = {
  /** A unique number for this product. */
  id: number;
  /** The product's name, e.g. "Lamp". */
  name: string;
  /** The price in whole cents: 1999 means $19.99. */
  price: number;
  /** A category name, e.g. "home". */
  category: string;
  /** True when the shop has at least one left. */
  inStock: boolean;
};

export function inStockNames(products: readonly Product[]): string[] {
  // TODO: implement me, then make your tests pass.
  throw new Error("Not implemented: inStockNames");
}

export function totalPrice(products: readonly Product[]): number {
  // TODO: implement me, then make your tests pass.
  throw new Error("Not implemented: totalPrice");
}

export function findById(products: readonly Product[], id: number): Product | undefined {
  // TODO: implement me, then make your tests pass.
  throw new Error("Not implemented: findById");
}

export function anySoldOut(products: readonly Product[]): boolean {
  // TODO: implement me, then make your tests pass.
  throw new Error("Not implemented: anySoldOut");
}

export function allCheaperThan(products: readonly Product[], limit: number): boolean {
  // TODO: implement me, then make your tests pass.
  throw new Error("Not implemented: allCheaperThan");
}

export function groupByCategory(products: readonly Product[]): Record<string, Product[]> {
  // TODO: implement me, then make your tests pass.
  throw new Error("Not implemented: groupByCategory");
}
