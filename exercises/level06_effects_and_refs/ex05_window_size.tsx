/**
 * Exercise: Window Size
 * Level:    06 - Effects and Refs
 * Topics:   window event listeners, cleanup, lazy initial state, spying
 *
 * ========================================================================
 * YOUR TASK
 * ========================================================================
 * Build a <WindowSize> component that shows the size of the browser
 * window, and a layout name that depends on the width. It updates live
 * while the user resizes the window.
 *
 *     Width: 1024px
 *     Height: 768px
 *     Layout: desktop
 *
 *     <WindowSize />
 *
 * ========================================================================
 * BACKGROUND: SUBSCRIBING TO THE BROWSER
 * ========================================================================
 * The browser tells you about changes with events. `window` fires a
 * "resize" event every time the window changes size, and
 * `window.innerWidth` / `window.innerHeight` hold the new size.
 *
 * Listening is a SIDE EFFECT (it reaches outside your component), so it
 * goes in useEffect. This pattern is called "subscribe and unsubscribe":
 *
 *     useEffect(() => {
 *       function handleOnline() { console.log("back online"); }
 *       window.addEventListener("online", handleOnline);
 *       return () => window.removeEventListener("online", handleOnline);
 *     }, []);
 *
 * removeEventListener only works when you pass the SAME function you
 * added. A new arrow function that looks the same is a different
 * function, and removes nothing. That's why the example names the
 * function and uses that name twice.
 *
 * In development, React's <StrictMode> runs each effect twice when the
 * component appears (effect, cleanup, effect). With a correct cleanup,
 * you still end up with exactly one listener.
 *
 * ========================================================================
 * WHAT YOUR TESTS CAN FIND
 * ========================================================================
 * Three lines of text, each exactly like this (no other text in them):
 * - "Width: 1024px"
 * - "Height: 768px"
 * - "Layout: desktop"   (or "Layout: tablet", or "Layout: mobile")
 *
 * ========================================================================
 * THE RULES
 * ========================================================================
 * Your component must:
 * 1. Show the real window size on the very FIRST render (never
 *    "Width: 0px").
 * 2. Pick the layout from the width:
 *        less than 600         ->  "mobile"
 *        600 up to 1023        ->  "tablet"
 *        1024 or more          ->  "desktop"
 * 3. Update all three lines whenever the window fires "resize".
 * 4. Add exactly one "resize" listener to `window`, even inside
 *    <StrictMode>.
 * 5. Remove that same listener when it is unmounted.
 *
 * You can assume:
 * - The size is always whole numbers.
 *
 * ========================================================================
 * EXAMPLES
 * ========================================================================
 *     The window is 1024 x 768.
 *
 *     <WindowSize />            Width: 1024px, Height: 768px, Layout: desktop
 *       resize to 800 x 600  -> Width: 800px, Height: 600px, Layout: tablet
 *       resize to 375 x 667  -> Layout: mobile
 *
 * ========================================================================
 * EDGE CASES TO TEST
 * ========================================================================
 * - First render shows the current size, not zeros
 * - Width 599 -> mobile, 600 -> tablet, 1023 -> tablet, 1024 -> desktop
 * - A resize event updates width, height and layout
 * - Unmounting removes the listener: removeEventListener is called with
 *   "resize" and the SAME function that was added
 * - Inside <StrictMode>, after it appears there is exactly one listener
 *   (adds minus removes equals 1)
 *
 * ========================================================================
 * HINTS (read only if you get stuck)
 * ========================================================================
 * 1. Keep the size in state, as one object: `{ width, height }`.
 * 2. Start the state from the real window size. useState accepts a
 *    function, and calls it only on the first render:
 *    `useState(() => ({ width: window.innerWidth, ... }))`.
 * 3. The layout is derived from the width: work it out during render,
 *    don't keep it in state.
 * 4. Your effect has nothing in its dependency array: subscribe once,
 *    unsubscribe once.
 * 5. TESTING: the test browser (jsdom) starts at 1024 x 768. To fake a
 *    resize, change the size and fire the event yourself, inside act
 *    because it updates state:
 *        act(() => {
 *          Object.assign(window, { innerWidth: 800, innerHeight: 600 });
 *          window.dispatchEvent(new Event("resize"));
 *        });
 *    Put the size back in an `afterEach`, or the next test starts with
 *    a strange window.
 * 6. TESTING: a SPY wraps a real function and records every call:
 *        const removeSpy = vi.spyOn(window, "removeEventListener");
 *        ...
 *        unmount();
 *        expect(removeSpy).toHaveBeenCalledWith("resize", expect.any(Function));
 *    To prove it's the SAME function, spy on addEventListener too, find
 *    the "resize" call in `addSpy.mock.calls`, and check that its
 *    function was passed to removeEventListener. Call
 *    `vi.restoreAllMocks()` in afterEach to remove the spies.
 *
 * ========================================================================
 * REACT CONCEPTS TO LEARN
 * ========================================================================
 * - Subscribing to browser events in useEffect, and unsubscribing
 * - Why cleanup needs the same function reference
 * - Lazy initial state: useState(() => ...)
 * - Derived values instead of extra state
 *
 * ========================================================================
 * STRETCH GOALS
 * ========================================================================
 * - Move it into a custom hook, `useWindowSize()`, that returns
 *   `{ width, height }`.
 * - Look up `useSyncExternalStore`: React's built-in way to subscribe to
 *   something outside React. Rewrite the hook with it.
 */

import type { ReactElement } from "react";

export function WindowSize(): ReactElement {
  // TODO: build me, then make your tests pass.
  throw new Error("Not implemented: WindowSize");
}
