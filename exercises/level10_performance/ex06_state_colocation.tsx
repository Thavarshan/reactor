/**
 * Exercise: State Colocation
 * Level:    10 - Performance
 * Topics:   where state lives, moving state down, passing children, no memo
 *
 * ========================================================================
 * YOUR TASK
 * ========================================================================
 * The PROVIDED <SlowDashboard> keeps all its state at the top, so every
 * keystroke in "Quick note" re-renders (draws again) the slow report
 * below it. Build <Dashboard>: the same screen, but with the state moved
 * into small child components, so typing a note or changing the theme
 * never re-renders <SlowReport>. Do it WITHOUT React.memo.
 *
 *     Quick note: [ call the bank       ]
 *     Characters: 13
 *
 *     Theme: [ Dark v ]
 *     +--- Report (theme-dark) ---------------+
 *     |  Sales report                         |
 *     |  Region   Sales                       |
 *     |  North    1200    ...                 |
 *     +---------------------------------------+
 *
 *     <Dashboard onReportRender={() => console.log("report rendered")} />
 *
 * ========================================================================
 * BACKGROUND: PUT STATE WHERE IT'S USED
 * ========================================================================
 * When state changes, React re-renders the component that owns it and
 * everything that component renders. So the higher up state lives, the
 * more gets re-rendered when it changes.
 *
 * "Colocation" means keeping state as close as possible to where it's
 * used. If only a search box needs the search text, the search box
 * should own it:
 *
 *     // Before: typing re-renders Page, and so BigChart too
 *     function Page() {
 *       const [text, setText] = useState("");
 *       return <><input value={text} onChange={...} /><BigChart /></>;
 *     }
 *
 *     // After: typing re-renders only SearchBox
 *     function SearchBox() {
 *       const [text, setText] = useState("");
 *       return <input value={text} onChange={...} />;
 *     }
 *     function Page() {
 *       return <><SearchBox /><BigChart /></>;
 *     }
 *
 * Sometimes the state has to wrap the slow part, like a theme that
 * colours a box around it. Then pass the slow part in as `children`
 * (whatever you write between a component's tags). The parent makes
 * that element, so when the wrapper's own state changes, the `children`
 * prop is still the very same element, and React skips it:
 *
 *     function Highlight({ children }: { children: ReactNode }) {
 *       const [on, setOn] = useState(false);
 *       return <div className={on ? "lit" : ""} onClick={() => setOn(!on)}>{children}</div>;
 *     }
 *     <Highlight><BigChart /></Highlight>   // clicking doesn't re-render BigChart
 *
 * These two moves fix many slow screens before you ever need memo.
 *
 * Note: <StrictMode> renders twice in development. Tests don't use it,
 * so render counts are exact.
 *
 * ========================================================================
 * WHAT YOUR TESTS CAN FIND
 * ========================================================================
 * Dashboard renders the same things as SlowDashboard:
 * - A textbox labelled "Quick note", empty at first.
 * - The text "Characters: N", where N is the note's length.
 * - A combobox (<select>) labelled "Theme" with options "Light"
 *   (value "light") and "Dark" (value "dark"). "Light" is selected first.
 * - A region named "Report" (<section aria-label="Report">) with the
 *   className "theme-light" or "theme-dark".
 * - Inside that region, the PROVIDED <SlowReport>, a table with the
 *   caption "Sales report".
 *
 * ========================================================================
 * THE RULES
 * ========================================================================
 * Your component must:
 * 1. Render everything listed above, working like SlowDashboard.
 * 2. Render `<SlowReport rows={reportRows} onRender={onReportRender} />`.
 * 3. Keep the note text in a child component that renders the
 *    "Quick note" box and the character count.
 * 4. Keep the theme in a child component that renders the "Theme"
 *    select and the "Report" region, and gets SlowReport as `children`.
 * 5. Have no state in Dashboard itself.
 * 6. Render SlowReport once when it first appears, and never again when
 *    the user types a note or changes the theme.
 * 7. Not use React.memo, useMemo or useCallback. Fix it with structure.
 *
 * You can assume:
 * - Nothing else changes `reportRows`.
 *
 * ========================================================================
 * EXAMPLES
 * ========================================================================
 * Counting SlowReport renders with onReportRender:
 *
 *                         SlowDashboard        Dashboard (yours)
 *     first render        1                    1
 *     type "hello"        6 (1 + 5 letters)    1
 *     choose "Dark"       7                    1, and Report is "theme-dark"
 *
 * ========================================================================
 * EDGE CASES TO TEST
 * ========================================================================
 * - SlowDashboard: typing re-renders the report once per letter (this
 *   proves the problem)
 * - Dashboard: SlowReport renders exactly once at first
 * - Typing updates "Characters: N" and renders the report zero more times
 * - Choosing "Dark" sets the region's class to "theme-dark" and renders
 *   the report zero more times
 * - Switching back to "Light" restores "theme-light"
 * - The report table (caption "Sales report") is inside the "Report"
 *   region
 * - Clearing the note shows "Characters: 0"
 *
 * ========================================================================
 * HINTS (read only if you get stuck)
 * ========================================================================
 * 1. Start from a copy of SlowDashboard and check your tests fail the
 *    same way. Then refactor one piece of state at a time.
 * 2. Make two small components in this file, e.g. `NoteBox` and
 *    `ThemeFrame`. They don't need to be exported.
 * 3. ThemeFrame takes `{ children }: { children: ReactNode }` and puts
 *    `{children}` inside the section. Dashboard writes
 *    `<ThemeFrame><SlowReport ... /></ThemeFrame>`.
 * 4. TESTING: change a <select> with
 *    `await user.selectOptions(screen.getByRole("combobox", { name: "Theme" }), "dark")`.
 * 5. TESTING: count renders with `onReportRender={spy}`, then
 *    `expect(spy).toHaveBeenCalledTimes(1)` after the interaction.
 * 6. TESTING: React.Profiler can't tell you which component inside it
 *    rendered, only that something did. A spy prop on the one component
 *    you care about is more precise.
 *
 * ========================================================================
 * REACT CONCEPTS TO LEARN
 * ========================================================================
 * - What a state change re-renders
 * - State colocation: moving state down to where it's used
 * - Passing elements as `children` so a wrapper's state skips them
 * - Fixing performance with structure before reaching for memo
 *
 * ========================================================================
 * STRETCH GOALS
 * ========================================================================
 * - Add a "Highlight best region" checkbox that SlowReport does need.
 *   Where must that state live now? Is memo worth it then?
 * - Move the theme into a context provider that wraps the report. Does
 *   changing it re-render SlowReport? (Only components that read the
 *   context re-render.)
 */

