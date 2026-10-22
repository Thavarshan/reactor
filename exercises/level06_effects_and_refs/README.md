# Level 06: Effects and Refs

So far your components have only done one thing: turn props and state into
JSX. Real apps also need to reach OUTSIDE the component. They change the
browser tab's title, start timers, listen to the window, and move the
keyboard focus. This level teaches the two tools React gives you for that:
**effects** and **refs**.

## Side effects and `useEffect`

Anything a component does besides returning JSX is a **side effect**.
React may call your component many times (every **re-render**), so side
effects don't belong in the component body. Put them in `useEffect`, and
React runs them after the screen has updated:

```tsx
useEffect(() => {
  console.log("the page now shows", count);
}, [count]);
```

The array at the end is the **dependency array**. It lists the values the
effect uses. React runs the effect again only when one of them changed.
An empty array, `[]`, means "only once, when the component appears".

## Cleaning up

Many effects start something that has to be stopped later: a timer, an
event listener, a subscription. Return a **cleanup function** from the
effect, and React calls it before the effect runs again and when the
component is removed from the page (**unmounted**):

```tsx
useEffect(() => {
  const id = setInterval(() => console.log("tick"), 1000);
  return () => clearInterval(id);
}, []);
```

A missing cleanup is one of the most common React bugs. The timer keeps
ticking after the component is gone, or a listener gets added twice.

## StrictMode runs your effects twice

In development, React's `<StrictMode>` (the playground in this repo uses
it) runs every effect twice when a component first appears: **effect,
cleanup, effect**. That's on purpose. If your cleanup really undoes the
effect, running it twice changes nothing. If it doesn't, you'll see the
bug right away: a stopwatch at double speed, or two listeners instead of
one. Several tests in this level render inside `<StrictMode>` to prove
your cleanup works:

```tsx
render(
  <StrictMode>
    <Stopwatch />
  </StrictMode>,
);
```

## Refs: a box React doesn't watch

`useRef` gives you a box with a `.current` property that survives
re-renders. Changing it does NOT re-render the component. Refs have two
jobs:

1. Holding a real DOM element, so you can call things like `.focus()`:

   ```tsx
   const inputRef = useRef<HTMLInputElement>(null);
   // ...
   <input ref={inputRef} />
   // later, in an effect or an event handler:
   inputRef.current?.focus();
   ```

2. Remembering a value that the screen doesn't depend on, like "the last
   query I searched for" or "should I move focus after this render?".

## Testing effects

Effects are about time and the outside world, which makes them the
trickiest things to test so far. Each exercise explains its testing tricks
in the HINTS, but here's the toolbox:

- **`rerender` and `unmount`.** `render` returns both. Use them to change
  props and to check that your cleanup ran.
- **Fake timers.** `vi.useFakeTimers()` swaps `setTimeout` and
  `setInterval` for a fake clock that only moves when the test says so.
  Move it inside `act(...)`, so React finishes re-rendering:

  ```tsx
  act(() => {
    vi.advanceTimersByTime(1000);
  });
  ```

  Always call `vi.useRealTimers()` in `afterEach`.
- **`fireEvent` with fake timers.** user-event waits on real timers
  internally, so with plain fake timers it hangs. In the timer exercises,
  use `fireEvent.click` and `fireEvent.change`. They fire one event
  instantly and keep the clock exact.
- **Spies.** `vi.spyOn(window, "removeEventListener")` records every call,
  so you can prove a listener was removed. Undo spies with
  `vi.restoreAllMocks()`.
- **Focus.** `expect(element).toHaveFocus()` checks where the keyboard is.

## Exercises

1. `ex01_document_title`: set `document.title` in an effect and put the
   old one back on unmount.
2. `ex02_stopwatch`: start, stop and reset a timer with `setInterval` and
   cleanup. Tested with fake timers.
3. `ex03_inline_edit`: refs and focus. "Edit" turns text into a focused
   input, and Enter or Escape sends focus back.
4. `ex04_dropdown_click_outside`: listen on `document` to close a list on
   an outside click or Escape.
5. `ex05_window_size`: subscribe to the window's "resize" event, and prove
   you unsubscribe with a spy.
6. `ex06_debounced_search`: call `onSearch` only after typing stops, using
   a timer and a ref. Tested with fake timers.
