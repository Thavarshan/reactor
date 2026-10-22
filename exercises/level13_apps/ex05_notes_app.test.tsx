/**
 * Tests for exercises/level13_apps/ex05_notes_app.tsx
 *
 * Write your tests here first, run them and watch them fail, then build
 * the component until they pass. The "EDGE CASES TO TEST" section of the
 * exercise lists good cases to cover. Turn each `it.todo` into a real test.
 *
 * Run just this file:
 *     npm test -- ex05_notes_app
 */

import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it } from "vitest";

import { NotesApp, STORAGE_KEY, type Note } from "./ex05_notes_app";

describe("NotesApp", () => {
  // localStorage keeps its data between tests, so start each test empty.
  beforeEach(() => localStorage.clear());

  // Examples to get you started:
  //
  // it("starts with No notes yet.", () => {
  //   render(<NotesApp />);
  //   expect(screen.getByText("No notes yet.")).toBeInTheDocument();
  // });
  //
  // it("adds a note and saves it", async () => {
  //   const user = userEvent.setup();
  //   render(<NotesApp />);
  //   await user.type(screen.getByLabelText("Title"), "Shopping");
  //   await user.type(screen.getByLabelText("Body"), "milk, eggs");
  //   await user.click(screen.getByRole("button", { name: "Add note" }));
  //   const list = screen.getByRole("list", { name: "Notes" });
  //   expect(within(list).getByRole("heading", { name: "Shopping" })).toBeInTheDocument();
  //   const saved: Note[] = JSON.parse(localStorage.getItem(STORAGE_KEY)!);
  //   expect(saved[0]).toMatchObject({ title: "Shopping", body: "milk, eggs" });
  // });

  it.todo("starts with No notes yet. when storage is empty");
  it.todo("adds trimmed notes, newest first, and empties the fields");
  it.todo("rejects an empty title with the alert");
  it.todo("deletes a note");
  it.todo("edits a note: fields start filled, Save stores trimmed changes");
  it.todo("Cancel leaves the note unchanged");
  it.todo("keeps edit mode and shows the alert when saving an empty title");
  it.todo("edits only one note at a time");
  it.todo("searches title and body, ignoring case, with a no-match message");
  it.todo("saves notes to localStorage and loads them on a new render");
  it.todo("starts empty when the saved data is broken or not an array");
});
