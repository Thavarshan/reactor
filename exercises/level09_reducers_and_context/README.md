# Level 09: Reducers and Context

As an app grows, two problems show up:

1. **State logic spreads everywhere.** Adding, editing and deleting a
   todo each need their own careful `setTodos(...)` call, scattered across
   event handlers.
2. **Props travel too far.** The logged-in user is needed deep down the
   tree, so every component in between has to pass it along. This is
   called "prop drilling".

React has a tool for each: **reducers** for the first, **context** for
the second. In this level you use both, and then combine them.

## Reducers: all the state changes in one place

A reducer is a plain function. It takes the current state and an
**action** (an object describing what happened), and returns the next
state:

```ts
type CounterAction = { type: 'incremented' } | { type: 'reset' };

function counterReducer(count: number, action: CounterAction): number {
  switch (action.type) {
    case 'incremented':
      return count + 1;
    case 'reset':
      return 0;
  }
}
```

A reducer must be **pure**:

- It never changes (mutates) the state it gets. It returns a new object
  or array instead, with `...` spread, `map` and `filter`.
- It gives the same answer for the same input every time. No
  `Math.random()`, no `Date.now()`, no fetching.
- If nothing changes, it can return the very same state object. React
  then knows it can skip re-rendering.

Because a reducer is just a function, you can test it with no React at
all:

```ts
expect(counterReducer(4, { type: 'incremented' })).toBe(5);
```

In a component, `useReducer` connects a reducer to React. You get the
current state and a `dispatch` function. Calling `dispatch(action)`
runs your reducer and re-renders with the result:

```tsx
const [count, dispatch] = useReducer(counterReducer, 0);

<button onClick={() => dispatch({ type: 'incremented' })}>+</button>;
```

Event handlers now say WHAT happened ("incremented"). The reducer
decides HOW the state changes.

## Context: skip the middlemen

Context lets a component share a value with everything below it, at any
depth, without passing props through each level. It takes three steps:

```tsx
// 1. Create the context. null means "no provider above me".
const UserContext = createContext<string | null>(null);

// 2. Provide a value somewhere high up in the tree.
<UserContext value="Ada">
  <Page />
</UserContext>;

// 3. Read it anywhere below, however deep.
function Avatar() {
  const user = use(UserContext); // or useContext(UserContext)
  return <p>{user}</p>;
}
```

In React 19 you can render the context itself as the provider
(`<UserContext value=...>`). Older code writes `<UserContext.Provider>`,
which still works.

When the provided value changes, every component that reads the context
re-renders with the new value.

### The provider + hook pattern

Real apps wrap context in two small helpers:

- A **provider component** that owns the state and provides it:
  `<ThemeProvider>{children}</ThemeProvider>`.
- A **custom hook** that reads the context and throws a helpful error
  when there is no provider above:

```tsx
function useUser() {
  const user = use(UserContext);
  if (user === null) {
    throw new Error('useUser must be used inside a UserProvider');
  }
  return user;
}
```

Now a forgotten provider fails loudly with a clear message, instead of
quietly handing out `null`.

## Testing context

To test a component that needs a provider, render it inside one:

```tsx
render(
  <ThemeProvider>
    <ThemeToggle />
  </ThemeProvider>,
);
```

To test the hook on its own, give `renderHook` a `wrapper`. React renders
your hook inside it:

```tsx
const { result } = renderHook(() => useTheme(), { wrapper: ThemeProvider });
```

To check that a hook throws outside its provider, silence React's error
log first, then expect the throw:

```tsx
vi.spyOn(console, 'error').mockImplementation(() => {});
expect(() => renderHook(() => useTheme())).toThrow(
  'useTheme must be used inside a ThemeProvider',
);
```

## The exercises

1. `ex01_todo_reducer`: a pure `todoReducer`, tested on its own, plus a
   `TodoApp` that runs it with `useReducer`.
2. `ex02_theme_context`: `ThemeProvider`, a `useTheme` hook that throws
   outside its provider, and a theme toggle button.
3. `ex03_auth_context`: log in and log out through context, and a
   `RequireAuth` component that guards private content.
4. `ex04_cart_context`: a reducer AND a context together. A shopping
   cart shared by a product list, a cart summary and a badge.
5. `ex05_undo_redo`: a generic `useHistory` hook built on a
   past/present/future reducer, with Undo and Redo buttons.
