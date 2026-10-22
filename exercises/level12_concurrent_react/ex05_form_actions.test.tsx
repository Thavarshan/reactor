/**
 * Tests for exercises/level12_concurrent_react/ex05_form_actions.tsx
 *
 * Write your tests here first, run them and watch them fail, then build
 * the component until they pass. The "EDGE CASES TO TEST" section of the
 * exercise lists good cases to cover. Turn each `it.todo` into a real test.
 *
 * Run just this file:
 *     npm test -- ex05_form_actions
 */

import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { SubscribeForm } from "./ex05_form_actions";

describe("SubscribeForm", () => {
  // Examples to get you started:
  //
  // it("asks for an email when the field is empty", async () => {
  //   const user = userEvent.setup();
  //   const subscribe = vi.fn(() => Promise.resolve());
  //   render(<SubscribeForm subscribe={subscribe} />);
  //   await user.click(screen.getByRole("button", { name: "Subscribe" }));
  //   expect(await screen.findByRole("alert")).toHaveTextContent("Please enter your email.");
  //   expect(subscribe).not.toHaveBeenCalled();
  // });
  //
  // it("shows Subscribing... while waiting", async () => {
  //   const user = userEvent.setup();
  //   let finish!: () => void;
  //   const subscribe = vi.fn(() => new Promise<void>((resolve) => { finish = resolve; }));
  //   render(<SubscribeForm subscribe={subscribe} />);
  //   await user.type(screen.getByLabelText("Email"), "ada@example.com");
  //   await user.click(screen.getByRole("button", { name: "Subscribe" }));
  //   expect(screen.getByRole("button", { name: "Subscribing..." })).toBeDisabled();
  //
  //   await act(async () => finish());
  //   expect(screen.getByRole("status")).toHaveTextContent("Thanks! ada@example.com is now subscribed.");
  // });

  it.todo("shows Please enter your email. and does not subscribe when empty");
  it.todo("shows the valid-address alert and keeps the text when there is no @");
  it.todo("trims the email before calling subscribe");
  it.todo("disables the button and shows Subscribing... while waiting");
  it.todo("shows the thank-you status, empties the field and removes old alerts on success");
  it.todo("shows the error's message and keeps the email on failure");
  it.todo("submits when Enter is pressed in the field");
});
