import Link from "next/link";
import { getDictionary } from "@/i18n/get-dictionary";
import { localizePath } from "@/i18n/routing";
import { getLocale } from "@/i18n/server";
import { SiteNav } from "./SiteNav";

export async function Header() {
  const locale = await getLocale();
  const { nav } = getDictionary(locale);

  return (
    <header className="absolute inset-x-0 top-0 z-20 text-background">
      <div className="relative content-width flex items-center justify-between py-6">
        <Link
          href={localizePath(locale, "/")}
          aria-label={nav.home}
          className="font-serif text-2xl text-secondary"
        >
          <span className="italic">Paula</span> Kunning
        </Link>
        <SiteNav locale={locale} labels={nav} />
      </div>
    </header>
  );
}
