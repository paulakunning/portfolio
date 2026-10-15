import { describe, expect, it } from "vitest";
import { isLocale } from "./config";
import { localizePath, switchLocalePath, toPublicPath } from "./routing";

describe("localizePath", () => {
  it("keeps Spanish paths unprefixed", () => {
    expect(localizePath("es", "/")).toBe("/");
    expect(localizePath("es", "/proyectos")).toBe("/proyectos");
  });

  it("prefixes English paths with /en", () => {
    expect(localizePath("en", "/")).toBe("/en");
    expect(localizePath("en", "/proyectos/don-higinio")).toBe(
      "/en/proyectos/don-higinio",
    );
  });
});

describe("switchLocalePath", () => {
  it.each([
    ["/", "en", "/en"],
    ["/en", "es", "/"],
    ["/proyectos", "en", "/en/proyectos"],
    ["/en/proyectos/arqci", "es", "/proyectos/arqci"],
    ["/en/contacto", "en", "/en/contacto"],
    ["/contacto", "es", "/contacto"],
  ] as const)("%s → %s = %s", (pathname, target, expected) => {
    expect(switchLocalePath(pathname, target)).toBe(expected);
  });

  it('does not mistake paths that merely start with "en" for English', () => {
    expect(switchLocalePath("/enlaces", "en")).toBe("/en/enlaces");
  });
});

describe("isLocale", () => {
  it("accepts only es and en", () => {
    expect(isLocale("es")).toBe(true);
    expect(isLocale("en")).toBe(true);
    expect(isLocale("fr")).toBe(false);
  });
});

describe("toPublicPath", () => {
  it.each([
    ["/es", "/"],
    ["/es/proyectos", "/proyectos"],
    ["/proyectos", "/proyectos"],
    ["/en/contacto", "/en/contacto"],
    ["/estudio", "/estudio"],
  ])("%s → %s", (pathname, expected) => {
    expect(toPublicPath(pathname)).toBe(expected);
  });
});
