import type { ReactNode } from "react";

/** Light dotted header every page starts with; the nav pill floats over it. */
export function PageHero({ children }: { children: ReactNode }) {
  return (
    <header className="dot-grid relative pt-36 pb-12">
      <div className="relative z-1 content-width motion-safe:animate-enter">
        {children}
      </div>
    </header>
  );
}
