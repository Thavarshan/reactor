/**
 * Exercise: A newsletter form with actions (useActionState)
 * Level:    12 - Concurrent React
 * Topics:   form actions, useActionState, FormData, pending states
 *
 * ========================================================================
 * YOUR TASK
 * ========================================================================
 * Build a <SubscribeForm>: one email field and a "Subscribe" button. It
 * checks the email, sends it with the async `subscribe` prop, shows
 * "Subscribing..." while it waits, and then shows either a thank-you
 * message or an error.
 *
 *     Email [ ada@example.com     ]  [ Subscribing... ]
 *
 *     Thanks! ada@example.com is now subscribed.
 *
 *     <SubscribeForm subscribe={(email) => api.subscribe(email)} />
 *
 * ========================================================================
 * BACKGROUND: FORM ACTIONS
 * ========================================================================
 * In React 19 you can pass a FUNCTION to a form's `action` prop. When
 * the form is submitted, React stops the page reload for you and calls
 * the function with a FormData object (the values of every named
 * field):
 *
 *     async function save(formData: FormData) {
 *       const title = String(formData.get("title") ?? "");
 *       await api.save(title);
 *     }
 *
 *     <form action={save}>
 *       <input name="title" />
 *     </form>
 *
 * useActionState wraps such a function and remembers what it RETURNED
 * last time. That return value is your "state": a perfect place for
 * messages. It also tells you whether the action is still running:
 *
 *     const [state, formAction, isPending] = useActionState(
 *       async (previousState: number, formData: FormData) => {
 *         await api.like();
 *         return previousState + 1;      // becomes the new `state`
 *       },
 *       0,                               // the first `state`
 *     );
 *
 *     <form action={formAction}>...</form>
 *
 * After an action finishes, React RESETS the form: every field that
 * isn't controlled by state goes back to its `defaultValue`.
 *
 * ========================================================================
 * WHAT YOUR TESTS CAN FIND
 * ========================================================================
 * - A <form aria-label="Newsletter" noValidate>. (aria-label gives the
 *   form the role "form" and the name "Newsletter". noValidate turns off
 *   the browser's own email check, so YOUR messages show instead.)
 * - An <input type="email" name="email"> with the label "Email".
 * - A submit button named "Subscribe". While the action runs, its text
 *   is "Subscribing..." and it is disabled.
 * - Errors in <p role="alert">, for example
 *   <p role="alert">Please enter your email.</p>
 * - Success in <p role="status">Thanks! ada@example.com is now subscribed.</p>
 * - Show at most ONE message at a time: the result of the latest submit.
 *
 * ========================================================================
 * THE RULES
 * ========================================================================
 * Your component must:
 * 1. Use useActionState with an async action, and pass the action it
 *    gives you to <form action={...}>.
 * 2. Read "email" from the FormData and trim the spaces off both ends.
 * 3. Empty email: show "Please enter your email." and DON'T call
 *    `subscribe`.
 * 4. Email without an "@": show "Please enter a valid email address."
 *    and DON'T call `subscribe`.
 * 5. Otherwise, await `subscribe(email)` with the trimmed email. While
 *    it runs, the button says "Subscribing..." and is disabled.
 * 6. If `subscribe` succeeds: show "Thanks! <email> is now subscribed."
 *    The email field ends up empty.
 * 7. If `subscribe` fails (rejects): show the error's message in the
 *    alert, or "Something went wrong." if what it threw isn't an Error.
 * 8. After any error (rules 3, 4 and 7), the field still shows what the
 *    user typed.
 *
 * You can assume:
 * - `subscribe` resolves with nothing, or rejects with an Error.
 *
 * ========================================================================
 * EXAMPLES
 * ========================================================================
 *     click "Subscribe" (empty)    ->  "Please enter your email."
 *     type "ada" + click           ->  "Please enter a valid email address."
 *                                      field still shows "ada"
 *     type " ada@example.com " + Enter
 *                                  ->  subscribe("ada@example.com") is called,
 *                                      button "Subscribing..." (disabled)
 *     ...subscribe resolves        ->  "Thanks! ada@example.com is now subscribed."
 *                                      field is empty, button "Subscribe" again
 *     ...or subscribe rejects with new Error("Server is busy")
 *                                  ->  alert "Server is busy", field keeps the email
 *
 * ========================================================================
 * EDGE CASES TO TEST
 * ========================================================================
 * - Empty submit: the "Please enter your email." alert, no subscribe call
 * - No "@": the valid-address alert, no subscribe call, text kept
 * - Spaces around the email are trimmed before calling subscribe
 * - While waiting: button "Subscribing..." and disabled
 * - Success: the thank-you status, empty field, old alert gone
 * - Failure: the error's message, field keeps the email
 * - Pressing Enter in the field submits too
 *
 * ========================================================================
 * HINTS (read only if you get stuck)
 * ========================================================================
 * 1. A handy state shape:
 *    `{ error: string | null; success: string | null; email: string }`.
 *    Every return from the action builds a whole new object.
 * 2. To keep the text after an error, return the typed email in the
 *    state and use it as the field's starting value:
 *    `<input name="email" defaultValue={state.email} />`. When React
 *    resets the form, the field goes back to that value. Return
 *    `email: ""` on success.
 * 3. Wrap `await subscribe(email)` in try/catch. An error thrown out of
 *    a form action is NOT caught for you: it crashes the component.
 * 4. TESTING: give the test full control of `subscribe` with a Promise
 *    you resolve by hand:
 *        let finish!: () => void;
 *        const subscribe = vi.fn(() => new Promise<void>((resolve) => { finish = resolve; }));
 *        ... click Subscribe, check "Subscribing..." ...
 *        await act(async () => finish());
 * 5. TESTING: user-event remembers what it typed into a field. When React
 *    resets the form, user-event may not notice, and the next
 *    `user.type` adds to the OLD text. Call `await user.clear(input)`
 *    before typing into the field again.
 *
 * ========================================================================
 * REACT CONCEPTS TO LEARN
 * ========================================================================
 * - Passing a function to <form action>
 * - FormData and named fields
 * - useActionState: state from an action's return value, and isPending
 * - Automatic form reset, and defaultValue
 *
 * ========================================================================
 * STRETCH GOALS
 * ========================================================================
 * - Move the button into its own <SubmitButton> component that uses
 *   useFormStatus() from "react-dom" to know if the form is pending.
 * - Link the error to the field with aria-describedby and set
 *   aria-invalid="true" on the field.
 * - Add a "Frequency" select (weekly or monthly) and send it too.
 */

import type { ReactElement } from 'react';

export type SubscribeFormProps = {
  /** Sends the email to the server. Resolves when done, rejects on failure. */
  subscribe: (email: string) => Promise<void>;
};

export function SubscribeForm({ subscribe }: SubscribeFormProps): ReactElement {
  // TODO: build me, then make your tests pass.
  throw new Error('Not implemented: SubscribeForm');
}
