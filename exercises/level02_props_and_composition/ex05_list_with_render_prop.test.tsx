/**
 * Tests for exercises/level02_props_and_composition/ex05_list_with_render_prop.tsx
 *
 * Write your tests here first, run them and watch them fail, then build
 * the component until they pass. The "EDGE CASES TO TEST" section of the
 * exercise lists good cases to cover. Turn each `it.todo` into a real test.
 *
 * Run just this file:
 *     npm test -- ex05_list_with_render_prop
 */

import { render, screen, within } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { List } from './ex05_list_with_render_prop';

type Fruit = { id: number; name: string };
const fruits: Fruit[] = [
  { id: 1, name: 'Apple' },
  { id: 2, name: 'Banana' },
  { id: 3, name: 'Cherry' },
];

describe('List', () => {
  afterEach(() => vi.restoreAllMocks());

  // Examples to get you started:
  //
  // it("renders one list item per item", () => {
  //   render(<List items={fruits} getKey={(f) => f.id} renderItem={(f) => f.name} />);
  //   const items = screen.getAllByRole("listitem");
  //   expect(items).toHaveLength(3);
  //   expect(items[0]).toHaveTextContent("Apple");
  // });
  //
  // it("shows the default empty text and no list for an empty array", () => {
  //   render(<List items={[]} getKey={(s: string) => s} renderItem={(s) => s} />);
  //   expect(screen.getByText("Nothing here yet.")).toBeInTheDocument();
  //   expect(screen.queryByRole("list")).not.toBeInTheDocument();
  // });

  it.todo('puts JSX from renderItem inside each list item');
  it.todo('calls renderItem with each item and its index');
  it.todo('can use the index to number items');
  it.todo('shows a custom emptyText');
  it.todo('does not show the empty text when there are items');
  it.todo('names the list with label');
  it.todo('works with plain strings and numbers');
  it.todo("does not trigger React's missing key warning");
  it.todo('does not call renderItem when the list is empty');
});
