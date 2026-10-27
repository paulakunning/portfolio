import { NextResponse, type NextRequest } from "next/server";
import { getProject } from "@/lib/projects";

const SPANISH_PREFIX = /^\/es(?=\/|$)/;
const ENGLISH_PREFIX = /^\/en(?=\/|$)/;
const PROJECT_PATH = /^\/(es|en)\/proyectos\/([^/]+)$/;

/**
 * Spanish is served without a prefix and English under /en.
 * Unprefixed requests are rewritten to the internal /es routes, and /es URLs
 * redirect to their unprefixed form so each page has a single public URL.
 */
export function proxy(request: NextRequest) {
  const url = request.nextUrl.clone();
  const { pathname } = url;

  if (SPANISH_PREFIX.test(pathname)) {
    url.pathname = pathname.replace(SPANISH_PREFIX, "") || "/";
    return NextResponse.redirect(url, 308);
  }

  const english = ENGLISH_PREFIX.test(pathname);
  const internal = english
    ? pathname
    : `/es${pathname === "/" ? "" : pathname}`;

  // Unknown slugs are runtime params, so the project page would stream a 200
  // before notFound(); the catch-all route answers with a real localized 404.
  const [, lang, slug] = PROJECT_PATH.exec(internal) ?? [];
  if (slug && !getProject(slug)) {
    url.pathname = `/${lang}/404`;
    return NextResponse.rewrite(url);
  }

  if (english) return NextResponse.next();
  url.pathname = internal;
  return NextResponse.rewrite(url);
}

export const config = {
  // Skip API routes, Next internals, files with an extension and generated OG images.
  matcher: ["/((?!api|_next|.*\\..*|.*opengraph-image).*)"],
};
