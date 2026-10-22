# Level 10: Performance

React is fast by default, and most apps never need the tricks in this
level. But a long list, a slow chart or a big table can make typing feel
sluggish. This level teaches you to see **why** a component renders, to
**measure** it in a test, and to fix it with the smallest change that
works.

## Rendering and re-rendering

To **render** is to have React call your component function to find out
what it should show. A **re-render** is any later call. A component
re-renders when:

1. its own state changes, or
2. its parent re-renders (even if the props it gets are the same).

Rule 2 is the one that surprises people. When `App` re-renders, every
component inside it re-renders too, all the way down.

A re-render isn't always bad. React compares the result with the last
one and only touches the real page where something changed. It only
becomes a problem when a component is slow to render, or there are
thousands of them.

## Measuring renders in a test

You can't see a re-render on screen, so these exercises give the
component a **spy prop** that it calls every time it renders:

```tsx
function Row({ name, onRender }: { name: string; onRender?: () => void }) {
  onRender?.(); // runs on every render: a measuring tool, nothing more
  return <li>{name}</li>;
}

const spy = vi.fn();
render(<Row name="Ada" onRender={spy} />);
expect(spy).toHaveBeenCalledTimes(1);
```

React also has a built-in `<Profiler>`. It calls `onRender` every time
anything inside it renders and commits (puts changes on the page):

```tsx
<Profiler id="list" onRender={(id, phase) => console.log(id, phase)}>
  <List />
</Profiler>
```

The Profiler measures a whole subtree. A spy prop measures one
component, which is why these exercises use spies.

**About StrictMode:** in development, `<StrictMode>` renders every
component twice on purpose, to help you find bugs. That doubles every
count. The tests in this level don't use StrictMode, so the counts are
exact. If you try the components in the playground with StrictMode on,
expect double numbers.

## The tools

**Fix the structure first.** Often the cheapest fix is to move state
down into the component that uses it ("colocation"), or to pass a slow
part in as `children` so a wrapper's state can't re-render it.

**`React.memo`** wraps a component so it skips re-rendering when every
prop is the same as last time (compared with `Object.is`):

```tsx
const Row = memo(function Row({ name }: { name: string }) {
  return <li>{name}</li>;
});
```

**`useMemo`** remembers the result of a slow calculation until one of its
inputs changes:

```tsx
const sorted = useMemo(() => [...people].sort(byName), [people]);
```

**`useCallback`** remembers a function, so a memoized child gets the same
function every time instead of a new one:

```tsx
const handleRemove = useCallback((id: string) => {
  setPeople((current) => current.filter((p) => p.id !== id));
}, []);
```

**Keys** tell React which list item is which between renders. Stable ids
keep each item's state with the item. Index keys mix them up when the
list changes order.

**Windowing** renders only the rows you can see, so a list of 10,000
items costs as little as a list of 10.

## Exercises

1. `ex01_memo_list_item`: `React.memo`, so unchanged rows don't re-render.
2. `ex02_use_memo`: an expensive filtered list, recomputed only when its
   inputs change.
3. `ex03_use_callback`: stable handlers, so memoized rows skip
   re-rendering.
4. `ex04_key_bugs`: prove that index keys lose typed notes, then fix it
   with stable ids.
5. `ex05_virtualized_list`: render only the visible rows of a long list.
6. `ex06_state_colocation`: move state down, and pass children, so a slow
   report never re-renders.
