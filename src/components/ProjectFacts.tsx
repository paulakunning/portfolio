import type { Project } from "@/content/types";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries/es";

type ProjectFactsProps = {
  project: Project;
  locale: Locale;
  labels: Dictionary["projects"];
};

export function ProjectFacts({ project, locale, labels }: ProjectFactsProps) {
  const facts = [
    [labels.detail.role, project.role[locale]],
    [labels.detail.year, String(project.year)],
    [
      labels.detail.services,
      project.categories
        .map((category) => labels.categories[category])
        .join(", "),
    ],
    [labels.detail.tools, project.tools.join(", ")],
  ];

  return (
    <dl className="grid gap-6 border-y border-foreground/15 py-8 sm:grid-cols-2 lg:grid-cols-4">
      {facts.map(([term, value]) => (
        <div key={term}>
          <dt className="text-xs font-semibold tracking-wide text-primary uppercase">
            {term}
          </dt>
          <dd className="mt-1">{value}</dd>
        </div>
      ))}
    </dl>
  );
}
