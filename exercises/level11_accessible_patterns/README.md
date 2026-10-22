# Level 11: Accessible UI Patterns

Some people use the web with a keyboard only. Some hear it through a
screen reader. Some use voice control or a switch. A widget that only
works with a mouse shuts all of them out.

In this level you build the classic widgets (a dialog, tabs, an
autocomplete box, toasts, a menu) so that everyone can use them. You'll
follow the **WAI-ARIA Authoring Practices Guide** (APG), the standard
"recipe book" that says how each widget should look to a screen reader
and which keys it should answer to. Search for "ARIA APG" plus the
widget name to read the recipe for each exercise.

## Roles, names and states

Assistive technology (like a screen reader) sees your page as a tree of
elements, each with:

- a **role**: what it is (button, dialog, tab, menu, option...)
- an **accessible name**: what it's called ("Close", "Account settings")
- **states**: how it is right now (expanded, selected, pressed...)

Native HTML gives you most of this for free. A `<button>` already has the
role "button" and is named by its text. For custom widgets you add ARIA
attributes:

```tsx
<button aria-expanded={open} aria-controls="menu-1">Actions</button>
<ul role="menu" id="menu-1">...</ul>
```

The first rule of ARIA: use a native element when one exists. ARIA
changes what a screen reader announces, but it adds no behaviour. A
`<div role="button">` still needs you to handle Enter, Space and focus.

Tests in this repo find elements the same way a screen reader does, by
role and name: `screen.getByRole("tab", { name: "Billing" })`. So an
accessible component is also an easy one to test.

## Focus is the keyboard user's cursor

**Focus** is the element that gets the keys you press. Managing it well
is most of the work in this level:

- **Moving focus from code:** keep a ref to the element and call
  `ref.current.focus()`.
- **Roving tabindex:** in a group (tabs, menu items), only one element
  has `tabIndex={0}`. The rest have `tabIndex={-1}`, which code can
  focus but the Tab key skips. Arrow keys move between them.
- **aria-activedescendant:** when focus must stay in a text box (an
  autocomplete), the box _points at_ the highlighted option instead.
- **Returning focus:** when a popup closes, put focus back on the button
  that opened it. Otherwise focus falls to `<body>` and the user is lost.

```tsx
const buttonRef = useRef<HTMLButtonElement>(null);
function close() {
  setOpen(false);
  buttonRef.current?.focus(); // back to where the user was
}
```

## Announcing changes

A screen reader reads what has focus. To announce something that
appears elsewhere, like a toast, put it in a **live region**:
`role="status"` waits politely, `role="alert"` interrupts. The region
should exist _before_ the message is added, or it may not be heard.

## Testing keyboard behaviour

user-event presses real-looking keys:

```tsx
const user = userEvent.setup();
await user.keyboard('{ArrowDown}{Enter}');
await user.tab(); // Tab
await user.tab({ shift: true }); // Shift+Tab
expect(screen.getByRole('menuitem', { name: 'Edit' })).toHaveFocus();
```

A note on jsdom, the fake browser your tests run in: focus, keyboard
events and ARIA attributes all work, but it does no layout and doesn't
support `<dialog>`'s `showModal()`. That's why the dialog in this level
is a `<div role="dialog">`.

## Exercises

1. `ex01_modal_dialog`: `role="dialog"` with `aria-modal`. Focus moves
   in, Tab is trapped inside, and Escape closes it and returns focus.
2. `ex02_tabs_keyboard`: ARIA tabs with arrow keys, Home and End, and a
   roving tabindex.
3. `ex03_combobox`: an autocomplete with a listbox, arrow keys, Enter to
   pick, and `aria-activedescendant`.
4. `ex04_toast_notifications`: a provider and a `useToast` hook,
   `createPortal`, a `role="status"` live region, auto-dismiss timers and
   a close button.
5. `ex05_error_boundary`: a class component that catches render errors
   and shows a `role="alert"` fallback with "Try again" and `resetKeys`.
6. `ex06_menu_button`: a menu with arrow-key navigation. Escape closes it
   and returns focus to the button.
