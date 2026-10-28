import Image from "next/image";
import Link from "next/link";
import { ButtonLink } from "@/components/ButtonLink";
import { ArrowLeftIcon, ArrowRightIcon } from "@/components/icons";
import type { Project } from "@/content/types";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries/es";
import { localizePath } from "@/i18n/routing";

type ProjectNavProps = {
  locale: Locale;
  next: Project;
  labels: Dictionary["projects"]["detail"];
};

export function ProjectNav({ locale, next, labels }: ProjectNavProps) {
  return (
    <nav aria-label={labels.more}>
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-line pb-5 text-[0.9375rem] text-muted">
        <span aria-hidden="true">{labels.next}</span>
        <ButtonLink
          href={localizePath(locale, "/proyectos")}
          variant="secondary"
        >
          <ArrowLeftIcon width={16} height={16} />
          {labels.back}
        </ButtonLink>
      </div>
      <Link
        href={localizePath(locale, `/proyectos/${next.slug}`)}
        className="group grid items-center gap-8 pt-8 md:grid-cols-[1fr_auto]"
      >
        <strong className="flex items-center gap-4 font-serif text-[clamp(2.5rem,6vw,5rem)] leading-none font-normal tracking-[-0.035em]">
          <span className="sr-only">{labels.next}: </span>
          {next.name}
          <ArrowRightIcon
            width="0.7em"
            height="0.7em"
            className="flex-none transition-transform duration-300 group-hover:translate-x-2"
          />
        </strong>
        <Image
          src={next.cover.src}
          alt=""
          sizes="(min-width: 761px) 18rem, 100vw"
          className="aspect-[16/10] w-full rounded-[1.25rem] object-cover md:w-[clamp(9rem,22vw,18rem)]"
        />
      </Link>
    </nav>
  );
}
