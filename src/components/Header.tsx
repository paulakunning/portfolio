import Link from "next/link";
import { getDictionary } from "@/i18n/get-dictionary";
import { localizePath } from "@/i18n/routing";
import { getLocale } from "@/i18n/server";
import { SiteNav } from "./SiteNav";

export async function Header() {
  const locale = await getLocale();
  const { nav } = getDictionary(locale);

  // Pill background is 90%, not the prototype's 80%: at 80% the links fall below AA over photos while scrolling.
  return (
    <header className="pointer-events-none fixed inset-x-0 top-3 z-50 flex justify-center px-3 md:top-4 md:px-gutter">
      <div className="pointer-events-auto relative flex w-full items-center gap-1.5 rounded-full border border-line bg-background/90 py-1.5 pr-1.5 pl-4 shadow-[0_10px_30px_-18px_rgb(46_42_40/0.35)] backdrop-blur-[14px] md:w-auto md:gap-8 md:pl-5.5">
        <Link
          href={localizePath(locale, "/")}
          aria-label={nav.home}
          className="font-serif text-[1.125rem] leading-none tracking-[-0.03em] whitespace-nowrap text-primary md:text-[1.2rem]"
        >
          Paula <em>Kunning</em>
        </Link>
        <SiteNav locale={locale} labels={nav} />
      </div>
    </header>
  );
}
