/**
 * Tests for exercises/level07_data_fetching/ex05_create_post_form.tsx
 *
 * Write your tests here first, run them and watch them fail, then build
 * the component until they pass. The "EDGE CASES TO TEST" section of the
 * exercise lists good cases to cover. Turn each `it.todo` into a real test.
 *
 * Run just this file:
 *     npm test -- ex05_create_post_form
 */

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { http, HttpResponse } from "msw";
import { describe, expect, it, vi } from "vitest";

import { server } from "../../test/server";
import { CreatePostForm } from "./ex05_create_post_form";

// PROVIDED: you don't need to change this.
// A gate: a handler can `await gate.opened`, and waits there until the
// test calls `gate.open()`. That lets you look at the "submitting" state.
function createGate() {
  let open!: () => void;
  const opened = new Promise<void>((resolve) => {
    open = resolve;
  });
  return { opened, open };
}

describe("CreatePostForm", () => {
  // Examples to get you started:
  //
  // it("sends the post and clears the form", async () => {
  //   const user = userEvent.setup();
  //   const onCreated = vi.fn();
  //   let received: unknown;
  //   server.use(
  //     http.post("/api/posts", async ({ request }) => {
  //       received = await request.json();
  //       return HttpResponse.json({ id: 7, title: "Hello", body: "My first post" }, { status: 201 });
  //     }),
  //   );
  //   render(<CreatePostForm onCreated={onCreated} />);
  //   await user.type(screen.getByLabelText("Title"), "Hello");
  //   await user.type(screen.getByLabelText("Body"), "My first post");
  //   await user.click(screen.getByRole("button", { name: "Create post" }));
  //   expect(await screen.findByText("Post created.")).toBeInTheDocument();
  //   expect(received).toEqual({ title: "Hello", body: "My first post" });
  //   expect(onCreated).toHaveBeenCalledWith({ id: 7, title: "Hello", body: "My first post" });
  //   expect(screen.getByLabelText("Title")).toHaveValue("");
  //   expect(screen.getByLabelText("Body")).toHaveValue("");
  // });
  //
  // it("shows a server message next to the title", async () => {
  //   const user = userEvent.setup();
  //   server.use(
  //     http.post("/api/posts", () =>
  //       HttpResponse.json({ errors: { title: "Title is required." } }, { status: 422 }),
  //     ),
  //   );
  //   render(<CreatePostForm />);
  //   await user.type(screen.getByLabelText("Body"), "No title here");
  //   await user.click(screen.getByRole("button", { name: "Create post" }));
  //   const title = screen.getByLabelText("Title");
  //   expect(await screen.findByText("Title is required.")).toBeInTheDocument();
  //   expect(title).toHaveAccessibleDescription("Title is required.");
  //   expect(title).toBeInvalid();
  //   expect(screen.getByLabelText("Body")).toHaveValue("No title here");
  // });

  it.todo("sends a POST with a JSON Content-Type header");
  it.todo("disables the button and shows 'Creating post...' while waiting");
  it.todo("sends only one request when the button is clicked twice");
  it.todo("doesn't mark Body invalid when only Title has a message");
  it.todo("shows both messages when both fields are rejected");
  it.todo("shows the alert and keeps the text on a 500");
  it.todo("shows the alert on a network failure");
  it.todo("clears old messages and the alert when submitting again");
  it.todo("submits when Enter is pressed in the Title field");
  it.todo("works without an onCreated prop");
});
