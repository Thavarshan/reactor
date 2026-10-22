/**
 * Tests for exercises/level12_concurrent_react/ex02_use_deferred_value.tsx
 *
 * Write your tests here first, run them and watch them fail, then build
 * the component until they pass. The "EDGE CASES TO TEST" section of the
 * exercise lists good cases to cover. Turn each `it.todo` into a real test.
 *
 * Run just this file:
 *     npm test -- ex02_use_deferred_value
 */

import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import { createControlledSearch, DeferredSearch } from "./ex02_use_deferred_value";

describe("DeferredSearch", () => {
  // Examples to get you started:
  //
  // it("shows the fallback until the first answer arrives", async () => {
  //   const fake = createControlledSearch();
  //   await act(async () => {
  //     render(<DeferredSearch search={fake.search} />);
  //   });
  //   expect(screen.getByText("Loading results...")).toBeInTheDocument();
  //
  //   await act(async () => fake.respond("", ["apple", "banana"]));
  //   expect(screen.getByRole("list", { name: "Results" })).toHaveTextContent("apple");
  // });
  //
  // it("keeps old results while a new query loads", async () => {
  //   const user = userEvent.setup();
  //   const fake = createControlledSearch();
  //   await act(async () => {
  //     render(<DeferredSearch search={fake.search} />);
  //   });
  //   await act(async () => fake.respond("", ["apple", "banana"]));
  //
  //   await act(() => user.type(screen.getByLabelText("Search"), "b"));
  //   expect(screen.getByLabelText("Search")).toHaveValue("b");
  //   expect(screen.getByRole("status")).toHaveTextContent("Updating results...");
  //   expect(screen.getByRole("list", { name: "Results" })).toHaveTextContent("apple");
  // });

  it.todo("shows Loading results... until the first answer");
  it.todo("shows typed text in the input immediately");
  it.todo("keeps old results and shows the status while a new query loads");
  it.todo("does not bring back the Loading results... fallback while typing");
  it.todo("shows the new results and removes the status when the answer arrives");
  it.todo("shows No results for an empty answer");
  it.todo("ends up showing results for the full text after fast typing");
});
