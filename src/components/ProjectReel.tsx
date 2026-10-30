"use client";

import { useEffect, useRef, useSyncExternalStore, type ReactNode } from "react";
import {
  focusScrollOffset,
  parallaxOffset,
  reelHeight,
  reelImageHeight,
  reelProgress,
} from "@/lib/reel";
import { ChevronLeftIcon, ChevronRightIcon } from "./icons";
import { Reveal } from "./Reveal";

const pinQuery =
  "(min-width: 900px) and (prefers-reduced-motion: no-preference)";

function subscribe(onChange: () => void) {
  const query = matchMedia(pinQuery);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}

const roundButton =
  "grid size-11.5 cursor-pointer place-items-center rounded-full border border-foreground/28 hover:border-foreground";

type ProjectReelProps = {
  intro: ReactNode;
  /** The `<li>` cards; project cards carry `data-reel-card`, their cover `data-reel-image`. */
  children: ReactNode;
  labels: { previous: string; next: string };
};

export function ProjectReel({ intro, children, labels }: ProjectReelProps) {
  // The server renders the carousel; the pinned reel needs a wide window and motion.
  const pinned = useSyncExternalStore(
    subscribe,
    () => matchMedia(pinQuery).matches,
    () => false,
  );
  const sectionRef = useRef<HTMLElement>(null);
  const stripRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const barRef = useRef<HTMLSpanElement>(null);
  const hashHandled = useRef(false);

  // Plain DOM writes on scroll: no React state per frame.
  useEffect(() => {
    if (!pinned) {
      // Hydration runs this once with the server's `false`; only a truly unpinned start
      // means the browser's own #hash scroll already stands.
      if (!matchMedia(pinQuery).matches) hashHandled.current = true;
      return;
    }
    const section = sectionRef.current!;
    const strip = stripRef.current!;
    const bar = barRef.current!;
    const cards = [
      ...section.querySelectorAll<HTMLElement>("[data-reel-card]"),
    ];
    let distance = 0;
    let frame = 0;

    const update = () => {
      const progress = reelProgress(
        section.getBoundingClientRect().top,
        distance,
      );
      strip.style.transform = `translate3d(${-progress * distance}px, 0, 0)`;
      bar.style.setProperty("--p", String(progress));
      // Read every rect, then write: no layout thrash between cards.
      const width = document.documentElement.clientWidth;
      const drifts = cards.map((card) => {
        const box = card.getBoundingClientRect();
        return parallaxOffset(box.left + box.width / 2, width);
      });
      for (const [i, card] of cards.entries()) {
        card.style.setProperty("--px", `${drifts[i]!.toFixed(1)}px`);
      }
    };

    const layout = () => {
      // Measure the cover at its natural height, then shrink it if the card would leave the screen.
      section.style.removeProperty("--reel-image");
      const card = cards[0]!;
      const image = card.querySelector<HTMLElement>("[data-reel-image]")!;
      const imageHeight = reelImageHeight(
        image.offsetHeight,
        card.offsetHeight - image.offsetHeight,
        window.innerHeight,
      );
      section.style.setProperty("--reel-image", `${imageHeight}px`);
      const size = reelHeight(
        strip.offsetWidth,
        document.documentElement.clientWidth,
        window.innerHeight,
      );
      distance = size.distance;
      section.style.height = `${size.height}px`;
      update();
    };

    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        update();
      });
    };

    // Tabbing into an off-screen card scrolls the page until it's centered.
    const onFocus = (event: FocusEvent) => {
      const target = event.target as HTMLElement;
      // Mouse focus must not move the page under the pointer (the click would be lost).
      if (!target.matches(":focus-visible")) return;
      const item = target.closest<HTMLElement>("[data-reel-card]") ?? target;
      const offset =
        item.getBoundingClientRect().left - strip.getBoundingClientRect().left;
      const top =
        section.getBoundingClientRect().top +
        window.scrollY +
        focusScrollOffset(
          offset,
          item.offsetWidth,
          document.documentElement.clientWidth,
          distance,
        );
      window.scrollTo({ top, behavior: "instant" });
    };

    layout();
    // The browser scrolled to the #hash before the reel grew; go there again, once.
    if (!hashHandled.current) {
      hashHandled.current = true;
      // shortcut: ids are ASCII, so the hash isn't URI-decoded; decode it if an id ever isn't.
      const target = document.getElementById(location.hash.slice(1));
      if (
        target &&
        section.compareDocumentPosition(target) &
          Node.DOCUMENT_POSITION_FOLLOWING
      ) {
        target.scrollIntoView();
      }
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", layout);
    strip.addEventListener("focusin", onFocus);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", layout);
      strip.removeEventListener("focusin", onFocus);
      section.style.height = "";
      section.style.removeProperty("--reel-image");
      strip.style.transform = "";
      for (const card of cards) card.style.removeProperty("--px");
    };
  }, [pinned]);

  function scrollList(direction: 1 | -1) {
    const list = listRef.current!;
    const card = list.querySelector<HTMLElement>("[data-reel-card]")!;
    list.scrollBy({
      left: direction * (card.offsetWidth + 16), // 16: the card gap
      behavior: matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "auto"
        : "smooth",
    });
  }

  return (
    <section
      ref={sectionRef}
      id="proyectos"
      aria-labelledby="featured-title"
      data-pinned={pinned || undefined}
      className="group relative -scroll-mt-22 py-20 data-pinned:py-0"
    >
      <div className="group-data-pinned:sticky group-data-pinned:top-0 group-data-pinned:flex group-data-pinned:h-svh group-data-pinned:items-center group-data-pinned:overflow-clip">
        <div
          ref={stripRef}
          data-reel-strip
          className="group-data-pinned:flex group-data-pinned:w-max group-data-pinned:items-center group-data-pinned:gap-[6vw] group-data-pinned:ps-edge group-data-pinned:pe-[8vw] group-data-pinned:pt-16 group-data-pinned:will-change-transform"
        >
          <Reveal className="mb-8 max-w-[calc(36rem+var(--spacing-edge))] ps-edge pe-gutter group-data-pinned:m-0 group-data-pinned:w-[min(30rem,30vw)] group-data-pinned:shrink-0 group-data-pinned:p-0">
            {intro}
          </Reveal>
          <Reveal>
            {/* relative keeps the sr-only spans inside the scroller */}
            <ul
              ref={listRef}
              data-reel-list
              className="relative flex snap-x snap-mandatory scroll-ps-edge scroll-pe-gutter [scrollbar-width:none] gap-4 overflow-x-auto ps-edge pe-gutter group-data-pinned:gap-[4vw] group-data-pinned:overflow-visible group-data-pinned:p-0 [&::-webkit-scrollbar]:hidden"
            >
              {children}
            </ul>
            <div className="mt-7 flex gap-2 ps-edge pe-gutter group-data-pinned:hidden">
              <button
                type="button"
                aria-label={labels.previous}
                onClick={() => scrollList(-1)}
                className={roundButton}
              >
                <ChevronLeftIcon width={18} height={18} strokeWidth={1.8} />
              </button>
              <button
                type="button"
                aria-label={labels.next}
                onClick={() => scrollList(1)}
                className={roundButton}
              >
                <ChevronRightIcon width={18} height={18} strokeWidth={1.8} />
              </button>
            </div>
          </Reveal>
        </div>
        <div
          aria-hidden="true"
          className="absolute bottom-8 left-1/2 hidden h-0.5 w-40 -translate-x-1/2 overflow-hidden rounded-[2px] bg-line group-data-pinned:block"
        >
          <span
            ref={barRef}
            className="block h-full origin-left scale-x-[var(--p,0)] bg-primary"
          />
        </div>
      </div>
    </section>
  );
}
