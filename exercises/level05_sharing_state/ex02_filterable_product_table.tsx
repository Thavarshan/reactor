/**
 * Exercise: Filterable Product Table
 * Level:    05 - Sharing State
 * Topics:   splitting a UI into components, deciding where state lives,
 *           passing state down and changes up, grouping rows
 *
 * ========================================================================
 * YOUR TASK
 * ========================================================================
 * Build a searchable product table out of three components. The search
 * box and the checkbox live in <SearchBar>. The table lives in
 * <ProductTable>. Their shared parent, <FilterableProductTable>, owns
 * the state and connects them.
 *
 *     Search [ p            ]
 *     [x] Only show products in stock
 *
 *     Name           Price
 *     Fruits
 *     Apple          $1
 *     Vegetables
 *     Spinach        $2
 *     Peas           $1
 *
 *     <FilterableProductTable products={PRODUCTS} />
 *
 * ========================================================================
 * BACKGROUND: WHERE SHOULD STATE LIVE?
 * ========================================================================
 * Ask two questions about each piece of state:
 *
 * 1. Which components USE it? Here, SearchBar shows the search text,
 *    and ProductTable uses it to filter rows.
 * 2. What is their closest common parent? That parent owns the state.
 *
 * The owner passes the values down as props. It also passes down
 * functions the children call to ask for a change. That is how a
 * child "sends data up":
 *
 *     function Page() {
 *       const [dark, setDark] = useState(false);
 *       return (
 *         <>
 *           <Settings dark={dark} onDarkChange={setDark} />
 *           <Preview dark={dark} />
 *         </>
 *       );
 *     }
 *
 * Settings and Preview never talk to each other directly. They both
 * talk to Page.
 *
 * ========================================================================
 * WHAT YOUR TESTS CAN FIND
 * ========================================================================
 * Tests find elements by their ARIA role (what kind of thing it is) and
 * their accessible name (the text a screen reader reads out for it).
 * Your components must render exactly these:
 *
 * <SearchBar>:
 * - An <input type="search"> named "Search" (role "searchbox"). Use a
 *   <label>, or aria-label="Search".
 * - A checkbox named "Only show products in stock".
 *
 * <ProductTable>:
 * - A <table>. Its first row is a header row with two <th> cells,
 *   "Name" and "Price" (role "columnheader").
 * - For each category, ONE category row: a <tr> with a single
 *   <th colSpan={2}> holding the category name. A <th> has the role
 *   "columnheader", so tests can use
 *   `getByRole("columnheader", { name: "Fruits" })`.
 * - Under it, one row per product: <tr><td>Apple</td><td>$1</td></tr>.
 * - When no product matches, NO table at all, and instead the text
 *   "No products found." (with the full stop).
 *
 * <FilterableProductTable>: a SearchBar above a ProductTable.
 *
 * ========================================================================
 * THE RULES
 * ========================================================================
 * <SearchBar> must:
 * 1. Show `filterText` in the search box and tick the checkbox when
 *    `inStockOnly` is true. It keeps no state of its own.
 * 2. Call `onFilterTextChange` with the new text on every keystroke,
 *    and `onInStockOnlyChange` with the new true or false when the
 *    checkbox is clicked.
 *
 * <ProductTable> must:
 * 3. Show only the products whose name contains `filterText` (spaces
 *    trimmed, upper and lower case ignored).
 * 4. When `inStockOnly` is true, also hide products with
 *    `stocked: false`.
 * 5. Group the products under their category rows. Categories appear
 *    in the order they first appear in `products`, and products keep
 *    their order inside each category.
 * 6. Leave out a category row when none of its products are shown.
 * 7. Show "No products found." instead of the table when nothing is
 *    left.
 *
 * <FilterableProductTable> must:
 * 8. Own the two pieces of state (filter text "" and in-stock-only
 *    false at the start) and pass them to both children.
 *
 * You can assume:
 * - Product names are unique.
 * - All the products of one category may be spread out in the list
 *   (not always next to each other).
 *
 * ========================================================================
 * EXAMPLES
 * ========================================================================
 * Each line shows what the user does, then what they should see.
 *
 *     <FilterableProductTable products={PRODUCTS} />
 *       all six products, under "Fruits" and "Vegetables"
 *       type "fruit"           ->  Dragonfruit, Passionfruit (Fruits only)
 *       tick "in stock"        ->  Dragonfruit only    Passionfruit is out
 *       type "zzz" instead     ->  "No products found."
 *
 *     <ProductTable products={PRODUCTS} filterText="" inStockOnly={true} />
 *       Apple, Dragonfruit, Spinach, Peas
 *
 *     <SearchBar filterText="" inStockOnly={false} onInStockOnlyChange={spy} ... />
 *       click the checkbox  ->  spy(true)
 *
 * ========================================================================
 * EDGE CASES TO TEST
 * ========================================================================
 * - SearchBar shows its props and calls its two callbacks
 * - ProductTable with no filters: every product under its category, in
 *   order, after the "Name" and "Price" header
 * - The search ignores case and spaces around the text
 * - inStockOnly hides products that are out of stock
 * - A category with nothing to show loses its category row
 * - Products of one category that are far apart in the list still end
 *   up under ONE category row
 * - Nothing matches: no table, "No products found."
 * - FilterableProductTable: typing and ticking filter the table together
 *
 * ========================================================================
 * HINTS (read only if you get stuck)
 * ========================================================================
 * 1. Do the filtering first, with `filter`, to get the visible products.
 * 2. Then make the list of categories from the visible products:
 *    `[...new Set(visible.map((p) => p.category))]` keeps the order in
 *    which they first appear and drops repeats.
 * 3. For each category, render its <th> row, then
 *    `visible.filter((p) => p.category === category)` as product rows.
 *    A Fragment with a key groups the rows:
 *    `<Fragment key={category}>...</Fragment>`.
 * 4. TESTING: read the table row by row:
 *    `screen.getAllByRole("row").map((row) =>
 *       Array.from(row.querySelectorAll("th, td"), (cell) => cell.textContent))`
 *    gives an array like `[["Name", "Price"], ["Fruits"], ["Apple", "$1"]]`
 *    that you can compare with `toEqual`.
 *
 * ========================================================================
 * REACT CONCEPTS TO LEARN
 * ========================================================================
 * - Breaking a UI into a component hierarchy
 * - Finding the right owner for each piece of state
 * - Data flows down as props, changes flow up through callbacks
 * - Grouping derived data while rendering
 *
 * ========================================================================
 * STRETCH GOALS
 * ========================================================================
 * - Show the names of out-of-stock products in red.
 * - Add a "Sort by price" checkbox.
 * - Show "3 of 6 products" under the table.
 */

