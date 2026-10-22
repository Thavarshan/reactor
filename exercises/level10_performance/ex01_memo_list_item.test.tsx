/**
 * Tests for exercises/level10_performance/ex01_memo_list_item.tsx
 *
 * Write your tests here first, run them and watch them fail, then build
 * the component until they pass. The "EDGE CASES TO TEST" section of the
 * exercise lists good cases to cover. Turn each `it.todo` into a real test.
 *
 * These tests count renders with a spy. They don't use <StrictMode>,
 * which would render everything twice and double the counts.
 *
 * Run just this file:
 *     npm test -- ex01_memo_list_item
 */

import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { TaskList, TaskRow, type Task } from "./ex01_memo_list_item";

const tasks: Task[] = [
  { id: "1", title: "Buy milk", done: false },
  { id: "2", title: "Walk the dog", done: false },
  { id: "3", title: "Call Grandma", done: false },
];

describe("TaskList", () => {
  // Examples to get you started:
  //
  // it("renders each row once at first", () => {
  //   const spy = vi.fn();
  //   render(<TaskList tasks={tasks} onRowRender={spy} />);
  //   expect(screen.getAllByRole("listitem")).toHaveLength(3);
  //   expect(spy).toHaveBeenCalledTimes(3);
  // });
  //
  // it("re-renders only the row whose task changed", () => {
  //   const spy = vi.fn();
  //   const { rerender } = render(<TaskList tasks={tasks} onRowRender={spy} />);
  //   spy.mockClear();
  //   const next = tasks.map((t) => (t.id === "2" ? { ...t, done: true } : t));
  //   rerender(<TaskList tasks={next} onRowRender={spy} />);
  //   expect(spy).toHaveBeenCalledTimes(1);
  //   expect(spy).toHaveBeenCalledWith("2");
  //   expect(screen.getAllByRole("listitem")[1]).toHaveTextContent("Walk the dog (done)");
  // });

  it.todo("calls onRowRender once per task on the first render, with each id");
  it.todo("re-renders no rows when given the same array, or a new array of the same tasks");
  it.todo("re-renders only the row whose task object changed");
  it.todo("re-renders every row when every task is a new copy");
  it.todo("renders only the new row when a task is added at the end");
  it.todo("renders an empty list for no tasks");
});

describe("TaskRow", () => {
  it.todo("skips a re-render when given the same task object");
  it.todo("re-renders when given a new task object");
});
