/**
 * Tests for exercises/level09_reducers_and_context/ex01_todo_reducer.tsx
 *
 * Write your tests here first, run them and watch them fail, then build
 * the reducer and the component until they pass. The "EDGE CASES TO
 * TEST" section of the exercise lists good cases to cover. Turn each
 * `it.todo` into a real test.
 *
 * Run just this file:
 *     npm test -- ex01_todo_reducer
 */

import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import { type Todo, TodoApp, todoReducer } from "./ex01_todo_reducer";

describe("todoReducer", () => {
  // Examples to get you started:
  //
  // it("gives the first todo id 1", () => {
  //   const next = todoReducer([], { type: "added", text: "Milk" });
  //   expect(next).toEqual([{ id: 1, text: "Milk", done: false }]);
  // });
  //
  // it("returns the same array when toggling an unknown id", () => {
  //   const todos: Todo[] = [{ id: 1, text: "Milk", done: false }];
  //   expect(todoReducer(todos, { type: "toggled", id: 9 })).toBe(todos);
  // });

  it.todo("gives a new todo the largest id plus 1");
  it.todo("trims added text, and returns the same array for blank text");
  it.todo("toggles one todo and keeps the others as the same objects");
  it.todo("returns the same array when deleting an unknown id");
  it.todo("removes only the done todos on cleared_done");
  it.todo("returns the same array on cleared_done when nothing is done");
  it.todo("never mutates frozen input");
});

describe("TodoApp", () => {
  // Example to get you started:
  //
  // it("shows a message and no list when there are no todos", () => {
  //   render(<TodoApp />);
  //   expect(screen.getByText("Nothing to do!")).toBeInTheDocument();
  //   expect(screen.queryByRole("list")).not.toBeInTheDocument();
  // });

  it.todo("adds a todo on Enter and empties the input");
  it.todo("adds nothing when the input is blank");
  it.todo("toggles a todo when its checkbox is clicked");
  it.todo("deletes only the todo whose Delete button was clicked");
  it.todo("disables Clear completed until a todo is done, then clears it");
});
