/**
 * Tests for exercises/level04_forms/ex02_signup_form.tsx
 *
 * Write your tests here first, run them and watch them fail, then build
 * the component until they pass. The "EDGE CASES TO TEST" section of the
 * exercise lists good cases to cover. Turn each `it.todo` into a real test.
 *
 * Run just this file:
 *     npm test -- ex02_signup_form
 */

import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { SignupForm } from "./ex02_signup_form";

describe("SignupForm", () => {
  // Examples to get you started:
  //
  // it("shows every required error when submitted empty", async () => {
  //   const user = userEvent.setup();
  //   const onSubmit = vi.fn();
  //   render(<SignupForm onSubmit={onSubmit} />);
  //   await user.click(screen.getByRole("button", { name: "Sign up" }));
  //   expect(screen.getByLabelText("Email")).toHaveAccessibleDescription(
  //     "Email is required",
  //   );
  //   expect(onSubmit).not.toHaveBeenCalled();
  // });
  //
  // it("submits a valid form", async () => {
  //   const user = userEvent.setup();
  //   const onSubmit = vi.fn();
  //   render(<SignupForm onSubmit={onSubmit} />);
  //   await user.type(screen.getByLabelText("Email"), "ada@example.com");
  //   await user.type(screen.getByLabelText("Password"), "longenough");
  //   await user.type(screen.getByLabelText("Confirm password"), "longenough");
  //   await user.click(screen.getByRole("button", { name: "Sign up" }));
  //   expect(onSubmit).toHaveBeenCalledWith({
  //     email: "ada@example.com",
  //     password: "longenough",
  //   });
  // });

  it.todo("shows no errors and nothing invalid before the first submit");
  it.todo("shows all three required errors on an empty submit, without calling onSubmit");
  it.todo("links each error to its input and marks the input invalid");
  it.todo("rejects an email without a dot after the @");
  it.todo("rejects a 7-character password but accepts an 8-character one");
  it.todo("says the passwords do not match");
  it.todo("keeps the errors while typing, and updates them on the next submit");
  it.todo("calls onSubmit once with the email and password");
  it.todo("prevents the browser's default submit");
  it.todo("submits when Enter is pressed in a field");
});
