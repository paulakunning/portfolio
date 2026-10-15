import { NextResponse, type NextRequest } from "next/server";

const SPANISH_PREFIX = /^\/es(?=\/|$)/;
const ENGLISH_PREFIX = /^\/en(?=\/|$)/;

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

  if (ENGLISH_PREFIX.test(pathname)) return NextResponse.next();

  url.pathname = `/es${pathname === "/" ? "" : pathname}`;
  return NextResponse.rewrite(url);
}

export const config = {
  // Skip API routes, Next internals, files with an extension and generated OG images.
  matcher: ["/((?!api|_next|.*\\..*|.*opengraph-image).*)"],
};
