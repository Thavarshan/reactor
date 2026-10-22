/**
 * Tests for exercises/level05_sharing_state/ex05_todo_app.tsx
 *
 * Write your tests here first, run them and watch them fail, then build
 * the component until they pass. The "EDGE CASES TO TEST" section of the
 * exercise lists good cases to cover. Turn each `it.todo` into a real test.
 *
 * Run just this file:
 *     npm test -- ex05_todo_app
 */

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import { type Todo, TodoApp } from "./ex05_todo_app";

const TODOS: Todo[] = [
  { id: "1", text: "Walk the dog", done: true },
  { id: "2", text: "Write tests", done: false },
  { id: "3", text: "Read a book", done: false },
];

describe("TodoApp", () => {
  // Examples to get you started:
  //
  // it("adds a todo", async () => {
  //   const user = userEvent.setup();
  //   render(<TodoApp />);
  //   await user.type(screen.getByRole("textbox", { name: "New todo" }), "Buy milk");
  //   await user.click(screen.getByRole("button", { name: "Add" }));
  //   expect(screen.getByRole("checkbox", { name: "Buy milk" })).not.toBeChecked();
  //   expect(screen.getByRole("status")).toHaveTextContent("1 item left");
  // });
  //
  // it("shows only completed todos under Completed", async () => {
  //   const user = userEvent.setup();
  //   render(<TodoApp initialTodos={TODOS} />);
  //   await user.click(screen.getByRole("button", { name: "Completed" }));
  //   expect(screen.getByRole("checkbox", { name: "Walk the dog" })).toBeChecked();
  //   expect(screen.queryByRole("checkbox", { name: "Write tests" })).not.toBeInTheDocument();
  // });

  it.todo("starts with 'Nothing to show', '0 items left' and All pressed");
  it.todo("shows initialTodos in order, with done ones ticked");
  it.todo("adds a trimmed todo at the end and empties the box");
  it.todo("adds a todo when Enter is pressed");
  it.todo("doesn't add an empty or spaces-only todo");
  it.todo("updates the count when todos are ticked and unticked");
  it.todo("deletes only the clicked todo");
  it.todo("shows the right todos for each filter, with aria-pressed following");
  it.todo("says 'Nothing to show' for a filter with no todos");
  it.todo("counts every todo, whatever the filter");
  it.todo("hides a todo ticked while the Active filter is on");
});
