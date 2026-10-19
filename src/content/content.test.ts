import { describe, expect, it } from "vitest";
import { locales } from "@/i18n/config";
import { experience } from "./experience";
import { projects } from "./projects";
import { skills } from "./skills";

// Spec §4 order; projects can be missing while their content is pending.
const specOrder = [
  "don-higinio",
  "factchequeado-lab",
  "tecnofast-peru",
  "gea-logistics",
  "javier-carrizo",
  "arqci",
  "olatrek",
  "friosur",
  "aeropuerto-el-loa",
  "burning-wanderlust",
  "dede-digital",
  "amanda-wellness-coach",
  "uniform",
  "lucrecia-cornaglia",
];

describe("projects", () => {
  const slugs = projects.map((project) => project.slug);

  it("project slugs are unique kebab-case", () => {
    for (const slug of slugs) expect(slug).toMatch(/^[a-z0-9]+(-[a-z0-9]+)*$/);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("projects keep the spec order", () => {
    expect(slugs[0]).toBe("don-higinio");
    expect(slugs.at(-1)).toBe("lucrecia-cornaglia");
    const known = slugs.filter((slug) => specOrder.includes(slug));
    expect(known).toEqual(specOrder.filter((slug) => known.includes(slug)));
  });

  it("every project is complete in both languages", () => {
    for (const project of projects) {
      expect(project.categories.length, project.slug).toBeGreaterThan(0);
      expect(project.gallery.length, project.slug).toBeGreaterThanOrEqual(2);
      expect(project.gallery.length, project.slug).toBeLessThanOrEqual(4);
      expect(project.link.url, project.slug).toMatch(/^https:\/\//);
      for (const locale of locales) {
        expect(project.summary[locale], project.slug).not.toBe("");
        expect(project.role[locale], project.slug).not.toBe("");
        expect(project.cover.alt[locale], project.slug).not.toBe("");
        expect(project.body[locale].length, project.slug).toBeGreaterThan(0);
        for (const image of project.gallery) {
          expect(image.alt[locale], project.slug).not.toBe("");
        }
      }
    }
  });
});

describe("skills", () => {
  it("only Next.js and Framer are marked as learning", () => {
    expect(
      skills.filter((skill) => skill.learning).map((skill) => skill.name),
    ).toEqual(["Next.js", "Framer"]);
  });

  it("skills end with Illustrator and Photoshop", () => {
    expect(skills.slice(-2).map((skill) => skill.name)).toEqual([
      "Adobe Illustrator",
      "Adobe Photoshop",
    ]);
  });
});

describe("experience", () => {
  it("experience matches the CV", () => {
    const aster = experience.find((job) => job.company === "Aster Estudio");
    const canalCero = experience.find((job) => job.company === "Canal Cero");
    expect(aster).toMatchObject({ start: "2025-07" });
    expect(aster?.end).toBeUndefined();
    expect(canalCero).toMatchObject({ start: "2023-03", end: "2025-07" });
  });
});
