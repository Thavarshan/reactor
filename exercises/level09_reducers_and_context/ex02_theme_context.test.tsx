/**
 * Tests for exercises/level09_reducers_and_context/ex02_theme_context.tsx
 *
 * Write your tests here first, run them and watch them fail, then build
 * the components until they pass. The "EDGE CASES TO TEST" section of
 * the exercise lists good cases to cover. Turn each `it.todo` into a
 * real test.
 *
 * Run just this file:
 *     npm test -- ex02_theme_context
 */

import { act, render, renderHook, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import type { ReactNode } from "react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { ThemeProvider, ThemeStatus, ThemeToggle, useTheme } from "./ex02_theme_context";

describe("theme context", () => {
  // Remove any spies a test created (such as a silenced console.error).
  afterEach(() => {
    vi.restoreAllMocks();
  });

  // Examples to get you started:
  //
  // it("switches to dark when the toggle is clicked", async () => {
  //   const user = userEvent.setup();
  //   render(
  //     <ThemeProvider>
  //       <ThemeStatus />
  //       <ThemeToggle />
  //     </ThemeProvider>,
  //   );
  //   expect(screen.getByText("Current theme: light")).toBeInTheDocument();
  //   await user.click(screen.getByRole("button", { name: "Switch to dark theme" }));
  //   expect(screen.getByText("Current theme: dark")).toBeInTheDocument();
  // });
  //
  // it("throws when useTheme is used outside a ThemeProvider", () => {
  //   vi.spyOn(console, "error").mockImplementation(() => {});
  //   expect(() => renderHook(() => useTheme())).toThrow(
  //     "useTheme must be used inside a ThemeProvider",
  //   );
  // });

  it.todo("starts dark when initialTheme is dark");
  it.todo("comes back to light after two clicks on the toggle");
  it.todo("stays dark when setTheme('dark') is called twice");
  it.todo("flips the theme with toggleTheme");
  it.todo("keeps two sibling providers independent");
  it.todo("lets a nested provider override the outer one");
});
