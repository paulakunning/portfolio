"use client";

import type { ReactNode } from "react";

// A ref, not an effect in a parent: it runs once this block has hydrated, so
// React never finds an attribute it didn't render.
function hideUntilSeen(block: HTMLDivElement) {
  const observer = new IntersectionObserver(
    ([entry]) => {
      if (!entry!.isIntersecting) return;
      block.dataset.reveal = "shown";
      observer.disconnect();
    },
    // Everything above the screen counts too: jumping past a block still shows it
    // (the sticky Experiencia title pokes out of its box).
    { rootMargin: "100000px 0px -10% 0px" },
  );
  // A frame later: on client navigation, Next moves the scroll after refs attach.
  const frame = requestAnimationFrame(() => {
    // On screen, above it, or already seen (Activity keeps a page we left and shows it again on back).
    if (
      block.dataset.reveal === "shown" ||
      block.getBoundingClientRect().top < window.innerHeight
    ) {
      block.dataset.reveal = "shown";
      return;
    }
    block.dataset.reveal = "hidden";
    observer.observe(block);
  });
  return () => {
    cancelAnimationFrame(frame);
    observer.disconnect();
  };
}

type RevealProps = { className?: string; children: ReactNode };

/**
 * Fades a block in the first time it scrolls into view, with the project
 * cards' motion. Hidden only by JS, so without it (or with reduced motion,
 * see globals.css) the block is always visible.
 */
export function Reveal({ className, children }: RevealProps) {
  return (
    <div
      ref={hideUntilSeen}
      className={className ? `reveal ${className}` : "reveal"}
    >
      {children}
    </div>
  );
}
