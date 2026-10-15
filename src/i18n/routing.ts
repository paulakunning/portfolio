import type { Locale } from "./config";

const ENGLISH_PREFIX = /^\/en(?=\/|$)/;

/** Turns an unprefixed path ("/proyectos") into its public URL for a locale. */
export function localizePath(locale: Locale, path: string): string {
  if (locale === "es") return path;
  return path === "/" ? "/en" : `/en${path}`;
}

/** Maps the current browser pathname to the same page in another locale. */
export function switchLocalePath(pathname: string, target: Locale): string {
  const path = pathname.replace(ENGLISH_PREFIX, "") || "/";
  return localizePath(target, path);
}

const INTERNAL_SPANISH_PREFIX = /^\/es(?=\/|$)/;

/**
 * Spanish pages are prerendered under /es but served without the prefix, so
 * usePathname() differs between server and browser. Normalizing both to the
 * public path keeps hydration consistent.
 */
export function toPublicPath(pathname: string): string {
  return pathname.replace(INTERNAL_SPANISH_PREFIX, "") || "/";
}