import type { ReactElement } from 'react';

export type Product = {
  /** The product's name, unique. */
  name: string;
  /** The category it is listed under, like "Fruits". */
  category: string;
  /** The price, already formatted, like "$1". */
  price: string;
  /** false when the product is out of stock. */
  stocked: boolean;
};

/**
 * PROVIDED: you don't need to change this.
 * Sample products for your tests and the playground.
 */
export const PRODUCTS: Product[] = [
  { category: 'Fruits', price: '$1', stocked: true, name: 'Apple' },
  { category: 'Fruits', price: '$1', stocked: true, name: 'Dragonfruit' },
  { category: 'Fruits', price: '$2', stocked: false, name: 'Passionfruit' },
  { category: 'Vegetables', price: '$2', stocked: true, name: 'Spinach' },
  { category: 'Vegetables', price: '$4', stocked: false, name: 'Pumpkin' },
  { category: 'Vegetables', price: '$1', stocked: true, name: 'Peas' },
];

export type SearchBarProps = {
  /** The text to show in the search box. */
  filterText: string;
  /** Whether the "in stock" checkbox is ticked. */
  inStockOnly: boolean;
  /** Called with the new search text on every keystroke. */
  onFilterTextChange: (text: string) => void;
  /** Called with true or false when the checkbox is clicked. */
  onInStockOnlyChange: (inStockOnly: boolean) => void;
};

export type ProductTableProps = {
  /** Every product. The table decides which ones to show. */
  products: Product[];
  /** Only show products whose name contains this text. */
  filterText: string;
  /** When true, hide products that are out of stock. */
  inStockOnly: boolean;
};

export type FilterableProductTableProps = {
  /** Every product. */
  products: Product[];
};

export function SearchBar({
  filterText,
  inStockOnly,
  onFilterTextChange,
  onInStockOnlyChange,
}: SearchBarProps): ReactElement {
  // TODO: build me, then make your tests pass.
  throw new Error('Not implemented: SearchBar');
}

export function ProductTable({
  products,
  filterText,
  inStockOnly,
}: ProductTableProps): ReactElement {
  // TODO: build me, then make your tests pass.
  throw new Error('Not implemented: ProductTable');
}

export function FilterableProductTable({
  products,
}: FilterableProductTableProps): ReactElement {
  // TODO: build me, then make your tests pass.
  throw new Error('Not implemented: FilterableProductTable');
}
