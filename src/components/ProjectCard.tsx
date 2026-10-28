import Image from "next/image";
import Link from "next/link";
import type { Dictionary } from "@/i18n/dictionaries/es";
import type { ProjectCardData } from "@/lib/projects";

const tints = ["bg-lilac-tint", "bg-rose-tint", "bg-sand-tint"];
/** The prototype's `.tag`; the project detail reuses it. */
export const tagClass =
  "rounded-full border border-line px-2.5 py-0.5 text-[0.8125rem]";

type ProjectCardProps = {
  project: ProjectCardData;
  labels: Dictionary["projects"];
  index: number;
};

/** ProjectFilter sets data-reveal on the article; the hidden look only applies with motion allowed. */
export function ProjectCard({ project, labels, index }: ProjectCardProps) {
  return (
    <article
      className="group relative motion-safe:[transition:opacity_0.9s_ease-out,translate_0.9s_cubic-bezier(0.2,0.8,0.2,1)] motion-safe:not-print:data-[reveal=hidden]:translate-y-10 motion-safe:not-print:data-[reveal=hidden]:opacity-0"
      style={{ transitionDelay: index % 2 === 1 ? "120ms" : undefined }}
    >
      <div
        className={`aspect-[4/3] overflow-hidden rounded-3xl ${tints[index % tints.length]}`}
      >
        <Image
          src={project.cover.src}
          alt={project.cover.alt}
          sizes="(min-width: 1168px) 520px, (min-width: 761px) 48vw, 100vw"
          placeholder="blur"
          className="size-full object-cover [transition:transform_0.5s_cubic-bezier(0.2,0.8,0.2,1),scale_1.4s_cubic-bezier(0.2,0.8,0.2,1)] group-hover:transform-[scale(1.03)] motion-safe:not-print:group-data-[reveal=hidden]:scale-108"
        />
      </div>
      <h2 className="mt-5 text-[clamp(1.6rem,2.4vw,2.1rem)]">
        {/* Stretched link: the whole card is clickable, one tab stop. */}
        <Link href={project.href} className="after:absolute after:inset-0">
          {project.name}
        </Link>
      </h2>
      <p className="mt-[0.4rem] flex flex-wrap items-center gap-x-3 gap-y-2 text-sm leading-[1.6] text-muted">
        {project.role}, {project.year}
        {project.conceptual && (
          <span className={tagClass}>{labels.conceptual}</span>
        )}
      </p>
    </article>
  );
}
