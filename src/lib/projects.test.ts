import type { StaticImageData } from "next/image";
import { describe, expect, it } from "vitest";
import type { Category, Project } from "@/content/types";
import { filterProjects, getNextProject, toCardData } from "./projects";

const image = { src: "/x.jpg", width: 10, height: 10 } as StaticImageData;

const project = (slug: string, categories: Category[]): Project => ({
  slug,
  name: slug.toUpperCase(),
  categories,
  tools: ["Figma"],
  year: 2025,
  role: { es: "Rol", en: "Role" },
  summary: { es: `Resumen ${slug}`, en: `Summary ${slug}` },
  body: { es: ["Párrafo"], en: ["Paragraph"] },
  cover: { src: image, alt: { es: `Portada ${slug}`, en: `Cover ${slug}` } },
  gallery: [],
  link: { type: "live", url: "https://example.com" },
});

const list = [
  project("a", ["web-design"]),
  project("b", ["branding"]),
  project("c", ["web-design", "web-development"]),
  project("d", ["web-development"]),
  project("e", ["web-design"]),
  project("f", ["branding", "web-design"]),
  project("g", ["web-development"]),
  project("h", ["web-design"]),
];
const slugs = (items: Project[]) => items.map((item) => item.slug);

describe("filterProjects", () => {
  it('returns everything for "all"', () => {
    expect(filterProjects(list, "all")).toEqual(list);
  });

  it("filters by category keeping order", () => {
    expect(slugs(filterProjects(list, "web-design"))).toEqual([
      "a",
      "c",
      "e",
      "f",
      "h",
    ]);
  });

  it("applies the limit after filtering", () => {
    const limited = filterProjects(list, "all", 6);
    expect(limited).toHaveLength(6);
    expect(limited[0]?.slug).toBe("a");
  });

  it("ignores a limit larger than the result", () => {
    expect(slugs(filterProjects(list, "branding", 6))).toEqual(["b", "f"]);
  });
});

describe("getNextProject", () => {
  it("returns the following project", () => {
    expect(getNextProject("a", list)?.slug).toBe("b");
  });

  it("wraps from last to first", () => {
    expect(getNextProject("h", list)?.slug).toBe("a");
  });

  it("returns undefined for unknown slugs", () => {
    expect(getNextProject("nope", list)).toBeUndefined();
  });
});

describe("toCardData", () => {
  it("localizes text and builds the href", () => {
    const source = list[2]!;
    const card = toCardData(source, "en");
    expect(card).toMatchObject({
      slug: "c",
      name: "C",
      href: "/en/proyectos/c",
      summary: "Summary c",
      cover: { src: image, alt: "Cover c" },
      conceptual: false,
    });
  });
});
