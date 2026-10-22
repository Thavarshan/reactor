/**
 * Exercise: Dependent Selects
 * Level:    04 - Forms
 * Topics:   controlled <select>, one input depending on another, resetting
 *           state in an event handler
 *
 * ========================================================================
 * YOUR TASK
 * ========================================================================
 * Build a <LocationPicker> with two drop-downs. The first picks a
 * country. The second picks a city, and only lists the cities of the
 * chosen country. Changing the country empties the city choice.
 *
 *     Country [ Sri Lanka      v ]
 *     City    [ Kandy          v ]
 *
 *     You picked Kandy, Sri Lanka
 *
 *     <LocationPicker countries={COUNTRIES} />
 *
 * ========================================================================
 * BACKGROUND: CONTROLLED SELECTS
 * ========================================================================
 * A <select> is controlled just like a text input: `value` says which
 * option is chosen, and `onChange` tells you the user picked another
 * one. The chosen option's `value` is in `event.target.value`:
 *
 *     const [size, setSize] = useState("");
 *
 *     <select value={size} onChange={(e) => setSize(e.target.value)}>
 *       <option value="">Choose a size</option>
 *       <option value="S">Small</option>
 *       <option value="L">Large</option>
 *     </select>
 *
 * The first option, with the empty value "", acts as a placeholder
 * meaning "nothing chosen yet".
 *
 * ========================================================================
 * BACKGROUND: WHEN ONE CHOICE DEPENDS ON ANOTHER
 * ========================================================================
 * When the user changes one thing, other state sometimes has to change
 * with it. Do both updates in the SAME event handler. You can call
 * several setters one after the other, and React re-renders once:
 *
 *     function handleShopChange(newShop: string) {
 *       setShop(newShop);
 *       setBasket([]); // a new shop starts with an empty basket
 *     }
 *
 * ========================================================================
 * WHAT YOUR TESTS CAN FIND
 * ========================================================================
 * Tests find elements by their ARIA role (what kind of thing it is) and
 * their accessible name (the text a screen reader reads out for it).
 * Your component must render exactly these:
 *
 * - A <select> labelled "Country" (role "combobox"). Its first option
 *   is "Choose a country" with value "", then one option per country,
 *   with the country name as both its text and its value.
 * - A <select> labelled "City" (role "combobox"). Its first option is
 *   "Choose a city" with value "", then one option per city of the
 *   chosen country, with the city name as text and value.
 * - An element with role="status" that shows one of:
 *      "Pick a country"                (no country chosen)
 *      "Pick a city in Sri Lanka"      (a country but no city)
 *      "You picked Kandy, Sri Lanka"   (both chosen)
 *
 * ========================================================================
 * THE RULES
 * ========================================================================
 * Your component must:
 * 1. Start with no country and no city chosen (both selects show their
 *    placeholder).
 * 2. Disable the "City" select (the HTML `disabled` attribute) while no
 *    country is chosen.
 * 3. List only the chosen country's cities in the "City" select, in
 *    the order they appear in the data.
 * 4. Reset the city to "Choose a city" every time the country changes,
 *    even when the new country has a city with the same name.
 * 5. Going back to "Choose a country" disables "City" again and clears
 *    the city.
 * 6. Show the right message in the status element.
 *
 * You can assume:
 * - Country names are unique, and city names are unique within one
 *   country (two countries can share a city name, like "Perth").
 * - Every country has at least one city.
 *
 * ========================================================================
 * EXAMPLES
 * ========================================================================
 * Each line shows what the user does, then what they should see.
 *
 *     <LocationPicker countries={COUNTRIES} />
 *       "City" disabled, "Pick a country"
 *       choose "Japan"      ->  "City" lists Tokyo, Kyoto, Osaka
 *                               "Pick a city in Japan"
 *       choose "Kyoto"      ->  "You picked Kyoto, Japan"
 *       choose "Sri Lanka"  ->  "City" back to "Choose a city"
 *                               "Pick a city in Sri Lanka"
 *
 *     choose "Australia", then "Perth", then "United Kingdom"
 *       ->  "City" shows "Choose a city", not Perth   rule 4
 *
 * ========================================================================
 * EDGE CASES TO TEST
 * ========================================================================
 * - At the start: both placeholders, "City" disabled, "Pick a country"
 * - The country select lists the placeholder plus every country
 * - Choosing a country enables "City" and lists only its cities
 * - Choosing a city shows "You picked <city>, <country>"
 * - Changing the country resets the city
 * - A city name shared by both countries is still reset
 * - Going back to "Choose a country" disables "City" again
 *
 * ========================================================================
 * HINTS (read only if you get stuck)
 * ========================================================================
 * 1. Two pieces of state: the country name and the city name (both ""
 *    at first). The list of cities is worked out from the country.
 * 2. `countries.find((c) => c.name === country)?.cities ?? []` gives
 *    the cities of the chosen country, or an empty list.
 * 3. Rule 4 belongs in the country's change handler: set the country
 *    and set the city to "" right there. You don't need useEffect.
 * 4. TESTING: `await user.selectOptions(select, "Japan")` picks an
 *    option. `expect(select).toHaveValue("")` checks the chosen value.
 *    List the options with
 *    `within(select).getAllByRole("option").map((o) => o.textContent)`.
 *
 * ========================================================================
 * REACT CONCEPTS TO LEARN
 * ========================================================================
 * - Controlled <select> elements
 * - Deriving options from other state
 * - Updating related state together in one event handler
 * - Why "reset X when Y changes" belongs in the handler, not an effect
 *
 * ========================================================================
 * STRETCH GOALS
 * ========================================================================
 * - Add an `onChange` prop called with `{ country, city }` once both
 *   are chosen.
 * - Add a third level (country -> city -> district).
 * - Group the countries by continent with <optgroup>.
 */

import type { ReactElement } from 'react';

export type Country = {
  /** The country's name, shown and used as its option value. */
  name: string;
  /** The country's cities, in display order. */
  cities: string[];
};

/**
 * PROVIDED: you don't need to change this.
 * Sample data for your tests and the playground. Note that "Perth" is
 * in two countries.
 */
export const COUNTRIES: Country[] = [
  { name: 'Sri Lanka', cities: ['Colombo', 'Kandy', 'Galle'] },
  { name: 'Japan', cities: ['Tokyo', 'Kyoto', 'Osaka'] },
  { name: 'Australia', cities: ['Sydney', 'Perth', 'Melbourne'] },
  { name: 'United Kingdom', cities: ['London', 'Perth', 'Edinburgh'] },
];

export type LocationPickerProps = {
  /** The countries to choose from, each with its cities. */
  countries: Country[];
};

export function LocationPicker({
  countries,
}: LocationPickerProps): ReactElement {
  // TODO: build me, then make your tests pass.
  throw new Error('Not implemented: LocationPicker');
}
