import { projects } from "@/content/projects";
import { getDictionary } from "@/i18n/get-dictionary";
import { localizePath } from "@/i18n/routing";
import { getLocale } from "@/i18n/server";
import { toCardData } from "@/lib/projects";
import { ButtonLink } from "./ButtonLink";
import { ProjectFilter } from "./ProjectFilter";

export async function FeaturedProjects() {
  const locale = await getLocale();
  const { featured, projects: labels } = getDictionary(locale);

  return (
    <section
      aria-labelledby="featured-title"
      className="content-width py-20 md:py-28"
    >
      <h2
        id="featured-title"
        className="mb-10 text-center text-4xl text-primary italic md:text-5xl"
      >
        {featured.title}
      </h2>
      <ProjectFilter
        locale={locale}
        projects={projects.map((project) => toCardData(project, locale))}
        labels={labels}
        limit={6}
        headingLevel={3}
      />
      <div className="mt-14 text-center">
        <ButtonLink href={localizePath(locale, "/proyectos")}>
          {featured.viewAll}
        </ButtonLink>
      </div>
    </section>
  );
}
