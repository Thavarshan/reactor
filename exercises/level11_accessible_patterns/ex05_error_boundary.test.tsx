/**
 * Tests for exercises/level11_accessible_patterns/ex05_error_boundary.tsx
 *
 * Write your tests here first, run them and watch them fail, then build
 * the component until they pass. The "EDGE CASES TO TEST" section of the
 * exercise lists good cases to cover. Turn each `it.todo` into a real test.
 *
 * Run just this file:
 *     npm test -- ex05_error_boundary
 */

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { ErrorBoundary } from "./ex05_error_boundary";

// A component that throws on purpose.
function Bomb({ explode }: { explode: boolean }) {
  if (explode) throw new Error("Boom");
  return <p>All good</p>;
}

describe("ErrorBoundary", () => {
  beforeEach(() => {
    // React logs every caught error. Keep the test output readable.
    vi.spyOn(console, "error").mockImplementation(() => {});
  });
  afterEach(() => {
    vi.restoreAllMocks();
  });

  // Examples to get you started:
  //
  // it("renders the children when nothing throws", () => {
  //   render(<ErrorBoundary><Bomb explode={false} /></ErrorBoundary>);
  //   expect(screen.getByText("All good")).toBeInTheDocument();
  //   expect(screen.queryByRole("alert")).not.toBeInTheDocument();
  // });
  //
  // it("shows the default fallback when a child throws", () => {
  //   render(<ErrorBoundary><Bomb explode /></ErrorBoundary>);
  //   const alert = screen.getByRole("alert");
  //   expect(alert).toHaveTextContent("Something went wrong.");
  //   expect(alert).toHaveTextContent("Boom");
  //   expect(screen.getByRole("button", { name: "Try again" })).toBeInTheDocument();
  // });

  it.todo("calls onError once with the error");
  it.todo("shows the children again after Try again, once fixed, and calls onReset");
  it.todo("shows the fallback again when Try again fails");
  it.todo("renders fallbackRender instead of the default, and its reset works");
  it.todo("resets when resetKeys change while showing the fallback");
  it.todo("resets when the resetKeys length changes");
  it.todo("does not call onReset when resetKeys change with no error");
  it.todo("does not reset for a new array with the same keys");
  it.todo("keeps the fallback when the resetKeys change itself causes the error");
});
