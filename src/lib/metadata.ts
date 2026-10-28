import type { Metadata } from "next";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { localizePath } from "@/i18n/routing";

export const SITE_URL = "https://paulakunning.com";

type PageMetadataInput = {
  locale: Locale;
  /** Unprefixed path, e.g. "/proyectos". */
  path: string;
  title: string | { absolute: string };
  description: string;
};

export function pageMetadata({
  locale,
  path,
  title,
  description,
}: PageMetadataInput): Metadata {
  const { meta } = getDictionary(locale);
  const url = localizePath(locale, path);
  // The [lang] image file convention is dropped once a page sets its own openGraph/twitter, so set it here.
  const images = [{ url: `/${locale}/opengraph-image`, alt: meta.home.title }];
  const socialTitle =
    typeof title === "string" ? `${title} — ${meta.siteName}` : title.absolute;

  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: {
        es: localizePath("es", path),
        en: localizePath("en", path),
        "x-default": localizePath("es", path),
      },
    },
    openGraph: {
      type: "website",
      siteName: meta.siteName,
      locale: meta.ogLocale,
      url,
      title: socialTitle,
      description,
      images,
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description,
      images,
    },
  };
}
