/**
 * Tests for exercises/level08_custom_hooks/ex06_use_fetch.ts
 *
 * Write your tests here first, run them and watch them fail, then build
 * the hook until they pass. The "EDGE CASES TO TEST" section of the
 * exercise lists good cases to cover. Turn each `it.todo` into a real test.
 *
 * Run just this file:
 *     npm test -- ex06_use_fetch
 */

import { act, renderHook, waitFor } from "@testing-library/react";
import { delay, http, HttpResponse } from "msw";
import { describe, expect, it } from "vitest";

import { server } from "../../test/server";
import { useFetch } from "./ex06_use_fetch";

type User = { name: string };

describe("useFetch", () => {
  // Examples to get you started:
  //
  // it("starts out loading", () => {
  //   server.use(http.get("/api/users/1", () => HttpResponse.json({ name: "Ada" })));
  //   const { result } = renderHook(() => useFetch<User>("/api/users/1"));
  //   expect(result.current.loading).toBe(true);
  //   expect(result.current.data).toBeUndefined();
  //   expect(result.current.error).toBeUndefined();
  // });
  //
  // it("returns the JSON when the request succeeds", async () => {
  //   server.use(http.get("/api/users/1", () => HttpResponse.json({ name: "Ada" })));
  //   const { result } = renderHook(() => useFetch<User>("/api/users/1"));
  //   await waitFor(() => expect(result.current.loading).toBe(false));
  //   expect(result.current.data).toEqual({ name: "Ada" });
  //   expect(result.current.error).toBeUndefined();
  // });

  it.todo("returns an error with the status for a 500 response");
  it.todo("returns an error when the network fails");
  it.todo("aborts the old request when the url changes");
  it.todo("never lets a slow old response replace newer data");
  it.todo("aborts the running request on unmount");
  it.todo("fetches again and shows the new data when refetch is called");
});
