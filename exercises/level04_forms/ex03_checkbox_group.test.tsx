/**
 * Tests for exercises/level04_forms/ex03_checkbox_group.tsx
 *
 * Write your tests here first, run them and watch them fail, then build
 * the component until they pass. The "EDGE CASES TO TEST" section of the
 * exercise lists good cases to cover. Turn each `it.todo` into a real test.
 *
 * Run just this file:
 *     npm test -- ex03_checkbox_group
 */

import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { CheckboxGroup } from "./ex03_checkbox_group";

const OPTIONS = ["Cheese", "Ham", "Olives"];

describe("CheckboxGroup", () => {
  // Examples to get you started:
  //
  // it("starts with nothing ticked", () => {
  //   render(<CheckboxGroup label="Toppings" options={OPTIONS} />);
  //   const group = screen.getByRole("group", { name: "Toppings" });
  //   expect(within(group).getByRole("checkbox", { name: "Cheese" })).not.toBeChecked();
  //   expect(screen.getByRole("status")).toHaveTextContent("0 of 3 selected");
  // });
  //
  // it("shows Select all as indeterminate when some are ticked", async () => {
  //   const user = userEvent.setup();
  //   render(<CheckboxGroup label="Toppings" options={OPTIONS} />);
  //   await user.click(screen.getByRole("checkbox", { name: "Olives" }));
  //   expect(screen.getByRole("checkbox", { name: "Select all" })).toBePartiallyChecked();
  // });

  it.todo("starts with nothing ticked and Select all neither ticked nor indeterminate");
  it.todo("ticks the defaultSelected options and shows Select all as indeterminate");
  it.todo("ticks Select all when defaultSelected has every option");
  it.todo("ticks Select all when the last option is ticked");
  it.todo("Select all ticks everything from the in between state");
  it.todo("Select all unticks everything when everything is ticked");
  it.todo("calls onChange with the list in options order, not on the first render");
  it.todo("works with a single option");
});
