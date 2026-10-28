import type { MetadataRoute } from "next";
import { locales } from "@/i18n/config";
import { localizePath } from "@/i18n/routing";
import { SITE_URL } from "./metadata";

/** One entry per path and locale, each listing every language version. */
export function buildSitemap(paths: string[]): MetadataRoute.Sitemap {
  return paths.flatMap((path) => {
    const languages = Object.fromEntries(
      locales.map((locale) => [locale, SITE_URL + localizePath(locale, path)]),
    );
    return locales.map((locale) => ({
      url: languages[locale]!,
      alternates: { languages },
    }));
  });
}
