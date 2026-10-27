import { expect, test } from "@playwright/test";

test("renders the home sections in order", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 2 })).toHaveText([
    "Proyectos destacados",
    "Experiencia",
    "Habilidades",
    "Hola, soy Paula",
    "Testimonios",
    "¿Tenés una idea en mente? Me encantaría hacerla realidad",
    "Estemos en contacto",
  ]);
});

test("links the CV for each language", async ({ page, request }) => {
  await page.goto("/");
  const spanish = page.getByRole("link", { name: /Ver mi CV/ });
  await expect(spanish).toHaveAttribute("href", "/cv/paula-kunning-cv-es.pdf");

  await page.goto("/en");
  const english = page.getByRole("link", { name: /View my resume/ });
  await expect(english).toHaveAttribute(
    "href",
    "/cv/paula-kunning-resume-en.pdf",
  );

  for (const path of [
    "/cv/paula-kunning-cv-es.pdf",
    "/cv/paula-kunning-resume-en.pdf",
  ]) {
    expect((await request.get(path)).status()).toBe(200);
  }
});

test("shows at most six featured projects", async ({ page }) => {
  await page.goto("/");
  expect(await page.getByRole("article").count()).toBeLessThanOrEqual(6);
  await page.getByRole("link", { name: "Ver todos los proyectos" }).click();
  await expect(page).toHaveURL(/\/proyectos$/);
});

test("formats experience periods", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByText("Julio 2025 — Actualidad")).toBeVisible();
  await expect(page.getByText("Marzo 2023 — Julio 2025")).toBeVisible();

  await page.goto("/en");
  await expect(page.getByText("July 2025 — Present")).toBeVisible();
});

test("marks skills that are still being learned", async ({ page }) => {
  await page.goto("/");
  const skills = page
    .getByRole("region", { name: "Habilidades" })
    .getByRole("listitem");
  for (const name of ["Next.js", "Framer"]) {
    await expect(skills.filter({ hasText: name })).toContainText("Aprendiendo");
  }
  await expect(skills.filter({ hasText: "Figma" })).not.toContainText(
    "Aprendiendo",
  );
});
