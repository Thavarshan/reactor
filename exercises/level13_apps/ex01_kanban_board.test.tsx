/**
 * Tests for exercises/level13_apps/ex01_kanban_board.tsx
 *
 * Write your tests here first, run them and watch them fail, then build
 * the component until they pass. The "EDGE CASES TO TEST" section of the
 * exercise lists good cases to cover. Turn each `it.todo` into a real test.
 *
 * Run just this file:
 *     npm test -- ex01_kanban_board
 */

import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { KanbanBoard, type Card } from './ex01_kanban_board';

const cards: Card[] = [
  { id: '1', title: 'Buy milk', column: 'todo' },
  { id: '2', title: 'Fix the bug', column: 'doing' },
];

describe('KanbanBoard', () => {
  // Examples to get you started:
  //
  // it("shows each card in its column", () => {
  //   render(<KanbanBoard initialCards={cards} />);
  //   const todo = screen.getByRole("region", { name: "To do" });
  //   expect(within(todo).getByText("Buy milk")).toBeInTheDocument();
  //   const done = screen.getByRole("region", { name: "Done" });
  //   expect(within(done).getByText("No cards")).toBeInTheDocument();
  // });
  //
  // it("moves a card right", async () => {
  //   const user = userEvent.setup();
  //   render(<KanbanBoard initialCards={cards} />);
  //   await user.click(screen.getByRole("button", { name: "Move Buy milk right" }));
  //   const doing = screen.getByRole("region", { name: "In progress" });
  //   expect(within(doing).getByText("Buy milk")).toBeInTheDocument();
  // });

  it.todo('shows three columns saying No cards when there are no cards');
  it.todo('shows each card in its own column, in order');
  it.todo('adds a trimmed card at the end of To do and empties the input');
  it.todo('ignores an empty or spaces-only title');
  it.todo('moves cards right and left, to the end of the new column');
  it.todo('disables left in the first column and right in the last');
  it.todo('deletes a card and shows No cards when a column empties');
  it.todo('calls onChange with the full new array, but not on first render');
});
