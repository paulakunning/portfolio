import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ButtonLink } from "@/components/ButtonLink";
import { ArrowLeftIcon, ArrowUpRightIcon } from "@/components/icons";
import { tagClass } from "@/components/ProjectCard";
import { PageHero } from "@/components/PageHero";
import { ProjectFacts } from "@/components/ProjectFacts";
import { ProjectGallery } from "@/components/ProjectGallery";
import { ProjectNav } from "@/components/ProjectNav";
import { Reveal } from "@/components/Reveal";
import { projects } from "@/content/projects";
import { getDictionary } from "@/i18n/get-dictionary";
import { localizePath } from "@/i18n/routing";
import { getLocale } from "@/i18n/server";
import { pageMetadata } from "@/lib/metadata";
import { getNextProject, getProject } from "@/lib/projects";

// Every slug is prerendered, so navigating here only waits for a static payload; a Suspense fallback would just flash.
export const instant = false;

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
  const images = [
    { url: project.cover.src.src, alt: project.cover.alt[locale] },
  ];
  return {
    ...metadata,
    openGraph: { ...metadata.openGraph, images },
    twitter: { ...metadata.twitter, images },
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
        <Link
          href={localizePath(locale, "/proyectos")}
          className="inline-flex items-center gap-1.5 text-[0.9375rem] text-muted hover:text-foreground"
        >
          <ArrowLeftIcon width={16} height={16} />
          {labels.detail.back}
        </Link>
        <div className="mt-6 flex flex-wrap items-center gap-4">
          <h1 className="text-[clamp(2.75rem,6vw,5rem)] tracking-[-0.035em]">
            {project.name}
          </h1>
          {project.conceptual && (
            <span className={tagClass}>{labels.conceptual}</span>
          )}
        </div>
        <div className="mt-8 grid gap-x-[clamp(2rem,6vw,6rem)] gap-y-8 md:grid-cols-[7fr_5fr]">
          <div>
            <p className="max-w-[36rem] text-[clamp(1.125rem,1.6vw,1.3rem)] text-muted">
              {project.summary[locale]}
            </p>
            <ButtonLink
              href={project.link.url}
              newTabNotice={common.newTab}
              className="mt-8"
            >
              {labels.detail.links[project.link.type]}
              <ArrowUpRightIcon width={16} height={16} />
            </ButtonLink>
          </div>
          <ProjectFacts project={project} locale={locale} labels={labels} />
        </div>
      </PageHero>

      <Reveal className="content-width mt-4">
        <Image
          src={project.cover.src}
          alt={project.cover.alt[locale]}
          sizes="(min-width: 1168px) 1072px, 100vw"
          placeholder="blur"
          loading="eager"
          fetchPriority="high"
          className="aspect-video w-full rounded-[2rem] object-cover"
        />
      </Reveal>

      <Reveal>
        <section
          aria-labelledby="body-title"
          className="content-width grid gap-x-[clamp(2rem,6vw,6rem)] gap-y-5 pt-20 md:grid-cols-[4fr_8fr]"
        >
          <h2 id="body-title" className="text-[clamp(1.75rem,2.6vw,2.25rem)]">
            {labels.detail.about}
          </h2>
          <div className="flex max-w-[40rem] flex-col gap-5 text-[1.1875rem]">
            {project.body[locale].map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </section>
      </Reveal>

      <ProjectGallery images={project.gallery} locale={locale} />

      {next && (
        <Reveal className="content-width pt-24 pb-28">
          <ProjectNav locale={locale} next={next} labels={labels.detail} />
        </Reveal>
      )}
    </>
  );
}
