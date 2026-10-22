/**
 * Exercise: Cart Context
 * Level:    09 - Reducers and Context
 * Topics:   useReducer + context together, derived values, provider +
 *           hook pattern, lists, Intl.NumberFormat
 *
 * ========================================================================
 * YOUR TASK
 * ========================================================================
 * Build a shopping cart that several separate components share. A
 * reducer decides how the cart changes, and a context hands the cart to
 * any component that needs it.
 *
 * - cartReducer: a pure function for the cart's actions.
 * - <CartProvider> and useCart(): share the cart.
 * - <ProductList>: products with an "Add to cart" button each.
 * - <CartSummary>: the items, + / - / Remove buttons, and the total.
 * - <CartBadge>: a small "Cart (3)" counter for a page header.
 *
 *     Cart (3)
 *
 *     Apple   $0.50  [ Add ]            Cart
 *     Bread   $2.25  [ Add ]            Apple x 2  [+] [-] [Remove]
 *     Cheese  $4.00  [ Add ]            Bread x 1  [+] [-] [Remove]
 *                                       Total: $3.25
 *                                       [ Clear cart ]
 *
 *     <CartProvider>
 *       <CartBadge />
 *       <ProductList products={SAMPLE_PRODUCTS} />
 *       <CartSummary />
 *     </CartProvider>
 *
 * ========================================================================
 * BACKGROUND: REDUCER + CONTEXT
 * ========================================================================
 * A reducer keeps all the update logic in one pure function. Context
 * shares a value with a whole tree. Together they make a small "store"
 * for your app:
 *
 *     function ScoreProvider({ children }: { children: ReactNode }) {
 *       const [score, dispatch] = useReducer(scoreReducer, 0);
 *       const value = {
 *         score,
 *         addPoint: () => dispatch({ type: "scored" }),
 *       };
 *       return <ScoreContext value={value}>{children}</ScoreContext>;
 *     }
 *
 * Components call friendly functions like addPoint(), and never need to
 * know about actions or dispatch.
 *
 * ========================================================================
 * BACKGROUND: DERIVED VALUES
 * ========================================================================
 * The total price and the item count come from the items. Don't keep
 * them in state too, or they can get out of step. Work them out while
 * rendering, from the items you have:
 *
 *     const totalWeight = boxes.reduce((sum, box) => sum + box.kg, 0);
 *
 * ========================================================================
 * WHAT YOUR TESTS CAN FIND
 * ========================================================================
 * ProductList:
 * - A list (<ul>) named "Products" (aria-label="Products"). The
 *   ACCESSIBLE NAME is what a screen reader reads out, and aria-label
 *   sets it.
 * - One list item per product, containing its name and price, such as
 *   "Apple" and "$0.50" (use the PROVIDED formatPrice).
 * - In each list item, a button named "Add Apple to cart".
 * CartSummary:
 * - A heading (<h2>) named "Cart".
 * - When the cart is empty: the text "Your cart is empty", and no list.
 * - Otherwise: a list (<ul>) named "Cart items", with one list item per
 *   cart item, in the order they were first added. Each list item's
 *   text includes "Apple x 2" (name, " x ", quantity).
 * - In each cart list item: buttons named "Increase Apple",
 *   "Decrease Apple" and "Remove Apple". Visible text can be "+", "-"
 *   and "Remove", with aria-label giving the full name.
 * - An element with role="status" and the text "Total: $3.25". It is
 *   always shown, even for an empty cart ("Total: $0.00").
 * - A button named "Clear cart", shown only when the cart is NOT empty.
 * CartBadge:
 * - The text "Cart (3)", where 3 is the total quantity of all items.
 *
 * ========================================================================
 * THE RULES
 * ========================================================================
 * cartReducer must:
 * 1. Never mutate the array or the items it is given.
 * 2. "added": if the product is already in the cart, add 1 to its
 *    quantity (a new item object). Otherwise add { product, quantity: 1 }
 *    at the end. Other items stay the same objects.
 * 3. "decremented": take 1 off the item's quantity. An item that
 *    reaches 0 is removed. Unknown id: return the SAME array.
 * 4. "removed": remove the item whatever its quantity. Unknown id:
 *    return the SAME array.
 * 5. "cleared": return an empty array. If the cart is already empty,
 *    return the SAME array.
 *
 * CartProvider and useCart must:
 * 6. CartProvider accepts `children` and optional `initialItems`
 *    (default: an empty cart), and keeps the items with useReducer and
 *    cartReducer.
 * 7. useCart returns { items, totalCount, totalPrice, addItem,
 *    decrementItem, removeItem, clearCart }. totalCount is the sum of
 *    all quantities, and totalPrice the sum of price x quantity.
 * 8. useCart throws an Error with the exact message
 *    "useCart must be used inside a CartProvider" outside a provider.
 *
 * The components must:
 * 9. Get everything they show from useCart (ProductList also takes the
 *    `products` prop).
 * 10. "Add Apple to cart" and "Increase Apple" add one Apple.
 *     "Decrease Apple" takes one away. "Remove Apple" removes the line.
 *     "Clear cart" empties the cart.
 *
 * You can assume:
 * - Product ids are unique.
 * - Prices are in dollars, like 2.25. formatPrice rounds to cents.
 *
 * ========================================================================
 * EXAMPLES
 * ========================================================================
 * The reducer (items written as name x quantity):
 *
 *     []                + added Apple        ->  [Apple x 1]
 *     [Apple x 1]       + added Apple        ->  [Apple x 2]
 *     [Apple x 2]       + decremented apple  ->  [Apple x 1]
 *     [Apple x 1]       + decremented apple  ->  []      0 means gone
 *     [Apple x 1]       + removed "nope"     ->  the SAME array
 *
 * The components, starting with an empty cart:
 *
 *     shows "Cart (0)", "Your cart is empty", "Total: $0.00"
 *     click "Add Apple to cart" twice  ->  "Apple x 2", "Cart (2)",
 *                                          "Total: $1.00"
 *     click "Add Bread to cart"        ->  "Cart (3)", "Total: $3.25"
 *     click "Remove Apple"             ->  "Cart (1)", "Total: $2.25"
 *     click "Clear cart"               ->  "Your cart is empty"
 *
 * ========================================================================
 * EDGE CASES TO TEST
 * ========================================================================
 * Reducer:
 * - Adding a new product puts it at the end with quantity 1
 * - Adding it again makes quantity 2, and other items stay the same
 *   objects (toBe)
 * - Decrementing quantity 1 removes the item
 * - Decrementing or removing an unknown id returns the same array
 * - Clearing an empty cart returns the same array
 * Components:
 * - Empty cart: "Your cart is empty", "Total: $0.00", "Cart (0)",
 *   and no "Clear cart" button
 * - Adding the same product twice shows one line "Apple x 2"
 * - The badge and total update together
 * - "Decrease Apple" at quantity 1 removes the line
 * - initialItems are shown straight away
 * - useCart outside a provider throws the exact message
 *
 * ========================================================================
 * HINTS (read only if you get stuck)
 * ========================================================================
 * 1. Write and test cartReducer first. It is a plain function, like
 *    todoReducer in exercise 01.
 * 2. To find an item: items.find((item) => item.product.id === id).
 *    To change one: items.map(...), and return a new object only for
 *    the matching item.
 * 3. In CartProvider, call useReducer, work out totalCount and
 *    totalPrice with reduce, then provide one object with everything
 *    useCart should return.
 * 4. CartSummary, ProductList and CartBadge are each short. They call
 *    useCart() and render.
 * 5. TESTING: render the three components inside one CartProvider, so
 *    they share a cart. To look inside one list, use within:
 *        const cart = screen.getByRole("list", { name: "Cart items" });
 *        expect(within(cart).getAllByRole("listitem")).toHaveLength(2);
 * 6. TESTING: test the reducer with SAMPLE_PRODUCTS, like
 *        cartReducer([], { type: "added", product: SAMPLE_PRODUCTS[0] })
 *
 * ========================================================================
 * REACT CONCEPTS TO LEARN
 * ========================================================================
 * - Combining useReducer and context into a small store
 * - Hiding dispatch behind friendly functions
 * - Deriving totals during render instead of storing them
 * - Several components sharing one piece of state, far apart in the tree
 *
 * ========================================================================
 * STRETCH GOALS
 * ========================================================================
 * - Provide `dispatch` and the cart in two separate contexts, so
 *   components that only add items don't re-render when the cart
 *   changes.
 * - Add a quantity limit: at most 10 of each product, with "Increase"
 *   disabled at the limit.
 * - Save the cart in localStorage.
 */

