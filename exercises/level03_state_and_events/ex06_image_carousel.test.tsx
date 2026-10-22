/**
 * Tests for exercises/level03_state_and_events/ex06_image_carousel.tsx
 *
 * Write your tests here first, run them and watch them fail, then build
 * the component until they pass. The "EDGE CASES TO TEST" section of the
 * exercise lists good cases to cover. Turn each `it.todo` into a real test.
 *
 * Run just this file:
 *     npm test -- ex06_image_carousel
 */

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import { ImageCarousel, type CarouselImage } from "./ex06_image_carousel";

const images: CarouselImage[] = [
  { src: "/1.jpg", alt: "Beach" },
  { src: "/2.jpg", alt: "Forest" },
  { src: "/3.jpg", alt: "Mountain" },
  { src: "/4.jpg", alt: "Desert" },
  { src: "/5.jpg", alt: "City" },
];

describe("ImageCarousel", () => {
  // Examples to get you started:
  //
  // it("shows the first image and Image 1 of 5", () => {
  //   render(<ImageCarousel images={images} />);
  //   expect(screen.getByRole("img", { name: "Beach" })).toHaveAttribute("src", "/1.jpg");
  //   expect(screen.getByRole("status")).toHaveTextContent("Image 1 of 5");
  // });
  //
  // it("wraps from the first image to the last with Previous", async () => {
  //   const user = userEvent.setup();
  //   render(<ImageCarousel images={images} />);
  //   await user.click(screen.getByRole("button", { name: "Previous" }));
  //   expect(screen.getByRole("img", { name: "City" })).toBeInTheDocument();
  //   expect(screen.getByRole("status")).toHaveTextContent("Image 5 of 5");
  // });

  it.todo("is a region named Image carousel, or by the label prop");
  it.todo("moves forward with Next and back with Previous");
  it.todo("wraps from the last image to the first with Next");
  it.todo("comes back to the start after five Nexts");
  it.todo("renders one dot per image, and a dot jumps to its image");
  it.todo("marks only the current dot with aria-current");
  it.todo("disables Previous and Next with only one image");
  it.todo("enables Previous and Next with two images");
  it.todo("shows No images and no buttons for an empty list");
  it.todo("shows the last image when the list gets shorter than the position");
  it.todo("keeps working after the list gets shorter");
  it.todo("stays put when the list gets shorter but the position still exists");
});
