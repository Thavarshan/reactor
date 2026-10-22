# Glossary

Plain-English meanings of terms that come up again and again in the
exercises. Each exercise also explains these the first time it uses them, so
use this file to look things up rather than reading it front to back.

## JavaScript

**arrow function**: A short way to write a function: `(a, b) => a + b`. Used
everywhere in React, especially for event handlers.

**destructuring**: Pulling values out of an object or array into variables:
`const { name, age } = user` or `const [first, second] = list`.

**spread (`...`)**: Copies the items of an array or the properties of an
object into a new one: `[...list, newItem]` or `{ ...user, name: "Ada" }`.

**immutable update**: Making a *new* object or array with the change, instead
of changing (mutating) the original. React relies on this to notice that
something changed.

**mutate**: To change an object or array in place, e.g. `list.push(x)` or
`user.name = "Ada"`. Avoid this with React state.

**reference equality**: `a === b` for objects is only true when they are the
*very same object*, not just equal-looking ones. `{} === {}` is false. React
compares state and props this way.

**closure**: A function that remembers the variables around it from where it
was created, even after that code has finished running.

**promise**: A placeholder for a value that will arrive later, such as the
result of a network request. `await` waits for it.

**`async` / `await`**: A way to write code that waits for promises as if it
were step-by-step code.

**debounce / throttle**: *Debounce* means "wait until things go quiet, then
run once", as with search-as-you-type. *Throttle* means "run at most once
every N milliseconds".

## React basics

**component**: A function that returns what should appear on screen (JSX).
Its name starts with a capital letter: `function Greeting() { ... }`.

**JSX**: The HTML-like syntax inside JavaScript: `<h1>Hello</h1>`. Curly
braces drop in JavaScript values: `<h1>Hello, {name}</h1>`.

**props**: The inputs a component receives from its parent, like function
arguments: `<Greeting name="Ada" />` gives `Greeting` a prop `name`.

**children**: A special prop holding whatever is written between a
component's opening and closing tags: `<Card>this is children</Card>`.

**render / re-render**: React calling your component to find out what to
show. It *re-renders* when its state changes or its parent re-renders.

**state**: A value React remembers between renders (`useState`). Changing it
with its setter makes React re-render.

**derived value**: Something you can work out from state or props on every
render, such as a total or a filtered list. Don't store it as separate state.

**lifting state up**: Moving state into the closest common parent, so two
components can share it. The parent passes it down as props.

**controlled input**: An input whose value comes from React state
(`value={text}` plus `onChange`), so React is always the "source of truth".

**key**: A stable, unique `key` prop on each item in a list, so React can
tell items apart when the list changes. Use an ID, not the array index.

**hook**: A function starting with `use` (`useState`, `useEffect`, your own
`useToggle`...). Only call hooks at the top level of a component or another
hook, never inside `if` or loops.

**custom hook**: Your own function starting with `use` that bundles up
hooks and logic so components can share it.

**side effect / effect**: Anything a component does besides returning JSX,
such as setting a timer, fetching data or changing `document.title`.
`useEffect` runs these after rendering.

**cleanup function**: The function you return from `useEffect`. React calls
it before the effect runs again and when the component disappears, so you
can stop timers and remove listeners.

**dependency array**: The `[a, b]` at the end of `useEffect`, `useMemo` and
`useCallback`. React reruns or recomputes only when one of these changes.

**ref**: A box (`useRef`) that holds a value without causing re-renders.
It's often used to hold a DOM element so you can call `.focus()` on it.

**mount / unmount**: A component *mounts* when it first appears on screen
and *unmounts* when it's removed.

**StrictMode**: A development-only helper that deliberately runs some things
twice, such as effects, to expose missing cleanup. It doesn't happen in
production.

**reducer**: A pure function `(state, action) => newState` that describes
every way state can change. Used with `useReducer`.

**context**: A way to pass a value deep down the component tree without
threading it through every level as props (`createContext`, `useContext`).

**provider**: The component that supplies a context value to everything
inside it: `<ThemeProvider>...</ThemeProvider>`.

**memoization**: Remembering a result so it isn't recomputed. `React.memo`
skips re-rendering when props are the same, and `useMemo` and `useCallback`
remember values and functions between renders.

**portal**: Rendering something into a different place in the page, such as
straight into `document.body` for a modal or toast (`createPortal`).

**error boundary**: A component that catches errors thrown while rendering
its children and shows a fallback instead of a blank page.

## Concurrent React (React 19)

**transition**: A state update marked as "not urgent" (`useTransition`), so
React can keep the page responsive while it works on it.

**deferred value**: A copy of a value that's allowed to lag behind
(`useDeferredValue`), so slow parts of the page don't block typing.

**Suspense**: A component that shows a fallback (such as "Loading...") while
something inside it is still waiting for code or data.

**lazy loading**: Loading a component's code only when it's first needed
(`React.lazy`).

**action**: A function passed to a form's `action` prop. React tracks its
pending state for you (`useActionState`).

**optimistic update**: Showing the result of an action straight away, before
the server confirms it, and undoing it if the server says no
(`useOptimistic`).

## Accessibility

**accessibility (a11y)**: Making the page usable by everyone, including
people using a keyboard only or a screen reader.

**screen reader**: Software that reads the page aloud for blind and
low-vision users.

**role**: What an element *is* to assistive technology: button, link,
heading, dialog, tab... Native elements like `<button>` have one built in.

**accessible name**: What a screen reader announces for an element. It comes
from the element's text, its `<label>`, or `aria-label`.
`getByRole("button", { name: "Save" })` finds an element by role and name.

**ARIA attributes**: Extra `aria-*` attributes that describe state and
relationships, such as `aria-expanded`, `aria-checked` and
`aria-describedby`.

**landmark**: A major region of the page (banner, navigation, main,
contentinfo) that screen-reader users can jump between.

**focus**: Which element receives keyboard input. **Focus trap**: keeping
Tab inside a modal while it's open. **Roving tabindex**: only one item in a
group can be reached with Tab, and arrow keys move between the items.

## Testing

**test-first**: Writing the test before the code, watching it fail (red),
then making it pass (green).

**`render`**: Draws a component into a fake page (jsdom) so a test can
inspect it.

**`screen`**: The object you use to find things in the rendered page:
`screen.getByRole(...)`, `screen.getByText(...)`.

**`getBy` / `queryBy` / `findBy`**: `getBy` throws if the element is missing.
`queryBy` returns `null` instead (good for checking that something is NOT
there). `findBy` waits for the element to appear (use it with `await`).

**user-event**: Simulates a real user: `await user.click(...)`,
`await user.type(...)`, `await user.keyboard("{Escape}")`.

**`act`**: Tells React "process everything this causes before I check the
result". Testing Library does it for you most of the time. You add it
yourself when advancing fake timers.

**spy / mock function**: `vi.fn()` creates a fake function that records how
it was called: `expect(spy).toHaveBeenCalledWith(1)`.

**fake timers**: `vi.useFakeTimers()` replaces `setTimeout` and
`setInterval` with a clock you control (`vi.advanceTimersByTime(1000)`), so
tests never really wait.

**`renderHook`**: Runs a custom hook inside a tiny test component, so you can
test the hook directly. `result.current` is its latest return value.

**MSW (Mock Service Worker)**: A fake server for tests. It answers your
component's `fetch` calls with the responses you choose.

**jsdom**: A fake browser page that runs inside Node, so tests run without a
real browser. It doesn't do layout, so sizes and positions are all 0.

**`it.todo`**: A placeholder for a test you haven't written yet. It shows up
as "todo" and doesn't fail.
