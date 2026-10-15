import { expect, it } from "vitest";
import { pageMetadata } from "./metadata";

it("builds canonical and hreflang alternates", () => {
  const meta = pageMetadata({
    locale: "en",
    path: "/proyectos",
    title: "Projects",
    description: "d",
  });

  expect(meta.alternates).toEqual({
    canonical: "/en/proyectos",
    languages: {
      es: "/proyectos",
      en: "/en/proyectos",
      "x-default": "/proyectos",
    },
  });
  expect(meta.openGraph).toMatchObject({
    locale: "en_US",
    url: "/en/proyectos",
    siteName: "Paula Kunning",
    type: "website",
  });
  expect(meta.twitter).toMatchObject({ card: "summary_large_image" });
});
