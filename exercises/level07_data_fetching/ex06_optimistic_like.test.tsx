/**
 * Tests for exercises/level07_data_fetching/ex06_optimistic_like.tsx
 *
 * Write your tests here first, run them and watch them fail, then build
 * the component until they pass. The "EDGE CASES TO TEST" section of the
 * exercise lists good cases to cover. Turn each `it.todo` into a real test.
 *
 * Run just this file:
 *     npm test -- ex06_optimistic_like
 */

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { http, HttpResponse } from "msw";
import { describe, expect, it } from "vitest";

import { server } from "../../test/server";
import { LikeButton } from "./ex06_optimistic_like";

// PROVIDED: you don't need to change this.
// A gate: a handler can `await gate.opened`, and waits there until the
// test calls `gate.open()`. That lets you look at the optimistic state
// before the server answers.
function createGate() {
  let open!: () => void;
  const opened = new Promise<void>((resolve) => {
    open = resolve;
  });
  return { opened, open };
}

describe("LikeButton", () => {
  // Examples to get you started:
  //
  // it("shows the like at once, then the server's count", async () => {
  //   const user = userEvent.setup();
  //   const gate = createGate();
  //   server.use(
  //     http.post("/api/posts/1/like", async () => {
  //       await gate.opened;
  //       return HttpResponse.json({ liked: true, likes: 12 });
  //     }),
  //   );
  //   render(<LikeButton postId={1} initialLiked={false} initialCount={10} />);
  //   const like = screen.getByRole("button", { name: "Like" });
  //   await user.click(like);
  //   expect(like).toHaveAttribute("aria-pressed", "true");
  //   expect(screen.getByText("11 likes")).toBeInTheDocument();
  //   expect(like).toBeDisabled();
  //   gate.open();
  //   expect(await screen.findByText("12 likes")).toBeInTheDocument();
  //   expect(like).toBeEnabled();
  // });
  //
  // it("rolls back when the server fails", async () => {
  //   const user = userEvent.setup();
  //   server.use(http.post("/api/posts/1/like", () => HttpResponse.json({}, { status: 500 })));
  //   render(<LikeButton postId={1} initialLiked={false} initialCount={10} />);
  //   await user.click(screen.getByRole("button", { name: "Like" }));
  //   expect(await screen.findByRole("alert")).toHaveTextContent(
  //     "Could not update your like. Please try again.",
  //   );
  //   expect(screen.getByRole("button", { name: "Like" })).toHaveAttribute("aria-pressed", "false");
  //   expect(screen.getByText("10 likes")).toBeInTheDocument();
  // });

  it.todo("shows the initial state with the right plural");
  it.todo("sends DELETE to un-like, and POST to like, for the right postId");
  it.todo("rolls a failed un-like back to pressed");
  it.todo("rolls back on a network failure");
  it.todo("removes the alert on the next click");
});
