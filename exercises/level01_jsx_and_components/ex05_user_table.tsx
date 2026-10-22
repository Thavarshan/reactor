/**
 * Exercise: User Table
 * Level:    01 - JSX and Components
 * Topics:   tables, caption, column and row headers, links, empty state
 *
 * ========================================================================
 * YOUR TASK
 * ========================================================================
 * Build a <UserTable> that shows users in a proper HTML table: a caption,
 * a header row, one row per user, and a "No users found" row when the
 * list is empty.
 *
 *                       Users                      <- caption
 *     +----------------+--------------------+---------+
 *     | Name           | Email              | Role    |   <- column headers
 *     +----------------+--------------------+---------+
 *     | Ada Lovelace   | ada@example.com    | Admin   |
 *     | Alan Turing    | alan@example.com   | Member  |
 *     +----------------+--------------------+---------+
 *
 *     <UserTable users={users} />
 *
 * ========================================================================
 * BACKGROUND: TABLES THAT MAKE SENSE TO EVERYONE
 * ========================================================================
 * A table is for data in rows and columns. A sighted user sees which
 * header sits above a cell. A screen reader user hears it, but only if
 * the HTML says which cells are headers. The building blocks:
 *
 *     <table>
 *       <caption>Opening hours</caption>      the table's title
 *       <thead>
 *         <tr>                                a row
 *           <th scope="col">Day</th>          a header for a COLUMN
 *           <th scope="col">Hours</th>
 *         </tr>
 *       </thead>
 *       <tbody>
 *         <tr>
 *           <th scope="row">Monday</th>       a header for a ROW
 *           <td>9 to 5</td>                   a normal cell
 *         </tr>
 *       </tbody>
 *     </table>
 *
 * The <caption> becomes the table's ACCESSIBLE NAME (what a screen reader
 * calls it). A screen reader on the "9 to 5" cell can now say "Monday,
 * Hours, 9 to 5".
 *
 * In JSX a few attribute names change: `colspan` is written `colSpan`, and
 * a cell that should stretch across 3 columns is `<td colSpan={3}>`.
 *
 * ========================================================================
 * WHAT YOUR TESTS CAN FIND
 * ========================================================================
 * Tests find elements by their ARIA ROLE (what kind of thing it is) and
 * ACCESSIBLE NAME (what a screen reader reads out for it). Your component
 * must render:
 *
 * - A table (role "table") named by its <caption>, e.g. "Users".
 * - Three column headers (role "columnheader", from <th scope="col">)
 *   with the texts "Name", "Email" and "Role", in that order.
 * - For each user, a row (role "row") containing:
 *     - a row header (role "rowheader", from <th scope="row">) with the
 *       user's name,
 *     - a cell (role "cell") with a link (role "link") whose text is the
 *       email and whose href is "mailto:" plus the email,
 *     - a cell with the role label: "Admin" or "Member".
 * - When there are no users: the caption and header row as usual, plus
 *   ONE row with ONE cell that says "No users found" and spans all 3
 *   columns (colSpan 3).
 *
 * ========================================================================
 * THE RULES
 * ========================================================================
 * Your component must:
 * 1. Accept a `users` prop and an optional `caption` prop (default
 *    "Users").
 * 2. Render a <table> with a <caption>, a <thead> holding the header row,
 *    and a <tbody> holding the user rows.
 * 3. Render one row per user, in the same order as the array, using the
 *    user's `id` as the key.
 * 4. Show the name as a row header, the email as a mailto link, and the
 *    role as "Admin" or "Member".
 * 5. When `users` is empty, show the single "No users found" row.
 *
 * You can assume:
 * - User ids are unique.
 *
 * ========================================================================
 * EXAMPLES
 * ========================================================================
 *     users = [
 *       { id: 1, name: "Ada Lovelace", email: "ada@example.com",  role: "admin"  },
 *       { id: 2, name: "Alan Turing",  email: "alan@example.com", role: "member" },
 *     ]
 *
 *     <UserTable users={users} />
 *       a table named "Users", 3 rows (1 header row + 2 user rows)
 *       row headers "Ada Lovelace" and "Alan Turing"
 *       a link "ada@example.com" to "mailto:ada@example.com"
 *     <UserTable users={users} caption="Team" />
 *       a table named "Team"
 *     <UserTable users={[]} />
 *       2 rows: the header row, and "No users found" spanning 3 columns
 *
 * ========================================================================
 * EDGE CASES TO TEST
 * ========================================================================
 * - The table is named by its caption: `getByRole("table", { name: "Users" })`
 * - A custom caption names the table
 * - The column headers are exactly Name, Email, Role, in order
 * - One row per user plus the header row (`getAllByRole("row")` has
 *   users.length + 1 items)
 * - Each user's name is a row header
 * - The email is a link with href "mailto:ada@example.com"
 * - "admin" shows as "Admin", "member" as "Member"
 * - Rows keep the array order
 * - No users -> a cell "No users found" with colspan 3, and still the
 *   three column headers
 *
 * ========================================================================
 * HINTS (read only if you get stuck)
 * ========================================================================
 * 1. Write the table for ONE hard-coded user first, check it in the
 *    playground, then replace the row with a `map`.
 * 2. For the role label, a small lookup object works well:
 *    `{ admin: "Admin", member: "Member" }[user.role]`.
 * 3. The empty state goes INSIDE <tbody>, so the caption and headers
 *    stay. Pick between "the user rows" and "the empty row" with a
 *    ternary.
 * 4. TESTING: `within(row)` searches only inside one element:
 *
 *        const rows = screen.getAllByRole("row");
 *        const ada = rows[1]; // rows[0] is the header row
 *        expect(within(ada).getByRole("rowheader")).toHaveTextContent("Ada Lovelace");
 *
 *    The colspan attribute is lower case in the HTML:
 *    `expect(cell).toHaveAttribute("colspan", "3")`.
 *
 * ========================================================================
 * REACT CONCEPTS TO LEARN
 * ========================================================================
 * - Rendering a list of rows with `map` and keys
 * - Semantic tables: caption, thead, tbody, th with scope, td
 * - JSX attribute names that differ from HTML (`colSpan`, `className`)
 * - Building attribute values from data: href={`mailto:${email}`}
 * - Searching inside one element with `within`
 *
 * ========================================================================
 * STRETCH GOALS
 * ========================================================================
 * - Add a <tfoot> row that says "2 users" (or "1 user").
 * - Sort the rows by name without changing the `users` array (copy it
 *   first: `[...users].sort(...)`).
 * - Add a "Last seen" column that formats a date with
 *   Intl.DateTimeFormat.
 */

import type { ReactElement } from "react";

export type User = {
  /** A unique id. Use it as the React key. */
  id: number;
  /** The user's full name. */
  name: string;
  /** The user's email address. */
  email: string;
  /** What the user is allowed to do. */
  role: "admin" | "member";
};

export type UserTableProps = {
  /** The users to show, one row each. */
  users: User[];
  /** The table's caption, which is also its accessible name. Default "Users". */
  caption?: string;
};

export function UserTable({ users, caption = "Users" }: UserTableProps): ReactElement {
  // TODO: build me, then make your tests pass.
  throw new Error("Not implemented: UserTable");
}
