/**
 * Tests for exercises/level12_concurrent_react/ex06_use_optimistic.tsx
 *
 * Write your tests here first, run them and watch them fail, then build
 * the component until they pass. The "EDGE CASES TO TEST" section of the
 * exercise lists good cases to cover. Turn each `it.todo` into a real test.
 *
 * Run just this file:
 *     npm test -- ex06_use_optimistic
 */

import { act, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { Chat, type Message } from "./ex06_use_optimistic";

describe("Chat", () => {
  // Examples to get you started:
  //
  // it("shows the initial messages", () => {
  //   render(<Chat initialMessages={[{ id: "1", text: "Hi there!" }]} sendMessage={vi.fn()} />);
  //   const list = screen.getByRole("list", { name: "Messages" });
  //   expect(within(list).getByRole("listitem")).toHaveTextContent("Hi there!");
  // });
  //
  // it("shows a sent message at once, marked Sending...", async () => {
  //   const user = userEvent.setup();
  //   let answer!: (m: Message) => void;
  //   const sendMessage = vi.fn(() => new Promise<Message>((resolve) => { answer = resolve; }));
  //   render(<Chat sendMessage={sendMessage} />);
  //   await user.type(screen.getByLabelText("Message"), "Lunch?");
  //   await user.click(screen.getByRole("button", { name: "Send" }));
  //   expect(screen.getByRole("listitem")).toHaveTextContent("Lunch?");
  //   expect(screen.getByText("Sending...")).toBeInTheDocument();
  //
  //   await act(async () => answer({ id: "2", text: "Lunch?" }));
  //   expect(screen.queryByText("Sending...")).not.toBeInTheDocument();
  // });

  it.todo("shows initialMessages in order");
  it.todo("shows No messages yet. when there are none");
  it.todo("shows a sent message at once with Sending...");
  it.todo("empties the input once the send has finished");
  it.todo("shows the server's copy without Sending... on success");
  it.todo("removes the message and shows the alert on failure");
  it.todo("removes the old alert once a later send has worked");
  it.todo("ignores an empty or spaces-only message");
});
