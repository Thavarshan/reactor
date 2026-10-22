/**
 * Tests for exercises/level03_state_and_events/ex04_accordion.tsx
 *
 * Write your tests here first, run them and watch them fail, then build
 * the component until they pass. The "EDGE CASES TO TEST" section of the
 * exercise lists good cases to cover. Turn each `it.todo` into a real test.
 *
 * Run just this file:
 *     npm test -- ex04_accordion
 */

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';

import { Accordion, type AccordionSection } from './ex04_accordion';

const sections: AccordionSection[] = [
  { id: 'shipping', title: 'Shipping', content: 'We ship worldwide.' },
  { id: 'returns', title: 'Returns', content: 'Return within 30 days.' },
  { id: 'warranty', title: 'Warranty', content: <p>Two years.</p> },
];

describe('Accordion', () => {
  // Examples to get you started:
  //
  // it("starts with every section closed", () => {
  //   render(<Accordion sections={sections} />);
  //   expect(screen.getByRole("button", { name: "Shipping" })).toHaveAttribute(
  //     "aria-expanded",
  //     "false",
  //   );
  //   expect(screen.queryByRole("region")).not.toBeInTheDocument();
  // });
  //
  // it("opens a section when its button is clicked", async () => {
  //   const user = userEvent.setup();
  //   render(<Accordion sections={sections} />);
  //   await user.click(screen.getByRole("button", { name: "Shipping" }));
  //   expect(screen.getByRole("region", { name: "Shipping" })).toHaveTextContent(
  //     "We ship worldwide.",
  //   );
  // });

  it.todo('renders each title as a button inside a level-3 heading');
  it.todo('opens the defaultOpenId section first');
  it.todo('keeps only one section open at a time');
  it.todo('closes an open section when its button is clicked again');
  it.todo('links each button to its panel with aria-controls');
  it.todo('keeps closed panels on the page but hidden');
  it.todo('uses unique ids with two accordions on the page');
  it.todo('keeps two accordions independent');
  it.todo('renders no buttons for an empty list');
  it.todo('opens a section with Enter from the keyboard');
});
