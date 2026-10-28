"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import type { Category } from "@/content/types";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries/es";
import { formatMessage } from "@/i18n/format";
import { filterProjects, type ProjectCardData } from "@/lib/projects";
import { PageHero } from "./PageHero";
import { ProjectCard } from "./ProjectCard";

const filters: (Category | "all")[] = [
  "all",
  "web-design",
  "web-development",
  "branding",
];

type ProjectFilterProps = {
  locale: Locale;
  projects: ProjectCardData[];
  labels: Dictionary["projects"];
  /** The page's h1, shown beside the filters. */
  heading: ReactNode;
};

export function ProjectFilter({
  locale,
  projects,
  labels,
  heading,
}: ProjectFilterProps) {
  const [active, setActive] = useState<Category | "all">("all");
  const grid = useRef<HTMLUListElement>(null);
  const firstRun = useRef(true);
  const visible = filterProjects(projects, active);
  const plural = new Intl.PluralRules(locale).select(visible.length);
  const countLabel = plural === "one" ? labels.count.one : labels.count.other;

  // Reveal cards as they scroll in. Cards are hidden only here, so without JS
  // (or with reduced motion, see ProjectCard) they are all visible.
  useEffect(() => {
    const cards = grid.current?.querySelectorAll<HTMLElement>("article") ?? [];
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          (entry.target as HTMLElement).dataset.reveal = "shown";
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -10% 0px" },
    );
    for (const card of cards) {
      // On load, what is already on screen stays as it is.
      if (
        firstRun.current &&
        card.getBoundingClientRect().top < window.innerHeight
      ) {
        continue;
      }
      card.dataset.reveal = "hidden";
      observer.observe(card);
    }
    firstRun.current = false;
    return () => {
      observer.disconnect();
      // A tab switch mid-reveal must not strand a card hidden.
      for (const card of cards) {
        if (card.dataset.reveal === "hidden") card.dataset.reveal = "shown";
      }
    };
  }, [active]);

  return (
    <>
      <PageHero>
        <div className="grid items-end gap-x-12 gap-y-8 md:grid-cols-[1fr_auto]">
          {heading}
          <div className="flex flex-col items-start gap-3 md:items-end">
            <div
              role="group"
              aria-label={labels.filterLabel}
              className="flex flex-wrap gap-2"
            >
              {filters.map((filter) => (
                <button
                  key={filter}
                  type="button"
                  aria-pressed={active === filter}
                  onClick={() => setActive(filter)}
                  className="min-h-10 rounded-full border border-foreground/30 bg-background px-4.5 text-[0.9375rem] font-medium transition-colors hover:border-foreground aria-pressed:border-primary aria-pressed:bg-primary aria-pressed:text-white"
                >
                  {filter === "all" ? labels.all : labels.categories[filter]}
                </button>
              ))}
            </div>
            <p role="status" className="text-[0.9375rem] text-muted">
              {formatMessage(countLabel, { count: visible.length })}
            </p>
          </div>
        </div>
      </PageHero>
      <ul
        ref={grid}
        className="content-width grid gap-12 pt-8 pb-24 md:grid-cols-2 md:gap-x-[4vw] md:gap-y-16 md:pb-56 md:[&>:nth-child(even)]:translate-y-32"
      >
        {visible.map((project, index) => (
          <li key={project.slug}>
            <ProjectCard project={project} labels={labels} index={index} />
          </li>
        ))}
      </ul>
    </>
  );
}
