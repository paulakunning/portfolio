import { experience } from "@/content/experience";
import { getDictionary } from "@/i18n/get-dictionary";
import { getLocale } from "@/i18n/server";
import { formatPeriod } from "@/lib/dates";

export async function ExperienceList() {
  const locale = await getLocale();
  const { experience: labels } = getDictionary(locale);

  return (
    <section
      aria-labelledby="experience-title"
      className="bg-foreground text-background"
    >
      <div className="content-width py-20 md:py-28">
        <h2
          id="experience-title"
          className="text-4xl text-accent italic md:text-5xl"
        >
          {labels.title}
        </h2>
        <ol className="mt-12 flex flex-col gap-12">
          {experience.map((job) => (
            <li key={job.company} className="max-w-3xl">
              <h3 className="text-2xl">{job.company}</h3>
              <p className="mt-1 italic">{job.role[locale]}</p>
              <p className="mt-1 text-sm text-secondary">
                {formatPeriod(locale, job.start, job.end, labels.present)}
              </p>
              {job.description && (
                <p className="mt-4">{job.description[locale]}</p>
              )}
              {job.highlights && (
                <ul className="mt-4 flex list-disc flex-col gap-2 pl-5">
                  {job.highlights[locale].map((highlight) => (
                    <li key={highlight}>{highlight}</li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
