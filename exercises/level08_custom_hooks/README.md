# Level 08: Custom Hooks

So far your components have called React's built-in hooks: `useState`,
`useEffect`, `useRef`. In this level you write your OWN hooks, and you
learn to test them on their own, without building a component around
them.

## What is a custom hook?

A hook is a function whose name starts with `use`. A custom hook is a
hook you write yourself. Inside, it calls other hooks. Outside, it
returns whatever is useful: a value, some functions, or an object with
both.

```tsx
function useCounter(start: number) {
  const [count, setCount] = useState(start);
  const increment = () => setCount((c) => c + 1);
  return { count, increment };
}

function Clicker() {
  const { count, increment } = useCounter(0);
  return <button onClick={increment}>Clicked {count} times</button>;
}
```

Two things to remember:

- **A custom hook shares logic, not state.** If two components both call
  `useCounter(0)`, each one gets its own separate `count`.
- **The rules of hooks still apply.** Only call hooks at the top level of
  a component or another hook. Never call them inside an `if`, a loop or
  a callback.

Why bother? Because the same logic shows up again and again: "remember a
value in localStorage", "wait until the user stops typing", "fetch this
URL". Write it once as a hook, test it once, and use it everywhere.

## Testing a hook with `renderHook`

A hook only works while React is rendering a component. If you call
`useCounter(0)` directly in a test, React throws an error. So
`@testing-library/react` gives you `renderHook`. It builds a tiny
invisible component that calls your hook, and hands you what the hook
returned.

```tsx
import { act, renderHook } from "@testing-library/react";

const { result } = renderHook(() => useCounter(5));
expect(result.current.count).toBe(5);
```

There are four ideas to learn here.

### 1. `result.current`

`result.current` is whatever your hook returned on its LATEST render.
After every change, React renders again and `result.current` points to
the new return value.

So always read `result.current` again after a change. Don't copy it into
a variable first:

```tsx
const { count } = result.current; // a snapshot: it never updates
act(() => result.current.increment());
expect(count).toBe(6); // FAILS: count is still 5
expect(result.current.count).toBe(6); // passes
```

### 2. `act`

`act` wraps any code that changes state. When the code inside it is
done, React finishes all the updates and re-renders before `act`
returns. That way `result.current` is fresh on the very next line.

```tsx
act(() => {
  result.current.increment();
});
expect(result.current.count).toBe(6);
```

If you change state without `act`, React prints a warning that says
"not wrapped in act(...)" and your test may see an old value. You also
need `act` around fake timers when a timer changes state:

```tsx
act(() => {
  vi.advanceTimersByTime(1000);
});
```

You don't need `act` for `rerender` or `unmount`. They already use it
for you.

### 3. `rerender` and `initialProps`

A real component re-renders when its parent passes new props. To copy
that in a test, give `renderHook` some `initialProps`. Your callback
receives them. Then `rerender(newProps)` calls your hook again with the
new values:

```tsx
const { result, rerender } = renderHook(
  ({ start }) => useCounter(start),
  { initialProps: { start: 5 } },
);

rerender({ start: 99 });
// useState only uses its starting value on the first render,
// so count is still 5.
expect(result.current.count).toBe(5);
```

### 4. `unmount`

`unmount()` removes the invisible component, just like a parent that
stops rendering it. Use it to check that your hook cleans up after
itself: timers cleared, requests cancelled.

```tsx
const { unmount } = renderHook(() => useSomething());
unmount();
expect(vi.getTimerCount()).toBe(0); // no fake timers left waiting
```

## Waiting for async results

Some hooks finish their work later, for example after a fetch. Use
`waitFor`. It runs your check again and again until it passes (or
gives up after one second):

```tsx
const { result } = renderHook(() => useUser(1));
await waitFor(() => expect(result.current.loading).toBe(false));
expect(result.current.user?.name).toBe("Ada");
```

## The exercises

1. `ex01_use_toggle`: a true/false value with toggle, on and off. Start
   here: it walks you through `renderHook`, `act`, `result.current` and
   `rerender` step by step.
2. `ex02_use_local_storage`: like `useState`, but the value survives a
   page reload. Handles broken saved data and functional updates.
3. `ex03_use_debounced_value`: a value that only catches up once it
   stops changing. Tested with fake timers.
4. `ex04_use_previous`: remembers what a value was before its last
   change.
5. `ex05_use_interval`: `setInterval` done right. A `null` delay pauses
   it, and it always calls your newest callback.
6. `ex06_use_fetch`: a reusable data-fetching hook with loading and
   error states, request cancelling and `refetch`.
