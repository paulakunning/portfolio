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
    <dl className="grid grid-cols-2 gap-x-8 gap-y-6">
      {facts.map(([term, value]) => (
        <div key={term} className="border-t border-line pt-3">
          <dt className="text-sm leading-[inherit] text-muted">{term}</dt>
          <dd className="mt-1">{value}</dd>
        </div>
      ))}
    </dl>
  );
}
