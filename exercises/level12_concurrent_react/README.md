# Level 12: Concurrent React

So far, every state update has meant "show this now". React 19 lets you
say more than that. Some updates are urgent (the letter you just typed),
and some can wait a moment (a big list of search results). Some data
isn't ready yet, and React can show something sensible while it loads.
This level is about those tools.

## Suspense: "I'm not ready yet"

A component can **suspend**: it tells React "I can't draw yet, I'm
waiting for something". The nearest `<Suspense>` boundary above it shows
a fallback instead:

```tsx
<Suspense fallback={<p>Loading...</p>}>
  <Comments />
</Suspense>
```

Two things can make a component suspend in this level:

- **A lazy component** whose code hasn't downloaded yet:

  ```tsx
  const Editor = lazy(() => import('./editor'));
  ```

- **`use(promise)`**, which reads the value of a Promise during render:

  ```tsx
  function Quote({ quotePromise }: { quotePromise: Promise<string> }) {
    const quote = use(quotePromise); // suspends until the Promise is done
    return <blockquote>{quote}</blockquote>;
  }
  ```

  The Promise must be the SAME one on every render, so you keep it in a
  cache. If it fails, `use` throws, and an **error boundary** shows an
  error screen.

## Transitions: "this update can wait"

`useTransition` marks a state update as not urgent:

```tsx
const [isPending, startTransition] = useTransition();

startTransition(() => {
  setTab('posts');
});
```

React prepares the new screen in the background and keeps the old one
visible. `isPending` is true meanwhile, so you can show a small hint
instead of a big loading spinner.

`useDeferredValue` is the same idea, seen from the value's side. It
gives you a copy of a value that may lag behind:

```tsx
const deferredQuery = useDeferredValue(query);
const isStale = query !== deferredQuery;
```

The input uses `query` and updates at once. The slow results use
`deferredQuery` and catch up when they can.

## Actions: forms that talk to a server

In React 19 a `<form>` can take a function as its `action`. React
calls it with the form's data. Three hooks build on that:

- `useActionState` keeps what the action returned last time (perfect for
  messages) and tells you whether it's still running.
- `useOptimistic` shows the expected result straight away, and rolls it
  back if the action fails.
- After an action finishes, React resets the form fields.

```tsx
const [state, formAction, isPending] = useActionState(saveName, {
  error: null,
});

<form action={formAction}>
  <input name="name" />
  <button disabled={isPending}>Save</button>
</form>;
```

## Testing concurrent features

These tools are about TIME, and tests have a twist here. React finishes
all rendering before `act()` (and every user-event action) returns. So a
render that is merely slow never looks "pending" in a test. What you CAN
see is a component that is WAITING for a Promise. That's why these
exercises use Promises that you resolve by hand in your tests.

Two habits will save you a lot of confusion:

- When something will suspend, render or click inside an awaited `act`:

  ```tsx
  await act(async () => {
    render(<UserCard userId={1} />);
  });
  await act(() => user.click(screen.getByRole('tab', { name: 'Posts' })));
  ```

  Without it, React can lose track of the waiting work, and the content
  never shows up.

- Resolve your Promises inside an awaited `act` too, then check the
  screen:

  ```tsx
  await act(async () => finish());
  ```

## Exercises

1. `ex01_use_transition_tabs`: tabs that keep the old panel on screen
   while a slow one gets ready (useTransition)
2. `ex02_use_deferred_value`: a search box that stays instant while the
   results lag behind (useDeferredValue)
3. `ex03_lazy_and_suspense`: tabs whose panels load their code only when
   first shown (lazy and Suspense)
4. `ex04_use_with_suspense`: a user card that reads data with `use`,
   with a cache, Suspense and an error boundary
5. `ex05_form_actions`: a newsletter form with validation and a pending
   button (useActionState)
6. `ex06_use_optimistic`: chat messages that appear at once and roll
   back on failure (useOptimistic)
