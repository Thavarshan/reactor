/**
 * Exercise: Error Boundary
 * Level:    11 - Accessible UI Patterns
 * Topics:   class components, getDerivedStateFromError, componentDidCatch,
 *           role="alert", resetting with resetKeys
 *
 * ========================================================================
 * YOUR TASK
 * ========================================================================
 * Build an <ErrorBoundary>. If anything inside it throws while
 * rendering, it shows a fallback message with a "Try again" button
 * instead of a blank page. It can also reset itself when the data it
 * depends on changes (`resetKeys`).
 *
 *     +-------------------------------------+
 *     | Something went wrong.               |   role="alert"
 *     | Could not load user 42              |   <- the error's message
 *     | [ Try again ]                       |
 *     +-------------------------------------+
 *
 *     <ErrorBoundary resetKeys={[userId]} onReset={() => refetch()}>
 *       <UserCard id={userId} />
 *     </ErrorBoundary>
 *
 * ========================================================================
 * BACKGROUND: WHY A CLASS?
 * ========================================================================
 * When a component throws an error while rendering, React removes the
 * whole app from the page, unless an "error boundary" above it catches
 * the error. There's no hook for this yet, so an error boundary must be
 * a class component, the older way to write components:
 *
 *     class Hello extends Component<{ name: string }, { count: number }> {
 *       state = { count: 0 };                 // like useState's initial value
 *       render() {                            // like a function component's body
 *         return <p>{this.props.name}: {this.state.count}</p>;
 *       }
 *     }
 *
 * `this.props` holds the props, `this.state` the state, and
 * `this.setState({ count: 1 })` changes it. Two special methods make a
 * class an error boundary:
 *
 *     static getDerivedStateFromError(error: Error) {
 *       return { error };       // new state, used for the next render
 *     }
 *     componentDidCatch(error: Error) {
 *       // runs after: a good place to log the error
 *     }
 *
 * And one more is useful for resetKeys:
 *
 *     componentDidUpdate(prevProps, prevState) {
 *       // runs after every update. Compare old and new props here.
 *     }
 *
 * Error boundaries only catch errors thrown while rendering (and in
 * lifecycle methods). An error inside an onClick handler or a setTimeout
 * isn't caught. Handle those with try/catch.
 *
 * ========================================================================
 * WHAT YOUR TESTS CAN FIND
 * ========================================================================
 * - With no error: just `children`.
 * - With an error and no `fallbackRender`: the default fallback, a
 *   <div role="alert"> containing:
 *   - the text "Something went wrong."
 *   - the error's message, e.g. "Boom"
 *   - a button named "Try again"
 *   role="alert" makes screen readers announce it at once.
 * - With an error and `fallbackRender`: whatever
 *   `fallbackRender({ error, resetErrorBoundary })` returns, instead.
 *
 * ========================================================================
 * THE RULES
 * ========================================================================
 * Your component must:
 * 1. Render `children` while there's no error.
 * 2. Catch an error thrown while rendering any child, store it in state
 *    (`{ error }`), and render the fallback instead of the children.
 * 3. Call `onError(error)` once for each caught error.
 * 4. Reset when "Try again" (or `resetErrorBoundary`) is called: clear
 *    the error, call `onReset()`, and render the children again. If
 *    they throw again, show the fallback again.
 * 5. Also reset when `resetKeys` changes while showing the fallback. It
 *    "changes" when its length changes, or any item differs from the
 *    old one at the same position (Object.is). Call `onReset()` here
 *    too.
 * 6. Not reset because of resetKeys when there's no error, or in the
 *    very update that caught the error.
 *
 * You can assume:
 * - Children only throw Error objects.
 *
 * ========================================================================
 * EXAMPLES
 * ========================================================================
 *     <ErrorBoundary><Bomb /></ErrorBoundary>   (Bomb throws "Boom")
 *         ->  alert: "Something went wrong." "Boom" [Try again]
 *
 *     the Bomb stops throwing, click "Try again"
 *         ->  the children show again, onReset called once
 *
 *     the Bomb still throws, click "Try again"
 *         ->  the alert again (and onError called a second time)
 *
 *     resetKeys={[1]} with an error, then rerender with resetKeys={[2]}
 *         ->  resets by itself, no click needed
 *
 *     fallbackRender={({ error }) => <p>Oops: {error.message}</p>}
 *         ->  "Oops: Boom", no default alert
 *
 * ========================================================================
 * EDGE CASES TO TEST
 * ========================================================================
 * - No error: children render, no alert
 * - A child throws: the alert shows "Something went wrong.", the
 *   message and "Try again", and the children are gone
 * - onError is called once with the error
 * - "Try again" after the problem is fixed shows the children, and
 *   calls onReset once
 * - "Try again" while still broken shows the alert again
 * - fallbackRender replaces the default, and its resetErrorBoundary
 *   works
 * - Changing resetKeys while showing the fallback resets it
 * - Adding an item to resetKeys (a length change) also resets it
 * - Changing resetKeys with no error does nothing (onReset not called)
 * - Rerendering with equal resetKeys (a new array, same items) does
 *   not reset
 * - A resetKeys change that itself causes the error still shows the
 *   fallback (it doesn't reset straight away)
 *
 * ========================================================================
 * HINTS (read only if you get stuck)
 * ========================================================================
 * 1. State is `{ error: Error | null }`, starting at `{ error: null }`.
 * 2. Write a `resetErrorBoundary = () => { ... }` arrow-function field
 *    on the class, so `this` works when you pass it to onClick.
 * 3. In componentDidUpdate(prevProps, prevState), only consider
 *    resetting when `this.state.error !== null` and
 *    `prevState.error !== null`. The second check skips the update that
 *    just caught the error (rule 6).
 * 4. Write a small helper `changed(a = [], b = [])` that compares two
 *    arrays as described in rule 5.
 * 5. TESTING: React logs every caught error with console.error, which
 *    fills your test output with red. Silence it in the tests that
 *    throw: `vi.spyOn(console, "error").mockImplementation(() => {})`,
 *    and `vi.restoreAllMocks()` in afterEach.
 * 6. TESTING: make a test component that throws on purpose, controlled
 *    by a prop: `function Bomb({ explode }: { explode: boolean }) { if
 *    (explode) throw new Error("Boom"); return <p>All good</p>; }`. To
 *    "fix" it before "Try again", use a variable the component reads,
 *    or `rerender` with different props.
 *
 * ========================================================================
 * REACT CONCEPTS TO LEARN
 * ========================================================================
 * - Class components: props, state, setState, lifecycle methods
 * - Error boundaries: getDerivedStateFromError and componentDidCatch
 * - What error boundaries don't catch (event handlers, async code)
 * - Resetting with resetKeys, and comparing arrays by position
 * - role="alert" for urgent messages
 *
 * ========================================================================
 * STRETCH GOALS
 * ========================================================================
 * - Move focus to the "Try again" button when the fallback appears.
 * - Write a `useErrorBoundary()` hook that lets an event handler send an
 *   error to the nearest boundary. (Hint: set state to a function that
 *   throws.)
 * - Compare yours with the popular react-error-boundary package's API.
 */

import { Component, type ReactNode } from "react";

export type FallbackProps = {
  /** The error that was caught. */
  error: Error;
  /** Call this to clear the error and try rendering the children again. */
  resetErrorBoundary: () => void;
};

export type ErrorBoundaryProps = {
  /** What to render when nothing has gone wrong. */
  children?: ReactNode;
  /** Optional custom fallback. Without it, the default alert is shown. */
  fallbackRender?: (props: FallbackProps) => ReactNode;
  /** Called with each error that is caught. */
  onError?: (error: Error) => void;
  /** Called every time the boundary resets. */
  onReset?: () => void;
  /** When any of these change while showing the fallback, reset. */
  resetKeys?: unknown[];
};

export type ErrorBoundaryState = {
  /** The caught error, or null when everything is fine. */
  error: Error | null;
};

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { error: null };

  render(): ReactNode {
    // TODO: build me (add the error boundary methods), then make your tests pass.
    throw new Error("Not implemented: ErrorBoundary");
  }
}
