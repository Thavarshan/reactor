/**
 * Exercise: Temperature Converter
 * Level:    05 - Sharing State
 * Topics:   lifting state up, controlled child components, a single
 *           source of truth, handling invalid input
 *
 * ========================================================================
 * YOUR TASK
 * ========================================================================
 * Build two components. <TemperatureInput> is one labelled text box
 * that keeps NO state of its own. <TemperatureConverter> shows two of
 * them, Celsius and Fahrenheit, and keeps them in sync: type in either
 * one and the other shows the converted value.
 *
 *     Celsius    [ 37    ]
 *     Fahrenheit [ 98.6  ]
 *
 *     <TemperatureConverter />
 *
 * ========================================================================
 * BACKGROUND: LIFTING STATE UP
 * ========================================================================
 * Each component has its own state, and siblings can't see each
 * other's. When two components must change together, move the state
 * UP into their closest common parent. The parent passes the value
 * down as a prop, plus a function the child calls to ask for a change:
 *
 *     function Parent() {
 *       const [text, setText] = useState("");
 *       return (
 *         <>
 *           <Shout text={text} onTextChange={setText} />
 *           <p>Length: {text.length}</p>
 *         </>
 *       );
 *     }
 *
 *     function Shout({ text, onTextChange }: ShoutProps) {
 *       return <input value={text} onChange={(e) => onTextChange(e.target.value)} />;
 *     }
 *
 * `Shout` is now a CONTROLLED component: its parent decides what it
 * shows. The state lives in one place only, its "single source of
 * truth".
 *
 * Here, don't store both temperatures. Store only what the user
 * typed, and which box they typed it in. The other box is worked out
 * from that on every render.
 *
 * ========================================================================
 * WHAT YOUR TESTS CAN FIND
 * ========================================================================
 * Tests find elements by their ARIA role (what kind of thing it is) and
 * their accessible name (the text a screen reader reads out for it).
 * Your components must render exactly these:
 *
 * - <TemperatureInput label="Celsius" ... /> renders a label and an
 *   <input type="text"> named by the `label` prop (role "textbox").
 *   Use type="text", not type="number", so the user can type anything
 *   and you can handle bad input yourself.
 * - <TemperatureConverter /> renders two of them, named "Celsius" and
 *   "Fahrenheit", in that order.
 * - When the typed text is not a number, the text "Please enter a
 *   number" in an element with role="alert". Screen readers read
 *   alerts out at once.
 *
 * ========================================================================
 * THE RULES
 * ========================================================================
 * <TemperatureInput> must:
 * 1. Show the `value` prop in its text box.
 * 2. Call `onChange` with the box's new text on every keystroke.
 * 3. Keep no state of its own.
 *
 * <TemperatureConverter> must:
 * 4. Start with both boxes empty and no alert.
 * 5. Show, in the box the user is typing in, exactly what they typed.
 * 6. Show the converted temperature in the OTHER box, formatted with
 *    the provided `formatTemperature`:
 *      Fahrenheit = Celsius × 9 / 5 + 32
 *      Celsius    = (Fahrenheit − 32) × 5 / 9
 * 7. Leave the other box empty when the typed text is empty or only
 *    spaces (no alert).
 * 8. When the typed text (spaces trimmed) is not a number, leave the
 *    other box empty and show the "Please enter a number" alert.
 * 9. Let the user switch boxes at any time. Typing in the other box
 *    makes it the one being typed in.
 *
 * You can assume:
 * - "Not a number" means `Number(text.trim())` is not a finite number
 *   (`Number.isFinite` returns false).
 *
 * ========================================================================
 * EXAMPLES
 * ========================================================================
 * Each line shows what the user does, then what they should see.
 *
 *     <TemperatureConverter />
 *       type "100" in Celsius     ->  Fahrenheit shows "212"
 *       type "37"  in Celsius     ->  Fahrenheit shows "98.6"
 *       type "-40" in Celsius     ->  Fahrenheit shows "-40"
 *       type "212" in Fahrenheit  ->  Celsius shows "100"
 *       type "0"   in Fahrenheit  ->  Celsius shows "-17.8"
 *       type "abc" in Celsius     ->  Fahrenheit empty, alert shown
 *
 *     <TemperatureInput label="Celsius" value="" onChange={spy} />
 *       type "1"  ->  spy("1")      the box itself still shows ""
 *
 *     formatTemperature(98.60000000000001)  ->  "98.6"
 *     formatTemperature(-17.7777)           ->  "-17.8"
 *
 * ========================================================================
 * EDGE CASES TO TEST
 * ========================================================================
 * - TemperatureInput shows its value and is named by its label
 * - TemperatureInput calls onChange with the new text (with a fixed
 *   value of "", typing "12" calls it with "1" and then "2")
 * - Both boxes start empty, with no alert
 * - Celsius to Fahrenheit: 100 -> 212, 37 -> 98.6, -40 -> -40
 * - Fahrenheit to Celsius: 212 -> 100, 0 -> -17.8
 * - The typed box keeps the exact text ("37.0" stays "37.0")
 * - Not a number ("abc", "12abc"): other box empty, alert shown
 * - Empty or only spaces: other box empty, no alert
 * - Fixing bad input removes the alert
 * - Switching boxes: type in Celsius, then clear Fahrenheit and type
 *   there. Celsius now follows Fahrenheit
 *
 * ========================================================================
 * HINTS (read only if you get stuck)
 * ========================================================================
 * 1. Two pieces of state in the converter: the typed text, and which
 *    scale it was typed in ("celsius" or "fahrenheit").
 * 2. On every render: parse the text, convert it, and work out what
 *    each box shows. The box that matches the scale shows the text
 *    itself, and the other shows the converted, formatted number (or
 *    "").
 * 3. Give each TemperatureInput an onChange that sets BOTH pieces of
 *    state: `(text) => { setScale("celsius"); setText(text); }`.
 * 4. TESTING: `user.type` adds to what is already in a box. Use
 *    `await user.clear(box)` first when you want to replace the text.
 *    For the TemperatureInput tests, render it on its own with
 *    `onChange={vi.fn()}` and check the spy's calls.
 *
 * ========================================================================
 * REACT CONCEPTS TO LEARN
 * ========================================================================
 * - Lifting state up to the closest common parent
 * - Controlled components that get `value` and `onChange` from props
 * - A single source of truth, with everything else derived
 * - Validating input while rendering
 *
 * ========================================================================
 * STRETCH GOALS
 * ========================================================================
 * - Add a third box for Kelvin (K = C + 273.15).
 * - Show "Water would boil" when the temperature is 100 °C or more.
 * - Make the number of decimal places a prop of the converter.
 */

import type { ReactElement } from "react";

/**
 * PROVIDED: you don't need to change this.
 * Rounds to at most one decimal place and turns the number into text:
 * 98.60000000000001 -> "98.6", 212 -> "212", -17.7777 -> "-17.8".
 */
export function formatTemperature(value: number): string {
  return String(Math.round(value * 10) / 10);
}

export type TemperatureInputProps = {
  /** The label text, which is also the text box's accessible name. */
  label: string;
  /** The text to show in the box. */
  value: string;
  /** Called with the box's new text on every keystroke. */
  onChange: (text: string) => void;
};

export function TemperatureInput({ label, value, onChange }: TemperatureInputProps): ReactElement {
  // TODO: build me, then make your tests pass.
  throw new Error("Not implemented: TemperatureInput");
}

export function TemperatureConverter(): ReactElement {
  // TODO: build me, then make your tests pass.
  throw new Error("Not implemented: TemperatureConverter");
}
