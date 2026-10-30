import Image from "next/image";
import Link from "next/link";
import { projects } from "@/content/projects";
import { formatMessage } from "@/i18n/format";
import { getDictionary } from "@/i18n/get-dictionary";
import { localizePath } from "@/i18n/routing";
import { getLocale } from "@/i18n/server";
import { toCardData } from "@/lib/projects";
import { ButtonLink } from "./ButtonLink";
import { ArrowRightIcon } from "./icons";
import { ProjectReel } from "./ProjectReel";

const tints = ["bg-lilac-tint", "bg-rose-tint", "bg-sand-tint"];

export async function FeaturedProjects() {
  const locale = await getLocale();
  const { featured } = getDictionary(locale);
  const allProjects = localizePath(locale, "/proyectos");
  const cards = projects
    .filter((project) => project.featured)
    .map((project) => toCardData(project, locale));

  const intro = (
    <>
      <h2
        id="featured-title"
        className="text-[clamp(2.25rem,4.6vw,4rem)] leading-[1.05]"
      >
        {featured.title}
      </h2>
      <p className="mt-4 mb-5 text-muted">{featured.subtitle}</p>
      <Link
        href={allProjects}
        className="font-medium underline decoration-1 underline-offset-[0.25em]"
      >
        {featured.viewAll}
      </Link>
    </>
  );

  return (
    <ProjectReel
      intro={intro}
      labels={{ previous: featured.previous, next: featured.next }}
    >
      {cards.map((card, i) => (
        <li
          key={card.slug}
          data-reel-card
          className="shrink-0 basis-[min(85vw,34rem)] snap-start group-data-pinned:basis-[min(60vw,92vh)]"
        >
          {/* Clickable for the mouse ("Ver" cursor); keyboard and screen readers use Ver proyecto. */}
          <Link
            href={card.href}
            tabIndex={-1}
            aria-hidden="true"
            data-reel-image
            data-cursor="view"
            className={`block aspect-[16/10] overflow-hidden rounded-3xl group-data-pinned:max-h-(--reel-image) group-data-pinned:w-full ${tints[i % tints.length]}`}
          >
            <Image
              src={card.cover.src}
              alt={card.cover.alt}
              sizes="(min-width: 900px) 60vw, 85vw"
              className="size-full translate-x-(--px,0) scale-108 object-cover"
            />
          </Link>
          <div className="flex flex-wrap items-start justify-between gap-x-8 gap-y-4 pt-5">
            <div>
              <h3 className="text-[clamp(1.6rem,2.4vw,2.25rem)] leading-[1.05]">
                {card.name}
              </h3>
              <p className="mt-[0.4rem] text-sm leading-[1.6] text-muted">
                {card.role}, {card.year}
              </p>
              <p className="mt-3 max-w-[32rem]">{card.summary}</p>
            </div>
            <ButtonLink href={card.href} variant="secondary">
              {featured.viewProject}
              <span className="sr-only"> {card.name}</span>
            </ButtonLink>
          </div>
        </li>
      ))}
      <li className="shrink-0 basis-[min(60vw,20rem)] snap-start group-data-pinned:basis-[min(24vw,22rem)] group-data-pinned:self-start">
        <Link
          href={allProjects}
          data-cursor="dark"
          className="flex aspect-[16/10] flex-col justify-between rounded-3xl bg-primary p-8 font-serif text-[clamp(1.75rem,2.6vw,2.5rem)] leading-[1.1] text-white transition-[background-color] duration-200 ease-[ease] group-data-pinned:aspect-auto group-data-pinned:h-[var(--reel-image,calc(min(60vw,92vh)*0.625))] hover:bg-primary-hover"
        >
          <span>
            {formatMessage(featured.seeAll, { count: projects.length })}
          </span>
          <ArrowRightIcon
            width={28}
            height={28}
            strokeWidth={1.5}
            className="self-end"
          />
        </Link>
      </li>
    </ProjectReel>
  );
}
