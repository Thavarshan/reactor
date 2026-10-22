/**
 * Exercise: Signup Form
 * Level:    04 - Forms
 * Topics:   form submit, preventDefault, validation, aria-describedby,
 *           aria-invalid
 *
 * ========================================================================
 * YOUR TASK
 * ========================================================================
 * Build a <SignupForm> with three fields. When the user submits, check
 * every field. Show an error message under each wrong field, or call
 * `onSubmit` when everything is fine.
 *
 *     Email             [ ada@example        ]
 *                       Enter a valid email address
 *     Password          [ ••••               ]
 *                       Password must be at least 8 characters
 *     Confirm password  [                    ]
 *                       Please confirm your password
 *
 *     [ Sign up ]
 *
 *     <SignupForm onSubmit={(values) => console.log(values)} />
 *
 * ========================================================================
 * BACKGROUND: SUBMITTING A FORM
 * ========================================================================
 * Put your inputs and a submit button inside a <form>. Clicking the
 * button (or pressing Enter in a field) fires the form's `onSubmit`
 * event. By default the browser then reloads the page to send the
 * form somewhere. In React you almost never want that, so you stop it:
 *
 *     function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
 *       event.preventDefault(); // stay on this page
 *       // ...now do your own thing with the values in state
 *     }
 *
 *     <form onSubmit={handleSubmit}>...</form>
 *
 * ========================================================================
 * BACKGROUND: ACCESSIBLE ERROR MESSAGES
 * ========================================================================
 * A sighted user sees an error under the field. A screen reader user
 * needs the error to be connected to the field. Two attributes do it:
 *
 * - `aria-describedby="some-id"` on the input points at the element
 *   with that id. Its text becomes the input's ACCESSIBLE DESCRIPTION,
 *   which a screen reader reads after the field's name.
 * - `aria-invalid="true"` on the input says "this value is wrong".
 *
 *     <input id="age" aria-invalid="true" aria-describedby="age-error" />
 *     <p id="age-error">Age must be a number</p>
 *
 * Tip: `useId()` from React makes a unique id string, which is safer
 * than a hard-coded id if a page shows the form twice.
 *
 * ========================================================================
 * WHAT YOUR TESTS CAN FIND
 * ========================================================================
 * Tests find elements by their ARIA role (what kind of thing it is) and
 * their accessible name (the text a screen reader reads out for it).
 * Your component must render exactly these:
 *
 * - A <form> with aria-label="Sign up" (a form needs a name to get the
 *   role "form"). Give it the `noValidate` prop too, so the browser's
 *   own error bubbles don't get in the way of yours.
 * - An input labelled "Email" (use type="email").
 * - An input labelled "Password" (type="password").
 * - An input labelled "Confirm password" (type="password").
 * - A submit button named "Sign up" (type="submit").
 * - For each field with an error: the error text in its own element,
 *   linked to the input with `aria-describedby`, and
 *   `aria-invalid="true"` on the input. A field without an error must
 *   NOT have aria-invalid="true" and must have no description.
 *
 * Password inputs have no ARIA role, so tests find them with
 * `screen.getByLabelText("Password")`.
 *
 * ========================================================================
 * THE RULES
 * ========================================================================
 * Your component must:
 * 1. Keep all three fields controlled (their `value` comes from state).
 * 2. Show NO errors before the first submit, and don't check anything
 *    while the user types. Errors change only when the form is
 *    submitted.
 * 3. On submit, call `event.preventDefault()`, then check every field
 *    and show ALL the errors at once:
 *      Email:
 *        empty                         "Email is required"
 *        doesn't match EMAIL_PATTERN   "Enter a valid email address"
 *      Password:
 *        empty                         "Password is required"
 *        fewer than 8 characters       "Password must be at least 8 characters"
 *      Confirm password:
 *        empty                         "Please confirm your password"
 *        different from Password       "Passwords do not match"
 *    Each field shows at most one error: the first one in its list that
 *    applies.
 * 4. When there are no errors, clear any old errors and call
 *    `onSubmit({ email, password })` exactly once.
 * 5. Never call `onSubmit` while any field has an error.
 *
 * You can assume:
 * - `onSubmit` is always passed.
 *
 * ========================================================================
 * EXAMPLES
 * ========================================================================
 * Each line shows what the user does, then what they should see.
 *
 *     click "Sign up" with every field empty
 *       ->  "Email is required", "Password is required",
 *           "Please confirm your password"         all three at once
 *
 *     email "ada@example", password "secret", confirm "secret"
 *       ->  "Enter a valid email address" and
 *           "Password must be at least 8 characters"
 *           no error on Confirm password, because it matches
 *
 *     email "ada@example.com", password "longenough", confirm "longenough"
 *       ->  onSubmit({ email: "ada@example.com", password: "longenough" })
 *           no errors on screen
 *
 * ========================================================================
 * EDGE CASES TO TEST
 * ========================================================================
 * - Nothing is invalid and there are no error messages before submit
 * - Submitting an empty form shows all three "required" errors and does
 *   not call onSubmit
 * - Each error is the input's accessible description, and the input has
 *   aria-invalid="true"
 * - A bad email ("ada@example") gets "Enter a valid email address"
 * - A 7-character password is too short, an 8-character one is fine
 * - Confirm password that doesn't match gets "Passwords do not match"
 * - Typing after a failed submit doesn't clear the errors yet. The next
 *   submit does
 * - A valid form calls onSubmit once with the email and password
 * - The submit event's default is prevented (see hint 5)
 * - Pressing Enter inside a field submits the form too
 *
 * ========================================================================
 * HINTS (read only if you get stuck)
 * ========================================================================
 * 1. You need state for the three values, plus state for the errors.
 *    An errors object works well:
 *    `{ email?: string; password?: string; confirm?: string }`.
 * 2. Write a plain function `validate(values)` that returns the errors
 *    object. Call it in the submit handler and store the result. If it
 *    has no keys (`Object.keys(errors).length === 0`), the form is valid.
 * 3. Render each error only when it exists:
 *    `{errors.email && <p id={emailErrorId}>{errors.email}</p>}`.
 *    Set `aria-describedby` only when there is an error (pass
 *    `undefined` otherwise, and React leaves the attribute out).
 * 4. TESTING: `expect(input).toHaveAccessibleDescription("Email is
 *    required")` checks the aria-describedby link for you.
 *    `expect(input).toHaveAttribute("aria-invalid", "true")` checks the
 *    invalid flag.
 * 5. TESTING the preventDefault: `fireEvent.submit(form)` returns
 *    `false` when the handler called `preventDefault()`. Find the form
 *    with `screen.getByRole("form", { name: "Sign up" })`.
 * 6. TESTING Enter: `await user.type(input, "text{Enter}")`.
 *
 * ========================================================================
 * REACT CONCEPTS TO LEARN
 * ========================================================================
 * - The form's onSubmit event and `event.preventDefault()`
 * - Several controlled inputs in one component
 * - Keeping errors in state and showing them conditionally
 * - aria-describedby, aria-invalid and useId for accessible errors
 *
 * ========================================================================
 * STRETCH GOALS
 * ========================================================================
 * - After a failed submit, move focus to the first field with an error.
 * - Re-check a field when the user leaves it (the `onBlur` event), but
 *   only after the first submit.
 * - Add a "Show password" checkbox that switches the password inputs
 *   between type="password" and type="text".
 */

import type { ReactElement } from "react";

/**
 * PROVIDED: you don't need to change this.
 * A simple email check: some text, an "@", some text, a ".", some text,
 * and no spaces. `EMAIL_PATTERN.test("ada@example.com")` is true.
 */
export const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export type SignupValues = {
  /** The email address. */
  email: string;
  /** The password, exactly as typed. */
  password: string;
};

export type SignupFormProps = {
  /** Called once with the values when the user submits a valid form. */
  onSubmit: (values: SignupValues) => void;
};

export function SignupForm({ onSubmit }: SignupFormProps): ReactElement {
  // TODO: build me, then make your tests pass.
  throw new Error("Not implemented: SignupForm");
}
