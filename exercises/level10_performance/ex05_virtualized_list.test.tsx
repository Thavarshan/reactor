/**
 * Tests for exercises/level10_performance/ex05_virtualized_list.tsx
 *
 * Write your tests here first, run them and watch them fail, then build
 * the component until they pass. The "EDGE CASES TO TEST" section of the
 * exercise lists good cases to cover. Turn each `it.todo` into a real test.
 *
 * Run just this file:
 *     npm test -- ex05_virtualized_list
 */

import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { VirtualList } from "./ex05_virtualized_list";

// "Item 1" to "Item 1000"
const items = Array.from({ length: 1000 }, (_, i) => `Item ${i + 1}`);

describe("VirtualList", () => {
  // Examples to get you started:
  //
  // it("renders only the 5 visible rows at first", () => {
  //   render(<VirtualList label="Items" items={items} rowHeight={20} height={100} />);
  //   const rows = screen.getAllByRole("listitem");
  //   expect(rows).toHaveLength(5);
  //   expect(rows[0]).toHaveTextContent("Item 1");
  //   expect(rows[4]).toHaveTextContent("Item 5");
  // });
  //
  // it("shows Item 26 to Item 30 after scrolling to 500", () => {
  //   render(<VirtualList label="Items" items={items} rowHeight={20} height={100} />);
  //   fireEvent.scroll(screen.getByRole("list", { name: "Items" }), {
  //     target: { scrollTop: 500 },
  //   });
  //   const rows = screen.getAllByRole("listitem");
  //   expect(rows.map((r) => r.textContent)).toEqual([
  //     "Item 26", "Item 27", "Item 28", "Item 29", "Item 30",
  //   ]);
  // });

  it.todo("gives the scroll box height 100px and overflow-y auto");
  it.todo("makes the spacer as tall as all rows (20000px)");
  it.todo("places each row at index * rowHeight with height rowHeight");
  it.todo("sets aria-posinset and aria-setsize on each row");
  it.todo("removes rows that scrolled out of view");
  it.todo("shows 6 rows when scrolled between rows (510)");
  it.todo("adds overscan rows on both sides");
  it.todo("never renders overscan rows before the first item");
  it.todo("shows Item 996 to Item 1000 when scrolled to the end");
  it.todo("renders every row when they all fit");
  it.todo("renders no rows and a 0px spacer for no items");
});
