/**
 * Exercise: Shopping Cart
 * Level:    05 - Sharing State
 * Topics:   lifting state up, sibling components sharing state, derived
 *           totals, updating arrays of objects
 *
 * ========================================================================
 * YOUR TASK
 * ========================================================================
 * Build a <Shop>: a product list next to a cart. "Add to cart" in the
 * list changes the cart. The cart shows quantities you can change, a
 * Remove button per line, and the total price.
 *
 *     Products                         Cart
 *     Apple   $0.50  [ Add to cart ]   Apple   [−] 2 [+]  [ Remove ]
 *     Bread   $2.25  [ Add to cart ]   Milk    [−] 1 [+]  [ Remove ]
 *     Milk    $1.20  [ Add to cart ]   Total: $2.20
 *
 *     <Shop products={PRODUCTS} />
 *
 * ========================================================================
 * BACKGROUND: SIBLINGS THAT SHARE STATE
 * ========================================================================
 * It helps to split this UI into a ProductList and a Cart component.
 * But clicking a button in the ProductList must change what the Cart
 * shows, and siblings can't reach into each other. So the cart state
 * lives in their shared parent, <Shop>. Shop passes the cart down to
 * Cart, and passes an "add" function down to ProductList:
 *
 *     function Parent() {
 *       const [likes, setLikes] = useState<string[]>([]);
 *       return (
 *         <>
 *           <Gallery onLike={(photo) => setLikes([...likes, photo])} />
 *           <LikedList likes={likes} />
 *         </>
 *       );
 *     }
 *
 * ========================================================================
 * BACKGROUND: STORE THE MINIMUM
 * ========================================================================
 * The cart needs to remember only WHICH products are in it and HOW
 * MANY of each: `{ productId: "apple", quantity: 2 }`. The name and
 * price already live in `products`, so look them up instead of copying
 * them. The total is worked out from the cart on every render, so it is
 * never stored as state and can never be out of date.
 *
 * ========================================================================
 * WHAT YOUR TESTS CAN FIND
 * ========================================================================
 * Tests find elements by their ARIA role (what kind of thing it is) and
 * their accessible name (the text a screen reader reads out for it).
 * Your component must render exactly these:
 *
 * - A <section> named "Products": give it aria-labelledby pointing at
 *   its <h2>Products</h2>. A named section has the role "region", so
 *   tests use `getByRole("region", { name: "Products" })`.
 *   Inside: a list with one item per product, showing its name, its
 *   price (use the provided `formatPrice`), and a button named
 *   "Add Apple to cart" (with that product's name).
 * - A <section> named "Cart" in the same way, with <h2>Cart</h2>.
 *   Inside:
 *   - When the cart is empty: the text "Your cart is empty", and no list.
 *   - Otherwise a list with one item per cart line, holding the product
 *     name, buttons named "Decrease Apple", "Increase Apple" and
 *     "Remove Apple", and the quantity in
 *     <output aria-label="Apple quantity">2</output>. An <output> has
 *     the role "status", so tests use
 *     `getByRole("status", { name: "Apple quantity" })`.
 *   - Always: the total in <output aria-label="Total">$2.20</output>.
 *
 * ========================================================================
 * THE RULES
 * ========================================================================
 * Your component must:
 * 1. List every product, in order, with its formatted price.
 * 2. Start with an empty cart and a total of "$0.00".
 * 3. "Add <name> to cart" adds a new line with quantity 1 at the END of
 *    the cart, or adds 1 to the quantity if the product is already in
 *    the cart (never two lines for one product).
 * 4. "Increase <name>" adds 1 to that line's quantity.
 * 5. "Decrease <name>" takes 1 away. At quantity 1 it removes the line.
 * 6. "Remove <name>" removes the line, whatever its quantity.
 * 7. Show the total of price × quantity for every line, formatted with
 *    `formatPrice`.
 *
 * You can assume:
 * - Product ids and names are unique.
 *
 * ========================================================================
 * EXAMPLES
 * ========================================================================
 * Each line shows what the user does, then what they should see.
 *
 *     <Shop products={PRODUCTS} />
 *       "Your cart is empty", Total $0.00
 *       add Apple             ->  Apple quantity 1, Total $0.50
 *       add Apple again       ->  still one Apple line, quantity 2, $1.00
 *       add Milk              ->  Milk line below Apple, Total $2.20
 *       Decrease Milk         ->  Milk line gone, Total $1.00
 *       Remove Apple          ->  "Your cart is empty", Total $0.00
 *
 * ========================================================================
 * EDGE CASES TO TEST
 * ========================================================================
 * - Every product is listed with its formatted price ("$2.25")
 * - Empty cart: "Your cart is empty", no cart list, Total "$0.00"
 * - Adding the same product twice gives one line with quantity 2
 * - Lines stay in the order they were first added
 * - Increase and Decrease change the quantity and the total
 * - Decrease at quantity 1 removes the line
 * - Remove takes out a line with quantity 3 in one click
 * - Removing the last line shows "Your cart is empty" again
 * - The total adds cents correctly (3 × $0.50 + 1 × $1.20 = "$2.70")
 *
 * ========================================================================
 * HINTS (read only if you get stuck)
 * ========================================================================
 * 1. State in Shop: `CartLine[]`, where
 *    `type CartLine = { productId: string; quantity: number }`.
 * 2. One helper can do Add, Increase and Decrease: `changeQuantity(id,
 *    by)`. It adds a line when the product is missing, uses `map` to
 *    change the quantity, then `filter`s out lines whose quantity
 *    dropped to 0.
 * 3. Find a line's product with
 *    `products.find((p) => p.id === line.productId)`.
 * 4. The total: `lines.reduce((sum, line) => sum + price * line.quantity, 0)`.
 * 5. TESTING: use `within(cartRegion)` to look only inside the cart:
 *    `const cart = screen.getByRole("region", { name: "Cart" })`, then
 *    `within(cart).getAllByRole("listitem")`.
 *
 * ========================================================================
 * REACT CONCEPTS TO LEARN
 * ========================================================================
 * - Lifting state up so sibling components can share it
 * - Passing callbacks down so a child can change the parent's state
 * - Storing ids instead of copies, and deriving totals
 * - Updating an array of objects with map and filter
 *
 * ========================================================================
 * STRETCH GOALS
 * ========================================================================
 * - Show the number of items in the cart heading, like "Cart (3)".
 * - Add a `stock` field to products and disable "Add" at the limit.
 * - Keep the cart in localStorage so it survives a page reload.
 */

import type { ReactElement } from 'react';

export type Product = {
  /** A unique id, like "apple". */
  id: string;
  /** The product's name, shown in the list and the cart. */
  name: string;
  /** The price in dollars, like 2.25. */
  price: number;
};

/**
 * PROVIDED: you don't need to change this.
 * Sample products for your tests and the playground.
 */
export const PRODUCTS: Product[] = [
  { id: 'apple', name: 'Apple', price: 0.5 },
  { id: 'bread', name: 'Bread', price: 2.25 },
  { id: 'milk', name: 'Milk', price: 1.2 },
];

/**
 * PROVIDED: you don't need to change this.
 * Turns a number of dollars into text: 2.2 -> "$2.20", 0 -> "$0.00".
 */
export function formatPrice(dollars: number): string {
  return `$${dollars.toFixed(2)}`;
}

export type ShopProps = {
  /** The products for sale, in display order. */
  products: Product[];
};

export function Shop({ products }: ShopProps): ReactElement {
  // TODO: build me, then make your tests pass.
  throw new Error('Not implemented: Shop');
}
