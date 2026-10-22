/**
 * Tests for exercises/level01_jsx_and_components/ex04_todo_list_view.tsx
 *
 * Write your tests here first, run them and watch them fail, then build
 * the component until they pass. The "EDGE CASES TO TEST" section of the
 * exercise lists good cases to cover. Turn each `it.todo` into a real test.
 *
 * Run just this file:
 *     npm test -- ex04_todo_list_view
 */

import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { TodoListView, type Todo } from './ex04_todo_list_view';

const todos: Todo[] = [
  { id: 1, text: 'Buy milk', done: false },
  { id: 2, text: 'Walk the dog', done: true },
  { id: 3, text: 'Write tests', done: false },
];

describe('TodoListView', () => {
  // Examples to get you started:
  //
  // it("renders one list item per todo, in order", () => {
  //   render(<TodoListView todos={todos} />);
  //   const items = screen.getAllByRole("listitem");
  //   expect(items.map((li) => li.textContent)).toEqual(["Buy milk", "Walk the dog", "Write tests"]);
  // });
  //
  // it("shows the empty message and no list when there are no todos", () => {
  //   render(<TodoListView todos={[]} />);
  //   expect(screen.getByText("Nothing to do!")).toBeInTheDocument();
  //   expect(screen.queryByRole("list")).not.toBeInTheDocument();
  // });

  it.todo('prints no key warnings, even when two todos have the same text');
  it.todo('adds the done class only to finished todos');
  it.todo("shows '1 of 3 done' under the list");
  it.todo("shows '0 of 2 done' when nothing is finished");
  it.todo("shows '3 of 3 done' when everything is finished");
  it.todo('shows no summary when there are no todos');
  it.todo('shows a custom emptyMessage');
  it.todo('shows both todos when two have the same text');
});
