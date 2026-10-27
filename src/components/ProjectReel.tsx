"use client";

import { useEffect, useRef, useSyncExternalStore, type ReactNode } from "react";
import {
  focusScrollOffset,
  parallaxOffset,
  reelHeight,
  reelProgress,
} from "@/lib/reel";
import { ChevronLeftIcon, ChevronRightIcon } from "./icons";

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
  /** The `<li>` cards; project cards carry `data-reel-card`. */
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
  const section = useRef<HTMLElement>(null);
  const strip = useRef<HTMLDivElement>(null);
  const list = useRef<HTMLUListElement>(null);
  const bar = useRef<HTMLSpanElement>(null);
  const hashHandled = useRef(false);

  // Plain DOM writes on scroll: no React state per frame.
  useEffect(() => {
    if (!pinned) return;
    const reel = section.current!;
    const track = strip.current!;
    const cards = [...reel.querySelectorAll<HTMLElement>("[data-reel-card]")];
    let distance = 0;
    let frame = 0;

    const update = () => {
      frame = 0;
      const progress = reelProgress(reel.getBoundingClientRect().top, distance);
      track.style.transform = `translate3d(${-progress * distance}px, 0, 0)`;
      bar.current!.style.setProperty("--p", String(progress));
      for (const card of cards) {
        const box = card.getBoundingClientRect();
        const drift = parallaxOffset(box.left + box.width / 2, innerWidth);
        card.style.setProperty("--px", `${drift.toFixed(1)}px`);
      }
    };

    const layout = () => {
      const size = reelHeight(
        track.offsetWidth,
        document.documentElement.clientWidth,
        innerHeight,
      );
      distance = size.distance;
      reel.style.height = `${size.height}px`;
      update();
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    // Tabbing into an off-screen card scrolls the page until it's centered.
    const onFocus = (event: FocusEvent) => {
      const target = event.target as HTMLElement;
      const item = target.closest<HTMLElement>("[data-reel-card]") ?? target;
      const offset =
        item.getBoundingClientRect().left - track.getBoundingClientRect().left;
      const top =
        reel.getBoundingClientRect().top +
        scrollY +
        focusScrollOffset(offset, item.offsetWidth, innerWidth, distance);
      scrollTo({ top, behavior: "instant" });
    };

    layout();
    // The browser scrolled to the #hash before the reel grew; go there again, once.
    if (!hashHandled.current) {
      hashHandled.current = true;
      // shortcut: ids are ASCII, so the hash isn't URI-decoded; decode it if an id ever isn't.
      const target = document.getElementById(location.hash.slice(1));
      if (
        target &&
        reel.compareDocumentPosition(target) & Node.DOCUMENT_POSITION_FOLLOWING
      ) {
        target.scrollIntoView();
      }
    }

    addEventListener("scroll", onScroll, { passive: true });
    addEventListener("resize", layout);
    track.addEventListener("focusin", onFocus);
    return () => {
      cancelAnimationFrame(frame);
      removeEventListener("scroll", onScroll);
      removeEventListener("resize", layout);
      track.removeEventListener("focusin", onFocus);
      reel.style.height = "";
      track.style.transform = "";
      for (const card of cards) card.style.removeProperty("--px");
    };
  }, [pinned]);

  function scrollList(direction: 1 | -1) {
    const card = list.current!.querySelector<HTMLElement>("[data-reel-card]")!;
    list.current!.scrollBy({
      left: direction * (card.offsetWidth + 16), // 16: the card gap
      behavior: matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "auto"
        : "smooth",
    });
  }

  return (
    <section
      ref={section}
      id="proyectos"
      aria-labelledby="featured-title"
      data-pinned={pinned || undefined}
      className="group relative py-20 data-pinned:py-0"
    >
      <div className="group-data-pinned:sticky group-data-pinned:top-0 group-data-pinned:flex group-data-pinned:h-svh group-data-pinned:items-center group-data-pinned:overflow-clip">
        <div
          ref={strip}
          data-reel-strip
          className="group-data-pinned:flex group-data-pinned:w-max group-data-pinned:items-center group-data-pinned:gap-[6vw] group-data-pinned:ps-edge group-data-pinned:pe-[8vw] group-data-pinned:pt-16 group-data-pinned:will-change-transform"
        >
          <div className="mb-8 max-w-[calc(36rem+var(--spacing-edge))] ps-edge pe-gutter group-data-pinned:m-0 group-data-pinned:shrink-0 group-data-pinned:basis-[min(30rem,30vw)] group-data-pinned:p-0">
            {intro}
          </div>
          {/* relative keeps the sr-only spans inside the scroller */}
          <ul
            ref={list}
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
        </div>
        <div
          aria-hidden="true"
          className="absolute bottom-8 left-1/2 hidden h-0.5 w-40 -translate-x-1/2 overflow-hidden rounded-[2px] bg-line group-data-pinned:block"
        >
          <span
            ref={bar}
            className="block h-full origin-left scale-x-[var(--p,0)] bg-primary"
          />
        </div>
      </div>
    </section>
  );
}
