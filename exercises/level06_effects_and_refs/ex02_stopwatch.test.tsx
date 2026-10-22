/**
 * Tests for exercises/level06_effects_and_refs/ex02_stopwatch.tsx
 *
 * Write your tests here first, run them and watch them fail, then build
 * the component until they pass. The "EDGE CASES TO TEST" section of the
 * exercise lists good cases to cover. Turn each `it.todo` into a real test.
 *
 * Run just this file:
 *     npm test -- ex02_stopwatch
 */

import { act, fireEvent, render, screen } from "@testing-library/react";
import { StrictMode } from "react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { Stopwatch } from "./ex02_stopwatch";

describe("Stopwatch", () => {
  // Fake timers: the clock only moves when the test moves it. Always
  // switch back to real timers, or the next test inherits the fake clock.
  afterEach(() => {
    vi.useRealTimers();
  });

  // Examples to get you started:
  //
  // it("counts tenths of a second after Start", () => {
  //   vi.useFakeTimers();
  //   render(<Stopwatch />);
  //   fireEvent.click(screen.getByRole("button", { name: "Start" }));
  //   act(() => {
  //     vi.advanceTimersByTime(1500);
  //   });
  //   expect(screen.getByRole("timer")).toHaveTextContent("00:01.5");
  //   expect(screen.getByRole("button", { name: "Stop" })).toBeInTheDocument();
  // });
  //
  // it("leaves no timer running after unmount", () => {
  //   vi.useFakeTimers();
  //   const { unmount } = render(<Stopwatch />);
  //   fireEvent.click(screen.getByRole("button", { name: "Start" }));
  //   unmount();
  //   expect(vi.getTimerCount()).toBe(0);
  // });

  it.todo("starts at 00:00.0 with a Start button");
  it.todo("rolls over into minutes (65300 ms -> 01:05.3)");
  it.todo("Stop freezes the time and Start continues from it");
  it.todo("Stop leaves no timer running");
  it.todo("Reset while running goes to 00:00.0 and stops");
  it.todo("Reset while stopped goes to 00:00.0");
  it.todo("runs at normal speed inside StrictMode");
});
