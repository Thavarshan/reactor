/**
 * Tests for exercises/level05_sharing_state/ex02_filterable_product_table.tsx
 *
 * Write your tests here first, run them and watch them fail, then build
 * the component until they pass. The "EDGE CASES TO TEST" section of the
 * exercise lists good cases to cover. Turn each `it.todo` into a real test.
 *
 * Run just this file:
 *     npm test -- ex02_filterable_product_table
 */

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import {
  FilterableProductTable,
  PRODUCTS,
  ProductTable,
  SearchBar,
} from "./ex02_filterable_product_table";

// Reads the table as an array of rows, each an array of cell texts.
function tableRows() {
  return screen
    .getAllByRole("row")
    .map((row) => Array.from(row.querySelectorAll("th, td"), (cell) => cell.textContent));
}

describe("SearchBar", () => {
  // Example to get you started:
  //
  // it("calls onInStockOnlyChange when the checkbox is clicked", async () => {
  //   const user = userEvent.setup();
  //   const spy = vi.fn();
  //   render(
  //     <SearchBar
  //       filterText=""
  //       inStockOnly={false}
  //       onFilterTextChange={vi.fn()}
  //       onInStockOnlyChange={spy}
  //     />,
  //   );
  //   await user.click(screen.getByRole("checkbox", { name: "Only show products in stock" }));
  //   expect(spy).toHaveBeenCalledWith(true);
  // });

  it.todo("shows filterText and inStockOnly");
  it.todo("calls onFilterTextChange with the new text");
});

describe("ProductTable", () => {
  // Example to get you started:
  //
  // it("groups every product under its category", () => {
  //   render(<ProductTable products={PRODUCTS} filterText="" inStockOnly={false} />);
  //   expect(tableRows().slice(0, 3)).toEqual([["Name", "Price"], ["Fruits"], ["Apple", "$1"]]);
  // });

  it.todo("shows every product in order under its category when there are no filters");
  it.todo("ignores case and spaces around the filter text");
  it.todo("hides out-of-stock products when inStockOnly is true");
  it.todo("leaves out a category row with nothing to show");
  it.todo("puts spread-out products of one category under one category row");
  it.todo("shows 'No products found.' and no table when nothing matches");
});

describe("FilterableProductTable", () => {
  it.todo("filters the table as the user types and ticks the checkbox");
});
