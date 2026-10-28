import type { ReactNode } from "react";

/** Light dotted header every page starts with; the nav pill floats over it. */
export function PageHero({ children }: { children: ReactNode }) {
  return (
    <header className="dot-grid relative pt-36 pb-12">
      <div className="relative z-1 content-width [&_h1]:text-[clamp(2.75rem,6vw,5rem)] [&_h1]:tracking-[-0.035em]">
        {children}
      </div>
    </header>
  );
}
