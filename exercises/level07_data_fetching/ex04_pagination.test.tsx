/**
 * Tests for exercises/level07_data_fetching/ex04_pagination.tsx
 *
 * Write your tests here first, run them and watch them fail, then build
 * the component until they pass. The "EDGE CASES TO TEST" section of the
 * exercise lists good cases to cover. Turn each `it.todo` into a real test.
 *
 * Run just this file:
 *     npm test -- ex04_pagination
 */

import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { http, HttpResponse } from "msw";
import { describe, expect, it } from "vitest";

import { server } from "../../test/server";
import { type PostsPage, PostsPager } from "./ex04_pagination";

// PROVIDED: you don't need to change this.
// Builds a fake page with two posts: "Post 1 on page 2", "Post 2 on page 2".
function makePage(page: number, totalPages: number): PostsPage {
  return {
    posts: [1, 2].map((n) => ({ id: page * 10 + n, title: `Post ${n} on page ${page}` })),
    page,
    totalPages,
  };
}

// PROVIDED: you don't need to change this.
// A gate: a handler can `await gate.opened`, and waits there until the
// test calls `gate.open()`. That lets you look at the loading state for
// as long as you like.
function createGate() {
  let open!: () => void;
  const opened = new Promise<void>((resolve) => {
    open = resolve;
  });
  return { opened, open };
}

describe("PostsPager", () => {
  // Examples to get you started:
  //
  // it("loads page 1 first", async () => {
  //   server.use(http.get("/api/posts", () => HttpResponse.json(makePage(1, 3))));
  //   render(<PostsPager />);
  //   expect(screen.getByRole("status")).toHaveTextContent("Loading page 1...");
  //   expect(await screen.findByText("Page 1 of 3")).toBeInTheDocument();
  //   expect(screen.getByText("Post 1 on page 1")).toBeInTheDocument();
  //   expect(screen.getByRole("button", { name: "Previous" })).toBeDisabled();
  //   expect(screen.getByRole("button", { name: "Page 1" })).toHaveAttribute("aria-current", "page");
  // });
  //
  // it("keeps the old page while the next one loads", async () => {
  //   const user = userEvent.setup();
  //   const gate = createGate();
  //   server.use(
  //     http.get("/api/posts", async ({ request }) => {
  //       const page = Number(new URL(request.url).searchParams.get("page"));
  //       if (page === 2) await gate.opened;
  //       return HttpResponse.json(makePage(page, 3));
  //     }),
  //   );
  //   render(<PostsPager />);
  //   await user.click(await screen.findByRole("button", { name: "Next" }));
  //   expect(screen.getByRole("status")).toHaveTextContent("Loading page 2...");
  //   expect(screen.getByText("Post 1 on page 1")).toBeInTheDocument();
  //   const nav = screen.getByRole("navigation", { name: "Pagination" });
  //   for (const button of within(nav).getAllByRole("button")) {
  //     expect(button).toBeDisabled();
  //   }
  //   gate.open();
  //   expect(await screen.findByText("Page 2 of 3")).toBeInTheDocument();
  //   expect(screen.getByText("Post 1 on page 2")).toBeInTheDocument();
  //   expect(screen.queryByRole("status")).not.toBeInTheDocument();
  // });

  it.todo("shows only the loading status before page 1 arrives");
  it.todo("requests page=2 when Next is clicked");
  it.todo("jumps straight to a page with its numbered button");
  it.todo("disables Next on the last page");
  it.todo("puts aria-current on the current page's button only");
  it.todo("disables Previous and Next when there is only one page");
  it.todo("sends no request when the current page's button is clicked");
});
