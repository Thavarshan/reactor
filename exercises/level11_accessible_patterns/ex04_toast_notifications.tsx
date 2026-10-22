/**
 * Exercise: Toast Notifications
 * Level:    11 - Accessible UI Patterns
 * Topics:   context, custom hook, createPortal, live regions, timers, cleanup
 *
 * ========================================================================
 * YOUR TASK
 * ========================================================================
 * Build a toast system: a <ToastProvider> that wraps your app, and a
 * `useToast()` hook that any component inside it can call to show a
 * short message ("toast") in the corner of the screen. Each toast
 * disappears by itself after a few seconds, or when its "Dismiss" button
 * is clicked. Screen readers announce each new toast.
 *
 *                                       +---------------------------+
 *                                       | Saved               [x]   |
 *                                       | Copied to clipboard [x]   |
 *                                       +---------------------------+
 *
 *     <ToastProvider duration={5000}>
 *       <App />          // inside: const { showToast } = useToast();
 *     </ToastProvider>   //         showToast("Saved");
 *
 * ========================================================================
 * BACKGROUND: PORTALS
 * ========================================================================
 * A component's output normally goes inside its parent's DOM element.
 * Toasts float above everything, so they're easier to style and stack
 * when they live directly in <body>. createPortal renders React
 * children into a different DOM element, while they still behave like
 * normal children in React (context, events and state all still work):
 *
 *     import { createPortal } from "react-dom";
 *
 *     return createPortal(<p>I live in body</p>, document.body);
 *
 * ========================================================================
 * BACKGROUND: LIVE REGIONS
 * ========================================================================
 * A screen reader reads what has focus. A toast doesn't take focus
 * (that would interrupt the user), so how is it heard? With a "live
 * region": an element whose changes are read out automatically.
 * role="status" is a polite live region. It waits until the screen
 * reader finishes its current sentence.
 *
 * Screen readers only watch a live region that already exists. Content
 * that appears together with a brand new region is often missed. So
 * render the role="status" container ALWAYS, even with no toasts, and
 * put the toasts inside it.
 *
 * ========================================================================
 * WHAT YOUR TESTS CAN FIND
 * ========================================================================
 * - Your `children`, rendered normally.
 * - A container <div role="status"> that is a direct child of
 *   document.body (through createPortal), present even with no toasts.
 * - Inside it, a <ul> with one <li> per toast, oldest first. Each <li>
 *   holds the message text and a button named "Dismiss <message>",
 *   e.g. "Dismiss Saved" (aria-label={`Dismiss ${message}`}, visible
 *   text "x" or "×").
 *
 * ========================================================================
 * THE RULES
 * ========================================================================
 * Your code must:
 * 1. ToastProvider: render `children`, plus the status container in
 *    document.body as described.
 * 2. useToast(): return an object with `showToast(message)`. Outside a
 *    ToastProvider it must throw an Error whose message is
 *    "useToast must be used inside a ToastProvider".
 * 3. showToast(message) adds a toast to the end of the list. The same
 *    message twice makes two toasts.
 * 4. Each toast removes itself `duration` ms (default 5000) after it was
 *    shown, on its own timer.
 * 5. "Dismiss <message>" removes that toast at once and cancels its
 *    timer.
 * 6. When the provider unmounts, cancel every pending timer.
 * 7. `showToast` keeps the same identity across renders, so components
 *    can safely list it in a dependency array.
 *
 * You can assume:
 * - Only one ToastProvider is on the page.
 *
 * ========================================================================
 * EXAMPLES
 * ========================================================================
 * duration 5000:
 *
 *     t=0     showToast("Saved")     ->  1 toast: "Saved"
 *     t=2000  showToast("Copied")    ->  2 toasts: "Saved", "Copied"
 *     t=5000                         ->  "Saved" is gone, "Copied" stays
 *     t=7000                         ->  no toasts, status still there
 *
 *     click "Dismiss Copied"         ->  "Copied" gone right away
 *     useToast() with no provider    ->  throws
 *
 * ========================================================================
 * EDGE CASES TO TEST
 * ========================================================================
 * - The status container is in document.body even with no toasts, and
 *   not inside the rendered component's container
 * - showToast adds a toast with the message and a Dismiss button
 * - Several toasts show oldest first
 * - A toast disappears exactly at `duration` (still there 1 ms before)
 * - Each toast has its own timer
 * - A custom duration (e.g. 1000) works
 * - "Dismiss" removes only that toast, and leaves one fewer timer
 *   pending
 * - The same message twice makes two toasts
 * - Unmounting the provider leaves no timers pending
 * - useToast outside a provider throws the message above
 * - showToast is the same function after a re-render
 *
 * ========================================================================
 * HINTS (read only if you get stuck)
 * ========================================================================
 * 1. Keep toasts in state as `{ id: number; message: string }[]`. Make
 *    ids with a counter in a ref: `nextId.current++`.
 * 2. Keep the timers in a ref too, e.g. a `Map<number, timeout id>`, so
 *    Dismiss and unmount can find and clear them. A useEffect with an
 *    empty dependency array can return a cleanup that clears them all.
 * 3. Make showToast with useCallback. Use a functional update,
 *    `setToasts((list) => [...list, toast])`, so it doesn't need
 *    `toasts` as a dependency. Wrap the context value in useMemo.
 * 4. Make a context with a default of `null`. In useToast, throw if
 *    `useContext` gives you null.
 * 5. TESTING: write a tiny component in the test file that calls the
 *    hook, e.g. a "Save" button that calls `showToast("Saved")`.
 * 6. TESTING: for exact timing ("still there at 4999 ms, gone at
 *    5000"), use plain fake timers, `vi.useFakeTimers()`, and click with
 *    `fireEvent.click(button)`, which doesn't wait for timers. Move time
 *    with `act(() => { vi.advanceTimersByTime(5000); })`, and call
 *    `vi.useRealTimers()` in afterEach. (user-event needs
 *    `vi.useFakeTimers({ shouldAdvanceTime: true })`, which lets real
 *    time leak into the fake clock, so a few extra ms can pass.)
 * 7. TESTING: `vi.getTimerCount()` tells you how many fake timers are
 *    still waiting. Check `expect(screen.getByRole("status").parentElement)
 *    .toBe(document.body)` for the portal.
 * 8. TESTING: to test the throw, silence React's error log with
 *    `vi.spyOn(console, "error").mockImplementation(() => {})`, then
 *    `expect(() => renderHook(() => useToast())).toThrow(...)`.
 *
 * ========================================================================
 * REACT CONCEPTS TO LEARN
 * ========================================================================
 * - Context + a custom hook as a small app-wide API
 * - createPortal: rendering into another DOM element
 * - Live regions: role="status" for polite announcements
 * - Timers in refs, and cleaning them up on unmount
 * - Stable callbacks with useCallback and useMemo
 *
 * ========================================================================
 * STRETCH GOALS
 * ========================================================================
 * - Add a `type` ("info" or "error"). Put error toasts in a second,
 *   role="alert" container, which interrupts the screen reader.
 * - Pause a toast's timer while the mouse is over it.
 * - Show at most 3 toasts. Drop the oldest when a fourth arrives.
 */

import { ReactNode, type ReactElement } from "react";

export type ToastProviderProps = {
  /** Your app. */
  children: ReactNode;
  /** How long each toast stays, in ms. Default 5000. */
  duration?: number;
};

export type ToastApi = {
  /** Shows a toast with this message. */
  showToast: (message: string) => void;
};

export function ToastProvider({ children, duration = 5000 }: ToastProviderProps): ReactElement {
  // TODO: build me, then make your tests pass.
  throw new Error("Not implemented: ToastProvider");
}

export function useToast(): ToastApi {
  // TODO: implement me, then make your tests pass.
  throw new Error("Not implemented: useToast");
}