// ReactNode is the type for a `children` prop. You will need it.
import { useState, type ReactNode, type ReactElement } from "react";

export type ReportRow = {
  region: string;
  sales: number;
};

/** PROVIDED: the report data. */
export const reportRows: ReportRow[] = [
  { region: "North", sales: 1200 },
  { region: "South", sales: 950 },
  { region: "East", sales: 1430 },
  { region: "West", sales: 880 },
];

export type SlowReportProps = {
  /** The rows to show. */
  rows: ReportRow[];
  /** Called every time SlowReport renders. For tests. */
  onRender?: () => void;
};

/**
 * PROVIDED: you don't need to change this.
 * Pretend this takes a long time to render. It is not memoized, and you
 * must not memoize it.
 */
export function SlowReport({ rows, onRender }: SlowReportProps) {
  onRender?.();
  return (
    <table>
      <caption>Sales report</caption>
      <thead>
        <tr>
          <th scope="col">Region</th>
          <th scope="col">Sales</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((row) => (
          <tr key={row.region}>
            <td>{row.region}</td>
            <td>{row.sales}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export type DashboardProps = {
  /** Passed to SlowReport as its `onRender` prop. */
  onReportRender?: () => void;
};

/**
 * PROVIDED: the slow "before" version. All state lives at the top, so
 * every change re-renders SlowReport. Use it to prove the problem.
 */
export function SlowDashboard({ onReportRender }: DashboardProps) {
  const [note, setNote] = useState("");
  const [theme, setTheme] = useState("light");
  return (
    <div>
      <label>
        Quick note <input value={note} onChange={(e) => setNote(e.target.value)} />
      </label>
      <p>Characters: {note.length}</p>
      <label>
        Theme{" "}
        <select value={theme} onChange={(e) => setTheme(e.target.value)}>
          <option value="light">Light</option>
          <option value="dark">Dark</option>
        </select>
      </label>
      <section aria-label="Report" className={`theme-${theme}`}>
        <SlowReport rows={reportRows} onRender={onReportRender} />
      </section>
    </div>
  );
}

export function Dashboard({ onReportRender }: DashboardProps): ReactElement {
  // TODO: build me, then make your tests pass.
  throw new Error("Not implemented: Dashboard");
}
