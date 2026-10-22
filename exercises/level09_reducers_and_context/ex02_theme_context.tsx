/**
 * Exercise: Theme Context
 * Level:    09 - Reducers and Context
 * Topics:   createContext, providers, use / useContext, custom hooks
 *           that guard a context, renderHook with a wrapper
 *
 * ========================================================================
 * YOUR TASK
 * ========================================================================
 * Share a light/dark theme with every component in an app, without
 * passing it down as a prop. Build four pieces:
 *
 * - <ThemeProvider>: owns the theme and shares it with its children.
 * - useTheme(): a hook that any component inside the provider can call.
 * - <ThemeToggle>: a button that switches the theme.
 * - <ThemeStatus>: a line of text that shows the theme.
 *
 *     Current theme: light
 *     [ Switch to dark theme ]
 *
 *     <ThemeProvider initialTheme="light">
 *       <ThemeStatus />
 *       <ThemeToggle />
 *     </ThemeProvider>
 *
 * ========================================================================
 * BACKGROUND: CONTEXT
 * ========================================================================
 * Normally data flows down through PROPS, one level at a time. When a
 * value is needed in many places, deep in the tree, passing it through
 * every level gets tiring. That is called "prop drilling".
 *
 * CONTEXT lets a component provide a value to everything below it, at
 * any depth:
 *
 *     const LanguageContext = createContext<string | null>(null);
 *
 *     function App() {
 *       return (
 *         <LanguageContext value="fr">
 *           <Page />          // anything in here can read "fr"
 *         </LanguageContext>
 *       );
 *     }
 *
 *     function Greeting() {
 *       const language = use(LanguageContext);   // "fr"
 *       return <p>{language === "fr" ? "Bonjour" : "Hello"}</p>;
 *     }
 *
 * `use` comes from "react" (useContext works too). A component reads
 * the value from the NEAREST provider above it. When that value
 * changes, every component reading it re-renders.
 *
 * The value passed to createContext (null here) is what a component
 * gets when there is NO provider above it.
 *
 * ========================================================================
 * WHAT YOUR TESTS CAN FIND
 * ========================================================================
 * - <ThemeStatus> renders a paragraph with the exact text
 *   "Current theme: light" (or "Current theme: dark").
 * - <ThemeToggle> renders a button. Its accessible name is
 *   "Switch to dark theme" when the theme is light, and
 *   "Switch to light theme" when the theme is dark. The ACCESSIBLE NAME
 *   is what a screen reader announces. For a button it is its text.
 * - <ThemeProvider> renders its children and nothing else.
 *
 * ========================================================================
 * THE RULES
 * ========================================================================
 * ThemeProvider must:
 * 1. Accept `children` and an optional `initialTheme` (default
 *    "light").
 * 2. Keep the theme in state, and provide { theme, setTheme,
 *    toggleTheme } to everything inside it.
 * 3. Give each ThemeProvider its own theme. A provider nested inside
 *    another one overrides it for the components inside.
 *
 * useTheme must:
 * 4. Return { theme, setTheme, toggleTheme } from the nearest
 *    ThemeProvider.
 * 5. Make setTheme(theme) switch to that theme, and toggleTheme() switch
 *    light to dark or dark to light.
 * 6. Throw an Error with the exact message
 *    "useTheme must be used inside a ThemeProvider" when there is no
 *    ThemeProvider above it.
 *
 * ThemeToggle and ThemeStatus must:
 * 7. Get the theme from useTheme, never from props.
 * 8. ThemeToggle switches the theme when clicked.
 *
 * You can assume:
 * - Themes are only ever "light" or "dark".
 *
 * ========================================================================
 * EXAMPLES
 * ========================================================================
 *     <ThemeProvider><ThemeStatus /><ThemeToggle /></ThemeProvider>
 *       shows "Current theme: light", button "Switch to dark theme"
 *       click the button  ->  "Current theme: dark",
 *                             button "Switch to light theme"
 *
 *     <ThemeProvider initialTheme="dark">...</ThemeProvider>
 *       shows "Current theme: dark"
 *
 *     <ThemeProvider>
 *       <ThemeStatus />                     "Current theme: light"
 *       <ThemeProvider initialTheme="dark">
 *         <ThemeStatus />                   "Current theme: dark"
 *       </ThemeProvider>
 *     </ThemeProvider>
 *
 *     <ThemeStatus /> with no provider  ->  throws
 *       "useTheme must be used inside a ThemeProvider"
 *
 * ========================================================================
 * EDGE CASES TO TEST
 * ========================================================================
 * - The default theme is light
 * - initialTheme="dark" starts dark
 * - Clicking the toggle twice comes back to light
 * - useTheme: setTheme("dark") then setTheme("dark") stays dark
 * - useTheme: toggleTheme() flips the theme
 * - Two sibling providers: toggling one doesn't change the other
 * - A nested provider overrides the outer one
 * - useTheme outside a provider throws the exact message
 *
 * ========================================================================
 * HINTS (read only if you get stuck)
 * ========================================================================
 * 1. Create the context once, at the top of the file, outside every
 *    component: createContext<ThemeContextValue | null>(null).
 * 2. In ThemeProvider, keep `theme` in useState and render
 *    <ThemeContext value={{ theme, setTheme, toggleTheme }}>.
 * 3. In useTheme, read the context. If it is null, there is no
 *    provider, so throw. Otherwise return it.
 * 4. TESTING: render the components inside a provider, the way an app
 *    would. To test the hook alone, give renderHook a `wrapper`:
 *        renderHook(() => useTheme(), { wrapper: ThemeProvider });
 *    To pass props to the provider, write a small wrapper:
 *        const wrapper = ({ children }: { children: ReactNode }) => (
 *          <ThemeProvider initialTheme="dark">{children}</ThemeProvider>
 *        );
 * 5. TESTING: React logs an error when a component throws. Silence it
 *    first, then expect the throw:
 *        vi.spyOn(console, "error").mockImplementation(() => {});
 *        expect(() => renderHook(() => useTheme())).toThrow("...");
 *    The afterEach in the test file removes the spy again.
 * 6. TESTING: with two providers on screen there are two status lines.
 *    getAllByText(/Current theme/) returns them in page order.
 *
 * ========================================================================
 * REACT CONCEPTS TO LEARN
 * ========================================================================
 * - createContext, the provider, and use / useContext
 * - The nearest provider wins
 * - Wrapping a context in a provider component and a custom hook
 * - Failing loudly when a provider is missing
 * - Testing hooks that need a provider (renderHook's wrapper option)
 *
 * ========================================================================
 * STRETCH GOALS
 * ========================================================================
 * - Make the whole page change colour: in ThemeProvider, set
 *   document.body.dataset.theme in an effect, and write some CSS for
 *   [data-theme="dark"].
 * - Start with the user's system setting:
 *   window.matchMedia("(prefers-color-scheme: dark)").matches.
 * - Wrap the context value in useMemo so consumers only re-render when
 *   the theme really changes. (Level 10 covers this.)
 */

import type { ReactNode } from 'react';
import { type ReactElement } from 'react';

export type Theme = 'light' | 'dark';

export type ThemeContextValue = {
  /** The current theme. */
  theme: Theme;
  /** Switches to the given theme. */
  setTheme: (theme: Theme) => void;
  /** Switches light to dark, or dark to light. */
  toggleTheme: () => void;
};

export type ThemeProviderProps = {
  /** The part of the app that can use the theme. */
  children: ReactNode;
  /** The theme to start with. Default "light". */
  initialTheme?: Theme;
};

export function ThemeProvider({
  children,
  initialTheme = 'light',
}: ThemeProviderProps): ReactElement {
  // TODO: build me, then make your tests pass.
  throw new Error('Not implemented: ThemeProvider');
}

export function useTheme(): ThemeContextValue {
  // TODO: implement me, then make your tests pass.
  throw new Error('Not implemented: useTheme');
}

export function ThemeToggle(): ReactElement {
  // TODO: build me, then make your tests pass.
  throw new Error('Not implemented: ThemeToggle');
}

export function ThemeStatus(): ReactElement {
  // TODO: build me, then make your tests pass.
  throw new Error('Not implemented: ThemeStatus');
}
