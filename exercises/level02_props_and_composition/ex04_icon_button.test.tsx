/**
 * Tests for exercises/level02_props_and_composition/ex04_icon_button.tsx
 *
 * Write your tests here first, run them and watch them fail, then build
 * the component until they pass. The "EDGE CASES TO TEST" section of the
 * exercise lists good cases to cover. Turn each `it.todo` into a real test.
 *
 * Run just this file:
 *     npm test -- ex04_icon_button
 */

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { IconButton } from "./ex04_icon_button";

describe("IconButton", () => {
  // Examples to get you started:
  //
  // it("is named by its label, not its icon", () => {
  //   render(<IconButton icon="✕" label="Close" />);
  //   expect(screen.getByRole("button", { name: "Close" })).toBeInTheDocument();
  //   expect(screen.queryByRole("button", { name: "✕" })).not.toBeInTheDocument();
  // });
  //
  // it("calls onClick when clicked", async () => {
  //   const user = userEvent.setup();
  //   const onClick = vi.fn();
  //   render(<IconButton icon="✕" label="Close" onClick={onClick} />);
  //   await user.click(screen.getByRole("button", { name: "Close" }));
  //   expect(onClick).toHaveBeenCalledTimes(1);
  // });

  it.todo("wraps the icon in an aria-hidden element inside the button");
  it.todo("has title set to the label and type=button");
  it.todo("renders an svg icon inside the button");
  it.todo("is disabled and ignores clicks when disabled");
  it.todo("has no aria-pressed when pressed is not given");
  it.todo("sets aria-pressed to true or false from pressed");
  it.todo("throws for an empty or blank label");
});
