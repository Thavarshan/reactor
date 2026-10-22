/**
 * Exercise: Auth Context
 * Level:    09 - Reducers and Context
 * Topics:   context, provider + hook pattern, conditional rendering,
 *           forms, guarding content
 *
 * ========================================================================
 * YOUR TASK
 * ========================================================================
 * Keep track of who is logged in, and share it with the whole app
 * through context. Build five pieces:
 *
 * - <AuthProvider>: owns the logged-in user and shares it.
 * - useAuth(): returns { user, login, logout }.
 * - <LoginForm>: a name field and a "Log in" button.
 * - <UserMenu>: "Signed in as Ada" plus a "Log out" button.
 * - <RequireAuth>: shows its children only to a logged-in user, and the
 *   login form to everyone else.
 *
 *     Logged out:                   Logged in:
 *
 *     Please log in                 Signed in as Ada   [ Log out ]
 *     Name [__________]             Secret recipes...
 *     [ Log in ]
 *
 *     <AuthProvider>
 *       <UserMenu />
 *       <RequireAuth>
 *         <p>Secret recipes...</p>
 *       </RequireAuth>
 *     </AuthProvider>
 *
 * ========================================================================
 * BACKGROUND: GUARDING CONTENT
 * ========================================================================
 * A "guard" is a component that decides whether to show its children.
 * Because it reads the user from context, it needs no props about the
 * user at all:
 *
 *     function AdminsOnly({ children }: { children: ReactNode }) {
 *       const role = use(RoleContext);
 *       return role === "admin" ? children : <p>Admins only.</p>;
 *     }
 *
 * When the context value changes (someone logs in), the guard
 * re-renders and the hidden content appears by itself.
 *
 * A component can return `children` directly. React can render any
 * ReactNode: an element, text, an array or null.
 *
 * ========================================================================
 * WHAT YOUR TESTS CAN FIND
 * ========================================================================
 * LoginForm:
 * - A <form> with a text input labelled "Name" and a button named
 *   "Log in".
 * - After a blank submit: an element with role="alert" and the text
 *   "Please enter your name". Screen readers read out an alert as soon
 *   as it appears.
 * UserMenu:
 * - Logged in: the text "Signed in as Ada" (with the user's name) and a
 *   button named "Log out".
 * - Logged out: the text "Not signed in", and no "Log out" button.
 * RequireAuth:
 * - Logged in: its children, and nothing else.
 * - Logged out: a heading (<h2>) named "Please log in", followed by a
 *   <LoginForm />. The children are NOT rendered.
 *
 * ========================================================================
 * THE RULES
 * ========================================================================
 * AuthProvider and useAuth must:
 * 1. AuthProvider accepts `children` and an optional `initialUser`
 *    (default null, meaning logged out).
 * 2. useAuth returns { user, login, logout } from the nearest
 *    AuthProvider.
 * 3. login(name) sets user to { name }. logout() sets user back to
 *    null.
 * 4. useAuth throws an Error with the exact message
 *    "useAuth must be used inside an AuthProvider" when there is no
 *    AuthProvider above it.
 *
 * LoginForm must:
 * 5. On submit (the button or Enter), trim the name. If it is empty,
 *    show the alert and do NOT log in.
 * 6. Otherwise call login with the trimmed name, and remove the alert
 *    if it was showing.
 *
 * UserMenu must:
 * 7. Show who is signed in, or "Not signed in".
 * 8. Call logout when "Log out" is clicked.
 *
 * RequireAuth must:
 * 9. Show its children only while someone is logged in. Show the
 *    heading and LoginForm otherwise.
 *
 * You can assume:
 * - There is no password and no server. Logging in always works.
 *
 * ========================================================================
 * EXAMPLES
 * ========================================================================
 *     The app from YOUR TASK, starting logged out:
 *       shows "Not signed in", "Please log in" and the form
 *       "Secret recipes..." is NOT shown
 *       type "  Ada ", click "Log in"
 *         ->  "Signed in as Ada"        the name was trimmed
 *             "Secret recipes..." appears, the form disappears
 *       click "Log out"
 *         ->  "Not signed in", and the form comes back
 *
 *     <LoginForm /> inside a provider
 *       click "Log in" with an empty name  ->  alert "Please enter your name"
 *
 *     <AuthProvider initialUser={{ name: "Grace" }}>
 *       <UserMenu />                     ->  "Signed in as Grace"
 *
 * ========================================================================
 * EDGE CASES TO TEST
 * ========================================================================
 * - Logged out by default: RequireAuth hides its children
 * - initialUser starts logged in: children shown, no login form
 * - Logging in through the form shows the children and the user's name
 * - The name is trimmed: "  Ada " -> "Signed in as Ada"
 * - A blank name shows the alert and stays logged out
 * - A successful login after a blank one removes the alert
 * - "Log out" hides the children again
 * - useAuth: login("Ada") then logout() -> user is null (renderHook)
 * - useAuth outside a provider throws the exact message
 *
 * ========================================================================
 * HINTS (read only if you get stuck)
 * ========================================================================
 * 1. Follow the same shape as a theme context: createContext with null,
 *    a provider component with useState, and a hook that throws when
 *    the context is null.
 * 2. In LoginForm, keep the typed name and the error message in local
 *    state. They belong to the form, not to the whole app.
 * 3. RequireAuth is a few lines: read `user` from useAuth, then return
 *    either `children` or the heading plus <LoginForm />. A fragment
 *    (<>...</>) groups two elements without an extra wrapper.
 * 4. TESTING: to check that something is NOT shown, use queryBy. It
 *    returns null instead of throwing when nothing matches:
 *        expect(screen.queryByText("Secret recipes...")).not.toBeInTheDocument();
 *    To test the alert going away, render <LoginForm /> on its own
 *    inside an AuthProvider, so the form stays on screen after login.
 * 5. TESTING: for the hook, use renderHook with a wrapper:
 *        renderHook(() => useAuth(), { wrapper: AuthProvider });
 *    and wrap login/logout calls in act.
 *
 * ========================================================================
 * REACT CONCEPTS TO LEARN
 * ========================================================================
 * - The provider + hook pattern for app-wide state
 * - Guard components that render children conditionally
 * - Local state (the form) vs. shared state (the user)
 * - role="alert" for error messages
 *
 * ========================================================================
 * STRETCH GOALS
 * ========================================================================
 * - Make login async: POST the name to /api/login (mock it with MSW),
 *   show "Logging in..." and disable the button while waiting.
 * - Remember the user in localStorage so a reload keeps them logged in.
 * - Move focus to the "Name" input when the login form appears.
 */

