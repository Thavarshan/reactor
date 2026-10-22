/**
 * Tests for exercises/level04_forms/ex01_controlled_input.tsx
 *
 * Write your tests here first, run them and watch them fail, then build
 * the component until they pass. The "EDGE CASES TO TEST" section of the
 * exercise lists good cases to cover. Turn each `it.todo` into a real test.
 *
 * Run just this file:
 *     npm test -- ex01_controlled_input
 */

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import { NameGreeting } from "./ex01_controlled_input";

describe("NameGreeting", () => {
  // Examples to get you started:
  //
  // it("greets a stranger when the box is empty", () => {
  //   render(<NameGreeting />);
  //   expect(screen.getByRole("status")).toHaveTextContent("Hello, stranger!");
  // });
  //
  // it("greets the name as it is typed", async () => {
  //   const user = userEvent.setup();
  //   render(<NameGreeting />);
  //   await user.type(screen.getByRole("textbox", { name: "Name" }), "Ada");
  //   expect(screen.getByRole("status")).toHaveTextContent("Hello, Ada!");
  // });

  it.todo("starts empty, greets a stranger and disables Clear");
  it.todo("fills the box and the greeting from initialName");
  it.todo("updates the greeting after every letter");
  it.todo("trims spaces in the greeting but keeps them in the box");
  it.todo("treats a box of only spaces as a stranger, with Clear enabled");
  it.todo("Clear empties the box, resets the greeting and disables itself");
  it.todo("lets you type again after Clear");
  it.todo("acts like Clear when the user deletes all the text");
});
