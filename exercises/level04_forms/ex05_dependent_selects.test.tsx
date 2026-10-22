/**
 * Tests for exercises/level04_forms/ex05_dependent_selects.tsx
 *
 * Write your tests here first, run them and watch them fail, then build
 * the component until they pass. The "EDGE CASES TO TEST" section of the
 * exercise lists good cases to cover. Turn each `it.todo` into a real test.
 *
 * Run just this file:
 *     npm test -- ex05_dependent_selects
 */

import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import { COUNTRIES, LocationPicker } from "./ex05_dependent_selects";

describe("LocationPicker", () => {
  // Examples to get you started:
  //
  // it("starts with the City select disabled", () => {
  //   render(<LocationPicker countries={COUNTRIES} />);
  //   expect(screen.getByRole("combobox", { name: "City" })).toBeDisabled();
  //   expect(screen.getByRole("status")).toHaveTextContent("Pick a country");
  // });
  //
  // it("lists the cities of the chosen country", async () => {
  //   const user = userEvent.setup();
  //   render(<LocationPicker countries={COUNTRIES} />);
  //   await user.selectOptions(screen.getByRole("combobox", { name: "Country" }), "Japan");
  //   const city = screen.getByRole("combobox", { name: "City" });
  //   const names = within(city).getAllByRole("option").map((o) => o.textContent);
  //   expect(names).toEqual(["Choose a city", "Tokyo", "Kyoto", "Osaka"]);
  // });

  it.todo("starts with both placeholders, City disabled and 'Pick a country'");
  it.todo("lists the placeholder and every country");
  it.todo("enables City and lists only the chosen country's cities");
  it.todo("shows 'You picked <city>, <country>' once both are chosen");
  it.todo("resets the city when the country changes");
  it.todo("resets a city name that both countries share");
  it.todo("disables City again when going back to 'Choose a country'");
});
