/**
 * Tests for exercises/level07_data_fetching/ex03_stale_responses.tsx
 *
 * Write your tests here first, run them and watch them fail, then build
 * the component until they pass. The "EDGE CASES TO TEST" section of the
 * exercise lists good cases to cover. Turn each `it.todo` into a real test.
 *
 * Run just this file:
 *     npm test -- ex03_stale_responses
 */

import { act, render, screen } from "@testing-library/react";
import { delay, http, HttpResponse } from "msw";
import { StrictMode } from "react";
import { describe, expect, it } from "vitest";

import { server } from "../../test/server";
import { type Post, UserPosts } from "./ex03_stale_responses";

const ADA_POSTS: Post[] = [
  { id: 1, title: "Notes on the Analytical Engine" },
  { id: 2, title: "Sketch of the Engine" },
];
const GRACE_POSTS: Post[] = [{ id: 3, title: "The first compiler" }];

// Wait for real time to pass, inside act so React finishes any update
// that a late answer causes.
function waitMs(ms: number) {
  return act(() => new Promise<void>((resolve) => setTimeout(resolve, ms)));
}

describe("UserPosts", () => {
  // Examples to get you started:
  //
  // it("shows loading, then the posts", async () => {
  //   server.use(http.get("/api/users/1/posts", () => HttpResponse.json(ADA_POSTS)));
  //   render(<UserPosts userId={1} />);
  //   expect(screen.getByRole("status")).toHaveTextContent("Loading posts...");
  //   expect(await screen.findByText("Notes on the Analytical Engine")).toBeInTheDocument();
  //   expect(screen.getAllByRole("listitem")).toHaveLength(2);
  // });
  //
  // it("ignores a slow answer for the previous user", async () => {
  //   server.use(
  //     http.get("/api/users/:userId/posts", async ({ params }) => {
  //       if (params.userId === "1") {
  //         await delay(200);
  //         return HttpResponse.json(ADA_POSTS);
  //       }
  //       return HttpResponse.json(GRACE_POSTS);
  //     }),
  //   );
  //   const { rerender } = render(<UserPosts userId={1} />);
  //   rerender(<UserPosts userId={2} />);
  //   expect(await screen.findByText("The first compiler")).toBeInTheDocument();
  //   await waitMs(300); // longer than user 1's delay
  //   expect(screen.getByText("The first compiler")).toBeInTheDocument();
  //   expect(screen.queryByText("Notes on the Analytical Engine")).not.toBeInTheDocument();
  // });

  it.todo("shows 'No posts yet.' and no list for an empty array");
  it.todo("shows 'Could not load posts.' for a 500");
  it.todo("shows loading at once, without the old titles, when userId changes");
  it.todo("ignores a slow ERROR for the previous user");
  it.todo("shows the posts and no alert inside StrictMode");
});
