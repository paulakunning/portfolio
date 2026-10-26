import type { Metadata } from "next";
import { ContactCta } from "@/components/ContactCta";
import { PageHero } from "@/components/PageHero";
import { ProjectFilter } from "@/components/ProjectFilter";
import { projects } from "@/content/projects";
import { getDictionary } from "@/i18n/get-dictionary";
import { getLocale } from "@/i18n/server";
import { pageMetadata } from "@/lib/metadata";
import { toCardData } from "@/lib/projects";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const { meta } = getDictionary(locale);
  return pageMetadata({
    locale,
    path: "/proyectos",
    title: meta.projects.title,
    description: meta.projects.description,
  });
}

export default async function ProjectsPage() {
  const locale = await getLocale();
  const dictionary = getDictionary(locale);

  return (
    <>
      <PageHero>
        <h1 className="text-4xl md:text-5xl">{dictionary.projects.title}</h1>
      </PageHero>
      <section className="content-width py-16 md:py-20">
        <ProjectFilter
          locale={locale}
          projects={projects.map((project) => toCardData(project, locale))}
          labels={dictionary.projects}
        />
      </section>
      <ContactCta locale={locale} labels={dictionary.cta} />
    </>
  );
}
