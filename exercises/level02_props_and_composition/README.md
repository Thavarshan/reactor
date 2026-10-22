# Level 02: Props and Composition

In level 01 each component drew one fixed thing. Real apps are built from
small, reusable pieces: one Button used on every page, one Card that can
hold anything. This level is about making components reusable. You'll pass
data in with props, fill holes in a component with other components, and
make sure every piece can be found and used by everyone, including people
who use a screen reader or only a keyboard.

## Props are a component's inputs

A component is a function, and its *props* are its arguments. React passes
them all in one object, which you usually unpack right in the signature.
You can give a missing prop a default value there too:

```tsx
type BadgeProps = { label: string; tone?: "info" | "warning" };

function Badge({ label, tone = "info" }: BadgeProps) {
  return <span className={`badge badge-${tone}`}>{label}</span>;
}

<Badge label="New" />;               // tone is "info"
<Badge label="Late" tone="warning" />;
```

A component never changes its own props. They belong to the parent.

## Passing the rest along

Sometimes a component cares about a few props and should hand everything
else to the HTML element underneath. The *rest* syntax collects the
leftovers, and the *spread* syntax passes them on:

```tsx
function TextField({ label, ...rest }: { label: string } & ComponentProps<"input">) {
  return (
    <label>
      {label} <input {...rest} />
    </label>
  );
}

<TextField label="Email" type="email" required />; // type and required reach <input>
```

## Composition: components inside components

Whatever you put between a component's tags arrives as the `children`
prop. Any other prop can hold JSX too. Props used that way are often called
*slots*:

```tsx
function Panel({ heading, children }: { heading: ReactNode; children: ReactNode }) {
  return (
    <section>
      <h2>{heading}</h2>
      {children}
    </section>
  );
}

<Panel heading={<>Inbox <small>(3)</small></>}>
  <p>No new messages.</p>
</Panel>;
```

The type `ReactNode` means "anything React can render": text, numbers,
elements, `null`.

A prop can even hold a *function* that returns JSX. That's a *render prop*:
the component decides when and where to draw, and the parent decides what.

## Names for everyone

Tests in this repo find elements the way a screen reader does: by *role*
(what kind of thing it is) and *accessible name* (what it's called). That's
no accident. If a test can't find your button, a blind user can't either.

```tsx
<button>Save</button>                       // role "button", name "Save"
<button aria-label="Close">✕</button>       // name "Close", not "✕"
<span aria-hidden="true">★</span>           // skipped by screen readers
<nav aria-label="Chapters">...</nav>        // role "navigation", name "Chapters"
```

Elements like `<header>`, `<nav>`, `<main>` and `<footer>` are *landmarks*
that screen reader users jump between, a bit like glancing at a page's
layout.

## Testing tips for this level

- `toHaveClass("btn", "btn-primary")` checks classes in any order.
- `toHaveAttribute("aria-pressed", "true")` and
  `not.toHaveAttribute("aria-pressed")` check attributes.
- `rerender(<Avatar ... />)` (returned by `render`) gives a component new
  props, and `fireEvent.error(img)` pretends an image failed to load.
- `within(card).getByRole(...)` searches inside one element only.
- `await user.tab()` presses Tab, and `toHaveFocus()` checks where focus
  went.

## Exercises

1. `ex01_button`: a reusable Button with variants and sizes, that passes
   every other prop through and is never an accidental submit button.
2. `ex02_avatar`: a photo with alt text that falls back to initials when
   there's no photo or it fails to load.
3. `ex03_card`: a card with `children` plus optional title and footer
   slots, named after its title.
4. `ex04_icon_button`: an icon-only button that always has a name in
   words, and can work as a toggle with `aria-pressed`.
5. `ex05_list_with_render_prop`: a generic List that takes a `renderItem`
   function and shows a message when it's empty.
6. `ex06_page_layout`: a page with header, sidebar, main and footer
   landmarks, plus a "Skip to main content" link.
