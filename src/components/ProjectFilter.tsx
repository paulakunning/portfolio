"use client";

import { useState } from "react";
import type { Category } from "@/content/types";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries/es";
import { formatMessage } from "@/i18n/format";
import { filterProjects, type ProjectCardData } from "@/lib/projects";
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
  limit?: number;
  /** 3 when the grid sits under a section h2, as on the home page. */
  headingLevel?: 2 | 3;
};

export function ProjectFilter({
  locale,
  projects,
  labels,
  limit,
  headingLevel = 2,
}: ProjectFilterProps) {
  const [active, setActive] = useState<Category | "all">("all");
  const visible = filterProjects(projects, active, limit);
  const plural = new Intl.PluralRules(locale).select(visible.length);
  const countLabel = plural === "one" ? labels.count.one : labels.count.other;

  return (
    <>
      <div
        role="group"
        aria-label={labels.filterLabel}
        className="flex flex-wrap justify-center gap-3"
      >
        {filters.map((filter) => (
          <button
            key={filter}
            type="button"
            aria-pressed={active === filter}
            onClick={() => setActive(filter)}
            className="rounded-full bg-primary px-6 py-2 text-sm font-medium tracking-wide text-background uppercase transition-colors hover:bg-primary/85 aria-pressed:bg-foreground"
          >
            {filter === "all" ? labels.all : labels.categories[filter]}
          </button>
        ))}
      </div>
      <p role="status" className="sr-only">
        {formatMessage(countLabel, { count: visible.length })}
      </p>
      <ul className="mt-12 grid gap-x-8 gap-y-14 md:grid-cols-2 lg:grid-cols-3">
        {visible.map((project) => (
          <li key={project.slug}>
            <ProjectCard
              project={project}
              labels={labels}
              headingLevel={headingLevel}
            />
          </li>
        ))}
      </ul>
    </>
  );
}
