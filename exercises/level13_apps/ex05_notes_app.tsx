/**
 * Exercise: Notes app
 * Level:    13 - Small Apps
 * Topics:   CRUD (create, read, update, delete), editing one item at a
 *           time, derived search results, persisting to localStorage
 *
 * ========================================================================
 * YOUR TASK
 * ========================================================================
 * Build a <NotesApp>: write notes with a title and a body, edit them,
 * delete them, and search them. Notes survive a page reload because
 * they are saved in localStorage.
 *
 *     New note
 *     Title [ Shopping            ]
 *     Body  [ milk, eggs          ]
 *     [ Add note ]
 *
 *     Search notes [ milk         ]
 *
 *     Shopping                          [ Edit ] [ Delete ]
 *     milk, eggs
 *
 *     <NotesApp />
 *
 * ========================================================================
 * BACKGROUND: SAVING STATE IN THE BROWSER
 * ========================================================================
 * localStorage is a small key/value store in the browser that survives
 * reloads. It only stores strings, so you turn data into JSON:
 *
 *     localStorage.setItem("scores", JSON.stringify([1, 2, 3]));
 *     const scores = JSON.parse(localStorage.getItem("scores") ?? "[]");
 *
 * Two React patterns fit together here:
 *
 * - Read the saved data ONCE, when the component first appears, with a
 *   "lazy initial state": pass a FUNCTION to useState. React only calls
 *   it on the first render:
 *
 *       const [scores, setScores] = useState(() => loadScores());
 *
 * - Save after every change with an effect that depends on the data:
 *
 *       useEffect(() => {
 *         localStorage.setItem("scores", JSON.stringify(scores));
 *       }, [scores]);
 *
 * Saved data can be broken (someone edited it, or an old version of
 * your app wrote a different shape). JSON.parse THROWS on bad JSON, so
 * wrap it in try/catch and fall back to an empty list.
 *
 * ========================================================================
 * WHAT YOUR TESTS CAN FIND
 * ========================================================================
 * - A <form aria-label="New note"> with an input labelled "Title", a
 *   textarea labelled "Body" and a submit button "Add note".
 * - A search box: <input type="search"> labelled "Search notes" (its
 *   role is "searchbox").
 * - A list <ul aria-label="Notes"> with one <li> per shown note. Each
 *   note shows its title in an <h3>, its body in a <p>, and two buttons
 *   named "Edit <title>" and "Delete <title>" (use aria-label).
 * - While a note is being edited, its <li> shows instead: an input
 *   labelled "Edit title", a textarea labelled "Edit body", and buttons
 *   "Save" and "Cancel".
 * - Errors: <p role="alert">Title is required</p>
 * - No notes at all: <p>No notes yet.</p> instead of the list.
 *   Notes exist but none match: <p>No notes match "milk".</p> (with
 *   the trimmed search text inside the quotes) instead of the list.
 *
 * ========================================================================
 * THE RULES
 * ========================================================================
 * Your component must:
 * 1. Add a note when the "New note" form is submitted. Trim the title
 *    and the body. An empty title shows the "Title is required" alert
 *    and adds nothing. After adding, empty both fields and remove the
 *    alert. New notes go at the TOP of the list.
 * 2. "Delete <title>" removes that note.
 * 3. "Edit <title>" switches that note into edit mode, with its current
 *    title and body filled in. Only one note is edited at a time:
 *    clicking "Edit" on another note switches to that one.
 * 4. "Save" stores the trimmed changes and leaves edit mode. An empty
 *    title shows the "Title is required" alert and stays in edit mode.
 *    "Cancel" leaves edit mode without changing anything.
 * 5. The search shows only notes whose title OR body contains the
 *    trimmed search text, ignoring upper and lower case. An empty search
 *    shows all notes.
 * 6. Load notes from localStorage under the key STORAGE_KEY when the
 *    component first appears. If nothing is saved, the JSON is broken,
 *    or it isn't an array, start with no notes.
 * 7. Save the notes to localStorage (as JSON, under STORAGE_KEY) after
 *    every add, edit and delete. The search text is NOT saved.
 *
 * You can assume:
 * - A saved array, if there is one, contains valid Note objects.
 *
 * ========================================================================
 * EXAMPLES
 * ========================================================================
 *     empty storage                  ->  "No notes yet."
 *     add "Shopping" / "milk, eggs"  ->  one note, fields emptied
 *     add "Ideas" / "a tiny app"     ->  Ideas is listed FIRST
 *     add with title "   "           ->  alert "Title is required"
 *     search "MILK"                  ->  only Shopping (matched in the body)
 *     search "zzz"                   ->  No notes match "zzz".
 *     Edit Shopping, title "Groceries", Save
 *                                    ->  the note is now "Groceries"
 *     unmount, render again          ->  the same notes are back
 *     storage holds "{oops"          ->  "No notes yet." (no crash)
 *
 * ========================================================================
 * EDGE CASES TO TEST
 * ========================================================================
 * - Starts with "No notes yet." when storage is empty
 * - Adding: trimmed values, newest first, fields emptied
 * - An empty title is rejected with the alert
 * - Deleting a note
 * - Editing: fields start with the current values, Save stores trimmed
 *   changes, and Cancel keeps the old note
 * - Saving an empty title shows the alert and stays in edit mode
 * - Only one note in edit mode at a time
 * - Search matches title or body, any case, and shows the
 *   no-match message
 * - Notes are saved to localStorage and loaded again on a new render
 * - Broken JSON, or JSON that isn't an array, starts empty
 *
 * ========================================================================
 * HINTS (read only if you get stuck)
 * ========================================================================
 * 1. State: `notes`, the new-note fields, `search`, and `editingId`
 *    (string | null) plus the edit fields. Keep the alert messages in
 *    state too.
 * 2. Work out the shown notes during render:
 *        const query = search.trim().toLowerCase();
 *        const shown = notes.filter((n) => (n.title + " " + n.body).toLowerCase().includes(query));
 *    That's not state, just a calculation.
 * 3. Write `loadNotes()` as a plain function with try/catch and
 *    `Array.isArray`. Use it as `useState(loadNotes)`.
 * 4. A new id: `crypto.randomUUID()`.
 * 5. When "Edit" is clicked, copy that note's title and body into the
 *    edit fields. Save with
 *    `notes.map((n) => (n.id === editingId ? { ...n, title, body } : n))`.
 * 6. TESTING: localStorage lives for the whole test file. Clear it in
 *    `beforeEach(() => localStorage.clear())`, or notes leak between
 *    tests.
 * 7. TESTING: to check loading, put data in BEFORE rendering:
 *        localStorage.setItem(STORAGE_KEY, JSON.stringify([{ id: "1", title: "Hi", body: "" }]));
 *    To check saving, read it back:
 *        JSON.parse(localStorage.getItem(STORAGE_KEY)!)
 *    To fake a reload, `unmount()` and render again.
 * 8. TESTING: the "Title is required" alert can appear in the new-note
 *    form and in edit mode, so check the one you expect with
 *    `getByRole("alert")` after only one of them could have happened.
 *
 * ========================================================================
 * REACT CONCEPTS TO LEARN
 * ========================================================================
 * - Create, read, update and delete on an array in state
 * - Lazy initial state (a function passed to useState)
 * - An effect that saves state (syncing with an outside system)
 * - Deriving filtered results instead of storing them
 * - Editing one item at a time with an id in state
 *
 * ========================================================================
 * STRETCH GOALS
 * ========================================================================
 * - Move the storage logic into a `useLocalStorage(key, initial)` hook.
 * - Ask "Delete this note?" with a confirm dialog before deleting.
 * - Save an `updatedAt` time and sort notes by it. (Use fake timers or
 *   vi.setSystemTime in tests.)
 * - Keep the search in the URL (useSearchParams) so it survives a
 *   reload too.
 */

import type { ReactElement } from "react";

export type Note = {
  /** A unique id. */
  id: string;
  title: string;
  body: string;
};

/** PROVIDED: you don't need to change this. The localStorage key. */
export const STORAGE_KEY = "reactor-notes";

export function NotesApp(): ReactElement {
  // TODO: build me, then make your tests pass.
  throw new Error("Not implemented: NotesApp");
}
