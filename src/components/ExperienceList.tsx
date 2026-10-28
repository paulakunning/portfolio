import type { CSSProperties } from "react";
import { experience } from "@/content/experience";
import { getDictionary } from "@/i18n/get-dictionary";
import { getLocale } from "@/i18n/server";
import { formatPeriod } from "@/lib/dates";

export async function ExperienceList() {
  const locale = await getLocale();
  const { experience: labels } = getDictionary(locale);
  const rows = {
    "--count": experience.length,
    "--last": experience.length,
  } as CSSProperties;

  return (
    <section
      aria-labelledby="experience-title"
      style={rows}
      className="mx-auto grid max-w-[73rem] gap-x-[clamp(2rem,6vw,6rem)] gap-y-12 px-gutter pt-12 pb-28 md:grid-cols-[4fr_8fr]"
    >
      {/* Sticky is limited by its parent box, not its grid cell, so this wrapper ends at the last job; the title's negative margin (one line plus the 3rem row gap) lets it travel until its top meets that job. */}
      <div className="md:col-start-1 md:row-[1/var(--last)]">
        <h2
          id="experience-title"
          className="text-[clamp(2.25rem,4.4vw,3.5rem)] leading-[1.05] md:sticky md:top-28 md:-mb-[calc(1lh+3rem)]"
        >
          {labels.title}
        </h2>
      </div>
      <ol className="grid gap-y-12 md:col-start-2 md:row-span-(--count) md:row-start-1 md:grid-rows-subgrid">
        {experience.map((job) => (
          <li key={job.company} data-job className="border-t border-line pt-8">
            <p className="text-sm leading-[1.6] text-muted">
              {formatPeriod(locale, job.start, job.end, labels.present)}
            </p>
            <h3 className="mt-3 text-[clamp(1.75rem,2.6vw,2.25rem)] leading-[1.05]">
              {job.company}
            </h3>
            <p className="mt-[0.35rem] font-medium">{job.role[locale]}</p>
            {job.description && (
              <p className="mt-4 max-w-[40rem]">{job.description[locale]}</p>
            )}
            {job.highlights && (
              <ul className="mt-5 grid max-w-[40rem] gap-[0.6rem]">
                {job.highlights[locale].map((highlight) => (
                  <li key={highlight} className="relative pl-6">
                    <span
                      aria-hidden
                      className="absolute top-[0.8em] left-0 h-px w-3 bg-primary"
                    />
                    {highlight}
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ol>
    </section>
  );
}
