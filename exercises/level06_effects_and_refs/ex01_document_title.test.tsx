/**
 * Tests for exercises/level06_effects_and_refs/ex01_document_title.tsx
 *
 * Write your tests here first, run them and watch them fail, then build
 * the component until they pass. The "EDGE CASES TO TEST" section of the
 * exercise lists good cases to cover. Turn each `it.todo` into a real test.
 *
 * Run just this file:
 *     npm test -- ex01_document_title
 */

import { render, screen } from "@testing-library/react";
import { StrictMode } from "react";
import { beforeEach, describe, expect, it } from "vitest";

import { PageTitle } from "./ex01_document_title";

describe("PageTitle", () => {
  // document.title survives between tests, so start each test from a
  // known value. Then "restored" has a clear meaning.
  beforeEach(() => {
    document.title = "My app";
  });

  // Examples to get you started:
  //
  // it("puts the count in front of the title", () => {
  //   render(<PageTitle title="Inbox" count={3} />);
  //   expect(document.title).toBe("(3) Inbox");
  //   expect(screen.getByRole("heading", { level: 1, name: "Inbox" })).toBeInTheDocument();
  // });
  //
  // it("restores the original title on unmount", () => {
  //   const { unmount } = render(<PageTitle title="Inbox" count={3} />);
  //   unmount();
  //   expect(document.title).toBe("My app");
  // });

  it.todo("shows just the title when there is no count");
  it.todo("shows just the title when count is 0");
  it.todo("shows (99) at 99 and (99+) above 99");
  it.todo("renders the title, without the count, in the h1");
  it.todo("updates the tab when title or count changes");
  it.todo("restores the ORIGINAL title on unmount after several changes");
  it.todo("works and cleans up inside StrictMode");
});
