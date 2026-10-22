# Level 05: Sharing State

So far each component has kept its own state. Real screens are made of many
components that need the SAME data: a search box and the table it filters, a
product list and a cart, a list and a details panel. This level is about
deciding where that shared state lives, and how it reaches every component
that needs it.

## Lifting state up

Two sibling components can't see each other's state. When both need it,
move the state up into their closest common parent. The parent passes the
value down as a prop, and passes a function down so a child can ask for a
change:

```tsx
function Page() {
  const [query, setQuery] = useState('');
  return (
    <>
      <SearchBox query={query} onQueryChange={setQuery} />
      <Results query={query} />
    </>
  );
}

function SearchBox({ query, onQueryChange }: SearchBoxProps) {
  return (
    <input value={query} onChange={(e) => onQueryChange(e.target.value)} />
  );
}
```

Data flows **down** as props. Changes flow **up** through callbacks.
`SearchBox` and `Results` never talk to each other directly. They both talk
to `Page`.

## Where should a piece of state live?

Ask two questions:

1. Which components use it?
2. What is their closest common parent?

That parent owns the state. If no parent fits well, add a new one just to
hold it.

## Controlled and uncontrolled components

`SearchBox` above is **controlled**: it has no state of its own, and shows
whatever its parent passes as `value`. An **uncontrolled** component keeps
its own state, and the parent can only set where it starts, usually with a
`defaultValue` prop. Good reusable components often support both.

## One source of truth

Every piece of data should live in exactly one place. If you can work
something out from existing state, work it out while rendering instead of
storing it again:

```tsx
const [items, setItems] = useState<CartItem[]>([]);
const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
```

The same goes for selections: store the selected item's **id**, not a copy
of the item. Then an edit to the item can't leave a stale copy behind:

```tsx
const [selectedId, setSelectedId] = useState<number | null>(null);
const selected = items.find((item) => item.id === selectedId);
```

## Updating arrays of objects

State must never be changed in place. Build a new array instead:

```tsx
setTodos([...todos, newTodo]); // add
setTodos(todos.filter((t) => t.id !== id)); // remove
setTodos(todos.map((t) => (t.id === id ? { ...t, done: !t.done } : t))); // update
```

## Testing components that share state

Test the parent the way a user would use it: type in one place and check
that another place changed. When a child is controlled, you can also test it
on its own by passing a fixed `value` and a `vi.fn()` spy as its `onChange`.
`within(region)` keeps a query inside one part of the screen, such as the
cart or a details panel.

## Exercises

1. `ex01_temperature_converter`: Celsius and Fahrenheit boxes kept in sync
   by their parent, with bad input handled.
2. `ex02_filterable_product_table`: a search box and an "in stock" checkbox
   that filter a grouped product table.
3. `ex03_shopping_cart`: a product list and a cart sharing one state, with
   quantities and a total.
4. `ex04_controlled_tabs`: tabs that work both controlled (`value` +
   `onChange`) and uncontrolled (`defaultValue`).
5. `ex05_todo_app`: add, tick, delete and filter todos, with "N items left".
6. `ex06_selection_list`: select a contact by id and edit it, with changes
   showing up everywhere at once.
