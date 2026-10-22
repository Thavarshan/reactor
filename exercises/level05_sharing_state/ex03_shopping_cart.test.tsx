/**
 * Tests for exercises/level05_sharing_state/ex03_shopping_cart.tsx
 *
 * Write your tests here first, run them and watch them fail, then build
 * the component until they pass. The "EDGE CASES TO TEST" section of the
 * exercise lists good cases to cover. Turn each `it.todo` into a real test.
 *
 * Run just this file:
 *     npm test -- ex03_shopping_cart
 */

import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import { PRODUCTS, Shop } from "./ex03_shopping_cart";

describe("Shop", () => {
  // Examples to get you started:
  //
  // it("starts with an empty cart", () => {
  //   render(<Shop products={PRODUCTS} />);
  //   const cart = screen.getByRole("region", { name: "Cart" });
  //   expect(within(cart).getByText("Your cart is empty")).toBeInTheDocument();
  //   expect(screen.getByRole("status", { name: "Total" })).toHaveTextContent("$0.00");
  // });
  //
  // it("adds a product to the cart", async () => {
  //   const user = userEvent.setup();
  //   render(<Shop products={PRODUCTS} />);
  //   await user.click(screen.getByRole("button", { name: "Add Apple to cart" }));
  //   expect(screen.getByRole("status", { name: "Apple quantity" })).toHaveTextContent("1");
  //   expect(screen.getByRole("status", { name: "Total" })).toHaveTextContent("$0.50");
  // });

  it.todo("lists every product with its formatted price");
  it.todo("starts with an empty cart, no cart list and a $0.00 total");
  it.todo("adding the same product twice gives one line with quantity 2");
  it.todo("keeps lines in the order they were first added");
  it.todo("Increase and Decrease change the quantity and the total");
  it.todo("Decrease at quantity 1 removes the line");
  it.todo("Remove takes out a line with quantity 3 in one click");
  it.todo("shows 'Your cart is empty' again after removing the last line");
  it.todo("adds cents correctly in the total");
});
