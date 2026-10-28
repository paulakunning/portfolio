import { expect, it } from "vitest";
import { buildSitemap } from "./sitemap";

it("lists every path in both languages with alternates", () => {
  const entries = buildSitemap(["/", "/proyectos"]);

  expect(entries.map((e) => e.url)).toEqual([
    "https://paulakunning.com/",
    "https://paulakunning.com/en",
    "https://paulakunning.com/proyectos",
    "https://paulakunning.com/en/proyectos",
  ]);
  expect(entries[3]?.alternates?.languages).toEqual({
    es: "https://paulakunning.com/proyectos",
    en: "https://paulakunning.com/en/proyectos",
  });
});
