/**
 * Tests for exercises/level13_apps/ex04_router_app.tsx
 *
 * Write your tests here first, run them and watch them fail, then build
 * the component until they pass. The "EDGE CASES TO TEST" section of the
 * exercise lists good cases to cover. Turn each `it.todo` into a real test.
 *
 * Run just this file:
 *     npm test -- ex04_router_app
 */

import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router';
import { describe, expect, it } from 'vitest';

import { AppRoutes, type Product } from './ex04_router_app';

describe('AppRoutes', () => {
  // A helper that renders the app as if the browser had opened `url`
  // (uncomment it together with the examples):
  //
  // function renderAt(url: string, products?: Product[]) {
  //   return render(
  //     <MemoryRouter initialEntries={[url]}>
  //       <AppRoutes products={products} />
  //     </MemoryRouter>,
  //   );
  // }

  // Examples to get you started:
  //
  // it("shows the home page at /", () => {
  //   renderAt("/");
  //   expect(screen.getByRole("heading", { level: 1, name: "Welcome to the shop" })).toBeInTheDocument();
  //   const nav = within(screen.getByRole("navigation", { name: "Main" }));
  //   expect(nav.getByRole("link", { name: "Home" })).toHaveAttribute("aria-current", "page");
  // });
  //
  // it("opens a product page from the list", async () => {
  //   const user = userEvent.setup();
  //   renderAt("/products");
  //   await user.click(screen.getByRole("link", { name: "Mug" }));
  //   expect(screen.getByRole("heading", { level: 1, name: "Mug" })).toBeInTheDocument();
  //   expect(screen.getByText("$8.00")).toBeInTheDocument();
  // });

  it.todo('shows the home heading at /, with only Home current');
  it.todo('lists every product with a link to its page');
  it.todo('opens a product page with its formatted price');
  it.todo('keeps Products current on a product page');
  it.todo('goes back to the list with Back to products');
  it.todo('shows Product not found for an unknown id');
  it.todo(
    'shows Page not found with the nav for an unknown address, and Go home works',
  );
  it.todo('uses a custom products prop');
});
