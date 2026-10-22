/**
 * Exercise: Product Card
 * Level:    01 - JSX and Components
 * Topics:   JSX attributes, images and alt text, Intl.NumberFormat, className
 *
 * ========================================================================
 * YOUR TASK
 * ========================================================================
 * Build a <ProductCard> that shows one product from a shop: its picture,
 * its name, its price written as money, and a "Sold out" badge when there
 * are none left.
 *
 *     +----------------------+
 *     |  [ picture of mug ]  |
 *     |  Coffee Mug          |   <- heading
 *     |  $12.50              |
 *     |  Sold out            |   <- only when stock is 0
 *     +----------------------+
 *
 *     <ProductCard product={mug} />
 *
 * ========================================================================
 * BACKGROUND: ATTRIBUTES IN JSX, AND FORMATTING MONEY
 * ========================================================================
 * JSX attributes look like HTML, with a few differences:
 *
 *     <img src={photo.url} alt="A red bicycle" />
 *     <p className="note">Hi</p>
 *
 * - Values from JavaScript go in braces: `src={photo.url}`.
 * - Tags with nothing inside must close themselves: `<img ... />`.
 * - `class` is a JavaScript keyword, so JSX uses `className` instead.
 *
 * The `alt` text of an image is what a screen reader reads out instead of
 * the picture. It's also shown if the image fails to load. Describe what
 * the picture shows.
 *
 * Writing money by hand ("$" + price) breaks quickly: 12.5 becomes
 * "$12.5", and 1234 needs a comma. JavaScript has a built-in formatter:
 *
 *     const euros = new Intl.NumberFormat("en-US", {
 *       style: "currency",
 *       currency: "EUR",
 *     });
 *     euros.format(3);        // "€3.00"
 *     euros.format(1500.5);   // "€1,500.50"
 *
 * ========================================================================
 * WHAT YOUR TESTS CAN FIND
 * ========================================================================
 * Tests find elements by their ARIA ROLE (what kind of thing it is) and
 * ACCESSIBLE NAME (what a screen reader reads out for it). Your component
 * must render:
 *
 * - An <article> around the whole card (role "article").
 * - A heading of level 2 (an <h2>) whose text is the product name.
 * - An image (role "img") whose accessible name is the product name. An
 *   image's accessible name comes from its `alt` text.
 * - The formatted price as text in its own element, e.g. <p>$12.50</p>.
 * - When the stock is 0, the text "Sold out" in its own element, e.g.
 *   <span className="badge">Sold out</span>. When the stock is above 0,
 *   no "Sold out" text at all.
 *
 * ========================================================================
 * THE RULES
 * ========================================================================
 * Your component must:
 * 1. Accept a `product` prop and an optional `currency` prop (default
 *    "USD").
 * 2. Wrap everything in an <article>.
 * 3. Show the product name in an <h2>.
 * 4. Show an <img> whose `src` is `product.imageUrl` and whose `alt` is
 *    `product.name`.
 * 5. Show the price formatted with Intl.NumberFormat, locale "en-US",
 *    style "currency", in the given currency.
 * 6. Show "Sold out" when `product.stock` is 0, and nothing in its place
 *    otherwise.
 *
 * You can assume:
 * - `price` is a number of dollars (or euros...) of zero or more, like
 *   12.5. `stock` is a whole number of zero or more.
 *
 * ========================================================================
 * EXAMPLES
 * ========================================================================
 *     mug = { id: 1, name: "Coffee Mug", price: 12.5,
 *             imageUrl: "/img/mug.png", stock: 3 }
 *
 *     <ProductCard product={mug} />
 *       heading "Coffee Mug", image named "Coffee Mug", text "$12.50",
 *       and no "Sold out"
 *     <ProductCard product={{ ...mug, stock: 0 }} />
 *       the same, plus "Sold out"
 *     <ProductCard product={{ ...mug, price: 1234 }} />
 *       shows "$1,234.00"                 a comma, and two decimals
 *     <ProductCard product={mug} currency="EUR" />
 *       shows "€12.50"
 *
 * ========================================================================
 * EDGE CASES TO TEST
 * ========================================================================
 * - The card is an article: `getByRole("article")`
 * - The heading is level 2 and holds the product name
 * - The image has the product name as alt text, and the right src
 *   (`toHaveAttribute("src", "/img/mug.png")`)
 * - 12.5 is shown as "$12.50"
 * - 1234 is shown as "$1,234.00"
 * - 0 is shown as "$0.00"
 * - currency="EUR" shows "€12.50"
 * - stock 0 -> "Sold out" is shown
 * - stock 1 -> no "Sold out" (use `queryByText`, which returns null
 *   instead of failing)
 *
 * ========================================================================
 * HINTS (read only if you get stuck)
 * ========================================================================
 * 1. Make the formatted price in a variable before `return`, then put it
 *    in the JSX with `{price}`.
 * 2. To show something only sometimes, compute it before `return`:
 *    `const badge = product.stock === 0 ? <span>Sold out</span> : null;`
 *    React draws nothing for `null`. (Exercise 3 shows a shorter way, and
 *    its trap.)
 * 3. Put the image inside the article too. The order inside doesn't
 *    matter to the tests.
 * 4. TESTING: `screen.getByText("$12.50")` finds an element whose whole
 *    text is "$12.50". To prove something is NOT there, use
 *    `expect(screen.queryByText("Sold out")).not.toBeInTheDocument()`.
 *
 * ========================================================================
 * REACT CONCEPTS TO LEARN
 * ========================================================================
 * - JSX attributes: braces for values, `className`, self-closing tags
 * - Alt text, and how it becomes an image's accessible name
 * - Object props (passing a whole `product`)
 * - Optional props with a default value
 * - Formatting values before you render them
 *
 * ========================================================================
 * STRETCH GOALS
 * ========================================================================
 * - Add a `locale` prop, and try "de-DE" with EUR. Where does the € go?
 * - Show "Only 2 left!" when the stock is 1 to 3.
 * - Give the article a name: `aria-labelledby` pointing to the heading's
 *   `id`. Then `getByRole("article", { name: "Coffee Mug" })` works.
 */

import type { ReactElement } from 'react';

export type Product = {
  /** A unique number for this product. */
  id: number;
  /** The product's name, e.g. "Coffee Mug". */
  name: string;
  /** The price in whole units of money (dollars, euros...), e.g. 12.5. */
  price: number;
  /** Where the product's picture lives. */
  imageUrl: string;
  /** How many are left. 0 means sold out. */
  stock: number;
};

export type ProductCardProps = {
  /** The product to show. */
  product: Product;
  /** A currency code such as "USD" or "EUR". Default "USD". */
  currency?: string;
};

export function ProductCard({
  product,
  currency = 'USD',
}: ProductCardProps): ReactElement {
  // TODO: build me, then make your tests pass.
  throw new Error('Not implemented: ProductCard');
}
