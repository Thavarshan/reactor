/**
 * Tests for exercises/level03_state_and_events/ex01_counter.tsx
 *
 * Write your tests here first, run them and watch them fail, then build
 * the component until they pass. The "EDGE CASES TO TEST" section of the
 * exercise lists good cases to cover. Turn each `it.todo` into a real test.
 *
 * Run just this file:
 *     npm test -- ex01_counter
 */

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { Counter } from "./ex01_counter";

describe("Counter", () => {
  // Examples to get you started:
  //
  // it("shows 0 by default", () => {
  //   render(<Counter />);
  //   expect(screen.getByRole("status")).toHaveTextContent("0");
  // });
  //
  // it("goes up by one when Increase is clicked", async () => {
  //   const user = userEvent.setup();
  //   render(<Counter />);
  //   await user.click(screen.getByRole("button", { name: "Increase" }));
  //   expect(screen.getByRole("status")).toHaveTextContent("1");
  // });

  it.todo("shows 0 and disables Decrease when given no props");
  it.todo("shows the initial value first");
  it.todo("disables Increase at max and ignores clicks on it");
  it.todo("disables both buttons when min equals max");
  it.todo("works with negative ranges");
  it.todo("calls onChange with the new value, but not on the first render");
});
