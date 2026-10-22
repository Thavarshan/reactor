/**
 * Tests for exercises/level01_jsx_and_components/ex05_user_table.tsx
 *
 * Write your tests here first, run them and watch them fail, then build
 * the component until they pass. The "EDGE CASES TO TEST" section of the
 * exercise lists good cases to cover. Turn each `it.todo` into a real test.
 *
 * Run just this file:
 *     npm test -- ex05_user_table
 */

import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { UserTable, type User } from "./ex05_user_table";

const users: User[] = [
  { id: 1, name: "Ada Lovelace", email: "ada@example.com", role: "admin" },
  { id: 2, name: "Alan Turing", email: "alan@example.com", role: "member" },
];

describe("UserTable", () => {
  // Examples to get you started:
  //
  // it("is named by its caption", () => {
  //   render(<UserTable users={users} />);
  //   expect(screen.getByRole("table", { name: "Users" })).toBeInTheDocument();
  // });
  //
  // it("shows each user's name as a row header", () => {
  //   render(<UserTable users={users} />);
  //   const rows = screen.getAllByRole("row");
  //   expect(within(rows[1]).getByRole("rowheader")).toHaveTextContent("Ada Lovelace");
  // });

  it.todo("uses a custom caption as the table's name");
  it.todo("has the column headers Name, Email and Role, in order");
  it.todo("renders one row per user plus the header row, in order");
  it.todo("links each email with a mailto: href");
  it.todo("shows the roles as Admin and Member");
  it.todo("shows a 'No users found' cell spanning 3 columns when empty");
  it.todo("keeps the column headers when empty");
});
