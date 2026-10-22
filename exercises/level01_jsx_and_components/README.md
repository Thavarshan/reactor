# Level 01: JSX and Components

This is where React starts. You'll write components that take some data and
show it on the screen. There's no clicking or typing yet (that's level 03):
every component in this level is a plain function from props to JSX. That
makes them the easiest kind to build and to test.

## Components and JSX

A *component* is a function with a capital letter that returns what should
appear on screen. The HTML-like syntax it returns is called *JSX*:

```tsx
function Welcome() {
  return <h1>Welcome to the shop</h1>;
}
```

You use it like a tag: `<Welcome />`. Curly braces drop a JavaScript value
into JSX:

```tsx
const user = "Ada";
<p>Signed in as {user}</p>; // Signed in as Ada
```

A few attribute names differ from HTML: `class` becomes `className` and
`colspan` becomes `colSpan`. Tags with nothing inside must close themselves,
like `<img src={url} alt="A red bike" />`.

## Props

*Props* are a component's inputs, like a function's arguments. The parent
passes them as attributes. The component receives them as one object and
usually destructures them, with defaults for the optional ones:

```tsx
type PriceProps = { amount: number; currency?: string };

function Price({ amount, currency = "USD" }: PriceProps) {
  return <p>{amount} {currency}</p>;
}

<Price amount={20} />; // 20 USD
```

## Showing things only sometimes

You can't put an `if` statement inside JSX, but you can use expressions:

```tsx
{isAdmin ? <AdminMenu /> : <UserMenu />}   // one or the other
{hasError && <p>Something went wrong</p>}  // this, or nothing
```

React shows nothing for `false`, `null` and `undefined`, but it does show
the number `0`. So `{count && <Badge />}` prints a stray "0" when count is
0. Write `{count > 0 && <Badge />}` instead. Exercise 3 is all about this.

## Lists and keys

To show an array, `map` each item to an element. Each one needs a `key` that
is unique and stable, like a database id:

```tsx
<ul>
  {songs.map((song) => (
    <li key={song.id}>{song.title}</li>
  ))}
</ul>
```

React uses keys to keep track of which item is which when the list changes.

## Testing what's on the screen

Tests render a component into a fake page, then look for elements the way a
user or a screen reader would: by *role* (what kind of thing it is) and
*accessible name* (what a screen reader reads out for it).

```tsx
import { render, screen } from "@testing-library/react";

render(<Welcome />);
expect(screen.getByRole("heading", { name: "Welcome to the shop" })).toBeInTheDocument();
```

Some common roles: `<h1>` to `<h6>` are "heading", `<button>` is "button",
`<img>` is "img" (named by its `alt` text), `<ul>` is "list" and `<li>` is
"listitem", and `<table>` is "table". Each exercise's "WHAT YOUR TESTS CAN
FIND" section lists exactly what your component must render, so your tests
and your component agree.

## Exercises

1. **ex01_greeting**: your first component. A heading that says hello by
   name, or to a stranger.
2. **ex02_product_card**: a product with an image, alt text, a price
   formatted as money, and a "Sold out" badge.
3. **ex03_unread_badge**: conditional rendering, and the `{count && ...}`
   trap that renders "0".
4. **ex04_todo_list_view**: render a list with keys, mark finished items,
   and show an empty state.
5. **ex05_user_table**: a proper table with a caption, column headers, row
   headers, links and an empty state.
6. **ex06_status_badge**: map a status to a label and a className, with a
   safe fallback for anything unknown.
