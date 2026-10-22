# Level 13: Small Apps

You have all the pieces now: components, props, state, effects, refs,
forms, fetching, custom hooks, context and accessible patterns. This
level puts them together. Each exercise is a small app rather than a
single component, so it's less about one new idea and more about making
good decisions.

## Plan before you type

Before writing code for an app, answer three questions on paper:

1. **What is the state?** Write down the smallest set of values that
   describes everything on screen. A kanban board is "a list of cards,
   each with a column". It is NOT "three lists".
2. **What can be worked out from it?** Filtered lists, counts and "is
   this button disabled" are calculations during render, not extra
   state:

   ```tsx
   const todo = cards.filter((card) => card.column === "todo");
   ```

3. **What talks to the outside world?** Fetching, localStorage, timers
   and observers belong in event handlers or effects, with cleanup.

## Split the screen into small components

An app is easier to read as small pieces with clear props:

```tsx
function NoteItem({ note, onEdit, onDelete }: NoteItemProps) {
  return (
    <li>
      <h3>{note.title}</h3>
      <button aria-label={`Edit ${note.title}`} onClick={() => onEdit(note.id)}>Edit</button>
      <button aria-label={`Delete ${note.title}`} onClick={() => onDelete(note.id)}>Delete</button>
    </li>
  );
}
```

The state usually lives in the top component, and the pieces get data
and callbacks as props. You can keep the pieces in the same file as the
exercise.

## Keep it accessible

Every app here is tested the way a user would use it: by roles,
labels and names. That's not just for tests. If a screen reader can't
find your "Move right" button, neither can `getByRole`. Prefer real
buttons, labels, headings and landmarks, and move focus on purpose
when the screen changes.

## Testing a whole app

App tests tell a short story: do something, check the screen, do the
next thing.

```tsx
await user.type(screen.getByLabelText("New card"), "Write tests{Enter}");
const todo = screen.getByRole("region", { name: "To do" });
expect(within(todo).getByText("Write tests")).toBeInTheDocument();
```

Useful tools for this level:

- `within(element)` searches inside one part of the page.
- MSW handlers fake the server (`/api/...` URLs).
- `vi.stubGlobal` replaces a browser feature the test environment
  lacks, such as IntersectionObserver.
- `<MemoryRouter initialEntries={["/products/2"]}>` starts a router at
  any URL.
- `localStorage.clear()` in `beforeEach` keeps tests independent.

## Exercises

1. `ex01_kanban_board`: columns of cards, adding, moving with buttons
   and deleting
2. `ex02_multi_step_form`: a sign-up form in three steps, with per-step
   validation, a review step and focus management
3. `ex03_infinite_feed`: pages of posts that load when you reach the
   bottom (IntersectionObserver), with a "Load more" fallback
4. `ex04_router_app`: a tiny shop with react-router: list, detail, 404
   and active links
5. `ex05_notes_app`: create, edit, delete and search notes, saved in
   localStorage
