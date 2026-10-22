/**
 * Tests for exercises/level09_reducers_and_context/ex04_cart_context.tsx
 *
 * Write your tests here first, run them and watch them fail, then build
 * the reducer and components until they pass. The "EDGE CASES TO TEST"
 * section of the exercise lists good cases to cover. Turn each `it.todo`
 * into a real test.
 *
 * Run just this file:
 *     npm test -- ex04_cart_context
 */

import { render, renderHook, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it, vi } from 'vitest';

import {
  CartBadge,
  type CartItem,
  CartProvider,
  cartReducer,
  CartSummary,
  ProductList,
  SAMPLE_PRODUCTS,
  useCart,
} from './ex04_cart_context';

const [apple, bread] = SAMPLE_PRODUCTS;

// A small shop to test with. Uncomment it together with the examples.
//
// function Shop({ initialItems }: { initialItems?: CartItem[] }) {
//   return (
//     <CartProvider initialItems={initialItems}>
//       <CartBadge />
//       <ProductList products={SAMPLE_PRODUCTS} />
//       <CartSummary />
//     </CartProvider>
//   );
// }

describe('cartReducer', () => {
  // Example to get you started:
  //
  // it("adds a new product with quantity 1", () => {
  //   expect(cartReducer([], { type: "added", product: apple })).toEqual([
  //     { product: apple, quantity: 1 },
  //   ]);
  // });

  it.todo('adds 1 to the quantity of a product already in the cart');
  it.todo('keeps the other items as the same objects');
  it.todo('removes an item when its quantity goes from 1 to 0');
  it.todo('returns the same array for an unknown id');
  it.todo('returns the same array when clearing an empty cart');
});

describe('cart components', () => {
  // Remove any spies a test created (such as a silenced console.error).
  afterEach(() => {
    vi.restoreAllMocks();
  });

  // Example to get you started:
  //
  // it("shows one line for a product added twice", async () => {
  //   const user = userEvent.setup();
  //   render(<Shop />);
  //   await user.click(screen.getByRole("button", { name: "Add Apple to cart" }));
  //   await user.click(screen.getByRole("button", { name: "Add Apple to cart" }));
  //   const cart = screen.getByRole("list", { name: "Cart items" });
  //   expect(within(cart).getAllByRole("listitem")).toHaveLength(1);
  //   expect(cart).toHaveTextContent("Apple x 2");
  // });

  it.todo('shows an empty cart with a $0.00 total, Cart (0) and no Clear cart');
  it.todo('updates the badge and the total together');
  it.todo('removes the line when Decrease is clicked at quantity 1');
  it.todo('empties the cart with Clear cart');
  it.todo('shows initialItems straight away');
  it.todo('useCart throws outside a CartProvider');
});
