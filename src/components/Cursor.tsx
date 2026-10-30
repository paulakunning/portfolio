"use client";

import { useEffect, useRef } from "react";

const ease = "ease-[cubic-bezier(0.2,0.8,0.2,1)]";

/**
 * Mouse only: a Figma-style arrow that turns into a "Ver" disc over `data-cursor="view"`
 * and goes light over `data-cursor="dark"`, plus a soft glow behind the content.
 * Fields keep the native caret.
 */
export function Cursor({ view }: { view: string }) {
  const cursorRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  // Plain DOM writes per pointermove: no React state.
  useEffect(() => {
    if (!matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    const cursor = cursorRef.current!;
    const glow = glowRef.current!;
    const root = document.documentElement;
    let x = 0;
    let y = 0;
    let inside = false;

    const update = () => {
      const target = document.elementFromPoint(x, y);
      const field = !!target?.closest("input, textarea, select");
      const zone =
        target?.closest<HTMLElement>("[data-cursor]")?.dataset.cursor;
      cursor.dataset.zone = zone ?? "";
      cursor.toggleAttribute("data-visible", inside && !field);
      glow.toggleAttribute("data-visible", inside && !zone);
    };
    const onMove = (event: PointerEvent) => {
      x = event.clientX;
      y = event.clientY;
      inside = true;
      cursor.style.transform =
        glow.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      update();
    };
    const onLeave = () => {
      inside = false;
      update();
    };

    root.dataset.customCursor = "";
    window.addEventListener("pointermove", onMove, { passive: true });
    // The page, and the pinned reel, move under a still mouse.
    window.addEventListener("scroll", update, { passive: true });
    root.addEventListener("pointerleave", onLeave);
    return () => {
      delete root.dataset.customCursor;
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("scroll", update);
      root.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <>
      <div
        ref={cursorRef}
        aria-hidden="true"
        data-cursor-arrow
        className="group pointer-events-none fixed top-0 left-0 z-100 opacity-0 transition-opacity duration-200 data-visible:opacity-100 motion-reduce:transition-none"
      >
        <svg
          viewBox="0 0 24 24"
          className={`absolute -top-[3px] -left-1 size-6 origin-[4px_3px] transition-[scale,opacity] duration-250 group-data-[zone=view]:scale-0 group-data-[zone=view]:opacity-0 motion-reduce:transition-none ${ease}`}
        >
          <path
            d="M4 3 20 10.5 12.5 12.5 10.5 20Z"
            className="fill-primary stroke-white stroke-[1.5] transition-[fill,stroke] duration-200 [stroke-linejoin:round] group-data-[zone=dark]:fill-background group-data-[zone=dark]:stroke-primary-deep motion-reduce:transition-none"
          />
        </svg>
        <span
          className={`absolute grid size-18 -translate-1/2 scale-0 place-items-center rounded-full bg-primary text-sm/none font-medium text-white transition-[scale] duration-300 group-data-[zone=view]:scale-100 motion-reduce:transition-none ${ease}`}
        >
          {view}
        </span>
      </div>
      {/* Behind everything (-z-1): photos, cards and the footer cover it. */}
      <div
        ref={glowRef}
        aria-hidden="true"
        data-cursor-glow
        className="pointer-events-none fixed top-0 left-0 -z-1 -mt-84 -ml-84 size-168 bg-[radial-gradient(closest-side,rgb(109_78_104/0.16),transparent)] opacity-0 transition-opacity duration-600 data-visible:opacity-100 motion-reduce:hidden"
      />
    </>
  );
}
