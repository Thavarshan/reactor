/**
 * Exercise: Image Carousel
 * Level:    03 - State and Events
 * Topics:   index state, wrapping around with %, derived values, props that change
 *
 * ========================================================================
 * YOUR TASK
 * ========================================================================
 * Build an <ImageCarousel> that shows one image at a time, with
 * Previous and Next buttons that wrap around at the ends, and a row of
 * dots to jump straight to any image.
 *
 *     +----------------------------------+
 *     |                                  |
 *     |            (Forest)              |
 *     |                                  |
 *     +----------------------------------+
 *     Image 2 of 5
 *     [ Previous ]  [ Next ]
 *       o  ●  o  o  o
 *
 *     <ImageCarousel images={[{ src: "/1.jpg", alt: "Beach" }, ...]} />
 *
 * ========================================================================
 * BACKGROUND: AN INDEX IN STATE, AND WRAPPING AROUND
 * ========================================================================
 * The only thing the carousel needs to remember is WHICH image is
 * showing: a position (an "index") in the array, starting at 0. The
 * image itself, the "Image 2 of 5" text and which dot is current are
 * all worked out from that index.
 *
 * To wrap around, use the remainder operator `%`. It gives what's left
 * over after dividing:
 *
 *     7 % 5   ->  2
 *     5 % 5   ->  0      one past the end wraps to the start
 *
 * Going backwards from 0 needs care, because in JavaScript `-1 % 5` is
 * -1, not 4. Adding the length first keeps the number positive.
 *
 * PROPS CAN CHANGE. The parent may pass a shorter `images` list later,
 * while your state still holds an old index. useState only uses its
 * starting value on the FIRST render, so it won't reset by itself.
 * Your component has to cope when the index points past the end.
 *
 * ========================================================================
 * WHAT YOUR TESTS CAN FIND
 * ========================================================================
 * - A <section aria-label={label}> (role "region"), named "Image
 *   carousel" by default.
 * - Exactly one <img> with the current image's src and alt, found with
 *   getByRole("img", { name: "Forest" }).
 * - An element with role="status" with the text "Image 2 of 5".
 * - Buttons named "Previous" and "Next".
 * - One dot button per image, named "Go to image 1", "Go to image 2"...
 *   (aria-label). The current one has aria-current="true", the others
 *   have NO aria-current attribute.
 * - With no images: the text "No images", and no buttons or image.
 *
 * ========================================================================
 * THE RULES
 * ========================================================================
 * Your component must:
 * 1. Show the first image at first.
 * 2. Go to the next image on "Next", wrapping from the last to the first.
 * 3. Go to the previous image on "Previous", wrapping from the first to
 *    the last.
 * 4. Jump to image N when "Go to image N" is clicked.
 * 5. Show "Image N of TOTAL" and mark only the current dot with
 *    aria-current="true".
 * 6. Disable Previous and Next when there's only one image.
 * 7. Show "No images" (and no buttons) when `images` is empty.
 * 8. When `images` gets shorter and the current position no longer
 *    exists, show the LAST image, and keep Previous, Next and the dots
 *    working from there. When the position still exists, stay on it.
 *
 * You can assume:
 * - Each image has a non-empty `alt`.
 *
 * ========================================================================
 * EXAMPLES
 * ========================================================================
 *     5 images: Beach, Forest, Mountain, Desert, City
 *       Beach, "Image 1 of 5", dot 1 is current
 *       Next             ->  Forest, "Image 2 of 5"
 *       Previous         ->  Beach
 *       Previous         ->  City, "Image 5 of 5"      wrapped backwards
 *       Next             ->  Beach, "Image 1 of 5"     wrapped forwards
 *       "Go to image 3"  ->  Mountain
 *
 *     on image 5, the parent passes only the first 3 images
 *       ->  Mountain, "Image 3 of 3", dot 3 current
 *       Next             ->  Beach, "Image 1 of 3"
 *
 *     on image 2, the parent passes only the first 3 images
 *       ->  still "Image 2 of 3"
 *
 * ========================================================================
 * EDGE CASES TO TEST
 * ========================================================================
 * - A region named "Image carousel", or by the label prop
 * - First render: one img, "Beach" with src "/1.jpg", "Image 1 of 5"
 * - Next goes forward, Previous goes back
 * - Next on the last image wraps to the first
 * - Previous on the first image wraps to the last
 * - Five Nexts come back to "Image 1 of 5"
 * - One dot per image, and a dot jumps to its image
 * - Only the current dot has aria-current="true"
 * - One image: Previous and Next disabled, "Image 1 of 1"
 * - Two images: Previous and Next enabled
 * - No images: "No images", no buttons, no img
 * - The list shrinks below the position: the last image shows and
 *   Next wraps to the first. The list shrinks but the position still
 *   exists: it stays put
 *
 * ========================================================================
 * HINTS (read only if you get stuck)
 * ========================================================================
 * 1. One state: `const [index, setIndex] = useState(0);`.
 * 2. Handle the empty list first, with an early return.
 * 3. Next: `(current + 1) % count`. Previous:
 *    `(current - 1 + count) % count`.
 * 4. For rule 8, don't try to "fix" the state when props change. Work
 *    out a safe index on every render instead:
 *    `const current = Math.min(index, images.length - 1);` and use
 *    `current` everywhere, including in the click handlers.
 * 5. `aria-current={i === current ? "true" : undefined}` leaves the
 *    attribute out for the other dots.
 * 6. TESTING: to change props, use `rerender`:
 *    `const { rerender } = render(<ImageCarousel images={images} />);`
 *    then `rerender(<ImageCarousel images={images.slice(0, 3)} />)`. The
 *    component keeps its state between the two, just like in a real app.
 *
 * ========================================================================
 * REACT CONCEPTS TO LEARN
 * ========================================================================
 * - Keeping an index in state, and deriving everything else from it
 * - Wrapping with the % operator
 * - Why useState's starting value is only used once
 * - Coping with props that change (derive, don't sync)
 * - aria-current and role="status"
 *
 * ========================================================================
 * STRETCH GOALS
 * ========================================================================
 * - ArrowLeft and ArrowRight move between images while focus is inside
 *   the carousel.
 * - Autoplay every 5 seconds with a pause button (you'll need useEffect
 *   from level 06).
 * - Preload the next image so it appears without a delay.
 */

import type { ReactElement } from "react";

export type CarouselImage = {
  /** The image's url. */
  src: string;
  /** Alt text describing the image. */
  alt: string;
};

export type ImageCarouselProps = {
  /** The images to show, in order. */
  images: CarouselImage[];
  /** The carousel's accessible name. Default "Image carousel". */
  label?: string;
};

export function ImageCarousel({ images, label = "Image carousel" }: ImageCarouselProps): ReactElement {
  // TODO: build me, then make your tests pass.
  throw new Error("Not implemented: ImageCarousel");
}
