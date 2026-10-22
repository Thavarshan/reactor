/**
 * Tests for exercises/level01_jsx_and_components/ex02_product_card.tsx
 *
 * Write your tests here first, run them and watch them fail, then build
 * the component until they pass. The "EDGE CASES TO TEST" section of the
 * exercise lists good cases to cover. Turn each `it.todo` into a real test.
 *
 * Run just this file:
 *     npm test -- ex02_product_card
 */

import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { ProductCard, type Product } from "./ex02_product_card";

const mug: Product = { id: 1, name: "Coffee Mug", price: 12.5, imageUrl: "/img/mug.png", stock: 3 };

describe("ProductCard", () => {
  // Examples to get you started:
  //
  // it("shows the name in a level 2 heading", () => {
  //   render(<ProductCard product={mug} />);
  //   expect(screen.getByRole("heading", { level: 2, name: "Coffee Mug" })).toBeInTheDocument();
  // });
  //
  // it("formats the price as money", () => {
  //   render(<ProductCard product={mug} />);
  //   expect(screen.getByText("$12.50")).toBeInTheDocument();
  // });

  it.todo("wraps the card in an article");
  it.todo("shows the image with the product name as alt text and the right src");
  it.todo("formats 1234 as $1,234.00");
  it.todo("formats 0 as $0.00");
  it.todo("uses the currency prop: EUR shows €12.50");
  it.todo("shows Sold out when stock is 0");
  it.todo("does not show Sold out when stock is 1");
});