import { ReactNode, type ReactElement } from "react";

export type Product = {
  /** A unique id, such as "apple". */
  id: string;
  /** The name shown to the user. */
  name: string;
  /** The price in dollars, such as 2.25. */
  price: number;
};

export type CartItem = {
  /** The product in the cart. */
  product: Product;
  /** How many of it. Always 1 or more. */
  quantity: number;
};

export type CartAction =
  | { type: "added"; product: Product }
  | { type: "decremented"; id: string }
  | { type: "removed"; id: string }
  | { type: "cleared" };

export type CartContextValue = {
  /** The items in the cart, in the order they were first added. */
  items: readonly CartItem[];
  /** The sum of all quantities. */
  totalCount: number;
  /** The sum of price x quantity, in dollars. */
  totalPrice: number;
  /** Adds one of this product. */
  addItem: (product: Product) => void;
  /** Takes one of this product away. */
  decrementItem: (id: string) => void;
  /** Removes this product completely. */
  removeItem: (id: string) => void;
  /** Empties the cart. */
  clearCart: () => void;
};

// PROVIDED: you don't need to change this.
export const SAMPLE_PRODUCTS: readonly Product[] = [
  { id: "apple", name: "Apple", price: 0.5 },
  { id: "bread", name: "Bread", price: 2.25 },
  { id: "cheese", name: "Cheese", price: 4 },
];

// PROVIDED: you don't need to change this. formatPrice(3.25) -> "$3.25"
const priceFormat = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" });
export function formatPrice(price: number): string {
  return priceFormat.format(price);
}

export function cartReducer(items: readonly CartItem[], action: CartAction): readonly CartItem[] {
  // TODO: implement me, then make your tests pass.
  throw new Error("Not implemented: cartReducer");
}

export type CartProviderProps = {
  /** The part of the app that can use the cart. */
  children: ReactNode;
  /** The items in the cart at first. Default: an empty cart. */
  initialItems?: readonly CartItem[];
};

export function CartProvider({ children, initialItems = [] }: CartProviderProps): ReactElement {
  // TODO: build me, then make your tests pass.
  throw new Error("Not implemented: CartProvider");
}

export function useCart(): CartContextValue {
  // TODO: implement me, then make your tests pass.
  throw new Error("Not implemented: useCart");
}

export type ProductListProps = {
  /** The products a user can add. */
  products: readonly Product[];
};

export function ProductList({ products }: ProductListProps): ReactElement {
  // TODO: build me, then make your tests pass.
  throw new Error("Not implemented: ProductList");
}

export function CartSummary(): ReactElement {
  // TODO: build me, then make your tests pass.
  throw new Error("Not implemented: CartSummary");
}

export function CartBadge(): ReactElement {
  // TODO: build me, then make your tests pass.
  throw new Error("Not implemented: CartBadge");
}
