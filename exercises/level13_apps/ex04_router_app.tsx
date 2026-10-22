/**
 * Exercise: A small shop with pages (react-router)
 * Level:    13 - Small Apps
 * Topics:   Routes and Route, URL parameters (useParams), Link and
 *           NavLink, layout routes with Outlet, 404 pages
 *
 * ========================================================================
 * YOUR TASK
 * ========================================================================
 * Build <AppRoutes>: the pages of a tiny shop. A navigation bar sits on
 * every page. "/" is the home page, "/products" lists the products,
 * "/products/2" shows product 2, and any other address shows "Page not
 * found".
 *
 *     [Home] [Products]                    <- the current one is marked
 *     ------------------------------------------------
 *     Products
 *       - Teapot          (links to /products/1)
 *       - Mug             (links to /products/2)
 *
 *     <BrowserRouter>        // in the real app
 *       <AppRoutes />
 *     </BrowserRouter>
 *
 * ========================================================================
 * BACKGROUND: CLIENT-SIDE ROUTING
 * ========================================================================
 * A router shows different components for different URLs, without
 * reloading the page. With react-router you describe the pages with
 * <Routes> and <Route>:
 *
 *     import { Link, Outlet, Route, Routes, useParams } from "react-router";
 *
 *     <Routes>
 *       <Route path="/" element={<Home />} />
 *       <Route path="/books/:bookId" element={<Book />} />   // ":bookId" is a URL parameter
 *       <Route path="*" element={<Missing />} />              // "*" matches anything else
 *     </Routes>
 *
 *     function Book() {
 *       const { bookId } = useParams();   // "/books/7" -> bookId is "7" (a string!)
 *       ...
 *     }
 *
 * Use <Link to="/books/7">Book 7</Link> instead of <a href>. It changes
 * the URL without reloading the page.
 *
 * <NavLink> is a Link that knows if it points at the current page. Then
 * it adds aria-current="page" (screen readers say "current page") and
 * the CSS class "active". With `end`, it only counts an EXACT match.
 *
 * A "layout route" is a Route without a path that wraps other routes.
 * Its element renders the shared parts, plus an <Outlet /> where the
 * matching child page goes:
 *
 *     <Route element={<Layout />}>          // Layout renders <nav> and <Outlet />
 *       <Route path="/" element={<Home />} />
 *     </Route>
 *
 * The router itself (<BrowserRouter>, or <MemoryRouter> in tests) wraps
 * your routes from the OUTSIDE. That's why AppRoutes doesn't include
 * one: the tests choose the starting URL.
 *
 * ========================================================================
 * WHAT YOUR TESTS CAN FIND
 * ========================================================================
 * On every page:
 * - <nav aria-label="Main"> (role "navigation", name "Main") with two
 *   NavLinks: "Home" (to "/", with `end`) and "Products" (to
 *   "/products"). The link for the current section has
 *   aria-current="page". "Products" stays current on "/products/2" too.
 * - Exactly one <h1> per page:
 *   - "/"              ->  <h1>Welcome to the shop</h1>
 *   - "/products"      ->  <h1>Products</h1>, then a <ul> with one
 *                          <li> per product holding a link named after
 *                          the product, pointing to "/products/<id>"
 *   - "/products/<id>" ->  <h1>product name</h1>, a <p> with the price
 *                          like "$12.50", and a link "Back to products"
 *   - unknown id       ->  <h1>Product not found</h1> and the
 *                          "Back to products" link
 *   - anything else    ->  <h1>Page not found</h1> and a link "Go home"
 *                          pointing to "/"
 *
 * ========================================================================
 * THE RULES
 * ========================================================================
 * Your component must:
 * 1. Accept an optional `products` prop (default: PRODUCTS) and use it
 *    for the list and detail pages.
 * 2. Render the routes listed above, with the nav on every page,
 *    including the "Page not found" page.
 * 3. Read the id on the detail page with useParams, and find the
 *    product whose `id` matches.
 * 4. Format prices as US dollars with Intl.NumberFormat (12.5 ->
 *    "$12.50").
 * 5. Use Link and NavLink for every link, so clicking never reloads the
 *    page.
 *
 * You can assume:
 * - Product ids are unique strings.
 *
 * ========================================================================
 * EXAMPLES
 * ========================================================================
 *     start at "/"                ->  "Welcome to the shop", Home is current
 *     click "Products"            ->  the list, Products is current
 *     click "Mug"                 ->  "Mug", "$8.00", Products still current
 *     click "Back to products"    ->  the list again
 *     start at "/products/99"     ->  "Product not found"
 *     start at "/basket"          ->  "Page not found", the nav is shown,
 *                                     neither link is current
 *     click "Go home"             ->  "Welcome to the shop"
 *
 * ========================================================================
 * EDGE CASES TO TEST
 * ========================================================================
 * - "/" shows the home heading, and only "Home" is current
 * - "/products" lists every product with a link to its page
 * - Clicking a product opens its page with the formatted price
 * - "Products" stays current on a product page
 * - "Back to products" returns to the list
 * - An unknown product id shows "Product not found"
 * - An unknown address shows "Page not found" with the nav, and
 *   "Go home" works
 * - A custom `products` prop is used instead of PRODUCTS
 *
 * ========================================================================
 * HINTS (read only if you get stuck)
 * ========================================================================
 * 1. Write small page components (Home, ProductList, ProductPage,
 *    NotFound, Layout) in this file. Pass `products` down as a prop.
 * 2. Put every page route inside one layout route, so the nav shows on
 *    all of them, the "*" route included.
 * 3. The `:id` you get from useParams is a string, or undefined. Compare
 *    it with `product.id`, which is a string too.
 * 4. `new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(8)`
 *    gives "$8.00".
 * 5. TESTING: wrap AppRoutes in a MemoryRouter, a router that keeps
 *    the URL in memory instead of the address bar. `initialEntries`
 *    picks the starting URL:
 *        render(
 *          <MemoryRouter initialEntries={["/products/2"]}>
 *            <AppRoutes />
 *          </MemoryRouter>,
 *        );
 * 6. TESTING: check the current link with
 *    `expect(link).toHaveAttribute("aria-current", "page")`, and the
 *    others with `.not.toHaveAttribute("aria-current")`. Find the nav
 *    links with `within(screen.getByRole("navigation", { name: "Main" }))`.
 *    (A product could be named "Products" too!)
 * 7. TESTING: a link's address is its href:
 *    `expect(link).toHaveAttribute("href", "/products/2")`.
 *
 * ========================================================================
 * REACT CONCEPTS TO LEARN
 * ========================================================================
 * - Routes, Route, URL parameters and useParams
 * - Link and NavLink (aria-current for the active page)
 * - Layout routes and Outlet
 * - A catch-all "*" route for 404 pages
 * - Testing routes with MemoryRouter
 *
 * ========================================================================
 * STRETCH GOALS
 * ========================================================================
 * - Add "/products?sort=price" using useSearchParams, with buttons to
 *   sort by name or price.
 * - Set document.title on each page ("Mug | Shop").
 * - Add a "/basket" page and an "Add to basket" button. Keep the basket
 *   in state in the Layout and pass it down with useOutletContext.
 */

import type { ReactElement } from "react";

export type Product = {
  /** A unique id, used in the URL: /products/<id>. */
  id: string;
  name: string;
  /** The price in US dollars, e.g. 12.5. */
  price: number;
};

/** PROVIDED: you don't need to change this. The default products. */
export const PRODUCTS: Product[] = [
  { id: "1", name: "Teapot", price: 24.5 },
  { id: "2", name: "Mug", price: 8 },
  { id: "3", name: "Tea towel", price: 12.25 },
];

export type AppRoutesProps = {
  /** The products to show. Default: PRODUCTS. */
  products?: Product[];
};

export function AppRoutes({ products = PRODUCTS }: AppRoutesProps): ReactElement {
  // TODO: build me, then make your tests pass.
  throw new Error("Not implemented: AppRoutes");
}
