/**
 * Exercise: Multi-step sign-up form
 * Level:    13 - Small Apps
 * Topics:   one state object across steps, per-step validation,
 *           aria-describedby, moving focus with refs
 *
 * ========================================================================
 * YOUR TASK
 * ========================================================================
 * Build a <MultiStepForm>: a sign-up form split into three steps. Each
 * step checks its own fields before you can go on. The last step shows
 * a summary, and "Create account" sends everything.
 *
 *     Step 1 of 3: Account          Step 2 of 3: Profile
 *     Email    [ ada@example.com ]  Full name [ Ada Lovelace ]
 *     Password [ ********        ]  Plan  (o) Free  ( ) Pro
 *                       [ Next ]    [ Back ]            [ Next ]
 *
 *     Step 3 of 3: Review           Welcome aboard, Ada Lovelace!
 *     Email      ada@example.com
 *     Full name  Ada Lovelace
 *     Plan       Free
 *     [ Back ]   [ Create account ]
 *
 *     <MultiStepForm onSubmit={(data) => api.signUp(data)} />
 *
 * ========================================================================
 * BACKGROUND: ONE FORM, SEVERAL SCREENS
 * ========================================================================
 * The steps are just different views of ONE piece of state. Keep all
 * the answers in one object, and the current step in a number:
 *
 *     const [step, setStep] = useState(1);
 *     const [data, setData] = useState({ email: "", ... });
 *
 * Because the answers live in the parent, not in each step, going Back
 * and forth never loses what the user typed. Each step only decides
 * which fields to show and which ones to check.
 *
 * When the step changes, a screen reader user may not notice. A good
 * fix is to move keyboard focus to the new step's heading. A heading
 * can't normally take focus, but `tabIndex={-1}` allows it from code
 * (not with the Tab key). You reach the element with a ref:
 *
 *     const headingRef = useRef<HTMLHeadingElement>(null);
 *     useEffect(() => { headingRef.current?.focus(); }, [something]);
 *     <h2 ref={headingRef} tabIndex={-1}>...</h2>
 *
 * ========================================================================
 * WHAT YOUR TESTS CAN FIND
 * ========================================================================
 * - A heading (<h2 tabIndex={-1}>) "Step 1 of 3: Account",
 *   "Step 2 of 3: Profile" or "Step 3 of 3: Review".
 * - Step 1: inputs labelled "Email" (type="email") and "Password"
 *   (type="password").
 * - Step 2: an input labelled "Full name", and a <fieldset> with the
 *   <legend> "Plan" holding two radio buttons labelled "Free" and "Pro".
 * - Step 3: a <dl> with <dt>/<dd> pairs: "Email", "Full name", "Plan"
 *   (the plan shown as "Free" or "Pro"). The password is NOT shown.
 * - Buttons: "Next" (steps 1 and 2), "Back" (steps 2 and 3), and
 *   "Create account" (step 3).
 * - Each error message sits in its own element, linked to its field
 *   with aria-describedby, and the field gets aria-invalid="true".
 *   Tests check them with
 *   `expect(field).toHaveAccessibleDescription("Email is required")`.
 * - After submitting: a heading "Welcome aboard, <full name>!" instead
 *   of the form.
 *
 * ========================================================================
 * THE RULES
 * ========================================================================
 * Your component must:
 * 1. Start on step 1 with empty fields and the "Free" plan selected.
 * 2. "Next" checks only the CURRENT step. If something is wrong, stay
 *    on the step and show the errors. Otherwise go to the next step.
 * 3. Step 1 checks, in this order for the email:
 *    - Email empty (after trimming): "Email is required"
 *    - Email without "@": "Enter a valid email"
 *    - Password shorter than 8 characters: "Password must be at least 8 characters"
 * 4. Step 2 checks: Full name empty (after trimming): "Name is required"
 * 5. Show errors only after "Next" is clicked, not while typing. They
 *    stay until the next click on "Next" (which checks again).
 * 6. "Back" goes to the previous step without checking anything, and
 *    keeps every value.
 * 7. When the step changes, move focus to the new step's heading.
 * 8. "Create account" calls `onSubmit` ONCE with
 *    { email, password, name, plan }, where email and name are trimmed
 *    and plan is "free" or "pro". Then show the welcome heading.
 * 9. Wrap the steps in one <form>. "Next" and "Back" are type="button".
 *    "Create account" is the submit button. A submit on steps 1 or 2
 *    (pressing Enter in a field can cause one) does nothing: no
 *    onSubmit call and no page reload.
 *
 * You can assume:
 * - onSubmit doesn't throw.
 *
 * ========================================================================
 * EXAMPLES
 * ========================================================================
 *     click "Next" on an empty step 1
 *        ->  Email: "Email is required"
 *            Password: "Password must be at least 8 characters"
 *     email "ada", password "secret"
 *        ->  "Enter a valid email" and the password error
 *     email "ada@example.com", password "correct horse", "Next"
 *        ->  "Step 2 of 3: Profile", focus on that heading
 *     "Back"
 *        ->  step 1, still showing ada@example.com
 *     ...fill step 2 with " Ada Lovelace ", pick "Pro", "Next"
 *        ->  review shows Ada Lovelace and Pro
 *     "Create account"
 *        ->  onSubmit({ email: "ada@example.com", password: "correct horse",
 *                       name: "Ada Lovelace", plan: "pro" })
 *            heading "Welcome aboard, Ada Lovelace!"
 *
 * ========================================================================
 * EDGE CASES TO TEST
 * ========================================================================
 * - Starts on step 1, with "Free" checked and no errors shown
 * - Empty step 1: both errors, linked with aria-describedby
 * - Email without "@": "Enter a valid email"
 * - A 7-character password fails, an 8-character one passes
 * - No errors appear while typing, only after "Next"
 * - Valid step 1 goes to step 2 and focuses its heading
 * - Step 2 needs a name, and spaces only don't count
 * - Back keeps the values (on both steps)
 * - Review shows the values, and NOT the password
 * - Create account calls onSubmit once with trimmed data, then the
 *   welcome heading shows
 * - Enter in a field on step 1 or 2 doesn't call onSubmit
 *
 * ========================================================================
 * HINTS (read only if you get stuck)
 * ========================================================================
 * 1. Three pieces of state: `step`, `data` (all fields), and `errors`
 *    (an object like `{ email?: string; password?: string; name?: string }`).
 *    Add a `done` flag for the welcome screen.
 * 2. Write `validate(step, data)` as a plain function that returns the
 *    errors object. "Next" calls it. If it has no keys, go on and clear
 *    the errors.
 * 3. Update one field without losing the others:
 *    `setData((d) => ({ ...d, email: value }))`.
 * 4. Link an error: give the message an id, e.g.
 *    `<p id="email-error">Email is required</p>`, and put
 *    `aria-describedby="email-error"` on the input. Only add the
 *    attribute while there IS an error.
 * 5. For focus, run an effect when `step` changes. Skip the very first
 *    render, so the page doesn't jump on load (a ref that remembers
 *    "first render" works, or compare with the previous step).
 * 6. In the form's onSubmit handler, call `event.preventDefault()`
 *    first, then return early unless `step === 3`.
 * 7. TESTING: `expect(heading).toHaveFocus()` checks focus.
 *    `screen.getByRole("radio", { name: "Pro" })` finds a radio button.
 *    Pressing Enter only submits a form when a browser would, so to be
 *    sure a submit on step 1 is ignored, force one:
 *    `fireEvent.submit(screen.getByLabelText("Email").closest("form")!)`.
 * 8. TESTING: the review step uses a <dl>. getByText("Ada Lovelace")
 *    finds the <dd>. To be sure the password is hidden, check
 *    `expect(screen.queryByText("correct horse")).not.toBeInTheDocument()`.
 *
 * ========================================================================
 * REACT CONCEPTS TO LEARN
 * ========================================================================
 * - Keeping state for several screens in one parent
 * - Validation as a pure function of the data
 * - aria-describedby and aria-invalid for accessible errors
 * - useRef and useEffect to move focus
 *
 * ========================================================================
 * STRETCH GOALS
 * ========================================================================
 * - Add an "Edit" button next to each review row that jumps back to
 *   the right step.
 * - Show a progress bar (role="progressbar" with aria-valuenow).
 * - Make onSubmit async, and show "Creating account..." while it runs.
 */

import type { ReactElement } from 'react';

export type Plan = 'free' | 'pro';

export type SignupData = {
  email: string;
  password: string;
  /** The full name. */
  name: string;
  plan: Plan;
};

export type MultiStepFormProps = {
  /** Called once with all the answers when "Create account" is clicked. */
  onSubmit: (data: SignupData) => void;
};

export function MultiStepForm({ onSubmit }: MultiStepFormProps): ReactElement {
  // TODO: build me, then make your tests pass.
  throw new Error('Not implemented: MultiStepForm');
}
