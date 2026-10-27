import Link from "next/link";
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
  const linkClass =
    "text-primary underline-offset-4 transition-colors hover:underline";

  return (
    <div className="flex flex-col gap-4 border-t border-foreground/15 pt-8 sm:flex-row sm:justify-between">
      <Link href={localizePath(locale, "/proyectos")} className={linkClass}>
        <span aria-hidden="true">← </span>
        {labels.back}
      </Link>
      <Link
        href={localizePath(locale, `/proyectos/${next.slug}`)}
        className={linkClass}
      >
        {labels.next}: {next.name}
        <span aria-hidden="true"> →</span>
      </Link>
    </div>
  );
}
