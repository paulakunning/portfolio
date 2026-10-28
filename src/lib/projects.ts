import type { StaticImageData } from "next/image";
import { projects } from "@/content/projects";
import type { Category, Project } from "@/content/types";
import type { Locale } from "@/i18n/config";
import { localizePath } from "@/i18n/routing";

/** A project with its text already in one language, ready for client components. */
export type ProjectCardData = {
  slug: string;
  name: string;
  href: string;
  categories: Category[];
  tools: string[];
  conceptual: boolean;
  role: string;
  year: number;
  summary: string;
  cover: { src: StaticImageData; alt: string };
};

export function toCardData(project: Project, locale: Locale): ProjectCardData {
  return {
    slug: project.slug,
    name: project.name,
    href: localizePath(locale, `/proyectos/${project.slug}`),
    categories: project.categories,
    tools: project.tools,
    conceptual: project.conceptual ?? false,
    role: project.role[locale],
    year: project.year,
    summary: project.summary[locale],
    cover: { src: project.cover.src, alt: project.cover.alt[locale] },
  };
}

export function filterProjects<T extends { categories: readonly Category[] }>(
  items: readonly T[],
  category: Category | "all",
): T[] {
  return category === "all"
    ? [...items]
    : items.filter((item) => item.categories.includes(category));
}

export function getProject(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

/** The project after `slug`; the last one wraps around to the first. */
export function getNextProject(
  slug: string,
  list: readonly Project[] = projects,
): Project | undefined {
  const index = list.findIndex((project) => project.slug === slug);
  if (index === -1) return undefined;
  return list[(index + 1) % list.length];
}
