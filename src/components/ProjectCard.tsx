import Image from "next/image";
import Link from "next/link";
import type { Dictionary } from "@/i18n/dictionaries/es";
import type { ProjectCardData } from "@/lib/projects";

type ProjectCardProps = {
  project: ProjectCardData;
  labels: Dictionary["projects"];
  headingLevel: 2 | 3;
};

export function ProjectCard({
  project,
  labels,
  headingLevel,
}: ProjectCardProps) {
  const Heading = headingLevel === 2 ? "h2" : "h3";
  const tags = [
    ...project.categories.map((category) => labels.categories[category]),
    ...project.tools,
  ];

  return (
    <article className="group relative flex h-full flex-col">
      <div className="overflow-hidden rounded-2xl">
        <Image
          src={project.cover.src}
          alt={project.cover.alt}
          sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
          placeholder="blur"
          className="aspect-[16/11] w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="mt-5 flex flex-wrap items-center gap-3">
        <Heading className="text-2xl text-primary">
          {/* Stretched link: the whole card is clickable, one tab stop. */}
          <Link href={project.href} className="after:absolute after:inset-0">
            {project.name}
          </Link>
        </Heading>
        {project.conceptual && (
          <span className="rounded-full bg-accent px-3 py-0.5 text-xs font-medium tracking-wide uppercase">
            {labels.conceptual}
          </span>
        )}
      </div>
      <ul className="mt-3 flex flex-wrap gap-2">
        {tags.map((tag) => (
          <li
            key={tag}
            className="rounded-full border border-primary px-3 py-0.5 text-xs font-medium tracking-wide text-primary uppercase"
          >
            {tag}
          </li>
        ))}
      </ul>
      <p className="mt-3">{project.summary}</p>
    </article>
  );
}