import type { ReactNode } from 'react';
import { type ReactElement } from 'react';

export type User = {
  /** The name the user logged in with. */
  name: string;
};

export type AuthContextValue = {
  /** The logged-in user, or null when nobody is logged in. */
  user: User | null;
  /** Logs in with this name. */
  login: (name: string) => void;
  /** Logs out. */
  logout: () => void;
};

export type AuthProviderProps = {
  /** The part of the app that can use the auth state. */
  children: ReactNode;
  /** Who is logged in at first. Default null (logged out). */
  initialUser?: User | null;
};

export function AuthProvider({
  children,
  initialUser = null,
}: AuthProviderProps): ReactElement {
  // TODO: build me, then make your tests pass.
  throw new Error('Not implemented: AuthProvider');
}

export function useAuth(): AuthContextValue {
  // TODO: implement me, then make your tests pass.
  throw new Error('Not implemented: useAuth');
}

export function LoginForm(): ReactElement {
  // TODO: build me, then make your tests pass.
  throw new Error('Not implemented: LoginForm');
}

export function UserMenu(): ReactElement {
  // TODO: build me, then make your tests pass.
  throw new Error('Not implemented: UserMenu');
}

export type RequireAuthProps = {
  /** What only a logged-in user may see. */
  children: ReactNode;
};

export function RequireAuth({ children }: RequireAuthProps): ReactElement {
  // TODO: build me, then make your tests pass.
  throw new Error('Not implemented: RequireAuth');
}
