import type { Metadata } from "next";
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
      <ProjectFilter
        locale={locale}
        projects={projects.map((project) => toCardData(project, locale))}
        labels={dictionary.projects}
        heading={
          <h1 className="max-w-[14ch] text-[clamp(2.75rem,5vw,4.5rem)] tracking-[-0.035em]">
            {dictionary.projects.title}
          </h1>
        }
      />
    </>
  );
}
