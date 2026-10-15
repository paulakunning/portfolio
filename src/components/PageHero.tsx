import type { ReactNode } from "react";

/** Dark top section every page starts with; the header sits on top of it. */
export function PageHero({ children }: { children: ReactNode }) {
  return (
    <section className="bg-foreground text-background">
      <div className="content-width pt-36 pb-20">{children}</div>
    </section>
  );
}
