import type { MetadataRoute } from "next";
import { projects } from "@/content/projects";
import { buildSitemap } from "@/lib/sitemap";

export default function sitemap(): MetadataRoute.Sitemap {
  return buildSitemap([
    "/",
    "/proyectos",
    "/contacto",
    ...projects.map((project) => `/proyectos/${project.slug}`),
  ]);
}
