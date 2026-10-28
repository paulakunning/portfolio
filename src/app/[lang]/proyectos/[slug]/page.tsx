import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ButtonLink } from "@/components/ButtonLink";
import { PageHero } from "@/components/PageHero";
import { ProjectFacts } from "@/components/ProjectFacts";
import { ProjectGallery } from "@/components/ProjectGallery";
import { ProjectNav } from "@/components/ProjectNav";
import { projects } from "@/content/projects";
import { getDictionary } from "@/i18n/get-dictionary";
import { getLocale } from "@/i18n/server";
import { pageMetadata } from "@/lib/metadata";
import { getNextProject, getProject } from "@/lib/projects";

export function generateStaticParams() {
  return projects.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/[lang]/proyectos/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  const locale = await getLocale();
  const metadata = pageMetadata({
    locale,
    path: `/proyectos/${slug}`,
    title: project.name,
    description: project.summary[locale],
  });
  return {
    ...metadata,
    openGraph: { ...metadata.openGraph, images: [project.cover.src.src] },
  };
}

export default async function ProjectPage({
  params,
}: PageProps<"/[lang]/proyectos/[slug]">) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();
  const locale = await getLocale();
  const { projects: labels, common } = getDictionary(locale);
  const next = getNextProject(slug);

  return (
    <>
      <PageHero>
        <Image
          src={project.cover.src}
          alt={project.cover.alt[locale]}
          sizes="(min-width: 1280px) 1200px, 100vw"
          placeholder="blur"
          fetchPriority="high"
          className="aspect-video w-full rounded-2xl object-cover"
        />
        <div className="mt-10 flex flex-wrap items-center gap-4">
          <h1 className="text-[clamp(2.75rem,6vw,5rem)] tracking-[-0.035em]">
            {project.name}
          </h1>
          {project.conceptual && (
            <span className="rounded-full bg-accent px-3 py-1 text-xs font-medium tracking-wide text-foreground uppercase">
              {labels.conceptual}
            </span>
          )}
        </div>
        <p className="mt-5 max-w-3xl text-lg">{project.summary[locale]}</p>
      </PageHero>

      <div className="content-width flex flex-col gap-12 py-16 md:py-20">
        <ProjectFacts project={project} locale={locale} labels={labels} />
        <div className="flex max-w-3xl flex-col gap-5 text-lg">
          {project.body[locale].map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
        <ProjectGallery images={project.gallery} locale={locale} />
        <ButtonLink
          href={project.link.url}
          newTabNotice={common.newTab}
          className="self-start"
        >
          {labels.detail.links[project.link.type]}
        </ButtonLink>
        {next && (
          <ProjectNav locale={locale} next={next} labels={labels.detail} />
        )}
      </div>
    </>
  );
}
