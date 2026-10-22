/**
 * Tests for exercises/level09_reducers_and_context/ex03_auth_context.tsx
 *
 * Write your tests here first, run them and watch them fail, then build
 * the components until they pass. The "EDGE CASES TO TEST" section of
 * the exercise lists good cases to cover. Turn each `it.todo` into a
 * real test.
 *
 * Run just this file:
 *     npm test -- ex03_auth_context
 */

import { act, render, renderHook, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it, vi } from 'vitest';

import {
  AuthProvider,
  LoginForm,
  RequireAuth,
  useAuth,
  UserMenu,
} from './ex03_auth_context';

// A small app to test with. Uncomment it together with the examples.
//
// function App() {
//   return (
//     <AuthProvider>
//       <UserMenu />
//       <RequireAuth>
//         <p>Secret recipes...</p>
//       </RequireAuth>
//     </AuthProvider>
//   );
// }

describe('auth context', () => {
  // Remove any spies a test created (such as a silenced console.error).
  afterEach(() => {
    vi.restoreAllMocks();
  });

  // Examples to get you started:
  //
  // it("hides the children when nobody is logged in", () => {
  //   render(<App />);
  //   expect(screen.getByRole("heading", { name: "Please log in" })).toBeInTheDocument();
  //   expect(screen.queryByText("Secret recipes...")).not.toBeInTheDocument();
  // });
  //
  // it("shows the children after logging in", async () => {
  //   const user = userEvent.setup();
  //   render(<App />);
  //   await user.type(screen.getByLabelText("Name"), "Ada");
  //   await user.click(screen.getByRole("button", { name: "Log in" }));
  //   expect(screen.getByText("Secret recipes...")).toBeInTheDocument();
  //   expect(screen.getByText("Signed in as Ada")).toBeInTheDocument();
  // });

  it.todo('shows the children and no form when initialUser is given');
  it.todo('trims the name before logging in');
  it.todo('shows an alert and stays logged out when the name is blank');
  it.todo('removes the alert after a successful login');
  it.todo('hides the children again after Log out');
  it.todo('useAuth: login then logout leaves user null');
  it.todo('useAuth throws outside an AuthProvider');
});
