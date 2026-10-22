/**
 * Tests for exercises/level00_javascript/ex03_nested_immutable_updates.ts
 *
 * Write your tests here first, run them and watch them fail, then write
 * the functions until they pass. The "EDGE CASES TO TEST" section of the
 * exercise lists good cases to cover. Turn each `it.todo` into a real test.
 *
 * Run just this file:
 *     npm test -- ex03_nested_immutable_updates
 */

import { describe, expect, it } from "vitest";

import {
  addCard,
  moveCard,
  renameColumn,
  toggleTodo,
  type Board,
  type TodoList,
} from "./ex03_nested_immutable_updates";

const list: TodoList = {
  title: "Chores",
  todos: [
    { id: 1, text: "Dishes", done: true },
    { id: 2, text: "Laundry", done: false },
  ],
};

const board: Board = {
  name: "Sprint",
  columns: [
    { id: "todo", name: "To do", cards: [{ id: 1, title: "Write tests" }, { id: 2, title: "Fix bug" }] },
    { id: "done", name: "Done", cards: [] },
  ],
};

describe("nested immutable updates", () => {
  // Examples to get you started:
  //
  // it("toggleTodo flips done and reuses the other todos", () => {
  //   const result = toggleTodo(list, 2);
  //   expect(result.todos[1].done).toBe(true);
  //   expect(result.todos[0]).toBe(list.todos[0]); // untouched: same object
  //   expect(result).not.toBe(list);               // changed: new object
  // });
  //
  // it("toggleTodo returns the list itself for an unknown id", () => {
  //   expect(toggleTodo(list, 99)).toBe(list);
  // });

  it.todo("toggleTodo flips true to false as well");
  it.todo("toggleTodo makes a new todos array and a new toggled todo");
  it.todo("renameColumn renames and reuses the other column and the cards array");
  it.todo("renameColumn returns the board itself for an unknown column");
  it.todo("addCard adds to the end of an empty column");
  it.todo("addCard returns the board itself for an unknown column");
  it.todo("moveCard moves the very same card object to the end of the other column");
  it.todo("moveCard returns the board itself when from and to are the same");
  it.todo("moveCard returns the board itself when the card isn't in the from column");
  it.todo("nothing changes deep-frozen input");
});
