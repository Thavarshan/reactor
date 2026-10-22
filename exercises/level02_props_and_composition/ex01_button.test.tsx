/**
 * Tests for exercises/level02_props_and_composition/ex01_button.tsx
 *
 * Write your tests here first, run them and watch them fail, then build
 * the component until they pass. The "EDGE CASES TO TEST" section of the
 * exercise lists good cases to cover. Turn each `it.todo` into a real test.
 *
 * Run just this file:
 *     npm test -- ex01_button
 */

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { Button } from "./ex01_button";

describe("Button", () => {
  // Examples to get you started:
  //
  // it("uses the primary variant and medium size by default", () => {
  //   render(<Button>Save</Button>);
  //   expect(screen.getByRole("button", { name: "Save" })).toHaveClass(
  //     "btn",
  //     "btn-primary",
  //     "btn-medium",
  //   );
  // });
  //
  // it("does not submit a surrounding form by default", async () => {
  //   const user = userEvent.setup();
  //   const onSubmit = vi.fn((e: { preventDefault(): void }) => e.preventDefault());
  //   render(
  //     <form onSubmit={onSubmit}>
  //       <Button>Cancel</Button>
  //     </form>,
  //   );
  //   await user.click(screen.getByRole("button", { name: "Cancel" }));
  //   expect(onSubmit).not.toHaveBeenCalled();
  // });

  it.todo("has the default classes and type=button with no props");
  it.todo("applies the variant and size classes, and not the defaults");
  it.todo("adds an extra className without losing its own classes");
  it.todo("submits a form when type=submit is passed");
  it.todo("does not submit a form without a type");
  it.todo("calls onClick once per click");
  it.todo("is disabled and ignores clicks when disabled is passed");
  it.todo("passes other attributes (title, id, name, aria-describedby) through");
  it.todo("uses aria-label as the accessible name");
});
