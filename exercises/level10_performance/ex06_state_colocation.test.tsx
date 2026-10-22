/**
 * Tests for exercises/level10_performance/ex06_state_colocation.tsx
 *
 * Write your tests here first, run them and watch them fail, then build
 * the component until they pass. The "EDGE CASES TO TEST" section of the
 * exercise lists good cases to cover. Turn each `it.todo` into a real test.
 *
 * These tests count renders with a spy. They don't use <StrictMode>,
 * which would render everything twice and double the counts.
 *
 * Run just this file:
 *     npm test -- ex06_state_colocation
 */

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { Dashboard, SlowDashboard } from "./ex06_state_colocation";

describe("SlowDashboard (proves the problem)", () => {
  // Example to get you started:
  //
  // it("re-renders the report on every keystroke", async () => {
  //   const user = userEvent.setup();
  //   const spy = vi.fn();
  //   render(<SlowDashboard onReportRender={spy} />);
  //   await user.type(screen.getByRole("textbox", { name: "Quick note" }), "hello");
  //   expect(spy).toHaveBeenCalledTimes(6); // 1 first render + 5 letters
  // });

  it.todo("re-renders the report when the theme changes");
});

describe("Dashboard", () => {
  // Example to get you started:
  //
  // it("does not re-render the report while typing", async () => {
  //   const user = userEvent.setup();
  //   const spy = vi.fn();
  //   render(<Dashboard onReportRender={spy} />);
  //   await user.type(screen.getByRole("textbox", { name: "Quick note" }), "hello");
  //   expect(screen.getByText("Characters: 5")).toBeInTheDocument();
  //   expect(spy).toHaveBeenCalledTimes(1);
  // });

  it.todo("renders the report exactly once at first");
  it.todo("sets theme-dark on the Report region without re-rendering the report");
  it.todo("switches back to theme-light");
  it.todo("shows the Sales report table inside the Report region");
  it.todo("shows 'Characters: 0' after clearing the note");
});
