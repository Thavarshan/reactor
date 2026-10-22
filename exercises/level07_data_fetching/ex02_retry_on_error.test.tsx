/**
 * Tests for exercises/level07_data_fetching/ex02_retry_on_error.tsx
 *
 * Write your tests here first, run them and watch them fail, then build
 * the component until they pass. The "EDGE CASES TO TEST" section of the
 * exercise lists good cases to cover. Turn each `it.todo` into a real test.
 *
 * Run just this file:
 *     npm test -- ex02_retry_on_error
 */

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { delay, http, HttpResponse } from 'msw';
import { describe, expect, it } from 'vitest';

import { server } from '../../test/server';
import { type Quote, QuoteOfTheDay } from './ex02_retry_on_error';

const QUOTE: Quote = {
  text: 'The more I study, the more insatiable do I feel my genius for it.',
  author: 'Ada Lovelace',
};

describe('QuoteOfTheDay', () => {
  // Examples to get you started:
  //
  // it("shows the quote when the first request works", async () => {
  //   server.use(http.get("/api/quote", () => HttpResponse.json(QUOTE)));
  //   render(<QuoteOfTheDay />);
  //   expect(screen.getByRole("status")).toHaveTextContent("Loading quote...");
  //   expect(await screen.findByText(QUOTE.text)).toBeInTheDocument();
  //   expect(screen.getByText("Ada Lovelace")).toBeInTheDocument();
  //   expect(screen.queryByRole("button", { name: "Try again" })).not.toBeInTheDocument();
  // });
  //
  // it("recovers after one failure", async () => {
  //   const user = userEvent.setup();
  //   server.use(http.get("/api/quote", () => HttpResponse.json(QUOTE)));
  //   server.use(
  //     http.get("/api/quote", () => HttpResponse.json({}, { status: 500 }), { once: true }),
  //   );
  //   render(<QuoteOfTheDay />);
  //   expect(await screen.findByRole("alert")).toHaveTextContent("Could not load the quote.");
  //   await user.click(screen.getByRole("button", { name: "Try again" }));
  //   expect(await screen.findByText(QUOTE.text)).toBeInTheDocument();
  //   expect(screen.queryByRole("alert")).not.toBeInTheDocument();
  // });

  it.todo('shows the alert and the button when the server answers 500');
  it.todo('shows the alert and the button when there is no answer at all');
  it.todo('shows loading and hides the alert and button while retrying');
  it.todo('can fail twice and still succeed on the third try');
  it.todo('sends exactly one request per click on Try again');
});
