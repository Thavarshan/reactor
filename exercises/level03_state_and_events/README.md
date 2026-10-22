# Level 03: State and Events

Until now your components showed whatever their props said, and nothing
more. This level makes them *interactive*: they remember things and change
when the user clicks, types or moves the mouse. The tool for that is
*state*, and the way users reach it is *events*.

## State: values React remembers

A normal variable inside a component is forgotten every time React draws
the component again (a *re-render*). *State* is a value React keeps for you
between renders. `useState` gives you the current value and a function to
change it:

```tsx
const [isOpen, setIsOpen] = useState(false);
//     ^ current value  ^ setter
```

Calling the setter does two things: it stores the new value, and it asks
React to re-render the component with it. Changing the variable directly
(`isOpen = true`) does neither, so the screen never updates.

The new value only arrives on the NEXT render. Inside the same click
handler, the old value is still in the variable:

```tsx
function handleClick() {
  setIsOpen(!isOpen);
  console.log(isOpen); // still the OLD value
}
```

So work out the new value once, keep it in a variable, and use that.

## Events: reacting to the user

React passes event handlers as props whose names start with `on`:

```tsx
<button onClick={() => setCount(count + 1)}>+</button>
<textarea value={text} onChange={(e) => setText(e.target.value)} />
<div onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} />
```

Pass a function, don't call one: `onClick={save}` or
`onClick={() => save(id)}`, never `onClick={save()}`.

## Keep state small, work the rest out

The most useful habit in this level: store the *smallest* thing that
describes the screen, and calculate everything else during render.

```tsx
const [text, setText] = useState("");
const left = 100 - text.length;   // derived, not stored
const isTooLong = left < 0;       // derived, not stored
```

Values you store twice can disagree. Values you derive can't. An accordion
needs "which section is open", not one boolean per section. A carousel
needs "which position", not a copy of the current image.

## Telling the parent

Many components keep their own state but let the parent know when it
changes, through a callback prop. Call it from the event handler, with the
new value:

```tsx
function handleClick() {
  const next = !checked;
  setChecked(next);
  onChange?.(next); // `?.` skips the call when no onChange was passed
}
```

## Testing tips for this level

- `const user = userEvent.setup()`, then `await user.click(...)`,
  `await user.type(...)`, `await user.hover(...)` and
  `await user.keyboard("{Enter}")`. Always `await` them.
- `vi.fn()` makes a spy. Check it with `toHaveBeenLastCalledWith(...)`,
  `toHaveBeenCalledTimes(...)` and `not.toHaveBeenCalled()`.
- Check what the user sees, not your state: `aria-checked`,
  `aria-expanded`, the text in a `role="status"` element, `toBeVisible()`.
- `rerender(<Component ... />)` gives a component new props while it keeps
  its state, just like a parent re-rendering in a real app.

## Exercises

1. `ex01_counter`: a number with "−" and "+" buttons that stays between
   `min` and `max`.
2. `ex02_toggle_switch`: an on/off switch with `role="switch"`,
   `aria-checked`, a label and an `onChange` callback.
3. `ex03_character_count`: a textarea with a "12 / 100" counter and a
   warning when fewer than 10 characters are left.
4. `ex04_accordion`: sections that open one at a time, with
   `aria-expanded` and `aria-controls`.
5. `ex05_star_rating`: five stars with a hover preview, click to rate, and
   click again to clear.
6. `ex06_image_carousel`: Previous and Next that wrap around, dot buttons,
   and "Image 2 of 5".
