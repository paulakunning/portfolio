import { expect, test, type Page } from "@playwright/test";
import { pages } from "./pages";

const pathnameOf = (page: Page) => new URL(page.url()).pathname;

test.describe("serves every page with its language and a single h1", () => {
  for (const path of pages) {
    test(path, async ({ page }) => {
      const response = await page.goto(path);
      expect(response?.status()).toBe(200);
      await expect(page.locator("html")).toHaveAttribute(
        "lang",
        path.startsWith("/en") ? "en" : "es",
      );
      await expect(page.locator("h1")).toHaveCount(1);
    });
  }
});

test("redirects /es URLs to the unprefixed URL", async ({ page }) => {
  await page.goto("/es/proyectos");
  expect(pathnameOf(page)).toBe("/proyectos");

  await page.goto("/es");
  expect(pathnameOf(page)).toBe("/");
});

test("redirects WordPress-style trailing slashes", async ({ page }) => {
  await page.goto("/proyectos/");
  expect(pathnameOf(page)).toBe("/proyectos");
  await expect(page.locator("h1")).toHaveText(
    "Algunos trabajos que disfruté crear",
  );

  await page.goto("/en/contacto/");
  expect(pathnameOf(page)).toBe("/en/contacto");
  await expect(page.locator("h1")).toHaveText("Have a project in mind?");
});

test("shows a localized 404 for unknown URLs", async ({ page }) => {
  const spanish = await page.goto("/no-existe");
  expect(spanish?.status()).toBe(404);
  await expect(page.locator("h1")).toHaveText("Página no encontrada");

  const english = await page.goto("/en/nope");
  expect(english?.status()).toBe(404);
  await expect(page.locator("h1")).toHaveText("Page not found");
});

test("declares canonical and hreflang alternates", async ({ page }) => {
  await page.goto("/proyectos");
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
    "href",
    "https://paulakunning.com/proyectos",
  );
  await expect(
    page.locator('link[rel="alternate"][hreflang="en"]'),
  ).toHaveAttribute("href", "https://paulakunning.com/en/proyectos");
  await expect(
    page.locator('link[rel="alternate"][hreflang="x-default"]'),
  ).toHaveAttribute("href", "https://paulakunning.com/proyectos");
});
