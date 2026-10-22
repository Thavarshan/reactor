/**
 * Tests for exercises/level02_props_and_composition/ex03_card.tsx
 *
 * Write your tests here first, run them and watch them fail, then build
 * the component until they pass. The "EDGE CASES TO TEST" section of the
 * exercise lists good cases to cover. Turn each `it.todo` into a real test.
 *
 * Run just this file:
 *     npm test -- ex03_card
 */

import { render, screen, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Card } from './ex03_card';

describe('Card', () => {
  // Examples to get you started:
  //
  // it("names the article after its title", () => {
  //   render(<Card title="Profile">Body</Card>);
  //   expect(screen.getByRole("article", { name: "Profile" })).toBeInTheDocument();
  //   expect(screen.getByRole("heading", { level: 2, name: "Profile" })).toBeInTheDocument();
  // });
  //
  // it("renders the footer inside a footer element", () => {
  //   render(<Card footer={<button>Save</button>}>Body</Card>);
  //   const article = screen.getByRole("article");
  //   const button = within(article).getByRole("button", { name: "Save" });
  //   expect(button.closest("footer")).not.toBeNull();
  // });

  it.todo('renders children in an article with no heading and no name');
  it.todo('renders no heading for a null title');
  it.todo('renders no footer element without a footer or with footer={null}');
  it.todo('renders title, children and footer in that order');
  it.todo('accepts JSX in every slot');
  it.todo('gives each of two cards its own name');
});
