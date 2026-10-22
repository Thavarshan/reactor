# reactor

[![tests](https://github.com/Thavarshan/reactor/actions/workflows/tests.yml/badge.svg)](https://github.com/Thavarshan/reactor/actions/workflows/tests.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

A React learning playground: 82 exercises that start with the modern
JavaScript React relies on and build up to accessible components, data
fetching, React 19's concurrent features and small apps. You solve them
**test-first**.

Each exercise is a stub component, hook or function that just throws
`Not implemented`. Above it, a comment explains the task in plain
language: what to build, the exact rules, worked examples, edge cases to
test, hints and stretch goals. See [How to read an exercise](#how-to-read-an-exercise).
Next to it is a test file with a list of `it.todo`s waiting to become your
tests.

New to the jargon? [GLOSSARY.md](GLOSSARY.md) explains terms like *props*,
*state*, *re-render*, *side effect* and *accessible name* in plain words.

## Requirements

- [Node.js](https://nodejs.org/) 22.22 or newer (some tools need it)
- Everything else installs with `npm install`:
  - [React](https://react.dev/) 19 and [TypeScript](https://www.typescriptlang.org/)
  - [Vitest](https://vitest.dev/): the test runner
  - [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
    and [user-event](https://testing-library.com/docs/user-event/intro/): render
    components and interact with them like a user would
  - [MSW](https://mswjs.io/): a fake server for the data-fetching exercises
  - [Vite](https://vite.dev/): the browser playground
  - [Tailwind CSS](https://tailwindcss.com/) and [shadcn/ui](https://ui.shadcn.com/):
    ready-made, good-looking components for the playground

## Setup

```bash
npm install
npm test
```

`npm test` starts Vitest in **watch mode**: it re-runs the affected tests every
time you save. Press `q` to quit.

### VS Code

Install the recommended **Vitest** extension (VS Code suggests it when you open
the folder). Then open the **Testing** panel (the flask icon) to run or debug a
single test with one click.

### See your component in a browser

```bash
npm run dev
```

Open the address it prints, then edit `playground/App.tsx` to render the
component you're working on. The page updates every time you save.

The playground uses [shadcn/ui](https://ui.shadcn.com/) for its look. The
components live in `playground/components/ui` and import with
`import { Button } from "@/components/ui/button"`. Add more with
`npx shadcn@latest add dropdown-menu`. They're only for the playground: the
exercises themselves use plain HTML elements, so their tests can find
everything by role and name.

## Workflow for each exercise

1. **Read** the level's `README.md`, then the exercise, e.g.
   `exercises/level03_state_and_events/ex01_counter.tsx`.
2. **Write tests** in the file next to it,
   `ex01_counter.test.tsx`. Turn each `it.todo(...)` into a real test. The
   commented-out examples at the top show how to start.
3. **Run the tests and watch them fail** (red). Until you build the
   component, it throws `Not implemented`, which is expected:
   `npm test -- ex01_counter`
4. **Build** the component until your tests pass (green).
5. **Refactor**, then try the stretch goals.

Try not to peek at the HINTS section until you've been stuck for a while.

### How to read an exercise

Every exercise has the same sections, in this order:

| Section | What it tells you |
| --- | --- |
| **YOUR TASK** | What to build, with a small sketch of the UI and one usage example. Start here. |
| **BACKGROUND** (most exercises) | The new idea explained with a small example that isn't the answer. |
| **WHAT YOUR TESTS CAN FIND** | The exact roles, names and labels your component must render. Tests find elements the way a user or screen reader would, so this is the contract between your component and its tests. |
| **THE RULES** | A numbered checklist of *everything* the component must do. "You can assume" lists what you don't need to handle. |
| **EXAMPLES** | What the user does, and what they should see. |
| **EDGE CASES TO TEST** | Ready-made test ideas with expected results. Each matches an `it.todo` in the test file. |
| **HINTS** | From a gentle nudge to nearly the answer, including how to test the tricky parts. |
| **REACT CONCEPTS TO LEARN** | The React features this exercise practises. |
| **STRETCH GOALS** | Optional extras once your tests pass. |

When you're unsure what the component should do, **THE RULES** is the source
of truth.

### Useful commands

```bash
npm test                         # watch mode: re-runs tests as you save
npm test -- level04              # only tests whose path matches "level04"
npm test -- ex01_counter         # one exercise
npm run test:run                 # run everything once and exit
npm run coverage                 # coverage report
npm run typecheck                # TypeScript type checking
npm run dev                      # browser playground
```

### Testing tips

- **Find elements like a user would:** prefer
  `screen.getByRole("button", { name: "Save" })` and
  `screen.getByLabelText("Email")` over class names or test IDs.
- **`getBy` vs `queryBy` vs `findBy`:** `getBy...` throws if the element is
  missing. `queryBy...` returns `null` (use it to check something is *not*
  there). `findBy...` waits for it to appear (use it with `await` after
  anything asynchronous).
- **Interact with `user-event`:** `const user = userEvent.setup()`, then
  `await user.click(...)` and `await user.type(...)`. Always `await` them.
- **Spy on callbacks:** `const onSave = vi.fn()`, then
  `expect(onSave).toHaveBeenCalledWith(...)`.
- **Timers:** `vi.useFakeTimers()` replaces the real clock with one you move
  by hand: `act(() => { vi.advanceTimersByTime(1000); })`. Use `fireEvent`
  instead of `userEvent` when a test checks an exact time such as "not yet at
  299 ms". `user-event` needs `vi.useFakeTimers({ shouldAdvanceTime: true })` and
  `userEvent.setup({ advanceTimers: vi.advanceTimersByTime })`, but then real
  time leaks into the fake clock, so exact checks can fail at random.
- **Fake server:** `server.use(http.get("/api/...", () => HttpResponse.json(...)))`.
  See `test/server.ts`.

## Structure

```text
reactor/
├── exercises/
│   ├── level00_javascript/
│   │   ├── README.md                    level overview: concepts covered
│   │   ├── ex01_array_methods.ts        exercise stub + instructions
│   │   ├── ex01_array_methods.test.ts   your tests go here
│   │   └── ...
│   └── level01_jsx_and_components/ ... level13_apps/
├── playground/                          browser playground (npm run dev)
│   └── components/ui/                   shadcn/ui components
├── test/
│   ├── setup.ts                         runs before every test file
│   └── server.ts                        the fake server for fetch tests
├── vite.config.ts                       Vite + Vitest configuration
└── tsconfig.json
```

## Curriculum

| Level | Topic | Exercises |
| --- | --- | --- |
| 00 | **Modern JavaScript** for React | array_methods, destructuring_and_spread, nested_immutable_updates, closures, promises_and_async, debounce_and_throttle |
| 01 | **JSX and components** | greeting, product_card, unread_badge, todo_list_view, user_table, status_badge |
| 02 | **Props and composition** | button, avatar, card, icon_button, list_with_render_prop, page_layout |
| 03 | **State and events** | counter, toggle_switch, character_count, accordion, star_rating, image_carousel |
| 04 | **Forms** | controlled_input, signup_form, checkbox_group, search_filter, dependent_selects, dynamic_fields |
| 05 | **Sharing state** between components | temperature_converter, filterable_product_table, shopping_cart, controlled_tabs, todo_app, selection_list |
| 06 | **Effects and refs** | document_title, stopwatch, inline_edit, dropdown_click_outside, window_size, debounced_search |
| 07 | **Fetching data** | user_profile, retry_on_error, stale_responses, pagination, create_post_form, optimistic_like |
| 08 | **Custom hooks** | use_toggle, use_local_storage, use_debounced_value, use_previous, use_interval, use_fetch |
| 09 | **Reducers and context** | todo_reducer, theme_context, auth_context, cart_context, undo_redo |
| 10 | **Performance** | memo_list_item, use_memo, use_callback, key_bugs, virtualized_list, state_colocation |
| 11 | **Accessible UI patterns** | modal_dialog, tabs_keyboard, combobox, toast_notifications, error_boundary, menu_button |
| 12 | **Concurrent React** (React 19) | use_transition_tabs, use_deferred_value, lazy_and_suspense, use_with_suspense, form_actions, use_optimistic |
| 13 | **Small apps** | kanban_board, multi_step_form, infinite_feed, router_app, notes_app |

Work through the levels in order, since later levels assume earlier concepts.
Within a level, exercises get harder as the numbers go up.

## Tracking progress

- [ ] Level 00: Modern JavaScript (0/6)
- [ ] Level 01: JSX and components (0/6)
- [ ] Level 02: Props and composition (0/6)
- [ ] Level 03: State and events (0/6)
- [ ] Level 04: Forms (0/6)
- [ ] Level 05: Sharing state (0/6)
- [ ] Level 06: Effects and refs (0/6)
- [ ] Level 07: Fetching data (0/6)
- [ ] Level 08: Custom hooks (0/6)
- [ ] Level 09: Reducers and context (0/5)
- [ ] Level 10: Performance (0/6)
- [ ] Level 11: Accessible UI patterns (0/6)
- [ ] Level 12: Concurrent React (0/6)
- [ ] Level 13: Small apps (0/5)

## License

[MIT](LICENSE) © Jerome Thayananthajothy
