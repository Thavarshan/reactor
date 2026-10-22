/**
 * Tests for exercises/level01_jsx_and_components/ex01_greeting.tsx
 *
 * Write your tests here first, run them and watch them fail, then build
 * the component until they pass. The "EDGE CASES TO TEST" section of the
 * exercise lists good cases to cover. Turn each `it.todo` into a real test.
 *
 * Run just this file:
 *     npm test -- ex01_greeting
 */

import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Greeting } from "./ex01_greeting";

describe("Greeting", () => {
  // Examples to get you started:
  //
  // it("greets a person by name", () => {
  //   render(<Greeting name="Ada" />);
  //   expect(screen.getByRole("heading", { name: "Hello, Ada!" })).toBeInTheDocument();
  // });
  //
  // it("uses a level 1 heading", () => {
  //   render(<Greeting name="Ada" />);
  //   expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("Hello, Ada!");
  // });

  it.todo("greets a stranger when there is no name");
  it.todo("greets a stranger when the name is empty");
  it.todo("removes spaces around the name");
  it.todo("greets a stranger when the name is only spaces");
  it.todo("keeps spaces inside a name");
});
