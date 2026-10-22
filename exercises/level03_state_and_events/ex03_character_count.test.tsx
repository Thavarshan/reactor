/**
 * Tests for exercises/level03_state_and_events/ex03_character_count.tsx
 *
 * Write your tests here first, run them and watch them fail, then build
 * the component until they pass. The "EDGE CASES TO TEST" section of the
 * exercise lists good cases to cover. Turn each `it.todo` into a real test.
 *
 * Run just this file:
 *     npm test -- ex03_character_count
 */

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import { CharacterCount } from "./ex03_character_count";

describe("CharacterCount", () => {
  // Examples to get you started:
  //
  // it("shows 0 / 100 at first", () => {
  //   render(<CharacterCount label="Bio" />);
  //   expect(screen.getByRole("textbox", { name: "Bio" })).toBeInTheDocument();
  //   expect(screen.getByText("0 / 100")).toBeInTheDocument();
  // });
  //
  // it("updates the counter as you type", async () => {
  //   const user = userEvent.setup();
  //   render(<CharacterCount label="Bio" />);
  //   await user.type(screen.getByRole("textbox", { name: "Bio" }), "Hello, world");
  //   expect(screen.getByText("12 / 100")).toBeInTheDocument();
  // });

  it.todo("counts down again after Backspace and clear");
  it.todo("uses the maxLength prop in the counter and on the textarea");
  it.todo("starts with defaultValue");
  it.todo("uses the counter as the textarea's accessible description");
  it.todo("keeps the status empty with exactly 10 left, and warns with 9 left");
  it.todo("says 1 character left (singular)");
  it.todo("says 0 characters left when full");
  it.todo("empties the status again after deleting text");
  it.todo("warns from the start for a small maxLength");
  it.todo("stops at maxLength when typing");
  it.todo("stops at maxLength when pasting");
  it.todo("counts spaces and new lines");
});
