/**
 * Tests for exercises/level07_data_fetching/ex01_user_profile.tsx
 *
 * Write your tests here first, run them and watch them fail, then build
 * the component until they pass. The "EDGE CASES TO TEST" section of the
 * exercise lists good cases to cover. Turn each `it.todo` into a real test.
 *
 * Run just this file:
 *     npm test -- ex01_user_profile
 */

import { render, screen } from '@testing-library/react';
import { http, HttpResponse } from 'msw';
import { describe, expect, it } from 'vitest';

import { server } from '../../test/server';
import { type User, UserProfile } from './ex01_user_profile';

const ADA: User = { id: 1, name: 'Ada Lovelace', email: 'ada@example.com' };

describe('UserProfile', () => {
  // Examples to get you started:
  //
  // it("shows loading, then the user", async () => {
  //   server.use(http.get("/api/users/1", () => HttpResponse.json(ADA)));
  //   render(<UserProfile userId={1} />);
  //   expect(screen.getByRole("status")).toHaveTextContent("Loading user...");
  //   expect(await screen.findByRole("heading", { name: "Ada Lovelace" })).toBeInTheDocument();
  //   expect(screen.getByText("Email: ada@example.com")).toBeInTheDocument();
  //   expect(screen.queryByRole("status")).not.toBeInTheDocument();
  // });
  //
  // it("shows 'User not found.' for a 404", async () => {
  //   server.use(http.get("/api/users/99", () => HttpResponse.json({}, { status: 404 })));
  //   render(<UserProfile userId={99} />);
  //   expect(await screen.findByRole("alert")).toHaveTextContent("User not found.");
  // });

  it.todo("shows 'Could not load the user.' for a 500");
  it.todo("shows 'Could not load the user.' when there is no answer at all");
  it.todo('shows loading again, then the new user, when userId changes');
  it.todo("doesn't fetch again when re-rendered with the same userId");
});
