/**
 * Tests for exercises/level12_concurrent_react/ex04_use_with_suspense.tsx
 *
 * Write your tests here first, run them and watch them fail, then build
 * the component until they pass. The "EDGE CASES TO TEST" section of the
 * exercise lists good cases to cover. Turn each `it.todo` into a real test.
 *
 * Run just this file:
 *     npm test -- ex04_use_with_suspense
 */

import { act, render, screen } from "@testing-library/react";
import { http, HttpResponse } from "msw";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { server } from "../../test/server";
import { clearUserCache, fetchUser, UserCard } from "./ex04_use_with_suspense";

describe("UserCard", () => {
  // Forget cached users between tests (uncomment once clearUserCache works):
  // beforeEach(() => clearUserCache());

  // Examples to get you started:
  //
  // it("shows the loading status, then the user", async () => {
  //   server.use(
  //     http.get("/api/users/1", () =>
  //       HttpResponse.json({ id: 1, name: "Ada Lovelace", email: "ada@example.com" }),
  //     ),
  //   );
  //   await act(async () => {
  //     render(<UserCard userId={1} />);
  //   });
  //   expect(await screen.findByRole("heading", { name: "Ada Lovelace" })).toBeInTheDocument();
  //   expect(screen.getByText("ada@example.com")).toBeInTheDocument();
  // });
  //
  // it("returns the same Promise for the same id", () => {
  //   server.use(http.get("/api/users/1", () => HttpResponse.json({ id: 1, name: "Ada", email: "a@x.com" })));
  //   expect(fetchUser(1)).toBe(fetchUser(1));
  // });

  it.todo("shows Loading user... first, then the name and email");
  it.todo("fetchUser returns the same Promise for the same id");
  it.todo("makes only one request for two cards with the same user");
  it.todo("shows the alert when the request fails");
  it.todo("fetchUser rejects with Could not load user 9 on a 404");
  it.todo("shows the loading status, then the new user, when userId changes");
  it.todo("shows an already loaded user at once");
  it.todo("shows a working user after a failure when userId changes");
});
