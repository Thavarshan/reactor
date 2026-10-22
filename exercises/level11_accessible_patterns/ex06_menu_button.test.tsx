/**
 * Tests for exercises/level11_accessible_patterns/ex06_menu_button.tsx
 *
 * Write your tests here first, run them and watch them fail, then build
 * the component until they pass. The "EDGE CASES TO TEST" section of the
 * exercise lists good cases to cover. Turn each `it.todo` into a real test.
 *
 * Run just this file:
 *     npm test -- ex06_menu_button
 */

import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { MenuButton, type MenuItem } from "./ex06_menu_button";

// Fresh spies for every test.
function makeItems(): MenuItem[] {
  return [
    { label: "Edit", onSelect: vi.fn() },
    { label: "Duplicate", onSelect: vi.fn() },
    { label: "Delete", onSelect: vi.fn() },
  ];
}

describe("MenuButton", () => {
  // Examples to get you started:
  //
  // it("opens on click and focuses the first item", async () => {
  //   const user = userEvent.setup();
  //   render(<MenuButton label="Actions" items={makeItems()} />);
  //   await user.click(screen.getByRole("button", { name: "Actions" }));
  //   expect(screen.getByRole("menu", { name: "Actions" })).toBeInTheDocument();
  //   expect(screen.getByRole("menuitem", { name: "Edit" })).toHaveFocus();
  // });
  //
  // it("closes on Escape and focuses the button", async () => {
  //   const user = userEvent.setup();
  //   render(<MenuButton label="Actions" items={makeItems()} />);
  //   const button = screen.getByRole("button", { name: "Actions" });
  //   await user.click(button);
  //   await user.keyboard("{Escape}");
  //   expect(screen.queryByRole("menu")).not.toBeInTheDocument();
  //   expect(button).toHaveFocus();
  // });

  it.todo("starts closed, with aria-haspopup and aria-expanded=false");
  it.todo("links the button and the menu with ids when open");
  it.todo("gives every menuitem tabIndex -1");
  it.todo("closes when the button is clicked again");
  it.todo("opens with Enter and with Space on the button");
  it.todo("focuses the first item on ArrowDown and the last on ArrowUp from the button");
  it.todo("moves through the items with the arrow keys and wraps");
  it.todo("jumps to the first and last item with Home and End");
  it.todo("selects with Enter, closes and focuses the button");
  it.todo("selects with Space, and the menu stays closed");
  it.todo("selects on click");
  it.todo("does not call onSelect on Escape");
  it.todo("closes on Tab and moves focus to the next element after the button");
});
