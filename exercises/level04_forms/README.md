# Level 04: Forms

Almost every app asks the user for something: a name, an email, a search
term, a choice from a list. In this level you'll build forms the React way.

## Controlled inputs

A normal `<input>` keeps its text inside the browser. In React you usually
make it **controlled** instead: the text lives in state, and the input just
shows it.

```tsx
const [city, setCity] = useState('');

<input value={city} onChange={(e) => setCity(e.target.value)} />;
```

- `value` says what the input shows. It always comes from state.
- `onChange` runs on every keystroke. `e.target.value` is the new text.

Now the rest of your component can use `city` while the user types. To
change the text from code (to empty it, say), you just set the state.

Checkboxes work the same way, but with `checked` and `e.target.checked`.
A `<select>` uses `value` and `onChange` just like a text input.

## Labels

Every input needs a label, both for people and for tests. Link them with
`htmlFor` and `id`, or put the input inside the label:

```tsx
<label htmlFor="city">City</label>
<input id="city" />

<label>
  <input type="checkbox" /> Remember me
</label>
```

The label's text becomes the input's **accessible name**, the text a
screen reader reads out. Tests find inputs by it:
`screen.getByRole("textbox", { name: "City" })`.

## Submitting

Put the inputs and a submit button inside a `<form>`. Clicking the button,
or pressing Enter in a field, fires the form's `onSubmit` event. Stop the
browser from reloading the page, then use the values from state:

```tsx
function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
  e.preventDefault();
  onSave({ city });
}

<form onSubmit={handleSubmit}>
  ...
  <button type="submit">Save</button>
</form>;
```

Buttons inside a form submit it by default. Give every other button
`type="button"`.

## Showing errors accessibly

When a field is wrong, connect the message to the input so screen readers
read it too:

```tsx
<input aria-invalid="true" aria-describedby="age-error" />
<p id="age-error">Age must be a number</p>
```

## Derive, don't duplicate

If you can work a value out from state, don't store it as state too. A
filtered list, a count or an "is everything ticked?" flag can all be
calculated while rendering:

```tsx
const [query, setQuery] = useState('');
const matches = items.filter((item) => item.includes(query)); // not state
```

Two pieces of state that must always agree will drift apart one day. One
piece of state plus a calculation can't.

## Testing forms

- `await user.type(input, "Ada")` types one letter at a time.
- `await user.clear(input)` empties a field.
- `await user.selectOptions(select, "Japan")` picks an option.
- `expect(input).toHaveValue("Ada")` and `expect(box).toBeChecked()` check
  what the user sees.
- `expect(input).toHaveAccessibleDescription("...")` checks an error
  message linked with `aria-describedby`.

## Exercises

1. `ex01_controlled_input`: a name box mirrored live into a greeting, with
   a Clear button.
2. `ex02_signup_form`: email, password and confirm fields, checked on
   submit, with accessible error messages.
3. `ex03_checkbox_group`: a group of checkboxes with a "Select all" that
   can be half ticked.
4. `ex04_search_filter`: filter a list as you type, with a result count
   and a "No results" message.
5. `ex05_dependent_selects`: country and city drop-downs, where the city
   resets when the country changes.
6. `ex06_dynamic_fields`: add and remove email fields, then send the list.
