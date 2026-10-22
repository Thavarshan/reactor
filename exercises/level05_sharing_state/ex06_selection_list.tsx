/**
 * Exercise: Selection List
 * Level:    05 - Sharing State
 * Topics:   avoiding duplicated state, storing an id instead of a copy,
 *           editing items in a list
 *
 * ========================================================================
 * YOUR TASK
 * ========================================================================
 * Build a <ContactManager>: a list of contacts on the left and a
 * details panel on the right. Click a contact to select it. The panel
 * lets you edit its name and email, and every edit shows up straight
 * away in BOTH the list and the panel.
 *
 *     Contacts              Details
 *     [ Ada Lovelace ]      Ada Lovelace
 *     [ Grace Hopper ] <-   ada@example.com
 *     [ Alan Turing  ]      Name  [ Ada Lovelace     ]
 *                           Email [ ada@example.com  ]
 *                           [ Delete contact ]
 *
 *     <ContactManager initialContacts={CONTACTS} />
 *
 * ========================================================================
 * BACKGROUND: DON'T STORE A COPY
 * ========================================================================
 * The tempting way to remember the selection is to keep the whole
 * selected object in state:
 *
 *     const [selected, setSelected] = useState<Song | null>(null);
 *     // later: setSelected(song)
 *
 * But now the same song lives in TWO places: in the list, and in
 * `selected`. Rename it in the list and `selected` still holds the old
 * copy, so the details panel shows the old name. You would have to
 * remember to update both places every time. That is DUPLICATED state,
 * and it is a classic source of bugs.
 *
 * The fix: store only the selected song's id, and look the song up in
 * the list on every render.
 *
 *     const [selectedId, setSelectedId] = useState<number | null>(null);
 *     const selected = songs.find((s) => s.id === selectedId);
 *
 * There is now one copy of every song. Whatever happens to the list
 * (an edit, a delete), the panel shows the truth.
 *
 * ========================================================================
 * WHAT YOUR TESTS CAN FIND
 * ========================================================================
 * Tests find elements by their ARIA role (what kind of thing it is) and
 * their accessible name (the text a screen reader reads out for it).
 * Your component must render exactly these:
 *
 * - A <ul aria-label="Contacts"> (role "list", name "Contacts") with one
 *   <li> per contact. Each holds a button named by the contact's name,
 *   with aria-pressed="true" for the selected contact and "false" for
 *   the rest. (aria-pressed tells screen readers a button is switched
 *   on.)
 * - A <section aria-label="Details"> (role "region", name "Details").
 *   Inside it:
 *   - With no contact selected: the text "Select a contact", and
 *     nothing else from the list below.
 *   - With a contact selected: an <h2> heading with its name, its email
 *     as text, a text box named "Name", a text box named "Email" (use
 *     type="text" for both), and a button named "Delete contact".
 * - Wherever a name is shown (list button, heading), show "(no name)"
 *   instead when the name is empty or only spaces.
 *
 * ========================================================================
 * THE RULES
 * ========================================================================
 * Your component must:
 * 1. Start with the contacts from `initialContacts` and nothing
 *    selected.
 * 2. Select a contact when its button is clicked. Only that button is
 *    pressed, and the details panel shows that contact.
 * 3. Fill the "Name" and "Email" boxes with the selected contact's
 *    values, and update the contact on every keystroke.
 * 4. Show every edit live in the list AND in the details heading and
 *    email.
 * 5. Show the newly selected contact's own values when another contact
 *    is selected. Edits made earlier are kept.
 * 6. Remove the selected contact when "Delete contact" is clicked, and
 *    go back to "Select a contact".
 * 7. Show "(no name)" for empty or spaces-only names, as above.
 *
 * You can assume:
 * - Contact ids are unique.
 *
 * ========================================================================
 * EXAMPLES
 * ========================================================================
 * Each line shows what the user does, then what they should see.
 *
 *     <ContactManager initialContacts={CONTACTS} />
 *       "Select a contact", no button pressed
 *       click "Grace Hopper"    ->  heading "Grace Hopper", Name box
 *                                   "Grace Hopper", her button pressed
 *       type " B." in Name      ->  the list button AND the heading say
 *                                   "Grace Hopper B."
 *       click "Ada Lovelace"    ->  the boxes show Ada's values
 *       click "Grace Hopper B." ->  the edit is still there
 *       click "Delete contact"  ->  Grace is gone, "Select a contact"
 *
 *     clear the Name box  ->  the list button and heading say "(no name)"
 *
 * ========================================================================
 * EDGE CASES TO TEST
 * ========================================================================
 * - At the start: every contact listed, none pressed, "Select a
 *   contact", no Name or Email box
 * - Selecting a contact presses only its button and fills the panel
 * - Editing the name updates the list button and the heading live
 * - Editing the email updates the email text in the panel
 * - Switching contacts shows the other contact's values
 * - Edits are kept after switching away and back
 * - Delete removes the contact and shows "Select a contact"
 * - An empty name shows "(no name)" in the list and the heading
 *
 * ========================================================================
 * HINTS (read only if you get stuck)
 * ========================================================================
 * 1. Two pieces of state: the `contacts` array, and `selectedId`
 *    (a number, or null for "nothing selected").
 * 2. `const selected = contacts.find((c) => c.id === selectedId)` gives
 *    the selected contact, or `undefined`. After a delete it is
 *    undefined automatically, even if you forget to reset selectedId.
 * 3. One update helper covers both boxes:
 *    `setContacts(contacts.map((c) => (c.id === selectedId ? { ...c, [field]: text } : c)))`.
 * 4. A tiny function `displayName(name)` that returns "(no name)" for
 *    blank names keeps rule 7 in one place.
 * 5. TESTING: `within(screen.getByRole("region", { name: "Details" }))`
 *    looks only inside the panel. Find the heading with
 *    `getByRole("heading", { level: 2 })`.
 *
 * ========================================================================
 * REACT CONCEPTS TO LEARN
 * ========================================================================
 * - Avoiding duplicated state
 * - Storing ids and looking objects up while rendering
 * - Editing one item of an array through a form
 * - aria-pressed for a "selected" button
 *
 * ========================================================================
 * STRETCH GOALS
 * ========================================================================
 * - After a delete, select the next contact in the list instead.
 * - Let the user select several contacts (a Set of ids) and delete
 *   them together.
 * - Add a search box that filters the list but never loses the
 *   selection.
 */

import type { ReactElement } from "react";

export type Contact = {
  /** A unique id. */
  id: number;
  /** The contact's name. Can be edited to anything, even "". */
  name: string;
  /** The contact's email address. */
  email: string;
};

/**
 * PROVIDED: you don't need to change this.
 * Sample contacts for your tests and the playground.
 */
export const CONTACTS: Contact[] = [
  { id: 1, name: "Ada Lovelace", email: "ada@example.com" },
  { id: 2, name: "Grace Hopper", email: "grace@example.com" },
  { id: 3, name: "Alan Turing", email: "alan@example.com" },
];

export type ContactManagerProps = {
  /** The contacts to start with. */
  initialContacts: Contact[];
};

export function ContactManager({ initialContacts }: ContactManagerProps): ReactElement {
  // TODO: build me, then make your tests pass.
  throw new Error("Not implemented: ContactManager");
}
